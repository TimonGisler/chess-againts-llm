export class LlmApi {
  readonly API_KEY: string;
  private messages: Message[] = [];

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  public async askModel(userInput: string): Promise<Response> {
    console.log("API key is: " + this.API_KEY);
    if (!this.API_KEY) {
      throw new Error("API key is not set");
    }

    this.messages.push({
      role: "user",
      content: userInput,
    });

    return this.makeRequest(this.messages);
  }

  private async makeRequest(messages: Message[]): Promise<Response> {
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

    return test;
  }
}

interface Message {
  role: string;
  content: string;
}
