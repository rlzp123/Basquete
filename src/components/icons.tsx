import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", ...p });

export const SearchIcon = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const CartIcon = (p: P) => (<svg {...base(p)}><path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></svg>);
export const UserIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>);
export const HeartIcon = (p: P & { filled?: boolean }) => { const { filled, ...rest } = p; return (<svg {...base(rest)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-9-8.5C1.5 8 3.6 4.5 7.2 4.5c2 0 3.4 1.1 4.8 2.7 1.4-1.6 2.8-2.7 4.8-2.7 3.6 0 5.7 3.5 4.2 7-2 4.1-9 8.5-9 8.5Z" /></svg>); };
export const StarIcon = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8Z" /></svg>);
export const MenuIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ArrowRight = (p: P) => (<svg {...base(p)}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>);
export const CalendarIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const ClockIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const PinIcon = (p: P) => (<svg {...base(p)}><path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Z" /><circle cx="12" cy="10" r="2.2" /></svg>);
export const TrashIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)}><path d="m5 12 5 5L20 7" /></svg>);
export const TrophyIcon = (p: P) => (<svg {...base(p)}><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M10 17h4" /></svg>);
export const BoltIcon = (p: P) => (<svg {...base(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>);
export const TruckIcon = (p: P) => (<svg {...base(p)}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>);
export const ShieldIcon = (p: P) => (<svg {...base(p)}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /></svg>);
export const RefreshIcon = (p: P) => (<svg {...base(p)}><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" /></svg>);
export const BallIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>);
export const MailIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const PhoneIcon = (p: P) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const LogoutIcon = (p: P) => (<svg {...base(p)}><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" /></svg>);
export const PackageIcon = (p: P) => (<svg {...base(p)}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4 7.5 12 12l8-4.5M12 12v9" /></svg>);

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-brand">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="4" y="4" width="16" height="12" rx="1.5" />
          <rect x="9" y="9" width="6" height="5" rx="0.8" />
          <path d="M12 16v4" />
        </svg>
      </span>
      <span className="text-lg font-black tracking-[0.18em] text-white">BACKBOARD</span>
    </span>
  );
}
