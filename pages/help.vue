<script setup>
import { showSidebar } from "~/store/show-sidebar";

const setSidebarTrue = showSidebar();
</script>

<template>
  <div class="p-5 md:p-10">
    <div class="top-help-page">
      <Icon
        class="icon-show-sidebar"
        @click="
          () => {
            setSidebarTrue.set(true);
          }
        "
        name="uil:align"
        size="20" />
      <h1 class="font-bold text-2xl mb-10">Help Center</h1>
    </div>
    <h2 class="font-bold text-1.5xl mb-5">How to use the Kanban Board:</h2>
    <ul class="m-0 p-0 list-none">
      <li class="mb-3">
        <p class="font-bold text-lg">1. Adding a new task</p>
        <p class="text-xs mb-2">
          The first step is to add a new task on your Kanban Board, which is
          located on the home page. To do this, follow these steps:
        </p>
        <p class="text-xs">a. Click on the plus button</p>
        <p class="text-xs">b. Fill in all fields</p>
        <p class="text-xs">c. Click the add button</p>
        <p class="text-xs mt-2">
          After entering this information, the task card will be automatically
          created
        </p>
      </li>
      <li class="mb-3">
        <p class="font-bold text-lg">2.Moving cards between stages</p>
        <p class="text-xs">
          When you are ready to proceed with a given task, move the card to the
          appropriate category, reflecting the current stage of work
        </p>
      </li>
      <li class="mb-3">
        <p class="font-bold text-lg">3. Creating a customer</p>
        <p class="text-xs">
          Client is created automatically at the time of task creation and is
          available on the clients' site.
        </p>
      </li>
      <li class="mb-3">
        <p class="font-bold text-lg">4.Task card</p>
        <p class="text-xs">
          When you click about on the task tab, you'll get task details and an
          opportunity to leave a comment
        </p>
      </li>
    </ul>
    <h2 class="font-bold text-1.5xl mb-5">Assistance and support:</h2>
    <p>
      If you have questions or encounter problems, please contact at the email
      address provided
      <a href="mailto:volodja.forus@gmail.com">volodja.forus@gmail.com</a>
    </p>
  </div>
</template>
<style lang="scss" scoped>
.top-help-page {
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
</style>
