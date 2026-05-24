"use client"

import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'
import { DifyChatbot } from '@/components/dashboard/dify-chatbot'
import { useDashboardStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DifyTestPage() {
  const { sidebarOpen } = useDashboardStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className={cn(
        "pt-16 transition-all duration-300",
        sidebarOpen ? "pl-[280px]" : "pl-[72px]"
      )}>
        <div className="p-6 max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">返回仪表板</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dify AI 客服机器人测试</h1>
                <p className="text-sm text-muted-foreground mt-1">实时测试 Dify 智能助手集成效果</p>
              </div>
            </div>
          </div>

          {/* Test Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">Chatbot ID</h3>
              <p className="text-xs text-muted-foreground font-mono">iikCoz3y90yG7ZR9</p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">数据来源</h3>
              <p className="text-xs text-muted-foreground">Dify Platform (udify.app)</p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">集成状态</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-green-500 font-medium">已激活</p>
              </div>
            </div>
          </div>

          {/* Chatbot Container */}
          <div className="glass-card rounded-2xl p-6 border border-border/50">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                智能助手对话框
              </h2>
              <p className="text-sm text-muted-foreground mt-1">在下方与 AI 客服机器人进行交互，测试其回答能力和知识库准确性</p>
            </div>
            
            {/* Chatbot */}
            <div className="border-t border-border/30 pt-6">
              <DifyChatbot height="800px" />
            </div>
          </div>

          {/* Usage Tips */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">✨ 测试建议</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• 尝试多种问题类型（产品、服务、订单等）</li>
                <li>• 测试知识库的命中准确性</li>
                <li>• 验证 AI 回答的流畅性和相关性</li>
                <li>• 检查多轮对话的连贯性</li>
              </ul>
            </div>
            <div className="glass-card rounded-xl p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">🔧 功能特性</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• 支持麦克风输入（语音识别）</li>
                <li>• 实时文本回复</li>
                <li>• 自动知识库匹配</li>
                <li>• 完整对话历史记录</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
