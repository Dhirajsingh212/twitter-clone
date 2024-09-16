import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto text-4xl text-white">
            {process.env.NEXT_TWITTER_ICON}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Create your account</h2>
        </div>
        <SignupForm />
        <div className="text-xs text-gray-500">
          By signing up, you agree to the{" "}
          <a href="" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          , including{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Cookie Use
          </a>
          .
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
