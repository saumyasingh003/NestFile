"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import { FaFolderOpen } from "react-icons/fa6";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit  = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
         type === "sign-up"
           ?
           await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
           : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="auth-form space-y-8 max-w-lg mx-auto p-12 mt-16 min-h-[500px] bg-white shadow-md rounded-lg"
  >
    {/* Replacing Image Logo with FontAwesome Icon */}
    <div className="text-center mb-6">
      <FaFolderOpen className="text-[#F72C25] text-6xl mx-auto hidden lg:block" />
    </div>

    <h1 className="text-4xl font-semibold text-center text-[#2D1E2F] mb-6 mt-10 sm:mt-8">
      {type === "sign-in" ? "Sign In" : "Sign Up"}
    </h1>

    {type === "sign-up" && (
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#2D1E2F] text-xl">Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name"
                className="w-full border-[#A9E5BB] text-lg rounded-md p-4"
                {...field}
              />
            </FormControl>
            <FormMessage className="mt-1 text-[#F72C25] text-sm" />
          </FormItem>
        )}
      />
    )}

    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#2D1E2F] text-xl">Email</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your email"
              className="w-full border-[#A9E5BB] text-lg rounded-md p-4"
              {...field}
            />
          </FormControl>
          <FormMessage className="mt-1 text-[#F72C25] text-sm" />
        </FormItem>
      )}
    />

    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[#F7B32B] text-[#2D1E2F] py-4 rounded-lg text-xl hover:bg-[#F7A623] disabled:opacity-50 font-medium"
    >
      {isLoading
        ? "Submitting..."
        : type === "sign-in"
        ? "Sign In"
        : "Sign Up"}
    </Button>

    {errorMessage && (
      <p className="text-center text-[#F72C25] text-lg">{errorMessage}</p>
    )}

    <div className="text-center">
      <p className="text-[#2D1E2F] text-sm">
        {type === "sign-in"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          passHref
          className="text-[#F72C25] hover:underline text-sm"
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  </form>
</Form>

{accountId && (
  <OtpModal email={form.getValues("email")} accountId={accountId} />
)}
</>
);
};


export default AuthForm;
