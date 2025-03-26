import type { BlogPost } from '@/types/types';
import { Schema, model, models } from 'mongoose';

const richTextNodeSchema = new Schema({
    type: { type: String, required: true },  
    children: { type: [Schema.Types.Mixed], required: true },
    src: { type: String },                             
    alt: { type: String },                              
});


const blogPostSchema = new Schema<BlogPost , Schema.Types.ObjectId>({
    title: { type: String, required: true },            
    content: { type: [richTextNodeSchema], required: true }, 
    author: { type: String, required: true },          
    thumbnailUrl: { type: String },                       
});


const BlogPost = models.BlogPost || model<BlogPost>('BlogPost', blogPostSchema);

export default BlogPost;