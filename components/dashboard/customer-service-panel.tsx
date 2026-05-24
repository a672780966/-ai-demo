"use client"

import { Headphones } from 'lucide-react'

const DIFY_CHATBOT_URL = 'https://udify.app/chatbot/iikCoz3y90yG7ZR9'

export function CustomerServicePanel() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 glow-blue">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI客服中心</h3>
            <p className="text-xs text-muted-foreground">实时对话监控（Dify 工作流）</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            在线会话
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-background/50 overflow-hidden">
        <iframe
          src={DIFY_CHATBOT_URL}
          title="Dify AI客服"
          className="w-full h-[760px] min-h-[700px]"
          frameBorder="0"
          allow="microphone"
        />
      </div>
    </div>
  )
}
