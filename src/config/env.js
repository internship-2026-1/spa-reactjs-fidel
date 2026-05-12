const requiredEnvVars = ["VITE_APP_NAME", "VITE_API_URL", "VITE_APP_ENV"];

function getEnvVar(name) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function loadEnvConfig() {
  for (const envVar of requiredEnvVars) {
    getEnvVar(envVar);
  }

  return {
    appName: getEnvVar("VITE_APP_NAME"),
    apiUrl: getEnvVar("VITE_API_URL"),
    appEnv: getEnvVar("VITE_APP_ENV"),
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  };
}