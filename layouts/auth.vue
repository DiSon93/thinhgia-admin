<template>
  <div class="auth">
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
body,
html {
  height: 100%;
}
.auth {
  background-image: url("@image/layouts/login_background.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
