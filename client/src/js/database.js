import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const myDB = await openDB('jate', 1); 
    const transaction = myDB.transaction('jate', 'readwrite'); 
    const objectStore = transaction.objectStore('jate');

    const request = objectStore.put({ id: 1, value: content }); 
    const result = await request;
    console.log(result);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const myDB = await openDB('jate', 1);
    const transaction = myDB.transaction('jate', 'readonly'); 
    const objectStore = transaction.objectStore('jate');

    const request = objectStore.get(1); 
    const result = await request;
    return result?.value;
  } catch (error) {
    console.error('An error occurred:', error);
    return null; 
  }
};

initdb();
