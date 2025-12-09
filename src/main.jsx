import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
    <Toaster position='top-right' reverseOrder={false} />
 </AuthProvider>
</QueryClientProvider>
  </StrictMode>,
)
