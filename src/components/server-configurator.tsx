
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Server, Cpu, HardDrive, MemoryStick } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Component {
  name: string;
  price: number;
}

interface ServerConfiguratorProps {
  frameType: string;
}

const serverConfigs = {
  "1U Rack Server": {
    cpuOptions: [
      { name: "Intel Xeon Gold 5315Y", price: 450 },
      { name: "Intel Xeon Gold 6326", price: 750 },
      { name: "Intel Xeon Platinum 8358", price: 1200 },
    ],
    ramOptions: [
      { name: "4GB DDR4-3200 ECC", price: 45 },
      { name: "8GB DDR4-3200 ECC", price: 85 },
      { name: "16GB DDR4-3200 ECC", price: 160 },
    ],
    storageOptions: [
      { name: "2 x 480GB SSD RAID1", price: 240 },
      { name: "2 x 960GB SSD RAID1", price: 400 },
      { name: "4 x 480GB SSD RAID10", price: 480 },
    ],
    maxCpus: 2,
    maxRamSticks: 8,
  },
  "2U Rack Server": {
    cpuOptions: [
      { name: "AMD EPYC 7313", price: 700 },
      { name: "AMD EPYC 7413", price: 900 },
      { name: "AMD EPYC 7513", price: 1300 },
    ],
    ramOptions: [
      { name: "8GB DDR4-2933 ECC", price: 80 },
      { name: "16GB DDR4-2933 ECC", price: 150 },
      { name: "32GB DDR4-2933 ECC", price: 275 },
    ],
    storageOptions: [
      { name: "4 x 2TB SATA HDD RAID5", price: 600 },
      { name: "4 x 4TB SATA HDD RAID5", price: 800 },
      { name: "8 x 2TB SATA HDD RAID10", price: 1200 },
    ],
    maxCpus: 2,
    maxRamSticks: 16,
  },
  "Tower Server": {
    cpuOptions: [
      { name: "Intel Xeon E-2314", price: 250 },
      { name: "Intel Xeon E-2334", price: 350 },
      { name: "Intel Xeon E-2378", price: 500 },
    ],
    ramOptions: [
      { name: "4GB DDR4-2666", price: 45 },
      { name: "8GB DDR4-2666", price: 85 },
      { name: "16GB DDR4-2666", price: 160 },
    ],
    storageOptions: [
      { name: "1TB SATA HDD", price: 80 },
      { name: "2TB SATA HDD", price: 120 },
      { name: "500GB SSD + 2TB HDD", price: 200 },
    ],
    maxCpus: 1,
    maxRamSticks: 4,
  },
};

export function ServerConfigurator({ frameType }: ServerConfiguratorProps) {
  const config = serverConfigs[frameType as keyof typeof serverConfigs];
  const [selectedCpu, setSelectedCpu] = useState<Component>(config.cpuOptions[0]);
  const [selectedRam, setSelectedRam] = useState<Component>(config.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState<Component>(config.storageOptions[0]);
  const [cpuQuantity, setCpuQuantity] = useState(1);
  const [ramQuantity, setRamQuantity] = useState(1);

  const calculateTotal = () => {
    return (selectedCpu.price * cpuQuantity) + 
           (selectedRam.price * ramQuantity) + 
           selectedStorage.price;
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
              <Cpu className="h-4 w-4" /> Processor ({config.maxCpus} max)
            </label>
            <div className="flex gap-2">
              <Select
                value={selectedCpu.name}
                onValueChange={(value) => 
                  setSelectedCpu(config.cpuOptions.find((cpu) => cpu.name === value) || config.cpuOptions[0])
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent>
                  {config.cpuOptions.map((cpu) => (
                    <SelectItem key={cpu.name} value={cpu.name}>
                      {cpu.name} (+${cpu.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="1"
                max={config.maxCpus}
                value={cpuQuantity}
                onChange={(e) => setCpuQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), config.maxCpus))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MemoryStick className="h-4 w-4" /> Memory ({config.maxRamSticks} slots)
            </label>
            <div className="flex gap-2">
              <Select
                value={selectedRam.name}
                onValueChange={(value) =>
                  setSelectedRam(config.ramOptions.find((ram) => ram.name === value) || config.ramOptions[0])
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select RAM" />
                </SelectTrigger>
                <SelectContent>
                  {config.ramOptions.map((ram) => (
                    <SelectItem key={ram.name} value={ram.name}>
                      {ram.name} (+${ram.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="1"
                max={config.maxRamSticks}
                value={ramQuantity}
                onChange={(e) => setRamQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), config.maxRamSticks))}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <HardDrive className="h-4 w-4" /> Storage
            </label>
            <Select
              value={selectedStorage.name}
              onValueChange={(value) =>
                setSelectedStorage(config.storageOptions.find((storage) => storage.name === value) || config.storageOptions[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Storage" />
              </SelectTrigger>
              <SelectContent>
                {config.storageOptions.map((storage) => (
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
            <li>CPU: {cpuQuantity}x {selectedCpu.name} (${selectedCpu.price * cpuQuantity})</li>
            <li>RAM: {ramQuantity}x {selectedRam.name} (${selectedRam.price * ramQuantity})</li>
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
