import { watch } from 'vue';

export function useWatchCharacters(valueToWatch, maxChars = 100) {
  watch(valueToWatch, (newValue) => {
    let count = newValue.length;
    if (count === maxChars) {
      alert(`Only ${maxChars} characters allowed`);
    }
  });
}
