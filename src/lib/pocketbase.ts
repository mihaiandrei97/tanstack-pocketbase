import type { TypedPocketBase } from "./pocketbase-types";
// https://github.com/osaxon/vite-pocketbase/blob/main/src/lib/pocketbase.ts
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

const POCKETBASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8090";

export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
pb.autoCancellation(false);

export interface User {
  bio: string;
  timezone: string;
  avatar: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  username: string;
  verified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(
    pb.authStore.record as User | null,
  );

  useEffect(() => {
    if (pb.authStore.isValid) {
      pb.collection("users").authRefresh();
    }
    const unsub = pb.authStore.onChange(async (_token, model) => {
      // console.log("auth store change", token, model);
      setUser(model as User | null);
    }, true);
    return () => {
      // console.log("use effect cleanup fn");
      unsub();
    };
  }, []);
  return { user };
}

export function getUserAvatarUrl(record: User, avatar: string) {
  return pb.files.getURL(record, avatar);
}

export function getImageUrl(record: { collectionId: string; id: string }, image: string) {
  return pb.files.getURL(record, image);
}
