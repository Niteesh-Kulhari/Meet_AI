"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  return <div className="flex flex-col gap-y-6">Home</div>;
}
