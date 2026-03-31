import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ContactCTASection from "@/components/home/ContactCTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
