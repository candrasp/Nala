<script setup lang="ts">
import { ref } from 'vue'
import {
  Copy,
  Check,
  Type,
  List,
  Quote,
  Code2,
} from '@lucide/vue'
import { Kbd } from '@/components/ui/kbd'

const copiedCode = ref(false)
const codeSnippet = ref(`// Nala Design System Component
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const count = ref(0)
function increment() {
  count.value++
}`)

function copySnippet() {
  navigator.clipboard.writeText(codeSnippet.value)
  copiedCode.value = true
  setTimeout(() => {
    copiedCode.value = false
  }, 2000)
}

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const headingScaleSnippet = `<!-- Modular Headings Scale (H1 to H6) -->
<h1 class="text-4xl font-extrabold tracking-tight">H1 — Main Page Title</h1>
<h2 class="text-3xl font-bold tracking-tight">H2 — Section Header</h2>
<h3 class="text-2xl font-semibold tracking-tight">H3 — Card Group Title</h3>
<h4 class="text-xl font-semibold tracking-tight">H4 — Modal Title / Subsection</h4>
<h5 class="text-base font-semibold">H5 — Widget Heading</h5>
<h6 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
  H6 — Category Overline
</h6>`

const bodyTextSnippet = `<!-- Body Paragraph & Text Hierarchy -->

<!-- 1. Lead Paragraph -->
<p class="text-lg text-muted-foreground leading-relaxed">
  Nala is an enterprise-grade admin dashboard built with Vue 3 and Tailwind CSS v4.
</p>

<!-- 2. Standard Body -->
<p class="text-sm text-foreground leading-relaxed">
  Every component is crafted with accessibility in mind, supporting keyboard navigation.
</p>

<!-- 3. Muted / Secondary Helper Text -->
<p class="text-xs text-muted-foreground leading-relaxed">
  Helper descriptions, placeholder instructions, and secondary metadata.
</p>

<!-- 4. Monospace Inline Badge / Code -->
<span class="font-mono text-xs text-foreground bg-muted/50 px-2 py-1 rounded border">
  oklch(0.696 0.17 162.48) · SHA-256: 8f19da2e91a0
</span>`

const blockquoteSnippet = `<!-- Blockquotes & Editorial Callouts -->

<!-- Standard Primary Blockquote -->
<blockquote class="border-l-4 border-primary pl-4 py-1 italic text-sm text-foreground bg-primary/5 rounded-r-lg">
  <p>"Simplicity is the prerequisite for reliability."</p>
  <footer class="text-xs text-muted-foreground font-normal not-italic">— Edsger W. Dijkstra</footer>
</blockquote>

<!-- Warning / Important Callout -->
<blockquote class="border-l-4 border-amber-500 pl-4 py-2 text-xs bg-amber-500/5 rounded-r-lg">
  <p class="font-semibold text-amber-600 dark:text-amber-400">Important Note</p>
  <p class="text-muted-foreground">Always verify environment secrets before promoting to production.</p>
</blockquote>`

const codeSnippetDoc = `<!-- Code Block & Inline Code Formatting -->

<!-- Multi-line Code Block -->
<div class="rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 border border-zinc-800">
  <pre><code>import { Button } from '@/components/ui/button'</code></pre>
</div>

<!-- Inline Code Chip -->
<p class="text-xs text-muted-foreground">
  Run <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">pnpm dev</code> to start.
</p>`

const listsSnippet = `<!-- Lists & Structural Layouts -->

<!-- Unordered Bullet List -->
<ul class="list-disc list-inside text-xs text-foreground space-y-1">
  <li>Automatic dark mode synchronization with system preference</li>
  <li>Pure SVG interactive charts with zero runtime library weight</li>
  <li>Hardware-accelerated CSS Grid transitions (60fps)</li>
</ul>

<!-- Ordered Numerical List -->
<ol class="list-decimal list-inside text-xs text-foreground space-y-1">
  <li>Clone repository from GitHub</li>
  <li>Install dependencies using pnpm</li>
  <li>Start local dev server</li>
</ol>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Typography Scale"
      description="Modular typographic hierarchy, lead paragraphs, code blocks, blockquotes, and list styling."
      badge="Design System"
    />

    <!-- 1. HEADINGS SCALE HIERARCHY -->
    <CodePreview
      title="Headings Scale Hierarchy (H1–H6)"
      description="Standardized heading styles with calibrated font weights, optical letter-spacing (tracking-tight), and responsive scale."
      :code="headingScaleSnippet"
    >
      <div class="divide-y divide-border/60">
        <!-- H1 -->
        <div class="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-4xl font-extrabold tracking-tight text-foreground">
              The quick brown fox jumps over the lazy dog
            </h1>
            <p class="text-xs text-muted-foreground">Main Page Title / Hero Heading</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H1 · 36px · 800</span>
            <Kbd size="sm">text-4xl font-extrabold</Kbd>
          </div>
        </div>

        <!-- H2 -->
        <div class="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-3xl font-bold tracking-tight text-foreground">
              The quick brown fox jumps over the lazy dog
            </h2>
            <p class="text-xs text-muted-foreground">Section Header / Main Feature Title</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H2 · 30px · 700</span>
            <Kbd size="sm">text-3xl font-bold</Kbd>
          </div>
        </div>

        <!-- H3 -->
        <div class="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h3 class="text-2xl font-semibold tracking-tight text-foreground">
              The quick brown fox jumps over the lazy dog
            </h3>
            <p class="text-xs text-muted-foreground">Card Group Header / Subsection Title</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H3 · 24px · 600</span>
            <Kbd size="sm">text-2xl font-semibold</Kbd>
          </div>
        </div>

        <!-- H4 -->
        <div class="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h4 class="text-xl font-semibold tracking-tight text-foreground">
              The quick brown fox jumps over the lazy dog
            </h4>
            <p class="text-xs text-muted-foreground">Card Title / Modal Header</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H4 · 20px · 600</span>
            <Kbd size="sm">text-xl font-semibold</Kbd>
          </div>
        </div>

        <!-- H5 -->
        <div class="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h5 class="text-base font-semibold text-foreground">
              The quick brown fox jumps over the lazy dog
            </h5>
            <p class="text-xs text-muted-foreground">Form Section Label / Widget Heading</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H5 · 16px · 600</span>
            <Kbd size="sm">text-base font-semibold</Kbd>
          </div>
        </div>

        <!-- H6 -->
        <div class="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div class="space-y-1">
            <h6 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              The quick brown fox jumps over the lazy dog
            </h6>
            <p class="text-xs text-muted-foreground">Overline / Category Tag / Sidebar Group</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="label-mono text-[11px] bg-muted px-2 py-1 rounded">H6 · 14px · 600</span>
            <Kbd size="sm">text-sm font-semibold uppercase</Kbd>
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 2. BODY TEXT & BLOCKQUOTES (2-COL) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Paragraph Scales -->
      <CodePreview
        title="Body Text & Paragraph Variants"
        description="Lead paragraphs, standard body text, muted secondary hints, and monospace tokens."
        :code="bodyTextSnippet"
      >
        <div class="space-y-5">
          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Lead Paragraph</span>
            <p class="text-lg text-muted-foreground leading-relaxed">
              Nala is an enterprise-grade admin dashboard built with Vue 3, Vite, Tailwind CSS v4, and Reka UI.
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Base Body</span>
            <p class="text-sm text-foreground leading-relaxed">
              Every component is crafted with accessibility in mind, supporting complete keyboard navigation, dark mode, and seamless composability.
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Muted Helper</span>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Helper descriptions, placeholder instructions, and secondary timestamp metadata.
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Monospace Token</span>
            <p class="text-xs font-mono text-foreground bg-muted/40 p-2 rounded border border-border">
              oklch(0.696 0.17 162.48) · SHA-256: 8f19da2e91a0
            </p>
          </div>
        </div>
      </CodePreview>

      <!-- Blockquotes & Editorial Callouts -->
      <CodePreview
        title="Blockquotes & Highlights"
        description="Editorial quotes, decorative borders, and colored callout boxes."
        :code="blockquoteSnippet"
      >
        <div class="space-y-4">
          <!-- Default Blockquote -->
          <blockquote class="border-l-4 border-primary pl-4 py-1 italic text-sm text-foreground space-y-1 bg-primary/5 rounded-r-lg">
            <p>
              "Simplicity is the prerequisite for reliability. Software engineering is about managing complexity."
            </p>
            <footer class="text-xs text-muted-foreground font-normal not-italic">
              — Edsger W. Dijkstra
            </footer>
          </blockquote>

          <!-- Accent Callout -->
          <blockquote class="border-l-4 border-blue-500 pl-4 py-1 italic text-sm text-foreground space-y-1 bg-blue-500/5 rounded-r-lg">
            <p>
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
            <footer class="text-xs text-muted-foreground font-normal not-italic">
              — Steve Jobs
            </footer>
          </blockquote>

          <!-- Warning Callout -->
          <blockquote class="border-l-4 border-amber-500 pl-4 py-1 text-xs text-foreground space-y-1 bg-amber-500/5 rounded-r-lg">
            <p class="font-semibold text-amber-700 dark:text-amber-400">Important Note</p>
            <p class="text-muted-foreground">
              Always verify environment variables before promoting database schemas to production.
            </p>
          </blockquote>
        </div>
      </CodePreview>
    </div>

    <!-- 3. CODE BLOCKS & LISTS (2-COL) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Code Blocks -->
      <CodePreview
        title="Inline Code & Code Blocks"
        description="Dark terminal styled code blocks with syntax chips and inline copy capabilities."
        :code="codeSnippetDoc"
      >
        <div class="space-y-4">
          <div class="rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto border border-zinc-800 shadow-inner">
            <pre class="leading-relaxed"><code>{{ codeSnippet }}</code></pre>
          </div>

          <div class="text-xs text-muted-foreground leading-relaxed">
            Use <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground font-semibold">import { Card } from '@/components/ui/card'</code> to include standard surfaces in your Vue templates.
          </div>
        </div>
      </CodePreview>

      <!-- Lists & Hierarchy -->
      <CodePreview
        title="Lists (Ordered & Unordered)"
        description="Structured lists with bullet markers and numbered indexing."
        :code="listsSnippet"
      >
        <div class="space-y-4">
          <!-- Unordered List -->
          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Unordered Bullet List</span>
            <ul class="list-disc list-inside text-xs text-foreground space-y-1 leading-relaxed pl-1">
              <li>Automatic dark mode synchronization with system preference</li>
              <li>Pure SVG interactive charts with zero runtime library weight</li>
              <li>Hardware-accelerated CSS Grid transitions (60fps)</li>
            </ul>
          </div>

          <!-- Ordered List -->
          <div class="space-y-1 border-t border-border pt-3">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Ordered Numerical List</span>
            <ol class="list-decimal list-inside text-xs text-foreground space-y-1 leading-relaxed pl-1">
              <li>Clone repository from GitHub</li>
              <li>Install dependencies using <code class="bg-muted px-1 rounded font-mono">pnpm install</code></li>
              <li>Start local dev server using <code class="bg-muted px-1 rounded font-mono">pnpm dev</code></li>
            </ol>
          </div>
        </div>
      </CodePreview>
    </div>
  </div>
</template>
