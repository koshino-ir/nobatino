import React, { createContext, useContext, useMemo } from 'react';

import { createContainer, type AppContainer } from './container';

const ContainerContext = createContext<AppContainer | null>(null);

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  const container = useMemo(() => createContainer(), []);
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
}

export function useDI(): AppContainer {
  const ctx = useContext(ContainerContext);
  if (!ctx) throw new Error('useDI must be used within <ContainerProvider>');
  return ctx;
}
