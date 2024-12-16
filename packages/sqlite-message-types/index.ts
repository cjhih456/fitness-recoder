export declare namespace SqliteMessage {
  type SingleType = 'select';
  type Type = SingleType | 'update' | 'selects' | 'insert' | 'delete' | 'init';

  type Result = {
    type: 'selects' | 'insert'
    txid: string
    object: any[]
  } | {
    type: | 'delete'
    txid: string
    object: string | null
  } | {
    type: SingleType
    txid: string
    object: any
  }
  interface Message {
    type: Type
    txid: string
    query: string
    bindArgs: any[]
  }
}
