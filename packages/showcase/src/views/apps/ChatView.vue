<script setup lang="ts">
import { onMounted } from 'vue'
import { Card } from '@/components/ui/card'
import ChatSidebar from './components/ChatSidebar.vue'
import ChatMessageThread from './components/ChatMessageThread.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

onMounted(() => {
  chatStore.loadConversations()
})
</script>

<template>
  <div class="space-y-4 w-full max-w-screen-2xl mx-auto pb-8">
    <!-- Page Header -->
    <PageHeader
      title="Messenger & Team Chat"
      description="Direct messaging and collaborative discussion threads with live presence indicators, simulated replies, and file previews."
      badge="Enterprise App"
      :statusDot="true"
    />

    <!-- Main Chat Workspace Card Container -->
    <Card flush class="border border-border/80 bg-card shadow-sm rounded-2xl overflow-hidden flex flex-col lg:flex-row h-[calc(100vh-14rem)] min-h-140">
      <!-- 1. Left Conversation Sidebar -->
      <ChatSidebar />

      <!-- 2. Right Message Stream Thread -->
      <ChatMessageThread />
    </Card>
  </div>
</template>
