<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { invalideMessageStore } from "~/store/auth.store";
// useHead({
//   title: "Login | CRM System",
// });
useSeoMeta({
  title: "Login | CRM System",
});
// useServerSeoMeta({
//   title: "Login | CRM System",
// });

const toogleInUp = ref(true);

const { handleSubmit, defineField, handleReset, values, errors } = useForm();

const [emailData, emailDataAttrs] = defineField("emailData");
const [passwordData, priceDataAttrs] = defineField("passwordData");
const [nameData, NameDataAttrs] = defineField("nameData");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();
const useMessageStore = invalideMessageStore();

const login = async () => {
  isLoadingStore.set(true);
  try {
    await account.createEmailSession(values.emailData, values.passwordData);
    useMessageStore.clear();
  } catch (error) {
    const e = JSON.stringify(error);
    const invalidEmail = "Invalid `email` param";
    const invalidPassword = "Invalid `password` param";
    const tryAgain = "Please try again after some time";
    if (e.includes(invalidEmail)) useMessageStore.set(invalidEmail);
    if (e.includes(invalidPassword)) useMessageStore.set(invalidPassword);
    if (e.includes(tryAgain)) useMessageStore.set(tryAgain);
    isLoadingStore.set(false);
  }

  const response = await account.get();
  console.log("response", response.status);
  try {
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }
  } catch (e) {
    console.log("e", e);
  }

  await router.push("/");

  isLoadingStore.set(false);
};
const register = async () => {
  await account.create(
    uuid(),
    values.emailData,
    values.passwordData,
    values.nameData
  );
  await login();
};
</script>

<template>
  <div class="flex gap-1 justify-end absolute top-3 right-3">
    <button
      :class="{ activeBtn: toogleInUp }"
      class="text-xs bg-[#202937] px-2 hover:bg-[#354359]"
      @click="() => (toogleInUp = true)">
      Sign in
    </button>
    <button
      :class="{ activeBtn: !toogleInUp }"
      class="text-xs bg-[#202937] px-2 hover:bg-[#354359]"
      @click="() => (toogleInUp = false)">
      Sign up
    </button>
  </div>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/2 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <div class="text-red-500 mb-1">{{ useMessageStore.invalideMessage }}</div>
      <form>
        <UiInput
          v-model="emailData"
          placeholder="email"
          type="email"
          class="mb-3" />
        <UiInput
          v-model="passwordData"
          placeholder="password"
          type="password"
          class="mb-3" />
        <UiInput
          v-if="!toogleInUp"
          v-model="nameData"
          placeholder="name"
          type="name"
          class="mb-3" />
        <div class="flex items-center justify-center gap-5">
          <UiButton v-if="toogleInUp" type="button" @click="login"
            >Login</UiButton
          >
          <UiButton v-else type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activeBtn {
  background-color: #a252c8;
}
</style>
