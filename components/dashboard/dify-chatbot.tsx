"use client"

import { useEffect, useState } from 'react'

interface DifyChatbotProps {
  chatbotId?: string
  height?: string | number
}

export function DifyChatbot({ 
  chatbotId = 'iikCoz3y90yG7ZR9',
  height = '600px'
}: DifyChatbotProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div 
        className="glass-card rounded-2xl border border-border/50 flex items-center justify-center bg-muted/30"
        style={{ height }}
      >
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
      <iframe
        src={`https://udify.app/chatbot/${chatbotId}`}
        style={{
          width: '100%',
          height: height,
          border: 'none',
          borderRadius: '1rem'
        }}
        frameBorder="0"
        allow="microphone"
        title="Dify AI Chatbot"
      />
    </div>
  )
}
