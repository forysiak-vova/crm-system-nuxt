<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { invalideMessageStore } from "~/store/auth.store";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Field } from "vee-validate";
// useHead({
//   title: "Login | CRM System",
// });
useSeoMeta({
  title: "Login | CRM System",
});
// useServerSeoMeta({
//   title: "Login | CRM System",
// });

interface loginData {
  emailData: string;
  passwordData: string;
}

const schema = toTypedSchema(
  z.object({
    emailData: z
      .string()
      .email({ message: "Must be a valid email" })
      .min(5, { message: "Too short" })
      .max(30, { message: "Too long" }),
    passwordData: z.string().min(8, { message: "Too short" }),
  })
);

const { handleSubmit, defineField, handleReset, values, errors } =
  useForm<loginData>({
    validationSchema: schema,
  });

const [emailData, emailDataAttrs] = defineField("emailData");
const [passwordData, passworDataAttrs] = defineField("passwordData");

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
    const e = JSON.parse(JSON.stringify(error));
    useMessageStore.set(e.response.message);
  } finally {
    isLoadingStore.set(false);
  }

  const response = await account.get();
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
};
const onSubmit = handleSubmit((values) => {
  login();
});
</script>

<template>
  <div class="flex gap-1 justify-end absolute top-3 right-3">
    <button
      class="text-xs bg-[#202937] px-2 hover:bg-[#354359] activeBtn"
      @click="() => router.push('/login')">
      Sign in
    </button>
    <button
      class="text-xs bg-[#202937] px-2 hover:bg-[#354359]"
      @click="() => router.push('/register')">
      Sign up
    </button>
  </div>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/2 p-5 max-w-2xl">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <div class="text-red-500 mb-1">{{ useMessageStore.invalideMessage }}</div>
      <form @submit="onSubmit">
        <Field
          v-model="emailData"
          placeholder="email"
          type="text"
          v-bind="emailDataAttrs"
          name="emailData"
          class="input" />
        <div class="text-xs mb-2 text-red-500">{{ errors.emailData }}</div>
        <Field
          v-model="passwordData"
          placeholder="password"
          type="password"
          name="passwordData"
          v-bind="passworDataAttrs"
          class="input" />
        <div class="text-xs mb-2 text-red-500">{{ errors.passwordData }}</div>
        <div class="flex items-center justify-center gap-5">
          <UiButton type="submit">Login</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activeBtn {
  background-color: #a252c8;
}
.input {
  @apply mb-3 border-[#161c26] placeholder:text-[#748092] focus:border-border transition-colors flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50;
}
</style>
