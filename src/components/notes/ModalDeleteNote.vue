<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalDeleteNoteRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button @click="deleteNote(props.idToDelete)" class="button is-danger">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
/*
imports
*/
import { ref, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreNotes } from '@/stores/storeNotes';

/*
props
*/

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  idToDelete: {
    type: String,
    required: true,
  },
});

/*
store
*/

const storeNotes = useStoreNotes();

const deleteNote = (idToDelete) => {
  storeNotes.deleteNote(idToDelete);
};

/*
emits
*/

const emit = defineEmits(['update:modelValue']);

/*
close modal
*/

const modalDeleteNoteRef = ref(null);

const closeModal = () => {
  emit('update:modelValue', false);
};

onClickOutside(modalDeleteNoteRef, closeModal);

/*
keyboard control
*/

const handleKeyboard = (e) => {
  if (e.key === 'Escape') closeModal();
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});
</script>
