// API service for Fitzer app
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('fitzer.token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('fitzer.token', token);
    } else {
      localStorage.removeItem('fitzer.token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(name, username) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ name, username }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async register(name, username, email = null) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, username, email }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // User methods
  async getUserProfile() {
    return this.request('/user/profile');
  }

  // BMI methods
  async saveBmiData(bmiData) {
    return this.request('/bmi', {
      method: 'POST',
      body: JSON.stringify(bmiData),
    });
  }

  async getBmiData() {
    return this.request('/bmi');
  }

  async getWeightHistory() {
    return this.request('/weight-history');
  }

  // Diet plan methods
  async saveDietPlan(dietPlan) {
    return this.request('/diet-plan', {
      method: 'POST',
      body: JSON.stringify(dietPlan),
    });
  }

  async getDietPlan() {
    return this.request('/diet-plan');
  }

  // Modules methods
  async saveModules(modules) {
    return this.request('/modules', {
      method: 'POST',
      body: JSON.stringify({ modules }),
    });
  }

  async getModules() {
    return this.request('/modules');
  }

  // Preferences methods
  async updatePreferences(preferences) {
    return this.request('/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async getPreferences() {
    return this.request('/preferences');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
