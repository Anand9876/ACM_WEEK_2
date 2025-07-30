// Paste your Firebase configuration object here
const firebaseConfig = {
  apiKey: "AIzaSyBKed0VROrO4McdWxH7S-_HYHCXEx3f9-U",
  authDomain: "author-finder-2b447.firebaseapp.com",
  projectId: "author-finder-2b447",
  storageBucket: "author-finder-2b447.firebasestorage.app",
  messagingSenderId: "92152817902",
  appId: "1:92152817902:web:abedd6185b126a84fdabff",
  measurementId: "G-KPSP2XK0HQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const searchForm = document.getElementById('search-form');
const authorInput = document.getElementById('author-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const authorName = authorInput.value.trim();

    findBooksByAuthor(authorName.toUpperCase());
});

async function findBooksByAuthor(name) {

    try {
        const querySnapshot = await db.collection('books').where('author', '==', name).get();
        let booksHTML = '<ul>';
        querySnapshot.forEach(doc => {
            const book = doc.data();
            booksHTML += `<li>${book.title}</li>`;
        });
        booksHTML += '</ul>';

        resultsContainer.innerHTML = booksHTML;

    } catch (error) {
        console.error("Error fetching books: ", error);
        resultsContainer.innerHTML = '<p>Sorry, something went wrong.</p>';
    }
}