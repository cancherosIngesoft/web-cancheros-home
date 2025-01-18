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
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una localidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="suba">Suba</SelectItem>
                  <SelectItem value="usaquen">Usaquén</SelectItem>
                  <SelectItem value="chapinero">Chapinero</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
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

        <FormField
          control={form.control}
          name="fieldType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de cancha</FormLabel>
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

        <div className="space-y-2">
          <FormLabel>Rango de precio</FormLabel>
          <div className="flex items-center space-x-2">
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
            <span>-</span>
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

        <Button 
          type="submit" 
          className="w-full" 
          disabled={searchMutation.isPending}
        >
          {searchMutation.isPending ? "Buscando..." : "Buscar canchas"}
        </Button>
      </form>
    </Form>
  )
}

