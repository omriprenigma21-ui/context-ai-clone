# Linear Artifact Viewer

A standalone React component for displaying project management artifacts in Linear's interface style. This component can be integrated into your existing application to display project issues and milestones created by your agents.

## Features

- ✅ Exact Linear design replication
- ✅ Displays issues organized by status (In Progress, Todo, Backlog)
- ✅ Priority indicators with color coding
- ✅ Assignee information and avatars
- ✅ Due dates and issue types
- ✅ Right sidebar with project overview and assignee stats
- ✅ Responsive design
- ✅ Fully customizable and embeddable

## Usage

### Basic Integration

```tsx
import { LinearArtifactViewer, ProjectData } from './components/LinearArtifactViewer';

// Data structure that your agents would generate
const projectData: ProjectData = {
  name: "Your Project Name",
  icon: "P", // Optional project icon
  issues: [
    {
      id: "PROJ-1",
      title: "Implement user authentication",
      assignee: {
        name: "john.doe",
        initials: "JD",
        avatar: "/path/to/avatar.jpg" // Optional
      },
      dueDate: "Jan 15",
      priority: "high", // "high" | "medium" | "low"
      status: "in-progress", // "in-progress" | "todo" | "backlog"
      type: "feature" // "feature" | "bug" | "task"
    },
    // ... more issues
  ],
  assignees: [ // Optional assignee statistics
    { name: "john.doe", initials: "JD", issueCount: 5 },
    { name: "jane.smith", initials: "JS", issueCount: 3 }
  ]
};

function MyApp() {
  return (
    <LinearArtifactViewer
      data={projectData}
      showHeader={true}
      showSidebar={true}
      className="custom-class"
    />
  );
}
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ProjectData` | Required | Project data containing issues and metadata |
| `className` | `string` | `""` | Additional CSS classes |
| `showHeader` | `boolean` | `true` | Show/hide the header with tabs |
| `showSidebar` | `boolean` | `true` | Show/hide the right sidebar |

### Data Types

```tsx
interface ProjectIssue {
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

interface ProjectData {
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
```

## Integration into Existing Apps

### Option 1: Copy Component Files

1. Copy the following files to your project:
   - `src/components/LinearArtifactViewer.tsx`
   - `src/components/ui/` (all shadcn components)

2. Install dependencies:
   ```bash
   npm install lucide-react class-variance-authority clsx tailwind-merge
   ```

3. Ensure Tailwind CSS is configured in your project

### Option 2: Direct Import

If you're using a module bundler that supports direct imports:

```tsx
import { LinearArtifactViewer } from 'path/to/LinearArtifactViewer';
```

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Passing custom className:**
   ```tsx
   <LinearArtifactViewer data={data} className="my-custom-styles" />
   ```

2. **Overriding CSS variables:**
   ```css
   .linear-viewer {
     --priority-high: #f97316;
     --priority-medium: #6b7280;
     --priority-low: #9ca3af;
   }
   ```

3. **Modifying the component directly** for specific styling needs

### Layout Options

```tsx
// Embedded view without header
<LinearArtifactViewer
  data={data}
  showHeader={false}
  className="border rounded-lg"
/>

// Compact view without sidebar
<LinearArtifactViewer
  data={data}
  showSidebar={false}
/>
```

## Agent Integration

When your agents generate project management artifacts, format the data according to the `ProjectData` interface:

```tsx
// Example agent output transformation
function transformAgentOutput(agentData: any): ProjectData {
  return {
    name: agentData.projectName,
    icon: agentData.projectIcon,
    issues: agentData.tasks.map(task => ({
      id: task.identifier,
      title: task.description,
      assignee: task.assignedTo ? {
        name: task.assignedTo.username,
        initials: getInitials(task.assignedTo.fullName),
        avatar: task.assignedTo.avatarUrl
      } : undefined,
      dueDate: formatDate(task.deadline),
      priority: mapPriority(task.importance),
      status: mapStatus(task.currentState),
      type: task.category
    })),
    assignees: calculateAssigneeStats(agentData.tasks)
  };
}
```

## Dependencies

- React 18+
- Tailwind CSS 3+
- lucide-react (for icons)
- shadcn/ui components (included)

## License

This component is built for your specific use case and can be modified as needed.
