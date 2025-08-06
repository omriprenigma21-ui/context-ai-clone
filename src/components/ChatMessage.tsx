"use client";

import { CheckCircle, MessageCircle, Clock } from "lucide-react";

interface ChatMessageProps {
  type: "user" | "ai" | "system";
  content: string;
  timestamp?: string;
  status?: "success" | "info" | "warning";
}

export const ChatMessage = ({
  type,
  content,
  timestamp,
  status
}: ChatMessageProps) => {
  const getMessageStyle = () => {
    switch (type) {
      case "user":
        return "text-sm text-gray-700 bg-gray-50 rounded-lg p-4";
      case "ai":
        return "text-gray-800 space-y-4";
      case "system":
        return "bg-green-50 border border-green-200 rounded-lg p-3 max-w-md";
      default:
        return "text-gray-800";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "info":
        return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case "warning":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  if (type === "ai") {
    return (
      <div className="space-y-4">
        {/* AI Header */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-blue-500"></div>
          <span className="text-sm font-medium text-gray-600">Context</span>
          {timestamp && (
            <span className="text-xs text-gray-400">{timestamp}</span>
          )}
        </div>

        {/* AI Message Content */}
        <div className={getMessageStyle()}>
          <p>{content}</p>
        </div>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className={getMessageStyle()}>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-green-800">{content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className={getMessageStyle()}>
        <p>{content}</p>
        {timestamp && (
          <div className="text-xs text-gray-400 mt-2">{timestamp}</div>
        )}
      </div>
    </div>
  );
};
