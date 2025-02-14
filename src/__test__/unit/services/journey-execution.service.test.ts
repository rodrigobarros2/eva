import { JourneyExecutionService } from '../../../apllication/services/journey-execution.service';
import { JourneyExecution } from '../../../domain/entities/journey-execution';
import { Collaborator } from '../../../domain/entities/collaborator';
import { Journey } from '../../../domain/entities/journey';
import { vi } from 'vitest';

describe('JourneyExecutionService', () => {
  let service: JourneyExecutionService;
  let mockJourneyRepo: any;
  let mockCollaboratorRepo: any;
  let mockExecutionRepo: any;
  let mockJourneyQueue: any;

  beforeEach(() => {
    mockJourneyRepo = {
      findById: vi.fn(),
    };

    mockCollaboratorRepo = {
      findById: vi.fn(),
    };

    mockExecutionRepo = {
      save: vi.fn(),
      updateStatus: vi.fn().mockResolvedValue(true),
    };

    mockJourneyQueue = {
      add: vi.fn().mockResolvedValue(true),
      process: vi.fn(),
      on: vi.fn(),
    };

    service = new JourneyExecutionService(mockJourneyRepo, mockCollaboratorRepo, mockExecutionRepo);
    service['journeyQueue'] = mockJourneyQueue;
  });

  describe('scheduleJourney', () => {
    it('deve agendar a execução de uma jornada com sucesso', async () => {
      const journey: Journey = {
        id: 'journey-1',
        name: 'Jornada de Onboarding',
        description: 'Descrição da Jornada',
        actions: [
          {
            type: 'email',
            config: { template: 'welcome' },
            order: 1,
          },
          {
            type: 'whatsapp',
            config: { template: 'notify' },
            order: 2,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const collaborator: Collaborator = {
        id: 'collab-1',
        name: 'Rodrigo',
        email: 'rodrigo@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockJourneyRepo.findById.mockResolvedValue(journey);
      mockCollaboratorRepo.findById.mockResolvedValue(collaborator);
      mockExecutionRepo.save.mockImplementation(async (data: JourneyExecution) => ({
        ...data,
        _id: 'execution-1',
      }));

      const startDate = new Date(Date.now() + 3600000); // 1 hora no futuro

      const result = await service.scheduleJourney({
        journeyId: journey.id!,
        collaboratorId: collaborator.id!,
        startDate,
      });

      expect(result).toBeDefined();
      expect(result.journeyId).toBe(journey.id);
      expect(result.collaboratorId).toBe(collaborator.id);
      expect(result.status).toBe('scheduled');
      expect(mockExecutionRepo.save).toHaveBeenCalled();
      const expectedDelay = new Date(startDate).getTime() - Date.now();
      expect(mockJourneyQueue.add).toHaveBeenCalledWith(result, { delay: expect.any(Number) });
      const delayArg = mockJourneyQueue.add.mock.calls[0][1].delay;
      expect(delayArg).toBeGreaterThan(0);
      expect(delayArg).toBeLessThanOrEqual(expectedDelay);
    });

    it('deve lançar erro se a jornada não for encontrada', async () => {
      mockJourneyRepo.findById.mockResolvedValue(null);
      mockCollaboratorRepo.findById.mockResolvedValue({});
      const startDate = new Date();

      await expect(
        service.scheduleJourney({ journeyId: 'invalid-journey', collaboratorId: 'collab-1', startDate }),
      ).rejects.toThrow('Journey or collaborator not found');
    });

    it('deve lançar erro se o colaborador não for encontrado', async () => {
      mockJourneyRepo.findById.mockResolvedValue({});
      mockCollaboratorRepo.findById.mockResolvedValue(null);
      const startDate = new Date();

      await expect(
        service.scheduleJourney({ journeyId: 'journey-1', collaboratorId: 'invalid-collab', startDate }),
      ).rejects.toThrow('Journey or collaborator not found');
    });
  });
});
