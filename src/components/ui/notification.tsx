import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationProps {
  id: string
  type: NotificationType
  title: string
  message: string
  onClose: (id: string) => void
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: Bell,
}

const colors = {
  success: "bg-power-success/10 text-power-success border-power-success/20",
  error: "bg-power-error/10 text-power-error border-power-error/20",
  info: "bg-power-info/10 text-power-info border-power-info/20",
  warning: "bg-power-warning/10 text-power-warning border-power-warning/20",
}

export function Notification({
  id,
  type,
  title,
  message,
  onClose,
  duration = 5000,
}: NotificationProps) {
  const Icon = icons[type]

  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        colors[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="p-1 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

interface NotificationContainerProps {
  notifications: Array<{
    id: string
    type: NotificationType
    title: string
    message: string
  }>
  onClose: (id: string) => void
}

export function NotificationContainer({
  notifications,
  onClose,
}: NotificationContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-96">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  )
} 