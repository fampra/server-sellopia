
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

interface ServerCardProps {
  title: string;
  price: number;
  specs: string[];
  popular?: boolean;
}

export function ServerCard({ title, price, specs, popular }: ServerCardProps) {
  return (
    <Card className={`w-full max-w-sm transition-all duration-300 hover:shadow-lg ${
      popular ? 'border-2 border-slate-800' : ''
    }`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Server className="h-6 w-6 text-slate-600" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        {popular && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-slate-800 rounded-full">
            Most Popular
          </span>
        )}
        <CardDescription>Starting at</CardDescription>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="ml-1 text-slate-500">/mo</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {specs.map((spec, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-slate-800 rounded-full mr-2"></span>
              {spec}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white transition-colors">
          Configure & Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
