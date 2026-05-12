import { config } from "../../config";

class ApiService {
  static instance;

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  getDefaultHeaders() {
    const token = sessionStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY ?? "",
      "x-origin": import.meta.env.VITE_APP_ORIGIN ?? window.location.origin,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  buildUrl(endpoint) {
    if (/^https?:\/\//.test(endpoint)) {
      return endpoint;
    }

    const baseUrl = config.apiUrl?.replace(/\/$/, "") ?? "";
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;
  }

  async get(endpoint, options = {}) {
    const response = await fetch(this.buildUrl(endpoint), {
      method: "GET",
      headers: {
        ...this.getDefaultHeaders(),
        ...(options.headers ?? {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed with status ${response.status}`);
    }

    return response.json();
  }

  // async post(endpoint, body, options = {}) {}
  // async put(endpoint, body, options = {}) {}
  // async patch(endpoint, body, options = {}) {}
  // async delete(endpoint, options = {}) {}
}

export const apiService = ApiService.getInstance();