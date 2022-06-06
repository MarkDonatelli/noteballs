<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button
          :disabled="!noteContent"
          class="button is-link has-background-link"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
/*
 imports
*/
import { ref } from 'vue';
import AddEditNote from '@/components/notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

/*
 store
*/

const storeNotes = useStoreNotes();

/*
 note
*/

const noteContent = ref('');

noteContent.value = storeNotes.getNoteContent;
</script>
