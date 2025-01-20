"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGlobalStore } from "@/store";

interface ExtendedSession {
  accessToken?: string;
  user?: {
    email?: string | null;
    role?: string;
    name?: string;
  };
}

export function AuthStateManager() {
  const { data: session } = useSession();
  const updateStore = useGlobalStore((state) => state.updateStore);
  useEffect(() => {
    if (session) {
      updateStore("auth", {
        token: (session as ExtendedSession).accessToken,
        userRole: (session as ExtendedSession).user?.role,
        email: session.user?.email || null,
        name: session.user?.name || null,
      });
    }
  }, [session, updateStore]);

  return null;
}
