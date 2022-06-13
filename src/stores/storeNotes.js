import { defineStore } from 'pinia';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/js/firebase';

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        //coming from firebase dynamically
      ],
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(collection(db, 'notes'), (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
          };
          notes.push(note);
        });
        this.notes = notes;
      });
      //later on
      // unsubscribe();
    },
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
    updateNote(id, content) {
      let index = this.notes.findIndex((note) => note.id === id);
      this.notes[index].content = content;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => {
          return note.id === id;
        })[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalNotesCharacterCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
