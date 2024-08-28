type SqliteMessageSingleResultType = 'insert' | 'update' | 'select' | 'delete'

type SqliteMessageType = SqliteMessageSingleResultType | 'selects'

type SqliteMessage = {
  type: SqliteMessageType
  txid: string
  query: string
  bindArgs: any[]
}

type SqliteResultType = {
  type: 'selects'
  txid: string
  object: any[]
} | {
  type: 'insert' | 'delete'
  txid: string,
  object: 'done' | null
} | {
  type: SqliteMessageSingleResultType
  txid: string,
  object: any
}