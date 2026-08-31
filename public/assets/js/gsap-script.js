// ======================================================
// gsap-script.js - Cleaned up for Astro with full parity
// to original cleanar gsap-script.js
// ======================================================

// Register GSAP plugins (they are all bundled in jquery-plugin-collection.js)
if (typeof gsap !== 'undefined') {
  var pluginsToRegister = [];
  if (typeof TextPlugin !== 'undefined') pluginsToRegister.push(TextPlugin);
  if (typeof ScrollTrigger !== 'undefined') pluginsToRegister.push(ScrollTrigger);
  if (typeof ScrollSmoother !== 'undefined') pluginsToRegister.push(ScrollSmoother);
  if (typeof SplitText !== 'undefined') pluginsToRegister.push(SplitText);
  if (pluginsToRegister.length > 0) {
    try {
      gsap.registerPlugin.apply(gsap, pluginsToRegister);
    } catch (e) {
      console.warn("GSAP plugin registration warning:", e);
    }
  }
}

// ─── All GSAP animations exposed as reinit-safe function ───
window.initGsapAnimations = function () {
  if (typeof gsap === 'undefined') return;

  // Kill all existing ScrollTriggers to avoid duplicates on SPA navigation
  if (typeof ScrollTrigger !== 'undefined') {
    try {
      ScrollTrigger.getAll().forEach(function (st) {
        try { st.kill(); } catch (e) {}
      });
    } catch (e) {}
  }

  /* ----------- Rolling Text Animation ------------ */
  try {
    document.querySelectorAll('.rolling-text').forEach(function (el) {
      if (el.querySelector('.text-wrapper')) return;

      var text = el.dataset.text || el.textContent.trim();
      el.innerHTML = '';
      var wrapper = document.createElement('span');
      wrapper.className = 'text-wrapper';

      var line1 = document.createElement('span');
      line1.className = 'text-line';
      line1.textContent = text;

      var line2 = document.createElement('span');
      line2.className = 'text-line';
      line2.textContent = text;

      wrapper.appendChild(line1);
      wrapper.appendChild(line2);
      el.appendChild(wrapper);

      el.addEventListener('mouseenter', function () {
        gsap.to(wrapper, { yPercent: -50, duration: 0.4, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(wrapper, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  } catch (e) {
    console.warn("rolling-text animation error:", e);
  }

  /* ----------- Text Opacity Animation ------------ */
  try {
    document.querySelectorAll('.text-opacity-animation').forEach(function (el) {
      var rawText = el._origText || el.textContent.trim();
      if (!rawText) return;
      el._origText = rawText;

      el.innerHTML = rawText
        .split('')
        .map(function (char) {
          return char === ' ' ? ' ' : '<span style="opacity:0.3">' + char + '</span>';
        })
        .join('');

      var letters = el.querySelectorAll('span');

      if (typeof ScrollTrigger !== 'undefined' && letters.length > 0) {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
            markers: false
          }
        }).to(letters, {
          opacity: 1,
          stagger: 0.05,
          ease: 'power1.out',
          duration: 0.3
        });
      }
    });
  } catch (e) {
    console.warn("text-opacity-animation error:", e);
  }

  /* ----------- SplitText Line Animation ------------ */
  if (typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      document.querySelectorAll('.splittext-line').forEach(function (splitTextLine) {
        if (!splitTextLine.textContent.trim()) return;

        if (splitTextLine._splitInstance) {
          try { splitTextLine._splitInstance.revert(); } catch (e) {}
        }
        var itemSplitted = new SplitText(splitTextLine, { type: 'lines' });
        splitTextLine._splitInstance = itemSplitted;
        gsap.set(splitTextLine, { perspective: 400 });

        if (itemSplitted.lines && itemSplitted.lines.length) {
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: splitTextLine,
              start: 'top 90%',
              end: 'bottom 60%',
              scrub: false,
              markers: false,
              toggleActions: 'play none none none'
            }
          });

          tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.5,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: 'top center -50',
            stagger: 0.1
          });
        }
      });
    } catch (e) {
      console.warn("splittext-line error:", e);
    }

    /* ----------- SplitText chars animation on .poort-text ------------ */
    try {
      document.querySelectorAll('.poort-text').forEach(function (el) {
        if (!el.textContent.trim()) return;

        if (el._splitInstance) {
          try { el._splitInstance.revert(); } catch (e) {}
        }
        var splitInst = new SplitText(el, { type: 'lines,words,chars', linesClass: 'poort-line' });
        el._splitInstance = splitInst;
        gsap.set(el, { perspective: 600 });

        if (splitInst.chars && splitInst.chars.length) {
          if (el.classList.contains('poort-in-right')) {
            gsap.set(splitInst.chars, { opacity: 0, x: 100 });
          }
          if (el.classList.contains('poort-in-left')) {
            gsap.set(splitInst.chars, { opacity: 0, x: -100 });
          }
          if (el.classList.contains('poort-in-up')) {
            gsap.set(splitInst.chars, { opacity: 0, y: 80 });
          }
          if (el.classList.contains('poort-in-down')) {
            gsap.set(splitInst.chars, { opacity: 0, y: -80 });
          }

          gsap.to(splitInst.chars, {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%'
            },
            x: 0,
            y: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.02
          });
        }
      });
    } catch (e) {
      console.warn("poort-text error:", e);
    }
  }

  /* ----------- Image Scroll Animation ------------ */
  if (typeof ScrollTrigger !== 'undefined') {
    try {
      document.querySelectorAll('.new_img-animet').forEach(function (el) {
        var image = el.querySelector('img');
        if (!image) return;

        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 50%',
            toggleActions: 'play none none none',
            markers: false
          }
        });

        tl.set(el, { autoAlpha: 1 });
        tl.from(el, { xPercent: -100, duration: 5, ease: 'power2.out' });
        tl.from(image, { xPercent: 100, duration: 5, ease: 'power2.out' }, '<');
      });
    } catch (e) {
      console.warn("new_img-animet error:", e);
    }
  }

  /* ----------- Mousemove Parallax for .image-move and .image-move2 ------------ */
  if (!window._gsapMousemoveParallaxBound) {
    window._gsapMousemoveParallaxBound = true;
    document.addEventListener('mousemove', function (e) {
      var depth = 200;
      var moveX = (e.pageX - window.innerWidth / 2) / depth;
      var moveY = (e.pageY - window.innerHeight / 2) / depth;

      ['image-move', 'image-move2'].forEach(function (cls) {
        gsap.utils.toArray('.' + cls).forEach(function (el, i) {
          gsap.to(el, {
            x: moveX * (i + 1),
            y: moveY * (i + 1),
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    });
  }

  /* ----------- wpo-transforming-left-img before/after slider ------------ */
  var transformContainer = document.querySelector('.wpo-transforming-left-img');
  var transformSlider = document.querySelector('.wpo-transforming-left-img .slider');
  if (transformContainer && transformSlider && !transformSlider._boundSlider) {
    transformSlider._boundSlider = true;
    transformContainer.style.setProperty('--position', '50%');
    transformSlider.addEventListener('input', function (e) {
      transformContainer.style.setProperty('--position', e.target.value + '%');
    });
  }

  /* ----------- HoverButton magnetic effect ------------ */
  if (typeof HoverButton === 'undefined') {
    window.HoverButton = function HoverButton(el) {
      this.el = el;
      this.hover = false;
      this.calculatePosition();
      this.attachEventsListener();
    };

    window.HoverButton.prototype.attachEventsListener = function () {
      var self = this;
      window.addEventListener('mousemove', function (e) { self.onMouseMove(e); });
      window.addEventListener('resize', function () { self.calculatePosition(); });
    };

    window.HoverButton.prototype.calculatePosition = function () {
      gsap.set(this.el, { x: 0, y: 0, scale: 1 });
      var box = this.el.getBoundingClientRect();
      this.x = box.left + box.width / 2;
      this.y = box.top + box.height / 2;
      this.width = box.width;
      this.height = box.height;
    };

    window.HoverButton.prototype.onMouseMove = function (e) {
      var hover = false;
      var hoverArea = this.hover ? 0.7 : 0.5;
      var x = e.clientX - this.x;
      var y = e.clientY - this.y;
      var distance = Math.sqrt(x * x + y * y);

      if (distance < this.width * hoverArea) {
        hover = true;
        if (!this.hover) this.hover = true;
        this.onHover(e.clientX, e.clientY);
      }

      if (!hover && this.hover) {
        this.onLeave();
        this.hover = false;
      }
    };

    window.HoverButton.prototype.onHover = function (x, y) {
      gsap.to(this.el, {
        x: (x - this.x) * 0.4,
        y: (y - this.y) * 0.4,
        scale: 1.15,
        ease: 'power2.out',
        duration: 0.4
      });
      this.el.style.zIndex = 10;
    };

    window.HoverButton.prototype.onLeave = function () {
      gsap.to(this.el, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)',
        duration: 0.7
      });
      this.el.style.zIndex = 1;
    };
  }

  /* ----------- Parallax Buttons (btn-wrapper and btn-move) ------------ */
  var all_btn = gsap.utils.toArray('.btn-wrapper');
  if (all_btn.length === 0) {
    all_btn = gsap.utils.toArray('#btn-wrapper');
  }
  var all_btn_circle = gsap.utils.toArray('.btn-move');

  function parallaxIt(e, target, movement) {
    if (!target) return;
    var rect = e.currentTarget.getBoundingClientRect();
    var relX = e.pageX - rect.left - (window.pageXOffset || window.scrollX || 0);
    var relY = e.pageY - rect.top - (window.pageYOffset || window.scrollY || 0);

    gsap.to(target, {
      x: ((relX - rect.width / 2) / rect.width) * movement,
      y: ((relY - rect.height / 2) / rect.height) * movement,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  all_btn.forEach(function (btn, i) {
    if (btn._parallaxBound) return;
    btn._parallaxBound = true;

    btn.addEventListener('mousemove', function (e) { parallaxIt(e, all_btn_circle[i], 80); });
    btn.addEventListener('mouseleave', function () {
      if (all_btn_circle[i]) {
        gsap.to(all_btn_circle[i], { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  });

  /* ----------- Moving Cursor Movement ------------ */
  document.querySelectorAll('.moving-cursor-wrap').forEach(function (wrap) {
    if (wrap._cursorBound) return;
    wrap._cursorBound = true;

    var floatCursor = wrap.querySelector('.moving-cursor');
    if (!floatCursor) return;

    var mouseX = 0, mouseY = 0, isMoving = false;

    wrap.addEventListener('mouseenter', function () {
      floatCursor.style.opacity = '1';
      floatCursor.style.transform = 'scale(1)';
    });

    wrap.addEventListener('mousemove', function (e) {
      var rect = wrap.getBoundingClientRect();
      mouseX = e.clientX - rect.left - 75;
      mouseY = e.clientY - rect.top - 75;
      isMoving = true;
    });

    (function updateCursor() {
      if (isMoving) {
        floatCursor.style.left = mouseX + 'px';
        floatCursor.style.top = mouseY + 'px';
        isMoving = false;
      }
      requestAnimationFrame(updateCursor);
    })();

    wrap.addEventListener('mouseleave', function () {
      floatCursor.style.opacity = '0';
      floatCursor.style.transform = 'scale(0)';
    });
  });

  /* ----------- Refresh ScrollTrigger ------------ */
  if (typeof ScrollTrigger !== 'undefined') {
    try {
      ScrollTrigger.refresh();
    } catch (e) {}
  }
};

// Initial run when this script first loads (non-SPA)
document.addEventListener('DOMContentLoaded', function () {
  window.initGsapAnimations();
});
