<script setup lang="ts">
/**
 * Blank Page Template
 *
 * Vue reactivity (ref, computed, watch, onMounted, useRoute, useRouter, ...)
 * and UI components (Button, Card, CardContent, CardHeader, CardTitle, PageHeader, Input, Badge, ...)
 * are AUTO-IMPORTED — no need to write imports for them.
 *
 * Only Lucide icons need to be imported explicitly:
 * import { Plus, Search } from '@lucide/vue'
 */
import { Plus } from '@lucide/vue'

// Example reactive state
const searchQuery = ref('')
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- ─── Page Header ────────────────────────────────────────────── -->
    <PageHeader
      title="Page Title"
      description="Short description of this page."
    >
      <template #actions>
        <Button size="sm" class="gap-1.5 shrink-0">
          <Plus class="h-3.5 w-3.5" />
          New Item
        </Button>
      </template>
    </PageHeader>

    <!-- ─── Main Content Card ─────────────────────────────────────── -->
    <Card flush>
      <CardHeader section class="flex flex-row items-center justify-between">
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
