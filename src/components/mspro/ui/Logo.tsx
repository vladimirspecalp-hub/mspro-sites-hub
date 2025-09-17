import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ variant = "light", size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16"
  };

  const logoSrc = {
    light: "/images/logo-light.png",
    dark: "/images/logo-dark.png", 
    icon: "/images/logo-icon.jpeg"
  };

  return (
    <img 
      src={logoSrc[variant]}
      alt="MSPRO - Metallium System Protect"
      className={cn(
        "object-contain",
        sizeClasses[size],
        className
      )}
    />
  );
}