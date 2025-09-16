import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    category: "Business",
    prompts: [
      "Modern briefcase with clean lines",
      "Minimalist chart with upward arrow",
      "Simple handshake silhouette",
      "Abstract dollar sign in circle"
    ]
  },
  {
    category: "Technology",
    prompts: [
      "Stylized smartphone with rounded corners",
      "Clean wifi signal icon",
      "Modern cloud with data points",
      "Simple rocket ship pointing up"
    ]
  },
  {
    category: "Social",
    prompts: [
      "Two overlapping chat bubbles",
      "Stylized group of people",
      "Heart with rounded edges",
      "Simple thumbs up gesture"
    ]
  },
  {
    category: "Creative",
    prompts: [
      "Artist palette with brush",
      "Musical note with flowing lines",
      "Camera lens with aperture",
      "Pen and paper illustration"
    ]
  },
  {
    category: "Utility",
    prompts: [
      "Minimalist gear wheel",
      "Simple magnifying glass",
      "Clean calendar grid",
      "Modern lock with keyhole"
    ]
  }
];

export const PromptSuggestions = ({ onSelectPrompt }: PromptSuggestionsProps) => {
  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Lightbulb className="h-4 w-4 text-accent" />
          Prompt Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {EXAMPLE_PROMPTS.map((category) => (
            <div key={category.category} className="space-y-2">
              <Badge variant="secondary" className="text-xs">
                {category.category}
              </Badge>
              <div className="grid grid-cols-1 gap-2">
                {category.prompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-2 text-xs text-left whitespace-normal"
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Be specific about shapes, style, and elements. 
            Avoid complex scenes - simple, recognizable symbols work best for app icons.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};