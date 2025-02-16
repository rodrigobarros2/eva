import 'express-async-errors';
import { Router } from 'express';
import { journeyExecutionController, collaboratorController, journeyController } from '../instances';
import validateSchema from '../middlewares/validation.middleware';
import { scheduleJourneySchema } from '../middlewares/schema/scheduleJourneySchema';
import { createCollaboratorSchema } from '../middlewares/schema/createCollaboratorSchema';
import { createJourneySchema } from '../middlewares/schema/createJourneySchema';

const router = Router();
// poderia separar em 3 arquivos de rotas diferentes, e poderia evitar o req, res, next já que passa como parametro para dentro do controller

// outra obs: ao instanciar dessa forma, o controller não fica acoplado ao express, o que pode ser bom para testes unitários, por exemplo, apesar de ficar um pouco mais verboso

router.post('/collaborators', validateSchema(createCollaboratorSchema), (req, res, next) =>
  collaboratorController.createCollaborator(req, res, next),
);

router.get('/collaborators', (req, res, next) => collaboratorController.getCollaborators(req, res, next));

router.post('/journey-executions', validateSchema(scheduleJourneySchema), (req, res, next) =>
  journeyExecutionController.scheduleJourney(req, res, next),
);

router.get('/journey-executions', (req, res, next) => journeyExecutionController.getJourneyExecutions(req, res, next));

router.post('/journeys', validateSchema(createJourneySchema), (req, res, next) =>
  journeyController.createJourney(req, res, next),
);

router.get('/journeys', (req, res, next) => journeyController.getJourneys(req, res, next));

export default router;
