import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Site Layout
 * 
 * This layout wraps all public-facing pages with the site header and footer.
 * Dashboard pages have their own layout without these components.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </>
  );
}

