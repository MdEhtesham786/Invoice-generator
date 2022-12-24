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
let srNos = document.querySelectorAll('.srNos');
let products = document.querySelectorAll('.products');
let beforeTaxCheck = () => {
  if (amountOne.value) {
    if (amountTwo.value) {
      if (amountThree.value) {
        beforeTaxTotal.value =
          parseFloat(amountOne.value) +
          parseFloat(amountTwo.value) +
          parseFloat(amountThree.value);
      } else {
        beforeTaxTotal.value =
          parseFloat(amountOne.value) + parseFloat(amountTwo.value);
      }
    } else {
      if (amountThree.value) {
        beforeTaxTotal.value =
          parseFloat(amountOne.value) + parseFloat(amountThree.value);
      } else {
        beforeTaxTotal.value = parseFloat(amountOne.value);
      }
    }
  } else if (amountTwo.value) {
    if (amountThree.value) {
      beforeTaxTotal.value =
        parseFloat(amountTwo.value) + parseFloat(amountThree.value);
    } else {
      beforeTaxTotal.value = parseFloat(amountTwo.value);
    }
  } else if (amountThree.value) {
    beforeTaxTotal.value = parseFloat(amountThree.value);
  } else {
    beforeTaxTotal.value = '';
    cgst.value = '';
    sgst.value = '';
    afterTaxTotal.value = '';

  }
  if (beforeTaxTotal.value) {
    cgstValue = (9 / 100) * parseFloat(beforeTaxTotal.value);
    sgstValue = (9 / 100) * parseFloat(beforeTaxTotal.value);
    afterTaxTotalValue = parseFloat(beforeTaxTotal.value) + cgstValue + sgstValue;
    cgst.value = cgstValue.toFixed(2);
    sgst.value = sgstValue.toFixed(2);
    afterTaxTotal.value = afterTaxTotalValue.toFixed(2);
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
    amountOne.value = "";
    `  `;
  } else {
    if (rateValueOne == null || rateValueOne == "") {
      amountOne.value = "";


    } else {
      amountOne.value = parseFloat(quantityValueOne) * parseInt(rateValueOne);
      amountOne.value = parseFloat(amountOne.value).toFixed(2);
    }
  }
  beforeTaxCheck();
});
quantityTwo.addEventListener("input", function () {
  quantityValueTwo = quantityTwo.value;
  if (quantityValueTwo == null || quantityValueTwo == "") {
    amountTwo.value = "";
  } else {
    if (rateValueTwo == null || rateValueTwo == "") {
      amountTwo.value = "";
    } else {
      amountTwo.value = parseFloat(quantityValueTwo) * parseInt(rateValueTwo);
      amountTwo.value = parseFloat(amountTwo.value).toFixed(2);
    }
  }
  beforeTaxCheck();
});
quantityThree.addEventListener("input", function () {
  quantityValueThree = quantityThree.value;
  if (quantityValueThree == null || quantityValueThree == "") {
    amountThree.value = "";

  } else {
    if (rateValueThree == null || rateValueThree == "") {
      amountThree.value = "";


    } else {
      amountThree.value =
        parseFloat(quantityValueThree) * parseInt(rateValueThree);
      amountThree.value = parseFloat(amountThree.value).toFixed(2);
    }
  }
  beforeTaxCheck();
});
rateOne.addEventListener("input", function () {
  rateValueOne = rateOne.value;
  if (rateValueOne == null || rateValueOne == "") {
    amountOne.value = "";
  } else {
    if (quantityValueOne == null || quantityValueOne == "") {
      amountOne.value = "";
    } else {
      amountOne.value = parseFloat(quantityValueOne) * parseInt(rateValueOne);
      amountOne.value = parseFloat(amountOne.value).toFixed(2);
    }
  }
  console.log('one');
  beforeTaxCheck();
});
rateTwo.addEventListener("input", function () {
  rateValueTwo = rateTwo.value;
  if (rateValueTwo == null || rateValueTwo == "") {
    amountTwo.value = "";
  } else {
    if (quantityValueTwo == null || quantityValueTwo == "") {
      amountTwo.value = "";
    } else {
      amountTwo.value = parseFloat(quantityValueTwo) * parseInt(rateValueTwo);
      amountTwo.value = parseFloat(amountTwo.value).toFixed(2);
    }
  }

  beforeTaxCheck();
});
rateThree.addEventListener("input", function () {
  rateValueThree = rateThree.value;
  if (rateValueThree == null || rateValueThree == "") {
    amountThree.value = "";

  } else {
    if (quantityValueThree == null || quantityValueThree == "") {
      amountThree.value = "";


    } else {
      amountThree.value =
        parseFloat(quantityValueThree) * parseInt(rateValueThree);
      amountThree.value = parseFloat(amountThree.value).toFixed(2);
    }
  }
  console.log('three');

  beforeTaxCheck();
});

// let inputs = document.querySelectorAll('input');
// inputs.forEach((input) => {
//   input.value = '123';
// });
products.forEach((product, i) => {
  product.addEventListener('focus', () => {
    srNos[i].innerText = i + 1 + ' .';
  });
});
products.forEach((product, i) => {
  product.addEventListener('focusout', () => {
    if (!products[i].value) {
      if (products[i + 1]) {
        if (!products[i + 1].value) {
          if (products[i + 2]) {
            if (!products[i + 2].value) {
              srNos[i].innerText = '';

            }
          } else {
            srNos[i].innerText = '';
          }

        }
      } else {
        srNos[i].innerText = '';
      }
    }
  });
});
products.forEach((product, i) => {
  product.addEventListener('input', () => {
    if (products[i + 1]) {
      if (products[i].value) {
        products[i + 1].style.display = 'inline-block';
      } else {
        if (!products[i + 1].value) {
          if (products[i + 2]) {

            if (!products[i + 2].value) {
              products[i + 1].value = '';
              products[i + 1].style.display = 'none';
            }
          } else {
            products[i + 1].value = '';
            products[i + 1].style.display = 'none';
          }
        }
        if (products[i + 2]) {
          if (!products[i + 1].value) {
            if (!products[i + 2].value) {
              products[i + 2].value = '';
              products[i + 2].style.display = 'none';
            }


          }
        }

      }
    } else {
      if (!products[i].value) {
        if (!products[i - 2].value) {
          if (!products[i - 1].value) {
            products[i - 1].style.display = 'none';
            products[i].style.display = 'none';
          }
        } else {
          if (!products[i - 1].value) {
            products[i].style.display = 'none';
          }
        }

      }
    }
  });
});
// products.forEach((product, i) => {
//   product.addEventListener('click', () => {
//     if (products[i].getAttribute('name') == 'productOne') {
//       products[i + 1].style.display = 'inline-block';
//       if (!products[i + 2].value) {
//         products[i + 2].style.display = 'none';
//         srNos[i + 2].innerText = '';
//       }
//       if (!products[i + 1].value) {
//         products[i + 2].style.display = 'none';

//         srNos[i + 1].innerText = '';
//       }

//     } else if (products[i].getAttribute('name') == 'productTwo') {
//       products[i + 1].style.display = 'inline-block';
//       if (!products[i + 1].value) {
//         srNos[i + 1].innerText = '';
//       }
//     } else {
//     }
//     srNos[i].innerText = i + 1;
//   });
// });