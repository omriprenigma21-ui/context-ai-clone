// Example: How to integrate LinearArtifactViewer into your existing app

import React from 'react';
import { AdvancedLinearArtifactViewer, type ProjectData } from './index';

// This is what your agent would generate
interface AgentProjectOutput {
  projectName: string;
  tasks: Array<{
    id: string;
    title: string;
    assignee?: string;
    deadline: string;
    priority: 'urgent' | 'important' | 'normal';
    status: 'active' | 'pending' | 'archived';
    category: string;
  }>;
  teamMembers: Array<{
    username: string;
    fullName: string;
    taskCount: number;
  }>;
}

// Transform agent data to component format
function transformAgentData(agentOutput: AgentProjectOutput): ProjectData {
  return {
    name: agentOutput.projectName,
    icon: agentOutput.projectName.charAt(0).toUpperCase(),
    issues: agentOutput.tasks.map(task => ({
      id: task.id,
      title: task.title,
      assignee: task.assignee ? {
        name: task.assignee,
        initials: task.assignee.split(' ').map(n => n[0]).join('').toUpperCase(),
      } : undefined,
      dueDate: task.deadline,
      priority: task.priority === 'urgent' ? 'high' :
                task.priority === 'important' ? 'medium' : 'low',
      status: task.status === 'active' ? 'in-progress' :
              task.status === 'pending' ? 'todo' : 'backlog',
      type: task.category as 'feature' | 'bug' | 'task'
    })),
    assignees: agentOutput.teamMembers.map(member => ({
      name: member.username,
      initials: member.fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
      issueCount: member.taskCount
    }))
  };
}

// Your existing app component
interface ProjectArtifactProps {
  agentData: AgentProjectOutput;
  embedded?: boolean;
}

export function ProjectArtifact({ agentData, embedded = false }: ProjectArtifactProps) {
  const projectData = transformAgentData(agentData);

  return (
    <div className={embedded ? "border rounded-lg" : ""}>
      <AdvancedLinearArtifactViewer
        data={projectData}
        showHeader={!embedded}
        showSidebar={true}
        className={embedded ? "max-h-96 overflow-y-auto" : ""}
      />
    </div>
  );
}

// Usage in your artifact viewer system
export function ArtifactViewerExample() {
  const sampleAgentOutput: AgentProjectOutput = {
    projectName: "AI Assistant Platform",
    tasks: [
      {
        id: "AI-001",
        title: "Implement natural language processing",
        assignee: "john.doe",
        deadline: "Feb 15",
        priority: "urgent",
        status: "active",
        category: "feature"
      },
      {
        id: "AI-002",
        title: "Set up vector database",
        assignee: "jane.smith",
        deadline: "Feb 20",
        priority: "important",
        status: "pending",
        category: "feature"
      }
    ],
    teamMembers: [
      { username: "john.doe", fullName: "John Doe", taskCount: 5 },
      { username: "jane.smith", fullName: "Jane Smith", taskCount: 3 }
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Project Management Artifact</h2>

      {/* Full view */}
      <ProjectArtifact agentData={sampleAgentOutput} />

      {/* Embedded view */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Embedded View</h3>
        <ProjectArtifact agentData={sampleAgentOutput} embedded={true} />
      </div>
    </div>
  );
}
