<script setup lang="ts">
import {
  Mail,
  Globe,
  Database,
  Key,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  UploadCloud,
  File,
  X,
  Plus,
  Minus,
  CheckCircle2,
  ChevronsUpDown,
  Search,
  Server,
  Zap,
  Shield,
} from '@lucide/vue'

// ─── 1. Text Inputs & Basic States ────────────────────────────────────────────
const showPassword = ref(false)
const emailInput = ref('developer@supabase.io')
const passwordInput = ref('supabase-secret-key-2026')
const projectSlug = ref('supabase-cloud-eu')
const selectedRegion = ref('eu-central-1')
const selectedDatabase = ref('pg-16')
const enableBackups = ref(true)
const enable2FA = ref(false)
const enableTelemetry = ref(false)
const bioInput = ref('Full-stack engineer building fast, real-time apps with Vue 3, Supabase, and Tailwind v4.')
const selectedTerms = ref(true)
const selectedNewsletter = ref(false)
const isSubmitting = ref(false)
const isSaved = ref(false)

// ─── 2. Radio Group States ───────────────────────────────────────────────────
const selectedPlan = ref<'starter' | 'pro' | 'enterprise'>('pro')
const selectedNotificationFreq = ref('daily')

// ─── 3. Sliders & Stepper States ─────────────────────────────────────────────
const storageSlider = ref<number[]>([128]) // in GB
const memorySlider = ref<number[]>([8]) // in GB
const clusterNodes = ref(3) // 1 to 32

const clampNodes = (val: number) => {
  clusterNodes.value = Math.max(1, Math.min(32, val))
}

// ─── 4. Combobox (Searchable Select) ─────────────────────────────────────────
const isComboboxOpen = ref(false)
const comboboxSearch = ref('')
const selectedFramework = ref('vue')

const frameworks = [
  { value: 'vue', label: 'Vue.js 3', category: 'Frontend', badge: 'Recommended' },
  { value: 'nuxt', label: 'Nuxt 3', category: 'Full-stack', badge: 'SSR' },
  { value: 'vite', label: 'Vite Plugin', category: 'Tooling', badge: 'Fast' },
  { value: 'react', label: 'React 19', category: 'Frontend', badge: 'Library' },
  { value: 'nextjs', label: 'Next.js 15', category: 'Full-stack', badge: 'SSR' },
  { value: 'svelte', label: 'Svelte 5', category: 'Frontend', badge: 'Compiler' },
  { value: 'astro', label: 'Astro 4', category: 'Static Site', badge: 'Content' },
]

const filteredFrameworks = computed(() => {
  if (!comboboxSearch.value) return frameworks
  return frameworks.filter((f) =>
    f.label.toLowerCase().includes(comboboxSearch.value.toLowerCase()) ||
    f.category.toLowerCase().includes(comboboxSearch.value.toLowerCase())
  )
})

const selectedFrameworkLabel = computed(() => {
  return frameworks.find((f) => f.value === selectedFramework.value)?.label || 'Select framework...'
})

// ─── 5. Multi-Select Tags ────────────────────────────────────────────────────
const tags = ref(['PostgreSQL', 'Redis', 'GraphQL', 'Tailwind CSS'])
const tagInput = ref('')

const addTag = (val: string) => {
  const trimmed = val.trim()
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed)
  }
  tagInput.value = ''
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

// ─── 6. File Upload / Drop Zone ──────────────────────────────────────────────
interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  progress: number
  status: 'uploading' | 'complete'
}

const uploadedFiles = ref<UploadedFile[]>([
  {
    id: '1',
    name: 'production_schema.sql',
    size: '2.4 MB',
    type: 'sql',
    progress: 100,
    status: 'complete',
  },
])

const isDragging = ref(false)

const handleFileDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    processFiles(Array.from(files))
  }
}

const handleFileInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    processFiles(Array.from(target.files))
  }
}

const processFiles = (files: File[]) => {
  files.forEach((file) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.name.split('.').pop() || 'file',
      progress: 0,
      status: 'uploading',
    }
    uploadedFiles.value.push(newFile)

    // Simulate progress
    const interval = setInterval(() => {
      newFile.progress += 25
      if (newFile.progress >= 100) {
        newFile.progress = 100
        newFile.status = 'complete'
        clearInterval(interval)
      }
    }, 250)
  })
}

const removeUploadedFile = (id: string) => {
  uploadedFiles.value = uploadedFiles.value.filter((f) => f.id !== id)
}

function handleSave() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
    }, 2500)
  }, 800)
}

// ─── Code Documentation Snippets ─────────────────────────────────────────────
const textInputsSnippet = `<!-- Input with Leading Icon -->
<div class="space-y-1.5">
  <Label for="email">Email Address</Label>
  <InputGroup>
    <InputIcon><Mail class="h-4 w-4 text-muted-foreground" /></InputIcon>
    <Input id="email" v-model="email" type="email" placeholder="name@example.com" class="pl-9" />
  </InputGroup>
</div>

<!-- Password with Visibility Toggle -->
<div class="space-y-1.5">
  <Label for="password">Project Secret Key</Label>
  <InputGroup>
    <InputIcon><Key class="h-4 w-4 text-muted-foreground" /></InputIcon>
    <Input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" class="pl-9 pr-10 font-mono text-xs" />
    <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
      <EyeOff v-if="showPassword" class="h-4 w-4" />
      <Eye v-else class="h-4 w-4" />
    </button>
  </InputGroup>
</div>

<!-- Prefix & Suffix URL Addon -->
<div class="space-y-1.5">
  <Label for="slug">Custom Domain / Subdomain</Label>
  <InputGroup>
    <InputAddon side="left">https://</InputAddon>
    <Input id="slug" v-model="slug" placeholder="my-project" class="rounded-none border-x-0" />
    <InputAddon side="right">.supabase.co</InputAddon>
  </InputGroup>
</div>`

const selectsTextareaSnippet = `<!-- Accessible Select Dropdown -->
<div class="space-y-1.5">
  <Label for="region">Database Region</Label>
  <Select v-model="selectedRegion">
    <SelectTrigger id="region">
      <div class="flex items-center gap-2">
        <Globe class="h-3.5 w-3.5 text-muted-foreground" />
        <SelectValue placeholder="Select region" />
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Europe</SelectLabel>
        <SelectItem value="eu-central-1">Frankfurt (eu-central-1)</SelectItem>
        <SelectItem value="eu-west-1">Ireland (eu-west-1)</SelectItem>
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>North America</SelectLabel>
        <SelectItem value="us-east-1">N. Virginia (us-east-1)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>

<!-- Textarea -->
<div class="space-y-1.5">
  <Label for="bio">Project Description</Label>
  <Textarea id="bio" v-model="bio" rows="4" placeholder="Describe your project architecture..." />
</div>`

const radioGroupSnippet = `<!-- Interactive Plan Radio Cards -->
<RadioGroup v-model="selectedPlan" class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <label
    for="plan-pro"
    class="relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50"
    :class="selectedPlan === 'pro' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border bg-card'"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <Zap class="h-4 w-4 text-primary" />
          <span class="font-semibold text-sm text-foreground">Pro Scale</span>
          <span class="rounded-full bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.2 text-[10px] font-semibold">Popular</span>
        </div>
        <p class="text-xs text-muted-foreground">Production databases with automatic scaling.</p>
      </div>
      <RadioGroupItem id="plan-pro" value="pro" class="mt-0.5" />
    </div>
    <div class="mt-4 pt-3 border-t border-border/60 flex items-baseline gap-1">
      <span class="text-xl font-bold font-mono text-foreground">$25</span>
      <span class="text-xs text-muted-foreground">/ month</span>
    </div>
  </label>
</RadioGroup>`

const slidersStepperSnippet = `<!-- Range Slider -->
<div class="space-y-3">
  <div class="flex items-center justify-between">
    <Label class="text-sm font-medium">NVMe Disk Storage</Label>
    <span class="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{{ storage[0] }} GB</span>
  </div>
  <Slider v-model="storage" :min="10" :max="1024" :step="10" class="w-full" />
</div>

<!-- Number Stepper -->
<div class="flex items-center gap-2 max-w-xs">
  <Button variant="outline" size="icon" class="h-9 w-9" :disabled="nodes <= 1" @click="nodes--">
    <Minus class="h-4 w-4" />
  </Button>
  <Input v-model.number="nodes" class="h-9 text-center font-mono font-bold" />
  <Button variant="outline" size="icon" class="h-9 w-9" :disabled="nodes >= 32" @click="nodes++">
    <Plus class="h-4 w-4" />
  </Button>
</div>`

const comboboxUploadSnippet = `<!-- Searchable Combobox -->
<Popover v-model:open="isComboboxOpen">
  <PopoverTrigger as-child>
    <button type="button" role="combobox" class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent/40">
      <span class="font-medium text-foreground">{{ selectedFrameworkLabel }}</span>
      <ChevronsUpDown class="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
    </button>
  </PopoverTrigger>
  <PopoverContent class="w-80 p-0 shadow-lg" align="start">
    <div class="flex items-center border-b border-border px-3 py-2">
      <Search class="mr-2 h-4 w-4 text-muted-foreground" />
      <input v-model="comboboxSearch" placeholder="Search framework..." class="flex h-8 w-full bg-transparent text-xs outline-none" />
    </div>
    <div class="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
      <button v-for="item in filtered" :key="item.value" @click="selected = item.value; isComboboxOpen = false" class="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs hover:bg-accent">
        <span>{{ item.label }}</span>
        <span class="text-[10px] font-mono bg-muted/60 px-1.5 py-0.5 rounded">{{ item.category }}</span>
      </button>
    </div>
  </PopoverContent>
</Popover>

<!-- Drag & Drop File Upload Zone -->
<div class="relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer flex flex-col items-center justify-center border-muted-foreground/25 hover:border-primary/60 bg-muted/10">
  <input type="file" multiple class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
  <div class="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
    <UploadCloud class="h-5 w-5" />
  </div>
  <p class="text-sm font-semibold text-foreground"><span class="text-primary hover:underline">Click to upload</span> or drag and drop</p>
  <p class="text-xs text-muted-foreground mt-0.5">SQL, JSON, CSV, or PDF schemas (up to 10MB each)</p>
</div>`

const datePickerSnippet = `<!-- Zero-dependency Date & Range Selector -->
<DatePicker />`

const switchesCheckboxesSnippet = `<!-- Switches -->
<div class="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-muted/20">
  <div class="space-y-0.5">
    <Label for="backup-switch" class="text-sm font-medium cursor-pointer">Daily Automated Backups</Label>
    <p class="text-xs text-muted-foreground">Create point-in-time recovery snapshots every 24 hours.</p>
  </div>
  <Switch id="backup-switch" v-model="enableBackups" />
</div>

<!-- Checkboxes -->
<div class="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/20">
  <Checkbox id="terms" v-model="selectedTerms" class="mt-1" />
  <div class="space-y-0.5">
    <Label for="terms" class="text-sm font-medium cursor-pointer">Accept Platform Terms of Service</Label>
    <p class="text-xs text-muted-foreground">By checking this box, you agree to our Enterprise SLA.</p>
  </div>
</div>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Form & Inputs"
      description="Comprehensive controls suite: text inputs, custom selects, radio groups, sliders, comboboxes, tags, and file upload with live preview & copyable code snippets."
      badge="UI Component"
    >
      <template #actions>
        <Button size="sm" :disabled="isSubmitting" @click="handleSave" class="gap-1.5">
          <Check v-if="isSaved" class="h-3.5 w-3.5" />
          <Sparkles v-else class="h-3.5 w-3.5" />
          {{ isSaved ? 'Saved Successfully' : isSubmitting ? 'Saving Changes...' : 'Save Configuration' }}
        </Button>
      </template>
    </PageHeader>

    <!-- 1. Text Inputs & Icon Affixes -->
    <CodePreview
      title="Text Inputs & Icon Affixes"
      description="Inputs with leading/trailing icons, password toggle, prefix/suffix addons, and readonly states."
      :code="textInputsSnippet"
    >
      <div class="max-w-2xl space-y-4">
        <!-- Leading Icon -->
        <div class="space-y-1.5">
          <Label for="email">Email Address</Label>
          <InputGroup>
            <InputIcon><Mail class="h-4 w-4 text-muted-foreground" /></InputIcon>
            <Input
              id="email"
              v-model="emailInput"
              type="email"
              placeholder="name@example.com"
              class="pl-9"
            />
          </InputGroup>
          <p class="text-xs text-muted-foreground">We will never share your email with third parties.</p>
        </div>

        <!-- Password with Toggle Visibility -->
        <div class="space-y-1.5">
          <Label for="password">Project Secret Key</Label>
          <InputGroup>
            <InputIcon><Key class="h-4 w-4 text-muted-foreground" /></InputIcon>
            <Input
              id="password"
              v-model="passwordInput"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password..."
              class="pl-9 pr-10 font-mono text-xs"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
              aria-label="Toggle password visibility"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </InputGroup>
        </div>

        <!-- Prefix URL Addon Group -->
        <div class="space-y-1.5">
          <Label for="slug">Custom Domain / Subdomain</Label>
          <InputGroup>
            <InputAddon side="left">
              https://
            </InputAddon>
            <Input
              id="slug"
              v-model="projectSlug"
              type="text"
              placeholder="my-project"
              class="rounded-none border-x-0"
            />
            <InputAddon side="right">
              .supabase.co
            </InputAddon>
          </InputGroup>
        </div>

        <!-- Disabled & Readonly State -->
        <div class="space-y-1.5">
          <Label for="readonly">Project ID (Immutable)</Label>
          <Input
            id="readonly"
            value="prj_eu_fra_9876241a"
            readonly
            disabled
            class="font-mono text-xs bg-muted/40 cursor-not-allowed"
          />
        </div>
      </div>
    </CodePreview>

    <!-- 2. Selects & Textarea -->
    <CodePreview
      title="Select Dropdowns & Textarea"
      description="Custom accessible Select primitives and auto-scaling multi-line textareas."
      :code="selectsTextareaSnippet"
    >
      <div class="max-w-2xl space-y-4">
        <!-- Region Select -->
        <div class="space-y-1.5">
          <Label for="region">Database Region</Label>
          <Select v-model="selectedRegion">
            <SelectTrigger id="region">
              <div class="flex items-center gap-2">
                <Globe class="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Select region" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="eu-central-1">Frankfurt (eu-central-1)</SelectItem>
                <SelectItem value="eu-west-1">Ireland (eu-west-1)</SelectItem>
                <SelectItem value="eu-west-2">London (eu-west-2)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="us-east-1">N. Virginia (us-east-1)</SelectItem>
                <SelectItem value="us-west-1">Oregon (us-west-1)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia Pacific</SelectLabel>
                <SelectItem value="ap-southeast-1">Singapore (ap-southeast-1)</SelectItem>
                <SelectItem value="ap-northeast-1">Tokyo (ap-northeast-1)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Engine Select -->
        <div class="space-y-1.5">
          <Label for="db">PostgreSQL Version</Label>
          <Select v-model="selectedDatabase">
            <SelectTrigger id="db">
              <div class="flex items-center gap-2">
                <Database class="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Select engine" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pg-16">PostgreSQL 16.3 (Latest Stable)</SelectItem>
              <SelectItem value="pg-15">PostgreSQL 15.6</SelectItem>
              <SelectItem value="pg-14">PostgreSQL 14.11 (LTS)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Textarea -->
        <div class="space-y-1.5">
          <Label for="bio">Project Description</Label>
          <Textarea
            id="bio"
            v-model="bioInput"
            rows="4"
            placeholder="Describe your project architecture..."
          />
          <p class="text-xs text-muted-foreground">Max 250 characters. Markdown supported.</p>
        </div>
      </div>
    </CodePreview>

    <!-- 3. Radio Group & Card Selectors -->
    <CodePreview
      title="Radio Group & Card Selectors"
      description="Interactive single-choice radio selections formatted as styled cards and traditional inline radios."
      :code="radioGroupSnippet"
    >
      <div class="space-y-6">
        <!-- Interactive Plan Cards (Radio Group) -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Subscription Tier</Label>
          <RadioGroup v-model="selectedPlan" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Starter Plan Card -->
            <label
              for="plan-starter"
              class="relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50"
              :class="selectedPlan === 'starter' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border bg-card'"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <Server class="h-4 w-4 text-muted-foreground" />
                    <span class="font-semibold text-sm text-foreground">Starter</span>
                  </div>
                  <p class="text-xs text-muted-foreground">For hobbyists and proof-of-concept apps.</p>
                </div>
                <RadioGroupItem id="plan-starter" value="starter" class="mt-0.5" />
              </div>
              <div class="mt-4 pt-3 border-t border-border/60 flex items-baseline gap-1">
                <span class="text-xl font-bold font-mono">$0</span>
                <span class="text-xs text-muted-foreground">/ month</span>
              </div>
            </label>

            <!-- Pro Plan Card -->
            <label
              for="plan-pro"
              class="relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50"
              :class="selectedPlan === 'pro' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border bg-card'"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <Zap class="h-4 w-4 text-primary" />
                    <span class="font-semibold text-sm text-foreground">Pro Scale</span>
                    <span class="rounded-full bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.2 text-[10px] font-semibold">
                      Popular
                    </span>
                  </div>
                  <p class="text-xs text-muted-foreground">Production databases with automatic scaling.</p>
                </div>
                <RadioGroupItem id="plan-pro" value="pro" class="mt-0.5" />
              </div>
              <div class="mt-4 pt-3 border-t border-border/60 flex items-baseline gap-1">
                <span class="text-xl font-bold font-mono text-foreground">$25</span>
                <span class="text-xs text-muted-foreground">/ month</span>
              </div>
            </label>

            <!-- Enterprise Card -->
            <label
              for="plan-enterprise"
              class="relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50"
              :class="selectedPlan === 'enterprise' ? 'border-primary bg-primary/5 shadow-xs' : 'border-border bg-card'"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <Shield class="h-4 w-4 text-muted-foreground" />
                    <span class="font-semibold text-sm text-foreground">Enterprise</span>
                  </div>
                  <p class="text-xs text-muted-foreground">Dedicated clusters, custom SLA &amp; HIPAA compliance.</p>
                </div>
                <RadioGroupItem id="plan-enterprise" value="enterprise" class="mt-0.5" />
              </div>
              <div class="mt-4 pt-3 border-t border-border/60 flex items-baseline gap-1">
                <span class="text-xl font-bold font-mono">$599</span>
                <span class="text-xs text-muted-foreground">/ month</span>
              </div>
            </label>
          </RadioGroup>
        </div>

        <!-- Standard Inline Radio List -->
        <div class="space-y-2 border-t border-border pt-4">
          <Label class="text-sm font-medium">Notification Digest Frequency</Label>
          <RadioGroup v-model="selectedNotificationFreq" class="flex flex-wrap items-center gap-6 pt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="freq-realtime" value="realtime" />
              <Label for="freq-realtime" class="cursor-pointer text-sm font-normal">Real-time alerts</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="freq-daily" value="daily" />
              <Label for="freq-daily" class="cursor-pointer text-sm font-normal">Daily summary digest</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="freq-weekly" value="weekly" />
              <Label for="freq-weekly" class="cursor-pointer text-sm font-normal">Weekly rollup</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </CodePreview>

    <!-- 4. Sliders, Stepper & Multi-Tags -->
    <CodePreview
      title="Range Sliders & Number Steppers"
      description="Hardware-smooth slider inputs, bounded numerical counters, and dismissible tag chip collections."
      :code="slidersStepperSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sliders -->
        <div class="space-y-6 p-4 rounded-lg border border-border bg-muted/10">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label class="text-sm font-medium">NVMe Disk Storage</Label>
              <span class="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {{ storageSlider[0] }} GB
              </span>
            </div>
            <Slider
              v-model="storageSlider"
              :min="10"
              :max="1024"
              :step="10"
              class="w-full"
            />
            <div class="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>10 GB</span>
              <span>512 GB</span>
              <span>1024 GB (1 TB)</span>
            </div>
          </div>

          <div class="space-y-3 border-t border-border pt-4">
            <div class="flex items-center justify-between">
              <Label class="text-sm font-medium">Dedicated RAM Allocation</Label>
              <span class="font-mono text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded-md">
                {{ memorySlider[0] }} GB RAM
              </span>
            </div>
            <Slider
              v-model="memorySlider"
              :min="2"
              :max="64"
              :step="2"
              class="w-full"
            />
            <div class="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>2 GB</span>
              <span>16 GB</span>
              <span>64 GB</span>
            </div>
          </div>
        </div>

        <!-- Stepper & Tags -->
        <div class="space-y-6 p-4 rounded-lg border border-border bg-muted/10">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label class="text-sm font-medium">Cluster Worker Nodes</Label>
              <span class="text-xs text-muted-foreground">Min 1, Max 32</span>
            </div>
            <div class="flex items-center gap-2 max-w-xs">
              <Button
                type="button"
                variant="outline"
                size="icon"
                class="h-9 w-9 shrink-0"
                :disabled="clusterNodes <= 1"
                @click="clampNodes(clusterNodes - 1)"
              >
                <Minus class="h-4 w-4" />
              </Button>
              <Input
                type="number"
                v-model.number="clusterNodes"
                @blur="clampNodes(clusterNodes)"
                class="h-9 text-center font-mono font-bold"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                class="h-9 w-9 shrink-0"
                :disabled="clusterNodes >= 32"
                @click="clampNodes(clusterNodes + 1)"
              >
                <Plus class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Multi-Select Tags Input -->
          <div class="space-y-2 border-t border-border pt-4">
            <Label class="text-sm font-medium">Extension Tags</Label>
            <div class="min-h-11 p-1.5 rounded-md border border-input bg-background flex flex-wrap items-center gap-1.5 focus-within:ring-1 focus-within:ring-ring">
              <!-- Rendered tag chips -->
              <span
                v-for="(tag, idx) in tags"
                :key="tag"
                class="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md font-medium"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(idx)"
                  class="text-muted-foreground hover:text-foreground cursor-pointer ml-0.5"
                >
                  <X class="h-3 w-3" />
                </button>
              </span>

              <!-- Tag text input -->
              <input
                v-model="tagInput"
                @keydown.enter.prevent="addTag(tagInput)"
                @keydown="e => e.key === ',' && (e.preventDefault(), addTag(tagInput))"
                placeholder="Add tag and press Enter..."
                class="flex-1 min-w-32 bg-transparent px-2 py-1 text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
            <p class="text-[11px] text-muted-foreground">Type a tag name and hit Enter or comma to insert.</p>
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 5. Searchable Combobox & File Drop Zone -->
    <CodePreview
      title="Searchable Combobox & File Upload"
      description="Autocomplete select dropdown with search filtering, alongside drag-and-drop file upload with simulated progress."
      :code="comboboxUploadSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Searchable Combobox -->
        <div class="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
          <div class="space-y-1.5">
            <Label>Primary Framework</Label>
            <Popover v-model:open="isComboboxOpen">
              <PopoverTrigger as-child>
                <button
                  type="button"
                  role="combobox"
                  class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent/40 focus:outline-none focus:ring-1 focus:ring-ring transition-colors cursor-pointer"
                >
                  <span class="font-medium text-foreground">{{ selectedFrameworkLabel }}</span>
                  <ChevronsUpDown class="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent class="w-80 p-0 shadow-lg" align="start">
                <div class="flex items-center border-b border-border px-3 py-2">
                  <Search class="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    v-model="comboboxSearch"
                    placeholder="Search framework or library..."
                    class="flex h-8 w-full rounded-md bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div class="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                  <div
                    v-if="filteredFrameworks.length === 0"
                    class="p-4 text-center text-xs text-muted-foreground"
                  >
                    No framework found for "{{ comboboxSearch }}".
                  </div>
                  <button
                    v-for="item in filteredFrameworks"
                    :key="item.value"
                    type="button"
                    @click="selectedFramework = item.value; isComboboxOpen = false; comboboxSearch = ''"
                    class="w-full flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-left"
                    :class="{ 'bg-accent font-semibold text-foreground': selectedFramework === item.value }"
                  >
                    <div class="flex items-center gap-2">
                      <Check
                        class="h-3.5 w-3.5"
                        :class="selectedFramework === item.value ? 'opacity-100 text-primary' : 'opacity-0'"
                      />
                      <span>{{ item.label }}</span>
                    </div>
                    <span class="text-[10px] text-muted-foreground font-mono bg-muted/60 px-1.5 py-0.5 rounded">
                      {{ item.category }}
                    </span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <p class="text-xs text-muted-foreground">Select your stack runtime for targeted SDK compilation.</p>
          </div>
        </div>

        <!-- Drag & Drop File Upload Zone -->
        <div class="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
          <div class="flex items-center justify-between">
            <Label class="text-sm font-medium">Schema Upload</Label>
            <span class="label-mono text-[10px]">MAX 10 MB</span>
          </div>
          <div
            class="relative rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center"
            :class="[
              isDragging
                ? 'border-primary bg-primary/10 scale-[0.99]'
                : 'border-muted-foreground/25 hover:border-primary/60 hover:bg-muted/30 bg-muted/10'
            ]"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
          >
            <input
              type="file"
              multiple
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              @change="handleFileInputChange"
            />
            <div class="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
              <UploadCloud class="h-5 w-5" />
            </div>
            <p class="text-sm font-semibold text-foreground">
              <span class="text-primary hover:underline">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-muted-foreground mt-0.5">
              SQL, JSON, CSV, or PDF schemas (up to 10MB each)
            </p>
          </div>

          <!-- Uploaded Files List -->
          <div v-if="uploadedFiles.length > 0" class="space-y-2 pt-1">
            <div
              v-for="file in uploadedFiles"
              :key="file.id"
              class="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card text-xs shadow-2xs"
            >
              <div class="flex items-center gap-2.5 truncate max-w-xs">
                <div class="h-7 w-7 rounded bg-muted flex items-center justify-center shrink-0">
                  <File class="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div class="truncate">
                  <p class="font-medium text-foreground truncate">{{ file.name }}</p>
                  <p class="text-[10px] text-muted-foreground font-mono">{{ file.size }}</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div v-if="file.status === 'uploading'" class="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                  <div class="bg-primary h-full transition-all duration-300" :style="{ width: `${file.progress}%` }"></div>
                </div>
                <CheckCircle2 v-else class="h-4 w-4 text-emerald-500 shrink-0" />
                <button
                  type="button"
                  @click="removeUploadedFile(file.id)"
                  class="p-1 text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                >
                  <X class="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 6. Date & Range Pickers -->
    <CodePreview
      title="Date & Range Pickers"
      description="Zero-dependency single date picker and range selection component with integrated presets."
      :code="datePickerSnippet"
    >
      <DatePicker />
    </CodePreview>

    <!-- 7. Switches & Checkboxes -->
    <CodePreview
      title="Switches & Checkbox Options"
      description="Interactive toggle controls and multi-state checkboxes with descriptive helper text."
      :code="switchesCheckboxesSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Switches list -->
        <div class="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
          <div class="flex items-center justify-between gap-4">
            <div class="space-y-0.5">
              <Label for="backup-switch" class="text-sm font-medium cursor-pointer">Daily Automated Backups</Label>
              <p class="text-xs text-muted-foreground">Create point-in-time recovery snapshots every 24 hours.</p>
            </div>
            <Switch id="backup-switch" v-model="enableBackups" />
          </div>

          <div class="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div class="space-y-0.5">
              <Label for="twofa-switch" class="text-sm font-medium cursor-pointer">Two-Factor Authentication (2FA)</Label>
              <p class="text-xs text-muted-foreground">Enforce hardware key or TOTP app during sign in.</p>
            </div>
            <Switch id="twofa-switch" v-model="enable2FA" />
          </div>

          <div class="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div class="space-y-0.5">
              <Label for="telemetry-switch" class="text-sm font-medium cursor-pointer">Anonymous Telemetry</Label>
              <p class="text-xs text-muted-foreground">Help improve platform performance by sharing diagnostic metrics.</p>
            </div>
            <Switch id="telemetry-switch" v-model="enableTelemetry" />
          </div>
        </div>

        <!-- Checkboxes list -->
        <div class="space-y-4 rounded-lg border border-border p-4 bg-muted/20">
          <div class="flex items-start gap-3">
            <Checkbox id="terms" v-model="selectedTerms" class="mt-1" />
            <div class="space-y-0.5">
              <Label for="terms" class="text-sm font-medium cursor-pointer">
                Accept Platform Terms of Service
              </Label>
              <p class="text-xs text-muted-foreground">
                By checking this box, you agree to our Enterprise SLA and Acceptable Use Policy.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 border-t border-border pt-4">
            <Checkbox id="newsletter" v-model="selectedNewsletter" class="mt-1" />
            <div class="space-y-0.5">
              <Label for="newsletter" class="text-sm font-medium cursor-pointer">
                Product &amp; Security Changelogs
              </Label>
              <p class="text-xs text-muted-foreground">
                Receive monthly email updates about new database extensions and security patches.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 border-t border-border pt-4 opacity-50">
            <Checkbox id="disabled-chk" :model-value="true" disabled class="mt-1" />
            <div class="space-y-0.5">
              <Label for="disabled-chk" class="text-sm font-medium cursor-not-allowed">
                SSL / TLS 1.3 Encryption (Mandatory)
              </Label>
              <p class="text-xs text-muted-foreground">
                Transport layer encryption cannot be disabled for production clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CodePreview>
  </div>
</template>

