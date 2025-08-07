import type React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
  ArrowUpDown,
  Command as CommandIcon,
  Zap,
  Settings,
  FileType,
  Palette,
  Hash,
  Type,
  Calendar as CalendarIcon,
  DollarSign,
  Link,
  CheckSquare,
  User,
  Briefcase,
  Megaphone,
  Microscope,
  Code2,
  Building
} from "lucide-react";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';

// Custom Field Types
export type CustomFieldType = 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'user' | 'url' | 'checkbox' | 'currency';

export interface CustomField {
  id: string;
  name: string;
  type: CustomFieldType;
  required?: boolean;
  options?: string[]; // For select/multiselect
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

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
  type?: 'feature' | 'bug' | 'task' | 'epic' | 'story';
  labels?: string[];
  createdAt?: string;
  updatedAt?: string;
  customFields?: Record<string, any>;
}

// Project Templates
export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'software' | 'marketing' | 'research' | 'general';
  icon: string;
  defaultIssueTypes: string[];
  customFields: CustomField[];
  defaultWorkflow: {
    statuses: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
  sampleIssues?: Partial<ProjectIssue>[];
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
  template?: ProjectTemplate;
  customFields?: CustomField[];
}

interface AdvancedLinearArtifactViewerProps {
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
  onTemplateChange?: (template: ProjectTemplate) => void;
}

type ViewMode = 'list' | 'kanban' | 'timeline' | 'calendar';
type SortField = 'title' | 'priority' | 'dueDate' | 'assignee' | 'status';
type SortDirection = 'asc' | 'desc';

// Predefined Project Templates
const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'software-dev',
    name: 'Software Development',
    description: 'Full-stack software development with sprints and technical debt tracking',
    category: 'software',
    icon: '💻',
    defaultIssueTypes: ['epic', 'story', 'task', 'bug'],
    customFields: [
      { id: 'story_points', name: 'Story Points', type: 'number', validation: { min: 1, max: 21 } },
      { id: 'sprint', name: 'Sprint', type: 'select', options: ['Sprint 1', 'Sprint 2', 'Sprint 3'] },
      { id: 'tech_debt', name: 'Technical Debt', type: 'checkbox' },
      { id: 'reviewer', name: 'Code Reviewer', type: 'user' },
      { id: 'repository', name: 'Repository', type: 'url' }
    ],
    defaultWorkflow: {
      statuses: [
        { id: 'backlog', name: 'Backlog', color: '#6b7280' },
        { id: 'todo', name: 'Todo', color: '#3b82f6' },
        { id: 'in-progress', name: 'In Progress', color: '#f59e0b' },
        { id: 'review', name: 'Code Review', color: '#8b5cf6' },
        { id: 'testing', name: 'Testing', color: '#06b6d4' },
        { id: 'done', name: 'Done', color: '#10b981' }
      ]
    },
    sampleIssues: [
      { title: 'User Authentication System', type: 'epic', priority: 'high' },
      { title: 'Login API Endpoint', type: 'story', priority: 'high' },
      { title: 'Fix password validation bug', type: 'bug', priority: 'high' }
    ]
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    description: 'Marketing campaign management with budget tracking and performance metrics',
    category: 'marketing',
    icon: '📢',
    defaultIssueTypes: ['campaign', 'creative', 'content', 'analytics'],
    customFields: [
      { id: 'budget', name: 'Budget', type: 'currency' },
      { id: 'target_audience', name: 'Target Audience', type: 'multiselect', options: ['Gen Z', 'Millennials', 'Gen X', 'Boomers'] },
      { id: 'channels', name: 'Marketing Channels', type: 'multiselect', options: ['Social Media', 'Email', 'PPC', 'SEO', 'Content'] },
      { id: 'launch_date', name: 'Launch Date', type: 'date' },
      { id: 'campaign_url', name: 'Campaign URL', type: 'url' },
      { id: 'approved', name: 'Legal Approved', type: 'checkbox' }
    ],
    defaultWorkflow: {
      statuses: [
        { id: 'ideation', name: 'Ideation', color: '#6b7280' },
        { id: 'planning', name: 'Planning', color: '#3b82f6' },
        { id: 'creation', name: 'Content Creation', color: '#f59e0b' },
        { id: 'review', name: 'Review & Approval', color: '#8b5cf6' },
        { id: 'execution', name: 'Execution', color: '#06b6d4' },
        { id: 'analysis', name: 'Performance Analysis', color: '#10b981' }
      ]
    },
    sampleIssues: [
      { title: 'Q4 Product Launch Campaign', type: 'epic', priority: 'high' },
      { title: 'Social Media Creative Assets', type: 'task', priority: 'medium' },
      { title: 'Landing Page Copy', type: 'task', priority: 'medium' }
    ]
  },
  {
    id: 'research-project',
    name: 'Research Project',
    description: 'Academic or market research with methodology tracking and milestone management',
    category: 'research',
    icon: '🔬',
    defaultIssueTypes: ['hypothesis', 'experiment', 'analysis', 'publication'],
    customFields: [
      { id: 'methodology', name: 'Research Methodology', type: 'select', options: ['Quantitative', 'Qualitative', 'Mixed Methods'] },
      { id: 'sample_size', name: 'Sample Size', type: 'number', validation: { min: 1 } },
      { id: 'ethical_approval', name: 'Ethics Approval Required', type: 'checkbox' },
      { id: 'funding_source', name: 'Funding Source', type: 'text' },
      { id: 'publication_target', name: 'Target Publication', type: 'text' },
      { id: 'data_collection_date', name: 'Data Collection Date', type: 'date' }
    ],
    defaultWorkflow: {
      statuses: [
        { id: 'proposal', name: 'Proposal', color: '#6b7280' },
        { id: 'literature-review', name: 'Literature Review', color: '#3b82f6' },
        { id: 'data-collection', name: 'Data Collection', color: '#f59e0b' },
        { id: 'analysis', name: 'Analysis', color: '#8b5cf6' },
        { id: 'writing', name: 'Writing', color: '#06b6d4' },
        { id: 'published', name: 'Published', color: '#10b981' }
      ]
    },
    sampleIssues: [
      { title: 'User Behavior Analysis Study', type: 'epic', priority: 'high' },
      { title: 'Survey Design and Distribution', type: 'task', priority: 'high' },
      { title: 'Statistical Analysis of Results', type: 'task', priority: 'medium' }
    ]
  }
];

// Command Palette Actions
interface CommandAction {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  category: 'navigation' | 'actions' | 'issues' | 'view' | 'templates';
  shortcut?: string[];
  action: () => void;
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

function CustomFieldRenderer({ field, value, onChange }: {
  field: CustomField;
  value: any;
  onChange: (value: any) => void;
}) {
  switch (field.type) {
    case 'text':
      return (
        <Input
          placeholder={`Enter ${field.name.toLowerCase()}...`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'number':
      return (
        <Input
          type="number"
          placeholder={`Enter ${field.name.toLowerCase()}...`}
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          min={field.validation?.min}
          max={field.validation?.max}
        />
      );

    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${field.name.toLowerCase()}...`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multiselect':
      return (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                checked={(value || []).includes(option)}
                onCheckedChange={(checked) => {
                  const currentValue = value || [];
                  if (checked) {
                    onChange([...currentValue, option]);
                  } else {
                    onChange(currentValue.filter((v: string) => v !== option));
                  }
                }}
              />
              <label className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      );

    case 'date':
      return (
        <Input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'url':
      return (
        <Input
          type="url"
          placeholder={`Enter ${field.name.toLowerCase()} URL...`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'currency':
      return (
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="number"
            placeholder="0.00"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            className="pl-10"
            step="0.01"
          />
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={value || false}
            onCheckedChange={onChange}
          />
          <label className="text-sm">{field.name}</label>
        </div>
      );

    case 'user':
      return (
        <Input
          placeholder="@username"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default:
      return null;
  }
}

function SortableIssueItem({
  issue,
  onUpdate,
  customFields = []
}: {
  issue: ProjectIssue;
  onUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
  customFields?: CustomField[];
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

  const [showCustomFields, setShowCustomFields] = useState(false);

  return (
    <>
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
          {customFields.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={() => setShowCustomFields(true)}
            >
              <Settings className="w-3 h-3" />
            </Button>
          )}

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

      {/* Custom Fields Dialog */}
      <Dialog open={showCustomFields} onOpenChange={setShowCustomFields}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Custom Fields - {issue.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {customFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="text-sm font-medium">
                  {field.name}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <CustomFieldRenderer
                  field={field}
                  value={issue.customFields?.[field.id]}
                  onChange={(value) => {
                    onUpdate?.(issue.id, {
                      customFields: {
                        ...issue.customFields,
                        [field.id]: value
                      }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TemplateSelector({
  currentTemplate,
  onTemplateChange
}: {
  currentTemplate?: ProjectTemplate;
  onTemplateChange: (template: ProjectTemplate) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileType className="w-4 h-4 mr-2" />
          {currentTemplate ? currentTemplate.name : 'Choose Template'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Project Templates</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4">
          {PROJECT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onTemplateChange(template)}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{template.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {template.category === 'software' && <Code2 className="w-4 h-4 text-blue-500" />}
                      {template.category === 'marketing' && <Megaphone className="w-4 h-4 text-green-500" />}
                      {template.category === 'research' && <Microscope className="w-4 h-4 text-purple-500" />}
                      <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                    </div>

                    <div className="text-xs text-gray-500">
                      {template.customFields.length} custom fields
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.defaultIssueTypes.slice(0, 3).map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {template.defaultIssueTypes.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.defaultIssueTypes.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AdvancedLinearArtifactViewer({
  data,
  className = "",
  showHeader = true,
  showSidebar = true,
  onIssueUpdate,
  realTimeUsers = [],
  onTemplateChange
}: AdvancedLinearArtifactViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('dueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [issues, setIssues] = useState(data.issues);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<ProjectTemplate | undefined>(data.template);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Cmd+K / Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }

      // Quick actions
      if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
        switch (e.key) {
          case 'L': // Switch to List view
            e.preventDefault();
            setViewMode('list');
            break;
          case 'K': // Switch to Kanban view
            e.preventDefault();
            setViewMode('kanban');
            break;
          case 'T': // Switch to Timeline view
            e.preventDefault();
            setViewMode('timeline');
            break;
          case 'C': // Switch to Calendar view
            e.preventDefault();
            setViewMode('calendar');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleIssueUpdate = useCallback((issueId: string, updates: Partial<ProjectIssue>) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId
        ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
        : issue
    ));
    onIssueUpdate?.(issueId, updates);
  }, [onIssueUpdate]);

  const handleTemplateChange = useCallback((template: ProjectTemplate) => {
    setCurrentTemplate(template);
    onTemplateChange?.(template);

    // Add template's sample issues if they don't exist
    if (template.sampleIssues && issues.length === 0) {
      const sampleIssues = template.sampleIssues.map((sample, index) => ({
        id: `${template.id}-${index + 1}`,
        title: sample.title || 'New Issue',
        priority: sample.priority || 'medium',
        status: sample.status || 'todo',
        type: sample.type || 'task',
        dueDate: new Date().toLocaleDateString(),
        customFields: {},
        ...sample
      })) as ProjectIssue[];

      setIssues(sampleIssues);
    }
  }, [issues.length, onTemplateChange]);

  // Command palette actions
  const commandActions: CommandAction[] = [
    // Navigation
    {
      id: 'switch-list',
      title: 'Switch to List View',
      icon: List,
      category: 'view',
      shortcut: ['⌘', '⇧', 'L'],
      action: () => setViewMode('list')
    },
    {
      id: 'switch-kanban',
      title: 'Switch to Kanban View',
      icon: Columns,
      category: 'view',
      shortcut: ['⌘', '⇧', 'K'],
      action: () => setViewMode('kanban')
    },
    {
      id: 'switch-timeline',
      title: 'Switch to Timeline View',
      icon: Activity,
      category: 'view',
      shortcut: ['⌘', '⇧', 'T'],
      action: () => setViewMode('timeline')
    },
    {
      id: 'switch-calendar',
      title: 'Switch to Calendar View',
      icon: Calendar,
      category: 'view',
      shortcut: ['⌘', '⇧', 'C'],
      action: () => setViewMode('calendar')
    },

    // Quick filters
    {
      id: 'filter-high-priority',
      title: 'Show High Priority Issues',
      icon: BarChart3,
      category: 'actions',
      action: () => setFilterPriority('high')
    },
    {
      id: 'filter-in-progress',
      title: 'Show In Progress Issues',
      icon: Clock,
      category: 'actions',
      action: () => setFilterStatus('in-progress')
    },
    {
      id: 'clear-filters',
      title: 'Clear All Filters',
      icon: Filter,
      category: 'actions',
      action: () => {
        setFilterStatus('all');
        setFilterPriority('all');
        setFilterAssignee('all');
        setSearchTerm('');
      }
    },

    // Templates
    ...PROJECT_TEMPLATES.map(template => ({
      id: `template-${template.id}`,
      title: `Apply ${template.name} Template`,
      description: template.description,
      icon: template.category === 'software' ? Code2 :
            template.category === 'marketing' ? Megaphone : Microscope,
      category: 'templates' as const,
      action: () => handleTemplateChange(template)
    }))
  ];

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
    const headers = ['ID', 'Title', 'Status', 'Priority', 'Assignee', 'Due Date', 'Type'];

    // Add custom field headers
    const customFields = currentTemplate?.customFields || data.customFields || [];
    customFields.forEach(field => headers.push(field.name));

    const csvContent = [
      headers,
      ...filteredAndSortedIssues.map(issue => {
        const row = [
          issue.id,
          issue.title,
          issue.status,
          issue.priority,
          issue.assignee?.name || 'Unassigned',
          issue.dueDate,
          issue.type || ''
        ];

        // Add custom field values
        customFields.forEach(field => {
          const value = issue.customFields?.[field.id];
          row.push(Array.isArray(value) ? value.join('; ') : value || '');
        });

        return row;
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name}-issues.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const inProgressIssues = filteredAndSortedIssues.filter(issue => issue.status === 'in-progress');
  const todoIssues = filteredAndSortedIssues.filter(issue => issue.status === 'todo');
  const backlogIssues = filteredAndSortedIssues.filter(issue => issue.status === 'backlog');

  return (
    <div id="artifact-viewer" className={`min-h-screen bg-white ${className}`}>
      {/* Command Palette */}
      <CommandDialog open={showCommandPalette} onOpenChange={setShowCommandPalette}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Views">
            {commandActions
              .filter(action => action.category === 'view')
              .map(action => (
                <CommandItem
                  key={action.id}
                  onSelect={() => {
                    action.action();
                    setShowCommandPalette(false);
                  }}
                >
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  <span>{action.title}</span>
                  {action.shortcut && (
                    <div className="ml-auto flex gap-1">
                      {action.shortcut.map((key, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandGroup heading="Quick Actions">
            {commandActions
              .filter(action => action.category === 'actions')
              .map(action => (
                <CommandItem
                  key={action.id}
                  onSelect={() => {
                    action.action();
                    setShowCommandPalette(false);
                  }}
                >
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  <span>{action.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandGroup heading="Templates">
            {commandActions
              .filter(action => action.category === 'templates')
              .map(action => (
                <CommandItem
                  key={action.id}
                  onSelect={() => {
                    action.action();
                    setShowCommandPalette(false);
                  }}
                >
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  <div>
                    <div>{action.title}</div>
                    {action.description && (
                      <div className="text-xs text-gray-500">{action.description}</div>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

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
                {/* Command Palette Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommandPalette(true)}
                  className="text-sm"
                >
                  <CommandIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Command</span>
                  <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
                </Button>

                {/* Template Selector */}
                <TemplateSelector
                  currentTemplate={currentTemplate}
                  onTemplateChange={handleTemplateChange}
                />

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
                      Export as CSV (Enhanced)
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
                  placeholder="Search issues... (⌘K for commands)"
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
              onDragStart={(event: DragStartEvent) => setActiveId(event.active.id as string)}
              onDragEnd={(event: DragEndEvent) => {
                setActiveId(null);
                const { active, over } = event;
                if (!over) return;

                if (over.id === 'todo' || over.id === 'in-progress' || over.id === 'backlog') {
                  handleIssueUpdate(active.id as string, { status: over.id as ProjectIssue['status'] });
                }
              }}
            >
              {/* List View */}
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
                            <SortableIssueItem
                              key={issue.id}
                              issue={issue}
                              onUpdate={handleIssueUpdate}
                              customFields={currentTemplate?.customFields || data.customFields}
                            />
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
                            <SortableIssueItem
                              key={issue.id}
                              issue={issue}
                              onUpdate={handleIssueUpdate}
                              customFields={currentTemplate?.customFields || data.customFields}
                            />
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
                            <SortableIssueItem
                              key={issue.id}
                              issue={issue}
                              onUpdate={handleIssueUpdate}
                              customFields={currentTemplate?.customFields || data.customFields}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  )}
                </div>
              )}

              {/* Other view modes would be implemented here */}
              {viewMode !== 'list' && (
                <div className="text-center py-12 text-gray-500">
                  {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view is coming soon!
                </div>
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
                      {currentTemplate && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span>{currentTemplate.icon}</span>
                          {currentTemplate.name}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                {currentTemplate && (
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileType className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Template Features</span>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div>{currentTemplate.customFields.length} custom fields</div>
                      <div>{currentTemplate.defaultIssueTypes.length} issue types</div>
                      <div>{currentTemplate.defaultWorkflow.statuses.length} workflow statuses</div>
                    </div>
                  </div>
                )}

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
                    <div className="flex items-center gap-2">
                      <CommandIcon className="w-3 h-3" />
                      Press ⌘K for commands
                    </div>
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
