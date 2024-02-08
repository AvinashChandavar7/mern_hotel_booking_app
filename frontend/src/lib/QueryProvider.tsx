import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryClientProps {
  children: React.ReactNode
}


export const QueryProvider: React.FC<QueryClientProps> = ({ children }) => {

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 } }
  });


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

