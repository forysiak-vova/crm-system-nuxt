<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID } from "~/app.constants";
import type { ICustomer } from "~/types/deals.types";

useSeoMeta({
  title: "Customers | CRM System",
});

const { data: customers, isLoading } = useQuery({
  queryKey: ["customers"],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Our customers</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[200px]">Image</UiTableHead>
          <UiTableHead class="w-[200px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">Email</UiTableHead>
          <UiTableHead class="w-[200px]">He came</UiTableHead>
          <UiTableHead class="px-4">Edit</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="customer in (customers?.documents as unknown as ICustomer[])"
          :key="customer.$id">
          <UiTableCell>
            <NuxtImg
              :src="customer.avatar_url"
              :alt="customer.name"
              width="50"
              height="50"
              class="rounded-full" />
          </UiTableCell>
          <UiTableCell class="font-medium">
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>
          <UiTableCell>
            <NuxtLink
              class="bg-[#a252c8] px-2 py-1 hover:bg-[#a252c8]/50"
              :href="`/customers/edit/${customer.$id}`"
              >Edit</NuxtLink
            ></UiTableCell
          >
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
