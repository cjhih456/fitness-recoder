import type { BindingSpec, Database, OpfsDatabase } from '@sqlite.org/sqlite-wasm';
import Sqlite3InitModule from '@sqlite.org/sqlite-wasm';

// Singleton instance
let sqlite: Sqlite3 | undefined = undefined

const log = console.log;
const error = console.error;

class Sqlite3 {
  private db: undefined | Database | OpfsDatabase

  public ready: boolean = false

  constructor() {
    if (sqlite) return sqlite
    sqlite = this
  }

  async init() {
    if (this.db) return false
    try {
      const sqlite3Module = await Sqlite3InitModule({
        print: log,
        printErr: error
      })
      this.db = sqlite3Module.oo1.OpfsDb
        ? new sqlite3Module.oo1.OpfsDb('worker.sqlite3')
        : new sqlite3Module.oo1.DB('workout.sqlite3', 'c')
      this.ready = true
    } catch (e) {
      console.error('InitError', e)
    }
    return true
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
