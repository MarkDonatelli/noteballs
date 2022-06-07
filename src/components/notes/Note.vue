<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ props.note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }} </small>
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
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" />
  </div>
</template>

<script setup>
/*
 imports
*/

import { computed, reactive } from 'vue';
import ModalDeleteNote from '@/components/notes/ModalDeleteNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

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
 store
*/

const storeNotes = useStoreNotes();

/*
 computed
*/

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
