import type { MigrationQueryBus } from '..';
import type Sqlite3 from '../Sqlite3'

export default function createSetTable(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE,
      repeat INTEGER,
      isDone INTEGER,
      weightUnit TEXT,
      weight INTEGER,
      duration INTEGER
    )`)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '1.1.0': {
      const queryList = db.get('1.1.0') || []
      queryList.push({
        sql: 'ALTER TABLE sets ADD COLUMN exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE',
        args: []
      })
      db.set('1.1.0', queryList)
    } break
  }
}