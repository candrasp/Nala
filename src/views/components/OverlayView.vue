<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
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
} from '@lucide/vue'

const isRightSheetOpen = ref(false)
const isLeftSheetOpen = ref(false)
const filterMinConnections = ref('10')
const filterMaxLatency = ref('50')
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Component Showcase</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Overlays & Drawers</h1>
        <p class="text-sm text-muted-foreground">
          Slideover sheets, contextual popovers, dropdown action menus, and floating tooltips.
        </p>
      </div>
    </div>

    <!-- 1. Slideover Sheets -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Slideover Sheets & Drawers</CardTitle>
        <CardDescription>
          Side-anchored drawer panels for multi-step editing, notifications, or deep configuration.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap items-center gap-3">
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
                Adjust hardware resource limits and compute compute profiles on the fly.
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
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>

    <!-- 2. Popovers & Tooltips -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Popover Card -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Contextual Popovers</CardTitle>
          <CardDescription>
            Floating panel containing rich controls like filter parameters or color pickers.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <div class="pt-2 flex justify-end">
                <Button size="sm" class="w-full text-xs">Apply Filter</Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <!-- Tooltip Card -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Floating Tooltips</CardTitle>
          <CardDescription>
            Accessible keyboard-friendly helper hints with smooth pop-in transitions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div class="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" size="icon" class="h-8 w-8">
                    <Info class="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Read replica point-in-time synchronization</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" size="icon" class="h-8 w-8">
                    <HelpCircle class="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Encrypted SSL TLS 1.3 certificate status</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger as-child>
                  <Button size="sm" variant="secondary" class="gap-1.5">
                    <Sparkles class="h-3.5 w-3.5" />
                    Hover me
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Instant tooltip with zero delay</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>

    <!-- 3. Dropdown Menus -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Dropdown Action Menus</CardTitle>
        <CardDescription>
          Nested menus with keyboard shortcut badges, separators, and destructive action highlights.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap items-center gap-3">
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
              <span>Billing & Plan</span>
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
      </CardContent>
    </Card>
  </div>
</template>
