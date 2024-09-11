import Sqlite3 from '../../Sqlite3'

export default function createExerciseTable(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise INTEGER,
      deps INTEGER
    )`)
}