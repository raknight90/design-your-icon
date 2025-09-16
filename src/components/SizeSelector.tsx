import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
}

const ICON_SIZES = [
  { value: 16, label: "16x16 (Favicon)" },
  { value: 32, label: "32x32 (Small)" },
  { value: 48, label: "48x48 (Medium)" },
  { value: 64, label: "64x64 (Large)" },
  { value: 128, label: "128x128 (Retina)" },
  { value: 256, label: "256x256 (Standard)" },
  { value: 512, label: "512x512 (High-res)" },
  { value: 1024, label: "1024x1024 (Ultra)" }
];

export const SizeSelector = ({ value, onChange }: SizeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Icon Size</Label>
      <Select value={value.toString()} onValueChange={(val) => onChange(parseInt(val))}>
        <SelectTrigger>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {ICON_SIZES.map((size) => (
            <SelectItem key={size.value} value={size.value.toString()}>
              {size.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};