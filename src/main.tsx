import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { useAuth } from "./lib/pocketbase";
import { routeTree } from "./routeTree.gen";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 30 seconds instead of 0
      // https://tkdodo.eu/blog/react-query-as-a-state-manager#customize-staletime
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
  // https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (Array.isArray(mutation.options.mutationKey) && mutation.options.mutationKey.length === 0) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      });
    },
  }),
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: null,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

function App() {
  const { user } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          queryClient,
          user,
        }}
      />
    </QueryClientProvider>
  );
}

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
