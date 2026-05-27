import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md",
  secondary:
    "bg-navy-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-md",
  outline:
    "border border-navy-900/80 bg-transparent text-navy-900 hover:border-brand-700 hover:bg-[#f5f3f0] hover:text-brand-700",
  ghost: "text-ink-soft hover:bg-[#f5f3f0] hover:text-navy-900",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as AnchorProps;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
