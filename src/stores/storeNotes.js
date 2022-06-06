import { defineStore } from 'pinia';

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
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
      ],
    };
  },
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();

      let note = {
        id,
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
  },
});
