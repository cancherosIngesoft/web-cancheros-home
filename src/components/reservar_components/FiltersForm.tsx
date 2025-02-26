"use client"

import { useEffect, useState } from "react"
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
import { type bussinessInfo, getBussinessFilters } from "@/actions/book_field/booking_actions"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import { localidades } from "@/lib/localidades"

const formSchema = z
  .object({
    location: z.string(),
    fieldType: z.string(),
    minPrice: z.number().min(0, "El precio mínimo debe ser mayor o igual a 0").optional(),
    maxPrice: z.number().min(0, "El precio máximo debe ser mayor o igual a 0").optional(),
  })
  .refine((data) => {

    if (data.minPrice !== undefined && data.maxPrice !== undefined) {
      return data.minPrice < data.maxPrice;
    }
    return true;
  }, {
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
      minPrice: undefined,
      maxPrice: undefined,
    },
  })

  const searchMutation = useMutation({
    mutationFn: (variables: FormValues) =>
      getBussinessFilters(variables.location, variables.fieldType, variables.minPrice, variables.maxPrice),
    onSuccess: (data: bussinessInfo[]) => {
      onSearchResults(data)
      if (data.length === 0) {
        toast({
          title: "No se encontraron resultados",
          description: "No se encontraron negocios que cumplan con los filtros seleccionados.",
          variant: "alert",
        })
      } else {
        toast({
          title: "Búsqueda exitosa",
          description: "Se han aplicado los filtros correctamente.",
          variant: "default",
        })
      }

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
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="relative w-full h-full p-4"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row justify-start gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg">Localidad</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={form.watch("location")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una localidad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {localidades.map((localidad) => (
                            <SelectItem className={`hover:bg-primary-90 hover:cursor-pointer ${field.value === localidad.value ? "bg-primary-90" : ""} `} key={localidad.label} value={localidad.value}>
                              {localidad.label}
                            </SelectItem>
                          ))}

                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className=" w-full md:w-1/2">
              <FormField
                control={form.control}
                name="fieldType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">Tipo de cancha</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={form.watch("fieldType")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tipo de cancha" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className={`hover:bg-primary-90 hover:cursor-pointer ${field.value === "5" ? "bg-primary-90" : ""} `} value="5">Fútbol 5</SelectItem>
                        <SelectItem className={`hover:bg-primary-90 hover:cursor-pointer ${field.value === "7" ? "bg-primary-90" : ""} `} value="7">Fútbol 7</SelectItem>
                        <SelectItem className={`hover:bg-primary-90 hover:cursor-pointer ${field.value === "11" ? "bg-primary-90" : ""} `} value="11">Fútbol 11</SelectItem>
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
              <div className="flex flex-wrap flex-col md:flex-row items-start gap-2">
                <div className="flex-1 ">
                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field: { onChange, onBlur, ref, value } }) => {
                      const [displayValue, setDisplayValue] = useState(value ?? '');

                      // Sincroniza el estado si el valor cambia desde afuera
                      useEffect(() => {
                        if (value === undefined || value === null) {
                          setDisplayValue('');
                        }
                      }, [value]);

                      const handleBlur = () => {
                        // Convierte el valor a número y formatea como moneda
                        const numericValue = Number.parseInt(String(displayValue).replace(/[^\d]/g, ''), 10);
                        if (!isNaN(numericValue)) {
                          const formatted = new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            maximumFractionDigits: 0,
                          }).format(numericValue);
                          setDisplayValue(formatted);
                        }
                        onBlur();
                      };

                      const handleFocus = () => {
                        // Remueve el formato para facilitar la edición
                        const numericValue = String(displayValue).replace(/[^\d]/g, '');
                        setDisplayValue(numericValue);
                      };

                      return (
                        <FormItem>
                          <FormLabel className="font-semibold text-lg">Mínimo</FormLabel>
                          <FormControl>
                            <Input
                              type="text" // Cambiamos a "text" para poder mostrar el formato
                              placeholder="Mínimo"
                              value={displayValue}
                              onChange={(e) => {
                                // Permite solo dígitos
                                const inputVal = e.target.value.replace(/[^\d]/g, '');
                                setDisplayValue(inputVal);
                                onChange(inputVal === "" ? undefined : Number.parseInt(inputVal, 10));
                              }}
                              onBlur={handleBlur}
                              onFocus={handleFocus}
                              ref={ref}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <span className="mt-8 hidden md:block">-</span>

                <div className="flex-1 min-w-[120px]">
                <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field: { onChange, onBlur, ref, value } }) => {
                      const [displayValue, setDisplayValue] = useState(value ?? '');

                      // Sincroniza el estado si el valor cambia desde afuera
                      useEffect(() => {
                        if (value === undefined || value === null) {
                          setDisplayValue('');
                        }
                      }, [value]);

                      const handleBlur = () => {
                        // Convierte el valor a número y formatea como moneda
                        const numericValue = Number.parseInt(String(displayValue).replace(/[^\d]/g, ''), 10);
                        if (!isNaN(numericValue)) {
                          const formatted = new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            maximumFractionDigits: 0,
                          }).format(numericValue);
                          setDisplayValue(formatted);
                        }
                        onBlur();
                      };

                      const handleFocus = () => {
                        // Remueve el formato para facilitar la edición
                        const numericValue = String(displayValue).replace(/[^\d]/g, '');
                        setDisplayValue(numericValue);
                      };

                      return (
                        <FormItem>
                          <FormLabel className="font-semibold text-lg">Maximo</FormLabel>
                          <FormControl>
                            <Input
                              type="text" // Cambiamos a "text" para poder mostrar el formato
                              placeholder="Maximo"
                              value={displayValue}
                              onChange={(e) => {
                                // Permite solo dígitos
                                const inputVal = e.target.value.replace(/[^\d]/g, '');
                                setDisplayValue(inputVal);
                                onChange(inputVal === "" ? undefined : Number.parseInt(inputVal, 10));
                              }}
                              onBlur={handleBlur}
                              onFocus={handleFocus}
                              ref={ref}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row item-start md:items-center gap-2">
              <Button type="submit" className="md:w-1/2 font-bold" disabled={searchMutation.isPending}>
                {searchMutation.isPending ? "Buscando..." : "Buscar canchas"}
              </Button>
              <Button type="reset" className="md:w-1/2  border-primary border-2 bg-transparent text-black" onClick={() => { form.reset({ location: "", fieldType: "", minPrice: undefined, maxPrice: undefined }) }}>
                Limpiar filtros
              </Button>
            </div>

          </form>
        </Form>
      </motion.div>
    </AnimatePresence>

  )
}

