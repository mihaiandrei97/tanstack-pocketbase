import type { QueryClient } from "@tanstack/react-query";
import type { User } from "../lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export interface RootRouterContext {
  queryClient: QueryClient;
  user: null | User;
}

interface ErrorProps {
  message?: string;
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: RootComponent,
  errorComponent: ({ error }) => <Error message={error?.message} />,
  notFoundComponent: () => {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Return Home
        </Link>
      </div>
    );
  },
});

function Error({ message = "Something went wrong" }: ErrorProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="absolute inset-0 bg-gray-50 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-gray-900 -z-10 min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-destructive/10 p-3 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-destructive">{message}</h2>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleRefresh} variant="outline">
              Refresh Page
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );
}
