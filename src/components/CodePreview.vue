<script setup lang="ts">
import { Code2, Copy, Check } from '@lucide/vue'
import { toast } from '@/components/ui/sonner'

interface Props {
  title?: string
  description?: string
  code: string
}

const props = defineProps<Props>()

const showCode = ref(false)
const isCopied = ref(false)

function copySnippet() {
  navigator.clipboard.writeText(props.code.trim())
  isCopied.value = true
  toast.success('Code copied to clipboard!')
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

// Custom Vue/HTML Syntax Highlighter with One Dark Pro / VS Code Theme
function highlightLine(line: string): string {
  if (!line.trim()) return '&nbsp;'

  // 1. Comments: <!-- ... -->
  if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<span class="text-[#5c6370] italic">${escaped}</span>`
  }

  // 2. Tokenize Strings first to protect content from other regexes
  const stringTokens: string[] = []
  let processed = line.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (match) => {
    const idx = stringTokens.length
    stringTokens.push(match)
    return `___STR_${idx}___`
  })

  // 3. Escape HTML
  processed = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 4. Highlight Vue Mustache Interpolation: {{ ... }}
  processed = processed.replace(/(\{\{)([\s\S]*?)(\}\})/g, (_m, open, content, close) => {
    return `<span class="text-[#e5c07b] font-semibold">${open}</span>${content}<span class="text-[#e5c07b] font-semibold">${close}</span>`
  })

  // 5. Highlight Vue Directives & Events: @click, :class, :disabled, v-if, v-model
  processed = processed.replace(
    /(\s)(@[\w.-]+|:[\w.-]+|v-[\w.-]+)(?=\s*=|\s+|>|&gt;)/g,
    '$1<span class="text-[#e06c75] font-medium">$2</span>'
  )

  // 6. Highlight Standard Attributes: class, variant, size, type, placeholder, etc.
  processed = processed.replace(
    /(\s)([a-zA-Z0-9_-]+)(?=\s*=)/g,
    '$1<span class="text-[#d19a66] font-medium">$2</span>'
  )

  // 7. Highlight HTML & Component Tags: <div, </div, <Button, </Button, <Code2
  processed = processed.replace(
    /(&lt;\/?)([a-zA-Z0-9_-]+)/g,
    '<span class="text-[#abb2bf] font-normal">$1</span><span class="text-[#e06c75] font-medium">$2</span>'
  )
  processed = processed.replace(
    /(\/?&gt;)/g,
    '<span class="text-[#abb2bf] font-normal">$1</span>'
  )

  // 8. Restore Strings with Sage Green color (#98c379)
  processed = processed.replace(/___STR_(\d+)___/g, (_m, idx) => {
    const str = stringTokens[Number(idx)]
    const escapedStr = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<span class="text-[#98c379]">${escapedStr}</span>`
  })

  return processed
}

const highlightedLines = computed(() => {
  const rawLines = props.code.trim().split('\n')
  return rawLines.map((line) => highlightLine(line))
})
</script>

<template>
  <Card flush class="shadow-sm">
    <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <CardTitle v-if="title" class="text-base font-semibold">{{ title }}</CardTitle>
        <CardDescription v-if="description" class="text-xs mt-0.5">
          {{ description }}
        </CardDescription>
      </div>

      <!-- Action Buttons: Code Toggle & Copy -->
      <div class="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
        <Button
          variant="outline"
          size="xs"
          class="h-7 text-[11px] gap-1 px-2.5 font-mono cursor-pointer transition-colors"
          :class="{ 'bg-accent text-accent-foreground border-primary/40': showCode }"
          @click="showCode = !showCode"
        >
          <Code2 class="h-3.5 w-3.5 text-primary" />
          <span>{{ showCode ? 'Hide Code' : 'View Code' }}</span>
        </Button>
        <Button
          variant="outline"
          size="xs"
          class="h-7 text-[11px] gap-1 px-2.5 cursor-pointer hover:text-primary hover:border-primary/40 transition-colors"
          @click="copySnippet"
        >
          <Check v-if="isCopied" class="h-3.5 w-3.5 text-emerald-500" />
          <Copy v-else class="h-3.5 w-3.5" />
          <span>{{ isCopied ? 'Copied' : 'Copy' }}</span>
        </Button>
      </div>
    </CardHeader>

    <!-- Interactive Component Preview -->
    <CardContent class="p-6">
      <slot />
    </CardContent>

    <!-- Expandable Code Snippet Block (One Dark Pro / VS Code Aesthetic) -->
    <div
      v-if="showCode"
      class="border-t border-border bg-[#181a1f] text-[#abb2bf] transition-all font-mono"
    >
      <!-- macOS Terminal Header Bar -->
      <div class="flex items-center justify-between px-4 py-2.5 bg-[#21252b] border-b border-[#181a1f] text-[11px]">
        <!-- Window Dots -->
        <div class="flex items-center gap-1.5">
          
        </div>

        <button
          type="button"
          class="text-xs text-[#9da5b4] hover:text-[#d7dae0] flex items-center gap-1.5 cursor-pointer transition-colors bg-[#282c34] hover:bg-[#32363e] px-2.5 py-1 rounded-md border border-[#3e4451]"
          @click="copySnippet"
        >
          <Check v-if="isCopied" class="h-3 w-3 text-[#98c379]" />
          <Copy v-else class="h-3 w-3" />
          <span>{{ isCopied ? 'Copied!' : 'Copy Code' }}</span>
        </button>
      </div>

      <!-- Line-by-Line Code Editor View with Gutter Numbers -->
      <div class="p-4 overflow-x-auto selection:bg-[#3e4451] selection:text-white select-text">
        <div class="w-full text-xs leading-6 font-mono">
          <div
            v-for="(lineHtml, idx) in highlightedLines"
            :key="idx"
            class="flex hover:bg-[#2c313a]/50 transition-colors"
          >
            <!-- Line Number Gutter (Unselectable so copying text ignores line numbers) -->
            <span class="text-right pr-4 pl-1 text-[11px] text-[#5c6370] select-none font-mono w-10 shrink-0 border-r border-[#282c34]/80">
              {{ idx + 1 }}
            </span>
            <!-- Code Content (Smooth click & drag multi-line selection) -->
            <span
              class="pl-4 text-[#abb2bf] font-mono whitespace-pre flex-1 select-text"
              v-html="lineHtml"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
