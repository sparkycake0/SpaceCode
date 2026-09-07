import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  showArrow?: boolean;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-primary text-background hover:bg-primary-soft",
  ghost:
    "border border-border-light text-foreground hover:border-primary hover:text-primary",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "", showArrow = true } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
        {showArrow && <ArrowUpRight className="h-4 w-4" />}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      onClick={(props as ButtonAsButton).onClick}
      className={classes}
    >
      {children}
      {showArrow && <ArrowUpRight className="h-4 w-4" />}
    </button>
  );
}
