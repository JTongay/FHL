import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const LoginButton = () => (
  <SignInButton>
    <Button className="cursor-pointer flex flex-row">
      <p>Login</p><img src="/discord-icon.svg" className="h-full" />
    </Button>

  </SignInButton>
)
