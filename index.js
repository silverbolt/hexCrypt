/** MIT License **/
(function () {
  "use strict";
  const JOIN_CHAR = '.'
  function stringToCCodes(s) {
    return s.split('').map((char) => char.charCodeAt(0));
  }

  function saltCharCodes(ccodes, opts = {}) {
    const salt = opts.salt || 'Loremipsumdolorsitame'
    const saltLen = salt.length
    const nums = stringToCCodes(salt);
    let sindex = 0
    for (let i = 0; i < ccodes.length; i++) {
      if (opts.unSalt) {
        ccodes[i] = ccodes[i] - nums[sindex];
      } else {
        ccodes[i] = ccodes[i] + nums[sindex];
      }
      sindex = (sindex + 1) % saltLen
    }
    return ccodes
  }
  function crypt(str) {
    return saltCharCodes(stringToCCodes(str)).map(ccode => ccode.toString(16)).join(JOIN_CHAR)
  }
  function decrypt(str) {
    if (!str) {
      return str
    }
    const ccodes = str.split(JOIN_CHAR).map((s) => parseInt(s, 16))
    const saltedCcodes = saltCharCodes(ccodes, { unSalt: true })
    return saltedCcodes.map(code => String.fromCharCode(code)).join('')
  }


  const HexCrypt = {
    crypt, decrypt
  }

  if (typeof window !== "undefined") {
    if (!window.StrInterpolation) {
      window.HexCrypt = HexCrypt;
    }
  } else {
    module.exports = HexCrypt;
  }
})();
