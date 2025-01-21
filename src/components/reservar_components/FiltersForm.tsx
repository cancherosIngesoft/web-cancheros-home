"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { bussinessInfo, getBussinessFilters } from "@/actions/book_field/field_actions"


interface SearchFormProps {
  onSearchResults: (results: bussinessInfo[]) => void
}

export function FiltersForm({ onSearchResults }: SearchFormProps) {
  const form = useForm({
    defaultValues: {
      location: "",
      date: new Date(),
      fieldType: "futbol5",
      minPrice: 100000,
      maxPrice: 500000,
    },
  })

  const searchMutation = useMutation({
    mutationFn: (variables: {
      location: string;
      date: string;
      fieldType: string;
      minPrice: number;
      maxPrice: number;
    }) => getBussinessFilters(
      variables.location,
      variables.date,
      variables.fieldType,
      variables.minPrice,
      variables.maxPrice
    ),
    onSuccess: (data: bussinessInfo[]) => {
      onSearchResults(data)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al buscar los negocios")
      }
    },
  })

  const onSubmit = async () => {
    const values = form.getValues()
    searchMutation.mutate({
      location: values.location,
      date: format(values.date, "yyyy-MM-dd"),
      fieldType: values.fieldType,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
    })
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
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
              </FormItem>
            )}
          />
        </div>


        <div className="space-y-2 pt-8">
          <FormLabel className="font-semibold text-xl text-primary-40 ">Rango de precio <span className="text-gray-400 text-sm font-normal ">(por hora)</span></FormLabel>
          <div className="flex items-center space-x-2">
            <div>
              <span className="font-semibold text-sm">Minimo</span>
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Mínimo"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <span className="mt-6">-</span>
            <div>
              <span className="font-semibold text-sm">Maximo</span>
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Máximo"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

          </div>
        </div>

        <Button
          type="submit"
          className="w-1/2 font-bold"
          disabled={searchMutation.isPending}
        >
          {searchMutation.isPending ? "Buscando..." : "Buscar canchas"}
        </Button>
      </form>
    </Form>
  )
}

