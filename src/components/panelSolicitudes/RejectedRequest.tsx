"use client";

import {
  fetchRequestsOwnersRejected,
  RequestsOwners,
} from "@/actions/dashboardRequest";
import { RequestCard } from "./RequestCard";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function RejectedRequests() {
  const { toast } = useToast();
  const {
    data: rejectedRequests,
    isLoading: isLoadingRejected,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["rejectedRequests"],
    queryFn: fetchRequestsOwnersRejected,
    staleTime: Infinity, // This will prevent automatic refetching
    refetchOnWindowFocus: false, // This will prevent refetching when the window gains focus
  });
  useEffect(() => {
    if (isError === true) {
      toast({
        title: "Error",
        description:
          "Hubo un problema al cargar las solicitudes rechazadas. Por favor, intente nuevamente.",
        variant: "destructive",
      });
    }
  }, [isError]);

  if (isLoadingRejected) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary-35" />
      </div>
    );
  }

  if (!rejectedRequests || rejectedRequests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay solicitudes rechazadas
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rejectedRequests.map((request) => (
        <RequestCard key={request.id} request={request} isPending={false} />
      ))}
      {isFetching && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary-35" />
        </div>
      )}
    </div>
  );
}
