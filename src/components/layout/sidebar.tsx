"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, KanbanSquare, LayoutDashboard } from "lucide-react";

import { BrandPulseIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/brands", label: "Brands", icon: Building2 },
  { href: "/programs", label: "Programs", icon: KanbanSquare },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col gap-2 border-r bg-card p-4">
      <div className="flex items-center gap-2 px-2 py-4">
        <BrandPulseIcon className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary font-headline">
          BrandPulse
        </h1>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className="justify-start"
            >
              <Link href={item.href}>
                <item.icon className={cn("mr-2 h-4 w-4", isActive ? "text-secondary-foreground" : "text-muted-foreground")} />
                <span className={cn(isActive ? "text-secondary-foreground" : "text-primary-foreground/80")}>
                    {item.label}
                </span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
