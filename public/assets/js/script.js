(function ($) {
    "use strict";

    // =========================================================================
    // Preloader and WOW.js Animation Handlers (Astro ClientRouter Safe)
    // =========================================================================
    window.showPreloader = function () {
        const $preloader = $(".preloader");
        if ($preloader.length) {
            $preloader.stop(true, true).show().css({ opacity: 1, display: "block" });
        }
    };

    window.runPreloaderAndWow = function () {
        const $preloader = $(".preloader");
        let wowStarted = false;

        function startWow() {
            if (wowStarted) return;
            wowStarted = true;

            if (typeof WOW !== "undefined") {
                try {
                    if (window._wowInstance && typeof window._wowInstance.stop === "function") {
                        window._wowInstance.stop();
                    }
                    window._wowInstance = new WOW({
                        boxClass:    "wow",
                        animateClass: "animated",
                        offset:      0,
                        mobile:      true,
                        live:        true
                    });
                    window._wowInstance.init();
                } catch (err) {
                    console.warn("WOW init error:", err);
                }
            }

            // Safety guarantee: Ensure no content stays hidden forever
            setTimeout(function () {
                $(".wow").each(function () {
                    if (!$(this).hasClass("animated")) {
                        this.style.visibility = "visible";
                    }
                });
            }, 800);
        }

        // Clean up previous WOW instance if any
        if (window._wowInstance && typeof window._wowInstance.stop === "function") {
            window._wowInstance.stop();
        }

        // Reset all .wow elements so they can play their entrance animation
        $(".wow").each(function () {
            $(this).removeClass("animated");
            this.style.visibility = "hidden";
            this.style.animationName = "none";
        });

        if ($preloader.length) {
            $preloader.stop(true, false).delay(50).fadeOut(400, function () {
                $(this).hide().css("display", "none");
                startWow();
            });

            // Fallback: guaranteed dismissal after 500ms
            setTimeout(function () {
                if ($preloader.is(":visible")) {
                    $preloader.hide().css("display", "none");
                }
                startWow();
            }, 500);
        } else {
            startWow();
        }
    };

    // =========================================================================
    // window.initPagePlugins — called on every astro:page-load
    // All handlers use .off() before .on() to stay idempotent
    // =========================================================================
    window.initPagePlugins = function () {

        /* ------------------------------------------------------------------ */
        /*  NAV / MOBILE MENU                                                  */
        /* ------------------------------------------------------------------ */
        const $navbar   = $(".navigation-holder");
        const $openBtn  = $(".mobail-menu .open-btn");
        const $xButton  = $(".mobail-menu .navbar-toggler");
        const $mainNav  = $("#navbar > ul");
        const $body     = $("body");
        const $menuClose = $(".menu-close");

        // Remove any pre-existing sticky clone so we don't accumulate on SPA nav
        $(".wpo-site-header .navigation.sticky-header").remove();
        // Clone navigation for sticky menu (original HTML already has .original class)
        const $wpoNavigation = $(".wpo-site-header .navigation.original");
        if ($wpoNavigation.length) {
            $wpoNavigation.clone()
                .insertAfter($wpoNavigation)
                .addClass("sticky-header")
                .removeClass("original");
        }

        // Toggle mobile navigation
        $openBtn.off("click.mobileNav").on("click.mobileNav", function (e) {
            e.stopImmediatePropagation();
            $navbar.toggleClass("slideInn");
            $xButton.toggleClass("x-close");
            return false;
        });

        // Toggle small-nav class
        function toggleClassForSmallNav() {
            if (window.innerWidth <= 991) {
                $mainNav.addClass("small-nav");
            } else {
                $mainNav.removeClass("small-nav");
            }
        }
        toggleClassForSmallNav();

        // Small menu accordion behaviour
        function smallNavFunctionality() {
            const windowWidth = window.innerWidth;
            const $smallNav   = $(".navigation-holder > .small-nav");
            const $subMenu    = $smallNav.find(".sub-menu");
            const $megaMenu   = $smallNav.find(".mega-menu");
            const $menuItems  = $smallNav.find(".menu-item-has-children > a");

            if (windowWidth <= 991) {
                $subMenu.hide();
                $megaMenu.hide();
                $menuItems.off("click.mobileMenu").on("click.mobileMenu", function (e) {
                    const $this = $(this);
                    $this.siblings().slideToggle();
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $this.toggleClass("rotate");
                });
            } else {
                $mainNav.find(".sub-menu, .mega-menu").show();
            }
        }
        smallNavFunctionality();

        // Close menu on body click / close button
        $body.off("click.navClose").on("click.navClose", function () {
            $navbar.removeClass("slideInn");
        });
        $menuClose.off("click.menuClose").on("click.menuClose", function () {
            $navbar.removeClass("slideInn");
            $openBtn.removeClass("x-close");
        });

        /* ------------------------------------------------------------------ */
        /*  STICKY HEADER                                                      */
        /* ------------------------------------------------------------------ */
        let lastScrollTop = 0;

        function stickyMenu(targetMenu, toggleClass) {
            const st = $(window).scrollTop();
            if (st > 1000) {
                if (st > lastScrollTop) {
                    targetMenu.removeClass(toggleClass);
                } else {
                    targetMenu.addClass(toggleClass);
                }
            } else {
                targetMenu.removeClass(toggleClass);
            }
            lastScrollTop = st;
        }

        $(window).off("scroll.stickyHeader").on("scroll.stickyHeader", function () {
            stickyMenu($(".sticky-header"), "active");
            // Also add a simple sticky-on class for original nav
            const st = $(window).scrollTop();
            if (st > 300) {
                $(".wpo-site-header .navigation.original").addClass("sticky-on");
            } else {
                $(".wpo-site-header .navigation.original").removeClass("sticky-on");
            }
        });

        /* ------------------------------------------------------------------ */
        /*  TOGGLES & CHECKOUT UI                                              */
        /* ------------------------------------------------------------------ */
        const toggles = [
            { btn: '#toggle1', target: '.create-account', wrap: '.caupon-wrap.s1', toggleClass: 'active-border' },
            { btn: '#toggle2', target: '#open2',          wrap: '.caupon-wrap.s2', toggleClass: 'coupon-2' },
            { btn: '#toggle3', target: '#open3',          wrap: '.caupon-wrap.s2', toggleClass: 'coupon-2' },
            { btn: '#toggle4', target: '#open4',          wrap: '.caupon-wrap.s3', toggleClass: 'coupon-2' }
        ];
        toggles.forEach(function (t) {
            $(t.btn).off("click.toggle").on("click.toggle", function (e) {
                e.preventDefault();
                $(t.target).slideToggle();
                $(t.wrap).toggleClass(t.toggleClass);
            });
        });

        // Payment toggles
        $(".payment-select .addToggle").off("click.payment").on("click.payment", function () {
            $(".payment-name").addClass("active");
            $(".payment-option").removeClass("active");
        });
        $(".payment-select .removeToggle").off("click.payment").on("click.payment", function () {
            $(".payment-option").addClass("active");
            $(".payment-name").removeClass("active");
        });

        /* ------------------------------------------------------------------ */
        /*  BOOTSTRAP TOOLTIPS                                                 */
        /* ------------------------------------------------------------------ */
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
                new bootstrap.Tooltip(el);
            });
        }

        /* ------------------------------------------------------------------ */
        /*  HERO SWIPER                                                        */
        /* ------------------------------------------------------------------ */
        const $swiperEl = $(".swiper-container");
        if ($swiperEl.length && typeof Swiper !== 'undefined') {
            // Destroy any existing instance first
            if ($swiperEl[0].swiper) {
                $swiperEl[0].swiper.destroy(true, true);
            }
            const interleaveOffset = 0.5;
            new Swiper(".swiper-container", {
                loop: true,
                speed: 1000,
                parallax: true,
                autoplay: {
                    delay: 6500,
                    disableOnInteraction: false
                },
                watchSlidesProgress: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                on: {
                    progress: function () {
                        const swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            const slideProgress  = swiper.slides[i].progress;
                            const innerOffset    = swiper.width * interleaveOffset;
                            const innerTranslate = slideProgress * innerOffset;
                            const slideInner = swiper.slides[i].querySelector(".slide-inner");
                            if (slideInner) {
                                slideInner.style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                            }
                        }
                    },
                    touchStart: function () {
                        const swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = "";
                        }
                    },
                    setTransition: function (speed) {
                        const swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            const slideInner = swiper.slides[i].querySelector(".slide-inner");
                            if (slideInner) {
                                slideInner.style.transition = speed + "ms";
                            }
                        }
                    }
                }
            });
        }

        /* ------------------------------------------------------------------ */
        /*  DATA BACKGROUND IMAGES                                             */
        /* ------------------------------------------------------------------ */
        /*  DATA BACKGROUND IMAGES                                             */
        /* ------------------------------------------------------------------ */
        $(".slide-bg-image").each(function () {
            const bg = $(this).data("background");
            if (bg) {
                $(this).css("background-image", "url(" + bg + ")");
            }
        });

        /* ------------------------------------------------------------------ */
        /*  FANCYBOX                                                           */
        /* ------------------------------------------------------------------ */
        if ($(".fancybox").length && typeof $.fn.fancybox !== "undefined") {
            $(".fancybox").fancybox({
                openEffect:  "elastic",
                closeEffect: "elastic",
                wrapCSS:     "project-fancybox-title-style"
            });
        }

        // Popup video via fancybox
        if ($(".video-btn").length && typeof $.fancybox !== "undefined") {
            $(".video-btn").off("click.videoPopup").on("click.videoPopup", function (e) {
                e.preventDefault();
                $.fancybox({
                    href:        this.href,
                    aspectRatio: true,
                    type:        $(this).data("type") || "iframe",
                    title:       this.title,
                    helpers: {
                        title: { type: "inside" },
                        media: {}
                    },
                    beforeShow: function () {
                        $(".fancybox-wrap").addClass("gallery-fancybox");
                    }
                });
                return false;
            });
        }

        /* ------------------------------------------------------------------ */
        /*  MAGNIFIC POPUP                                                     */
        /* ------------------------------------------------------------------ */
        if ($(".popup-gallery").length && typeof $.fn.magnificPopup !== "undefined") {
            $(".popup-gallery").magnificPopup({
                delegate: "a",
                type:     "image",
                gallery:  { enabled: true },
                zoom: {
                    enabled:  true,
                    duration: 300,
                    easing:   "ease-in-out",
                    opener:   function (openerElement) {
                        return openerElement.is("img") ? openerElement : openerElement.find("img");
                    }
                }
            });
        }

        /* ------------------------------------------------------------------ */
        /*  ISOTOPE SORTING GALLERY                                            */
        /* ------------------------------------------------------------------ */
        function sortingGallery() {
            const $galleryFilters = $(".sortable-gallery .gallery-filters");
            if ($galleryFilters.length && typeof $.fn.isotope !== "undefined") {
                const $container = $(".gallery-container");
                $container.isotope({
                    filter: "*",
                    animationOptions: { duration: 750, easing: "linear", queue: false }
                });

                $galleryFilters.find("li a").off("click.isotope").on("click.isotope", function (e) {
                    e.preventDefault();
                    $galleryFilters.find("li .current").removeClass("current");
                    $(this).addClass("current");
                    const selector = $(this).attr("data-filter");
                    $container.isotope({
                        filter: selector,
                        animationOptions: { duration: 750, easing: "linear", queue: false }
                    });
                    return false;
                });
            }
        }
        sortingGallery();

        /* ------------------------------------------------------------------ */
        /*  MASONRY                                                            */
        /* ------------------------------------------------------------------ */
        function masonryGridSetting() {
            const $masonryGallery = $(".masonry-gallery");
            if ($masonryGallery.length && typeof $.fn.masonry !== "undefined") {
                const $grid = $masonryGallery.masonry({
                    itemSelector: ".grid-item",
                    columnWidth:  ".grid-item",
                    percentPosition: true
                });
                $grid.imagesLoaded().progress(function () {
                    $grid.masonry("layout");
                });
            }

            const grid = document.querySelector(".grid");
            if (grid && typeof Masonry !== "undefined") {
                new Masonry(grid, {
                    itemSelector: ".grid-item",
                    columnWidth:  ".grid-item",
                    percentPosition: true
                });
            }
        }
        masonryGridSetting();

        /* ------------------------------------------------------------------ */
        /*  FUNFACT ODOMETER                                                   */
        /* ------------------------------------------------------------------ */
        if ($(".odometer").length && typeof $.fn.appear !== "undefined") {
            $(".odometer").appear();
            $(document.body).off("appear.odometer").on("appear.odometer", ".odometer", function () {
                $(".odometer").each(function () {
                    const countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            });
        }

        /* ------------------------------------------------------------------ */
        /*  HEADER SEARCH TOGGLE                                               */
        /* ------------------------------------------------------------------ */
        if ($(".header-search-form-wrapper").length) {
            const $searchToggleBtn     = $(".search-toggle-btn");
            const $searchToggleBtnIcon = $(".search-toggle-btn i");
            const $searchContent       = $(".header-search-form");

            $searchToggleBtn.off("click.searchToggle").on("click.searchToggle", function (e) {
                $searchContent.toggleClass("header-search-content-toggle");
                $searchToggleBtnIcon.toggleClass("fi flaticon-magnifying-glass fi ti-close");
                e.stopPropagation();
            });

            $body.off("click.searchClose").on("click.searchClose", function () {
                $searchContent.removeClass("header-search-content-toggle");
            });
            $searchContent.off("click.searchStop").on("click.searchStop", function (e) {
                e.stopPropagation();
            });
        }

        /* ------------------------------------------------------------------ */
        /*  HEADER CART TOGGLE                                                 */
        /* ------------------------------------------------------------------ */
        if ($(".mini-cart").length) {
            const $cartToggleBtn = $(".cart-toggle-btn");
            const $cartContent   = $(".mini-cart-content");
            const $cartCloseBtn  = $(".mini-cart-close");

            $cartToggleBtn.off("click.cartToggle").on("click.cartToggle", function (e) {
                $cartContent.toggleClass("mini-cart-content-toggle");
                e.stopPropagation();
            });
            $cartCloseBtn.off("click.cartClose").on("click.cartClose", function (e) {
                $cartContent.removeClass("mini-cart-content-toggle");
                e.stopPropagation();
            });
            $body.off("click.cartBodyClose").on("click.cartBodyClose", function () {
                $cartContent.removeClass("mini-cart-content-toggle");
            });
            $cartContent.off("click.cartStop").on("click.cartStop", function (e) {
                e.stopPropagation();
            });
        }

        /* ------------------------------------------------------------------ */
        /*  SLICK SLIDERS                                                      */
        /* ------------------------------------------------------------------ */
        function initSlick(selector, options) {
            if ($(selector).length && typeof $.fn.slick !== "undefined") {
                if ($(selector).hasClass("slick-initialized")) {
                    $(selector).slick("unslick");
                }
                $(selector).slick(options);
            }
        }

        initSlick(".partners-slider", {
            infinite:       true,
            autoplay:       true,
            arrows:         false,
            dots:           false,
            slidesToShow:   5,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1399, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                { breakpoint: 1199, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                { breakpoint: 991,  settings: { slidesToShow: 4, slidesToScroll: 1 } },
                { breakpoint: 757,  settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 575,  settings: { slidesToShow: 2, slidesToScroll: 1 } }
            ]
        });

        initSlick(".service-slider", {
            infinite:       true,
            autoplay:       true,
            arrows:         false,
            dots:           true,
            slidesToShow:   3,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1399, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 1199, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 991,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 757,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 575,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });

        initSlick(".service-slider-s2", {
            infinite:       true,
            autoplay:       true,
            arrows:         false,
            dots:           true,
            slidesToShow:   4,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1399, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 1199, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 991,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 757,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 575,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });

        /* ------------------------------------------------------------------ */
        /*  TESTIMONIAL OWL CAROUSEL                                           */
        /* ------------------------------------------------------------------ */
        if ($(".wpo-testimonial-active").length && typeof $.fn.owlCarousel !== "undefined") {
            // Destroy existing instance if any
            if ($(".wpo-testimonial-active").data("owl.carousel")) {
                $(".wpo-testimonial-active").trigger("destroy.owl.carousel");
                $(".wpo-testimonial-active").removeClass("owl-carousel owl-loaded");
                $(".wpo-testimonial-active").find(".owl-stage-outer").children().unwrap();
            }
            $(".wpo-testimonial-active").owlCarousel({
                autoplay:          false,
                smartSpeed:        300,
                margin:            30,
                loop:              true,
                autoplayHoverPause: true,
                dots:              false,
                nav:               false,
                responsive: {
                    0:    { items: 1, dots: true, nav: false },
                    500:  { items: 1, dots: true, nav: false },
                    768:  { items: 1 },
                    991:  { items: 2 },
                    1200: { items: 2 },
                    1400: { items: 2 }
                }
            });
        }

        /* ------------------------------------------------------------------ */
        /*  SHOP DETAILS PRODUCT SLIDER                                        */
        /* ------------------------------------------------------------------ */
        if ($(".shop-single-slider").length && typeof $.fn.slick !== "undefined") {
            initSlick(".slider-for", {
                slidesToShow:   1,
                slidesToScroll: 1,
                arrows:         false,
                fade:           true,
                asNavFor:       ".slider-nav"
            });
            initSlick(".slider-nav", {
                slidesToShow:   5,
                slidesToScroll: 1,
                asNavFor:       ".slider-for",
                focusOnSelect:  true,
                prevArrow:      '<i class="nav-btn nav-btn-lt ti-arrow-left"></i>',
                nextArrow:      '<i class="nav-btn nav-btn-rt ti-arrow-right"></i>',
                responsive: [
                    { breakpoint: 500, settings: { slidesToShow: 3, infinite: true } },
                    { breakpoint: 400, settings: { slidesToShow: 2 } }
                ]
            });
        }

        /* ------------------------------------------------------------------ */
        /*  TOUCHSPIN                                                          */
        /* ------------------------------------------------------------------ */
        if ($("input[name='product-count']").length && typeof $.fn.TouchSpin !== "undefined") {
            $("input[name='product-count']").TouchSpin({ verticalbuttons: true });
        }

        /* ------------------------------------------------------------------ */
        /*  CART PLUS-MINUS BUTTONS                                            */
        /* ------------------------------------------------------------------ */
        $(".cart-plus-minus").each(function () {
            if (!$(this).find(".qtybutton").length) {
                $(this).append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
            }
        });
        $(".qtybutton").off("click.qty").on("click.qty", function () {
            const $button  = $(this);
            const $input   = $button.parent().find("input");
            const oldValue = parseFloat($input.val()) || 0;
            const newVal   = $button.text() === "+" ? oldValue + 1 : (oldValue > 0 ? oldValue - 1 : 0);
            $input.val(newVal);
        });

        /* ------------------------------------------------------------------ */
        /*  BACK TO TOP                                                        */
        /* ------------------------------------------------------------------ */
        function toggleBackToTopBtn() {
            if ($(window).scrollTop() > 1000) {
                $("a.back-to-top").fadeIn("slow");
            } else {
                $("a.back-to-top").fadeOut("slow");
            }
        }
        $(window).off("scroll.backToTop").on("scroll.backToTop", toggleBackToTopBtn);
        $("a.back-to-top").off("click.backToTop").on("click.backToTop", function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 700);
        });

        /* ------------------------------------------------------------------ */
        /*  FORM VALIDATION & SUBMISSION                                       */
        /* ------------------------------------------------------------------ */
        function handleAjaxForm($form, loaderSel, successSel, errorSel) {
            $.ajax({
                type:     "POST",
                url:      "mail-contact.php",
                data:     $form.serialize(),
                dataType: "json",
                beforeSend: function () { $(loaderSel).show(); },
                success: function (response) {
                    $(loaderSel).hide();
                    if (response.status === "success") {
                        $(successSel).slideDown("slow").text("Form submitted successfully!");
                        setTimeout(function () { $(successSel).slideUp("slow"); }, 3000);
                        $form[0].reset();
                    } else {
                        $(errorSel).slideDown("slow").text(response.message || "Something went wrong.");
                        setTimeout(function () { $(errorSel).slideUp("slow"); }, 3000);
                    }
                },
                error: function (xhr) {
                    $(loaderSel).hide();
                    const msg = (xhr.responseJSON && xhr.responseJSON.message) ? xhr.responseJSON.message : "An error occurred.";
                    $(errorSel).slideDown("slow").text(msg);
                    setTimeout(function () { $(errorSel).slideUp("slow"); }, 3000);
                }
            });
        }

        if ($("#contact-form-main").length && typeof $.fn.validate !== "undefined") {
            $("#contact-form-main").validate({
                rules: {
                    name:    { required: true, minlength: 2 },
                    email:   { required: true, email: true },
                    phone:   { required: true, minlength: 10 },
                    zip:     { required: true, digits: true },
                    subject: { required: true },
                    approx:  { required: true },
                    bed:     { required: true },
                    bath:    { required: true }
                },
                messages: {
                    name:    "Please enter your name",
                    email:   "Please enter a valid email address",
                    phone:   "Please enter your phone number",
                    zip:     "Please enter your zip code",
                    subject: "Please select a service",
                    approx:  "Please enter approx. square footage",
                    bed:     "Please select bedroom option",
                    bath:    "Please select bathroom option"
                },
                submitHandler: function (form) {
                    handleAjaxForm($(form), "#loader", "#success", "#error");
                    return false;
                }
            });
        }

        if ($("#contact-form").length && typeof $.fn.validate !== "undefined") {
            $("#contact-form").validate({
                rules: {
                    name:    { required: true, minlength: 2 },
                    email:   { required: true, email: true },
                    subject: { required: true },
                    date:    { required: true },
                    time:    { required: true }
                },
                messages: {
                    name:    "Please enter your name",
                    email:   "Please enter your email address",
                    subject: "Please select your subject",
                    date:    "Please select a date",
                    time:    "Please select a time"
                },
                submitHandler: function (form) {
                    handleAjaxForm($(form), "#loader", "#success", "#error");
                    return false;
                }
            });
        }

        /* ------------------------------------------------------------------ */
        /*  LANGUAGE SELECT (custom dropdown)                                  */
        /* ------------------------------------------------------------------ */
        const selectElement = document.getElementById("languageSelect");
        if (selectElement) {
            const customSelectWrapper = document.querySelector(".custom-select-wrapper");
            const customSelect        = document.querySelector(".custom-select");
            const customOptions       = document.querySelector(".custom-options");

            if (customSelectWrapper && customSelect && customOptions) {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                if (selectedOption) {
                    customSelect.innerHTML = '<img src="' + selectedOption.getAttribute("data-icon") + '" alt=""> ' + selectedOption.text;
                }

                customOptions.innerHTML = "";
                Array.from(selectElement.options).forEach(function (option) {
                    const optionDiv = document.createElement("div");
                    optionDiv.innerHTML = '<img src="' + option.getAttribute("data-icon") + '" alt=""> ' + option.text;
                    optionDiv.addEventListener("click", function () {
                        customSelect.innerHTML = '<img src="' + option.getAttribute("data-icon") + '" alt=""> ' + option.text;
                        selectElement.value = option.value;
                        customOptions.style.display = "none";
                        selectElement.dispatchEvent(new Event("change"));
                    });
                    customOptions.appendChild(optionDiv);
                });

                $(customSelectWrapper).off("click.langToggle").on("click.langToggle", function (e) {
                    e.stopPropagation();
                    customOptions.style.display = (customOptions.style.display === "block") ? "none" : "block";
                });

                $(document).off("click.langClose").on("click.langClose", function (event) {
                    if (!customSelectWrapper.contains(event.target)) {
                        customOptions.style.display = "none";
                    }
                });
            }
        }

        /* ------------------------------------------------------------------ */
        /*  ACCORDION                                                          */
        /* ------------------------------------------------------------------ */
        const headers = document.querySelectorAll(".accordion-header");
        headers.forEach(function (header) {
            $(header).off("click.accordion").on("click.accordion", function () {
                const item     = header.parentElement;
                const isActive = item.classList.contains("active");

                document.querySelectorAll(".accordion-item.active").forEach(function (activeItem) {
                    activeItem.classList.remove("active");
                });
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });

        /* ------------------------------------------------------------------ */
        /*  WINDOW RESIZE                                                      */
        /* ------------------------------------------------------------------ */
        $(window).off("resize.cleanar").on("resize.cleanar", function () {
            toggleClassForSmallNav();
            clearTimeout($.data(this, "resizeTimer"));
            $.data(this, "resizeTimer", setTimeout(function () {
                smallNavFunctionality();
            }, 200));
        });

    }; // end window.initPagePlugins

    /* ======================================================================
       AUTO-RUN on first page load
    ====================================================================== */
    $(document).ready(function () {
        window.initPagePlugins();
        if (typeof window.runPreloaderAndWow === "function") {
            window.runPreloaderAndWow();
        }
    });

})(window.jQuery);
