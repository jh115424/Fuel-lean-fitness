import { useState } from "react";
import { askAIStream } from "../api";
import "./aiChat.css";

export default function AiChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = () => {
    if (!prompt) return;

    setLoading(true);
    setError("");
    setResponse("");

    askAIStream(
      prompt,
      (chunk) => {
        setResponse((prev) => prev + chunk);
      },
      () => {
        setLoading(false);
      },
    );
  };

  return (
    <div className="aiChatContainer">
      <h3 className="aiChatTitle">Ask Your Fitness AI</h3>
      <textarea
        className="aiChatInput"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: I'm on a Cut with 2200 calories. What should I eat for lunch today?"
        rows={2}
      />
      <button className="aiChatButton" onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {error && <p className="aiChatError">{error}</p>}
      {response && (
        <div className="aiChatResponse">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
