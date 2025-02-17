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
    // router.invalidate({ sync: true });
    router.navigate({
      to: "/",
    });
  };

  return (
    <div className="p-2">
      {user && (
        <div>
          <h3>Welcome Home!</h3>
          <p>{user.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
      {!user && (
        <div>
          <h3>Welcome Guest!</h3>
          <p>Please sign in to continue.</p>
          <Button asChild>
            <Link to="/login">
              Sign In
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
