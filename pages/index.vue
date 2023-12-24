<script setup lang="ts">
useSeoMeta({ title: "Home | CRM System" });
import type { ICard, IColumn } from "~/components/kanban/kanban.types";

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
</script>
<template>
  <div class="p-10">
    <h1 class="font-bold test-2xl mb-10">Kanban Board</h1>
    <dir>
      <UiCard class="mb-5" draggable="true">
        <UiCardHeader role="button">
          <UiCardTitle>Nazwa</UiCardTitle>

          <UiCardDescription class="mt-2 block">
            <!-- {{
									convertCurrency(card.price)
								}} -->
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="text-xs">
          <div>Компания</div>
          <!-- {{ card.companyName }} -->
        </UiCardContent>
        <UiCardFooter>
          Date
          <!-- {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }} -->
        </UiCardFooter>
      </UiCard>
    </dir>
  </div>
</template>

<style lang="scss" scoped></style>
