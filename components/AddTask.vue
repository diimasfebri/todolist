<template>
  <div class="add-task">
    <div class="input-container">
      <input
        v-model="title"
        type="text"
        placeholder="What are you working on?"
      />
    </div>
    <!-- bukanotes sebagai trigger -->
    <div v-if="bukanotes" class="notes">
      <textarea v-model="notes" placeholder="Some notes..." />
    </div>
    <div v-if="!bukanotes" class="tambahan-container">
      <div class="tambahan" @click="bukanotes = true">
        <span>+ Add Note</span>
      </div>
    </div>
    <div class="button-container">
      <div v-ripple class="button" @click="keluar">
        <span>Cancel</span>
      </div>
      <div v-ripple class="button primary" @click="tambah">
        <span>Save</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: '',
      title: '',
      bukanotes: false,
    }
  },
  methods: {
    keluar() {
      this.$emit('tutup')
    },

    // input dan delete data todo list
    tambah() {
      const todo = {
        notes: this.notes,
        title: this.title,
      }
      this.$emit('tambah-todo', todo) // "tambah-todo" disini sebagai event,
    },
  },
}
</script>

<style lang="scss" scoped>
.add-task {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.25rem;
  overflow: hidden;
  .input-container {
    position: relative;
    display: flex;
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
    input {
      position: relative;
      display: flex;
      width: 100%;
      font-weight: bolder;
      font-size: 0.75rem;
      height: 100%;
      //agar hilang tepi garisnya saat diklik
      &:focus {
        outline: none;
      }
    }
  }
  .notes {
    position: relative;
    display: flex;
    width: 100%;
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
    textarea {
      position: relative;
      width: 100%;
      background: #ddd;
      border-radius: 0.25rem;
      resize: none;
      font-size: 0.65rem;
      padding: 0.5rem;

      &:focus {
        outline: none;
      }
    }
  }
  .tambahan-container {
    position: relative;
    display: flex;
    width: 100%;
    padding: 0 0.5rem;
    .tambahan {
      cursor: pointer;
      position: relative;
      display: flex;
      span {
        color: #aaa;
        font-size: 0.6rem;
        text-decoration: underline;
      }
    }
  }
  .button-container {
    position: relative;
    display: flex;
    width: 100%;
    height: 2rem;
    background: #ddd;
    padding: 0 0.5rem;
    align-items: center;
    justify-content: flex-end;
    margin-top: 0.5rem;
    .button {
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 0.25rem;
      align-items: center;
      cursor: pointer;
      height: 1.5rem;
      padding: 0 1rem;
      margin-right: 0.25rem;
      span {
        font-size: 0.6rem;
        font-weight: bold;
        color: #777;
      }
      &.primary {
        margin: 0;
        background: #777;
        span {
          color: white;
        }
      }
    }
  }
}
</style>
