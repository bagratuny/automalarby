(function() {
  shrinkCommentFooter();
  header();

  function windowOverflow() {
    $("body").toggleClass("body--hidden");
  }

  function mobileMenu() {
    windowOverflow();
    $(".sidebar").toggleClass("sidebar--mobile");
    $(".menu-btn").toggleClass("menu-btn--close");
  }

  function shrinkElementText(boolean, el) {
    boolean ? el.text("Instagram") : el.text("Посмотреть отзыв в Instagram");
  }

  function shrinkCommentFooter() {
    window.innerWidth < 600
      ? shrinkElementText(true, $(".comment__link"))
      : shrinkElementText(false, $(".comment__link"));
  }

  function popup(obj) {
    $(obj).fadeIn(200);

    windowOverflow();
  }

  function popupClose(obj) {
    $(obj).fadeOut(200);

    windowOverflow();
  }

  // ------ FUNCTIONS

  function header() {
    var pastScrollTop,
      currentScrollTop = 0,
      navbar = $(".header");

    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var navbarHeight = navbar.height();

      currentScrollTop = scrollTop;

      if (
        pastScrollTop < currentScrollTop &&
        scrollTop > navbarHeight + navbarHeight
      ) {
        navbar.addClass("scrollUp");
      } else if (
        pastScrollTop > currentScrollTop &&
        !(scrollTop <= navbarHeight)
      ) {
        navbar.removeClass("scrollUp");
      }
      pastScrollTop = currentScrollTop;
    });
  }

  // ------ HEADER

  $(".menu-btn").on("click", function(e) {
    $(".sidebar").toggleClass("sidebar--mobile");
    $(".menu-btn").toggleClass("menu-btn--close");

    windowOverflow();
  });

  $(".menu__item").on("click", function(e) {
    if (window.innerWidth < 1150) {
      mobileMenu();
    }
  });

  $(".sidebar__menu").on("click", "a", function(event) {
    event.preventDefault();

    var id = $(this).attr("href"),
      top =
        $(window).innerWidth < 1150
          ? $(id).offset().top - 75
          : $(id).offset().top;

    $("body,html").animate({ scrollTop: top }, 500);
  });

  // ------ SIDEBAR

  $(window).on("resize", function() {
    shrinkCommentFooter();

    if (window.innerWidth > 1150 && $(".sidebar").hasClass("sidebar--mobile")) {
      mobileMenu();
    }
  });

  // ------ COMMENT-FOOTER

  $(".agreement-link").on("click", function() {
    popup(".popup.license");
  });

  $(".services__item").on("click", function(e) {
    e.preventDefault();
    popup(".popup.callback");
  });

  $(".btn--custom_callback").on("click", function(e) {
    e.preventDefault();
    popup(".popup.callback");
  });

  $(".popup").on("click", e => {
    popupClose(e.target);
  });

  $(".popup__close").on("click", e => {
    popupClose($(e.target.closest(".popup")));
  });

  $(".popup__wrapper, .callback__form--popup").on("click", function(e) {
    e.stopPropagation();
  });
})();
