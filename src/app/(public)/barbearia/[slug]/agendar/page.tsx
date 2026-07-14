import Link from "next/link";

import { BookingWizard } from "@/components/booking/booking-wizard";
import { BrandMark } from "@/components/brand-mark";
import { business } from "@/data/demo";

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <main className="min-h-screen"><nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href={`/barbearia/${business.slug}`}><BrandMark /></Link><p className="text-xs text-muted-foreground">Reserva segura · AS Barber Club</p></nav><section className="px-5 pb-16 pt-4"><BookingWizard /></section></main>;
}

