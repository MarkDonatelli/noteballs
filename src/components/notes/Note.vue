<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ props.note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }} </small>
          <small class="column has-text-right">{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${props.note.id}`" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      :idToDelete="props.note.id"
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
    />
  </div>
</template>

<script setup>
/*
 imports
*/

import { computed, reactive } from 'vue';
import { useDateFormat } from '@vueuse/core';
import ModalDeleteNote from '@/components/notes/ModalDeleteNote.vue';

/*
 props
*/

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/*
 computed
*/

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formattedDate = useDateFormat(date, `MM-DD-YYYY @ h:mm`);

  return formattedDate.value;
});

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length <= 1 ? 'character' : 'characters';
  return `${length} ${description}`;
});

/*
modals
*/
const modals = reactive({
  deleteNote: false,
});
</script>
