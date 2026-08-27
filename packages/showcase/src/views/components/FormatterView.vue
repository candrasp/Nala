<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sparkles,
  Coins,
  Calendar,
  Code2,
  RefreshCw,
  Settings2,
  Binary,
} from '@lucide/vue'

const fmt = useFormatter()

// ─── Interactive Playground States ───────────────────────────────────────────
const inputNumber = ref(1250000)
const inputBytes = ref(45892150)
const inputName = ref('Olivia Martin')
const inputDate = ref(new Date().toISOString().split('T')[0])

// ─── Code Snippets (Displayed Permanently, Never Hidden) ─────────────────────
const envSnippet = `# .env / .env.example
# Global formatting defaults (1-click reconfiguration across the entire app)
VITE_DEFAULT_LOCALE=id-ID
VITE_DEFAULT_CURRENCY=IDR
VITE_DEFAULT_TIMEZONE=Asia/Jakarta
VITE_DEFAULT_TIME_FORMAT=24h    # '24h' (14:30) | '12h' (02:30 PM) | 'auto'`

const basicUsageSnippet = `<script setup lang="ts">
// Auto-imported composable — no manual import required
const fmt = useFormatter()
<\/script>

<template>
  <!-- Currency: Uses VITE_DEFAULT_CURRENCY & VITE_DEFAULT_LOCALE -->
  <p>{{ fmt.currency(1500000) }}</p>

  <!-- Number with thousand separators & compact metrics -->
  <p>{{ fmt.number(1250000) }}</p>
  <p>{{ fmt.compact(2500000) }}</p>

  <!-- Date, Time & Timezones (WIB/WITA/WIT/UTC) -->
  <p>{{ fmt.date(row.createdAt, 'long') }}</p>
  <p>{{ fmt.dateTime(row.createdAt) }}</p>
  <p>{{ fmt.relative(row.lastActive) }}</p>

  <!-- File Size & Avatar Initials -->
  <p>{{ fmt.bytes(file.size) }}</p>
  <p>{{ fmt.initials(user.name) }}</p>
</template>`

const currencySnippet = `<!-- 1. Default (follows .env: USD: $1,500.00 | IDR: Rp 1.500.000) -->
<span>{{ fmt.currency(1500000) }}</span>

<!-- 2. Multi-Currency Explicit Overrides (for SaaS / Global E-Commerce) -->
<span>{{ fmt.currency(1500, { currency: 'USD', locale: 'en-US' }) }}</span>
<span>{{ fmt.currency(1500000, { currency: 'IDR', locale: 'id-ID' }) }}</span>
<span>{{ fmt.currency(1200, { currency: 'EUR', locale: 'de-DE' }) }}</span>
<span>{{ fmt.currency(180000, { currency: 'JPY', locale: 'ja-JP' }) }}</span>`

const dateSnippet = `const now = new Date()

<!-- 1. Standard Date Formats ('short' | 'medium' | 'long' | 'full') -->
<span>{{ fmt.date(now, 'short') }}</span>   <!-- 8/21/26 or 21/08/26 -->
<span>{{ fmt.date(now, 'medium') }}</span>  <!-- Aug 21, 2026 or 21 Agt 2026 -->
<span>{{ fmt.date(now, 'long') }}</span>    <!-- August 21, 2026 or 21 Agustus 2026 -->
<span>{{ fmt.date(now, 'full') }}</span>    <!-- Friday, August 21, 2026 -->

<!-- 2. Date + Time with 24h / 12h Clock System -->
<span>{{ fmt.dateTime(now) }}</span>                        <!-- 21 Agt 2026, 14.30 (default 24h) -->
<span>{{ fmt.dateTime(now, { format: '12h' }) }}</span>     <!-- Aug 21, 2026, 02:30 PM -->

<!-- 3. Time Only (fmt.time) with 24h / 12h & Seconds -->
<span>{{ fmt.time(now) }}</span>                            <!-- 14:30 -->
<span>{{ fmt.time(now, { format: '12h' }) }}</span>         <!-- 02:30 PM -->
<span>{{ fmt.time(now, { showSeconds: true }) }}</span>     <!-- 14:30:00 -->

<!-- 4. Explicit Timezone Support (WIB, WITA, WIT, UTC) -->
<span>{{ fmt.dateTimeWithTz(now, 'Asia/Jakarta', '24h') }}</span>  <!-- WIB -->
<span>{{ fmt.dateTimeWithTz(now, 'Asia/Makassar', '24h') }}</span> <!-- WITA -->
<span>{{ fmt.dateTimeWithTz(now, 'Asia/Jayapura', '24h') }}</span> <!-- WIT -->

<!-- 5. Natural Relative Time (Locale-aware: "just now" / "baru saja") -->
<span>{{ fmt.relative(new Date(Date.now() - 30 * 1000)) }}</span>   <!-- baru saja -->
<span>{{ fmt.relative(new Date(Date.now() - 15 * 60 * 1000)) }}</span> <!-- 15 menit yang lalu -->`

const otherUtilsSnippet = `<!-- 1. Locale-aware File Storage Units (KB, MB, GB, TB) -->
<span>{{ fmt.bytes(1048576) }}</span>       <!-- 1 MB -->
<span>{{ fmt.bytes(1536, 1) }}</span>       <!-- 1.5 KB (en-US) or 1,5 KB (id-ID) -->

<!-- 2. User Initials for Avatar Fallbacks -->
<span>{{ fmt.initials('Olivia Martin') }}</span>  <!-- OM -->
<span>{{ fmt.initials('John') }}</span>           <!-- JO -->

<!-- 3. Safe String Truncation with Ellipsis -->
<span>{{ fmt.truncate('This is a very long descriptive text', 20) }}</span> <!-- This is a very long... -->`
</script>

<template>
  <div class="space-y-8 max-w-[1600px] mx-auto pb-14">
    <!-- Page Header -->
    <PageHeader
      title="Formatters & Utilities"
      description="Zero-dependency data formatting helpers powered by native browser Intl APIs. Auto-imported and globally configurable via environment variables."
      badge="Data Formatting"
      :statusDot="true"
    >
      <template #actions>
        <Badge variant="outline" class="gap-1.5 px-3 py-1 font-mono text-xs">
          <Sparkles class="h-3.5 w-3.5 text-primary" />
          useFormatter() Auto-Imported
        </Badge>
      </template>
    </PageHeader>

    <!-- ─── SECTION 1: Interactive Live Playground ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <RefreshCw class="h-4 w-4 text-primary" />
        <h2 class="text-base font-semibold tracking-tight">Interactive Live Playground</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Input Controls (5 Cols) -->
        <Card class="lg:col-span-5 shadow-sm border">
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-semibold">Test Inputs</CardTitle>
            <CardDescription class="text-xs">Edit values below to see real-time formatted output.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="numInput" class="text-xs font-medium">Numeric Value / Price</Label>
              <Input id="numInput" type="number" v-model.number="inputNumber" placeholder="1250000" />
            </div>
            <div class="space-y-1.5">
              <Label for="bytesInput" class="text-xs font-medium">File Size in Bytes</Label>
              <Input id="bytesInput" type="number" v-model.number="inputBytes" placeholder="45892150" />
            </div>
            <div class="space-y-1.5">
              <Label for="nameInput" class="text-xs font-medium">User Full Name</Label>
              <Input id="nameInput" type="text" v-model="inputName" placeholder="Olivia Martin" />
            </div>
            <div class="space-y-1.5">
              <Label for="dateInput" class="text-xs font-medium">Target Date</Label>
              <Input id="dateInput" type="date" v-model="inputDate" />
            </div>
          </CardContent>
        </Card>

        <!-- Live Formatted Output Table (7 Cols) -->
        <Card flush class="lg:col-span-7 shadow-sm border">
          <CardHeader section class="py-3 px-6">
            <CardTitle class="text-sm font-semibold flex items-center justify-between">
              <span>Formatted Output</span>
              <Badge variant="success" shape="pill" dot class="text-[11px]">Real-time Intl</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="text-xs w-48">Formatter Method</TableHead>
                  <TableHead class="text-xs">Live Output</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.currency(value)</TableCell>
                  <TableCell class="font-semibold text-primary text-sm">{{ fmt.currency(inputNumber) }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.number(value)</TableCell>
                  <TableCell class="font-medium text-sm">{{ fmt.number(inputNumber) }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.compact(value)</TableCell>
                  <TableCell class="font-medium text-sm">
                    <Badge variant="secondary">{{ fmt.compact(inputNumber) }}</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.bytes(value)</TableCell>
                  <TableCell class="font-mono text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {{ fmt.bytes(inputBytes) }}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.initials(value)</TableCell>
                  <TableCell>
                    <Badge variant="outline" class="font-bold tracking-wider font-mono">{{ fmt.initials(inputName) }}</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.date(value, 'long')</TableCell>
                  <TableCell class="text-sm font-medium">{{ fmt.date(inputDate, 'long') }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.dateTime(value)</TableCell>
                  <TableCell class="text-sm font-medium">{{ fmt.dateTime(inputDate) }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.time(value)</TableCell>
                  <TableCell class="text-sm font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {{ fmt.time(inputDate) }}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-mono text-xs text-muted-foreground">fmt.time(value, { format: '12h' })</TableCell>
                  <TableCell class="text-sm font-mono font-medium text-amber-600 dark:text-amber-400">
                    {{ fmt.time(inputDate, { format: '12h' }) }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- ─── SECTION 2: Environment Configuration ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Settings2 class="h-4 w-4 text-primary" />
        <h2 class="text-base font-semibold tracking-tight">1. Global Environment Configuration (.env)</h2>
      </div>
      <CodePreview
        title=".env Configuration"
        description="Switch currency, locale, and timezone project-wide with zero code modification."
        :code="envSnippet"
        :hide-preview="true"
      />
    </section>

    <!-- ─── SECTION 3: Composition API Usage ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Code2 class="h-4 w-4 text-primary" />
        <h2 class="text-base font-semibold tracking-tight">2. Zero-Import Quick Start (Vue 3 Composition API)</h2>
      </div>
      <CodePreview
        title="Basic Usage in Vue Components"
        description="Call useFormatter() anywhere in <script setup> or directly in templates."
        :code="basicUsageSnippet"
        :hide-preview="true"
      />
    </section>

    <!-- ─── SECTION 4: Currency Formats ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Coins class="h-4 w-4 text-amber-500" />
        <h2 class="text-base font-semibold tracking-tight">3. Currency Formatting & Multi-Currency Overrides</h2>
      </div>
      <CodePreview
        title="Currency Methods"
        description="Supports IDR (Rp), USD ($), EUR (€), JPY (¥), GBP (£), and any ISO 4217 currency."
        :code="currencySnippet"
        :hide-preview="true"
      />
    </section>

    <!-- ─── SECTION 5: Date, Time & Timezones ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Calendar class="h-4 w-4 text-blue-500" />
        <h2 class="text-base font-semibold tracking-tight">4. Dates, Times & Timezones (WIB, WITA, WIT, UTC)</h2>
      </div>
      <CodePreview
        title="Date & Time Methods"
        description="Full date styles ('short' | 'medium' | 'long' | 'full'), timezone conversion, and relative time."
        :code="dateSnippet"
        :hide-preview="true"
      />
    </section>

    <!-- ─── SECTION 6: Byte Sizes, Initials & Strings ─── -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Binary class="h-4 w-4 text-emerald-500" />
        <h2 class="text-base font-semibold tracking-tight">5. File Sizes, Avatar Initials & Text Helpers</h2>
      </div>
      <CodePreview
        title="Utility Helpers"
        description="Format byte sizes with locale-aware decimals, extract avatar initials, and truncate strings."
        :code="otherUtilsSnippet"
        :hide-preview="true"
      />
    </section>
  </div>
</template>
