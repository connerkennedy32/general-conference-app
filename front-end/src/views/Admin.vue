<template>
<div>
    <LoggedIn v-if="user" />
    <Login v-else /> 
</div>
</template>

<script>
// import axios from 'axios';
import axios from 'axios';
import LoggedIn from '@/components/LoggedIn.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'Admin',
  data() {
    return {
      users: '',
    }
  },
  components: {
      LoggedIn,
      Login,
  },
  async created() {
    // if (this.users) {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
        this.users = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
        this.users = '';
      }
    // } 
    
  },
  computed: {
    user() {
      return this.$root.$data.user;
    // return true;
    }
  }
}
</script>