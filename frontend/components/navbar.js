"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Map, Hotel, Users, Calculator } from "lucide-react"
import { DATA } from "@/app/data"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Map className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">{DATA.appName}</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                href="/distance-calculator"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Distance Calculator
              </Link>
              <Link
                href="/routes"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Map className="h-4 w-4 mr-1" />
                Rutas
              </Link>
              <Link
                href="/hotels"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Hotel className="h-4 w-4 mr-1" />
                Hoteles
              </Link>
              <Link
                href="/community"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Users className="h-4 w-4 mr-1" />
                Comunidad
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link href="/login">
              <Button variant="outline" className="mr-2 w-20 py-3">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="" className="mr-2 w-20 py-3">
                Registrarse
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/distance-calculator"
              className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Distance Calculator
            </Link>
            <Link
              href="/routes"
              className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Rutas
            </Link>
            <Link
              href="/hotels"
              className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Hoteles
            </Link>
            <Link
              href="/community"
              className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Comunidad
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-600"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

