import type { Zekr, Zekr_Text, Zekr_Text_Paragraph } from '@/types/types';
import { Schema, model, models } from "mongoose";

const Zekr_Text_Paragraph_Schema = new Schema<Zekr_Text_Paragraph>({
    Description: {
        type: String,
        required: true,
        default: ""
    },
    Zekr_text_p: {
        type: [String],
        required: true,
        default: []
    },
    hadith: {
        type: String,
        required: true,
        default: ""
    }
});

const Zekr_Text_Schema = new Schema<Zekr_Text>({
    FirstParagraph: {
        type: Zekr_Text_Paragraph_Schema,
        required: true
    },
    SecondParagraph: {
        type: Zekr_Text_Paragraph_Schema,
        required: true
    }
});

const ZekrSchema = new Schema<Zekr>({
    Title: {
        type: String,
        required: true,
        default: ""
    },
    Author: {
        type: String,
        required: true,
        default: ""
    },
    Year: {
        type: String,
        required: true,
        default: ""
    },
    Voice: {
        type: String,
        required: false,
        default: ""
    },
    Zekr_Text: {
        type: Zekr_Text_Schema,
        required: true
    }
}, { collection: "Zekr" });

const Zekr = models.Zekr || model("Zekr", ZekrSchema);

export default Zekr;
