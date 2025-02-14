import { Schema, model } from 'mongoose';
import { Collaborator } from '../../../domain/entities/collaborator';

const CollaboratorSchema = new Schema<Collaborator>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CollaboratorSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const CollaboratorModel = model<Collaborator>('Collaborator', CollaboratorSchema);
