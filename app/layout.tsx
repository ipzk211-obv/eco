import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import Categories from './components/nav/Categories'
import SearchBar from './components/nav/SearchBar'


const montserrat = Montserrat({ subsets: ['latin'], weight: ['500','600'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['300','500','600', '700'] })

export const metadata: Metadata = {
  title: 'ECO',
  description: 'Eco products app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <body className={`${montserrat.className} text-white`}>
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar/>
            {/* <SearchBar/> */}
            <main className='flex-grow'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
