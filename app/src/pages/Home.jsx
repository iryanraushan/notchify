import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ShowcaseGrid from "@/components/ShowcaseGrid";
import FeatureCards from "@/components/FeatureCards";
import PlaygroundCore from "@/components/PlaygroundCore";

export default function Home() {
  return (
    <div
      className="page-shell min-h-screen"
      data-testid="page-home"
    >
      <Navbar />

      <main>
        <Hero />
        <ShowcaseGrid />
        <PlaygroundCore />
        <FeatureCards />

      </main>

      <Footer />
    </div>
  );
}
