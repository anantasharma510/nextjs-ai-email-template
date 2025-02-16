import { GenerateEmailTemplateAIModel } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { prompt} = await req.json();

    try {
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
        const aiResp = result.response.text();

        // Log response for debugging
        console.log(aiResp);

        // Save to database logic here
        // You may want to add your database logic here to store the response

        return NextResponse.json({ success: true, data: aiResp });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message });
    }
}
