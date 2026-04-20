import { Calculator } from "lucide-react";

import { KpiSidebar } from "./ui/kpi-sidebar";

export default function KpiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full max-w-[1800px] flex-col px-4 lg:flex-row lg:px-0">
      {/* ── Fixed Navigation Sidebar ────────────────────── */}
      <aside className="w-full shrink-0 border-r py-6 pr-6 lg:sticky lg:top-0 lg:h-screen lg:w-64">
        <div className="scrollbar-thin h-full overflow-y-auto pr-3 pl-5">
          <KpiSidebar />
        </div>
      </aside>

      {/* ── Content Area (changes per route) ─────────────── */}
      <main className="flex min-h-[600px] flex-1 flex-col overflow-hidden py-8">
        <h1 className="flex items-center justify-center gap-2 pb-8 text-center font-bold text-3xl text-foreground tracking-tight">
          <Calculator className="size-10" />
          KPI Calculator
        </h1>
        <div className="flex flex-1 flex-col border-t">{children}</div>
      </main>
    </div>
  );
}
