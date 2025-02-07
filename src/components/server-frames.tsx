
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Box, HardDrive } from "lucide-react";

interface ServerFrameProps {
  onFrameSelect: (frame: string) => void;
}

const frames = [
  {
    id: "1u-rack",
    title: "1U Rack Server",
    description: "Compact 1U rack-mountable server optimized for high-density computing",
    icon: Server,
    startingPrice: 299,
    specs: [
      "Supports DDR4 ECC Memory up to 3200MHz",
      "Dual Intel Xeon Scalable CPU support",
      "Up to 4 x 2.5\" SSD/HDD bays",
      "Redundant power supplies",
    ]
  },
  {
    id: "2u-rack",
    title: "2U Rack Server",
    description: "Versatile 2U server with expanded storage and GPU capabilities",
    icon: HardDrive,
    startingPrice: 399,
    specs: [
      "Supports DDR4 ECC Memory up to 2933MHz",
      "Single AMD EPYC CPU support",
      "Up to 8 x 3.5\" SSD/HDD bays",
      "GPU support for up to 2 cards",
    ]
  },
  {
    id: "tower",
    title: "Tower Server",
    description: "Stand-alone tower server ideal for small business environments",
    icon: Box,
    startingPrice: 349,
    specs: [
      "Supports DDR4 Memory up to 2666MHz",
      "Intel Xeon E-2300 CPU support",
      "Up to 4 x 3.5\" SSD/HDD bays",
      "Quiet operation design",
    ]
  },
];

export function ServerFrames({ onFrameSelect }: ServerFrameProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {frames.map((frame) => {
        const Icon = frame.icon;
        return (
          <Card key={frame.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-slate-600" />
                <CardTitle className="text-xl">{frame.title}</CardTitle>
              </div>
              <CardDescription>Starting from ${frame.startingPrice}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-slate-600 mb-4">{frame.description}</p>
              <ul className="space-y-2">
                {frame.specs.map((spec, index) => (
                  <li key={index} className="flex items-center text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></div>
                    {spec}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-slate-800 hover:bg-slate-700"
                onClick={() => onFrameSelect(frame.title)}
              >
                Configure
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
