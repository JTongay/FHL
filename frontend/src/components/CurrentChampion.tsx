import { execute } from "@/graphql/execute"
import { DashboardQueryKey } from "@/lib/queryKeys"
import { DashboardQuery } from "@/routes"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useQuery } from "@tanstack/react-query"


export function CurrentChampion() {
  const { data } = useQuery({
    queryKey: [DashboardQueryKey],
    queryFn: () => execute(DashboardQuery)
  })

  return (
    <div className="flex row justify-center items-center">
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
      <h2 className="text-lg text-center">
        Current Champion: {data?.fhl.currentChampion?.gamertag || "Vacant"}
      </h2>
      <Avatar className="mx-2">
        <AvatarImage src="/title-belt.png" />
      </Avatar>
    </div>
  )
}
