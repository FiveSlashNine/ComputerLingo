import Link from "next/link";
import Image from "next/image";
import { Form } from "@/components/forms/form";
import { redirect } from "next/navigation";
import { createUser, getUser } from "@/app/db";
import { SubmitButton } from "@/components/buttons/submit-button";
import { BookOpen, Trophy, Users } from "lucide-react";

export default function Register() {
  async function register(formData: FormData) {
    "use server";
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let user = await getUser(email);

    if (user.length > 0) {
      return "User already exists"; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(email, password);
      redirect("/login");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
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
            Join the Computer Science Learning Revolution
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your free account and start mastering programming concepts
            through gamified, bite-sized lessons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Trophy className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-semibold">Gamified Learning</h3>
              <p className="text-sm text-center text-muted-foreground">
                Earn XP and unlock achievements
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-semibold">Bite-sized Lessons</h3>
              <p className="text-sm text-center text-muted-foreground">
                Learn in just minutes a day
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-semibold">Join Community</h3>
              <p className="text-sm text-center text-muted-foreground">
                Learn with global peers
              </p>
            </div>
          </div>
        </div>

        <div className="z-10 w-full md:w-1/3 max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Create Your Account</h3>
            <p className="text-sm text-gray-500">
              Start your coding journey with Computer Lingo today
            </p>
          </div>
          <Form action={register}>
            <SubmitButton className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              Get Started
            </SubmitButton>
            <p className="text-center text-sm mx-5 text-gray-600">
              {"Already have an account? "}
              <Link
                href="/login"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                Sign in
              </Link>
              {" instead."}
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
