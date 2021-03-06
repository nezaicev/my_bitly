!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.UniversalCookie = t()
}(this, function () {
    "use strict";

    function e(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }

    function t(e, t) {
        return e(t = {exports: {}}, t.exports), t.exports
    }

    var o = function (e, t) {
        if ("string" != typeof e) throw new TypeError("argument str must be a string");
        for (var o = {}, r = t || {}, n = e.split(l), i = r.decode || p, s = 0; s < n.length; s++) {
            var a = n[s], u = a.indexOf("=");
            if (!(u < 0)) {
                var c = a.substr(0, u).trim(), f = a.substr(++u, a.length).trim();
                '"' == f[0] && (f = f.slice(1, -1)), null == o[c] && (o[c] = d(f, i))
            }
        }
        return o
    }, r = function (e, t, o) {
        var r = o || {}, n = r.encode || c;
        if ("function" != typeof n) throw new TypeError("option encode is invalid");
        if (!f.test(e)) throw new TypeError("argument name is invalid");
        var i = n(t);
        if (i && !f.test(i)) throw new TypeError("argument val is invalid");
        var s = e + "=" + i;
        if (null != r.maxAge) {
            var a = r.maxAge - 0;
            if (isNaN(a)) throw new Error("maxAge should be a Number");
            s += "; Max-Age=" + Math.floor(a)
        }
        if (r.domain) {
            if (!f.test(r.domain)) throw new TypeError("option domain is invalid");
            s += "; Domain=" + r.domain
        }
        if (r.path) {
            if (!f.test(r.path)) throw new TypeError("option path is invalid");
            s += "; Path=" + r.path
        }
        if (r.expires) {
            if ("function" != typeof r.expires.toUTCString) throw new TypeError("option expires is invalid");
            s += "; Expires=" + r.expires.toUTCString()
        }
        r.httpOnly && (s += "; HttpOnly");
        r.secure && (s += "; Secure");
        if (r.sameSite) {
            var u = "string" == typeof r.sameSite ? r.sameSite.toLowerCase() : r.sameSite;
            switch (u) {
                case!0:
                    s += "; SameSite=Strict";
                    break;
                case"lax":
                    s += "; SameSite=Lax";
                    break;
                case"strict":
                    s += "; SameSite=Strict";
                    break;
                default:
                    throw new TypeError("option sameSite is invalid")
            }
        }
        return s
    }, p = decodeURIComponent, c = encodeURIComponent, l = /; */, f = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

    function d(t, e) {
        try {
            return e(t)
        } catch (e) {
            return t
        }
    }

    var s = {parse: o, serialize: r}, a = t(function (e, t) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.hasDocumentCookie = function () {
            return "object" === ("undefined" == typeof document ? "undefined" : r(document)) && "string" == typeof document.cookie
        }, t.cleanCookies = function () {
            document.cookie.split(";").forEach(function (e) {
                document.cookie = e.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (new Date).toUTCString() + ";path=/")
            })
        }, t.parseCookies = function (e) {
            return "string" == typeof e ? o.parse(e) : "object" === r(e) && null !== e ? e : {}
        }, t.isParsingCookie = n, t.readCookie = function (e, t) {
            void 0 === t && (t = {});
            var o = function (e) {
                if (e && "j" === e[0] && ":" === e[1]) return e.substr(2);
                return e
            }(e);
            if (n(o, t.doNotParse)) try {
                return JSON.parse(o)
            } catch (e) {
            }
            return e
        };
        var o = function (e) {
            {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, o) : {};
                    r.get || r.set ? Object.defineProperty(t, o, r) : t[o] = e[o]
                }
                return t.default = e, t
            }
        }(s);

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function n(e, t) {
            return void 0 === t && (t = !e || "{" !== e[0] && "[" !== e[0] && '"' !== e[0]), !t
        }
    });
    e(a);
    a.hasDocumentCookie, a.cleanCookies, a.parseCookies, a.isParsingCookie, a.readCookie;
    var u = Object.getOwnPropertySymbols, y = Object.prototype.hasOwnProperty,
        h = Object.prototype.propertyIsEnumerable;
    var m = function () {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, o = 0; o < 10; o++) t["_" + String.fromCharCode(o)] = o;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
                return t[e]
            }).join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                r[e] = e
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function (e, t) {
        for (var o, r, n = function (e) {
            if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }(e), i = 1; i < arguments.length; i++) {
            for (var s in o = Object(arguments[i])) y.call(o, s) && (n[s] = o[s]);
            if (u) {
                r = u(o);
                for (var a = 0; a < r.length; a++) h.call(o, r[a]) && (n[r[a]] = o[r[a]])
            }
        }
        return n
    }, n = t(function (e, t) {
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var n = function (e) {
            {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, o) : {};
                    r.get || r.set ? Object.defineProperty(t, o, r) : t[o] = e[o]
                }
                return t.default = e, t
            }
        }(s);

        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var o = function () {
            function e(e) {
                this.changeListeners = [], this.TESTING_ONETWO = 2, this.cookies = (0, a.parseCookies)(e), this.HAS_DOCUMENT_COOKIE = (0, a.hasDocumentCookie)()
            }

            return e.prototype._updateBrowserValues = function () {
                this.HAS_DOCUMENT_COOKIE && (this.cookies = n.parse(document.cookie))
            }, e.prototype._emitChange = function (e) {
                for (var t = 0; t < this.changeListeners.length; ++t) this.changeListeners[t](e)
            }, e.prototype.get = function (e, t) {
                return void 0 === t && (t = {}), this._updateBrowserValues(), (0, a.readCookie)(this.cookies[e], t)
            }, e.prototype.getAll = function (e) {
                void 0 === e && (e = {}), this._updateBrowserValues();
                var t = {};
                for (var o in this.cookies) t[o] = (0, a.readCookie)(this.cookies[o], e);
                return t
            }, e.prototype.set = function (e, t, o) {
                var r;
                "object" === i(t) && (t = JSON.stringify(t)), this.cookies = m({}, this.cookies, ((r = {})[e] = t, r)), this.HAS_DOCUMENT_COOKIE && (document.cookie = n.serialize(e, t, o)), this._emitChange({
                    name: e,
                    value: t,
                    options: o
                })
            }, e.prototype.remove = function (e, t) {
                var o = t = m({}, t, {expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0});
                this.cookies = m({}, this.cookies), delete this.cookies[e], this.HAS_DOCUMENT_COOKIE && (document.cookie = n.serialize(e, "", o)), this._emitChange({
                    name: e,
                    value: void 0,
                    options: t
                })
            }, e.prototype.addChangeListener = function (e) {
                this.changeListeners.push(e)
            }, e.prototype.removeChangeListener = function (e) {
                var t = this.changeListeners.indexOf(e);
                0 <= t && this.changeListeners.splice(t, 1)
            }, e
        }();
        t.default = o, e.exports = t.default
    });
    return e(n), e(t(function (e, t) {
        var o;
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = void 0;
        var r = ((o = n) && o.__esModule ? o : {default: o}).default;
        t.default = r, e.exports = t.default
    }))
});