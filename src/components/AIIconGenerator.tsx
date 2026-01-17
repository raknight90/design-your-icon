import { supabase } from "@/integrations/supabase/client";

export interface AIGenerationOptions {
  description: string;
  backgroundColor: string;
  foregroundColor: string;
  size: number;
}

export class AIIconGenerator {
  static async generateIcon(options: AIGenerationOptions): Promise<string | null> {
    try {
      console.log('Calling generate-icon edge function with:', options);
      
      const { data, error } = await supabase.functions.invoke('generate-icon', {
        body: options,
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to generate icon');
      }

      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Generated image URL received');
      return data.imageUrl;
    } catch (error) {
      console.error('AI Icon generation error:', error);
      throw error;
    }
  }

  // Fallback template generation (used when AI fails)
  static async generateWithTemplate(options: AIGenerationOptions): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Simple gradient background with rounded corners
      ctx.fillStyle = options.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, 512, 512, 60);
      ctx.fill();
      
      // Add a simple centered shape
      ctx.fillStyle = options.foregroundColor;
      ctx.beginPath();
      ctx.roundRect(156, 156, 200, 200, 30);
      ctx.fill();
      
      resolve(canvas.toDataURL('image/png'));
    });
  }
}
