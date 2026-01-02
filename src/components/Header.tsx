import { Play } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-1">
          <Play className="w-7 h-7 text-primary fill-primary" />
          <h1 className="netflix-title text-4xl md:text-5xl">
            𝔣𝔩𝔦𝔠𝔨𝔰𝔳𝔞𝔲𝔩𝔱
          </h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          Abid's Personal Movie Collection
        </p>
      </div>
    </header>
  );
}
