import React, { createContext, useContext, ReactNode, useCallback } from 'react';

interface GoalsContextType {
  refreshGoalsFlag: number;
  triggerGoalsRefresh: () => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

interface GoalsProviderProps {
  children: ReactNode;
}

export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
  const [refreshGoalsFlag, setRefreshGoalsFlag] = React.useState<number>(0);

  const triggerGoalsRefresh = useCallback(() => {
    setRefreshGoalsFlag((prev) => prev + 1);
  }, []);

  return (
    <GoalsContext.Provider value={{ refreshGoalsFlag, triggerGoalsRefresh }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoalsRefresh = (): GoalsContextType => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoalsRefresh debe usarse dentro de un GoalsProvider');
  }
  return context;
};
