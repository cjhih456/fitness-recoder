import type { MigrationQueryBus } from '..';
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
      scheduleId INTEGER REFERENCES schedule(id) ON DELETE CASCADE,
      exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE
    )`)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '1.1.0': {
      const queryList = db.get('1.1.0') || []
      queryList.push({
        sql: 'ALTER TABLE schedule_exercise ADD COLUMN exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE',
        args: []
      })
      queryList.push({
        sql: 'ALTER TABLE schedule_exercise ADD COLUMN scheduleId INTEGER REFERENCES schedule(id) ON DELETE CASCADE',
        args: []
      })
      db.set('1.1.0', queryList)
    } break
  }
}