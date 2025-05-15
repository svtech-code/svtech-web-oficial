import type { Project } from "types/project";

export const PROJECT: Project[] = [
  {
    id: "migracion-hosting",
    title: "Migración hosting",
    type: "Administración hosting",
    image: "ruta imagen",
    date: "2025",
    status: true,
  },
  {
    id: "soporte-informatico",
    title: "Mantenimiento equipos",
    type: "Soporte informático",
    image: "ruta imagen",
    date: "2025",
    status: true,
  },
  {
    id: "migracion-hosting",
    title: "Migración hosting",
    type: "Administración hosting",
    image: "ruta imagen",
    date: "2025",
    status: true,
  },
  {
    id: "tracto-erp",
    title: "TractoERP",
    type: "Desarrollo web",
    image: "ruta imagen",
    date: "2024 - 2025",
    status: false,
    technology: [
      { icon: "react", label: "React JS" },
      { icon: "typescript", label: "TypeScript" },
      { icon: "axios", label: "Axios" },
      { icon: "tailwind", label: "Tailwind CSS" }
    ],
  },
  {
    id: "web-page",
    title: "Página Web FEEM",
    type: "Desarrollo web",
    image: "ruta imagen",
    date: "2024",
    status: true,
    technology: [
      { icon: "astro", label: "Astro" },
      { icon: "typescript", label: "TypeScript" },
      { icon: "tailwind", label: "Tailwind CSS" }
    ],
  },
  {
    id: "portal-trabajadores",
    title: "Portal GAPO",
    type: "Desarrollo web",
    image: "ruta imagen",
    date: "2024",
    status: true,
    technology: [
      { icon: "react", label: "React JS" },
      { icon: "axios", label: "Axios" },
      { icon: "tailwind", label: "Tailwind CSS" }
    ],
  },
]
