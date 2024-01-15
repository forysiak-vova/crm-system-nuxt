<script lang="ts" setup>
import { account } from "@/utils/appwrite";
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) authStore.set(user);
  } catch (error) {
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>
<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section class="section" v-else :class="{ grid: authStore.isAuth }">
    <LayoutSidebar v-if="authStore.isAuth" />
    <div class="kanban">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
.section {
  @media (max-width: 768px) {
    display: flex;
  }
  .kanban {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
