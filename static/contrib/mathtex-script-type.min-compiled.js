import _Object$defineProperty from "babel-runtime/core-js/object/define-property";
import _typeof from "babel-runtime/helpers/typeof";
!function (e, t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = t(require("katex"));else if ("function" == typeof define && define.amd) define(["katex"], t);else {
    var r = "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? t(require("katex")) : t(e.katex);for (var n in r) {
      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[n] = r[n];
    }
  }
}(this, function (e) {
  return function (e) {
    var t = {};function r(n) {
      if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || _Object$defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 0);
  }([function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(1),
        o = r.n(n),
        i = document.body.getElementsByTagName("script");(i = Array.prototype.slice.call(i)).forEach(function (e) {
      if (!e.type || !e.type.match(/math\/tex/i)) return -1;var t = null != e.type.match(/mode\s*=\s*display(;|\s|\n|$)/),
          r = document.createElement(t ? "div" : "span");r.setAttribute("class", t ? "equation" : "inline-equation");try {
        o.a.render(e.text, r, { displayMode: t });
      } catch (t) {
        r.textContent = e.text;
      }e.parentNode.replaceChild(r, e);
    });
  }, function (t, r) {
    t.exports = e;
  }]).default;
});

//# sourceMappingURL=mathtex-script-type.min-compiled.js.map