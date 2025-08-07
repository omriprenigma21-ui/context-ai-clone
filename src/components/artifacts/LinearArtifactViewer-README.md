# Linear Artifact Viewer Components

A comprehensive suite of React components for displaying project management artifacts with Linear's distinctive interface design. This collection includes three variants designed for different use cases, from basic display to enterprise-level project management with advanced features.

## 🚀 Components Overview

### 1. LinearArtifactViewer (Basic)
The foundational component that replicates Linear's clean, minimal interface for displaying project issues.

**Features:**
- ✅ Exact Linear design replication
- ✅ Issues organized by status (In Progress, Todo, Backlog)
- ✅ Priority indicators with color coding
- ✅ Assignee information and avatars
- ✅ Due dates and issue types
- ✅ Right sidebar with project overview
- ✅ Responsive design

### 2. EnhancedLinearArtifactViewer (Interactive)
Enhanced version with interactivity, filtering, and multiple view modes.

**Additional Features:**
- 🔍 Search and advanced filtering
- 📊 Multiple view modes (List, Kanban, Timeline, Calendar)
- 🎯 Drag-and-drop issue management
- 📤 Export to PDF/CSV
- ⚡ Real-time collaboration indicators
- 🔄 Live updates and sorting

### 3. AdvancedLinearArtifactViewer (Enterprise)
The most comprehensive version with enterprise features for complex project management needs.

**Additional Enterprise Features:**
- ⌨️ Command palette (⌘K) with keyboard shortcuts
- 🎨 Project templates (Software Dev, Marketing, Research)
- 📝 Custom fields with validation
- 🏗️ Configurable workflows
- 📋 Advanced export with custom field data
- 🎯 Template-based quick setup

## 📦 Installation

The components are already integrated into this repository with all required dependencies installed.

**Required Dependencies:**
```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@radix-ui/react-*": "Various versions",
  "cmdk": "^1.1.1",
  "date-fns": "^4.1.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^3.0.1",
  "lucide-react": "^0.475.0"
}
```

## 🎯 Usage Examples

### Basic Implementation

```tsx
import { LinearArtifactViewer, type ProjectData } from '@/components/artifacts/linear-artifact-viewer-index';

const projectData: ProjectData = {
  name: "Product Development",
  icon: "🚀",
  issues: [
    {
      id: "PROJ-1",
      title: "Implement user authentication",
      assignee: {
        name: "John Doe",
        initials: "JD",
        avatar: "/avatars/john.jpg"
      },
      dueDate: "Jan 15",
      priority: "high",
      status: "in-progress",
      type: "feature"
    }
  ],
  assignees: [
    { name: "John Doe", initials: "JD", issueCount: 5 }
  ]
};

function MyProjectView() {
  return (
    <LinearArtifactViewer
      data={projectData}
      showHeader={true}
      showSidebar={true}
    />
  );
}
```

### Enhanced Interactive Version

```tsx
import { EnhancedLinearArtifactViewer } from '@/components/artifacts/linear-artifact-viewer-index';

function InteractiveProjectView() {
  const handleIssueUpdate = (issueId: string, updates: Partial<ProjectIssue>) => {
    console.log(`Updating issue ${issueId}:`, updates);
    // Handle real-time updates here
  };

  return (
    <EnhancedLinearArtifactViewer
      data={projectData}
      onIssueUpdate={handleIssueUpdate}
      realTimeUsers={[
        { name: "Jane Smith", isViewing: true }
      ]}
    />
  );
}
```

### Enterprise Version with Templates

```tsx
import { AdvancedLinearArtifactViewer } from '@/components/artifacts/linear-artifact-viewer-index';

function EnterpriseProjectView() {
  const handleTemplateChange = (template: ProjectTemplate) => {
    console.log('Applying template:', template.name);
    // Handle template application
  };

  return (
    <AdvancedLinearArtifactViewer
      data={projectData}
      onTemplateChange={handleTemplateChange}
      onIssueUpdate={handleIssueUpdate}
    />
  );
}
```

## 🏗️ Data Structure

### Core Types

```tsx
interface ProjectIssue {
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
  customFields?: Record<string, any>; // Enterprise only
}

interface ProjectData {
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
  template?: ProjectTemplate; // Enterprise only
  customFields?: CustomField[]; // Enterprise only
}
```

### Enterprise Custom Fields

```tsx
interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'user' | 'url' | 'checkbox' | 'currency';
  required?: boolean;
  options?: string[]; // For select/multiselect
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}
```

## 🎨 Built-in Project Templates

### Software Development Template
- **Custom Fields:** Story Points, Sprint, Technical Debt, Code Reviewer, Repository URL
- **Issue Types:** Epic, Story, Task, Bug
- **Workflow:** Backlog → Todo → In Progress → Code Review → Testing → Done

### Marketing Campaign Template
- **Custom Fields:** Budget, Target Audience, Marketing Channels, Launch Date, Campaign URL
- **Issue Types:** Campaign, Creative, Content, Analytics
- **Workflow:** Ideation → Planning → Content Creation → Review & Approval → Execution → Performance Analysis

### Research Project Template
- **Custom Fields:** Research Methodology, Sample Size, Ethics Approval, Funding Source, Publication Target
- **Issue Types:** Hypothesis, Experiment, Analysis, Publication
- **Workflow:** Proposal → Literature Review → Data Collection → Analysis → Writing → Published

## ⌨️ Keyboard Shortcuts (Enterprise)

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `⌘⇧L` | Switch to List view |
| `⌘⇧K` | Switch to Kanban view |
| `⌘⇧T` | Switch to Timeline view |
| `⌘⇧C` | Switch to Calendar view |

## 🔧 Customization

### Styling

The components use Tailwind CSS and can be customized through:

1. **CSS Custom Properties:**
```css
.linear-viewer {
  --priority-high: #f97316;
  --priority-medium: #6b7280;
  --priority-low: #9ca3af;
}
```

2. **Component Props:**
```tsx
<LinearArtifactViewer
  className="custom-project-viewer"
  showHeader={false}
  showSidebar={true}
/>
```

### Custom Templates

Create your own project templates:

```tsx
const customTemplate: ProjectTemplate = {
  id: 'custom-workflow',
  name: 'Custom Workflow',
  description: 'Your custom project template',
  category: 'general',
  icon: '⚡',
  defaultIssueTypes: ['task', 'milestone'],
  customFields: [
    {
      id: 'department',
      name: 'Department',
      type: 'select',
      options: ['Engineering', 'Design', 'Marketing']
    }
  ],
  defaultWorkflow: {
    statuses: [
      { id: 'planned', name: 'Planned', color: '#6b7280' },
      { id: 'active', name: 'Active', color: '#f59e0b' },
      { id: 'completed', name: 'Completed', color: '#10b981' }
    ]
  }
};
```

## 📊 Export Features

### PDF Export
- Full-page screenshots with vector graphics
- Multi-page support for large projects
- Includes all visible data and custom fields

### CSV Export (Enhanced)
- All issue data including custom fields
- Configurable column selection
- UTF-8 encoding for international characters

### Real-time Data
- Live collaboration indicators
- Online status for assignees
- Real-time updates (requires WebSocket integration)

## 🔌 Integration with AI Agents

Transform your agent output to component format:

```tsx
function transformAgentData(agentOutput: any): ProjectData {
  return {
    name: agentOutput.projectName,
    icon: agentOutput.projectIcon,
    issues: agentOutput.tasks.map(task => ({
      id: task.identifier,
      title: task.description,
      assignee: task.assignedTo ? {
        name: task.assignedTo.username,
        initials: getInitials(task.assignedTo.fullName),
      } : undefined,
      dueDate: formatDate(task.deadline),
      priority: mapPriority(task.importance),
      status: mapStatus(task.currentState),
      type: task.category
    })),
    assignees: calculateAssigneeStats(agentOutput.tasks)
  };
}
```

## 🚀 Performance Considerations

- **Virtualization:** Large issue lists (>100 items) use virtual scrolling
- **Memoization:** All components use React.memo for optimal re-rendering
- **Lazy Loading:** Heavy features load on-demand
- **Debounced Search:** 300ms debounce on search input
- **Optimistic Updates:** UI updates immediately, syncs in background

## 🐛 Troubleshooting

### Common Issues

1. **Missing Dependencies:**
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   ```

2. **TypeScript Errors:**
   - Ensure all UI components are properly imported
   - Check that custom field types match the defined interface

3. **Styling Issues:**
   - Verify Tailwind CSS is properly configured
   - Check that CSS custom properties are defined

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This component suite is built for integration into your project and can be modified as needed.

---

For more examples and advanced usage patterns, see the `integration-example.tsx` file in this directory.
