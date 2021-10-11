// Convert the given number into a roman numeral.
// All roman numerals answers should be provided in upper-case.
// https://www.mathsisfun.com/roman-numerals.html

function convertToRoman(num) {
    var arr = [];
    var result = [];
    var string = num.toString()
    
    for (var i=0; i<string.length; i++){
      arr.push(parseInt(string[i]))
    }
    
    while (arr.length<4){
      arr.unshift(0)
    }
  
    for (var i=0; i<arr.length; i++){
      if(arr[i]==0){
        result.push('');
      } else if (arr[i]<=3){
        var placeHolder = 'a'.repeat(arr[i])
        result.push(placeHolder)
      } else if (arr[i]==4){
        result.push('ab')
      } else if (arr[i]>=5 && arr[i]<9){
        var placeHolder = 'b'+'a'.repeat(arr[i]-5)
        result.push(placeHolder)
      } else if (arr[i]==9){
        result.push('ac')
      }
    }
  
    for (var i=0; i<result.length; i++){
      if (i==0){
        result[i] = result[i].replace(/a/g,'M')
      } else if (i==1){
        result[i] = result[i].replace(/a/g,'C').replace(/b/g,'D').replace(/c/,'M')
      } else if (i==2){
        result[i] = result[i].replace(/a/g,'X').replace(/b/g,'L').replace(/c/,'C')
      } else if (i==3){
        result[i] = result[i].replace(/a/g,'I').replace(/b/g,'V').replace(/c/,'X')
      }
    } 
  
    var finalResult = result.join('')
  
    // console.log(result)
    console.log(finalResult)
  
   return finalResult;
  }
  
  convertToRoman(649);