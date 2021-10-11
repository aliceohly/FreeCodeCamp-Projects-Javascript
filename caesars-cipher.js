// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.
// A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.
// Write a function which takes a ROT13 encoded string as input and returns a decoded string.
// All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

function rot13(str) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let reg = /[A-Z]/
    var resultArray = str.split('').map(decipher)
    
    // Javascript does not take negative index
    function decipher(value){
      if (reg.test(value)){
        if (alphabet.indexOf(value) >= 13){
          return alphabet[alphabet.indexOf(value)-13]
        } else {
          return alphabet[26-(13-alphabet.indexOf(value))]
        }
      }
      return value
    }
  
    // console.log(resultArray)
    var resultString = resultArray.join('')
    // console.log(resultString)
    return resultString;
  }
  
  rot13("SERR PBQR PNZC");