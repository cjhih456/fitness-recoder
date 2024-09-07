import Sqlite3InitModule, { BindingSpec, Database, OpfsDatabase } from '@sqlite.org/sqlite-wasm';

// Singleton instance
let sqlite: Sqlite3 | undefined = undefined

const log = console.log;
const error = console.error;

class Sqlite3 {
  db: undefined | Database | OpfsDatabase
  dbPromise: undefined | Promise<Database | OpfsDatabase>
  constructor() {
    if (sqlite) return sqlite
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    sqlite = this
  }
  async init() {
    if (this.db) return
    this.db = await new Promise<Database | OpfsDatabase>((resolve) => {
      Sqlite3InitModule({
        print: log,
        printErr: error,
      }).then((sqlite3) => {
        resolve(sqlite3.oo1.OpfsDb
          ? new sqlite3.oo1.OpfsDb('worker.sqlite3')
          : new sqlite3.oo1.DB('workout.sqlite3', 'ct'))
      }).catch(e => {
        console.error('InitError', e)
      })
    })
  }

  selectObject(
    query: string,
    bind?: BindingSpec
  ) {
    if (!this.db) return
    return this.db.selectObject(query, bind)
  }

  selectObjects(
    query: string,
    bind?: BindingSpec
  ) {
    if (!this.db) return
    return this.db.selectObjects(query, bind)
  }

  selectValue(
    query: string,
    bind?: BindingSpec
  ) {
    if (!this.db) return
    return this.db.selectValue(query, bind)
  }
  selectValues(
    query: string,
    bind?: BindingSpec
  ) {
    if (!this.db) return
    return this.db.selectValues(query, bind)
  }

  exec(
    query: string,
    bind?: BindingSpec
  ) {
    if (!this.db) return
    return this.db.exec({ sql: query, bind, returnValue: 'resultRows', rowMode: 'object', resultRows: [] }) as object[]
  }

  close() {
    if (this.db) {
      this.db.close()
      this.db = undefined;
    }
  }
}

export default Sqlite3
