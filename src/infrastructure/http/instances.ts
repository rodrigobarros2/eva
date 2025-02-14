import { MongoDBJourneyRepository } from '../mongodb/repositories/mongodb-journey.repository';
import { MongoDBCollaboratorRepository } from '../mongodb/repositories/mongodb-collaborator.repository';
import { MongoDBJourneyExecutionRepository } from '../mongodb/repositories/mongodb-journey-execution.repository';
import { JourneyExecutionService } from '../../apllication/services/journey-execution.service';
import { JourneyExecutionController } from './controllers/journey-execution.controller';
import { CollaboratorController } from './controllers/collaborator.controller';
import { JourneyController } from './controllers/journey.controller';

// Instanciando os repositórios
export const journeyRepo = new MongoDBJourneyRepository();
export const collaboratorRepo = new MongoDBCollaboratorRepository();
export const executionRepo = new MongoDBJourneyExecutionRepository();

// Instanciando o serviço
const journeyExecutionService = new JourneyExecutionService(journeyRepo, collaboratorRepo, executionRepo);

// Instanciando os controllers
const journeyExecutionController = new JourneyExecutionController(journeyExecutionService);
const collaboratorController = new CollaboratorController(collaboratorRepo);
const journeyController = new JourneyController(journeyRepo);

export { journeyExecutionController, collaboratorController, journeyController };
