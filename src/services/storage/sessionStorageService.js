/**
 * sessionStorageService uso para guardar datos temporales que solo existen si la pestana del navegador este abierto
 */

import { BrowserStorageService } from "./BrowserStorageService";

export const sessionStorageService = new BrowserStorageService(sessionStorage);