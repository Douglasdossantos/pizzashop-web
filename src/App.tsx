import './global.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './pages/routes'
import {HelmetProvider,Helmet} from 'react-helmet-async'
import {Toaster} from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">        
        <Helmet titleTemplate='%s | pizza.shop'/>
        <Toaster richColors closeButton/>
        <RouterProvider router={router}/>
      </ThemeProvider>   

    </HelmetProvider>
   )
}
