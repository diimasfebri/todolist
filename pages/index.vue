<template>
  <div class="tasks">
    <div class="pembuka">
      <span> Time To Work! </span>
    </div>
    <div class="isi">
      <span> Tasks </span>
      <!-- input icon  setting -->
      <v-icon class="icon">mdi-dots-vertical</v-icon>
    </div>
    <div class="todo-container">
      <!-- logika looping sampai array todos abis -->
      <div v-for="todo in todos" :key="todo._id" class="todo">
        <div v-if="!todo.editMode" class="view">
          <div class="atas">
            <div class="left" @click="ubahIsDone(todo)">
              <!-- nama class icon bisa menjadi "done" juga jika is_done true -->
              <v-icon :class="todo.is_done ? 'done' : ''" class="icon"
                >mdi-checkbox-marked-circle</v-icon
              >
              <!-- jika is_done true, maka spab memiliki nama classnya sendiri -->
              <span :class="todo.is_done ? 'done' : ''">{{ todo.title }}</span>
            </div>
            <div class="right">
              <v-icon v-ripple class="icon" @click="todo.editMode = true"
                >mdi-dots-vertical</v-icon
              >
            </div>
          </div>
          <div v-if="todo.notes" class="bawah">
            <span> {{ todo.notes }}</span>
          </div>
        </div>
        <edit-task
          v-else
          :todo="todo"
          @tutup="todo.editMode = false"
          @sunting-todo="sunting"
          @hapus="hapus"
        />
      </div>
    </div>
    <div class="grup">
      <!-- input data -->
      <tombol v-if="!buka" @clicked="buka = true" />
      <add-task v-else @tutup="buka = false" @tambah-todo="tambah" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const obj = {
      myday: '',
      buka: false,
      todos: [],
    }
    return obj
  },

  // akan jalan ketika sudah semua terjalankan.
  mounted() {
    this.muatdata()
  },

  methods: {
    // input dan delete data todo list
    async tambah(todo) {
      const { data } = await this.$axios.post(
        'http://localhost:8000/todos/create-tasks',
        todo
      )
      if (data.message === 'SUCCESS') {
        this.muatdata()
        this.buka = false // biar form add task tutup kembali.
      }
    },

    async ubahIsDone(todo) {
      const { data } = await this.$axios.put(
        `http://localhost:8000/todos/update-todo/${todo._id}`,
        {
          // supaya yang awalnya false jadi true, dan sebaliknya bos
          is_done: !todo.is_done,
        }
      )
      if (data.message === 'SUCCESS') {
        this.muatdata()
      }
    },

    async hapus(id) {
      const { data } = await this.$axios.delete(
        `http://localhost:8000/todos/delete/${id}`
      ) // pake backtick``
      if (data.message === 'SUCCESS') {
        this.muatdata()
      }
    },

    async sunting(todo) {
      const { data } = await this.$axios.put(
        `http://localhost:8000/todos/update-todo/${todo._id}`,
        todo
      )
      if (data.message === 'SUCCESS') {
        this.muatdata()
        const i = this.todos.findIndex((a) => a._id === todo._id)
        this.todos[i].editMode = false
      }
    },

    async muatdata() {
      const { data } = await this.$axios.get('http://localhost:8000/todos')
      if (data.message === 'SUCCESS') {
        this.todos = data.todos
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tasks {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .pembuka {
    font-size: 0.75rem;
    font-weight: bolder;
  }
  .isi {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    width: 30%;
    border-bottom: 1px solid rgba(#fff, 0.8);
    .icon {
      font-size: 1rem;
      color: #fff;
      margin-right: 0.1rem;
      border-radius: 0.25rem;
      background: rgba(#fff, 0.25);
      width: 1.5rem;
      height: 1.5rem;
      justify-content: center;
      align-items: center;
    }
  }
  .todo-container {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .todo {
      position: relative;
      width: 30%;
      margin-bottom: 0.5rem;
      .view {
        position: relative;
        display: flex;
        width: 100%;
        padding: 0.5rem 0;
        background: #fff;
        border-radius: 0.25rem;
        border-left: 0.25rem solid black;
        flex-direction: column;
        .atas {
          position: relative;
          display: flex;
          height: 2.5rem;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          .left {
            cursor: pointer;
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span {
              color: rgba(#000, 0.7);
              font-size: 0.75rem;
              font-weight: bolder;
              &.done {
                text-decoration: line-through;
              }
            }
            .icon {
              position: relative;
              font-size: 1.25rem;
              color: rgba(#000, 0.2);
              margin: 0 0.5rem;
              &.done {
                color: rgba(219, 82, 77, 1);
              }
            }
          }
          .right {
            .icon {
              font-size: 1rem;
              color: rgba(#000, 0.5);
              margin-right: 0.1rem;
              border-radius: 0.25rem;
              width: 1.5rem;
              height: 1.5rem;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .bawah {
          position: relative;
          display: flex;
          align-items: center;
          background: #fcf8de;
          width: calc(100% - 1rem);
          margin: 0 0.5rem;
          padding: 0.5rem;
          border-radius: 0.25rem;
          span {
            font-size: 0.65rem;
            color: rgba(#000, 0.75);
          }
        }
      }
    }
  }
  .grup {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
