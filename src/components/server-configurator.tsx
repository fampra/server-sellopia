import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, MemoryStick, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Component {
  name: string;
  price: number;
}

interface ServerConfiguratorProps {
  frameType: string;
}

const serverConfigs = {
  "HPE ProLiant DL160 Gen9": {
    startingPrice: 50, // Starting price for the server
    cpuOptions: [
      { name: "Intel Xeon E5-2623 V3 4-Core 3.00GHz", price: 7 },
      { name: "Intel Xeon E5-2603 V3 6-Core 1.60GHz", price: 7 },
      { name: "Intel Xeon E5-2630 V3 8-Core 2.40GHz", price: 7 },
    ],
    ramOptions: [
      { name: "4GB - DDR4 2400MHz", price: 6 },
      { name: "8GB - DDR4 2666MHz", price: 12 },
      { name: "16GB - DDR4 2133MHz", price: 12 },
      { name: "32GB - DDR4 2133MHz", price: 28 },
    ],
    storageOptions: [
      { name: "2TB - SATA (10K, 6G) HDD", price: 70 },
      { name: "240GB - SATA (6G) SSD", price: 28 },
      { name: "500GB - SATA (6G) SSD - New", price: 45 },
      { name: "800GB - SATA (6G) SSD - Enterprise", price: 65 },
    ],
    maxCpus: 2,
    maxRamSticks: 16,
    maxStorage: 8, // Max storage count (not total size)
  },
};

export function ServerConfigurator({ frameType }: ServerConfiguratorProps) {
  const config = serverConfigs[frameType as keyof typeof serverConfigs];

  const [selectedCpu, setSelectedCpu] = useState<Component>(config.cpuOptions[0]);
  const [selectedRam, setSelectedRam] = useState<Component>(config.ramOptions[0]);
  const [selectedStorages, setSelectedStorages] = useState<{ storage: Component; quantity: number }[]>([]);
  const [cpuQuantity, setCpuQuantity] = useState(1);
  const [ramQuantity, setRamQuantity] = useState(1);

  // Function to add storage but ensure the total count of disks does not exceed 8
  const addStorage = (storage: Component) => {
    setSelectedStorages((prevStorages) => {
      const totalQuantity = prevStorages.reduce((sum, s) => sum + s.quantity, 0);

      if (totalQuantity < config.maxStorage) {
        const existingIndex = prevStorages.findIndex((s) => s.storage.name === storage.name);
        if (existingIndex !== -1) {
          const updatedStorages = [...prevStorages];
          updatedStorages[existingIndex] = {
            storage,
            quantity: updatedStorages[existingIndex].quantity + 1,
          };
          return updatedStorages;
        }
        return [...prevStorages, { storage, quantity: 1 }];
      }
      alert("You cannot add more than 8 disks in total.");
      return prevStorages;
    });
  };

  const updateStorageQuantity = (index: number, quantity: number) => {
    setSelectedStorages((prevStorages) => {
      const updatedStorages = [...prevStorages];
      updatedStorages[index].quantity = quantity;

      const totalQuantity = updatedStorages.reduce((sum, s) => sum + s.quantity, 0);
      if (totalQuantity > config.maxStorage) {
        alert("You cannot exceed the limit of 8 disks.");
        return prevStorages; // Revert the quantity change if it exceeds the limit
      }

      return updatedStorages;
    });
  };

  const removeStorage = (index: number) => {
    setSelectedStorages((prevStorages) => prevStorages.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return (
      config.startingPrice +
      selectedCpu.price * cpuQuantity +
      selectedRam.price * ramQuantity +
      selectedStorages.reduce((sum, s) => sum + s.storage.price * s.quantity, 0)
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">{frameType} Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CPU Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Cpu className="h-4 w-4" /> Processor ({config.maxCpus} max)
          </label>
          <div className="flex gap-2">
            <Select value={selectedCpu.name} onValueChange={(value) => setSelectedCpu(config.cpuOptions.find((cpu) => cpu.name === value)!)} >
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
            <Input type="number" min="1" max={config.maxCpus} value={cpuQuantity} onChange={(e) => setCpuQuantity(Number(e.target.value))} className="w-20" />
          </div>
        </div>

        {/* RAM Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MemoryStick className="h-4 w-4" /> Memory ({config.maxRamSticks} slots)
          </label>
          <div className="flex gap-2">
            <Select value={selectedRam.name} onValueChange={(value) => setSelectedRam(config.ramOptions.find((ram) => ram.name === value)!)} >
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
            <Input type="number" min="1" max={config.maxRamSticks} value={ramQuantity} onChange={(e) => setRamQuantity(Number(e.target.value))} className="w-20" />
          </div>
        </div>

        {/* Storage Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <HardDrive className="h-4 w-4" /> Storage ({config.maxStorage} total)
          </label>
          <div className="flex gap-2">
            <Select onValueChange={(value) => addStorage(config.storageOptions.find((s) => s.name === value)!)} >
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
          <ul>
            {selectedStorages.map((s, index) => (
              <li key={index} className="flex justify-between items-center">
                {s.storage.name} x{s.quantity} (${s.storage.price * s.quantity})
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    min="1"
                    max={config.maxStorage}
                    value={s.quantity}
                    onChange={(e) => updateStorageQuantity(index, Number(e.target.value))}
                    className="w-20"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeStorage(index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-2xl font-bold">Total: ${calculateTotal()}</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-slate-800 hover:bg-slate-700">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
