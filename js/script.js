var root = $('.list')

var url = `http://belgiumny.com/api/DeveloperAPI?stock=&APIKEY=E9BF0C81-67DE-7030-E56F-52FFB78322BC`

var childrens = root.children()


$.getJSON(url, function(data) {
  var items = data.Stock

  for (let i = 0; i < childrens.length; i++) {
    const children = childrens[i];
    children.remove(children)
  }

  items.forEach(item => {
    let tableRow = document.createElement('tr')

    var shape = document.createElement('td')
    shape.classList.add('shape')
    shape.innerHTML = item.Shape

    var carat = document.createElement('td')
    carat.classList.add('carat')
    carat.innerHTML = item.Weight

    var color = document.createElement('td')
    color.classList.add('color')
    color.innerHTML = item.Color

    var clarity = document.createElement('td')
    clarity.classList.add('clarity')
    clarity.innerHTML = item.Clarity

    var cut = document.createElement('td')
    cut.classList.add('cut')
    cut.innerHTML = item.Cut_Grade

    var polish = document.createElement('td')
    polish.classList.add('polish')
    polish.innerHTML = item.Polish

    var symmetry = document.createElement('td')
    symmetry.classList.add('symmetry')
    symmetry.innerHTML = item.Symmetry

    var lab = document.createElement('td')
    lab.classList.add('lab')
    lab.innerHTML = item.Lab

    var price = document.createElement('td')
    price.classList.add('price')
    if (item.Buy_Price != null) {

      price.innerHTML = '$' + item.Buy_Price

    } else {
      price.innerHTML = `unknown`
    }

    HTMLPusher(tableRow, [shape, carat, color, clarity, cut, polish, symmetry, lab, price])
    root.append(tableRow)

  });

  list()

})
  

function HTMLPusher(praent, cilARR) {
  cilARR.forEach(cill => {
    praent.appendChild(cill)
  })
}

function list() {
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
        checkPagerPosition();
      }
    })

    diamondPreview()

  });

  $('.pagination').find('li').click(function () {
    checkPagerPosition()
  })

  checkPagerPosition();


}

function diamondPreview() {
  $(".list tr").on({
    mouseenter: function () {
      if ($(".list tr").hasClass('active') && $("#diamond_preview ").css('display') == 'none') {
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

$('.search_fotter').mouseleave(function () {
  diamondPreview()
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

$('#filterSlideToggleBtn').click(function () {
  $(this).toggleClass('active')
  $('#ds_filter').toggle("slide", {
    direction: "up"
  }, 500)
})
