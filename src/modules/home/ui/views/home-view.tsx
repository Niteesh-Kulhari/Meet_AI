"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function HomeView() {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.hello.queryOptions({ text: "Niteesh" }));

  const { data: session } = authClient.useSession();
  const router = useRouter();
  return <div className="flex flex-col gap-y-6">{data?.greeting}</div>;
}
