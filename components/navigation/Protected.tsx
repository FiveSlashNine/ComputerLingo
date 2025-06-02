"use client";
import { useSession } from "@/lib/auth-client";

type ProtectedProps = {
  children: React.ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div className="flex justify-center items-center py-8 px-4">
        Loading...
      </div>
    );

  if (!session) {
    return (
      <div className="flex justify-center items-center py-8 px-4">
        You must be signed in to view this content.
      </div>
    );
  }

  return <>{children}</>;
};
