import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import timeout from '@/utils/timeout';
import type { ApiResponse } from '@/types/ApiResponse';


export interface Flags {
  [key: string]: boolean;
}

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

    try {
      const response = await axios.get<Flags>('/features/all?name=' + encodeURIComponent(name ?? ''));
      await timeout(250); // simulate network latency
      setFlags({loading: false, data: response.data, status: response.status});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFlags({loading: false, data: {} as Flags, status: error.response?.status, error: error});
      } else {
        setFlags({loading: false, data: {} as Flags, error: error as Error});
      }
    }
  }, []);

  useEffect(() => {
    refresh(); // unauthenticated
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
