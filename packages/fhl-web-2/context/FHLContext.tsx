import { useFhlQuery } from "@/generated/gql/graphql";
import { PropsWithChildren, createContext } from "react";

export type FHL = {
  id: string;
  name: string;
};

interface FHLContextProps {
  fhl: FHL | null;
  refetch: () => void;
}

export const FHLContext = createContext<FHLContextProps | null>(null);

export const FHLContextProvider = (props: PropsWithChildren) => {
  const { data, loading, error, refetch } = useFhlQuery();

  if (loading) {
    console.log("Loading FHL Data");
  }

  if (error) {
    console.warn("error fetching FHL data: ", error);
  }

  if (data) {
    return (
      <FHLContext.Provider
        value={{
          fhl: {
            id: data.fhl.league.id,
            name: data.fhl.league.name,
          },
          refetch,
        }}
      >
        {props.children}
      </FHLContext.Provider>
    );
  }

  return <>{props.children}</>;
};
