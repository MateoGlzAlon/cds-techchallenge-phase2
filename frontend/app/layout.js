import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { DATA } from "@/app/data"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: `${DATA.appName} - Find Your Next Adventur`,
  description: "Discover amazing travel destinations, routes, and accommodations",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}



import './globals.css'