import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorPicker } from "@/components/ColorPicker";
import { SizeSelector } from "@/components/SizeSelector";
import { IconPreview } from "@/components/IconPreview";
import { AIIconGenerator } from "@/components/AIIconGenerator";
import { PromptSuggestions } from "@/components/PromptSuggestions";
import { Download, Save, Sparkles, Loader2, HelpCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      toast.info("Generating icon with AI...");
      
      const aiResult = await AIIconGenerator.generateIcon({
        description,
        backgroundColor,
        foregroundColor,
        size
      });
      
      setGeneratedImageUrl(aiResult);
      toast.success("AI icon generated!");
      
    } catch (error) {
      console.error('Error generating icon:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate icon";
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateEnhancedIcon = async (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, backgroundColor);
      gradient.addColorStop(1, adjustBrightness(backgroundColor, -30));
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      
      // Generate icon based on description keywords
      ctx.fillStyle = foregroundColor;
      const desc = description.toLowerCase();
      
      if (desc.includes('circle') || desc.includes('round')) {
        drawCircleIcon(ctx);
      } else if (desc.includes('star')) {
        drawStar(ctx, 256, 256, 5, 180, 90);
      } else if (desc.includes('heart')) {
        drawHeart(ctx, 256, 256, 180);
      } else if (desc.includes('arrow') || desc.includes('play')) {
        drawArrow(ctx);
      } else if (desc.includes('gear') || desc.includes('settings') || desc.includes('cog')) {
        drawGear(ctx);
      } else if (desc.includes('house') || desc.includes('home')) {
        drawHouse(ctx);
      } else if (desc.includes('envelope') || desc.includes('mail') || desc.includes('message')) {
        drawEnvelope(ctx);
      } else if (desc.includes('music') || desc.includes('note')) {
        drawMusicNote(ctx);
      } else if (desc.includes('camera') || desc.includes('photo')) {
        drawCamera(ctx);
      } else if (desc.includes('lock') || desc.includes('security')) {
        drawLock(ctx);
      } else {
        // Default modern geometric design
        drawModernGeometric(ctx);
      }
      
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  };

  const adjustBrightness = (hex: string, amount: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  };

  const drawCircleIcon = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(256, 256, 180, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add inner ring
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(256, 256, 120, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawArrow = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(150, 256);
    ctx.lineTo(320, 180);
    ctx.lineTo(320, 220);
    ctx.lineTo(380, 220);
    ctx.lineTo(380, 292);
    ctx.lineTo(320, 292);
    ctx.lineTo(320, 332);
    ctx.closePath();
    ctx.fill();
  };

  const drawGear = (ctx: CanvasRenderingContext2D) => {
    const centerX = 256, centerY = 256;
    const innerRadius = 80;
    const outerRadius = 160;
    const teeth = 8;
    
    ctx.beginPath();
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    
    // Inner hole
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawHouse = (ctx: CanvasRenderingContext2D) => {
    // House base
    ctx.fillRect(150, 250, 212, 180);
    
    // Roof
    ctx.beginPath();
    ctx.moveTo(256, 150);
    ctx.lineTo(120, 270);
    ctx.lineTo(392, 270);
    ctx.closePath();
    ctx.fill();
    
    // Door
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(220, 350, 72, 80);
    
    // Window
    ctx.fillRect(180, 280, 40, 40);
    ctx.fillRect(292, 280, 40, 40);
  };

  const drawEnvelope = (ctx: CanvasRenderingContext2D) => {
    // Envelope base
    ctx.fillRect(120, 200, 272, 200);
    
    // Envelope flap
    ctx.beginPath();
    ctx.moveTo(120, 200);
    ctx.lineTo(256, 300);
    ctx.lineTo(392, 200);
    ctx.closePath();
    ctx.fill();
    
    // Inner detail
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, 220);
    ctx.lineTo(256, 320);
    ctx.lineTo(372, 220);
    ctx.stroke();
  };

  const drawMusicNote = (ctx: CanvasRenderingContext2D) => {
    // Note head
    ctx.beginPath();
    ctx.ellipse(200, 350, 30, 20, -Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Note stem
    ctx.fillRect(225, 180, 8, 170);
    
    // Flag
    ctx.beginPath();
    ctx.moveTo(233, 180);
    ctx.quadraticCurveTo(280, 160, 300, 200);
    ctx.quadraticCurveTo(280, 180, 233, 200);
    ctx.fill();
  };

  const drawCamera = (ctx: CanvasRenderingContext2D) => {
    // Camera body
    ctx.fillRect(150, 200, 212, 150);
    
    // Lens
    ctx.beginPath();
    ctx.arc(256, 275, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner lens
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(256, 275, 35, 0, 2 * Math.PI);
    ctx.fill();
    
    // Flash
    ctx.fillStyle = foregroundColor;
    ctx.fillRect(320, 210, 30, 20);
  };

  const drawLock = (ctx: CanvasRenderingContext2D) => {
    // Lock body
    ctx.fillRect(180, 280, 152, 120);
    
    // Lock shackle
    ctx.strokeStyle = foregroundColor;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(256, 240, 50, Math.PI, 0, false);
    ctx.stroke();
    
    // Keyhole
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(256, 330, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(251, 330, 10, 25);
  };

  const drawModernGeometric = (ctx: CanvasRenderingContext2D) => {
    // Modern layered design with rounded corners
    const cornerRadius = 20;
    
    // Layer 1
    drawRoundedRect(ctx, 150, 150, 212, 212, cornerRadius);
    ctx.fill();
    
    // Layer 2
    ctx.fillStyle = adjustBrightness(foregroundColor, 40);
    drawRoundedRect(ctx, 180, 180, 152, 152, cornerRadius);
    ctx.fill();
    
    // Layer 3
    ctx.fillStyle = backgroundColor;
    drawRoundedRect(ctx, 210, 210, 92, 92, cornerRadius);
    ctx.fill();
  };

  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
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

  const downloadAsPng = () => {
    if (!generatedImageUrl) {
      toast.error("Please generate an icon first");
      return;
    }

    const link = document.createElement('a');
    link.download = `${iconName || 'icon'}_${size}x${size}.png`;
    link.href = generatedImageUrl;
    link.click();
    
    toast.success("PNG downloaded!");
  };

  const downloadAsIco = async () => {
    if (!generatedImageUrl) {
      toast.error("Please generate an icon first");
      return;
    }

    try {
      // Create canvas and draw the image
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          resolve();
        };
        img.onerror = reject;
        img.src = generatedImageUrl;
      });

      // Get image data
      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      // Create ICO file structure
      const icoHeader = new ArrayBuffer(6);
      const icoHeaderView = new DataView(icoHeader);
      icoHeaderView.setUint16(0, 0, true); // Reserved
      icoHeaderView.setUint16(2, 1, true); // ICO type
      icoHeaderView.setUint16(4, 1, true); // Number of images

      // Create icon directory entry
      const iconDir = new ArrayBuffer(16);
      const iconDirView = new DataView(iconDir);
      iconDirView.setUint8(0, size > 255 ? 0 : size); // Width
      iconDirView.setUint8(1, size > 255 ? 0 : size); // Height
      iconDirView.setUint8(2, 0); // Color palette
      iconDirView.setUint8(3, 0); // Reserved
      iconDirView.setUint16(4, 1, true); // Color planes
      iconDirView.setUint16(6, 32, true); // Bits per pixel

      // Create BMP header for ICO (BITMAPINFOHEADER)
      const bmpHeaderSize = 40;
      const pixelDataSize = size * size * 4;
      const maskSize = Math.ceil(size / 8) * size;
      const imageSize = bmpHeaderSize + pixelDataSize + maskSize;

      iconDirView.setUint32(8, imageSize, true); // Image size
      iconDirView.setUint32(12, 6 + 16, true); // Offset to image data

      const bmpHeader = new ArrayBuffer(bmpHeaderSize);
      const bmpHeaderView = new DataView(bmpHeader);
      bmpHeaderView.setUint32(0, bmpHeaderSize, true); // Header size
      bmpHeaderView.setInt32(4, size, true); // Width
      bmpHeaderView.setInt32(8, size * 2, true); // Height (doubled for ICO)
      bmpHeaderView.setUint16(12, 1, true); // Color planes
      bmpHeaderView.setUint16(14, 32, true); // Bits per pixel
      bmpHeaderView.setUint32(16, 0, true); // Compression
      bmpHeaderView.setUint32(20, pixelDataSize + maskSize, true); // Image size
      bmpHeaderView.setInt32(24, 0, true); // X pixels per meter
      bmpHeaderView.setInt32(28, 0, true); // Y pixels per meter
      bmpHeaderView.setUint32(32, 0, true); // Colors used
      bmpHeaderView.setUint32(36, 0, true); // Important colors

      // Create pixel data (BGRA, bottom-up)
      const pixelData = new Uint8Array(pixelDataSize);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const srcIdx = ((size - 1 - y) * size + x) * 4;
          const dstIdx = (y * size + x) * 4;
          pixelData[dstIdx] = pixels[srcIdx + 2]; // B
          pixelData[dstIdx + 1] = pixels[srcIdx + 1]; // G
          pixelData[dstIdx + 2] = pixels[srcIdx]; // R
          pixelData[dstIdx + 3] = pixels[srcIdx + 3]; // A
        }
      }

      // Create AND mask (all zeros for full opacity)
      const andMask = new Uint8Array(maskSize);

      // Combine all parts
      const icoBlob = new Blob([icoHeader, iconDir, bmpHeader, pixelData, andMask], {
        type: 'image/x-icon'
      });

      const link = document.createElement('a');
      link.download = `${iconName || 'icon'}_${size}x${size}.ico`;
      link.href = URL.createObjectURL(icoBlob);
      link.click();
      URL.revokeObjectURL(link.href);
      
      toast.success("ICO downloaded!");
    } catch (error) {
      console.error('Error creating ICO:', error);
      toast.error("Failed to create ICO file");
    }
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
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <Collapsible open={showSuggestions} onOpenChange={setShowSuggestions}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto p-1">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <PromptSuggestions 
                    onSelectPrompt={(prompt) => {
                      setDescription(prompt);
                      setShowSuggestions(false);
                    }} 
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
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

          <div className="grid grid-cols-3 gap-3">
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
              onClick={downloadAsPng}
              disabled={!generatedImageUrl}
            >
              <Download className="mr-2 h-4 w-4" />
              PNG
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadAsIco}
              disabled={!generatedImageUrl}
            >
              <Download className="mr-2 h-4 w-4" />
              ICO
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