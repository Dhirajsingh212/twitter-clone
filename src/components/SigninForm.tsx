"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      if (!data.email || !data.password) {
        throw new Error("All fields are required.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        throw new Error("Invalid email format.");
      }

      if (data.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!(response as any).ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      toast.success("LoggedIn successful!");
      router.push("/feed");
    } catch (error) {
      toast.error((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="email-username" className="sr-only">
            Email or username
          </Label>
          <Input
            id="email"
            type="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
            placeholder="Password"
            {...register("password")}
          />
        </div>
      </div>

      <div>
        <Button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? <Spinner /> : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
