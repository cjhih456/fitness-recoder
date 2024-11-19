type SqliteMessageSingleResultType = 'update' | 'select'

type SqliteMessageType = SqliteMessageSingleResultType | 'selects' | 'insert' | 'delete' | 'init'
interface SqliteMessage {
  type: SqliteMessageType
  txid: string
  query: string
  bindArgs: any[]
}

type SqliteResultType = {
  type: 'selects' | 'insert'
  txid: string
  object: any[]
} | {
  type: | 'delete'
  txid: string
  object: string | null
} | {
  type: SqliteMessageSingleResultType
  txid: string
  object: any
}