"use client";

import { useState } from "react";
import {
  X,
  Search,
  Star,
  ArrowUpRight,
  Puzzle,
  HardDrive,
  CheckSquare,
  Settings,
  MessageCircle,
  Mail,
  Zap,
  BookOpen,
  User,
  ChevronRight,
  ChevronLeft,
  Briefcase
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  isBeta?: boolean;
  isContactUs?: boolean;
  isTalkToSales?: boolean;
}

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const integrations: Integration[] = [
  // Popular/Recommended
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, search conversations, and manage team communication.",
    category: "communication",
    logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
    isPopular: true,
    isRecommended: true
  },
  {
    id: "notion",
    name: "Notion",
    description: "Read and update pages, databases, and organize your knowledge base.",
    category: "knowledge",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    isPopular: true,
    isRecommended: true
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Upload, download, and share files across all your devices.",
    category: "storage",
    logo: "https://cfl.dropboxstatic.com/static/images/favicon-vflUeLeeY.ico",
    isPopular: true,
    isRecommended: true
  },
  {
    id: "google-suite",
    name: "Google Suite",
    description: "Access your Google Workspace (Gmail, Calendar, Drive, etc.)",
    category: "communication",
    logo: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    isPopular: true,
    isRecommended: true
  },

  // Storage & Drive
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Access, upload, and manage files in your Google Drive storage.",
    category: "storage",
    logo: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
    isRecommended: true
  },
  {
    id: "onedrive",
    name: "OneDrive",
    description: "Browse, upload, and sync documents across Microsoft 365.",
    category: "storage",
    logo: "https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/onedrive_32x1.svg",
    isRecommended: true
  },

  // Tasks
  {
    id: "calendly",
    name: "Calendly",
    description: "Access your Calendly events",
    category: "tasks",
    logo: "https://assets.calendly.com/packs/frontend/media/icon-square-87afeb9e9de2e4b4f8cb.png",
    isRecommended: true
  },
  {
    id: "trello",
    name: "Trello",
    description: "Create cards, manage boards, and track project progress.",
    category: "tasks",
    logo: "https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg",
    isRecommended: true
  },

  // Management
  {
    id: "linear",
    name: "Linear",
    description: "Create tasks, track progress, and manage your development workflow.",
    category: "management",
    logo: "https://linear.app/favicon.ico",
    isRecommended: true
  },
  {
    id: "github",
    name: "Github",
    description: "Browse repositories, manage issues, and interact with your codebase.",
    category: "management",
    logo: "https://github.githubassets.com/favicons/favicon.png",
    isBeta: true,
    isRecommended: true
  },
  {
    id: "jira",
    name: "Jira",
    description: "Access your Jira projects and issues",
    category: "management",
    logo: "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon-32x32.png",
    isRecommended: true
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Access your Zendesk tickets",
    category: "management",
    logo: "https://d1eipm3vz40hy0.cloudfront.net/images/favicon-32x32.png",
    isBeta: true,
    isRecommended: true
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Access your QuickBooks data",
    category: "management",
    logo: "https://c.staticblitz.com/assets/quickbooks-64a739b6be1bb.svg",
    isBeta: true,
    isRecommended: true
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Manage accounts, contacts, leads, opportunities, and run reports in your CRM.",
    category: "management",
    logo: "https://c.staticblitz.com/assets/salesforce-f66797cb4e0b8.svg",
    isBeta: true,
    isRecommended: true
  },

  // Automation
  {
    id: "airtable",
    name: "Airtable",
    description: "Query databases, create records, and manage your structured data.",
    category: "automation",
    logo: "https://static.airtable.com/images/favicon/airtable_32x32.png",
    isRecommended: true
  },
  {
    id: "hubspot",
    name: "Hubspot",
    description: "Manage contacts, deals, and CRM data to streamline your sales process.",
    category: "automation",
    logo: "https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_sprocket-1.svg",
    isRecommended: true
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Query databases, manage authentication, and work with backend services.",
    category: "automation",
    logo: "https://supabase.com/favicon/favicon-32x32.png",
    isRecommended: true,
    isBeta: true
  },

  // Mail
  {
    id: "gmail",
    name: "Gmail",
    description: "Send emails, read messages, and manage your inbox.",
    category: "mail",
    logo: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    isRecommended: true
  },

  // Knowledge
  {
    id: "sp-capital-iq",
    name: "S&P Capital IQ",
    description: "Access comprehensive financial data, analytics, and research tools for institutional investors.",
    category: "knowledge",
    logo: "https://www.spglobal.com/favicon.ico",
    isContactUs: true,
    isRecommended: true
  },
  {
    id: "factset",
    name: "FactSet",
    description: "Access comprehensive financial data, analytics, and research tools for institutional investors.",
    category: "knowledge",
    logo: "https://www.factset.com/hubfs/Assets/images/factset-favicon.png",
    isContactUs: true,
    isRecommended: true
  },

  // Professional
  {
    id: "snowflake",
    name: "Snowflake",
    description: "Access your data warehouse, run analytics queries, and manage cloud data platform resources.",
    category: "professional",
    logo: "https://www.snowflake.com/wp-content/uploads/2021/05/snowflake-favicon.png",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    description: "Manage IT service management, incident tracking, and enterprise workflow automation.",
    category: "professional",
    logo: "https://www.servicenow.com/etc/designs/servicenow/favicon.ico",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "affinity",
    name: "Affinity",
    description: "Manage relationship intelligence and CRM data for deal flow and networking.",
    category: "professional",
    logo: "https://www.affinity.co/favicon.ico",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "apollo",
    name: "Apollo",
    description: "Access sales intelligence, prospecting tools, and contact database.",
    category: "professional",
    logo: "https://www.apollo.io/favicon.ico",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "asana",
    name: "Asana",
    description: "Manage projects, tasks, and team collaboration workflows.",
    category: "professional",
    logo: "https://d3ki9tyy5l5ruj.cloudfront.net/obj/db55b3cd7e4cd8e8b37945c8a0e7aad7b8b6b572/icons/asana_1000x1000.png",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    description: "Access Git repositories, manage code, and collaborate on development projects.",
    category: "professional",
    logo: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-32x32.png",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "canvas",
    name: "Canvas",
    description: "Access learning management system data, courses, and educational content.",
    category: "professional",
    logo: "https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png",
    isTalkToSales: true,
    isRecommended: true
  },
  {
    id: "clickup",
    name: "ClickUp",
    description: "Manage tasks, projects, and team productivity with all-in-one workspace.",
    category: "professional",
    logo: "https://d2gdx5nv84j0ul.cloudfront.net/uploads/brand_asset/file/24/click_up_brand_assets.png",
    isTalkToSales: true,
    isRecommended: true
  }
];

const categories = [
  { id: "all", label: "All", icon: Puzzle },
  { id: "storage", label: "Storage & Drive", icon: HardDrive },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "management", label: "Management", icon: Settings },
  { id: "communication", label: "Communication", icon: MessageCircle },
  { id: "mail", label: "Mail", icon: Mail },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
  { id: "professional", label: "Professional", icon: Briefcase }
];

const categoryDescriptions = {
  storage: "Access and manage your files across cloud storage platforms",
  tasks: "Organize your schedule and manage calendar events",
  management: "Track projects, issues, and development workflows",
  communication: "Connect with team messaging and communication tools",
  mail: "Manage your email communication and messaging",
  automation: "Connect databases, CRM systems, and workflow tools",
  knowledge: "Professional data and research tools for advanced analysis",
  professional: "Business tools and enterprise solutions for professional workflows"
};

export const IntegrationsModal = ({ isOpen, onClose }: IntegrationsModalProps) => {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"popular" | "recommended">("popular");

  if (!isOpen) return null;

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;

    if (selectedCategory !== "all") {
      // When a specific category is selected, show all integrations in that category
      return matchesSearch && matchesCategory;
    } else {
      // When "all" is selected, show ALL integrations from ALL categories
      return matchesSearch;
    }
  });

  const handleConnect = (integrationId: string) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
    } else {
      setConnectedIntegrations(prev => [...prev, integrationId]);
    }
  };

  const renderCategorySpecificContent = () => {
    if (selectedCategory === "all") {
      return (
        <div>
          <div className="flex items-center gap-6 mb-2">
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex items-center gap-2 text-sm font-medium ${
                activeTab === "popular"
                  ? "text-gray-900"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              <Star className="w-4 h-4" />
              Popular
            </button>
            <button
              onClick={() => setActiveTab("recommended")}
              className={`text-sm font-medium ${
                activeTab === "recommended"
                  ? "text-gray-900"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Recommended
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Showing all available integrations across all categories
          </p>
        </div>
      );
    } else {
      const category = categories.find(cat => cat.id === selectedCategory);
      const Icon = category?.icon || Puzzle;

      return (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">{category?.label}</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {categoryDescriptions[selectedCategory as keyof typeof categoryDescriptions]}
          </p>
        </div>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)"
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Puzzle className="w-5 h-5 text-gray-700" />
              <h1 className="text-xl font-semibold text-gray-900">Integrations</h1>
            </div>
            <p className="text-sm text-gray-600">
              Connect your favorite apps and let Context work seamlessly across your digital workspace.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pb-4">
          <div className="relative flex items-center">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('category-tabs-container');
                if (container) {
                  container.scrollBy({ left: -200, behavior: 'smooth' });
                }
              }}
              className="absolute left-0 z-10 p-1 bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-200 transition-colors"
              style={{ marginLeft: '-8px' }}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Category Tabs Container */}
            <div
              id="category-tabs-container"
              className="flex items-center gap-1 mx-8"
              style={{
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0 ${
                      selectedCategory === category.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('category-tabs-container');
                if (container) {
                  container.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }}
              className="absolute right-0 z-10 p-1 bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-200 transition-colors"
              style={{ marginRight: '-8px' }}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="px-6 pb-6"
          style={{
            maxHeight: 'calc(95vh - 250px)',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* My Connections Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-500" />
              <h2 className="text-base font-semibold text-gray-900">My Connections</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Apps and services you've connected</p>

            {connectedIntegrations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No connected integrations yet. Connect an integration below to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {connectedIntegrations.map(integrationId => {
                  const integration = integrations.find(i => i.id === integrationId);
                  if (!integration) return null;

                  return (
                    <div
                      key={integration.id}
                      className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-8 h-8 rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-green-700">Connected</p>
                      </div>
                      <button
                        onClick={() => handleConnect(integration.id)}
                        className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50"
                      >
                        Disconnect
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category-specific content */}
          <div>
            {renderCategorySpecificContent()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIntegrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => handleConnect(integration.id)}
                >
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-10 h-10 rounded flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml;base64,${btoa(`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#3b82f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="18" font-family="system-ui">${integration.name.charAt(0)}</text></svg>`)}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {integration.name}
                      </h3>
                      {integration.isBeta && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                          Beta
                        </span>
                      )}
                      {integration.isContactUs && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                          Contact Us
                        </span>
                      )}
                      {integration.isTalkToSales && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                          Talk to Sales
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No integrations found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
