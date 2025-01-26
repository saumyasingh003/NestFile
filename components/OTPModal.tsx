"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoClose } from "react-icons/io5"; // Import the close icon

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ accountId, password });

    try {
      const sessionId = await verifySecret({ accountId, password });

      console.log({ sessionId });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };

  return (
  



<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogContent className="p-6 bg-white rounded-md shadow-lg flex flex-col items-center justify-center">
    <AlertDialogHeader className="text-center">
      <AlertDialogTitle className="text-2xl font-bold text-[#15803D] flex items-center justify-center">
        Enter Your OTP
        <IoClose
          onClick={() => setIsOpen(false)}
          className="ml-4 cursor-pointer text-gray-600 hover:text-[#15803D] transition duration-200"
          size={20}
        />
      </AlertDialogTitle>
      <AlertDialogDescription className="text-sm text-gray-600 mt-2">
        We&apos;ve sent a code to{" "}
        <span className="font-semibold text-[#F7B32B] ">{email}</span>
      </AlertDialogDescription>
    </AlertDialogHeader>

    <div className="my-6 flex justify-center">
      <InputOTP maxLength={6} value={password} onChange={setPassword}>
        <InputOTPGroup className="flex justify-center gap-2">
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="w-10 h-12 border-2 border-gray-300 rounded-md text-center text-xl font-semibold text-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#F7B32B]"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>

    <AlertDialogFooter className="flex flex-col items-center gap-4">
      <AlertDialogAction
        onClick={handleSubmit}
        className="w-full h-12 bg-[#15803D] text-white font-bold rounded-md flex items-center justify-center hover:bg-[#145A2D] transition"
        type="button"
      >
        Submit
        {isLoading && (
          <div className="ml-2 animate-spin border-2 border-t-transparent border-[#F7B32B] rounded-full w-6 h-6"></div>
        )}
      </AlertDialogAction>

      <div className="text-sm text-gray-600">
        Didn&apos;t get a code?{" "}
        <Button
          type="button"
          variant="link"
          className="font-semibold text-[#F7B32B] hover:underline"
          onClick={handleResendOtp}
        >
          Click to resend
        </Button>
      </div>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    

  );
};

export default OtpModal;