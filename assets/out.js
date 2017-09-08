/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {

  /*** variables ***/

  var startButton = $('#startButton');
  var backButton = $('#backButton');
  var invitation = $('#invitation');
  var options = $('#options');
  var content = $('#content');
  var list = $('#list');
  var choose = $('#choose');
  var contentInfo = $('#contentInfo');
  var firstOption = options.children().eq(0);
  var secondOption = options.children().eq(1);
  var thirdOption = options.children().eq(2);
  var fourthOption = options.children().eq(3);

  /*** startButton click event ***/

  startButton.on('click', function () {
    invitation.children().eq(0).css('display', 'none');
    invitation.children().eq(1).css('display', 'none');
    invitation.children().eq(2).css('display', 'none');
    $(this).css('display', 'none');
    choose.css('display', 'flex');
    options.css('display', 'flex');
  });

  /*** backButton click event ***/

  backButton.on('click', function () {
    content.css('display', 'none');
    options.css('display', 'flex');
    choose.css('display', 'flex');
  });

  /*** Hiding or showing elements when option is clicked ***/

  function resetElements() {
    list.empty();
    options.css('display', 'none');
    choose.css('display', 'none');
    list.css('display', 'none');
    content.css('display', 'flex');
    backButton.css('display', 'flex');
    $('#showButton').remove();
    $('#anotherDateButton').remove();
    $('#calculateButton').remove();
  }

  /*** firstOption click event ***/

  firstOption.on('click', function () {
    resetElements();
    contentInfo.text('Content is loading...');
    $.ajax({
      url: "https://api.fixer.io/latest",
      data: "GET",
      dataType: 'json'
    }).done(function (response) {
      insertContent(response);
    }).fail(function (error) {
      console.log('FirstOption error : ' + error);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    var insertContent = function insertContent(resp) {
      contentInfo.text('Exchange rates for 1 EUR on ' + resp.date + ':');
      list.css('display', 'flex');
      for (var key in resp.rates) {
        var listElement = $('<li class="listElement">' + key + ' = ' + resp.rates[key] + '</li>');
        list.append(listElement);
      }
    };
  });

  /*** secondOption click event ***/

  secondOption.on('click', function () {
    resetElements();
    contentInfo.text('Select your date:');

    var selectYear = $('<select id="yearSelect"/>');
    for (var i = 2000; i < new Date().getFullYear(); i++) {
      selectYear.append($('<option value=\'' + i + '\'>' + i + '</option>'));
    }

    selectYear.change(function () {
      $('#daySelect').remove();
      var selectDay = $('<select id="daySelect"/>');
      for (var _i = 1; _i <= new Date(selectYear.val(), selectMonth.val(), 1, -1).getDate(); _i++) {
        if (_i < 10) {
          selectDay.append($('<option value=\'0' + _i + '\'>0' + _i + '</option>'));
        } else {
          selectDay.append($('<option value=\'' + _i + '\'>' + _i + '</option>'));
        }
      }
      selectDay.css("font-size", "2rem");
      showButton.before(selectDay);
    });

    var selectMonth = $('<select id="monthSelect"/>');
    for (var _i2 = 1; _i2 <= 12; _i2++) {
      if (_i2 < 10) {
        selectMonth.append($('<option value=\'0' + _i2 + '\'>0' + _i2 + '</option>'));
      } else {
        selectMonth.append($('<option value=\'' + _i2 + '\'>' + _i2 + '</option>'));
      }
    }

    selectMonth.change(function () {
      $('#daySelect').remove();
      var selectDay = $('<select id="daySelect"/>');
      for (var _i3 = 1; _i3 <= new Date(selectYear.val(), selectMonth.val(), 1, -1).getDate(); _i3++) {
        if (_i3 < 10) {
          selectDay.append($('<option value=\'0' + _i3 + '\'>0' + _i3 + '</option>'));
        } else {
          selectDay.append($('<option value=\'' + _i3 + '\'>' + _i3 + '</option>'));
        }
      }
      selectDay.css("font-size", "2rem");
      showButton.before(selectDay);
    });

    var selectDay = $('<select id="daySelect"/>');
    for (var _i4 = 1; _i4 <= new Date(selectYear.val(), selectMonth.val(), 1, -1).getDate(); _i4++) {
      if (_i4 < 10) {
        selectDay.append($('<option value=\'0' + _i4 + '\'>0' + _i4 + '</option>'));
      } else {
        selectDay.append($('<option value=\'' + _i4 + '\'>' + _i4 + '</option>'));
      }
    }

    var showButton = $('<div id="showButton">Show!</div>').css("display", "flex");

    showButton.on('click', function () {
      contentInfo.text('Content is loading...');
      $.ajax({ url: 'https://api.fixer.io/' + $('#yearSelect').val() + '-' + $('#monthSelect').val() + '-' + $('#daySelect').val(), data: "GET", dataType: 'json' }).done(function (response) {
        insertContent(response);
      }).fail(function (error) {
        console.log('SecondOption error : ' + error);
        contentInfo.text('Connection error has occured. Please click Return.');
        list.css('display', 'none');
      });
      var insertContent = function insertContent(resp) {
        list.empty();
        contentInfo.text('Exchange rates for 1 EUR on ' + resp.date + ':');
        for (var key in resp.rates) {
          var listElement = $('<li class="listElement">' + key + ' = ' + resp.rates[key] + '</li>');
          list.append(listElement);
        }
      };
    });

    var form = $('<form></form>');
    var label = $('<label>Year / Month / Day</label>');
    selectDay.css("font-size", "2rem");
    selectMonth.css("font-size", "2rem");
    selectYear.css("font-size", "2rem");
    label.css("font-size", "1.6rem");
    label.css("display", "block");
    list.css('display', 'flex');
    form.append(label);
    form.append(selectYear);
    form.append(selectMonth);
    form.append(selectDay);
    form.append(showButton);
    list.append(form);
  });

  /*** thirdOption click event ***/

  thirdOption.on('click', function () {
    resetElements();
    contentInfo.text('Content is loading...');

    $.ajax({
      url: 'https://api.fixer.io/latest',
      data: "GET",
      dataType: 'json'
    }).done(function (response) {
      getCurrency(response);
    }).fail(function (error) {
      console.log("Error in thirdOption");
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    var getCurrency = function getCurrency(resp) {
      list.css('display', 'flex');
      contentInfo.text('Select new currency:');
      var selectCurrency = $('<select id="currencySelect"/>');
      $.each(resp.rates, function (index, element) {
        selectCurrency.append($('<option value=\'' + index + '\'>' + index + '</option>'));
      });

      var anotherDateButton = $('<div id="anotherDateButton">Show!</div>').css("display", "flex");
      var form = $('<form></form>');
      var label = $('<label>Currency</label>');
      selectCurrency.css("font-size", "2rem");
      label.css("font-size", "1.6rem");
      label.css("display", "block");
      form.append(label);
      form.append(selectCurrency);
      form.append(anotherDateButton);
      list.append(form);
    };
  });

  $(document).on('click', '#anotherDateButton', function () {
    contentInfo.text('Content is loading...');
    list.css('display', 'none');
    $.ajax({
      url: 'https://api.fixer.io/latest?base=' + $('#currencySelect').val(),
      data: "GET",
      dataType: 'json'
    }).done(function (response) {
      insertContent(response);
    }).fail(function (error) {
      console.log('ThirdOption error : ' + error);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });
    list.empty();

    var insertContent = function insertContent(resp) {
      list.css('display', 'flex');
      contentInfo.text('Exchange rates for 1 ' + resp.base + ' on ' + resp.date + ':');
      for (var key in resp.rates) {
        var listElement = $('<li class="listElement">' + key + ' = ' + resp.rates[key] + '</li>');
        list.append(listElement);
      }
    };
  });

  /*** fourthOption click event ***/

  fourthOption.on('click', function () {
    resetElements();
    contentInfo.text('Content is loading...');

    $.ajax({
      url: 'https://api.fixer.io/latest',
      data: "GET",
      dataType: 'json'
    }).done(function (response) {
      getCurrency(response);
    }).fail(function (error) {
      console.log("Error in fourthOption");
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    var getCurrency = function getCurrency(resp) {
      list.css('display', 'flex');
      contentInfo.text('Select both currencies and type the amount:');
      var inputFirstCurrency = $('<input type="number" value="1" id="firstCurrencyInput"/>');

      var selectFirstCurrency = $('<select id="firstCurrencySelect"/>');
      selectFirstCurrency.append($('<option value=\'EUR\'>EUR</option>'));
      $.each(resp.rates, function (index, element) {
        selectFirstCurrency.append($('<option value=\'' + index + '\'>' + index + '</option>'));
      });

      var selectSecondCurrency = $('<select id="secondCurrencySelect"/>');
      selectSecondCurrency.append($('<option value=\'EUR\'>EUR</option>'));
      $.each(resp.rates, function (index, element) {
        selectSecondCurrency.append($('<option value=\'' + index + '\'>' + index + '</option>'));
      });

      var calculateButton = $('<div id="calculateButton">Calculate!</div>').css("display", "flex");
      var form = $('<form></form>');
      var label = $('<label>Your currency -> Amount -> Target currency</label>');
      selectFirstCurrency.css("font-size", "2rem");
      selectSecondCurrency.css("font-size", "2rem");
      inputFirstCurrency.css("font-size", "2rem");
      inputFirstCurrency.css("width", "80px");
      label.css("font-size", "1.6rem");
      label.css("display", "block");
      form.append(label);
      form.append(selectFirstCurrency);
      form.append(inputFirstCurrency);
      form.append(selectSecondCurrency);
      form.append(calculateButton);
      list.append(form);
    };
  });

  $(document).on('click', '#calculateButton', function () {
    var _this = this;

    contentInfo.text('Content is loading...');
    list.css('display', 'none');
    $(this).css('display', 'none');
    $.ajax({
      url: 'https://api.fixer.io/latest?base=' + $('#firstCurrencySelect').val(),
      data: "GET",
      dataType: 'json'
    }).done(function (response) {
      insertContent(response);
    }).fail(function (error) {
      console.log('FirstOption error : ' + error);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });
    var insertContent = function insertContent(resp) {
      list.css('display', 'flex');
      $(_this).css('display', 'flex');
      var multResult = (parseInt($('#firstCurrencyInput').val()) * resp.rates[$('#secondCurrencySelect').val()]).toFixed(2);
      if (resp.base == $('#secondCurrencySelect').val()) {
        multResult = $('#firstCurrencyInput').val();
      }
      contentInfo.text($('#firstCurrencyInput').val() + ' ' + resp.base + ' = ' + multResult + ' ' + $('#secondCurrencySelect').val());
    };
  });
});

/***/ })
/******/ ]);