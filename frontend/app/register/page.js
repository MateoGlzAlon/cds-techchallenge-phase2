"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Mail, Map } from "lucide-react";
import { DATA } from "@/app/data";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.email)
      newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no es válido";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Debes aceptar los términos y condiciones";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form - in a real app, this would call an API
    console.log("Form submitted:", formData);
    // Redirect to login or dashboard
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center">
          <Map className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            {DATA.appName}
          </span>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Crea una cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Regístrate para comenzar a planear tu próxima aventura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Introduce tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Introduce tu correo electrónico"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Introduce una contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeTerms: checked })
                      }
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los{" "}
                      <Link
                        href="/terms"
                        className="text-green-600 hover:text-green-800"
                      >
                        términos y condiciones
                      </Link>
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-500">{errors.agreeTerms}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full border-[0.5px] border-green-300 py-2 hover:bg-green-100"
                  >
                    Crear cuenta
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="google">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full py-3 hover:bg-blue-100"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Continuar con Google
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Al continuar con Google, aceptas nuestros{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:text-green-800"
                  >
                    Términos de servicio
                  </Link>{" "}
                  y{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 hover:text-green-800"
                  >
                    Política de privacidad
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>
            <TabsContent value="facebook">
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Facebook className="mr-2 h-4 w-4" />
                  Continuar con Facebook
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Al continuar con Facebook, aceptas nuestros{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:text-green-800"
                  >
                    Términos de servicio
                  </Link>{" "}
                  y{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 hover:text-green-800"
                  >
                    Política de privacidad
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
