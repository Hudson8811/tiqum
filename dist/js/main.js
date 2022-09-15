/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/confirm/confirm.js":
/*!***********************************************!*\
  !*** ./src/blocks/modules/confirm/confirm.js ***!
  \***********************************************/
/***/ (function() {

$(document).ready(function () {
  $('.confirm__item').mouseover(function () {
    $('.confirm__item').addClass("js-opacity-item");
    $(this).addClass("js-active-item");
  });
  $('.confirm__item').mouseout(function () {
    $('.confirm__item').removeClass("js-opacity-item");
    $(this).removeClass("js-active-item");
  });
});

/***/ }),

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/***/ (function() {

$('.form-wewillfind-footer__item input').focus(function () {
  $(this).parent().addClass("js-active-area");
});
$('.form-wewillfind-footer__item input').blur(function () {
  if ($('.form-wewillfind-footer__item input').val() === '') {
    $(this).parent().removeClass("js-active-area");
  }
});
$('.form-wewillfind-footer__item textarea').focus(function () {
  $(this).parent().addClass("js-active-area");
});
$('.form-wewillfind-footer__item textarea').blur(function () {
  if ($('.form-wewillfind-footer__item textarea').val() === '') {
    $(this).parent().removeClass("js-active-area");
  }
});

/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/***/ (function() {

$(document).ready(function () {
  if ($(".wrapper").hasClass("main-page")) {
    $('.header').addClass("js-header-white");
  }
});
$(document).scroll(function () {
  if ($(document).scrollTop() > 10) {
    $('.header').addClass("js-header-fixed");
  } else if ($(document).scrollTop() < 10) {
    $('.header').removeClass("js-header-fixed");
  }
});

/***/ }),

/***/ "./src/blocks/modules/realization/realization.js":
/*!*******************************************************!*\
  !*** ./src/blocks/modules/realization/realization.js ***!
  \*******************************************************/
/***/ (function() {

var swiper = new Swiper(".realization__swiper", {
  loop: true,
  speed: 3000,
  slidesPerView: "2.75",
  autoplay: {
    delay: 0
  },
  breakpoints: {
    768: {
      slidesPerView: "3"
    },
    1024: {
      slidesPerView: "4"
    },
    1440: {
      slidesPerView: "5.7"
    }
  }
});

/***/ }),

/***/ "./src/blocks/modules/wehelp/wehelp.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/wehelp/wehelp.js ***!
  \*********************************************/
/***/ (function() {

var swiper = new Swiper(".wehelp__swiper", {
  loop: true,
  speed: 3000,
  slidesPerView: "1.9",
  autoplay: {
    delay: 0
  },
  breakpoints: {
    768: {
      slidesPerView: "3"
    },
    1024: {
      slidesPerView: "3.8"
    }
  }
});

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_realization_realization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/realization/realization */ "./src/blocks/modules/realization/realization.js");
/* harmony import */ var _modules_realization_realization__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_realization_realization__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_wehelp_wehelp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/wehelp/wehelp */ "./src/blocks/modules/wehelp/wehelp.js");
/* harmony import */ var _modules_wehelp_wehelp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_wehelp_wehelp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_confirm_confirm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/confirm/confirm */ "./src/blocks/modules/confirm/confirm.js");
/* harmony import */ var _modules_confirm_confirm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_confirm_confirm__WEBPACK_IMPORTED_MODULE_4__);






/***/ }),

/***/ "./src/js/import/pages.js":
/*!********************************!*\
  !*** ./src/js/import/pages.js ***!
  \********************************/
/***/ (function() {

$(document).ready(function () {
  $('.archive-projects__item').mouseover(function () {
    $('.archive-projects__item').addClass("js-opacity-item");
    $(this).addClass("js-active-item");
  });
  $('.archive-projects__item').mouseout(function () {
    $('.archive-projects__item').removeClass("js-opacity-item");
    $(this).removeClass("js-active-item");
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/pages */ "./src/js/import/pages.js");
/* harmony import */ var _import_pages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_pages__WEBPACK_IMPORTED_MODULE_1__);


}();
/******/ })()
;
//# sourceMappingURL=main.js.map