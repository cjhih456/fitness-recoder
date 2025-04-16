import type { MigrationQueryBus } from '..';
import type Sqlite3 from '../Sqlite3'

const createSetsTableSql = `CREATE TABLE IF NOT EXISTS sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE,
  repeat INTEGER,
  isDone INTEGER,
  weightUnit TEXT,
  weight INTEGER,
  duration INTEGER
)`

export default function createSetTable(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(createSetsTableSql)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '1.1.0': {
      const queryList = db.get('1.1.0') || []
      queryList.push({
        sql: 'alter table sets rename to sets_old',
        args: []
      })
      queryList.push({
        sql: createSetsTableSql,
        args: []
      })
      queryList.push({
        sql: 'insert into sets (exerciseId, repeat, isDone, weightUnit, weight, duration) select exerciseId, repeat, isDone, weightUnit, weight, duration from sets_old',
        args: []
      })
      queryList.push({
        sql: 'drop table sets_old',
        args: []
      })
      db.set('1.1.0', queryList)
    } break
  }
}