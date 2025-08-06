"use client";

import { Clock } from "lucide-react";

interface ProgressIndicatorProps {
  progressTime: string;
  progressCount: number; // Changed from string to number
  progressPercentage: number;
  tasks: string[];
}

export const ProgressIndicator = ({
  progressTime,
  progressCount,
  progressPercentage,
  tasks
}: ProgressIndicatorProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{progressTime}</span>
        </div>
        <span className="text-xs text-gray-500">{progressCount} / {tasks.length}</span>
      </div>

      <div className="w-full h-1.5 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex mt-2 overflow-x-auto gap-1 text-xs text-gray-500">
        {tasks.map((task, index) => (
          <div key={index} className="whitespace-nowrap">
            {task}
            {index < tasks.length - 1 && <span className="mx-1">•</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
