import _Object$defineProperty from "babel-runtime/core-js/object/define-property";
import _typeof from "babel-runtime/helpers/typeof";
!function (e, t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var n = t();for (var r in n) {
      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[r] = n[r];
    }
  }
}(this, function () {
  return function (e) {
    var t = {};function n(r) {
      if (t[r]) return t[r].exports;var o = t[r] = { i: r, l: !1, exports: {} };return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || _Object$defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 0);
  }([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = n(1),
        o = (n.n(r), n(2));document.addEventListener("copy", function (e) {
      var t = window.getSelection();if (!t.isCollapsed) {
        var n = t.getRangeAt(0).cloneContents();if (n.querySelector(".katex-mathml")) {
          for (var r = [], i = 0; i < n.childNodes.length; i++) {
            r.push(n.childNodes[i].outerHTML);
          }e.clipboardData.setData("text/html", r.join("")), e.clipboardData.setData("text/plain", Object(o.a)(n).textContent), e.preventDefault();
        }
      }
    });
  }, function (e, t) {}, function (e, t, n) {
    "use strict";
    var r = { inline: ["$", "$"], display: ["$$", "$$"] };t.a = function (e) {
      for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r, n = e.querySelectorAll(".katex-mathml + .katex-html"), o = 0; o < n.length; o++) {
        var i = n[o];i.remove ? i.remove(null) : i.parentNode.removeChild(i);
      }for (var l = e.querySelectorAll(".katex-mathml"), a = 0; a < l.length; a++) {
        var u = l[a],
            c = u.querySelector("annotation");c && (u.replaceWith ? u.replaceWith(c) : u.parentNode.replaceChild(c, u), c.innerHTML = t.inline[0] + c.innerHTML + t.inline[1]);
      }for (var f = e.querySelectorAll(".katex-display annotation"), p = 0; p < f.length; p++) {
        var s = f[p];s.innerHTML = t.display[0] + s.innerHTML.substr(t.inline[0].length, s.innerHTML.length - t.inline[0].length - t.inline[1].length) + t.display[1];
      }return e;
    };
  }]).default;
});

//# sourceMappingURL=copy-tex.min-compiled.js.map