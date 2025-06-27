'use client'

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="flex flex-col items-center justify-center gap-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Щось пішло не так</AlertTitle>
        <AlertDescription>
          Вибачте, сталася неочікувана помилка. Будь ласка, спробуйте ще раз.
        </AlertDescription>
      </Alert>
      <Button onClick={() => reset()} className="mt-6">
        Спробувати знову
      </Button>
    </Card>
  )
}
