import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Filter,
  MoreHorizontal,
  Plus,
  Grid3X3,
  Archive,
  Bell,
  FileText,
  Circle,
  BarChart3,
  Clock
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in-progress' | 'todo' | 'backlog';
  type?: 'feature' | 'bug' | 'task';
}

const mockIssues: Issue[] = [
  {
    id: "PRE-20",
    title: "Enhance KGApiAdapter with Age Viewer Data Formats",
    assignee: { name: "fouad.omri", initials: "FO", avatar: "/avatars/fo.jpg" },
    dueDate: "Jun 24",
    priority: "medium",
    status: "in-progress",
    type: "feature"
  },
  {
    id: "PRE-18",
    title: "Alerts: Smart Notification & Alert Management System",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 18",
    priority: "medium",
    status: "todo",
    type: "feature"
  },
  {
    id: "PRE-17",
    title: "Reports: Interactive Audit & Compliance Interface",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 18",
    priority: "medium",
    status: "todo",
    type: "feature"
  },
  {
    id: "PRE-1",
    title: "Welcome to Linear 👋",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-16",
    title: "Graphs: Network Visualizations with Reagraph",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 18",
    priority: "medium",
    status: "todo",
    type: "feature"
  },
  {
    id: "PRE-20",
    title: "QA: Testing, Performance & Production Deployment",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 18",
    priority: "medium",
    status: "todo",
    type: "feature"
  },
  {
    id: "PRE-19",
    title: "Mobile: Responsive Interface with Voice Integration",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 18",
    priority: "medium",
    status: "todo",
    type: "feature"
  },
  {
    id: "PRE-4",
    title: "Connect GitHub or GitLab",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-5",
    title: "Customize settings",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-2",
    title: "3 ways to navigate Linear: Command menu, keyboard or mouse",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-3",
    title: "Connect to Slack",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-9",
    title: "Next steps",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-6",
    title: "Use Cycles to focus work over n-weeks",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-8",
    title: "Invite your teammates",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-7",
    title: "Use Projects to organize work for features or releases",
    dueDate: "Jun 18",
    priority: "low",
    status: "todo",
    type: "task"
  },
  {
    id: "PRE-132",
    title: "Design Neurosymbolic Engine Architecture",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 28",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-131",
    title: "Analyze Existing Semantic Reasoning Engine and Agent Orchestration Architecture",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 28",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-130",
    title: "Configure WrenAI with Disabled Authentication for Internal Use",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 28",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-118",
    title: "Create WrenAI SDK for Agent Orchestration Integration",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 28",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-62",
    title: "Create Onyx SDK for Agent Orchestration Integration",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 25",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-61",
    title: "Configure Onyx with Disabled Authentication for Internal Use",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 25",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-44",
    title: "Permissions: Visual Access Control System",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 22",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-42",
    title: "Backend: Healthcare Data Integration & FHIR Engine",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 22",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-41",
    title: "Integration Config: Three-Tier Setup System",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 22",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-40",
    title: "Visual Workspace: Canvas Integration Designer",
    assignee: { name: "phanes", initials: "PH" },
    dueDate: "Jun 22",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-38",
    title: "Resolve Keycloak Multi-Tenant Configuration Issues",
    assignee: { name: "predapp_backend", initials: "PB" },
    dueDate: "Jun 22",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-26",
    title: "Task 3.2: Implement Advanced Reasoning Engine Integration for Intelligent Decision Making",
    assignee: { name: "prenigma", initials: "PN" },
    dueDate: "Jun 19",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-22",
    title: "Task 1.2: Implement Industry Data Integration and Learning System",
    assignee: { name: "prenigma", initials: "PN" },
    dueDate: "Jun 19",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-24",
    title: "Task 2.2: Implement Intelligent Data Model Mapping and API Gateway Generation System",
    assignee: { name: "prenigma", initials: "PN" },
    dueDate: "Jun 19",
    priority: "high",
    status: "backlog",
    type: "feature"
  },
  {
    id: "PRE-23",
    title: "Task 2.1: Design and Implement Amis Pattern Library and Generation Rules Engine",
    assignee: { name: "prenigma", initials: "PN" },
    dueDate: "Jun 19",
    priority: "high",
    status: "backlog",
    type: "feature"
  }
];

function PriorityIcon({ priority }: { priority: string }) {
  switch (priority) {
    case 'high':
      return <div className="w-3 h-3 bg-orange-500 rounded-sm flex-shrink-0" />;
    case 'medium':
      return <Circle className="w-3 h-3 text-gray-400 flex-shrink-0" />;
    case 'low':
      return <BarChart3 className="w-3 h-3 text-gray-400 flex-shrink-0" />;
    default:
      return <Circle className="w-3 h-3 text-gray-400 flex-shrink-0" />;
  }
}

function IssueItem({ issue }: { issue: Issue }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-md group">
      <PriorityIcon priority={issue.priority} />

      <span className="text-sm text-gray-500 font-mono min-w-[4rem]">
        {issue.id}
      </span>

      <span className="flex-1 text-sm text-gray-900 truncate">
        {issue.title}
      </span>

      <div className="flex items-center gap-2">
        {issue.assignee && (
          <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200">
            {issue.assignee.name}
          </Badge>
        )}

        <span className="text-xs text-gray-500 min-w-[3rem]">
          {issue.dueDate}
        </span>
      </div>
    </div>
  );
}

function StatusSection({
  title,
  count,
  issues,
  icon: Icon
}: {
  title: string;
  count: number;
  issues: Issue[];
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm text-gray-500">{count}</span>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectManagement() {
  const inProgressIssues = mockIssues.filter(issue => issue.status === 'in-progress');
  const todoIssues = mockIssues.filter(issue => issue.status === 'todo');
  const backlogIssues = mockIssues.filter(issue => issue.status === 'backlog');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="all-issues" className="w-auto">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="all-issues"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-3 py-1.5 text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  All issues
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-3 py-1.5 text-sm"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="backlog"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-3 py-1.5 text-sm"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Backlog
                </TabsTrigger>
                <TabsTrigger
                  value="more"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-3 py-1.5 text-sm"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-sm">
                <Bell className="w-4 h-4 mr-2" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                <FileText className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" className="text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>

              <Button variant="ghost" size="sm" className="text-sm">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Display
              </Button>
            </div>

            {/* Status Sections */}
            <div className="space-y-6">
              <StatusSection
                title="In Progress"
                count={inProgressIssues.length}
                issues={inProgressIssues}
                icon={Clock}
              />

              <StatusSection
                title="Todo"
                count={todoIssues.length}
                issues={todoIssues}
                icon={Circle}
              />

              <StatusSection
                title="Backlog"
                count={backlogIssues.length}
                issues={backlogIssues}
                icon={Archive}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-gray-200 pl-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">All issues</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-teal-700">P</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Predapp</div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0 ml-auto">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-medium">
                <div>Assignees</div>
                <div>Labels</div>
                <div>Priority</div>
                <div>Projects</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs">NA</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-600">No assignee</span>
                  </div>
                  <div></div>
                  <div></div>
                  <div className="text-gray-500">152</div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs bg-purple-100 text-purple-700">FO</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-900">fouad.omri</span>
                  </div>
                  <div></div>
                  <div></div>
                  <div className="text-gray-500">29</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
