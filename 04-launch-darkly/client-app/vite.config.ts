import 'dotenv/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


const env = process.env;
const port = parseInt(env.PORT ?? '4000', 10);
const server: Server = (env.SERVER || 'node.js') as Server; // either 'node.js' or 'dotnet'
const target = server === 'node.js' ? 'http://localhost:3000' : 'https://localhost:7000';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Set the '@' alias to point to the 'src' folder
    },
  },
  server:
    {
      port,
      proxy: {
        '/features': {
          target,
          secure: false,
        }
      }
  }
});

export enum Server {
  Node = 'node.js',
  DotNet = 'dotnet'
}
