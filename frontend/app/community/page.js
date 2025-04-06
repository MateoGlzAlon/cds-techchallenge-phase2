"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users } from "lucide-react"

export default function Community() {
  const placeholders = Array.from({ length: 3 })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2"> 🔜Próximamente🔜</h2>
        <p className="text-gray-600 text-lg">Eventos de la comunidad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {placeholders.map((_, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <Skeleton className="w-full h-40" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>–––</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>–––</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3">
              <Button variant="outline" className="w-full py-2" disabled>
                Ver Evento
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
