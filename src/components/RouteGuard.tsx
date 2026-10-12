"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/app/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@/once-ui/components";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

function isEnabled(pathname: string | null) {
  if (!pathname) return false;
  if (pathname in routes) return routes[pathname as keyof typeof routes];
  return (["/blog", "/work"] as const).some(
    (route) => pathname.startsWith(`${route}/`) && routes[route],
  );
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const isRouteEnabled = isEnabled(pathname);
  const isPasswordRequired = Boolean(pathname && protectedRoutes[pathname as keyof typeof protectedRoutes]);
  const [password, setPassword] = useState("");
  const [checkedPath, setCheckedPath] = useState<string | null>(null);
  const [authenticatedPath, setAuthenticatedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setPassword("");
    setError(undefined);
    setCheckedPath(null);
    setAuthenticatedPath(null);
    if (!isRouteEnabled || !isPasswordRequired || !pathname) return;

    const controller = new AbortController();
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth", { signal: controller.signal });
        if (!controller.signal.aborted && response.ok) setAuthenticatedPath(pathname);
      } catch {
        // A failed check keeps the protected route locked.
      } finally {
        if (!controller.signal.aborted) setCheckedPath(pathname);
      }
    };
    checkAuth();
    return () => controller.abort();
  }, [pathname, isRouteEnabled, isPasswordRequired]);

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        setAuthenticatedPath(pathname);
        setError(undefined);
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    }
  };

  if (!isRouteEnabled) return <NotFound />;

  // Public pages render during SSR, without waiting for an unnecessary effect.
  if (!isPasswordRequired) return <>{children}</>;

  if (checkedPath !== pathname) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (authenticatedPath !== pathname) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">This page is password protected</Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
