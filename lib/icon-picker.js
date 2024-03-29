module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/autocomplete");

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/icon-picker/src/icon-picker.vue?vue&type=template&id=38020b76&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-autocomplete",
    {
      ref: "input",
      staticClass: "el-iconpicker",
      attrs: {
        "popper-class": "el-iconpicker-popper",
        value: _vm.currentValue,
        name: _vm.name,
        size: _vm.inputIconpickerSize,
        disabled: _vm.inputIconpickerDisabled,
        clearable: _vm.clearable,
        placeholder: _vm.placeholder,
        fetchSuggestions: _vm.querySearch
      },
      on: { input: _vm.handleInput, select: _vm.handleSelect },
      scopedSlots: _vm._u([
        {
          key: "default",
          fn: function(ref) {
            var item = ref.item
            return [
              _c("div", { attrs: { title: item.name } }, [
                _c("i", { class: item.name })
              ])
            ]
          }
        }
      ])
    },
    [
      _c("template", { slot: "prepend" }, [
        _c("i", { class: _vm.currentValue })
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/icon-picker/src/icon-picker.vue?vue&type=template&id=38020b76&

// EXTERNAL MODULE: external "element-ui/lib/autocomplete"
var autocomplete_ = __webpack_require__(46);
var autocomplete_default = /*#__PURE__*/__webpack_require__.n(autocomplete_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/icon-picker/src/icon-picker.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var icon_pickervue_type_script_lang_js_ = ({
  name: 'ElIconPicker',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  components: {
    ElAutocomplete: autocomplete_default.a
  },

  data: function data() {
    return {
      searchQuery: null,
      currentValue: null
    };
  },


  props: {
    value: String,
    disabled: Boolean,
    size: String,
    name: String,
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Choose icon'
    },
    icons: {
      type: Array,
      default: function _default() {
        return [{ name: 'el-icon-home' }, { name: 'el-icon-home2' }, { name: 'el-icon-home5' }, { name: 'el-icon-home7' }, { name: 'el-icon-home8' }, { name: 'el-icon-home9' }, { name: 'el-icon-office' }, { name: 'el-icon-city' }, { name: 'el-icon-newspaper' }, { name: 'el-icon-magazine' }, { name: 'el-icon-design' }, { name: 'el-icon-pencil' }, { name: 'el-icon-pencil3' }, { name: 'el-icon-pencil4' }, { name: 'el-icon-pencil5' }, { name: 'el-icon-pencil6' }, { name: 'el-icon-pencil7' }, { name: 'el-icon-eraser' }, { name: 'el-icon-eraser2' }, { name: 'el-icon-eraser3' }, { name: 'el-icon-quill2' }, { name: 'el-icon-quill4' }, { name: 'el-icon-pen' }, { name: 'el-icon-pen-plus' }, { name: 'el-icon-pen-minus' }, { name: 'el-icon-pen2' }, { name: 'el-icon-blog' }, { name: 'el-icon-pen6' }, { name: 'el-icon-brush' }, { name: 'el-icon-spray' }, { name: 'el-icon-color-sampler' }, { name: 'el-icon-toggle' }, { name: 'el-icon-bucket' }, { name: 'el-icon-gradient' }, { name: 'el-icon-eyedropper' }, { name: 'el-icon-eyedropper2' }, { name: 'el-icon-eyedropper3' }, { name: 'el-icon-droplet' }, { name: 'el-icon-droplet2' }, { name: 'el-icon-color-clear' }, { name: 'el-icon-paint-format' }, { name: 'el-icon-stamp' }, { name: 'el-icon-image2' }, { name: 'el-icon-image-compare' }, { name: 'el-icon-images2' }, { name: 'el-icon-image3' }, { name: 'el-icon-images3' }, { name: 'el-icon-image4' }, { name: 'el-icon-image5' }, { name: 'el-icon-camera' }, { name: 'el-icon-shutter' }, { name: 'el-icon-headphones' }, { name: 'el-icon-headset' }, { name: 'el-icon-music' }, { name: 'el-icon-album' }, { name: 'el-icon-tape' }, { name: 'el-icon-piano' }, { name: 'el-icon-speakers' }, { name: 'el-icon-play' }, { name: 'el-icon-clapboard-play' }, { name: 'el-icon-clapboard' }, { name: 'el-icon-media' }, { name: 'el-icon-presentation' }, { name: 'el-icon-movie' }, { name: 'el-icon-film' }, { name: 'el-icon-film2' }, { name: 'el-icon-film3' }, { name: 'el-icon-film4' }, { name: 'el-icon-video-camera' }, { name: 'el-icon-video-camera2' }, { name: 'el-icon-video-camera-slash' }, { name: 'el-icon-video-camera3' }, { name: 'el-icon-dice' }, { name: 'el-icon-chess-king' }, { name: 'el-icon-chess-queen' }, { name: 'el-icon-chess' }, { name: 'el-icon-megaphone' }, { name: 'el-icon-new' }, { name: 'el-icon-connection' }, { name: 'el-icon-station' }, { name: 'el-icon-satellite-dish2' }, { name: 'el-icon-feed' }, { name: 'el-icon-mic2' }, { name: 'el-icon-mic-off2' }, { name: 'el-icon-book' }, { name: 'el-icon-book2' }, { name: 'el-icon-book-play' }, { name: 'el-icon-book3' }, { name: 'el-icon-bookmark' }, { name: 'el-icon-books' }, { name: 'el-icon-archive' }, { name: 'el-icon-reading' }, { name: 'el-icon-library2' }, { name: 'el-icon-graduation2' }, { name: 'el-icon-file-text' }, { name: 'el-icon-profile' }, { name: 'el-icon-file-empty' }, { name: 'el-icon-file-empty2' }, { name: 'el-icon-files-empty' }, { name: 'el-icon-files-empty2' }, { name: 'el-icon-file-plus' }, { name: 'el-icon-file-plus2' }, { name: 'el-icon-file-minus' }, { name: 'el-icon-file-minus2' }, { name: 'el-icon-file-download' }, { name: 'el-icon-file-download2' }, { name: 'el-icon-file-upload' }, { name: 'el-icon-file-upload2' }, { name: 'el-icon-file-check' }, { name: 'el-icon-file-check2' }, { name: 'el-icon-file-eye' }, { name: 'el-icon-file-eye2' }, { name: 'el-icon-file-text2' }, { name: 'el-icon-file-text3' }, { name: 'el-icon-file-picture' }, { name: 'el-icon-file-picture2' }, { name: 'el-icon-file-music' }, { name: 'el-icon-file-music2' }, { name: 'el-icon-file-play' }, { name: 'el-icon-file-play2' }, { name: 'el-icon-file-video' }, { name: 'el-icon-file-video2' }, { name: 'el-icon-copy' }, { name: 'el-icon-copy2' }, { name: 'el-icon-file-zip' }, { name: 'el-icon-file-zip2' }, { name: 'el-icon-file-xml' }, { name: 'el-icon-file-xml2' }, { name: 'el-icon-file-css' }, { name: 'el-icon-file-css2' }, { name: 'el-icon-file-presentation' }, { name: 'el-icon-file-presentation2' }, { name: 'el-icon-file-stats' }, { name: 'el-icon-file-stats2' }, { name: 'el-icon-file-locked' }, { name: 'el-icon-file-locked2' }, { name: 'el-icon-file-spreadsheet' }, { name: 'el-icon-file-spreadsheet2' }, { name: 'el-icon-copy3' }, { name: 'el-icon-copy4' }, { name: 'el-icon-paste' }, { name: 'el-icon-paste2' }, { name: 'el-icon-paste3' }, { name: 'el-icon-paste4' }, { name: 'el-icon-stack' }, { name: 'el-icon-stack2' }, { name: 'el-icon-stack3' }, { name: 'el-icon-folder' }, { name: 'el-icon-folder-search' }, { name: 'el-icon-folder-download' }, { name: 'el-icon-folder-upload' }, { name: 'el-icon-folder-plus' }, { name: 'el-icon-folder-plus2' }, { name: 'el-icon-folder-minus' }, { name: 'el-icon-folder-minus2' }, { name: 'el-icon-folder-check' }, { name: 'el-icon-folder-heart' }, { name: 'el-icon-folder-remove' }, { name: 'el-icon-folder2' }, { name: 'el-icon-folder-open' }, { name: 'el-icon-folder3' }, { name: 'el-icon-folder4' }, { name: 'el-icon-folder-plus3' }, { name: 'el-icon-folder-minus3' }, { name: 'el-icon-folder-plus4' }, { name: 'el-icon-folder-minus4' }, { name: 'el-icon-folder-download2' }, { name: 'el-icon-folder-upload2' }, { name: 'el-icon-folder-download3' }, { name: 'el-icon-folder-upload3' }, { name: 'el-icon-folder5' }, { name: 'el-icon-folder-open2' }, { name: 'el-icon-folder6' }, { name: 'el-icon-folder-open3' }, { name: 'el-icon-certificate' }, { name: 'el-icon-cc' }, { name: 'el-icon-price-tag' }, { name: 'el-icon-price-tag2' }, { name: 'el-icon-price-tags' }, { name: 'el-icon-price-tag3' }, { name: 'el-icon-price-tags2' }, { name: 'el-icon-barcode2' }, { name: 'el-icon-qrcode' }, { name: 'el-icon-ticket' }, { name: 'el-icon-theater' }, { name: 'el-icon-store' }, { name: 'el-icon-store2' }, { name: 'el-icon-cart' }, { name: 'el-icon-cart2' }, { name: 'el-icon-cart4' }, { name: 'el-icon-cart5' }, { name: 'el-icon-cart-add' }, { name: 'el-icon-cart-add2' }, { name: 'el-icon-cart-remove' }, { name: 'el-icon-basket' }, { name: 'el-icon-bag' }, { name: 'el-icon-percent' }, { name: 'el-icon-coins' }, { name: 'el-icon-coin-dollar' }, { name: 'el-icon-coin-euro' }, { name: 'el-icon-coin-pound' }, { name: 'el-icon-coin-yen' }, { name: 'el-icon-piggy-bank' }, { name: 'el-icon-wallet' }, { name: 'el-icon-cash' }, { name: 'el-icon-cash2' }, { name: 'el-icon-cash3' }, { name: 'el-icon-cash4' }, { name: 'el-icon-credit-card' }, { name: 'el-icon-credit-card2' }, { name: 'el-icon-calculator4' }, { name: 'el-icon-calculator2' }, { name: 'el-icon-calculator3' }, { name: 'el-icon-chip' }, { name: 'el-icon-lifebuoy' }, { name: 'el-icon-phone' }, { name: 'el-icon-phone2' }, { name: 'el-icon-phone-slash' }, { name: 'el-icon-phone-wave' }, { name: 'el-icon-phone-plus' }, { name: 'el-icon-phone-minus' }, { name: 'el-icon-phone-plus2' }, { name: 'el-icon-phone-minus2' }, { name: 'el-icon-phone-incoming' }, { name: 'el-icon-phone-outgoing' }, { name: 'el-icon-phone-hang-up' }, { name: 'el-icon-address-book' }, { name: 'el-icon-address-book2' }, { name: 'el-icon-address-book3' }, { name: 'el-icon-notebook' }, { name: 'el-icon-envelop' }, { name: 'el-icon-envelop2' }, { name: 'el-icon-envelop3' }, { name: 'el-icon-envelop4' }, { name: 'el-icon-envelop5' }, { name: 'el-icon-mailbox' }, { name: 'el-icon-pushpin' }, { name: 'el-icon-location3' }, { name: 'el-icon-location4' }, { name: 'el-icon-compass4' }, { name: 'el-icon-map' }, { name: 'el-icon-map4' }, { name: 'el-icon-map5' }, { name: 'el-icon-direction' }, { name: 'el-icon-reset' }, { name: 'el-icon-history' }, { name: 'el-icon-watch' }, { name: 'el-icon-watch2' }, { name: 'el-icon-alarm' }, { name: 'el-icon-alarm-add' }, { name: 'el-icon-alarm-check' }, { name: 'el-icon-alarm-cancel' }, { name: 'el-icon-bell2' }, { name: 'el-icon-bell3' }, { name: 'el-icon-bell-plus' }, { name: 'el-icon-bell-minus' }, { name: 'el-icon-bell-check' }, { name: 'el-icon-bell-cross' }, { name: 'el-icon-calendar' }, { name: 'el-icon-calendar2' }, { name: 'el-icon-calendar3' }, { name: 'el-icon-calendar52' }, { name: 'el-icon-printer' }, { name: 'el-icon-printer2' }, { name: 'el-icon-printer4' }, { name: 'el-icon-shredder' }, { name: 'el-icon-mouse' }, { name: 'el-icon-mouse-left' }, { name: 'el-icon-mouse-right' }, { name: 'el-icon-keyboard' }, { name: 'el-icon-typewriter' }, { name: 'el-icon-display' }, { name: 'el-icon-display4' }, { name: 'el-icon-laptop' }, { name: 'el-icon-mobile' }, { name: 'el-icon-mobile2' }, { name: 'el-icon-tablet' }, { name: 'el-icon-mobile3' }, { name: 'el-icon-tv' }, { name: 'el-icon-radio' }, { name: 'el-icon-cabinet' }, { name: 'el-icon-drawer' }, { name: 'el-icon-drawer2' }, { name: 'el-icon-drawer-out' }, { name: 'el-icon-drawer-in' }, { name: 'el-icon-drawer3' }, { name: 'el-icon-box' }, { name: 'el-icon-box-add' }, { name: 'el-icon-box-remove' }, { name: 'el-icon-download' }, { name: 'el-icon-upload' }, { name: 'el-icon-floppy-disk' }, { name: 'el-icon-floppy-disks' }, { name: 'el-icon-usb-stick' }, { name: 'el-icon-drive' }, { name: 'el-icon-server' }, { name: 'el-icon-database' }, { name: 'el-icon-database2' }, { name: 'el-icon-database4' }, { name: 'el-icon-database-menu' }, { name: 'el-icon-database-add' }, { name: 'el-icon-database-remove' }, { name: 'el-icon-database-insert' }, { name: 'el-icon-database-export' }, { name: 'el-icon-database-upload' }, { name: 'el-icon-database-refresh' }, { name: 'el-icon-database-diff' }, { name: 'el-icon-database-edit2' }, { name: 'el-icon-database-check' }, { name: 'el-icon-database-arrow' }, { name: 'el-icon-database-time2' }, { name: 'el-icon-undo' }, { name: 'el-icon-redo' }, { name: 'el-icon-rotate-ccw' }, { name: 'el-icon-rotate-cw' }, { name: 'el-icon-rotate-ccw2' }, { name: 'el-icon-rotate-cw2' }, { name: 'el-icon-rotate-ccw3' }, { name: 'el-icon-rotate-cw3' }, { name: 'el-icon-flip-vertical2' }, { name: 'el-icon-flip-horizontal2' }, { name: 'el-icon-flip-vertical3' }, { name: 'el-icon-flip-vertical4' }, { name: 'el-icon-angle' }, { name: 'el-icon-shear' }, { name: 'el-icon-align-left' }, { name: 'el-icon-align-center-horizontal' }, { name: 'el-icon-align-right' }, { name: 'el-icon-align-top' }, { name: 'el-icon-align-center-vertical' }, { name: 'el-icon-align-bottom' }, { name: 'el-icon-undo2' }, { name: 'el-icon-redo2' }, { name: 'el-icon-forward' }, { name: 'el-icon-reply' }, { name: 'el-icon-reply-all' }, { name: 'el-icon-bubble' }, { name: 'el-icon-bubbles' }, { name: 'el-icon-bubbles2' }, { name: 'el-icon-bubble2' }, { name: 'el-icon-bubbles3' }, { name: 'el-icon-bubbles4' }, { name: 'el-icon-bubble-notification' }, { name: 'el-icon-bubbles5' }, { name: 'el-icon-bubbles6' }, { name: 'el-icon-bubble6' }, { name: 'el-icon-bubbles7' }, { name: 'el-icon-bubble7' }, { name: 'el-icon-bubbles8' }, { name: 'el-icon-bubble8' }, { name: 'el-icon-bubble-dots3' }, { name: 'el-icon-bubble-lines3' }, { name: 'el-icon-bubble9' }, { name: 'el-icon-bubble-dots4' }, { name: 'el-icon-bubble-lines4' }, { name: 'el-icon-bubbles9' }, { name: 'el-icon-bubbles10' }, { name: 'el-icon-user' }, { name: 'el-icon-users' }, { name: 'el-icon-user-plus' }, { name: 'el-icon-user-minus' }, { name: 'el-icon-user-cancel' }, { name: 'el-icon-user-block' }, { name: 'el-icon-user-lock' }, { name: 'el-icon-user-check' }, { name: 'el-icon-users2' }, { name: 'el-icon-users4' }, { name: 'el-icon-user-tie' }, { name: 'el-icon-collaboration' }, { name: 'el-icon-vcard' }, { name: 'el-icon-hat' }, { name: 'el-icon-bowtie' }, { name: 'el-icon-quotes-left' }, { name: 'el-icon-quotes-right' }, { name: 'el-icon-quotes-left2' }, { name: 'el-icon-quotes-right2' }, { name: 'el-icon-hour-glass' }, { name: 'el-icon-hour-glass2' }, { name: 'el-icon-hour-glass3' }, { name: 'el-icon-spinner' }, { name: 'el-icon-spinner2' }, { name: 'el-icon-spinner3' }, { name: 'el-icon-spinner4' }, { name: 'el-icon-spinner6' }, { name: 'el-icon-spinner9' }, { name: 'el-icon-spinner10' }, { name: 'el-icon-spinner11' }, { name: 'el-icon-microscope' }, { name: 'el-icon-enlarge' }, { name: 'el-icon-shrink' }, { name: 'el-icon-enlarge3' }, { name: 'el-icon-shrink3' }, { name: 'el-icon-enlarge5' }, { name: 'el-icon-shrink5' }, { name: 'el-icon-enlarge6' }, { name: 'el-icon-shrink6' }, { name: 'el-icon-enlarge7' }, { name: 'el-icon-shrink7' }, { name: 'el-icon-key' }, { name: 'el-icon-lock' }, { name: 'el-icon-lock2' }, { name: 'el-icon-lock4' }, { name: 'el-icon-unlocked' }, { name: 'el-icon-lock5' }, { name: 'el-icon-unlocked2' }, { name: 'el-icon-safe' }, { name: 'el-icon-wrench' }, { name: 'el-icon-wrench2' }, { name: 'el-icon-wrench3' }, { name: 'el-icon-equalizer' }, { name: 'el-icon-equalizer2' }, { name: 'el-icon-equalizer3' }, { name: 'el-icon-equalizer4' }, { name: 'el-icon-cog' }, { name: 'el-icon-cogs' }, { name: 'el-icon-cog2' }, { name: 'el-icon-cog3' }, { name: 'el-icon-cog4' }, { name: 'el-icon-cog52' }, { name: 'el-icon-cog6' }, { name: 'el-icon-cog7' }, { name: 'el-icon-hammer' }, { name: 'el-icon-hammer-wrench' }, { name: 'el-icon-magic-wand' }, { name: 'el-icon-magic-wand2' }, { name: 'el-icon-pulse2' }, { name: 'el-icon-aid-kit' }, { name: 'el-icon-bug2' }, { name: 'el-icon-construction' }, { name: 'el-icon-traffic-cone' }, { name: 'el-icon-traffic-lights' }, { name: 'el-icon-pie-chart' }, { name: 'el-icon-pie-chart2' }, { name: 'el-icon-pie-chart3' }, { name: 'el-icon-pie-chart4' }, { name: 'el-icon-pie-chart5' }, { name: 'el-icon-pie-chart6' }, { name: 'el-icon-pie-chart7' }, { name: 'el-icon-stats-dots' }, { name: 'el-icon-stats-bars' }, { name: 'el-icon-pie-chart8' }, { name: 'el-icon-stats-bars2' }, { name: 'el-icon-stats-bars3' }, { name: 'el-icon-stats-bars4' }, { name: 'el-icon-chart' }, { name: 'el-icon-stats-growth' }, { name: 'el-icon-stats-decline' }, { name: 'el-icon-stats-growth2' }, { name: 'el-icon-stats-decline2' }, { name: 'el-icon-stairs-up' }, { name: 'el-icon-stairs-down' }, { name: 'el-icon-stairs' }, { name: 'el-icon-ladder' }, { name: 'el-icon-rating' }, { name: 'el-icon-rating2' }, { name: 'el-icon-rating3' }, { name: 'el-icon-podium' }, { name: 'el-icon-stars' }, { name: 'el-icon-medal-star' }, { name: 'el-icon-medal' }, { name: 'el-icon-medal2' }, { name: 'el-icon-medal-first' }, { name: 'el-icon-medal-second' }, { name: 'el-icon-medal-third' }, { name: 'el-icon-crown' }, { name: 'el-icon-trophy2' }, { name: 'el-icon-trophy3' }, { name: 'el-icon-diamond' }, { name: 'el-icon-trophy4' }, { name: 'el-icon-gift' }, { name: 'el-icon-pipe' }, { name: 'el-icon-mustache' }, { name: 'el-icon-cup2' }, { name: 'el-icon-coffee' }, { name: 'el-icon-paw' }, { name: 'el-icon-footprint' }, { name: 'el-icon-rocket' }, { name: 'el-icon-meter2' }, { name: 'el-icon-meter-slow' }, { name: 'el-icon-meter-fast' }, { name: 'el-icon-hammer2' }, { name: 'el-icon-balance' }, { name: 'el-icon-fire' }, { name: 'el-icon-fire2' }, { name: 'el-icon-lab' }, { name: 'el-icon-atom' }, { name: 'el-icon-atom2' }, { name: 'el-icon-bin' }, { name: 'el-icon-bin2' }, { name: 'el-icon-briefcase' }, { name: 'el-icon-briefcase3' }, { name: 'el-icon-airplane2' }, { name: 'el-icon-airplane3' }, { name: 'el-icon-airplane4' }, { name: 'el-icon-paperplane' }, { name: 'el-icon-car' }, { name: 'el-icon-steering-wheel' }, { name: 'el-icon-car2' }, { name: 'el-icon-gas' }, { name: 'el-icon-bus' }, { name: 'el-icon-truck' }, { name: 'el-icon-bike' }, { name: 'el-icon-road' }, { name: 'el-icon-train' }, { name: 'el-icon-train2' }, { name: 'el-icon-ship' }, { name: 'el-icon-boat' }, { name: 'el-icon-chopper' }, { name: 'el-icon-cube' }, { name: 'el-icon-cube2' }, { name: 'el-icon-cube3' }, { name: 'el-icon-cube4' }, { name: 'el-icon-pyramid' }, { name: 'el-icon-pyramid2' }, { name: 'el-icon-package' }, { name: 'el-icon-puzzle' }, { name: 'el-icon-puzzle2' }, { name: 'el-icon-puzzle3' }, { name: 'el-icon-puzzle4' }, { name: 'el-icon-glasses-3d2' }, { name: 'el-icon-brain' }, { name: 'el-icon-accessibility' }, { name: 'el-icon-accessibility2' }, { name: 'el-icon-strategy' }, { name: 'el-icon-target' }, { name: 'el-icon-target2' }, { name: 'el-icon-shield-check' }, { name: 'el-icon-shield-notice' }, { name: 'el-icon-shield2' }, { name: 'el-icon-racing' }, { name: 'el-icon-finish' }, { name: 'el-icon-power2' }, { name: 'el-icon-power3' }, { name: 'el-icon-switch' }, { name: 'el-icon-switch22' }, { name: 'el-icon-power-cord' }, { name: 'el-icon-clipboard' }, { name: 'el-icon-clipboard2' }, { name: 'el-icon-clipboard3' }, { name: 'el-icon-clipboard4' }, { name: 'el-icon-clipboard5' }, { name: 'el-icon-clipboard6' }, { name: 'el-icon-playlist' }, { name: 'el-icon-playlist-add' }, { name: 'el-icon-list-numbered' }, { name: 'el-icon-list' }, { name: 'el-icon-list2' }, { name: 'el-icon-more' }, { name: 'el-icon-more2' }, { name: 'el-icon-grid' }, { name: 'el-icon-grid2' }, { name: 'el-icon-grid3' }, { name: 'el-icon-grid4' }, { name: 'el-icon-grid52' }, { name: 'el-icon-grid6' }, { name: 'el-icon-grid7' }, { name: 'el-icon-tree5' }, { name: 'el-icon-tree6' }, { name: 'el-icon-tree7' }, { name: 'el-icon-lan' }, { name: 'el-icon-lan2' }, { name: 'el-icon-lan3' }, { name: 'el-icon-menu' }, { name: 'el-icon-circle-small' }, { name: 'el-icon-menu2' }, { name: 'el-icon-menu3' }, { name: 'el-icon-menu4' }, { name: 'el-icon-menu5' }, { name: 'el-icon-menu62' }, { name: 'el-icon-menu7' }, { name: 'el-icon-menu8' }, { name: 'el-icon-menu9' }, { name: 'el-icon-menu10' }, { name: 'el-icon-cloud' }, { name: 'el-icon-cloud-download' }, { name: 'el-icon-cloud-upload' }, { name: 'el-icon-cloud-check' }, { name: 'el-icon-cloud2' }, { name: 'el-icon-cloud-download2' }, { name: 'el-icon-cloud-upload2' }, { name: 'el-icon-cloud-check2' }, { name: 'el-icon-import' }, { name: 'el-icon-download4' }, { name: 'el-icon-upload4' }, { name: 'el-icon-download7' }, { name: 'el-icon-upload7' }, { name: 'el-icon-download10' }, { name: 'el-icon-upload10' }, { name: 'el-icon-sphere' }, { name: 'el-icon-sphere3' }, { name: 'el-icon-earth' }, { name: 'el-icon-link' }, { name: 'el-icon-unlink' }, { name: 'el-icon-link2' }, { name: 'el-icon-unlink2' }, { name: 'el-icon-anchor' }, { name: 'el-icon-flag3' }, { name: 'el-icon-flag4' }, { name: 'el-icon-flag7' }, { name: 'el-icon-flag8' }, { name: 'el-icon-attachment' }, { name: 'el-icon-attachment2' }, { name: 'el-icon-eye' }, { name: 'el-icon-eye-plus' }, { name: 'el-icon-eye-minus' }, { name: 'el-icon-eye-blocked' }, { name: 'el-icon-eye2' }, { name: 'el-icon-eye-blocked2' }, { name: 'el-icon-eye4' }, { name: 'el-icon-bookmark2' }, { name: 'el-icon-bookmark3' }, { name: 'el-icon-bookmarks' }, { name: 'el-icon-bookmark4' }, { name: 'el-icon-spotlight2' }, { name: 'el-icon-starburst' }, { name: 'el-icon-snowflake' }, { name: 'el-icon-weather-windy' }, { name: 'el-icon-fan' }, { name: 'el-icon-umbrella' }, { name: 'el-icon-sun3' }, { name: 'el-icon-contrast' }, { name: 'el-icon-bed2' }, { name: 'el-icon-furniture' }, { name: 'el-icon-chair' }, { name: 'el-icon-star-empty3' }, { name: 'el-icon-star-half' }, { name: 'el-icon-star-full2' }, { name: 'el-icon-heart5' }, { name: 'el-icon-heart6' }, { name: 'el-icon-heart-broken2' }, { name: 'el-icon-thumbs-up2' }, { name: 'el-icon-thumbs-down2' }, { name: 'el-icon-thumbs-up3' }, { name: 'el-icon-thumbs-down3' }, { name: 'el-icon-height' }, { name: 'el-icon-man' }, { name: 'el-icon-woman' }, { name: 'el-icon-man-woman' }, { name: 'el-icon-yin-yang' }, { name: 'el-icon-cursor' }, { name: 'el-icon-cursor2' }, { name: 'el-icon-lasso2' }, { name: 'el-icon-select2' }, { name: 'el-icon-point-up' }, { name: 'el-icon-point-right' }, { name: 'el-icon-point-down' }, { name: 'el-icon-point-left' }, { name: 'el-icon-pointer' }, { name: 'el-icon-reminder' }, { name: 'el-icon-drag-left-right' }, { name: 'el-icon-drag-left' }, { name: 'el-icon-drag-right' }, { name: 'el-icon-touch' }, { name: 'el-icon-multitouch' }, { name: 'el-icon-touch-zoom' }, { name: 'el-icon-touch-pinch' }, { name: 'el-icon-hand' }, { name: 'el-icon-grab' }, { name: 'el-icon-stack-empty' }, { name: 'el-icon-stack-plus' }, { name: 'el-icon-stack-minus' }, { name: 'el-icon-stack-star' }, { name: 'el-icon-stack-picture' }, { name: 'el-icon-stack-down' }, { name: 'el-icon-stack-up' }, { name: 'el-icon-stack-cancel' }, { name: 'el-icon-stack-check' }, { name: 'el-icon-stack-text' }, { name: 'el-icon-stack4' }, { name: 'el-icon-stack-music' }, { name: 'el-icon-stack-play' }, { name: 'el-icon-move' }, { name: 'el-icon-dots' }, { name: 'el-icon-warning' }, { name: 'el-icon-warning22' }, { name: 'el-icon-notification2' }, { name: 'el-icon-question3' }, { name: 'el-icon-question4' }, { name: 'el-icon-plus3' }, { name: 'el-icon-minus3' }, { name: 'el-icon-plus-circle2' }, { name: 'el-icon-minus-circle2' }, { name: 'el-icon-cancel-circle2' }, { name: 'el-icon-blocked' }, { name: 'el-icon-cancel-square' }, { name: 'el-icon-cancel-square2' }, { name: 'el-icon-spam' }, { name: 'el-icon-cross2' }, { name: 'el-icon-cross3' }, { name: 'el-icon-checkmark' }, { name: 'el-icon-checkmark3' }, { name: 'el-icon-checkmark2' }, { name: 'el-icon-checkmark4' }, { name: 'el-icon-spell-check' }, { name: 'el-icon-spell-check2' }, { name: 'el-icon-enter' }, { name: 'el-icon-exit' }, { name: 'el-icon-enter2' }, { name: 'el-icon-exit2' }, { name: 'el-icon-enter3' }, { name: 'el-icon-exit3' }, { name: 'el-icon-wall' }, { name: 'el-icon-fence' }, { name: 'el-icon-play3' }, { name: 'el-icon-pause' }, { name: 'el-icon-stop' }, { name: 'el-icon-previous' }, { name: 'el-icon-next' }, { name: 'el-icon-backward' }, { name: 'el-icon-forward2' }, { name: 'el-icon-play4' }, { name: 'el-icon-pause2' }, { name: 'el-icon-stop2' }, { name: 'el-icon-backward2' }, { name: 'el-icon-forward3' }, { name: 'el-icon-first' }, { name: 'el-icon-last' }, { name: 'el-icon-previous2' }, { name: 'el-icon-next2' }, { name: 'el-icon-eject' }, { name: 'el-icon-volume-high' }, { name: 'el-icon-volume-medium' }, { name: 'el-icon-volume-low' }, { name: 'el-icon-volume-mute' }, { name: 'el-icon-speaker-left' }, { name: 'el-icon-speaker-right' }, { name: 'el-icon-volume-mute2' }, { name: 'el-icon-volume-increase' }, { name: 'el-icon-volume-decrease' }, { name: 'el-icon-volume-mute5' }, { name: 'el-icon-loop' }, { name: 'el-icon-loop3' }, { name: 'el-icon-infinite-square' }, { name: 'el-icon-infinite' }, { name: 'el-icon-loop4' }, { name: 'el-icon-shuffle' }, { name: 'el-icon-wave' }, { name: 'el-icon-wave2' }, { name: 'el-icon-split' }, { name: 'el-icon-merge' }, { name: 'el-icon-arrow-up5' }, { name: 'el-icon-arrow-right5' }, { name: 'el-icon-arrow-down5' }, { name: 'el-icon-arrow-left5' }, { name: 'el-icon-arrow-up-left2' }, { name: 'el-icon-arrow-up7' }, { name: 'el-icon-arrow-up-right2' }, { name: 'el-icon-arrow-right7' }, { name: 'el-icon-arrow-down-right2' }, { name: 'el-icon-arrow-down7' }, { name: 'el-icon-arrow-down-left2' }, { name: 'el-icon-arrow-left7' }, { name: 'el-icon-arrow-up-left3' }, { name: 'el-icon-arrow-up8' }, { name: 'el-icon-arrow-up-right3' }, { name: 'el-icon-arrow-right8' }, { name: 'el-icon-arrow-down-right3' }, { name: 'el-icon-arrow-down8' }, { name: 'el-icon-arrow-down-left3' }, { name: 'el-icon-arrow-left8' }, { name: 'el-icon-circle-up2' }, { name: 'el-icon-circle-right2' }, { name: 'el-icon-circle-down2' }, { name: 'el-icon-circle-left2' }, { name: 'el-icon-arrow-resize7' }, { name: 'el-icon-arrow-resize8' }, { name: 'el-icon-square-up-left' }, { name: 'el-icon-square-up' }, { name: 'el-icon-square-up-right' }, { name: 'el-icon-square-right' }, { name: 'el-icon-square-down-right' }, { name: 'el-icon-square-down' }, { name: 'el-icon-square-down-left' }, { name: 'el-icon-square-left' }, { name: 'el-icon-arrow-up15' }, { name: 'el-icon-arrow-right15' }, { name: 'el-icon-arrow-down15' }, { name: 'el-icon-arrow-left15' }, { name: 'el-icon-arrow-up16' }, { name: 'el-icon-arrow-right16' }, { name: 'el-icon-arrow-down16' }, { name: 'el-icon-arrow-left16' }, { name: 'el-icon-menu-open' }, { name: 'el-icon-menu-open2' }, { name: 'el-icon-menu-close' }, { name: 'el-icon-menu-close2' }, { name: 'el-icon-enter5' }, { name: 'el-icon-esc' }, { name: 'el-icon-enter6' }, { name: 'el-icon-backspace' }, { name: 'el-icon-backspace2' }, { name: 'el-icon-tab' }, { name: 'el-icon-transmission' }, { name: 'el-icon-sort' }, { name: 'el-icon-move-up2' }, { name: 'el-icon-move-down2' }, { name: 'el-icon-sort-alpha-asc' }, { name: 'el-icon-sort-alpha-desc' }, { name: 'el-icon-sort-numeric-asc' }, { name: 'el-icon-sort-numberic-desc' }, { name: 'el-icon-sort-amount-asc' }, { name: 'el-icon-sort-amount-desc' }, { name: 'el-icon-sort-time-asc' }, { name: 'el-icon-sort-time-desc' }, { name: 'el-icon-battery-6' }, { name: 'el-icon-battery-0' }, { name: 'el-icon-battery-charging' }, { name: 'el-icon-command' }, { name: 'el-icon-shift' }, { name: 'el-icon-ctrl' }, { name: 'el-icon-opt' }, { name: 'el-icon-checkbox-checked' }, { name: 'el-icon-checkbox-unchecked' }, { name: 'el-icon-checkbox-partial' }, { name: 'el-icon-square' }, { name: 'el-icon-triangle' }, { name: 'el-icon-triangle2' }, { name: 'el-icon-diamond3' }, { name: 'el-icon-diamond4' }, { name: 'el-icon-checkbox-checked2' }, { name: 'el-icon-checkbox-unchecked2' }, { name: 'el-icon-checkbox-partial2' }, { name: 'el-icon-radio-checked' }, { name: 'el-icon-radio-checked2' }, { name: 'el-icon-radio-unchecked' }, { name: 'el-icon-checkmark-circle' }, { name: 'el-icon-circle' }, { name: 'el-icon-circle2' }, { name: 'el-icon-circles' }, { name: 'el-icon-circles2' }, { name: 'el-icon-crop' }, { name: 'el-icon-crop2' }, { name: 'el-icon-make-group' }, { name: 'el-icon-ungroup' }, { name: 'el-icon-vector' }, { name: 'el-icon-vector2' }, { name: 'el-icon-rulers' }, { name: 'el-icon-pencil-ruler' }, { name: 'el-icon-scissors' }, { name: 'el-icon-filter3' }, { name: 'el-icon-filter4' }, { name: 'el-icon-font' }, { name: 'el-icon-ampersand2' }, { name: 'el-icon-ligature' }, { name: 'el-icon-font-size' }, { name: 'el-icon-typography' }, { name: 'el-icon-text-height' }, { name: 'el-icon-text-width' }, { name: 'el-icon-height2' }, { name: 'el-icon-width' }, { name: 'el-icon-strikethrough2' }, { name: 'el-icon-font-size2' }, { name: 'el-icon-bold2' }, { name: 'el-icon-underline2' }, { name: 'el-icon-italic2' }, { name: 'el-icon-strikethrough3' }, { name: 'el-icon-omega' }, { name: 'el-icon-sigma' }, { name: 'el-icon-nbsp' }, { name: 'el-icon-page-break' }, { name: 'el-icon-page-break2' }, { name: 'el-icon-superscript' }, { name: 'el-icon-subscript' }, { name: 'el-icon-superscript2' }, { name: 'el-icon-subscript2' }, { name: 'el-icon-text-color' }, { name: 'el-icon-highlight' }, { name: 'el-icon-pagebreak' }, { name: 'el-icon-clear-formatting' }, { name: 'el-icon-table' }, { name: 'el-icon-table2' }, { name: 'el-icon-insert-template' }, { name: 'el-icon-pilcrow' }, { name: 'el-icon-ltr' }, { name: 'el-icon-rtl' }, { name: 'el-icon-ltr2' }, { name: 'el-icon-rtl2' }, { name: 'el-icon-section' }, { name: 'el-icon-paragraph-left2' }, { name: 'el-icon-paragraph-center2' }, { name: 'el-icon-paragraph-right2' }, { name: 'el-icon-paragraph-justify2' }, { name: 'el-icon-indent-increase' }, { name: 'el-icon-indent-decrease' }, { name: 'el-icon-paragraph-left3' }, { name: 'el-icon-paragraph-center3' }, { name: 'el-icon-paragraph-right3' }, { name: 'el-icon-paragraph-justify3' }, { name: 'el-icon-indent-increase2' }, { name: 'el-icon-indent-decrease2' }, { name: 'el-icon-share' }, { name: 'el-icon-share2' }, { name: 'el-icon-new-tab' }, { name: 'el-icon-new-tab2' }, { name: 'el-icon-popout' }, { name: 'el-icon-embed' }, { name: 'el-icon-embed2' }, { name: 'el-icon-markup' }, { name: 'el-icon-regexp' }, { name: 'el-icon-regexp2' }, { name: 'el-icon-code' }, { name: 'el-icon-circle-css' }, { name: 'el-icon-circle-code' }, { name: 'el-icon-terminal' }, { name: 'el-icon-unicode' }, { name: 'el-icon-seven-segment-0' }, { name: 'el-icon-seven-segment-1' }, { name: 'el-icon-seven-segment-2' }, { name: 'el-icon-seven-segment-3' }, { name: 'el-icon-seven-segment-4' }, { name: 'el-icon-seven-segment-5' }, { name: 'el-icon-seven-segment-6' }, { name: 'el-icon-seven-segment-7' }, { name: 'el-icon-seven-segment-8' }, { name: 'el-icon-seven-segment-9' }, { name: 'el-icon-share3' }, { name: 'el-icon-share4' }, { name: 'el-icon-google' }, { name: 'el-icon-google-plus' }, { name: 'el-icon-google-plus2' }, { name: 'el-icon-google-drive' }, { name: 'el-icon-facebook' }, { name: 'el-icon-facebook2' }, { name: 'el-icon-instagram' }, { name: 'el-icon-twitter' }, { name: 'el-icon-twitter2' }, { name: 'el-icon-feed2' }, { name: 'el-icon-feed3' }, { name: 'el-icon-youtube' }, { name: 'el-icon-youtube2' }, { name: 'el-icon-youtube3' }, { name: 'el-icon-vimeo' }, { name: 'el-icon-vimeo2' }, { name: 'el-icon-lanyrd' }, { name: 'el-icon-flickr' }, { name: 'el-icon-flickr2' }, { name: 'el-icon-flickr3' }, { name: 'el-icon-picassa' }, { name: 'el-icon-picassa2' }, { name: 'el-icon-dribbble' }, { name: 'el-icon-dribbble2' }, { name: 'el-icon-dribbble3' }, { name: 'el-icon-forrst' }, { name: 'el-icon-forrst2' }, { name: 'el-icon-deviantart' }, { name: 'el-icon-deviantart2' }, { name: 'el-icon-steam' }, { name: 'el-icon-steam2' }, { name: 'el-icon-dropbox' }, { name: 'el-icon-onedrive' }, { name: 'el-icon-github' }, { name: 'el-icon-github4' }, { name: 'el-icon-github5' }, { name: 'el-icon-wordpress' }, { name: 'el-icon-wordpress2' }, { name: 'el-icon-joomla' }, { name: 'el-icon-blogger' }, { name: 'el-icon-blogger2' }, { name: 'el-icon-tumblr' }, { name: 'el-icon-tumblr2' }, { name: 'el-icon-yahoo' }, { name: 'el-icon-tux' }, { name: 'el-icon-apple2' }, { name: 'el-icon-finder' }, { name: 'el-icon-android' }, { name: 'el-icon-windows' }, { name: 'el-icon-windows8' }, { name: 'el-icon-soundcloud' }, { name: 'el-icon-soundcloud2' }, { name: 'el-icon-skype' }, { name: 'el-icon-reddit' }, { name: 'el-icon-linkedin' }, { name: 'el-icon-linkedin2' }, { name: 'el-icon-lastfm' }, { name: 'el-icon-lastfm2' }, { name: 'el-icon-delicious' }, { name: 'el-icon-stumbleupon' }, { name: 'el-icon-stumbleupon2' }, { name: 'el-icon-stackoverflow' }, { name: 'el-icon-pinterest2' }, { name: 'el-icon-xing' }, { name: 'el-icon-flattr' }, { name: 'el-icon-foursquare' }, { name: 'el-icon-paypal' }, { name: 'el-icon-paypal2' }, { name: 'el-icon-yelp' }, { name: 'el-icon-file-pdf' }, { name: 'el-icon-file-openoffice' }, { name: 'el-icon-file-word' }, { name: 'el-icon-file-excel' }, { name: 'el-icon-libreoffice' }, { name: 'el-icon-html5' }, { name: 'el-icon-html52' }, { name: 'el-icon-css3' }, { name: 'el-icon-git' }, { name: 'el-icon-svg' }, { name: 'el-icon-codepen' }, { name: 'el-icon-chrome' }, { name: 'el-icon-firefox' }, { name: 'el-icon-IE' }, { name: 'el-icon-opera' }, { name: 'el-icon-safari' }, { name: 'el-icon-check2' }, { name: 'el-icon-home4' }, { name: 'el-icon-people' }, { name: 'el-icon-checkmark-circle2' }, { name: 'el-icon-arrow-up-left32' }, { name: 'el-icon-arrow-up52' }, { name: 'el-icon-arrow-up-right32' }, { name: 'el-icon-arrow-right6' }, { name: 'el-icon-arrow-down-right32' }, { name: 'el-icon-arrow-down52' }, { name: 'el-icon-arrow-down-left32' }, { name: 'el-icon-arrow-left52' }, { name: 'el-icon-calendar5' }, { name: 'el-icon-move-alt1' }, { name: 'el-icon-reload-alt' }, { name: 'el-icon-move-vertical' }, { name: 'el-icon-move-horizontal' }, { name: 'el-icon-hash' }, { name: 'el-icon-bars-alt' }, { name: 'el-icon-eye8' }, { name: 'el-icon-search4' }, { name: 'el-icon-zoomin3' }, { name: 'el-icon-zoomout3' }, { name: 'el-icon-add' }, { name: 'el-icon-subtract' }, { name: 'el-icon-exclamation' }, { name: 'el-icon-question6' }, { name: 'el-icon-close2' }, { name: 'el-icon-task' }, { name: 'el-icon-inbox' }, { name: 'el-icon-inbox-alt' }, { name: 'el-icon-envelope' }, { name: 'el-icon-compose' }, { name: 'el-icon-newspaper2' }, { name: 'el-icon-calendar22' }, { name: 'el-icon-hyperlink' }, { name: 'el-icon-trash' }, { name: 'el-icon-trash-alt' }, { name: 'el-icon-grid5' }, { name: 'el-icon-grid-alt' }, { name: 'el-icon-menu6' }, { name: 'el-icon-list3' }, { name: 'el-icon-gallery' }, { name: 'el-icon-calculator' }, { name: 'el-icon-windows2' }, { name: 'el-icon-browser' }, { name: 'el-icon-portfolio' }, { name: 'el-icon-comments' }, { name: 'el-icon-screen3' }, { name: 'el-icon-iphone' }, { name: 'el-icon-ipad' }, { name: 'el-icon-googleplus5' }, { name: 'el-icon-pin' }, { name: 'el-icon-pin-alt' }, { name: 'el-icon-cog5' }, { name: 'el-icon-graduation' }, { name: 'el-icon-air' }, { name: 'el-icon-droplets' }, { name: 'el-icon-statistics' }, { name: 'el-icon-pie5' }, { name: 'el-icon-cross' }, { name: 'el-icon-minus2' }, { name: 'el-icon-plus2' }, { name: 'el-icon-info3' }, { name: 'el-icon-info22' }, { name: 'el-icon-question7' }, { name: 'el-icon-help' }, { name: 'el-icon-warning2' }, { name: 'el-icon-add-to-list' }, { name: 'el-icon-arrow-left12' }, { name: 'el-icon-arrow-down12' }, { name: 'el-icon-arrow-up12' }, { name: 'el-icon-arrow-right13' }, { name: 'el-icon-arrow-left22' }, { name: 'el-icon-arrow-down22' }, { name: 'el-icon-arrow-up22' }, { name: 'el-icon-arrow-right22' }, { name: 'el-icon-arrow-left32' }, { name: 'el-icon-arrow-down32' }, { name: 'el-icon-arrow-up32' }, { name: 'el-icon-arrow-right32' }, { name: 'el-icon-switch2' }, { name: 'el-icon-checkmark5' }, { name: 'el-icon-ampersand' }, { name: 'el-icon-alert' }, { name: 'el-icon-alignment-align' }, { name: 'el-icon-alignment-aligned-to' }, { name: 'el-icon-alignment-unalign' }, { name: 'el-icon-arrow-down132' }, { name: 'el-icon-arrow-up13' }, { name: 'el-icon-arrow-left13' }, { name: 'el-icon-arrow-right14' }, { name: 'el-icon-arrow-small-down' }, { name: 'el-icon-arrow-small-left' }, { name: 'el-icon-arrow-small-right' }, { name: 'el-icon-arrow-small-up' }, { name: 'el-icon-check' }, { name: 'el-icon-chevron-down' }, { name: 'el-icon-chevron-left' }, { name: 'el-icon-chevron-right' }, { name: 'el-icon-chevron-up' }, { name: 'el-icon-clippy' }, { name: 'el-icon-comment' }, { name: 'el-icon-comment-discussion' }, { name: 'el-icon-dash' }, { name: 'el-icon-diff' }, { name: 'el-icon-diff-added' }, { name: 'el-icon-diff-ignored' }, { name: 'el-icon-diff-modified' }, { name: 'el-icon-diff-removed' }, { name: 'el-icon-diff-renamed' }, { name: 'el-icon-file-media' }, { name: 'el-icon-fold' }, { name: 'el-icon-gear' }, { name: 'el-icon-git-branch' }, { name: 'el-icon-git-commit' }, { name: 'el-icon-git-compare' }, { name: 'el-icon-git-merge' }, { name: 'el-icon-git-pull-request' }, { name: 'el-icon-graph' }, { name: 'el-icon-law' }, { name: 'el-icon-list-ordered' }, { name: 'el-icon-list-unordered' }, { name: 'el-icon-mail5' }, { name: 'el-icon-mail-read' }, { name: 'el-icon-mention' }, { name: 'el-icon-mirror' }, { name: 'el-icon-move-down' }, { name: 'el-icon-move-left' }, { name: 'el-icon-move-right' }, { name: 'el-icon-move-up' }, { name: 'el-icon-person' }, { name: 'el-icon-plus22' }, { name: 'el-icon-primitive-dot' }, { name: 'el-icon-primitive-square' }, { name: 'el-icon-repo-forked' }, { name: 'el-icon-screen-full' }, { name: 'el-icon-screen-normal' }, { name: 'el-icon-sync' }, { name: 'el-icon-three-bars' }, { name: 'el-icon-unfold' }, { name: 'el-icon-versions' }, { name: 'el-icon-x' }];
      }
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function handler(value) {
        this.currentValue = value;
        this.$emit('input', value);
      }
    }
  },

  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    handleInput: function handleInput(value) {
      this.searchQuery = value;
      this.currentValue = value;
      this.$emit('input', value);
    },
    handleSelect: function handleSelect(value) {
      this.currentValue = value.name;
      this.$emit('input', value.name);
      this.$emit('select', value.name);
    },

    querySearch: function querySearch(value, callback) {
      var results = this.filteredCollection;
      callback(results);
    }
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputIconpickerSize: function inputIconpickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputIconpickerDisabled: function inputIconpickerDisabled() {
      return this.disabled || !!(this.elForm || {}).disabled;
    },
    filteredCollection: function filteredCollection() {
      var _this = this;

      if (!this.searchQuery) {
        return this.icons;
      }
      return this.icons.filter(function (row, index) {
        return row.name.includes(_this.searchQuery);
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/icon-picker/src/icon-picker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_icon_pickervue_type_script_lang_js_ = (icon_pickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/icon-picker/src/icon-picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_icon_pickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/icon-picker/src/icon-picker.vue"
/* harmony default export */ var icon_picker = (component.exports);
// CONCATENATED MODULE: ./packages/icon-picker/index.js


icon_picker.install = function (Vue) {
  Vue.component(icon_picker.name, icon_picker);
};

/* harmony default export */ var packages_icon_picker = __webpack_exports__["default"] = (icon_picker);

/***/ })

/******/ });