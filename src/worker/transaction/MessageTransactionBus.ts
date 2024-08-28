import { v4 as uuid } from 'uuid'

type TransactionCallBack<R> = (result: R) => any

type PromiseResolve<R> = (data: R | PromiseLike<R>) => void

export default class MessageTransactionBus<R> {

  private bus = new Map<string, PromiseResolve<R>>()
  private clients
  constructor(clients: Clients) {
    this.clients = clients
  }
  registTransition(callBack: TransactionCallBack<R>) {
    const txid = uuid()
    new Promise<R>((resolve) => {
      this.bus.set(txid, resolve)
    }).then((result: R) => {
      callBack(result)
    })
    return txid
  }
  gotResult(txid: string, resultData: R) {
    const tx = this.bus.get(txid)
    if (tx) tx(resultData)
  }

  async sendTransaction(clientId: string, type: SqliteMessageType, query: string, bindArgs: any[], callBack: TransactionCallBack<R>) {
    const client = await this.clients?.get(clientId)
    if (client) {
      const txid = this.registTransition(callBack)
      client.postMessage({ type, query, txid, bindArgs })
    }
  }
}