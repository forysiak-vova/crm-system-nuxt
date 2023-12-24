<script setup lang="ts">
useSeoMeta({ title: "Home | CRM System" });
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();
</script>
<template>
  <div class="p-10">
    <h1 class="font-bold test-2xl mb-10">Kanban Board</h1>
    <div v-if="isLoading">Loadind...</div>
    <div v-else>
      <UiCard class="mb-5" draggable="true">
        <UiCardHeader role="button">
          <UiCardTitle>Name</UiCardTitle>

          <UiCardDescription class="mt-2 block"> </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="text-xs">
          <div>Company</div>
        </UiCardContent>
        <UiCardFooter> Date </UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
