import { Calculator } from "lucide-react";
import { KpiSidebar } from "./ui/kpi-sidebar";

export default function KpiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full max-w-[1800px] flex-col px-4 lg:flex-row lg:px-0">
      {/* ── Fixed Navigation Sidebar ────────────────────── */}
      <aside className="w-full shrink-0 lg:w-64 border-r pr-6 py-6 lg:h-screen">
        <div className="sticky top-0 h-full overflow-y-auto pl-5 pr-3 mr-1 scrollbar-thin">
          <KpiSidebar />
        </div>
      </aside>

      {/* ── Content Area (changes per route) ─────────────── */}
      <main className="flex min-h-[600px] flex-1 flex-col overflow-hidden py-8">
        <h1 className="font-bold text-3xl text-foreground tracking-tight text-center flex items-center gap-2 justify-center pb-8">
          <Calculator className="size-10" />
          KPI Calculator
        </h1>
        <div className="flex flex-1 flex-col border-t">{children}</div>
      </main>
    </div>
  );
}
