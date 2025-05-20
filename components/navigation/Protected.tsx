"use client";
import { useSession } from "@/lib/auth-client";

type ProtectedProps = {
  children: React.ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  if (!session) {
    return (
      <div className="mx-auto py-8 px-4">
        You must be signed in to view this content.
      </div>
    );
  }

  return <>{children}</>;
};
