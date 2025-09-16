import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorPicker } from "@/components/ColorPicker";
import { SizeSelector } from "@/components/SizeSelector";
import { IconPreview } from "@/components/IconPreview";
import { Download, Save, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IconData } from "@/pages/Index";

interface IconMakerProps {
  initialIcon?: IconData | null;
  onIconCreated?: () => void;
}

export const IconMaker = ({ initialIcon, onIconCreated }: IconMakerProps) => {
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#6366f1");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load initial icon data
  useEffect(() => {
    if (initialIcon) {
      setDescription(initialIcon.description);
      setIconName(initialIcon.name);
      setBackgroundColor(initialIcon.backgroundColor);
      setForegroundColor(initialIcon.foregroundColor);
      setSize(initialIcon.size);
      setGeneratedImageUrl(initialIcon.imageUrl);
    }
  }, [initialIcon]);

  const generateIcon = async () => {
    if (!description.trim()) {
      toast.error("Please enter an icon description");
      return;
    }

    setIsGenerating(true);
    try {
      // For demo purposes, we'll generate a colored square as placeholder
      // In a real app, you'd integrate with an AI image generation service
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create a simple icon based on description
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 512, 512);
        
        // Add some basic shape based on description keywords
        ctx.fillStyle = foregroundColor;
        if (description.toLowerCase().includes('circle')) {
          ctx.beginPath();
          ctx.arc(256, 256, 200, 0, 2 * Math.PI);
          ctx.fill();
        } else if (description.toLowerCase().includes('star')) {
          drawStar(ctx, 256, 256, 5, 180, 90);
        } else if (description.toLowerCase().includes('heart')) {
          drawHeart(ctx, 256, 256, 180);
        } else {
          // Default rectangle
          ctx.fillRect(100, 100, 312, 312);
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(150, 150, 212, 212);
        }
        
        const dataUrl = canvas.toDataURL('image/png');
        setGeneratedImageUrl(dataUrl);
        toast.success("Icon generated successfully!");
      }
    } catch (error) {
      console.error('Error generating icon:', error);
      toast.error("Failed to generate icon");
    } finally {
      setIsGenerating(false);
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  };

  const saveIcon = () => {
    if (!generatedImageUrl || !iconName.trim()) {
      toast.error("Please generate an icon and enter a name");
      return;
    }

    const iconData: IconData = {
      id: crypto.randomUUID(),
      name: iconName,
      description,
      imageUrl: generatedImageUrl,
      backgroundColor,
      foregroundColor,
      size,
      createdAt: new Date().toISOString()
    };

    const savedIcons = JSON.parse(localStorage.getItem('iconLibrary') || '[]');
    savedIcons.push(iconData);
    localStorage.setItem('iconLibrary', JSON.stringify(savedIcons));
    
    toast.success("Icon saved to library!");
    onIconCreated?.();
  };

  const downloadIcon = () => {
    if (!generatedImageUrl) {
      toast.error("Please generate an icon first");
      return;
    }

    const link = document.createElement('a');
    link.download = `${iconName || 'icon'}_${size}x${size}.png`;
    link.href = generatedImageUrl;
    link.click();
    
    toast.success("Icon downloaded!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls Panel */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Icon Creator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Icon Name</Label>
            <Input
              id="name"
              placeholder="My awesome icon"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your icon... e.g., 'A modern app icon with a blue gradient background and a white star in the center'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Background"
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
            <ColorPicker
              label="Foreground"
              color={foregroundColor}
              onChange={setForegroundColor}
            />
          </div>

          <SizeSelector value={size} onChange={setSize} />

          <Button 
            onClick={generateIcon} 
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Icon
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={saveIcon}
              disabled={!generatedImageUrl}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadIcon}
              disabled={!generatedImageUrl}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <IconPreview
            imageUrl={generatedImageUrl}
            backgroundColor={backgroundColor}
            size={size}
            ref={canvasRef}
          />
        </CardContent>
      </Card>
    </div>
  );
};