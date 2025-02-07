
import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { ServerConfigurator } from "@/components/server-configurator";
import { ServerFrames } from "@/components/server-frames";

const Index = () => {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  const handleFrameSelect = (frame: string) => {
    setSelectedFrame(frame);
    setShowConfigurator(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!showConfigurator ? (
            <div className="mx-auto animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Select Your Server Frame
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Choose from our range of server frames below to begin configuration
                </p>
              </div>
              <div className="mt-16">
                <ServerFrames onFrameSelect={handleFrameSelect} />
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Configure Your Server
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Build your perfect {selectedFrame} server by selecting components below.
                </p>
                <button
                  onClick={() => setShowConfigurator(false)}
                  className="mt-4 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back to server selection
                </button>
              </div>
              <div className="mx-auto mt-16 flex justify-center">
                <ServerConfigurator frameType={selectedFrame || ""} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
