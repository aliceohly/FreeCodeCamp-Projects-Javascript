function checkCashRegister(price, cash, cid) {
  let unitPrice = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  var quantity = [];
  var change = cash - price; // how much we need to return
  var changeUsedInCal = change;
  var changeQuaArr = [];
  var changeBreakDown = [];
  var changeObj = { status: "", change: [] };
  var availableBal = 0; // how much we can return
  var zeroBalance = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ];
  // create a copy of the zero balance
  var result = zeroBalance.slice();
  var finalResult = [];

  // balances at the cast register
  var balance = cid.reduce((sum, i) => sum + i[1], 0);

  // quantity = total/unitPirce (quantities available for each unit, for example, quatity should equal to 7 in the case of ["FIVE", 35])
  var balanceBreakDown = cid.map((i) => i[1]);
  for (var i = 0; i < unitPrice.length; i++) {
    quantity.push(Math.round(balanceBreakDown[i] / unitPrice[i]));
  }

  // Looping from the largest currency unit $100 to the smallest $0.01, calcualte the max quatity it can provide for each specific unit. For example, if the change is $45 and we only have $35 ($5*7) in hand, the max quantity we can give for $5 is 7 units.
  for (var i = unitPrice.length - 1; i >= 0; i--) {
    var changeQua = 0;
    var fraction = Math.floor(changeUsedInCal / unitPrice[i]);
    if (fraction >= 1) {
      if (fraction > quantity[i]) {
        changeQua = quantity[i];
      } else {
        changeQua = fraction;
      }
      changeQuaArr.unshift(changeQua);
      changeUsedInCal -= changeQua * unitPrice[i];
      changeUsedInCal = changeUsedInCal.toFixed(2); // round it to 2 decimal places
    } else {
      changeQuaArr.unshift(0);
    }
  }

  for (var i = 0; i < unitPrice.length; i++) {
    changeBreakDown.push(changeQuaArr[i] * unitPrice[i]);
  }

  // calculate the max amount we can change
  availableBal = changeBreakDown.reduce((sum, i) => sum + i, 0);

  // result will look like [ [ 'PENNY', 0.04 ],[ 'NICKEL', 0 ], [ 'DIME', 0.2 ], [ 'QUARTER', 0.5 ], [ 'ONE', 1 ], [ 'FIVE', 15 ], [ 'TEN', 20 ], [ 'TWENTY', 60 ], [ 'ONE HUNDRED', 0 ] ]
  for (var i = 0; i < result.length; i++) {
    result[i][1] = changeBreakDown[i];
  }

  // filter $0 balances and sort from highest to lowest values
  // result will look like [ [ 'TWENTY', 60 ], [ 'TEN', 20 ], [ 'FIVE', 15 ], [ 'ONE', 1 ], [ 'QUARTER', 0.5 ], [ 'DIME', 0.2 ], [ 'PENNY', 0.04 ] ]
  finalResult = result.filter((i) => i[1] > 0).sort((a, b) => b[1] - a[1]);

  // console.log(finalResult)

  // Case 1: insufficient funds
  if (result.every((i) => i[1] == 0) || availableBal < change) {
    changeObj.status = "INSUFFICIENT_FUNDS";
    changeObj.change = [];
  }
  // Case 2: 2.1. sufficient funds and closed; 2.2. sufficients funds and open
  else {
    if (change == balance) {
      changeObj.status = "CLOSED";
      changeObj.change = result;
    } else {
      changeObj.status = "OPEN";
      changeObj.change = finalResult;
    }
  }

  console.log(changeObj);
  return changeObj;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
