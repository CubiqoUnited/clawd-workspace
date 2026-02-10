/**
 * CubiQo Agent - Tool Definitions
 * Defines the tool interfaces and execution signatures for agent capabilities
 */

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  default?: any;
}

export interface Tool {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (params: Record<string, any>) => Promise<ToolResult>;
}

export interface ToolResult {
  success: boolean;
  output?: string;
  error?: string;
  data?: any;
}

/**
 * Execute bash commands in the system shell
 */
export const execute_bash: Tool = {
  name: 'execute_bash',
  description: 'Execute a bash command in the system shell. Returns stdout, stderr, and exit code.',
  parameters: [
    {
      name: 'command',
      type: 'string',
      description: 'The bash command to execute',
      required: true,
    },
    {
      name: 'workdir',
      type: 'string',
      description: 'Working directory for command execution',
      required: false,
    },
    {
      name: 'timeout',
      type: 'number',
      description: 'Timeout in seconds (default: 30)',
      required: false,
      default: 30,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual exec API
    throw new Error('Not implemented - to be connected to Clawbot exec');
  },
};

/**
 * View contents of a file
 */
export const view_file: Tool = {
  name: 'view_file',
  description: 'Read and return the contents of a file. Supports text files and basic binary detection.',
  parameters: [
    {
      name: 'path',
      type: 'string',
      description: 'Path to the file to read (relative or absolute)',
      required: true,
    },
    {
      name: 'offset',
      type: 'number',
      description: 'Line number to start reading from (1-indexed)',
      required: false,
    },
    {
      name: 'limit',
      type: 'number',
      description: 'Maximum number of lines to read',
      required: false,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual read API
    throw new Error('Not implemented - to be connected to Clawbot read');
  },
};

/**
 * Create a new file with content
 */
export const create_file: Tool = {
  name: 'create_file',
  description: 'Create a new file with the specified content. Creates parent directories if needed. Overwrites if file exists.',
  parameters: [
    {
      name: 'path',
      type: 'string',
      description: 'Path where the file should be created',
      required: true,
    },
    {
      name: 'content',
      type: 'string',
      description: 'Content to write to the file',
      required: true,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual write API
    throw new Error('Not implemented - to be connected to Clawbot write');
  },
};

/**
 * Edit an existing file by replacing exact text
 */
export const edit_file: Tool = {
  name: 'edit_file',
  description: 'Edit a file by replacing exact text. The oldText must match exactly (including whitespace).',
  parameters: [
    {
      name: 'path',
      type: 'string',
      description: 'Path to the file to edit',
      required: true,
    },
    {
      name: 'oldText',
      type: 'string',
      description: 'Exact text to find and replace (must match exactly)',
      required: true,
    },
    {
      name: 'newText',
      type: 'string',
      description: 'New text to replace the old text with',
      required: true,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual edit API
    throw new Error('Not implemented - to be connected to Clawbot edit');
  },
};

/**
 * Search for files using glob patterns
 */
export const glob_files: Tool = {
  name: 'glob_files',
  description: 'Search for files matching glob patterns (e.g., "*.ts", "src/**/*.tsx"). Returns list of matching file paths.',
  parameters: [
    {
      name: 'pattern',
      type: 'string',
      description: 'Glob pattern to match files (e.g., "*.ts", "**/*.json")',
      required: true,
    },
    {
      name: 'cwd',
      type: 'string',
      description: 'Working directory for the search (default: current directory)',
      required: false,
    },
    {
      name: 'ignore',
      type: 'array',
      description: 'Patterns to ignore (e.g., ["node_modules/**", ".git/**"])',
      required: false,
      default: ['node_modules/**', '.git/**', 'dist/**', 'build/**'],
    },
  ],
  execute: async (params) => {
    // Implementation will use glob library or exec with find
    throw new Error('Not implemented - to be connected to Clawbot exec/fs');
  },
};

/**
 * Search the web using Brave Search
 */
export const web_search: Tool = {
  name: 'web_search',
  description: 'Search the web using Brave Search API. Returns titles, URLs, and snippets for research and information gathering.',
  parameters: [
    {
      name: 'query',
      type: 'string',
      description: 'Search query string',
      required: true,
    },
    {
      name: 'count',
      type: 'number',
      description: 'Number of results to return (1-10, default: 5)',
      required: false,
      default: 5,
    },
    {
      name: 'freshness',
      type: 'string',
      description: 'Filter by time: "pd" (24h), "pw" (week), "pm" (month), "py" (year)',
      required: false,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual web_search API
    throw new Error('Not implemented - to be connected to Clawbot web_search');
  },
};

/**
 * Take a screenshot of a browser or screen
 */
export const screenshot: Tool = {
  name: 'screenshot',
  description: 'Capture a screenshot of a webpage or screen. Returns image data or file path.',
  parameters: [
    {
      name: 'url',
      type: 'string',
      description: 'URL to screenshot (if web-based)',
      required: false,
    },
    {
      name: 'fullPage',
      type: 'boolean',
      description: 'Capture full page instead of viewport only',
      required: false,
      default: false,
    },
    {
      name: 'outputPath',
      type: 'string',
      description: 'Path to save the screenshot',
      required: false,
    },
  ],
  execute: async (params) => {
    // Implementation will call actual browser/screenshot API
    throw new Error('Not implemented - to be connected to Clawbot browser');
  },
};

/**
 * Commit changes to git repository
 */
export const git_commit: Tool = {
  name: 'git_commit',
  description: 'Stage and commit changes to the git repository with a commit message.',
  parameters: [
    {
      name: 'message',
      type: 'string',
      description: 'Commit message describing the changes',
      required: true,
    },
    {
      name: 'files',
      type: 'array',
      description: 'Specific files to stage (default: all changes)',
      required: false,
    },
    {
      name: 'cwd',
      type: 'string',
      description: 'Repository directory (default: current directory)',
      required: false,
    },
  ],
  execute: async (params) => {
    // Implementation will use execute_bash with git commands
    throw new Error('Not implemented - to be connected to Clawbot exec');
  },
};

/**
 * Push commits to remote git repository
 */
export const git_push: Tool = {
  name: 'git_push',
  description: 'Push committed changes to the remote git repository.',
  parameters: [
    {
      name: 'remote',
      type: 'string',
      description: 'Remote name (default: "origin")',
      required: false,
      default: 'origin',
    },
    {
      name: 'branch',
      type: 'string',
      description: 'Branch to push (default: current branch)',
      required: false,
    },
    {
      name: 'cwd',
      type: 'string',
      description: 'Repository directory (default: current directory)',
      required: false,
    },
    {
      name: 'force',
      type: 'boolean',
      description: 'Force push (use with caution)',
      required: false,
      default: false,
    },
  ],
  execute: async (params) => {
    // Implementation will use execute_bash with git commands
    throw new Error('Not implemented - to be connected to Clawbot exec');
  },
};

/**
 * List contents of a directory
 */
export const list_directory: Tool = {
  name: 'list_directory',
  description: 'List files and directories in the specified path. Returns names, sizes, and types.',
  parameters: [
    {
      name: 'path',
      type: 'string',
      description: 'Directory path to list (default: current directory)',
      required: false,
      default: '.',
    },
    {
      name: 'recursive',
      type: 'boolean',
      description: 'List subdirectories recursively',
      required: false,
      default: false,
    },
    {
      name: 'showHidden',
      type: 'boolean',
      description: 'Include hidden files (starting with .)',
      required: false,
      default: false,
    },
  ],
  execute: async (params) => {
    // Implementation will use exec with ls/dir or fs.readdir
    throw new Error('Not implemented - to be connected to Clawbot exec/fs');
  },
};

/**
 * Registry of all available tools
 */
export const tools: Tool[] = [
  execute_bash,
  view_file,
  create_file,
  edit_file,
  glob_files,
  web_search,
  screenshot,
  git_commit,
  git_push,
  list_directory,
];

/**
 * Get a tool by name
 */
export function getTool(name: string): Tool | undefined {
  return tools.find((tool) => tool.name === name);
}

/**
 * Get tool names for display/selection
 */
export function getToolNames(): string[] {
  return tools.map((tool) => tool.name);
}

/**
 * Validate tool parameters before execution
 */
export function validateToolParams(
  tool: Tool,
  params: Record<string, any>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const param of tool.parameters) {
    if (param.required && !(param.name in params)) {
      errors.push(`Missing required parameter: ${param.name}`);
    }

    if (param.name in params) {
      const value = params[param.name];
      const actualType = Array.isArray(value) ? 'array' : typeof value;

      if (actualType !== param.type && value !== null && value !== undefined) {
        errors.push(
          `Parameter ${param.name} expected type ${param.type}, got ${actualType}`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
