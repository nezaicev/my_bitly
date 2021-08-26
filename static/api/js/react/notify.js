/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/react-notify-toast@0.5.1/bin/notify.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
Object.defineProperty(exports, "__esModule", {value: !0}), exports.default = exports.notify = void 0;
var _react = _interopRequireDefault(require("react")), _reactDom = _interopRequireDefault(require("react-dom")),
    _Toast = _interopRequireDefault(require("./components/Toast")),
    _Container = _interopRequireDefault(require("./components/Container")), _defaults = require("./defaults");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {default: e}
}

function renderToast(e, t, o, u) {
    var r = document.getElementById(_defaults.defaults.wrapperId);
    _reactDom.default.render(_react.default.createElement(_Toast.default, {text: e, timeout: o, type: t, color: u}), r)
}

function hide() {
    var e = document.getElementById(_defaults.defaults.wrapperId);
    _reactDom.default.unmountComponentAtNode(e)
}

function show(e, t, o, u) {
    if (!document.getElementById(_defaults.defaults.wrapperId).hasChildNodes()) {
        var r = o || _defaults.defaults.timeout;
        return renderToast(e, t, r, u), -1 === r ? !1 : (setTimeout(function () {
            hide()
        }, r + _defaults.defaults.animationDuration), !0)
    }
    return !1
}

function createShowQueue() {
    var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 500,
        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
    return this.msgs = [], this.isNotifying = !1, this.currentRecallDelay = t, this.showNotify = function () {
        if (0 !== e.msgs.length) {
            e.isNotifying = !0;
            var u = e.msgs.pop();
            show(u.text, u.type, u.timeout, u.color) ? (e.currentRecallDelay = t, u.timeout > 0 && setTimeout(function () {
                return e.showNotify()
            }, u.timeout + _defaults.defaults.animationDuration)) : (e.msgs.unshift(u), setTimeout(function () {
                return e.showNotify()
            }, e.currentRecallDelay), e.currentRecallDelay += o)
        } else e.isNotifying = !1
    }, function (t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _defaults.defaults.timeout,
            r = arguments.length > 3 ? arguments[3] : void 0;
        e.msgs.push({text: t, type: o, timeout: u, color: r}), e.isNotifying || e.showNotify()
    }
}

var notify = {show: show, hide: hide, createShowQueue: createShowQueue};
exports.notify = notify;
var _default = _Container.default;
exports.default = _default;
//# sourceMappingURL=/sm/626387fb0eb8926ae6c8201009b8568859be9777c1f797cfb0986ed685e39df2.map

