import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#84cc16", "#f97316", "#6b7280",
  "#000000", "#ffffff", "#1f2937", "#374151", "#9ca3af"
];

export const ColorPicker = ({ label, color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 p-2 flex items-center gap-3"
          >
            <div
              className="w-6 h-6 rounded-md border-2 border-border flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-sm flex-1 text-left">{color}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-12 h-8 p-0 border-0"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 font-mono text-sm"
                placeholder="#000000"
              />
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                Preset Colors
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((presetColor) => (
                  <Button
                    key={presetColor}
                    className="w-8 h-8 p-0 rounded-md border-2 border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => {
                      onChange(presetColor);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};