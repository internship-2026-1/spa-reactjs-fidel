/**
 * Centralizo la clase y sus metodos para poder consumir api-back usando el patron de singleton
 */
import { config } from "../../config";
import { sessionStorageService } from "../storage/sessionStorageService";

class ApiService {
  static instance;

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  getDefaultHeaders() {
    //const token = sessionStorage.getItem("token");
    const token = sessionStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      "x-api-key": config.appApiKey ?? "", //import.meta.env.VITE_API_KEY
      "x-origin": config.appAppOrigin ?? window.location.origin, //import.meta.env.VITE_APP_ORIGIN
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  buildUrl(endpoint) {
    if (/^https?:\/\//.test(endpoint)) {
      return endpoint;
    }

    const baseUrl = config.appApiUrl?.replace(/\/$/, "") ?? "";
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;//http://localhost:8080/core
  }

  //tiempo de espera por cada intento
  getTimeout(options = {}){
    return Number(options.timeout ?? config.appApiTimeout ?? 10000);
  }

  //cancelar cada peticion si tarda mucho
  createAbortController( options = {} ){
    const controller = new AbortController();
    const timeout = this.getTimeout(options);

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    return { controller, timeoutId };
  };

  //teporizador
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

  //-post = async post(endpoint, body, options = {}) {}
  async post(endpoint, body, options = {}){
    const { headers, timeout, ...fetchOptions} = options;
    const { controller, timeoutId } = this.createAbortController(options);

    try {
      const response = await fetch(this.buildUrl(endpoint), {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...this.getDefaultHeaders(),
          ...(headers ?? {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      const data = await response.json().catch(() => null);

      if(!response.ok){
        throw new Error (data?.message || `POST ${endpoint} failed with status ${response.status}`);
        error.data = data;
        error.status = response.status;
        throw error;
      };

      return data
    } catch (error) {
      if (error.name === 'AbortError'){
        throw new Error(`POST ${endpoint} failed: request timeout`);
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // PUT: async put(endpoint, body, options = {}) {}
  async put(endpoint, body, options = {}){
    const { headers, timeout, ...fetchOptions } = options;
    const { controller, timeoutId } = this.createAbortController(options);

    try {
      const response = await fetch(this.buildUrl(endpoint), {
        ...fetchOptions,
        method: "PUT",
        headers: {
          ...this.getDefaultHeaders(),
          ...(headers ?? {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if(!response.ok){
        throw new Error( data?.message || `PUT ${endpoint} failed with estatus ${response.status}`);
      };

      return data;
    } catch (error) {
      if(error.name === 'AbortError'){
        throw new Error(`PUT ${endpoint} failed: request timeout`);
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  //PATCH: async patch(endpoint, body, options = {}) {}
  async patch(endpoint, body, options = {}){
    const {headers, timeout, ...fetchOptions } = options;
    const {controller, timeoutId } = this.createAbortController(options);

    try {
      const response = await fetch(this.buildUrl(endpoint),{ 
        ...fetchOptions,
        method: "PATCH",
        headers: {
          ...this.getDefaultHeaders(),
          ...(headers ?? {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok){
        throw new Error( data?.message || `PATCH ${endpoint} failed with status ${response.status}`);
      };

      return data;

    } catch (error) {
      if(error.name === "AbortError"){
        throw new Error (`PATCH ${endpoint} failed: request timeout`);
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    };
  };

  //DELETE: async delete(endpoint, options = {}) {}
  async delete(endpoint, options= {}){
    const {headers, timeout, ...fetchOptions } = options;
    const {controller, timeoutId } = this.createAbortController(options)

    try {
      const response = await fetch(this.buildUrl(endpoint), {
        ...fetchOptions,
        method: "DELETE",
        headers: {
          ...this.getDefaultHeaders(),
          ...(headers ?? {}),
        },
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if(!response.ok){
        throw new Error( data?.message || `DELETE ${endpoint} failed with status ${response.status}`);
      };

      response.data;
    } catch (error) {
      if (error.name === 'AbortError'){
        throw new Error(`DELETE ${endpoint} failed: request timeout`);
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

}

export const apiService = ApiService.getInstance();