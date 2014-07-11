/*---LEFT BAR ACCORDION----*/
$(function () {
  $('#nav-accordion').dcAccordion({
    eventType: 'click',
    autoClose: true,
    saveState: true,
    disableLink: true,
    speed: 'slow',
    showCount: false,
    autoExpand: true,
    //cookie: 'dcjq-accordion-1',
    classExpand: 'dcjq-current-parent'
  });
});

var Script = function () {
  //sidebar dropdown menu auto scrolling
  jQuery('#sidebar .sub-menu > a').click(function () {
    var o = ($(this).offset());
    diff = 250 - o.top;
    if (diff > 0)
      $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
    else
      $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
  });

  //sidebar toggle
  $(function () {
    function responsiveView() {
      var wSize = $(window).width();
      if (wSize <= 768) {
        $('#container').addClass('sidebar-close');
        $('#sidebar > ul').hide();
      }

      if (wSize > 768) {
        $('#container').removeClass('sidebar-close');
        $('#sidebar > ul').show();
      }
    }
    $(window).on('load', responsiveView);
    $(window).on('resize', responsiveView);
  });

  // custom scrollbar
  $("#sidebar").niceScroll({
    styler: "fb",
    cursorcolor: "#e8403f",
    cursorwidth: '3',
    cursorborderradius: '10px',
    background: '#404040',
    spacebarenabled: false,
    cursorborder: ''
  });

  //custom selector
  //$("select[name='language-selector']").selectpicker({style: 'btn-simple', menuStyle: 'dropdown-inverse'});
  $("select[name='sample-selector']").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});

  $("html").niceScroll({
    //styler: "fb",
    cursorcolor: "#e8403f",
    cursorwidth: '6',
    cursorborderradius: '10px',
    background: '#404040',
    spacebarenabled: false,
    cursorborder: '',
    zindex: '1000'
  });
}();