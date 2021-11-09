const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const reset = $('#reset');
const tipBtns = $$('.button-tip');
const tipCustomBtn = $('#tip-custom');
const tipCustomInput = $('#tip-custom-input');
const billInput = $('#bill');
const peopleInput = $('#people');
const totalResult = $('#total');
const amountResult = $('#amount');
const submitBtn = $('#submit-btn');

const app = {
  bill: 0,
  tip: 0,
  people: 0,
  total: 0,
  amount: 0,
  isRequest: false,

  renderTipBtn: function () {
    if ($('.button-tip.active')) {
      $('.button-tip.active').classList.remove('active');
    }

    tipBtns.forEach(function (tipBtn) {
      if (tipBtn.dataset.index == app.tip) {
        tipBtn.classList.add('active');
      }
    });
  },

  renderResult: function () {
    totalResult.innerText = app.formattedNumber(app.total);
    amountResult.innerText = app.formattedNumber(app.amount);
  },

  clickTipBtn: function () {
    for (let i = 0; i < tipBtns.length; i++) {
      tipBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        switch (this.id) {
          case 'tip-5':
            app.tip = 5;
            app.renderTipBtn();
            app.toggleBtn(reset);
            app.toggleBtn(submitBtn);
            // app.calResult();
            break;
          case 'tip-10':
            app.tip = 10;
            app.renderTipBtn();
            app.toggleBtn(reset);
            app.toggleBtn(submitBtn);
            // app.calResult();
            break;
          case 'tip-15':
            app.tip = 15;
            app.renderTipBtn();
            app.toggleBtn(reset);
            app.toggleBtn(submitBtn);
            // app.calResult();
            break;
          case 'tip-25':
            app.tip = 25;
            app.renderTipBtn();
            app.toggleBtn(reset);
            app.toggleBtn(submitBtn);
            // app.calResult();
            break;
          case 'tip-50':
            app.tip = 50;
            app.renderTipBtn();
            app.toggleBtn(reset);
            app.toggleBtn(submitBtn);
            // app.calResult();
            break;
        }
      });
    }
  },

  hanldeEvents: function () {
    billInput.oninput = function (e) {
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
      }
      app.removeValidator('.calculator__input__bill');
      app.bill = Number(e.target.value);
      // app.calResult();
      app.toggleBtn(reset);
      app.toggleBtn(submitBtn);
    };

    billInput.onkeydown = function (e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode == 8 ||
          e.keyCode == 37 ||
          e.keyCode == 39 ||
          e.keyCode == 46 ||
          e.keyCode == 110
        )
      ) {
        return false;
      }
    };

    billInput.onblur = function () {
      if (app.bill == 0) {
        app.addValidator(billInput, '.calculator__input__bill');
      }
    };

    peopleInput.oninput = function (e) {
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
      }
      app.removeValidator('.calculator__input__people');
      app.people = Number(e.target.value);
      // app.calResult();
      app.toggleBtn(reset);
      app.toggleBtn(submitBtn);
    };

    peopleInput.onkeydown = function (e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode == 8 ||
          e.keyCode == 37 ||
          e.keyCode == 39 ||
          e.keyCode == 46
        )
      ) {
        return false;
      }
    };

    peopleInput.onblur = function () {
      if (app.people == 0) {
        app.addValidator(peopleInput, '.calculator__input__people');
      }
    };

    tipCustomInput.onfocus = function () {
      if ($('.button-tip.active')) {
        $('.button-tip.active').classList.remove('active');
      }
    };

    tipCustomInput.oninput = function (e) {
      if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
      }
      app.tip = Number(e.target.value);
      app.renderTipBtn();
      // app.calResult();
      app.toggleBtn(reset);
      app.toggleBtn(submitBtn);
    };

    tipCustomInput.onkeydown = function (e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode == 8 ||
          e.keyCode == 37 ||
          e.keyCode == 39 ||
          e.keyCode == 46 ||
          e.keyCode == 110
        )
      ) {
        return false;
      }
    };

    tipCustomBtn.onclick = function (e) {
      e.target.style.display = 'none';
      tipCustomInput.style.display = 'block';
    };

    reset.onclick = function () {
      app.resetApp();
    };

    submitBtn.onclick = function (e) {
      e.preventDefault();
      if (app.bill == 0) {
        app.addValidator(billInput, '.calculator__input__bill');
      }
      if (app.people == 0) {
        app.addValidator(peopleInput, '.calculator__input__people');
      }
      if (app.bill && app.people) {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.classList.add('disabled-btn');
        app.isRequest = true;
        app.fetchResult().then(({ result, total, amount }) => {
          if (result) {
            app.total = total;
            app.amount = amount;
            app.renderResult();
            app.toggleBtn(submitBtn);
            app.isRequest = false;
          }
        });

        const checkRequest = setTimeout(() => {
          if (app.isRequest) {
            app.isRequest = false;
            app.toggleBtn(submitBtn);
            alert('Request failed');
            if (!app.isRequest) {
              clearTimeout(checkRequest);
            }
          }
        }, 10000);
      }
    };
  },

  calResult: function () {
    if (app.people !== 0 && app.bill !== 0) {
      app.amount = app.calAmount();
      app.total = app.calTotal();
      app.renderResult();
    }
  },

  calAmount: function () {
    let result = 0;
    result = (app.bill * (app.tip / 100)) / app.people;
    return result;
  },

  calTotal: function () {
    let result = 0;
    result = (app.bill * (app.tip / 100) + app.bill) / app.people;
    return result;
  },

  resetApp: function () {
    app.bill = 0;
    app.tip = 0;
    app.people = 0;
    app.total = 0;
    app.amount = 0;
    billInput.value = '';
    peopleInput.value = '';
    app.renderTipBtn();
    app.renderResult();
    app.toggleBtn(reset);
    app.toggleBtn(submitBtn);
    tipCustomBtn.style.display = 'block';
    tipCustomInput.style.display = 'none';
    tipCustomInput.value = '';
    app.removeValidator('.calculator__input__bill');
    app.removeValidator('.calculator__input__people');
  },

  formattedNumber: function (num) {
    if (num == '-') {
      return '';
    }
    let n = Number(num);
    const value = (Math.round(n * 100) / 100).toFixed(2);
    return value;
  },

  removeValidator: function (selector) {
    const inputValid = $(`${selector}.invalid`);
    if (inputValid) {
      inputValid.classList.remove('invalid');
    }
  },

  addValidator: function (element, selector) {
    if (element) {
      var parentElement = app.getParent(element, selector);
      if (parentElement) {
        parentElement.classList.add('invalid');
      }
    }
  },

  getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  },

  toggleBtn: function (element) {
    if (app.bill == 0 && app.tip == 0 && app.people == 0) {
      element.setAttribute('disabled', 'true');
      element.classList.add('disabled-btn');
    } else {
      element.removeAttribute('disabled');
      element.classList.remove('disabled-btn');
    }
  },

  fetchResult: async function () {
    const response = await fetch(
      `https://plitter-server.vercel.app/api/calculate?bill=${app.bill}&people=${app.people}&tipPercent=${app.tip}`
    );
    const data = await response.json();
    return data;
  },

  start: function () {
    this.clickTipBtn();
    this.renderTipBtn();
    this.hanldeEvents();
  },
};

app.start();
