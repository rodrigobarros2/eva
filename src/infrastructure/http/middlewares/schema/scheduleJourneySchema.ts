import Joi from 'joi';

export const scheduleJourneySchema = Joi.object({
  journeyId: Joi.string().required().trim().messages({
    'any.required': 'ID da jornada é obrigatório',
    'string.empty': 'ID da jornada não pode estar vazio',
  }),
  collaboratorId: Joi.string().required().trim().messages({
    'any.required': 'ID do colaborador é obrigatório',
    'string.empty': 'ID do colaborador não pode estar vazio',
  }),
  startDate: Joi.date().min('now').required().messages({
    'any.required': 'Data de início é obrigatória',
    'date.min': 'Data de início deve ser futura',
  }),
});
