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
      <a href="#" class="card-footer-item">Edit</a>
      <a @click.prevent="handleNoteDelete" href="#" class="card-footer-item"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
/*
 imports
*/

import { computed } from 'vue';

/*
 emits
*/

const emit = defineEmits(['handleNoteDelete']);

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

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length <= 1 ? 'character' : 'characters';
  return `${length} ${description}`;
});

/*
 methods
 */

const handleNoteDelete = () => {
  emit('handleNoteDelete', props.note.id);
};
</script>
