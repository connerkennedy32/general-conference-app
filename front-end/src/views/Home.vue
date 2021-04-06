<template>
<div>
<p></p>
<button class="btn btn-primary" @click="newTalk">Generate Talk</button>
<p></p>
<h1 class="display-1">{{unusedItems.length}}</h1>
<p>Talks left...</p>

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