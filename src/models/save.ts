import { Schema, model, models } from "mongoose";
import type { OLD_SLAVES, Save, TRUSTEES_PERSONE } from '@/types/types';
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


const OldSlavesSchema = new Schema<OLD_SLAVES>({
    fullName: {
        type: String,
        required: true,
        default: ""
    },
    date: {
        type: String,
        required: true,
        default: ""

    },
    img: {
        type: String,
        required: false,
        default: ""
    }
});

const SaveSchema = new Schema<Save>({
    Years: {
        type: [String],
        default: ["Uncategorized"]
    },
    Trustees: {
        type: [TrusteesPersonSchema],
        default: [] 
    },
    OldSlaves: {
        type: [OldSlavesSchema],
        default: [] 
    }
}, { collection: "Save" });

const Save = models.Save || model<Save>("Save", SaveSchema);

export default Save;