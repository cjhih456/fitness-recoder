import type Sqlite3 from '../Sqlite3'
import sort from 'version-sort'

/**
 * Take version of database from Sqlite DB
 * @param db sqlite object
 * @returns current version of Sqlite DB
 */
export function getVersion(db: Sqlite3): Versions | undefined {
  return db.selectValue('select version from version order by id desc limit 1') as Versions | undefined
}

/**
 * Insert new version number into Sqlite DB
 * @param db sqlite object
 * @param v new version
 */
export function updateVersion(db: Sqlite3, v: string) {
  // TODO: add migration steps by Process Version
  db.exec('insert into version (version) values (?)', [v])
}

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS version (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version string
    )`)
  if (!getVersion(db)) {
    updateVersion(db, '0.1.0')
  }
}

export const isNewVersion = (current: string = '0.1.0', target: string) => {
  const result = sort([current, target])
  return result[0] === current
}