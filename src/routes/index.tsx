import { Button } from "@/components/ui/button";
import { pb } from "@/lib/pocketbase";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context }) => {
    return {
      user: context.user,
    };
  },
});

function Index() {
  const { user } = Route.useLoaderData();
  const router = useRouter();

  const handleLogout = () => {
    pb.authStore.clear();
    router.navigate({
      to: "/",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gray-50 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="relative">
        <nav className="border-b bg-white/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="text-lg font-semibold text-gray-900">
                  Home
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {user
                  ? (
                      <>
                        <span className="text-gray-700">{user.email}</span>
                        <Button onClick={handleLogout}>Logout</Button>
                      </>
                    )
                  : (
                      <Button asChild>
                        <Link to="/login">Sign In</Link>
                      </Button>
                    )}
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {user
            ? (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">Welcome Home!</h3>
                  <p className="mt-2 text-gray-700">{user.email}</p>
                </div>
              )
            : (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">Welcome Guest!</h3>
                  <p className="mt-2 text-gray-700">Please sign in to continue.</p>
                </div>
              )}
        </main>
      </div>
    </div>
  );
}
