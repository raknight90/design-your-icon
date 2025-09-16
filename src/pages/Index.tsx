import { useState } from "react";
import { IconMaker } from "@/components/IconMaker";
import { IconLibrary } from "@/components/IconLibrary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Library, Sparkles } from "lucide-react";

export interface IconData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
  foregroundColor: string;
  size: number;
  createdAt: string;
}

const Index = () => {
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("create");

  const handleLoadIcon = (icon: IconData) => {
    setSelectedIcon(icon);
    setActiveTab("create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI Icon Maker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning app icons with AI. Describe your vision, customize colors, and build your icon library.
          </p>
        </header>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <IconMaker 
              initialIcon={selectedIcon}
              onIconCreated={() => setSelectedIcon(null)}
            />
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <IconLibrary onLoadIcon={handleLoadIcon} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;