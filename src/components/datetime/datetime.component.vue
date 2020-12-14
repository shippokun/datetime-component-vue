<template>
  <v-row dense align="center">
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker v-model="date" @input="menu = false" />
      </v-menu>
    </v-col>
    <v-col>
      <v-text-field v-model="time" type="time" />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api';

import { isoFormat, joinDatetimeToISO } from '@/libs';

export default defineComponent({
  name: 'DatetimeComponent',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    const menu = ref(false);

    const date = ref(isoFormat(props.value, 'date'));
    const time = ref(isoFormat(props.value, 'time'));

    const datetime = computed(() => {
      return joinDatetimeToISO(date.value, time.value);
    });

    watch(
      () => datetime.value,
      value => emit('input', value)
    );

    watch(
      () => props.value,
      value => {
        date.value = isoFormat(value, 'date');
        time.value = isoFormat(value, 'time');
      }
    );

    return {
      menu,
      date,
      time
    };
  }
});
</script>
