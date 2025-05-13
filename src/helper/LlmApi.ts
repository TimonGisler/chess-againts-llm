export class LlmApi {
    readonly API_KEY: string;
    private messages: message[] = [];

    constructor(apiKey: string) {
        this.API_KEY = apiKey;
    }

    public async askModel(userInput: string): Promise<Response> {
        this.messages.push({
            role: "user",
            content: userInput
        });

        return this.makeRequest(this.messages)
    }

    private async makeRequest(messages: message[]): Promise<Response> {
        const test = fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer <OPENROUTER_API_KEY>",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1:free",
                "messages": messages
            })
        });

        return test;
    }

}


interface message {
    role: string;
    content: string;
}