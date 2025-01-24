"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { type bussinessInfo, getBussinessFilters } from "@/actions/book_field/field_actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z
  .object({
    location: z.string().min(1, "Localidad es requerida"),
    fieldType: z.string().min(1, "Tipo de cancha es requerido"),
    minPrice: z.number().min(0, "El precio mínimo debe ser mayor o igual a 0"),
    maxPrice: z.number().min(0, "El precio máximo debe ser mayor o igual a 0"),
  })
  .refine((data) => data.minPrice < data.maxPrice, {
    message: "El precio mínimo debe ser menor que el precio máximo",
    path: ["minPrice"],
  })

type FormValues = z.infer<typeof formSchema>

interface SearchFormProps {
  onSearchResults: (results: bussinessInfo[]) => void
}

export function FiltersForm({ onSearchResults }: SearchFormProps) {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      fieldType: "",
      minPrice: 0,
      maxPrice: 0,
    },
  })

  const searchMutation = useMutation({
    mutationFn: (variables: FormValues) =>
      getBussinessFilters(variables.location, variables.fieldType, variables.minPrice, variables.maxPrice),
    onSuccess: (data: bussinessInfo[]) => {
      onSearchResults(data)
      toast({
        title: "Búsqueda exitosa",
        description: "Se han aplicado los filtros correctamente.",
        variant: "default",
      })
    },
    onError: (error: unknown) => {
      console.error("Error en getBussinessFilters:", error)
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Error al buscar los negocios",
          variant: "destructive",
        })
      }
    },
  })

  const onSubmit = async (data: FormValues) => {
    searchMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row justify-start gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Localidad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una localidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="usaquen">Usaquén</SelectItem>
                      <SelectItem value="chapinero">Chapinero</SelectItem>
                      <SelectItem value="santafe">Santa Fe</SelectItem>
                      <SelectItem value="sancristobal">San Cristóbal</SelectItem>
                      <SelectItem value="usme">Usme</SelectItem>
                      <SelectItem value="tunjuelito">Tunjuelito</SelectItem>
                      <SelectItem value="bosa">Bosa</SelectItem>
                      <SelectItem value="kennedy">Kennedy</SelectItem>
                      <SelectItem value="fontibon">Fontibón</SelectItem>
                      <SelectItem value="engativa">Engativá</SelectItem>
                      <SelectItem value="suba">Suba</SelectItem>
                      <SelectItem value="barriosunidos">Barrios Unidos</SelectItem>
                      <SelectItem value="teusaquillo">Teusaquillo</SelectItem>
                      <SelectItem value="martires">Los Mártires</SelectItem>
                      <SelectItem value="antonionarino">Antonio Nariño</SelectItem>
                      <SelectItem value="puente">Puente Aranda</SelectItem>
                      <SelectItem value="candelaria">La Candelaria</SelectItem>
                      <SelectItem value="rafaeluribe">Rafael Uribe Uribe</SelectItem>
                      <SelectItem value="ciudadbolivar">Ciudad Bolívar</SelectItem>
                      <SelectItem value="sumapaz">Sumapaz</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-1/2">
          <FormField
            control={form.control}
            name="fieldType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Tipo de cancha</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de cancha" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="futbol5">Fútbol 5</SelectItem>
                    <SelectItem value="futbol7">Fútbol 7</SelectItem>
                    <SelectItem value="futbol11">Fútbol 11</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 pt-8">
          <h2 className="font-semibold text-xl text-primary-40 ">
            Rango de precio <span className="text-gray-400 text-sm font-normal ">(por hora)</span>
          </h2>
          <div className="flex flex-wrap items-start space-x-2">
            <div className="flex-1 min-w-[120px]">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Minimo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Mínimo"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <span className="mt-8">-</span>

            <div className="flex-1 min-w-[120px]">
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Maximo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Máximo"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-1/2 font-bold" disabled={searchMutation.isPending}>
          {searchMutation.isPending ? "Buscando..." : "Buscar canchas"}
        </Button>
      </form>
    </Form>
  )
}

