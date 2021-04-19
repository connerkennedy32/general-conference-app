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
  components: {
      LoggedIn,
      Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    // return true;
    }
  }
}
</script>