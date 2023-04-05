import { openDB } from 'idb';
const initdb = async () =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', {
                keyPath: 'id',
                autoIncrement: true,
            });
            console.log('jate database created');
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('Writing to db');
    const db = await openDB('jate', 1);
    const agree = db.transaction('jate', 'readwrite');
    const make = agree.objectStore('jate');
    const write = make.put({ content });
    const result = await write;
    console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const read = tx.objectStore('jate');
    const request = read.getAll();
    const result = await request;
    if (result.length == 0) {
        return;
    }
    const spot = result.length - 1;

    return result[spot].content;
};

initdb();
