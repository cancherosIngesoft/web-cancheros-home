"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: { stars: number; comment: string }) => void;
  id_establecimiento: number;
}

export default function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  id_establecimiento,
}: RatingModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleSubmit = () => {
    if (rating === 0) return; // Asegurarse de que haya una calificación
    onSubmit({ stars: rating, comment });
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Califica tu experiencia
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Estrellas */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-green-500 text-green-500"
                      : "fill-gray-200 text-gray-200"
                  }`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {rating} de 5 estrellas
            </span>
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-base font-semibold">Comentario</label>
              <span className="text-sm text-gray-500 italic">Opcional*</span>
            </div>
            <Textarea
              placeholder="Cancha en pésimo estado"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none h-24"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-green-500 text-white hover:bg-green-600"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
