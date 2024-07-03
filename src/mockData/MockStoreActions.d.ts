type MockStoreActions<T> = {
  setStore: (id: string, obj: T) => void
  getData: (id: string) => T
  deleteData: (id: string) => void
}