import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 px-4">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Smart Home Energy Dashboard &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-right flex items-center gap-1">
          Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by Lakshmi V
        </p>
      </div>
    </footer>
  )
}

