export interface JourneyExecution {
  _id?: string;
  journeyId: string;
  collaboratorId: string;
  startDate: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
  currentActionIndex: number;
  createdAt: Date;
  updatedAt: Date;
}
