import fs from 'fs';
import dotenv from 'dotenv';
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const envConfig =
  dotenv.parse(
    fs.readFileSync(
      `.env.${
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }`
    )
  ) || {};
Object.entries(envConfig).forEach(([key, value]) => {
  process.env[key] = value;
});
const configs = JSON.parse(JSON.stringify(envConfig));
export default configs;
