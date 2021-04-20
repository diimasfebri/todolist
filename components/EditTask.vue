<template>
  <div class="add-task">
    <div class="input-container">
      <input
        v-model="title"
        type="text"
        placeholder="What are you working on?"
      />
    </div>
    <div v-if="bukanotes" class="notes">
      <textarea v-model="notes" placeholder="Some notes..." />
    </div>
    <div v-if="!bukanotes" class="tambahan-container">
      <div class="tambahan" @click="bukanotes = true">
        <span>+ Add Note</span>
      </div>
    </div>
    <div class="button-container">
      <div class="kiri">
        <div v-ripple class="button" @click="hapus">
          <span>Delete</span>
        </div>
      </div>
      <div class="kanan">
        <div v-ripple class="button" @click="keluar">
          <span>Cancel</span>
        </div>
        <div v-ripple class="button primary" @click="sunting">
          <span>Save</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      notes: '',
      title: '',
      bukanotes: false,
    }
  },

  mounted() {
    if (this.todo.title) {
      this.title = this.todo.title
    }
    if (this.todo.notes) {
      this.notes = this.todo.notes
      this.bukanotes = true
    }
  },

  methods: {
    keluar() {
      this.$emit('tutup')
    },

    hapus() {
      this.$emit('hapus', this.todo._id)
    },

    // input dan delete data todo list
    sunting() {
      const todo = {
        _id: this.todo._id,
        notes: this.notes,
        title: this.title,
      }
      this.$emit('sunting-todo', todo)
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
    justify-content: space-between;
    margin-top: 0.5rem;
    .kiri {
      position: relative;
      display: flex;
      align-items: center;
    }
    .kanan {
      position: relative;
      display: flex;
      align-items: center;
    }
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
