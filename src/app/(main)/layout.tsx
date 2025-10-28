import AppSidebar from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-screen">
      <AppSidebar />
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 bg-background/60">
        {children}
      </main>
    </div>
  );
}
