import { useEffect } from "react";

export const useDifyChatbot = () => {
  useEffect(() => {
    window.difyChatbotConfig = {
      token: process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN || "",
    };

    const script = document.createElement("script");
    script.src = "https://udify.app/embed.min.js";
    script.id = process.env.NEXT_PUBLIC_DIFY_SCRIPT_ID || "";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
