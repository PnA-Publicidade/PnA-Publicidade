(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();
  var nodeTop;

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });
  $(".item").height(window.innerHeight);
  var $document = $(document.body);
  var $revealBar = $(".red-container");
  var wrapperHeight = $document.height();
  var stepDistance = 101;
  var documentHeight = window.innerHeight;
  var positions = [];
  var heights = [];
  var elements = $('.item:not(".main")');

  // Cache heights and positions
  for (var i = 0; i < elements.length; i++) {
    var $element = $(elements[i]);
    var height = $element.offset().top + documentHeight;
    if (height > wrapperHeight) {
      height = wrapperHeight;
    }
    positions.push(height);
    heights.push($element.height());
  }

  var $nodes = $(".node");

  // Should totally be debounced /w animation frame. I know,
  // this whole thing is slightly inefficient.
  // And magic numbers too!
  $(document).scroll(function () {
    nodeTop = $document.scrollTop() + documentHeight + 1;
    var current = 0;

    // Active/non active states
    for (var i = 0; i < positions.length; i++) {
      if (nodeTop > positions[i]) {
        current = i;
        $nodes.eq(i).addClass("active");
      } else {
        $nodes.eq(i).removeClass("active");
      }
    }

    // Bar positioning, so sections can have different heights.
    var distanceToNext = 0;

    // Initial node, already has some of the bar filled.
    if (nodeTop < positions[0]) {
      var nextStep =
        (nodeTop - positions[current]) /
        (positions[current + 1] - positions[current]);

      // Calculating for node widths.
      var totalWidth =
        (stepDistance + current * stepDistance + nextStep * stepDistance) * 0.4;
      $revealBar.width(0.6 * stepDistance + totalWidth);

      // Final node covered.
    } else if (nodeTop > positions[6]) {
      $revealBar.width(stepDistance * (current + 1));

      // regular nodes
    } else if (current < elements.length) {
      var nextStep =
        (nodeTop - positions[current]) /
        (positions[current + 1] - positions[current]);
      var totalWidth =
        stepDistance + current * stepDistance + nextStep * stepDistance;
      $revealBar.width(totalWidth);
    }
  });

  // Clicking the nodes... again, nothing special ;)
  $nodes.each(function (index) {
    var $node = $(this);
    $node.click(function () {
      $("html, body").animate(
        { scrollTop: positions[index] - documentHeight + 10 },
        1000
      );
    });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);
var menu = $("ul#navigation");
if (menu.length) {
  menu.slicknav({
    prependTo: ".mobile_menu",
    closedSymbol: "+",
    openedSymbol: "-",
  });
}
// Expand/Collapse Article
document.querySelectorAll("#infographic article").forEach((article) => {
  article.addEventListener("click", () => {
    article.classList.toggle("active");
  });
});

// Always Collapse Article on click outside
document.addEventListener("mouseup", (e) => {
  document.querySelectorAll("article.active").forEach((article) => {
    if (article.contains(e.target)) return;
    if (article === e.target) return;
    article.classList.remove("active");
  });
});

// Activate artciles through prev/next interactions
document.querySelectorAll("#infographic article .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    var isprev =
      e.target === e.target.parentElement.firstElementChild ? true : false;
    var article = btn.closest("article");
    var step = parseInt(article.getAttribute("data-step"));
    var next = document.querySelector(
      `[data-step="${isprev ? step - 1 : step + 1}"]`
    );
    next.classList.add("active");
    next.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });
});
