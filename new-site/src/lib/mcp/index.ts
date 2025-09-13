// Model Context Protocol (MCP) Integration
// For connecting external MCP servers and AI agents

export interface MCPEndpoint {
  id: string;
  url: string;
  name: string;
  description: string;
  capabilities: string[];
  authToken?: string;
}

export interface MCPRequest {
  method: string;
  params: Record<string, any>;
}

export interface MCPResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class MCPClient {
  private endpoints: MCPEndpoint[] = [];
  private authToken: string;

  constructor() {
    this.authToken = import.meta.env.VITE_MCP_AUTH_TOKEN || '';
    this.loadEndpoints();
  }

  private loadEndpoints() {
    const endpointsStr = import.meta.env.VITE_MCP_ENDPOINTS || '[]';
    try {
      const endpoints = JSON.parse(endpointsStr);
      this.endpoints = endpoints.map((url: string, index: number) => ({
        id: `endpoint_${index}`,
        url,
        name: `MCP Server ${index + 1}`,
        description: 'External MCP server',
        capabilities: ['content', 'media', 'seo']
      }));
    } catch (error) {
      console.warn('Failed to parse MCP endpoints:', error);
    }
  }

  async callEndpoint(endpointId: string, request: MCPRequest): Promise<MCPResponse> {
    const endpoint = this.endpoints.find(e => e.id === endpointId);
    if (!endpoint) {
      return { success: false, error: 'Endpoint not found' };
    }

    try {
      const response = await fetch(`${endpoint.url}/mcp/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${endpoint.authToken || this.authToken}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`MCP call to ${endpoint.name} failed:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Content generation through MCP
  async generateContent(prompt: string, type: 'service' | 'case' | 'article'): Promise<MCPResponse> {
    const contentEndpoint = this.endpoints.find(e => 
      e.capabilities.includes('content')
    );

    if (!contentEndpoint) {
      return { success: false, error: 'No content generation endpoint available' };
    }

    return await this.callEndpoint(contentEndpoint.id, {
      method: 'generate_content',
      params: { prompt, type }
    });
  }

  // SEO optimization through MCP
  async optimizeForSEO(content: string, keywords: string[]): Promise<MCPResponse> {
    const seoEndpoint = this.endpoints.find(e => 
      e.capabilities.includes('seo')
    );

    if (!seoEndpoint) {
      return { success: false, error: 'No SEO endpoint available' };
    }

    return await this.callEndpoint(seoEndpoint.id, {
      method: 'optimize_seo',
      params: { content, keywords }
    });
  }

  // Media generation through MCP
  async generateMedia(prompt: string, type: 'image' | 'video'): Promise<MCPResponse> {
    const mediaEndpoint = this.endpoints.find(e => 
      e.capabilities.includes('media')
    );

    if (!mediaEndpoint) {
      return { success: false, error: 'No media generation endpoint available' };
    }

    return await this.callEndpoint(mediaEndpoint.id, {
      method: 'generate_media',
      params: { prompt, type }
    });
  }

  // Health check for all endpoints
  async healthCheck(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const endpoint of this.endpoints) {
      try {
        const response = await fetch(`${endpoint.url}/health`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${endpoint.authToken || this.authToken}`
          },
          timeout: 5000
        } as RequestInit);
        
        results[endpoint.id] = response.ok;
      } catch {
        results[endpoint.id] = false;
      }
    }
    
    return results;
  }

  // Get available endpoints
  getEndpoints(): MCPEndpoint[] {
    return [...this.endpoints];
  }

  // Add new endpoint
  addEndpoint(endpoint: Omit<MCPEndpoint, 'id'>): string {
    const id = `endpoint_${Date.now()}`;
    this.endpoints.push({ ...endpoint, id });
    return id;
  }

  // Remove endpoint
  removeEndpoint(endpointId: string): boolean {
    const index = this.endpoints.findIndex(e => e.id === endpointId);
    if (index >= 0) {
      this.endpoints.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const mcpClient = new MCPClient();

// Agent integration helpers
export const agentIntegrations = {
  async processContentTask(task: {
    type: 'generate' | 'optimize';
    content?: string;
    prompt?: string;
    keywords?: string[];
  }): Promise<string> {
    if (task.type === 'generate' && task.prompt) {
      const response = await mcpClient.generateContent(task.prompt, 'service');
      if (response.success) {
        return response.data.content || task.prompt;
      }
    } else if (task.type === 'optimize' && task.content && task.keywords) {
      const response = await mcpClient.optimizeForSEO(task.content, task.keywords);
      if (response.success) {
        return response.data.content || task.content;
      }
    }
    
    return task.content || task.prompt || '';
  },

  async generateServiceImages(serviceName: string, count: number = 3): Promise<string[]> {
    const images: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const prompt = `Professional ${serviceName} service, industrial setting, high quality`;
      const response = await mcpClient.generateMedia(prompt, 'image');
      
      if (response.success && response.data.url) {
        images.push(response.data.url);
      }
    }
    
    return images;
  }
};