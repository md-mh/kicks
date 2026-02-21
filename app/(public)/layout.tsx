import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// The Layout that wraps the public pages.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f3f4f3]">
      <div className="max-w-7xl mx-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
