interface TimeSlotProps {
    time: string
    isSelected: boolean 
    onClick: () => void
}

export function TimeSlot({ time, isSelected, onClick }: TimeSlotProps) {
    return (
        <button
            onClick={onClick}
            className={`w-20 px-4 py-2 rounded-lg border-2 transition-all duration-200 text-center 
          ${isSelected
                    ? "border-transparent bg-primary-95 border-primary-60 text-primary-foreground  font-bold"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                }
        `}
        >
            {time}
        </button>
    )
}