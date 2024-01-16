<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSlideStore } from "~/store/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="bold text-xl mb-4">
      <Icon
        name="mdi:close-outline"
        size="20"
        class="cursor-pointer absolute top-1 left-1"
        @click="
          () => {
            store.toggle();
          }
        " />
      About the deal
    </div>
    <KanbanSlideoverLabel label-text="Name">
      <h2>
        {{ store.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Amount">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Customer">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Creation date">
      {{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>
