<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, DollarSign, Activity, CreditCard, TrendingUp } from '@lucide/vue'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Subscriptions',
    value: '+2,350',
    change: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: CreditCard,
  },
  {
    title: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
    icon: Activity,
  },
]

const recentSales = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
  { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
]
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p class="text-muted-foreground text-sm">Welcome back to your analytics and activity hub.</p>
      </div>
      <Button class="gap-2">
        <TrendingUp class="h-4 w-4" />
        Download Report
      </Button>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title" class="shadow-sm">
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground mt-1">{{ stat.change }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Detailed Section Grid -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-1 md:col-span-2 lg:col-span-4 shadow-sm">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>System performance and user registrations for current period.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-72 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 text-muted-foreground">
            [ Chart Component Placeholder ]
          </div>
        </CardContent>
      </Card>

      <Card class="col-span-1 md:col-span-2 lg:col-span-3 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="sale in recentSales"
              :key="sale.email"
              class="flex items-center justify-between"
            >
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">{{ sale.name }}</p>
                <p class="text-xs text-muted-foreground">{{ sale.email }}</p>
              </div>
              <div class="font-semibold text-sm">{{ sale.amount }}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
