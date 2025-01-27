"use client"

import { useState } from "react"
import type { Cancha } from "@/actions/book_field/field_actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ImageOff, Eye, Users, DollarSign, Info } from "lucide-react"
import { ImageViewer } from "./ImageViewer"
import Image from "next/image"
import FieldIcon from "../icon/FieldIcon"

interface FieldCardProps {
    field: Cancha
    setSelectedField: ({id_field, price}: { id_field: string, price: number }) => void
    selectedField: {id_field:string, price:number} | null
}

const FieldCard = ({ field, setSelectedField, selectedField }: FieldCardProps) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    // Filter out null images
    const images = [field.imagen1, field.imagen2, field.imagen3, field.imagen4, field.imagen5].filter(
        (img): img is string => img !== null,
    )

    return (
        <>
            <Card
                key={field.id_cancha}
                className={`cursor-pointer transition-colors h-full ${selectedField?.id_field === field.id_cancha ? "border-primary bg-green-100" : "hover:border-muted"
                    }`}
                onClick={() => setSelectedField({id_field: field.id_cancha, price: field.precio})}
            >
                <CardContent className="flex flex-col h-56 aspect-square p-4">
                    <div className="relative h-24 aspect-video group" onClick={(e) => e.stopPropagation()}>
                        {field.imagen1 ? (
                            <>
                                <img
                                    src={field.imagen1 || "/placeholder.svg"}
                                    alt={field.nombre}
                                    className="h-full w-full rounded-md object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                    <Button variant="secondary" size="sm" className="text-white" onClick={() => setShowModal(true)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ver más
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="h-full w-full flex items-center rounded-md bg-gray-200">
                                <ImageOff className="h-10 w-10 mx-auto text-primary-50" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-between mt-2 gap-2">
                        <div>
                            <CardTitle className="text-lg">{field.nombre}</CardTitle>
                            <CardDescription className="flex items-center font-semibold">
                                <Users className="h-4 w-4 mr-1 " />
                                Capacidad:<span className="font-normal"> {field.capacidad} personas</span>
                            </CardDescription>
                        </div>
                        <p className="font-semibold text-primary-50 flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />{field.precio.toLocaleString()} / hora
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader className="flex flex-row items-center space-x-2">
                        <FieldIcon className="h-12 w-12 fill-primary text-primary border-primary " />
                        <DialogTitle className="text-2xl" >{field.nombre}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="flex justify-center w-full">
                            <Carousel className="w-full max-w-xl">
                                <CarouselContent>
                                    {images.slice(0, 2).map((image, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                                            <div className="relative cursor-pointer aspect-video" onClick={() => setSelectedImage(image)}>
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`${field.nombre} - Imagen ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary" />
                                
                                    <h4 className="font-semibold">Capacidad:</h4>
                                    <p className="text-muted-foreground">{field.capacidad} personas</p>
                                
                            </div>
                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                
                                    <h4 className="font-semibold">Precio por hora</h4>
                                    <p className="text-primary-50 font-semibold">${field.precio.toLocaleString()}</p>
                                
                            </div>
                            <div className="col-span-2 flex items-start space-x-2">
                                <Info className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">Descripción</h4>
                                    <p className="text-muted-foreground">{field.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ImageViewer
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                src={selectedImage || ""}
                alt={field.nombre}
            />
        </>
    )
}

export default FieldCard

