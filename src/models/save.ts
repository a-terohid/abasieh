import { Schema, model, models } from "mongoose";
import type { Save } from '@/types/types';

const SaveSchema = new Schema<Save>({
    Years: {
        type : [String],
        default : ["Uncategorized"]
    }
}, { collection: "Save" });

const Save = models.Save || model<Save>("Save", SaveSchema);

export default Save;