/** MIT License **/
(function () {
  "use strict";
  const JOIN_CHAR = '.'
  
  function saltCodes(codes, opts = {}) {
    const salt = opts.salt || 'Loremipsumdolorsitame'
    const saltLen = salt.length
    const nums = salt.split('').map((char) => char.charCodeAt(0));
    let sindex = 0
    for (let i = 0; i < codes.length; i++) {
      if (opts.unSalt) {
        codes[i] = codes[i] - nums[sindex];
      } else {
        codes[i] = codes[i] + nums[sindex];
      }
      sindex = (sindex + 1) % saltLen
    }
    return codes
  }
  
  function crypt(str, salt) {
    const codes = str.split('').map((char) => char.charCodeAt(0))
    const saltedCodes = saltCodes(codes, { salt })
    return saltedCodes.map(sc => sc.toString(16)).join(JOIN_CHAR)
  }
  
  function decrypt(str, salt) {
    if (!str) {
      return str
    }
    const codes = str.split(JOIN_CHAR).map((s) => parseInt(s, 16))
    const unsaltedCodes = saltCodes(codes, { unSalt: true, salt })
    return unsaltedCodes.map(code => String.fromCharCode(code)).join('')
  }

  const HexCrypt = {
    crypt, decrypt
  }

  if (typeof window !== "undefined") {
    if (!window.HexCrypt) {
      window.HexCrypt = HexCrypt;
    }
  } else {
    module.exports = HexCrypt;
  }
})();
