import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/router'
import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './pages/providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient=new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
     <AuthProvider>
    <div>
     <RouterProvider router={router} />
     </div>
     </AuthProvider>
     </QueryClientProvider>
  </StrictMode>,
)
