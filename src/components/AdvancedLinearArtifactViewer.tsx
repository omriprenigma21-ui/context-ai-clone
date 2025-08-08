import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
  Building,
  Expand,
  X,
  Paperclip,
  Copy,
  Repeat,
  Tag,
  AlertCircle,
  Save,
  Trash2,
  Flag,
  Layers,
  Star
} from "lucide-react";

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

// Enhanced New Issue Modal Component
function NewIssueModal({
  isOpen,
  onClose,
  onCreateIssue,
  data,
  defaultStatus = 'todo',
  customFields = []
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onCreateIssue?: (issue: Partial<ProjectIssue>) => void;
  data?: ProjectData;
  defaultStatus?: string;
  customFields?: CustomField[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'medium',
    assignee: '',
    dueDate: '',
    labels: [] as string[],
    type: 'task',
    estimate: '',
    project: data?.name || '',
    parentIssue: '',
    customFields: {} as Record<string, any>
  });
  const [createMore, setCreateMore] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate issue ID
  const issueId = `${data?.name?.toUpperCase().slice(0, 3) || 'PRE'}-${Math.floor(Math.random() * 1000) + 1}`;

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Validate custom fields
    customFields.forEach(field => {
      if (field.required && !form.customFields[field.id]) {
        newErrors[field.id] = `${field.name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.title, form.customFields, customFields]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const newIssue: Partial<ProjectIssue> = {
      id: issueId,
      title: form.title,
      description: form.description,
      status: form.status as ProjectIssue['status'],
      priority: form.priority as ProjectIssue['priority'],
      type: form.type as ProjectIssue['type'],
      dueDate: form.dueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      labels: form.labels,
      customFields: form.customFields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (form.assignee && form.assignee !== 'unassigned' && data?.assignees) {
      const assignee = data.assignees.find(a => a.name === form.assignee);
      if (assignee) {
        newIssue.assignee = {
          name: assignee.name,
          initials: assignee.initials,
          avatar: assignee.avatar,
          isOnline: assignee.isOnline
        };
      }
    }

    onCreateIssue?.(newIssue);

    if (createMore) {
      // Reset form but keep modal open
      setForm(prev => ({
        ...prev,
        title: '',
        description: '',
        customFields: {}
      }));
      setErrors({});
    } else {
      // Reset form and close modal
      setForm({
        title: '',
        description: '',
        status: defaultStatus,
        priority: 'medium',
        assignee: '',
        dueDate: '',
        labels: [],
        type: 'task',
        estimate: '',
        project: data?.name || '',
        parentIssue: '',
        customFields: {}
      });
      setErrors({});
      setCreateMore(false);
      setShowAdvanced(false);
      onClose?.();
    }
  }, [form, validateForm, issueId, data?.assignees, onCreateIssue, createMore, defaultStatus, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl transition-all duration-200 ${
        isExpanded ? 'w-[900px] h-[700px]' : 'w-[600px] h-auto max-h-[80vh]'
      } max-w-[95vw] flex flex-col`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-white">{issueId.split('-')[0]}</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">New issue</h2>
              <p className="text-xs text-gray-500">{issueId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-gray-500 hover:text-gray-700"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Expand className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Title Input */}
          <div className="px-6 pt-4">
            <Input
              placeholder="Issue title"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className={`text-lg font-medium border-none shadow-none px-0 focus-visible:ring-0 placeholder:text-gray-400 ${
                errors.title ? 'border-b border-red-300' : ''
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="px-6 pt-4 flex-1 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <button
                className={`text-sm px-2 py-1 rounded ${
                  activeTab === 'write' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('write')}
              >
                Write
              </button>
              <button
                className={`text-sm px-2 py-1 rounded ${
                  activeTab === 'preview' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>

            {activeTab === 'write' ? (
              <Textarea
                placeholder="Add description..."
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                className={`border-none shadow-none px-0 resize-none focus-visible:ring-0 ${
                  isExpanded ? 'h-[300px]' : 'h-[120px]'
                } placeholder:text-gray-400`}
              />
            ) : (
              <div className={`text-sm text-gray-600 ${isExpanded ? 'h-[300px]' : 'h-[120px]'} overflow-y-auto`}>
                {form.description || <span className="text-gray-400">Nothing to preview</span>}
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {showAdvanced && customFields.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 max-h-48 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Fields</h4>
              <div className="grid grid-cols-2 gap-4">
                {customFields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <CustomFieldRenderer
                      field={field}
                      value={form.customFields[field.id]}
                      onChange={(value: any) => setForm(prev => ({
                        ...prev,
                        customFields: { ...prev.customFields, [field.id]: value }
                      }))}
                    />
                    {errors[field.id] && (
                      <p className="text-xs text-red-500">{errors[field.id]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Property controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Status */}
              <Select value={form.status} onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}>
                <SelectTrigger className="w-auto h-8 px-3 text-sm border-gray-200 bg-white">
                  <Circle className="w-3 h-3 mr-1.5 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">
                    <div className="flex items-center gap-2">
                      <Circle className="w-3 h-3 text-gray-400" />
                      Todo
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-orange-500" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="backlog">
                    <div className="flex items-center gap-2">
                      <Archive className="w-3 h-3 text-gray-400" />
                      Backlog
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Priority */}
              <Select value={form.priority} onValueChange={(value) => setForm(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="w-auto h-8 px-3 text-sm border-gray-200 bg-white">
                  <Flag className="w-3 h-3 mr-1.5 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-sm" />
                      High
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Circle className="w-3 h-3 text-gray-400" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3 h-3 text-gray-400" />
                      Low
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Assignee */}
              <Select value={form.assignee} onValueChange={(value) => setForm(prev => ({ ...prev, assignee: value }))}>
                <SelectTrigger className="w-auto h-8 px-3 text-sm border-gray-200 bg-white">
                  <User className="w-3 h-3 mr-1.5 text-gray-400" />
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">No assignee</SelectItem>
                  {data?.assignees?.map((assignee) => (
                    <SelectItem key={assignee.name} value={assignee.name}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">
                            {assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        {assignee.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type */}
              <Select value={form.type} onValueChange={(value) => setForm(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="w-auto h-8 px-3 text-sm border-gray-200 bg-white">
                  <Layers className="w-3 h-3 mr-1.5 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                </SelectContent>
              </Select>

              {/* Due Date */}
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-auto h-8 px-3 text-sm border-gray-200 bg-white"
              />

              {/* More options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-2 border-gray-200 bg-white">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => setShowAdvanced(!showAdvanced)}>
                    <Settings className="w-4 h-4 mr-2" />
                    {showAdvanced ? 'Hide' : 'Show'} custom fields
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Tag className="w-4 h-4 mr-2" />
                    Add labels...
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="w-4 h-4 mr-2" />
                    Add relation...
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach file...
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Checkbox
                  checked={createMore}
                  onCheckedChange={(checked) => setCreateMore(!!checked)}
                  className="w-4 h-4"
                />
                <span>Create more</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!form.title.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                >
                  Create issue
                  <span className="ml-2 text-xs opacity-70">⌘⏎</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CleanIssueItem({
  issue,
  onUpdate
}: {
  issue: ProjectIssue;
  onUpdate?: (issueId: string, updates: Partial<ProjectIssue>) => void;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 group">
      {/* Priority Icon */}
      <div className="flex-shrink-0">
        <PriorityIcon priority={issue.priority} />
      </div>

      {/* Issue ID */}
      <span className="text-sm text-gray-500 font-mono w-16 flex-shrink-0">
        {issue.id}
      </span>

      {/* Issue Title */}
      <span className="flex-1 text-sm text-gray-900 pr-4">
        {issue.title}
      </span>

      {/* Right side - Assignee and Date */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Assignee */}
        {issue.assignee ? (
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
              {issue.assignee.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5">
              <AvatarFallback className="text-xs text-gray-500">
                <User className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Due Date */}
        <span className="text-sm text-gray-500 w-12 text-right">
          {issue.dueDate}
        </span>
      </div>
    </div>
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
  const [issues, setIssues] = useState(data.issues);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<ProjectTemplate | undefined>(data.template);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewIssueModal, setShowNewIssueModal] = useState(false);
  const [newIssueSection, setNewIssueSection] = useState<string>('todo');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Cmd+K / Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }

      // Toggle sidebar (Ctrl+])
      if (e.ctrlKey && e.key === ']') {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
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
  }, [sidebarOpen]);

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

  const inProgressIssues = filteredAndSortedIssues.filter(issue => issue.status === 'in-progress');
  const todoIssues = filteredAndSortedIssues.filter(issue => issue.status === 'todo');
  const backlogIssues = filteredAndSortedIssues.filter(issue => issue.status === 'backlog');

  return (
    <div id="artifact-viewer" className={`min-h-screen bg-white ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="border-b border-gray-200 bg-white">
          {/* Top Navigation */}
          <div className="px-6 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left - Tabs */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md">
                  <List className="w-3 h-3 mr-1.5" />
                  All issues
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-sm text-gray-600 hover:text-gray-900">
                  <Clock className="w-3 h-3 mr-1.5" />
                  Active
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-sm text-gray-600 hover:text-gray-900">
                  <Archive className="w-3 h-3 mr-1.5" />
                  Backlog
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-sm text-gray-600 hover:text-gray-900">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs font-medium"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  Open details
                  <span className="ml-1.5 text-xs text-gray-500">Ctrl</span>
                  <span className="ml-0.5 text-xs text-gray-500">]</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-sm text-gray-600">
                <Filter className="w-3 h-3 mr-1.5" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-sm text-gray-600">
                <Grid3X3 className="w-3 h-3 mr-1.5" />
                Display
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          {/* Issues List */}
          <div className="h-full overflow-auto">
            {/* In Progress Section */}
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 py-3 bg-orange-50 border-b border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">In Progress</span>
                  <span className="text-sm font-medium text-gray-500">{inProgressIssues.length}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto w-4 h-4 p-0"
                    onClick={() => {
                      setNewIssueSection('in-progress');
                      setShowNewIssueModal(true);
                    }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {inProgressIssues.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {inProgressIssues.map((issue) => (
                    <CleanIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No issues in progress
                </div>
              )}
            </div>

            {/* Todo Section */}
            <div className="bg-white border-b border-gray-200">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Todo</span>
                  <span className="text-sm font-medium text-gray-500">{todoIssues.length}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto w-4 h-4 p-0"
                    onClick={() => {
                      setNewIssueSection('todo');
                      setShowNewIssueModal(true);
                    }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {todoIssues.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {todoIssues.map((issue) => (
                    <CleanIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No todo issues
                </div>
              )}
            </div>

            {/* Backlog Section */}
            <div className="bg-white">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Archive className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Backlog</span>
                  <span className="text-sm font-medium text-gray-500">{backlogIssues.length}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto w-4 h-4 p-0"
                    onClick={() => {
                      setNewIssueSection('backlog');
                      setShowNewIssueModal(true);
                    }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {backlogIssues.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {backlogIssues.map((issue) => (
                    <CleanIssueItem key={issue.id} issue={issue} onUpdate={handleIssueUpdate} />
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No backlog issues
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Details Panel */}
        {sidebarOpen && (
          <div className="w-80 bg-white border-l border-gray-200">
            <div className="p-6">
              {/* Active Issues Header */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Active issues</h3>

                {/* Project Info */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-white">P</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Predapp</span>
                  <Button variant="ghost" size="sm" className="ml-auto w-4 h-4 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Stats Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-medium">
                  <div>Assignees</div>
                  <div>Labels</div>
                  <div>Priority</div>
                  <div>Projects</div>
                </div>

                <div className="space-y-3">
                  {/* No assignee */}
                  <div className="grid grid-cols-4 gap-4 text-sm items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-xs text-gray-500">NA</AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600">No assignee</span>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="text-gray-500">{filteredAndSortedIssues.filter(i => !i.assignee).length}</div>
                  </div>

                  {/* Assigned users */}
                  {data.assignees?.map((assignee) => {
                    const assigneeIssues = filteredAndSortedIssues.filter(i => i.assignee?.name === assignee.name);
                    if (assigneeIssues.length === 0) return null;

                    return (
                      <div key={assignee.name} className="grid grid-cols-4 gap-4 text-sm items-center">
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
                        <div></div>
                        <div></div>
                        <div className="text-gray-500">{assigneeIssues.length}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced New Issue Modal */}
      {showNewIssueModal && (
        <NewIssueModal
          isOpen={showNewIssueModal}
          onClose={() => setShowNewIssueModal(false)}
          onCreateIssue={(issueData) => {
            const newIssue: ProjectIssue = {
              id: issueData.id || `PRE-${issues.length + 1}`,
              title: issueData.title || 'New Issue',
              description: issueData.description,
              priority: issueData.priority || 'medium',
              status: issueData.status || 'todo',
              type: issueData.type,
              dueDate: issueData.dueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              labels: issueData.labels,
              assignee: issueData.assignee,
              createdAt: issueData.createdAt || new Date().toISOString(),
              updatedAt: issueData.updatedAt || new Date().toISOString(),
              customFields: issueData.customFields
            };

            setIssues(prev => [...prev, newIssue]);
            onIssueUpdate?.(newIssue.id, newIssue);
          }}
          data={data}
          defaultStatus={newIssueSection}
          customFields={currentTemplate?.customFields || data.customFields || []}
        />
      )}


    </div>
  );
}
