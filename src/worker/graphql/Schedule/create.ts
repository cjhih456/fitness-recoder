import Sqlite3 from '../../Sqlite3'

export default function createScheduleTable(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS schedule (
      id TEXT PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      month INTEGER,
      date INTEGER,
      beforeTime INTEGER,
      breakTime INTEGER,
      workoutTimes INTEGER,
      type TEXT
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS schedule_exercise (
      scheduleId TEXT REFERENCES schedule(id),
      exerciseId TEXT REFERENCES exercise(id)
    )`)
}