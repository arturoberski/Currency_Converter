$(() => {

  /*** variables ***/

  let startButton = $('#startButton');
  let backButton = $('#backButton');
  let invitation = $('#invitation');
  let options = $('#options');
  let content = $('#content');
  let list = $('#list');
  let choose = $('#choose');
  let contentInfo = $('#contentInfo');
  let firstOption = options.children().eq(0);
  let secondOption = options.children().eq(1);
  let thirdOption = options.children().eq(2);
  let fourthOption = options.children().eq(3);

  /*** startButton click event ***/

  startButton.on('click', function() {
    invitation.children().eq(0).css('display', 'none');
    invitation.children().eq(1).css('display', 'none');
    invitation.children().eq(2).css('display', 'none');
    $(this).css('display', 'none');
    choose.css('display', 'flex');
    options.css('display', 'flex');
  });

  /*** backButton click event ***/

  backButton.on('click', function() {
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

  firstOption.on('click', function() {
    resetElements();
    contentInfo.text('Content is loading...');
    $.ajax({
      url: '//api.fixer.io/latest',
      data: "GET",
      dataType: 'json'
    }).done(response => {
      insertContent(response);
    }).fail(error => {
      console.log(`FirstOption error : ${error}`);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    let insertContent = (resp) => {
      contentInfo.text(`Exchange rates for 1 EUR on ${resp.date}:`);
      list.css('display', 'flex');
      for (let key in resp.rates) {
        let listElement = $(`<li class="listElement">${key} = ${resp.rates[key]}</li>`);
        list.append(listElement);
      }
    }
  });

  /*** secondOption click event ***/

  secondOption.on('click', function() {
    resetElements();
    contentInfo.text(`Select your date:`);

    let selectYear = $('<select id="yearSelect"/>');
    for (let i = 2000; i < (new Date()).getFullYear(); i++) {
      selectYear.append($(`<option value='${i}'>${i}</option>`));
    }

    selectYear.change(function() {
      $('#daySelect').remove();
      let selectDay = $('<select id="daySelect"/>');
      for (let i = 1; i <= (new Date(selectYear.val(), selectMonth.val(), 1, -1)).getDate(); i++) {
        if (i < 10) {
          selectDay.append($(`<option value='0${i}'>0${i}</option>`));
        } else {
          selectDay.append($(`<option value='${i}'>${i}</option>`));
        }
      }
      selectDay.css("font-size", "2rem");
      showButton.before(selectDay);
    });

    let selectMonth = $('<select id="monthSelect"/>');
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        selectMonth.append($(`<option value='0${i}'>0${i}</option>`));
      } else {
        selectMonth.append($(`<option value='${i}'>${i}</option>`));
      }
    }

    selectMonth.change(function() {
      $('#daySelect').remove();
      let selectDay = $('<select id="daySelect"/>');
      for (let i = 1; i <= (new Date(selectYear.val(), selectMonth.val(), 1, -1)).getDate(); i++) {
        if (i < 10) {
          selectDay.append($(`<option value='0${i}'>0${i}</option>`));
        } else {
          selectDay.append($(`<option value='${i}'>${i}</option>`));
        }
      }
      selectDay.css("font-size", "2rem");
      showButton.before(selectDay);
    });

    let selectDay = $('<select id="daySelect"/>');
    for (let i = 1; i <= (new Date(selectYear.val(), selectMonth.val(), 1, -1)).getDate(); i++) {
      if (i < 10) {
        selectDay.append($(`<option value='0${i}'>0${i}</option>`));
      } else {
        selectDay.append($(`<option value='${i}'>${i}</option>`));
      }
    }

    let showButton = $('<div id="showButton">Show!</div>').css("display", "flex");

    showButton.on('click', function() {
      contentInfo.text('Content is loading...');
      $.ajax({url: `//api.fixer.io/${$('#yearSelect').val()}-${$('#monthSelect').val()}-${$('#daySelect').val()}`, data: "GET", dataType: 'json'}).done(response => {
        insertContent(response);
      }).fail(error => {
        console.log(`SecondOption error : ${error}`);
        contentInfo.text('Connection error has occured. Please click Return.');
        list.css('display', 'none');
      });
      let insertContent = (resp) => {
        list.empty();
        contentInfo.text(`Exchange rates for 1 EUR on ${resp.date}:`);
        for (let key in resp.rates) {
          let listElement = $(`<li class="listElement">${key} = ${resp.rates[key]}</li>`);
          list.append(listElement);
        }
      }
    });

    let form = $('<form></form>');
    let label = $('<label>Year / Month / Day</label>');
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

  thirdOption.on('click', function() {
    resetElements();
    contentInfo.text('Content is loading...');

    $.ajax({
      url: '//api.fixer.io/latest',
      data: "GET",
      dataType: 'json'
    }).done(response => {
      getCurrency(response);
    }).fail(error => {
      console.log("Error in thirdOption");
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    let getCurrency = (resp) => {
      list.css('display', 'flex');
      contentInfo.text('Select new currency:');
      let selectCurrency = $('<select id="currencySelect"/>');
      $.each(resp.rates, function(index, element) {
        selectCurrency.append($(`<option value='${index}'>${index}</option>`));
      })

      let anotherDateButton = $('<div id="anotherDateButton">Show!</div>').css("display", "flex");
      let form = $('<form></form>');
      let label = $('<label>Currency</label>');
      selectCurrency.css("font-size", "2rem");
      label.css("font-size", "1.6rem");
      label.css("display", "block");
      form.append(label);
      form.append(selectCurrency);
      form.append(anotherDateButton);
      list.append(form);
    }
  });

  $(document).on('click', '#anotherDateButton', function() {
    contentInfo.text('Content is loading...');
    list.css('display', 'none');
    $.ajax({
      url: `//api.fixer.io/latest?base=${$('#currencySelect').val()}`,
      data: "GET",
      dataType: 'json'
    }).done(response => {
      insertContent(response);
    }).fail(error => {
      console.log(`ThirdOption error : ${error}`);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });
    list.empty();

    let insertContent = (resp) => {
      list.css('display', 'flex');
      contentInfo.text(`Exchange rates for 1 ${resp.base} on ${resp.date}:`);
      for (let key in resp.rates) {
        let listElement = $(`<li class="listElement">${key} = ${resp.rates[key]}</li>`);
        list.append(listElement);
      }
    }
  });

  /*** fourthOption click event ***/

  fourthOption.on('click', function() {
    resetElements();
    contentInfo.text(`Content is loading...`);

    $.ajax({
      url: '//api.fixer.io/latest',
      data: "GET",
      dataType: 'json'
    }).done(response => {
      getCurrency(response);
    }).fail(error => {
      console.log("Error in fourthOption");
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });

    let getCurrency = (resp) => {
      list.css('display', 'flex');
      contentInfo.text(`Select both currencies and type the amount:`);
      let inputFirstCurrency = $('<input type="number" value="1" id="firstCurrencyInput"/>');

      let selectFirstCurrency = $('<select id="firstCurrencySelect"/>');
      selectFirstCurrency.append($(`<option value='EUR'>EUR</option>`));
      $.each(resp.rates, function(index, element) {
        selectFirstCurrency.append($(`<option value='${index}'>${index}</option>`));
      });

      let selectSecondCurrency = $('<select id="secondCurrencySelect"/>');
      selectSecondCurrency.append($(`<option value='EUR'>EUR</option>`));
      $.each(resp.rates, function(index, element) {
        selectSecondCurrency.append($(`<option value='${index}'>${index}</option>`));
      });

      let calculateButton = $('<div id="calculateButton">Calculate!</div>').css("display", "flex");
      let form = $('<form></form>');
      let label = $('<label>Your currency -> Amount -> Target currency</label>');
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

  $(document).on('click', '#calculateButton', function() {
    contentInfo.text('Content is loading...');
    list.css('display', 'none');
    $(this).css('display', 'none');
    $.ajax({
      url: `//api.fixer.io/latest?base=${$('#firstCurrencySelect').val()}`,
      data: "GET",
      dataType: 'json'
    }).done(response => {
      insertContent(response);
    }).fail(error => {
      console.log(`FirstOption error : ${error}`);
      contentInfo.text('Connection error has occured. Please click Return.');
      list.css('display', 'none');
    });
    let insertContent = (resp) => {
      list.css('display', 'flex');
      $(this).css('display', 'flex');
      let multResult = (parseInt($('#firstCurrencyInput').val()) * resp.rates[$('#secondCurrencySelect').val()]).toFixed(2);
      if (resp.base == $('#secondCurrencySelect').val()) {
        multResult = $('#firstCurrencyInput').val();
      }
      contentInfo.text(`${$('#firstCurrencyInput').val()} ${resp.base} = ${multResult} ${$('#secondCurrencySelect').val()}`);
    }
  });
});
