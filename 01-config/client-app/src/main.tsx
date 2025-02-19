import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { FeatureFlagsProvider } from '@/hooks/useFeatureFlags';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeatureFlagsProvider>
      <App />
    </FeatureFlagsProvider>
  </StrictMode>,
);
