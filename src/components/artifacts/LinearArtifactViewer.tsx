import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export interface ProjectIssue {
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

export interface ProjectData {
  name: string;
  icon?: string;
  issues: ProjectIssue[];
  assignees?: Array<{
    name: string;
    initials: string;
    avatar?: string;
    issueCount: number;
  }>;
}

interface LinearArtifactViewerProps {
  data: ProjectData;
  className?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
}

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

function IssueItem({ issue }: { issue: ProjectIssue }) {
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
  issues: ProjectIssue[];
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

export function LinearArtifactViewer({
  data,
  className = "",
  showHeader = true,
  showSidebar = true
}: LinearArtifactViewerProps) {
  const inProgressIssues = data.issues.filter(issue => issue.status === 'in-progress');
  const todoIssues = data.issues.filter(issue => issue.status === 'todo');
  const backlogIssues = data.issues.filter(issue => issue.status === 'backlog');

  // Calculate assignee stats
  const unassignedCount = data.issues.filter(issue => !issue.assignee).length;
  const assigneeStats = data.assignees || [];

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Header */}
      {showHeader && (
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
      )}

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
              {inProgressIssues.length > 0 && (
                <StatusSection
                  title="In Progress"
                  count={inProgressIssues.length}
                  issues={inProgressIssues}
                  icon={Clock}
                />
              )}

              {todoIssues.length > 0 && (
                <StatusSection
                  title="Todo"
                  count={todoIssues.length}
                  issues={todoIssues}
                  icon={Circle}
                />
              )}

              {backlogIssues.length > 0 && (
                <StatusSection
                  title="Backlog"
                  count={backlogIssues.length}
                  issues={backlogIssues}
                  icon={Archive}
                />
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          {showSidebar && (
            <div className="w-80 border-l border-gray-200 pl-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium">All issues</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-teal-700">
                        {data.icon || data.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{data.name}</div>
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
                  {unassignedCount > 0 && (
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">NA</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-600">No assignee</span>
                      </div>
                      <div />
                      <div />
                      <div className="text-gray-500">{unassignedCount}</div>
                    </div>
                  )}

                  {assigneeStats.map((assignee) => (
                    <div key={assignee.name} className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          {assignee.avatar ? (
                            <AvatarImage src={assignee.avatar} />
                          ) : (
                            <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                              {assignee.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="text-gray-900">{assignee.name}</span>
                      </div>
                      <div />
                      <div />
                      <div className="text-gray-500">{assignee.issueCount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
