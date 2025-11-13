import { SignUpButton } from "@clerk/clerk-react"
import { Button } from "./ui/button"

export const SignupButton = () => {
  <SignUpButton>
    <Button className="cursor-pointer flex flex-row">
      <p>Signup</p>
      <img src="/src/discord-icon.svg" className="h-full" />
    </Button>
  </SignUpButton>
}
