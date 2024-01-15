<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { defineProps } from "vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "~/types/deals.types";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Field } from "vee-validate";

const isOpenForm = ref(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});

const schema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, { message: "Too short" })
      .max(20, { message: "Too long" }),
    price: z.number().min(1, { message: "Too short" }),
    customer: z.object({
      email: z.string().email({ message: "Must be a valid email" }),
      name: z
        .string()
        .min(2, { message: "Too short" })
        .max(20, { message: "Too long" }),
    }),
  })
);

const { handleSubmit, defineField, handleReset, values, errors } =
  useForm<IDealFormState>({
    validationSchema: schema,
    initialValues: {
      status: props.status,
    },
  });

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) => {
    const newData = { ...data, status: props.status };
    return DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), newData);
  },

  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
      @click="isOpenForm = !isOpenForm">
      <Icon
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="35" />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="35" />
    </button>
  </div>
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <Field
      placeholder="Name"
      name="name"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      :class="{ 'is-in-valid': errors.name }"
      class="input" />
    <div class="text-xs mb-2 text-red-500">{{ errors.name }}</div>

    <Field
      placeholder="Price"
      name="price"
      v-model.number="price"
      v-bind="priceAttrs"
      type="text"
      :class="{ 'is-in-valid': errors.price }"
      class="input" />
    <div class="text-xs mb-2 text-red-500">{{ errors.price }}</div>
    <Field
      placeholder="Email"
      name="customerEmail"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      :class="{ 'is-in-valid': errors['customer.email'] }"
      class="input" />
    <div class="text-xs mb-2 text-red-500">
      {{ errors?.["customer.email"] }}
    </div>
    <Field
      placeholder="Company"
      name="customerName"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      :class="{ 'is-in-valid': errors['customer.name'] }"
      class="input" />
    <div class="text-xs mb-2 text-red-500">{{ errors["customer.name"] }}</div>

    <button
      class="btn"
      :disabled="isPending"
      @click="
        () => {
          console.log('props.status', props.status);
        }
      ">
      {{ isPending ? "Загрузка..." : "Добавить" }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] placeholder:text-[#748092] focus:border-border transition-colors flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50;
}
.is-in-valid {
  border: 1px solid rgb(239 68 68 / 1);
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
