import type { MigrationQueryBus } from '..';
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
      exercisePresetId INTEGER REFERENCES exercisePreset(id) ON DELETE CASCADE,
      exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE
    )`)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '1.1.0': {
      const queryList = db.get('1.1.0') || []
      // TODO: add on delete cascade
      queryList.push({
        sql: 'ALTER TABLE exercisePreset_exercise ADD COLUMN exercisePresetId INTEGER REFERENCES exercisePreset(id) ON DELETE CASCADE',
        args: []
      })
      queryList.push({
        sql: 'ALTER TABLE exercisePreset_exercise ADD COLUMN exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE',
        args: []
      })
      db.set('1.1.0', queryList)
    } break
  }
}