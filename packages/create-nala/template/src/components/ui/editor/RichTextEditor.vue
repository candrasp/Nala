<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Check,
} from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface EditorChangePayload {
  html: string
  text: string
  characterCount: number
  wordCount: number
}

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
  hideToolbar?: boolean
  hideBubbleMenu?: boolean
  hideFooter?: boolean
  maxLength?: number
  minHeight?: string
  maxHeight?: string
  contentClass?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Write something insightful...',
  disabled: false,
  readonly: false,
  autofocus: false,
  hideToolbar: false,
  hideBubbleMenu: false,
  hideFooter: false,
  maxLength: undefined,
  minHeight: '160px',
  maxHeight: '480px',
  contentClass: '',
  class: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', payload: EditorChangePayload): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

// Popover states
const linkPopoverOpen = ref(false)
const linkUrl = ref('')
const linkOpenInNewTab = ref(true)

const imagePopoverOpen = ref(false)
const imageUrl = ref('')
const imageAlt = ref('')

const isFocused = ref(false)

const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled && !props.readonly,
  autofocus: props.autofocus,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
      codeBlock: {
        HTMLAttributes: {
          class: 'rounded-lg bg-muted/90 p-4 font-mono text-xs my-3 border border-border/70 overflow-x-auto text-foreground',
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: 'border-l-2 border-primary pl-4 italic text-muted-foreground my-3',
        },
      },
      horizontalRule: {
        HTMLAttributes: {
          class: 'my-4 border-t border-border',
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc pl-5 my-2 space-y-1',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal pl-5 my-2 space-y-1',
        },
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary underline font-medium hover:text-primary/80 transition-colors cursor-pointer',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-xl max-w-full h-auto border border-border/60 my-3 shadow-xs',
      },
    }),
    Placeholder.configure({
      placeholder: () => props.placeholder,
      emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-muted-foreground/50 before:float-left before:pointer-events-none before:h-0',
    }),
  ],
  editorProps: {
    attributes: {
      class: cn(
        'focus:outline-hidden prose prose-sm dark:prose-invert max-w-none px-4 py-3 leading-relaxed text-foreground',
        props.contentClass,
      ),
      style: `min-height: ${props.minHeight}; max-height: ${props.maxHeight}; overflow-y: auto;`,
    },
  },
  onUpdate: ({ editor: instance }) => {
    const html = instance.getHTML()
    const text = instance.getText()
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length

    emit('update:modelValue', html)
    emit('change', {
      html,
      text,
      characterCount: chars,
      wordCount: words,
    })
  },
  onFocus: ({ event }) => {
    isFocused.value = true
    emit('focus', event)
  },
  onBlur: ({ event }) => {
    isFocused.value = false
    emit('blur', event)
  },
})

// Sync external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value) return
    const isSame = editor.value.getHTML() === newVal
    if (!isSame) {
      editor.value.commands.setContent(newVal, { emitUpdate: false })
    }
  },
)

// Sync editable state
watch(
  () => [props.disabled, props.readonly],
  ([disabled, readonly]) => {
    if (!editor.value) return
    editor.value.setEditable(!disabled && !readonly)
  },
)

// Computed stats
const textContent = computed(() => editor.value?.getText() ?? '')
const charCount = computed(() => textContent.value.length)
const wordCount = computed(() => {
  const t = textContent.value.trim()
  return t ? t.split(/\s+/).length : 0
})

const isOverLimit = computed(() => {
  if (props.maxLength === undefined) return false
  return charCount.value > props.maxLength
})

// Active Heading label
const currentHeadingLabel = computed(() => {
  if (!editor.value) return 'Paragraph'
  if (editor.value.isActive('heading', { level: 1 })) return 'Heading 1'
  if (editor.value.isActive('heading', { level: 2 })) return 'Heading 2'
  if (editor.value.isActive('heading', { level: 3 })) return 'Heading 3'
  return 'Paragraph'
})

// Link popover handlers
function openLinkPopover() {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href || ''
  linkUrl.value = previousUrl
  linkOpenInNewTab.value = true
  linkPopoverOpen.value = true
}

function applyLink() {
  if (!editor.value) return
  if (!linkUrl.value.trim()) {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  } else {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: linkUrl.value.trim(),
        target: linkOpenInNewTab.value ? '_blank' : null,
      })
      .run()
  }
  linkPopoverOpen.value = false
  linkUrl.value = ''
}

function removeLink() {
  if (!editor.value) return
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  linkPopoverOpen.value = false
  linkUrl.value = ''
}

// Image popover handlers
function applyImage() {
  if (!editor.value || !imageUrl.value.trim()) return
  editor.value
    .chain()
    .focus()
    .setImage({
      src: imageUrl.value.trim(),
      alt: imageAlt.value.trim() || undefined,
    })
    .run()
  imagePopoverOpen.value = false
  imageUrl.value = ''
  imageAlt.value = ''
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// Expose editor instance for advanced parent component integrations
defineExpose({
  editor,
})
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-2xs transition-all duration-200 flex flex-col overflow-hidden',
        isFocused ? 'ring-2 ring-primary/20 border-primary/50' : 'hover:border-border/80',
        disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
        props.class,
      )
    "
  >
    <!-- ─── Main Toolbar ────────────────────────────────────────────────── -->
    <div
      v-if="!hideToolbar && editor"
      class="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-border/70 bg-muted/20 backdrop-blur-xs select-none"
    >
      <!-- History Group -->
      <Button
        variant="ghost"
        size="icon"
        type="button"
        class="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
        :disabled="!editor.can().chain().focus().undo().run()"
        title="Undo (Ctrl+Z)"
        @click="editor.chain().focus().undo().run()"
      >
        <RotateCcw class="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        class="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
        :disabled="!editor.can().chain().focus().redo().run()"
        title="Redo (Ctrl+Y)"
        @click="editor.chain().focus().redo().run()"
      >
        <RotateCw class="h-3.5 w-3.5" />
      </Button>

      <Separator orientation="vertical" class="h-4 mx-1" />

      <!-- Typography / Heading Dropdown -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            class="h-7 px-2 text-xs font-medium gap-1 text-muted-foreground hover:text-foreground"
          >
            <span>{{ currentHeadingLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="w-36">
          <DropdownMenuItem
            class="gap-2 cursor-pointer text-xs"
            :class="{ 'font-semibold text-primary': editor.isActive('paragraph') }"
            @click="editor.chain().focus().setParagraph().run()"
          >
            <Pilcrow class="h-3.5 w-3.5 text-muted-foreground" />
            <span>Paragraph</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            class="gap-2 cursor-pointer text-xs font-semibold"
            :class="{ 'text-primary': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <Heading1 class="h-3.5 w-3.5 text-muted-foreground" />
            <span>Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            class="gap-2 cursor-pointer text-xs font-semibold"
            :class="{ 'text-primary': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <Heading2 class="h-3.5 w-3.5 text-muted-foreground" />
            <span>Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            class="gap-2 cursor-pointer text-xs font-semibold"
            :class="{ 'text-primary': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <Heading3 class="h-3.5 w-3.5 text-muted-foreground" />
            <span>Heading 3</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="h-4 mx-1" />

      <!-- Inline Text Formats -->
      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('bold')"
        title="Bold (Ctrl+B)"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <Bold class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('italic')"
        title="Italic (Ctrl+I)"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <Italic class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('underline')"
        title="Underline (Ctrl+U)"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <UnderlineIcon class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('strike')"
        title="Strikethrough (Ctrl+Shift+X)"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <Strikethrough class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('code')"
        title="Inline Code"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <Code class="h-3.5 w-3.5" />
      </Toggle>

      <Separator orientation="vertical" class="h-4 mx-1" />

      <!-- Block Elements -->
      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('bulletList')"
        title="Bullet List"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <List class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('orderedList')"
        title="Numbered List"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('blockquote')"
        title="Blockquote"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <Quote class="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        class="h-7 w-7 p-0 rounded-lg"
        :pressed="editor.isActive('codeBlock')"
        title="Code Block"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <Code2 class="h-3.5 w-3.5" />
      </Toggle>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        class="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
        title="Horizontal Divider"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <Minus class="h-3.5 w-3.5" />
      </Button>

      <Separator orientation="vertical" class="h-4 mx-1" />

      <!-- Link Inserter Popover -->
      <Popover v-model:open="linkPopoverOpen">
        <PopoverTrigger as-child>
          <Toggle
            size="sm"
            class="h-7 w-7 p-0 rounded-lg"
            :pressed="editor.isActive('link')"
            title="Insert Link"
            @click="openLinkPopover"
          >
            <LinkIcon class="h-3.5 w-3.5" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent class="w-80 p-3 space-y-3" align="start">
          <div class="space-y-1">
            <h4 class="text-xs font-semibold leading-none">Hyperlink</h4>
            <p class="text-[11px] text-muted-foreground">Add a URL to the selected text</p>
          </div>
          <div class="space-y-2">
            <Label class="text-xs">Destination URL</Label>
            <Input
              v-model="linkUrl"
              placeholder="https://example.com"
              class="h-8 text-xs font-mono"
              @keydown.enter.prevent="applyLink"
            />
          </div>
          <div class="flex items-center justify-between pt-1">
            <Button
              v-if="editor.isActive('link')"
              variant="ghost"
              size="sm"
              class="h-7 text-xs text-destructive hover:text-destructive px-2"
              @click="removeLink"
            >
              <Unlink class="h-3 w-3 mr-1" />
              Remove
            </Button>
            <div class="flex items-center gap-1.5 ml-auto">
              <Button
                variant="outline"
                size="sm"
                class="h-7 text-xs px-2.5"
                @click="linkPopoverOpen = false"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                class="h-7 text-xs px-2.5 gap-1"
                @click="applyLink"
              >
                <Check class="h-3 w-3" />
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <!-- Image Inserter Popover -->
      <Popover v-model:open="imagePopoverOpen">
        <PopoverTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            class="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
            title="Insert Image by URL"
          >
            <ImageIcon class="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80 p-3 space-y-3" align="start">
          <div class="space-y-1">
            <h4 class="text-xs font-semibold leading-none">Embed Image</h4>
            <p class="text-[11px] text-muted-foreground">Insert an image via external URL</p>
          </div>
          <div class="space-y-2">
            <Label class="text-xs">Image URL</Label>
            <Input
              v-model="imageUrl"
              placeholder="https://images.unsplash.com/..."
              class="h-8 text-xs font-mono"
              @keydown.enter.prevent="applyImage"
            />
          </div>
          <div class="space-y-2">
            <Label class="text-xs">Alt Description (Optional)</Label>
            <Input
              v-model="imageAlt"
              placeholder="Descriptive image caption"
              class="h-8 text-xs"
              @keydown.enter.prevent="applyImage"
            />
          </div>
          <div class="flex items-center justify-end gap-1.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              class="h-7 text-xs px-2.5"
              @click="imagePopoverOpen = false"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              class="h-7 text-xs px-2.5 gap-1"
              :disabled="!imageUrl.trim()"
              @click="applyImage"
            >
              <Check class="h-3 w-3" />
              Insert
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        class="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive transition-colors ml-auto"
        title="Clear Formatting"
        @click="editor.chain().focus().unsetAllMarks().clearNodes().run()"
      >
        <RemoveFormatting class="h-3.5 w-3.5" />
      </Button>
    </div>

    <!-- ─── Editor Editable Canvas ──────────────────────────────────────── -->
    <EditorContent
      :editor="editor"
      class="flex-1 cursor-text"
      @click="editor?.commands.focus()"
    />

    <!-- ─── Character / Word Count & Status Footer ──────────────────────── -->
    <div
      v-if="!hideFooter"
      class="flex items-center justify-between px-3 py-1.5 border-t border-border/60 bg-muted/10 text-[11px] text-muted-foreground select-none"
    >
      <div class="flex items-center gap-2">
        <span class="font-medium">{{ wordCount }} words</span>
        <span class="text-border">•</span>
        <span :class="isOverLimit ? 'text-destructive font-semibold' : ''">
          {{ charCount }}<template v-if="maxLength !== undefined"> / {{ maxLength }}</template> characters
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <span
          v-if="isFocused"
          class="inline-flex items-center gap-1 text-primary text-[10px] font-medium"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Editing
        </span>
        <span v-else class="text-[10px]">Ready</span>
      </div>
    </div>
  </div>
</template>

<style>
/* ProseMirror Empty Placeholder styling */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-muted-foreground);
  opacity: 0.5;
  pointer-events: none;
  height: 0;
}

/* ProseMirror Focus Outline reset */
.ProseMirror:focus {
  outline: none;
}
</style>
