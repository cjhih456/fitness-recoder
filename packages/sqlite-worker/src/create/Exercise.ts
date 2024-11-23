import { MigrationQueryBus } from '..'
import type Sqlite3 from '../Sqlite3'

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise INTEGER,
      deps INTEGER
    )`)
}

export function migrate(_db: MigrationQueryBus, _v: Versions) { }