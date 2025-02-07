
import { HeroSection } from "@/components/hero-section";
import { ServerCard } from "@/components/server-card";

const servers = [
  {
    title: "Starter Server",
    price: 49,
    specs: [
      "4 CPU Cores",
      "8GB RAM",
      "250GB SSD",
      "5TB Bandwidth",
      "24/7 Support"
    ]
  },
  {
    title: "Professional Server",
    price: 99,
    specs: [
      "8 CPU Cores",
      "16GB RAM",
      "500GB SSD",
      "10TB Bandwidth",
      "Priority Support",
      "DDoS Protection"
    ],
    popular: true
  },
  {
    title: "Enterprise Server",
    price: 199,
    specs: [
      "16 CPU Cores",
      "32GB RAM",
      "1TB SSD",
      "Unlimited Bandwidth",
      "24/7 Premium Support",
      "Advanced Security Suite",
      "Dedicated IP"
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Choose Your Perfect Server
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Select from our range of pre-configured servers, optimized for performance and reliability.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {servers.map((server, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <ServerCard {...server} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
