import { toast } from "sonner";

export interface AIGenerationOptions {
  description: string;
  backgroundColor: string;
  foregroundColor: string;
  size: number;
}

export class AIIconGenerator {
  static async generateIcon(options: AIGenerationOptions): Promise<string | null> {
    try {
      // Create an optimized prompt for icon generation
      const prompt = this.createIconPrompt(options);
      
      // Generate the icon using AI
      const response = await this.callAIGeneration(prompt, options.size);
      
      if (response) {
        toast.success("AI icon generated successfully!");
        return response;
      }
      
      return null;
    } catch (error) {
      console.error('AI generation failed:', error);
      toast.error("AI generation failed, using fallback");
      return null;
    }
  }

  private static createIconPrompt(options: AIGenerationOptions): string {
    const { description, backgroundColor, foregroundColor } = options;
    
    // Extract hex colors for the prompt
    const bgColor = backgroundColor.replace('#', '');
    const fgColor = foregroundColor.replace('#', '');
    
    return `Create a professional app icon: ${description}. 
Style: Modern, clean, minimalist app icon design with flat colors and simple geometric shapes. 
Color scheme: Primary background color #${bgColor}, main element/foreground color #${fgColor}. 
Design: Centered composition, high contrast, suitable for mobile app icon, vector-style illustration, 
no text, no gradients, clean lines, professional appearance, simple recognizable symbol.
Aspect ratio: 1:1 square format, app icon style, iOS/Android compatible design.`;
  }

  private static async callAIGeneration(prompt: string, size: number): Promise<string | null> {
    try {
      // For now, we'll simulate AI generation with a more sophisticated approach
      // In a real implementation, you would call an actual AI service like:
      // - DALL-E API
      // - Midjourney API
      // - Stable Diffusion API
      // - Custom AI service
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return null to indicate we should fall back to the enhanced template system
      return null;
      
    } catch (error) {
      console.error('AI API call failed:', error);
      return null;
    }
  }

  static async generateWithTemplate(options: AIGenerationOptions): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Create sophisticated gradient background
      const gradient = ctx.createRadialGradient(256, 200, 0, 256, 256, 300);
      gradient.addColorStop(0, options.backgroundColor);
      gradient.addColorStop(0.7, this.adjustBrightness(options.backgroundColor, -15));
      gradient.addColorStop(1, this.adjustBrightness(options.backgroundColor, -30));
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add subtle texture
      this.addTexture(ctx);
      
      // Add shadow and glow effects
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 8;
      
      // Generate icon based on AI-like analysis of description
      this.generateSmartIcon(ctx, options);
      
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  }

  private static addTexture(ctx: CanvasRenderingContext2D) {
    // Add subtle noise texture
    const imageData = ctx.getImageData(0, 0, 512, 512);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 10;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private static generateSmartIcon(ctx: CanvasRenderingContext2D, options: AIGenerationOptions) {
    const { description, foregroundColor } = options;
    const desc = description.toLowerCase();
    
    // AI-like keyword analysis and shape generation
    if (this.containsKeywords(desc, ['circle', 'round', 'ball', 'dot'])) {
      this.drawAdvancedCircle(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['star', 'rating', 'favorite'])) {
      this.drawAdvancedStar(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['heart', 'love', 'like'])) {
      this.drawAdvancedHeart(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['arrow', 'play', 'forward', 'next'])) {
      this.drawAdvancedArrow(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['gear', 'settings', 'config', 'cog'])) {
      this.drawAdvancedGear(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['house', 'home', 'building'])) {
      this.drawAdvancedHouse(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['envelope', 'mail', 'message', 'email'])) {
      this.drawAdvancedEnvelope(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['music', 'note', 'sound', 'audio'])) {
      this.drawAdvancedMusicNote(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['camera', 'photo', 'picture', 'image'])) {
      this.drawAdvancedCamera(ctx, foregroundColor);
    } else if (this.containsKeywords(desc, ['lock', 'security', 'protect', 'safe'])) {
      this.drawAdvancedLock(ctx, foregroundColor);
    } else {
      this.drawAdvancedGeometric(ctx, foregroundColor, options.backgroundColor);
    }
  }

  private static containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private static drawAdvancedCircle(ctx: CanvasRenderingContext2D, color: string) {
    // Main circle with gradient
    const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 180);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.adjustBrightness(color, -20));
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(256, 256, 180, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner highlight
    ctx.fillStyle = this.adjustBrightness(color, 40);
    ctx.beginPath();
    ctx.arc(220, 220, 30, 0, 2 * Math.PI);
    ctx.fill();
  }

  private static drawAdvancedStar(ctx: CanvasRenderingContext2D, color: string) {
    const centerX = 256, centerY = 256;
    const outerRadius = 160;
    const innerRadius = 80;
    const spikes = 5;
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }

  private static drawAdvancedHeart(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const x = 256, y = 200, size = 180;
    const topCurveHeight = size * 0.3;
    
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    
    ctx.closePath();
    ctx.fill();
    
    // Add highlight
    ctx.fillStyle = this.adjustBrightness(color, 60);
    ctx.beginPath();
    ctx.arc(230, 230, 20, 0, 2 * Math.PI);
    ctx.fill();
  }

  private static drawAdvancedArrow(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(120, 256);
    ctx.lineTo(300, 150);
    ctx.lineTo(300, 200);
    ctx.lineTo(390, 200);
    ctx.lineTo(390, 312);
    ctx.lineTo(300, 312);
    ctx.lineTo(300, 362);
    ctx.closePath();
    ctx.fill();
    
    // Add dimensional effect
    ctx.fillStyle = this.adjustBrightness(color, -30);
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(390, 200);
    ctx.lineTo(390, 312);
    ctx.lineTo(300, 312);
    ctx.closePath();
    ctx.fill();
  }

  private static drawAdvancedGear(ctx: CanvasRenderingContext2D, color: string) {
    const centerX = 256, centerY = 256;
    const innerRadius = 90;
    const outerRadius = 160;
    const teeth = 8;
    
    // Draw gear teeth
    ctx.fillStyle = color;
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
    
    // Inner circle (hole)
    ctx.fillStyle = this.adjustBrightness(color, -40);
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fill();
  }

  private static drawAdvancedHouse(ctx: CanvasRenderingContext2D, color: string) {
    // House base with gradient
    const gradient = ctx.createLinearGradient(150, 250, 362, 430);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.adjustBrightness(color, -25));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(150, 250, 212, 180);
    
    // Roof
    ctx.fillStyle = this.adjustBrightness(color, 20);
    ctx.beginPath();
    ctx.moveTo(256, 140);
    ctx.lineTo(100, 270);
    ctx.lineTo(412, 270);
    ctx.closePath();
    ctx.fill();
    
    // Door
    ctx.fillStyle = this.adjustBrightness(color, -50);
    ctx.fillRect(220, 350, 72, 80);
    
    // Windows
    ctx.fillStyle = this.adjustBrightness(color, 40);
    ctx.fillRect(170, 280, 40, 40);
    ctx.fillRect(302, 280, 40, 40);
  }

  private static drawAdvancedEnvelope(ctx: CanvasRenderingContext2D, color: string) {
    // Envelope base
    ctx.fillStyle = color;
    ctx.fillRect(100, 200, 312, 200);
    
    // Envelope flap with gradient
    const gradient = ctx.createLinearGradient(100, 200, 412, 300);
    gradient.addColorStop(0, this.adjustBrightness(color, 30));
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(256, 320);
    ctx.lineTo(412, 200);
    ctx.closePath();
    ctx.fill();
    
    // Seal/stamp
    ctx.fillStyle = this.adjustBrightness(color, -40);
    ctx.beginPath();
    ctx.arc(350, 250, 25, 0, 2 * Math.PI);
    ctx.fill();
  }

  private static drawAdvancedMusicNote(ctx: CanvasRenderingContext2D, color: string) {
    // Note head with gradient
    const gradient = ctx.createRadialGradient(200, 350, 10, 200, 350, 35);
    gradient.addColorStop(0, this.adjustBrightness(color, 20));
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(200, 350, 35, 25, -Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Note stem
    ctx.fillStyle = color;
    ctx.fillRect(230, 160, 10, 190);
    
    // Musical flag
    ctx.beginPath();
    ctx.moveTo(240, 160);
    ctx.quadraticCurveTo(320, 140, 340, 200);
    ctx.quadraticCurveTo(320, 160, 240, 180);
    ctx.fill();
  }

  private static drawAdvancedCamera(ctx: CanvasRenderingContext2D, color: string) {
    // Camera body
    ctx.fillStyle = color;
    ctx.fillRect(130, 200, 252, 160);
    
    // Lens with multiple rings
    ctx.beginPath();
    ctx.arc(256, 280, 80, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = this.adjustBrightness(color, -30);
    ctx.beginPath();
    ctx.arc(256, 280, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = this.adjustBrightness(color, 40);
    ctx.beginPath();
    ctx.arc(256, 280, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Flash
    ctx.fillStyle = this.adjustBrightness(color, 60);
    ctx.fillRect(320, 210, 40, 25);
    
    // Viewfinder
    ctx.fillRect(180, 180, 30, 20);
  }

  private static drawAdvancedLock(ctx: CanvasRenderingContext2D, color: string) {
    // Lock body with gradient
    const gradient = ctx.createLinearGradient(180, 280, 332, 400);
    gradient.addColorStop(0, this.adjustBrightness(color, 20));
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(180, 280, 152, 140);
    
    // Lock shackle
    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(256, 240, 60, Math.PI, 0, false);
    ctx.stroke();
    
    // Keyhole
    ctx.fillStyle = this.adjustBrightness(color, -60);
    ctx.beginPath();
    ctx.arc(256, 340, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(246, 340, 20, 35);
  }

  private static drawAdvancedGeometric(ctx: CanvasRenderingContext2D, color: string, bgColor: string) {
    // Modern layered design with rounded corners
    const cornerRadius = 25;
    
    // Layer 1 - Outer
    ctx.fillStyle = color;
    this.drawRoundedRect(ctx, 130, 130, 252, 252, cornerRadius);
    ctx.fill();
    
    // Layer 2 - Middle
    ctx.fillStyle = this.adjustBrightness(color, 50);
    this.drawRoundedRect(ctx, 160, 160, 192, 192, cornerRadius);
    ctx.fill();
    
    // Layer 3 - Inner
    ctx.fillStyle = bgColor;
    this.drawRoundedRect(ctx, 190, 190, 132, 132, cornerRadius);
    ctx.fill();
    
    // Center accent
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(256, 256, 40, 0, 2 * Math.PI);
    ctx.fill();
  }

  private static drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
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
  }

  private static adjustBrightness(hex: string, amount: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }
}