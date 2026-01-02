import { useState, useRef } from 'react';
import { Star, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Movie, GENRES } from '@/types/movie';
import { toast } from '@/hooks/use-toast';

interface EditMovieDialogProps {
  movie: Movie;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => void;
}

export function EditMovieDialog({ movie, open, onOpenChange, onSave }: EditMovieDialogProps) {
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [rating, setRating] = useState(movie.rating);
  const [watched, setWatched] = useState(movie.watched);
  const [posterUrl, setPosterUrl] = useState(movie.posterUrl || '');
  const [posterPreview, setPosterPreview] = useState<string | null>(movie.posterUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please select an image under 2MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPosterPreview(result);
      setPosterUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const clearPoster = () => {
    setPosterUrl('');
    setPosterPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (!title.trim() || !genre) return;

    onSave(movie.id, {
      title: title.trim(),
      genre,
      rating,
      watched,
      posterUrl: posterUrl || undefined,
    });

    onOpenChange(false);
    toast({
      title: "Movie updated!",
      description: `${title} has been updated.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-wide">EDIT MOVIE</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Movie Title
                </Label>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="bg-secondary border-border/50 focus:border-primary h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Genre
                </Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-secondary border-border/50 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map(g => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Rating: <span className="text-primary font-bold text-sm">{rating}/10</span>
                </Label>
                <div className="flex items-center gap-3 pt-1">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Watched?
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-foreground">
                    {watched ? 'Yes' : 'No'}
                  </span>
                  <Switch
                    checked={watched}
                    onCheckedChange={setWatched}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Poster Image
              </Label>
              <div className="relative">
                {posterPreview ? (
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border/50">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearPoster}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[2/3] rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 bg-secondary/30"
                  >
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload poster</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full h-11" disabled={!title.trim() || !genre}>
            SAVE CHANGES
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
