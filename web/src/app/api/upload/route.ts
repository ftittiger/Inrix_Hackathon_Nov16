import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "No valid image provided" },
        { status: 400 }
      );
    }

    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    const imageType = image.type;

    const modelId = "anthropic.claude-3-sonnet-20240229-v1:0";

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: imageType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: "Describe the macros of the image of food",
          },
        ],
      },
    ];

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      messages: messages,
      max_tokens: 512,
      temperature: 0.5,
      top_p: 0.9,
    });

    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body,
    });

    const response = await client.send(command);

    // Parse the response body
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    if (!responseBody.content) {
      throw new Error("No content in response");
    }

    console.log("text: " + responseBody.content[0].text);

    return NextResponse.json({
      response: responseBody.content[0].text,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
