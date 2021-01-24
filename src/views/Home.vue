<template>
  <div>
    <template v-if="!user">
      <BaseLogin />
    </template>
    <template v-else>
      <BaseChat />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseLogin from '@/components/share-tools/BaseLogin';
import BaseChat from '../components/share-tools/BaseChat.vue';

import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    BaseLogin,
    BaseChat
  },
  computed: {
    ...mapState('userMod', {
      user: state => state.user,
    }),
  }
}
</script>