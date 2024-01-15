export const showSidebar = defineStore("showSidebar", {
  state: () => ({
    invalideMessage: false,
  }),
  actions: {
    clear() {
      this.$patch({ invalideMessage: false });
    },
    set(bool: boolean) {
      this.$patch({ invalideMessage: bool });
    },
  },
});
