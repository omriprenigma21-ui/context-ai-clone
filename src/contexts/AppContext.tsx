"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { financialSampleData } from "@/data/financial-sample";

export interface ReasoningStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  isExpanded: boolean;
  steps: string[];
  currentStep?: number;
}

interface AppState {
  currentPhase: "initial" | "planning" | "generating" | "completed";
  taskPrompt: string;
  taskTitle: string;
  reasoningSteps: ReasoningStep[];
  progressTime: string;
  progressCount: number;
  artifacts: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
    data?: any; // Added to store actual document data
  }[];
}

interface AppContextType {
  state: AppState;
  startTask: (prompt: string) => void;
  simulateProgress: () => void;
  completeTask: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const createDefaultAppState = (): AppState => {
  const date = new Date();
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return {
    currentPhase: "initial",
    taskPrompt: "",
    taskTitle: "",
    reasoningSteps: [],
    progressTime: "00:10:25",
    progressCount: 0,
    artifacts: [],
  };
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(createDefaultAppState());

  const startTask = (prompt: string) => {
    let title = prompt;
    if (title.length > 60) {
      title = title.substring(0, 57) + "...";
    }

    setState({
      ...state,
      currentPhase: "planning",
      taskPrompt: prompt,
      taskTitle: title,
      reasoningSteps: [
        {
          id: "step1",
          title: "Planning the Task",
          status: "in-progress",
          isExpanded: true,
          steps: [
            "Analyzing task requirements",
            "Identifying necessary data sources",
            "Creating a structured approach",
            "Preparing to gather information"
          ],
          currentStep: 1
        }
      ]
    });
  };

  const simulateProgress = () => {
    setState((prevState) => {
      // Add a new reasoning step
      const newStep = {
        id: `step${prevState.reasoningSteps.length + 1}`,
        title: prevState.reasoningSteps.length === 1
          ? "Gathering Financial Data"
          : "Processing Financial Information",
        status: "in-progress" as const,
        isExpanded: true,
        steps: prevState.reasoningSteps.length === 1
          ? [
              "Connecting to Salesforce API",
              "Retrieving revenue data",
              "Accessing QuickBooks transactions",
              "Compiling financial metrics"
            ]
          : [
              "Calculating performance metrics",
              "Creating data visualizations",
              "Generating financial insights",
              "Preparing final report"
            ],
        currentStep: 1
      };

      // Update previous step status
      const updatedSteps = prevState.reasoningSteps.map(step => ({
        ...step,
        status: "completed" as const,
        currentStep: step.steps.length
      }));

      return {
        ...prevState,
        currentPhase: prevState.reasoningSteps.length >= 2 ? "generating" : "planning",
        reasoningSteps: [...updatedSteps, newStep],
        progressCount: prevState.progressCount + 1
      };
    });
  };

  const completeTask = () => {
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    setState((prevState) => {
      // Mark all reasoning steps as completed
      const completedSteps = prevState.reasoningSteps.map(step => ({
        ...step,
        status: "completed" as const,
        currentStep: step.steps.length
      }));

      // Generate artifacts with actual sample data
      const newArtifacts = [
        {
          id: "spreadsheet-1",
          name: "Financial_Performance_Dashboard.xlsx",
          type: "spreadsheet" as const,
          createdAt: formattedDate,
          size: "245 KB",
          data: financialSampleData // Actual spreadsheet data
        },
        {
          id: "document-1",
          name: "Financial_Analysis_Report.docx",
          type: "document" as const,
          createdAt: formattedDate,
          size: "132 KB"
        },
        {
          id: "presentation-1",
          name: "Revenue_Presentation.pptx",
          type: "presentation" as const,
          createdAt: formattedDate,
          size: "1.8 MB"
        },
        {
          id: "spreadsheet-2",
          name: "Salesforce_Revenue_Data.xlsx",
          type: "spreadsheet" as const,
          createdAt: formattedDate,
          size: "178 KB"
        },
        {
          id: "spreadsheet-3",
          name: "QuickBooks_Transactions.xlsx",
          type: "spreadsheet" as const,
          createdAt: formattedDate,
          size: "120 KB"
        }
      ];

      return {
        ...prevState,
        currentPhase: "completed",
        reasoningSteps: completedSteps,
        artifacts: newArtifacts,
        progressCount: prevState.progressCount + 1
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        startTask,
        simulateProgress,
        completeTask
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
