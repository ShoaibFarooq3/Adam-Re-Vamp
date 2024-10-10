// Assuming these are your existing imports
import { API_KEY, GPT_MODEL, SYSTEM_PROMPT } from '../config'
import { Message, StreamingTextResponse } from "ai";
import { MessageContent, OpenAI } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";
import { createChatEngine } from "./engine";
import { LlamaIndexStream } from "./llamaindex-stream";

// Hypothetical ChatMessage type and MessageType enum
interface ChatMessage {
  content: string;
  role: MessageType;
  // other properties...
}

enum MessageType {
  User = "user",
  Assistant = "assistant",
  // other roles...
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getLastMessageContent = (
  textMessage: string,
  imageUrl: string | undefined,
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: "text",
      text: textMessage,
    },
    {
      type: "image_url",
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

function transformMessageToChatMessage(message: Message): ChatMessage {
  return {
    content: message.content,
    role: transformRole(message.role),
    // Map other necessary properties
  };
}

function transformRole(role: string): MessageType {
  // Map roles from Message to MessageType
  switch (role) {
    case "user":
      return MessageType.User;
    case "assistant":
      return MessageType.Assistant;
    // handle other cases...
    default:
      throw new Error(`Unsupported role type: ${role}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, data }: { messages: Message[]; data: any } = body;
    const lastMessage = messages.pop();
    if (!messages || !lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        {
          error:
            "messages are required in the request body and the last message must be from the user",
        },
        { status: 400 },
      );
    }

    // Transform Messages to ChatMessages
    const chatMessages: ChatMessage[] = messages.map(transformMessageToChatMessage);
    const lastChatMessage = transformMessageToChatMessage(lastMessage);

    const llm = new OpenAI({
      model: GPT_MODEL,
      maxTokens: 2048,
    });

    const chatEngine = await createChatEngine(llm);

    const lastMessageContent = getLastMessageContent(
      lastChatMessage.content,
      data?.imageUrl,
    );

    const response = await chatEngine.chat(
      lastMessageContent as MessageContent,
      chatMessages, // Use transformed messages here
      true,
    );

    // Transform the response into a readable stream
    const stream = LlamaIndexStream(response);

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}
