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
    light: "/images/logo-horizontal-dark.png",
    dark: "/images/logo-horizontal-dark.png", 
    icon: "/images/logo-icon.jpeg"
  };

  const dimensions = {
    sm: { width: 71, height: 32 },
    md: { width: 107, height: 48 },
    lg: { width: 143, height: 64 }
  };

  return (
    <img 
      src={logoSrc[variant]}
      alt="MSPRO - Metallium System Protect"
      width={dimensions[size].width}
      height={dimensions[size].height}
      className={cn(
        "object-contain",
        sizeClasses[size],
        className
      )}
    />
  );
}