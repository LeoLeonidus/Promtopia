import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req,res) => {

    const { userId,prompt,tag} = await req.json();

    console.log("route.js sono in POST di /prompt/new");
    console.log("userId=",userId,"prompt=",prompt,"tag=",tag);

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
       

    } catch (error) {
        console.log("server error=",error,"tag=",error.tag);
        return new Response("Failed to create a new prompt" , {status: 500})
    }

}