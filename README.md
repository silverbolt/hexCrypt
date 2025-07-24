# hexCrypt
a simple js text hex crypt tools

# usage
```js
const str = 'abcdefg'
const salt = 'any salt'
const text = HexCrypt.crypt(str, salt)

console.log('input  =>', str)
console.log('crypt text  =>', text)
console.log('decrypt text =>', HexCrypt.decrypt(text, salt))
```
