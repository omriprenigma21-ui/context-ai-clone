"use client";

import { MessageCircle } from "lucide-react";

interface QuestionsTimeoutProps {
  questionCount?: number;
  timeout?: string;
}

export const QuestionsTimeout = ({
  questionCount = 4,
  timeout = "timed out"
}: QuestionsTimeoutProps) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 max-w-2xl">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-600">
          {questionCount} questions – {timeout}
        </span>
      </div>
    </div>
  );
};
