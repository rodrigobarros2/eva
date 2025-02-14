import Bull from 'bull';
import { JourneyExecution } from '../../domain/entities/journey-execution';
import { Collaborator } from '../../domain/entities/collaborator';
import { Action } from '../../domain/entities/journey';
import { JourneyExecutionRepository } from '../../domain/ports/journey-execution-repository';
import { CollaboratorRepository } from '../../domain/ports/collaborator-repository';
import { JourneyRepository } from '../../domain/ports/journey-repository';
import { createQueue } from '../../infrastructure/queue/bull-queue.config';
import { logger } from '../../shared/utils/logger';

export class JourneyExecutionService {
  private journeyQueue: Bull.Queue;

  constructor(
    private journeyRepo: JourneyRepository,
    private collaboratorRepo: CollaboratorRepository,
    private executionRepo: JourneyExecutionRepository,
  ) {
    this.journeyQueue = createQueue('journey-execution-queue');

    this.setupQueue();
  }

  private async setupQueue() {
    this.journeyQueue.process(async (job) => {
      const execution = job.data as JourneyExecution;
      await this.processJourneyExecution(execution);
    });
  }

  async findAll(): Promise<JourneyExecution[]> {
    return this.executionRepo.findAll();
  }

  async scheduleJourney({
    journeyId,
    collaboratorId,
    startDate,
  }: {
    journeyId: string;
    collaboratorId: string;
    startDate: Date | string;
  }) {
    const journey = await this.journeyRepo.findById(journeyId);
    const collaborator = await this.collaboratorRepo.findById(collaboratorId);

    if (!journey || !collaborator) {
      throw new Error('Journey or collaborator not found');
    }

    const execution: JourneyExecution = {
      journeyId,
      collaboratorId,
      startDate: new Date(startDate),
      status: 'scheduled',
      currentActionIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedExecution = await this.executionRepo.save(execution);

    const delay = new Date(startDate).getTime() - Date.now();
    await this.journeyQueue.add(savedExecution, { delay });

    return savedExecution;
  }

  private async processJourneyExecution(execution: JourneyExecution) {
    const { _id: executionId, journeyId, collaboratorId, currentActionIndex } = execution;

    try {
      const [journey, collaborator] = await Promise.all([
        this.journeyRepo.findById(journeyId),
        this.collaboratorRepo.findById(collaboratorId),
      ]);

      if (!journey || !collaborator) {
        throw new Error('Journey or collaborator not found');
      }

      await this.updateExecutionStatus(executionId as string, 'in_progress');

      for (const action of journey.actions.slice(currentActionIndex)) {
        await this.executeAction(action, collaborator);
        await this.updateExecutionStatus(executionId as string, 'in_progress');
      }

      await this.updateExecutionStatus(executionId as string, 'completed');
    } catch (error) {
      await this.updateExecutionStatus(executionId as string, 'failed');
      throw error;
    }
  }

  private async updateExecutionStatus(
    executionId: string,
    status: 'scheduled' | 'in_progress' | 'completed' | 'failed',
  ) {
    if (!executionId) {
      throw new Error('Execution ID is undefined');
    }
    await this.executionRepo.updateStatus(executionId, status);
  }

  private async executeAction(action: Action, collaborator: Collaborator) {
    switch (action.type) {
      case 'email':
        await this.sendEmail(action.config, collaborator);
        break;
      case 'whatsapp':
        await this.sendWhatsApp(action.config, collaborator);
        break;
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  private async sendEmail(config: any, collaborator: Collaborator) {
    logger.info(`Sending email to ${collaborator.email} with template ${config.template}`);
    return { mesage: 'Email enviado com sucesso' };
    // Lógica de envio de email implementada aqui
  }

  private async sendWhatsApp(config: any, collaborator: Collaborator) {
    logger.info(`Sending WhatsApp to ${collaborator.phone} with template ${config.template}`);
    return { mesage: 'WhatsApp enviado com sucesso' };
    // Lógica de envio de WhatsApp implementada aqui
  }
}
