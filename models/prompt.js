import { Schema , model , models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'prompt is required !'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
}) ;

// Check if Prompt already exist in models use that , if not create !
const Prompt = models.Prompt || model("Prompt" , PromptSchema);

export default Prompt;