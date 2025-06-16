import type { Message } from "./helper/LlmApi";

export default function ChatHistory({ messages }: { messages: Message[] }) {
  return (
    <>
      <h1>Chat History</h1>
      <div>
        {messages.map((message, index) => (
          <ol key={index}>
            <li>
              <strong>{message.role}:</strong> {message.content}
            </li>
          </ol>
        ))}
      </div>
    </>
  );
}
