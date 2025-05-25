"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Form } from "@/components/forms/form";
import { signIn } from "@/lib/auth-client";
import { Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex justify-center min-h-screen flex-col bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="ComputerLingo Logo"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-white p-1 bg-white"
                />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Computer Lingo
            </span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Welcome Back to Computer Lingo
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue your learning journey and pick up right where you left off.
          </p>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h3 className="font-semibold text-lg mb-3">Your Progress Awaits</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Code className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">
                    Continue your coding challenges
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Keep building your skills with daily practice
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Join the global leaderboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Compete with learners from over 190 countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 w-full md:w-1/3 max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign In to Your Account</h3>
            <p className="text-sm text-gray-500">
              Access your learning dashboard and progress
            </p>
          </div>

          {errorMessage && (
            <div className="bg-gray-50 px-6 pt-4 text-sm text-red-600 font-medium text-center">
              {errorMessage}
            </div>
          )}

          <Form
            action={async (formData: FormData) => {
              setErrorMessage("");
              const { data, error } = await signIn.email(
                {
                  email: formData.get("email") as string,
                  password: formData.get("password") as string,
                  callbackURL: "/",
                  rememberMe: false,
                },
                {}
              );

              if (error) {
                setErrorMessage(
                  error.message || "Sign in failed. Please try again."
                );
              }
            }}
          >
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              Sign in
            </Button>
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/register"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                Sign up
              </Link>
              {" for free."}
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
