import React, { createContext, useContext } from "react";

const LoggerContext = createContext();

export const LoggerProvider = ({ children }) => {
  const log = (msg) => {
    const time = new Date().toISOString();
    console.log(`[LOG] ${time} - ${msg}`);
  };

  return (
    <LoggerContext.Provider value={{ log }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);
