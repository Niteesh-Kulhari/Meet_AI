"use client";

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const trpc = useTRPC();

  const { data: session } = authClient.useSession();
  const router = useRouter();
  return <div className="flex flex-col gap-y-6">Home</div>;
}
