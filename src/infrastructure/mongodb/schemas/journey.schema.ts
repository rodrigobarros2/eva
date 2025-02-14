import { Schema, model } from 'mongoose';
import { Journey } from '../../../domain/entities/journey';

const JourneySchema = new Schema<Journey>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  actions: [
    {
      type: { type: String, enum: ['email', 'whatsapp', 'api_request'], required: true },
      config: {
        template: String,
        apiUrl: String,
        method: String,
        payload: Schema.Types.Mixed,
      },
      order: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

JourneySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const JourneyModel = model<Journey>('Journey', JourneySchema);
