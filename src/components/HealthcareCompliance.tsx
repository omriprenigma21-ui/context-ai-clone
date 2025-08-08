"use client";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReasoningStep } from "@/components/ReasoningStep";
import { ChatMessage } from "@/components/ChatMessage";
import { WorkingWithSection } from "@/components/WorkingWithSection";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  MapPin,
  Calendar,
  FileText,
  Stethoscope,
  Shield,
  Settings,
  Activity,
  TrendingUp,
  DollarSign,
  Zap,
  Send,
  Mic,
  Paperclip
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const HealthcareCompliance = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [executingAction, setExecutingAction] = useState(false);
  const [drivePanelWidth, setDrivePanelWidth] = useState(50); // 50% default - equal panels
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      let newWidth = (mouseX / containerRect.width) * 100;

      // Allow full range dragging but with smart snapping zones
      if (newWidth < 12) {
        newWidth = 0; // Snap to full left (hide drive panel)
      } else if (newWidth > 88) {
        newWidth = 100; // Snap to full right (hide chat panel)
      } else {
        // Allow the full range but prefer the 15-85 range for normal use
        newWidth = Math.max(0, Math.min(100, newWidth));
        // Snap to reasonable bounds if close
        if (newWidth > 0 && newWidth < 15) {
          newWidth = 15;
        } else if (newWidth > 85 && newWidth < 100) {
          newWidth = 85;
        }
      }

      setDrivePanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const chatPanelWidth = 100 - drivePanelWidth;

  const executeQuickFix = () => {
    setExecutingAction(true);
    // Simulate execution
    setTimeout(() => {
      setExecutingAction(false);
      setSelectedAction("executed");
    }, 2000);
  };

  const healthcareReasoningSteps = [
    {
      id: "step1",
      title: "Compliance Agent - CMS Quality Measure Detection",
      status: "completed" as const,
      isExpanded: true,
      steps: [
        "Age &gt;65 + pneumonia diagnosis confirmed",
        "No contraindications found in medical history",
        "CMS measure PN-6 vaccination requirement triggered",
        "Vaccine orders prepared for immediate scheduling"
      ],
      currentStep: 4,
      duration: "2.1s"
    },
    {
      id: "step2",
      title: "Clinical Agent - Drug Interaction Analysis",
      status: "completed" as const,
      isExpanded: true,
      steps: [
        "Current medication list reviewed",
        "No steroid conflict detected",
        "Safe with current prescriptions",
        "Added to Medication Administration Record (MAR)"
      ],
      currentStep: 4,
      duration: "1.8s"
    },
    {
      id: "step3",
      title: "Discharge Agent - Documentation & Checklist Update",
      status: "in-progress" as const,
      isExpanded: true,
      steps: [
        "Discharge checklist updated with vaccination status",
        "Insurance verification completed",
        "Pharmacy notification sent",
        "Patient education materials generated"
      ],
      currentStep: 2,
      duration: "0.9s"
    }
  ];

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="relative flex w-full flex-1 flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Compliance Alerts
            </Button>
          </div>

          {/* Alert Banner */}
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-orange-900">
                  Vaccination Required Before Discharge - Pneumology Patient #7823
                </h2>
                <p className="text-sm text-orange-700 mt-1">
                  Updated 5 minutes ago • Dr. Elena Kalimera • AI Confidence: 96%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden h-full">
          <div
            ref={containerRef}
            className="relative flex min-w-0 flex-1 overflow-hidden h-full"
            data-chat-container="true"
          >
            {/* Left Panel - Patient Context & Actions */}
            <div
              className="bg-white min-w-0 shrink-0 grow-0 overflow-hidden"
              style={{
                width: `${drivePanelWidth}%`,
                display: drivePanelWidth === 0 ? 'none' : 'block',
                marginRight: drivePanelWidth === 100 ? '60px' : '0px'
              }}
            >
              <div className="h-full overflow-y-auto p-6 space-y-6">
                {/* Patient Context */}
                <Card className="p-6 border-l-4 border-l-blue-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Patient Context</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">Margaret Chen, 68y</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-700">Pneumology Day 5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Dx: COPD exacerbation + Pneumonia</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Discharge planned: 2-3 days</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Missing: Pneumococcal & Flu vaccines</span>
                    </div>
                  </div>
                </Card>

                {/* Prepared Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Prepared Actions
                  </h3>

                  <div className="space-y-4">
                    {/* Quick Fix Option */}
                    <Card className={`p-6 cursor-pointer transition-all border-2 ${
                      selectedAction === "quick" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`} onClick={() => setSelectedAction("quick")}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-gray-900">Quick Fix (Recommended)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>5 min</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">What agents will do:</p>
                        <ul className="text-sm text-gray-600 space-y-1 ml-4">
                          <li>• Order both vaccines for today</li>
                          <li>• Schedule nurse administration</li>
                          <li>• Update discharge checklist</li>
                          <li>• Document in CMS reporting</li>
                          <li>• Generate patient education</li>
                        </ul>

                        <div className="flex items-center space-x-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Impact: Quality Score 83% → 96% ↑</span>
                        </div>

                        {selectedAction === "quick" && (
                          <Button
                            onClick={executeQuickFix}
                            disabled={executingAction}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                          >
                            {executingAction ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Executing...</span>
                              </div>
                            ) : (
                              <>Execute Quick Fix ✓</>
                            )}
                          </Button>
                        )}
                      </div>
                    </Card>

                    {/* Standard Assessment */}
                    <Card className={`p-4 cursor-pointer transition-all border ${
                      selectedAction === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`} onClick={() => setSelectedAction("standard")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">Standard Assessment</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>15 min</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">+ Comprehensive education</p>
                    </Card>

                    {/* Comprehensive Review */}
                    <Card className={`p-4 cursor-pointer transition-all border ${
                      selectedAction === "comprehensive" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`} onClick={() => setSelectedAction("comprehensive")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Activity className="w-4 h-4 text-purple-600" />
                          <span className="font-medium text-gray-900">Comprehensive Review</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>30 min</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">+ Vaccine history audit</p>
                    </Card>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between mt-6">
                    <WorkingWithSection artifacts={[
                      {
                        id: "compliance-report",
                        name: "CMS_Compliance_Report",
                        type: "document",
                        metadata: { pages: 3, wordCount: 1245 }
                      },
                      {
                        id: "vaccine-orders",
                        name: "Vaccination_Orders",
                        type: "spreadsheet",
                        metadata: { records: 2 }
                      }
                    ]} />
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Defer</Button>
                      <Button variant="outline" size="sm">Contraindication</Button>
                      <Button variant="outline" size="sm">View Guidelines</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resizable Handle */}
            <div
              className={`group absolute top-0 z-50 flex h-full items-center justify-center select-none cursor-ew-resize ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'bg-gray-50/80' : ''
              }`}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
              style={{
                left: drivePanelWidth === 0
                  ? '0px'
                  : drivePanelWidth === 100
                  ? 'calc(100% - 60px)'
                  : `calc(${drivePanelWidth}% - 6px)`,
                width: drivePanelWidth === 0 || drivePanelWidth === 100 ? '60px' : '12px',
                zIndex: 60
              }}
              onMouseDown={handleMouseDown}
            >
              <div className={`handle-bar group/bar absolute top-0 h-full w-2 ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'left-1/2 -translate-x-1/2' : 'left-0'
              }`}>
                <div className="bg-surface-container-high h-full w-full transition-transform duration-100 group-hover/bar:scale-x-100 group-hover/bar:delay-100 scale-x-0"></div>
              </div>

              <div className={`absolute top-1/2 z-30 flex -translate-y-[50%] items-center justify-center transition-transform duration-200 ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'translate-x-0' : 'translate-x-3'
              }`}>
                <div className="z-30 flex h-15 w-full flex-col items-center justify-center">
                  <button
                    aria-label="resize panels"
                    role="button"
                    className={`group flex h-full w-full flex-col items-center justify-center p-2.5 ${
                      drivePanelWidth === 0 || drivePanelWidth === 100 ? 'cursor-pointer' : 'cursor-grab'
                    }`}
                    type="button"
                    tabIndex={0}
                    onClick={(e) => {
                      if (drivePanelWidth === 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        setDrivePanelWidth(50);
                      } else if (drivePanelWidth === 100) {
                        e.preventDefault();
                        e.stopPropagation();
                        setDrivePanelWidth(50);
                      }
                    }}
                  >
                    <div
                      className="bg-surface-container-high relative w-[6px] rounded-t"
                      style={{
                        height: '28px',
                        background: 'var(--surface-container-high)',
                        transform: drivePanelWidth === 0
                          ? 'translateY(1.5px) rotate(-13deg)'
                          : drivePanelWidth === 100
                          ? 'translateY(1.5px) rotate(13deg)'
                          : 'translateY(1px)',
                        transformOrigin: '50% 0% 0px'
                      }}
                    ></div>
                    <div
                      className="bg-surface-container-high relative w-[6px] rounded-b"
                      style={{
                        height: '28px',
                        background: 'var(--surface-container-high)',
                        transform: drivePanelWidth === 0
                          ? 'translateY(-1.5px) rotate(13deg)'
                          : drivePanelWidth === 100
                          ? 'translateY(-1.5px) rotate(-13deg)'
                          : 'translateY(-1px)',
                        transformOrigin: '50% 100% 0px'
                      }}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Chat with AI Reasoning */}
            <div
              className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white"
              style={{
                width: `${chatPanelWidth}%`,
                display: chatPanelWidth === 0 ? 'none' : 'flex',
                marginLeft: drivePanelWidth === 0 ? '60px' : '0px',
                marginRight: drivePanelWidth === 0 ? '120px' : '0px',
                paddingLeft: drivePanelWidth === 0 ? '80px' : '0px',
                paddingRight: drivePanelWidth === 0 ? '80px' : '0px'
              }}
            >
              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* AI Response */}
                <ChatMessage
                  type="ai"
                  content="I've detected a compliance alert for Patient #7823. Let me analyze the vaccination requirements and prepare the necessary actions for immediate implementation."
                />

                {/* AI Reasoning Steps */}
                <div className="space-y-4">
                  {healthcareReasoningSteps.map((step) => (
                    <ReasoningStep
                      key={step.id}
                      id={step.id}
                      title={step.title}
                      status={step.status}
                      isExpanded={step.isExpanded}
                      steps={step.steps}
                      currentStep={step.currentStep}
                      duration={step.duration}
                    />
                  ))}
                </div>

                <ChatMessage
                  type="ai"
                  content="Analysis complete. The Quick Fix option will ensure CMS compliance while preventing a potential $2,100 penalty. All necessary orders have been prepared and safety checks completed. Select your preferred action from the left panel."
                />

                {/* Impact Summary */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">Clinical Impact Summary:</span>
                  </div>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-3 h-3" />
                      <span>68% reduction in flu hospitalization risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3" />
                      <span>CMS quality measure compliance achieved</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-3 h-3" />
                      <span>Prevents $2,100 penalty assessment</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Ask about this compliance alert or request modifications..."
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      disabled
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthcareCompliance;
