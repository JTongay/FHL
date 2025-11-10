
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/main/main")({
  component: MainPage
})

function MainPage() {
  return (
    <h1>Hey there, this is the main page</h1>
  )
}
