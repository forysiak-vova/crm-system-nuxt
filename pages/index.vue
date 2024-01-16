<script setup lang="ts">
import CreateDeal from "@/components/kanban/CreateDeal.vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { convertCurrency } from "@/utils/convertCurrency";
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/vue-query";
import { useDealSlideStore } from "~/store/deal-slide.store";
import type { EnumStatus } from "~/types/deals.types";
import { showSidebar } from "~/store/show-sidebar";

useSeoMeta({ title: "Home | CRM System" });

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    }),
  onSuccess: () => {
    refetch();
  },
});

const { mutate: deleteCardMutation } = useMutation({
  mutationKey: ["delete card"],
  mutationFn: (id: string) => DB.deleteDocument(DB_ID, COLLECTION_DEALS, id),
  onSuccess: () => {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
function deleteDeal(id: string) {
  deleteCardMutation(id);
}
const setSidebarTrue = showSidebar();
onMounted(() => {
  console.log("data", data);
});
</script>
<template>
  <div class="kanban-section p-5 md:p-10">
    <div class="top-kanban">
      <Icon
        class="icon-show-sidebar"
        @click="
          () => {
            setSidebarTrue.set(true);
          }
        "
        name="uil:align"
        size="20" />
      <h1 class="font-bold test-2xl mb-10">Kanban Board</h1>
    </div>
    <div v-if="isLoading">Loadind...</div>
    <div v-else>
      <div class="grid-section">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="drop-sektion">
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)">
            {{ column.name }}
          </div>
          <div>
            <CreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-5 relative"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)">
              <Icon
                @click="deleteDeal(card.id)"
                class="absolute top-2 right-2 hover:text-[#a252c8] cursor-pointer"
                name="ion:trash-a" />
              <UiCardHeader>
                <UiCardTitle>
                  {{ card.name }}
                </UiCardTitle>
                <UiCardDescription class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">
                <div>Company</div>
                <div>{{ card.companyName }}</div>
              </UiCardContent>
              <UiCardFooter>
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </UiCardFooter>
              <UiCardMore role="button" @click="store.set(card)" />
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-section {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  @media (min-width: 1350px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1450px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1550px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1700px) {
    grid-template-columns: repeat(5, 1fr);
  }
  .drop-sektion {
    min-height: 10rem;
    @media (min-width: 1700px) {
      min-height: 100vh;
    }
  }
}
.kanban-section {
  .top-kanban {
    display: flex;
    align-items: center;
    gap: 1rem;
    @media (max-width: 768px) {
      margin-bottom: 0.75rem;
    }
    h1 {
      @media (max-width: 768px) {
        margin: 0 !important;
      }
    }
    .icon-show-sidebar {
      cursor: pointer;
      @media (min-width: 769px) {
        display: none;
      }
    }
  }
}
</style>
