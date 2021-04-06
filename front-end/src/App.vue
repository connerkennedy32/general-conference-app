<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view />
    <div class="footer">
      <div class="container" style="padding: 10px"><a href="https://github.com/connerkennedy32/general-conference-app">GitHub Link</a></div>
    </div>
  </div>
  
</template>

<style>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgb(218, 218, 218);
    color: white;
    text-align: center;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #328ffa;
}
</style>
