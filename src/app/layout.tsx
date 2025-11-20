import "@/utils/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { Metadata } from "next";

import { Providers } from "./providers";

import { fontSans } from "@/utils/fonts";
import { Navbar } from "@/components/header/navbar";
import { SidebarRoot } from "@/components/header/sidebarRoot";
import { getUserCookie } from "@/utils/helpers/cookie";
import { getDeployEnvironment } from "@/utils/env";

export const metadata: Metadata = {
  title: {
    default: "Nombre del sitio",
    template: `%s - nombre del sitio`,
  },
  description: "Descripción del sitio",
  icons: {
    icon: "/icono_muserpol.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserCookie();
  const environment = getDeployEnvironment();
  const computerToolName = "TEMPLATE MUSERPOL";

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col h-screen">
            <Navbar
              computerToolName={computerToolName}
              environment={environment}
              user={data}
            />
            <div className="flex flex-1 overflow-x-hidden">
              <SidebarRoot />
              <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-neutral-950">
                {children}
              </main>
            </div>
            {/* <footer className="bg-red-600 text-white text-center py-2 text-sm">
              <span className="uppercase text-sm font-semibold">Versión de pruebas</span>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
