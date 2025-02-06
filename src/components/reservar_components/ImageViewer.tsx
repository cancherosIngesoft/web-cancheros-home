import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-fit max-h-fit p-0 bg-transparent border-none">
       
        <div className="w-full h-full flex items-center justify-center">
          <img src={src || "/placeholder.svg"} alt={alt} className="max-w-[90vw] h-[90vh] object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

