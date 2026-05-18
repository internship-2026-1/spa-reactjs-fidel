/*aqui defino la logica de lectura y validacion de variables*/
//src/config/env.js

//lista de variables obligarias
const requiredEnvVars = ["VITE_APP_NAME", "VITE_API_URLs", "VITE_APP_ENV", "VITE_APP_VERSION", "VITE_API_URL", "VITE_X_API_KEY", "VITE_APP_ORIGIN", "VITE_STORAGE_PREFIX", "VITE_API_TIMEOUT"];

//valido si existe en mi env
function getEnvVar(name) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

//objeto config listo pra usar
export function loadEnvConfig() {
  for (const envVar of requiredEnvVars) {
    getEnvVar(envVar);
  }

  return {
    appName: getEnvVar("VITE_APP_NAME"),
    apiUrl: getEnvVar("VITE_API_URLs"),
    appEnv: getEnvVar("VITE_APP_ENV"),
    //var env nuevos
    appVersion: getEnvVar("VITE_APP_VERSION"),
    appApiUrl: getEnvVar("VITE_API_URL"),
    appApiKey: getEnvVar("VITE_X_API_KEY"),
    appAppOrigin: getEnvVar("VITE_APP_ORIGIN"),
    appStoragePrefix: getEnvVar("VITE_STORAGE_PREFIX"),
    appApiTimeout: getEnvVar("VITE_API_TIMEOUT"),
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  };
}
