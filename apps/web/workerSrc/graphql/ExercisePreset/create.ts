import Sqlite3 from '../../Sqlite3'

export default function createExerciseTable(db: Sqlite3) {
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