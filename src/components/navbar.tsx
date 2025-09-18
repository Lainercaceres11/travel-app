"use client";

import { logout } from "@/lib/auth-action";
import { Session } from "next-auth";

import Image from "next/image";
import Link from "next/link";

export function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href={"/"} className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="font-bold text-2xl text-gray-800">
            Travel Planner
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/trips" className="text-slate-900 hover:text-sky-500">
                Viajes
              </Link>
              <Link href="/globe" className="text-slate-900 hover:text-sky-500">
                Mundo
              </Link>

              <button
                onClick={logout}
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-slate-900 hover:text-sky-500"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/auth/register"
                className="text-slate-900 hover:text-sky-500"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
