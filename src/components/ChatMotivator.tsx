"use client";

import React, { useState } from "react";

export default function Motivator() {
  const [chatHistory, setChatHistory] = useState<string[]>([`So... will you go for that walk today?`]);
  const [userInput, setUserInput] = useState<string>("");
  const [isChatting, setIsChatting] = useState<boolean>(true); //I changed this to bypass the button
  const [loading, setLoading] = useState<boolean>(false);

  const startChat = async () => {
    //const initialMessage = await generateMotivation();
    //setChatHistory([`${initialMessage}\nSo... will you go for that walk today?`]);
    setChatHistory([`So... will you go for that walk today?`]);
    setIsChatting(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const updatedChatHistory = [...chatHistory, `You: ${userInput}`];
    setChatHistory(updatedChatHistory);
    setUserInput("");
    setLoading(true);

    const aiResponse = await generateResponse(userInput, updatedChatHistory);
    setChatHistory([...updatedChatHistory, `👟: ${aiResponse}`]);
    setLoading(false);
  };

  // const generateMotivation = async (): Promise<string> => {
  //   return await fetchOpenAI("Give me a short, motivational, evidence-based one-liner about the benefits of getting off the sofa and out for a walk.");
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateResponse = async (userMessage: string, history: string[]): Promise<string> => {
    return await fetchOpenAI(`The user said: "${userMessage}". If they are making an excuse not to walk, rebuff their excuse gently but firmly and give them another evidence-based reason to go and walk. If they say they will go for a walk, tell them "Great!" and do not say more unless they type again.`);
  };

  const fetchOpenAI = async (prompt: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Store this securely
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "system", content:
            "You are a personal trainer who specialises in understanding and motivating people who are a bit reluctant to get physical. You have been hired by an organisation that wants to deliver factual and motivational messages via a mobile app to remind people why it's worth getting off the couch and going out for a walk. It's not about hardcore gym moves, just going outside for an hour and walking around. Your tone should be encouraging but not glib, neither aggressive nor too soft. Be like an encouraging friend who knows you well enough not to take your nonsense. Provide genuine reasons why it's worth getting up and out for a walk, based in evdence. Draw on many different motivating factors, eg health, mental wellbeing, living longer, being a good role model for others in your life, staying supple. Keep all your reponses to 40 words or fewer. Don't use pleasantries like 'Hey there'. Don't put your answers in quotation marks."
          
        }, { role: "user", content: prompt }],
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Let's go for a walk!";
  };

  return (
    <div>
      {!isChatting ? (
        <button
          className="text-2xl md:text-3xl font-semibold bg-[#68B0AB] hover:bg-[#4A7C59] text-white w-full justify-start px-4 py-6 h-auto"
          onClick={startChat}
        >
          Get Motivation!
        </button>
      ) : (
        <div>
          <div className="mb-4 p-2 border border-gray-300 rounded" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {chatHistory.map((message, index) => (
              <p key={index} className="mb-1">{message}</p>
            ))}
            {loading && <p>Typing...</p>}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button onClick={handleSendMessage} className="bg-[#68B0AB] hover:bg-[#4A7C59] text-white px-4 py-1 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
