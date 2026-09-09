import { Component } from '@angular/core';
import * as jquery from 'jquery';
declare var $: any;

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fictivo';
  ngOnInit() {
    var map = '';
    var center: any;

    function initialize() {
      //   var mapOptions = {
      //     zoom: 13,
      //     center: new google.maps.LatLng(-23.013104, -43.394365),
      //     scrollwheel: false
      //   };

      //   map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

      //   google.maps.event.addDomListener(map, 'idle', function () {
      //     calculateCenter();
      //   });

      //   google.maps.event.addDomListener(window, 'resize', function () {
      //     map.setCenter(center);
      //   });
      // }

      // function calculateCenter() {
      //   center = map.getCenter();
      // }

      function setCarousel() {

        if ($('.tm-article-carousel').hasClass('slick-initialized')) {
          $('.tm-article-carousel').slick('destroy');
        }

        if ($(window).width() < 438) {
          // Slick carousel
          $('.tm-article-carousel').slick({
            infinite: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
          });
        }
        else {
          $('.tm-article-carousel').slick({
            infinite: false,
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 1
          });
        }
      }

      function setPageNav() {
        if ($(window).width() > 991) {
          $('#tm-top-bar').singlePageNav({
            currentClass: 'active',
            offset: 79
          });
        }
        else {
          $('#tm-top-bar').singlePageNav({
            currentClass: 'active',
            offset: 65
          });
        }
      }

      function togglePlayPause() {
        const vid = $('.tmVideo').get(0);

        if (vid.paused) {
          vid.play();
          $('.tm-btn-play').hide();
          $('.tm-btn-pause').show();
        }
        else {
          vid.pause();
          $('.tm-btn-play').show();
          $('.tm-btn-pause').hide();
        }
      }

      $(document).ready(function () {

        $(window).on("scroll", function () {
          if ($(window).scrollTop() > 100) {
            $(".tm-top-bar").addClass("active");
          } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".tm-top-bar").removeClass("active");
          }
        });

        // // Google Map

        // Date Picker
        // const pickerCheckIn = datepicker('#inputCheckIn');
        // const pickerCheckOut = datepicker('#inputCheckOut');

        // Slick carousel
        setCarousel();
        setPageNav();

        $(window).resize(function () {
          setCarousel();
          setPageNav();
        });

        // Close navbar after clicked
        $('.nav-link').click(function () {
          $('#mainNav').removeClass('show');
        });

        //   // Control video
        //   $('.tm-btn-play').click(function () {
        //     togglePlayPause();
        //   });

        //   $('.tm-btn-pause').click(function () {
        //     togglePlayPause();
        //   });

        //   // Update the current year in copyright
        //   $('.tm-current-year').text(new Date().getFullYear());
        // });
      })
    }
  }
}
