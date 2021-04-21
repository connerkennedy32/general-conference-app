<template>
<div>
<p v-if="user" id="welcome">Welcome, {{this.$root.$data.user.firstName}}  </p>
<p></p>
<button v-if="user" class="btn btn-primary" @click="newTalk">Generate Talk</button>
<p></p>
<h1 v-if="user" class="display-1">{{unusedItems.length}}</h1>
<p v-if="user">Talks left...</p>
<p v-else>No user is logged in</p>

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
      unusedItems: [],
      listOn: null,
      }
  },
  created() {
      if (this.$root.$data.user) {
        this.getItems();
      }
  },

  computed: {
    user() {
      return this.$root.$data.user;
    // return true;
    }
  },

  methods: {
    toggleList() {
        if (this.listOn) {
            this.listOn = false;
        } else {
            this.listOn = true;
        }
    },
    filterItems() {
        this.unusedItems = this.items.filter(item => item.hasListened == false);
    },  
    async upload() {  
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
            this.filterItems();
            return true;

        } catch (error) {
            console.log(error);
        }
    },
    async deleteItem(item) {
        try {
            await axios.delete("/api/items/" + item._id);
            this.getItems();
            return true;
        } catch(error) {
            console.log(error);
        }
    },
    async hasClicked(item) {
        try {
            if (!item.hasListened) {
                await axios.put("/api/items/" + item._id, {
                hasListened: true,
            })
            } else {
                await axios.put("/api/items/" + item._id, {
                hasListened: false,
            })
            }
            this.getItems();
            
        } catch(error) {
            console.log(error);
        }
    },
    newTalk() {
        let randNum = Math.floor(Math.random() * this.unusedItems.length);
        let talkInfo = this.unusedItems[randNum];
        window.open(talkInfo.path); //opens new tab with the correct url
        this.hasClicked(talkInfo);
    }
  }
}
</script>

<style scoped>
#welcome {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 30px;
}
</style>