import { MigrationQueryBus } from '..'
import type Sqlite3 from '../Sqlite3'

export default function createSetTable(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exerciseId INTEGER REFERENCES exercise(id),
      repeat INTEGER,
      isDone INTEGER,
      weightUnit TEXT,
      weight INTEGER,
      duration INTEGER
    )`)
}

export function migrate(_db: MigrationQueryBus, _v: Versions) { }