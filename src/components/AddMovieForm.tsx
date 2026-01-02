import { useState, useRef } from 'react';
import { Plus, Star, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface AddMovieFormProps {
  onAdd: (movie: Omit<Movie, 'id' | 'createdAt'>) => void;
}

export function AddMovieForm({ onAdd }: AddMovieFormProps) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(5);
  const [watched, setWatched] = useState(false);
  const [posterUrl, setPosterUrl] = useState('');
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !genre) return;

    onAdd({
      title: title.trim(),
      genre,
      rating,
      watched,
      posterUrl: posterUrl || undefined,
    });

    setTitle('');
    setGenre('');
    setRating(5);
    setWatched(false);
    setPosterUrl('');
    setPosterPreview(null);
    setIsExpanded(false);

    toast({
      title: "Movie added!",
      description: `${title} has been added to your collection.`,
    });
  };

  return (
    <div className="rounded-lg bg-card border border-border/50 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-primary">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-wide">
            ADD NEW MOVIE
          </span>
        </div>
        <span className="text-muted-foreground text-sm">
          {isExpanded ? 'Close' : 'Expand'}
        </span>
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-5 animate-fade-in">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Left column - Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-muted-foreground text-xs uppercase tracking-wider">
                  Movie Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter movie title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="bg-secondary border-border/50 focus:border-primary h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-muted-foreground text-xs uppercase tracking-wider">
                  Genre
                </Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-secondary border-border/50 h-11">
                    <SelectValue placeholder="Select genre" />
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
                  Already Watched?
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

            {/* Right column - Image upload */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Poster Image (Optional)
              </Label>
              <div className="relative">
                {posterPreview ? (
                  <div className="relative aspect-[3/4] max-h-52 rounded-lg overflow-hidden border border-border/50">
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
                    className="w-full aspect-[3/4] max-h-52 rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 bg-secondary/30"
                  >
                    <ImagePlus className="w-10 h-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload poster
                    </span>
                    <span className="text-xs text-muted-foreground/60">
                      Max 2MB
                    </span>
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

          <Button type="submit" className="w-full h-12 text-base" disabled={!title.trim() || !genre}>
            <Plus className="w-5 h-5" />
            ADD TO COLLECTION
          </Button>
        </form>
      )}
    </div>
  );
}
