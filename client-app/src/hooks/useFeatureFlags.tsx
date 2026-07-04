import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import timeout from '@/utils/timeout';
import type { ApiResponse } from '@/types/ApiResponse';
import type { Flags } from '@/types/Flags';


interface FeatureFlagsContextType {
  flags: ApiResponse<Flags>;
  refresh: (name?: string | undefined) => void;
}

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
  const [flags, setFlags] = useState<ApiResponse<Flags>>({loading: true, data: {} as Flags});

  const refresh = useCallback(async (name?: string | undefined) => {
    setFlags({loading: true, data: {} as Flags});

    const res = await fetch('/features/all?name=' + encodeURIComponent(name ?? ''));
    const status = res.status;
    if (!res.ok) {
      const bodyText = await res.text().catch(() => undefined);
      setFlags({loading: false, data: {} as Flags, status, error: bodyText});
    } else {
      const data = (await res.json()) as Flags;
      await timeout(250); // simulate network latency
      setFlags({loading: false, data, status});
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => refresh()); // unauthenticated refresh on mount
  }, [refresh]);

  return (
    <FeatureFlagsContext.Provider value={{ flags, refresh }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
};
