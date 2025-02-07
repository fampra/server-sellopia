
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Premium Pre-Configured Servers
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Experience lightning-fast performance with our expertly configured servers. 
              Ready to deploy, optimized for your needs, and backed by enterprise-grade support.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="bg-white text-slate-900 hover:bg-slate-100">
                View Servers
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="link" className="text-white hover:text-slate-300">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
