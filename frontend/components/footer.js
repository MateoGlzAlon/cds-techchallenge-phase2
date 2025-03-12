import Link from "next/link"
import { Map, Mail, Phone } from "lucide-react"
import { DATA } from "@/app/data"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32  ">
          <div className="col-span-1">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">{DATA.appName}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Discover amazing travel destinations, routes, and accommodations.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/distance-calculator" className="text-base text-gray-500 hover:text-gray-900">
                  Distance Calculator
                </Link>
              </li>
              <li>
                <Link href="/routes" className="text-base text-gray-500 hover:text-gray-900">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-base text-gray-500 hover:text-gray-900">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-base text-gray-500 hover:text-gray-900">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-base text-gray-500">example@email.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-base text-gray-500">999 99 99 99</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}

