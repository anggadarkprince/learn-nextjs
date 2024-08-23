import db from './db';
import {Training} from "@/types";

export function getTrainings() {
  const stmt = db.prepare<unknown[], Training>('SELECT * FROM trainings');
  return stmt.all();
}
