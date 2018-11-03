var options = {
  valueNames: ['shape', 'carat', 'color', 'clarity', 'cut', 'polish', 'symmetry', 'lab', 'price'],
  page: 17,
  pagination: {
    innerWindow: 1,
    left: 0,
    right: 0,
    paginationClass: "pagination",
  }
};

var resultList = new List('diamondsearch', options);


$('.jPaginateNext').on('click', function () {
  var list = $('.pagination').find('li');
  $.each(list, function (position, element) {
    if ($(element).is('.active')) {
      $(list[position + 1]).trigger('click');
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