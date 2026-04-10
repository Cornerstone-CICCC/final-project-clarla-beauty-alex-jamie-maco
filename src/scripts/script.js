$(document).ready(function () {
  // > Navbar behavior
  // Breakpoint for mobile view
  const breakpoint = 868;
  // navbar element
  const $navbar = $('#navbar');
  // navbar logo element
  const $logo = $('#navbar-logo');
  // Cache the first <li> element in the navbar for later use
  const $firstLi = $('#navbar ul li').first();

  // - Routes
  const logoOriginal = '/src/assets/imgs/logotype/logotype.svg';
  const logoScrolled = '/src/assets/imgs/logotype/logotype-small.svg';
  const iconHam = '/src/assets/icons/hamburger.svg';

  const originalContent = $firstLi.html();
  // Hamburger menu template
  const hamburgerMenu = `<button id="ham-btn"><img src="${iconHam}" alt="menu" /></button>`;
  // Mobile menu template
  const mobileMenuTemplate = `
  <div id="mobile-menu-overlay" class="mobile-menu">
      <nav>
          <ul>
              <li><a href="../index.html">Home</a></li>
              <li><a href="../pages/portfolio.html">My Work</a></li>
              <li><a href="../pages/services.html">Services</a></li>
              <li><a href="../pages/classes.html">Classes</a></li>
              <li><a href="../pages/beauty-tips.html">Beauty Tips</a></li>
              <li><a href="../pages/about.html">About</a></li>
              <li><a href="../pages/contact.html">Contact</a></li>
          </ul>
      </nav>
  </div>
  `;

  // Append the mobile menu template to the body if it doesn't already exist
  if ($('#mobile-menu-overlay').length === 0) {
    $('body').append(mobileMenuTemplate);
  }

  /**
   * @function checkWidth - Checks the window width and updates the navbar accordingly
   * - If the window width is less than or equal to the breakpoint, it replaces the first <li> content with the hamburger menu
   * - If the window width is greater than the breakpoint, it restores the original content of the first <li>
   */
  function checkWidth() {
    const windowSize = $(window).width();

    if (windowSize <= breakpoint) {
      if ($firstLi.find('#ham-btn').length === 0) {
        $firstLi.html(hamburgerMenu);
      }
    } else {
      $firstLi.html(originalContent);
      // Close the mobile menu if it's open when resizing to desktop view
      $('#mobile-menu-overlay').removeClass('open');
      $('#ham-btn').removeClass('ham-active');
      $('body').removeClass('no-scroll');
    }

  }

  // Check width on page load and when resizing the window
  $(window).on('resize', checkWidth);
  checkWidth();

  // ? Toggle dropdown menu on mobile
  $(document).on('click', '#ham-btn', function () {
    $(this).toggleClass('ham-active');
    $('#mobile-menu-overlay').toggleClass('open');
    $('body').toggleClass('no-scroll');

    // Menu open
    if ($('#mobile-menu-overlay').hasClass('open')) {
      $navbar.removeClass('scrolled');
      $logo.attr('src', logoOriginal);
    }
    // Menu close
    else {
      if ($(window).scrollTop() > 30) {
        $navbar.addClass('scrolled');
        $logo.attr('src', logoScrolled);
      }
    }
  });

  // ? Change navbar logo on scroll
  $(window).on('scroll', function () {
    if ($('#mobile-menu-overlay').hasClass('open')) return;

    if ($(window).scrollTop() > 30) {
      $navbar.addClass('scrolled');
      $logo.attr('src', logoScrolled);
    } else {
      $navbar.removeClass('scrolled');
      $logo.attr('src', logoOriginal);
    }
  });

  // ========================================================================
  // SECTION 5: PARTY CHAT WIDGET
  // ========================================================================

  // 1. Toggle widget and swap the trigger icon
  $("#chat-widget-trigger").on("click", function () {
    const $options = $("#chat-widget-options");
    const $trigger = $(this);

    // Toggle the open state
    $options.toggleClass("is-open");

    // Hide/show message icon
    $trigger.toggleClass("hidden");
  });

  // 2. Close the widget ONLY when the specific close button (X) is clicked
  $("#chat-widget-close").on("click", function () {
    $("#chat-widget-options").removeClass("is-open");
    $("#chat-widget-trigger").removeClass("hidden");
  });
});



