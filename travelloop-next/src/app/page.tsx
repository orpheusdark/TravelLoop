import { FooterCta } from "@/components/layout/footer-cta";
import { Navbar } from "@/components/layout/navbar";
import {
  AiPlannerSection,
  CommunitySection,
  FaqSection,
  FeaturedDestinationsSection,
  HeroParticles,
  HeroSection,
  InsightsSection,
  MarketplaceSection,
  MobileShowcaseSection,
  PricingSection,
  SmartSearchSection,
  TrustStrip,
  WorldExplorationSection
} from "@/components/sections/landing-sections";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden scroll-smooth">
      <div className="mesh-bg" />
      <HeroParticles />
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <SmartSearchSection />
        <FeaturedDestinationsSection />
        <WorldExplorationSection />
        <AiPlannerSection />
        <CommunitySection />
        <MarketplaceSection />
        <InsightsSection />
        <MobileShowcaseSection />
        <PricingSection />
        <FaqSection />
        <FooterCta />
      </main>
    </div>
  );
}
