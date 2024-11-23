import { MigrationQueryBus } from '..'
import type Sqlite3 from '../Sqlite3'

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version
  db.exec(`CREATE TABLE IF NOT EXISTS exercisePreset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      deps INTEGER,
      createdAt INTEGER
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS exercisePreset_exercise (
      exercisePresetId INTEGER REFERENCES exercisePreset(id),
      exerciseId INTEGER REFERENCES exercise(id)
    )`)
}

export function migrate(_db: MigrationQueryBus, _v: Versions) { }