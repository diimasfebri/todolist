<template>
  <div class="popup">
    <div class="login">
      <div class="atas">
        <div class="username">
          <span>Username :</span>
          <input v-model="username" type="text" placeholder="...." />
        </div>
        <div class="password"></div>
      </div>
      <div class="bawah">
        <div class="signin"></div>
        <div class="signout"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.25);
  .login {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 40%;
    height: 30%;
    background: white;
    .atas {
      position: relative;
      display: flex;
      width: 100%;
      height: 50%;
      flex-direction: row;
      justify-content: space-between;
      .username {
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
        color: black;
        padding: 0.5rem;
      }
    }
  }
}
</style>
