<script setup lang="ts">
/**
 * Blank Page Template
 *
 * Vue reactivity (ref, computed, watch, onMounted, useRoute, useRouter, ...)
 * dan UI components (Button, Card, CardContent, CardHeader, CardTitle, Input, Badge, ...)
 * sudah AUTO-IMPORTED — tidak perlu tulis import apa pun untuk itu.
 *
 * Hanya Lucide icons yang perlu di-import secara eksplisit:
 * import { Plus, Search } from '@lucide/vue'
 */
import { Plus } from '@lucide/vue'

// State contoh — bisa diganti sesuai kebutuhan
const searchQuery = ref('')
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- ─── Page Header ────────────────────────────────────────────── -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">Page Title</h1>
        <p class="text-sm text-muted-foreground mt-0.5">Short description of this page.</p>
      </div>
      <Button size="sm" class="gap-1.5 shrink-0">
        <Plus class="h-3.5 w-3.5" />
        New Item
      </Button>
    </div>

    <!-- ─── Main Content Card ─────────────────────────────────────── -->
    <Card class="overflow-hidden py-0 gap-0">
      <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
        <div>
          <CardTitle class="text-base font-semibold">Section Title</CardTitle>
        </div>
        <Input v-model="searchQuery" placeholder="Search..." class="h-8 w-56 text-xs" />
      </CardHeader>
      <CardContent class="p-6">
        <!-- Content goes here -->
        <p class="text-sm text-muted-foreground">Your content here.</p>
      </CardContent>
    </Card>
  </div>
</template>
