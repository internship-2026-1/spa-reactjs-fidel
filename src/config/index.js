/*exporto el objeto config*/
//src/config/index.js

import { loadEnvConfig } from "./env";

export const config = loadEnvConfig();