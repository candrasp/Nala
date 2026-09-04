<script setup lang="ts">
import { ref } from 'vue'
import { RichTextEditor } from '@/components/ui/editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileCode2,
  Copy,
  Check,
  Type,
  Sparkles,
  MessageSquare,
  Lock,
} from '@lucide/vue'
import { toast } from '@/components/ui/sonner'

// ─── Initial Content Samples ──────────────────────────────────────────────────
const fullEditorContent = ref(`<h2>Welcome to Nala Rich Text Editor</h2>
<p>This is an enterprise-grade <strong>WYSIWYG editor</strong> powered by <em>Tiptap (ProseMirror)</em> and styled natively with <strong>Tailwind CSS v4</strong> and <strong>OKLCH design tokens</strong>.</p>
<blockquote>Crafting delightful, accessible web software requires attention to details in every keystroke.</blockquote>
<p>Key highlights of this implementation:</p>
<ul>
  <li><strong>Full formatting suite:</strong> Headings, Bold, Italic, Underline, Strikethrough, and Inline Code</li>
  <li><strong>Structured blocks:</strong> Bullet &amp; numbered lists, blockquotes, and code blocks</li>
  <li><strong>Interactive Embeds:</strong> Hyperlinks and external image embedding with URL modals</li>
  <li><strong>Character &amp; Word Counters:</strong> Real-time document statistics with optional limits</li>
</ul>
<pre><code>// Example TypeScript service integration
export async function publishArticle(payload: ArticlePayload) {
  return await apiClient.post('/articles', payload)
}</code></pre>
<p>Try editing this content directly in the editor above!</p>`)

const compactContent = ref(`<p>Leaving a quick architectural note: ensure we add proper indices to <code>task_id</code> column before running migration <code>v3.2.0</code>.</p>`)

const readonlyContent = ref(`<h3>Security Policy & Data Isolation</h3>
<p>All tenant data is strictly partitioned by organization identifier. Every query executed by the service layer enforces multi-tenant row-level isolation.</p>
<ul>
  <li>AES-256 GCM encryption at rest</li>
  <li>TLS 1.3 in transit with forward secrecy</li>
  <li>Automatic 90-day key rotation</li>
</ul>`)

const copied = ref(false)

function copyHtmlOutput() {
  navigator.clipboard.writeText(fullEditorContent.value)
  copied.value = true
  toast.success('HTML content copied to clipboard')
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

function resetContent() {
  fullEditorContent.value = `<h2>Fresh Document</h2><p>Start writing your thoughts here...</p>`
  toast.info('Document content reset')
}

// ─── Code Snippets ────────────────────────────────────────────────────────────
const basicUsageSnippet = `<!-- Standard Rich Text Editor Integration -->
<script setup lang="ts">
import { ref } from 'vue'
import { RichTextEditor } from '@/components/ui/editor'

const content = ref('<h2>Article Title</h2><p>Start typing...</p>')
<\/script>

<template>
  <RichTextEditor
    v-model="content"
    placeholder="Write your article content..."
    min-height="200px"
    max-height="500px"
  />
</template>`

const compactUsageSnippet = `<!-- Compact / Comment Composer with Length Limit -->
<template>
  <RichTextEditor
    v-model="comment"
    placeholder="Write a reply or comment..."
    min-height="100px"
    max-height="240px"
    :max-length="500"
  />
</template>`

const readonlyUsageSnippet = `<!-- Read-Only / Preview Presentation Mode -->
<template>
  <RichTextEditor
    :model-value="previewHtml"
    :readonly="true"
    :hide-toolbar="true"
    :hide-footer="true"
  />
</template>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Rich Text Editor"
      description="Headless WYSIWYG rich text editor powered by Tiptap & ProseMirror, seamlessly styled with Tailwind CSS v4 and OKLCH color tokens."
      badge="Primitive Component"
    />

    <!-- 1. Full Featured Editor Playground -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2 space-y-4">
        <Card class="border border-border/80 bg-card shadow-xs">
          <CardHeader class="pb-3 border-b border-border/60">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-base font-semibold flex items-center gap-2">
                  <Type class="h-4 w-4 text-primary" />
                  Interactive Editor Workspace
                </CardTitle>
                <CardDescription class="text-xs text-muted-foreground mt-0.5">
                  Full formatting toolbar with headings, text marks, blockquotes, lists, links, and images
                </CardDescription>
              </div>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" class="h-8 text-xs gap-1.5" @click="resetContent">
                  Reset Content
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-4 sm:p-5">
            <RichTextEditor
              v-model="fullEditorContent"
              placeholder="Type your notes or article here..."
              min-height="260px"
              max-height="560px"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Right Column: Live Output Inspector -->
      <div class="space-y-4">
        <Card class="border border-border/80 bg-card shadow-xs h-full flex flex-col">
          <CardHeader class="pb-3 border-b border-border/60">
            <div class="flex items-center justify-between">
              <CardTitle class="text-sm font-semibold flex items-center gap-2">
                <FileCode2 class="h-4 w-4 text-primary" />
                Live HTML Output
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                class="h-7 text-xs gap-1 px-2"
                @click="copyHtmlOutput"
              >
                <Check v-if="copied" class="h-3 w-3 text-emerald-500" />
                <Copy v-else class="h-3 w-3" />
                <span>{{ copied ? 'Copied' : 'Copy HTML' }}</span>
              </Button>
            </div>
            <CardDescription class="text-xs text-muted-foreground">
              Real-time sanitized output ready for API submission
            </CardDescription>
          </CardHeader>
          <CardContent class="p-4 flex-1 flex flex-col">
            <div class="flex-1 rounded-lg bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/90 overflow-y-auto max-h-120 border border-border/60">
              <pre class="whitespace-pre-wrap wrap-break-word"><code>{{ fullEditorContent }}</code></pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- 2. Code Usage Snippet -->
    <CodePreview
      title="Standard Editor Setup"
      description="Quick starter code for integrating the RichTextEditor primitive with v-model two-way data binding."
      :code="basicUsageSnippet"
    >
      <div class="text-xs text-muted-foreground">
        Use <code>&lt;RichTextEditor v-model="content" /&gt;</code> anywhere across dashboard views and modal forms.
      </div>
    </CodePreview>

    <!-- 3. Compact Comment & Note Composer -->
    <CodePreview
      title="Compact / Comment Composer"
      description="Streamlined editor instance ideal for task comments, quick issue notes, or inline feedback with length limits."
      :code="compactUsageSnippet"
    >
      <div class="max-w-2xl space-y-3">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <MessageSquare class="h-3.5 w-3.5 text-primary" />
          <span>Leave an issue review note (Max 500 chars)</span>
        </div>
        <RichTextEditor
          v-model="compactContent"
          placeholder="Leave a comment or note..."
          min-height="110px"
          max-height="220px"
          :max-length="500"
        />
        <div class="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" class="text-xs h-8">
            Discard
          </Button>
          <Button size="sm" class="text-xs h-8 gap-1.5" @click="toast.success('Comment saved')">
            <Sparkles class="h-3.5 w-3.5" />
            Post Comment
          </Button>
        </div>
      </div>
    </CodePreview>

    <!-- 4. Read-Only / Preview Mode -->
    <CodePreview
      title="Read-Only / Preview Presentation Mode"
      description="Render stored rich HTML content safely without toolbar controls or editable state."
      :code="readonlyUsageSnippet"
    >
      <div class="max-w-2xl space-y-3">
        <div class="flex items-center gap-2">
          <Badge variant="outline" class="text-xs gap-1 border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10">
            <Lock class="h-3 w-3" />
            Read-Only Document
          </Badge>
          <span class="text-xs text-muted-foreground">Toolbar &amp; Footer hidden</span>
        </div>
        <RichTextEditor
          :model-value="readonlyContent"
          :readonly="true"
          :hide-toolbar="true"
          :hide-footer="true"
          min-height="140px"
          class="bg-muted/10 border-dashed"
        />
      </div>
    </CodePreview>

    <!-- 5. Implementation Reference & Props Matrix -->
    <Card class="border border-border/80 bg-card shadow-xs">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Component API Reference</CardTitle>
        <CardDescription class="text-xs text-muted-foreground">
          Props, Events, and Slots available on the <code>&lt;RichTextEditor&gt;</code> primitive
        </CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b border-border bg-muted/30 font-medium text-muted-foreground">
                <th class="p-3 pl-6 font-mono text-[11px]">Prop / Event</th>
                <th class="p-3 font-mono text-[11px]">Type</th>
                <th class="p-3 font-mono text-[11px]">Default</th>
                <th class="p-3 pr-6">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/60">
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">v-model</td>
                <td class="p-3 font-mono text-muted-foreground">string</td>
                <td class="p-3 font-mono text-muted-foreground">''</td>
                <td class="p-3 pr-6">Two-way HTML string binding of the document content.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">placeholder</td>
                <td class="p-3 font-mono text-muted-foreground">string</td>
                <td class="p-3 font-mono text-muted-foreground">'Write something...'</td>
                <td class="p-3 pr-6">Placeholder string rendered when editor is empty.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">disabled / readonly</td>
                <td class="p-3 font-mono text-muted-foreground">boolean</td>
                <td class="p-3 font-mono text-muted-foreground">false</td>
                <td class="p-3 pr-6">Locks editing canvas; disables toolbar.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">maxLength</td>
                <td class="p-3 font-mono text-muted-foreground">number | undefined</td>
                <td class="p-3 font-mono text-muted-foreground">undefined</td>
                <td class="p-3 pr-6">Maximum character limit displayed in document status bar.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">hideToolbar</td>
                <td class="p-3 font-mono text-muted-foreground">boolean</td>
                <td class="p-3 font-mono text-muted-foreground">false</td>
                <td class="p-3 pr-6">Hides the top format toolbar for compact layouts.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">hideFooter</td>
                <td class="p-3 font-mono text-muted-foreground">boolean</td>
                <td class="p-3 font-mono text-muted-foreground">false</td>
                <td class="p-3 pr-6">Hides the bottom character and word count status bar.</td>
              </tr>
              <tr>
                <td class="p-3 pl-6 font-mono font-semibold text-primary">@change</td>
                <td class="p-3 font-mono text-muted-foreground">(payload: EditorChangePayload) =&gt; void</td>
                <td class="p-3 font-mono text-muted-foreground">-</td>
                <td class="p-3 pr-6">Fires with HTML, plain text, character count, and word count.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
