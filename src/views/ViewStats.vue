<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ numberOfNotes }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ numberOfCharacters }}</td>
        </tr>
      </tbody>
    </table>
    <input
      class="input"
      type="text"
      placeholder="Do you love noteballs?"
      v-model="statsInput"
      v-autofocus
    />
  </div>
</template>

<script setup>
/*
 imports
*/
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';

/*
store
*/

const storeNotes = useStoreNotes();

let numberOfNotes = storeNotes.totalNotesCount;
let numberOfCharacters = storeNotes.totalNotesCharacterCount;

/*
refs
*/

const statsInput = ref('');

/*
watch characters
*/

useWatchCharacters(statsInput, 50);
</script>
