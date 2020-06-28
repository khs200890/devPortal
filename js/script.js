// Main Template
  (function($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on('scroll', function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function(e) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });

  })(jQuery);


// Custom form components

  $(function() {
    jcf.replaceAll();
  });

// Date Time Pickers

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  // Get today's date
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  $(function () {

      // Single Date Time Picker by ID
        // $('#primaryTime').datetimepicker({
        //     format: 'LT',
        //     minDate: today
        // });

        // $('#primaryDate').datetimepicker({
        //     format: 'L',
        //     minDate: today
        // });

      // Multiple Date Time Picker by Class
      $('.primaryTime').each(function(){
        $(this).datetimepicker({
            format: 'LT'
        });
      })

      $('.primaryDate').each(function(){
        $(this).datetimepicker({
            format: 'L'
        });
      })
  });

// Data Table

  $(function () {
    var table = $('.tableContainer table').DataTable({
        "paging": false,
        "dom": '<"toolbar">frtip',
        "info": false,
        // 'ajax': 'https://gyrocode.github.io/files/jquery-datatables/arrays_id.json',
        'ajax': '../data/data.json',
        'columnDefs': [{
           'targets': 0,
           'searchable':false,
           'orderable':false,
           'className': 'dt-body-center checkboxContainer',
           'render': function (data, type, full, meta){
               return '<input type="checkbox" value="' + $('<div/>').text(data).html() + '">';
           }
        }],
        'order': [1, 'asc'],
        'initComplete':function(settings, json){
          jcf.replaceAll();
        }
    });

    $("div.toolbar").html('<button class="btn primaryBtn" ><i class="fa fa-filter"></i></button><button class="btn primaryBtn" data-toggle="modal" data-target="#timeclockDetailModal"><i class="fa fa-plus"></i></button>');

    $('#checkAll').on('click', function(){
      // Check/uncheck all checkboxes in the table
      var rows = table.rows({ 'search': 'applied' }).nodes();
      // $('.jcf-checkbox', rows).prop('jcf-checked', this.checked);
      $('.jcf-checkbox', rows).toggleClass('jcf-checked');
      $('.jcf-checkbox input[type="checkbox"]', rows).checked;
    });

    // Edit record
    $('.tableContainer table').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();
 
        var editRow = table.row( $(this).parents('tr') );
    } );
 
    // Delete a record
    $('.tableContainer table').on('click', 'a.editor_remove', function (e) {
        e.preventDefault();
        var deleteRow = table.row( $(this).parents('tr') );
        deleteRow.remove();
        table.draw();
    } );

  });
