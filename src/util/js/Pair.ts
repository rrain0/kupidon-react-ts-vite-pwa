

export class Pair<K, V> {
  constructor(public key: K, public value: V) { }
  static of<K, V>(key: K, value: V) { return new Pair<K, V>(key, value) }
  get k() { return this.key }
  get v() { return this.value }
  get kv() { return [this.k, this.v] as [K, V] }
}

