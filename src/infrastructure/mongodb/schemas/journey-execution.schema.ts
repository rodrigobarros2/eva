import { Schema, model } from 'mongoose';
import { JourneyExecution } from '../../../domain/entities/journey-execution';

const JourneyExecutionSchema = new Schema<JourneyExecution>({
  journeyId: { type: Schema.Types.String, ref: 'Journey', required: true },
  collaboratorId: { type: Schema.Types.String, ref: 'Collaborator', required: true },
  startDate: { type: Date, required: true },
  status: { type: String, required: true },
  currentActionIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

JourneyExecutionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const JourneyExecutionModel = model<JourneyExecution>('JourneyExecution', JourneyExecutionSchema);
