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
    let onlyAnswer = response.choices[0].message.content;

    return onlyAnswer ?? "No response from model";
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

interface Message {
  role: string;
  content: string;
}
