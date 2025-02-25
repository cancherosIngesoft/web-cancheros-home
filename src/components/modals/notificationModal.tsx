"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Shield } from "lucide-react";

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (scores: number[]) => void;
  idReservation: string;
}

export default function ScoreModal({
  isOpen,
  onClose,
  onSubmit,
  idReservation,
}: ScoreModalProps) {
  const [scoreA, setScoreA] = useState<string>("");
  const [scoreB, setScoreB] = useState<string>("");

  const handleSubmit = () => {
    // Validar que ambos scores sean números
    if (!scoreA || !scoreB || isNaN(Number(scoreA)) || isNaN(Number(scoreB))) {
      return;
    }

    onSubmit([Number(scoreA), Number(scoreB)]);
    setScoreA("");
    setScoreB("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Ingresa el Marcador
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-12 w-12 text-red-600" />
            <p className="font-semibold text-red-600">EQUIPO A</p>
            <Input
              type="number"
              min="0"
              placeholder="Marcador"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
              className="text-center w-24"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-12 w-12 text-green-600" />
            <p className="font-semibold text-green-600">EQUIPO B</p>
            <Input
              type="number"
              min="0"
              placeholder="Marcador"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
              className="text-center w-24"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Consolidar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
