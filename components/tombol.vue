<template>
  <div class="input">
    <div v-ripple class="tombol" @click="submit">
      <v-icon class="icon">mdi-plus-circle</v-icon>
      <span> Add Task </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('clicked')
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  .tombol {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(#fff, 0.25);
    margin-top: 0.4rem;
    width: 100%;
    height: 2.1rem;
    border-radius: 0.25rem;
    border: 4px dotted rgba(#fff, 0.5);
    background: rgba(#000, 0.25);
    span {
      color: rgba(#fff, 0.5);
      font-size: 0.75rem;
    }
    .icon {
      font-size: 0.8rem;
      color: rgba(#fff, 0.5);
      margin-right: 0.4rem;
    }
  }
}
</style>
