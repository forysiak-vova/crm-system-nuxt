<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";
import { showSidebar } from "~/store/show-sidebar";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const logOut = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  authStore.clear();
  await router.push("/login");

  isLoadingStore.set(false);
};
const sidebarShow = showSidebar();
</script>
<template>
  <aside
    :class="{ 'show-aside': sidebarShow.$state.invalideMessage }"
    class="aside px-5 py-8 bg-sidebar h-full relative w-full">
    <div class="sidebar-icon">
      <Icon
        class="icon-hide-sidebar"
        @click="
          () => {
            sidebarShow.set(false);
          }
        "
        name="mdi:close-outline"
        size="20" />
      <NuxtLink to="/" class="mb-10 block">
        <NuxtImg src="/logo.svg" alt="" width="100px" class="mx-auto" />
      </NuxtLink>
    </div>
    <button
      @click="logOut"
      class="absolute top-2 right-3 transition-colors hover:text-primary">
      <Icon name="line-md:logout" size="20" />
    </button>
    <!-- <UiButton>Send</UiButton> -->
    <LayoutMenu />
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  transition: transform 0.5s ease-in-out;
  @media (max-width: 768px) {
    transform: translateX(-100%);
    z-index: 1;
    position: absolute;
  }
  .sidebar-icon {
    display: flex;
    gap: 0.5rem;
  }
  .icon-hide-sidebar {
    cursor: pointer;
    @media (min-width: 769px) {
      display: none;
    }
  }
}
.show-aside {
  transform: translateX(0);
}
</style>
