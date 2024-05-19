import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { DitherBox } from "../../components/DitherBox";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [codeInput, setCodeInput] = useState("");

  const goToLogin = () => {
    const url = `/auth/login?code=${codeInput}`;
    window.location.href = url;
  };

  return (
    <DitherBox
      className="flex flex-col gap-2 items-center justify-items-center max-w-sm p-2 mx-auto"
      title="Log In To Beta"
    >
      <div className="font-mono">Enter your beta sign up code.</div>
      <InputOTP
        value={codeInput}
        onChange={(e) => setCodeInput(e)}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        maxLength={6}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </DitherBox>
  );
}
