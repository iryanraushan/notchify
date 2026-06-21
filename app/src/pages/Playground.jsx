import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaygroundCore from "@/components/PlaygroundCore";

export default function Playground() {
  return (
    <div
      className="page-shell min-h-screen"
      data-testid="page-playground"
    >
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#F59E0B] mb-2">
              Playground
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tighter">
              Build your toast.{" "}
              <span className="text-[#737373]">
                Live.
              </span>
            </h1>

            <p className="mt-3 text-[#B5B5B5] max-w-xl">
              Tune every option on the left.
              Preview updates instantly. Copy the
              generated code from the right.
            </p>
          </div>

          <PlaygroundCore />
        </section>
      </main>

      <Footer />
    </div>
  );
}
