import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
};

type AuthContextValue = {
  user: User | null;
  signup: (email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "naijamarket_users";
const CURRENT_USER_KEY = "naijamarket_current_user";

function readUsers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function writeUsers(users: Record<string, string>) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existing = typeof window !== "undefined" ? window.localStorage.getItem(CURRENT_USER_KEY) : null;
    if (existing) setUser({ email: existing });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signup: (email: string, password: string) => {
        const users = readUsers();
        if (users[email]) {
          return { ok: false, error: "Email already exists." };
        }

        users[email] = password;
        writeUsers(users);
        window.localStorage.setItem(CURRENT_USER_KEY, email);
        setUser({ email });
        return { ok: true };
      },
      login: (email: string, password: string) => {
        const users = readUsers();
        if (!users[email] || users[email] !== password) {
          return { ok: false, error: "Invalid email or password." };
        }

        window.localStorage.setItem(CURRENT_USER_KEY, email);
        setUser({ email });
        return { ok: true };
      },
      logout: () => {
        window.localStorage.removeItem(CURRENT_USER_KEY);
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
