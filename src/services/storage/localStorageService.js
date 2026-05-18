/**
 * localStorage lo uso para mantener datos persistentes aunque cierro el navegador
 * 
 */

import { BrowserStorageService } from "./BrowserStorageService";

export const localStorageService = new BrowserStorageService(localStorage);