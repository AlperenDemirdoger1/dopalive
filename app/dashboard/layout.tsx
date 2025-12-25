import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - DopaLive",
  description: "Kişisel DEHB koçluk dashboard'un. Öğren, gelişim, odaklan.",
};

/**
 * Dashboard Layout
 * 
 * This layout removes the default SiteHeader and SiteFooter
 * for dashboard pages, as they have their own navigation.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}

