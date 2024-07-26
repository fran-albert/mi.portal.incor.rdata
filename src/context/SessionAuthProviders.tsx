"use client";
import React, { createContext, useContext } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface SessionContextType {
  session: ReturnType<typeof useSession>["data"];
  status: ReturnType<typeof useSession>["status"];
}

interface SessionAuthProviderProps {
  children: React.ReactNode;
}

interface CustomSessionProviderProps {
  children: React.ReactNode;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  status: "unauthenticated",
});

export const useCustomSession = () => useContext(SessionContext);

const CustomSessionProvider: React.FC<CustomSessionProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <SessionContext.Provider value={{ session, status }}>
      {children}
    </SessionContext.Provider>
  );
};

const SessionAuthProvider: React.FC<SessionAuthProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CustomSessionProvider>{children}</CustomSessionProvider>
    </SessionProvider>
  );
};

export default SessionAuthProvider;
