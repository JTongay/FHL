import { SignupButton } from "@/components/SignupButton";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/Signup")({
  component: SignupPage
})

function SignupPage() {
  return (
    <div className="flex flex-row justify-center items-center">
      <SignupButton />
    </div>
  )
}
