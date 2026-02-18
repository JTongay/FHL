import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  console.log("hi there");
  console.log(import.meta.env, "ENV VARS?");

  console.log(import.meta.env.VITE_GRAPHQL_URL, "graphql url?");
}

export default function Home() {
  return <Welcome />;
}
