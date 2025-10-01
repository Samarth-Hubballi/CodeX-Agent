import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import "../styles/cyberpunk.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 CodeX. Built with AI-powered precision. 
            <span className="text-primary font-mono ml-2">NEURAL_STATUS: ACTIVE</span>
          </p>
        </div>
      </footer>
    </div>
  );
}