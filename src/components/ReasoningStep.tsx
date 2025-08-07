"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  Clock
} from "lucide-react";

interface ReasoningStepProps {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  isExpanded?: boolean;
  steps?: string[];
  currentStep?: number;
  duration?: string;
  details?: string;
}

export const ReasoningStep = ({
  id,
  title,
  status,
  isExpanded = false,
  steps = [],
  currentStep = 0,
  duration,
  details
}: ReasoningStepProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Circle className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <Circle className="w-4 h-4 text-gray-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStepIcon = (stepIndex: number) => {
    if (status === "completed" || (status === "in-progress" && stepIndex < currentStep)) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (status === "in-progress" && stepIndex === currentStep) {
      return <Circle className="w-4 h-4 text-blue-500" />;
    } else {
      return <Circle className="w-4 h-4 text-gray-300" />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <span className={`font-medium text-sm ${status === "pending" ? "text-gray-400" : "text-gray-900"}`}>
              {title}
            </span>
            {duration && (
              <div className="flex items-center text-xs text-gray-500 ml-2">
                <Clock className="w-3 h-3 mr-1" />
                {duration}
              </div>
            )}
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-gray-200 bg-white">
            <div className="py-3">
              {details && (
                <p className="text-sm text-gray-600 mb-3">{details}</p>
              )}

              {steps.length > 0 && (
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      {getStepIcon(index)}
                      <span className={`${
                        status === "completed" || (status === "in-progress" && index <= currentStep)
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {steps.length === 0 && !details && (
                <div className="text-sm text-gray-500">
                  Step details will be populated...
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
