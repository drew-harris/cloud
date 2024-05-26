import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { DitherBox } from "../../../components/DitherBox";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_auth/login/")({
  component: LoginPage,
});

function LoginPage() {
  const [codeInput, setCodeInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);

  const goToLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (codeInput.length < 6) return;
    setIsLoadingRedirect(true);

    const response = await fetch("/auth/login?betacode=" + codeInput);
    if (response.status === 200) {
      window.location.href = await response.text();
      return;
    }

    setIsLoadingRedirect(false);
    const error = await response.text();
    setErrorText(error);
  };

  return (
    <DitherBox
      className="flex md:max-w-md flex-col gap-2 !pb-4 items-center justify-items-center p-2 md:px-5 mx-auto"
      title="Log in to the beta"
    >
      <div className="font-mono">Enter your beta sign up code.</div>
      <form onSubmit={goToLogin} className="flex items-stretch flex-col gap-3">
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
        {errorText && (
          <div className="text-red-500 text-center py-2">{errorText}</div>
        )}
        <Button
          type="submit"
          disabled={codeInput.length < 6 || isLoadingRedirect}
          variant="outline"
        >
          Log In With Github
        </Button>
      </form>
    </DitherBox>
  );
}
