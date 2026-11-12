import { ROLE } from '@/types/enums';
import type { User } from '@/types/types';


import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<User , Schema.Types.ObjectId>({
    email : {
        type: String,
        required : true,
        default : ""
    },
    password : {
        type : String,
        required: true,
        default : ""
    },
    role : {
        type : String,
        required: true,
        default : ROLE.ADMIN
    },
    // Password reset: only a SHA-256 hash of the one-time token is stored, never the token.
    resetPasswordTokenHash : {
        type : String,
        default : null
    },
    resetPasswordExpires : {
        type : Date,
        default : null
    },
    
} , { collection : "USER" })


const USER = models.USER || model("USER", UserSchema);

export default USER;