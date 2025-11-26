import { Schema, model, Document } from 'mongoose';

export interface IExample extends Document {
  name: string;
  createdAt: Date;
}

const ExampleSchema = new Schema<IExample>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

export const ExampleModel = model<IExample>('Example', ExampleSchema);
