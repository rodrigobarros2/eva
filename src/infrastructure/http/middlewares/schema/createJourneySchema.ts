import Joi from 'joi';

export const createJourneySchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'Nome é obrigatório',
    'string.empty': 'Nome não pode estar vazio',
  }),
  description: Joi.string().optional().trim(),
  actions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().trim().messages({
          'any.required': 'Tipo de ação é obrigatório',
          'string.empty': 'Tipo de ação não pode estar vazio',
        }),
        config: Joi.object().required().messages({
          'any.required': 'Configuração da ação é obrigatória',
        }),
        order: Joi.number().required().messages({
          'any.required': 'Ordem da ação é obrigatória',
        }),
      }),
    )
    .required()
    .messages({
      'any.required': 'Ações são obrigatórias',
    }),
});
