import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Edit, Trash2, Download, Library } from "lucide-react";
import { toast } from "sonner";
import { IconData } from "@/pages/Index";

interface IconLibraryProps {
  onLoadIcon: (icon: IconData) => void;
}

export const IconLibrary = ({ onLoadIcon }: IconLibraryProps) => {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([]);

  useEffect(() => {
    loadIcons();
  }, []);

  useEffect(() => {
    const filtered = icons.filter(icon =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIcons(filtered);
  }, [icons, searchQuery]);

  const loadIcons = () => {
    const savedIcons = JSON.parse(localStorage.getItem('iconLibrary') || '[]');
    setIcons(savedIcons);
  };

  const deleteIcon = (id: string) => {
    const updatedIcons = icons.filter(icon => icon.id !== id);
    localStorage.setItem('iconLibrary', JSON.stringify(updatedIcons));
    setIcons(updatedIcons);
    toast.success("Icon deleted from library");
  };

  const downloadIcon = (icon: IconData) => {
    const link = document.createElement('a');
    link.download = `${icon.name}_${icon.size}x${icon.size}.png`;
    link.href = icon.imageUrl;
    link.click();
    toast.success("Icon downloaded!");
  };

  const clearLibrary = () => {
    localStorage.removeItem('iconLibrary');
    setIcons([]);
    toast.success("Library cleared");
  };

  if (icons.length === 0) {
    return (
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Library className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your Library is Empty</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Create and save your first icon to start building your library. All your saved icons will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-primary" />
              Icon Library ({icons.length})
            </CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Library</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all icons from your library. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearLibrary}>Clear All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Icons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIcons.map((icon) => (
          <Card 
            key={icon.id} 
            className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 group"
          >
            <CardContent className="p-4">
              <div className="aspect-square mb-4 relative">
                <img
                  src={icon.imageUrl}
                  alt={icon.name}
                  className="w-full h-full object-cover rounded-lg border-2 border-border"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold truncate">{icon.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {icon.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">{icon.size}×{icon.size}</Badge>
                  <div 
                    className="w-4 h-4 rounded border border-border"
                    style={{ backgroundColor: icon.backgroundColor }}
                  />
                  <div 
                    className="w-4 h-4 rounded border border-border"
                    style={{ backgroundColor: icon.foregroundColor }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onLoadIcon(icon)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadIcon(icon)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Icon</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{icon.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteIcon(icon.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIcons.length === 0 && searchQuery && (
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-elegant">
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No icons found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or create a new icon.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};