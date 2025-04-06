"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Map, Clock, MapPin } from "lucide-react";
import { getRouteById } from "@/api/services";

export default function RouteDetails() {
  const params = useParams();
  const [route, setRoute] = useState(null);
  const descriptions = {
    "Aruba Central - 1.9": "Explora el corazón cultural de Aruba Central en una travesía de 19 horas repleta de historia local, arquitectura vibrante y encuentros con artesanos tradicionales. Ideal para quienes buscan una experiencia auténtica.",
    "Nimble Peak - 3.2": "Aventúrate en Nimble Peak durante 32 horas, disfrutando de vistas panorámicas y senderos emocionantes. Perfecto para los amantes de la naturaleza y la aventura.",
    "Composable Cloud - 6.1": "Sumérgete en la belleza de Composable Cloud durante 61 horas, explorando paisajes impresionantes y rutas desafiantes. Ideal para los aventureros que buscan un reto.",
    "Nimble Peak - 4.7": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 47 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Nimble Peak - 5.7": "Descubre la historia de Nimble Peak en un recorrido de 57 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Ezmeral Valley - 5.2": "Explora la biodiversidad de Ezmeral Valley durante 52 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Ezmeral Valley - 6.0": "Sumérgete en la rica historia de Ezmeral Valley durante 60 horas, explorando sitios históricos y aprendiendo sobre la cultura local.",
    "ProLiant Village - 6.9": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 69 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Apollo Heights - 6.2": "Embárcate en una aventura épica en Apollo Heights durante 62 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Aruba Central - 7.2": "Disfruta de una experiencia gastronómica única en Aruba Central durante 72 horas, degustando delicias locales mientras exploras la belleza del área.",
    "ProLiant Village - 3.2": "Aventúrate en ProLiant Village durante 32 horas, disfrutando de vistas panorámicas y senderos emocionantes. Perfecto para los amantes de la naturaleza y la aventura.",
    "ProLiant Village - 1.0": "Disfruta de una experiencia gastronómica única en ProLiant Village durante 10 horas, degustando delicias locales mientras exploras la belleza del área.",
    "ProLiant Village - 16.6": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 166 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Composable Cloud - 3.0": "Embárcate en una aventura épica en Composable Cloud durante 30 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Composable Cloud - 1.1": "Explora la biodiversidad de Composable Cloud durante 11 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Simplivity Springs - 8.4": "Sumérgete en la belleza de Simplivity Springs durante 84 horas, explorando paisajes impresionantes y rutas desafiantes. Ideal para los aventureros que buscan un reto.",
    "GreenLake Shores - 2.8": "Descubre la historia de GreenLake Shores en un recorrido de 28 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Apollo Heights - 5.6": "Descubre la cultura vibrante de Apollo Heights en un recorrido de 56 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Simplivity Springs - 6.1": "Embárcate en una aventura épica en Simplivity Springs durante 61 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Alletra City - 6.5": "Descubre la cultura vibrante de Alletra City en un recorrido de 65 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Nimble Peak - 2.6": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 26 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Alletra City - 3.0": "Explora la biodiversidad de Alletra City durante 30 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Alletra City - 2.1": "Descubre la historia de Alletra City en un recorrido de 21 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 0.4": "Explora la cultura de HPE Innovation Hub en un recorrido de 4 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Alletra City - 6.2": "Sumérgete en la rica historia de Alletra City durante 62 horas, explorando sitios históricos y aprendiendo sobre la cultura local.",
    "Nimble Peak - 1.0": "Explora la biodiversidad de Nimble Peak durante 10 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "HPE Innovation Hub - 2.5": "Explora la cultura de HPE Innovation Hub en un recorrido de 25 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Aruba Central - 6.0": "Embárcate en una aventura épica en Aruba Central durante 60 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "ProLiant Village - 5.3": "Explora la biodiversidad de ProLiant Village durante 53 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "GreenLake Shores - 0.6": "Descubre la historia de GreenLake Shores en un recorrido de 6 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 1.7": "Disfruta de una experiencia gastronómica única en HPE Innovation Hub durante 17 horas, degustando delicias locales mientras exploras la belleza del área.",
    "Aruba Central - 1.7": "Embárcate en una aventura épica en Aruba Central durante 17 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Ezmeral Valley - 7.5": "Descubre la cultura vibrante de Ezmeral Valley en un recorrido de 75 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Nimble Peak - 7.3": "Disfruta de una experiencia gastronómica única en Nimble Peak durante 73 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "ProLiant Village - 1.1": "Descubre la cultura vibrante de ProLiant Village en un recorrido de 11 horas, donde cada paso revela tradiciones y costumbres locales.",
    "Alletra City - 7.3": "Descubre la cultura vibrante de Alletra City en un recorrido de 73 horas, donde cada paso revela tradiciones y costumbres locales.",
    "HPE Innovation Hub - 3.9": "Explora la cultura de HPE Innovation Hub en un recorrido de 39 horas, donde cada paso revela tradiciones y costumbres locales.",
    "HPE Innovation Hub - 8.9": "Explora la biodiversidad de HPE Innovation Hub durante 89 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
    "Ezmeral Valley - 1.0": "Descubre la historia de Ezmeral Valley en un recorrido de 10 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Simplivity Springs - 4.6": "Disfruta de una experiencia gastronómica única en Simplivity Springs durante 46 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Alletra City - 2.0": "Embárcate en una aventura épica en Alletra City durante 20 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "GreenLake Shores - 11.4": "Descubre la historia de GreenLake Shores en un recorrido de 114 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 4.0": "Descubre la historia de HPE Innovation Hub en un recorrido de 40 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "GreenLake Shores - 4.8": "Disfruta de una experiencia gastronómica única en GreenLake Shores durante 48 horas, degustando delicias locales mientras exploras la belleza natural del área.",
    "Ezmeral Valley - 12.6": "Embárcate en una aventura épica en Ezmeral Valley durante 126 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Apollo Heights - 3.9": "Descubre la historia de Apollo Heights en un recorrido de 39 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "HPE Innovation Hub - 2.4": "Descubre la historia de HPE Innovation Hub en un recorrido de 24 horas, donde cada paso te lleva a través de relatos fascinantes y paisajes cautivadores.",
    "Nimble Peak - 1.5": "Embárcate en una aventura épica en Nimble Peak durante 15 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Aruba Central - 14.8": "Embárcate en una aventura épica en Aruba Central durante 148 horas, explorando paisajes impresionantes y desafiantes rutas.",
    "Apollo Heights - 4.2": "Explora la biodiversidad de Apollo Heights durante 42 horas, disfrutando de la flora y fauna local en un entorno natural impresionante.",
  }


  useEffect(() => {
    const fetchRoute = async () => {
      if (params?.id) {
        try {
          const routeData = await getRouteById(params.id);
          setRoute(routeData);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      }
    };

    fetchRoute();
  }, [params]);

  if (!route) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/routes"
          className="text-green-600 hover:text-green-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Rutas
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Route Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={route.image || `/routes/ruta${route.id}.jpg`}
              alt={route.routeName}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Title & Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {route.routeName}
              </h1>

              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>{(route.popularity / 10).toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Origen: {route.origin?.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <h2 className="text-2xl font-semibold mb-4">Resumen</h2>

          <div className="text-gray-700 mb-6">{route.description}</div>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Map className="h-5 w-5 mr-2 text-gray-400" />
              <span>{route.distanceKm} km</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{route.durationHours} h</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-600 py-5">
            {descriptions[route.routeName] || "Sin descripción disponible."}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
