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
      });
    }
  },

  hanldeEvents: function () {
    billInput.oninput = function (e) {
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
      }
      app.bill = Number(e.target.value);
      app.calResult();
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

    peopleInput.oninput = function (e) {
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
      }
      app.removeValidator();
      app.people = Number(e.target.value);
      app.calResult();
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
      app.calResult();
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

    peopleInput.onblur = function () {
      if (app.people == 0) {
        app.addValidator();
      }
    };

    reset.onclick = function () {
      app.resetApp();
    };

    tipCustomBtn.onclick = function (e) {
      e.target.style.display = 'none';
      tipCustomInput.style.display = 'block';
    };
  },

  calResult: function () {
    if (app.people !== 0) {
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
    billInput.value = 0;
    peopleInput.value = 0;
    app.renderTipBtn();
    app.renderResult();
    tipCustomBtn.style.display = 'block';
    tipCustomInput.style.display = 'none';
    tipCustomInput.value = 0;
    app.removeValidator();
  },

  formattedNumber: function (num) {
    if (num == '-') {
      return '';
    }
    let n = Number(num);
    const value = (Math.round(n * 100) / 100).toFixed(2);
    return value;
  },

  removeValidator: function () {
    const peopleInputValid = $('.calculator__input__people.invalid');
    if (peopleInputValid) {
      peopleInputValid.classList.remove('invalid');
    }
  },

  addValidator: function () {
    if (peopleInput) {
      var peopleInputWrap = app.getParent(
        peopleInput,
        '.calculator__input__people'
      );
      if (peopleInputWrap) {
        peopleInputWrap.classList.add('invalid');
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

  start: function () {
    this.clickTipBtn();
    this.renderTipBtn();
    this.hanldeEvents();
  },
};

app.start();
