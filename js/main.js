$(function () {
  var options = {
    valueNames: ['shape', 'carat', 'color', 'clarity', 'cut', 'polish', 'symmetry', 'lab', 'price'],
    page: 18,
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
    diamondPreview()
  }



  $('.jPaginateFirst').on('click', function () {
    resultList.show(1, 18);
    checkPagerPosition();
  })


  $('.jPaginateLast').on('click', function () {
    var total = resultList.size(),

      page = (total % 18) || 18,
      start = total - page + 1;
    resultList.show(start, 18);

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
        
      }
    })

  });


  $('.pagination').find('li').click(function () {
    checkPagerPosition()
  })


  checkPagerPosition();


  $('#filterSlideToggleBtn').click(function () {
    $('#ds_filter').toggle("slide", {
      direction: "up"
    }, 500)
  })


  $('.shape_options .shape_s_option').click(function (e) {
    $(this).toggleClass('active')

  })


  $("#price_slider_range").slider({
    range: true,
    min: 0,
    max: 10000000,
    values: [0, 10000000],

    slide: function (event, ui) {
      $("#amount_left").val("$" + ui.values[0]);
      $("#amount_right").val(" $" + $("#price_slider_range").slider("values", 1));
    }
  });

  $("#amount_left").val(" $" + $("#price_slider_range").slider("values", 0));
  $("#amount_right").val(" $" + $("#price_slider_range").slider("values", 1));


  $("#carat_slider_range").slider({
    range: true,
    min: 0.00,
    max: 30.00,
    values: [0.00, 30.00],
    step: 0.1,

    slide: function (event, ui) {
      $("#carat_amount_left").val(ui.values[0]);
      $("#carat_amount_right").val($("#carat_slider_range").slider("values", 1));
    }
  });

  $("#carat_amount_left").val($("#carat_slider_range").slider("values", 0));
  $("#carat_amount_right").val($("#carat_slider_range").slider("values", 1));

  $("#color_slider_range").slider({
    range: true,
    min: 0,
    max: 10,
    values: [0, 10],
    step: 1,
  });

  $("#cut_slider_range").slider({
    range: true,
    min: 0,
    max: 4,
    values: [0, 4],
  });

  $("#symmetry_slider_range").slider({
    range: true,
    min: 0,
    max: 4,
    values: [0, 4],
  });

  $("#polish_slider_range").slider({
    range: true,
    min: 0,
    max: 4,
    values: [0, 4],
  });

  $("#clarity_slider_range").slider({
    range: true,
    min: 0,
    max: 10,
    values: [0, 10],
  });



 function diamondPreview() {
  $(".list tr").on({
    mouseenter: function () {
      if ($(".list tr").hasClass('active') && $("#diamond_preview ").css('display') == 'none'){
        $(".list tr").removeClass('active')
      }
    },
    click: function () {
      $("#diamond_preview ").fadeIn(200);
      $(".list tr").removeClass('active')
      $(this).toggleClass('active')
    },
  })
  $("#preview_close_btn").click(function () {
    $("#diamond_preview ").fadeOut(200);
  });
 }

 diamondPreview()

});