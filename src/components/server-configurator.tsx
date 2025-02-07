
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Server, Cpu, HardDrive, MemoryStick } from "lucide-react";

interface Component {
  name: string;
  price: number;
}

interface ServerConfiguratorProps {
  frameType: string;
}

const cpuOptions: Component[] = [
  { name: "Intel Xeon E5-2620 v3", price: 50 },
  { name: "Intel Xeon E5-2650 v3", price: 80 },
  { name: "Intel Xeon E5-2680 v3", price: 120 },
];

const ramOptions: Component[] = [
  { name: "16GB DDR4", price: 40 },
  { name: "32GB DDR4", price: 75 },
  { name: "64GB DDR4", price: 140 },
];

const storageOptions: Component[] = [
  { name: "500GB SSD", price: 60 },
  { name: "1TB SSD", price: 100 },
  { name: "2TB SSD", price: 180 },
];

export function ServerConfigurator({ frameType }: ServerConfiguratorProps) {
  const [selectedCpu, setSelectedCpu] = useState<Component>(cpuOptions[0]);
  const [selectedRam, setSelectedRam] = useState<Component>(ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState<Component>(storageOptions[0]);

  const calculateTotal = () => {
    return selectedCpu.price + selectedRam.price + selectedStorage.price;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Server className="h-6 w-6 text-slate-600" />
          <CardTitle className="text-xl">{frameType} Configuration</CardTitle>
        </div>
        <CardDescription>Select your components below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Cpu className="h-4 w-4" /> Processor
            </label>
            <Select
              value={selectedCpu.name}
              onValueChange={(value) => 
                setSelectedCpu(cpuOptions.find((cpu) => cpu.name === value) || cpuOptions[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select CPU" />
              </SelectTrigger>
              <SelectContent>
                {cpuOptions.map((cpu) => (
                  <SelectItem key={cpu.name} value={cpu.name}>
                    {cpu.name} (+${cpu.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MemoryStick className="h-4 w-4" /> Memory
            </label>
            <Select
              value={selectedRam.name}
              onValueChange={(value) =>
                setSelectedRam(ramOptions.find((ram) => ram.name === value) || ramOptions[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select RAM" />
              </SelectTrigger>
              <SelectContent>
                {ramOptions.map((ram) => (
                  <SelectItem key={ram.name} value={ram.name}>
                    {ram.name} (+${ram.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <HardDrive className="h-4 w-4" /> Storage
            </label>
            <Select
              value={selectedStorage.name}
              onValueChange={(value) =>
                setSelectedStorage(storageOptions.find((storage) => storage.name === value) || storageOptions[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Storage" />
              </SelectTrigger>
              <SelectContent>
                {storageOptions.map((storage) => (
                  <SelectItem key={storage.name} value={storage.name}>
                    {storage.name} (+${storage.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-sm font-medium">Selected Configuration</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Server Type: {frameType}</li>
            <li>CPU: {selectedCpu.name} (${selectedCpu.price})</li>
            <li>RAM: {selectedRam.name} (${selectedRam.price})</li>
            <li>Storage: {selectedStorage.name} (${selectedStorage.price})</li>
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t pt-4">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-bold">${calculateTotal()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-slate-800 hover:bg-slate-700">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
