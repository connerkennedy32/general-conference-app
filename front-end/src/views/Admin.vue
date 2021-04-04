<template>
<div>
<form @submit="upload">
    <input type="text" v-model="path">
    <button type="submit">Submit</button>
</form>
<div v-for="item in items" :key="item.id">
    <p>{{item.path}}</p>
</div>
<p>{{items.length}}</p>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
    return {
      test: "",
      path: "",
      items: [],
      }
  },
  created() {
    this.getItems();
  },

  methods: {
      async upload() {  
          console.log("UPLOADING");
          try {
              await axios.post('/api/items', {
                path: this.path,
                hasListened: false
            })
          } catch(error) {
              console.log(error);
          }
      },
    async getItems() {
    try {
      let response = await axios.get("/api/items");
      this.items = response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
  },
  
  }
}
</script>