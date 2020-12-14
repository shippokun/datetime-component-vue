<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <h1>Datetime Component</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <datetime-component v-model="datetime"></datetime-component>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import { DatetimeComponent } from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    DatetimeComponent
  },
  setup() {
    const datetime = ref('');

    return {
      datetime
    };
  }
});
</script>
