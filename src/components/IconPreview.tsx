import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface IconPreviewProps {
  imageUrl?: string | null;
  backgroundColor: string;
  size: number;
  className?: string;
}

export const IconPreview = forwardRef<HTMLCanvasElement, IconPreviewProps>(
  ({ imageUrl, backgroundColor, size, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);

      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 400, 400);

      // Draw generated image if available
      if (imageUrl) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 400, 400);
        };
        img.src = imageUrl;
      } else {
        // Show placeholder
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '24px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Generate an icon to see preview', 200, 200);
      }
    }, [imageUrl, backgroundColor]);

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <canvas
            ref={(node) => {
              canvasRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={cn(
              "border-2 border-border rounded-2xl shadow-elegant max-w-full h-auto",
              className
            )}
            style={{ 
              background: `repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--muted-foreground) / 0.2) 0% 50%) 50% / 20px 20px`
            }}
          />
          
          {/* Size indicator */}
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-mono">
            {size}×{size}
          </div>
        </div>

        {/* Preview sizes */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="text-xs text-muted-foreground">Preview sizes:</div>
          {[16, 32, 48, 64].map((previewSize) => (
            <div key={previewSize} className="flex flex-col items-center gap-1">
              <div
                className="border border-border rounded-md overflow-hidden bg-checkerboard"
                style={{ 
                  width: `${previewSize}px`, 
                  height: `${previewSize}px`,
                  backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundColor: imageUrl ? 'transparent' : backgroundColor
                }}
              />
              <span className="text-xs text-muted-foreground">{previewSize}px</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

IconPreview.displayName = "IconPreview";