import type { SqliteMessage } from 'sqlite-message-types'
import { v4 as uuid } from 'uuid'

type TransactionCallBack<T> = (_result: T) => void

type PromiseResolve = (_data: any) => void

export default class MessageTransactionBus {

  private bus = new Map<string, PromiseResolve>()

  private clients: Clients | undefined

  constructor() { }

  setClients(clients: Clients) {
    this.clients = clients
  }

  gotResult(txid: string, resultData: any) {
    const tx = this.bus.get(txid)
    if (tx) tx(resultData || null)
  }

  async sendTransaction<T = any>(_clientId: string, _type: 'select', _query: string, _bindArgs: any[], _callBack?: TransactionCallBack<T | null>): Promise<T | null>;

  async sendTransaction<T = any>(_clientId: string, _type: 'selects' | 'insert' | 'update' | 'delete', _query: string, _bindArgs: any[], _callBack?: TransactionCallBack<T | null>): Promise<T[] | null>;

  async sendTransaction<T = any>(clientId: string, type: SqliteMessage.Type, query: string, bindArgs: any[], callBack?: TransactionCallBack<T | null>): Promise<T | null> {
    const client = await this.clients?.get(clientId)
    const txid = uuid()
    return new Promise<T | null>((resolve) => {
      if (!client) return resolve(null)
      this.bus.set(txid, (result: T) => {
        callBack && callBack(result)
        resolve(result)
        this.bus.delete(txid)
      })
      client.postMessage({ type, query, txid, bindArgs })
    })
  }
}