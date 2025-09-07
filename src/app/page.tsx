import HeroHeader from "@/components/HeroHeader";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import PricingAndAddons from "@/components/PricingAndAddons";
import FinalCTAFooter from "@/components/FinalCTAFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Hero Header Section with Navigation */}
      <HeroHeader />

      {/* Problem Solution Section */}
      <div id="problem-solution">
        <ProblemSolution />
      </div>

      {/* Services Section */}
      <div id="services">
        <Services />
      </div>

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Pricing and Add-ons Section */}
      <div id="pricing">
        <PricingAndAddons />
      </div>

      {/* Final CTA and Footer Section */}
      <div id="contact">
        <FinalCTAFooter />
      </div>
    </div>
  );
}