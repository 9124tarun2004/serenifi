import React, { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [journalEntries, setJournalEntries] = useState([]);

  const addEntry = (entry) => {
    setJournalEntries(prevEntries => [entry, ...prevEntries]);
  };

  const deleteEntry = (entryId) => {
    setJournalEntries(prevEntries => 
      prevEntries.filter(entry => entry.id !== entryId)
    );
  };

  const editEntry = (entryId, updatedEntry) => {
    setJournalEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === entryId ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  return (
    <JournalContext.Provider value={{ 
      journalEntries, 
      addEntry, 
      deleteEntry, 
      editEntry 
    }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
