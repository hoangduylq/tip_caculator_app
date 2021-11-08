const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const reset = $('#reset');
const tipBtns = $$('.button-tip');
const billInput = $('#bill');
const peopleInput = $('#people');
const totalResult = $('#total');
const amountResult = $('#amount');

const app = {
  bill: 0,
  tip: 0,
  people: 0,
  total: 0,
  amount: 0,

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
      tipBtns[i].addEventListener('click', function () {
        if (this.id === 'tip-custom') {
          console.log('custom');
        } else {
          switch (this.id) {
            case 'tip-5':
              app.tip = 5;
              app.renderTipBtn();
              app.calResult();
              break;
            case 'tip-10':
              app.tip = 10;
              app.renderTipBtn();
              app.calResult();
              break;
            case 'tip-15':
              app.tip = 15;
              app.renderTipBtn();
              app.calResult();
              break;
            case 'tip-25':
              app.tip = 25;
              app.renderTipBtn();
              app.calResult();
              break;
            case 'tip-50':
              app.tip = 50;
              app.renderTipBtn();
              app.calResult();
              break;
          }
        }
      });
    }
  },

  hanldeEvents: function () {
    billInput.oninput = function (e) {
      app.bill = Number(e.target.value);
      app.calResult();
    };

    peopleInput.oninput = function (e) {
      app.people = Number(e.target.value);
      app.calResult();
    };

    reset.onclick = function () {
      app.resetApp();
    };
  },

  calResult: async function () {
    if (app.people !== 0) {
      app.amount = await app.calAmount();
      app.total = await app.calTotal();
      await app.renderResult();
    }
  },

  calAmount: function () {
    let result = 0;
    result = (app.bill * (app.tip / 100)) / app.people;
    return result;
  },

  calTotal: function () {
    console.log(app.bill, app.tip, app.people);
    let result = 0;
    console.log(result);
    result = (app.bill * (app.tip / 100) + app.bill) / app.people;
    return result;
  },

  resetApp: function () {
    app.bill = 0;
    app.tip = 0;
    app.people = 0;
    app.total = 0;
    app.amount = 0;
    billInput.value = 0;
    peopleInput.value = 0;
    app.renderTipBtn();
    app.renderResult();
  },

  formattedNumber: function (num) {
    if (num == '-') {
      return '';
    }
    let n = Number(num);
    const value = (Math.round(n * 100) / 100).toFixed(2);
    return value;
  },

  start: function () {
    this.clickTipBtn();
    this.renderTipBtn();
    this.hanldeEvents();
  },
};

app.start();
