export function PageHeader({ eyebrow, title, description, image, children }: { eyebrow: string; title: string; description?: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pt-28 pb-12 lg:pt-36 lg:pb-16">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        </>
      )}
      {!image && <div className="absolute inset-0 court-lines" />}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand/25 blur-[100px]" />
      <div className="container-x relative animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-zinc-400">{description}</p>}
        {children}
      </div>
    </section>
  );
}
