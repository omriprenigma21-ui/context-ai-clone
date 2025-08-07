"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArtifactRenderer } from "@/components/artifacts/ArtifactRenderer";
import { ReasoningStep } from "@/components/ReasoningStep";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ChatMessage } from "@/components/ChatMessage";
import { WorkingWithSection } from "@/components/WorkingWithSection";
import { TaskAnnotations } from "@/components/TaskAnnotations";
import { QuestionsTimeout } from "@/components/QuestionsTimeout";
import {
  Send,
  Mic,
  Paperclip,
  FileText,
  Share,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Clock
} from "lucide-react";

interface ChatSectionProps {
  isExpanded?: boolean;
  sidebarCollapsed?: boolean;
  panelWidth?: number;
}

const ChatSection = ({ isExpanded = true, sidebarCollapsed = false, panelWidth = 50 }: ChatSectionProps) => {
  const { state, startTask, completeTask, simulateProgress } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Auto-progress through reasoning steps
    if (state.currentPhase === "planning") {
      const timer = setTimeout(() => {
        simulateProgress();
      }, 3000);
      return () => clearTimeout(timer);
    } else if (state.currentPhase === "generating") {
      const timer = setTimeout(() => {
        completeTask();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.currentPhase, simulateProgress, completeTask]);

  const handleInputSubmit = (inputValue: string) => {
    if (inputValue.trim()) {
      startTask(inputValue.trim());
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-theme-sidebar border-l border-theme-sidebar flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="h-8 w-8 p-0 mb-4 text-theme-muted hover:text-theme-foreground hover:bg-theme-navigation"
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  const renderPlanningPhase = () => (
    <>
      {/* First Step - Using ReasoningStep component */}
      {state.reasoningSteps.length > 0 && (
        <ReasoningStep
          id={state.reasoningSteps[0].id}
          title={state.reasoningSteps[0].title}
          status={state.reasoningSteps[0].status}
          isExpanded={true}
          steps={state.reasoningSteps[0].steps}
          currentStep={state.reasoningSteps[0].currentStep}
        />
      )}

      {/* Progress Section - Using ProgressIndicator component */}
      <ProgressIndicator
        progressTime={state.progressTime}
        progressCount={state.progressCount}
        progressPercentage={25}
        tasks={["Research...", "Get curr...", "Gather..."]}
      />
    </>
  );

  const renderCompletedPhase = () => (
    <>
      {/* User Message */}
      <ChatMessage
        type="user"
        content={state.taskPrompt}
      />

      {/* AI Response with Full Conversation History */}
      <div className="space-y-4">
        <ChatMessage
          type="ai"
          content="I'll help you create a dynamic financial performance spreadsheet by pulling revenue data from both Salesforce and QuickBooks. Let me start by creating a comprehensive plan for this task."
        />

        {/* Plan Updated */}
        <ChatMessage
          type="system"
          content="Plan updated successfully"
          status="success"
        />

        {/* Show All Reasoning Steps from History */}
        <div className="space-y-3 my-6">
          {state.reasoningSteps.map((step, index) => (
            <ReasoningStep
              key={step.id}
              id={step.id}
              title={step.title}
              isExpanded={step.isExpanded}
              status={step.status}
              steps={step.steps}
              currentStep={step.currentStep}
              details={`Step ${index + 1} of ${state.reasoningSteps.length}`}
            />
          ))}
        </div>

        <ChatMessage
          type="ai"
          content="Now let me gather some essential information about your data requirements before proceeding with the integration."
        />

        {/* Questions Timed Out */}
        <QuestionsTimeout questionCount={4} />

        <ChatMessage
          type="ai"
          content="I'll proceed with reasonable defaults and create a comprehensive financial performance spreadsheet template that can work with both Salesforce and QuickBooks data. Let me start by setting up the integration framework and creating a dynamic spreadsheet."
        />

        {/* Multiple Plan Updates */}
        <div className="space-y-3">
          <ChatMessage
            type="system"
            content="Plan updated successfully"
            status="success"
          />

          <ChatMessage
            type="ai"
            content="Now I'll create the dynamic financial performance spreadsheet with comprehensive charts and trend analysis."
          />

          <ChatMessage
            type="system"
            content="Plan updated successfully"
            status="success"
          />
        </div>

        {/* Final Results */}
        <div className="space-y-4 mt-6">
          <ChatMessage
            type="ai"
            content="Perfect! I've successfully created a comprehensive dynamic financial performance spreadsheet that integrates revenue data from both Salesforce and QuickBooks. Let me provide you with a complete overview of what I've delivered:"
          />

          <h2 className="text-xl font-semibold text-theme-foreground mt-6 mb-2">📊 Dynamic Financial Performance Dashboard</h2>

          <p className="text-theme-foreground">I've created a comprehensive Excel spreadsheet with <strong>5 specialized sheets</strong> that provides deep insights into your revenue performance:</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-theme-foreground mb-2">Executive Summary Sheet</h3>
              <ul className="list-disc list-inside space-y-1 text-theme-foreground pl-4">
                <li><strong>Key Performance Indicators</strong>: Total revenue ($4.9M), average transaction value ($16,187), unique customers (16)</li>
                <li><strong>Revenue Source Breakdown</strong>: Salesforce (87%) vs QuickBooks (13%)</li>
                <li><strong>Recent Performance Metrics</strong>: Latest month trends and best performing periods</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-theme-foreground mb-2">Monthly Trends Sheet</h3>
              <ul className="list-disc list-inside space-y-1 text-theme-foreground pl-4">
                <li><strong>13 months of data</strong> with comprehensive trend analysis</li>
                <li><strong>Month-over-Month changes</strong> with conditional formatting (green for growth, red for decline)</li>
                <li><strong>Rolling averages</strong> (3-month and 6-month) for trend smoothing</li>
                <li><strong>Transaction volume and customer metrics</strong> by month</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-theme-foreground mb-2">Key Insights from the Data</h3>
              <ul className="list-disc list-inside space-y-1 text-theme-foreground pl-4">
                <li><strong>Total Revenue</strong>: $4,937,200.33 over 12 months</li>
                <li><strong>Peak Performance</strong>: July 2025 ($803,128.71)</li>
                <li><strong>Revenue Sources</strong>: Salesforce dominates with 87% contribution</li>
                <li><strong>Transaction Patterns</strong>: 305 total transactions with significant monthly variations</li>
              </ul>
            </div>
          </div>

          <p className="text-theme-foreground mt-4">The spreadsheet is now ready for immediate use and provides a solid foundation for ongoing financial performance monitoring and analysis!</p>
        </div>

        {/* Annotations */}
        <TaskAnnotations
          duration="670.03s"
          startTime="5:44:38 PM"
          endTime="5:55:48 PM"
        />

        {/* Artifacts */}
        <div className="border-t border-theme mt-4 pt-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {state.artifacts.slice(0, 2).map((artifact) => (
              <ArtifactRenderer
                key={artifact.id}
                artifact={artifact}
                size="small"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full bg-theme-background flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-theme-header bg-theme-header flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-theme-foreground">{state.taskTitle || "New Project"}</h2>
          <Button variant="ghost" size="sm" className="text-theme-muted hover:text-theme-foreground hover:bg-theme-navigation">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Chat Content - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="px-6 py-6 space-y-3">
            {/* Show different content based on expansion and phase */}
            {state.currentPhase === "completed" ? (
              renderCompletedPhase()
            ) : state.currentPhase === "planning" ? (
              renderPlanningPhase()
            ) : state.currentPhase === "generating" ? (
              <div className="space-y-4">
                {state.reasoningSteps.map((step, index) => (
                  <ReasoningStep
                    key={step.id}
                    id={step.id}
                    title={step.title}
                    isExpanded={step.isExpanded}
                    status={step.status}
                    steps={step.steps}
                    currentStep={step.currentStep}
                    details={`Step ${index + 1} of ${state.reasoningSteps.length}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-theme-muted">Processing...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Input Area */}
      <div className="flex-shrink-0 p-6 bg-theme-background">
        {/* New Input Container matching Context.ai exactly */}
        <div className="bg-theme-card rounded-2xl border border-theme shadow-sm overflow-hidden">
          {/* Working with section - inside the chatbox at top */}
          {state.currentPhase === "completed" && state.artifacts.length > 0 && (
            <div className="px-6 pt-4 pb-2 border-b border-theme">
              <div className="flex items-center gap-2 text-sm text-theme-muted">
                <span>Working with:</span>
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="bg-green-600 rounded-sm" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">B26</span>
                  <button className="ml-1 p-0.5 hover:bg-green-200 dark:hover:bg-green-800 rounded-full transition-colors">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6">
            <div className="relative mb-4">
              <textarea
                placeholder="Describe a task or @ for more options"
                className="w-full h-20 text-base text-theme-foreground border-none outline-none resize-none bg-transparent placeholder-theme-muted"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const textarea = e.target as HTMLTextAreaElement;
                    if (textarea.value.trim()) {
                      handleInputSubmit(textarea.value.trim());
                      textarea.value = '';
                    }
                  }
                }}
              />
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:text-theme-foreground hover:bg-theme-navigation rounded-lg">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:text-theme-foreground hover:bg-theme-navigation rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                    <line x1="8" x2="16" y1="21" y2="21"></line>
                    <line x1="12" x2="12" y1="17" y2="21"></line>
                  </svg>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:text-theme-foreground hover:bg-theme-navigation rounded-lg">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => {
                    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                    if (textarea && textarea.value.trim()) {
                      handleInputSubmit(textarea.value.trim());
                      textarea.value = '';
                    }
                  }}
                  className="h-10 w-10 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full border-0 p-0 text-white flex items-center justify-center transition-colors"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons - Below input area */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Show different buttons based on panel width */}
              {panelWidth > 60 ? (
                // Wide layout - show all buttons
                <>
                  <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                    <div className="flex items-center -space-x-1">
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-blue-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-green-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-orange-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">Integrations</span>
                  </Button>

                  <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="bg-theme-muted rounded-sm" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Templates</span>
                  </Button>

                  <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M14 4.1 12 6"></path>
                      <path d="m5.1 8-2.9-.8"></path>
                      <path d="m6 12-1.9 2"></path>
                      <path d="M7.2 2.2 8 5.1"></path>
                      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a .5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a .5.5 0 0 1-.95.074z"></path>
                    </svg>
                    <span className="text-sm font-medium">Check-in Frequency</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Button>
                </>
              ) : panelWidth > 40 ? (
                // Medium layout - show integrations and templates
                <>
                  <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                    <div className="flex items-center -space-x-1">
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-blue-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-green-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                      <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-orange-500 p-[1px]">
                        <div className="h-[10px] w-[10px] bg-white rounded-full" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">Integrations</span>
                  </Button>

                  <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="bg-theme-muted rounded-sm" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Templates</span>
                  </Button>
                </>
              ) : (
                // Narrow layout - show only integrations
                <Button variant="ghost" className="bg-theme-muted text-theme-foreground h-10 px-4 rounded-xl flex items-center gap-2 shadow-none hover:bg-theme-navigation border-0">
                  <div className="flex items-center -space-x-1">
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-blue-500 p-[1px]">
                      <div className="h-[10px] w-[10px] bg-white rounded-full" />
                    </div>
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-green-500 p-[1px]">
                      <div className="h-[10px] w-[10px] bg-white rounded-full" />
                    </div>
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-orange-500 p-[1px]">
                      <div className="h-[10px] w-[10px] bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-sm font-medium">Integrations</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <p className="text-xs text-theme-muted text-center mt-4">
          Context can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatSection;
