<script lang="ts" setup>
console.log('Welcome nuxt js');

</script>
<template>
   <section class="grid">
      <LayoutSidebar></LayoutSidebar>
      <div>
   <slot />
      </div>
   </section>
</template>


<style lang="scss" scoped>
.grid{
display: grid;
grid-template-columns: 1fr 6fr;
min-height: 100vh;
}
</style>