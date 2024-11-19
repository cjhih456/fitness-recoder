import type Sqlite3 from '../Sqlite3'

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      month INTEGER,
      date INTEGER,
      start INTEGER,
      beforeTime INTEGER,
      breakTime INTEGER,
      workoutTimes INTEGER,
      type TEXT
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS schedule_exercise (
      scheduleId INTEGER REFERENCES schedule(id),
      exerciseId INTEGER REFERENCES exercise(id)
    )`)
}