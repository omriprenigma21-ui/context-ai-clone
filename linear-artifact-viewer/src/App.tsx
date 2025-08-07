import { useState } from 'react';
import { AdvancedLinearArtifactViewer, type ProjectData, type ProjectIssue, type ProjectTemplate } from './components/AdvancedLinearArtifactViewer';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { CommandIcon, Palette, FileType, Zap, Code2, Megaphone, Microscope } from 'lucide-react';

// Enhanced sample project data with custom fields
const sampleProjectData: ProjectData = {
  name: "AI Platform Development",
  icon: "🤖",
  issues: [
    {
      id: "AI-001",
      title: "Implement Neural Network Architecture",
      description: "Design and implement the core neural network for the AI platform",
      assignee: { name: "fouad.omri", initials: "FO", isOnline: true },
      dueDate: "Jun 24",
      priority: "high",
      status: "in-progress",
      type: "feature",
      labels: ["ai", "architecture"],
      createdAt: "2024-06-15T09:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z",
      customFields: {
        story_points: 8,
        sprint: "Sprint 2",
        tech_debt: false,
        reviewer: "tech_lead"
      }
    },
    {
      id: "AI-002",
      title: "User Authentication & Authorization",
      description: "Secure user management system with role-based access control",
      assignee: { name: "security_team", initials: "ST", isOnline: false },
      dueDate: "Jun 19",
      priority: "high",
      status: "in-progress",
      type: "feature",
      labels: ["security", "authentication"],
      createdAt: "2024-06-18T09:00:00Z",
      customFields: {
        story_points: 5,
        sprint: "Sprint 1",
        tech_debt: false,
        reviewer: "security_lead"
      }
    },
    {
      id: "AI-003",
      title: "API Gateway Configuration",
      description: "Set up API gateway for microservices communication",
      assignee: { name: "backend_team", initials: "BT", isOnline: true },
      dueDate: "Jun 25",
      priority: "medium",
      status: "todo",
      type: "task",
      labels: ["api", "infrastructure"],
      customFields: {
        story_points: 3,
        sprint: "Sprint 2",
        tech_debt: true
      }
    },
    {
      id: "AI-004",
      title: "Machine Learning Model Training Pipeline",
      description: "Automated pipeline for training and deploying ML models",
      assignee: { name: "ml_team", initials: "ML", isOnline: true },
      dueDate: "Jun 30",
      priority: "high",
      status: "todo",
      type: "epic",
      labels: ["ml", "pipeline"],
      customFields: {
        story_points: 13,
        sprint: "Sprint 3",
        tech_debt: false
      }
    },
    {
      id: "AI-005",
      title: "Fix memory leak in data processing",
      description: "Critical bug causing memory issues in large dataset processing",
      assignee: { name: "performance_team", initials: "PT", isOnline: false },
      dueDate: "Jun 20",
      priority: "high",
      status: "todo",
      type: "bug",
      labels: ["performance", "critical"],
      customFields: {
        story_points: 2,
        sprint: "Sprint 1",
        tech_debt: true
      }
    }
  ],
  assignees: [
    { name: "fouad.omri", initials: "FO", issueCount: 3, isOnline: true },
    { name: "security_team", initials: "ST", issueCount: 2, isOnline: false },
    { name: "backend_team", initials: "BT", issueCount: 4, isOnline: true },
    { name: "ml_team", initials: "ML", issueCount: 3, isOnline: true },
    { name: "performance_team", initials: "PT", issueCount: 1, isOnline: false }
  ]
};

// Sample real-time collaboration users
const realTimeUsers = [
  { name: "Alice Johnson", avatar: "", isViewing: true },
  { name: "Bob Smith", avatar: "", isViewing: true },
  { name: "Carol Davis", avatar: "", isViewing: false },
  { name: "David Wilson", avatar: "", isViewing: true },
  { name: "Eva Chen", avatar: "", isViewing: true }
];

function App() {
  const [projectData, setProjectData] = useState(sampleProjectData);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [currentTemplate, setCurrentTemplate] = useState<ProjectTemplate | undefined>();

  const handleIssueUpdate = (issueId: string, updates: Partial<ProjectIssue>) => {
    setProjectData(prev => ({
      ...prev,
      issues: prev.issues.map(issue =>
        issue.id === issueId
          ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
          : issue
      )
    }));

    setLastUpdate(`Issue ${issueId} updated: ${Object.keys(updates).join(', ')}`);

    // Clear the update message after 3 seconds
    setTimeout(() => setLastUpdate(""), 3000);
  };

  const handleTemplateChange = (template: ProjectTemplate) => {
    setCurrentTemplate(template);
    setProjectData(prev => ({
      ...prev,
      template,
      customFields: template.customFields
    }));
    setLastUpdate(`Template changed to: ${template.name}`);
    setTimeout(() => setLastUpdate(""), 3000);
  };

  return (
    <div className="App">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🚀 Advanced Linear Artifact Viewer
              </h1>
              <p className="text-sm text-gray-700 mt-1">
                Command palette, custom fields, project templates, and enterprise-grade features
              </p>
            </div>

            <div className="flex items-center gap-4">
              {lastUpdate && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                  ✨ {lastUpdate}
                </Badge>
              )}

              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Enterprise Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CommandIcon className="w-5 h-5" />
                  Command Palette
                </CardTitle>
                <CardDescription>
                  Linear-style command system for power users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono">⌘K</Badge>
                  <span>Open command palette</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono">⌘⇧L</Badge>
                  <span>Switch to List view</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono">⌘⇧K</Badge>
                  <span>Switch to Kanban view</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Palette className="w-5 h-5" />
                  Custom Fields
                </CardTitle>
                <CardDescription>
                  Industry-specific data collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>• Text, Number, Select, Date fields</div>
                <div>• Currency, URL, Checkbox options</div>
                <div>• User assignment & validation rules</div>
                <div>• Multi-select with custom options</div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <FileType className="w-5 h-5" />
                  Project Templates
                </CardTitle>
                <CardDescription>
                  Pre-configured industry workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Software Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4" />
                  <span>Marketing Campaign</span>
                </div>
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  <span>Research Project</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-sm">Quick Actions:</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span>Press <Badge variant="secondary" className="font-mono">⌘K</Badge> for commands</span>
              <span>•</span>
              <span>Click <Badge variant="secondary">Custom Fields</Badge> gear icons</span>
              <span>•</span>
              <span>Try <Badge variant="secondary">Template Selector</Badge></span>
              <span>•</span>
              <span>Drag & drop issues between sections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Artifact Viewer */}
      <AdvancedLinearArtifactViewer
        data={projectData}
        onIssueUpdate={handleIssueUpdate}
        onTemplateChange={handleTemplateChange}
        realTimeUsers={realTimeUsers}
      />

      {/* Advanced Features Documentation */}
      <div className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Enterprise Features Guide
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <CommandIcon className="w-5 h-5" />
                Command Palette
              </h3>
              <div className="space-y-2 text-gray-300">
                <div><Badge variant="secondary" className="mr-2 font-mono">⌘K</Badge>Open command palette</div>
                <div><Badge variant="secondary" className="mr-2 font-mono">⌘⇧L</Badge>List view</div>
                <div><Badge variant="secondary" className="mr-2 font-mono">⌘⇧K</Badge>Kanban view</div>
                <div><Badge variant="secondary" className="mr-2 font-mono">⌘⇧T</Badge>Timeline view</div>
                <div><Badge variant="secondary" className="mr-2 font-mono">⌘⇧C</Badge>Calendar view</div>
                <div className="pt-2 text-blue-200">
                  • Quick filters and actions<br/>
                  • Template switching<br/>
                  • Issue creation shortcuts
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Custom Fields System
              </h3>
              <div className="space-y-2 text-gray-300">
                <div><strong>Field Types:</strong></div>
                <div>• Text & Number inputs</div>
                <div>• Single & Multi-select dropdowns</div>
                <div>• Date pickers & URL fields</div>
                <div>• Currency with validation</div>
                <div>• Checkboxes & User assignments</div>
                <div className="pt-2 text-purple-200">
                  • Industry-specific data collection<br/>
                  • Validation rules & requirements<br/>
                  • Export with custom field data
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <FileType className="w-5 h-5" />
                Project Templates
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <strong>Software Development</strong>
                </div>
                <div className="ml-6 text-sm">Story points, sprints, code review</div>

                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4" />
                  <strong>Marketing Campaign</strong>
                </div>
                <div className="ml-6 text-sm">Budget, audience, channels, approval</div>

                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  <strong>Research Project</strong>
                </div>
                <div className="ml-6 text-sm">Methodology, ethics, publications</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-orange-300 mb-3">🎯 Power User Features</h3>
              <div className="space-y-1 text-gray-300">
                <div>• Bulk issue operations</div>
                <div>• Advanced filtering combinations</div>
                <div>• Custom field sorting</div>
                <div>• Template-based workflows</div>
                <div>• Keyboard-only navigation</div>
                <div>• Enhanced export options</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-red-300 mb-3">📊 Analytics & Reporting</h3>
              <div className="space-y-1 text-gray-300">
                <div>• Custom field data in exports</div>
                <div>• Template-specific metrics</div>
                <div>• Real-time collaboration stats</div>
                <div>• Sprint velocity tracking</div>
                <div>• Budget & resource analysis</div>
                <div>• Research progress reports</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-300 mb-3">🔧 Integration & API</h3>
              <div className="space-y-1 text-gray-300">
                <div>• TypeScript interfaces</div>
                <div>• Agent data transformation</div>
                <div>• Custom field validation</div>
                <div>• Template API endpoints</div>
                <div>• Webhook integrations</div>
                <div>• SSO & enterprise auth</div>
              </div>
            </div>
          </div>

          {/* Template Showcase */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Template Showcase</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💻</span>
                  <span className="font-medium">Software Development</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Story Points (1-21 scale)</div>
                  <div>• Sprint Assignment</div>
                  <div>• Technical Debt Tracking</div>
                  <div>• Code Reviewer Assignment</div>
                  <div>• Repository Links</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📢</span>
                  <span className="font-medium">Marketing Campaign</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Budget Tracking ($)</div>
                  <div>• Target Audience Selection</div>
                  <div>• Marketing Channel Mix</div>
                  <div>• Launch Date Planning</div>
                  <div>• Legal Approval Status</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔬</span>
                  <span className="font-medium">Research Project</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Research Methodology</div>
                  <div>• Sample Size Tracking</div>
                  <div>• Ethics Approval Required</div>
                  <div>• Funding Source</div>
                  <div>• Publication Targets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
