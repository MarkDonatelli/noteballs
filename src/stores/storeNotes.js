import { defineStore } from 'pinia';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/js/firebase';

const notesCollectionRef = collection(db, 'notes');
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        //coming from firebase dynamically
      ],
      isLoading: false,
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        this.isLoading = false;
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        this.isLoading = true;
        this.notes = notes;
      });
      //later on
      // unsubscribe();
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(id) {
      // this.notes = this.notes.filter((note) => note.id !== id);
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updateNote(id, content) {
      // let index = this.notes.findIndex((note) => note.id === id);
      // this.notes[index].content = content;
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
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
