
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React, { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'

 const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
    retry:0,
    }
  },
 });

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>

  <App />
      </AppContextProvider>
    </QueryClientProvider>
  
  </React.StrictMode>,
)
