"use client"

import { Bot, CheckCircle2, AlertTriangle, UserCheck2, Search, Send, BrainCircuit, BadgeAlert, Target, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type IntentResp = {
  intent: string
  business_category: string
  region: string
  urgency: string
  risk_level: 'low' | 'medium' | 'high'
  need_human: boolean
  reason: string
}

type KnowledgeResp = {
  results: Array<{
    id: string
    title: string
    content: string
    score: number
    source: string
    updated_at: string
    risk_level: 'low' | 'medium' | 'high'
  }>
  confidence: number
}

type LeadResp = {
  lead_score: number
  lead_level: 'A' | 'B' | 'C'
  tags: string[]
  recommended_service: string
  next_action: string
  sales_script: string
}

const riskColor = {
  low: 'text-secondary border-secondary/30 bg-secondary/10',
  medium: 'text-warning border-warning/30 bg-warning/10',
  high: 'text-destructive border-destructive/30 bg-destructive/10',
}

export function CustomerServicePanel() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiAnswer, setAiAnswer] = useState('')
  const [intent, setIntent] = useState<IntentResp | null>(null)
  const [knowledge, setKnowledge] = useState<KnowledgeResp | null>(null)
  const [lead, setLead] = useState<LeadResp | null>(null)
  const [actionNote, setActionNote] = useState('')

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)
    setActionNote('')
    try {
      const intentRes = await fetch('/api/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const intentData: IntentResp = await intentRes.json()
      setIntent(intentData)

      const knowledgeRes = await fetch('/api/knowledge/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          intent: intentData.intent,
          region: intentData.region,
        }),
      })
      const knowledgeData: KnowledgeResp = await knowledgeRes.json()
      setKnowledge(knowledgeData)

      const leadRes = await fetch('/api/lead/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          intent: intentData.intent,
          region: intentData.region,
          risk_level: intentData.risk_level,
        }),
      })
      const leadData: LeadResp = await leadRes.json()
      setLead(leadData)

      const top = knowledgeData.results?.[0]
      setAiAnswer(top ? `根据知识库命中：${top.content}` : '暂未命中明确知识，建议转人工进一步评估。')
    } catch {
      setAiAnswer('系统处理失败，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 glow-blue">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">企业服务AI资质顾问</h3>
            <p className="text-xs text-muted-foreground">本地规则 + 本地知识库模拟MVP</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="请输入企业资质/工商财税问题，例如：重庆建筑公司资质升级怎么申请？"
            className="flex-1 rounded-xl bg-muted/40 border border-border/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {loading ? '处理中...' : '发送'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-border/50 space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI回答展示</h4>
          <div className="rounded-xl bg-muted/40 border border-border/40 p-4 text-sm text-foreground min-h-[90px]">{aiAnswer || '等待用户提问...'}</div>

          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Search className="h-4 w-4 text-secondary" />知识命中卡片</h4>
          <div className="space-y-2">
            {knowledge?.results?.length ? knowledge.results.map((item) => (
              <div key={item.id} className="rounded-lg border border-border/40 bg-background/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-foreground font-medium">{item.title}</p>
                  <span className="text-xs text-secondary">{item.score}分</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
              </div>
            )) : <div className="text-xs text-muted-foreground">暂无命中结果</div>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><CheckCircle2 className="h-4 w-4 text-cyan-400" />意图识别卡片</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">意图：<span className="text-foreground">{intent?.intent || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">业务：<span className="text-foreground">{intent?.business_category || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">地区：<span className="text-foreground">{intent?.region || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">紧急度：<span className="text-foreground">{intent?.urgency || '-'}</span></div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><BadgeAlert className="h-4 w-4 text-warning" />风险等级提示 / 是否转人工</h4>
            <div className="flex items-center gap-3 text-xs">
              <span className={cn('px-3 py-1.5 rounded-lg border', intent ? riskColor[intent.risk_level] : 'border-border/50 bg-muted/20 text-muted-foreground')}>
                风险：{intent?.risk_level || '-'}
              </span>
              <span className="px-3 py-1.5 rounded-lg border border-border/50 bg-muted/20 text-foreground">
                转人工：{intent ? (intent.need_human ? '是' : '否') : '-'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{intent?.reason || '暂无风控说明'}</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-primary" />CRM线索评分卡片</h4>
            <div className="space-y-2 text-xs">
              <div>线索分：<span className="text-foreground font-semibold">{lead?.lead_score ?? '-'}</span></div>
              <div>等级：<span className="text-foreground font-semibold">{lead?.lead_level ?? '-'}</span></div>
              <div>推荐服务：<span className="text-foreground">{lead?.recommended_service ?? '-'}</span></div>
              <div>下一步：<span className="text-foreground">{lead?.next_action ?? '-'}</span></div>
              <div className="flex flex-wrap gap-2 mt-2">{lead?.tags?.map((tag) => <span key={tag} className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary">{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 border border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button onClick={() => setActionNote('已记录：回答正确')} className="px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium hover:bg-secondary/20 flex items-center justify-center gap-2"><ThumbsUp className="h-3.5 w-3.5" />回答正确</button>
          <button onClick={() => setActionNote('已记录：回答错误')} className="px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/20 flex items-center justify-center gap-2"><ThumbsDown className="h-3.5 w-3.5" />回答错误</button>
          <button onClick={() => setActionNote('已触发：转人工处理')} className="px-3 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs font-medium hover:bg-warning/20 flex items-center justify-center gap-2"><UserCheck2 className="h-3.5 w-3.5" />转人工</button>
          <button onClick={() => setActionNote('已写入：知识回流队列（模拟）')} className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 flex items-center justify-center gap-2"><AlertTriangle className="h-3.5 w-3.5" />写入知识回流</button>
        </div>
        {actionNote && <p className="text-xs text-muted-foreground mt-3">{actionNote}</p>}
      </div>
    </div>
  )
}
