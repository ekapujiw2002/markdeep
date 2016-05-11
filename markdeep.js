/**
 See http://casual-effects.com/markdeep for @license and documentation.

 markdeep.min.js version 0.11
 Copyright 2015-2016, Morgan McGuire
 All rights reserved.
 (BSD 2-clause license)

 highlight.min.js 8.8.0 from https://highlightjs.org/
 Copyright 2006, Ivan Sagalaev
 All rights reserved.
 (BSD 3-clause license)
*/
! function() {
    "use strict";

    function e(e, t, r) {
        return "<" + e + (r ? " " + r : "") + ">" + t + "</" + e + ">"
    }

    function t(e) {
        return window.markdeepOptions && void 0 !== window.markdeepOptions[e] ? window.markdeepOptions[e] : void 0 !== T[e] ? T[e] : void 0
    }

    function r(e) {
        return (e + "").rp(/&/g, "&amp;").rp(/</g, "&lt;").rp(/>/g, "&gt;").rp(/"/g, "&quot;")
    }

    function n(e) {
        return e.rp(/&lt;/g, "<").rp(/&gt;/g, ">").rp(/&quot;/g, '"').rp(/&#39;/g, "'").rp(/&ndash;/g, "--").rp(/&mdash;/g, "---").rp(/&amp;/g, "&")
    }

    function i(e) {
        return e.rp(/<.*?>/g, "")
    }

    function a(e) {
        return encodeURI(e.rp(/\s/g, "").toLowerCase())
    }

    function s() {
        for (var t = "", r = 1; 6 >= r; ++r) {
            t += "h" + r + "::before {\ncontent:";
            for (var n = 1; r >= n; ++n) t += "counter(h" + n + ') "' + (r > n ? "." : " ") + '"';
            t += ";\ncounter-increment: h" + r + ";margin-right:10px}"
        }
        return e("style", t)
    }

    function o(e, t) {
        var r = e.innerHTML;
        return r = r.rp(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), r = r.rp(/<\/h?ttps?:.*>/gi, ""), r = r.rp(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.rp(/=""\s/g, "/");
            return '=""' === n.ss(n.length - 3) && (n = n.ss(0, n.length - 3)), n = n.rp(/"/g, ""), n + ">"
        }), r = r.rp(/<style class=["']fallback["']>.*?<\/style>/gim, ""), r = n(r)
    }

    function c(e) {
        function t() {
            l = e.indexOf("\n", a) + 1, d = d || /\S/.test(e.ss(a, a + s)), u = u || /\S/.test(e.ss(a + o + 1, l))
        }
        for (var r = {
                g: e,
                h: "",
                j: "",
                m: ""
            }, n = e.indexOf(E); n >= 0; n = e.indexOf(E, n + E.length)) {
            var i, a = L(0, e.lastIndexOf("\n", n)) + 1,
                s = n - a;
            for (i = n + E.length; e[i] === $; ++i);
            var o = i - a - 1,
                c = {
                    g: e.ss(0, a),
                    h: "",
                    j: "center",
                    m: e.ss(a, n).rp(/[ \t]*[ \t]$/, " ")
                },
                l = 0,
                d = !1,
                u = !1;
            t();
            for (var p = !0, h = i; p;) {
                if (a = l, t(), 0 === a) return r;
                if (d ? c.j = "floatright" : u && (c.j = "floatleft"), e[a + s] === $ && e[a + o] === $) {
                    for (var f = s; o > f && e[a + f] === $; ++f);
                    var g = a + s,
                        b = a + o;
                    if (c.m += e.ss(h, g).rp(/^[ \t]*[ \t]/, " ").rp(/[ \t][ \t]*$/, " "), f === o) return c.m += e.ss(a + o + 1), c;
                    c.h += e.ss(g + 1, b) + "\n", h = b + 1
                } else p = !1
            }
        }
        return r
    }

    function l(e, t, r, n) {
        var i = t.source,
            a = "[^ \\t\\n" + i + "]",
            s = "(" + i + ")(" + a + ".*?(\\n.+?)*?)" + i + "(?![A-Za-z0-9])";
        return e.rp(RegExp(s, "g"), "<" + r + (n ? " " + n : "") + ">$2</" + r + ">")
    }

    function d(t, r) {
        function n(e) {
            return e.trim().rp(/^\||\|$/g, "")
        }
        var i = /(?:\n\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?(?=\n))/.source,
            a = /\n\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?(?=\n)/.source,
            s = /\n[ \t]*\[[^\n\|]+\][ \t]*(?=\n)/.source,
            o = RegExp(i + a + i + "+(" + s + ")?", "g");
        return t = t.rp(o, function(t) {
            var i = t.split("\n"),
                a = "",
                s = "" === i[0] ? 1 : 0,
                o = i[i.length - 1].trim();
            o.length > 3 && "[" === o[0] && "]" === o[o.length - 1] ? (i.pop(), o = o.ss(1, o.length - 1)) : o = void 0;
            var c = [];
            n(i[s + 1]).rp(/:?-+:?/g, function(e) {
                var t = ":" === e[0],
                    n = ":" === e[e.length - 1];
                c.push(r(' style="text-align:' + (t && n ? "center" : n ? "right" : "left") + '"'))
            });
            for (var l = "th", d = s; i.length > d; ++d) {
                var u = n(i[d].trim());
                a += "<tr>";
                var p = 0;
                a += "<" + l + c[0] + ">" + u.rp(/\|/g, function() {
                    return ++p, "</" + l + "><" + l + c[p] + ">"
                }) + "</" + l + ">", a += "</tr>\n", d == s && (++d, l = "td")
            }
            return a = e("table", a, r('class="table"')), o && (a = "<div " + r('class="tablecaption"') + ">" + o + "</div>" + a), a
        })
    }

    function u(e, t) {
        for (var r = /^\s*\n/.source, n = /[:,]\s*\n/.source, i = RegExp("(" + n + "|" + r + ")" + /((?:[ \t]*(?:\d+\.|-|\+|\*)(?:[ \t]+.+\n\n?)+)+)/.source, "gm"), a = !0, s = {
                "+": t('class="plus"'),
                "-": t('class="minus"'),
                "*": t('class="asterisk"')
            }, o = t('class="number"'); a;) a = !1, e = e.rp(i, function(e, t, r) {
            var n = t,
                i = [],
                c = {
                    o: -1
                };
            for (r.split("\n").forEach(function(e) {
                    var t = e.rp(/^\s*/, ""),
                        r = e.length - t.length,
                        l = s[t[0]],
                        d = !!l;
                    l = l || o;
                    var u = /^\d+\.[ \t]/.test(t);
                    if (c)
                        if (u || d) {
                            if (r !== c.o)
                                if (-1 !== c.o && c.o > r)
                                    for (; c && c.o > r;) i.pop(), n += "</li></" + c.tag + ">", c = i[i.length - 1];
                                else c = {
                                    o: r,
                                    tag: u ? "ol" : "ul",
                                    p: e.ss(0, r)
                                }, i.push(c), n += "<" + c.tag + ">";
                            else -1 !== c.o && (n += "</li>");
                            c ? n += "\n" + c.p + "<li " + l + ">" + t.rp(/^(\d+\.|-|\+|\*) /, "") : (n += "\n" + e, a = !0)
                        } else n += "\n" + c.p + e;
                    else n += "\n" + e
                }), c = i.pop(); c; c = i.pop()) n += "</li></" + c.tag + ">\n";
            return n
        });
        return e
    }

    function p(t, r) {
        var n = /^(?:[^\|<>\s-\+\*\d].*[12]\d{3}(?!\d).*?|(?:[12]\d{3}(?!\.).*\d.*?)|(?:\d{1,3}(?!\.).*[12]\d{3}(?!\d).*?))/.source,
            i = "(" + n + "):" + /[ \t]+([^ \t\n].*)\n/.source,
            a = /(?:[ \t]*\n)?((?:[ \t]+.+\n(?:[ \t]*\n){0,3})*)/.source,
            s = i + a,
            o = RegExp(s, "gm"),
            c = r('valign="top"'),
            l = r('style="width:100px;padding-right:15px" rowspan="2"'),
            d = r('style="padding-bottom:25px"'),
            u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            p = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        try {
            var f = 0;
            t = t.rp(RegExp("(" + s + "){2,}", "gm"), function(t) {
                ++f;
                var n = [];
                t.rp(o, function(t, i, a, s) {
                    var o = "",
                        h = "",
                        g = "",
                        b = i.match(/([0123]?\d)\D+([01]?\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([12]\d{3})/i);
                    if (b) g = b[1], h = b[2], o = b[3];
                    else if (b = i.match(/([12]\d{3})\D+([01]?\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([0123]?\d)/i)) g = b[3], h = b[2], o = b[1];
                    else {
                        if (b = i.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([0123]?\d)\D+([12]\d{3})/i), !b) throw "Could not parse date";
                        g = b[2], h = b[1], o = b[3]
                    }
                    i = g + " " + h + " " + o;
                    var m = parseInt(h) - 1;
                    isNaN(m) && (m = p.indexOf(h.toLowerCase()));
                    var v = new Date(parseInt(o), m, parseInt(g));
                    return i = u[v.getDay()] + "<br/>" + i, n.push({
                        date: v,
                        title: a,
                        text: e("tr", e("td", "<a " + r('name="schedule' + f + "_" + v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate() + '"') + "></a>" + i, l) + e("td", e("b", a)), c) + e("tr", e("td", "\n\n" + s, d), c)
                    }), ""
                }), n.sort(function(e, t) {
                    return e.date.getTime() - t.date.getTime()
                });
                var i = 864e5,
                    a = (n[n.length - 1].date.getTime() - n[0].date.getTime()) / i,
                    s = new Date;
                s = new Date(s.getFullYear(), s.getMonth(), s.getDate());
                var g = "";
                if (a > 14 && 16 > a / n.length) {
                    var b = r('colspan="2" width="14%" style="padding-top:5px;text-align:center;font-style:italic"'),
                        m = r('width="1px" height="30px" style="text-align:right;border:1px solid #EEE;border-right:none;"'),
                        v = r('width="1px" height="30px" style="color:#BBB;text-align:right;"'),
                        y = r('width="14%" style="border:1px solid #EEE;border-left:none;"'),
                        x = n[0].date,
                        w = 0;
                    x = new Date(x.getFullYear(), x.getMonth(), 1);
                    for (var N = function(e, t) {
                            return Math.abs(e.getTime() - t.getTime()) < i / 2
                        }; x.getTime() < n[n.length - 1].date.getTime();) {
                        for (g += "<table " + r('class="calendar"') + ">\n" + e("tr", e("th", h[x.getMonth()] + " " + x.getFullYear(), r('colspan="14"'))) + "<tr>", u.forEach(function(t) {
                                g += e("td", t, b)
                            }), g += "</tr>"; 0 !== new Date(x.getTime() + 432e5).getDay();) x = new Date(x.getTime() - i);
                        if (1 !== x.getDate())
                            for (g += "<tr " + c + ">"; 1 !== x.getDate();) g += "<td " + v + ">" + x.getDate() + "</td><td>&nbsp;</td>", x = new Date(x.getTime() + i);
                        do {
                            0 === x.getDay() && (g += "<tr " + c + ">");
                            var k = n[w],
                                C = "";
                            N(x, s) && (C = r(' class="today"')), k && N(k.date, x) ? (g += e("td", e("b", x.getDate()), m + C) + e("td", e("a", k.title, r('href="#schedule' + f + "_" + x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate() + '"')), y + C), ++w) : g += "<td " + m + C + "></a>" + x.getDate() + "</td><td " + y + C + "> &nbsp; </td>", 6 === x.getDay() && (g += "</tr>"), x = new Date(x.getTime() + i)
                        } while (x.getDate() > 1);
                        if (0 !== x.getDay()) {
                            for (; 0 !== x.getDay();) g += "<td " + v + ">" + x.getDate() + "</td><td>&nbsp</td>", x = new Date(x.getTime() + i);
                            g += "</tr>"
                        }
                        g += "</table><br/>\n", x = new Date(x.getFullYear(), x.getMonth(), 1)
                    }
                }
                return t = "", n.forEach(function(e) {
                    t += e.text
                }), g + e("table", t, r('class="schedule"')) + "\n\n"
            })
        } catch (g) {}
        return t
    }

    function h(t) {
        var r = /^.+\n:(?=[ \t])/.source,
            n = "(s*\n|[: 	].+\n)+";
        return t = t.rp(RegExp("(" + r + n + ")+", "gm"), function(t) {
            var r = "";
            return t.split("\n").forEach(function(e, t) {
                0 === e.trim().length ? r += "\n" : /\s/.test(e[0]) || ":" === e[0] ? (":" === e[0] && (e = " " + e.ss(1)), r += e + "\n") : (t > 0 && (r += "</dd>"), r += "<dt>\n" + e + "\n</dt>\n<dd>\n\n")
            }), e("dl", r + "</dd>")
        })
    }

    function f(t, r) {
        var n = "",
            a = "",
            s = [0],
            o = 0,
            c = 0,
            l = {};
        t = t.rp(/<h([1-6])>(.*?)<\/h\1>/gi, function(t, d, u) {
            d = parseInt(d), u = u.trim();
            for (var p = o; d > p; ++p) s[p] = 0;
            s.splice(d, o - d), o = d, ++s[o - 1];
            var h = s.join("."),
                f = "toc" + h;
            return l[i(u).trim().toLowerCase()] = h, 3 >= d && (n += Array(d).join("&nbsp;&nbsp;") + '<a href="#' + f + '" class="level' + d + '">' + h + "&nbsp; " + u + "</a><br/>\n", 1 === d ? a += ' &middot; <a href="#' + f + '">' + u + "</a>" : ++c), e("a", "", r('name="' + f + '"')) + t
        }), a.length > 0 && (a = a.ss(10));
        var d = s[0],
            u = d + c,
            p = t.regexIndexOf(/((<a\s+\S+><\/a>)\s*)*<h1>/i); - 1 === p && (p = 0);
        var h = '<div class="afterTitles"></div>',
            f = t.indexOf(h); - 1 === f ? f = 0 : f += h.length;
        var g = "";
        return 4 > u && 1 >= d || 2048 > t.length || (7 > d && 2.5 > u / d ? g = '<div class="shortTOC">' + a + "</div>" : -1 === p || p / 55 > u ? g = '<div class="mediumTOC"><center><b>Contents</b></center><p>' + n + "</p></div>" : (f = p, g = '<div class="longTOC"><div class="tocHeader">Contents</div><p>' + n + "</p></div>")), t = t.ss(0, f) + g + t.ss(f), [t, l]
    }

    function g(e) {
        return e.rp(/([\.\[\]\(\)\*\+\?\^\$\\\{\}\|])/g, "\\$1")
    }

    function b(e, t) {
        return e && t ? (e = e.match(/\n/g), t = t.match(/\n/g), e && e.length > 1 && t && t.length > 1) : !1
    }

    function m(t, n) {
        function s(e) {
            for (var t = (j.push(e) - 1).toString(M); $ > t.length;) t = "0" + t;
            return _ + t
        }

        function o(e) {
            var e = parseInt(e.ss(1), M);
            return j[e]
        }

        function m(e, t) {
            return s(t)
        }

        function v(e, t, r) {
            return t + s(r)
        }

        function y(t) {
            return function(r, n) {
                return "\n<a " + s('name="' + a(i(n)) + '"') + "></a>" + e("h" + t, n) + "\n\n"
            }
        }

        function w(e) {
            var t = c(e);
            return t.h ? t.g + x(t.h, t.j) + "\n" + w(t.m) : e
        }
        var N = {},
            k = 0,
            C = {},
            _ = "\ue010",
            M = 36,
            j = [],
            $ = 4,
            E = RegExp(_ + "[0-9a-z]{" + $ + "," + $ + "}", "g");
        void 0 === n && (n = !0), void 0 !== t.innerHTML && (t = t.innerHTML), t = t.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, "$1"), t = "\n\n" + t;
        var B = function(r, n) {
            var i = RegExp("\n" + n + "{3,}.*\n([\\s\\S]+?)\n" + n + "{3,}\n([ 	]*\\[.*\\])?", "g");
            t = t.rp(i, function(t, n, i) {
                var a = "\n";
                i && (i = i.trim(), a += "<div " + s('class="listingcaption ' + r + '"') + ">" + i.ss(1, i.length - 1) + "</div>\n");
                var o = hljs.highlightAuto(n);
                return a + s(e("pre", e("code", o.value), 'class="listing ' + r + '"')) + "\n"
            })
        };
        B("tilde", "~"), B("backtick", "`"), t = t.rp(/(<code\b.*?<\/code>)/gi, m), t = w(t), t = t.rp(/<svg( .*?)?>([\s\S]*?)<\/svg>/gi, function(e, t, r) {
            return "<svg" + s(t) + ">" + s(r) + "</svg>"
        }), t = t.rp(/<style>([\s\S]*?)<\/style>/gi, function(t, r) {
            return e("style", s(r))
        }), t = t.rp(/<img\s+src=(["'])[\s\S]*?\1\s*>/gi, function(e, t) {
            return "<img " + s(e.ss(5, e.length - 1)) + ">"
        }), t = t.rp(/(`)(.+?(?:\n.+?)?)`(?!\d)/g, e("code", "$2")), t = t.rp(/(<code(?: .*?)?>)([\s\S]*?)<\/code>/gi, function(e, t, n) {
            return s(t + r(n) + "</code>")
        }), t = t.rp(/(<pre\b[\s\S]*?<\/pre>)/gi, m), t = t.rp(/(<\w[^ \n<>]*?[ \t]+)(.*?)(?=\/?>)/g, v), t = t.rp(/(\$\$[\s\S]+?\$\$)/g, m), t = t.rp(/((?:[^\w\d]))\$([ \t][^\$]+?[ \t])\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US))??)\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/(\\\([\s\S]+?\\\))/g, m), t = t.rp(/(\\begin\{equation\}[\s\S]*?\\end\{equation\})/g, m), t = t.rp(/(\\begin\{eqnarray\}[\s\S]*?\\end\{eqnarray\})/g, m), t = t.rp(/(\\begin\{equation\*\}[\s\S]*?\\end\{equation\*\})/g, m), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*={3,}[ \t]*\n/g, y(1)), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*-{3,}[ \t]*\n/g, y(2));
        for (var A = 6; A > 0; --A) t = t.rp(RegExp(/^[ \t]*/.source + "#{" + A + "," + A + "}(?:[ 	])([^\n#]+)#*[ 	]*\n", "gm"), y(A));
        t = t.rp(/\n((?:_[ \t]*){3,}|(?:-[ \t]*){3,}|(?:\*[ \t]*){3,})\s*?\n/g, "\n<hr/>\n");
        var S = s('class="fancyquote"');
        t = t.rp(/\n>[ \t]*"(.*(?:\n>.*)*)"[ \t]*(?:\n>[ \t]*)?(\n>[ \t]{2,}\S.*)?\n/g, function(t, r, n) {
            return e("blockquote", e("span", r.rp(/\n>/g, "\n"), S) + (n ? e("span", n.rp(/\n>/g, "\n"), s('class="author"')) : ""), S)
        }), t = t.rp(/(?:\n>.*){2,}/g, function(t) {
            return e("blockquote", t.rp(/\n>/g, "\n"))
        }), t = t.rp(/\s*\[\^(.*?)\](?!:)/g, function(e, t) {
            return t = t.toLowerCase().trim(), t in N || (++k, N[t] = k), "<sup><a " + s('href="#endnote-' + t + '"') + ">" + N[t] + "</a></sup>"
        }), t = t.rp(/\[#(.*?)\](?!:)/g, function(e, t) {
            return t = t.trim(), "[<a " + s('href="#citation-' + t.toLowerCase() + '"') + ">" + t + "</a>]"
        }), t = t.rp(/\n\[#(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.trim(), "<div " + s('class="bib"') + ">[<a " + s('name="citation-' + t.toLowerCase() + '"') + "></a><b>" + t + "</b>] " + r + "</div>"
        }), t = d(t, s), t = t.rp(/^\[([^\^#].*?)\]:(.*?)$/gm, function(e, t, r) {
            return C[t.toLowerCase().trim()] = r.trim(), ""
        }), t = t.rp(/(?:<|(?!<)\b)(\S+@(\S+\.)+?\S{3,}?)(?:$|>|(?=<)|(?=\s)(?!>))/g, function(e, t) {
            return "<a " + s('href="mailto:' + t + '"') + ">" + t + "</a>"
        });
        var q = function(t, r, n) {
            n = n || "";
            var i, a;
            return /(.mp4|.m4v|.avi|.mpg|.mov)$/i.test(r) ? i = "<video " + s('class="markdeep" src="' + r + '"' + n + ' width="480px" controls="true"') + "/>" : (a = r.match(/^https:\/\/(?:www\.)?youtube.com\/\S*?v=([\w\d-]+)(&.*)?$/i)) ? i = "<iframe " + s('class="markdeep" src="https://www.youtube.com/embed/' + a[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (a = r.match(/^https:\/\/(?:www\.)?vimeo.com\/\S*?\/([\w\d-]+)$/i)) ? i = "<iframe " + s('class="markdeep" src="https://player.vimeo.com/video/' + a[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (i = "<img " + s('class="markdeep" src="' + r + '"' + n) + "/>", /\b(width|height)\b/i.test(n) && (i = e("a ", i, s('href="' + r + '" target="_blank"')))), i
        };
        t = t.rp(/\(http:\/\/g.gravizo.com\/g\?((?:[^\(\)]|\([^\(\)]*\))*)\)/gi, function(e, t) {
            return "(http://g.gravizo.com/g?" + encodeURIComponent(t) + ")"
        }), t = t.rp(/(^|[^!])\[([^\[\]]+?)\]\(([^\)]+?)\)/g, function(e, t, r, n) {
            return t + "<a " + s('href="' + n + '"') + ">" + r + "</a>"
        }), t = t.rp(/(^|[^!])\[[ \t]*?\]\(([^\)]+?)\)/g, function(e, t, r) {
            return t + "<a " + s('href="' + r + '"') + ">" + r + "</a>"
        }), t = t.rp(/(\s*)!\[\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/g, function(t, r, n, i, a) {
            var s = q(t, n, i);
            return b(r, a) && (s = e("center", s)), r + s + a
        });
        for (var T = !0; T;) T = !1, t = t.rp(/(\s*)!\[([\s\S]+?)?\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/, function(t, r, n, i, a, o) {
            T = !0;
            var c = "";
            a && (a = a.rp(/((?:max-)?width)\s*:\s*[^;'"]*/g, function(e, t) {
                return c = e + ";", t + ":100%"
            }), a = a.rp(/((?:max-)?width)\s*=\s*('\S+?'|"\S+?")/g, function(e, t, r) {
                return c = t + ":" + r.ss(1, r.length - 1) + ";", 'style="width:100%" '
            }));
            var l = q(t, i, a);
            return b(r, o) ? (r += "<center>", o = "</center>" + o) : c += "float:right;margin:4px 0px 0px 25px;", r + e("div", l + e("div", n, s('class="imagecaption"')), s('class="image" style="' + c + '"')) + o
        });
        t = l(t, /\*\*/, "strong", s('class="asterisk"')), t = l(t, /__/, "strong", s('class="underscore"')), t = l(t, /\*/, "em", s('class="asterisk"')), t = l(t, /_/, "em", s('class="underscore"')), t = t.rp(/\~\~([^~].*?)\~\~/g, e("del", "$1")), t = t.rp(/(^|[ \t->])(")(?=\w)/gm, "$1&ldquo;"), t = t.rp(/([A-Za-z\.,:;\?!=<])(")(?=$|\W)/gm, "$1&rdquo;"), t = t.rp(/(\s)==>(\s)/g, "$1&rarr;$2"), t = t.rp(/(\s)<==(\s)/g, "$1&larr;$2"), t = t.rp(/([^-!\:\|])---([^->\:\|])/g, "$1&mdash;$2"), t = t.rp(/([^-!\:\|])--([^->\:\|])/g, "$1&ndash;$2"), t = t.rp(/(\d+\s?)x(\s?\d+)/g, "$1&times;$2"), t = t.rp(/([\s\(\[<\|])-(\d)/g, "$1&minus;$2"), t = t.rp(/(\d) - (\d)/g, "$1 &minus; $2"), t = t.rp(/\^([-+]?\d+)\b/g, "<sup>$1</sup>"), t = p(t, s), t = h(t), t = u(t, s), t = t.rp(/(\d+?)[ \t-]degree(?:s?)/g, "$1&deg;"), t = t.rp(/\n[\s\n]*?\n/g, "\n\n</p><p>\n\n"), t = t.rp(/\[(.+?)\]\[(.*?)\]/g, function(e, t, r) {
            return r.trim() || (r = t), r = r.toLowerCase().trim(), "<a " + s('href="' + C[r] + '"') + ">" + t + "</a>"
        }), t = t.rp(/\n\[\^(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.toLowerCase().trim(), t in N ? "\n<div " + s('class="endnote"') + "><a " + s('name="endnote-' + t + '"') + "></a><sup>" + N[t] + "</sup> " + r + "</div>" : "\n"
        });
        var L = t.match(/<h([1-6])>(.*?)<\/h\1>/gi);
        L && L.forEach(function(e) {
            e = i(e.ss(4, e.length - 5)).trim();
            var r = "<a " + s('href="#' + a(e) + '"') + ">";
            t = t.rp(RegExp("(" + g(e) + ")(?=\\ssubsection|\\ssection)", "gi"), r + "$1</a>")
        });
        var R = {},
            z = {};
        if (t = t.rp(/($|>)\s*(figure|table|listing)\s+\[(.+?)\]:/gim, function(t, r, n, i) {
                n = n.toLowerCase();
                var o = R[n] = (0 | R[n]) + 1,
                    i = n + "_" + a(i.toLowerCase().trim());
                return z[i] = o, r + e("a", "", s('name="' + i + '"')) + e("b", n[0].toUpperCase() + n.ss(1) + "&nbsp;" + o + ":", s('style="font-style:normal;"'))
            }), t = t.rp(/\b(figure|fig\.|table|tbl\.|listing|lst.)\s+\[(.+?)\]/gi, function(e, t, r) {
                var n = t.toLowerCase();
                switch (n) {
                    case "fig.":
                        n = "figure";
                        break;
                    case "tbl.":
                        n = "table";
                        break;
                    case "lst.":
                        n = "listing"
                }
                var r = n + "_" + a(r.toLowerCase().trim()),
                    i = z[r];
                return i ? "<a " + s('href="#' + r + '"') + ">" + t + "&nbsp;" + i + "</a>" : t + " ?"
            }), t = t.rp(/(?:<|(?!<)\b)(\w{3,6}:\/\/.+?)(?:$|>|(?=<)|(?=\s)(?!<))/g, function(e, t) {
                return "<a " + s('href="' + t + '" class="url"') + ">" + t + "</a>"
            }), !n) {
            var I = /^\s*(?:<\/p><p>\s*)<strong.*?>([^ \t\*].*?[^ \t\*])<\/strong>[ \t]*\n/.source,
                O = /([ {4,}\t][ \t]*\S.*\n)*/.source;
            t = t.rp(RegExp(I + O, "g"), function(t, r) {
                r = r.trim();
                var n = t.ss(t.indexOf("\n", t.indexOf("</strong>")));
                return n = n ? n.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : "", e("title", i(r)) + '<div class="title"> ' + r + " </div>\n" + n + '<div class="afterTitles"></div>\n'
            })
        }
        if (t = t.rp(/^\s*<\/p>/, ""), !n) {
            var U = f(t, s);
            t = U[0];
            var D = U[1];
            t = t.rp(/\b(sec\.|section|subsection)\s\[(.+?)\]/gi, function(e, t, r) {
                var n = D[r.toLowerCase().trim()];
                return n ? t + "  <a " + s('href="#toc' + n + '"') + ">" + n + "</a>" : t + " ?"
            })
        }
        for (; t.indexOf(_) + 1;) t = t.rp(E, o);
        return '<span class="md">' + e("p", t) + "</span>"
    }

    function v(e) {
        var t = e.split("\n"),
            r = 0;
        t.forEach(function(e) {
            r = L(r, e.length)
        });
        var n = Array(r + 1).join(" "),
            i = "";
        return t.forEach(function(e) {
            i += e + n.ss(e.length) + "\n"
        }), i
    }

    function y(e) {
        var t = e.split("\n"),
            r = 1 / 0;
        if (t.forEach(function(e) {
                if ("" !== e.trim()) {
                    var t = e.match(/^([ \t]*)/);
                    t && (r = R(r, t[0].length))
                }
            }), 0 === r) return e;
        var n = "";
        return t.forEach(function(e) {
            n += e.ss(r) + "\n"
        }), n
    }

    function x(e, t) {
        function n(e) {
            return H.indexOf(e) + 1
        }

        function i(e) {
            return -1 !== Z.indexOf(e)
        }

        function a(e) {
            return n(e) || "." === e
        }

        function s(e) {
            return n(e) || "'" === e
        }

        function o(e) {
            return i(e) || "<" === e || m(e)
        }

        function c(e) {
            return i(e) || ">" === e || m(e)
        }

        function l(e) {
            return W.indexOf(e) + 1
        }

        function d(e) {
            return K.indexOf(e) + 1
        }

        function u(e) {
            return "-" === e || n(e) || b(e)
        }

        function p(e) {
            return h(e) || b(e) || m(e)
        }

        function h(e) {
            return "|" === e || n(e)
        }

        function f(e) {
            return "/" === e || n(e)
        }

        function g(e) {
            return "\\" === e || n(e)
        }

        function b(e) {
            return F.indexOf(e) + 1
        }

        function m(e) {
            return D.indexOf(e) + 1
        }

        function y(e) {
            return P.indexOf(e) + 1
        }

        function x(e, t) {
            return this instanceof x ? (void 0 === t && (void 0 === e ? e = t = 0 : e instanceof x && (t = e.y, e = e.x)), this.x = e, this.y = t, void Object.seal(this)) : new x(e, t)
        }

        function w(e) {
            var t = function(r, n) {
                return void 0 === n && r instanceof x && (n = r.y, r = r.x), r >= 0 && t.width > r && n >= 0 && t.height > n ? e[n * (t.width + 1) + r] : " "
            };
            return t._used = [], t.width = e.indexOf("\n"), t.height = e.split("\n").length, "\n" === e[e.length - 1] && --t.height, t.q = function(e, r) {
                void 0 === r && e instanceof x && (r = e.y, e = e.x), e >= 0 && t.width > e && r >= 0 && t.height > r && (t._used[r * (t.width + 1) + e] = !0)
            }, t.s = function(e, t) {
                return void 0 === t && e instanceof x && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
            }, t.u = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r - 1),
                    i = t(e, r),
                    o = t(e, r + 1),
                    c = t(e + 1, r - 1),
                    l = t(e - 1, r - 1);
                return h(i) ? a(n) || "^" === n || h(n) || b(n) || s(o) || "v" === o || h(o) || b(o) || m(n) || m(o) || "_" === t(e, r - 1) || "_" === l || "_" === c || (a(l) || a(c)) && (s(t(e - 1, r + 1)) || s(t(e + 1, r + 1))) : a(i) || "^" === i ? h(o) || b(o) && "." !== i : s(i) || "v" === i ? h(n) || b(n) && "'" !== i : m(i) ? h(n) || h(o) : !1
            }, t.F = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e - 2, r),
                    a = t(e - 1, r),
                    s = t(e + 0, r),
                    l = t(e + 1, r),
                    d = t(e + 2, r);
                return u(s) || u(a) && b(s) ? u(a) ? u(l) || c(l) || u(n) || o(n) : o(a) ? u(l) : u(l) && (u(d) || c(d)) : "<" === s ? u(l) && u(d) : ">" === s ? u(a) && u(n) : i(s) ? u(a) && u(n) || u(l) && u(d) : !1
            }, t.G = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r - 1),
                    c = t(e + 1, r + 1);
                return "\\" === n ? g(c) || s(c) || m(c) || "v" === c || g(o) || a(o) || m(o) || "^" === o || "/" === t(e, r - 1) || "/" === t(e, r + 1) || "_" === c || "_" === o : "." === n ? "\\" === c : "'" === n ? "\\" === o : "^" === n ? "\\" === c : "v" === n ? "\\" === o : i(n) || m(n) || "|" === n ? g(o) || g(c) : void 0
            }, t.H = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r + 1),
                    c = t(e + 1, r - 1);
                return "/" !== n || "\\" !== t(e, r - 1) && "\\" !== t(e, r + 1) ? f(n) ? f(c) || a(c) || m(c) || "^" === c || "_" === c || f(o) || s(o) || m(o) || "v" === o || "_" === o : "." === n ? "/" === o : "'" === n ? "/" === c : "^" === n ? "/" === o : "v" === n ? "/" === c : i(n) || m(n) || "|" === n ? f(o) || f(c) : !1 : !0
            }, t.toString = function() {
                return e
            }, Object.freeze(t)
        }

        function N(e, t, r, n, i) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r), this.dashed = i || !1, Object.freeze(this)
        }

        function k() {
            this.Z = []
        }

        function $(e) {
            return function(t, r) {
                for (var n = 0; this.Z.length > n; ++n)
                    if (e.call(this.Z[n], t, r)) return !0;
                return !1
            }
        }

        function E() {
            this.aa = []
        }

        function B(e, t) {
            function r(t, r, n) {
                var i, a, s = z(r.x - t.x),
                    o = z(r.y - t.y);
                for (i = t.x, a = t.y; i !== r.x || a !== r.y; i += s, a += o)
                    if (e(i, a) === n) return !0;
                return e(i, a) === n
            }
            for (var n = 0; e.width > n; ++n)
                for (var o = 0; e.height > o; ++o)
                    if (e.u(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++o; while (e.u(n, o));
                        var l = x(n, o - 1),
                            d = e(c),
                            f = e(c.x, c.y - 1);
                        (!i(d) && ("-" === f || "_" === f || "_" === e(c.x - 1, c.y - 1) || "_" === e(c.x + 1, c.y - 1) || s(f)) || b(f)) && (c.y -= .5);
                        var g = e(l),
                            v = e(l.x, l.y + 1);
                        (!i(g) && ("-" === v || a(v)) || b(v) || "_" === e(l.x - 1, l.y) || "_" === e(l.x + 1, l.y)) && (l.y += .5), c.x === l.x && c.y === l.y || t.$(new N(c, l))
                    } else "'" === e(n, o) && ("-" === e(n - 1, o) && "_" === e(n + 1, o - 1) && !p(e(n - 1, o - 1)) || "_" === e(n - 1, o - 1) && "-" === e(n + 1, o) && !p(e(n + 1, o - 1))) ? t.$(new N(x(n, o - .5), x(n, o))) : "." === e(n, o) && ("_" === e(n - 1, o) && "-" === e(n + 1, o) && !p(e(n + 1, o + 1)) || "-" === e(n - 1, o) && "_" === e(n + 1, o) && !p(e(n - 1, o + 1))) && t.$(new N(x(n, o), x(n, o + .5)));
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width > n; ++n)
                    if (e.F(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n; while (e.F(n, o));
                        var l = x(n - 1, o);
                        !i(e(c.x - 1, c.y)) && (a(e(c)) && p(e(c.x - 1, c.y + 1)) || s(e(c)) && p(e(c.x - 1, c.y - 1))) && ++c.x, !i(e(l.x + 1, l.y)) && (a(e(l)) && p(e(l.x + 1, l.y + 1)) || s(e(l)) && p(e(l.x + 1, l.y - 1))) && --l.x, c.x === l.x && c.y === l.y || t.$(new N(c, l))
                    }
            for (var y = -e.height; e.width > y; ++y)
                for (var n = y, o = 0; e.height > o; ++o, ++n)
                    if (e.G(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n, ++o; while (e.G(n, o));
                        var l = x(n - 1, o - 1);
                        if (r(c, l, "\\")) {
                            var w = e(c),
                                d = e(c.x, c.y - 1),
                                k = e(c.x - 1, c.y - 1);
                            "/" === d || "_" === k || "_" === d || !i(w) && (u(k) || h(k)) ? (c.x -= .5, c.y -= .5) : m(k) && (c.x -= .25, c.y -= .25);
                            var C = (e(l), e(l.x + 1, l.y + 1));
                            "/" === e(l.x, l.y + 1) || "_" === e(l.x + 1, l.y) || "_" === e(l.x - 1, l.y) || !i(e(l)) && (u(C) || h(C)) ? (l.x += .5, l.y += .5) : m(C) && (l.x += .25, l.y += .25), t.$(new N(c, l))
                        }
                    }
            for (var y = -e.height; e.width > y; ++y)
                for (var n = y, o = e.height - 1; o >= 0; --o, ++n)
                    if (e.H(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n, --o; while (e.H(n, o));
                        var l = x(n - 1, o + 1);
                        if (r(c, l, "/")) {
                            var d = e(l.x, l.y - 1),
                                _ = e(l.x + 1, l.y - 1);
                            e(l);
                            "\\" === d || "_" === d || "_" === _ || !i(e(l)) && (u(_) || h(_)) ? (l.x += .5, l.y -= .5) : m(_) && (l.x += .25, l.y -= .25);
                            var M = e(c.x - 1, c.y + 1),
                                w = e(c);
                            "\\" === e(c.x, c.y + 1) || "_" === e(c.x - 1, c.y) || "_" === e(c.x + 1, c.y) || !i(e(c)) && (u(M) || h(M)) ? (c.x -= .5, c.y += .5) : m(M) && (c.x -= .25, c.y += .25), t.$(new N(c, l))
                        }
                    }
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width > n; ++n) {
                    var j = e(n, o);
                    a(j) && (u(e(n - 1, o)) && h(e(n + 1, o + 1)) && (e.q(n - 1, o), e.q(n, o), e.q(n + 1, o + 1), t.$(new N(x(n - 1, o), x(n + 1, o + 1), x(n + 1.1, o), x(n + 1, o + 1)))), u(e(n + 1, o)) && h(e(n - 1, o + 1)) && (e.q(n - 1, o + 1), e.q(n, o), e.q(n + 1, o), t.$(new N(x(n + 1, o), x(n - 1, o + 1), x(n - 1.1, o), x(n - 1, o + 1))))), ")" !== j && !m(j) || "." !== e(n - 1, o - 1) || "'" !== e(n - 1, o + 1) || (e.q(n, o), e.q(n - 1, o - 1), e.q(n - 1, o + 1), t.$(new N(x(n - 2, o - 1), x(n - 2, o + 1), x(n + .6, o - 1), x(n + .6, o + 1)))), "(" !== j && !m(j) || "." !== e(n + 1, o - 1) || "'" !== e(n + 1, o + 1) || (e.q(n, o), e.q(n + 1, o - 1), e.q(n + 1, o + 1), t.$(new N(x(n + 2, o - 1), x(n + 2, o + 1), x(n - .6, o - 1), x(n - .6, o + 1)))), s(j) && (u(e(n - 1, o)) && h(e(n + 1, o - 1)) && (e.q(n - 1, o), e.q(n, o), e.q(n + 1, o - 1), t.$(new N(x(n - 1, o), x(n + 1, o - 1), x(n + 1.1, o), x(n + 1, o - 1)))), u(e(n + 1, o)) && h(e(n - 1, o - 1)) && (e.q(n - 1, o - 1), e.q(n, o), e.q(n + 1, o), t.$(new N(x(n + 1, o), x(n - 1, o - 1), x(n - 1.1, o), x(n - 1, o - 1)))))
                }
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width - 2 > n; ++n)
                    if ("_" === e(n, o) && "_" === e(n + 1, o)) {
                        var c = x(n - .5, o + .5),
                            $ = e(n - 1, o),
                            E = e(n - 2, o);
                        "|" === $ || "|" === e(n - 1, o + 1) || "." === $ || "'" === e(n - 1, o + 1) ? (c.x -= .5, "." !== $ || "-" !== E && "." !== E || "(" !== e(n - 2, o + 1) || (c.x -= .5)) : "/" === $ && (c.x -= 1), "(" === $ && "(" === E && "'" === e(n, o + 1) && "." === e(n, o - 1) && (c.x += .5), $ = E = void 0;
                        do e.q(n, o), ++n; while ("_" === e(n, o));
                        var l = x(n - .5, o + .5),
                            j = e(n, o),
                            B = e(n + 1, o),
                            g = e(n, o + 1);
                        "|" === j || "|" === g || "." === j || "'" === g ? (l.x += .5, "." !== j || "-" !== B && "." !== B || ")" !== e(n + 1, o + 1) || (l.x += .5)) : "\\" === j && (l.x += 1), ")" === j && ")" === B && "'" === e(n - 1, o + 1) && "." === e(n - 1, o - 1) && (l.x += -.5), t.$(new N(c, l))
                    }
        }

        function A(e, t, r) {
            function n(e) {
                return " " === e || /[^a-zA-Z0-9]|[ov]/.test(e)
            }

            function i(e, t, r, i) {
                return (n(t) || m(t)) && (n(e) || m(e)) && n(i) && n(r)
            }
            for (var a = 0; e.width > a; ++a)
                for (var s = 0; e.height > s; ++s) {
                    var o = e(a, s),
                        c = s;
                    if (b(o)) t.U(a, c - .5) && t.O(a, c + .5) && (r.$(a, c, o), e.q(a, c));
                    else if (m(o)) {
                        var u = e(a, c - 1),
                            p = e(a, c + 1),
                            h = e(a - 1, c),
                            f = e(a + 1, c);
                        (t.W(a - 1, c) || t.V(a + 1, c) || t.U(a, c - 1) || t.O(a, c + 1) || t.O(a, c) || t.U(a, c) || i(u, p, h, f)) && (r.$(a, c, o), e.q(a, c))
                    } else if (l(o)) r.$(a, c, o), e.q(a, c);
                    else if (d(o)) r.$(a, c, o), e.q(a, c);
                    else {
                        var g = 0;
                        ">" === o && (t.W(a, c) || t.Y(a, c)) ? (m(e(a + 1, c)) && (g = -.5), r.$(a + g, c, ">", 0), e.q(a, c)) : "<" === o && (t.V(a, c) || t.Y(a, c)) ? (m(e(a - 1, c)) && (g = .5), r.$(a + g, c, ">", 180), e.q(a, c)) : "^" === o ? t.O(a, c - .5) ? (r.$(a, c - .5, ">", 270), e.q(a, c)) : t.O(a, c) ? (r.$(a, c, ">", 270), e.q(a, c)) : t.P(a + .5, c - .5) ? (r.$(a + .5, c - .5, ">", 270 + I), e.q(a, c)) : t.P(a + .25, c - .25) ? (r.$(a + .25, c - .25, ">", 270 + I), e.q(a, c)) : t.P(a, c) ? (r.$(a, c, ">", 270 + I), e.q(a, c)) : t.S(a, c) ? (r.$(a, c, o, 270 - I), e.q(a, c)) : t.S(a - .5, c - .5) ? (r.$(a - .5, c - .5, o, 270 - I), e.q(a, c)) : t.S(a - .25, c - .25) ? (r.$(a - .25, c - .25, o, 270 - I), e.q(a, c)) : t.X(a, c) && (r.$(a, c - .5, ">", 270), e.q(a, c)) : "v" === o && (t.U(a, c + .5) ? (r.$(a, c + .5, ">", 90), e.q(a, c)) : t.U(a, c) ? (r.$(a, c, ">", 90), e.q(a, c)) : t.R(a, c) ? (r.$(a, c, ">", 90 + I), e.q(a, c)) : t.R(a - .5, c + .5) ? (r.$(a - .5, c + .5, ">", 90 + I), e.q(a, c)) : t.R(a - .25, c + .25) ? (r.$(a - .25, c + .25, ">", 90 + I), e.q(a, c)) : t.T(a, c) ? (r.$(a, c, ">", 90 - I), e.q(a, c)) : t.T(a + .5, c + .5) ? (r.$(a + .5, c + .5, ">", 90 - I), e.q(a, c)) : t.T(a + .25, c + .25) ? (r.$(a + .25, c + .25, ">", 90 - I), e.q(a, c)) : t.X(a, c) && (r.$(a, c + .5, ">", 90), e.q(a, c)))
                    }
                }
        }
        e = v(e);
        var S = "\ue004";
        e = e.rp(/([a-z]|[A-Z])o([a-z]|[A-Z])/g, "$1" + S + "$2");
        var q = 8,
            T = 2,
            I = 180 * Math.atan(1 / T) / Math.PI,
            O = 1e-6,
            U = ">v<^",
            D = "o*",
            F = "()",
            H = "+",
            Z = H + ".'",
            W = "\u2591\u2592\u2593\u2594\u2589",
            K = "\u25e2\u25e3\u25e4\u25e5",
            P = U + D + F + W + K;
        x.prototype.toString = x.prototype.toSVG = function() {
            return "" + this.x * q + "," + this.y * q * T + " "
        };
        var Q = N.prototype;
        Q.I = function() {
            return this.B.x === this.A.x
        }, Q.J = function() {
            return this.B.y === this.A.y
        }, Q.K = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t + e) < O
        }, Q.L = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t - e) < O
        }, Q.M = function() {
            return void 0 !== this.C
        }, Q.N = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, Q.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && R(this.A.y, this.B.y) === t
        }, Q.P = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.R = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.S = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.T = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.U = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && L(this.A.y, this.B.y) === t
        }, Q.V = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && R(this.A.x, this.B.x) === e
        }, Q.W = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && L(this.A.x, this.B.x) === e
        }, Q.X = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && R(this.A.y, this.B.y) <= t && L(this.A.y, this.B.y) >= t
        }, Q.Y = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && R(this.A.x, this.B.x) <= e && L(this.A.x, this.B.x) >= e
        }, Q.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.M() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none;"', this.dashed && (e += ' stroke-dasharray="3,6"'), e += "/>"
        };
        var G = k.prototype;
        G.$ = function(e) {
            this.Z.push(e)
        }, G.O = $(Q.O), G.P = $(Q.P), G.S = $(Q.S), G.R = $(Q.R), G.T = $(Q.T), G.U = $(Q.U), G.V = $(Q.V), G.W = $(Q.W), G.N = $(Q.N), G.X = $(Q.X), G.Y = $(Q.Y), G.toSVG = function() {
            for (var e = "", t = 0; this.Z.length > t; ++t) e += this.Z[t].toSVG() + "\n";
            return e
        };
        var V = E.prototype;
        V.$ = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), !y(r);
            var i = {
                C: x(e, t),
                type: r,
                angle: n || 0
            };
            m(r) ? this.aa.push(i) : this.aa.unshift(i)
        }, V.toSVG = function() {
            for (var e = "", t = 0; this.aa.length > t; ++t) {
                var r = this.aa[t],
                    n = r.C;
                if (b(r.type)) {
                    var i = ")" === r.type ? .75 : -.75,
                        a = x(n.x, n.y - .5),
                        s = x(n.x, n.y + .5),
                        o = x(n.x + i, n.y - .5),
                        c = x(n.x + i, n.y + .5);
                    e += '<path d="M ' + s + " C " + c + o + a + '" style="fill:none;"/>'
                } else if (m(r.type)) e += '<circle cx="' + n.x * q + '" cy="' + n.y * q * T + '" r="' + (q - j) + '" class="' + ("*" === r.type ? "closed" : "open") + 'dot"/>';
                else if (l(r.type)) {
                    var u = Math.round(63.75 * (3 - W.indexOf(r.type)));
                    e += '<rect x="' + (n.x - .5) * q + '" y="' + (n.y - .5) * q * T + '" width="' + q + '" height="' + q * T + '" fill="rgb(' + u + "," + u + "," + u + ')"/>'
                } else if (d(r.type)) {
                    var p = K.indexOf(r.type),
                        h = .5 - (1 & p),
                        f = .5 - (p >> 1);
                    h *= z(f);
                    var g = x(n.x + h, n.y - f),
                        a = x(n.x + h, n.y + f),
                        s = x(n.x - h, n.y + f);
                    e += '<polygon points="' + g + a + s + '" style="stroke:none"/>\n'
                } else {
                    var g = x(n.x + 1, n.y),
                        a = x(n.x - .5, n.y - .35),
                        s = x(n.x - .5, n.y + .35);
                    e += '<polygon points="' + g + a + s + '"  style="stroke:none" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var X = w(e),
            Y = new k,
            J = new E;
        B(X, Y), A(X, Y, J);
        var ee = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (X.height + 1) * q * T + '" width="' + (X.width + 1) * q + '"';
        if ("floatleft" === t ? ee += ' style="float:left;margin: 15px 30px 15px 0px;"' : "floatright" === t ? ee += ' style="float:right;margin: 15px 0px 15px 30px;"' : "center" === t && (ee += ' style="margin: 0px auto 0px auto;"'), ee += '><g transform="translate(' + x(1, 1) + ')">\n', C) {
            ee += '<g style="opacity:0.1">\n';
            for (var te = 0; X.width > te; ++te)
                for (var re = 0; X.height > re; ++re) ee += '<rect x="' + ((te - .5) * q + 1) + '" + y="' + ((re - .5) * q * T + 2) + '" width="' + (q - 2) + '" height="' + (q * T - 2) + '" style="fill:', ee += X.s(te, re) ? "red;" : " " === X(te, re) ? "gray; opacity:0.05" : "blue;", ee += '"/>\n';
            ee += "</g>\n"
        }
        if (ee += Y.toSVG(), ee += J.toSVG(), !M) {
            ee += '<g transform="translate(0,0)">';
            for (var re = 0; X.height > re; ++re)
                for (var te = 0; X.width > te; ++te) {
                    var ne = X(te, re);
                    /[\u2B22\u2B21]/.test(ne) ? ee += '<text text-anchor="middle" x="' + te * q + '" y="' + (4 + re * q * T) + '" style="font-size:20.5px">' + r(ne) + "</text>" : " " === ne || X.s(te, re) || (ee += '<text text-anchor="middle" x="' + te * q + '" y="' + (4 + re * q * T) + '">' + r(ne) + "</text>")
                }
            ee += "</g>"
        }
        if (_) {
            ee += '<g transform="translate(2, 2)">\n';
            for (var te = 0; X.width > te; ++te)
                for (var re = 0; X.height > re; ++re) {
                    var ne = X(te, re);
                    " " !== ne && (ee += '<text text-anchor="middle" x="' + te * q + '" y="' + (4 + re * q * T) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + r(ne) + "</text>")
                }
            ee += "</g>"
        }
        return ee += "</g></svg>", ee = ee.rp(RegExp(S, "g"), "o")
    }

    function w(e) {
        return -1 !== e.search(/markdeep\S*?\.js$/i)
    }

    function N(e) {
        return Array.prototype.slice.call(e)
    }
    var k = String.prototype;
    k.rp = k.replace, k.ss = k.substring, k.regexIndexOf = function(e, t) {
        var r = this.ss(t || 0).search(e);
        return r >= 0 ? r + (t || 0) : r
    };
    var C = !1,
        _ = C,
        M = _,
        j = 2,
        $ = "*",
        E = Array(6).join($),
        B = e("style", 'body{max-width:680px;margin:auto;padding:20px;text-align:justify;line-height:140%; -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased;color:#222;font-family:Palatino,Georgia,"Times New Roman",serif;}'),
        A = e("style", 'body{counter-reset: h1 h2 h3 h4 h5 h6;}.md div.title{font-size:26px;font-weight:800;padding-bottom:5px;line-height:120%;text-align:center;}.md div.afterTitles{height:10px;}.md div.subtitle{text-align:center;}.md .image{display:inline-block}.md div.imagecaption,.md div.tablecaption,.md div.listingcaption{margin:0.2em 0 10px 0;font-style:italic;}.md div.imagecaption{margin-bottom:0px}.md img{max-width:100%;}li{text-align:left};.md div.tilde{margin:20px 0 -10px 0;text-align:center;}.md blockquote.fancyquote{margin-top:25px;margin-bottom:25px;text-align:left;line-height:160%;}.md blockquote.fancyquote::before{content: "\u201c";color:#DDD;font-family:Times New Roman;font-size: 45px;line-height: 0;margin-right: 6px;vertical-align: -0.3em;}.md span.fancyquote{font-size:118%;color:#777;font-style:italic;}.md span.fancyquote::after{content: "\u201d";font-style:normal;color:#DDD;font-family:Times New Roman;font-size: 45px;line-height: 0;margin-left: 6px;vertical-align: -0.3em;}.md blockquote.fancyquote .author{width:100%;margin-top: 10px;display:inline-block;text-align:right;}.md small{font-size:60%;}.md div.title,contents,.md .tocHeader,h1,h2,h3,h4,h5,h6,.md .shortTOC,.md .mediumTOC{font-family:Verdana,Helvetica,Arial,sans-serif;}.md svg.diagram{display:block;font-family:Menlo,\'Lucida Console\',monospace;font-size:13.1px;text-align:center;stroke-linecap:round;stroke-width:' + j + "px;stroke:#000;fill:#000;}.md svg.diagram .opendot{fill:#FFF}.md svg.diagram text{stroke:none;}.md a:link.url{font-family:Georgia,Palatino,'Times New Roman';}h1,.tocHeader{padding-bottom:3px;padding-top:15px;border-bottom:3px solid;border-top:none;font-size:20px;font-weight:bold;clear:both;}h1{counter-reset: h2 h3 h4 h5 h6;}h2{counter-reset: h3 h4 h5 h6;font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-bottom:2px solid #999;border-top:none;color:#555;font-size:18px;clear:both;}h3,h4,h5,h6{font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-top:none;color:#555;font-size:16px;clear:both;}h3{counter-reset: h4 h5 h6;}h4{counter-reset: h5 h6;}h5{counter-reset: h6;}.md table{border-collapse:collapse;line-height:140%; }.md table.table{margin:auto;}.md table.calendar{width:100%;margin:auto;font-size:11px;font-family:Helvetica,Arial,sans-serif;}.md table.calendar th{font-size:16px;}.md .today{background:#ECF8FA;}.md div.tablecaption{text-align: center;}.md table.table th{color:#FFF;background-color:#AAA;border:1px solid #888;padding:8px 15px 8px 15px;}.md table.table td{padding:5px 15px 5px 15px;border:1px solid #888;}.md table.table tr:nth-child(even){background:#EEE;}.md pre.tilde{border-top: 1px solid #CCC;border-bottom: 1px solid #CCC;padding: 5px 0 5px 20px;margin-bottom: 30px;background: #FCFCFC;}.md a:link, .md a:visited{color:#38A;text-decoration:none;}.md a:hover{text-decoration:underline}.md dt{font-weight:700;}.md dd{padding-bottom:18px;}.md code{white-space:pre;}.md .endnote{font-size:13px;line-height:15px;padding-left:10px;text-indent:-10px;}.md .bib{padding-left:80px;text-indent:-80px;text-align:left;}.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999;}.md .mediumTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px;}.md .mediumTOC .level1{font-weight:600;}.md .longTOC .level1{font-weight:600;display:block;padding-top:12px; margin-bottom:-20px;}.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px;}"),
        S = '<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>',
        q = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>',
        T = {
            mode: "markdeep",
            detectMath: !0
        },
        L = Math.max,
        R = Math.min,
        z = Math.sign || function(e) {
            return +e === e ? 0 === e ? e : e > 0 ? 1 : -1 : NaN
        },
        I = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword {color:#02E}.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#A0C}.hljs-function .hljs-title{font-weight:bold;color:#000}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    if (!window.alreadyProcessedMarkdeep) {
        window.alreadyProcessedMarkdeep = !0;
        var O = -1 !== window.location.href.search(/\?.*noformat.*/i);
        window.markdeep = Object.freeze({
            format: m,
            formatDiagram: x,
            stylesheet: function() {
                return A + s() + I
            }
        });
        var U = t("mode");
        switch (U) {
            case "script":
                return;
            case "html":
            case "doxygen":
                return N(document.getElementsByClassName("diagram")).concat(N(document.getElementsByTagName("diagram"))).forEach(function(e) {
                    var t = n(e.innerHTML);
                    t = t.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, ""), "doxygen" === U && (t = t.rp(RegExp("\u2013", "g"), "--"), t = t.rp(RegExp("\u2014", "g"), "---"), t = t.rp(/<a class="el" .*>(.*)<\/a>/g, "$1")), e.outerHTML = '<center class="md">' + x(y(t), "") + "</center>"
                }), N(document.getElementsByClassName("markdeep")).concat(N(document.getElementsByTagName("markdeep"))).forEach(function(e) {
                    var t = document.createElement("div");
                    t.innerHTML = m(y(n(e.innerHTML)), !0), e.parentNode.replaceChild(t, e)
                }), void(document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML)
        }
        O || (N(document.getElementsByTagName("script")).forEach(function(e) {
            w(e.src) && e.parentNode.removeChild(e)
        }), document.body.style.visibility = "hidden");
        var D = o(document.body);
        if (O) return D = D.rp(/<!-- Markdeep:.+$/gm, "") + S, D = D.rp(/</g, "&lt;").rp(/>/g, "&gt;"), void(document.body.innerHTML = e("pre", D));
        D = n(D), setTimeout(function() {
            var n = m(D, !1),
                i = t("detectMath") && (-1 !== n.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== n.search(/\\\(.*\\\)/));
            if (i) {
                var a = "$$NC{\\n}{\\hat{n}}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^\\circ}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}$$\n".rp(/NC/g, "\\newcommand");
                n = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + a + "</span>\n" + n
            }
            n += q;
            var o = D.length > 1e3,
                c = B + A + s() + I;
            if (o && (c += e("style", "div.title { padding-top: 40px; } div.afterTitles { height: 15px; }")), -1 !== window.location.href.search(/\?.*export.*/i)) {
                var l = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + c + document.head.innerHTML + n;
                i && (l += '<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>'), document.body.innerHTML = e("code", r(l))
            } else if (document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + c + document.head.innerHTML, document.body.innerHTML = n, i) {
                var d = document.createElement("script");
                d.type = "text/javascript", d.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(d)
            }
            document.body.style.visibility = "visible"
        }, 0)
    }
}(), ! function(e) {
    var t = "object" == typeof window && window || "object" == typeof self && self;
    "undefined" != typeof exports ? e(exports) : t && (t.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return t.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function r(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var r = e && e.exec(t);
        return r && 0 == r.index
    }

    function i(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }

    function a(e) {
        var t, r, n, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "", r = /\blang(?:uage)?-([\w-]+)\b/i.exec(a)) return x(r[1]) ? r[1] : "no-highlight";
        for (a = a.split(/\s+/), t = 0, n = a.length; n > t; t++)
            if (x(a[t]) || i(a[t])) return a[t]
    }

    function s(e, t) {
        var r, n = {};
        for (r in e) n[r] = e[r];
        if (t)
            for (r in t) n[r] = t[r];
        return n
    }

    function o(e) {
        var t = [];
        return function n(e, i) {
            for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : 1 == a.nodeType && (t.push({
                event: "start",
                offset: i,
                node: a
            }), i = n(a, i), r(a).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: i,
                node: a
            }));
            return i
        }(e, 0), t
    }

    function c(e, n, i) {
        function a() {
            return e.length && n.length ? e[0].offset != n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
        }

        function s(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            d += "<" + r(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) {
            d += "</" + r(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? s : o)(e.node)
        }
        for (var l = 0, d = "", u = []; e.length || n.length;) {
            var p = a();
            if (d += t(i.substr(l, p[0].offset - l)), l = p[0].offset, p == e) {
                u.reverse().forEach(o);
                do c(p.splice(0, 1)[0]), p = a(); while (p == e && p.length && p[0].offset == l);
                u.reverse().forEach(s)
            } else "start" == p[0].event ? u.push(p[0].node) : u.pop(), c(p.splice(0, 1)[0])
        }
        return d + t(i.substr(l))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function r(r, n) {
            return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(i, a) {
            if (!i.compiled) {
                if (i.compiled = !0, i.k = i.k || i.bK) {
                    var o = {},
                        c = function(t, r) {
                            e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                var r = e.split("|");
                                o[r[0]] = [t, r[1] ? +r[1] : 1]
                            })
                        };
                    "string" == typeof i.k ? c("keyword", i.k) : Object.keys(i.k).forEach(function(e) {
                        c(e, i.k[e])
                    }), i.k = o
                }
                i.lR = r(i.l || /\w+/, !0), a && (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"), i.b || (i.b = /\B|\b/), i.bR = r(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = r(i.e)), i.tE = t(i.e) || "", i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)), i.i && (i.iR = r(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);
                var l = [];
                i.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(s(e, t))
                    }) : l.push("self" == e ? i : e)
                }), i.c = l, i.c.forEach(function(e) {
                    n(e, i)
                }), i.starts && n(i.starts, a);
                var d = i.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([i.tE, i.i]).map(t).filter(Boolean);
                i.t = d.length ? r(d.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        n(e)
    }

    function d(e, r, i, a) {
        function s(e, t) {
            for (var r = 0; t.c.length > r; r++)
                if (n(t.c[r].bR, e)) return t.c[r]
        }

        function o(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? o(e.parent, t) : void 0
        }

        function c(e, t) {
            return !i && n(t.iR, e)
        }

        function p(e, t) {
            var r = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }

        function h(e, t, r, n) {
            var i = n ? "" : w.classPrefix,
                a = '<span class="' + i,
                s = r ? "" : "</span>";
            return a += e + '">', a + t + s
        }

        function f() {
            if (!C.k) return t(j);
            var e = "",
                r = 0;
            C.lR.lastIndex = 0;
            for (var n = C.lR.exec(j); n;) {
                e += t(j.substr(r, n.index - r));
                var i = p(C, n);
                i ? ($ += i[1], e += h(i[0], t(n[0]))) : e += t(n[0]), r = C.lR.lastIndex, n = C.lR.exec(j)
            }
            return e + t(j.substr(r))
        }

        function g() {
            var e = "string" == typeof C.sL;
            if (e && !N[C.sL]) return t(j);
            var r = e ? d(C.sL, j, !0, _[C.sL]) : u(j, C.sL.length ? C.sL : void 0);
            return C.r > 0 && ($ += r.r), e && (_[C.sL] = r.top), h(r.language, r.value, !1, !0)
        }

        function b() {
            M += void 0 !== C.sL ? g() : f(), j = ""
        }

        function m(e, t) {
            M += e.cN ? h(e.cN, "", !0) : "", C = Object.create(e, {
                parent: {
                    value: C
                }
            })
        }

        function v(e, t) {
            if (j += e, void 0 === t) return b(), 0;
            var r = s(t, C);
            if (r) return r.skip ? j += t : (r.eB && (j += t), b(), r.rB || r.eB || (j = t)), m(r, t), r.rB ? 0 : t.length;
            var n = o(C, t);
            if (n) {
                var i = C;
                i.skip ? j += t : (i.rE || i.eE || (j += t), b(), i.eE && (j = t));
                do C.cN && (M += "</span>"), C.skip || ($ += C.r), C = C.parent; while (C != n.parent);
                return n.starts && m(n.starts, ""), i.rE ? 0 : t.length
            }
            if (c(t, C)) throw Error('Illegal lexeme "' + t + '" for mode "' + (C.cN || "<unnamed>") + '"');
            return j += t, t.length || 1
        }
        var y = x(e);
        if (!y) throw Error('Unknown language: "' + e + '"');
        l(y);
        var k, C = a || y,
            _ = {},
            M = "";
        for (k = C; k != y; k = k.parent) k.cN && (M = h(k.cN, "", !0) + M);
        var j = "",
            $ = 0;
        try {
            for (var E, B, A = 0; C.t.lastIndex = A, E = C.t.exec(r), E;) B = v(r.substr(A, E.index - A), E[0]), A = E.index + B;
            for (v(r.substr(A)), k = C; k.parent; k = k.parent) k.cN && (M += "</span>");
            return {
                r: $,
                value: M,
                language: e,
                top: C
            }
        } catch (S) {
            if (-1 != S.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw S
        }
    }

    function u(e, r) {
        r = r || w.languages || Object.keys(N);
        var n = {
                r: 0,
                value: t(e)
            },
            i = n;
        return r.filter(x).forEach(function(t) {
            var r = d(t, e, !1);
            r.language = t, r.r > i.r && (i = r), r.r > n.r && (i = n, n = r)
        }), i.language && (n.second_best = i), n
    }

    function p(e) {
        return w.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, w.tabReplace)
        })), w.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function h(e, t, r) {
        var n = t ? k[t] : r,
            i = [e.trim()];
        return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(n) && i.push(n), i.join(" ").trim()
    }

    function f(e) {
        var t = a(e);
        if (!i(t)) {
            var r;
            w.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), r.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : r = e;
            var n = r.textContent,
                s = t ? d(t, n, !0) : u(n),
                l = o(r);
            if (l.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = s.value, s.value = c(l, o(f), n)
            }
            s.value = p(s.value), e.innerHTML = s.value, e.className = h(e.className, t, s.language), e.result = {
                language: s.language,
                re: s.r
            }, s.second_best && (e.second_best = {
                language: s.second_best.language,
                re: s.second_best.r
            })
        }
    }

    function g(e) {
        w = s(w, e)
    }

    function b() {
        if (!b.called) {
            b.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }

    function m() {
        addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1)
    }

    function v(t, r) {
        var n = N[t] = r(e);
        n.aliases && n.aliases.forEach(function(e) {
            k[e] = t
        })
    }

    function y() {
        return Object.keys(N)
    }

    function x(e) {
        return e = (e || "").toLowerCase(), N[e] || N[k[e]]
    }
    var w = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        N = {},
        k = {};
    return e.highlight = d, e.highlightAuto = u, e.fixMarkup = p, e.highlightBlock = f, e.configure = g, e.initHighlighting = b, e.initHighlightingOnLoad = m, e.ba = v, e.ca = y, e.da = x, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
    }, e.C = function(t, r, n) {
        var i = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, n || {});
        return i.c.push(e.PWM), i.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), i
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.METHOD_GUARD = {
        b: "\\.\\s*" + e.UIR,
        r: 0
    }, e
}), hljs.ba("bash", function(e) {
    var t = {
            cN: "variable",
            v: [{
                b: /\$[\w\d#@][\w\d_]*/
            }, {
                b: /\$\{(.*?)}/
            }]
        },
        r = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [e.BE, t, {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [e.BE]
            }]
        },
        n = {
            cN: "string",
            b: /'/,
            e: /'/
        };
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, r, n, t]
    }
}), hljs.ba("xml", function(e) {
    var t = "[A-Za-z0-9\\._:-]+",
        r = {
            eW: !0,
            i: /</,
            r: 0,
            c: [{
                cN: "attr",
                b: t,
                r: 0
            }, {
                b: /=\s*/,
                r: 0,
                c: [{
                    cN: "string",
                    endsParent: !0,
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, e.C("<!--", "-->", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            b: /<\?(php)?/,
            e: /\?>/,
            sL: "php",
            c: [{
                b: "/\\*",
                e: "\\*/",
                skip: !0
            }]
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [r],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [r],
            starts: {
                e: "</script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, {
            cN: "meta",
            v: [{
                b: /<\?xml/,
                e: /\?>/,
                r: 10
            }, {
                b: /<\?\w+/,
                e: /\?>/
            }]
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, r]
        }]
    }
}), hljs.ba("apache", function(e) {
    var t = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", t]
                }, t, e.QSM]
            }
        }],
        i: /\S/
    }
}), hljs.ba("java", function(e) {
    var t = e.UIR + "(<" + e.UIR + "(\\s*,\\s*" + e.UIR + ")*>)?",
        r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports",
        n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        i = {
            cN: "number",
            b: n,
            r: 0
        };
    return {
        aliases: ["jsp"],
        k: r,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: r,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: r,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, i, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}), hljs.ba("perl", function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        r = {
            cN: "subst",
            b: "[$@]\\{",
            e: "\\}",
            k: t
        },
        n = {
            b: "->{",
            e: "}"
        },
        i = {
            v: [{
                b: /\$\d/
            }, {
                b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
            }, {
                b: /[\$%@][^\s\w{]/,
                r: 0
            }]
        },
        a = [e.BE, r, i],
        s = [i, e.HCM, e.C("^\\=\\w", "\\=cut", {
            eW: !0
        }), n, {
            cN: "string",
            c: a,
            v: [{
                b: "q[qwxr]?\\s*\\(",
                e: "\\)",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\[",
                e: "\\]",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\{",
                e: "\\}",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\|",
                e: "\\|",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\<",
                e: "\\>",
                r: 5
            }, {
                b: "qw\\s+q",
                e: "q",
                r: 5
            }, {
                b: "'",
                e: "'",
                c: [e.BE]
            }, {
                b: '"',
                e: '"'
            }, {
                b: "`",
                e: "`",
                c: [e.BE]
            }, {
                b: "{\\w+}",
                c: [],
                r: 0
            }, {
                b: "-?\\w+\\s*\\=\\>",
                c: [],
                r: 0
            }]
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            k: "split return print reverse grep",
            r: 0,
            c: [e.HCM, {
                cN: "regexp",
                b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                r: 10
            }, {
                cN: "regexp",
                b: "(m|qr)?/",
                e: "/[a-z]*",
                c: [e.BE],
                r: 0
            }]
        }, {
            cN: "function",
            bK: "sub",
            e: "(\\s*\\(.*?\\))?[;{]",
            eE: !0,
            r: 5,
            c: [e.TM]
        }, {
            b: "-\\w\\b",
            r: 0
        }, {
            b: "^__DATA__$",
            e: "^__END__$",
            sL: "mojolicious",
            c: [{
                b: "^@@.*",
                e: "$",
                cN: "comment"
            }]
        }];
    return r.c = s, n.c = s, {
        aliases: ["pl", "pm"],
        l: /[\w\.]+/,
        k: t,
        c: s
    }
}), hljs.ba("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        r = {
            b: /[A-Z\_\.\-]+\s*:/,
            rB: !0,
            e: ";",
            eW: !0,
            c: [{
                cN: "attribute",
                b: /\S/,
                e: ":",
                eE: !0,
                starts: {
                    eW: !0,
                    eE: !0,
                    c: [{
                        b: /[\w-]+\(/,
                        rB: !0,
                        c: [{
                            cN: "built_in",
                            b: /[\w-]+/
                        }, {
                            b: /\(/,
                            e: /\)/,
                            c: [e.ASM, e.QSM]
                        }]
                    }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                        cN: "number",
                        b: "#[0-9A-Fa-f]+"
                    }, {
                        cN: "meta",
                        b: "!important"
                    }]
                }
            }]
        };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            i: /:/,
            c: [{
                cN: "keyword",
                b: /\w+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: t,
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, r]
        }]
    }
}), hljs.ba("ruby", function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = {
            keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            literal: "true false nil"
        },
        n = {
            cN: "doctag",
            b: "@[A-Za-z]+"
        },
        i = {
            b: "#<",
            e: ">"
        },
        a = [e.C("#", "$", {
            c: [n]
        }), e.C("^\\=begin", "^\\=end", {
            c: [n],
            r: 10
        }), e.C("^__END__", "\\n$")],
        s = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            k: r
        },
        o = {
            cN: "string",
            c: [e.BE, s],
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }, {
                b: /`/,
                e: /`/
            }, {
                b: "%[qQwWx]?\\(",
                e: "\\)"
            }, {
                b: "%[qQwWx]?\\[",
                e: "\\]"
            }, {
                b: "%[qQwWx]?{",
                e: "}"
            }, {
                b: "%[qQwWx]?<",
                e: ">"
            }, {
                b: "%[qQwWx]?/",
                e: "/"
            }, {
                b: "%[qQwWx]?%",
                e: "%"
            }, {
                b: "%[qQwWx]?-",
                e: "-"
            }, {
                b: "%[qQwWx]?\\|",
                e: "\\|"
            }, {
                b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
            }]
        },
        c = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            endsParent: !0,
            k: r
        },
        l = [o, i, {
            cN: "class",
            bK: "class module",
            e: "$|;",
            i: /=/,
            c: [e.inherit(e.TM, {
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
            }), {
                b: "<\\s*",
                c: [{
                    b: "(" + e.IR + "::)?" + e.IR
                }]
            }].concat(a)
        }, {
            cN: "function",
            bK: "def",
            e: "$|;",
            c: [e.inherit(e.TM, {
                b: t
            }), c].concat(a)
        }, {
            b: e.IR + "::"
        }, {
            cN: "symbol",
            b: e.UIR + "(\\!|\\?)?:",
            r: 0
        }, {
            cN: "symbol",
            b: ":(?!\\s)",
            c: [o, {
                b: t
            }],
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            cN: "params",
            b: /\|/,
            e: /\|/,
            k: r
        }, {
            b: "(" + e.RSR + ")\\s*",
            c: [i, {
                cN: "regexp",
                c: [e.BE, s],
                i: /\n/,
                v: [{
                    b: "/",
                    e: "/[a-z]*"
                }, {
                    b: "%r{",
                    e: "}[a-z]*"
                }, {
                    b: "%r\\(",
                    e: "\\)[a-z]*"
                }, {
                    b: "%r!",
                    e: "![a-z]*"
                }, {
                    b: "%r\\[",
                    e: "\\][a-z]*"
                }]
            }].concat(a),
            r: 0
        }].concat(a);
    s.c = l, c.c = l;
    var d = "[>?]>",
        u = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        h = [{
            b: /^\s*=>/,
            starts: {
                e: "$",
                c: l
            }
        }, {
            cN: "meta",
            b: "^(" + d + "|" + u + "|" + p + ")",
            starts: {
                e: "$",
                c: l
            }
        }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        i: /\/\*/,
        c: a.concat(h).concat(l)
    }
}), hljs.ba("coffeescript", function(e) {
    var t = {
            keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
            literal: "true false null undefined yes no on off",
            built_in: "npm require console print module global window document"
        },
        r = "[A-Za-z$_][0-9A-Za-z$_]*",
        n = {
            cN: "subst",
            b: /#\{/,
            e: /}/,
            k: t
        },
        i = [e.BNM, e.inherit(e.CNM, {
            starts: {
                e: "(\\s*/)?",
                r: 0
            }
        }), {
            cN: "string",
            v: [{
                b: /'''/,
                e: /'''/,
                c: [e.BE]
            }, {
                b: /'/,
                e: /'/,
                c: [e.BE]
            }, {
                b: /"""/,
                e: /"""/,
                c: [e.BE, n]
            }, {
                b: /"/,
                e: /"/,
                c: [e.BE, n]
            }]
        }, {
            cN: "regexp",
            v: [{
                b: "///",
                e: "///",
                c: [n, e.HCM]
            }, {
                b: "//[gim]*",
                r: 0
            }, {
                b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
            }]
        }, {
            b: "@" + r
        }, {
            b: "`",
            e: "`",
            eB: !0,
            eE: !0,
            sL: "javascript"
        }];
    n.c = i;
    var a = e.inherit(e.TM, {
            b: r
        }),
        s = "(\\(.*\\))?\\s*\\B[-=]>",
        o = {
            cN: "params",
            b: "\\([^\\(]",
            rB: !0,
            c: [{
                b: /\(/,
                e: /\)/,
                k: t,
                c: ["self"].concat(i)
            }]
        };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: i.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + r + "\\s*=\\s*" + s,
            e: "[-=]>",
            rB: !0,
            c: [a, o]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: s,
                e: "[-=]>",
                rB: !0,
                c: [o]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [a]
            }, a]
        }, {
            b: r + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}), hljs.ba("http", function(e) {
    var t = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + t,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + t + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: t
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
}), hljs.ba("makefile", function(e) {
    var t = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
    };
    return {
        aliases: ["mk", "mak"],
        c: [e.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [t]
                }
            }
        }, {
            cN: "section",
            b: /^[\w]+:\s*$/
        }, {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            r: 0,
            c: [e.QSM, t]
        }]
    }
}), hljs.ba("cs", function(e) {
    var t = {
            keyword: "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
            literal: "null false true"
        },
        r = e.IR + "(<" + e.IR + ">)?(\\[\\])?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "<!--|-->"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, e.ASM, e.QSM, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            bK: "new return throw await",
            r: 0
        }, {
            cN: "function",
            b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
}), hljs.ba("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*#]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            l: /[\w\.]+/,
            k: {
                keyword: "",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}), hljs.ba("python", function(e) {
    var t = {
            cN: "meta",
            b: /^(>>>|\.\.\.) /
        },
        r = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: /(u|b)?r?'''/,
                e: /'''/,
                c: [t],
                r: 10
            }, {
                b: /(u|b)?r?"""/,
                e: /"""/,
                c: [t],
                r: 10
            }, {
                b: /(u|r|ur)'/,
                e: /'/,
                r: 10
            }, {
                b: /(u|r|ur)"/,
                e: /"/,
                r: 10
            }, {
                b: /(b|br)'/,
                e: /'/
            }, {
                b: /(b|br)"/,
                e: /"/
            }, e.ASM, e.QSM]
        },
        n = {
            cN: "number",
            r: 0,
            v: [{
                b: e.BNR + "[lLjJ]?"
            }, {
                b: "\\b(0o[0-7]+)[lLjJ]?"
            }, {
                b: e.CNR + "[lLjJ]?"
            }]
        },
        i = {
            cN: "params",
            b: /\(/,
            e: /\)/,
            c: ["self", t, n, r]
        };
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, n, r, e.HCM, {
            v: [{
                cN: "function",
                bK: "def",
                r: 10
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, i, {
                b: /->/,
                eW: !0,
                k: "None"
            }]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}), hljs.ba("objectivec", function(e) {
    var t = {
            cN: "built_in",
            b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"
        },
        r = {
            keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
            literal: "false true FALSE TRUE nil YES NO NULL",
            built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        n = /[a-zA-Z@][a-zA-Z0-9_]*/,
        i = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: r,
        l: n,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{
                b: '@"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: "'",
                e: "[^\\\\]'",
                i: "[^\\\\][^']"
            }]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            c: [{
                cN: "meta-string",
                v: [{
                    b: '"',
                    e: '"'
                }, {
                    b: "<",
                    e: ">"
                }]
            }]
        }, {
            cN: "class",
            b: "(" + i.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: i,
            l: n,
            c: [e.UTM]
        }, {
            b: "\\." + e.UIR,
            r: 0
        }]
    }
}), hljs.ba("php", function(e) {
    var t = {
            b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
        },
        r = {
            cN: "meta",
            b: /<\?(php)?|\?>/
        },
        n = {
            cN: "string",
            c: [e.BE, r],
            v: [{
                b: 'b"',
                e: '"'
            }, {
                b: "b'",
                e: "'"
            }, e.inherit(e.ASM, {
                i: null
            }), e.inherit(e.QSM, {
                i: null
            })]
        },
        i = {
            v: [e.BNM, e.CNM]
        };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.HCM, e.C("//", "$", {
            c: [r]
        }), e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, r, t, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBCM, n, i]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, n, i]
    }
}), hljs.ba("javascript", function(e) {
    return {
        aliases: ["js", "jsx"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, {
            cN: "meta",
            b: /^#!/,
            e: /$/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: /(\/\w+|\w+\/)>/,
                sL: "xml",
                c: [{
                    b: /<\w+\s*\/>/,
                    skip: !0
                }, {
                    b: /<\w+/,
                    e: /(\/\w+|\w+\/)>/,
                    skip: !0,
                    c: ["self"]
                }]
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM]
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, e.METHOD_GUARD, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#(?!!)/
    }
}), hljs.ba("json", function(e) {
    var t = {
            literal: "true false null"
        },
        r = [e.QSM, e.CNM],
        n = {
            e: ",",
            eW: !0,
            eE: !0,
            c: r,
            k: t
        },
        i = {
            b: "{",
            e: "}",
            c: [{
                cN: "attr",
                b: /"/,
                e: /"/,
                c: [e.BE],
                i: "\\n"
            }, e.inherit(n, {
                b: /:/
            })],
            i: "\\S"
        },
        a = {
            b: "\\[",
            e: "\\]",
            c: [e.inherit(n)],
            i: "\\S"
        };
    return r.splice(r.length, 0, i, a), {
        c: r,
        k: t,
        i: "\\S"
    }
}), hljs.ba("cpp", function(e) {
    var t = {
            cN: "keyword",
            b: "\\b[a-z\\d_]*_t\\b"
        },
        r = {
            cN: "string",
            v: [e.inherit(e.QSM, {
                b: '((u8?|U)|L)?"'
            }), {
                b: '(u8?|U)?R"',
                e: '"',
                c: [e.BE]
            }, {
                b: "'\\\\?.",
                e: "'",
                i: "."
            }]
        },
        n = {
            cN: "number",
            v: [{
                b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
            }, {
                b: e.CNR
            }],
            r: 0
        },
        i = {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, {
                bK: "include",
                e: "$",
                k: {
                    "meta-keyword": "include"
                },
                c: [e.inherit(r, {
                    cN: "meta-string"
                }), {
                    cN: "meta-string",
                    b: "<",
                    e: ">",
                    i: "\\n"
                }]
            }, r, e.CLCM, e.CBCM]
        },
        a = e.IR + "\\s*\\(",
        s = {
            keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
            built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
            literal: "true false nullptr NULL"
        },
        o = [t, e.CLCM, e.CBCM, n, r];
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: s,
        i: "</",
        c: o.concat([i, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: s,
            c: ["self", t]
        }, {
            b: e.IR + "::",
            k: s
        }, {
            v: [{
                b: /=/,
                e: /;/
            }, {
                b: /\(/,
                e: /\)/
            }, {
                bK: "new throw return else",
                e: /;/
            }],
            k: s,
            c: o.concat([{
                b: /\(/,
                e: /\)/,
                c: o.concat(["self"]),
                r: 0
            }]),
            r: 0
        }, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + a,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: s,
            i: /[^\w\s\*&]/,
            c: [{
                b: a,
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: s,
                r: 0,
                c: [e.CLCM, e.CBCM, r, n]
            }, e.CLCM, e.CBCM, i]
        }])
    }
});
