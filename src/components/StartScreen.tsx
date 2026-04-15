import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onStart: () => void;
};

export function StartScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="bg-black/80 border-green-500/30 w-full max-w-md text-center">
        <CardContent className="p-8 space-y-6">

          <h1 className="text-2xl font-bold tracking-widest text-green-400">
            NETWORK SCAPE ROOM
          </h1>

          <p className="text-green-300/60 text-sm">
            SYSTEM INITIALIZING...
          </p>

          <Button
            onClick={onStart}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold"
          >
            START
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}