import React, { createContext, useContext } from 'react';
import { useCreateEventState } from '@/hooks/useCreateEventState';

const CreateEventContext = createContext<ReturnType<typeof useCreateEventState> | null>(null);

export const useCreateEvent = () => {
  const context = useContext(CreateEventContext);
  if (!context) {
    throw new Error('useCreateEvent must be used within CreateEventProvider');
  }
  return context;
};

export const CreateEventProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useCreateEventState(); 
  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
};