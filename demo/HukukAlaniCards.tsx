"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { FileText, Scale, BookOpen } from "lucide-react"

const HUKUK_ALANLARI = [
  { name: "Ceza Hukuku", slug: "ceza-hukuku" },
  { name: "Aile Hukuku", slug: "aile-hukuku" },
  { name: "Miras Hukuku", slug: "miras-hukuku" },
  { name: "Sigorta Hukuku", slug: "sigorta-hukuku" },
  { name: "İcra ve İflas Hukuku", slug: "icra-ve-iflas-hukuku" },
  { name: "Tüketici Hukuku", slug: "tuketici-hukuku" },
  { name: "İş & Sosyal Güvenlik Hukuku", slug: "is-sosyal-guvenlik-hukuku" },
  { name: "Kira & Kat Mülkiyeti Hukuku", slug: "kira-kat-mulkiyeti-hukuku" },
  { name: "Kolluk Hukuku", slug: "kolluk-hukuku" },
  { name: "Vergi Hukuku", slug: "vergi-hukuku" },
  { name: "İdare Hukuku", slug: "idare-hukuku" },
] as const

type Area = (typeof HUKUK_ALANLARI)[number]

type Props = {
  /** Showcase için: slug verirsen o alan seçilir */
  defaultSlug?: Area["slug"]
}

export default function HukukAlaniCards({ defaultSlug = "ceza-hukuku" }: Props) {
  const defaultArea = useMemo(
    () => HUKUK_ALANLARI.find((a) => a.slug === defaultSlug) ?? HUKUK_ALANLARI[0],
    [defaultSlug]
  )

  const [alan, setAlan] = useState<Area>(defaultArea)

  return (
    <main className="pt-0">
      {/* HERO */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(81, 74, 63, 0.95) 0%, rgba(71, 64, 53, 0.9) 50%, rgba(61, 54, 43, 0.85) 100%)",
        }}
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30px 30px, rgba(224, 180, 76, 0.3) 2px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(224, 180, 76, 0.4) 0%, transparent 70%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-6xl font-serif font-bold mb-6"
              style={{
                color: "#f9d977",
                textShadow: "0 2px 10px rgba(249, 217, 119, 0.3)",
                letterSpacing: "0.02em",
              }}
            >
              {alan.name}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-[#e5e5e5]">
              {alan.name} alanında profesyonel hukuki danışmanlık ve avukatlık hizmetleri
            </p>

            {/* Showcase seçici (istersen README’de “Demo” diye anlatırsın) */}
            <div className="mt-10 flex justify-center">
              <select
                value={alan.slug}
                onChange={(e) => {
                  const next = HUKUK_ALANLARI.find((x) => x.slug === e.target.value)
                  if (next) setAlan(next)
                }}
                className="bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 backdrop-blur-md focus:outline-none"
              >
                {HUKUK_ALANLARI.map((a) => (
                  <option key={a.slug} value={a.slug} className="text-black">
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3’LÜ KART */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #f8f6f3 0%, #ffffff 50%, #f0ebe5 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, rgba(81, 74, 63, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LuxCard
                href={`/dilekceler?kategori=${alan.slug}`}
                titleTop={alan.name}
                titleBottom="Dilekçeleri"
                desc={`${alan.name} alanında hazırlanmış örnek dilekçeleri inceleyin`}
                Icon={FileText}
              />
              <LuxCard
                href={`/emsal-kararlar?kategori=${alan.slug}`}
                titleTop={alan.name}
                titleBottom="Emsal Kararları"
                desc={`${alan.name} ile ilgili önemli mahkeme ve Yargıtay kararlarını okuyun`}
                Icon={Scale}
              />
              <LuxCard
                href={`/makaleler?kategori=${alan.slug}`}
                titleTop={alan.name}
                titleBottom="Makaleleri"
                desc={`${alan.name} hakkında detaylı analizler ve makaleleri keşfedin`}
                Icon={BookOpen}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function LuxCard({
  href,
  titleTop,
  titleBottom,
  desc,
  Icon,
}: {
  href: string
  titleTop: string
  titleBottom: string
  desc: string
  Icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link href={href} className="block">
      <div
        className={[
          "group relative p-10 h-full rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden",
          "border-2 border-[#e0b44c]/20",
          "shadow-[0_4px_20px_rgba(81,74,63,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]",
          "hover:shadow-[0_12px_40px_rgba(224,180,76,0.40),0_0_30px_rgba(224,180,76,0.20)]",
          "hover:-translate-y-2 hover:scale-[1.03] hover:border-[#e0b44c]",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, rgba(245, 243, 240, 0.8) 50%, rgba(240, 235, 229, 0.6) 100%)",
        }}
      >
        {/* hover’da arka planı koyulaştır */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(81, 74, 63, 0.95) 0%, rgba(71, 64, 53, 0.9) 50%, rgba(61, 54, 43, 0.85) 100%)",
          }}
        />

        {/* dekoratif köşe glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at top right, #e0b44c 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* ikon kutusu */}
          <div
            className={[
              "mb-6 transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-6",
              "p-6 rounded-[24px] border-2 border-[#e0b44c]/30",
              "shadow-[0_4px_12px_rgba(224,180,76,0.15)]",
              "bg-[linear-gradient(135deg,rgba(224,180,76,0.15)_0%,rgba(249,217,119,0.10)_100%)]",
              "group-hover:bg-[linear-gradient(135deg,#e0b44c_0%,#f9d977_100%)]",
              "group-hover:border-[#f9d977]",
              "group-hover:shadow-[0_8px_24px_rgba(224,180,76,0.50)]",
            ].join(" ")}
          >
            <Icon className="w-14 h-14 text-[#e0b44c] group-hover:text-[#1a1a1a] transition-all duration-500 drop-shadow" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif leading-[1.3] text-[#1a1a1a] group-hover:text-[#f9d977] transition-all duration-500">
            {titleTop}
            <br />
            {titleBottom}
          </h3>

          <p className="text-base leading-relaxed text-[#666] group-hover:text-[#e5e5e5] transition-all duration-500">
            {desc}
          </p>

          <div className="mt-6 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-bold mr-2 text-[#f9d977]">İncele</span>
            <svg
              className="w-5 h-5 text-[#f9d977]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
