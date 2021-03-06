import _Object$getOwnPropertySymbols from "babel-runtime/core-js/object/get-own-property-symbols";
import _Object$keys from "babel-runtime/core-js/object/keys";
import _Symbol from "babel-runtime/core-js/symbol";
import _Object$assign from "babel-runtime/core-js/object/assign";
import _Object$defineProperty from "babel-runtime/core-js/object/define-property";
import _typeof from "babel-runtime/helpers/typeof";
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e(require("katex")) : "function" == typeof define && define.amd ? define(["katex"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.renderMathInElement = e(require("katex")) : t.renderMathInElement = e(t.katex);
}(this, function (t) {
  return function (t) {
    var e = {};function n(r) {
      if (e[r]) return e[r].exports;var o = e[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || _Object$defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 9);
  }([function (t, e) {
    var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);
  }, function (t, e) {
    t.exports = function (t) {
      return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
    };
  }, function (t, e, n) {
    t.exports = !n(3)(function () {
      return 7 != Object.defineProperty({}, "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, e) {
    var n = t.exports = { version: "2.4.0" };"number" == typeof __e && (__e = n);
  }, function (t, e, n) {
    var r = n(6),
        o = n(7);t.exports = function (t) {
      return r(o(t));
    };
  }, function (t, e, n) {
    var r = n(27);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
      return "String" == r(t) ? t.split("") : Object(t);
    };
  }, function (t, e) {
    t.exports = function (t) {
      if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
    };
  }, function (t, e) {
    var n = Math.ceil,
        r = Math.floor;t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var r = n(10),
        o = n.n(r),
        i = n(38),
        u = n.n(i),
        c = n(39),
        a = function a(t, e) {
      for (var n = function (t, e) {
        for (var n = [{ type: "text", data: t }], r = 0; r < e.length; r++) {
          var o = e[r];n = Object(c.a)(n, o.left, o.right, o.display || !1);
        }return n;
      }(t, e.delimiters), r = document.createDocumentFragment(), o = 0; o < n.length; o++) {
        if ("text" === n[o].type) r.appendChild(document.createTextNode(n[o].data));else {
          var i = document.createElement("span"),
              a = n[o].data;e.displayMode = n[o].display;try {
            u.a.render(a, i, e);
          } catch (t) {
            if (!(t instanceof u.a.ParseError)) throw t;e.errorCallback("KaTeX auto-render: Failed to parse `" + n[o].data + "` with ", t), r.appendChild(document.createTextNode(n[o].rawData));continue;
          }r.appendChild(i);
        }
      }return r;
    },
        f = { delimiters: [{ left: "$$", right: "$$", display: !0 }, { left: "\\[", right: "\\]", display: !0 }, { left: "\\(", right: "\\)", display: !1 }], ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"], errorCallback: function errorCallback(t, e) {
        console.error(t, e);
      } };e.default = function (t, e) {
      if (!t) throw new Error("No element provided to render");!function t(e, n) {
        for (var r = 0; r < e.childNodes.length; r++) {
          var o = e.childNodes[r];if (3 === o.nodeType) {
            var i = a(o.textContent, n);r += i.childNodes.length - 1, e.replaceChild(i, o);
          } else 1 === o.nodeType && -1 === n.ignoredTags.indexOf(o.nodeName.toLowerCase()) && t(o, n);
        }
      }(t, o()({}, f, e));
    };
  }, function (t, e, n) {
    t.exports = { default: n(11), __esModule: !0 };
  }, function (t, e, n) {
    n(12), t.exports = n(4).Object.assign;
  }, function (t, e, n) {
    var r = n(13);r(r.S + r.F, "Object", { assign: n(23) });
  }, function (t, e, n) {
    var r = n(0),
        o = n(4),
        i = n(14),
        u = n(16),
        c = "prototype",
        a = function a(t, e, n) {
      var f,
          s,
          l,
          p = t & a.F,
          d = t & a.G,
          h = t & a.S,
          v = t & a.P,
          y = t & a.B,
          x = t & a.W,
          g = d ? o : o[e] || (o[e] = {}),
          b = g[c],
          m = d ? r : h ? r[e] : (r[e] || {})[c];d && (n = e);for (f in n) {
        (s = !p && m && void 0 !== m[f]) && f in g || (l = s ? m[f] : n[f], g[f] = d && "function" != typeof m[f] ? n[f] : y && s ? i(l, r) : x && m[f] == l ? function (t) {
          var e = function e(_e, n, r) {
            if (this instanceof t) {
              switch (arguments.length) {case 0:
                  return new t();case 1:
                  return new t(_e);case 2:
                  return new t(_e, n);}return new t(_e, n, r);
            }return t.apply(this, arguments);
          };return e[c] = t[c], e;
        }(l) : v && "function" == typeof l ? i(Function.call, l) : l, v && ((g.virtual || (g.virtual = {}))[f] = l, t & a.R && b && !b[f] && u(b, f, l)));
      }
    };a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a;
  }, function (t, e, n) {
    var r = n(15);t.exports = function (t, e, n) {
      if (r(t), void 0 === e) return t;switch (n) {case 1:
          return function (n) {
            return t.call(e, n);
          };case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };case 3:
          return function (n, r, o) {
            return t.call(e, n, r, o);
          };}return function () {
        return t.apply(e, arguments);
      };
    };
  }, function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
    };
  }, function (t, e, n) {
    var r = n(17),
        o = n(22);t.exports = n(2) ? function (t, e, n) {
      return r.f(t, e, o(1, n));
    } : function (t, e, n) {
      return t[e] = n, t;
    };
  }, function (t, e, n) {
    var r = n(18),
        o = n(19),
        i = n(21),
        u = _Object$defineProperty;e.f = n(2) ? _Object$defineProperty : function (t, e, n) {
      if (r(t), e = i(e, !0), r(n), o) try {
        return u(t, e, n);
      } catch (t) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
    };
  }, function (t, e, n) {
    var r = n(1);t.exports = function (t) {
      if (!r(t)) throw TypeError(t + " is not an object!");return t;
    };
  }, function (t, e, n) {
    t.exports = !n(2) && !n(3)(function () {
      return 7 != Object.defineProperty(n(20)("div"), "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e, n) {
    var r = n(1),
        o = n(0).document,
        i = r(o) && r(o.createElement);t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  }, function (t, e, n) {
    var r = n(1);t.exports = function (t, e) {
      if (!r(t)) return t;var n, o;if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(24),
        o = n(35),
        i = n(36),
        u = n(37),
        c = n(6),
        a = _Object$assign;t.exports = !a || n(3)(function () {
      var t = {},
          e = {},
          n = _Symbol(),
          r = "abcdefghijklmnopqrst";return t[n] = 7, r.split("").forEach(function (t) {
        e[t] = t;
      }), 7 != a({}, t)[n] || _Object$keys(a({}, e)).join("") != r;
    }) ? function (t, e) {
      for (var n = u(t), a = arguments.length, f = 1, s = o.f, l = i.f; a > f;) {
        for (var p, d = c(arguments[f++]), h = s ? r(d).concat(s(d)) : r(d), v = h.length, y = 0; v > y;) {
          l.call(d, p = h[y++]) && (n[p] = d[p]);
        }
      }return n;
    } : a;
  }, function (t, e, n) {
    var r = n(25),
        o = n(34);t.exports = _Object$keys || function (t) {
      return r(t, o);
    };
  }, function (t, e, n) {
    var r = n(26),
        o = n(5),
        i = n(28)(!1),
        u = n(31)("IE_PROTO");t.exports = function (t, e) {
      var n,
          c = o(t),
          a = 0,
          f = [];for (n in c) {
        n != u && r(c, n) && f.push(n);
      }for (; e.length > a;) {
        r(c, n = e[a++]) && (~i(f, n) || f.push(n));
      }return f;
    };
  }, function (t, e) {
    var n = {}.hasOwnProperty;t.exports = function (t, e) {
      return n.call(t, e);
    };
  }, function (t, e) {
    var n = {}.toString;t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  }, function (t, e, n) {
    var r = n(5),
        o = n(29),
        i = n(30);t.exports = function (t) {
      return function (e, n, u) {
        var c,
            a = r(e),
            f = o(a.length),
            s = i(u, f);if (t && n != n) {
          for (; f > s;) {
            if ((c = a[s++]) != c) return !0;
          }
        } else for (; f > s; s++) {
          if ((t || s in a) && a[s] === n) return t || s || 0;
        }return !t && -1;
      };
    };
  }, function (t, e, n) {
    var r = n(8),
        o = Math.min;t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  }, function (t, e, n) {
    var r = n(8),
        o = Math.max,
        i = Math.min;t.exports = function (t, e) {
      return (t = r(t)) < 0 ? o(t + e, 0) : i(t, e);
    };
  }, function (t, e, n) {
    var r = n(32)("keys"),
        o = n(33);t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  }, function (t, e, n) {
    var r = n(0),
        o = "__core-js_shared__",
        i = r[o] || (r[o] = {});t.exports = function (t) {
      return i[t] || (i[t] = {});
    };
  }, function (t, e) {
    var n = 0,
        r = Math.random();t.exports = function (t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36));
    };
  }, function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (t, e) {
    e.f = _Object$getOwnPropertySymbols;
  }, function (t, e) {
    e.f = {}.propertyIsEnumerable;
  }, function (t, e, n) {
    var r = n(7);t.exports = function (t) {
      return Object(r(t));
    };
  }, function (e, n) {
    e.exports = t;
  }, function (t, e, n) {
    "use strict";
    var r = function r(t, e, n) {
      for (var r = n, o = 0, i = t.length; r < e.length;) {
        var u = e[r];if (o <= 0 && e.slice(r, r + i) === t) return r;"\\" === u ? r++ : "{" === u ? o++ : "}" === u && o--, r++;
      }return -1;
    };e.a = function (t, e, n, o) {
      for (var i = [], u = 0; u < t.length; u++) {
        if ("text" === t[u].type) {
          var c = t[u].data,
              a = !0,
              f = 0,
              s = void 0;for (-1 !== (s = c.indexOf(e)) && (f = s, i.push({ type: "text", data: c.slice(0, f) }), a = !1);;) {
            if (a) {
              if (-1 === (s = c.indexOf(e, f))) break;i.push({ type: "text", data: c.slice(f, s) }), f = s;
            } else {
              if (-1 === (s = r(n, c, f + e.length))) break;i.push({ type: "math", data: c.slice(f + e.length, s), rawData: c.slice(f, s + n.length), display: o }), f = s + n.length;
            }a = !a;
          }i.push({ type: "text", data: c.slice(f) });
        } else i.push(t[u]);
      }return i;
    };
  }]).default;
});

//# sourceMappingURL=auto-render.min-compiled.js.map