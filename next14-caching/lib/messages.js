import sql from 'better-sqlite3';
import {unstable_cache} from "next/cache";
import {cache} from 'react';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

export const getMessages = unstable_cache( // cache the data return itself
    cache(function getMessages() { // prevent request deduplication
      console.log('Fetching messages from db');
      return db.prepare('SELECT * FROM messages').all();
    }), ['messages'], {tags: ['msg']}
);