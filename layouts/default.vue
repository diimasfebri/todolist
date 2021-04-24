<template>
  <div class="layout">
    <div class="toplayout">
      <div class="title">
        <v-icon class="icon">mdi-checkbox-marked-circle</v-icon>
        <span style="font-weight: bolder"> Pomofocus </span>
      </div>
      <div class="button">
        <!-- "v-ripple" untuk efek  saat diklik buttonnya -->
        <div v-ripple class="button1">
          <!-- masukkan icon -->
          <v-icon class="icon">mdi-chart-bar</v-icon>
          <span> Report </span>
        </div>
        <div v-ripple class="button1">
          <v-icon class="icon">mdi-cog</v-icon>
          <span> Setting </span>
        </div>
        <div v-ripple class="button1" @click="bukalogin = true">
          <v-icon class="icon">mdi-account</v-icon>
          <span> Login </span>
        </div>
      </div>
    </div>
    <nuxt />
    <login v-if="bukalogin" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      bukalogin: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  //pakai vw buat di inisialisasi ukuran.
  width: 100vw;
  background: rgba(219, 82, 77, 1);
  .toplayout {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    .title {
      position: relative;
      display: flex;
      align-items: center;
      .icon {
        font-size: 1rem;
        color: #fff;
        margin-right: 0.1rem;
      }
    }
    .button {
      position: relative;
      display: flex;
      flex-direction: row;
      .button1 {
        cursor: pointer;
        position: relative;
        display: flex;
        margin: 0.25rem;
        padding: 0.25rem 0.5rem;
        //buat ujung kotak melengkung bos
        border-radius: 0.25rem;
        background: rgba(#fff, 0.25);
        justify-content: center;
        align-items: center;
        .icon {
          font-size: 0.75rem;
          color: #fff;
          margin-right: 0.25rem;
        }
        span {
          font-size: 0.65rem;
          font-weight: lighter;
        }
      }
    }
  }
}
</style>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial';
  font-size: 24px;
  color: white;
}
</style>
