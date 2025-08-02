import { useAuth0 } from "@auth0/auth0-react";
import type { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.log("Auth0 Error:", error);
    // If there's an auth error, just render the app normally
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
