"use client";

import { useGetSeasonsSuspenseQuery } from "@/generated/gql/graphql";
import Link from "next/link";
import { Suspense } from "react";
import { SeasonsContent } from "./SeasonsContent";

export default function Seasons() {
  // TODO - Add Pagination to the query
  const { data } = useGetSeasonsSuspenseQuery();

  if (data.seasons.__typename === "ApiError") {
    throw new Error(data.seasons.stacktrace || "oopsie");
  }
  return (
    <>
      <h1>Here be the Seasons screen</h1>
      <Suspense fallback={<p>Loading Seasons...</p>}>
        <SeasonsContent />
      </Suspense>

      <Link href="/seasons/new">Create A Season</Link>
    </>
  );
}
