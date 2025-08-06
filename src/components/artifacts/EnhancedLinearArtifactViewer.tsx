import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  Clock,
  Search,
  SortAsc,
  SortDesc,
  Download,
  List,
  Columns,
  Calendar,
  Activity,
  Users,
  Eye,
  ArrowUpDown
} from "lucide-react";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';

export interface ProjectIssue {
  id: string;
  title: string;
  description?: string;
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
    isOnline?: boolean;
  };
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in-progress' | 'todo' | 'backlog';
  type?: 'feature' | 'bug' | 'task';
  labels?: string[];
  createdAt?: string;
  updatedAt?: string;
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
    isOnline?: boolean;
  }>;
}

interface EnhancedLinearArtifactViewerProps {
  data: ProjectData;
  className?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
  onIssueUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
  realTimeUsers?: Array<{
    name: string;
    avatar?: string;
    isViewing?: boolean;
  }>;
}

type ViewMode = 'list' | 'kanban' | 'timeline' | 'calendar';
type SortField = 'title' | 'priority' | 'dueDate' | 'assignee' | 'status';
type SortDirection = 'asc' | 'desc';

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

function SortableIssueItem({
  issue,
  onUpdate
}: {
  issue: ProjectIssue;
  onUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleStatusChange = (newStatus: string) => {
    onUpdate?.(issue.id, { status: newStatus as ProjectIssue['status'] });
  };

  const handlePriorityChange = (newPriority: string) => {
    onUpdate?.(issue.id, { priority: newPriority as ProjectIssue['priority'] });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-md group cursor-grab active:cursor-grabbing"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <PriorityIcon priority={issue.priority} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handlePriorityChange('high')}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-sm" />
              High Priority
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePriorityChange('medium')}>
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-gray-400" />
              Medium Priority
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePriorityChange('low')}>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3 text-gray-400" />
              Low Priority
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <span className="text-sm text-gray-500 font-mono min-w-[4rem]">
        {issue.id}
      </span>

      <span className="flex-1 text-sm text-gray-900 truncate">
        {issue.title}
      </span>

      <div className="flex items-center gap-2">
        {issue.assignee && (
          <div className="flex items-center gap-1">
            <Avatar className="w-5 h-5">
              {issue.assignee.avatar ? (
                <AvatarImage src={issue.assignee.avatar} />
              ) : (
                <AvatarFallback className="text-xs">
                  {issue.assignee.initials}
                </AvatarFallback>
              )}
            </Avatar>
            {issue.assignee.isOnline && (
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            )}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer">
              {issue.status.replace('-', ' ')}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
              Todo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('backlog')}>
              Backlog
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="text-xs text-gray-500 min-w-[3rem]">
          {issue.dueDate}
        </span>
      </div>
    </div>
  );
}

function KanbanView({
  issues,
  onUpdate
}: {
  issues: ProjectIssue[];
  onUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
}) {
  const todoIssues = issues.filter(issue => issue.status === 'todo');
  const inProgressIssues = issues.filter(issue => issue.status === 'in-progress');
  const backlogIssues = issues.filter(issue => issue.status === 'backlog');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newStatus = over.id as ProjectIssue['status'];
      onUpdate?.(active.id as string, { status: newStatus });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        <KanbanColumn title="Todo" status="todo" issues={todoIssues} onUpdate={onUpdate} />
        <KanbanColumn title="In Progress" status="in-progress" issues={inProgressIssues} onUpdate={onUpdate} />
        <KanbanColumn title="Backlog" status="backlog" issues={backlogIssues} onUpdate={onUpdate} />
      </div>
    </DndContext>
  );
}

function KanbanColumn({
  title,
  status,
  issues,
  onUpdate
}: {
  title: string;
  status: string;
  issues: ProjectIssue[];
  onUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
}) {
  const { setNodeRef } = useSortable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <Badge variant="secondary">{issues.length}</Badge>
      </div>

      <SortableContext items={issues.map(issue => issue.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white p-3 rounded-md border">
              <div className="flex items-start gap-2">
                <PriorityIcon priority={issue.priority} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{issue.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">{issue.id}</span>
                    {issue.assignee && (
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">
                          {issue.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="text-xs text-gray-500">{issue.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function TimelineView({ issues }: { issues: ProjectIssue[] }) {
  const sortedIssues = [...issues].sort((a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm text-gray-500 border-b pb-2">
        <div className="w-4" />
        <div className="flex-1">Issue</div>
        <div className="w-24">Status</div>
        <div className="w-24">Assignee</div>
        <div className="w-20">Due Date</div>
      </div>

      {sortedIssues.map((issue, index) => (
        <div key={issue.id} className="flex items-center gap-4 py-3 hover:bg-gray-50 rounded-md">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            {index < sortedIssues.length - 1 && (
              <div className="w-px h-8 bg-gray-200 mt-2" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <PriorityIcon priority={issue.priority} />
              <span className="text-sm font-medium">{issue.title}</span>
              <span className="text-xs text-gray-500">({issue.id})</span>
            </div>
          </div>

          <Badge variant="secondary" className="w-24 justify-center">
            {issue.status.replace('-', ' ')}
          </Badge>

          <div className="w-24 flex justify-center">
            {issue.assignee ? (
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">
                  {issue.assignee.initials}
                </AvatarFallback>
              </Avatar>
            ) : (
              <span className="text-xs text-gray-400">Unassigned</span>
            )}
          </div>

          <span className="text-xs text-gray-500 w-20 text-center">
            {issue.dueDate}
          </span>
        </div>
      ))}
    </div>
  );
}

function CalendarView({ issues }: { issues: ProjectIssue[] }) {
  const today = new Date();
  const startDate = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const issuesByDate = issues.reduce((acc, issue) => {
    const dateKey = issue.dueDate;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(issue);
    return acc;
  }, {} as Record<string, ProjectIssue[]>);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="border rounded-lg p-3 min-h-[200px]">
            <div className="font-medium text-sm mb-2">
              {format(day, 'MMM d')}
            </div>

            {Object.entries(issuesByDate).map(([date, dayIssues]) => {
              if (format(day, 'MMM d') === date) {
                return dayIssues.map((issue) => (
                  <div key={issue.id} className="mb-2 p-2 bg-blue-50 rounded text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <PriorityIcon priority={issue.priority} />
                      <span className="font-medium truncate">{issue.title}</span>
                    </div>
                    <div className="text-gray-500">{issue.id}</div>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnhancedLinearArtifactViewer({
  data,
  className = "",
  showHeader = true,
  showSidebar = true,
  onIssueUpdate,
  realTimeUsers = []
}: EnhancedLinearArtifactViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [issues, setIssues] = useState(data.issues);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Handle real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random online status changes
      const updatedAssignees = data.assignees?.map(assignee => ({
        ...assignee,
        isOnline: Math.random() > 0.7
      }));

      // Update issues with online status
      const updatedIssues = issues.map(issue => ({
        ...issue,
        assignee: issue.assignee ? {
          ...issue.assignee,
          isOnline: updatedAssignees?.find(a => a.name === issue.assignee?.name)?.isOnline
        } : undefined
      }));

      setIssues(updatedIssues);
    }, 5000);

    return () => clearInterval(interval);
  }, [issues, data.assignees]);

  const handleIssueUpdate = useCallback((issueId: string, updates: Partial<ProjectIssue>) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId
        ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
        : issue
    ));
    onIssueUpdate?.(issueId, updates);
  }, [onIssueUpdate]);

  const filteredAndSortedIssues = useMemo(() => {
    const filtered = issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority;
      const matchesAssignee = filterAssignee === 'all' ||
                             (filterAssignee === 'unassigned' && !issue.assignee) ||
                             issue.assignee?.name === filterAssignee;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });

    filtered.sort((a, b) => {
      let aVal: string | number = a[sortField] as string;
      let bVal: string | number = b[sortField] as string;

      if (sortField === 'assignee') {
        aVal = a.assignee?.name || '';
        bVal = b.assignee?.name || '';
      } else if (sortField === 'dueDate') {
        aVal = new Date(a.dueDate).getTime();
        bVal = new Date(b.dueDate).getTime();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return filtered;
  }, [issues, searchTerm, sortField, sortDirection, filterStatus, filterPriority, filterAssignee]);

  const exportToPDF = async () => {
    const element = document.getElementById('artifact-viewer');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data.name}-project-report.pdf`);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Title', 'Status', 'Priority', 'Assignee', 'Due Date', 'Type'],
      ...filteredAndSortedIssues.map(issue => [
        issue.id,
        issue.title,
        issue.status,
        issue.priority,
        issue.assignee?.name || 'Unassigned',
        issue.dueDate,
        issue.type || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name}-issues.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over) return;

    // Handle status change when dropping on different status sections
    if (over.id === 'todo' || over.id === 'in-progress' || over.id === 'backlog') {
      handleIssueUpdate(active.id as string, { status: over.id as ProjectIssue['status'] });
    }
  };

  const inProgressIssues = filteredAndSortedIssues.filter(issue => issue.status === 'in-progress');
  const todoIssues = filteredAndSortedIssues.filter(issue => issue.status === 'todo');
  const backlogIssues = filteredAndSortedIssues.filter(issue => issue.status === 'backlog');

  return (
    <div id="artifact-viewer" className={`min-h-screen bg-white ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <Tabs defaultValue="all-issues" className="w-auto">
                <TabsList className="bg-transparent p-0 h-auto">
                  <TabsTrigger value="all-issues" className="data-[state=active]:bg-gray-100 px-3 py-1.5 text-sm">
                    <FileText className="w-4 h-4 mr-2" />
                    All issues
                  </TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-gray-100 px-3 py-1.5 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="backlog" className="data-[state=active]:bg-gray-100 px-3 py-1.5 text-sm">
                    <Archive className="w-4 h-4 mr-2" />
                    Backlog
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                {/* Real-time collaboration indicators */}
                {realTimeUsers.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div className="flex -space-x-1">
                      {realTimeUsers.slice(0, 3).map((user) => (
                        <Avatar key={user.name} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    {realTimeUsers.length > 3 && (
                      <span className="text-xs text-gray-500">+{realTimeUsers.length - 3}</span>
                    )}
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportToPDF}>
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToCSV}>
                      Export as CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="backlog">Backlog</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {data.assignees?.map((assignee) => (
                    <SelectItem key={assignee.name} value={assignee.name}>
                      {assignee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortField('title')}>
                    Sort by Title
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortField('priority')}>
                    Sort by Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortField('dueDate')}>
                    Sort by Due Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortField('assignee')}>
                    Sort by Assignee
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              >
                {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <Columns className="w-4 h-4 mr-2" />
                Kanban
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Timeline
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {/* Render different views */}
              {viewMode === 'list' && (
                <div className="space-y-6">
                  {inProgressIssues.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">In Progress</span>
                        <span className="text-sm text-gray-500">{inProgressIssues.length}</span>
                      </div>
                      <SortableContext items={inProgressIssues.map(i => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-1">
                          {inProgressIssues.map((issue) => (
                            <SortableIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  )}

                  {todoIssues.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Circle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Todo</span>
                        <span className="text-sm text-gray-500">{todoIssues.length}</span>
                      </div>
                      <SortableContext items={todoIssues.map(i => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-1">
                          {todoIssues.map((issue) => (
                            <SortableIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  )}

                  {backlogIssues.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Archive className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Backlog</span>
                        <span className="text-sm text-gray-500">{backlogIssues.length}</span>
                      </div>
                      <SortableContext items={backlogIssues.map(i => i.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-1">
                          {backlogIssues.map((issue) => (
                            <SortableIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  )}
                </div>
              )}

              {viewMode === 'kanban' && (
                <KanbanView issues={filteredAndSortedIssues} onUpdate={handleIssueUpdate} />
              )}

              {viewMode === 'timeline' && (
                <TimelineView issues={filteredAndSortedIssues} />
              )}

              {viewMode === 'calendar' && (
                <CalendarView issues={filteredAndSortedIssues} />
              )}

              <DragOverlay>
                {activeId ? (
                  <div className="bg-white border border-gray-300 rounded p-2 shadow-lg">
                    <span className="text-sm">
                      {issues.find(i => i.id === activeId)?.title}
                    </span>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Right Sidebar */}
          {showSidebar && (
            <div className="w-80 border-l border-gray-200 pl-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium">All issues</span>
                    <Badge variant="secondary">{filteredAndSortedIssues.length}</Badge>
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
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-medium">
                  <div>Assignees</div>
                  <div>Labels</div>
                  <div>Priority</div>
                  <div>Projects</div>
                </div>

                <div className="space-y-3">
                  {filteredAndSortedIssues.filter(i => !i.assignee).length > 0 && (
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">NA</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-600">No assignee</span>
                      </div>
                      <div />
                      <div />
                      <div className="text-gray-500">
                        {filteredAndSortedIssues.filter(i => !i.assignee).length}
                      </div>
                    </div>
                  )}

                  {data.assignees?.map((assignee) => {
                    const assigneeIssues = filteredAndSortedIssues.filter(i => i.assignee?.name === assignee.name);
                    if (assigneeIssues.length === 0) return null;

                    return (
                      <div key={assignee.name} className="grid grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Avatar className="w-5 h-5">
                              {assignee.avatar ? (
                                <AvatarImage src={assignee.avatar} />
                              ) : (
                                <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                  {assignee.initials}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            {assignee.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                            )}
                          </div>
                          <span className="text-gray-900">{assignee.name}</span>
                        </div>
                        <div />
                        <div />
                        <div className="text-gray-500">{assigneeIssues.length}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Filter summary */}
                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Showing {filteredAndSortedIssues.length} of {issues.length} issues</div>
                    {searchTerm && <div>Search: "{searchTerm}"</div>}
                    {filterStatus !== 'all' && <div>Status: {filterStatus}</div>}
                    {filterPriority !== 'all' && <div>Priority: {filterPriority}</div>}
                    {filterAssignee !== 'all' && <div>Assignee: {filterAssignee}</div>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
