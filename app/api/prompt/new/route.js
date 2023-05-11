import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json(); //pack all the data

    try {
        await connectToDB; //connect to database (is a lambda function, is going to die once it finish)
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save(); //to save in the database

        return new Response(JSON.stringify(newPrompt), { status: 201}) // return the status 201 that means created
    } catch(error) {
        return new Response("Failed to create a new prompt"), { status: 500 }
    }
}