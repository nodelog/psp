var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0, function () {
    function e(e) {
        function t(e) {
            var t = e.charCodeAt(0);
            if (92 !== t)return t;
            var n = e.charAt(1);
            return(t = d[n]) ? t : n >= "0" && "7" >= n ? parseInt(e.substring(1), 8) : "u" === n || "x" === n ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
        }

        function n(e) {
            return 32 > e ? (16 > e ? "\\x0" : "\\x") + e.toString(16) : (e = String.fromCharCode(e), ("\\" === e || "-" === e || "[" === e || "]" === e) && (e = "\\" + e), e)
        }

        function r(e) {
            for (var r = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), e = [], a = [], s = "^" === r[0], i = s ? 1 : 0, o = r.length; o > i; ++i) {
                var l = r[i];
                if (/\\[bdsw]/i.test(l))e.push(l); else {
                    var c, l = t(l);
                    o > i + 2 && "-" === r[i + 1] ? (c = t(r[i + 2]), i += 2) : c = l, a.push([l, c]), 65 > c || l > 122 || (65 > c || l > 90 || a.push([32 | Math.max(65, l), 32 | Math.min(c, 90)]), 97 > c || l > 122 || a.push([-33 & Math.max(97, l), -33 & Math.min(c, 122)]))
                }
            }
            for (a.sort(function (e, t) {
                return e[0] - t[0] || t[1] - e[1]
            }), r = [], l = [0 / 0, 0 / 0], i = 0; i < a.length; ++i)o = a[i], o[0] <= l[1] + 1 ? l[1] = Math.max(l[1], o[1]) : r.push(l = o);
            for (a = ["["], s && a.push("^"), a.push.apply(a, e), i = 0; i < r.length; ++i)o = r[i], a.push(n(o[0])), o[1] > o[0] && (o[1] + 1 > o[0] && a.push("-"), a.push(n(o[1])));
            return a.push("]"), a.join("")
        }

        function a(e) {
            for (var t = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), n = t.length, a = [], o = 0, l = 0; n > o; ++o) {
                var c = t[o];
                "(" === c ? ++l : "\\" === c.charAt(0) && (c = +c.substring(1)) && l >= c && (a[c] = -1)
            }
            for (o = 1; o < a.length; ++o)-1 === a[o] && (a[o] = ++s);
            for (l = o = 0; n > o; ++o)c = t[o], "(" === c ? (++l, void 0 === a[l] && (t[o] = "(?:")) : "\\" === c.charAt(0) && (c = +c.substring(1)) && l >= c && (t[o] = "\\" + a[l]);
            for (l = o = 0; n > o; ++o)"^" === t[o] && "^" !== t[o + 1] && (t[o] = "");
            if (e.ignoreCase && i)for (o = 0; n > o; ++o)c = t[o], e = c.charAt(0), c.length >= 2 && "[" === e ? t[o] = r(c) : "\\" !== e && (t[o] = c.replace(/[A-Za-z]/g, function (e) {
                return e = e.charCodeAt(0), "[" + String.fromCharCode(-33 & e, 32 | e) + "]"
            }));
            return t.join("")
        }

        for (var s = 0, i = !1, o = !1, l = 0, c = e.length; c > l; ++l) {
            var u = e[l];
            if (u.ignoreCase)o = !0; else if (/[a-z]/i.test(u.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                i = !0, o = !1;
                break
            }
        }
        for (var d = {b: 8, t: 9, n: 10, v: 11, f: 12, r: 13}, p = [], l = 0, c = e.length; c > l; ++l) {
            if (u = e[l], u.global || u.multiline)throw Error("" + u);
            p.push("(?:" + a(u) + ")")
        }
        return RegExp(p.join("|"), o ? "gi" : "g")
    }

    function t(e) {
        function t(e) {
            switch (e.nodeType) {
                case 1:
                    if (r.test(e.className))break;
                    for (var n = e.firstChild; n; n = n.nextSibling)t(n);
                    n = e.nodeName, ("BR" === n || "LI" === n) && (a[o] = "\n", i[o << 1] = s++, i[o++ << 1 | 1] = e);
                    break;
                case 3:
                case 4:
                    n = e.nodeValue, n.length && (n = l ? n.replace(/\r\n?/g, "\n") : n.replace(/[\t\n\r ]+/g, " "), a[o] = n, i[o << 1] = s, s += n.length, i[o++ << 1 | 1] = e)
            }
        }

        var n, r = /(?:^|\s)nocode(?:\s|$)/, a = [], s = 0, i = [], o = 0;
        e.currentStyle ? n = e.currentStyle.whiteSpace : window.getComputedStyle && (n = document.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var l = n && "pre" === n.substring(0, 3);
        return t(e), {a: a.join("").replace(/\n$/, ""), c: i}
    }

    function n(e, t, n, r) {
        t && (e = {a: t, d: e}, n(e), r.push.apply(r, e.e))
    }

    function r(t, r) {
        function a(e) {
            for (var t = e.d, c = [t, "pln"], u = 0, d = e.a.match(s) || [], p = {}, h = 0, f = d.length; f > h; ++h) {
                var g, m = d[h], y = p[m], v = void 0;
                if ("string" == typeof y)g = !1; else {
                    var w = i[m.charAt(0)];
                    if (w)v = m.match(w[1]), y = w[0]; else {
                        for (g = 0; l > g; ++g)if (w = r[g], v = m.match(w[1])) {
                            y = w[0];
                            break
                        }
                        v || (y = "pln")
                    }
                    !(g = y.length >= 5 && "lang-" === y.substring(0, 5)) || v && "string" == typeof v[1] || (g = !1, y = "src"), g || (p[m] = y)
                }
                if (w = u, u += m.length, g) {
                    g = v[1];
                    var b = m.indexOf(g), S = b + g.length;
                    v[2] && (S = m.length - v[2].length, b = S - g.length), y = y.substring(5), n(t + w, m.substring(0, b), a, c), n(t + w + b, g, o(y, g), c), n(t + w + S, m.substring(S), a, c)
                } else c.push(t + w, y)
            }
            e.e = c
        }

        var s, i = {};
        !function () {
            for (var n = t.concat(r), a = [], o = {}, l = 0, c = n.length; c > l; ++l) {
                var u = n[l], d = u[3];
                if (d)for (var p = d.length; --p >= 0;)i[d.charAt(p)] = u;
                u = u[1], d = "" + u, o.hasOwnProperty(d) || (a.push(u), o[d] = q)
            }
            a.push(/[\S\s]/), s = e(a)
        }();
        var l = r.length;
        return a
    }

    function a(e) {
        var t = [], n = [];
        e.tripleQuotedStrings ? t.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : e.multiLineStrings ? t.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : t.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]), e.verbatimStrings && n.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
        var a = e.hashComments;
        return a && (e.cStyleComments ? (a > 1 ? t.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : t.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), n.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : t.push(["com", /^#[^\n\r]*/, q, "#"])), e.cStyleComments && (n.push(["com", /^\/\/[^\n\r]*/, q]), n.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q])), e.regexLiterals && n.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]), (a = e.types) && n.push(["typ", a]), e = ("" + e.keywords).replace(/^ | $/g, ""), e.length && n.push(["kwd", RegExp("^(?:" + e.replace(/[\s,]+/g, "|") + ")\\b"), q]), t.push(["pln", /^\s+/, q, " \r\n	 "]), n.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]), r(t, n)
    }

    function s(e, t) {
        function n(e) {
            switch (e.nodeType) {
                case 1:
                    if (s.test(e.className))break;
                    if ("BR" === e.nodeName)r(e), e.parentNode && e.parentNode.removeChild(e); else for (e = e.firstChild; e; e = e.nextSibling)n(e);
                    break;
                case 3:
                case 4:
                    if (l) {
                        var t = e.nodeValue, a = t.match(i);
                        if (a) {
                            var c = t.substring(0, a.index);
                            e.nodeValue = c, (t = t.substring(a.index + a[0].length)) && e.parentNode.insertBefore(o.createTextNode(t), e.nextSibling), r(e), c || e.parentNode.removeChild(e)
                        }
                    }
            }
        }

        function r(e) {
            function t(e, n) {
                var r = n ? e.cloneNode(!1) : e, a = e.parentNode;
                if (a) {
                    var a = t(a, 1), s = e.nextSibling;
                    a.appendChild(r);
                    for (var i = s; i; i = s)s = i.nextSibling, a.appendChild(i)
                }
                return r
            }

            for (; !e.nextSibling;)if (e = e.parentNode, !e)return;
            for (var n, e = t(e.nextSibling, 0); (n = e.parentNode) && 1 === n.nodeType;)e = n;
            c.push(e)
        }

        var a, s = /(?:^|\s)nocode(?:\s|$)/, i = /\r\n?|\n/, o = e.ownerDocument;
        e.currentStyle ? a = e.currentStyle.whiteSpace : window.getComputedStyle && (a = o.defaultView.getComputedStyle(e, q).getPropertyValue("white-space"));
        var l = a && "pre" === a.substring(0, 3);
        for (a = o.createElement("LI"); e.firstChild;)a.appendChild(e.firstChild);
        for (var c = [a], u = 0; u < c.length; ++u)n(c[u]);
        t === (0 | t) && c[0].setAttribute("value", t);
        var d = o.createElement("OL");
        d.className = "linenums";
        for (var p = Math.max(0, t - 1 | 0) || 0, u = 0, h = c.length; h > u; ++u)a = c[u], a.className = "L" + (u + p) % 10, a.firstChild || a.appendChild(o.createTextNode(" ")), d.appendChild(a);
        e.appendChild(d)
    }

    function i(e, t) {
        for (var n = t.length; --n >= 0;) {
            var r = t[n];
            w.hasOwnProperty(r) ? window.console && console.warn("cannot override language handler %s", r) : w[r] = e
        }
    }

    function o(e, t) {
        return e && w.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), w[e]
    }

    function l(e) {
        var n = e.g;
        try {
            var r = t(e.h), a = r.a;
            e.a = a, e.c = r.c, e.d = 0, o(n, a)(e);
            var s = /\bMSIE\b/.test(navigator.userAgent), n = /\n/g, i = e.a, l = i.length, r = 0, c = e.c, u = c.length, a = 0, d = e.e, p = d.length, e = 0;
            d[p] = l;
            var h, f;
            for (f = h = 0; p > f;)d[f] !== d[f + 2] ? (d[h++] = d[f++], d[h++] = d[f++]) : f += 2;
            for (p = h, f = h = 0; p > f;) {
                for (var g = d[f], m = d[f + 1], y = f + 2; p >= y + 2 && d[y + 1] === m;)y += 2;
                d[h++] = g, d[h++] = m, f = y
            }
            for (d.length = h; u > a;) {
                var v, w = c[a + 2] || l, b = d[e + 2] || l, y = Math.min(w, b), S = c[a + 1];
                if (1 !== S.nodeType && (v = i.substring(r, y))) {
                    s && (v = v.replace(n, "\r")), S.nodeValue = v;
                    var x = S.ownerDocument, N = x.createElement("SPAN");
                    N.className = d[e + 1];
                    var C = S.parentNode;
                    C.replaceChild(N, S), N.appendChild(S), w > r && (c[a + 1] = S = x.createTextNode(i.substring(y, w)), C.insertBefore(S, N.nextSibling))
                }
                r = y, r >= w && (a += 2), r >= b && (e += 2)
            }
        } catch (k) {
            "console"in window && console.log(k && k.stack ? k.stack : k)
        }
    }

    var c = ["break,continue,do,else,for,if,return,while"], u = [
        [c, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
    ], d = [u, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], p = [u, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"], h = [p, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"], u = [u, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"], f = [c, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], g = [c, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], c = [c, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], m = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/, y = /\S/, v = a({keywords: [d, h, u, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + f, g, c], hashComments: !0, cStyleComments: !0, multiLineStrings: !0, regexLiterals: !0}), w = {};
    i(v, ["default-code"]), i(r([], [
        ["pln", /^[^<?]+/],
        ["dec", /^<!\w[^>]*(?:>|$)/],
        ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
        ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
        ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
        ["pun", /^(?:<[%?]|[%?]>)/],
        ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
        ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
        ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
        ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
    ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), i(r([
        ["pln", /^\s+/, q, " 	\r\n"],
        ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
    ], [
        ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
        ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
        ["pun", /^[/<->]+/],
        ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
        ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
        ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
        ["lang-css", /^style\s*=\s*"([^"]+)"/i],
        ["lang-css", /^style\s*=\s*'([^']+)'/i],
        ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
    ]), ["in.tag"]), i(r([], [
        ["atv", /^[\S\s]+/]
    ]), ["uq.val"]), i(a({keywords: d, hashComments: !0, cStyleComments: !0, types: m}), ["c", "cc", "cpp", "cxx", "cyc", "m"]), i(a({keywords: "null,true,false"}), ["json"]), i(a({keywords: h, hashComments: !0, cStyleComments: !0, verbatimStrings: !0, types: m}), ["cs"]), i(a({keywords: p, cStyleComments: !0}), ["java"]), i(a({keywords: c, hashComments: !0, multiLineStrings: !0}), ["bsh", "csh", "sh"]), i(a({keywords: f, hashComments: !0, multiLineStrings: !0, tripleQuotedStrings: !0}), ["cv", "py"]), i(a({keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", hashComments: !0, multiLineStrings: !0, regexLiterals: !0}), ["perl", "pl", "pm"]), i(a({keywords: g, hashComments: !0, multiLineStrings: !0, regexLiterals: !0}), ["rb"]), i(a({keywords: u, cStyleComments: !0, regexLiterals: !0}), ["js"]), i(a({keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes", hashComments: 3, cStyleComments: !0, multilineStrings: !0, tripleQuotedStrings: !0, regexLiterals: !0}), ["coffee"]), i(r([], [
        ["str", /^[\S\s]+/]
    ]), ["regex"]), window.prettyPrintOne = function (e, t, n) {
        var r = document.createElement("PRE");
        return r.innerHTML = e, n && s(r, n), l({g: t, i: n, h: r}), r.innerHTML
    }, window.prettyPrint = function (e) {
        function t() {
            for (var n = window.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : 1 / 0; d < r.length && c.now() < n; d++) {
                var a = r[d], i = a.className;
                if (i.indexOf("prettyprint") >= 0) {
                    var o, h, i = i.match(p);
                    if (h = !i) {
                        h = a;
                        for (var f = void 0, g = h.firstChild; g; g = g.nextSibling)var m = g.nodeType, f = 1 === m ? f ? h : g : 3 === m ? y.test(g.nodeValue) ? h : f : f;
                        h = (o = f === h ? void 0 : f) && "CODE" === o.tagName
                    }
                    for (h && (i = o.className.match(p)), i && (i = i[1]), h = !1, f = a.parentNode; f; f = f.parentNode)if (("pre" === f.tagName || "code" === f.tagName || "xmp" === f.tagName) && f.className && f.className.indexOf("prettyprint") >= 0) {
                        h = !0;
                        break
                    }
                    h || ((h = (h = a.className.match(/\blinenums\b(?::(\d+))?/)) ? h[1] && h[1].length ? +h[1] : !0 : !1) && s(a, h), u = {g: i, h: a, i: h}, l(u))
                }
            }
            d < r.length ? setTimeout(t, 250) : e && e()
        }

        for (var n = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], r = [], a = 0; a < n.length; ++a)for (var i = 0, o = n[a].length; o > i; ++i)r.push(n[a][i]);
        var n = q, c = Date;
        c.now || (c = {now: function () {
            return+new Date
        }});
        var u, d = 0, p = /\blang(?:uage)?-([\w.]+)(?!\S)/;
        t()
    }, window.PR = {createSimpleLexer: r, registerLangHandler: i, sourceDecorator: a, PR_ATTRIB_NAME: "atn", PR_ATTRIB_VALUE: "atv", PR_COMMENT: "com", PR_DECLARATION: "dec", PR_KEYWORD: "kwd", PR_LITERAL: "lit", PR_NOCODE: "nocode", PR_PLAIN: "pln", PR_PUNCTUATION: "pun", PR_SOURCE: "src", PR_STRING: "str", PR_TAG: "tag", PR_TYPE: "typ"}
}();
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = et.type(e);
        return"function" === n || et.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (et.isFunction(t))return et.grep(e, function (e, r) {
            return!!t.call(e, r, e) !== n
        });
        if (t.nodeType)return et.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (at.test(t))return et.filter(t, e, n);
            t = et.filter(t, e)
        }
        return et.grep(e, function (e) {
            return U.call(t, e) >= 0 !== n
        })
    }

    function i(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function o(e) {
        var t = ht[e] = {};
        return et.each(e.match(dt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        K.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1), et.ready()
    }

    function a() {
        Object.defineProperty(this.cache = {}, 0, {get: function () {
            return{}
        }}), this.expando = et.expando + Math.random()
    }

    function u(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)if (r = "data-" + t.replace(bt, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : xt.test(n) ? et.parseJSON(n) : n
            } catch (i) {
            }
            yt.set(e, t, n)
        } else n = void 0;
        return n
    }

    function l() {
        return!0
    }

    function c() {
        return!1
    }

    function f() {
        try {
            return K.activeElement
        } catch (e) {
        }
    }

    function p(e, t) {
        return et.nodeName(e, "table") && et.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function d(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function h(e) {
        var t = Pt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function g(e, t) {
        for (var n = 0, r = e.length; r > n; n++)vt.set(e[n], "globalEval", !t || vt.get(t[n], "globalEval"))
    }

    function m(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (vt.hasData(e) && (o = vt.access(e), s = vt.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l)for (n = 0, r = l[i].length; r > n; n++)et.event.add(t, i, l[i][n])
            }
            yt.hasData(e) && (a = yt.access(e), u = et.extend({}, a), yt.set(t, u))
        }
    }

    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && et.nodeName(e, t) ? et.merge([e], n) : n
    }

    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Nt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function x(t, n) {
        var r = et(n.createElement(t)).appendTo(n.body), i = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(r[0]).display : et.css(r[0], "display");
        return r.detach(), i
    }

    function b(e) {
        var t = K, n = $t[e];
        return n || (n = x(e, t), "none" !== n && n || (Wt = (Wt || et("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Wt[0].contentDocument, t.write(), t.close(), n = x(e, t), Wt.detach()), $t[e] = n), n
    }

    function w(e, t, n) {
        var r, i, o, s, a = e.style;
        return n = n || _t(e), n && (s = n.getPropertyValue(t) || n[t]), n && ("" !== s || et.contains(e.ownerDocument, e) || (s = et.style(e, t)), It.test(s) && Bt.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), void 0 !== s ? s + "" : s
    }

    function T(e, t) {
        return{get: function () {
            return e() ? (delete this.get, void 0) : (this.get = t).apply(this, arguments)
        }}
    }

    function C(e, t) {
        if (t in e)return t;
        for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Gt.length; i--;)if (t = Gt[i] + n, t in e)return t;
        return r
    }

    function N(e, t, n) {
        var r = zt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > o; o += 2)"margin" === n && (s += et.css(e, n + Tt[o], !0, i)), r ? ("content" === n && (s -= et.css(e, "padding" + Tt[o], !0, i)), "margin" !== n && (s -= et.css(e, "border" + Tt[o] + "Width", !0, i))) : (s += et.css(e, "padding" + Tt[o], !0, i), "padding" !== n && (s += et.css(e, "border" + Tt[o] + "Width", !0, i)));
        return s
    }

    function E(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = _t(e), s = "border-box" === et.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), It.test(i))return i;
            r = s && (J.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + k(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }

    function D(e, t) {
        for (var n, r, i, o = [], s = 0, a = e.length; a > s; s++)r = e[s], r.style && (o[s] = vt.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ct(r) && (o[s] = vt.access(r, "olddisplay", b(r.nodeName)))) : o[s] || (i = Ct(r), (n && "none" !== n || !i) && vt.set(r, "olddisplay", i ? n : et.css(r, "display"))));
        for (s = 0; a > s; s++)r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function j(e, t, n, r, i) {
        return new j.prototype.init(e, t, n, r, i)
    }

    function S() {
        return setTimeout(function () {
            Qt = void 0
        }), Qt = et.now()
    }

    function A(e, t) {
        var n, r = 0, i = {height: e};
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = Tt[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function L(e, t, n) {
        for (var r, i = (nn[t] || []).concat(nn["*"]), o = 0, s = i.length; s > o; o++)if (r = i[o].call(n, t, e))return r
    }

    function q(e, t, n) {
        var r, i, o, s, a, u, l, c = this, f = {}, p = e.style, d = e.nodeType && Ct(e), h = vt.get(e, "fxshow");
        n.queue || (a = et._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function () {
            a.unqueued || u()
        }), a.unqueued++, c.always(function () {
            c.always(function () {
                a.unqueued--, et.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = et.css(e, "display"), "none" === l && (l = b(e.nodeName)), "inline" === l && "none" === et.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], Kt.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (d ? "hide" : "show")) {
                if ("show" !== i || !h || void 0 === h[r])continue;
                d = !0
            }
            f[r] = h && h[r] || et.style(e, r)
        }
        if (!et.isEmptyObject(f)) {
            h ? "hidden"in h && (d = h.hidden) : h = vt.access(e, "fxshow", {}), o && (h.hidden = !d), d ? et(e).show() : c.done(function () {
                et(e).hide()
            }), c.done(function () {
                var t;
                vt.remove(e, "fxshow");
                for (t in f)et.style(e, t, f[t])
            });
            for (r in f)s = L(d ? h[r] : 0, r, c), r in h || (h[r] = s.start, d && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function H(e, t) {
        var n, r, i, o, s;
        for (n in e)if (r = et.camelCase(n), i = t[r], o = e[n], et.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = et.cssHooks[r], s && "expand"in s) {
            o = s.expand(o), delete e[r];
            for (n in o)n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    function O(e, t, n) {
        var r, i, o = 0, s = tn.length, a = et.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (i)return!1;
            for (var t = Qt || S(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, s = 0, u = l.tweens.length; u > s; s++)l.tweens[s].run(o);
            return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
        }, l = a.promise({elem: e, props: et.extend({}, t), opts: et.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: Qt || S(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = et.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
            return l.tweens.push(r), r
        }, stop: function (t) {
            var n = 0, r = t ? l.tweens.length : 0;
            if (i)return this;
            for (i = !0; r > n; n++)l.tweens[n].run(1);
            return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
        }}), c = l.props;
        for (H(c, l.opts.specialEasing); s > o; o++)if (r = tn[o].call(l, e, c, l.opts))return r;
        return et.map(c, L, l), et.isFunction(l.opts.start) && l.opts.start.call(e, l), et.fx.timer(et.extend(u, {elem: e, anim: l, queue: l.opts.queue})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function F(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(dt) || [];
            if (et.isFunction(n))for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function P(e, t, n, r) {
        function i(a) {
            var u;
            return o[a] = !0, et.each(e[a] || [], function (e, a) {
                var l = a(t, n, r);
                return"string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
            }), u
        }

        var o = {}, s = e === Tn;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function M(e, t) {
        var n, r, i = et.ajaxSettings.flatOptions || {};
        for (n in t)void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && et.extend(!0, e, r), e
    }

    function R(e, t, n) {
        for (var r, i, o, s, a = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (i in a)if (a[i] && a[i].test(r)) {
            u.unshift(i);
            break
        }
        if (u[0]in n)o = u[0]; else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }

    function W(e, t, n, r) {
        var i, o, s, a, u, l = {}, c = e.dataTypes.slice();
        if (c[1])for (s in e.converters)l[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())if ("*" === o)o = u; else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)for (i in l)if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"])t = s(t); else try {
                t = s(t)
            } catch (f) {
                return{state: "parsererror", error: s ? f : "No conversion from " + u + " to " + o}
            }
        }
        return{state: "success", data: t}
    }

    function $(e, t, n, r) {
        var i;
        if (et.isArray(t))et.each(t, function (t, i) {
            n || En.test(e) ? r(e, i) : $(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== et.type(t))r(e, t); else for (i in t)$(e + "[" + i + "]", t[i], n, r)
    }

    function B(e) {
        return et.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var I = [], _ = I.slice, X = I.concat, z = I.push, U = I.indexOf, V = {}, Y = V.toString, G = V.hasOwnProperty, Q = "".trim, J = {}, K = e.document, Z = "2.1.0", et = function (e, t) {
        return new et.fn.init(e, t)
    }, tt = /^-ms-/, nt = /-([\da-z])/gi, rt = function (e, t) {
        return t.toUpperCase()
    };
    et.fn = et.prototype = {jquery: Z, constructor: et, selector: "", length: 0, toArray: function () {
        return _.call(this)
    }, get: function (e) {
        return null != e ? 0 > e ? this[e + this.length] : this[e] : _.call(this)
    }, pushStack: function (e) {
        var t = et.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return et.each(this, e, t)
    }, map: function (e) {
        return this.pushStack(et.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, slice: function () {
        return this.pushStack(_.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: z, sort: I.sort, splice: I.splice}, et.extend = et.fn.extend = function () {
        var e, t, n, r, i, o, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || et.isFunction(s) || (s = {}), a === u && (s = this, a--); u > a; a++)if (null != (e = arguments[a]))for (t in e)n = s[t], r = e[t], s !== r && (l && r && (et.isPlainObject(r) || (i = et.isArray(r))) ? (i ? (i = !1, o = n && et.isArray(n) ? n : []) : o = n && et.isPlainObject(n) ? n : {}, s[t] = et.extend(l, o, r)) : void 0 !== r && (s[t] = r));
        return s
    }, et.extend({expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
        throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
        return"function" === et.type(e)
    }, isArray: Array.isArray, isWindow: function (e) {
        return null != e && e === e.window
    }, isNumeric: function (e) {
        return e - parseFloat(e) >= 0
    }, isPlainObject: function (e) {
        if ("object" !== et.type(e) || e.nodeType || et.isWindow(e))return!1;
        try {
            if (e.constructor && !G.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (t) {
            return!1
        }
        return!0
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, type: function (e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? V[Y.call(e)] || "object" : typeof e
    }, globalEval: function (e) {
        var t, n = eval;
        e = et.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
    }, camelCase: function (e) {
        return e.replace(tt, "ms-").replace(nt, rt)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, r) {
        var i, o = 0, s = e.length, a = n(e);
        if (r) {
            if (a)for (; s > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
        } else if (a)for (; s > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
        return e
    }, trim: function (e) {
        return null == e ? "" : Q.call(e)
    }, makeArray: function (e, t) {
        var r = t || [];
        return null != e && (n(Object(e)) ? et.merge(r, "string" == typeof e ? [e] : e) : z.call(r, e)), r
    }, inArray: function (e, t, n) {
        return null == t ? -1 : U.call(t, e, n)
    }, merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
        return e.length = i, e
    }, grep: function (e, t, n) {
        for (var r, i = [], o = 0, s = e.length, a = !n; s > o; o++)r = !t(e[o], o), r !== a && i.push(e[o]);
        return i
    }, map: function (e, t, r) {
        var i, o = 0, s = e.length, a = n(e), u = [];
        if (a)for (; s > o; o++)i = t(e[o], o, r), null != i && u.push(i); else for (o in e)i = t(e[o], o, r), null != i && u.push(i);
        return X.apply([], u)
    }, guid: 1, proxy: function (e, t) {
        var n, r, i;
        return"string" == typeof t && (n = e[t], t = e, e = n), et.isFunction(e) ? (r = _.call(arguments, 2), i = function () {
            return e.apply(t || this, r.concat(_.call(arguments)))
        }, i.guid = e.guid = e.guid || et.guid++, i) : void 0
    }, now: Date.now, support: J}), et.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    });
    var it = function (e) {
        function t(e, t, n, r) {
            var i, o, s, a, u, l, f, h, g, m;
            if ((t ? t.ownerDocument || t : $) !== q && L(t), t = t || q, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (a = t.nodeType) && 9 !== a)return[];
            if (O && !r) {
                if (i = yt.exec(e))if (s = i[1]) {
                    if (9 === a) {
                        if (o = t.getElementById(s), !o || !o.parentNode)return n;
                        if (o.id === s)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && R(t, o) && o.id === s)return n.push(o), n
                } else {
                    if (i[2])return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = i[3]) && C.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(s)), n
                }
                if (C.qsa && (!F || !F.test(e))) {
                    if (h = f = W, g = t, m = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (l = p(e), (f = t.getAttribute("id")) ? h = f.replace(bt, "\\$&") : t.setAttribute("id", h), h = "[id='" + h + "'] ", u = l.length; u--;)l[u] = h + d(l[u]);
                        g = xt.test(e) && c(t.parentNode) || t, m = l.join(",")
                    }
                    if (m)try {
                        return Z.apply(n, g.querySelectorAll(m)), n
                    } catch (v) {
                    } finally {
                        f || t.removeAttribute("id")
                    }
                }
            }
            return w(e.replace(ut, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > N.cacheLength && delete e[t.shift()], e[n + " "] = r
            }

            var t = [];
            return e
        }

        function r(e) {
            return e[W] = !0, e
        }

        function i(e) {
            var t = q.createElement("div");
            try {
                return!!e(t)
            } catch (n) {
                return!1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;)N.attrHandle[n[r]] = t
        }

        function s(e, t) {
            var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (r)return r;
            if (n)for (; n = n.nextSibling;)if (n === t)return-1;
            return e ? 1 : -1
        }

        function a(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return"input" === n && t.type === e
            }
        }

        function u(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return("input" === n || "button" === n) && t.type === e
            }
        }

        function l(e) {
            return r(function (t) {
                return t = +t, r(function (n, r) {
                    for (var i, o = e([], n.length, t), s = o.length; s--;)n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && typeof e.getElementsByTagName !== V && e
        }

        function f() {
        }

        function p(e, n) {
            var r, i, o, s, a, u, l, c = X[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (a = e, u = [], l = N.preFilter; a;) {
                (!r || (i = lt.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])), r = !1, (i = ct.exec(a)) && (r = i.shift(), o.push({value: r, type: i[0].replace(ut, " ")}), a = a.slice(r.length));
                for (s in N.filter)!(i = ht[s].exec(a)) || l[s] && !(i = l[s](i)) || (r = i.shift(), o.push({value: r, type: s, matches: i}), a = a.slice(r.length));
                if (!r)break
            }
            return n ? a.length : a ? t.error(e) : X(e, u).slice(0)
        }

        function d(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
            return r
        }

        function h(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, o = I++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
            } : function (t, n, s) {
                var a, u, l = [B, o];
                if (s) {
                    for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, s))return!0
                } else for (; t = t[r];)if (1 === t.nodeType || i) {
                    if (u = t[W] || (t[W] = {}), (a = u[r]) && a[0] === B && a[1] === o)return l[2] = a[2];
                    if (u[r] = l, l[2] = e(t, n, s))return!0
                }
            }
        }

        function g(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;)if (!e[i](t, n, r))return!1;
                return!0
            } : e[0]
        }

        function m(e, t, n, r, i) {
            for (var o, s = [], a = 0, u = e.length, l = null != t; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
            return s
        }

        function v(e, t, n, i, o, s) {
            return i && !i[W] && (i = v(i)), o && !o[W] && (o = v(o, s)), r(function (r, s, a, u) {
                var l, c, f, p = [], d = [], h = s.length, g = r || b(t || "*", a.nodeType ? [a] : a, []), v = !e || !r && t ? g : m(g, p, e, a, u), y = n ? o || (r ? e : h || i) ? [] : s : v;
                if (n && n(v, y, a, u), i)for (l = m(y, d), i(l, [], a, u), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !(v[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push(v[c] = f);
                            o(null, y = [], l, u)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = o ? tt.call(r, f) : p[c]) > -1 && (r[l] = !(s[l] = f))
                    }
                } else y = m(y === s ? y.splice(h, y.length) : y), o ? o(null, s, y, u) : Z.apply(s, y)
            })
        }

        function y(e) {
            for (var t, n, r, i = e.length, o = N.relative[e[0].type], s = o || N.relative[" "], a = o ? 1 : 0, u = h(function (e) {
                return e === t
            }, s, !0), l = h(function (e) {
                return tt.call(t, e) > -1
            }, s, !0), c = [function (e, n, r) {
                return!o && (r || n !== j) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
            }]; i > a; a++)if (n = N.relative[e[a].type])c = [h(g(c), n)]; else {
                if (n = N.filter[e[a].type].apply(null, e[a].matches), n[W]) {
                    for (r = ++a; i > r && !N.relative[e[r].type]; r++);
                    return v(a > 1 && g(c), a > 1 && d(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(ut, "$1"), n, r > a && y(e.slice(a, r)), i > r && y(e = e.slice(r)), i > r && d(e))
                }
                c.push(n)
            }
            return g(c)
        }

        function x(e, n) {
            var i = n.length > 0, o = e.length > 0, s = function (r, s, a, u, l) {
                var c, f, p, d = 0, h = "0", g = r && [], v = [], y = j, x = r || o && N.find.TAG("*", l), b = B += null == y ? 1 : Math.random() || .1, w = x.length;
                for (l && (j = s !== q && s); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (f = 0; p = e[f++];)if (p(c, s, a)) {
                            u.push(c);
                            break
                        }
                        l && (B = b)
                    }
                    i && ((c = !p && c) && d--, r && g.push(c))
                }
                if (d += h, i && h !== d) {
                    for (f = 0; p = n[f++];)p(g, v, s, a);
                    if (r) {
                        if (d > 0)for (; h--;)g[h] || v[h] || (v[h] = J.call(u));
                        v = m(v)
                    }
                    Z.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                }
                return l && (B = b, j = y), g
            };
            return i ? r(s) : s
        }

        function b(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
            return r
        }

        function w(e, t, n, r) {
            var i, o, s, a, u, l = p(e);
            if (!r && 1 === l.length) {
                if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && C.getById && 9 === t.nodeType && O && N.relative[o[1].type]) {
                    if (t = (N.find.ID(s.matches[0].replace(wt, Tt), t) || [])[0], !t)return n;
                    e = e.slice(o.shift().value.length)
                }
                for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !N.relative[a = s.type]);)if ((u = N.find[a]) && (r = u(s.matches[0].replace(wt, Tt), xt.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && d(o), !e)return Z.apply(n, r), n;
                    break
                }
            }
            return D(e, l)(r, t, !O, n, xt.test(e) && c(t.parentNode) || t), n
        }

        var T, C, N, k, E, D, j, S, A, L, q, H, O, F, P, M, R, W = "sizzle" + -new Date, $ = e.document, B = 0, I = 0, _ = n(), X = n(), z = n(), U = function (e, t) {
            return e === t && (A = !0), 0
        }, V = "undefined", Y = 1 << 31, G = {}.hasOwnProperty, Q = [], J = Q.pop, K = Q.push, Z = Q.push, et = Q.slice, tt = Q.indexOf || function (e) {
            for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
            return-1
        }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = it.replace("w", "w#"), st = "\\[" + rt + "*(" + it + ")" + rt + "*(?:([*^$|!~]?=)" + rt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ot + ")|)|)" + rt + "*\\]", at = ":(" + it + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)", ut = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"), lt = new RegExp("^" + rt + "*," + rt + "*"), ct = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"), ft = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"), pt = new RegExp(at), dt = new RegExp("^" + ot + "$"), ht = {ID: new RegExp("^#(" + it + ")"), CLASS: new RegExp("^\\.(" + it + ")"), TAG: new RegExp("^(" + it.replace("w", "w*") + ")"), ATTR: new RegExp("^" + st), PSEUDO: new RegExp("^" + at), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"), bool: new RegExp("^(?:" + nt + ")$", "i"), needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")}, gt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xt = /[+~]/, bt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"), Tt = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        };
        try {
            Z.apply(Q = et.call($.childNodes), $.childNodes), Q[$.childNodes.length].nodeType
        } catch (Ct) {
            Z = {apply: Q.length ? function (e, t) {
                K.apply(e, et.call(t))
            } : function (e, t) {
                for (var n = e.length, r = 0; e[n++] = t[r++];);
                e.length = n - 1
            }}
        }
        C = t.support = {}, E = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, L = t.setDocument = function (e) {
            var t, n = e ? e.ownerDocument || e : $, r = n.defaultView;
            return n !== q && 9 === n.nodeType && n.documentElement ? (q = n, H = n.documentElement, O = !E(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
                L()
            }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
                L()
            })), C.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = i(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), C.getById = i(function (e) {
                return H.appendChild(e).id = W, !n.getElementsByName || !n.getElementsByName(W).length
            }), C.getById ? (N.find.ID = function (e, t) {
                if (typeof t.getElementById !== V && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, N.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete N.find.ID, N.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), N.find.TAG = C.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];)1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, N.find.CLASS = C.getElementsByClassName && function (e, t) {
                return typeof t.getElementsByClassName !== V && O ? t.getElementsByClassName(e) : void 0
            }, P = [], F = [], (C.qsa = vt.test(n.querySelectorAll)) && (i(function (e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && F.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || F.push("\\[" + rt + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || F.push(":checked")
            }), i(function (e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && F.push("name" + rt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
            })), (C.matchesSelector = vt.test(M = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && i(function (e) {
                C.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), P.push("!=", at)
            }), F = F.length && new RegExp(F.join("|")), P = P.length && new RegExp(P.join("|")), t = vt.test(H.compareDocumentPosition), R = t || vt.test(H.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return!0;
                return!1
            }, U = t ? function (e, t) {
                if (e === t)return A = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !C.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === $ && R($, e) ? -1 : t === n || t.ownerDocument === $ && R($, t) ? 1 : S ? tt.call(S, e) - tt.call(S, t) : 0 : 4 & r ? -1 : 1)
            } : function (e, t) {
                if (e === t)return A = !0, 0;
                var r, i = 0, o = e.parentNode, a = t.parentNode, u = [e], l = [t];
                if (!o || !a)return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : S ? tt.call(S, e) - tt.call(S, t) : 0;
                if (o === a)return s(e, t);
                for (r = e; r = r.parentNode;)u.unshift(r);
                for (r = t; r = r.parentNode;)l.unshift(r);
                for (; u[i] === l[i];)i++;
                return i ? s(u[i], l[i]) : u[i] === $ ? -1 : l[i] === $ ? 1 : 0
            }, n) : q
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== q && L(e), n = n.replace(ft, "='$1']"), !(!C.matchesSelector || !O || P && P.test(n) || F && F.test(n)))try {
                var r = M.call(e, n);
                if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
            } catch (i) {
            }
            return t(n, q, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return(e.ownerDocument || e) !== q && L(e), R(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== q && L(e);
            var n = N.attrHandle[t.toLowerCase()], r = n && G.call(N.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== r ? r : C.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], r = 0, i = 0;
            if (A = !C.detectDuplicates, S = !C.sortStable && e.slice(0), e.sort(U), A) {
                for (; t = e[i++];)t === e[i] && (r = n.push(i));
                for (; r--;)e.splice(n[r], 1)
            }
            return S = null, e
        }, k = t.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += k(e)
                } else if (3 === i || 4 === i)return e.nodeValue
            } else for (; t = e[r++];)n += k(t);
            return n
        }, N = t.selectors = {cacheLength: 50, createPseudo: r, match: ht, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
            return e[1] = e[1].replace(wt, Tt), e[3] = (e[4] || e[5] || "").replace(wt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
            var t, n = !e[5] && e[2];
            return ht.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && pt.test(n) && (t = p(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }}, filter: {TAG: function (e) {
            var t = e.replace(wt, Tt).toLowerCase();
            return"*" === e ? function () {
                return!0
            } : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t
            }
        }, CLASS: function (e) {
            var t = _[e + " "];
            return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && _(e, function (e) {
                return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, n, r) {
            return function (i) {
                var o = t.attr(i, e);
                return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
            }
        }, CHILD: function (e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
            return 1 === r && 0 === i ? function (e) {
                return!!e.parentNode
            } : function (t, n, u) {
                var l, c, f, p, d, h, g = o !== s ? "nextSibling" : "previousSibling", m = t.parentNode, v = a && t.nodeName.toLowerCase(), y = !u && !a;
                if (m) {
                    if (o) {
                        for (; g;) {
                            for (f = t; f = f[g];)if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)return!1;
                            h = g = "only" === e && !h && "nextSibling"
                        }
                        return!0
                    }
                    if (h = [s ? m.firstChild : m.lastChild], s && y) {
                        for (c = m[W] || (m[W] = {}), l = c[e] || [], d = l[0] === B && l[1], p = l[0] === B && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)if (1 === f.nodeType && ++p && f === t) {
                            c[e] = [B, d, p];
                            break
                        }
                    } else if (y && (l = (t[W] || (t[W] = {}))[e]) && l[0] === B)p = l[1]; else for (; (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[W] || (f[W] = {}))[e] = [B, p]), f !== t)););
                    return p -= i, p === r || p % r === 0 && p / r >= 0
                }
            }
        }, PSEUDO: function (e, n) {
            var i, o = N.pseudos[e] || N.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
            return o[W] ? o(n) : o.length > 1 ? (i = [e, e, "", n], N.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                for (var r, i = o(e, n), s = i.length; s--;)r = tt.call(e, i[s]), e[r] = !(t[r] = i[s])
            }) : function (e) {
                return o(e, 0, i)
            }) : o
        }}, pseudos: {not: r(function (e) {
            var t = [], n = [], i = D(e.replace(ut, "$1"));
            return i[W] ? r(function (e, t, n, r) {
                for (var o, s = i(e, null, r, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
            }) : function (e, r, o) {
                return t[0] = e, i(t, null, o, n), !n.pop()
            }
        }), has: r(function (e) {
            return function (n) {
                return t(e, n).length > 0
            }
        }), contains: r(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || k(t)).indexOf(e) > -1
            }
        }), lang: r(function (e) {
            return dt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, Tt).toLowerCase(), function (t) {
                var n;
                do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                return!1
            }
        }), target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
        }, root: function (e) {
            return e === H
        }, focus: function (e) {
            return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
            return e.disabled === !1
        }, disabled: function (e) {
            return e.disabled === !0
        }, checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return"input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return!1;
            return!0
        }, parent: function (e) {
            return!N.pseudos.empty(e)
        }, header: function (e) {
            return mt.test(e.nodeName)
        }, input: function (e) {
            return gt.test(e.nodeName)
        }, button: function (e) {
            var t = e.nodeName.toLowerCase();
            return"input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
            var t;
            return"input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: l(function () {
            return[0]
        }), last: l(function (e, t) {
            return[t - 1]
        }), eq: l(function (e, t, n) {
            return[0 > n ? n + t : n]
        }), even: l(function (e, t) {
            for (var n = 0; t > n; n += 2)e.push(n);
            return e
        }), odd: l(function (e, t) {
            for (var n = 1; t > n; n += 2)e.push(n);
            return e
        }), lt: l(function (e, t, n) {
            for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
            return e
        }), gt: l(function (e, t, n) {
            for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
            return e
        })}}, N.pseudos.nth = N.pseudos.eq;
        for (T in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})N.pseudos[T] = a(T);
        for (T in{submit: !0, reset: !0})N.pseudos[T] = u(T);
        return f.prototype = N.filters = N.pseudos, N.setFilters = new f, D = t.compile = function (e, t) {
            var n, r = [], i = [], o = z[e + " "];
            if (!o) {
                for (t || (t = p(e)), n = t.length; n--;)o = y(t[n]), o[W] ? r.push(o) : i.push(o);
                o = z(e, x(i, r))
            }
            return o
        }, C.sortStable = W.split("").sort(U).join("") === W, C.detectDuplicates = !!A, L(), C.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(q.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(nt, function (e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    et.find = it, et.expr = it.selectors, et.expr[":"] = et.expr.pseudos, et.unique = it.uniqueSort, et.text = it.getText, et.isXMLDoc = it.isXML, et.contains = it.contains;
    var ot = et.expr.match.needsContext, st = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, at = /^.[^:#\[\.,]*$/;
    et.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? et.find.matchesSelector(r, e) ? [r] : [] : et.find.matches(e, et.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, et.fn.extend({find: function (e) {
        var t, n = this.length, r = [], i = this;
        if ("string" != typeof e)return this.pushStack(et(e).filter(function () {
            for (t = 0; n > t; t++)if (et.contains(i[t], this))return!0
        }));
        for (t = 0; n > t; t++)et.find(e, i[t], r);
        return r = this.pushStack(n > 1 ? et.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
    }, filter: function (e) {
        return this.pushStack(r(this, e || [], !1))
    }, not: function (e) {
        return this.pushStack(r(this, e || [], !0))
    }, is: function (e) {
        return!!r(this, "string" == typeof e && ot.test(e) ? et(e) : e || [], !1).length
    }});
    var ut, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = et.fn.init = function (e, t) {
        var n, r;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : lt.exec(e), !n || !n[1] && t)return!t || t.jquery ? (t || ut).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof et ? t[0] : t, et.merge(this, et.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), st.test(n[1]) && et.isPlainObject(t))for (n in t)et.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            return r = K.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = K, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : et.isFunction(e) ? "undefined" != typeof ut.ready ? ut.ready(e) : e(et) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), et.makeArray(e, this))
    };
    ct.prototype = et.fn, ut = et(K);
    var ft = /^(?:parents|prev(?:Until|All))/, pt = {children: !0, contents: !0, next: !0, prev: !0};
    et.extend({dir: function (e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
            if (i && et(e).is(n))break;
            r.push(e)
        }
        return r
    }, sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }}), et.fn.extend({has: function (e) {
        var t = et(e, this), n = t.length;
        return this.filter(function () {
            for (var e = 0; n > e; e++)if (et.contains(this, t[e]))return!0
        })
    }, closest: function (e, t) {
        for (var n, r = 0, i = this.length, o = [], s = ot.test(e) || "string" != typeof e ? et(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && et.find.matchesSelector(n, e))) {
            o.push(n);
            break
        }
        return this.pushStack(o.length > 1 ? et.unique(o) : o)
    }, index: function (e) {
        return e ? "string" == typeof e ? U.call(et(e), this[0]) : U.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        return this.pushStack(et.unique(et.merge(this.get(), et(e, t))))
    }, addBack: function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }}), et.each({parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
        return et.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return et.dir(e, "parentNode", n)
    }, next: function (e) {
        return i(e, "nextSibling")
    }, prev: function (e) {
        return i(e, "previousSibling")
    }, nextAll: function (e) {
        return et.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return et.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return et.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return et.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return et.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return et.sibling(e.firstChild)
    }, contents: function (e) {
        return e.contentDocument || et.merge([], e.childNodes)
    }}, function (e, t) {
        et.fn[e] = function (n, r) {
            var i = et.map(this, t, n);
            return"Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = et.filter(r, i)), this.length > 1 && (pt[e] || et.unique(i), ft.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var dt = /\S+/g, ht = {};
    et.Callbacks = function (e) {
        e = "string" == typeof e ? ht[e] || o(e) : et.extend({}, e);
        var t, n, r, i, s, a, u = [], l = !e.once && [], c = function (o) {
            for (t = e.memory && o, n = !0, a = i || 0, i = 0, s = u.length, r = !0; u && s > a; a++)if (u[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : f.disable())
        }, f = {add: function () {
            if (u) {
                var n = u.length;
                !function o(t) {
                    et.each(t, function (t, n) {
                        var r = et.type(n);
                        "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                    })
                }(arguments), r ? s = u.length : t && (i = n, c(t))
            }
            return this
        }, remove: function () {
            return u && et.each(arguments, function (e, t) {
                for (var n; (n = et.inArray(t, u, n)) > -1;)u.splice(n, 1), r && (s >= n && s--, a >= n && a--)
            }), this
        }, has: function (e) {
            return e ? et.inArray(e, u) > -1 : !(!u || !u.length)
        }, empty: function () {
            return u = [], s = 0, this
        }, disable: function () {
            return u = l = t = void 0, this
        }, disabled: function () {
            return!u
        }, lock: function () {
            return l = void 0, t || f.disable(), this
        }, locked: function () {
            return!l
        }, fireWith: function (e, t) {
            return!u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this
        }, fire: function () {
            return f.fireWith(this, arguments), this
        }, fired: function () {
            return!!n
        }};
        return f
    }, et.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", et.Callbacks("once memory"), "resolved"],
            ["reject", "fail", et.Callbacks("once memory"), "rejected"],
            ["notify", "progress", et.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            return i.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return et.Deferred(function (n) {
                et.each(t, function (t, o) {
                    var s = et.isFunction(e[t]) && e[t];
                    i[o[1]](function () {
                        var e = s && s.apply(this, arguments);
                        e && et.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return null != e ? et.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, et.each(t, function (e, o) {
            var s = o[2], a = o[3];
            r[o[1]] = s.add, a && s.add(function () {
                n = a
            }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                return i[o[0] + "With"](this === i ? r : this, arguments), this
            }, i[o[0] + "With"] = s.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
        var t, n, r, i = 0, o = _.call(arguments), s = o.length, a = 1 !== s || e && et.isFunction(e.promise) ? s : 0, u = 1 === a ? e : et.Deferred(), l = function (e, n, r) {
            return function (i) {
                n[e] = this, r[e] = arguments.length > 1 ? _.call(arguments) : i, r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r)
            }
        };
        if (s > 1)for (t = new Array(s), n = new Array(s), r = new Array(s); s > i; i++)o[i] && et.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --a;
        return a || u.resolveWith(r, o), u.promise()
    }});
    var gt;
    et.fn.ready = function (e) {
        return et.ready.promise().done(e), this
    }, et.extend({isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? et.readyWait++ : et.ready(!0)
    }, ready: function (e) {
        (e === !0 ? --et.readyWait : et.isReady) || (et.isReady = !0, e !== !0 && --et.readyWait > 0 || (gt.resolveWith(K, [et]), et.fn.trigger && et(K).trigger("ready").off("ready")))
    }}), et.ready.promise = function (t) {
        return gt || (gt = et.Deferred(), "complete" === K.readyState ? setTimeout(et.ready) : (K.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1))), gt.promise(t)
    }, et.ready.promise();
    var mt = et.access = function (e, t, n, r, i, o, s) {
        var a = 0, u = e.length, l = null == n;
        if ("object" === et.type(n)) {
            i = !0;
            for (a in n)et.access(e, t, a, n[a], !0, o, s)
        } else if (void 0 !== r && (i = !0, et.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
            return l.call(et(e), n)
        })), t))for (; u > a; a++)t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    };
    et.acceptData = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }, a.uid = 1, a.accepts = et.acceptData, a.prototype = {key: function (e) {
        if (!a.accepts(e))return 0;
        var t = {}, n = e[this.expando];
        if (!n) {
            n = a.uid++;
            try {
                t[this.expando] = {value: n}, Object.defineProperties(e, t)
            } catch (r) {
                t[this.expando] = n, et.extend(e, t)
            }
        }
        return this.cache[n] || (this.cache[n] = {}), n
    }, set: function (e, t, n) {
        var r, i = this.key(e), o = this.cache[i];
        if ("string" == typeof t)o[t] = n; else if (et.isEmptyObject(o))et.extend(this.cache[i], t); else for (r in t)o[r] = t[r];
        return o
    }, get: function (e, t) {
        var n = this.cache[this.key(e)];
        return void 0 === t ? n : n[t]
    }, access: function (e, t, n) {
        var r;
        return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, et.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
    }, remove: function (e, t) {
        var n, r, i, o = this.key(e), s = this.cache[o];
        if (void 0 === t)this.cache[o] = {}; else {
            et.isArray(t) ? r = t.concat(t.map(et.camelCase)) : (i = et.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(dt) || [])), n = r.length;
            for (; n--;)delete s[r[n]]
        }
    }, hasData: function (e) {
        return!et.isEmptyObject(this.cache[e[this.expando]] || {})
    }, discard: function (e) {
        e[this.expando] && delete this.cache[e[this.expando]]
    }};
    var vt = new a, yt = new a, xt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, bt = /([A-Z])/g;
    et.extend({hasData: function (e) {
        return yt.hasData(e) || vt.hasData(e)
    }, data: function (e, t, n) {
        return yt.access(e, t, n)
    }, removeData: function (e, t) {
        yt.remove(e, t)
    }, _data: function (e, t, n) {
        return vt.access(e, t, n)
    }, _removeData: function (e, t) {
        vt.remove(e, t)
    }}), et.fn.extend({data: function (e, t) {
        var n, r, i, o = this[0], s = o && o.attributes;
        if (void 0 === e) {
            if (this.length && (i = yt.get(o), 1 === o.nodeType && !vt.get(o, "hasDataAttrs"))) {
                for (n = s.length; n--;)r = s[n].name, 0 === r.indexOf("data-") && (r = et.camelCase(r.slice(5)), u(o, r, i[r]));
                vt.set(o, "hasDataAttrs", !0)
            }
            return i
        }
        return"object" == typeof e ? this.each(function () {
            yt.set(this, e)
        }) : mt(this, function (t) {
            var n, r = et.camelCase(e);
            if (o && void 0 === t) {
                if (n = yt.get(o, e), void 0 !== n)return n;
                if (n = yt.get(o, r), void 0 !== n)return n;
                if (n = u(o, r, void 0), void 0 !== n)return n
            } else this.each(function () {
                var n = yt.get(this, r);
                yt.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && yt.set(this, e, t)
            })
        }, null, t, arguments.length > 1, null, !0)
    }, removeData: function (e) {
        return this.each(function () {
            yt.remove(this, e)
        })
    }}), et.extend({queue: function (e, t, n) {
        var r;
        return e ? (t = (t || "fx") + "queue", r = vt.get(e, t), n && (!r || et.isArray(n) ? r = vt.access(e, t, et.makeArray(n)) : r.push(n)), r || []) : void 0
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = et.queue(e, t), r = n.length, i = n.shift(), o = et._queueHooks(e, t), s = function () {
            et.dequeue(e, t)
        };
        "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return vt.get(e, n) || vt.access(e, n, {empty: et.Callbacks("once memory").add(function () {
            vt.remove(e, [t + "queue", n])
        })})
    }}), et.fn.extend({queue: function (e, t) {
        var n = 2;
        return"string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? et.queue(this[0], e) : void 0 === t ? this : this.each(function () {
            var n = et.queue(this, e, t);
            et._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && et.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            et.dequeue(this, e)
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, t) {
        var n, r = 1, i = et.Deferred(), o = this, s = this.length, a = function () {
            --r || i.resolveWith(o, [o])
        };
        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)n = vt.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
        return a(), i.promise(t)
    }});
    var wt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Tt = ["Top", "Right", "Bottom", "Left"], Ct = function (e, t) {
        return e = t || e, "none" === et.css(e, "display") || !et.contains(e.ownerDocument, e)
    }, Nt = /^(?:checkbox|radio)$/i;
    !function () {
        var e = K.createDocumentFragment(), t = e.appendChild(K.createElement("div"));
        t.innerHTML = "<input type='radio' checked='checked' name='t'/>", J.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", J.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var kt = "undefined";
    J.focusinBubbles = "onfocusin"in e;
    var Et = /^key/, Dt = /^(?:mouse|contextmenu)|click/, jt = /^(?:focusinfocus|focusoutblur)$/, St = /^([^.]*)(?:\.(.+)|)$/;
    et.event = {global: {}, add: function (e, t, n, r, i) {
        var o, s, a, u, l, c, f, p, d, h, g, m = vt.get(e);
        if (m)for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = et.guid++), (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function (t) {
            return typeof et !== kt && et.event.triggered !== t.type ? et.event.dispatch.apply(e, arguments) : void 0
        }), t = (t || "").match(dt) || [""], l = t.length; l--;)a = St.exec(t[l]) || [], d = g = a[1], h = (a[2] || "").split(".").sort(), d && (f = et.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = et.event.special[d] || {}, c = et.extend({type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && et.expr.match.needsContext.test(i), namespace: h.join(".")}, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, s) !== !1 || e.addEventListener && e.addEventListener(d, s, !1)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), et.event.global[d] = !0)
    }, remove: function (e, t, n, r, i) {
        var o, s, a, u, l, c, f, p, d, h, g, m = vt.hasData(e) && vt.get(e);
        if (m && (u = m.events)) {
            for (t = (t || "").match(dt) || [""], l = t.length; l--;)if (a = St.exec(t[l]) || [], d = g = a[1], h = (a[2] || "").split(".").sort(), d) {
                for (f = et.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;)c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                s && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || et.removeEvent(e, d, m.handle), delete u[d])
            } else for (d in u)et.event.remove(e, d + t[l], n, r, !0);
            et.isEmptyObject(u) && (delete m.handle, vt.remove(e, "events"))
        }
    }, trigger: function (t, n, r, i) {
        var o, s, a, u, l, c, f, p = [r || K], d = G.call(t, "type") ? t.type : t, h = G.call(t, "namespace") ? t.namespace.split(".") : [];
        if (s = a = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !jt.test(d + et.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[et.expando] ? t : new et.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : et.makeArray(n, [t]), f = et.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
            if (!i && !f.noBubble && !et.isWindow(r)) {
                for (u = f.delegateType || d, jt.test(u + d) || (s = s.parentNode); s; s = s.parentNode)p.push(s), a = s;
                a === (r.ownerDocument || K) && p.push(a.defaultView || a.parentWindow || e)
            }
            for (o = 0; (s = p[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? u : f.bindType || d, c = (vt.get(s, "events") || {})[t.type] && vt.get(s, "handle"), c && c.apply(s, n), c = l && s[l], c && c.apply && et.acceptData(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault());
            return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !et.acceptData(r) || l && et.isFunction(r[d]) && !et.isWindow(r) && (a = r[l], a && (r[l] = null), et.event.triggered = d, r[d](), et.event.triggered = void 0, a && (r[l] = a)), t.result
        }
    }, dispatch: function (e) {
        e = et.event.fix(e);
        var t, n, r, i, o, s = [], a = _.call(arguments), u = (vt.get(this, "events") || {})[e.type] || [], l = et.event.special[e.type] || {};
        if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
            for (s = et.event.handlers.call(this, e, u), t = 0; (i = s[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((et.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
            return l.postDispatch && l.postDispatch.call(this, e), e.result
        }
    }, handlers: function (e, t) {
        var n, r, i, o, s = [], a = t.delegateCount, u = e.target;
        if (a && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
            for (r = [], n = 0; a > n; n++)o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? et(i, this).index(u) >= 0 : et.find(i, this, null, [u]).length), r[i] && r.push(o);
            r.length && s.push({elem: u, handlers: r})
        }
        return a < t.length && s.push({elem: this, handlers: t.slice(a)}), s
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, t) {
        var n, r, i, o = t.button;
        return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
    }}, fix: function (e) {
        if (e[et.expando])return e;
        var t, n, r, i = e.type, o = e, s = this.fixHooks[i];
        for (s || (this.fixHooks[i] = s = Dt.test(i) ? this.mouseHooks : Et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new et.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
        return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, o) : e
    }, special: {load: {noBubble: !0}, focus: {trigger: function () {
        return this !== f() && this.focus ? (this.focus(), !1) : void 0
    }, delegateType: "focusin"}, blur: {trigger: function () {
        return this === f() && this.blur ? (this.blur(), !1) : void 0
    }, delegateType: "focusout"}, click: {trigger: function () {
        return"checkbox" === this.type && this.click && et.nodeName(this, "input") ? (this.click(), !1) : void 0
    }, _default: function (e) {
        return et.nodeName(e.target, "a")
    }}, beforeunload: {postDispatch: function (e) {
        void 0 !== e.result && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, r) {
        var i = et.extend(new et.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        r ? et.event.trigger(i, null, t) : et.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, et.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, et.Event = function (e, t) {
        return this instanceof et.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.getPreventDefault && e.getPreventDefault() ? l : c) : this.type = e, t && et.extend(this, t), this.timeStamp = e && e.timeStamp || et.now(), this[et.expando] = !0, void 0) : new et.Event(e, t)
    }, et.Event.prototype = {isDefaultPrevented: c, isPropagationStopped: c, isImmediatePropagationStopped: c, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault()
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation()
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = l, this.stopPropagation()
    }}, et.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        et.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, o = e.handleObj;
            return(!i || i !== r && !et.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
        }}
    }), J.focusinBubbles || et.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            et.event.simulate(t, e.target, et.event.fix(e), !0)
        };
        et.event.special[t] = {setup: function () {
            var r = this.ownerDocument || this, i = vt.access(r, t);
            i || r.addEventListener(e, n, !0), vt.access(r, t, (i || 0) + 1)
        }, teardown: function () {
            var r = this.ownerDocument || this, i = vt.access(r, t) - 1;
            i ? vt.access(r, t, i) : (r.removeEventListener(e, n, !0), vt.remove(r, t))
        }}
    }), et.fn.extend({on: function (e, t, n, r, i) {
        var o, s;
        if ("object" == typeof e) {
            "string" != typeof t && (n = n || t, t = void 0);
            for (s in e)this.on(s, t, n, e[s], i);
            return this
        }
        if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = c; else if (!r)return this;
        return 1 === i && (o = r, r = function (e) {
            return et().off(e), o.apply(this, arguments)
        }, r.guid = o.guid || (o.guid = et.guid++)), this.each(function () {
            et.event.add(this, e, r, n, t)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)return r = e.handleObj, et(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
        if ("object" == typeof e) {
            for (i in e)this.off(i, t, e[i]);
            return this
        }
        return(t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function () {
            et.event.remove(this, e, n, t)
        })
    }, trigger: function (e, t) {
        return this.each(function () {
            et.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        return n ? et.event.trigger(e, t, n, !0) : void 0
    }});
    var At = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Lt = /<([\w:]+)/, qt = /<|&#?\w+;/, Ht = /<(?:script|style|link)/i, Ot = /checked\s*(?:[^=]|=\s*.checked.)/i, Ft = /^$|\/(?:java|ecma)script/i, Pt = /^true\/(.*)/, Mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Rt = {option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]};
    Rt.optgroup = Rt.option, Rt.tbody = Rt.tfoot = Rt.colgroup = Rt.caption = Rt.thead, Rt.th = Rt.td, et.extend({clone: function (e, t, n) {
        var r, i, o, s, a = e.cloneNode(!0), u = et.contains(e.ownerDocument, e);
        if (!(J.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || et.isXMLDoc(e)))for (s = v(a), o = v(e), r = 0, i = o.length; i > r; r++)y(o[r], s[r]);
        if (t)if (n)for (o = o || v(e), s = s || v(a), r = 0, i = o.length; i > r; r++)m(o[r], s[r]); else m(e, a);
        return s = v(a, "script"), s.length > 0 && g(s, !u && v(e, "script")), a
    }, buildFragment: function (e, t, n, r) {
        for (var i, o, s, a, u, l, c = t.createDocumentFragment(), f = [], p = 0, d = e.length; d > p; p++)if (i = e[p], i || 0 === i)if ("object" === et.type(i))et.merge(f, i.nodeType ? [i] : i); else if (qt.test(i)) {
            for (o = o || c.appendChild(t.createElement("div")), s = (Lt.exec(i) || ["", ""])[1].toLowerCase(), a = Rt[s] || Rt._default, o.innerHTML = a[1] + i.replace(At, "<$1></$2>") + a[2], l = a[0]; l--;)o = o.lastChild;
            et.merge(f, o.childNodes), o = c.firstChild, o.textContent = ""
        } else f.push(t.createTextNode(i));
        for (c.textContent = "", p = 0; i = f[p++];)if ((!r || -1 === et.inArray(i, r)) && (u = et.contains(i.ownerDocument, i), o = v(c.appendChild(i), "script"), u && g(o), n))for (l = 0; i = o[l++];)Ft.test(i.type || "") && n.push(i);
        return c
    }, cleanData: function (e) {
        for (var t, n, r, i, o, s, a = et.event.special, u = 0; void 0 !== (n = e[u]); u++) {
            if (et.acceptData(n) && (o = n[vt.expando], o && (t = vt.cache[o]))) {
                if (r = Object.keys(t.events || {}), r.length)for (s = 0; void 0 !== (i = r[s]); s++)a[i] ? et.event.remove(n, i) : et.removeEvent(n, i, t.handle);
                vt.cache[o] && delete vt.cache[o]
            }
            delete yt.cache[n[yt.expando]]
        }
    }}), et.fn.extend({text: function (e) {
        return mt(this, function (e) {
            return void 0 === e ? et.text(this) : this.empty().each(function () {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
            })
        }, null, e, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = p(this, e);
                t.appendChild(e)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = p(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        for (var n, r = e ? et.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || et.cleanData(v(n)), n.parentNode && (t && et.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
        return this
    }, empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (et.cleanData(v(e, !1)), e.textContent = "");
        return this
    }, clone: function (e, t) {
        return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
            return et.clone(this, e, t)
        })
    }, html: function (e) {
        return mt(this, function (e) {
            var t = this[0] || {}, n = 0, r = this.length;
            if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
            if ("string" == typeof e && !Ht.test(e) && !Rt[(Lt.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(At, "<$1></$2>");
                try {
                    for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (et.cleanData(v(t, !1)), t.innerHTML = e);
                    t = 0
                } catch (i) {
                }
            }
            t && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function () {
        var e = arguments[0];
        return this.domManip(arguments, function (t) {
            e = this.parentNode, et.cleanData(v(this)), e && e.replaceChild(t, this)
        }), e && (e.length || e.nodeType) ? this : this.remove()
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, t) {
        e = X.apply([], e);
        var n, r, i, o, s, a, u = 0, l = this.length, c = this, f = l - 1, p = e[0], g = et.isFunction(p);
        if (g || l > 1 && "string" == typeof p && !J.checkClone && Ot.test(p))return this.each(function (n) {
            var r = c.eq(n);
            g && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
        });
        if (l && (n = et.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
            for (i = et.map(v(n, "script"), d), o = i.length; l > u; u++)s = n, u !== f && (s = et.clone(s, !0, !0), o && et.merge(i, v(s, "script"))), t.call(this[u], s, u);
            if (o)for (a = i[i.length - 1].ownerDocument, et.map(i, h), u = 0; o > u; u++)s = i[u], Ft.test(s.type || "") && !vt.access(s, "globalEval") && et.contains(a, s) && (s.src ? et._evalUrl && et._evalUrl(s.src) : et.globalEval(s.textContent.replace(Mt, "")))
        }
        return this
    }}), et.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        et.fn[e] = function (e) {
            for (var n, r = [], i = et(e), o = i.length - 1, s = 0; o >= s; s++)n = s === o ? this : this.clone(!0), et(i[s])[t](n), z.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Wt, $t = {}, Bt = /^margin/, It = new RegExp("^(" + wt + ")(?!px)[a-z%]+$", "i"), _t = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    };
    !function () {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", o.appendChild(s);
            var t = e.getComputedStyle(a, null);
            n = "1%" !== t.top, r = "4px" === t.width, o.removeChild(s)
        }

        var n, r, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", o = K.documentElement, s = K.createElement("div"), a = K.createElement("div");
        a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", J.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(a), e.getComputedStyle && et.extend(J, {pixelPosition: function () {
            return t(), n
        }, boxSizingReliable: function () {
            return null == r && t(), r
        }, reliableMarginRight: function () {
            var t, n = a.appendChild(K.createElement("div"));
            return n.style.cssText = a.style.cssText = i, n.style.marginRight = n.style.width = "0", a.style.width = "1px", o.appendChild(s), t = !parseFloat(e.getComputedStyle(n, null).marginRight), o.removeChild(s), a.innerHTML = "", t
        }})
    }(), et.swap = function (e, t, n, r) {
        var i, o, s = {};
        for (o in t)s[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)e.style[o] = s[o];
        return i
    };
    var Xt = /^(none|table(?!-c[ea]).+)/, zt = new RegExp("^(" + wt + ")(.*)$", "i"), Ut = new RegExp("^([+-])=(" + wt + ")", "i"), Vt = {position: "absolute", visibility: "hidden", display: "block"}, Yt = {letterSpacing: 0, fontWeight: 400}, Gt = ["Webkit", "O", "Moz", "ms"];
    et.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = w(e, "opacity");
            return"" === n ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": "cssFloat"}, style: function (e, t, n, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var i, o, s, a = et.camelCase(t), u = e.style;
            return t = et.cssProps[a] || (et.cssProps[a] = C(u, a)), s = et.cssHooks[t] || et.cssHooks[a], void 0 === n ? s && "get"in s && void 0 !== (i = s.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(et.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || et.cssNumber[a] || (n += "px"), J.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set"in s && void 0 === (n = s.set(e, n, r)) || (u[t] = "", u[t] = n)), void 0)
        }
    }, css: function (e, t, n, r) {
        var i, o, s, a = et.camelCase(t);
        return t = et.cssProps[a] || (et.cssProps[a] = C(e.style, a)), s = et.cssHooks[t] || et.cssHooks[a], s && "get"in s && (i = s.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Yt && (i = Yt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || et.isNumeric(o) ? o || 0 : i) : i
    }}), et.each(["height", "width"], function (e, t) {
        et.cssHooks[t] = {get: function (e, n, r) {
            return n ? 0 === e.offsetWidth && Xt.test(et.css(e, "display")) ? et.swap(e, Vt, function () {
                return E(e, t, r)
            }) : E(e, t, r) : void 0
        }, set: function (e, n, r) {
            var i = r && _t(e);
            return N(e, n, r ? k(e, t, r, "border-box" === et.css(e, "boxSizing", !1, i), i) : 0)
        }}
    }), et.cssHooks.marginRight = T(J.reliableMarginRight, function (e, t) {
        return t ? et.swap(e, {display: "inline-block"}, w, [e, "marginRight"]) : void 0
    }), et.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        et.cssHooks[e + t] = {expand: function (n) {
            for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + Tt[r] + t] = o[r] || o[r - 2] || o[0];
            return i
        }}, Bt.test(e) || (et.cssHooks[e + t].set = N)
    }), et.fn.extend({css: function (e, t) {
        return mt(this, function (e, t, n) {
            var r, i, o = {}, s = 0;
            if (et.isArray(t)) {
                for (r = _t(e), i = t.length; i > s; s++)o[t[s]] = et.css(e, t[s], !1, r);
                return o
            }
            return void 0 !== n ? et.style(e, t, n) : et.css(e, t)
        }, e, t, arguments.length > 1)
    }, show: function () {
        return D(this, !0)
    }, hide: function () {
        return D(this)
    }, toggle: function (e) {
        return"boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
            Ct(this) ? et(this).show() : et(this).hide()
        })
    }}), et.Tween = j, j.prototype = {constructor: j, init: function (e, t, n, r, i, o) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (et.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = j.propHooks[this.prop];
        return e && e.get ? e.get(this) : j.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = j.propHooks[this.prop];
        return this.pos = t = this.options.duration ? et.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
    }}, j.prototype.init.prototype = j.prototype, j.propHooks = {_default: {get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = et.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
    }, set: function (e) {
        et.fx.step[e.prop] ? et.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[et.cssProps[e.prop]] || et.cssHooks[e.prop]) ? et.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, j.propHooks.scrollTop = j.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, et.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, et.fx = j.prototype.init, et.fx.step = {};
    var Qt, Jt, Kt = /^(?:toggle|show|hide)$/, Zt = new RegExp("^(?:([+-])=|)(" + wt + ")([a-z%]*)$", "i"), en = /queueHooks$/, tn = [q], nn = {"*": [function (e, t) {
        var n = this.createTween(e, t), r = n.cur(), i = Zt.exec(t), o = i && i[3] || (et.cssNumber[e] ? "" : "px"), s = (et.cssNumber[e] || "px" !== o && +r) && Zt.exec(et.css(n.elem, e)), a = 1, u = 20;
        if (s && s[3] !== o) {
            o = o || s[3], i = i || [], s = +r || 1;
            do a = a || ".5", s /= a, et.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
        }
        return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
    }]};
    et.Animation = et.extend(O, {tweener: function (e, t) {
        et.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        for (var n, r = 0, i = e.length; i > r; r++)n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? tn.unshift(e) : tn.push(e)
    }}), et.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? et.extend({}, e) : {complete: n || !n && t || et.isFunction(e) && e, duration: e, easing: n && t || t && !et.isFunction(t) && t};
        return r.duration = et.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in et.fx.speeds ? et.fx.speeds[r.duration] : et.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            et.isFunction(r.old) && r.old.call(this), r.queue && et.dequeue(this, r.queue)
        }, r
    }, et.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(Ct).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = et.isEmptyObject(e), o = et.speed(t, n, r), s = function () {
            var t = O(this, et.extend({}, e), o);
            (i || vt.get(this, "finish")) && t.stop(!0)
        };
        return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
    }, stop: function (e, t, n) {
        var r = function (e) {
            var t = e.stop;
            delete e.stop, t(n)
        };
        return"string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, i = null != e && e + "queueHooks", o = et.timers, s = vt.get(this);
            if (i)s[i] && s[i].stop && r(s[i]); else for (i in s)s[i] && s[i].stop && en.test(i) && r(s[i]);
            for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
            (t || !n) && et.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = vt.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = et.timers, s = r ? r.length : 0;
            for (n.finish = !0, et.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; s > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish
        })
    }}), et.each(["toggle", "show", "hide"], function (e, t) {
        var n = et.fn[t];
        et.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i)
        }
    }), et.each({slideDown: A("show"), slideUp: A("hide"), slideToggle: A("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        et.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), et.timers = [], et.fx.tick = function () {
        var e, t = 0, n = et.timers;
        for (Qt = et.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || et.fx.stop(), Qt = void 0
    }, et.fx.timer = function (e) {
        et.timers.push(e), e() ? et.fx.start() : et.timers.pop()
    }, et.fx.interval = 13, et.fx.start = function () {
        Jt || (Jt = setInterval(et.fx.tick, et.fx.interval))
    }, et.fx.stop = function () {
        clearInterval(Jt), Jt = null
    }, et.fx.speeds = {slow: 600, fast: 200, _default: 400}, et.fn.delay = function (e, t) {
        return e = et.fx ? et.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e = K.createElement("input"), t = K.createElement("select"), n = t.appendChild(K.createElement("option"));
        e.type = "checkbox", J.checkOn = "" !== e.value, J.optSelected = n.selected, t.disabled = !0, J.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", J.radioValue = "t" === e.value
    }();
    var rn, on, sn = et.expr.attrHandle;
    et.fn.extend({attr: function (e, t) {
        return mt(this, et.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            et.removeAttr(this, e)
        })
    }}), et.extend({attr: function (e, t, n) {
        var r, i, o = e.nodeType;
        if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === kt ? et.prop(e, t, n) : (1 === o && et.isXMLDoc(e) || (t = t.toLowerCase(), r = et.attrHooks[t] || (et.expr.match.bool.test(t) ? on : rn)), void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = et.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : (et.removeAttr(e, t), void 0))
    }, removeAttr: function (e, t) {
        var n, r, i = 0, o = t && t.match(dt);
        if (o && 1 === e.nodeType)for (; n = o[i++];)r = et.propFix[n] || n, et.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
    }, attrHooks: {type: {set: function (e, t) {
        if (!J.radioValue && "radio" === t && et.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}}), on = {set: function (e, t, n) {
        return t === !1 ? et.removeAttr(e, n) : e.setAttribute(n, n), n
    }}, et.each(et.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = sn[t] || et.find.attr;
        sn[t] = function (e, t, r) {
            var i, o;
            return r || (o = sn[t], sn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, sn[t] = o), i
        }
    });
    var an = /^(?:input|select|textarea|button)$/i;
    et.fn.extend({prop: function (e, t) {
        return mt(this, et.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return this.each(function () {
            delete this[et.propFix[e] || e]
        })
    }}), et.extend({propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
        var r, i, o, s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)return o = 1 !== s || !et.isXMLDoc(e), o && (t = et.propFix[t] || t, i = et.propHooks[t]), void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
    }, propHooks: {tabIndex: {get: function (e) {
        return e.hasAttribute("tabindex") || an.test(e.nodeName) || e.href ? e.tabIndex : -1
    }}}}), J.optSelected || (et.propHooks.selected = {get: function (e) {
        var t = e.parentNode;
        return t && t.parentNode && t.parentNode.selectedIndex, null
    }}), et.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        et.propFix[this.toLowerCase()] = this
    });
    var un = /[\t\r\n\f]/g;
    et.fn.extend({addClass: function (e) {
        var t, n, r, i, o, s, a = "string" == typeof e && e, u = 0, l = this.length;
        if (et.isFunction(e))return this.each(function (t) {
            et(this).addClass(e.call(this, t, this.className))
        });
        if (a)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : " ")) {
            for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
            s = et.trim(r), n.className !== s && (n.className = s)
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, o, s, a = 0 === arguments.length || "string" == typeof e && e, u = 0, l = this.length;
        if (et.isFunction(e))return this.each(function (t) {
            et(this).removeClass(e.call(this, t, this.className))
        });
        if (a)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : "")) {
            for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
            s = e ? et.trim(r) : "", n.className !== s && (n.className = s)
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e;
        return"boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : et.isFunction(e) ? this.each(function (n) {
            et(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if ("string" === n)for (var t, r = 0, i = et(this), o = e.match(dt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === kt || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
        })
    }, hasClass: function (e) {
        for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(un, " ").indexOf(t) >= 0)return!0;
        return!1
    }});
    var ln = /\r/g;
    et.fn.extend({val: function (e) {
        var t, n, r, i = this[0];
        {
            if (arguments.length)return r = et.isFunction(e), this.each(function (n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, et(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : et.isArray(i) && (i = et.map(i, function (e) {
                    return null == e ? "" : e + ""
                })), t = et.valHooks[this.type] || et.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            });
            if (i)return t = et.valHooks[i.type] || et.valHooks[i.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ln, "") : null == n ? "" : n)
        }
    }}), et.extend({valHooks: {select: {get: function (e) {
        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, s = o ? null : [], a = o ? i + 1 : r.length, u = 0 > i ? a : o ? i : 0; a > u; u++)if (n = r[u], !(!n.selected && u !== i || (J.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && et.nodeName(n.parentNode, "optgroup"))) {
            if (t = et(n).val(), o)return t;
            s.push(t)
        }
        return s
    }, set: function (e, t) {
        for (var n, r, i = e.options, o = et.makeArray(t), s = i.length; s--;)r = i[s], (r.selected = et.inArray(et(r).val(), o) >= 0) && (n = !0);
        return n || (e.selectedIndex = -1), o
    }}}}), et.each(["radio", "checkbox"], function () {
        et.valHooks[this] = {set: function (e, t) {
            return et.isArray(t) ? e.checked = et.inArray(et(e).val(), t) >= 0 : void 0
        }}, J.checkOn || (et.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), et.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        et.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), et.fn.extend({hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }});
    var cn = et.now(), fn = /\?/;
    et.parseJSON = function (e) {
        return JSON.parse(e + "")
    }, et.parseXML = function (e) {
        var t, n;
        if (!e || "string" != typeof e)return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = void 0
        }
        return(!t || t.getElementsByTagName("parsererror").length) && et.error("Invalid XML: " + e), t
    };
    var pn, dn, hn = /#.*$/, gn = /([?&])_=[^&]*/, mn = /^(.*?):[ \t]*([^\r\n]*)$/gm, vn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, yn = /^(?:GET|HEAD)$/, xn = /^\/\//, bn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, wn = {}, Tn = {}, Cn = "*/".concat("*");
    try {
        dn = location.href
    } catch (Nn) {
        dn = K.createElement("a"), dn.href = "", dn = dn.href
    }
    pn = bn.exec(dn.toLowerCase()) || [], et.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: dn, type: "GET", isLocal: vn.test(pn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Cn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": et.parseJSON, "text xml": et.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? M(M(e, et.ajaxSettings), t) : M(et.ajaxSettings, e)
    }, ajaxPrefilter: F(wn), ajaxTransport: F(Tn), ajax: function (e, t) {
        function n(e, t, n, s) {
            var u, c, v, y, b, T = t;
            2 !== x && (x = 2, a && clearTimeout(a), r = void 0, o = s || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = R(f, w, n)), y = W(f, y, w, u), u ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (et.lastModified[i] = b), b = w.getResponseHeader("etag"), b && (et.etag[i] = b)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, c = y.data, v = y.error, u = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", u ? h.resolveWith(p, [c, T, w]) : h.rejectWith(p, [w, T, v]), w.statusCode(m), m = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? c : v]), g.fireWith(p, [w, T]), l && (d.trigger("ajaxComplete", [w, f]), --et.active || et.event.trigger("ajaxStop")))
        }

        "object" == typeof e && (t = e, e = void 0), t = t || {};
        var r, i, o, s, a, u, l, c, f = et.ajaxSetup({}, t), p = f.context || f, d = f.context && (p.nodeType || p.jquery) ? et(p) : et.event, h = et.Deferred(), g = et.Callbacks("once memory"), m = f.statusCode || {}, v = {}, y = {}, x = 0, b = "canceled", w = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === x) {
                if (!s)for (s = {}; t = mn.exec(o);)s[t[1].toLowerCase()] = t[2];
                t = s[e.toLowerCase()]
            }
            return null == t ? null : t
        }, getAllResponseHeaders: function () {
            return 2 === x ? o : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || (e = y[n] = y[n] || e, v[e] = t), this
        }, overrideMimeType: function (e) {
            return x || (f.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (2 > x)for (t in e)m[t] = [m[t], e[t]]; else w.always(e[w.status]);
            return this
        }, abort: function (e) {
            var t = e || b;
            return r && r.abort(t), n(0, t), this
        }};
        if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || dn) + "").replace(hn, "").replace(xn, pn[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = et.trim(f.dataType || "*").toLowerCase().match(dt) || [""], null == f.crossDomain && (u = bn.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === pn[1] && u[2] === pn[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (pn[3] || ("http:" === pn[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = et.param(f.data, f.traditional)), P(wn, f, t, w), 2 === x)return w;
        l = f.global, l && 0 === et.active++ && et.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !yn.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (fn.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = gn.test(i) ? i.replace(gn, "$1_=" + cn++) : i + (fn.test(i) ? "&" : "?") + "_=" + cn++)), f.ifModified && (et.lastModified[i] && w.setRequestHeader("If-Modified-Since", et.lastModified[i]), et.etag[i] && w.setRequestHeader("If-None-Match", et.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Cn + "; q=0.01" : "") : f.accepts["*"]);
        for (c in f.headers)w.setRequestHeader(c, f.headers[c]);
        if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === x))return w.abort();
        b = "abort";
        for (c in{success: 1, error: 1, complete: 1})w[c](f[c]);
        if (r = P(Tn, f, t, w)) {
            w.readyState = 1, l && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (a = setTimeout(function () {
                w.abort("timeout")
            }, f.timeout));
            try {
                x = 1, r.send(v, n)
            } catch (T) {
                if (!(2 > x))throw T;
                n(-1, T)
            }
        } else n(-1, "No Transport");
        return w
    }, getJSON: function (e, t, n) {
        return et.get(e, t, n, "json")
    }, getScript: function (e, t) {
        return et.get(e, void 0, t, "script")
    }}), et.each(["get", "post"], function (e, t) {
        et[t] = function (e, n, r, i) {
            return et.isFunction(n) && (i = i || r, r = n, n = void 0), et.ajax({url: e, type: t, dataType: i, data: n, success: r})
        }
    }), et.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        et.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), et._evalUrl = function (e) {
        return et.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, et.fn.extend({wrapAll: function (e) {
        var t;
        return et.isFunction(e) ? this.each(function (t) {
            et(this).wrapAll(e.call(this, t))
        }) : (this[0] && (t = et(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
            for (var e = this; e.firstElementChild;)e = e.firstElementChild;
            return e
        }).append(this)), this)
    }, wrapInner: function (e) {
        return et.isFunction(e) ? this.each(function (t) {
            et(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = et(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = et.isFunction(e);
        return this.each(function (n) {
            et(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            et.nodeName(this, "body") || et(this).replaceWith(this.childNodes)
        }).end()
    }}), et.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, et.expr.filters.visible = function (e) {
        return!et.expr.filters.hidden(e)
    };
    var kn = /%20/g, En = /\[\]$/, Dn = /\r?\n/g, jn = /^(?:submit|button|image|reset|file)$/i, Sn = /^(?:input|select|textarea|keygen)/i;
    et.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = et.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = et.ajaxSettings && et.ajaxSettings.traditional), et.isArray(e) || e.jquery && !et.isPlainObject(e))et.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)$(n, e[n], t, i);
        return r.join("&").replace(kn, "+")
    }, et.fn.extend({serialize: function () {
        return et.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = et.prop(this, "elements");
            return e ? et.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !et(this).is(":disabled") && Sn.test(this.nodeName) && !jn.test(e) && (this.checked || !Nt.test(e))
        }).map(function (e, t) {
            var n = et(this).val();
            return null == n ? null : et.isArray(n) ? et.map(n, function (e) {
                return{name: t.name, value: e.replace(Dn, "\r\n")}
            }) : {name: t.name, value: n.replace(Dn, "\r\n")}
        }).get()
    }}), et.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var An = 0, Ln = {}, qn = {0: 200, 1223: 204}, Hn = et.ajaxSettings.xhr();
    e.ActiveXObject && et(e).on("unload", function () {
        for (var e in Ln)Ln[e]()
    }), J.cors = !!Hn && "withCredentials"in Hn, J.ajax = Hn = !!Hn, et.ajaxTransport(function (e) {
        var t;
        return J.cors || Hn && !e.crossDomain ? {send: function (n, r) {
            var i, o = e.xhr(), s = ++An;
            if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
            e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
            for (i in n)o.setRequestHeader(i, n[i]);
            t = function (e) {
                return function () {
                    t && (delete Ln[s], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(qn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {text: o.responseText} : void 0, o.getAllResponseHeaders()))
                }
            }, o.onload = t(), o.onerror = t("error"), t = Ln[s] = t("abort"), o.send(e.hasContent && e.data || null)
        }, abort: function () {
            t && t()
        }} : void 0
    }), et.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return et.globalEval(e), e
    }}}), et.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), et.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return{send: function (r, i) {
                t = et("<script>").prop({async: !0, charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                    t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                }), K.head.appendChild(t[0])
            }, abort: function () {
                n && n()
            }}
        }
    });
    var On = [], Fn = /(=)\?(?=&|$)|\?\?/;
    et.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = On.pop() || et.expando + "_" + cn++;
        return this[e] = !0, e
    }}), et.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, o, s, a = t.jsonp !== !1 && (Fn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Fn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = et.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Fn, "$1" + i) : t.jsonp !== !1 && (t.url += (fn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return s || et.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            s = arguments
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, On.push(i)), s && et.isFunction(o) && o(s[0]), s = o = void 0
        }), "script") : void 0
    }), et.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || K;
        var r = st.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = et.buildFragment([e], t, i), i && i.length && et(i).remove(), et.merge([], r.childNodes))
    };
    var Pn = et.fn.load;
    et.fn.load = function (e, t, n) {
        if ("string" != typeof e && Pn)return Pn.apply(this, arguments);
        var r, i, o, s = this, a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), et.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), s.length > 0 && et.ajax({url: e, type: i, dataType: "html", data: t}).done(function (e) {
            o = arguments, s.html(r ? et("<div>").append(et.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
            s.each(n, o || [e.responseText, t, e])
        }), this
    }, et.expr.filters.animated = function (e) {
        return et.grep(et.timers, function (t) {
            return e === t.elem
        }).length
    };
    var Mn = e.document.documentElement;
    et.offset = {setOffset: function (e, t, n) {
        var r, i, o, s, a, u, l, c = et.css(e, "position"), f = et(e), p = {};
        "static" === c && (e.style.position = "relative"), a = f.offset(), o = et.css(e, "top"), u = et.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), et.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + i), "using"in t ? t.using.call(e, p) : f.css(p)
    }}, et.fn.extend({offset: function (e) {
        if (arguments.length)return void 0 === e ? this : this.each(function (t) {
            et.offset.setOffset(this, e, t)
        });
        var t, n, r = this[0], i = {top: 0, left: 0}, o = r && r.ownerDocument;
        if (o)return t = o.documentElement, et.contains(t, r) ? (typeof r.getBoundingClientRect !== kt && (i = r.getBoundingClientRect()), n = B(o), {top: i.top + n.pageYOffset - t.clientTop, left: i.left + n.pageXOffset - t.clientLeft}) : i
    }, position: function () {
        if (this[0]) {
            var e, t, n = this[0], r = {top: 0, left: 0};
            return"fixed" === et.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), et.nodeName(e[0], "html") || (r = e.offset()), r.top += et.css(e[0], "borderTopWidth", !0), r.left += et.css(e[0], "borderLeftWidth", !0)), {top: t.top - r.top - et.css(n, "marginTop", !0), left: t.left - r.left - et.css(n, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var e = this.offsetParent || Mn; e && !et.nodeName(e, "html") && "static" === et.css(e, "position");)e = e.offsetParent;
            return e || Mn
        })
    }}), et.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
        var r = "pageYOffset" === n;
        et.fn[t] = function (i) {
            return mt(this, function (t, i, o) {
                var s = B(t);
                return void 0 === o ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, void 0)
            }, t, i, arguments.length, null)
        }
    }), et.each(["top", "left"], function (e, t) {
        et.cssHooks[t] = T(J.pixelPosition, function (e, n) {
            return n ? (n = w(e, t), It.test(n) ? et(e).position()[t] + "px" : n) : void 0
        })
    }), et.each({Height: "height", Width: "width"}, function (e, t) {
        et.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            et.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r), s = n || (r === !0 || i === !0 ? "margin" : "border");
                return mt(this, function (t, n, r) {
                    var i;
                    return et.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? et.css(t, n, s) : et.style(t, n, r, s)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), et.fn.size = function () {
        return this.length
    }, et.fn.andSelf = et.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return et
    });
    var Rn = e.jQuery, Wn = e.$;
    return et.noConflict = function (t) {
        return e.$ === et && (e.$ = Wn), t && e.jQuery === et && (e.jQuery = Rn), et
    }, typeof t === kt && (e.jQuery = e.$ = et), et
});
(function () {
    function n(n, r, e) {
        for (var t = (e || 0) - 1, o = n ? n.length : 0; ++t < o;)if (n[t] === r)return t;
        return-1
    }

    function r(r, e) {
        var t = typeof e;
        if (r = r.cache, "boolean" == t || null == e)return r[e] ? 0 : -1;
        "number" != t && "string" != t && (t = "object");
        var o = "number" == t ? e : m + e;
        return r = (r = r[t]) && r[o], "object" == t ? r && n(r, e) > -1 ? 0 : -1 : r ? 0 : -1
    }

    function e(n) {
        var r = this.cache, e = typeof n;
        if ("boolean" == e || null == n)r[n] = !0; else {
            "number" != e && "string" != e && (e = "object");
            var t = "number" == e ? n : m + n, o = r[e] || (r[e] = {});
            "object" == e ? (o[t] || (o[t] = [])).push(n) : o[t] = !0
        }
    }

    function t(n) {
        return n.charCodeAt(0)
    }

    function o(n, r) {
        for (var e = n.criteria, t = r.criteria, o = -1, u = e.length; ++o < u;) {
            var a = e[o], i = t[o];
            if (a !== i) {
                if (a > i || "undefined" == typeof a)return 1;
                if (i > a || "undefined" == typeof i)return-1
            }
        }
        return n.index - r.index
    }

    function u(n) {
        var r = -1, t = n.length, o = n[0], u = n[t / 2 | 0], a = n[t - 1];
        if (o && "object" == typeof o && u && "object" == typeof u && a && "object" == typeof a)return!1;
        var i = l();
        i["false"] = i["null"] = i["true"] = i.undefined = !1;
        var c = l();
        for (c.array = n, c.cache = i, c.push = e; ++r < t;)c.push(n[r]);
        return c
    }

    function a(n) {
        return"\\" + Z[n]
    }

    function i() {
        return v.pop() || []
    }

    function l() {
        return y.pop() || {array: null, cache: null, criteria: null, "false": !1, index: 0, "null": !1, number: null, object: null, push: null, string: null, "true": !1, undefined: !1, value: null}
    }

    function c(n) {
        return"function" != typeof n.toString && "string" == typeof(n + "")
    }

    function f(n) {
        n.length = 0, v.length < w && v.push(n)
    }

    function s(n) {
        var r = n.cache;
        r && s(r), n.array = n.cache = n.criteria = n.object = n.number = n.string = n.value = null, y.length < w && y.push(n)
    }

    function p(n, r, e) {
        r || (r = 0), "undefined" == typeof e && (e = n ? n.length : 0);
        for (var t = -1, o = e - r || 0, u = Array(0 > o ? 0 : o); ++t < o;)u[t] = n[r + t];
        return u
    }

    function g(e) {
        function v(n) {
            return n && "object" == typeof n && !fo(n) && zt.call(n, "__wrapped__") ? n : new y(n)
        }

        function y(n, r) {
            this.__chain__ = !!r, this.__wrapped__ = n
        }

        function w(n) {
            function r() {
                if (t) {
                    var n = p(t);
                    Kt.apply(n, arguments)
                }
                if (this instanceof r) {
                    var u = rr(e.prototype), a = e.apply(u, n || arguments);
                    return $r(a) ? a : u
                }
                return e.apply(o, n || arguments)
            }

            var e = n[0], t = n[2], o = n[4];
            return co(r, n), r
        }

        function Z(n, r, e, t, o) {
            if (e) {
                var u = e(n);
                if ("undefined" != typeof u)return u
            }
            var a = $r(n);
            if (!a)return n;
            var l = Dt.call(n);
            if (!G[l] || !io.nodeClass && c(n))return n;
            var s = uo[l];
            switch (l) {
                case H:
                case W:
                    return new s(+n);
                case K:
                case V:
                    return new s(n);
                case M:
                    return u = s(n.source, O.exec(n)), u.lastIndex = n.lastIndex, u
            }
            var g = fo(n);
            if (r) {
                var h = !t;
                t || (t = i()), o || (o = i());
                for (var v = t.length; v--;)if (t[v] == n)return o[v];
                u = g ? s(n.length) : {}
            } else u = g ? p(n) : xo({}, n);
            return g && (zt.call(n, "index") && (u.index = n.index), zt.call(n, "input") && (u.input = n.input)), r ? (t.push(n), o.push(u), (g ? wo : Co)(n, function (n, a) {
                u[a] = Z(n, r, e, t, o)
            }), h && (f(t), f(o)), u) : u
        }

        function rr(n) {
            return $r(n) ? Qt(n) : {}
        }

        function er(n, r, e) {
            if ("function" != typeof n)return ot;
            if ("undefined" == typeof r || !("prototype"in n))return n;
            var t = n.__bindData__;
            if ("undefined" == typeof t && (io.funcNames && (t = !n.name), t = t || !io.funcDecomp, !t)) {
                var o = Wt.call(n);
                io.funcNames || (t = !S.test(o)), t || (t = N.test(o), co(n, t))
            }
            if (t === !1 || t !== !0 && 1 & t[1])return n;
            switch (e) {
                case 1:
                    return function (e) {
                        return n.call(r, e)
                    };
                case 2:
                    return function (e, t) {
                        return n.call(r, e, t)
                    };
                case 3:
                    return function (e, t, o) {
                        return n.call(r, e, t, o)
                    };
                case 4:
                    return function (e, t, o, u) {
                        return n.call(r, e, t, o, u)
                    }
            }
            return We(n, r)
        }

        function tr(n) {
            function r() {
                var n = l ? a : this;
                if (o) {
                    var h = p(o);
                    Kt.apply(h, arguments)
                }
                if ((u || f) && (h || (h = p(arguments)), u && Kt.apply(h, u), f && h.length < i))return t |= 16, tr([e, s ? t : -4 & t, h, null, a, i]);
                if (h || (h = arguments), c && (e = n[g]), this instanceof r) {
                    n = rr(e.prototype);
                    var v = e.apply(n, h);
                    return $r(v) ? v : n
                }
                return e.apply(n, h)
            }

            var e = n[0], t = n[1], o = n[2], u = n[3], a = n[4], i = n[5], l = 1 & t, c = 2 & t, f = 4 & t, s = 8 & t, g = e;
            return co(r, n), r
        }

        function or(e, t) {
            var o = -1, a = vr(), i = e ? e.length : 0, l = i >= _ && a === n, c = [];
            if (l) {
                var f = u(t);
                f ? (a = r, t = f) : l = !1
            }
            for (; ++o < i;) {
                var p = e[o];
                a(t, p) < 0 && c.push(p)
            }
            return l && s(t), c
        }

        function ar(n, r, e, t) {
            for (var o = (t || 0) - 1, u = n ? n.length : 0, a = []; ++o < u;) {
                var i = n[o];
                if (i && "object" == typeof i && "number" == typeof i.length && (fo(i) || mr(i))) {
                    r || (i = ar(i, r, e));
                    var l = -1, c = i.length, f = a.length;
                    for (a.length += c; ++l < c;)a[f++] = i[l]
                } else e || a.push(i)
            }
            return a
        }

        function ir(n, r, e, t, o, u) {
            if (e) {
                var a = e(n, r);
                if ("undefined" != typeof a)return!!a
            }
            if (n === r)return 0 !== n || 1 / n == 1 / r;
            var l = typeof n, s = typeof r;
            if (!(n !== n || n && Y[l] || r && Y[s]))return!1;
            if (null == n || null == r)return n === r;
            var p = Dt.call(n), g = Dt.call(r);
            if (p == F && (p = U), g == F && (g = U), p != g)return!1;
            switch (p) {
                case H:
                case W:
                    return+n == +r;
                case K:
                    return n != +n ? r != +r : 0 == n ? 1 / n == 1 / r : n == +r;
                case M:
                case V:
                    return n == St(r)
            }
            var h = p == B;
            if (!h) {
                var v = zt.call(n, "__wrapped__"), y = zt.call(r, "__wrapped__");
                if (v || y)return ir(v ? n.__wrapped__ : n, y ? r.__wrapped__ : r, e, t, o, u);
                if (p != U || !io.nodeClass && (c(n) || c(r)))return!1;
                var b = !io.argsObject && mr(n) ? Et : n.constructor, d = !io.argsObject && mr(r) ? Et : r.constructor;
                if (b != d && !(Dr(b) && b instanceof b && Dr(d) && d instanceof d) && "constructor"in n && "constructor"in r)return!1
            }
            var m = !o;
            o || (o = i()), u || (u = i());
            for (var _ = o.length; _--;)if (o[_] == n)return u[_] == r;
            var w = 0;
            if (a = !0, o.push(n), u.push(r), h) {
                if (_ = n.length, w = r.length, a = w == _, a || t)for (; w--;) {
                    var x = _, j = r[w];
                    if (t)for (; x-- && !(a = ir(n[x], j, e, t, o, u));); else if (!(a = ir(n[w], j, e, t, o, u)))break
                }
            } else ko(r, function (r, i, l) {
                return zt.call(l, i) ? (w++, a = zt.call(n, i) && ir(n[i], r, e, t, o, u)) : void 0
            }), a && !t && ko(n, function (n, r, e) {
                return zt.call(e, r) ? a = --w > -1 : void 0
            });
            return o.pop(), u.pop(), m && (f(o), f(u)), a
        }

        function lr(n, r, e, t, o) {
            (fo(r) ? te : Co)(r, function (r, u) {
                var a, i, l = r, c = n[u];
                if (r && ((i = fo(r)) || Po(r))) {
                    for (var f = t.length; f--;)if (a = t[f] == r) {
                        c = o[f];
                        break
                    }
                    if (!a) {
                        var s;
                        e && (l = e(c, r), (s = "undefined" != typeof l) && (c = l)), s || (c = i ? fo(c) ? c : [] : Po(c) ? c : {}), t.push(r), o.push(c), s || lr(c, r, e, t, o)
                    }
                } else e && (l = e(c, r), "undefined" == typeof l && (l = r)), "undefined" != typeof l && (c = l);
                n[u] = c
            })
        }

        function cr(n, r) {
            return n + Ht(oo() * (r - n + 1))
        }

        function fr(e, t, o) {
            var a = -1, l = vr(), c = e ? e.length : 0, p = [], g = !t && c >= _ && l === n, h = o || g ? i() : p;
            if (g) {
                var v = u(h);
                l = r, h = v
            }
            for (; ++a < c;) {
                var y = e[a], b = o ? o(y, a, e) : y;
                (t ? !a || h[h.length - 1] !== b : l(h, b) < 0) && ((o || g) && h.push(b), p.push(y))
            }
            return g ? (f(h.array), s(h)) : o && f(h), p
        }

        function sr(n) {
            return function (r, e, t) {
                var o = {};
                if (e = v.createCallback(e, t, 3), fo(r))for (var u = -1, a = r.length; ++u < a;) {
                    var i = r[u];
                    n(o, i, e(i, u, r), r)
                } else wo(r, function (r, t, u) {
                    n(o, r, e(r, t, u), u)
                });
                return o
            }
        }

        function pr(n, r, e, t, o, u) {
            var a = 1 & r, i = 2 & r, l = 4 & r, c = 16 & r, f = 32 & r;
            if (!i && !Dr(n))throw new At;
            c && !e.length && (r &= -17, c = e = !1), f && !t.length && (r &= -33, f = t = !1);
            var s = n && n.__bindData__;
            if (s && s !== !0)return s = p(s), s[2] && (s[2] = p(s[2])), s[3] && (s[3] = p(s[3])), !a || 1 & s[1] || (s[4] = o), !a && 1 & s[1] && (r |= 8), !l || 4 & s[1] || (s[5] = u), c && Kt.apply(s[2] || (s[2] = []), e), f && Gt.apply(s[3] || (s[3] = []), t), s[1] |= r, pr.apply(null, s);
            var g = 1 == r || 17 === r ? w : tr;
            return g([n, r, e, t, o, u])
        }

        function gr() {
            X.shadowedProps = D, X.array = X.bottom = X.loop = X.top = "", X.init = "iterable", X.useHas = !0;
            for (var n, r = 0; n = arguments[r]; r++)for (var e in n)X[e] = n[e];
            var t = X.args;
            X.firstArg = /^[^,]+/.exec(t)[0];
            var o = kt("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + t + ") {\n" + lo(X) + "\n}");
            return o(er, q, Lt, zt, d, mr, fo, qr, X.keys, Nt, Y, ao, V, Rt, Dt)
        }

        function hr(n) {
            return yo[n]
        }

        function vr() {
            var r = (r = v.indexOf) === ke ? n : r;
            return r
        }

        function yr(n) {
            return"function" == typeof n && $t.test(n)
        }

        function br(n) {
            var r, e;
            return!n || Dt.call(n) != U || (r = n.constructor, Dr(r) && !(r instanceof r)) || !io.argsClass && mr(n) || !io.nodeClass && c(n) ? !1 : io.ownLast ? (ko(n, function (n, r, t) {
                return e = zt.call(t, r), !1
            }), e !== !1) : (ko(n, function (n, r) {
                e = r
            }), "undefined" == typeof e || zt.call(n, e))
        }

        function dr(n) {
            return bo[n]
        }

        function mr(n) {
            return n && "object" == typeof n && "number" == typeof n.length && Dt.call(n) == F || !1
        }

        function _r(n, r, e, t) {
            return"boolean" != typeof r && null != r && (t = e, e = r, r = !1), Z(n, r, "function" == typeof e && er(e, t, 1))
        }

        function wr(n, r, e) {
            return Z(n, !0, "function" == typeof r && er(r, e, 1))
        }

        function xr(n, r) {
            var e = rr(n);
            return r ? xo(e, r) : e
        }

        function jr(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), Co(n, function (n, e, o) {
                return r(n, e, o) ? (t = e, !1) : void 0
            }), t
        }

        function kr(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), Pr(n, function (n, e, o) {
                return r(n, e, o) ? (t = e, !1) : void 0
            }), t
        }

        function Cr(n, r, e) {
            var t = [];
            ko(n, function (n, r) {
                t.push(r, n)
            });
            var o = t.length;
            for (r = er(r, e, 3); o-- && r(t[o--], t[o], n) !== !1;);
            return n
        }

        function Pr(n, r, e) {
            var t = po(n), o = t.length;
            for (r = er(r, e, 3); o--;) {
                var u = t[o];
                if (r(n[u], u, n) === !1)break
            }
            return n
        }

        function Er(n) {
            var r = [];
            return ko(n, function (n, e) {
                Dr(n) && r.push(e)
            }), r.sort()
        }

        function Or(n, r) {
            return n ? zt.call(n, r) : !1
        }

        function Sr(n) {
            for (var r = -1, e = po(n), t = e.length, o = {}; ++r < t;) {
                var u = e[r];
                o[n[u]] = u
            }
            return o
        }

        function Ar(n) {
            return n === !0 || n === !1 || n && "object" == typeof n && Dt.call(n) == H || !1
        }

        function Ir(n) {
            return n && "object" == typeof n && Dt.call(n) == W || !1
        }

        function Lr(n) {
            return n && 1 === n.nodeType || !1
        }

        function Nr(n) {
            var r = !0;
            if (!n)return r;
            var e = Dt.call(n), t = n.length;
            return e == B || e == V || (io.argsClass ? e == F : mr(n)) || e == U && "number" == typeof t && Dr(n.splice) ? !t : (Co(n, function () {
                return r = !1
            }), r)
        }

        function Rr(n, r, e, t) {
            return ir(n, r, "function" == typeof e && er(e, t, 2))
        }

        function Tr(n) {
            return Yt(n) && !Zt(parseFloat(n))
        }

        function Dr(n) {
            return"function" == typeof n
        }

        function $r(n) {
            return!(!n || !Y[typeof n])
        }

        function Fr(n) {
            return Hr(n) && n != +n
        }

        function Br(n) {
            return null === n
        }

        function Hr(n) {
            return"number" == typeof n || n && "object" == typeof n && Dt.call(n) == K || !1
        }

        function Wr(n) {
            return n && Y[typeof n] && Dt.call(n) == M || !1
        }

        function qr(n) {
            return"string" == typeof n || n && "object" == typeof n && Dt.call(n) == V || !1
        }

        function zr(n) {
            return"undefined" == typeof n
        }

        function Kr(n, r, e) {
            var t = {};
            return r = v.createCallback(r, e, 3), Co(n, function (n, e, o) {
                t[e] = r(n, e, o)
            }), t
        }

        function Ur(n) {
            var r = arguments, e = 2;
            if (!$r(n))return n;
            if ("number" != typeof r[2] && (e = r.length), e > 3 && "function" == typeof r[e - 2])var t = er(r[--e - 1], r[e--], 2); else e > 2 && "function" == typeof r[e - 1] && (t = r[--e]);
            for (var o = p(arguments, 1, e), u = -1, a = i(), l = i(); ++u < e;)lr(n, o[u], t, a, l);
            return f(a), f(l), n
        }

        function Mr(n, r, e) {
            var t = {};
            if ("function" != typeof r) {
                var o = [];
                ko(n, function (n, r) {
                    o.push(r)
                }), o = or(o, ar(arguments, !0, !1, 1));
                for (var u = -1, a = o.length; ++u < a;) {
                    var i = o[u];
                    t[i] = n[i]
                }
            } else r = v.createCallback(r, e, 3), ko(n, function (n, e, o) {
                r(n, e, o) || (t[e] = n)
            });
            return t
        }

        function Vr(n) {
            for (var r = -1, e = po(n), t = e.length, o = _t(t); ++r < t;) {
                var u = e[r];
                o[r] = [u, n[u]]
            }
            return o
        }

        function Gr(n, r, e) {
            var t = {};
            if ("function" != typeof r)for (var o = -1, u = ar(arguments, !0, !1, 1), a = $r(n) ? u.length : 0; ++o < a;) {
                var i = u[o];
                i in n && (t[i] = n[i])
            } else r = v.createCallback(r, e, 3), ko(n, function (n, e, o) {
                r(n, e, o) && (t[e] = n)
            });
            return t
        }

        function Jr(n, r, e, t) {
            var o = fo(n);
            if (null == e)if (o)e = []; else {
                var u = n && n.constructor, a = u && u.prototype;
                e = rr(a)
            }
            return r && (r = v.createCallback(r, t, 4), (o ? wo : Co)(n, function (n, t, o) {
                return r(e, n, t, o)
            })), e
        }

        function Qr(n) {
            for (var r = -1, e = po(n), t = e.length, o = _t(t); ++r < t;)o[r] = n[e[r]];
            return o
        }

        function Xr(n) {
            var r = arguments, e = -1, t = ar(r, !0, !1, 1), o = r[2] && r[2][r[1]] === n ? 1 : t.length, u = _t(o);
            for (io.unindexedChars && qr(n) && (n = n.split("")); ++e < o;)u[e] = n[t[e]];
            return u
        }

        function Yr(n, r, e) {
            var t = -1, o = vr(), u = n ? n.length : 0, a = !1;
            return e = (0 > e ? ro(0, u + e) : e) || 0, fo(n) ? a = o(n, r, e) > -1 : "number" == typeof u ? a = (qr(n) ? n.indexOf(r, e) : o(n, r, e)) > -1 : wo(n, function (n) {
                return++t >= e ? !(a = n === r) : void 0
            }), a
        }

        function Zr(n, r, e) {
            var t = !0;
            if (r = v.createCallback(r, e, 3), fo(n))for (var o = -1, u = n.length; ++o < u && (t = !!r(n[o], o, n));); else wo(n, function (n, e, o) {
                return t = !!r(n, e, o)
            });
            return t
        }

        function ne(n, r, e) {
            var t = [];
            if (r = v.createCallback(r, e, 3), fo(n))for (var o = -1, u = n.length; ++o < u;) {
                var a = n[o];
                r(a, o, n) && t.push(a)
            } else wo(n, function (n, e, o) {
                r(n, e, o) && t.push(n)
            });
            return t
        }

        function re(n, r, e) {
            if (r = v.createCallback(r, e, 3), !fo(n)) {
                var t;
                return wo(n, function (n, e, o) {
                    return r(n, e, o) ? (t = n, !1) : void 0
                }), t
            }
            for (var o = -1, u = n.length; ++o < u;) {
                var a = n[o];
                if (r(a, o, n))return a
            }
        }

        function ee(n, r, e) {
            var t;
            return r = v.createCallback(r, e, 3), oe(n, function (n, e, o) {
                return r(n, e, o) ? (t = n, !1) : void 0
            }), t
        }

        function te(n, r, e) {
            if (r && "undefined" == typeof e && fo(n))for (var t = -1, o = n.length; ++t < o && r(n[t], t, n) !== !1;); else wo(n, r, e);
            return n
        }

        function oe(n, r, e) {
            var t = n, o = n ? n.length : 0;
            if (r = r && "undefined" == typeof e ? r : er(r, e, 3), fo(n))for (; o-- && r(n[o], o, n) !== !1;); else {
                if ("number" != typeof o) {
                    var u = po(n);
                    o = u.length
                } else io.unindexedChars && qr(n) && (t = n.split(""));
                wo(n, function (n, e, a) {
                    return e = u ? u[--o] : --o, r(t[e], e, a)
                })
            }
            return n
        }

        function ue(n, r) {
            var e = p(arguments, 2), t = -1, o = "function" == typeof r, u = n ? n.length : 0, a = _t("number" == typeof u ? u : 0);
            return te(n, function (n) {
                a[++t] = (o ? r : n[r]).apply(n, e)
            }), a
        }

        function ae(n, r, e) {
            var t = -1, o = n ? n.length : 0, u = _t("number" == typeof o ? o : 0);
            if (r = v.createCallback(r, e, 3), fo(n))for (; ++t < o;)u[t] = r(n[t], t, n); else wo(n, function (n, e, o) {
                u[++t] = r(n, e, o)
            });
            return u
        }

        function ie(n, r, e) {
            var o = -1 / 0, u = o;
            if ("function" != typeof r && e && e[r] === n && (r = null), null == r && fo(n))for (var a = -1, i = n.length; ++a < i;) {
                var l = n[a];
                l > u && (u = l)
            } else r = null == r && qr(n) ? t : v.createCallback(r, e, 3), wo(n, function (n, e, t) {
                var a = r(n, e, t);
                a > o && (o = a, u = n)
            });
            return u
        }

        function le(n, r, e) {
            var o = 1 / 0, u = o;
            if ("function" != typeof r && e && e[r] === n && (r = null), null == r && fo(n))for (var a = -1, i = n.length; ++a < i;) {
                var l = n[a];
                u > l && (u = l)
            } else r = null == r && qr(n) ? t : v.createCallback(r, e, 3), wo(n, function (n, e, t) {
                var a = r(n, e, t);
                o > a && (o = a, u = n)
            });
            return u
        }

        function ce(n, r, e, t) {
            var o = arguments.length < 3;
            if (r = v.createCallback(r, t, 4), fo(n)) {
                var u = -1, a = n.length;
                for (o && (e = n[++u]); ++u < a;)e = r(e, n[u], u, n)
            } else wo(n, function (n, t, u) {
                e = o ? (o = !1, n) : r(e, n, t, u)
            });
            return e
        }

        function fe(n, r, e, t) {
            var o = arguments.length < 3;
            return r = v.createCallback(r, t, 4), oe(n, function (n, t, u) {
                e = o ? (o = !1, n) : r(e, n, t, u)
            }), e
        }

        function se(n, r, e) {
            return r = v.createCallback(r, e, 3), ne(n, function (n, e, t) {
                return!r(n, e, t)
            })
        }

        function pe(n, r, e) {
            if (n && "number" != typeof n.length ? n = Qr(n) : io.unindexedChars && qr(n) && (n = n.split("")), null == r || e)return n ? n[cr(0, n.length - 1)] : h;
            var t = ge(n);
            return t.length = eo(ro(0, r), t.length), t
        }

        function ge(n) {
            var r = -1, e = n ? n.length : 0, t = _t("number" == typeof e ? e : 0);
            return te(n, function (n) {
                var e = cr(0, ++r);
                t[r] = t[e], t[e] = n
            }), t
        }

        function he(n) {
            var r = n ? n.length : 0;
            return"number" == typeof r ? r : po(n).length
        }

        function ve(n, r, e) {
            var t;
            if (r = v.createCallback(r, e, 3), fo(n))for (var o = -1, u = n.length; ++o < u && !(t = r(n[o], o, n));); else wo(n, function (n, e, o) {
                return!(t = r(n, e, o))
            });
            return!!t
        }

        function ye(n, r, e) {
            var t = -1, u = fo(r), a = n ? n.length : 0, c = _t("number" == typeof a ? a : 0);
            for (u || (r = v.createCallback(r, e, 3)), te(n, function (n, e, o) {
                var a = c[++t] = l();
                u ? a.criteria = ae(r, function (r) {
                    return n[r]
                }) : (a.criteria = i())[0] = r(n, e, o), a.index = t, a.value = n
            }), a = c.length, c.sort(o); a--;) {
                var p = c[a];
                c[a] = p.value, u || f(p.criteria), s(p)
            }
            return c
        }

        function be(n) {
            return n && "number" == typeof n.length ? io.unindexedChars && qr(n) ? n.split("") : p(n) : Qr(n)
        }

        function de(n) {
            for (var r = -1, e = n ? n.length : 0, t = []; ++r < e;) {
                var o = n[r];
                o && t.push(o)
            }
            return t
        }

        function me(n) {
            return or(n, ar(arguments, !0, !0, 1))
        }

        function _e(n, r, e) {
            var t = -1, o = n ? n.length : 0;
            for (r = v.createCallback(r, e, 3); ++t < o;)if (r(n[t], t, n))return t;
            return-1
        }

        function we(n, r, e) {
            var t = n ? n.length : 0;
            for (r = v.createCallback(r, e, 3); t--;)if (r(n[t], t, n))return t;
            return-1
        }

        function xe(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = -1;
                for (r = v.createCallback(r, e, 3); ++u < o && r(n[u], u, n);)t++
            } else if (t = r, null == t || e)return n ? n[0] : h;
            return p(n, 0, eo(ro(0, t), o))
        }

        function je(n, r, e, t) {
            return"boolean" != typeof r && null != r && (t = e, e = "function" != typeof r && t && t[r] === n ? null : r, r = !1), null != e && (n = ae(n, e, t)), ar(n, r)
        }

        function ke(r, e, t) {
            if ("number" == typeof t) {
                var o = r ? r.length : 0;
                t = 0 > t ? ro(0, o + t) : t || 0
            } else if (t) {
                var u = Ne(r, e);
                return r[u] === e ? u : -1
            }
            return n(r, e, t)
        }

        function Ce(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = o;
                for (r = v.createCallback(r, e, 3); u-- && r(n[u], u, n);)t++
            } else t = null == r || e ? 1 : r || t;
            return p(n, 0, eo(ro(0, o - t), o))
        }

        function Pe() {
            for (var e = [], t = -1, o = arguments.length, a = i(), l = vr(), c = l === n, p = i(); ++t < o;) {
                var g = arguments[t];
                (fo(g) || mr(g)) && (e.push(g), a.push(c && g.length >= _ && u(t ? e[t] : p)))
            }
            var h = e[0], v = -1, y = h ? h.length : 0, b = [];
            n:for (; ++v < y;) {
                var d = a[0];
                if (g = h[v], (d ? r(d, g) : l(p, g)) < 0) {
                    for (t = o, (d || p).push(g); --t;)if (d = a[t], (d ? r(d, g) : l(e[t], g)) < 0)continue n;
                    b.push(g)
                }
            }
            for (; o--;)d = a[o], d && s(d);
            return f(a), f(p), b
        }

        function Ee(n, r, e) {
            var t = 0, o = n ? n.length : 0;
            if ("number" != typeof r && null != r) {
                var u = o;
                for (r = v.createCallback(r, e, 3); u-- && r(n[u], u, n);)t++
            } else if (t = r, null == t || e)return n ? n[o - 1] : h;
            return p(n, ro(0, o - t))
        }

        function Oe(n, r, e) {
            var t = n ? n.length : 0;
            for ("number" == typeof e && (t = (0 > e ? ro(0, t + e) : eo(e, t - 1)) + 1); t--;)if (n[t] === r)return t;
            return-1
        }

        function Se(n) {
            for (var r = arguments, e = 0, t = r.length, o = n ? n.length : 0; ++e < t;)for (var u = -1, a = r[e]; ++u < o;)n[u] === a && (Vt.call(n, u--, 1), o--);
            return n
        }

        function Ae(n, r, e) {
            n = +n || 0, e = "number" == typeof e ? e : +e || 1, null == r && (r = n, n = 0);
            for (var t = -1, o = ro(0, Ft((r - n) / (e || 1))), u = _t(o); ++t < o;)u[t] = n, n += e;
            return u
        }

        function Ie(n, r, e) {
            var t = -1, o = n ? n.length : 0, u = [];
            for (r = v.createCallback(r, e, 3); ++t < o;) {
                var a = n[t];
                r(a, t, n) && (u.push(a), Vt.call(n, t--, 1), o--)
            }
            return u
        }

        function Le(n, r, e) {
            if ("number" != typeof r && null != r) {
                var t = 0, o = -1, u = n ? n.length : 0;
                for (r = v.createCallback(r, e, 3); ++o < u && r(n[o], o, n);)t++
            } else t = null == r || e ? 1 : ro(0, r);
            return p(n, t)
        }

        function Ne(n, r, e, t) {
            var o = 0, u = n ? n.length : o;
            for (e = e ? v.createCallback(e, t, 1) : ot, r = e(r); u > o;) {
                var a = o + u >>> 1;
                e(n[a]) < r ? o = a + 1 : u = a
            }
            return o
        }

        function Re() {
            return fr(ar(arguments, !0, !0))
        }

        function Te(n, r, e, t) {
            return"boolean" != typeof r && null != r && (t = e, e = "function" != typeof r && t && t[r] === n ? null : r, r = !1), null != e && (e = v.createCallback(e, t, 3)), fr(n, r, e)
        }

        function De(n) {
            return or(n, p(arguments, 1))
        }

        function $e() {
            for (var n = -1, r = arguments.length; ++n < r;) {
                var e = arguments[n];
                if (fo(e) || mr(e))var t = t ? fr(or(t, e).concat(or(e, t))) : e
            }
            return t || []
        }

        function Fe() {
            for (var n = arguments.length > 1 ? arguments : arguments[0], r = -1, e = n ? ie(Ao(n, "length")) : 0, t = _t(0 > e ? 0 : e); ++r < e;)t[r] = Ao(n, r);
            return t
        }

        function Be(n, r) {
            var e = -1, t = n ? n.length : 0, o = {};
            for (r || !t || fo(n[0]) || (r = []); ++e < t;) {
                var u = n[e];
                r ? o[u] = r[e] : u && (o[u[0]] = u[1])
            }
            return o
        }

        function He(n, r) {
            if (!Dr(r))throw new At;
            return function () {
                return--n < 1 ? r.apply(this, arguments) : void 0
            }
        }

        function We(n, r) {
            return arguments.length > 2 ? pr(n, 17, p(arguments, 2), null, r) : pr(n, 1, null, null, r)
        }

        function qe(n) {
            for (var r = arguments.length > 1 ? ar(arguments, !0, !1, 1) : Er(n), e = -1, t = r.length; ++e < t;) {
                var o = r[e];
                n[o] = pr(n[o], 1, null, null, n)
            }
            return n
        }

        function ze(n, r) {
            return arguments.length > 2 ? pr(r, 19, p(arguments, 2), null, n) : pr(r, 3, null, null, n)
        }

        function Ke() {
            for (var n = arguments, r = n.length; r--;)if (!Dr(n[r]))throw new At;
            return function () {
                for (var r = arguments, e = n.length; e--;)r = [n[e].apply(this, r)];
                return r[0]
            }
        }

        function Ue(n, r) {
            return r = "number" == typeof r ? r : +r || n.length, pr(n, 4, null, null, null, r)
        }

        function Me(n, r, e) {
            var t, o, u, a, i, l, c, f = 0, s = !1, p = !0;
            if (!Dr(n))throw new At;
            if (r = ro(0, r) || 0, e === !0) {
                var g = !0;
                p = !1
            } else $r(e) && (g = e.leading, s = "maxWait"in e && (ro(r, e.maxWait) || 0), p = "trailing"in e ? e.trailing : p);
            var v = function () {
                var e = r - (Lo() - a);
                if (0 >= e) {
                    o && Bt(o);
                    var s = c;
                    o = l = c = h, s && (f = Lo(), u = n.apply(i, t), l || o || (t = i = null))
                } else l = Mt(v, e)
            }, y = function () {
                l && Bt(l), o = l = c = h, (p || s !== r) && (f = Lo(), u = n.apply(i, t), l || o || (t = i = null))
            };
            return function () {
                if (t = arguments, a = Lo(), i = this, c = p && (l || !g), s === !1)var e = g && !l; else {
                    o || g || (f = a);
                    var h = s - (a - f), b = 0 >= h;
                    b ? (o && (o = Bt(o)), f = a, u = n.apply(i, t)) : o || (o = Mt(y, h))
                }
                return b && l ? l = Bt(l) : l || r === s || (l = Mt(v, r)), e && (b = !0, u = n.apply(i, t)), !b || l || o || (t = i = null), u
            }
        }

        function Ve(n) {
            if (!Dr(n))throw new At;
            var r = p(arguments, 1);
            return Mt(function () {
                n.apply(h, r)
            }, 1)
        }

        function Ge(n, r) {
            if (!Dr(n))throw new At;
            var e = p(arguments, 2);
            return Mt(function () {
                n.apply(h, e)
            }, r)
        }

        function Je(n, r) {
            if (!Dr(n))throw new At;
            var e = function () {
                var t = e.cache, o = r ? r.apply(this, arguments) : m + arguments[0];
                return zt.call(t, o) ? t[o] : t[o] = n.apply(this, arguments)
            };
            return e.cache = {}, e
        }

        function Qe(n) {
            var r, e;
            if (!Dr(n))throw new At;
            return function () {
                return r ? e : (r = !0, e = n.apply(this, arguments), n = null, e)
            }
        }

        function Xe(n) {
            return pr(n, 16, p(arguments, 1))
        }

        function Ye(n) {
            return pr(n, 32, null, p(arguments, 1))
        }

        function Ze(n, r, e) {
            var t = !0, o = !0;
            if (!Dr(n))throw new At;
            return e === !1 ? t = !1 : $r(e) && (t = "leading"in e ? e.leading : t, o = "trailing"in e ? e.trailing : o), J.leading = t, J.maxWait = r, J.trailing = o, Me(n, r, J)
        }

        function nt(n, r) {
            return pr(r, 16, [n])
        }

        function rt(n) {
            return function () {
                return n
            }
        }

        function et(n, r, e) {
            var t = typeof n;
            if (null == n || "function" == t)return er(n, r, e);
            if ("object" != t)return lt(n);
            var o = po(n), u = o[0], a = n[u];
            return 1 != o.length || a !== a || $r(a) ? function (r) {
                for (var e = o.length, t = !1; e-- && (t = ir(r[o[e]], n[o[e]], null, !0)););
                return t
            } : function (n) {
                var r = n[u];
                return a === r && (0 !== a || 1 / a == 1 / r)
            }
        }

        function tt(n) {
            return null == n ? "" : St(n).replace(_o, hr)
        }

        function ot(n) {
            return n
        }

        function ut(n, r, e) {
            var t = !0, o = r && Er(r);
            r && (e || o.length) || (null == e && (e = r), u = y, r = n, n = v, o = Er(r)), e === !1 ? t = !1 : $r(e) && "chain"in e && (t = e.chain);
            var u = n, a = Dr(u);
            te(o, function (e) {
                var o = n[e] = r[e];
                a && (u.prototype[e] = function () {
                    var r = this.__chain__, e = this.__wrapped__, a = [e];
                    Kt.apply(a, arguments);
                    var i = o.apply(n, a);
                    if (t || r) {
                        if (e === i && $r(i))return this;
                        i = new u(i), i.__chain__ = r
                    }
                    return i
                })
            })
        }

        function at() {
            return e._ = Tt, this
        }

        function it() {
        }

        function lt(n) {
            return function (r) {
                return r[n]
            }
        }

        function ct(n, r, e) {
            var t = null == n, o = null == r;
            if (null == e && ("boolean" == typeof n && o ? (e = n, n = 1) : o || "boolean" != typeof r || (e = r, o = !0)), t && o && (r = 1), n = +n || 0, o ? (r = n, n = 0) : r = +r || 0, e || n % 1 || r % 1) {
                var u = oo();
                return eo(n + u * (r - n + parseFloat("1e-" + ((u + "").length - 1))), r)
            }
            return cr(n, r)
        }

        function ft(n, r) {
            if (n) {
                var e = n[r];
                return Dr(e) ? n[r]() : e
            }
        }

        function st(n, r, e) {
            var t = v.templateSettings;
            n = St(n || ""), e = jo({}, e, t);
            var o, u = jo({}, e.imports, t.imports), i = po(u), l = Qr(u), c = 0, f = e.interpolate || L, s = "__p += '", p = Ot((e.escape || L).source + "|" + f.source + "|" + (f === A ? E : L).source + "|" + (e.evaluate || L).source + "|$", "g");
            n.replace(p, function (r, e, t, u, i, l) {
                return t || (t = u), s += n.slice(c, l).replace(R, a), e && (s += "' +\n__e(" + e + ") +\n'"), i && (o = !0, s += "';\n" + i + ";\n__p += '"), t && (s += "' +\n((__t = (" + t + ")) == null ? '' : __t) +\n'"), c = l + r.length, r
            }), s += "';\n";
            var g = e.variable, y = g;
            y || (g = "obj", s = "with (" + g + ") {\n" + s + "\n}\n"), s = (o ? s.replace(j, "") : s).replace(C, "$1").replace(P, "$1;"), s = "function(" + g + ") {\n" + (y ? "" : g + " || (" + g + " = {});\n") + "var __t, __p = '', __e = _.escape" + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + s + "return __p\n}";
            var b = "\n/*\n//# sourceURL=" + (e.sourceURL || "/lodash/template/source[" + $++ + "]") + "\n*/";
            try {
                var d = kt(i, "return " + s + b).apply(h, l)
            } catch (m) {
                throw m.source = s, m
            }
            return r ? d(r) : (d.source = s, d)
        }

        function pt(n, r, e) {
            n = (n = +n) > -1 ? n : 0;
            var t = -1, o = _t(n);
            for (r = er(r, e, 1); ++t < n;)o[t] = r(t);
            return o
        }

        function gt(n) {
            return null == n ? "" : St(n).replace(mo, dr)
        }

        function ht(n) {
            var r = ++b;
            return St(null == n ? "" : n) + r
        }

        function vt(n) {
            return n = new y(n), n.__chain__ = !0, n
        }

        function yt(n, r) {
            return r(n), n
        }

        function bt() {
            return this.__chain__ = !0, this
        }

        function dt() {
            return St(this.__wrapped__)
        }

        function mt() {
            return this.__wrapped__
        }

        e = e ? ur.defaults(nr.Object(), e, ur.pick(nr, T)) : nr;
        var _t = e.Array, wt = e.Boolean, xt = e.Date, jt = e.Error, kt = e.Function, Ct = e.Math, Pt = e.Number, Et = e.Object, Ot = e.RegExp, St = e.String, At = e.TypeError, It = [], Lt = jt.prototype, Nt = Et.prototype, Rt = St.prototype, Tt = e._, Dt = Nt.toString, $t = Ot("^" + St(Dt).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), Ft = Ct.ceil, Bt = e.clearTimeout, Ht = Ct.floor, Wt = kt.prototype.toString, qt = yr(qt = Et.getPrototypeOf) && qt, zt = Nt.hasOwnProperty, Kt = It.push, Ut = Nt.propertyIsEnumerable, Mt = e.setTimeout, Vt = It.splice, Gt = It.unshift, Jt = function () {
            try {
                var n = {}, r = yr(r = Et.defineProperty) && r, e = r(n, n, n) && r
            } catch (t) {
            }
            return e
        }(), Qt = yr(Qt = Et.create) && Qt, Xt = yr(Xt = _t.isArray) && Xt, Yt = e.isFinite, Zt = e.isNaN, no = yr(no = Et.keys) && no, ro = Ct.max, eo = Ct.min, to = e.parseInt, oo = Ct.random, uo = {};
        uo[B] = _t, uo[H] = wt, uo[W] = xt, uo[z] = kt, uo[U] = Et, uo[K] = Pt, uo[M] = Ot, uo[V] = St;
        var ao = {};
        ao[B] = ao[W] = ao[K] = {constructor: !0, toLocaleString: !0, toString: !0, valueOf: !0}, ao[H] = ao[V] = {constructor: !0, toString: !0, valueOf: !0}, ao[q] = ao[z] = ao[M] = {constructor: !0, toString: !0}, ao[U] = {constructor: !0}, function () {
            for (var n = D.length; n--;) {
                var r = D[n];
                for (var e in ao)zt.call(ao, e) && !zt.call(ao[e], r) && (ao[e][r] = !1)
            }
        }(), y.prototype = v.prototype;
        var io = v.support = {};
        !function () {
            var n = function () {
                this.x = 1
            }, r = {0: 1, length: 1}, t = [];
            n.prototype = {valueOf: 1, y: 1};
            for (var o in new n)t.push(o);
            for (o in arguments);
            io.argsClass = Dt.call(arguments) == F, io.argsObject = arguments.constructor == Et && !(arguments instanceof _t), io.enumErrorProps = Ut.call(Lt, "message") || Ut.call(Lt, "name"), io.enumPrototypes = Ut.call(n, "prototype"), io.funcDecomp = !yr(e.WinRTError) && N.test(g), io.funcNames = "string" == typeof kt.name, io.nonEnumArgs = 0 != o, io.nonEnumShadows = !/valueOf/.test(t), io.ownLast = "x" != t[0], io.spliceObjects = (It.splice.call(r, 0, 1), !r[0]), io.unindexedChars = "x"[0] + Et("x")[0] != "xx";
            try {
                io.nodeClass = !(Dt.call(document) == U && !({toString: 0} + ""))
            } catch (u) {
                io.nodeClass = !0
            }
        }(1), v.templateSettings = {escape: /<%-([\s\S]+?)%>/g, evaluate: /<%([\s\S]+?)%>/g, interpolate: A, variable: "", imports: {_: v}};
        var lo = function (n) {
            var r = "var index, iterable = " + n.firstArg + ", result = " + n.init + ";\nif (!iterable) return result;\n" + n.top + ";";
            n.array ? (r += "\nvar length = iterable.length; index = -1;\nif (" + n.array + ") {  ", io.unindexedChars && (r += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), r += "\n  while (++index < length) {\n    " + n.loop + ";\n  }\n}\nelse {  ") : io.nonEnumArgs && (r += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + n.loop + ";\n    }\n  } else {  "), io.enumPrototypes && (r += "\n  var skipProto = typeof iterable == 'function';\n  "), io.enumErrorProps && (r += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");
            var e = [];
            if (io.enumPrototypes && e.push('!(skipProto && index == "prototype")'), io.enumErrorProps && e.push('!(skipErrorProps && (index == "message" || index == "name"))'), n.useHas && n.keys)r += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", e.length && (r += "    if (" + e.join(" && ") + ") {\n  "), r += n.loop + ";    ", e.length && (r += "\n    }"), r += "\n  }  "; else if (r += "\n  for (index in iterable) {\n", n.useHas && e.push("hasOwnProperty.call(iterable, index)"), e.length && (r += "    if (" + e.join(" && ") + ") {\n  "), r += n.loop + ";    ", e.length && (r += "\n    }"), r += "\n  }    ", io.nonEnumShadows) {
                for (r += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", k = 0; 7 > k; k++)r += "\n    index = '" + n.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", n.useHas || (r += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), r += ") {\n      " + n.loop + ";\n    }      ";
                r += "\n  }    "
            }
            return(n.array || io.nonEnumArgs) && (r += "\n}"), r += n.bottom + ";\nreturn result"
        };
        Qt || (rr = function () {
            function n() {
            }

            return function (r) {
                if ($r(r)) {
                    n.prototype = r;
                    var t = new n;
                    n.prototype = null
                }
                return t || e.Object()
            }
        }());
        var co = Jt ? function (n, r) {
            Q.value = r, Jt(n, "__bindData__", Q)
        } : it;
        io.argsClass || (mr = function (n) {
            return n && "object" == typeof n && "number" == typeof n.length && zt.call(n, "callee") && !Ut.call(n, "callee") || !1
        });
        var fo = Xt || function (n) {
            return n && "object" == typeof n && "number" == typeof n.length && Dt.call(n) == B || !1
        }, so = gr({args: "object", init: "[]", top: "if (!(objectTypes[typeof object])) return result", loop: "result.push(index)"}), po = no ? function (n) {
            return $r(n) ? io.enumPrototypes && "function" == typeof n || io.nonEnumArgs && n.length && mr(n) ? so(n) : no(n) : []
        } : so, go = {args: "collection, callback, thisArg", top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)", array: "typeof length == 'number'", keys: po, loop: "if (callback(iterable[index], index, collection) === false) return result"}, ho = {args: "object, source, guard", top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {", keys: po, loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]", bottom: "  }\n}"}, vo = {top: "if (!objectTypes[typeof iterable]) return result;\n" + go.top, array: !1}, yo = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, bo = Sr(yo), mo = Ot("(" + po(bo).join("|") + ")", "g"), _o = Ot("[" + po(yo).join("") + "]", "g"), wo = gr(go), xo = gr(ho, {top: ho.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"), loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}), jo = gr(ho), ko = gr(go, vo, {useHas: !1}), Co = gr(go, vo);
        Dr(/x/) && (Dr = function (n) {
            return"function" == typeof n && Dt.call(n) == z
        });
        var Po = qt ? function (n) {
            if (!n || Dt.call(n) != U || !io.argsClass && mr(n))return!1;
            var r = n.valueOf, e = yr(r) && (e = qt(r)) && qt(e);
            return e ? n == e || qt(n) == e : br(n)
        } : br, Eo = sr(function (n, r, e) {
            zt.call(n, e) ? n[e]++ : n[e] = 1
        }), Oo = sr(function (n, r, e) {
            (zt.call(n, e) ? n[e] : n[e] = []).push(r)
        }), So = sr(function (n, r, e) {
            n[e] = r
        }), Ao = ae, Io = ne, Lo = yr(Lo = xt.now) && Lo || function () {
            return(new xt).getTime()
        }, No = 8 == to(x + "08") ? to : function (n, r) {
            return to(qr(n) ? n.replace(I, "") : n, r || 0)
        };
        return v.after = He, v.assign = xo, v.at = Xr, v.bind = We, v.bindAll = qe, v.bindKey = ze, v.chain = vt, v.compact = de, v.compose = Ke, v.constant = rt, v.countBy = Eo, v.create = xr, v.createCallback = et, v.curry = Ue, v.debounce = Me, v.defaults = jo, v.defer = Ve, v.delay = Ge, v.difference = me, v.filter = ne, v.flatten = je, v.forEach = te, v.forEachRight = oe, v.forIn = ko, v.forInRight = Cr, v.forOwn = Co, v.forOwnRight = Pr, v.functions = Er, v.groupBy = Oo, v.indexBy = So, v.initial = Ce, v.intersection = Pe, v.invert = Sr, v.invoke = ue, v.keys = po, v.map = ae, v.mapValues = Kr, v.max = ie, v.memoize = Je, v.merge = Ur, v.min = le, v.omit = Mr, v.once = Qe, v.pairs = Vr, v.partial = Xe, v.partialRight = Ye, v.pick = Gr, v.pluck = Ao, v.property = lt, v.pull = Se, v.range = Ae, v.reject = se, v.remove = Ie, v.rest = Le, v.shuffle = ge, v.sortBy = ye, v.tap = yt, v.throttle = Ze, v.times = pt, v.toArray = be, v.transform = Jr, v.union = Re, v.uniq = Te, v.values = Qr, v.where = Io, v.without = De, v.wrap = nt, v.xor = $e, v.zip = Fe, v.zipObject = Be, v.collect = ae, v.drop = Le, v.each = te, v.eachRight = oe, v.extend = xo, v.methods = Er, v.object = Be, v.select = ne, v.tail = Le, v.unique = Te, v.unzip = Fe, ut(v), v.clone = _r, v.cloneDeep = wr, v.contains = Yr, v.escape = tt, v.every = Zr, v.find = re, v.findIndex = _e, v.findKey = jr, v.findLast = ee, v.findLastIndex = we, v.findLastKey = kr, v.has = Or, v.identity = ot, v.indexOf = ke, v.isArguments = mr, v.isArray = fo, v.isBoolean = Ar, v.isDate = Ir, v.isElement = Lr,v.isEmpty = Nr,v.isEqual = Rr,v.isFinite = Tr,v.isFunction = Dr,v.isNaN = Fr,v.isNull = Br,v.isNumber = Hr,v.isObject = $r,v.isPlainObject = Po,v.isRegExp = Wr,v.isString = qr,v.isUndefined = zr,v.lastIndexOf = Oe,v.mixin = ut,v.noConflict = at,v.noop = it,v.now = Lo,v.parseInt = No,v.random = ct,v.reduce = ce,v.reduceRight = fe,v.result = ft,v.runInContext = g,v.size = he,v.some = ve,v.sortedIndex = Ne,v.template = st,v.unescape = gt,v.uniqueId = ht,v.all = Zr,v.any = ve,v.detect = re,v.findWhere = re,v.foldl = ce,v.foldr = fe,v.include = Yr,v.inject = ce,ut(function () {
            var n = {};
            return Co(v, function (r, e) {
                v.prototype[e] || (n[e] = r)
            }), n
        }(), !1),v.first = xe,v.last = Ee,v.sample = pe,v.take = xe,v.head = xe,Co(v, function (n, r) {
            var e = "sample" !== r;
            v.prototype[r] || (v.prototype[r] = function (r, t) {
                var o = this.__chain__, u = n(this.__wrapped__, r, t);
                return o || null != r && (!t || e && "function" == typeof r) ? new y(u, o) : u
            })
        }),v.VERSION = "2.4.1",v.prototype.chain = bt,v.prototype.toString = dt,v.prototype.value = mt,v.prototype.valueOf = mt,wo(["join", "pop", "shift"], function (n) {
            var r = It[n];
            v.prototype[n] = function () {
                var n = this.__chain__, e = r.apply(this.__wrapped__, arguments);
                return n ? new y(e, n) : e
            }
        }),wo(["push", "reverse", "sort", "unshift"], function (n) {
            var r = It[n];
            v.prototype[n] = function () {
                return r.apply(this.__wrapped__, arguments), this
            }
        }),wo(["concat", "slice", "splice"], function (n) {
            var r = It[n];
            v.prototype[n] = function () {
                return new y(r.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),io.spliceObjects || wo(["pop", "shift", "splice"], function (n) {
            var r = It[n], e = "splice" == n;
            v.prototype[n] = function () {
                var n = this.__chain__, t = this.__wrapped__, o = r.apply(t, arguments);
                return 0 === t.length && delete t[0], n || e ? new y(o, n) : o
            }
        }),v
    }

    var h, v = [], y = [], b = 0, d = {}, m = +new Date + "", _ = 75, w = 40, x = " 	\f ﻿\n\r\u2028\u2029 ᠎             　", j = /\b__p \+= '';/g, C = /\b(__p \+=) '' \+/g, P = /(__e\(.*?\)|\b__t\)) \+\n'';/g, E = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, O = /\w*$/, S = /^\s*function[ \n\r\t]+\w/, A = /<%=([\s\S]+?)%>/g, I = RegExp("^[" + x + "]*0+(?=.$)"), L = /($^)/, N = /\bthis\b/, R = /['\n\r\t\u2028\u2029\\]/g, T = ["Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"], D = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], $ = 0, F = "[object Arguments]", B = "[object Array]", H = "[object Boolean]", W = "[object Date]", q = "[object Error]", z = "[object Function]", K = "[object Number]", U = "[object Object]", M = "[object RegExp]", V = "[object String]", G = {};
    G[z] = !1, G[F] = G[B] = G[H] = G[W] = G[K] = G[U] = G[M] = G[V] = !0;
    var J = {leading: !1, maxWait: 0, trailing: !1}, Q = {configurable: !1, enumerable: !1, value: null, writable: !1}, X = {args: "", array: null, bottom: "", firstArg: "", init: "", keys: null, loop: "", shadowedProps: null, support: null, top: "", useHas: !1}, Y = {"boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1}, Z = {"\\": "\\", "'": "'", "\n": "n", "\r": "r", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, nr = Y[typeof window] && window || this, rr = Y[typeof exports] && exports && !exports.nodeType && exports, er = Y[typeof module] && module && !module.nodeType && module, tr = er && er.exports === rr && rr, or = Y[typeof global] && global;
    !or || or.global !== or && or.window !== or || (nr = or);
    var ur = g();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (nr._ = ur, define(function () {
        return ur
    })) : rr && er ? tr ? (er.exports = ur)._ = ur : rr._ = ur : nr._ = ur
}).call(this);
!function (e, t) {
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var a, n = e(document);
    e.rails = a = {linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]", buttonClickSelector: "button[data-remote]", inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]", formSubmitSelector: "form", formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])", disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]", enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled", requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])", fileInputSelector: "input[type=file]", linkDisableSelector: "a[data-disable-with]", CSRFProtection: function (t) {
        var a = e('meta[name="csrf-token"]').attr("content");
        a && t.setRequestHeader("X-CSRF-Token", a)
    }, refreshCSRFTokens: function () {
        var t = e("meta[name=csrf-token]").attr("content"), a = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + a + '"]').val(t)
    }, fire: function (t, a, n) {
        var r = e.Event(a);
        return t.trigger(r, n), r.result !== !1
    }, confirm: function (e) {
        return confirm(e)
    }, ajax: function (t) {
        return e.ajax(t)
    }, href: function (e) {
        return e.attr("href")
    }, handleRemote: function (n) {
        var r, i, o, l, s, u, d, c;
        if (a.fire(n, "ajax:before")) {
            if (l = n.data("cross-domain"), s = l === t ? null : l, u = n.data("with-credentials") || null, d = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, n.is("form")) {
                r = n.attr("method"), i = n.attr("action"), o = n.serializeArray();
                var m = n.data("ujs:submit-button");
                m && (o.push(m), n.data("ujs:submit-button", null))
            } else n.is(a.inputChangeSelector) ? (r = n.data("method"), i = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : n.is(a.buttonClickSelector) ? (r = n.data("method") || "get", i = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : (r = n.data("method"), i = a.href(n), o = n.data("params") || null);
            c = {type: r || "GET", data: o, dataType: d, beforeSend: function (e, r) {
                return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), a.fire(n, "ajax:beforeSend", [e, r])
            }, success: function (e, t, a) {
                n.trigger("ajax:success", [e, t, a])
            }, complete: function (e, t) {
                n.trigger("ajax:complete", [e, t])
            }, error: function (e, t, a) {
                n.trigger("ajax:error", [e, t, a])
            }, crossDomain: s}, u && (c.xhrFields = {withCredentials: u}), i && (c.url = i);
            var f = a.ajax(c);
            return n.trigger("ajax:send", f), f
        }
        return!1
    }, handleMethod: function (n) {
        var r = a.href(n), i = n.data("method"), o = n.attr("target"), l = e("meta[name=csrf-token]").attr("content"), s = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + r + '"></form>'), d = '<input name="_method" value="' + i + '" type="hidden" />';
        s !== t && l !== t && (d += '<input name="' + s + '" value="' + l + '" type="hidden" />'), o && u.attr("target", o), u.hide().append(d).appendTo("body"), u.submit()
    }, disableFormElements: function (t) {
        t.find(a.disableSelector).each(function () {
            var t = e(this), a = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with", t[a]()), t[a](t.data("disable-with")), t.prop("disabled", !0)
        })
    }, enableFormElements: function (t) {
        t.find(a.enableSelector).each(function () {
            var t = e(this), a = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[a](t.data("ujs:enable-with")), t.prop("disabled", !1)
        })
    }, allowAction: function (e) {
        var t, n = e.data("confirm"), r = !1;
        return n ? (a.fire(e, "confirm") && (r = a.confirm(n), t = a.fire(e, "confirm:complete", [r])), r && t) : !0
    }, blankInputs: function (t, a, n) {
        var r, i, o = e(), l = a || "input,textarea", s = t.find(l);
        return s.each(function () {
            if (r = e(this), i = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !i == !n) {
                if (r.is("input[type=radio]") && s.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length)return!0;
                o = o.add(r)
            }
        }), o.length ? o : !1
    }, nonBlankInputs: function (e, t) {
        return a.blankInputs(e, t, !0)
    }, stopEverything: function (t) {
        return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
    }, disableElement: function (e) {
        e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
            return a.stopEverything(e)
        })
    }, enableElement: function (e) {
        e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable")
    }}, a.fire(n, "rails:attachBindings") && (e.ajaxPrefilter(function (e, t, n) {
        e.crossDomain || a.CSRFProtection(n)
    }), n.delegate(a.linkDisableSelector, "ajax:complete", function () {
        a.enableElement(e(this))
    }), n.delegate(a.linkClickSelector, "click.rails", function (n) {
        var r = e(this), i = r.data("method"), o = r.data("params"), l = n.metaKey || n.ctrlKey;
        if (!a.allowAction(r))return a.stopEverything(n);
        if (!l && r.is(a.linkDisableSelector) && a.disableElement(r), r.data("remote") !== t) {
            if (l && (!i || "GET" === i) && !o)return!0;
            var s = a.handleRemote(r);
            return s === !1 ? a.enableElement(r) : s.error(function () {
                a.enableElement(r)
            }), !1
        }
        return r.data("method") ? (a.handleMethod(r), !1) : void 0
    }), n.delegate(a.buttonClickSelector, "click.rails", function (t) {
        var n = e(this);
        return a.allowAction(n) ? (a.handleRemote(n), !1) : a.stopEverything(t)
    }), n.delegate(a.inputChangeSelector, "change.rails", function (t) {
        var n = e(this);
        return a.allowAction(n) ? (a.handleRemote(n), !1) : a.stopEverything(t)
    }), n.delegate(a.formSubmitSelector, "submit.rails", function (n) {
        var r = e(this), i = r.data("remote") !== t, o = a.blankInputs(r, a.requiredInputSelector), l = a.nonBlankInputs(r, a.fileInputSelector);
        if (!a.allowAction(r))return a.stopEverything(n);
        if (o && r.attr("novalidate") == t && a.fire(r, "ajax:aborted:required", [o]))return a.stopEverything(n);
        if (i) {
            if (l) {
                setTimeout(function () {
                    a.disableFormElements(r)
                }, 13);
                var s = a.fire(r, "ajax:aborted:file", [l]);
                return s || setTimeout(function () {
                    a.enableFormElements(r)
                }, 13), s
            }
            return a.handleRemote(r), !1
        }
        setTimeout(function () {
            a.disableFormElements(r)
        }, 13)
    }), n.delegate(a.formInputClickSelector, "click.rails", function (t) {
        var n = e(this);
        if (!a.allowAction(n))return a.stopEverything(t);
        var r = n.attr("name"), i = r ? {name: r, value: n.val()} : null;
        n.closest("form").data("ujs:submit-button", i)
    }), n.delegate(a.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
        this == t.target && a.disableFormElements(e(this))
    }), n.delegate(a.formSubmitSelector, "ajax:complete.rails", function (t) {
        this == t.target && a.enableFormElements(e(this))
    }), e(function () {
        a.refreshCSRFTokens()
    }))
}(jQuery);
!function (t) {
    "use strict";
    t(function () {
        t.support.transition = function () {
            var t = function () {
                var t, e = document.createElement("bootstrap"), i = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
                for (t in i)if (void 0 !== e.style[t])return i[t]
            }();
            return t && {end: t}
        }()
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]', i = function (i) {
        t(i).on("click", e, this.close)
    };
    i.prototype.close = function (e) {
        function i() {
            n.trigger("closed").remove()
        }

        var n, s = t(this), o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), n = t(o), e && e.preventDefault(), n.length || (n = s.hasClass("alert") ? s : s.parent()), n.trigger(e = t.Event("close")), e.isDefaultPrevented() || (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.on(t.support.transition.end, i) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var n = t(this), s = n.data("alert");
            s || n.data("alert", s = new i(this)), "string" == typeof e && s[e].call(n)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = n, this
    }, t(document).on("click.alert.data-api", e, i.prototype.close)
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, i)
    };
    e.prototype.setState = function (t) {
        var e = "disabled", i = this.$element, n = i.data(), s = i.is("input") ? "val" : "html";
        t += "Text", n.resetText || i.data("resetText", i[s]()), i[s](n[t] || this.options[t]), setTimeout(function () {
            "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }, 0)
    }, e.prototype.toggle = function () {
        var t = this.$element.closest('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("button"), o = "object" == typeof i && i;
            s || n.data("button", s = new e(this, o)), "toggle" == i ? s.toggle() : i && s.setState(i)
        })
    }, t.fn.button.defaults = {loadingText: "loading..."}, t.fn.button.Constructor = e, t.fn.button.noConflict = function () {
        return t.fn.button = i, this
    }, t(document).on("click.button.data-api", "[data-toggle^=button]", function (e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle")
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {cycle: function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, getActiveIndex: function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, to: function (e) {
        var i = this.getActiveIndex(), n = this;
        if (!(e > this.$items.length - 1 || 0 > e))return this.sliding ? this.$element.one("slid", function () {
            n.to(e)
        }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", t(this.$items[e]))
    }, pause: function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
    }, next: function () {
        return this.sliding ? void 0 : this.slide("next")
    }, prev: function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, slide: function (e, i) {
        var n, s = this.$element.find(".item.active"), o = i || s[e](), a = this.interval, r = "next" == e ? "left" : "right", h = "next" == e ? "first" : "last", l = this;
        if (this.sliding = !0, a && this.pause(), o = o.length ? o : this.$element.find(".item")[h](), n = t.Event("slide", {relatedTarget: o[0], direction: r}), !o.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                var e = t(l.$indicators.children()[l.getActiveIndex()]);
                e && e.addClass("active")
            })), t.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(n), n.isDefaultPrevented())return;
                o.addClass(e), o[0].offsetWidth, s.addClass(r), o.addClass(r), this.$element.one(t.support.transition.end, function () {
                    o.removeClass([e, r].join(" ")).addClass("active"), s.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function () {
                        l.$element.trigger("slid")
                    }, 0)
                })
            } else {
                if (this.$element.trigger(n), n.isDefaultPrevented())return;
                s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return a && this.cycle(), this
        }
    }};
    var i = t.fn.carousel;
    t.fn.carousel = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("carousel"), o = t.extend({}, t.fn.carousel.defaults, "object" == typeof i && i), a = "string" == typeof i ? i : o.slide;
            s || n.data("carousel", s = new e(this, o)), "number" == typeof i ? s.to(i) : a ? s[a]() : o.interval && s.pause().cycle()
        })
    }, t.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = i, this
    }, t(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (e) {
        var i, n, s = t(this), o = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), a = t.extend({}, o.data(), s.data());
        o.carousel(a), (n = s.attr("data-slide-to")) && o.data("carousel").pause().to(n).cycle(), e.preventDefault()
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, i), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.prototype = {constructor: e, dimension: function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, show: function () {
        var e, i, n, s;
        if (!this.transitioning && !this.$element.hasClass("in")) {
            if (e = this.dimension(), i = t.camelCase(["scroll", e].join("-")), n = this.$parent && this.$parent.find("> .accordion-group > .in"), n && n.length) {
                if (s = n.data("collapse"), s && s.transitioning)return;
                n.collapse("hide"), s || n.data("collapse", null)
            }
            this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][i])
        }
    }, hide: function () {
        var e;
        !this.transitioning && this.$element.hasClass("in") && (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hide"), "hidden"), this.$element[e](0))
    }, reset: function (t) {
        var e = this.dimension();
        return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
    }, transition: function (e, i, n) {
        var s = this, o = function () {
            "show" == i.type && s.reset(), s.transitioning = 0, s.$element.trigger(n)
        };
        this.$element.trigger(i), i.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, o) : o())
    }, toggle: function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }};
    var i = t.fn.collapse;
    t.fn.collapse = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("collapse"), o = t.extend({}, t.fn.collapse.defaults, n.data(), "object" == typeof i && i);
            s || n.data("collapse", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.collapse.defaults = {toggle: !0}, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = i, this
    }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (e) {
        var i, n = t(this), s = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), o = t(s).data("collapse") ? "toggle" : n.data();
        n[t(s).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), t(s).collapse(o)
    })
}(window.jQuery), !function (t) {
    "use strict";
    function e() {
        t(n).each(function () {
            i(t(this)).removeClass("open")
        })
    }

    function i(e) {
        var i, n = e.attr("data-target");
        return n || (n = e.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), i = n && t(n), i && i.length || (i = e.parent()), i
    }

    var n = "[data-toggle=dropdown]", s = function (e) {
        var i = t(e).on("click.dropdown.data-api", this.toggle);
        t("html").on("click.dropdown.data-api", function () {
            i.parent().removeClass("open")
        })
    };
    s.prototype = {constructor: s, toggle: function () {
        var n, s, o = t(this);
        if (!o.is(".disabled, :disabled"))return n = i(o), s = n.hasClass("open"), e(), s || n.toggleClass("open"), o.focus(), !1
    }, keydown: function (e) {
        var s, o, a, r, h;
        if (/(38|40|27)/.test(e.keyCode) && (s = t(this), e.preventDefault(), e.stopPropagation(), !s.is(".disabled, :disabled"))) {
            if (a = i(s), r = a.hasClass("open"), !r || r && 27 == e.keyCode)return 27 == e.which && a.find(n).focus(), s.click();
            o = t("[role=menu] li:not(.divider):visible a", a), o.length && (h = o.index(o.filter(":focus")), 38 == e.keyCode && h > 0 && h--, 40 == e.keyCode && h < o.length - 1 && h++, ~h || (h = 0), o.eq(h).focus())
        }
    }};
    var o = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this), n = i.data("dropdown");
            n || i.data("dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = o, this
    }, t(document).on("click.dropdown.data-api", e).on("click.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.dropdown-menu", function (t) {
        t.stopPropagation()
    }).on("click.dropdown.data-api", n, s.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", s.prototype.keydown)
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    e.prototype = {constructor: e, toggle: function () {
        return this[this.isShown ? "hide" : "show"]()
    }, show: function () {
        var e = this, i = t.Event("show");
        this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
            var i = t.support.transition && e.$element.hasClass("fade");
            e.$element.parent().length || e.$element.appendTo(document.body), e.$element.show(), i && e.$element[0].offsetWidth, e.$element.addClass("in").attr("aria-hidden", !1), e.enforceFocus(), i ? e.$element.one(t.support.transition.end, function () {
                e.$element.focus().trigger("shown")
            }) : e.$element.focus().trigger("shown")
        }))
    }, hide: function (e) {
        e && e.preventDefault();
        e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
    }, enforceFocus: function () {
        var e = this;
        t(document).on("focusin.modal", function (t) {
            e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
        })
    }, escape: function () {
        var t = this;
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (e) {
            27 == e.which && t.hide()
        }) : this.isShown || this.$element.off("keyup.dismiss.modal")
    }, hideWithTransition: function () {
        var e = this, i = setTimeout(function () {
            e.$element.off(t.support.transition.end), e.hideModal()
        }, 500);
        this.$element.one(t.support.transition.end, function () {
            clearTimeout(i), e.hideModal()
        })
    }, hideModal: function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.removeBackdrop(), t.$element.trigger("hidden")
        })
    }, removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, backdrop: function (e) {
        var i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && i;
            if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
            n ? this.$backdrop.one(t.support.transition.end, e) : e()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e) : e()) : e && e()
    }};
    var i = t.fn.modal;
    t.fn.modal = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("modal"), o = t.extend({}, t.fn.modal.defaults, n.data(), "object" == typeof i && i);
            s || n.data("modal", s = new e(this, o)), "string" == typeof i ? s[i]() : o.show && s.show()
        })
    }, t.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function () {
        return t.fn.modal = i, this
    }, t(document).on("click.modal.data-api", '[data-toggle="modal"]', function (e) {
        var i = t(this), n = i.attr("href"), s = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")), o = s.data("modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, s.data(), i.data());
        e.preventDefault(), s.modal(o).one("hide", function () {
            i.focus()
        })
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {constructor: e, init: function (e, i, n) {
        var s, o, a, r, h;
        for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, a = this.options.trigger.split(" "), h = a.length; h--;)r = a[h], "click" == r ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != r && (s = "hover" == r ? "mouseenter" : "focus", o = "hover" == r ? "mouseleave" : "blur", this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
        this.options.selector ? this._options = t.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
    }, getOptions: function (e) {
        return e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {show: e.delay, hide: e.delay}), e
    }, enter: function (e) {
        var i, n = t.fn[this.type].defaults, s = {};
        return this._options && t.each(this._options, function (t, e) {
            n[t] != e && (s[t] = e)
        }, this), i = t(e.currentTarget)[this.type](s).data(this.type), i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show), void 0) : i.show()
    }, leave: function (e) {
        var i = t(e.currentTarget)[this.type](this._options).data(this.type);
        return this.timeout && clearTimeout(this.timeout), i.options.delay && i.options.delay.hide ? (i.hoverState = "out", this.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide), void 0) : i.hide()
    }, show: function () {
        var e, i, n, s, o, a, r = t.Event("show");
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(r), r.isDefaultPrevented())return;
            switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), o = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({top: 0, left: 0, display: "block"}), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, s = e[0].offsetHeight, o) {
                case"bottom":
                    a = {top: i.top + i.height, left: i.left + i.width / 2 - n / 2};
                    break;
                case"top":
                    a = {top: i.top - s, left: i.left + i.width / 2 - n / 2};
                    break;
                case"left":
                    a = {top: i.top + i.height / 2 - s / 2, left: i.left - n};
                    break;
                case"right":
                    a = {top: i.top + i.height / 2 - s / 2, left: i.left + i.width}
            }
            this.applyPlacement(a, o), this.$element.trigger("shown")
        }
    }, applyPlacement: function (t, e) {
        var i, n, s, o, a = this.tip(), r = a[0].offsetWidth, h = a[0].offsetHeight;
        a.offset(t).addClass(e).addClass("in"), i = a[0].offsetWidth, n = a[0].offsetHeight, "top" == e && n != h && (t.top = t.top + h - n, o = !0), "bottom" == e || "top" == e ? (s = 0, t.left < 0 && (s = -2 * t.left, t.left = 0, a.offset(t), i = a[0].offsetWidth, n = a[0].offsetHeight), this.replaceArrow(s - r + i, i, "left")) : this.replaceArrow(n - h, n, "top"), o && a.offset(t)
    }, replaceArrow: function (t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, setContent: function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, hide: function () {
        function e() {
            var e = setTimeout(function () {
                i.off(t.support.transition.end).detach()
            }, 500);
            i.one(t.support.transition.end, function () {
                clearTimeout(e), i.detach()
            })
        }

        var i = this.tip(), n = t.Event("hide");
        return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : i.detach(), this.$element.trigger("hidden"), this)
    }, fixTitle: function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, hasContent: function () {
        return this.getTitle()
    }, getPosition: function () {
        var e = this.$element[0];
        return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {width: e.offsetWidth, height: e.offsetHeight}, this.$element.offset())
    }, getTitle: function () {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, tip: function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, arrow: function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, validate: function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, enable: function () {
        this.enabled = !0
    }, disable: function () {
        this.enabled = !1
    }, toggleEnabled: function () {
        this.enabled = !this.enabled
    }, toggle: function (e) {
        var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
        i.tip().hasClass("in") ? i.hide() : i.show()
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }};
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tooltip"), o = "object" == typeof i && i;
            s || n.data("tooltip", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {constructor: e, setContent: function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in")
    }, hasContent: function () {
        return this.getTitle() || this.getContent()
    }, getContent: function () {
        var t, e = this.$element, i = this.options;
        return t = ("function" == typeof i.content ? i.content.call(e[0]) : i.content) || e.attr("data-content")
    }, tip: function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }});
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("popover"), o = "object" == typeof i && i;
            s || n.data("popover", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(window.jQuery), !function (t) {
    "use strict";
    function e(e, i) {
        var n, s = t.proxy(this.process, this), o = t(e).is("body") ? t(window) : t(e);
        this.options = t.extend({}, t.fn.scrollspy.defaults, i), this.$scrollElement = o.on("scroll.scroll-spy.data-api", s), this.selector = (this.options.target || (n = t(e).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
    }

    e.prototype = {constructor: e, refresh: function () {
        var e, i = this;
        this.offsets = t([]), this.targets = t([]), e = this.$body.find(this.selector).map(function () {
            var e = t(this), n = e.data("target") || e.attr("href"), s = /^#\w/.test(n) && t(n);
            return s && s.length && [
                [s.position().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), n]
            ] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            i.offsets.push(this[0]), i.targets.push(this[1])
        })
    }, process: function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = i - this.$scrollElement.height(), s = this.offsets, o = this.targets, a = this.activeTarget;
        if (e >= n)return a != (t = o.last()[0]) && this.activate(t);
        for (t = s.length; t--;)a != o[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(o[t])
    }, activate: function (e) {
        var i, n;
        this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', i = t(n).parent("li").addClass("active"), i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate")
    }};
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("scrollspy"), o = "object" == typeof i && i;
            s || n.data("scrollspy", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {offset: 10}, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = i, this
    }, t(window).on("load", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e) {
        this.element = t(e)
    };
    e.prototype = {constructor: e, show: function () {
        var e, i, n, s = this.element, o = s.closest("ul:not(.dropdown-menu)"), a = s.attr("data-target");
        a || (a = s.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, "")), s.parent("li").hasClass("active") || (e = o.find(".active:last a")[0], n = t.Event("show", {relatedTarget: e}), s.trigger(n), n.isDefaultPrevented() || (i = t(a), this.activate(s.parent("li"), o), this.activate(i, i.parent(), function () {
            s.trigger({type: "shown", relatedTarget: e})
        })))
    }, activate: function (e, i, n) {
        function s() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
        }

        var o = i.find("> .active"), a = n && t.support.transition && o.hasClass("fade");
        a ? o.one(t.support.transition.end, s) : s(), o.removeClass("in")
    }};
    var i = t.fn.tab;
    t.fn.tab = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("tab");
            s || n.data("tab", s = new e(this)), "string" == typeof i && s[i]()
        })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, this
    }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault(), t(this).tab("show")
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
    };
    e.prototype = {constructor: e, select: function () {
        var t = this.$menu.find(".active").attr("data-value");
        return this.$element.val(this.updater(t)).change(), this.hide()
    }, updater: function (t) {
        return t
    }, show: function () {
        var e = t.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
        return this.$menu.insertAfter(this.$element).css({top: e.top + e.height, left: e.left}).show(), this.shown = !0, this
    }, hide: function () {
        return this.$menu.hide(), this.shown = !1, this
    }, lookup: function () {
        var e;
        return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (e = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, e ? this.process(e) : this)
    }, process: function (e) {
        var i = this;
        return e = t.grep(e, function (t) {
            return i.matcher(t)
        }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
    }, matcher: function (t) {
        return~t.toLowerCase().indexOf(this.query.toLowerCase())
    }, sorter: function (t) {
        for (var e, i = [], n = [], s = []; e = t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : s.push(e) : i.push(e);
        return i.concat(n, s)
    }, highlighter: function (t) {
        var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        return t.replace(new RegExp("(" + e + ")", "ig"), function (t, e) {
            return"<strong>" + e + "</strong>"
        })
    }, render: function (e) {
        var i = this;
        return e = t(e).map(function (e, n) {
            return e = t(i.options.item).attr("data-value", n), e.find("a").html(i.highlighter(n)), e[0]
        }), e.first().addClass("active"), this.$menu.html(e), this
    }, next: function () {
        var e = this.$menu.find(".active").removeClass("active"), i = e.next();
        i.length || (i = t(this.$menu.find("li")[0])), i.addClass("active")
    }, prev: function () {
        var t = this.$menu.find(".active").removeClass("active"), e = t.prev();
        e.length || (e = this.$menu.find("li").last()), e.addClass("active")
    }, listen: function () {
        this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this))
    }, eventSupported: function (t) {
        var e = t in this.$element;
        return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
    }, move: function (t) {
        if (this.shown) {
            switch (t.keyCode) {
                case 9:
                case 13:
                case 27:
                    t.preventDefault();
                    break;
                case 38:
                    t.preventDefault(), this.prev();
                    break;
                case 40:
                    t.preventDefault(), this.next()
            }
            t.stopPropagation()
        }
    }, keydown: function (e) {
        this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
    }, keypress: function (t) {
        this.suppressKeyPressRepeat || this.move(t)
    }, keyup: function (t) {
        switch (t.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown)return;
                this.select();
                break;
            case 27:
                if (!this.shown)return;
                this.hide();
                break;
            default:
                this.lookup()
        }
        t.stopPropagation(), t.preventDefault()
    }, focus: function () {
        this.focused = !0
    }, blur: function () {
        this.focused = !1, !this.mousedover && this.shown && this.hide()
    }, click: function (t) {
        t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
    }, mouseenter: function (e) {
        this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
    }, mouseleave: function () {
        this.mousedover = !1, !this.focused && this.shown && this.hide()
    }};
    var i = t.fn.typeahead;
    t.fn.typeahead = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("typeahead"), o = "object" == typeof i && i;
            s || n.data("typeahead", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function () {
        return t.fn.typeahead = i, this
    }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function () {
        var e = t(this);
        e.data("typeahead") || e.typeahead(e.data())
    })
}(window.jQuery), !function (t) {
    "use strict";
    var e = function (e, i) {
        this.options = t.extend({}, t.fn.affix.defaults, i), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function () {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = t(e), this.checkPosition()
    };
    e.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e, i = t(document).height(), n = this.$window.scrollTop(), s = this.$element.offset(), o = this.options.offset, a = o.bottom, r = o.top, h = "affix affix-top affix-bottom";
            "object" != typeof o && (a = r = o), "function" == typeof r && (r = o.top()), "function" == typeof a && (a = o.bottom()), e = null != this.unpin && n + this.unpin <= s.top ? !1 : null != a && s.top + this.$element.height() >= i - a ? "bottom" : null != r && r >= n ? "top" : !1, this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? s.top - n : null, this.$element.removeClass(h).addClass("affix" + (e ? "-" + e : "")))
        }
    };
    var i = t.fn.affix;
    t.fn.affix = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("affix"), o = "object" == typeof i && i;
            s || n.data("affix", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {offset: 0}, t.fn.affix.noConflict = function () {
        return t.fn.affix = i, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var e = t(this), i = e.data();
            i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
        })
    })
}(window.jQuery);
(function () {
    !function (t) {
        return"function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
    }(function (t) {
        "use strict";
        var e, n, o, r, i, s, a, c, f, p, u;
        return p = "caret", e = function () {
            function e(t) {
                this.$inputor = t, this.domInputor = this.$inputor[0]
            }

            return e.prototype.setPos = function () {
                return this.domInputor
            }, e.prototype.getIEPosition = function () {
                return t.noop()
            }, e.prototype.getPosition = function () {
                return t.noop()
            }, e.prototype.getOldIEPos = function () {
                var t, e;
                return e = a.selection.createRange(), t = a.body.createTextRange(), t.moveToElementText(this.domInputor), t.setEndPoint("EndToEnd", e), t.text.length
            }, e.prototype.getPos = function () {
                var t, e, n;
                return(n = this.range()) ? (t = n.cloneRange(), t.selectNodeContents(this.domInputor), t.setEnd(n.endContainer, n.endOffset), e = t.toString().length, t.detach(), e) : a.selection ? this.getOldIEPos() : void 0
            }, e.prototype.getOldIEOffset = function () {
                var t, e;
                return t = a.selection.createRange().duplicate(), t.moveStart("character", -1), e = t.getBoundingClientRect(), {height: e.bottom - e.top, left: e.left, top: e.top}
            }, e.prototype.getOffset = function () {
                var e, n, o, r;
                if (f.getSelection && (o = this.range())) {
                    if (o.endOffset - 1 < 0)return null;
                    e = o.cloneRange(), e.setStart(o.endContainer, o.endOffset - 1), e.setEnd(o.endContainer, o.endOffset), r = e.getBoundingClientRect(), n = {height: r.height, left: r.left + r.width, top: r.top}, e.detach()
                } else a.selection && (n = this.getOldIEOffset());
                return n && !c && (n.top += t(f).scrollTop(), n.left += t(f).scrollLeft()), n
            }, e.prototype.range = function () {
                var t;
                if (f.getSelection)return t = f.getSelection(), t.rangeCount > 0 ? t.getRangeAt(0) : null
            }, e
        }(), n = function () {
            function e(t) {
                this.$inputor = t, this.domInputor = this.$inputor[0]
            }

            return e.prototype.getIEPos = function () {
                var t, e, n, o, r, i, s;
                return e = this.domInputor, i = a.selection.createRange(), r = 0, i && i.parentElement() === e && (o = e.value.replace(/\r\n/g, "\n"), n = o.length, s = e.createTextRange(), s.moveToBookmark(i.getBookmark()), t = e.createTextRange(), t.collapse(!1), r = s.compareEndPoints("StartToEnd", t) > -1 ? n : -s.moveStart("character", -n)), r
            }, e.prototype.getPos = function () {
                return a.selection ? this.getIEPos() : this.domInputor.selectionStart
            }, e.prototype.setPos = function (t) {
                var e, n;
                return e = this.domInputor, a.selection ? (n = e.createTextRange(), n.move("character", t), n.select()) : e.setSelectionRange && e.setSelectionRange(t, t), e
            }, e.prototype.getIEOffset = function (t) {
                var e, n, o, r;
                return n = this.domInputor.createTextRange(), t || (t = this.getPos()), n.move("character", t), o = n.boundingLeft, r = n.boundingTop, e = n.boundingHeight, {left: o, top: r, height: e}
            }, e.prototype.getOffset = function (e) {
                var n, o, r;
                return n = this.$inputor, a.selection ? (o = this.getIEOffset(e), o.top += t(f).scrollTop() + n.scrollTop(), o.left += t(f).scrollLeft() + n.scrollLeft(), o) : (o = n.offset(), r = this.getPosition(e), o = {left: o.left + r.left - n.scrollLeft(), top: o.top + r.top - n.scrollTop(), height: r.height})
            }, e.prototype.getPosition = function (t) {
                var e, n, r, i, s, a;
                return e = this.$inputor, r = function (t) {
                    return t.replace(/</g, "&lt").replace(/>/g, "&gt").replace(/`/g, "&#96").replace(/"/g, "&quot").replace(/\r\n|\r|\n/g, "<br />")
                }, void 0 === t && (t = this.getPos()), a = e.val().slice(0, t), i = "<span>" + r(a) + "</span>", i += "<span id='caret'>|</span>", s = new o(e), n = s.create(i).rect()
            }, e.prototype.getIEPosition = function (t) {
                var e, n, o, r, i;
                return o = this.getIEOffset(t), n = this.$inputor.offset(), r = o.left - n.left, i = o.top - n.top, e = o.height, {left: r, top: i, height: e}
            }, e
        }(), o = function () {
            function e(t) {
                this.$inputor = t
            }

            return e.prototype.css_attr = ["overflowY", "height", "width", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom", "fontFamily", "borderStyle", "borderWidth", "wordWrap", "fontSize", "lineHeight", "overflowX", "text-align"], e.prototype.mirrorCss = function () {
                var e, n = this;
                return e = {position: "absolute", left: -9999, top: 0, zIndex: -2e4, "white-space": "pre-wrap"}, t.each(this.css_attr, function (t, o) {
                    return e[o] = n.$inputor.css(o)
                }), e
            }, e.prototype.create = function (e) {
                return this.$mirror = t("<div></div>"), this.$mirror.css(this.mirrorCss()), this.$mirror.html(e), this.$inputor.after(this.$mirror), this
            }, e.prototype.rect = function () {
                var t, e, n;
                return t = this.$mirror.find("#caret"), e = t.position(), n = {left: e.left, top: e.top, height: t.height()}, this.$mirror.remove(), n
            }, e
        }(), r = {contentEditable: function (t) {
            return!(!t[0].contentEditable || "true" !== t[0].contentEditable)
        }}, s = {pos: function (t) {
            return t || 0 === t ? this.setPos(t) : this.getPos()
        }, position: function (t) {
            return a.selection ? this.getIEPosition(t) : this.getPosition(t)
        }, offset: function (e) {
            var n, o;
            return o = this.getOffset(e), c && (n = t(c).offset(), o.top += n.top, o.left += n.left), o
        }}, a = null, f = null, c = null, u = function (t) {
            return c = t, f = t.contentWindow, a = t.contentDocument || f.document
        }, i = function (e, n) {
            var o, r;
            if (t.isPlainObject(n) && (r = n.iframe))return e.data("caret-iframe", r), u(r);
            if (r = e.data("caret-iframe"))return u(r);
            a = e[0].ownerDocument, f = a.defaultView || a.parentWindow;
            try {
                return c = f.frameElement
            } catch (i) {
                o = i
            }
        }, t.fn.caret = function (o) {
            var a;
            return"object" == typeof o ? (i(this, o), this) : s[o] ? (i(this), a = r.contentEditable(this) ? new e(this) : new n(this), s[o].apply(a, Array.prototype.slice.call(arguments, 1))) : t.error("Method " + o + " does not exist on jQuery.caret")
        }, t.fn.caret.EditableCaret = e, t.fn.caret.InputCaret = n, t.fn.caret.Utils = r, t.fn.caret.apis = s
    })
}).call(this);
(function () {
    !function (t) {
        return"function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
    }(function (t) {
        var e, n, i, r, o, s, a, h, u, c = [].slice;
        i = function () {
            function e(e) {
                this.current_flag = null, this.controllers = {}, this.alias_maps = {}, this.$inputor = t(e), this.iframe = null, this.setIframe(), this.listen()
            }

            return e.prototype.setIframe = function (t) {
                var e;
                if (t)return this.window = t.contentWindow, this.document = t.contentDocument || this.window.document, this.iframe = t, this;
                this.document = this.$inputor[0].ownerDocument, this.window = this.document.defaultView || this.document.parentWindow;
                try {
                    return this.iframe = this.window.frameElement
                } catch (n) {
                    e = n
                }
            }, e.prototype.controller = function (t) {
                return this.controllers[this.alias_maps[t] || t || this.current_flag]
            }, e.prototype.set_context_for = function (t) {
                return this.current_flag = t, this
            }, e.prototype.reg = function (t, e) {
                var n, i;
                return n = (i = this.controllers)[t] || (i[t] = new o(this, t)), e.alias && (this.alias_maps[e.alias] = t), n.init(e), this
            }, e.prototype.listen = function () {
                return this.$inputor.on("keyup.atwhoInner", function (t) {
                    return function (e) {
                        return t.on_keyup(e)
                    }
                }(this)).on("keydown.atwhoInner", function (t) {
                    return function (e) {
                        return t.on_keydown(e)
                    }
                }(this)).on("scroll.atwhoInner", function (t) {
                    return function () {
                        var e;
                        return null != (e = t.controller()) ? e.view.hide() : void 0
                    }
                }(this)).on("blur.atwhoInner", function (t) {
                    return function () {
                        var e;
                        return(e = t.controller()) ? e.view.hide(e.get_opt("display_timeout")) : void 0
                    }
                }(this))
            }, e.prototype.shutdown = function () {
                var t, e, n;
                n = this.controllers;
                for (e in n)t = n[e], t.destroy(), delete this.controllers[e];
                return this.$inputor.off(".atwhoInner")
            }, e.prototype.dispatch = function () {
                return t.map(this.controllers, function (t) {
                    return function (e) {
                        return e.look_up() ? t.set_context_for(e.at) : void 0
                    }
                }(this))
            }, e.prototype.on_keyup = function (e) {
                var n;
                switch (e.keyCode) {
                    case a.ESC:
                        e.preventDefault(), null != (n = this.controller()) && n.view.hide();
                        break;
                    case a.DOWN:
                    case a.UP:
                    case a.CTRL:
                        t.noop();
                        break;
                    case a.P:
                    case a.N:
                        e.ctrlKey || this.dispatch();
                        break;
                    default:
                        this.dispatch()
                }
            }, e.prototype.on_keydown = function (e) {
                var n, i;
                if (n = null != (i = this.controller()) ? i.view : void 0, n && n.visible())switch (e.keyCode) {
                    case a.ESC:
                        e.preventDefault(), n.hide();
                        break;
                    case a.UP:
                        e.preventDefault(), n.prev();
                        break;
                    case a.DOWN:
                        e.preventDefault(), n.next();
                        break;
                    case a.P:
                        if (!e.ctrlKey)return;
                        e.preventDefault(), n.prev();
                        break;
                    case a.N:
                        if (!e.ctrlKey)return;
                        e.preventDefault(), n.next();
                        break;
                    case a.TAB:
                    case a.ENTER:
                        if (!n.visible())return;
                        e.preventDefault(), n.choose();
                        break;
                    default:
                        t.noop()
                }
            }, e
        }(), o = function () {
            function n(n, i) {
                this.app = n, this.at = i, this.$inputor = this.app.$inputor, this.id = this.$inputor[0].id || this.uid(), this.setting = null, this.query = null, this.pos = 0, this.cur_rect = null, this.range = null, e.append(this.$el = t("<div id='atwho-ground-" + this.id + "'></div>")), this.model = new h(this), this.view = new u(this)
            }

            return n.prototype.uid = function () {
                return(Math.random().toString(16) + "000000000").substr(2, 8) + (new Date).getTime()
            }, n.prototype.init = function (e) {
                return this.setting = t.extend({}, this.setting || t.fn.atwho["default"], e), this.view.init(), this.model.reload(this.setting.data)
            }, n.prototype.destroy = function () {
                return this.trigger("beforeDestroy"), this.model.destroy(), this.view.destroy(), this.$el.remove()
            }, n.prototype.call_default = function () {
                var e, n, i;
                i = arguments[0], e = 2 <= arguments.length ? c.call(arguments, 1) : [];
                try {
                    return s[i].apply(this, e)
                } catch (r) {
                    return n = r, t.error("" + n + " Or maybe At.js doesn't have function " + i)
                }
            }, n.prototype.trigger = function (t, e) {
                var n, i;
                return null == e && (e = []), e.push(this), n = this.get_opt("alias"), i = n ? "" + t + "-" + n + ".atwho" : "" + t + ".atwho", this.$inputor.trigger(i, e)
            }, n.prototype.callbacks = function (t) {
                return this.get_opt("callbacks")[t] || s[t]
            }, n.prototype.get_opt = function (t) {
                var e;
                try {
                    return this.setting[t]
                } catch (n) {
                    return e = n, null
                }
            }, n.prototype.content = function () {
                return this.$inputor.is("textarea, input") ? this.$inputor.val() : this.$inputor.text()
            }, n.prototype.catch_query = function () {
                var t, e, n, i, r, o;
                return e = this.content(), t = this.$inputor.caret("pos"), o = e.slice(0, t), i = this.callbacks("matcher").call(this, this.at, o, this.get_opt("start_with_space")), "string" == typeof i && i.length <= this.get_opt("max_len", 20) ? (r = t - i.length, n = r + i.length, this.pos = r, i = {text: i, head_pos: r, end_pos: n}, this.trigger("matched", [this.at, i.text])) : this.view.hide(), this.query = i
            }, n.prototype.rect = function () {
                var t, e;
                if (t = this.$inputor.caret({iframe: this.app.iframe}).caret("offset", this.pos - 1))return"true" === this.$inputor.attr("contentEditable") && (t = this.cur_rect || (this.cur_rect = t) || t), e = this.app.document.selection ? 0 : 2, {left: t.left, top: t.top, bottom: t.top + t.height + e}
            }, n.prototype.reset_rect = function () {
                return"true" === this.$inputor.attr("contentEditable") ? this.cur_rect = null : void 0
            }, n.prototype.mark_range = function () {
                return"true" === this.$inputor.attr("contentEditable") && (this.app.window.getSelection && (this.range = this.app.window.getSelection().getRangeAt(0)), this.app.document.selection) ? this.ie8_range = this.app.document.selection.createRange() : void 0
            }, n.prototype.insert_content_for = function (e) {
                var n, i, r;
                return i = e.data("value"), r = this.get_opt("insert_tpl"), this.$inputor.is("textarea, input") || !r ? i : (n = t.extend({}, e.data("item-data"), {"atwho-data-value": i, "atwho-at": this.at}), this.callbacks("tpl_eval").call(this, r, n))
            }, n.prototype.insert = function (e, n) {
                var i, r, o, s, a, h, u, c, l, p, d;
                return i = this.$inputor, "true" === i.attr("contentEditable") && (o = "atwho-view-flag atwho-view-flag-" + (this.get_opt("alias") || this.at), s = "" + e + "<span contenteditable='false'>&nbsp;<span>", a = "<span contenteditable='false' class='" + o + "'>" + s + "</span>", r = t(a, this.app.document).data("atwho-data-item", n.data("item-data")), this.app.document.selection && (r = t("<span contenteditable='true'></span>", this.app.document).html(r))), i.is("textarea, input") ? (e = "" + e, l = i.val(), p = l.slice(0, Math.max(this.query.head_pos - this.at.length, 0)), d = "" + p + e + " " + l.slice(this.query.end_pos || 0), i.val(d), i.caret("pos", p.length + e.length + 1)) : (u = this.range) ? (h = u.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length, u.setStart(u.endContainer, Math.max(h, 0)), u.setEnd(u.endContainer, u.endOffset), u.deleteContents(), u.insertNode(r[0]), u.collapse(!1), c = this.app.window.getSelection(), c.removeAllRanges(), c.addRange(u)) : (u = this.ie8_range) && (u.moveStart("character", this.query.end_pos - this.query.head_pos - this.at.length), u.pasteHTML(s), u.collapse(!1), u.select()), i.is(":focus") || i.focus(), i.change()
            }, n.prototype.render_view = function (t) {
                var e;
                return e = this.get_opt("search_key"), t = this.callbacks("sorter").call(this, this.query.text, t.slice(0, 1001), e), this.view.render(t.slice(0, this.get_opt("limit")))
            }, n.prototype.look_up = function () {
                var e, n;
                if (e = this.catch_query())return n = function (t) {
                    return t && t.length > 0 ? this.render_view(t) : this.view.hide()
                }, this.model.query(e.text, t.proxy(n, this)), e
            }, n
        }(), h = function () {
            function e(t) {
                this.context = t, this.at = this.context.at, this.storage = this.context.$inputor
            }

            return e.prototype.destroy = function () {
                return this.storage.data(this.at, null)
            }, e.prototype.saved = function () {
                return this.fetch() > 0
            }, e.prototype.query = function (t, e) {
                var n, i, r;
                return n = this.fetch(), i = this.context.get_opt("search_key"), n = this.context.callbacks("filter").call(this.context, t, n, i) || [], r = this.context.callbacks("remote_filter"), n.length > 0 || !r && 0 === n.length ? e(n) : r.call(this.context, t, e)
            }, e.prototype.fetch = function () {
                return this.storage.data(this.at) || []
            }, e.prototype.save = function (t) {
                return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, t || []))
            }, e.prototype.load = function (t) {
                return!this.saved() && t ? this._load(t) : void 0
            }, e.prototype.reload = function (t) {
                return this._load(t)
            }, e.prototype._load = function (e) {
                return"string" == typeof e ? t.ajax(e, {dataType: "json"}).done(function (t) {
                    return function (e) {
                        return t.save(e)
                    }
                }(this)) : this.save(e)
            }, e
        }(), u = function () {
            function e(e) {
                this.context = e, this.$el = t("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"), this.timeout_id = null, this.context.$el.append(this.$el), this.bind_event()
            }

            return e.prototype.init = function () {
                var t;
                return t = this.context.get_opt("alias") || this.context.at.charCodeAt(0), this.$el.attr({id: "at-view-" + t})
            }, e.prototype.destroy = function () {
                return this.$el.remove()
            }, e.prototype.bind_event = function () {
                var e;
                return e = this.$el.find("ul"), e.on("mouseenter.atwho-view", "li", function (n) {
                    return e.find(".cur").removeClass("cur"), t(n.currentTarget).addClass("cur")
                }).on("click", function (t) {
                    return function (e) {
                        return t.choose(), e.preventDefault()
                    }
                }(this))
            }, e.prototype.visible = function () {
                return this.$el.is(":visible")
            }, e.prototype.choose = function () {
                var t, e;
                return(t = this.$el.find(".cur")).length ? (e = this.context.insert_content_for(t), this.context.insert(this.context.callbacks("before_insert").call(this.context, e, t), t), this.context.trigger("inserted", [t]), this.hide()) : void 0
            }, e.prototype.reposition = function (e) {
                var n, i;
                return e.bottom + this.$el.height() - t(window).scrollTop() > t(window).height() && (e.bottom = e.top - this.$el.height()), n = {left: e.left, top: e.bottom}, null != (i = this.context.callbacks("before_reposition")) && i.call(this.context, n), this.$el.offset(n), this.context.trigger("reposition", [n])
            }, e.prototype.next = function () {
                var t, e;
                return t = this.$el.find(".cur").removeClass("cur"), e = t.next(), e.length || (e = this.$el.find("li:first")), e.addClass("cur")
            }, e.prototype.prev = function () {
                var t, e;
                return t = this.$el.find(".cur").removeClass("cur"), e = t.prev(), e.length || (e = this.$el.find("li:last")), e.addClass("cur")
            }, e.prototype.show = function () {
                var t;
                return this.context.mark_range(), this.visible() || (this.$el.show(), this.context.trigger("shown")), (t = this.context.rect()) ? this.reposition(t) : void 0
            }, e.prototype.hide = function (t) {
                var e;
                return isNaN(t && this.visible()) ? (this.context.reset_rect(), this.$el.hide(), this.context.trigger("hidden")) : (e = function (t) {
                    return function () {
                        return t.hide()
                    }
                }(this), clearTimeout(this.timeout_id), this.timeout_id = setTimeout(e, t))
            }, e.prototype.render = function (e) {
                var n, i, r, o, s, a, h;
                if (!(t.isArray(e) && e.length > 0))return this.hide(), void 0;
                for (this.$el.find("ul").empty(), i = this.$el.find("ul"), s = this.context.get_opt("tpl"), a = 0, h = e.length; h > a; a++)r = e[a], r = t.extend({}, r, {"atwho-at": this.context.at}), o = this.context.callbacks("tpl_eval").call(this.context, s, r), n = t(this.context.callbacks("highlighter").call(this.context, o, this.context.query.text)), n.data("item-data", r), i.append(n);
                return this.show(), this.context.get_opt("highlight_first") ? i.find("li:first").addClass("cur") : void 0
            }, e
        }(), a = {DOWN: 40, UP: 38, ESC: 27, TAB: 9, ENTER: 13, CTRL: 17, P: 80, N: 78}, s = {before_save: function (e) {
            var n, i, r, o;
            if (!t.isArray(e))return e;
            for (o = [], i = 0, r = e.length; r > i; i++)n = e[i], t.isPlainObject(n) ? o.push(n) : o.push({name: n});
            return o
        }, matcher: function (t, e, n) {
            var i, r;
            return t = t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), n && (t = "(?:^|\\s)" + t), r = new RegExp(t + "([A-Za-z0-9_+-]*)$|" + t + "([^\\x00-\\xff]*)$", "gi"), i = r.exec(e), i ? i[2] || i[1] : null
        }, filter: function (t, e, n) {
            var i, r, o, s;
            for (s = [], r = 0, o = e.length; o > r; r++)i = e[r], ~i[n].toLowerCase().indexOf(t.toLowerCase()) && s.push(i);
            return s
        }, remote_filter: null, sorter: function (t, e, n) {
            var i, r, o, s;
            if (!t)return e;
            for (s = [], r = 0, o = e.length; o > r; r++)i = e[r], i.atwho_order = i[n].toLowerCase().indexOf(t.toLowerCase()), i.atwho_order > -1 && s.push(i);
            return s.sort(function (t, e) {
                return t.atwho_order - e.atwho_order
            })
        }, tpl_eval: function (t, e) {
            var n;
            try {
                return t.replace(/\$\{([^\}]*)\}/g, function (t, n) {
                    return e[n]
                })
            } catch (i) {
                return n = i, ""
            }
        }, highlighter: function (t, e) {
            var n;
            return e ? (n = new RegExp(">\\s*(\\w*)(" + e.replace("+", "\\+") + ")(\\w*)\\s*<", "ig"), t.replace(n, function (t, e, n, i) {
                return"> " + e + "<strong>" + n + "</strong>" + i + " <"
            })) : t
        }, before_insert: function (t) {
            return t
        }}, n = {load: function (t, e) {
            var n;
            return(n = this.controller(t)) ? n.model.load(e) : void 0
        }, getInsertedItemsWithIDs: function (e) {
            var n, i, r;
            return(n = this.controller(e)) ? (e && (e = "-" + (n.get_opt("alias") || n.at)), i = [], r = t.map(this.$inputor.find("span.atwho-view-flag" + (e || "")), function (e) {
                var n;
                return n = t(e).data("atwho-data-item"), i.indexOf(n.id) > -1 ? void 0 : (n.id && (i.push = n.id), n)
            }), [i, r]) : [null, null]
        }, getInsertedItems: function (t) {
            return n.getInsertedItemsWithIDs.apply(this, [t])[1]
        }, getInsertedIDs: function (t) {
            return n.getInsertedItemsWithIDs.apply(this, [t])[0]
        }, setIframe: function (t) {
            return this.setIframe(t)
        }, run: function () {
            return this.dispatch()
        }, destroy: function () {
            return this.shutdown(), this.$inputor.data("atwho", null)
        }}, r = {init: function (e) {
            var n, r;
            return r = (n = t(this)).data("atwho"), r || n.data("atwho", r = new i(this)), r.reg(e.at, e), this
        }}, e = t("<div id='atwho-container'></div>"), t.fn.atwho = function (i) {
            var o, s;
            return s = arguments, t("body").append(e), o = null, this.filter("textarea, input, [contenteditable=true]").each(function () {
                var e;
                return"object" != typeof i && i ? n[i] ? (e = t(this).data("atwho")) ? o = n[i].apply(e, Array.prototype.slice.call(s, 1)) : void 0 : t.error("Method " + i + " does not exist on jQuery.caret") : r.init.apply(this, s)
            }), o || this
        }, t.fn.atwho["default"] = {at: void 0, alias: void 0, data: null, tpl: "<li data-value='${atwho-at}${name}'>${name}</li>", insert_tpl: "<span>${atwho-data-value}</span>", callbacks: s, search_key: "name", start_with_space: !0, highlight_first: !0, limit: 5, max_len: 20, display_timeout: 300}
    })
}).call(this);
$(document).ready(function () {
    function t() {
        var t = document.getElementById("q");
        return t.value ? !0 : !1
    }

    function n() {
        o.css({top: e, right: 0})
    }

    $("#search_form").submit(function () {
        t()
    });
    var o = ($("#wrapper"), $("#backtotop")), e = ($("#sidebar"), $(window).height() - o.height() - 200);
    o.click(function () {
        return $("html,body").animate({scrollTop: 0}), !1
    }), $(window).scroll(function () {
        var t = $(window).scrollTop();
        t > 200 ? o.fadeIn() : o.fadeOut()
    }),
        n(), $(window).resize(n), $(".topic_content a,.reply_content a").attr("target", "_blank"),
        prettyPrint()
});
$(document).ready(function () {
    var e = $("#responsive-sidebar-trigger"), t = $("#sidebar-mask"), n = $("#sidebar"), o = $("#main"), a = 0, c = 0, i = {x: 0, y: 0}, d = 20, h = function () {
        var a = e.data("is-show"), c = o.height(), i = n.outerHeight();
        n.css({right: a ? -300 : 0}), e.data("is-show", !a), !a && i > c && o.height(i), t[a ? "fadeOut" : "fadeIn"]().height($("body").height())
    }, r = function (e) {
        var t = e.targetTouches;
        a = +t[0].pageX, c = +t[0].pageY, i.x = i.y = 0, document.body.addEventListener("touchmove", u, !1), document.body.addEventListener("touchend", s, !1)
    }, u = function (e) {
        var t = e.changedTouches;
        i.x = +t[0].pageX - a, i.y = +t[0].pageY - c, Math.abs(i.x) > Math.abs(i.y) && e.preventDefault()
    }, s = function (t) {
        var n = t.changedTouches, o = $(document).width(), h = e.data("is-show");
        i.x = +n[0].pageX - a, !h && a > 3 * o / 4 && Math.abs(i.x) > d && e.trigger("click"), h && 1 * o / 4 > a && Math.abs(i.x) > d && e.trigger("click"), a = c = 0, i.x = i.y = 0, document.body.removeEventListener("touchmove", u, !1), document.body.removeEventListener("touchend", s, !1)
    };
    ("ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch) && document.body.addEventListener("touchstart", r), e.on("click", h), t.on("click", function () {
        e.trigger("click")
    })
});
