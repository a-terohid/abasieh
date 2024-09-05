import { Schema, model, models } from "mongoose";
import type { Save, TRUSTEES_PERSONE } from '@/types/types';
import { TRUSTEES_ROLE } from "@/types/enums";


const TrusteesPersonSchema = new Schema<TRUSTEES_PERSONE>({
    fullName: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""

    },
    role: {
        type: String,
        required: true,
        default: TRUSTEES_ROLE.NORMAL 
    },
    img: {
        type: String,
        required: false,
        default: ""
    }
});

// تعریف اسکیمای Save
const SaveSchema = new Schema<Save>({
    Years: {
        type: [String],
        default: ["Uncategorized"]
    },
    Trustees: {
        type: [TrusteesPersonSchema],
        default: [] 
    }
}, { collection: "Save" });

const Save = models.Save || model<Save>("Save", SaveSchema);

export default Save;