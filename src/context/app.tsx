import React, { createContext, useContext, useMemo, useState } from 'react';

interface AppContextProps {
  appName: string;
  setAppName: (name: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appName, setAppName] = useState<string>(
    () => process.env.NEXT_PUBLIC_APP_NAME ?? 'Starter App'
  );

  const value = useMemo(() => ({ appName, setAppName }), [appName]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
