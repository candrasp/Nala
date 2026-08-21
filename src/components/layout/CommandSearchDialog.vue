<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Palette,
  Type,
  Sparkles,
  Binary,
  MousePointerClick,
  Tag,
  Layers,
  FormInput,
  Table2,
  AreaChart,
  AppWindow,
  SlidersHorizontal,
  BellDot,
  BellRing,
  Compass,
  FileCode2,
  FileQuestion,
  ServerCrash,
  ShieldAlert,
  LogIn,
  UserRound,
  KeyRound,
  ScanLine,
  LockKeyhole,
  MailCheck,
  Settings,
  Search,
  ExternalLink,
} from '@lucide/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SearchItem {
  title: string
  href: string
  icon: any
  category: string
}

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const router = useRouter()
const searchQuery = ref('')

const searchItems: SearchItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard, category: 'Overview' },
  { title: 'User Management', href: '/users', icon: Users, category: 'Overview' },
  { title: 'GitHub Repository', href: 'https://github.com/candrasp/Nala', icon: ExternalLink, category: 'Links' },
  { title: 'Color Tokens', href: '/components/colors', icon: Palette, category: 'Design System' },
  { title: 'Typography', href: '/components/typography', icon: Type, category: 'Design System' },
  { title: 'Icon Directory', href: '/components/icons', icon: Sparkles, category: 'Design System' },
  { title: 'Formatters & Utils', href: '/components/formatters', icon: Binary, category: 'Design System' },
  { title: 'Buttons', href: '/components/buttons', icon: MousePointerClick, category: 'UI Components' },
  { title: 'Badges & Avatars', href: '/components/badges', icon: Tag, category: 'UI Components' },
  { title: 'Cards & Surfaces', href: '/components/cards', icon: Layers, category: 'UI Components' },
  { title: 'Form & Inputs', href: '/components/forms', icon: FormInput, category: 'UI Components' },
  { title: 'Data Tables', href: '/components/tables', icon: Table2, category: 'UI Components' },
  { title: 'Charts & Analytics', href: '/components/charts', icon: AreaChart, category: 'UI Components' },
  { title: 'Modals & Dialogs', href: '/components/modals', icon: AppWindow, category: 'UI Components' },
  { title: 'Overlays & Drawers', href: '/components/overlays', icon: SlidersHorizontal, category: 'UI Components' },
  { title: 'Toast & Alerts', href: '/components/toasts', icon: BellDot, category: 'UI Components' },
  { title: 'Feedback & Loading', href: '/components/feedback', icon: BellRing, category: 'UI Components' },
  { title: 'Navigation & Flow', href: '/components/navigation', icon: Compass, category: 'UI Components' },
  { title: 'Blank Starter Page', href: '/starter/blank', icon: FileCode2, category: 'Pages' },
  { title: '404 Not Found Page', href: '/errors/404', icon: FileQuestion, category: 'Pages' },
  { title: '500 Server Error Page', href: '/errors/500', icon: ServerCrash, category: 'Pages' },
  { title: '403 Access Denied', href: '/errors/403', icon: ShieldAlert, category: 'Pages' },
  { title: 'Login', href: '/auth/login', icon: LogIn, category: 'Auth' },
  { title: 'Register', href: '/auth/register', icon: UserRound, category: 'Auth' },
  { title: 'Forgot Password', href: '/auth/forgot-password', icon: KeyRound, category: 'Auth' },
  { title: 'Verify OTP', href: '/auth/verify-otp', icon: ScanLine, category: 'Auth' },
  { title: 'Reset Password', href: '/auth/reset-password', icon: LockKeyhole, category: 'Auth' },
  { title: 'Confirm Email', href: '/auth/confirm-email', icon: MailCheck, category: 'Auth' },
  { title: 'Settings', href: '/settings', icon: Settings, category: 'System' },
]

const filteredSearchItems = computed(() => {
  if (!searchQuery.value) return searchItems
  return searchItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const navigateTo = (href: string) => {
  emit('update:open', false)
  searchQuery.value = ''
  if (href.startsWith('http')) {
    window.open(href, '_blank', 'noopener,noreferrer')
  } else {
    router.push(href)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="p-0 w-[calc(100%-2rem)] sm:w-full max-w-lg overflow-hidden gap-0 top-16 sm:top-20 translate-y-0">
      <DialogHeader class="sr-only">
        <DialogTitle>Quick Search</DialogTitle>
        <DialogDescription>Search pages and commands in Nala admin</DialogDescription>
      </DialogHeader>
      <div class="flex items-center border-b border-border px-3">
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          v-model="searchQuery"
          placeholder="Type a command or search page..."
          class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div class="max-h-75 overflow-y-auto p-2">
        <div v-if="filteredSearchItems.length === 0" class="py-6 text-center text-sm text-muted-foreground">
          No results found for "{{ searchQuery }}".
        </div>
        <div v-else class="space-y-1">
          <div class="px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
            Navigation & Pages
          </div>
          <button
            v-for="item in filteredSearchItems"
            :key="item.href"
            @click="navigateTo(item.href)"
            class="w-full flex items-center justify-between rounded-md px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
          >
            <div class="flex items-center gap-2">
              <component :is="item.icon" class="h-4 w-4 text-muted-foreground" />
              <span>{{ item.title }}</span>
            </div>
            <span class="text-[11px] text-muted-foreground">{{ item.category }}</span>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
