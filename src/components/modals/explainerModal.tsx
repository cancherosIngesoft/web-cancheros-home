"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "¿Qué es esto?",
    description:
      "Las comisiones nos permiten garantizar el mejor servicio para ti y tus clientes.",
    image: "/icons/football_team.svg",
  },
  {
    title: "¿Cómo se calcula?",
    description:
      "Cobramos un 5% por cada reserva realizada + 900 pesos y un 3% del pago final que nos cobra MercadoPago por la transacción.",
    image: "/icons/soccer_stadium.svg",
  },
  {
    title: "¿Tienes alguna duda?",
    description: (
      <span>
        Queremos ser lo más transparentes contigo, así que si tienes dudas
        puedes{" "}
        <Link
          href="/contact"
          className="text-green-700 hover:underline font-medium"
        >
          contactarnos aquí
        </Link>
        .
      </span>
    ),
    image: "/icons/liberty.svg",
  },
];

export default function CommissionExplainer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setCurrentStep(0);
  };

  // Reset step when modal opens
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {steps[currentStep].title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground"
            ></Button>
          </div>
        </DialogHeader>
        <div className="relative overflow-hidden py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center w-full h-[200px] rounded-lg">
              <Image
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                width={150}
                height={150}
                className="object-contain rounded-lg self-center"
              />
            </div>
            <DialogDescription className="text-center text-base">
              {steps[currentStep].description}
            </DialogDescription>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-green-700 hover:text-green-800 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep ? "bg-green-700" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <Button
            variant={currentStep === steps.length - 1 ? "default" : "outline"}
            onClick={
              currentStep === steps.length - 1 ? handleClose : handleNext
            }
            className={
              currentStep === steps.length - 1
                ? "bg-green-700 hover:bg-green-800 text-white"
                : "text-green-700 hover:text-green-800 hover:bg-green-50"
            }
          >
            {currentStep === steps.length - 1 ? (
              "Entendido"
            ) : (
              <>
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
