import Joi from 'joi';

export const createCollaboratorSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'Nome é obrigatório',
    'string.empty': 'Nome não pode estar vazio',
  }),
  email: Joi.string().email().required().trim().messages({
    'any.required': 'Email é obrigatório',
    'string.empty': 'Email não pode estar vazio',
    'string.email': 'Email deve ser válido',
  }),
  phone: Joi.string().optional().trim(),
});
