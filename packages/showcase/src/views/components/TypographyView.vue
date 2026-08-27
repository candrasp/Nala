<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'
import { Search, Zap, Shield } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import CodePreview from '@/components/CodePreview.vue'

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

const codeSnippet = `// Nala Design System Component
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const count = ref(0)
function increment() {
  count.value++
}`

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

const kbdSnippet = `<!-- Keyboard Shortcut (<Kbd>) Combinations -->
<div class="flex items-center gap-1.5">
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
  <span class="text-xs text-muted-foreground">Quick Search</span>
</div>

<div class="flex items-center gap-1.5">
  <Kbd size="sm">Ctrl</Kbd>
  <Kbd size="sm">Shift</Kbd>
  <Kbd size="sm">P</Kbd>
  <span class="text-xs text-muted-foreground">Command Palette</span>
</div>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Typography & Keyboard Shortcuts"
      description="Modular typographic hierarchy, lead paragraphs, code blocks, blockquotes, list styling, and Kbd shortcut key combinations."
      badge="Design System"
    />

    <!-- 1. HEADINGS SCALE HIERARCHY -->
    <CodePreview
      title="Headings Scale Hierarchy (H1–H6)"
      description="Standardized heading styles with calibrated font weights, optical letter-spacing (tracking-tight), and responsive scale."
      :code="headingScaleSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <span class="text-3xl font-extrabold tracking-tight text-foreground">H1 — Main Page Header</span>
          <span class="label-mono">text-3xl font-extrabold</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <span class="text-2xl font-bold tracking-tight text-foreground">H2 — Major Section Title</span>
          <span class="label-mono">text-2xl font-bold</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <span class="text-xl font-semibold tracking-tight text-foreground">H3 — Card Group Heading</span>
          <span class="label-mono">text-xl font-semibold</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <span class="text-lg font-semibold tracking-tight text-foreground">H4 — Subsection &amp; Modal Title</span>
          <span class="label-mono">text-lg font-semibold</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <span class="text-base font-semibold text-foreground">H5 — Component &amp; Widget Heading</span>
          <span class="label-mono">text-base font-semibold</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">H6 — Overline Category</span>
          <span class="label-mono">text-xs font-semibold uppercase</span>
        </div>
      </div>
    </CodePreview>

    <!-- 2. BODY TEXT & BLOCKQUOTES (2-COL) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Body Text -->
      <CodePreview
        title="Body Paragraphs & Hierarchy"
        description="Lead paragraphs, regular copy, muted descriptions, and inline monospace chips."
        :code="bodyTextSnippet"
      >
        <div class="space-y-4">
          <!-- Lead Paragraph -->
          <div class="space-y-1">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Lead Paragraph</span>
            <p class="text-base text-muted-foreground leading-relaxed">
              Nala is a high-performance, enterprise dashboard template designed for real-world operations with Vue 3 and Tailwind CSS v4.
            </p>
          </div>

          <!-- Body Regular -->
          <div class="space-y-1 border-t border-border pt-3">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Body Regular (text-sm)</span>
            <p class="text-xs text-foreground leading-relaxed">
              Every layout surface complies strictly with WCAG 2.1 AA accessibility standards, responsive breakpoints, and hardware-accelerated theme switching.
            </p>
          </div>

          <!-- Muted Helper -->
          <div class="space-y-1 border-t border-border pt-3">
            <span class="text-[11px] font-mono text-muted-foreground uppercase">Muted Helper (text-xs)</span>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Helper instructions, form validation feedback, and secondary metadata descriptions.
            </p>
          </div>
        </div>
      </CodePreview>

      <!-- Blockquotes -->
      <CodePreview
        title="Blockquotes & Callouts"
        description="Editorial callouts, quote containers, and attention badges."
        :code="blockquoteSnippet"
      >
        <div class="space-y-4">
          <!-- Standard Blockquote -->
          <blockquote class="border-l-4 border-primary pl-4 py-1 italic text-xs text-foreground space-y-1 bg-primary/5 rounded-r-lg">
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

    <!-- 4. KEYBOARD SHORTCUTS (<KBD>) SHOWCASE -->
    <CodePreview
      title="Keyboard Shortcuts & Key Combinations (<Kbd>)"
      description="Semantic keyboard shortcut badges for command palettes, navigation accelerators, and modal hotkeys."
      :code="kbdSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 1. Global Navigation Keys -->
        <div class="p-4 rounded-xl border bg-muted/20 space-y-3">
          <div class="flex items-center gap-2">
            <Search class="h-4 w-4 text-primary" />
            <h4 class="text-xs font-bold text-foreground">Global Accelerators</h4>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Open Command Palette</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Toggle Dark Theme</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">D</Kbd>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Toggle Sidebar</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">B</Kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Data & Table Hotkeys -->
        <div class="p-4 rounded-xl border bg-muted/20 space-y-3">
          <div class="flex items-center gap-2">
            <Zap class="h-4 w-4 text-amber-500" />
            <h4 class="text-xs font-bold text-foreground">Table &amp; Grid Hotkeys</h4>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Select Next Record</span>
              <Kbd size="sm">J</Kbd>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Select Previous Record</span>
              <Kbd size="sm">K</Kbd>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Batch Select All</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">Shift</Kbd>
                <Kbd size="sm">A</Kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Dialog & Form Shortcuts -->
        <div class="p-4 rounded-xl border bg-muted/20 space-y-3">
          <div class="flex items-center gap-2">
            <Shield class="h-4 w-4 text-emerald-500" />
            <h4 class="text-xs font-bold text-foreground">Dialog &amp; Form Hotkeys</h4>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Confirm / Submit Form</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">Enter</Kbd>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Dismiss / Close Modal</span>
              <Kbd size="sm">Esc</Kbd>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground">Save Matrix Draft</span>
              <div class="flex items-center gap-1">
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">S</Kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
