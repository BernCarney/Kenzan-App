/*
Smooth scrolling implementation using vanilla JavaScript without any external dependencies care of
SitePoint and the great right up at http://www.sitepoint.com/smooth-scrolling-vanilla-javascript

The MIT License (MIT)
Copyright (c) 2016 SitePoint
*/

function jump(target, options) {
  var 
      start = window.pageYOffset,
      opt = {
          duration: options.duration,
          offset: -40 || 0,
          callback: hamToggle(),
          easing: options.easing || easeInOutQuad
      },
      distance = typeof target === 'string'
          ? opt.offset + document.querySelector(target).getBoundingClientRect().top
          : target,
      duration = typeof opt.duration === 'function'
          ? opt.duration(distance)
          : opt.duration,
      timeStart, timeElapsed
  ;
  
  requestAnimationFrame(function(time) { timeStart = time; loop(time); });
  
  function loop(time) {
      timeElapsed = time - timeStart;

      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

      if (timeElapsed < duration)
          requestAnimationFrame(loop)
      else
          end();
  }

  function end() {
      window.scrollTo(0, start + distance);

      if (typeof opt.callback === 'function')
          opt.callback();
  }
  
  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d)  {
      t /= d / 2
      if(t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
  }

}

function hamToggle() {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    });
  }