"use client"

import { Headphones, ExternalLink } from 'lucide-react'

const DIFY_CHATBOT_URL = 'https://udify.app/chatbot/iikCoz3y90yG7ZR9'

export function CustomerServicePanel() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 glow-blue shrink-0">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">AI客服中心</h3>
            <p className="text-xs text-muted-foreground">实时对话监控（Dify 工作流）</p>
          </div>
        </div>
        <a
          href={DIFY_CHATBOT_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors shrink-0"
        >
          新窗口打开
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
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

      <p className="mt-2 text-[11px] text-muted-foreground">
        若嵌入受浏览器或平台策略限制，请点击“新窗口打开”直接使用 Dify 对话。
      </p>
    </div>
  )
}
