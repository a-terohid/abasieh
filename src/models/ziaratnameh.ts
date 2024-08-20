import type { User, Ziartnameh } from '@/types/types';
import { Schema, model, models } from "mongoose";

const ZiaratnamehSchema = new Schema<Ziartnameh , Schema.Types.ObjectId>({
    Title : {
        type: String,
        required : true,
        default : ""
    },
    Description : {
        type : String,
        required: true,
        default : ""
    },
    Voice : {
        type : String,
        required: false,
        default : ""
    },
    Text: [
        {
            Original: {
                type: String,
                required: true,
                default: ""
            },
            Translation: {
                type: String,
                required: true,
                default: ""
            },
            Supplement: {
                type: String,
                required: false,
                default: ""
            }
        }
    ]
    
} , { collection : "" })


const Ziartnameh = models.Ziartnameh || model("Ziartnameh",  ZiaratnamehSchema);

export default Ziartnameh;