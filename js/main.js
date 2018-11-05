$(function () {
  var options = {
    valueNames: ['shape', 'carat', 'color', 'clarity', 'cut', 'polish', 'symmetry', 'lab', 'price'],
    page: 20,
    pagination: {
      innerWindow: 1,
      left: 0,
      right: 0,
      paginationClass: "pagination",
    }
  };

  var resultList = new List('diamondsearch', options);



  function checkPagerPosition() {
    if ($('.pagination li:first').hasClass('active')) {
      $('.jPaginatePrev, .jPaginateFirst').addClass('disabled');
    } else if ($('.pagination li').length === 1) {
      $('.jPaginatePrev, .jPaginateFirst, .jPaginateNext, .jPaginateLast').addClass('disabled');
    } else {
      $('.jPaginatePrev, .jPaginateFirst').removeClass('disabled');
    }
    if ($('.pagination li:last').hasClass('active')) {
      $('.jPaginateNext, .jPaginateLast').addClass('disabled');
    } else {
      $('.jPaginateNext, .jPaginateLast').removeClass('disabled');
    }
  }



  $('.jPaginateFirst').on('click', function () {
    resultList.show(1, 20);
    checkPagerPosition();
  })


  $('.jPaginateLast').on('click', function () {
    var total = resultList.size(),

      page = (total % 20) || 20,
      start = total - page + 1;
    resultList.show(start, 20);

    checkPagerPosition();
  })


  $('.jPaginateNext').on('click', function () {
    var list = $('.pagination').find('li');

    $.each(list, function (position, element) {
      if ($(element).is('.active')) {
        $(list[position + 1]).trigger('click');
        checkPagerPosition();

      }
    })

  });


  $('.jPaginatePrev').on('click', function () {
    var list = $('.pagination').find('li');

    $.each(list, function (position, element) {
      if ($(element).is('.active')) {
        $(list[position - 1]).trigger('click');
        checkPagerPosition()

      }
    })

  });


  checkPagerPosition();

  $("#price_slider_range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [0, 500],

    slide: function (event, ui) {
      $("#amount_left").val("$" + ui.values[0]);
      $("#amount_right").val(" $" + $("#price_slider_range").slider("values", 1));
    }
  });

  $("#amount_left").val(" $" + $("#price_slider_range").slider("values", 0));

  $("#amount_right").val(" $" + $("#price_slider_range").slider("values", 1));

  $('#filterSlideToggleBtn').click(function () {
    $('#ds_filter').toggle("slide", {
      direction: "up"
    }, 1000)
  })

});