import type { OpenRouterResponse } from "../type/Types";

export class LlmApi {
  readonly API_KEY: string;
  private messages: Message[] = [];

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  public async askModel(userInput: string): Promise<string> {
    console.log("API key is: " + this.API_KEY);
    if (!this.API_KEY) {
      throw new Error("API key is not set");
    }

    this.messages.push({
      role: "user",
      content: userInput,
    });

    let response = await this.makeRequest(this.messages);
    let currentResponse = response.choices[0];
    let onlyAnswer =
      currentResponse.message.content ?? "No response from model";

    let answerMessage: Message = {
      role: currentResponse.message.role,
      content: onlyAnswer,
    };
    this.messages.push(answerMessage);

    return onlyAnswer;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  private async makeRequest(messages: Message[]): Promise<OpenRouterResponse> {
    const test = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: messages,
      }),
    });

    return await test.json();
  }
}

export interface Message {
  role: string;
  content: string;
}
