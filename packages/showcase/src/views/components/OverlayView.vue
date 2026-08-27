<script setup lang="ts">
import { ref } from 'vue'
import {
  SlidersHorizontal,
  Info,
  HelpCircle,
  Settings,
  User,
  CreditCard,
  LogOut,
  Sparkles,
  PanelRight,
  PanelLeft,
  CalendarDays,
  Shield,
  Activity,
  Layers,
  GitFork,
  Star,
  Circle,
} from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const isRightSheetOpen = ref(false)
const isLeftSheetOpen = ref(false)
const filterMinConnections = ref('10')
const bookmarksChecked = ref(true)
const urlsChecked = ref(false)
const selectedPerson = ref('pedro')

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
const filterMaxLatency = ref('50')

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const tooltipsSnippet = `<!-- Tooltip Positions: top, right, bottom, left -->
<TooltipProvider>
  <div class="flex flex-wrap items-center gap-3">
    <!-- Top -->
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="sm">Top Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tooltip on top</p>
      </TooltipContent>
    </Tooltip>

    <!-- Right -->
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="sm">Right Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Tooltip on right side</p>
      </TooltipContent>
    </Tooltip>

    <!-- Bottom -->
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="sm">Bottom Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Tooltip on bottom</p>
      </TooltipContent>
    </Tooltip>

    <!-- Left -->
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="sm">Left Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip on left side</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`

const popoverSnippet = `<!-- Contextual Popover with Form Controls -->
<Popover>
  <PopoverTrigger as-child>
    <Button variant="outline" size="sm" class="gap-1.5">
      <SlidersHorizontal class="h-3.5 w-3.5" />
      Query Filter Options
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-80 p-4 space-y-3" align="start">
    <div class="space-y-1">
      <h4 class="text-xs font-semibold text-foreground">Filter Metric Queries</h4>
      <p class="text-[11px] text-muted-foreground">Set threshold filters for telemetry data.</p>
    </div>
    <div class="space-y-2 pt-1">
      <div class="space-y-1">
        <Label for="min-conn" class="text-xs">Min Connections</Label>
        <Input id="min-conn" v-model="filterMinConnections" class="h-8 text-xs font-mono" />
      </div>
      <div class="space-y-1">
        <Label for="max-lat" class="text-xs">Max Latency (ms)</Label>
        <Input id="max-lat" v-model="filterMaxLatency" class="h-8 text-xs font-mono" />
      </div>
    </div>
    <div class="pt-2">
      <Button size="sm" class="w-full text-xs">Apply Filter</Button>
    </div>
  </PopoverContent>
</Popover>`

const hoverCardSnippet = `<!-- Hover Card for Rich Profile / Entity Previews -->
<HoverCard>
  <HoverCardTrigger as-child>
    <Button variant="link" class="p-0 h-auto font-semibold text-primary">
      @candrasp
    </Button>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80" />
        <AvatarFallback>CP</AvatarFallback>
      </Avatar>
      <div class="space-y-1 flex-1">
        <h4 class="text-sm font-semibold">Candra Pratama</h4>
        <p class="text-xs text-muted-foreground">
          Core Maintainer of Nala Template. Building modern Vue 3 &amp; Tailwind ecosystems.
        </p>
        <div class="flex items-center pt-2 text-[11px] text-muted-foreground">
          <CalendarDays class="mr-1.5 h-3.5 w-3.5 opacity-70" />
          <span>Joined August 2024</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`

const sheetsSnippet = `<!-- Slideover Sheet Panels (Right & Left) -->
<div class="flex items-center gap-3">
  <!-- Right Drawer -->
  <Sheet v-model:open="isRightSheetOpen">
    <SheetTrigger as-child>
      <Button class="gap-1.5">
        <PanelRight class="h-3.5 w-3.5" />
        Open Right Drawer
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="sm:max-w-md flex flex-col p-0">
      <SheetHeader class="p-6 pb-2 border-b border-border">
        <SheetTitle>Database Scaling Configuration</SheetTitle>
        <SheetDescription>
          Adjust hardware resource limits and compute profiles on the fly.
        </SheetDescription>
      </SheetHeader>

      <div class="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
        <div class="space-y-1.5">
          <Label for="cpu-core">Dedicated vCPU Cores</Label>
          <Input id="cpu-core" value="8 Cores (AMD EPYC™)" readonly class="bg-muted/30" />
        </div>
        <div class="space-y-1.5">
          <Label for="ram-size">Memory Allocation</Label>
          <Input id="ram-size" value="32 GB ECC High-Bandwidth" readonly class="bg-muted/30" />
        </div>
      </div>

      <SheetFooter class="p-4 border-t border-border bg-muted/20">
        <SheetClose as-child>
          <Button variant="outline">Close Panel</Button>
        </SheetClose>
        <Button>Apply Scaling</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>

  <!-- Left Drawer -->
  <Sheet v-model:open="isLeftSheetOpen">
    <SheetTrigger as-child>
      <Button variant="outline" class="gap-1.5">
        <PanelLeft class="h-3.5 w-3.5" />
        Open Left Drawer
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="sm:max-w-sm">
      <SheetHeader>
        <SheetTitle>Quick Tools</SheetTitle>
        <SheetDescription>
          Utility drawer anchored to the left viewport edge.
        </SheetDescription>
      </SheetHeader>
      <div class="py-4 space-y-2 text-xs text-muted-foreground">
        <p>Auxiliary navigation hierarchies, SQL snippets, or audit history.</p>
      </div>
    </SheetContent>
  </Sheet>
</div>`

const dropdownSnippet = `<!-- Dropdown Action Menus with Keyboard Shortcuts -->
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline" class="gap-2">
      <User class="h-3.5 w-3.5" />
      Account Settings
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56" align="start">
    <DropdownMenuLabel>My Developer Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem class="cursor-pointer text-xs">
      <User class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
      <span>Profile Settings</span>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem class="cursor-pointer text-xs">
      <CreditCard class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
      <span>Billing &amp; Plan</span>
      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem class="cursor-pointer text-xs">
      <Settings class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
      <span>API Tokens</span>
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem class="cursor-pointer text-xs text-destructive focus:text-destructive">
      <LogOut class="mr-2 h-3.5 w-3.5" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

const contextMenuSnippet = `<!-- Context Menu triggered by Right Click -->
<ContextMenu>
  <ContextMenuTrigger class="flex h-36 w-full items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground bg-muted/20 select-none">
    Right click inside this area to open Context Menu
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem inset>
      Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset disabled>
      Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset>
      Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent class="w-48">
        <ContextMenuItem>Save Page As... <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
        <ContextMenuItem>Name Window...</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Developer Tools</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem v-model:checked="bookmarksChecked">
      Show Bookmarks Bar <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem v-model:checked="urlsChecked">
      Show Full URLs
    </ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup v-model="selectedPerson">
      <ContextMenuLabel inset>People</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
      <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`

const scrollAreaSnippet = `<!-- Scroll Area with custom styled slim scrollbar -->
<ScrollArea class="h-72 w-full rounded-md border border-border p-4">
  <div class="p-1">
    <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Release Tags</h4>
    <div v-for="tag in tags" :key="tag" class="text-xs py-1.5 border-b border-border/40 last:border-0">
      {{ tag }}
    </div>
  </div>
</ScrollArea>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Overlays & Drawers"
      description="Slideover sheets, contextual popovers, floating tooltips, rich hover cards, and dropdown action menus."
      badge="Component Showcase"
    />

    <!-- 1. Tooltips (All Four Positions) -->
    <CodePreview
      title="Tooltips (All Four Positions)"
      description="Contextual helper hints positioned on top, right, bottom, or left with smooth animated pop-in transitions."
      :code="tooltipsSnippet"
    >
      <TooltipProvider>
        <div class="flex flex-wrap items-center gap-3">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="sm" class="gap-1.5">
                <Info class="h-3.5 w-3.5 text-primary" />
                Top Position
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Replica sync latency: 12ms (eu-central-1)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="sm" class="gap-1.5">
                <Shield class="h-3.5 w-3.5 text-emerald-500" />
                Right Position
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>TLS 1.3 Strict Encrypted Traffic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="sm" class="gap-1.5">
                <Sparkles class="h-3.5 w-3.5 text-amber-500" />
                Bottom Position
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Zero-delay instant tooltip hint</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="sm" class="gap-1.5">
                <HelpCircle class="h-3.5 w-3.5 text-muted-foreground" />
                Left Position
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Press Ctrl+K to open search palette</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </CodePreview>

    <!-- 2. Popover with Rich Content -->
    <CodePreview
      title="Contextual Popover"
      description="Floating overlay panel containing interactive form controls, filter options, and parameter adjustments."
      :code="popoverSnippet"
    >
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="sm" class="gap-1.5">
            <SlidersHorizontal class="h-3.5 w-3.5" />
            Query Filter Options
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80 p-4 space-y-3" align="start">
          <div class="space-y-1">
            <h4 class="text-xs font-semibold text-foreground">Filter Metric Queries</h4>
            <p class="text-[11px] text-muted-foreground">Set threshold filters for telemetry data.</p>
          </div>
          <div class="space-y-2 pt-1">
            <div class="space-y-1">
              <Label for="min-conn" class="text-xs">Min Connections</Label>
              <Input id="min-conn" v-model="filterMinConnections" class="h-8 text-xs font-mono" />
            </div>
            <div class="space-y-1">
              <Label for="max-lat" class="text-xs">Max Latency (ms)</Label>
              <Input id="max-lat" v-model="filterMaxLatency" class="h-8 text-xs font-mono" />
            </div>
          </div>
          <div class="pt-2">
            <Button size="sm" class="w-full text-xs">Apply Filter</Button>
          </div>
        </PopoverContent>
      </Popover>
    </CodePreview>

    <!-- 3. Hover Card -->
    <CodePreview
      title="Hover Card"
      description="Rich profile and entity preview overlay triggered on hover with customizable delay and popover animations."
      :code="hoverCardSnippet"
    >
      <div class="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <span>
          Created by
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="link" class="p-0 h-auto font-semibold text-primary underline">
                @candrasp
              </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
              <div class="flex justify-between space-x-4">
                <Avatar class="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80" />
                  <AvatarFallback>CP</AvatarFallback>
                </Avatar>
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-semibold text-foreground">Candra Pratama</h4>
                    <span class="status-dot"></span>
                  </div>
                  <p class="text-xs text-muted-foreground">
                    Core Maintainer of Nala Template. Crafting elegant Vue 3 &amp; Tailwind ecosystems.
                  </p>
                  <div class="flex items-center pt-2 text-[11px] text-muted-foreground">
                    <CalendarDays class="mr-1.5 h-3.5 w-3.5 opacity-70" />
                    <span>Joined August 2024</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </span>

        <span>
          Infrastructure on
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="link" class="p-0 h-auto font-semibold text-primary underline">
                PostgreSQL 16 Cluster
              </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="label-mono">Database Cluster</span>
                  <Badge variant="outline" class="text-[10px] text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Active</Badge>
                </div>
                <h4 class="text-sm font-semibold text-foreground">eu-central-1 Primary</h4>
                <p class="text-xs text-muted-foreground">
                  High-availability replica pool with automatic failover and WAL point-in-time recovery.
                </p>
                <div class="pt-1 flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
                  <span class="flex items-center gap-1"><Activity class="h-3 w-3 text-emerald-500" /> 99.99%</span>
                  <span class="flex items-center gap-1"><Layers class="h-3 w-3 text-primary" /> 3 Replicas</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </span>

        <span>
          Built for
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="link" class="p-0 h-auto font-semibold text-primary underline">
                candrasp/Nala
              </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80 space-y-2.5">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-bold text-foreground">candrasp / Nala</h4>
                  <Badge variant="outline" class="text-[10px] font-mono">Public</Badge>
                </div>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Enterprise-grade Vue 3, Vite, TypeScript, and Tailwind CSS v4 admin template.
                </p>
              </div>
              <div class="flex items-center gap-4 text-[11px] text-muted-foreground pt-1 border-t">
                <div class="flex items-center gap-1">
                  <Circle class="h-2.5 w-2.5 fill-emerald-500 text-emerald-500" />
                  <span>Vue (94.2%)</span>
                </div>
                <div class="flex items-center gap-1">
                  <Star class="h-3 w-3 text-amber-500 fill-amber-500" />
                  <span>1.4k</span>
                </div>
                <div class="flex items-center gap-1">
                  <GitFork class="h-3 w-3 text-muted-foreground" />
                  <span>280</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </span>
      </div>
    </CodePreview>

    <!-- 4. Slideover Sheet Panels (Left & Right) -->
    <CodePreview
      title="Slideover Sheet Panels (Left & Right)"
      description="Viewport-docked drawer panels for deep configuration flows, notification feeds, or auxiliary navigation."
      :code="sheetsSnippet"
    >
      <div class="flex flex-wrap items-center gap-3">
        <!-- Right Drawer -->
        <Sheet v-model:open="isRightSheetOpen">
          <SheetTrigger as-child>
            <Button class="gap-1.5">
              <PanelRight class="h-3.5 w-3.5" />
              Open Right Drawer
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="sm:max-w-md flex flex-col p-0">
            <SheetHeader class="p-6 pb-2 border-b border-border">
              <SheetTitle>Database Scaling Configuration</SheetTitle>
              <SheetDescription>
                Adjust hardware resource limits and compute profiles on the fly.
              </SheetDescription>
            </SheetHeader>

            <div class="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div class="space-y-1.5">
                <Label for="cpu-core">Dedicated vCPU Cores</Label>
                <Input id="cpu-core" value="8 Cores (AMD EPYC™)" readonly class="bg-muted/30" />
              </div>
              <div class="space-y-1.5">
                <Label for="ram-size">Memory Allocation</Label>
                <Input id="ram-size" value="32 GB ECC High-Bandwidth" readonly class="bg-muted/30" />
              </div>
              <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                <span class="label-mono">Cost Estimation</span>
                <p class="text-sm font-semibold text-foreground">$0.128 / Compute Hour</p>
                <p class="text-muted-foreground">Billed monthly with per-second granularity.</p>
              </div>
            </div>

            <SheetFooter class="p-4 border-t border-border bg-muted/20">
              <SheetClose as-child>
                <Button variant="outline">Close Panel</Button>
              </SheetClose>
              <Button>Apply Scaling</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <!-- Left Drawer -->
        <Sheet v-model:open="isLeftSheetOpen">
          <SheetTrigger as-child>
            <Button variant="outline" class="gap-1.5">
              <PanelLeft class="h-3.5 w-3.5" />
              Open Left Drawer
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Quick Tools</SheetTitle>
              <SheetDescription>
                Utility drawer anchored to the left viewport edge.
              </SheetDescription>
            </SheetHeader>
            <div class="py-4 space-y-2 text-xs text-muted-foreground">
              <p>Useful for auxiliary navigational hierarchies, SQL snippet libraries, or audit history.</p>
            </div>
            <SheetFooter class="pt-4">
              <SheetClose as-child>
                <Button variant="outline" class="w-full">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </CodePreview>

    <!-- 5. Dropdown Action Menus -->
    <CodePreview
      title="Dropdown Action Menus"
      description="Nested popup menus with icons, label groupings, dividers, and keyboard shortcut indicators."
      :code="dropdownSnippet"
    >
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="gap-2">
            <User class="h-3.5 w-3.5" />
            Account Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="start">
          <DropdownMenuLabel>My Developer Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer text-xs">
            <User class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Profile Settings</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer text-xs">
            <CreditCard class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Billing &amp; Plan</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer text-xs">
            <Settings class="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>API Tokens</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer text-xs text-destructive focus:text-destructive">
            <LogOut class="mr-2 h-3.5 w-3.5" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CodePreview>

    <!-- 6. Context Menu Primitive -->
    <CodePreview
      title="Context Menu"
      description="Displays a menu to the user — triggered by a right-click or long-press."
      :code="contextMenuSnippet"
    >
      <ContextMenu>
        <ContextMenuTrigger class="flex h-36 w-full items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground bg-muted/20 hover:bg-muted/30 transition-colors select-none">
          <div class="text-center space-y-1">
            <div class="font-medium text-foreground">Right click inside this area</div>
            <div class="text-[11px] text-muted-foreground">Context menu with submenus, checkboxes &amp; shortcuts</div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem v-model:checked="bookmarksChecked">
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem v-model:checked="urlsChecked">
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup v-model="selectedPerson">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </CodePreview>

    <!-- 7. Scroll Area Primitive -->
    <CodePreview
      title="Scroll Area"
      description="Augments native scroll with custom cross-browser styling and smooth scrollbars."
      :code="scrollAreaSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Vertical Scroll Area -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Vertical Scroll</div>
          <ScrollArea class="h-64 w-full rounded-md border border-border p-4 bg-card">
            <div class="space-y-1">
              <h4 class="mb-3 text-xs font-semibold text-foreground">Release Tags</h4>
              <div v-for="tag in tags" :key="tag" class="text-xs py-1.5 border-b border-border/40 last:border-0 font-mono text-muted-foreground hover:text-foreground transition-colors">
                {{ tag }}
              </div>
            </div>
          </ScrollArea>
        </div>

        <!-- Horizontal Scroll Area -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Horizontal Scroll</div>
          <ScrollArea class="w-full whitespace-nowrap rounded-md border border-border p-4 bg-card" orientation="horizontal">
            <div class="flex w-max space-x-3 p-1">
              <div
                v-for="i in 10"
                :key="i"
                class="w-36 shrink-0 rounded-lg border border-border bg-muted/20 p-3 space-y-1.5"
              >
                <div class="h-16 rounded-md bg-muted/60 flex items-center justify-center text-xs font-mono text-muted-foreground">
                  Card {{ i }}
                </div>
                <div class="text-xs font-semibold text-foreground">Module Item #{{ i }}</div>
                <div class="text-[11px] text-muted-foreground">Horizontal scroll demo</div>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
