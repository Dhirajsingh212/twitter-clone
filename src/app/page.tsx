import SigninForm from "@/components/SigninForm";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto text-4xl text-white">
            {process.env.NEXT_TWITTER_ICON}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Sign in to X</h2>
        </div>

        <SigninForm />
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up for X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
