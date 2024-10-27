import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/get-add-data";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, loading, login } = UseAuth();

  useEffect(() => {
    if (loading) return;
    if (isLoggedIn) navigate("/");
    setPage(location.pathname.slice(1));
  }, [location.pathname, loading]);

  const mutation = useMutation({
    mutationFn: authenticate,
    onSuccess: () => {
      login();
      navigate("/");
      showSuccessToast("Logged In");
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  return (
    <div className="min-h-dvh flex justify-center items-center px-4">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl">
            {page === "signin" ? "Sign In" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {page === "signin"
              ? "Enter your credentials to sign in to your account"
              : "Enter email and password to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() =>
                mutation.mutate({ email, password, authType: page })
              }
            >
              {page === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
          {page === "signin" ? (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={"/signup"} className="underline">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/signin"} className="underline">
                Sign In
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}