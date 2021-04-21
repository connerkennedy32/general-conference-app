<template>
<div>
<p id="welcome">Welcome, {{this.$root.$data.user.firstName}}  </p>
<button id="logout" class="btn btn-danger" @click="logout">Logout</button>
<form @submit="upload">
    <input type="text" v-model="path" placeholder="Input URL here">
    <button class="btn btn-primary p-1 ml-2" type="submit">Submit</button>
</form>
<p></p>
<button class="btn btn-primary" @click="toggleList">Show List</button>
<p></p>
<p>{{unusedItems.length}}</p>
<div v-if="listOn">
    <div v-for="item in items" :key="item.id">
        <p>{{item.path}} - {{item.hasListened}} <button @click="deleteItem(item)">X</button> <button @click="hasClicked(item)">T/F</button></p> 
    </div>
</div>
<button class="btn btn-primary" @click="newTalk">Generate Talk</button>
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
    this.getItems();
  },

  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        // location.reload();
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
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
#logout {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 30px;
}
#welcome {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 30px;
}
</style>