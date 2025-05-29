import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { NotificationType } from "@/components/ui/notification"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (type: NotificationType, title: string, message: string) => {
      const id = uuidv4()
      setNotifications((prev) => [...prev, { id, type, title, message }])
      return id
    },
    []
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const success = useCallback(
    (title: string, message: string) => addNotification("success", title, message),
    [addNotification]
  )

  const error = useCallback(
    (title: string, message: string) => addNotification("error", title, message),
    [addNotification]
  )

  const info = useCallback(
    (title: string, message: string) => addNotification("info", title, message),
    [addNotification]
  )

  const warning = useCallback(
    (title: string, message: string) => addNotification("warning", title, message),
    [addNotification]
  )

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning,
  }
} 