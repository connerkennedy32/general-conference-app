<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form action="">
      <input type="text" v-model="test" placeholder="TEST">
      <button type="submit">Submit</button>
    </form>
    <p>{{test}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      test: "",
    }
  },
}
</script>
