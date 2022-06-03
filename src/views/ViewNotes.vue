<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>
    <!-- /.card has-background-success-dark -->
    <Note
      @handleNoteDelete="deleteNote(note.id)"
      v-for="note in notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup>
/*
 imports
*/

import { ref } from 'vue';
import Note from '@/components/notes/Note.vue';

/*
 notes
*/

const newNote = ref('');
const newNoteRef = ref(null);

const notes = ref([
  {
    id: 'id1',
    content: 'Content One',
  },
  {
    id: 'id2',
    content: 'Content Two',
  },
  {
    id: 'id3',
    content: 'Content Three',
  },
]);

const addNote = () => {
  let currentDate = new Date().getTime(),
    id = currentDate.toString();
  let note = {
    id,
    content: newNote.value,
  };
  notes.value.unshift(note);
  newNote.value = '';
  newNoteRef.value.focus();
};

const deleteNote = (id) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};
</script>
