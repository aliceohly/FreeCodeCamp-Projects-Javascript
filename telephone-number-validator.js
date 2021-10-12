function telephoneCheck(str) {
  // Return false if it contains letters or special characters
  let reg = /[a-zA-Z;#&!<>*@?]/;
  if (reg.test(str)) {
    return false;
  }

  // Apply different logics based on the length
  let nonNum = /[^0-9]/;
  var arr = str.split("").filter((i) => !nonNum.test(i));

  if (arr.length == 10) {
    return check(
      str
        .split("")
        .filter((i) => i !== " ")
        .join("")
    );
  } else if (arr.length == 11) {
    //return false if it does not start with 1
    if (parseInt(str.split("")[0]) !== 1) {
      return false;
    } else {
      var modifiedStr = str.split("");
      modifiedStr.shift();
      return check(modifiedStr.join(""));
    }
  } else {
    return false;
  }

  function check(string) {
    console.log(string);
    let leftBraket = /[\(]/g;
    let rightBraket = /[\)]/g;
    let hyphen = /[\-]/;
    if (leftBraket.test(string)) {
      if (string[string.indexOf("(") + 4] !== ")") {
        return false;
      }
    } else if (rightBraket.test(string)) {
      if (string[string.indexOf(")") - 4] !== "(") {
        return false;
      } else if (
        hyphen.test(string) &&
        string.indexOf("-") !== string.indexOf(")") + 4
      ) {
        return false;
      }
    } else if (hyphen.test(string)) {
      if (string.indexOf("-", 6) - string.indexOf("-") !== 4) {
        return false;
      }
    }
    return true;
  }
}

telephoneCheck("55 55-55-555-5");
