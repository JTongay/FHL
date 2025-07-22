import type { TypedDocumentString } from './graphql'

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const result = (await response.json()) as GraphQLResponse<TResult>

  // Handle GraphQL errors
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message)
  }

  // Return just the data portion, which matches your generated types
  return result.data as TResult
}
