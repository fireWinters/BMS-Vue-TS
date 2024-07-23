import md5 from 'md5'

export class Hash {
  static mask(val: string) {
    return `hash:${md5(val)}`
  }
}
