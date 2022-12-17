let code = document.querySelectorAll(".code");
let quantityOne = document.getElementById("quantityOne");
let rateOne = document.getElementById("rateOne");
let amountOne = document.getElementById("amountOne");
let quantityTwo = document.getElementById("quantityTwo");
let rateTwo = document.getElementById("rateTwo");
let amountTwo = document.getElementById("amountTwo");
let quantityThree = document.getElementById("quantityThree");
let rateThree = document.getElementById("rateThree");
let amountThree = document.getElementById("amountThree");
let beforeTaxTotal = document.getElementById("beforeTaxTotal");
let cgst = document.getElementById('cgst');
let sgst = document.getElementById('sgst');
let afterTaxTotal = document.getElementById('afterTaxTotal');
let rateValueOne;
let rateValueTwo;
let rateValueThree;
let quantityValueOne;
let quantityValueTwo;
let quantityValueThree;
let cgstValue = 0;
let sgstValue = 0;
let afterTaxTotalValue = 0;
let beforeTaxCheck = () => {
  if (amountOne.innerText) {
    if (amountTwo.innerText) {
      if (amountThree.innerText) {
        beforeTaxTotal.innerText =
          parseInt(amountOne.innerText) +
          parseInt(amountTwo.innerText) +
          parseInt(amountThree.innerText);
      } else {
        beforeTaxTotal.innerText =
          parseInt(amountOne.innerText) + parseInt(amountTwo.innerText);
      }
    } else {
      if (amountThree.innerText) {
        beforeTaxTotal.innerText =
          parseInt(amountOne.innerText) + parseInt(amountThree.innerText);
      } else {
        beforeTaxTotal.innerText = parseInt(amountOne.innerText);
      }
    }
  } else if (amountTwo.innerText) {
    if (amountThree.innerText) {
      beforeTaxTotal.innerText =
        parseInt(amountTwo.innerText) + parseInt(amountThree.innerText);
    } else {
      beforeTaxTotal.innerText = parseInt(amountTwo.innerText);
    }
  } else if (amountThree.innerText) {
    beforeTaxTotal.innerText = parseInt(amountThree.innerText);
  } else {
    beforeTaxTotal.innerText = '';

  }
  if (beforeTaxTotal.innerText) {
    cgstValue = (9 / 100) * parseInt(beforeTaxTotal.innerText);
    sgstValue = (9 / 100) * parseInt(beforeTaxTotal.innerText);
    afterTaxTotalValue = parseInt(beforeTaxTotal.innerText) + cgstValue + sgstValue;
    cgst.innerText = cgstValue.toFixed(2);
    sgst.innerText = sgstValue.toFixed(2);
    afterTaxTotal.innerText = afterTaxTotalValue.toFixed(2);
  }
};

code.forEach((element) => {
  element.addEventListener("input", function () {
    if (element.value > 99) {
      element.value = null;
    }
  });
});
quantityOne.addEventListener("input", function () {
  quantityValueOne = quantityOne.value;
  if (quantityValueOne == null || quantityValueOne == "") {
    amountOne.innerText = "";

  } else {
    if (rateValueOne == null || rateValueOne == "") {
      amountOne.innerText = "";


    } else {
      amountOne.innerText = parseInt(quantityValueOne) * parseInt(rateValueOne);
    }
  }
  beforeTaxCheck();
});
quantityTwo.addEventListener("input", function () {
  quantityValueTwo = quantityTwo.value;
  if (quantityValueTwo == null || quantityValueTwo == "") {
    amountTwo.innerText = "";
  } else {
    if (rateValueTwo == null || rateValueTwo == "") {
      amountTwo.innerText = "";
    } else {
      amountTwo.innerText = parseInt(quantityValueTwo) * parseInt(rateValueTwo);
    }
  }
  beforeTaxCheck();
});
quantityThree.addEventListener("input", function () {
  quantityValueThree = quantityThree.value;
  if (quantityValueThree == null || quantityValueThree == "") {
    amountThree.innerText = "";

  } else {
    if (rateValueThree == null || rateValueThree == "") {
      amountThree.innerText = "";


    } else {
      amountThree.innerText =
        parseInt(quantityValueThree) * parseInt(rateValueThree);
    }
  }
  beforeTaxCheck();
});
rateOne.addEventListener("input", function () {
  rateValueOne = rateOne.value;
  if (rateValueOne == null || rateValueOne == "") {
    amountOne.innerText = "";
  } else {
    if (quantityValueOne == null || quantityValueOne == "") {
      amountOne.innerText = "";
    } else {
      amountOne.innerText = parseInt(quantityValueOne) * parseInt(rateValueOne);
    }
  }
  beforeTaxCheck();
});
rateTwo.addEventListener("input", function () {
  rateValueTwo = rateTwo.value;
  if (rateValueTwo == null || rateValueTwo == "") {
    amountTwo.innerText = "";
  } else {
    if (quantityValueTwo == null || quantityValueTwo == "") {
      amountTwo.innerText = "";
    } else {
      amountTwo.innerText = parseInt(quantityValueTwo) * parseInt(rateValueTwo);
    }
  }
  beforeTaxCheck();
});
rateThree.addEventListener("input", function () {
  rateValueThree = rateThree.value;
  if (rateValueThree == null || rateValueThree == "") {
    amountThree.innerText = "";

  } else {
    if (quantityValueThree == null || quantityValueThree == "") {
      amountThree.innerText = "";


    } else {
      amountThree.innerText =
        parseInt(quantityValueThree) * parseInt(rateValueThree);
    }
  }
  beforeTaxCheck();
});

// let inputs = document.querySelectorAll('input');
// inputs.forEach((input) => {
//   input.value = '123';
// });