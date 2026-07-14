import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="absolute left-6 top-6"><Link href="/"><BrandMark /></Link></div>
      <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
      {children}
    </main>
  );
}

