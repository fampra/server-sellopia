
import { HeroSection } from "@/components/hero-section";
import { ServerConfigurator } from "@/components/server-configurator";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Configure Your Server
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Build your perfect server by selecting components below. See price updates in real-time.
            </p>
          </div>
          
          <div className="mx-auto mt-16 flex justify-center">
            <ServerConfigurator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
