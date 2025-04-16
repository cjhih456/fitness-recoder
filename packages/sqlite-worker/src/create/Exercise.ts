import type { MigrationQueryBus } from '..';
import type Sqlite3 from '../Sqlite3'

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fitnessId INTEGER REFERENCES fitness(id),
      deps INTEGER
    )`)
}

export function migrate(bus: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '0.1.0': {
      const queryList = bus.get('0.1.0') || []
      queryList.push({
        sql: 'update exercise set exercise=exercise+1',
        args: []
      })
      bus.set('0.1.0', queryList)
    } break
    case '1.1.0': {
      const queryList = bus.get('1.1.0') || []
      queryList.push({
        sql: 'ALTER TABLE exercise RENAME COLUMN exercise TO fitnessId',
        args: []
      })
      bus.set('1.1.0', queryList)
    } break
  }
}