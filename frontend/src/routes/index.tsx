import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { graphql } from '@/graphql'
import { useQuery } from '@tanstack/react-query'
import { execute } from '@/graphql/execute'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DashboardQueryKey } from '@/lib/queryKeys'
import { CurrentChampion } from '@/components/CurrentChampion'

export const Route = createFileRoute('/')({
  component: App,
})

export const TestQuery = graphql(`
  query TestQuery {
    booyah
  }
`)

export const DashboardQuery = graphql(`
  query Dashboard {
  fhl {
    __typename
    league {
      id
      name
      createdAt
      updatedAt
    }
    activeSeason {
      id
      isActive
      year
    }
    currentChampion {
      id
      firstName
      lastName
      fullName
      gamertag
      wins
      losses
    }
    # upcomingSeason {

    # }
    topFiveRecords {
      id
      gamertag
      wins
      losses
    }
    bottomFiveRecords {
      id
      gamertag
      wins
      losses
    }
  }
}
`)


function Dashboard() {
  const { data, error, isLoading } = useQuery({
    queryKey: [DashboardQueryKey],
    queryFn: () => execute(DashboardQuery)
  })

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    )
  }

  if (data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl text-center">Welcome to {data.fhl.league.name}</h1>

        <div className="flex flex-row justify-center">
          <img className="w-1/2" src="/mlg-logo.png" alt="FHL Logo" />
        </div>

        <div>
          <CurrentChampion />
        </div>

        {data.fhl.topFiveRecords.map((user) => (
          <div>{user.gamertag}</div>
        ))}
      </div>
    )
  }

  return null
}

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['booyah'],
    queryFn: () => execute(TestQuery),
  })

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    )
  }
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <Dashboard />
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>{data?.booyah}</p>
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
