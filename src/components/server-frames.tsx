
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
    description: "Compact 1U rack-mountable server, perfect for high-density deployments",
    icon: Server,
    startingPrice: 299,
  },
  {
    id: "2u-rack",
    title: "2U Rack Server",
    description: "Versatile 2U server with expanded storage and cooling capabilities",
    icon: HardDrive,
    startingPrice: 399,
  },
  {
    id: "tower",
    title: "Tower Server",
    description: "Stand-alone tower server ideal for small business and office environments",
    icon: Box,
    startingPrice: 349,
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
              <p className="text-slate-600">{frame.description}</p>
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
