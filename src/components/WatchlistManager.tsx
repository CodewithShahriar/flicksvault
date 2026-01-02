import { useState } from 'react';
import { Plus, Trash2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Watchlist } from '@/types/watchlist';
import { toast } from '@/hooks/use-toast';

interface WatchlistManagerProps {
  watchlists: Watchlist[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export function WatchlistManager({ watchlists, onAdd, onDelete }: WatchlistManagerProps) {
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    if (watchlists.some(w => w.name.toLowerCase() === newName.trim().toLowerCase())) {
      toast({
        title: "Watchlist exists",
        description: "A watchlist with this name already exists.",
        variant: "destructive",
      });
      return;
    }
    onAdd(newName.trim());
    setNewName('');
    setIsAdding(false);
    toast({
      title: "Watchlist created!",
      description: `"${newName.trim()}" has been added.`,
    });
  };

  const handleDelete = (watchlist: Watchlist) => {
    onDelete(watchlist.id);
    toast({
      title: "Watchlist deleted",
      description: `"${watchlist.name}" has been removed.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold tracking-wide text-foreground">WATCHLISTS</h3>
        </div>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="text-muted-foreground hover:text-primary"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2">
          <Input
            placeholder="Watchlist name..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            className="bg-secondary border-border/50 focus:border-primary h-9"
            autoFocus
          />
          <Button size="sm" onClick={handleAdd} disabled={!newName.trim()}>
            Add
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setIsAdding(false); setNewName(''); }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {watchlists.map(watchlist => (
          <div
            key={watchlist.id}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border/30 hover:border-primary/50 transition-colors"
          >
            <span className="text-sm font-medium text-foreground">{watchlist.name}</span>
            <button
              onClick={() => handleDelete(watchlist)}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-destructive/20 transition-all"
            >
              <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
