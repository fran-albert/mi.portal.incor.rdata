"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import useRoles from "@/hooks/useRoles";
import React, { useEffect } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function HeaderComponent() {
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const { isPatient, isSecretary, isDoctor } = useRoles();
  const { data: session, status } = useSession();

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-incor">
      <Link href="#" className="mr-6 flex items-center" prefetch={false}>
        <Image
          src="https://incor-ranking.s3.us-east-1.amazonaws.com/storage/images/mi%20portal%20logo%20png.png"
          width={280}
          height={200}
          className="logo-img"
          alt="Incor Logo"
        />
      </Link>
      <NavigationMenu className="ml-auto hidden lg:flex">
        <NavigationMenuList>
          {session ? (
            <>
              <NavigationMenuLink asChild>
                <Link
                  href="/inicio"
                  className={`group inline-flex h-9 w-max items-center text-white justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-teal-600 ${
                    activeLink === "Inicio"
                      ? "underline decoration-teal-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Inicio")}
                  prefetch={false}
                >
                  Inicio
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/mi-perfil"
                  className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-teal-600 ${
                    activeLink === "Mi Perfil"
                      ? "underline decoration-teal-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Mi Perfil")}
                  prefetch={false}
                >
                  Mi Perfil
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/mis-estudios"
                  className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-teal-600 ${
                    activeLink === "Mis Estudios"
                      ? "underline decoration-teal-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Mis Estudios")}
                  prefetch={false}
                >
                  Mis Estudios
                </Link>
              </NavigationMenuLink>
              {isDoctor && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white">
                      Gestionar
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] p-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/usuarios/medicos"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Médicos
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/usuarios/pacientes"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Pacientes
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/especialidades"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Especialidades
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/obras-sociales"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Obras Sociales
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/reportes"
                        className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-teal-600 ${
                          activeLink === "Reportes"
                            ? "underline decoration-teal-500"
                            : ""
                        }`}
                        onClick={() => handleLinkClick("Reportes")}
                        prefetch={false}
                      >
                        Reportes
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
              {isSecretary && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white">
                      Gestionar
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] p-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/usuarios/medicos"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Médicos
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/usuarios/pacientes"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Pacientes
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/especialidades"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Especialidades
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/obras-sociales"
                            className="group grid h-auto w-full items-center justify-start text-black gap-1 rounded-md p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            prefetch={false}
                          >
                            Obras Sociales
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/reportes"
                        className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-teal-600 ${
                          activeLink === "Reportes"
                            ? "underline decoration-teal-500"
                            : ""
                        }`}
                        onClick={() => handleLinkClick("Reportes")}
                        prefetch={false}
                      >
                        Reportes
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
              <NavigationMenuLink asChild>
                <button
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition-colors hover:bg-red-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                    activeLink === "Salir" ? "" : ""
                  }`}
                  onClick={() => signOut()}
                >
                  Salir
                </button>
              </NavigationMenuLink>
            </>
          ) : (
            <NavigationMenuLink asChild>
              <Link
                href="/iniciar-sesion"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                prefetch={false}
              >
                Iniciar Sesión
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="ml-auto lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Menú de navegación</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            {session ? (
              <>
                <Link
                  href="/inicio"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Inicio")}
                  prefetch={false}
                >
                  Inicio
                </Link>
                <Link
                  href="/mi-perfil"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Mi Perfil")}
                  prefetch={false}
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/mis-estudios"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Mis Estudios")}
                  prefetch={false}
                >
                  Mis Estudios
                </Link>
                {(isDoctor || isSecretary) && (
                  <Collapsible className="grid gap-4">
                    <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                      Gestionar
                      <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="-mx-6 grid gap-6 bg-muted p-6">
                        <Link
                          href="/usuarios/medicos"
                          className="group grid h-auto w-full justify-start gap-1"
                          prefetch={false}
                        >
                          Médicos
                        </Link>
                        <Link
                          href="/usuarios/pacientes"
                          className="group grid h-auto w-full justify-start gap-1"
                          prefetch={false}
                        >
                          Pacientes
                        </Link>
                        <Link
                          href="/especialidades"
                          className="group grid h-auto w-full justify-start gap-1"
                          prefetch={false}
                        >
                          Especialidades
                        </Link>
                        <Link
                          href="/obras-sociales"
                          className="group grid h-auto w-full justify-start gap-1"
                          prefetch={false}
                        >
                          Obras Sociales
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
                <Link
                  href="/reportes"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Reportes")}
                  prefetch={false}
                >
                  Reportes
                </Link>
                <button
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => signOut()}
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                href="/iniciar-sesion"
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
