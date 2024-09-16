import type { Ceremony } from '@/types/types';
import { Schema, model, models } from 'mongoose';

const ceremonySchema = new Schema<Ceremony , Schema.Types.ObjectId>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: { type: [String], required: true }
});

const Ceremony = models.Ceremony || model('Ceremony', ceremonySchema);

export default Ceremony;