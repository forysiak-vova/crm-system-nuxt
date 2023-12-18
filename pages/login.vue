<script lang="ts" setup>
// useHead({
//   title: "Login | CRM System",
// });
useSeoMeta({
  title: "Login | CRM System",
});
// useServerSeoMeta({
//   title: "Login | CRM System",
// });
const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/2 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <UiInput
          v-model="emailRef"
          placeholder="email"
          type="email"
          class="mb-3" />
        <UiInput
          v-model="passwordRef"
          placeholder="password"
          type="password"
          class="mb-3" />
        <UiInput
          v-model="nameRef"
          placeholder="name"
          type="name"
          class="mb-3" />
        <div class="flex items-center justify-center gap-5">
          <UiButton type="button">Login</UiButton>
          <UiButton type="button">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
