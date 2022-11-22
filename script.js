let firstImpt = document.querySelector('#fromInp');
let secondimpt = document.querySelector('#toInp');
let first_side_btns = document.querySelectorAll('.listelementfrom')
let second_side_btns = document.querySelectorAll('.listelement')
let bottom_side_of_currency_first = document.querySelector('.from_bottom')
let bottom_side_of_currency_second = document.querySelector('.to_bottom')
const usd_value = 1;
var obj;


var success = true;
async function apiFunc() {
  try {
    const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols');
    const rates = await response.json();
    success = true;
    return rates;
  } catch (error) {
    success = false;
    console.log(error)
    return []
  }

}

first_side_btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let btn_checked_btn_for_value_change = e.target.innerText
    let second_side_checked_btn = document.querySelector('.activeto').innerText


    document.querySelector('.activefrom').classList.remove('activefrom')
    e.target.classList.add('activefrom')
    if (firstImpt.value) {
      if (btn_checked_btn_for_value_change != second_side_checked_btn) {
        apiFunc().then(res => {
          secondimpt.value = res.rates[`${second_side_checked_btn}`]
            /
            res.rates[`${btn_checked_btn_for_value_change}`] * firstImpt.value
        })
      }
      else { secondimpt.value = firstImpt.value; }
    }
    apiFunc().then(res => {
      bottom_side_of_currency_first.innerText = `1 ${e.target.innerText}`
        + " = " + `${(res.rates[second_side_checked_btn] / res.rates[e.target.innerText]).toFixed(4)}`
        + `${second_side_checked_btn}`
      bottom_side_of_currency_second.innerText = `1 ${second_side_checked_btn}`
        + ` = `
        + `${(res.rates[e.target.innerText] / res.rates[second_side_checked_btn]).toFixed(4)}`
        + ` ${e.target.innerText}`
    })


  })
})
second_side_btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let btn_checked_btn_for_value_change = e.target.innerText
    let first_side_checked_btn = document.querySelector('.activefrom').innerText


    document.querySelector('.activeto').classList.remove('activeto')
    e.target.classList.add('activeto')
    if (secondimpt.value) {
      if (btn_checked_btn_for_value_change != first_side_checked_btn) {
        apiFunc().then(res => {
          firstImpt.value = res.rates[`${first_side_checked_btn}`]
            /
            res.rates[`${btn_checked_btn_for_value_change}`] * secondimpt.value
        })
      }
      else {

        firstImpt.value = secondimpt.value;
      }
    }
    apiFunc().then(res => {
      bottom_side_of_currency_second.innerText = `1 ${e.target.innerText}` + " = "
        + `${(res.rates[first_side_checked_btn] / res.rates[e.target.innerText]).toFixed(4)} `
        + `${first_side_checked_btn}`
      bottom_side_of_currency_first.innerText = `1 ${first_side_checked_btn} `
        + `= ` + `${(res.rates[e.target.innerText] / res.rates[first_side_checked_btn]).toFixed(4)}`
        + `${e.target.innerText}`
    })

  })
})


firstImpt.addEventListener('input', (e) => {
  let first_side_checked_btn = document.querySelector('.activefrom').innerText
  let second_side_checked_btn = document.querySelector('.activeto').innerText

  if (first_side_checked_btn != second_side_checked_btn) {
    apiFunc().then((res) => {
      secondimpt.value = res.rates[`${second_side_checked_btn}`] / res.rates[`${first_side_checked_btn}`] * e.target.value;

    })
  } else {
    secondimpt.value = e.target.value;
  }
})

secondimpt.addEventListener('input', (e) => {
  let first_side_checked_btn = document.querySelector('.activefrom').innerText
  let second_side_checked_btn = document.querySelector('.activeto').innerText

  if (first_side_checked_btn != second_side_checked_btn) {
    apiFunc().then((res) => {
      firstImpt.value = res.rates[`${first_side_checked_btn}`] / res.rates[`${second_side_checked_btn}`] * e.target.value;
    })
  } else {
    firstImpt.value = e.target.value;
  }
})