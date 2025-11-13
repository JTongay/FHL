import { LoginButton } from "@/components/LoginButton";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/auth/Login")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex flex-row justify-center items-center">
      <LoginButton />
    </div>
  )
}
