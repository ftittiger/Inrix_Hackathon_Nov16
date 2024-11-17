"use client";

import { Link, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      {routes.map((route) => (
        <Link
          className={cn(
            "w-full lg:w-auto justify-between font-normal transition-colors hover:text-foreground/80 text-foreground/60",
            pathname ? "text-foreground" : "text-foreground/60"
          )}
          key={route.label}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
