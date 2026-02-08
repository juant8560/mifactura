import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { InvoiceTypesSection } from "@/components/invoice-types-section";
import { Navbar } from "@/components/navbar";
import { RegistrationSection } from "@/components/registration-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InvoiceTypesSection />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
