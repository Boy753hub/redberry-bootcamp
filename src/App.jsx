import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./routes/router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import HeaderContextProvider from './contexts/headerContexts';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderContextProvider>
      <RouterProvider router={router}></RouterProvider>
      </HeaderContextProvider>
    </QueryClientProvider>
  )
}

export default App