webpackJsonp([1, 4], {
function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = i(n(333)),
        a = i(n(106)),
        o = i(n(334));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var l = function(e) {
        var t = e.onArrowClick,
            n = e.currentSlide,
            r = e.direction,
            i = e.hideOnFirst,
            l = e.hideOnLast,
            s = e.navClass,
            c = e.onClick,
            u = e.positionClass,
            d = e.slideCount,
            f = e.slidesToScroll,
            p = e.text,
            m = (0, o.default)("slider__arrow", u || ""),
            h = (0, o.default)({
                "slider__arrow--nav": !0,
                "slider__arrow--right icon-angle-bracket-right": "next" === r,
                "slider__arrow--left icon-angle-bracket-left": "prev" === r
            }, s || "");
        return i && 0 === n ? null : l && d - n === f ? null : a.default.createElement("button", {
            onClick: function() {
                "function" == typeof c && c(), t()
            },
            className: m
        }, a.default.createElement("div", {
            className: h,
            title: p,
            "aria-label": p
        }))
    };
    l.defaultProps = {
        onArrowClick: function() {}
    }, l.propTypes = {
        currentSlide: r.default.number,
        direction: r.default.string,
        hideOnFirst: r.default.bool,
        hideOnLast: r.default.bool,
        navClass: r.default.string,
        onClick: r.default.func,
        onArrowClick: r.default.func,
        positionClass: r.default.string,
        slideCount: r.default.number,
        slidesToScroll: r.default.number,
        text: r.default.string
    }, t.default = l
}
});