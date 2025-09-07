import { LoadingState } from "@/components/loading-state";
import {
  AgentsErrorView,
  AgentsLoadingView,
  AgentsView,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const queryClinet = getQueryClient();
  void queryClinet.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <Suspense fallback={<AgentsLoadingView />}>
        <ErrorBoundary fallback={<AgentsErrorView />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
