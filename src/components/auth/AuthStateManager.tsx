"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGlobalStore } from "@/store";

interface ExtendedSession {
  accessToken?: string;
  user?: {
    email?: string | null;
    role?: string;
    id?: string;
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
        id: (session as ExtendedSession).user?.id || null,
        name: session.user?.name || null,
      });
    }
  }, [session]);

  return null;
}
