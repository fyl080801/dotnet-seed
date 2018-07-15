!function (a, b) {
    'object' == typeof module && 'object' == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document)
            throw new Error('jQuery requires a window with a document');
        return b(a);
    } : b(a);
}('undefined' != typeof window ? window : this, function (a, b) {
    var c = [], d = a.document, e = c.slice, f = c.concat, g = c.push, h = c.indexOf, i = {}, j = i.toString, k = i.hasOwnProperty, l = {}, m = '1.12.4', n = function (a, b) {
            return new n.fn.init(a, b);
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (a, b) {
            return b.toUpperCase();
        };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: '',
        length: 0,
        toArray: function () {
            return e.call(this);
        },
        get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this);
        },
        pushStack: function (a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function (a) {
            return n.each(this, a);
        },
        map: function (a) {
            return this.pushStack(n.map(this, function (b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function () {
            return this.pushStack(e.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: g,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ('boolean' == typeof g && (j = g, g = arguments[h] || {}, h++), 'object' == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e)
                    a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g;
    }, n.extend({
        expando: 'jQuery' + (m + Math.random()).replace(/\D/g, ''),
        isReady: !0,
        error: function (a) {
            throw new Error(a);
        },
        noop: function () {
        },
        isFunction: function (a) {
            return 'function' === n.type(a);
        },
        isArray: Array.isArray || function (a) {
            return 'array' === n.type(a);
        },
        isWindow: function (a) {
            return null != a && a == a.window;
        },
        isNumeric: function (a) {
            var b = a && a.toString();
            return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
        },
        isEmptyObject: function (a) {
            var b;
            for (b in a)
                return !1;
            return !0;
        },
        isPlainObject: function (a) {
            var b;
            if (!a || 'object' !== n.type(a) || a.nodeType || n.isWindow(a))
                return !1;
            try {
                if (a.constructor && !k.call(a, 'constructor') && !k.call(a.constructor.prototype, 'isPrototypeOf'))
                    return !1;
            } catch (c) {
                return !1;
            }
            if (!l.ownFirst)
                for (b in a)
                    return k.call(a, b);
            for (b in a);
            return void 0 === b || k.call(a, b);
        },
        type: function (a) {
            return null == a ? a + '' : 'object' == typeof a || 'function' == typeof a ? i[j.call(a)] || 'object' : typeof a;
        },
        globalEval: function (b) {
            b && n.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function (a) {
            return a.replace(p, 'ms-').replace(q, r);
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function (a, b) {
            var c, d = 0;
            if (s(a)) {
                for (c = a.length; c > d; d++)
                    if (b.call(a[d], d, a[d]) === !1)
                        break;
            } else
                for (d in a)
                    if (b.call(a[d], d, a[d]) === !1)
                        break;
            return a;
        },
        trim: function (a) {
            return null == a ? '' : (a + '').replace(o, '');
        },
        makeArray: function (a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, 'string' == typeof a ? [a] : a) : g.call(c, a)), c;
        },
        inArray: function (a, b, c) {
            var d;
            if (b) {
                if (h)
                    return h.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a)
                        return c;
            }
            return -1;
        },
        merge: function (a, b) {
            var c = +b.length, d = 0, e = a.length;
            while (c > d)
                a[e++] = b[d++];
            if (c !== c)
                while (void 0 !== b[d])
                    a[e++] = b[d++];
            return a.length = e, a;
        },
        grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function (a, b, c) {
            var d, e, g = 0, h = [];
            if (s(a))
                for (d = a.length; d > g; g++)
                    e = b(a[g], g, c), null != e && h.push(e);
            else
                for (g in a)
                    e = b(a[g], g, c), null != e && h.push(e);
            return f.apply([], h);
        },
        guid: 1,
        proxy: function (a, b) {
            var c, d, f;
            return 'string' == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = e.call(arguments, 2), d = function () {
                return a.apply(b || this, c.concat(e.call(arguments)));
            }, d.guid = a.guid = a.guid || n.guid++, d) : void 0;
        },
        now: function () {
            return +new Date();
        },
        support: l
    }), 'function' == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (a, b) {
        i['[object ' + b + ']'] = b.toLowerCase();
    });
    function s(a) {
        var b = !!a && 'length' in a && a.length, c = n.type(a);
        return 'function' === c || n.isWindow(a) ? !1 : 'array' === c || 0 === b || 'number' == typeof b && b > 0 && b - 1 in a;
    }
    var t = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = 'sizzle' + 1 * new Date(), v = a.document, w = 0, x = 0, y = ga(), z = ga(), A = ga(), B = function (a, b) {
                return a === b && (l = !0), 0;
            }, C = 1 << 31, D = {}.hasOwnProperty, E = [], F = E.pop, G = E.push, H = E.push, I = E.slice, J = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b)
                        return c;
                return -1;
            }, K = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', L = '[\\x20\\t\\r\\n\\f]', M = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', N = '\\[' + L + '*(' + M + ')(?:' + L + '*([*^$|!~]?=)' + L + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + M + '))|)' + L + '*\\]', O = ':(' + M + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + N + ')*)|.*)\\)|)', P = new RegExp(L + '+', 'g'), Q = new RegExp('^' + L + '+|((?:^|[^\\\\])(?:\\\\.)*)' + L + '+$', 'g'), R = new RegExp('^' + L + '*,' + L + '*'), S = new RegExp('^' + L + '*([>+~]|' + L + ')' + L + '*'), T = new RegExp('=' + L + '*([^\\]\'"]*?)' + L + '*\\]', 'g'), U = new RegExp(O), V = new RegExp('^' + M + '$'), W = {
                ID: new RegExp('^#(' + M + ')'),
                CLASS: new RegExp('^\\.(' + M + ')'),
                TAG: new RegExp('^(' + M + '|[*])'),
                ATTR: new RegExp('^' + N),
                PSEUDO: new RegExp('^' + O),
                CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + L + '*(even|odd|(([+-]|)(\\d*)n|)' + L + '*(?:([+-]|)' + L + '*(\\d+)|))' + L + '*\\)|)', 'i'),
                bool: new RegExp('^(?:' + K + ')$', 'i'),
                needsContext: new RegExp('^' + L + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + L + '*((?:-\\d)?\\d*)' + L + '*\\)|)(?=[^-]|$)', 'i')
            }, X = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/, $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _ = /[+~]/, aa = /'|\\/g, ba = new RegExp('\\\\([\\da-f]{1,6}' + L + '?|(' + L + ')|.)', 'ig'), ca = function (a, b, c) {
                var d = '0x' + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
            }, da = function () {
                m();
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
        } catch (ea) {
            H = {
                apply: E.length ? function (a, b) {
                    G.apply(a, I.call(b));
                } : function (a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1;
                }
            };
        }
        function fa(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w = b && b.ownerDocument, x = b ? b.nodeType : 9;
            if (d = d || [], 'string' != typeof a || !a || 1 !== x && 9 !== x && 11 !== x)
                return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== x && (o = $.exec(a)))
                    if (f = o[1]) {
                        if (9 === x) {
                            if (!(j = b.getElementById(f)))
                                return d;
                            if (j.id === f)
                                return d.push(j), d;
                        } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f)
                            return d.push(j), d;
                    } else {
                        if (o[2])
                            return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName)
                            return H.apply(d, b.getElementsByClassName(f)), d;
                    }
                if (c.qsa && !A[a + ' '] && (!q || !q.test(a))) {
                    if (1 !== x)
                        w = b, s = a;
                    else if ('object' !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute('id')) ? k = k.replace(aa, '\\$&') : b.setAttribute('id', k = u), r = g(a), h = r.length, l = V.test(k) ? '#' + k : '[id=\'' + k + '\']';
                        while (h--)
                            r[h] = l + ' ' + qa(r[h]);
                        s = r.join(','), w = _.test(a) && oa(b.parentNode) || b;
                    }
                    if (s)
                        try {
                            return H.apply(d, w.querySelectorAll(s)), d;
                        } catch (y) {
                        } finally {
                            k === u && b.removeAttribute('id');
                        }
                }
            }
            return i(a.replace(Q, '$1'), b, d, e);
        }
        function ga() {
            var a = [];
            function b(c, e) {
                return a.push(c + ' ') > d.cacheLength && delete b[a.shift()], b[c + ' '] = e;
            }
            return b;
        }
        function ha(a) {
            return a[u] = !0, a;
        }
        function ia(a) {
            var b = n.createElement('div');
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function ja(a, b) {
            var c = a.split('|'), e = c.length;
            while (e--)
                d.attrHandle[c[e]] = b;
        }
        function ka(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d)
                return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b)
                        return -1;
            return a ? 1 : -1;
        }
        function la(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return 'input' === c && b.type === a;
            };
        }
        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ('input' === c || 'button' === c) && b.type === a;
            };
        }
        function na(a) {
            return ha(function (b) {
                return b = +b, ha(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--)
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function oa(a) {
            return a && 'undefined' != typeof a.getElementsByTagName && a;
        }
        c = fa.support = {}, f = fa.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? 'HTML' !== b.nodeName : !1;
        }, m = fa.setDocument = function (a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener('unload', da, !1) : e.attachEvent && e.attachEvent('onunload', da)), c.attributes = ia(function (a) {
                return a.className = 'i', !a.getAttribute('className');
            }), c.getElementsByTagName = ia(function (a) {
                return a.appendChild(n.createComment('')), !a.getElementsByTagName('*').length;
            }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
            }), c.getById ? (d.find.ID = function (a, b) {
                if ('undefined' != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : [];
                }
            }, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    return a.getAttribute('id') === b;
                };
            }) : (delete d.find.ID, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    var c = 'undefined' != typeof a.getAttributeNode && a.getAttributeNode('id');
                    return c && c.value === b;
                };
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return 'undefined' != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ('*' === a) {
                    while (c = f[e++])
                        1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                return 'undefined' != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0;
            }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
                o.appendChild(a).innerHTML = '<a id=\'' + u + '\'></a><select id=\'' + u + '-\r\\\' msallowcapture=\'\'><option selected=\'\'></option></select>', a.querySelectorAll('[msallowcapture^=\'\']').length && q.push('[*^$]=' + L + '*(?:\'\'|"")'), a.querySelectorAll('[selected]').length || q.push('\\[' + L + '*(?:value|' + K + ')'), a.querySelectorAll('[id~=' + u + '-]').length || q.push('~='), a.querySelectorAll(':checked').length || q.push(':checked'), a.querySelectorAll('a#' + u + '+*').length || q.push('.#.+[+~]');
            }), ia(function (a) {
                var b = n.createElement('input');
                b.setAttribute('type', 'hidden'), a.appendChild(b).setAttribute('name', 'D'), a.querySelectorAll('[name=d]').length && q.push('name' + L + '*[*^$|!~]?='), a.querySelectorAll(':enabled').length || q.push(':enabled', ':disabled'), a.querySelectorAll('*,:x'), q.push(',.*:');
            })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
                c.disconnectedMatch = s.call(a, 'div'), s.call(a, '[s!=\'\']:x'), r.push('!=', O);
            }), q = q.length && new RegExp(q.join('|')), r = r.length && new RegExp(r.join('|')), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function (a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a)
                            return !0;
                return !1;
            }, B = b ? function (a, b) {
                if (a === b)
                    return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
            } : function (a, b) {
                if (a === b)
                    return l = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                if (!e || !f)
                    return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f)
                    return ka(a, b);
                c = a;
                while (c = c.parentNode)
                    g.unshift(c);
                c = b;
                while (c = c.parentNode)
                    h.unshift(c);
                while (g[d] === h[d])
                    d++;
                return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
            }, n) : n;
        }, fa.matches = function (a, b) {
            return fa(a, null, null, b);
        }, fa.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, '=\'$1\']'), c.matchesSelector && p && !A[b + ' '] && (!r || !r.test(b)) && (!q || !q.test(b)))
                try {
                    var d = s.call(a, b);
                    if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return d;
                } catch (e) {
                }
            return fa(b, n, null, [a]).length > 0;
        }, fa.contains = function (a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b);
        }, fa.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()], f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
        }, fa.error = function (a) {
            throw new Error('Syntax error, unrecognized expression: ' + a);
        }, fa.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++])
                    b === a[f] && (e = d.push(f));
                while (e--)
                    a.splice(d[e], 1);
            }
            return k = null, a;
        }, e = fa.getText = function (a) {
            var b, c = '', d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ('string' == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += e(a);
                } else if (3 === f || 4 === f)
                    return a.nodeValue;
            } else
                while (b = a[d++])
                    c += e(b);
            return c;
        }, d = fa.selectors = {
            cacheLength: 50,
            createPseudo: ha,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: !0
                },
                ' ': { dir: 'parentNode' },
                '+': {
                    dir: 'previousSibling',
                    first: !0
                },
                '~': { dir: 'previousSibling' }
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || '').replace(ba, ca), '~=' === a[2] && (a[3] = ' ' + a[3] + ' '), a.slice(0, 4);
                },
                CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), 'nth' === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ('even' === a[3] || 'odd' === a[3])), a[5] = +(a[7] + a[8] || 'odd' === a[3])) : a[3] && fa.error(a[0]), a;
                },
                PSEUDO: function (a) {
                    var b, c = !a[6] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || '' : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(ba, ca).toLowerCase();
                    return '*' === a ? function () {
                        return !0;
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function (a) {
                    var b = y[a + ' '];
                    return b || (b = new RegExp('(^|' + L + ')' + a + '(' + L + '|$)')) && y(a, function (a) {
                        return b.test('string' == typeof a.className && a.className || 'undefined' != typeof a.getAttribute && a.getAttribute('class') || '');
                    });
                },
                ATTR: function (a, b, c) {
                    return function (d) {
                        var e = fa.attr(d, a);
                        return null == e ? '!=' === b : b ? (e += '', '=' === b ? e === c : '!=' === b ? e !== c : '^=' === b ? c && 0 === e.indexOf(c) : '*=' === b ? c && e.indexOf(c) > -1 : '$=' === b ? c && e.slice(-c.length) === c : '~=' === b ? (' ' + e.replace(P, ' ') + ' ').indexOf(c) > -1 : '|=' === b ? e === c || e.slice(0, c.length + 1) === c + '-' : !1) : !0;
                    };
                },
                CHILD: function (a, b, c, d, e) {
                    var f = 'nth' !== a.slice(0, 3), g = 'last' !== a.slice(-4), h = 'of-type' === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode;
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? 'nextSibling' : 'previousSibling', q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p])
                                        if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType)
                                            return !1;
                                    o = p = 'only' === a && !o && 'nextSibling';
                                }
                                return !0;
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                                    if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [
                                            w,
                                            n,
                                            t
                                        ];
                                        break;
                                    }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1)
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                                    if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [
                                            w,
                                            t
                                        ]), m === b))
                                        break;
                            return t -= e, t === d || t % d === 0 && t / d >= 0;
                        }
                    };
                },
                PSEUDO: function (a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error('unsupported pseudo: ' + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [
                        a,
                        a,
                        '',
                        b
                    ], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--)
                            d = J(a, f[g]), a[d] = !(c[d] = f[g]);
                    }) : function (a) {
                        return e(a, 0, c);
                    }) : e;
                }
            },
            pseudos: {
                not: ha(function (a) {
                    var b = [], c = [], d = h(a.replace(Q, '$1'));
                    return d[u] ? ha(function (a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--)
                            (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
                    };
                }),
                has: ha(function (a) {
                    return function (b) {
                        return fa(a, b).length > 0;
                    };
                }),
                contains: ha(function (a) {
                    return a = a.replace(ba, ca), function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
                    };
                }),
                lang: ha(function (a) {
                    return V.test(a || '') || fa.error('unsupported lang: ' + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
                        var c;
                        do
                            if (c = p ? b.lang : b.getAttribute('xml:lang') || b.getAttribute('lang'))
                                return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + '-');
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function (a) {
                    return a === o;
                },
                focus: function (a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function (a) {
                    return a.disabled === !1;
                },
                disabled: function (a) {
                    return a.disabled === !0;
                },
                checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return 'input' === b && !!a.checked || 'option' === b && !!a.selected;
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6)
                            return !1;
                    return !0;
                },
                parent: function (a) {
                    return !d.pseudos.empty(a);
                },
                header: function (a) {
                    return Y.test(a.nodeName);
                },
                input: function (a) {
                    return X.test(a.nodeName);
                },
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return 'input' === b && 'button' === a.type || 'button' === b;
                },
                text: function (a) {
                    var b;
                    return 'input' === a.nodeName.toLowerCase() && 'text' === a.type && (null == (b = a.getAttribute('type')) || 'text' === b.toLowerCase());
                },
                first: na(function () {
                    return [0];
                }),
                last: na(function (a, b) {
                    return [b - 1];
                }),
                eq: na(function (a, b, c) {
                    return [0 > c ? c + b : c];
                }),
                even: na(function (a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a;
                }),
                odd: na(function (a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a;
                }),
                lt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;)
                        a.push(d);
                    return a;
                }),
                gt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;)
                        a.push(d);
                    return a;
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
            d.pseudos[b] = la(b);
        for (b in {
                submit: !0,
                reset: !0
            })
            d.pseudos[b] = ma(b);
        function pa() {
        }
        pa.prototype = d.filters = d.pseudos, d.setFilters = new pa(), g = fa.tokenize = function (a, b) {
            var c, e, f, g, h, i, j, k = z[a + ' '];
            if (k)
                return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(Q, ' ')
                }), h = h.slice(c.length));
                for (g in d.filter)
                    !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                        value: c,
                        type: g,
                        matches: e
                    }), h = h.slice(c.length));
                if (!c)
                    break;
            }
            return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
        };
        function qa(a) {
            for (var b = 0, c = a.length, d = ''; c > b; b++)
                d += a[b].value;
            return d;
        }
        function ra(a, b, c) {
            var d = b.dir, e = c && 'parentNode' === d, f = x++;
            return b.first ? function (b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e)
                        return a(b, c, f);
            } : function (b, c, g) {
                var h, i, j, k = [
                        w,
                        f
                    ];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g))
                            return !0;
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f)
                                return k[2] = h[2];
                            if (i[d] = k, k[2] = a(b, c, g))
                                return !0;
                        }
            };
        }
        function sa(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d))
                        return !1;
                return !0;
            } : a[0];
        }
        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++)
                fa(a, b[d], c);
            return c;
        }
        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g;
        }
        function va(a, b, c, d, e, f) {
            return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || ta(b || '*', h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ua(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ua(r, n), d(j, [], h, i), k = j.length;
                    while (k--)
                        (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)
                                (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i);
                        }
                        k = r.length;
                        while (k--)
                            (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
                    }
                } else
                    r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
            });
        }
        function wa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[' '], i = g ? 1 : 0, k = ra(function (a) {
                        return a === b;
                    }, h, !0), l = ra(function (a) {
                        return J(b, a) > -1;
                    }, h, !0), m = [function (a, c, d) {
                            var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                            return b = null, e;
                        }]; f > i; i++)
                if (c = d.relative[a[i].type])
                    m = [ra(sa(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type])
                                break;
                        return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({ value: ' ' === a[i - 2].type ? '*' : '' })).replace(Q, '$1'), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a));
                    }
                    m.push(c);
                }
            return sa(m);
        }
        function xa(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                    var l, o, q, r = 0, s = '0', t = f && [], u = [], v = j, x = f || e && d.find.TAG('*', k), y = w += null == v ? 1 : Math.random() || 0.1, z = x.length;
                    for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                        if (e && l) {
                            o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                            while (q = a[o++])
                                if (q(l, g || n, h)) {
                                    i.push(l);
                                    break;
                                }
                            k && (w = y);
                        }
                        c && ((l = !q && l) && r--, f && t.push(l));
                    }
                    if (r += s, c && s !== r) {
                        o = 0;
                        while (q = b[o++])
                            q(t, u, g, h);
                        if (f) {
                            if (r > 0)
                                while (s--)
                                    t[s] || u[s] || (u[s] = F.call(i));
                            u = ua(u);
                        }
                        H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
                    }
                    return k && (w = y, j = v), t;
                };
            return c ? ha(f) : f;
        }
        return h = fa.compile = function (a, b) {
            var c, d = [], e = [], f = A[a + ' '];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--)
                    f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xa(e, d)), f.selector = a;
            }
            return f;
        }, i = fa.select = function (a, b, e, f) {
            var i, j, k, l, m, n = 'function' == typeof a && a, o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && 'ID' === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b)
                        return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length);
                }
                i = W.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type])
                        break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qa(j), !a)
                            return H.apply(e, f), e;
                        break;
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e;
        }, c.sortStable = u.split('').sort(B).join('') === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement('div'));
        }), ia(function (a) {
            return a.innerHTML = '<a href=\'#\'></a>', '#' === a.firstChild.getAttribute('href');
        }) || ja('type|href|height|width', function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2);
        }), c.attributes && ia(function (a) {
            return a.innerHTML = '<input/>', a.firstChild.setAttribute('value', ''), '' === a.firstChild.getAttribute('value');
        }) || ja('value', function (a, b, c) {
            return c || 'input' !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), ia(function (a) {
            return null == a.getAttribute('disabled');
        }) || ja(K, function (a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), fa;
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[':'] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = function (a, b, c) {
            var d = [], e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c))
                        break;
                    d.push(a);
                }
            return d;
        }, v = function (a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c;
        }, w = n.expr.match.needsContext, x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
        if (n.isFunction(b))
            return n.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c;
            });
        if (b.nodeType)
            return n.grep(a, function (a) {
                return a === b !== c;
            });
        if ('string' == typeof b) {
            if (y.test(b))
                return n.filter(b, a, c);
            b = n.filter(b, a);
        }
        return n.grep(a, function (a) {
            return n.inArray(a, b) > -1 !== c;
        });
    }
    n.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ':not(' + a + ')'), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
            return 1 === a.nodeType;
        }));
    }, n.fn.extend({
        find: function (a) {
            var b, c = [], d = this, e = d.length;
            if ('string' != typeof a)
                return this.pushStack(n(a).filter(function () {
                    for (b = 0; e > b; b++)
                        if (n.contains(d[b], this))
                            return !0;
                }));
            for (b = 0; e > b; b++)
                n.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + ' ' + a : a, c;
        },
        filter: function (a) {
            return this.pushStack(z(this, a || [], !1));
        },
        not: function (a) {
            return this.pushStack(z(this, a || [], !0));
        },
        is: function (a) {
            return !!z(this, 'string' == typeof a && w.test(a) ? n(a) : a || [], !1).length;
        }
    });
    var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = n.fn.init = function (a, b, c) {
            var e, f;
            if (!a)
                return this;
            if (c = c || A, 'string' == typeof a) {
                if (e = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && a.length >= 3 ? [
                        null,
                        a,
                        null
                    ] : B.exec(a), !e || !e[1] && b)
                    return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (e[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b))
                        for (e in b)
                            n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                    return this;
                }
                if (f = d.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2])
                        return A.find(a);
                    this.length = 1, this[0] = f;
                }
                return this.context = d, this.selector = a, this;
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? 'undefined' != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
        };
    C.prototype = n.fn, A = n(d);
    var D = /^(?:parents|prev(?:Until|All))/, E = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    n.fn.extend({
        has: function (a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++)
                    if (n.contains(this, c[b]))
                        return !0;
            });
        },
        closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = w.test(a) || 'string' != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break;
                    }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
        },
        index: function (a) {
            return a ? 'string' == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function (a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
        },
        addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    });
    function F(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);
        return a;
    }
    n.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function (a) {
            return u(a, 'parentNode');
        },
        parentsUntil: function (a, b, c) {
            return u(a, 'parentNode', c);
        },
        next: function (a) {
            return F(a, 'nextSibling');
        },
        prev: function (a) {
            return F(a, 'previousSibling');
        },
        nextAll: function (a) {
            return u(a, 'nextSibling');
        },
        prevAll: function (a) {
            return u(a, 'previousSibling');
        },
        nextUntil: function (a, b, c) {
            return u(a, 'nextSibling', c);
        },
        prevUntil: function (a, b, c) {
            return u(a, 'previousSibling', c);
        },
        siblings: function (a) {
            return v((a.parentNode || {}).firstChild, a);
        },
        children: function (a) {
            return v(a.firstChild);
        },
        contents: function (a) {
            return n.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
        }
    }, function (a, b) {
        n.fn[a] = function (c, d) {
            var e = n.map(this, b, c);
            return 'Until' !== a.slice(-5) && (d = c), d && 'string' == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())), this.pushStack(e);
        };
    });
    var G = /\S+/g;
    function H(a) {
        var b = {};
        return n.each(a.match(G) || [], function (a, c) {
            b[c] = !0;
        }), b;
    }
    n.Callbacks = function (a) {
        a = 'string' == typeof a ? H(a) : n.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function () {
                for (e = a.once, d = b = !0; g.length; h = -1) {
                    c = g.shift();
                    while (++h < f.length)
                        f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
                }
                a.memory || (c = !1), b = !1, e && (f = c ? [] : '');
            }, j = {
                add: function () {
                    return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                        n.each(b, function (b, c) {
                            n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && 'string' !== n.type(c) && d(c);
                        });
                    }(arguments), c && !b && i()), this;
                },
                remove: function () {
                    return n.each(arguments, function (a, b) {
                        var c;
                        while ((c = n.inArray(b, f, c)) > -1)
                            f.splice(c, 1), h >= c && h--;
                    }), this;
                },
                has: function (a) {
                    return a ? n.inArray(a, f) > -1 : f.length > 0;
                },
                empty: function () {
                    return f && (f = []), this;
                },
                disable: function () {
                    return e = g = [], f = c = '', this;
                },
                disabled: function () {
                    return !f;
                },
                lock: function () {
                    return e = !0, c || j.disable(), this;
                },
                locked: function () {
                    return !!e;
                },
                fireWith: function (a, c) {
                    return e || (c = c || [], c = [
                        a,
                        c.slice ? c.slice() : c
                    ], g.push(c), b || i()), this;
                },
                fire: function () {
                    return j.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!d;
                }
            };
        return j;
    }, n.extend({
        Deferred: function (a) {
            var b = [
                    [
                        'resolve',
                        'done',
                        n.Callbacks('once memory'),
                        'resolved'
                    ],
                    [
                        'reject',
                        'fail',
                        n.Callbacks('once memory'),
                        'rejected'
                    ],
                    [
                        'notify',
                        'progress',
                        n.Callbacks('memory')
                    ]
                ], c = 'pending', d = {
                    state: function () {
                        return c;
                    },
                    always: function () {
                        return e.done(arguments).fail(arguments), this;
                    },
                    then: function () {
                        var a = arguments;
                        return n.Deferred(function (c) {
                            n.each(b, function (b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + 'With'](this === d ? c.promise() : this, g ? [a] : arguments);
                                });
                            }), a = null;
                        }).promise();
                    },
                    promise: function (a) {
                        return null != a ? n.extend(a, d) : d;
                    }
                }, e = {};
            return d.pipe = d.then, n.each(b, function (a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + 'With'](this === e ? d : this, arguments), this;
                }, e[f[0] + 'With'] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function (a) {
            var b = 0, c = e.call(arguments), d = c.length, f = 1 !== d || a && n.isFunction(a.promise) ? d : 0, g = 1 === f ? a : n.Deferred(), h = function (a, b, c) {
                    return function (d) {
                        b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
                    };
                }, i, j, k;
            if (d > 1)
                for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++)
                    c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
            return f || g.resolveWith(k, c), g.promise();
        }
    });
    var I;
    n.fn.ready = function (a) {
        return n.ready.promise().done(a), this;
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
            a ? n.readyWait++ : n.ready(!0);
        },
        ready: function (a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler('ready'), n(d).off('ready'))));
        }
    });
    function J() {
        d.addEventListener ? (d.removeEventListener('DOMContentLoaded', K), a.removeEventListener('load', K)) : (d.detachEvent('onreadystatechange', K), a.detachEvent('onload', K));
    }
    function K() {
        (d.addEventListener || 'load' === a.event.type || 'complete' === d.readyState) && (J(), n.ready());
    }
    n.ready.promise = function (b) {
        if (!I)
            if (I = n.Deferred(), 'complete' === d.readyState || 'loading' !== d.readyState && !d.documentElement.doScroll)
                a.setTimeout(n.ready);
            else if (d.addEventListener)
                d.addEventListener('DOMContentLoaded', K), a.addEventListener('load', K);
            else {
                d.attachEvent('onreadystatechange', K), a.attachEvent('onload', K);
                var c = !1;
                try {
                    c = null == a.frameElement && d.documentElement;
                } catch (e) {
                }
                c && c.doScroll && !function f() {
                    if (!n.isReady) {
                        try {
                            c.doScroll('left');
                        } catch (b) {
                            return a.setTimeout(f, 50);
                        }
                        J(), n.ready();
                    }
                }();
            }
        return I.promise(b);
    }, n.ready.promise();
    var L;
    for (L in n(l))
        break;
    l.ownFirst = '0' === L, l.inlineBlockNeedsLayout = !1, n(function () {
        var a, b, c, e;
        c = d.getElementsByTagName('body')[0], c && c.style && (b = d.createElement('div'), e = d.createElement('div'), e.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(e).appendChild(b), 'undefined' != typeof b.style.zoom && (b.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1', l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(e));
    }), function () {
        var a = d.createElement('div');
        l.deleteExpando = !0;
        try {
            delete a.test;
        } catch (b) {
            l.deleteExpando = !1;
        }
        a = null;
    }();
    var M = function (a) {
            var b = n.noData[(a.nodeName + ' ').toLowerCase()], c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute('classid') === b;
        }, N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = 'data-' + b.replace(O, '-$1').toLowerCase();
            if (c = a.getAttribute(d), 'string' == typeof c) {
                try {
                    c = 'true' === c ? !0 : 'false' === c ? !1 : 'null' === c ? null : +c + '' === c ? +c : N.test(c) ? n.parseJSON(c) : c;
                } catch (e) {
                }
                n.data(a, b, c);
            } else
                c = void 0;
        }
        return c;
    }
    function Q(a) {
        var b;
        for (b in a)
            if (('data' !== b || !n.isEmptyObject(a[b])) && 'toJSON' !== b)
                return !1;
        return !0;
    }
    function R(a, b, d, e) {
        if (M(a)) {
            var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || 'string' != typeof b)
                return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: n.noop }), 'object' != typeof b && 'function' != typeof b || (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), 'string' == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f;
        }
    }
    function S(a, b, c) {
        if (M(a)) {
            var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(' ')), e = b.length;
                    while (e--)
                        delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d))
                        return;
                }
                (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0);
            }
        }
    }
    n.extend({
        cache: {},
        noData: {
            'applet ': !0,
            'embed ': !0,
            'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
        },
        hasData: function (a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a);
        },
        data: function (a, b, c) {
            return R(a, b, c);
        },
        removeData: function (a, b) {
            return S(a, b);
        },
        _data: function (a, b, c) {
            return R(a, b, c, !0);
        },
        _removeData: function (a, b) {
            return S(a, b, !0);
        }
    }), n.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, 'parsedAttrs'))) {
                    c = g.length;
                    while (c--)
                        g[c] && (d = g[c].name, 0 === d.indexOf('data-') && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                    n._data(f, 'parsedAttrs', !0);
                }
                return e;
            }
            return 'object' == typeof a ? this.each(function () {
                n.data(this, a);
            }) : arguments.length > 1 ? this.each(function () {
                n.data(this, a, b);
            }) : f ? P(f, a, n.data(f, a)) : void 0;
        },
        removeData: function (a) {
            return this.each(function () {
                n.removeData(this, a);
            });
        }
    }), n.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || 'fx') + 'queue', d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
        },
        dequeue: function (a, b) {
            b = b || 'fx';
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function () {
                    n.dequeue(a, b);
                };
            'inprogress' === e && (e = c.shift(), d--), e && ('fx' === b && c.unshift('inprogress'), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function (a, b) {
            var c = b + 'queueHooks';
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks('once memory').add(function () {
                    n._removeData(a, b + 'queue'), n._removeData(a, c);
                })
            });
        }
    }), n.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return 'string' != typeof a && (b = a, a = 'fx', c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), 'fx' === a && 'inprogress' !== c[0] && n.dequeue(this, a);
            });
        },
        dequeue: function (a) {
            return this.each(function () {
                n.dequeue(this, a);
            });
        },
        clearQueue: function (a) {
            return this.queue(a || 'fx', []);
        },
        promise: function (a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function () {
                    --d || e.resolveWith(f, [f]);
                };
            'string' != typeof a && (b = a, a = void 0), a = a || 'fx';
            while (g--)
                c = n._data(f[g], a + 'queueHooks'), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    }), function () {
        var a;
        l.shrinkWrapBlocks = function () {
            if (null != a)
                return a;
            a = !1;
            var b, c, e;
            return c = d.getElementsByTagName('body')[0], c && c.style ? (b = d.createElement('div'), e = d.createElement('div'), e.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(e).appendChild(b), 'undefined' != typeof b.style.zoom && (b.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1', b.appendChild(d.createElement('div')).style.width = '5px', a = 3 !== b.offsetWidth), c.removeChild(e), a) : void 0;
        };
    }();
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = new RegExp('^(?:([+-])=|)(' + T + ')([a-z%]*)$', 'i'), V = [
            'Top',
            'Right',
            'Bottom',
            'Left'
        ], W = function (a, b) {
            return a = b || a, 'none' === n.css(a, 'display') || !n.contains(a.ownerDocument, a);
        };
    function X(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function () {
                return d.cur();
            } : function () {
                return n.css(a, b, '');
            }, i = h(), j = c && c[3] || (n.cssNumber[b] ? '' : 'px'), k = (n.cssNumber[b] || 'px' !== j && +i) && U.exec(n.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do
                f = f || '.5', k /= f, n.style(a, b, k + j);
            while (f !== (f = h() / i) && 1 !== f && --g);
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
    }
    var Y = function (a, b, c, d, e, f, g) {
            var h = 0, i = a.length, j = null == c;
            if ('object' === n.type(c)) {
                e = !0;
                for (h in c)
                    Y(a, b, h, c[h], !0, f, g);
            } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(n(a), c);
                })), b))
                for (; i > h; h++)
                    b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
        }, Z = /^(?:checkbox|radio)$/i, $ = /<([\w:-]+)/, _ = /^$|\/(?:java|ecma)script/i, aa = /^\s+/, ba = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video';
    function ca(a) {
        var b = ba.split('|'), c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length)
                c.createElement(b.pop());
        return c;
    }
    !function () {
        var a = d.createElement('div'), b = d.createDocumentFragment(), c = d.createElement('input');
        a.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', l.leadingWhitespace = 3 === a.firstChild.nodeType, l.tbody = !a.getElementsByTagName('tbody').length, l.htmlSerialize = !!a.getElementsByTagName('link').length, l.html5Clone = '<:nav></:nav>' !== d.createElement('nav').cloneNode(!0).outerHTML, c.type = 'checkbox', c.checked = !0, b.appendChild(c), l.appendChecked = c.checked, a.innerHTML = '<textarea>x</textarea>', l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = d.createElement('input'), c.setAttribute('type', 'radio'), c.setAttribute('checked', 'checked'), c.setAttribute('name', 't'), a.appendChild(c), l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !!a.addEventListener, a[n.expando] = 1, l.attributes = !a.getAttribute(n.expando);
    }();
    var da = {
        option: [
            1,
            '<select multiple=\'multiple\'>',
            '</select>'
        ],
        legend: [
            1,
            '<fieldset>',
            '</fieldset>'
        ],
        area: [
            1,
            '<map>',
            '</map>'
        ],
        param: [
            1,
            '<object>',
            '</object>'
        ],
        thead: [
            1,
            '<table>',
            '</table>'
        ],
        tr: [
            2,
            '<table><tbody>',
            '</tbody></table>'
        ],
        col: [
            2,
            '<table><tbody></tbody><colgroup>',
            '</colgroup></table>'
        ],
        td: [
            3,
            '<table><tbody><tr>',
            '</tr></tbody></table>'
        ],
        _default: l.htmlSerialize ? [
            0,
            '',
            ''
        ] : [
            1,
            'X<div>',
            '</div>'
        ]
    };
    da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, da.th = da.td;
    function ea(a, b) {
        var c, d, e = 0, f = 'undefined' != typeof a.getElementsByTagName ? a.getElementsByTagName(b || '*') : 'undefined' != typeof a.querySelectorAll ? a.querySelectorAll(b || '*') : void 0;
        if (!f)
            for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
                !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f;
    }
    function fa(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)
            n._data(c, 'globalEval', !b || n._data(b[d], 'globalEval'));
    }
    var ga = /<|&#?\w+;/, ha = /<tbody/i;
    function ia(a) {
        Z.test(a.type) && (a.defaultChecked = a.checked);
    }
    function ja(a, b, c, d, e) {
        for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++)
            if (g = a[r], g || 0 === g)
                if ('object' === n.type(g))
                    n.merge(q, g.nodeType ? [g] : g);
                else if (ga.test(g)) {
                    i = i || p.appendChild(b.createElement('div')), j = ($.exec(g) || [
                        '',
                        ''
                    ])[1].toLowerCase(), m = da[j] || da._default, i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2], f = m[0];
                    while (f--)
                        i = i.lastChild;
                    if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])), !l.tbody) {
                        g = 'table' !== j || ha.test(g) ? '<table>' !== m[1] || ha.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length;
                        while (f--)
                            n.nodeName(k = g.childNodes[f], 'tbody') && !k.childNodes.length && g.removeChild(k);
                    }
                    n.merge(q, i.childNodes), i.textContent = '';
                    while (i.firstChild)
                        i.removeChild(i.firstChild);
                    i = p.lastChild;
                } else
                    q.push(b.createTextNode(g));
        i && p.removeChild(i), l.appendChecked || n.grep(ea(q, 'input'), ia), r = 0;
        while (g = q[r++])
            if (d && n.inArray(g, d) > -1)
                e && e.push(g);
            else if (h = n.contains(g.ownerDocument, g), i = ea(p.appendChild(g), 'script'), h && fa(i), c) {
                f = 0;
                while (g = i[f++])
                    _.test(g.type || '') && c.push(g);
            }
        return i = null, p;
    }
    !function () {
        var b, c, e = d.createElement('div');
        for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            })
            c = 'on' + b, (l[b] = c in a) || (e.setAttribute(c, 't'), l[b] = e.attributes[c].expando === !1);
        e = null;
    }();
    var ka = /^(?:input|select|textarea)$/i, la = /^key/, ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, na = /^(?:focusinfocus|focusoutblur)$/, oa = /^([^.]*)(?:\.(.+)|)/;
    function pa() {
        return !0;
    }
    function qa() {
        return !1;
    }
    function ra() {
        try {
            return d.activeElement;
        } catch (a) {
        }
    }
    function sa(a, b, c, d, e, f) {
        var g, h;
        if ('object' == typeof b) {
            'string' != typeof c && (d = d || c, c = void 0);
            for (h in b)
                sa(a, h, c, d, b[h], f);
            return a;
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ('string' == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1)
            e = qa;
        else if (!e)
            return a;
        return 1 === f && (g = e, e = function (a) {
            return n().off(a), g.apply(this, arguments);
        }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
            n.event.add(this, b, e, d, c);
        });
    }
    n.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                    return 'undefined' == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || '').match(G) || [''], h = b.length;
                while (h--)
                    f = oa.exec(b[h]) || [], o = q = f[1], p = (f[2] || '').split('.').sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({
                        type: o,
                        origType: q,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && n.expr.match.needsContext.test(e),
                        namespace: p.join('.')
                    }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent('on' + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);
                a = null;
            }
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                b = (b || '').match(G) || [''], j = b.length;
                while (j--)
                    if (h = oa.exec(b[j]) || [], o = q = h[1], p = (h[2] || '').split('.').sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'), i = f = m.length;
                        while (f--)
                            g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ('**' !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o]);
                    } else
                        for (o in k)
                            n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) && (delete r.handle, n._removeData(a, 'events'));
            }
        },
        trigger: function (b, c, e, f) {
            var g, h, i, j, l, m, o, p = [e || d], q = k.call(b, 'type') ? b.type : b, r = k.call(b, 'namespace') ? b.namespace.split('.') : [];
            if (i = m = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf('.') > -1 && (r = q.split('.'), q = r.shift(), r.sort()), h = q.indexOf(':') < 0 && 'on' + q, b = b[n.expando] ? b : new n.Event(q, 'object' == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join('.'), b.rnamespace = b.namespace ? new RegExp('(^|\\.)' + r.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), l = n.event.special[q] || {}, f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
                if (!f && !l.noBubble && !n.isWindow(e)) {
                    for (j = l.delegateType || q, na.test(j + q) || (i = i.parentNode); i; i = i.parentNode)
                        p.push(i), m = i;
                    m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a);
                }
                o = 0;
                while ((i = p[o++]) && !b.isPropagationStopped())
                    b.type = o > 1 ? j : l.bindType || q, g = (n._data(i, 'events') || {})[b.type] && n._data(i, 'handle'), g && g.apply(i, c), g = h && i[h], g && g.apply && M(i) && (b.result = g.apply(i, c), b.result === !1 && b.preventDefault());
                if (b.type = q, !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
                    m = e[h], m && (e[h] = null), n.event.triggered = q;
                    try {
                        e[q]();
                    } catch (s) {
                    }
                    n.event.triggered = void 0, m && (e[h] = m);
                }
                return b.result;
            }
        },
        dispatch: function (a) {
            a = n.event.fix(a);
            var b, c, d, f, g, h = [], i = e.call(arguments), j = (n._data(this, 'events') || {})[a.type] || [], k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
                        a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && ('click' !== a.type || isNaN(a.button) || a.button < 1))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
                        for (d = [], c = 0; h > c; c++)
                            f = b[c], e = f.selector + ' ', void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        });
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        fix: function (a) {
            if (a[n.expando])
                return a;
            var b, c, e, f = a.type, g = a, h = this.fixHooks[f];
            h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
            while (b--)
                c = e[b], a[c] = g[c];
            return a.target || (a.target = g.srcElement || d), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a;
        },
        props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
        fixHooks: {},
        keyHooks: {
            props: 'char charCode key keyCode'.split(' '),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
            }
        },
        mouseHooks: {
            props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
            filter: function (a, b) {
                var c, e, f, g = b.button, h = b.fromElement;
                return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d, f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a;
            }
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    if (this !== ra() && this.focus)
                        try {
                            return this.focus(), !1;
                        } catch (a) {
                        }
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function () {
                    return this === ra() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: 'focusout'
            },
            click: {
                trigger: function () {
                    return n.nodeName(this, 'input') && 'checkbox' === this.type && this.click ? (this.click(), !1) : void 0;
                },
                _default: function (a) {
                    return n.nodeName(a.target, 'a');
                }
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function (a, b, c) {
            var d = n.extend(new n.Event(), c, {
                type: a,
                isSimulated: !0
            });
            n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault();
        }
    }, n.removeEvent = d.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c);
    } : function (a, b, c) {
        var d = 'on' + b;
        a.detachEvent && ('undefined' == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
    }, n.Event = function (a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
    }, n.Event.prototype = {
        constructor: n.Event,
        isDefaultPrevented: qa,
        isPropagationStopped: qa,
        isImmediatePropagationStopped: qa,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = pa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = pa, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = pa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
        }
    }, n.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
    }, function (a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
            }
        };
    }), l.submit || (n.event.special.submit = {
        setup: function () {
            return n.nodeName(this, 'form') ? !1 : void n.event.add(this, 'click._submit keypress._submit', function (a) {
                var b = a.target, c = n.nodeName(b, 'input') || n.nodeName(b, 'button') ? n.prop(b, 'form') : void 0;
                c && !n._data(c, 'submit') && (n.event.add(c, 'submit._submit', function (a) {
                    a._submitBubble = !0;
                }), n._data(c, 'submit', !0));
            });
        },
        postDispatch: function (a) {
            a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && n.event.simulate('submit', this.parentNode, a));
        },
        teardown: function () {
            return n.nodeName(this, 'form') ? !1 : void n.event.remove(this, '._submit');
        }
    }), l.change || (n.event.special.change = {
        setup: function () {
            return ka.test(this.nodeName) ? ('checkbox' !== this.type && 'radio' !== this.type || (n.event.add(this, 'propertychange._change', function (a) {
                'checked' === a.originalEvent.propertyName && (this._justChanged = !0);
            }), n.event.add(this, 'click._change', function (a) {
                this._justChanged && !a.isTrigger && (this._justChanged = !1), n.event.simulate('change', this, a);
            })), !1) : void n.event.add(this, 'beforeactivate._change', function (a) {
                var b = a.target;
                ka.test(b.nodeName) && !n._data(b, 'change') && (n.event.add(b, 'change._change', function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate('change', this.parentNode, a);
                }), n._data(b, 'change', !0));
            });
        },
        handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function () {
            return n.event.remove(this, '._change'), !ka.test(this.nodeName);
        }
    }), l.focusin || n.each({
        focus: 'focusin',
        blur: 'focusout'
    }, function (a, b) {
        var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a));
        };
        n.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = n._data(d, b);
                e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            },
            teardown: function () {
                var d = this.ownerDocument || this, e = n._data(d, b) - 1;
                e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            }
        };
    }), n.fn.extend({
        on: function (a, b, c, d) {
            return sa(this, a, b, c, d);
        },
        one: function (a, b, c, d) {
            return sa(this, a, b, c, d, 1);
        },
        off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + '.' + d.namespace : d.origType, d.selector, d.handler), this;
            if ('object' == typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this;
            }
            return b !== !1 && 'function' != typeof b || (c = b, b = void 0), c === !1 && (c = qa), this.each(function () {
                n.event.remove(this, a, c, b);
            });
        },
        trigger: function (a, b) {
            return this.each(function () {
                n.event.trigger(a, b, this);
            });
        },
        triggerHandler: function (a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var ta = / jQuery\d+="(?:null|\d+)"/g, ua = new RegExp('<(?:' + ba + ')[\\s/>]', 'i'), va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, wa = /<script|<style|<link/i, xa = /checked\s*(?:[^=]|=\s*.checked.)/i, ya = /^true\/(.*)/, za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Aa = ca(d), Ba = Aa.appendChild(d.createElement('div'));
    function Ca(a, b) {
        return n.nodeName(a, 'table') && n.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr') ? a.getElementsByTagName('tbody')[0] || a.appendChild(a.ownerDocument.createElement('tbody')) : a;
    }
    function Da(a) {
        return a.type = (null !== n.find.attr(a, 'type')) + '/' + a.type, a;
    }
    function Ea(a) {
        var b = ya.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute('type'), a;
    }
    function Fa(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++)
                        n.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = n.extend({}, g.data));
        }
    }
    function Ga(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);
                for (d in e.events)
                    n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando);
            }
            'script' === c && b.text !== a.text ? (Da(b).text = a.text, Ea(b)) : 'object' === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : 'input' === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : 'option' === c ? b.defaultSelected = b.selected = a.defaultSelected : 'input' !== c && 'textarea' !== c || (b.defaultValue = a.defaultValue);
        }
    }
    function Ha(a, b, c, d) {
        b = f.apply([], b);
        var e, g, h, i, j, k, m = 0, o = a.length, p = o - 1, q = b[0], r = n.isFunction(q);
        if (r || o > 1 && 'string' == typeof q && !l.checkClone && xa.test(q))
            return a.each(function (e) {
                var f = a.eq(e);
                r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
            });
        if (o && (k = ja(b, a[0].ownerDocument, !1, a, d), e = k.firstChild, 1 === k.childNodes.length && (k = e), e || d)) {
            for (i = n.map(ea(k, 'script'), Da), h = i.length; o > m; m++)
                g = k, m !== p && (g = n.clone(g, !0, !0), h && n.merge(i, ea(g, 'script'))), c.call(a[m], g, m);
            if (h)
                for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++)
                    g = i[m], _.test(g.type || '') && !n._data(g, 'globalEval') && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || '').replace(za, '')));
            k = e = null;
        }
        return a;
    }
    function Ia(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
            c || 1 !== d.nodeType || n.cleanData(ea(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, 'script')), d.parentNode.removeChild(d));
        return a;
    }
    n.extend({
        htmlPrefilter: function (a) {
            return a.replace(va, '<$1></$2>');
        },
        clone: function (a, b, c) {
            var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
            if (l.html5Clone || n.isXMLDoc(a) || !ua.test('<' + a.nodeName + '>') ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML, Ba.removeChild(f = Ba.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g)
                    d[g] && Ga(e, d[g]);
            if (b)
                if (c)
                    for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++)
                        Fa(e, d[g]);
                else
                    Fa(a, f);
            return d = ea(f, 'script'), d.length > 0 && fa(d, !i && ea(a, 'script')), d = h = e = null, f;
        },
        cleanData: function (a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++)
                if ((b || M(d)) && (f = d[i], g = f && j[f])) {
                    if (g.events)
                        for (e in g.events)
                            m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f], k || 'undefined' == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i), c.push(f));
                }
        }
    }), n.fn.extend({
        domManip: Ha,
        detach: function (a) {
            return Ia(this, a, !0);
        },
        remove: function (a) {
            return Ia(this, a);
        },
        text: function (a) {
            return Y(this, function (a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a));
            }, null, a, arguments.length);
        },
        append: function () {
            return Ha(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function () {
            return Ha(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function () {
            return Ha(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function () {
            return Ha(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(ea(a, !1));
                while (a.firstChild)
                    a.removeChild(a.firstChild);
                a.options && n.nodeName(a, 'select') && (a.options.length = 0);
            }
            return this;
        },
        clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return n.clone(this, a, b);
            });
        },
        html: function (a) {
            return Y(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a)
                    return 1 === b.nodeType ? b.innerHTML.replace(ta, '') : void 0;
                if ('string' == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || [
                        '',
                        ''
                    ])[1].toLowerCase()]) {
                    a = n.htmlPrefilter(a);
                    try {
                        for (; d > c; c++)
                            b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ea(b, !1)), b.innerHTML = a);
                        b = 0;
                    } catch (e) {
                    }
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function () {
            var a = [];
            return Ha(this, arguments, function (b) {
                var c = this.parentNode;
                n.inArray(this, a) < 0 && (n.cleanData(ea(this)), c && c.replaceChild(b, this));
            }, a);
        }
    }), n.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function (a, b) {
        n.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++)
                c = d === h ? this : this.clone(!0), n(f[d])[b](c), g.apply(e, c.get());
            return this.pushStack(e);
        };
    });
    var Ja, Ka = {
            HTML: 'block',
            BODY: 'block'
        };
    function La(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body), d = n.css(c[0], 'display');
        return c.detach(), d;
    }
    function Ma(a) {
        var b = d, c = Ka[a];
        return c || (c = La(a, b), 'none' !== c && c || (Ja = (Ja || n('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(b.documentElement), b = (Ja[0].contentWindow || Ja[0].contentDocument).document, b.write(), b.close(), c = La(a, b), Ja.detach()), Ka[a] = c), c;
    }
    var Na = /^margin/, Oa = new RegExp('^(' + T + ')(?!px)[a-z%]+$', 'i'), Pa = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b)
                g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b)
                a.style[f] = g[f];
            return e;
        }, Qa = d.documentElement;
    !function () {
        var b, c, e, f, g, h, i = d.createElement('div'), j = d.createElement('div');
        if (j.style) {
            j.style.cssText = 'float:left;opacity:.5', l.opacity = '0.5' === j.style.opacity, l.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = 'content-box', j.cloneNode(!0).style.backgroundClip = '', l.clearCloneStyle = 'content-box' === j.style.backgroundClip, i = d.createElement('div'), i.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute', j.innerHTML = '', i.appendChild(j), l.boxSizing = '' === j.style.boxSizing || '' === j.style.MozBoxSizing || '' === j.style.WebkitBoxSizing, n.extend(l, {
                reliableHiddenOffsets: function () {
                    return null == b && k(), f;
                },
                boxSizingReliable: function () {
                    return null == b && k(), e;
                },
                pixelMarginRight: function () {
                    return null == b && k(), c;
                },
                pixelPosition: function () {
                    return null == b && k(), b;
                },
                reliableMarginRight: function () {
                    return null == b && k(), g;
                },
                reliableMarginLeft: function () {
                    return null == b && k(), h;
                }
            });
            function k() {
                var k, l, m = d.documentElement;
                m.appendChild(i), j.style.cssText = '-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%', b = e = h = !1, c = g = !0, a.getComputedStyle && (l = a.getComputedStyle(j), b = '1%' !== (l || {}).top, h = '2px' === (l || {}).marginLeft, e = '4px' === (l || { width: '4px' }).width, j.style.marginRight = '50%', c = '4px' === (l || { marginRight: '4px' }).marginRight, k = j.appendChild(d.createElement('div')), k.style.cssText = j.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', k.style.marginRight = k.style.width = '0', j.style.width = '1px', g = !parseFloat((a.getComputedStyle(k) || {}).marginRight), j.removeChild(k)), j.style.display = 'none', f = 0 === j.getClientRects().length, f && (j.style.display = '', j.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', j.childNodes[0].style.borderCollapse = 'separate', k = j.getElementsByTagName('td'), k[0].style.cssText = 'margin:0;border:0;padding:0;display:none', f = 0 === k[0].offsetHeight, f && (k[0].style.display = '', k[1].style.display = 'none', f = 0 === k[0].offsetHeight)), m.removeChild(i);
            }
        }
    }();
    var Ra, Sa, Ta = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ra = function (b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b);
    }, Sa = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, '' !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + '';
    }) : Qa.currentStyle && (Ra = function (a) {
        return a.currentStyle;
    }, Sa = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Oa.test(g) && !Ta.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = 'fontSize' === b ? '1em' : g, g = h.pixelLeft + 'px', h.left = d, f && (e.left = f)), void 0 === g ? g : g + '' || 'auto';
    });
    function Ua(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    var Va = /alpha\([^)]*\)/i, Wa = /opacity\s*=\s*([^)]*)/i, Xa = /^(none|table(?!-c[ea]).+)/, Ya = new RegExp('^(' + T + ')(.*)$', 'i'), Za = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
        }, $a = {
            letterSpacing: '0',
            fontWeight: '400'
        }, _a = [
            'Webkit',
            'O',
            'Moz',
            'ms'
        ], ab = d.createElement('div').style;
    function bb(a) {
        if (a in ab)
            return a;
        var b = a.charAt(0).toUpperCase() + a.slice(1), c = _a.length;
        while (c--)
            if (a = _a[c] + b, a in ab)
                return a;
    }
    function cb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            d = a[g], d.style && (f[g] = n._data(d, 'olddisplay'), c = d.style.display, b ? (f[g] || 'none' !== c || (d.style.display = ''), '' === d.style.display && W(d) && (f[g] = n._data(d, 'olddisplay', Ma(d.nodeName)))) : (e = W(d), (c && 'none' !== c || !e) && n._data(d, 'olddisplay', e ? c : n.css(d, 'display'))));
        for (g = 0; h > g; g++)
            d = a[g], d.style && (b && 'none' !== d.style.display && '' !== d.style.display || (d.style.display = b ? f[g] || '' : 'none'));
        return a;
    }
    function db(a, b, c) {
        var d = Ya.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b;
    }
    function eb(a, b, c, d, e) {
        for (var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0, g = 0; 4 > f; f += 2)
            'margin' === c && (g += n.css(a, c + V[f], !0, e)), d ? ('content' === c && (g -= n.css(a, 'padding' + V[f], !0, e)), 'margin' !== c && (g -= n.css(a, 'border' + V[f] + 'Width', !0, e))) : (g += n.css(a, 'padding' + V[f], !0, e), 'padding' !== c && (g += n.css(a, 'border' + V[f] + 'Width', !0, e)));
        return g;
    }
    function fb(a, b, c) {
        var d = !0, e = 'width' === b ? a.offsetWidth : a.offsetHeight, f = Ra(a), g = l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, f);
        if (0 >= e || null == e) {
            if (e = Sa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Oa.test(e))
                return e;
            d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + eb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px';
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Sa(a, 'opacity');
                        return '' === c ? '1' : c;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: { 'float': l.cssFloat ? 'cssFloat' : 'styleFloat' },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c)
                    return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, 'string' === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e), f = 'number'), null != c && c === c && ('number' === f && (c += e && e[3] || (n.cssNumber[h] ? '' : 'px')), l.clearCloneStyle || '' !== c || 0 !== b.indexOf('background') || (i[b] = 'inherit'), !(g && 'set' in g && void 0 === (c = g.set(a, c, d)))))
                    try {
                        i[b] = c;
                    } catch (j) {
                    }
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && 'get' in g && (f = g.get(a, !0, c)), void 0 === f && (f = Sa(a, b, d)), 'normal' === f && b in $a && (f = $a[b]), '' === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f;
        }
    }), n.each([
        'height',
        'width'
    ], function (a, b) {
        n.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? Xa.test(n.css(a, 'display')) && 0 === a.offsetWidth ? Pa(a, Za, function () {
                    return fb(a, b, d);
                }) : fb(a, b, d) : void 0;
            },
            set: function (a, c, d) {
                var e = d && Ra(a);
                return db(a, c, d ? eb(a, b, d, l.boxSizing && 'border-box' === n.css(a, 'boxSizing', !1, e), e) : 0);
            }
        };
    }), l.opacity || (n.cssHooks.opacity = {
        get: function (a, b) {
            return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : '';
        },
        set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '', f = d && d.filter || c.filter || '';
            c.zoom = 1, (b >= 1 || '' === b) && '' === n.trim(f.replace(Va, '')) && c.removeAttribute && (c.removeAttribute('filter'), '' === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + ' ' + e);
        }
    }), n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
        return b ? Pa(a, { display: 'inline-block' }, Sa, [
            a,
            'marginRight'
        ]) : void 0;
    }), n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
        return b ? (parseFloat(Sa(a, 'marginLeft')) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, { marginLeft: 0 }, function () {
            return a.getBoundingClientRect().left;
        }) : 0)) + 'px' : void 0;
    }), n.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function (a, b) {
        n.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = 'string' == typeof c ? c.split(' ') : [c]; 4 > d; d++)
                    e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, Na.test(a) || (n.cssHooks[a + b].set = db);
    }), n.fn.extend({
        css: function (a, b) {
            return Y(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Ra(a), e = b.length; e > g; g++)
                        f[b[g]] = n.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function () {
            return cb(this, !0);
        },
        hide: function () {
            return cb(this);
        },
        toggle: function (a) {
            return 'boolean' == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                W(this) ? n(this).show() : n(this).hide();
            });
        }
    });
    function gb(a, b, c, d, e) {
        return new gb.prototype.init(a, b, c, d, e);
    }
    n.Tween = gb, gb.prototype = {
        constructor: gb,
        init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? '' : 'px');
        },
        cur: function () {
            var a = gb.propHooks[this.prop];
            return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
        },
        run: function (a) {
            var b, c = gb.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : gb.propHooks._default.set(this), this;
        }
    }, gb.prototype.init.prototype = gb.prototype, gb.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ''), b && 'auto' !== b ? b : 0);
            },
            set: function (a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit);
            }
        }
    }, gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, n.easing = {
        linear: function (a) {
            return a;
        },
        swing: function (a) {
            return 0.5 - Math.cos(a * Math.PI) / 2;
        },
        _default: 'swing'
    }, n.fx = gb.prototype.init, n.fx.step = {};
    var hb, ib, jb = /^(?:toggle|show|hide)$/, kb = /queueHooks$/;
    function lb() {
        return a.setTimeout(function () {
            hb = void 0;
        }), hb = n.now();
    }
    function mb(a, b) {
        var c, d = { height: a }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            c = V[e], d['margin' + c] = d['padding' + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function nb(a, b, c) {
        for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners['*']), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a))
                return d;
    }
    function ob(a, b, c) {
        var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && W(a), r = n._data(a, 'fxshow');
        c.queue || (h = n._queueHooks(a, 'fx'), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i();
        }), h.unqueued++, m.always(function () {
            m.always(function () {
                h.unqueued--, n.queue(a, 'fx').length || h.empty.fire();
            });
        })), 1 === a.nodeType && ('height' in b || 'width' in b) && (c.overflow = [
            p.overflow,
            p.overflowX,
            p.overflowY
        ], j = n.css(a, 'display'), k = 'none' === j ? n._data(a, 'olddisplay') || Ma(a.nodeName) : j, 'inline' === k && 'none' === n.css(a, 'float') && (l.inlineBlockNeedsLayout && 'inline' !== Ma(a.nodeName) ? p.zoom = 1 : p.display = 'inline-block')), c.overflow && (p.overflow = 'hidden', l.shrinkWrapBlocks() || m.always(function () {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
        }));
        for (d in b)
            if (e = b[d], jb.exec(e)) {
                if (delete b[d], f = f || 'toggle' === e, e === (q ? 'hide' : 'show')) {
                    if ('show' !== e || !r || void 0 === r[d])
                        continue;
                    q = !0;
                }
                o[d] = r && r[d] || n.style(a, d);
            } else
                j = void 0;
        if (n.isEmptyObject(o))
            'inline' === ('none' === j ? Ma(a.nodeName) : j) && (p.display = j);
        else {
            r ? 'hidden' in r && (q = r.hidden) : r = n._data(a, 'fxshow', {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
                n(a).hide();
            }), m.done(function () {
                var b;
                n._removeData(a, 'fxshow');
                for (b in o)
                    n.style(a, b, o[b]);
            });
            for (d in o)
                g = nb(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = 'width' === d || 'height' === d ? 1 : 0));
        }
    }
    function pb(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && 'expand' in g) {
                f = g.expand(f), delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c], b[c] = e);
            } else
                b[d] = e;
    }
    function qb(a, b, c) {
        var d, e, f = 0, g = qb.prefilters.length, h = n.Deferred().always(function () {
                delete i.elem;
            }), i = function () {
                if (e)
                    return !1;
                for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                    j.tweens[g].run(f);
                return h.notifyWith(a, [
                    j,
                    f,
                    c
                ]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
            }, j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(!0, {
                    specialEasing: {},
                    easing: n.easing._default
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: hb || lb(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d;
                },
                stop: function (b) {
                    var c = 0, d = b ? j.tweens.length : 0;
                    if (e)
                        return this;
                    for (e = !0; d > c; c++)
                        j.tweens[c].run(1);
                    return b ? (h.notifyWith(a, [
                        j,
                        1,
                        0
                    ]), h.resolveWith(a, [
                        j,
                        b
                    ])) : h.rejectWith(a, [
                        j,
                        b
                    ]), this;
                }
            }), k = j.props;
        for (pb(k, j.opts.specialEasing); g > f; f++)
            if (d = qb.prefilters[f].call(j, a, k, j.opts))
                return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
        return n.map(k, nb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    n.Animation = n.extend(qb, {
        tweeners: {
            '*': [function (a, b) {
                    var c = this.createTween(a, b);
                    return X(c.elem, a, U.exec(b), c), c;
                }]
        },
        tweener: function (a, b) {
            n.isFunction(a) ? (b = a, a = ['*']) : a = a.match(G);
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d], qb.tweeners[c] = qb.tweeners[c] || [], qb.tweeners[c].unshift(b);
        },
        prefilters: [ob],
        prefilter: function (a, b) {
            b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
        }
    }), n.speed = function (a, b, c) {
        var d = a && 'object' == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : 'number' == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = 'fx'), d.old = d.complete, d.complete = function () {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
        }, d;
    }, n.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(W).css('opacity', 0).show().end().animate({ opacity: b }, a, c, d);
        },
        animate: function (a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function () {
                    var b = qb(this, n.extend({}, a), f);
                    (e || n._data(this, 'finish')) && b.stop(!0);
                };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return 'string' != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || 'fx', []), this.each(function () {
                var b = !0, e = null != a && a + 'queueHooks', f = n.timers, g = n._data(this);
                if (e)
                    g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g)
                        g[e] && g[e].stop && kb.test(e) && d(g[e]);
                for (e = f.length; e--;)
                    f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                !b && c || n.dequeue(this, a);
            });
        },
        finish: function (a) {
            return a !== !1 && (a = a || 'fx'), this.each(function () {
                var b, c = n._data(this), d = c[a + 'queue'], e = c[a + 'queueHooks'], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), n.each([
        'toggle',
        'show',
        'hide'
    ], function (a, b) {
        var c = n.fn[b];
        n.fn[b] = function (a, d, e) {
            return null == a || 'boolean' == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e);
        };
    }), n.each({
        slideDown: mb('show'),
        slideUp: mb('hide'),
        slideToggle: mb('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
    }, function (a, b) {
        n.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), n.timers = [], n.fx.tick = function () {
        var a, b = n.timers, c = 0;
        for (hb = n.now(); c < b.length; c++)
            a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(), hb = void 0;
    }, n.fx.timer = function (a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }, n.fx.interval = 13, n.fx.start = function () {
        ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
    }, n.fx.stop = function () {
        a.clearInterval(ib), ib = null;
    }, n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, n.fn.delay = function (b, c) {
        return b = n.fx ? n.fx.speeds[b] || b : b, c = c || 'fx', this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function () {
                a.clearTimeout(e);
            };
        });
    }, function () {
        var a, b = d.createElement('input'), c = d.createElement('div'), e = d.createElement('select'), f = e.appendChild(d.createElement('option'));
        c = d.createElement('div'), c.setAttribute('className', 't'), c.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', a = c.getElementsByTagName('a')[0], b.setAttribute('type', 'checkbox'), c.appendChild(b), a = c.getElementsByTagName('a')[0], a.style.cssText = 'top:1px', l.getSetAttribute = 't' !== c.className, l.style = /top/.test(a.getAttribute('style')), l.hrefNormalized = '/a' === a.getAttribute('href'), l.checkOn = !!b.value, l.optSelected = f.selected, l.enctype = !!d.createElement('form').enctype, e.disabled = !0, l.optDisabled = !f.disabled, b = d.createElement('input'), b.setAttribute('value', ''), l.input = '' === b.getAttribute('value'), b.value = 't', b.setAttribute('type', 'radio'), l.radioValue = 't' === b.value;
    }();
    var rb = /\r/g, sb = /[\x20\t\r\n\f]+/g;
    n.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length)
                    return d = n.isFunction(a), this.each(function (c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = '' : 'number' == typeof e ? e += '' : n.isArray(e) && (e = n.map(e, function (a) {
                            return null == a ? '' : a + '';
                        })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && 'set' in b && void 0 !== b.set(this, e, 'value') || (this.value = e));
                    });
                if (e)
                    return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && 'get' in b && void 0 !== (c = b.get(e, 'value')) ? c : (c = e.value, 'string' == typeof c ? c.replace(rb, '') : null == c ? '' : c);
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = n.find.attr(a, 'value');
                    return null != b ? b : n.trim(n.text(a)).replace(sb, ' ');
                }
            },
            select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = 'select-one' === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute('disabled')) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, 'optgroup'))) {
                            if (b = n(c).val(), f)
                                return b;
                            g.push(b);
                        }
                    return g;
                },
                set: function (a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--)
                        if (d = e[g], n.inArray(n.valHooks.option.get(d), f) > -1)
                            try {
                                d.selected = c = !0;
                            } catch (h) {
                                d.scrollHeight;
                            }
                        else
                            d.selected = !1;
                    return c || (a.selectedIndex = -1), e;
                }
            }
        }
    }), n.each([
        'radio',
        'checkbox'
    ], function () {
        n.valHooks[this] = {
            set: function (a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0;
            }
        }, l.checkOn || (n.valHooks[this].get = function (a) {
            return null === a.getAttribute('value') ? 'on' : a.value;
        });
    });
    var tb, ub, vb = n.expr.attrHandle, wb = /^(?:checked|selected)$/i, xb = l.getSetAttribute, yb = l.input;
    n.fn.extend({
        attr: function (a, b) {
            return Y(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a);
            });
        }
    }), n.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f)
                return 'undefined' == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ''), c) : e && 'get' in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d));
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (!l.radioValue && 'radio' === b && n.nodeName(a, 'input')) {
                        var c = a.value;
                        return a.setAttribute('type', b), c && (a.value = c), b;
                    }
                }
            }
        },
        removeAttr: function (a, b) {
            var c, d, e = 0, f = b && b.match(G);
            if (f && 1 === a.nodeType)
                while (c = f[e++])
                    d = n.propFix[c] || c, n.expr.match.bool.test(c) ? yb && xb || !wb.test(c) ? a[d] = !1 : a[n.camelCase('default-' + c)] = a[d] = !1 : n.attr(a, c, ''), a.removeAttribute(xb ? c : d);
        }
    }), ub = {
        set: function (a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : yb && xb || !wb.test(c) ? a.setAttribute(!xb && n.propFix[c] || c, c) : a[n.camelCase('default-' + c)] = a[c] = !0, c;
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = vb[b] || n.find.attr;
        yb && xb || !wb.test(b) ? vb[b] = function (a, b, d) {
            var e, f;
            return d || (f = vb[b], vb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, vb[b] = f), e;
        } : vb[b] = function (a, b, c) {
            return c ? void 0 : a[n.camelCase('default-' + b)] ? b.toLowerCase() : null;
        };
    }), yb && xb || (n.attrHooks.value = {
        set: function (a, b, c) {
            return n.nodeName(a, 'input') ? void (a.defaultValue = b) : tb && tb.set(a, b, c);
        }
    }), xb || (tb = {
        set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += '', 'value' === c || b === a.getAttribute(c) ? b : void 0;
        }
    }, vb.id = vb.name = vb.coords = function (a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && '' !== d.value ? d.value : null;
    }, n.valHooks.button = {
        get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0;
        },
        set: tb.set
    }, n.attrHooks.contenteditable = {
        set: function (a, b, c) {
            tb.set(a, '' === b ? !1 : b, c);
        }
    }, n.each([
        'width',
        'height'
    ], function (a, b) {
        n.attrHooks[b] = {
            set: function (a, c) {
                return '' === c ? (a.setAttribute(b, 'auto'), c) : void 0;
            }
        };
    })), l.style || (n.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || void 0;
        },
        set: function (a, b) {
            return a.style.cssText = b + '';
        }
    });
    var zb = /^(?:input|select|textarea|button|object)$/i, Ab = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function (a, b) {
            return Y(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return a = n.propFix[a] || a, this.each(function () {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {
                }
            });
        }
    }), n.extend({
        prop: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f)
                return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && 'get' in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = n.find.attr(a, 'tabindex');
                    return b ? parseInt(b, 10) : zb.test(a.nodeName) || Ab.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        },
        propFix: {
            'for': 'htmlFor',
            'class': 'className'
        }
    }), l.hrefNormalized || n.each([
        'href',
        'src'
    ], function (a, b) {
        n.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4);
            }
        };
    }), l.optSelected || (n.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        },
        set: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        }
    }), n.each([
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable'
    ], function () {
        n.propFix[this.toLowerCase()] = this;
    }), l.enctype || (n.propFix.enctype = 'encoding');
    var Bb = /[\t\r\n\f]/g;
    function Cb(a) {
        return n.attr(a, 'class') || '';
    }
    n.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).addClass(a.call(this, b, Cb(this)));
                });
            if ('string' == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++])
                    if (e = Cb(c), d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')) {
                        g = 0;
                        while (f = b[g++])
                            d.indexOf(' ' + f + ' ') < 0 && (d += f + ' ');
                        h = n.trim(d), e !== h && n.attr(c, 'class', h);
                    }
            }
            return this;
        },
        removeClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).removeClass(a.call(this, b, Cb(this)));
                });
            if (!arguments.length)
                return this.attr('class', '');
            if ('string' == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++])
                    if (e = Cb(c), d = 1 === c.nodeType && (' ' + e + ' ').replace(Bb, ' ')) {
                        g = 0;
                        while (f = b[g++])
                            while (d.indexOf(' ' + f + ' ') > -1)
                                d = d.replace(' ' + f + ' ', ' ');
                        h = n.trim(d), e !== h && n.attr(c, 'class', h);
                    }
            }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return 'boolean' == typeof b && 'string' === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
                n(this).toggleClass(a.call(this, c, Cb(this), b), b);
            }) : this.each(function () {
                var b, d, e, f;
                if ('string' === c) {
                    d = 0, e = n(this), f = a.match(G) || [];
                    while (b = f[d++])
                        e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                } else
                    void 0 !== a && 'boolean' !== c || (b = Cb(this), b && n._data(this, '__className__', b), n.attr(this, 'class', b || a === !1 ? '' : n._data(this, '__className__') || ''));
            });
        },
        hasClass: function (a) {
            var b, c, d = 0;
            b = ' ' + a + ' ';
            while (c = this[d++])
                if (1 === c.nodeType && (' ' + Cb(c) + ' ').replace(Bb, ' ').indexOf(b) > -1)
                    return !0;
            return !1;
        }
    }), n.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
        n.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), n.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    });
    var Db = a.location, Eb = n.now(), Fb = /\?/, Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    n.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse)
            return a.JSON.parse(b + '');
        var c, d = null, e = n.trim(b + '');
        return e && !n.trim(e.replace(Gb, function (a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, '');
        })) ? Function('return ' + e)() : n.error('Invalid JSON: ' + b);
    }, n.parseXML = function (b) {
        var c, d;
        if (!b || 'string' != typeof b)
            return null;
        try {
            a.DOMParser ? (d = new a.DOMParser(), c = d.parseFromString(b, 'text/xml')) : (c = new a.ActiveXObject('Microsoft.XMLDOM'), c.async = 'false', c.loadXML(b));
        } catch (e) {
            c = void 0;
        }
        return c && c.documentElement && !c.getElementsByTagName('parsererror').length || n.error('Invalid XML: ' + b), c;
    };
    var Hb = /#.*$/, Ib = /([?&])_=[^&]*/, Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Lb = /^(?:GET|HEAD)$/, Mb = /^\/\//, Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ob = {}, Pb = {}, Qb = '*/'.concat('*'), Rb = Db.href, Sb = Nb.exec(Rb.toLowerCase()) || [];
    function Tb(a) {
        return function (b, c) {
            'string' != typeof b && (c = b, b = '*');
            var d, e = 0, f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c))
                while (d = f[e++])
                    '+' === d.charAt(0) ? (d = d.slice(1) || '*', (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function Ub(a, b, c, d) {
        var e = {}, f = a === Pb;
        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return 'string' != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
            }), i;
        }
        return g(b.dataTypes[0]) || !e['*'] && g('*');
    }
    function Vb(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (d in b)
            void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c), a;
    }
    function Wb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ('*' === i[0])
            i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break;
                }
        if (i[0] in c)
            f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + ' ' + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Xb(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters)
                j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ('*' === f)
                    f = i;
                else if ('*' !== i && i !== f) {
                    if (g = j[i + ' ' + f] || j['* ' + f], !g)
                        for (e in j)
                            if (h = e.split(' '), h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]])) {
                                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                break;
                            }
                    if (g !== !0)
                        if (g && a['throws'])
                            b = g(b);
                        else
                            try {
                                b = g(b);
                            } catch (l) {
                                return {
                                    state: 'parsererror',
                                    error: g ? l : 'No conversion from ' + i + ' to ' + f
                                };
                            }
                }
        return {
            state: 'success',
            data: b
        };
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Rb,
            type: 'GET',
            isLocal: Kb.test(Sb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            accepts: {
                '*': Qb,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            converters: {
                '* text': String,
                'text html': !0,
                'text json': n.parseJSON,
                'text xml': n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (a, b) {
            return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
        },
        ajaxPrefilter: Tb(Ob),
        ajaxTransport: Tb(Pb),
        ajax: function (b, c) {
            'object' == typeof b && (c = b, b = void 0), c = c || {};
            var d, e, f, g, h, i, j, k, l = n.ajaxSetup({}, c), m = l.context || l, o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event, p = n.Deferred(), q = n.Callbacks('once memory'), r = l.statusCode || {}, s = {}, t = {}, u = 0, v = 'canceled', w = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === u) {
                            if (!k) {
                                k = {};
                                while (b = Jb.exec(g))
                                    k[b[1].toLowerCase()] = b[2];
                            }
                            b = k[a.toLowerCase()];
                        }
                        return null == b ? null : b;
                    },
                    getAllResponseHeaders: function () {
                        return 2 === u ? g : null;
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return u || (a = t[c] = t[c] || a, s[a] = b), this;
                    },
                    overrideMimeType: function (a) {
                        return u || (l.mimeType = a), this;
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)
                            if (2 > u)
                                for (b in a)
                                    r[b] = [
                                        r[b],
                                        a[b]
                                    ];
                            else
                                w.always(a[w.status]);
                        return this;
                    },
                    abort: function (a) {
                        var b = a || v;
                        return j && j.abort(b), y(0, b), this;
                    }
                };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, l.url = ((b || l.url || Rb) + '').replace(Hb, '').replace(Mb, Sb[1] + '//'), l.type = c.method || c.type || l.method || l.type, l.dataTypes = n.trim(l.dataType || '*').toLowerCase().match(G) || [''], null == l.crossDomain && (d = Nb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Sb[1] && d[2] === Sb[2] && (d[3] || ('http:' === d[1] ? '80' : '443')) === (Sb[3] || ('http:' === Sb[1] ? '80' : '443')))), l.data && l.processData && 'string' != typeof l.data && (l.data = n.param(l.data, l.traditional)), Ub(Ob, l, c, w), 2 === u)
                return w;
            i = n.event && l.global, i && 0 === n.active++ && n.event.trigger('ajaxStart'), l.type = l.type.toUpperCase(), l.hasContent = !Lb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? '&' : '?') + l.data, delete l.data), l.cache === !1 && (l.url = Ib.test(f) ? f.replace(Ib, '$1_=' + Eb++) : f + (Fb.test(f) ? '&' : '?') + '_=' + Eb++)), l.ifModified && (n.lastModified[f] && w.setRequestHeader('If-Modified-Since', n.lastModified[f]), n.etag[f] && w.setRequestHeader('If-None-Match', n.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader('Content-Type', l.contentType), w.setRequestHeader('Accept', l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ('*' !== l.dataTypes[0] ? ', ' + Qb + '; q=0.01' : '') : l.accepts['*']);
            for (e in l.headers)
                w.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u))
                return w.abort();
            v = 'abort';
            for (e in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                w[e](l[e]);
            if (j = Ub(Pb, l, c, w)) {
                if (w.readyState = 1, i && o.trigger('ajaxSend', [
                        w,
                        l
                    ]), 2 === u)
                    return w;
                l.async && l.timeout > 0 && (h = a.setTimeout(function () {
                    w.abort('timeout');
                }, l.timeout));
                try {
                    u = 1, j.send(s, y);
                } catch (x) {
                    if (!(2 > u))
                        throw x;
                    y(-1, x);
                }
            } else
                y(-1, 'No Transport');
            function y(b, c, d, e) {
                var k, s, t, v, x, y = c;
                2 !== u && (u = 2, h && a.clearTimeout(h), j = void 0, g = e || '', w.readyState = b > 0 ? 4 : 0, k = b >= 200 && 300 > b || 304 === b, d && (v = Wb(l, w, d)), v = Xb(l, v, w, k), k ? (l.ifModified && (x = w.getResponseHeader('Last-Modified'), x && (n.lastModified[f] = x), x = w.getResponseHeader('etag'), x && (n.etag[f] = x)), 204 === b || 'HEAD' === l.type ? y = 'nocontent' : 304 === b ? y = 'notmodified' : (y = v.state, s = v.data, t = v.error, k = !t)) : (t = y, !b && y || (y = 'error', 0 > b && (b = 0))), w.status = b, w.statusText = (c || y) + '', k ? p.resolveWith(m, [
                    s,
                    y,
                    w
                ]) : p.rejectWith(m, [
                    w,
                    y,
                    t
                ]), w.statusCode(r), r = void 0, i && o.trigger(k ? 'ajaxSuccess' : 'ajaxError', [
                    w,
                    l,
                    k ? s : t
                ]), q.fireWith(m, [
                    w,
                    y
                ]), i && (o.trigger('ajaxComplete', [
                    w,
                    l
                ]), --n.active || n.event.trigger('ajaxStop')));
            }
            return w;
        },
        getJSON: function (a, b, c) {
            return n.get(a, b, c, 'json');
        },
        getScript: function (a, b) {
            return n.get(a, void 0, b, 'script');
        }
    }), n.each([
        'get',
        'post'
    ], function (a, b) {
        n[b] = function (a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, n.isPlainObject(a) && a));
        };
    }), n._evalUrl = function (a) {
        return n.ajax({
            url: a,
            type: 'GET',
            dataType: 'script',
            cache: !0,
            async: !1,
            global: !1,
            'throws': !0
        });
    }, n.fn.extend({
        wrapAll: function (a) {
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).wrapAll(a.call(this, b));
                });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType)
                        a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (a) {
            return n.isFunction(a) ? this.each(function (b) {
                n(this).wrapInner(a.call(this, b));
            }) : this.each(function () {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function (a) {
            var b = n.isFunction(a);
            return this.each(function (c) {
                n(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                n.nodeName(this, 'body') || n(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    function Yb(a) {
        return a.style && a.style.display || n.css(a, 'display');
    }
    function Zb(a) {
        if (!n.contains(a.ownerDocument || d, a))
            return !0;
        while (a && 1 === a.nodeType) {
            if ('none' === Yb(a) || 'hidden' === a.type)
                return !0;
            a = a.parentNode;
        }
        return !1;
    }
    n.expr.filters.hidden = function (a) {
        return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Zb(a);
    }, n.expr.filters.visible = function (a) {
        return !n.expr.filters.hidden(a);
    };
    var $b = /%20/g, _b = /\[\]$/, ac = /\r?\n/g, bc = /^(?:submit|button|image|reset|file)$/i, cc = /^(?:input|select|textarea|keygen)/i;
    function dc(a, b, c, d) {
        var e;
        if (n.isArray(b))
            n.each(b, function (b, e) {
                c || _b.test(a) ? d(a, e) : dc(a + '[' + ('object' == typeof e && null != e ? b : '') + ']', e, c, d);
            });
        else if (c || 'object' !== n.type(b))
            d(a, b);
        else
            for (e in b)
                dc(a + '[' + e + ']', b[e], c, d);
    }
    n.param = function (a, b) {
        var c, d = [], e = function (a, b) {
                b = n.isFunction(b) ? b() : null == b ? '' : b, d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b);
            };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))
            n.each(a, function () {
                e(this.name, this.value);
            });
        else
            for (c in a)
                dc(c, a[c], b, e);
        return d.join('&').replace($b, '+');
    }, n.fn.extend({
        serialize: function () {
            return n.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var a = n.prop(this, 'elements');
                return a ? n.makeArray(a) : this;
            }).filter(function () {
                var a = this.type;
                return this.name && !n(this).is(':disabled') && cc.test(this.nodeName) && !bc.test(a) && (this.checked || !Z.test(a));
            }).map(function (a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
                    return {
                        name: b.name,
                        value: a.replace(ac, '\r\n')
                    };
                }) : {
                    name: b.name,
                    value: c.replace(ac, '\r\n')
                };
            }).get();
        }
    }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return this.isLocal ? ic() : d.documentMode > 8 ? hc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && hc() || ic();
    } : hc;
    var ec = 0, fc = {}, gc = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent('onunload', function () {
        for (var a in fc)
            fc[a](void 0, !0);
    }), l.cors = !!gc && 'withCredentials' in gc, gc = l.ajax = !!gc, gc && n.ajaxTransport(function (b) {
        if (!b.crossDomain || l.cors) {
            var c;
            return {
                send: function (d, e) {
                    var f, g = b.xhr(), h = ++ec;
                    if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                        for (f in b.xhrFields)
                            g[f] = b.xhrFields[f];
                    b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d['X-Requested-With'] || (d['X-Requested-With'] = 'XMLHttpRequest');
                    for (f in d)
                        void 0 !== d[f] && g.setRequestHeader(f, d[f] + '');
                    g.send(b.hasContent && b.data || null), c = function (a, d) {
                        var f, i, j;
                        if (c && (d || 4 === g.readyState))
                            if (delete fc[h], c = void 0, g.onreadystatechange = n.noop, d)
                                4 !== g.readyState && g.abort();
                            else {
                                j = {}, f = g.status, 'string' == typeof g.responseText && (j.text = g.responseText);
                                try {
                                    i = g.statusText;
                                } catch (k) {
                                    i = '';
                                }
                                f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404;
                            }
                        j && e(f, i, j, g.getAllResponseHeaders());
                    }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = fc[h] = c : c();
                },
                abort: function () {
                    c && c(void 0, !0);
                }
            };
        }
    });
    function hc() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {
        }
    }
    function ic() {
        try {
            return new a.ActiveXObject('Microsoft.XMLHTTP');
        } catch (b) {
        }
    }
    n.ajaxSetup({
        accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
            'text script': function (a) {
                return n.globalEval(a), a;
            }
        }
    }), n.ajaxPrefilter('script', function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = 'GET', a.global = !1);
    }), n.ajaxTransport('script', function (a) {
        if (a.crossDomain) {
            var b, c = d.head || n('head')[0] || d.documentElement;
            return {
                send: function (e, f) {
                    b = d.createElement('script'), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, 'success'));
                    }, c.insertBefore(b, c.firstChild);
                },
                abort: function () {
                    b && b.onload(void 0, !0);
                }
            };
        }
    });
    var jc = [], kc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var a = jc.pop() || n.expando + '_' + Eb++;
            return this[a] = !0, a;
        }
    }), n.ajaxPrefilter('json jsonp', function (b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (kc.test(b.url) ? 'url' : 'string' == typeof b.data && 0 === (b.contentType || '').indexOf('application/x-www-form-urlencoded') && kc.test(b.data) && 'data');
        return h || 'jsonp' === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(kc, '$1' + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? '&' : '?') + b.jsonp + '=' + e), b.converters['script json'] = function () {
            return g || n.error(e + ' was not called'), g[0];
        }, b.dataTypes[0] = 'json', f = a[e], a[e] = function () {
            g = arguments;
        }, d.always(function () {
            void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, jc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
        }), 'script') : void 0;
    }), n.parseHTML = function (a, b, c) {
        if (!a || 'string' != typeof a)
            return null;
        'boolean' == typeof b && (c = b, b = !1), b = b || d;
        var e = x.exec(a), f = !c && [];
        return e ? [b.createElement(e[1])] : (e = ja([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes));
    };
    var lc = n.fn.load;
    n.fn.load = function (a, b, c) {
        if ('string' != typeof a && lc)
            return lc.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(' ');
        return h > -1 && (d = n.trim(a.slice(h, a.length)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && 'object' == typeof b && (e = 'POST'), g.length > 0 && n.ajax({
            url: a,
            type: e || 'GET',
            dataType: 'html',
            data: b
        }).done(function (a) {
            f = arguments, g.html(d ? n('<div>').append(n.parseHTML(a)).find(d) : a);
        }).always(c && function (a, b) {
            g.each(function () {
                c.apply(this, f || [
                    a.responseText,
                    b,
                    a
                ]);
            });
        }), this;
    }, n.each([
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
    ], function (a, b) {
        n.fn[b] = function (a) {
            return this.on(b, a);
        };
    }), n.expr.filters.animated = function (a) {
        return n.grep(n.timers, function (b) {
            return a === b.elem;
        }).length;
    };
    function mc(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    n.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, 'position'), l = n(a), m = {};
            'static' === k && (a.style.position = 'relative'), h = l.offset(), f = n.css(a, 'top'), i = n.css(a, 'left'), j = ('absolute' === k || 'fixed' === k) && n.inArray('auto', [
                f,
                i
            ]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), 'using' in b ? b.using.call(a, m) : l.css(m);
        }
    }, n.fn.extend({
        offset: function (a) {
            if (arguments.length)
                return void 0 === a ? this : this.each(function (b) {
                    n.offset.setOffset(this, a, b);
                });
            var b, c, d = {
                    top: 0,
                    left: 0
                }, e = this[0], f = e && e.ownerDocument;
            if (f)
                return b = f.documentElement, n.contains(b, e) ? ('undefined' != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = mc(f), {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d;
        },
        position: function () {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    }, d = this[0];
                return 'fixed' === n.css(d, 'position') ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], 'html') || (c = a.offset()), c.top += n.css(a[0], 'borderTopWidth', !0), c.left += n.css(a[0], 'borderLeftWidth', !0)), {
                    top: b.top - c.top - n.css(d, 'marginTop', !0),
                    left: b.left - c.left - n.css(d, 'marginLeft', !0)
                };
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent;
                while (a && !n.nodeName(a, 'html') && 'static' === n.css(a, 'position'))
                    a = a.offsetParent;
                return a || Qa;
            });
        }
    }), n.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function (a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function (d) {
            return Y(this, function (a, d, e) {
                var f = mc(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), n.each([
        'top',
        'left'
    ], function (a, b) {
        n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
            return c ? (c = Sa(a, b), Oa.test(c) ? n(a).position()[b] + 'px' : c) : void 0;
        });
    }), n.each({
        Height: 'height',
        Width: 'width'
    }, function (a, b) {
        n.each({
            padding: 'inner' + a,
            content: b,
            '': 'outer' + a
        }, function (c, d) {
            n.fn[d] = function (d, e) {
                var f = arguments.length && (c || 'boolean' != typeof d), g = c || (d === !0 || e === !0 ? 'margin' : 'border');
                return Y(this, function (b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement['client' + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body['scroll' + a], e['scroll' + a], b.body['offset' + a], e['offset' + a], e['client' + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), n.fn.extend({
        bind: function (a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function (a, b) {
            return this.off(a, null, b);
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, '**') : this.off(b, a || '**', c);
        }
    }), n.fn.size = function () {
        return this.length;
    }, n.fn.andSelf = n.fn.addBack, 'function' == typeof define && define.amd && define('jquery', [], function () {
        return n;
    });
    var nc = a.jQuery, oc = a.$;
    return n.noConflict = function (b) {
        return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n;
    }, b || (a.jQuery = a.$ = n), n;
});
(function (window, document, undefined) {
    'use strict';
    function minErr(module) {
        return function () {
            var code = arguments[0], prefix = '[' + (module ? module + ':' : '') + code + '] ', template = arguments[1], templateArgs = arguments, stringify = function (obj) {
                    if (typeof obj === 'function') {
                        return obj.toString().replace(/ \{[\s\S]*$/, '');
                    } else if (typeof obj === 'undefined') {
                        return 'undefined';
                    } else if (typeof obj !== 'string') {
                        return JSON.stringify(obj);
                    }
                    return obj;
                }, message, i;
            message = prefix + template.replace(/\{\d+\}/g, function (match) {
                var index = +match.slice(1, -1), arg;
                if (index + 2 < templateArgs.length) {
                    arg = templateArgs[index + 2];
                    if (typeof arg === 'function') {
                        return arg.toString().replace(/ ?\{[\s\S]*$/, '');
                    } else if (typeof arg === 'undefined') {
                        return 'undefined';
                    } else if (typeof arg !== 'string') {
                        return toJson(arg);
                    }
                    return arg;
                }
                return match;
            });
            message = message + '\nhttp://errors.angularjs.org/1.2.32/' + (module ? module + '/' : '') + code;
            for (i = 2; i < arguments.length; i++) {
                message = message + (i == 2 ? '?' : '&') + 'p' + (i - 2) + '=' + encodeURIComponent(stringify(arguments[i]));
            }
            return new Error(message);
        };
    }
    var VALIDITY_STATE_PROPERTY = 'validity';
    var lowercase = function (string) {
        return isString(string) ? string.toLowerCase() : string;
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var uppercase = function (string) {
        return isString(string) ? string.toUpperCase() : string;
    };
    var manualLowercase = function (s) {
        return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
            return String.fromCharCode(ch.charCodeAt(0) | 32);
        }) : s;
    };
    var manualUppercase = function (s) {
        return isString(s) ? s.replace(/[a-z]/g, function (ch) {
            return String.fromCharCode(ch.charCodeAt(0) & ~32);
        }) : s;
    };
    if ('i' !== 'I'.toLowerCase()) {
        lowercase = manualLowercase;
        uppercase = manualUppercase;
    }
    var msie, jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, ngMinErr = minErr('ng'), angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
            '0',
            '0',
            '0'
        ];
    msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]);
    if (isNaN(msie)) {
        msie = int((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]);
    }
    function isArrayLike(obj) {
        if (obj == null || isWindow(obj)) {
            return false;
        }
        var length = obj.length;
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return isString(obj) || isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
    }
    function forEach(obj, iterator, context) {
        var key;
        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (isArray(obj) || isArrayLike(obj)) {
                for (key = 0; key < obj.length; key++) {
                    iterator.call(context, obj[key], key);
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context);
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
        }
        return obj;
    }
    function sortedKeys(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys.sort();
    }
    function forEachSorted(obj, iterator, context) {
        var keys = sortedKeys(obj);
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }
    function reverseParams(iteratorFn) {
        return function (value, key) {
            iteratorFn(key, value);
        };
    }
    function nextUid() {
        var index = uid.length;
        var digit;
        while (index) {
            index--;
            digit = uid[index].charCodeAt(0);
            if (digit == 57) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90) {
                uid[index] = '0';
            } else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    }
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        } else {
            delete obj.$$hashKey;
        }
    }
    function extend(dst) {
        var h = dst.$$hashKey;
        forEach(arguments, function (obj) {
            if (obj !== dst) {
                forEach(obj, function (value, key) {
                    dst[key] = value;
                });
            }
        });
        setHashKey(dst, h);
        return dst;
    }
    function int(str) {
        return parseInt(str, 10);
    }
    function inherit(parent, extra) {
        return extend(new (extend(function () {
        }, { prototype: parent }))(), extra);
    }
    function noop() {
    }
    noop.$inject = [];
    function identity($) {
        return $;
    }
    identity.$inject = [];
    function valueFn(value) {
        return function () {
            return value;
        };
    }
    function isUndefined(value) {
        return typeof value === 'undefined';
    }
    function isDefined(value) {
        return typeof value !== 'undefined';
    }
    function isObject(value) {
        return value != null && typeof value === 'object';
    }
    function isString(value) {
        return typeof value === 'string';
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }
    var isArray = function () {
        if (!isFunction(Array.isArray)) {
            return function (value) {
                return toString.call(value) === '[object Array]';
            };
        }
        return Array.isArray;
    }();
    function isFunction(value) {
        return typeof value === 'function';
    }
    function isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    }
    function isWindow(obj) {
        return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }
    function isBlob(obj) {
        return toString.call(obj) === '[object Blob]';
    }
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    var trim = function () {
        if (!String.prototype.trim) {
            return function (value) {
                return isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
            };
        }
        return function (value) {
            return isString(value) ? value.trim() : value;
        };
    }();
    function isElement(node) {
        return !!(node && (node.nodeName || node.prop && node.attr && node.find));
    }
    function makeMap(str) {
        var obj = {}, items = str.split(','), i;
        for (i = 0; i < items.length; i++)
            obj[items[i]] = true;
        return obj;
    }
    if (msie < 9) {
        nodeName_ = function (element) {
            element = element.nodeName ? element : element[0];
            return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
        };
    } else {
        nodeName_ = function (element) {
            return element.nodeName ? element.nodeName : element[0].nodeName;
        };
    }
    function map(obj, iterator, context) {
        var results = [];
        forEach(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    }
    function size(obj, ownPropsOnly) {
        var count = 0, key;
        if (isArray(obj) || isString(obj)) {
            return obj.length;
        } else if (isObject(obj)) {
            for (key in obj)
                if (!ownPropsOnly || obj.hasOwnProperty(key))
                    count++;
        }
        return count;
    }
    function includes(array, obj) {
        return indexOf(array, obj) != -1;
    }
    function indexOf(array, obj) {
        if (array.indexOf)
            return array.indexOf(obj);
        for (var i = 0; i < array.length; i++) {
            if (obj === array[i])
                return i;
        }
        return -1;
    }
    function arrayRemove(array, value) {
        var index = indexOf(array, value);
        if (index >= 0)
            array.splice(index, 1);
        return value;
    }
    function isLeafNode(node) {
        if (node) {
            switch (node.nodeName) {
            case 'OPTION':
            case 'PRE':
            case 'TITLE':
                return true;
            }
        }
        return false;
    }
    function copy(source, destination, stackSource, stackDest) {
        if (isWindow(source) || isScope(source)) {
            throw ngMinErr('cpws', 'Can\'t copy! Making copies of Window or Scope instances is not supported.');
        }
        if (!destination) {
            destination = source;
            if (source) {
                if (isArray(source)) {
                    destination = copy(source, [], stackSource, stackDest);
                } else if (isDate(source)) {
                    destination = new Date(source.getTime());
                } else if (isRegExp(source)) {
                    destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                    destination.lastIndex = source.lastIndex;
                } else if (isObject(source)) {
                    destination = copy(source, {}, stackSource, stackDest);
                }
            }
        } else {
            if (source === destination)
                throw ngMinErr('cpi', 'Can\'t copy! Source and destination are identical.');
            stackSource = stackSource || [];
            stackDest = stackDest || [];
            if (isObject(source)) {
                var index = indexOf(stackSource, source);
                if (index !== -1)
                    return stackDest[index];
                stackSource.push(source);
                stackDest.push(destination);
            }
            var result;
            if (isArray(source)) {
                destination.length = 0;
                for (var i = 0; i < source.length; i++) {
                    result = copy(source[i], null, stackSource, stackDest);
                    if (isObject(source[i])) {
                        stackSource.push(source[i]);
                        stackDest.push(result);
                    }
                    destination.push(result);
                }
            } else {
                var h = destination.$$hashKey;
                if (isArray(destination)) {
                    destination.length = 0;
                } else {
                    forEach(destination, function (value, key) {
                        delete destination[key];
                    });
                }
                for (var key in source) {
                    result = copy(source[key], null, stackSource, stackDest);
                    if (isObject(source[key])) {
                        stackSource.push(source[key]);
                        stackDest.push(result);
                    }
                    destination[key] = result;
                }
                setHashKey(destination, h);
            }
        }
        return destination;
    }
    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0; i < src.length; i++) {
                dst[i] = src[i];
            }
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src) {
                if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                    dst[key] = src[key];
                }
            }
        }
        return dst || src;
    }
    function equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true;
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 == t2) {
            if (t1 == 'object') {
                if (isArray(o1)) {
                    if (!isArray(o2))
                        return false;
                    if ((length = o1.length) == o2.length) {
                        for (key = 0; key < length; key++) {
                            if (!equals(o1[key], o2[key]))
                                return false;
                        }
                        return true;
                    }
                } else if (isDate(o1)) {
                    if (!isDate(o2))
                        return false;
                    return isNaN(o1.getTime()) && isNaN(o2.getTime()) || o1.getTime() === o2.getTime();
                } else if (isRegExp(o1) && isRegExp(o2)) {
                    return o1.toString() == o2.toString();
                } else {
                    if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
                        return false;
                    keySet = {};
                    for (key in o1) {
                        if (key.charAt(0) === '$' || isFunction(o1[key]))
                            continue;
                        if (!equals(o1[key], o2[key]))
                            return false;
                        keySet[key] = true;
                    }
                    for (key in o2) {
                        if (!keySet.hasOwnProperty(key) && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
                            return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }
    var csp = function () {
        if (isDefined(csp.isActive_))
            return csp.isActive_;
        var active = !!(document.querySelector('[ng-csp]') || document.querySelector('[data-ng-csp]'));
        if (!active) {
            try {
                new Function('');
            } catch (e) {
                active = true;
            }
        }
        return csp.isActive_ = active;
    };
    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        if (isFunction(fn) && !(fn instanceof RegExp)) {
            return curryArgs.length ? function () {
                return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
            } : function () {
                return arguments.length ? fn.apply(self, arguments) : fn.call(self);
            };
        } else {
            return fn;
        }
    }
    function toJsonReplacer(key, value) {
        var val = value;
        if (typeof key === 'string' && key.charAt(0) === '$') {
            val = undefined;
        } else if (isWindow(value)) {
            val = '$WINDOW';
        } else if (value && document === value) {
            val = '$DOCUMENT';
        } else if (isScope(value)) {
            val = '$SCOPE';
        }
        return val;
    }
    function toJson(obj, pretty) {
        if (typeof obj === 'undefined')
            return undefined;
        return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
    }
    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json;
    }
    function toBoolean(value) {
        if (typeof value === 'function') {
            value = true;
        } else if (value && value.length !== 0) {
            var v = lowercase('' + value);
            value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
        } else {
            value = false;
        }
        return value;
    }
    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty();
        } catch (e) {
        }
        var TEXT_NODE = 3;
        var elemHtml = jqLite('<div>').append(element).html();
        try {
            return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
                return '<' + lowercase(nodeName);
            });
        } catch (e) {
            return lowercase(elemHtml);
        }
    }
    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
        }
    }
    function parseKeyValue(keyValue) {
        var obj = {}, key_value, key;
        forEach((keyValue || '').split('&'), function (keyValue) {
            if (keyValue) {
                key_value = keyValue.replace(/\+/g, '%20').split('=');
                key = tryDecodeURIComponent(key_value[0]);
                if (isDefined(key)) {
                    var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
                    if (!hasOwnProperty.call(obj, key)) {
                        obj[key] = val;
                    } else if (isArray(obj[key])) {
                        obj[key].push(val);
                    } else {
                        obj[key] = [
                            obj[key],
                            val
                        ];
                    }
                }
            }
        });
        return obj;
    }
    function toKeyValue(obj) {
        var parts = [];
        forEach(obj, function (value, key) {
            if (isArray(value)) {
                forEach(value, function (arrayValue) {
                    parts.push(encodeUriQuery(key, true) + (arrayValue === true ? '' : '=' + encodeUriQuery(arrayValue, true)));
                });
            } else {
                parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
            }
        });
        return parts.length ? parts.join('&') : '';
    }
    function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
    }
    function angularInit(element, bootstrap) {
        var elements = [element], appElement, module, names = [
                'ng:app',
                'ng-app',
                'x-ng-app',
                'data-ng-app'
            ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        function append(element) {
            element && elements.push(element);
        }
        forEach(names, function (name) {
            names[name] = true;
            append(document.getElementById(name));
            name = name.replace(':', '\\:');
            if (element.querySelectorAll) {
                forEach(element.querySelectorAll('.' + name), append);
                forEach(element.querySelectorAll('.' + name + '\\:'), append);
                forEach(element.querySelectorAll('[' + name + ']'), append);
            }
        });
        forEach(elements, function (element) {
            if (!appElement) {
                var className = ' ' + element.className + ' ';
                var match = NG_APP_CLASS_REGEXP.exec(className);
                if (match) {
                    appElement = element;
                    module = (match[2] || '').replace(/\s+/g, ',');
                } else {
                    forEach(element.attributes, function (attr) {
                        if (!appElement && names[attr.name]) {
                            appElement = element;
                            module = attr.value;
                        }
                    });
                }
            }
        });
        if (appElement) {
            bootstrap(appElement, module ? [module] : []);
        }
    }
    function bootstrap(element, modules) {
        var doBootstrap = function () {
            element = jqLite(element);
            if (element.injector()) {
                var tag = element[0] === document ? 'document' : startingTag(element);
                throw ngMinErr('btstrpd', 'App Already Bootstrapped with this Element \'{0}\'', tag.replace(/</, '&lt;').replace(/>/, '&gt;'));
            }
            modules = modules || [];
            modules.unshift([
                '$provide',
                function ($provide) {
                    $provide.value('$rootElement', element);
                }
            ]);
            modules.unshift('ng');
            var injector = createInjector(modules);
            injector.invoke([
                '$rootScope',
                '$rootElement',
                '$compile',
                '$injector',
                '$animate',
                function (scope, element, compile, injector, animate) {
                    scope.$apply(function () {
                        element.data('$injector', injector);
                        compile(element)(scope);
                    });
                }
            ]);
            return injector;
        };
        var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
            return doBootstrap();
        }
        window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
        angular.resumeBootstrap = function (extraModules) {
            forEach(extraModules, function (module) {
                modules.push(module);
            });
            doBootstrap();
        };
    }
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        separator = separator || '_';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }
    function bindJQuery() {
        jQuery = window.jQuery;
        if (jQuery && jQuery.fn.on) {
            jqLite = jQuery;
            extend(jQuery.fn, {
                scope: JQLitePrototype.scope,
                isolateScope: JQLitePrototype.isolateScope,
                controller: JQLitePrototype.controller,
                injector: JQLitePrototype.injector,
                inheritedData: JQLitePrototype.inheritedData
            });
            jqLitePatchJQueryRemove('remove', true, true, false);
            jqLitePatchJQueryRemove('empty', false, false, false);
            jqLitePatchJQueryRemove('html', false, false, true);
        } else {
            jqLite = JQLite;
        }
        angular.element = jqLite;
    }
    function assertArg(arg, name, reason) {
        if (!arg) {
            throw ngMinErr('areq', 'Argument \'{0}\' is {1}', name || '?', reason || 'required');
        }
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        if (acceptArrayAnnotation && isArray(arg)) {
            arg = arg[arg.length - 1];
        }
        assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg === 'object' ? arg.constructor.name || 'Object' : typeof arg));
        return arg;
    }
    function assertNotHasOwnProperty(name, context) {
        if (name === 'hasOwnProperty') {
            throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
        }
    }
    function getter(obj, path, bindFnToScope) {
        if (!path)
            return obj;
        var keys = path.split('.');
        var key;
        var lastInstance = obj;
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (obj) {
                obj = (lastInstance = obj)[key];
            }
        }
        if (!bindFnToScope && isFunction(obj)) {
            return bind(lastInstance, obj);
        }
        return obj;
    }
    function getBlockElements(nodes) {
        var startNode = nodes[0], endNode = nodes[nodes.length - 1];
        if (startNode === endNode) {
            return jqLite(startNode);
        }
        var element = startNode;
        var elements = [element];
        do {
            element = element.nextSibling;
            if (!element)
                break;
            elements.push(element);
        } while (element !== endNode);
        return jqLite(elements);
    }
    function setupModuleLoader(window) {
        var $injectorMinErr = minErr('$injector');
        var ngMinErr = minErr('ng');
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var angular = ensure(window, 'angular', Object);
        angular.$$minErr = angular.$$minErr || minErr;
        return ensure(angular, 'module', function () {
            var modules = {};
            return function module(name, requires, configFn) {
                var assertNotHasOwnProperty = function (name, context) {
                    if (name === 'hasOwnProperty') {
                        throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
                    }
                };
                assertNotHasOwnProperty(name, 'module');
                if (requires && modules.hasOwnProperty(name)) {
                    modules[name] = null;
                }
                return ensure(modules, name, function () {
                    if (!requires) {
                        throw $injectorMinErr('nomod', 'Module \'{0}\' is not available! You either misspelled ' + 'the module name or forgot to load it. If registering a module ensure that you ' + 'specify the dependencies as the second argument.', name);
                    }
                    var invokeQueue = [];
                    var runBlocks = [];
                    var config = invokeLater('$injector', 'invoke');
                    var moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLater('$provide', 'provider'),
                        factory: invokeLater('$provide', 'factory'),
                        service: invokeLater('$provide', 'service'),
                        value: invokeLater('$provide', 'value'),
                        constant: invokeLater('$provide', 'constant', 'unshift'),
                        animation: invokeLater('$animateProvider', 'register'),
                        filter: invokeLater('$filterProvider', 'register'),
                        controller: invokeLater('$controllerProvider', 'register'),
                        directive: invokeLater('$compileProvider', 'directive'),
                        config: config,
                        run: function (block) {
                            runBlocks.push(block);
                            return this;
                        }
                    };
                    if (configFn) {
                        config(configFn);
                    }
                    return moduleInstance;
                    function invokeLater(provider, method, insertMethod) {
                        return function () {
                            invokeQueue[insertMethod || 'push']([
                                provider,
                                method,
                                arguments
                            ]);
                            return moduleInstance;
                        };
                    }
                });
            };
        });
    }
    var version = {
        full: '1.2.32',
        major: 1,
        minor: 2,
        dot: 32,
        codeName: 'alternation-intention'
    };
    function publishExternalAPI(angular) {
        extend(angular, {
            'bootstrap': bootstrap,
            'copy': copy,
            'extend': extend,
            'equals': equals,
            'element': jqLite,
            'forEach': forEach,
            'injector': createInjector,
            'noop': noop,
            'bind': bind,
            'toJson': toJson,
            'fromJson': fromJson,
            'identity': identity,
            'isUndefined': isUndefined,
            'isDefined': isDefined,
            'isString': isString,
            'isFunction': isFunction,
            'isObject': isObject,
            'isNumber': isNumber,
            'isElement': isElement,
            'isArray': isArray,
            'version': version,
            'isDate': isDate,
            'lowercase': lowercase,
            'uppercase': uppercase,
            'callbacks': { counter: 0 },
            '$$minErr': minErr,
            '$$csp': csp
        });
        angularModule = setupModuleLoader(window);
        try {
            angularModule('ngLocale');
        } catch (e) {
            angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
        }
        angularModule('ng', ['ngLocale'], [
            '$provide',
            function ngModule($provide) {
                $provide.provider({ $$sanitizeUri: $$SanitizeUriProvider });
                $provide.provider('$compile', $CompileProvider).directive({
                    a: htmlAnchorDirective,
                    input: inputDirective,
                    textarea: inputDirective,
                    form: formDirective,
                    script: scriptDirective,
                    select: selectDirective,
                    style: styleDirective,
                    option: optionDirective,
                    ngBind: ngBindDirective,
                    ngBindHtml: ngBindHtmlDirective,
                    ngBindTemplate: ngBindTemplateDirective,
                    ngClass: ngClassDirective,
                    ngClassEven: ngClassEvenDirective,
                    ngClassOdd: ngClassOddDirective,
                    ngCloak: ngCloakDirective,
                    ngController: ngControllerDirective,
                    ngForm: ngFormDirective,
                    ngHide: ngHideDirective,
                    ngIf: ngIfDirective,
                    ngInclude: ngIncludeDirective,
                    ngInit: ngInitDirective,
                    ngNonBindable: ngNonBindableDirective,
                    ngPluralize: ngPluralizeDirective,
                    ngRepeat: ngRepeatDirective,
                    ngShow: ngShowDirective,
                    ngStyle: ngStyleDirective,
                    ngSwitch: ngSwitchDirective,
                    ngSwitchWhen: ngSwitchWhenDirective,
                    ngSwitchDefault: ngSwitchDefaultDirective,
                    ngOptions: ngOptionsDirective,
                    ngTransclude: ngTranscludeDirective,
                    ngModel: ngModelDirective,
                    ngList: ngListDirective,
                    ngChange: ngChangeDirective,
                    required: requiredDirective,
                    ngRequired: requiredDirective,
                    ngValue: ngValueDirective
                }).directive({ ngInclude: ngIncludeFillContentDirective }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
                $provide.provider({
                    $anchorScroll: $AnchorScrollProvider,
                    $animate: $AnimateProvider,
                    $browser: $BrowserProvider,
                    $cacheFactory: $CacheFactoryProvider,
                    $controller: $ControllerProvider,
                    $document: $DocumentProvider,
                    $exceptionHandler: $ExceptionHandlerProvider,
                    $filter: $FilterProvider,
                    $interpolate: $InterpolateProvider,
                    $interval: $IntervalProvider,
                    $http: $HttpProvider,
                    $httpBackend: $HttpBackendProvider,
                    $location: $LocationProvider,
                    $log: $LogProvider,
                    $parse: $ParseProvider,
                    $rootScope: $RootScopeProvider,
                    $q: $QProvider,
                    $sce: $SceProvider,
                    $sceDelegate: $SceDelegateProvider,
                    $sniffer: $SnifferProvider,
                    $templateCache: $TemplateCacheProvider,
                    $timeout: $TimeoutProvider,
                    $window: $WindowProvider,
                    $$rAF: $$RAFProvider,
                    $$asyncCallback: $$AsyncCallbackProvider
                });
            }
        ]);
    }
    JQLite.expando = 'ng339';
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
            element.addEventListener(type, fn, false);
        } : function (element, type, fn) {
            element.attachEvent('on' + type, fn);
        }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
            element.removeEventListener(type, fn, false);
        } : function (element, type, fn) {
            element.detachEvent('on' + type, fn);
        };
    var jqData = JQLite._data = function (node) {
        return this.cache[node[this.expando]] || {};
    };
    function jqNextId() {
        return ++jqId;
    }
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var jqLiteMinErr = minErr('jqLite');
    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function jqLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
        var originalJqFn = jQuery.fn[name];
        originalJqFn = originalJqFn.$original || originalJqFn;
        removePatch.$original = originalJqFn;
        jQuery.fn[name] = removePatch;
        function removePatch(param) {
            var list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children;
            if (!getterIfNoArguments || param != null) {
                while (list.length) {
                    set = list.shift();
                    for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
                        element = jqLite(set[setIndex]);
                        if (fireEvent) {
                            element.triggerHandler('$destroy');
                        } else {
                            fireEvent = !fireEvent;
                        }
                        for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
                            list.push(jQuery(children[childIndex]));
                        }
                    }
                }
            }
            return originalJqFn.apply(this, arguments);
        }
    }
    var SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var HTML_REGEXP = /<|&#?\w+;/;
    var TAG_NAME_REGEXP = /<([\w:]+)/;
    var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    var wrapMap = {
        'option': [
            1,
            '<select multiple="multiple">',
            '</select>'
        ],
        'thead': [
            1,
            '<table>',
            '</table>'
        ],
        'col': [
            2,
            '<table><colgroup>',
            '</colgroup></table>'
        ],
        'tr': [
            2,
            '<table><tbody>',
            '</tbody></table>'
        ],
        'td': [
            3,
            '<table><tbody><tr>',
            '</tr></tbody></table>'
        ],
        '_default': [
            0,
            '',
            ''
        ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html);
    }
    function jqLiteBuildFragment(html, context) {
        var elem, tmp, tag, wrap, fragment = context.createDocumentFragment(), nodes = [], i, j, jj;
        if (jqLiteIsTextNode(html)) {
            nodes.push(context.createTextNode(html));
        } else {
            tmp = fragment.appendChild(context.createElement('div'));
            tag = (TAG_NAME_REGEXP.exec(html) || [
                '',
                ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = '<div>&#160;</div>' + wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];
            tmp.removeChild(tmp.firstChild);
            i = wrap[0];
            while (i--) {
                tmp = tmp.lastChild;
            }
            for (j = 0, jj = tmp.childNodes.length; j < jj; ++j)
                nodes.push(tmp.childNodes[j]);
            tmp = fragment.firstChild;
            tmp.textContent = '';
        }
        fragment.textContent = '';
        fragment.innerHTML = '';
        return nodes;
    }
    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        if (parsed = SINGLE_TAG_REGEXP.exec(html)) {
            return [context.createElement(parsed[1])];
        }
        return jqLiteBuildFragment(html, context);
    }
    function JQLite(element) {
        if (element instanceof JQLite) {
            return element;
        }
        if (isString(element)) {
            element = trim(element);
        }
        if (!(this instanceof JQLite)) {
            if (isString(element) && element.charAt(0) != '<') {
                throw jqLiteMinErr('nosel', 'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element');
            }
            return new JQLite(element);
        }
        if (isString(element)) {
            jqLiteAddNodes(this, jqLiteParseHTML(element));
            var fragment = jqLite(document.createDocumentFragment());
            fragment.append(this);
        } else {
            jqLiteAddNodes(this, element);
        }
    }
    function jqLiteClone(element) {
        return element.cloneNode(true);
    }
    function jqLiteDealoc(element) {
        jqLiteRemoveData(element);
        for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
            jqLiteDealoc(children[i]);
        }
    }
    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported))
            throw jqLiteMinErr('offargs', 'jqLite#off() does not support the `selector` argument');
        var events = jqLiteExpandoStore(element, 'events'), handle = jqLiteExpandoStore(element, 'handle');
        if (!handle)
            return;
        if (isUndefined(type)) {
            forEach(events, function (eventHandler, type) {
                removeEventListenerFn(element, type, eventHandler);
                delete events[type];
            });
        } else {
            forEach(type.split(' '), function (type) {
                if (isUndefined(fn)) {
                    removeEventListenerFn(element, type, events[type]);
                    delete events[type];
                } else {
                    arrayRemove(events[type] || [], fn);
                }
            });
        }
    }
    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339, expandoStore = jqCache[expandoId];
        if (expandoStore) {
            if (name) {
                delete jqCache[expandoId].data[name];
                return;
            }
            if (expandoStore.handle) {
                expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
                jqLiteOff(element);
            }
            delete jqCache[expandoId];
            element.ng339 = undefined;
        }
    }
    function jqLiteExpandoStore(element, key, value) {
        var expandoId = element.ng339, expandoStore = jqCache[expandoId || -1];
        if (isDefined(value)) {
            if (!expandoStore) {
                element.ng339 = expandoId = jqNextId();
                expandoStore = jqCache[expandoId] = {};
            }
            expandoStore[key] = value;
        } else {
            return expandoStore && expandoStore[key];
        }
    }
    function jqLiteData(element, key, value) {
        var data = jqLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
        if (!data && !isSimpleGetter) {
            jqLiteExpandoStore(element, 'data', data = {});
        }
        if (isSetter) {
            data[key] = value;
        } else {
            if (keyDefined) {
                if (isSimpleGetter) {
                    return data && data[key];
                } else {
                    extend(data, key);
                }
            } else {
                return data;
            }
        }
    }
    function jqLiteHasClass(element, selector) {
        if (!element.getAttribute)
            return false;
        return (' ' + (element.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
    }
    function jqLiteRemoveClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            forEach(cssClasses.split(' '), function (cssClass) {
                element.setAttribute('class', trim((' ' + (element.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' ')));
            });
        }
    }
    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (' ' + (element.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ');
            forEach(cssClasses.split(' '), function (cssClass) {
                cssClass = trim(cssClass);
                if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
                    existingClasses += cssClass + ' ';
                }
            });
            element.setAttribute('class', trim(existingClasses));
        }
    }
    function jqLiteAddNodes(root, elements) {
        if (elements) {
            elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
            for (var i = 0; i < elements.length; i++) {
                root.push(elements[i]);
            }
        }
    }
    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
    }
    function jqLiteInheritedData(element, name, value) {
        if (element.nodeType == 9) {
            element = element.documentElement;
        }
        var names = isArray(name) ? name : [name];
        while (element) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                if ((value = jqLite.data(element, names[i])) !== undefined)
                    return value;
            }
            element = element.parentNode || element.nodeType === 11 && element.host;
        }
    }
    function jqLiteEmpty(element) {
        for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
            jqLiteDealoc(childNodes[i]);
        }
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    var JQLitePrototype = JQLite.prototype = {
        ready: function (fn) {
            var fired = false;
            function trigger() {
                if (fired)
                    return;
                fired = true;
                fn();
            }
            if (document.readyState === 'complete') {
                setTimeout(trigger);
            } else {
                this.on('DOMContentLoaded', trigger);
                JQLite(window).on('load', trigger);
            }
        },
        toString: function () {
            var value = [];
            forEach(this, function (e) {
                value.push('' + e);
            });
            return '[' + value.join(', ') + ']';
        },
        eq: function (index) {
            return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
    };
    var BOOLEAN_ATTR = {};
    forEach('multiple,selected,checked,disabled,readOnly,required,open'.split(','), function (value) {
        BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach('input,select,option,textarea,button,form,details'.split(','), function (value) {
        BOOLEAN_ELEMENTS[uppercase(value)] = true;
    });
    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
    }
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData
    }, function (fn, name) {
        JQLite[name] = fn;
    });
    forEach({
        data: jqLiteData,
        inheritedData: jqLiteInheritedData,
        scope: function (element) {
            return jqLite.data(element, '$scope') || jqLiteInheritedData(element.parentNode || element, [
                '$isolateScope',
                '$scope'
            ]);
        },
        isolateScope: function (element) {
            return jqLite.data(element, '$isolateScope') || jqLite.data(element, '$isolateScopeNoTemplate');
        },
        controller: jqLiteController,
        injector: function (element) {
            return jqLiteInheritedData(element, '$injector');
        },
        removeAttr: function (element, name) {
            element.removeAttribute(name);
        },
        hasClass: jqLiteHasClass,
        css: function (element, name, value) {
            name = camelCase(name);
            if (isDefined(value)) {
                element.style[name] = value;
            } else {
                var val;
                if (msie <= 8) {
                    val = element.currentStyle && element.currentStyle[name];
                    if (val === '')
                        val = 'auto';
                }
                val = val || element.style[name];
                if (msie <= 8) {
                    val = val === '' ? undefined : val;
                }
                return val;
            }
        },
        attr: function (element, name, value) {
            var lowercasedName = lowercase(name);
            if (BOOLEAN_ATTR[lowercasedName]) {
                if (isDefined(value)) {
                    if (!!value) {
                        element[name] = true;
                        element.setAttribute(name, lowercasedName);
                    } else {
                        element[name] = false;
                        element.removeAttribute(lowercasedName);
                    }
                } else {
                    return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                }
            } else if (isDefined(value)) {
                element.setAttribute(name, value);
            } else if (element.getAttribute) {
                var ret = element.getAttribute(name, 2);
                return ret === null ? undefined : ret;
            }
        },
        prop: function (element, name, value) {
            if (isDefined(value)) {
                element[name] = value;
            } else {
                return element[name];
            }
        },
        text: function () {
            var NODE_TYPE_TEXT_PROPERTY = [];
            if (msie < 9) {
                NODE_TYPE_TEXT_PROPERTY[1] = 'innerText';
                NODE_TYPE_TEXT_PROPERTY[3] = 'nodeValue';
            } else {
                NODE_TYPE_TEXT_PROPERTY[1] = NODE_TYPE_TEXT_PROPERTY[3] = 'textContent';
            }
            getText.$dv = '';
            return getText;
            function getText(element, value) {
                var textProp = NODE_TYPE_TEXT_PROPERTY[element.nodeType];
                if (isUndefined(value)) {
                    return textProp ? element[textProp] : '';
                }
                element[textProp] = value;
            }
        }(),
        val: function (element, value) {
            if (isUndefined(value)) {
                if (nodeName_(element) === 'SELECT' && element.multiple) {
                    var result = [];
                    forEach(element.options, function (option) {
                        if (option.selected) {
                            result.push(option.value || option.text);
                        }
                    });
                    return result.length === 0 ? null : result;
                }
                return element.value;
            }
            element.value = value;
        },
        html: function (element, value) {
            if (isUndefined(value)) {
                return element.innerHTML;
            }
            for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
                jqLiteDealoc(childNodes[i]);
            }
            element.innerHTML = value;
        },
        empty: jqLiteEmpty
    }, function (fn, name) {
        JQLite.prototype[name] = function (arg1, arg2) {
            var i, key;
            var nodeCount = this.length;
            if (fn !== jqLiteEmpty && (fn.length == 2 && (fn !== jqLiteHasClass && fn !== jqLiteController) ? arg1 : arg2) === undefined) {
                if (isObject(arg1)) {
                    for (i = 0; i < nodeCount; i++) {
                        if (fn === jqLiteData) {
                            fn(this[i], arg1);
                        } else {
                            for (key in arg1) {
                                fn(this[i], key, arg1[key]);
                            }
                        }
                    }
                    return this;
                } else {
                    var value = fn.$dv;
                    var jj = value === undefined ? Math.min(nodeCount, 1) : nodeCount;
                    for (var j = 0; j < jj; j++) {
                        var nodeValue = fn(this[j], arg1, arg2);
                        value = value ? value + nodeValue : nodeValue;
                    }
                    return value;
                }
            } else {
                for (i = 0; i < nodeCount; i++) {
                    fn(this[i], arg1, arg2);
                }
                return this;
            }
        };
    });
    function createEventHandler(element, events) {
        var eventHandler = function (event, type) {
            if (!event.preventDefault) {
                event.preventDefault = function () {
                    event.returnValue = false;
                };
            }
            if (!event.stopPropagation) {
                event.stopPropagation = function () {
                    event.cancelBubble = true;
                };
            }
            if (!event.target) {
                event.target = event.srcElement || document;
            }
            if (isUndefined(event.defaultPrevented)) {
                var prevent = event.preventDefault;
                event.preventDefault = function () {
                    event.defaultPrevented = true;
                    prevent.call(event);
                };
                event.defaultPrevented = false;
            }
            event.isDefaultPrevented = function () {
                return event.defaultPrevented || event.returnValue === false;
            };
            var eventHandlersCopy = shallowCopy(events[type || event.type] || []);
            forEach(eventHandlersCopy, function (fn) {
                fn.call(element, event);
            });
            if (msie <= 8) {
                event.preventDefault = null;
                event.stopPropagation = null;
                event.isDefaultPrevented = null;
            } else {
                delete event.preventDefault;
                delete event.stopPropagation;
                delete event.isDefaultPrevented;
            }
        };
        eventHandler.elem = element;
        return eventHandler;
    }
    forEach({
        removeData: jqLiteRemoveData,
        dealoc: jqLiteDealoc,
        on: function onFn(element, type, fn, unsupported) {
            if (isDefined(unsupported))
                throw jqLiteMinErr('onargs', 'jqLite#on() does not support the `selector` or `eventData` parameters');
            var events = jqLiteExpandoStore(element, 'events'), handle = jqLiteExpandoStore(element, 'handle');
            if (!events)
                jqLiteExpandoStore(element, 'events', events = {});
            if (!handle)
                jqLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
            forEach(type.split(' '), function (type) {
                var eventFns = events[type];
                if (!eventFns) {
                    if (type == 'mouseenter' || type == 'mouseleave') {
                        var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                            var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                            return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                        } : function (a, b) {
                            if (b) {
                                while (b = b.parentNode) {
                                    if (b === a) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                        events[type] = [];
                        var eventmap = {
                            mouseleave: 'mouseout',
                            mouseenter: 'mouseover'
                        };
                        onFn(element, eventmap[type], function (event) {
                            var target = this, related = event.relatedTarget;
                            if (!related || related !== target && !contains(target, related)) {
                                handle(event, type);
                            }
                        });
                    } else {
                        addEventListenerFn(element, type, handle);
                        events[type] = [];
                    }
                    eventFns = events[type];
                }
                eventFns.push(fn);
            });
        },
        off: jqLiteOff,
        one: function (element, type, fn) {
            element = jqLite(element);
            element.on(type, function onFn() {
                element.off(type, fn);
                element.off(type, onFn);
            });
            element.on(type, fn);
        },
        replaceWith: function (element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element);
            forEach(new JQLite(replaceNode), function (node) {
                if (index) {
                    parent.insertBefore(node, index.nextSibling);
                } else {
                    parent.replaceChild(node, element);
                }
                index = node;
            });
        },
        children: function (element) {
            var children = [];
            forEach(element.childNodes, function (element) {
                if (element.nodeType === 1)
                    children.push(element);
            });
            return children;
        },
        contents: function (element) {
            return element.contentDocument || element.childNodes || [];
        },
        append: function (element, node) {
            forEach(new JQLite(node), function (child) {
                if (element.nodeType === 1 || element.nodeType === 11) {
                    element.appendChild(child);
                }
            });
        },
        prepend: function (element, node) {
            if (element.nodeType === 1) {
                var index = element.firstChild;
                forEach(new JQLite(node), function (child) {
                    element.insertBefore(child, index);
                });
            }
        },
        wrap: function (element, wrapNode) {
            wrapNode = jqLite(wrapNode)[0];
            var parent = element.parentNode;
            if (parent) {
                parent.replaceChild(wrapNode, element);
            }
            wrapNode.appendChild(element);
        },
        remove: function (element) {
            jqLiteDealoc(element);
            var parent = element.parentNode;
            if (parent)
                parent.removeChild(element);
        },
        after: function (element, newElement) {
            var index = element, parent = element.parentNode;
            forEach(new JQLite(newElement), function (node) {
                parent.insertBefore(node, index.nextSibling);
                index = node;
            });
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function (element, selector, condition) {
            if (selector) {
                forEach(selector.split(' '), function (className) {
                    var classCondition = condition;
                    if (isUndefined(classCondition)) {
                        classCondition = !jqLiteHasClass(element, className);
                    }
                    (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
                });
            }
        },
        parent: function (element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        next: function (element) {
            if (element.nextElementSibling) {
                return element.nextElementSibling;
            }
            var elm = element.nextSibling;
            while (elm != null && elm.nodeType !== 1) {
                elm = elm.nextSibling;
            }
            return elm;
        },
        find: function (element, selector) {
            if (element.getElementsByTagName) {
                return element.getElementsByTagName(selector);
            } else {
                return [];
            }
        },
        clone: jqLiteClone,
        triggerHandler: function (element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs;
            var eventName = event.type || event;
            var eventFns = (jqLiteExpandoStore(element, 'events') || {})[eventName];
            if (eventFns) {
                dummyEvent = {
                    preventDefault: function () {
                        this.defaultPrevented = true;
                    },
                    isDefaultPrevented: function () {
                        return this.defaultPrevented === true;
                    },
                    stopPropagation: noop,
                    type: eventName,
                    target: element
                };
                if (event.type) {
                    dummyEvent = extend(dummyEvent, event);
                }
                eventFnsCopy = shallowCopy(eventFns);
                handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent];
                forEach(eventFnsCopy, function (fn) {
                    fn.apply(element, handlerArgs);
                });
            }
        }
    }, function (fn, name) {
        JQLite.prototype[name] = function (arg1, arg2, arg3) {
            var value;
            for (var i = 0; i < this.length; i++) {
                if (isUndefined(value)) {
                    value = fn(this[i], arg1, arg2, arg3);
                    if (isDefined(value)) {
                        value = jqLite(value);
                    }
                } else {
                    jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
                }
            }
            return isDefined(value) ? value : this;
        };
        JQLite.prototype.bind = JQLite.prototype.on;
        JQLite.prototype.unbind = JQLite.prototype.off;
    });
    function hashKey(obj, nextUidFn) {
        var objType = typeof obj, key;
        if (objType == 'function' || objType == 'object' && obj !== null) {
            if (typeof (key = obj.$$hashKey) == 'function') {
                key = obj.$$hashKey();
            } else if (key === undefined) {
                key = obj.$$hashKey = (nextUidFn || nextUid)();
            }
        } else {
            key = obj;
        }
        return objType + ':' + key;
    }
    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function () {
                return ++uid;
            };
        }
        forEach(array, this.put, this);
    }
    HashMap.prototype = {
        put: function (key, value) {
            this[hashKey(key, this.nextUid)] = value;
        },
        get: function (key) {
            return this[hashKey(key, this.nextUid)];
        },
        remove: function (key) {
            var value = this[key = hashKey(key, this.nextUid)];
            delete this[key];
            return value;
        }
    };
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var $injectorMinErr = minErr('$injector');
    function annotate(fn) {
        var $inject, fnText, argDecl, last;
        if (typeof fn === 'function') {
            if (!($inject = fn.$inject)) {
                $inject = [];
                if (fn.length) {
                    fnText = fn.toString().replace(STRIP_COMMENTS, '');
                    argDecl = fnText.match(FN_ARGS);
                    forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
                        arg.replace(FN_ARG, function (all, underscore, name) {
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else if (isArray(fn)) {
            last = fn.length - 1;
            assertArgFn(fn[last], 'fn');
            $inject = fn.slice(0, last);
        } else {
            assertArgFn(fn, 'fn', true);
        }
        return $inject;
    }
    function createInjector(modulesToLoad) {
        var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap([], true), providerCache = {
                $provide: {
                    provider: supportObject(provider),
                    factory: supportObject(factory),
                    service: supportObject(service),
                    value: supportObject(value),
                    constant: supportObject(constant),
                    decorator: decorator
                }
            }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function () {
                throw $injectorMinErr('unpr', 'Unknown provider: {0}', path.join(' <- '));
            }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
                var provider = providerInjector.get(servicename + providerSuffix);
                return instanceInjector.invoke(provider.$get, provider);
            });
        forEach(loadModules(modulesToLoad), function (fn) {
            instanceInjector.invoke(fn || noop);
        });
        return instanceInjector;
        function supportObject(delegate) {
            return function (key, value) {
                if (isObject(key)) {
                    forEach(key, reverseParams(delegate));
                } else {
                    return delegate(key, value);
                }
            };
        }
        function provider(name, provider_) {
            assertNotHasOwnProperty(name, 'service');
            if (isFunction(provider_) || isArray(provider_)) {
                provider_ = providerInjector.instantiate(provider_);
            }
            if (!provider_.$get) {
                throw $injectorMinErr('pget', 'Provider \'{0}\' must define $get factory method.', name);
            }
            return providerCache[name + providerSuffix] = provider_;
        }
        function factory(name, factoryFn) {
            return provider(name, { $get: factoryFn });
        }
        function service(name, constructor) {
            return factory(name, [
                '$injector',
                function ($injector) {
                    return $injector.instantiate(constructor);
                }
            ]);
        }
        function value(name, val) {
            return factory(name, valueFn(val));
        }
        function constant(name, value) {
            assertNotHasOwnProperty(name, 'constant');
            providerCache[name] = value;
            instanceCache[name] = value;
        }
        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function () {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
            };
        }
        function loadModules(modulesToLoad) {
            var runBlocks = [], moduleFn, invokeQueue, i, ii;
            forEach(modulesToLoad, function (module) {
                if (loadedModules.get(module))
                    return;
                loadedModules.put(module, true);
                try {
                    if (isString(module)) {
                        moduleFn = angularModule(module);
                        runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                        for (invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
                            var invokeArgs = invokeQueue[i], provider = providerInjector.get(invokeArgs[0]);
                            provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                        }
                    } else if (isFunction(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else if (isArray(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else {
                        assertArgFn(module, 'module');
                    }
                } catch (e) {
                    if (isArray(module)) {
                        module = module[module.length - 1];
                    }
                    if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                        e = e.message + '\n' + e.stack;
                    }
                    throw $injectorMinErr('modulerr', 'Failed to instantiate module {0} due to:\n{1}', module, e.stack || e.message || e);
                }
            });
            return runBlocks;
        }
        function createInternalInjector(cache, factory) {
            function getService(serviceName) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) {
                        throw $injectorMinErr('cdep', 'Circular dependency found: {0}', serviceName + ' <- ' + path.join(' <- '));
                    }
                    return cache[serviceName];
                } else {
                    try {
                        path.unshift(serviceName);
                        cache[serviceName] = INSTANTIATING;
                        return cache[serviceName] = factory(serviceName);
                    } catch (err) {
                        if (cache[serviceName] === INSTANTIATING) {
                            delete cache[serviceName];
                        }
                        throw err;
                    } finally {
                        path.shift();
                    }
                }
            }
            function invoke(fn, self, locals) {
                var args = [], $inject = annotate(fn), length, i, key;
                for (i = 0, length = $inject.length; i < length; i++) {
                    key = $inject[i];
                    if (typeof key !== 'string') {
                        throw $injectorMinErr('itkn', 'Incorrect injection token! Expected service name as string, got {0}', key);
                    }
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
                }
                if (isArray(fn)) {
                    fn = fn[length];
                }
                return fn.apply(self, args);
            }
            function instantiate(Type, locals) {
                var Constructor = function () {
                    }, instance, returnedValue;
                Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
                instance = new Constructor();
                returnedValue = invoke(Type, instance, locals);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: annotate,
                has: function (name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
    }
    function $AnchorScrollProvider() {
        var autoScrollingEnabled = true;
        this.disableAutoScrolling = function () {
            autoScrollingEnabled = false;
        };
        this.$get = [
            '$window',
            '$location',
            '$rootScope',
            function ($window, $location, $rootScope) {
                var document = $window.document;
                function getFirstAnchor(list) {
                    var result = null;
                    forEach(list, function (element) {
                        if (!result && lowercase(element.nodeName) === 'a')
                            result = element;
                    });
                    return result;
                }
                function scroll() {
                    var hash = $location.hash(), elm;
                    if (!hash)
                        $window.scrollTo(0, 0);
                    else if (elm = document.getElementById(hash))
                        elm.scrollIntoView();
                    else if (elm = getFirstAnchor(document.getElementsByName(hash)))
                        elm.scrollIntoView();
                    else if (hash === 'top')
                        $window.scrollTo(0, 0);
                }
                if (autoScrollingEnabled) {
                    $rootScope.$watch(function autoScrollWatch() {
                        return $location.hash();
                    }, function autoScrollWatchAction() {
                        $rootScope.$evalAsync(scroll);
                    });
                }
                return scroll;
            }
        ];
    }
    var $animateMinErr = minErr('$animate');
    var $AnimateProvider = [
        '$provide',
        function ($provide) {
            this.$$selectors = {};
            this.register = function (name, factory) {
                var key = name + '-animation';
                if (name && name.charAt(0) != '.')
                    throw $animateMinErr('notcsel', 'Expecting class selector starting with \'.\' got \'{0}\'.', name);
                this.$$selectors[name.substr(1)] = key;
                $provide.factory(key, factory);
            };
            this.classNameFilter = function (expression) {
                if (arguments.length === 1) {
                    this.$$classNameFilter = expression instanceof RegExp ? expression : null;
                }
                return this.$$classNameFilter;
            };
            this.$get = [
                '$timeout',
                '$$asyncCallback',
                function ($timeout, $$asyncCallback) {
                    function async(fn) {
                        fn && $$asyncCallback(fn);
                    }
                    return {
                        enter: function (element, parent, after, done) {
                            if (after) {
                                after.after(element);
                            } else {
                                if (!parent || !parent[0]) {
                                    parent = after.parent();
                                }
                                parent.append(element);
                            }
                            async(done);
                        },
                        leave: function (element, done) {
                            element.remove();
                            async(done);
                        },
                        move: function (element, parent, after, done) {
                            this.enter(element, parent, after, done);
                        },
                        addClass: function (element, className, done) {
                            className = isString(className) ? className : isArray(className) ? className.join(' ') : '';
                            forEach(element, function (element) {
                                jqLiteAddClass(element, className);
                            });
                            async(done);
                        },
                        removeClass: function (element, className, done) {
                            className = isString(className) ? className : isArray(className) ? className.join(' ') : '';
                            forEach(element, function (element) {
                                jqLiteRemoveClass(element, className);
                            });
                            async(done);
                        },
                        setClass: function (element, add, remove, done) {
                            forEach(element, function (element) {
                                jqLiteAddClass(element, add);
                                jqLiteRemoveClass(element, remove);
                            });
                            async(done);
                        },
                        enabled: noop
                    };
                }
            ];
        }
    ];
    function $$AsyncCallbackProvider() {
        this.$get = [
            '$$rAF',
            '$timeout',
            function ($$rAF, $timeout) {
                return $$rAF.supported ? function (fn) {
                    return $$rAF(fn);
                } : function (fn) {
                    return $timeout(fn, 0, false);
                };
            }
        ];
    }
    function Browser(window, document, $log, $sniffer) {
        var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = false;
        var outstandingRequestCount = 0;
        var outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest;
        self.$$incOutstandingRequestCount = function () {
            outstandingRequestCount++;
        };
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                outstandingRequestCount--;
                if (outstandingRequestCount === 0) {
                    while (outstandingRequestCallbacks.length) {
                        try {
                            outstandingRequestCallbacks.pop()();
                        } catch (e) {
                            $log.error(e);
                        }
                    }
                }
            }
        }
        function getHash(url) {
            var index = url.indexOf('#');
            return index === -1 ? '' : url.substr(index + 1);
        }
        self.notifyWhenNoOutstandingRequests = function (callback) {
            forEach(pollFns, function (pollFn) {
                pollFn();
            });
            if (outstandingRequestCount === 0) {
                callback();
            } else {
                outstandingRequestCallbacks.push(callback);
            }
        };
        var pollFns = [], pollTimeout;
        self.addPollFn = function (fn) {
            if (isUndefined(pollTimeout))
                startPoller(100, setTimeout);
            pollFns.push(fn);
            return fn;
        };
        function startPoller(interval, setTimeout) {
            (function check() {
                forEach(pollFns, function (pollFn) {
                    pollFn();
                });
                pollTimeout = setTimeout(check, interval);
            }());
        }
        var lastBrowserUrl = location.href, baseElement = document.find('base'), reloadLocation = null;
        self.url = function (url, replace) {
            if (location !== window.location)
                location = window.location;
            if (history !== window.history)
                history = window.history;
            if (url) {
                if (lastBrowserUrl == url)
                    return;
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                lastBrowserUrl = url;
                if (!sameBase && $sniffer.history) {
                    if (replace)
                        history.replaceState(null, '', url);
                    else {
                        history.pushState(null, '', url);
                        baseElement.attr('href', baseElement.attr('href'));
                    }
                } else {
                    if (!sameBase) {
                        reloadLocation = url;
                    }
                    if (replace) {
                        location.replace(url);
                    } else if (!sameBase) {
                        location.href = url;
                    } else {
                        location.hash = getHash(url);
                    }
                }
                return self;
            } else {
                return reloadLocation || location.href.replace(/%27/g, '\'');
            }
        };
        var urlChangeListeners = [], urlChangeInit = false;
        function fireUrlChange() {
            if (lastBrowserUrl == self.url())
                return;
            lastBrowserUrl = self.url();
            forEach(urlChangeListeners, function (listener) {
                listener(self.url());
            });
        }
        self.onUrlChange = function (callback) {
            if (!urlChangeInit) {
                if ($sniffer.history)
                    jqLite(window).on('popstate', fireUrlChange);
                if ($sniffer.hashchange)
                    jqLite(window).on('hashchange', fireUrlChange);
                else
                    self.addPollFn(fireUrlChange);
                urlChangeInit = true;
            }
            urlChangeListeners.push(callback);
            return callback;
        };
        self.$$checkUrlChange = fireUrlChange;
        self.baseHref = function () {
            var href = baseElement.attr('href');
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
        };
        var lastCookies = {};
        var lastCookieString = '';
        var cookiePath = self.baseHref();
        self.cookies = function (name, value) {
            var cookieLength, cookieArray, cookie, i, index;
            if (name) {
                if (value === undefined) {
                    rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
                } else {
                    if (isString(value)) {
                        cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
                        if (cookieLength > 4096) {
                            $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
                        }
                    }
                }
            } else {
                if (rawDocument.cookie !== lastCookieString) {
                    lastCookieString = rawDocument.cookie;
                    cookieArray = lastCookieString.split('; ');
                    lastCookies = {};
                    for (i = 0; i < cookieArray.length; i++) {
                        cookie = cookieArray[i];
                        index = cookie.indexOf('=');
                        if (index > 0) {
                            name = unescape(cookie.substring(0, index));
                            if (lastCookies[name] === undefined) {
                                lastCookies[name] = unescape(cookie.substring(index + 1));
                            }
                        }
                    }
                }
                return lastCookies;
            }
        };
        self.defer = function (fn, delay) {
            var timeoutId;
            outstandingRequestCount++;
            timeoutId = setTimeout(function () {
                delete pendingDeferIds[timeoutId];
                completeOutstandingRequest(fn);
            }, delay || 0);
            pendingDeferIds[timeoutId] = true;
            return timeoutId;
        };
        self.defer.cancel = function (deferId) {
            if (pendingDeferIds[deferId]) {
                delete pendingDeferIds[deferId];
                clearTimeout(deferId);
                completeOutstandingRequest(noop);
                return true;
            }
            return false;
        };
    }
    function $BrowserProvider() {
        this.$get = [
            '$window',
            '$log',
            '$sniffer',
            '$document',
            function ($window, $log, $sniffer, $document) {
                return new Browser($window, $document, $log, $sniffer);
            }
        ];
    }
    function $CacheFactoryProvider() {
        this.$get = function () {
            var caches = {};
            function cacheFactory(cacheId, options) {
                if (cacheId in caches) {
                    throw minErr('$cacheFactory')('iid', 'CacheId \'{0}\' is already taken!', cacheId);
                }
                var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function (key, value) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
                            refresh(lruEntry);
                        }
                        if (isUndefined(value))
                            return;
                        if (!(key in data))
                            size++;
                        data[key] = value;
                        if (size > capacity) {
                            this.remove(staleEnd.key);
                        }
                        return value;
                    },
                    get: function (key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry)
                                return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function (key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry)
                                return;
                            if (lruEntry == freshEnd)
                                freshEnd = lruEntry.p;
                            if (lruEntry == staleEnd)
                                staleEnd = lruEntry.n;
                            link(lruEntry.n, lruEntry.p);
                            delete lruHash[key];
                        }
                        delete data[key];
                        size--;
                    },
                    removeAll: function () {
                        data = {};
                        size = 0;
                        lruHash = {};
                        freshEnd = staleEnd = null;
                    },
                    destroy: function () {
                        data = null;
                        stats = null;
                        lruHash = null;
                        delete caches[cacheId];
                    },
                    info: function () {
                        return extend({}, stats, { size: size });
                    }
                };
                function refresh(entry) {
                    if (entry != freshEnd) {
                        if (!staleEnd) {
                            staleEnd = entry;
                        } else if (staleEnd == entry) {
                            staleEnd = entry.n;
                        }
                        link(entry.n, entry.p);
                        link(entry, freshEnd);
                        freshEnd = entry;
                        freshEnd.n = null;
                    }
                }
                function link(nextEntry, prevEntry) {
                    if (nextEntry != prevEntry) {
                        if (nextEntry)
                            nextEntry.p = prevEntry;
                        if (prevEntry)
                            prevEntry.n = nextEntry;
                    }
                }
            }
            cacheFactory.info = function () {
                var info = {};
                forEach(caches, function (cache, cacheId) {
                    info[cacheId] = cache.info();
                });
                return info;
            };
            cacheFactory.get = function (cacheId) {
                return caches[cacheId];
            };
            return cacheFactory;
        };
    }
    function $TemplateCacheProvider() {
        this.$get = [
            '$cacheFactory',
            function ($cacheFactory) {
                return $cacheFactory('templates');
            }
        ];
    }
    var $compileMinErr = minErr('$compile');
    $CompileProvider.$inject = [
        '$provide',
        '$$sanitizeUriProvider'
    ];
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/;
        var EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        this.directive = function registerDirective(name, directiveFactory) {
            assertNotHasOwnProperty(name, 'directive');
            if (isString(name)) {
                assertArg(directiveFactory, 'directiveFactory');
                if (!hasDirectives.hasOwnProperty(name)) {
                    hasDirectives[name] = [];
                    $provide.factory(name + Suffix, [
                        '$injector',
                        '$exceptionHandler',
                        function ($injector, $exceptionHandler) {
                            var directives = [];
                            forEach(hasDirectives[name], function (directiveFactory, index) {
                                try {
                                    var directive = $injector.invoke(directiveFactory);
                                    if (isFunction(directive)) {
                                        directive = { compile: valueFn(directive) };
                                    } else if (!directive.compile && directive.link) {
                                        directive.compile = valueFn(directive.link);
                                    }
                                    directive.priority = directive.priority || 0;
                                    directive.index = index;
                                    directive.name = directive.name || name;
                                    directive.require = directive.require || directive.controller && directive.name;
                                    directive.restrict = directive.restrict || 'A';
                                    directives.push(directive);
                                } catch (e) {
                                    $exceptionHandler(e);
                                }
                            });
                            return directives;
                        }
                    ]);
                }
                hasDirectives[name].push(directiveFactory);
            } else {
                forEach(name, reverseParams(registerDirective));
            }
            return this;
        };
        this.aHrefSanitizationWhitelist = function (regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.aHrefSanitizationWhitelist();
            }
        };
        this.imgSrcSanitizationWhitelist = function (regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
            }
        };
        this.$get = [
            '$injector',
            '$interpolate',
            '$exceptionHandler',
            '$http',
            '$templateCache',
            '$parse',
            '$controller',
            '$rootScope',
            '$document',
            '$sce',
            '$animate',
            '$$sanitizeUri',
            function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
                var Attributes = function (element, attr) {
                    this.$$element = element;
                    this.$attr = attr || {};
                };
                Attributes.prototype = {
                    $normalize: directiveNormalize,
                    $addClass: function (classVal) {
                        if (classVal && classVal.length > 0) {
                            $animate.addClass(this.$$element, classVal);
                        }
                    },
                    $removeClass: function (classVal) {
                        if (classVal && classVal.length > 0) {
                            $animate.removeClass(this.$$element, classVal);
                        }
                    },
                    $updateClass: function (newClasses, oldClasses) {
                        var toAdd = tokenDifference(newClasses, oldClasses);
                        var toRemove = tokenDifference(oldClasses, newClasses);
                        if (toAdd.length === 0) {
                            $animate.removeClass(this.$$element, toRemove);
                        } else if (toRemove.length === 0) {
                            $animate.addClass(this.$$element, toAdd);
                        } else {
                            $animate.setClass(this.$$element, toAdd, toRemove);
                        }
                    },
                    $set: function (key, value, writeAttr, attrName) {
                        var booleanKey = getBooleanAttrName(this.$$element[0], key), normalizedVal, nodeName;
                        if (booleanKey) {
                            this.$$element.prop(key, value);
                            attrName = booleanKey;
                        }
                        this[key] = value;
                        if (attrName) {
                            this.$attr[key] = attrName;
                        } else {
                            attrName = this.$attr[key];
                            if (!attrName) {
                                this.$attr[key] = attrName = snake_case(key, '-');
                            }
                        }
                        nodeName = nodeName_(this.$$element).toUpperCase();
                        if (nodeName === 'A' && (key === 'href' || key === 'xlinkHref') || nodeName === 'IMG' && key === 'src') {
                            this[key] = value = $$sanitizeUri(value, key === 'src');
                        }
                        if (writeAttr !== false) {
                            if (value === null || value === undefined) {
                                this.$$element.removeAttr(attrName);
                            } else {
                                this.$$element.attr(attrName, value);
                            }
                        }
                        var $$observers = this.$$observers;
                        $$observers && forEach($$observers[key], function (fn) {
                            try {
                                fn(value);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        });
                    },
                    $observe: function (key, fn) {
                        var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
                        listeners.push(fn);
                        $rootScope.$evalAsync(function () {
                            if (!listeners.$$inter) {
                                fn(attrs[key]);
                            }
                        });
                        return fn;
                    }
                };
                var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
                        return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
                    }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
                return compile;
                function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                    if (!($compileNodes instanceof jqLite)) {
                        $compileNodes = jqLite($compileNodes);
                    }
                    forEach($compileNodes, function (node, index) {
                        if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
                            $compileNodes[index] = node = jqLite(node).wrap('<span></span>').parent()[0];
                        }
                    });
                    var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                    safeAddClass($compileNodes, 'ng-scope');
                    return function publicLinkFn(scope, cloneConnectFn, transcludeControllers, parentBoundTranscludeFn) {
                        assertArg(scope, 'scope');
                        var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
                        forEach(transcludeControllers, function (instance, name) {
                            $linkNode.data('$' + name + 'Controller', instance);
                        });
                        for (var i = 0, ii = $linkNode.length; i < ii; i++) {
                            var node = $linkNode[i], nodeType = node.nodeType;
                            if (nodeType === 1 || nodeType === 9) {
                                $linkNode.eq(i).data('$scope', scope);
                            }
                        }
                        if (cloneConnectFn)
                            cloneConnectFn($linkNode, scope);
                        if (compositeLinkFn)
                            compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
                        return $linkNode;
                    };
                }
                function safeAddClass($element, className) {
                    try {
                        $element.addClass(className);
                    } catch (e) {
                    }
                }
                function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                    var linkFns = [], attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound;
                    for (var i = 0; i < nodeList.length; i++) {
                        attrs = new Attributes();
                        directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined, ignoreDirective);
                        nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null;
                        if (nodeLinkFn && nodeLinkFn.scope) {
                            safeAddClass(attrs.$$element, 'ng-scope');
                        }
                        childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn);
                        linkFns.push(nodeLinkFn, childLinkFn);
                        linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
                        previousCompileContext = null;
                    }
                    return linkFnFound ? compositeLinkFn : null;
                    function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                        var nodeLinkFn, childLinkFn, node, childScope, i, ii, n, childBoundTranscludeFn;
                        var nodeListLength = nodeList.length, stableNodeList = new Array(nodeListLength);
                        for (i = 0; i < nodeListLength; i++) {
                            stableNodeList[i] = nodeList[i];
                        }
                        for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
                            node = stableNodeList[n];
                            nodeLinkFn = linkFns[i++];
                            childLinkFn = linkFns[i++];
                            if (nodeLinkFn) {
                                if (nodeLinkFn.scope) {
                                    childScope = scope.$new();
                                    jqLite.data(node, '$scope', childScope);
                                } else {
                                    childScope = scope;
                                }
                                if (nodeLinkFn.transcludeOnThisElement) {
                                    childBoundTranscludeFn = createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn);
                                } else if (!nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn) {
                                    childBoundTranscludeFn = parentBoundTranscludeFn;
                                } else if (!parentBoundTranscludeFn && transcludeFn) {
                                    childBoundTranscludeFn = createBoundTranscludeFn(scope, transcludeFn);
                                } else {
                                    childBoundTranscludeFn = null;
                                }
                                nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn);
                            } else if (childLinkFn) {
                                childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
                            }
                        }
                    }
                }
                function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                    var boundTranscludeFn = function (transcludedScope, cloneFn, controllers) {
                        var scopeCreated = false;
                        if (!transcludedScope) {
                            transcludedScope = scope.$new();
                            transcludedScope.$$transcluded = true;
                            scopeCreated = true;
                        }
                        var clone = transcludeFn(transcludedScope, cloneFn, controllers, previousBoundTranscludeFn);
                        if (scopeCreated) {
                            clone.on('$destroy', function () {
                                transcludedScope.$destroy();
                            });
                        }
                        return clone;
                    };
                    return boundTranscludeFn;
                }
                function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                    var nodeType = node.nodeType, attrsMap = attrs.$attr, match, nodeName, className;
                    switch (nodeType) {
                    case 1:
                        nodeName = nodeName_(node).toLowerCase();
                        addDirective(directives, directiveNormalize(nodeName), 'E', maxPriority, ignoreDirective);
                        for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                            var attrStartName = false;
                            var attrEndName = false;
                            attr = nAttrs[j];
                            if (!msie || msie >= 8 || attr.specified) {
                                name = attr.name;
                                value = trim(attr.value);
                                ngAttrName = directiveNormalize(name);
                                if (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) {
                                    name = snake_case(ngAttrName.substr(6), '-');
                                }
                                var directiveNName = ngAttrName.replace(/(Start|End)$/, '');
                                if (ngAttrName === directiveNName + 'Start') {
                                    attrStartName = name;
                                    attrEndName = name.substr(0, name.length - 5) + 'end';
                                    name = name.substr(0, name.length - 6);
                                }
                                nName = directiveNormalize(name.toLowerCase());
                                attrsMap[nName] = name;
                                if (isNgAttr || !attrs.hasOwnProperty(nName)) {
                                    attrs[nName] = value;
                                    if (getBooleanAttrName(node, nName)) {
                                        attrs[nName] = true;
                                    }
                                }
                                addAttrInterpolateDirective(node, directives, value, nName);
                                addDirective(directives, nName, 'A', maxPriority, ignoreDirective, attrStartName, attrEndName);
                            }
                        }
                        if (nodeName === 'input' && node.getAttribute('type') === 'hidden') {
                            node.setAttribute('autocomplete', 'off');
                        }
                        className = node.className;
                        if (isString(className) && className !== '') {
                            while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                                nName = directiveNormalize(match[2]);
                                if (addDirective(directives, nName, 'C', maxPriority, ignoreDirective)) {
                                    attrs[nName] = trim(match[3]);
                                }
                                className = className.substr(match.index + match[0].length);
                            }
                        }
                        break;
                    case 3:
                        if (msie === 11) {
                            while (node.parentNode && node.nextSibling && node.nextSibling.nodeType === 3) {
                                node.nodeValue = node.nodeValue + node.nextSibling.nodeValue;
                                node.parentNode.removeChild(node.nextSibling);
                            }
                        }
                        addTextInterpolateDirective(directives, node.nodeValue);
                        break;
                    case 8:
                        try {
                            match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                            if (match) {
                                nName = directiveNormalize(match[1]);
                                if (addDirective(directives, nName, 'M', maxPriority, ignoreDirective)) {
                                    attrs[nName] = trim(match[2]);
                                }
                            }
                        } catch (e) {
                        }
                        break;
                    }
                    directives.sort(byPriority);
                    return directives;
                }
                function groupScan(node, attrStart, attrEnd) {
                    var nodes = [];
                    var depth = 0;
                    if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                        var startNode = node;
                        do {
                            if (!node) {
                                throw $compileMinErr('uterdir', 'Unterminated attribute, found \'{0}\' but no matching \'{1}\' found.', attrStart, attrEnd);
                            }
                            if (node.nodeType == 1) {
                                if (node.hasAttribute(attrStart))
                                    depth++;
                                if (node.hasAttribute(attrEnd))
                                    depth--;
                            }
                            nodes.push(node);
                            node = node.nextSibling;
                        } while (depth > 0);
                    } else {
                        nodes.push(node);
                    }
                    return jqLite(nodes);
                }
                function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                    return function (scope, element, attrs, controllers, transcludeFn) {
                        element = groupScan(element[0], attrStart, attrEnd);
                        return linkFn(scope, element, attrs, controllers, transcludeFn);
                    };
                }
                function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                    previousCompileContext = previousCompileContext || {};
                    var terminalPriority = -Number.MAX_VALUE, newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = false, hasTemplate = false, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, linkFn, directiveValue;
                    for (var i = 0, ii = directives.length; i < ii; i++) {
                        directive = directives[i];
                        var attrStart = directive.$$start;
                        var attrEnd = directive.$$end;
                        if (attrStart) {
                            $compileNode = groupScan(compileNode, attrStart, attrEnd);
                        }
                        $template = undefined;
                        if (terminalPriority > directive.priority) {
                            break;
                        }
                        if (directiveValue = directive.scope) {
                            newScopeDirective = newScopeDirective || directive;
                            if (!directive.templateUrl) {
                                assertNoDuplicate('new/isolated scope', newIsolateScopeDirective, directive, $compileNode);
                                if (isObject(directiveValue)) {
                                    newIsolateScopeDirective = directive;
                                }
                            }
                        }
                        directiveName = directive.name;
                        if (!directive.templateUrl && directive.controller) {
                            directiveValue = directive.controller;
                            controllerDirectives = controllerDirectives || {};
                            assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
                            controllerDirectives[directiveName] = directive;
                        }
                        if (directiveValue = directive.transclude) {
                            hasTranscludeDirective = true;
                            if (!directive.$$tlb) {
                                assertNoDuplicate('transclusion', nonTlbTranscludeDirective, directive, $compileNode);
                                nonTlbTranscludeDirective = directive;
                            }
                            if (directiveValue == 'element') {
                                hasElementTranscludeDirective = true;
                                terminalPriority = directive.priority;
                                $template = $compileNode;
                                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                                compileNode = $compileNode[0];
                                replaceWith(jqCollection, sliceArgs($template), compileNode);
                                childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, { nonTlbTranscludeDirective: nonTlbTranscludeDirective });
                            } else {
                                $template = jqLite(jqLiteClone(compileNode)).contents();
                                $compileNode.empty();
                                childTranscludeFn = compile($template, transcludeFn);
                            }
                        }
                        if (directive.template) {
                            hasTemplate = true;
                            assertNoDuplicate('template', templateDirective, directive, $compileNode);
                            templateDirective = directive;
                            directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template;
                            directiveValue = denormalizeTemplate(directiveValue);
                            if (directive.replace) {
                                replaceDirective = directive;
                                if (jqLiteIsTextNode(directiveValue)) {
                                    $template = [];
                                } else {
                                    $template = jqLite(trim(directiveValue));
                                }
                                compileNode = $template[0];
                                if ($template.length != 1 || compileNode.nodeType !== 1) {
                                    throw $compileMinErr('tplrt', 'Template for directive \'{0}\' must have exactly one root element. {1}', directiveName, '');
                                }
                                replaceWith(jqCollection, $compileNode, compileNode);
                                var newTemplateAttrs = { $attr: {} };
                                var templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs);
                                var unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                                if (newIsolateScopeDirective) {
                                    markDirectivesAsIsolate(templateDirectives);
                                }
                                directives = directives.concat(templateDirectives).concat(unprocessedDirectives);
                                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                                ii = directives.length;
                            } else {
                                $compileNode.html(directiveValue);
                            }
                        }
                        if (directive.templateUrl) {
                            hasTemplate = true;
                            assertNoDuplicate('template', templateDirective, directive, $compileNode);
                            templateDirective = directive;
                            if (directive.replace) {
                                replaceDirective = directive;
                            }
                            nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                                controllerDirectives: controllerDirectives,
                                newIsolateScopeDirective: newIsolateScopeDirective,
                                templateDirective: templateDirective,
                                nonTlbTranscludeDirective: nonTlbTranscludeDirective
                            });
                            ii = directives.length;
                        } else if (directive.compile) {
                            try {
                                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                                if (isFunction(linkFn)) {
                                    addLinkFns(null, linkFn, attrStart, attrEnd);
                                } else if (linkFn) {
                                    addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                                }
                            } catch (e) {
                                $exceptionHandler(e, startingTag($compileNode));
                            }
                        }
                        if (directive.terminal) {
                            nodeLinkFn.terminal = true;
                            terminalPriority = Math.max(terminalPriority, directive.priority);
                        }
                    }
                    nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === true;
                    nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective;
                    nodeLinkFn.templateOnThisElement = hasTemplate;
                    nodeLinkFn.transclude = childTranscludeFn;
                    previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective;
                    return nodeLinkFn;
                    function addLinkFns(pre, post, attrStart, attrEnd) {
                        if (pre) {
                            if (attrStart)
                                pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd);
                            pre.require = directive.require;
                            pre.directiveName = directiveName;
                            if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                                pre = cloneAndAnnotateFn(pre, { isolateScope: true });
                            }
                            preLinkFns.push(pre);
                        }
                        if (post) {
                            if (attrStart)
                                post = groupElementsLinkFnWrapper(post, attrStart, attrEnd);
                            post.require = directive.require;
                            post.directiveName = directiveName;
                            if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                                post = cloneAndAnnotateFn(post, { isolateScope: true });
                            }
                            postLinkFns.push(post);
                        }
                    }
                    function getControllers(directiveName, require, $element, elementControllers) {
                        var value, retrievalMethod = 'data', optional = false;
                        if (isString(require)) {
                            while ((value = require.charAt(0)) == '^' || value == '?') {
                                require = require.substr(1);
                                if (value == '^') {
                                    retrievalMethod = 'inheritedData';
                                }
                                optional = optional || value == '?';
                            }
                            value = null;
                            if (elementControllers && retrievalMethod === 'data') {
                                value = elementControllers[require];
                            }
                            value = value || $element[retrievalMethod]('$' + require + 'Controller');
                            if (!value && !optional) {
                                throw $compileMinErr('ctreq', 'Controller \'{0}\', required by directive \'{1}\', can\'t be found!', require, directiveName);
                            }
                            return value;
                        } else if (isArray(require)) {
                            value = [];
                            forEach(require, function (require) {
                                value.push(getControllers(directiveName, require, $element, elementControllers));
                            });
                        }
                        return value;
                    }
                    function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                        var attrs, $element, i, ii, linkFn, controller, isolateScope, elementControllers = {}, transcludeFn;
                        attrs = compileNode === linkNode ? templateAttrs : shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
                        $element = attrs.$$element;
                        if (newIsolateScopeDirective) {
                            var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                            isolateScope = scope.$new(true);
                            if (templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective)) {
                                $element.data('$isolateScope', isolateScope);
                            } else {
                                $element.data('$isolateScopeNoTemplate', isolateScope);
                            }
                            safeAddClass($element, 'ng-isolate-scope');
                            forEach(newIsolateScopeDirective.scope, function (definition, scopeName) {
                                var match = definition.match(LOCAL_REGEXP) || [], attrName = match[3] || scopeName, optional = match[2] == '?', mode = match[1], lastValue, parentGet, parentSet, compare;
                                isolateScope.$$isolateBindings[scopeName] = mode + attrName;
                                switch (mode) {
                                case '@':
                                    attrs.$observe(attrName, function (value) {
                                        isolateScope[scopeName] = value;
                                    });
                                    attrs.$$observers[attrName].$$scope = scope;
                                    if (attrs[attrName]) {
                                        isolateScope[scopeName] = $interpolate(attrs[attrName])(scope);
                                    }
                                    break;
                                case '=':
                                    if (optional && !attrs[attrName]) {
                                        return;
                                    }
                                    parentGet = $parse(attrs[attrName]);
                                    if (parentGet.literal) {
                                        compare = equals;
                                    } else {
                                        compare = function (a, b) {
                                            return a === b || a !== a && b !== b;
                                        };
                                    }
                                    parentSet = parentGet.assign || function () {
                                        lastValue = isolateScope[scopeName] = parentGet(scope);
                                        throw $compileMinErr('nonassign', 'Expression \'{0}\' used with directive \'{1}\' is non-assignable!', attrs[attrName], newIsolateScopeDirective.name);
                                    };
                                    lastValue = isolateScope[scopeName] = parentGet(scope);
                                    isolateScope.$watch(function parentValueWatch() {
                                        var parentValue = parentGet(scope);
                                        if (!compare(parentValue, isolateScope[scopeName])) {
                                            if (!compare(parentValue, lastValue)) {
                                                isolateScope[scopeName] = parentValue;
                                            } else {
                                                parentSet(scope, parentValue = isolateScope[scopeName]);
                                            }
                                        }
                                        return lastValue = parentValue;
                                    }, null, parentGet.literal);
                                    break;
                                case '&':
                                    parentGet = $parse(attrs[attrName]);
                                    isolateScope[scopeName] = function (locals) {
                                        return parentGet(scope, locals);
                                    };
                                    break;
                                default:
                                    throw $compileMinErr('iscp', 'Invalid isolate scope definition for directive \'{0}\'.' + ' Definition: {... {1}: \'{2}\' ...}', newIsolateScopeDirective.name, scopeName, definition);
                                }
                            });
                        }
                        transcludeFn = boundTranscludeFn && controllersBoundTransclude;
                        if (controllerDirectives) {
                            forEach(controllerDirectives, function (directive) {
                                var locals = {
                                        $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                                        $element: $element,
                                        $attrs: attrs,
                                        $transclude: transcludeFn
                                    }, controllerInstance;
                                controller = directive.controller;
                                if (controller == '@') {
                                    controller = attrs[directive.name];
                                }
                                controllerInstance = $controller(controller, locals);
                                elementControllers[directive.name] = controllerInstance;
                                if (!hasElementTranscludeDirective) {
                                    $element.data('$' + directive.name + 'Controller', controllerInstance);
                                }
                                if (directive.controllerAs) {
                                    locals.$scope[directive.controllerAs] = controllerInstance;
                                }
                            });
                        }
                        for (i = 0, ii = preLinkFns.length; i < ii; i++) {
                            try {
                                linkFn = preLinkFns[i];
                                linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                            } catch (e) {
                                $exceptionHandler(e, startingTag($element));
                            }
                        }
                        var scopeToChild = scope;
                        if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
                            scopeToChild = isolateScope;
                        }
                        childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);
                        for (i = postLinkFns.length - 1; i >= 0; i--) {
                            try {
                                linkFn = postLinkFns[i];
                                linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                            } catch (e) {
                                $exceptionHandler(e, startingTag($element));
                            }
                        }
                        function controllersBoundTransclude(scope, cloneAttachFn) {
                            var transcludeControllers;
                            if (arguments.length < 2) {
                                cloneAttachFn = scope;
                                scope = undefined;
                            }
                            if (hasElementTranscludeDirective) {
                                transcludeControllers = elementControllers;
                            }
                            return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers);
                        }
                    }
                }
                function markDirectivesAsIsolate(directives) {
                    for (var j = 0, jj = directives.length; j < jj; j++) {
                        directives[j] = inherit(directives[j], { $$isolateScope: true });
                    }
                }
                function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                    if (name === ignoreDirective)
                        return null;
                    var match = null;
                    if (hasDirectives.hasOwnProperty(name)) {
                        for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                            try {
                                directive = directives[i];
                                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                                    if (startAttrName) {
                                        directive = inherit(directive, {
                                            $$start: startAttrName,
                                            $$end: endAttrName
                                        });
                                    }
                                    tDirectives.push(directive);
                                    match = directive;
                                }
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                    }
                    return match;
                }
                function mergeTemplateAttributes(dst, src) {
                    var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                    forEach(dst, function (value, key) {
                        if (key.charAt(0) != '$') {
                            if (src[key] && src[key] !== value) {
                                value += (key === 'style' ? ';' : ' ') + src[key];
                            }
                            dst.$set(key, value, true, srcAttr[key]);
                        }
                    });
                    forEach(src, function (value, key) {
                        if (key == 'class') {
                            safeAddClass($element, value);
                            dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
                        } else if (key == 'style') {
                            $element.attr('style', $element.attr('style') + ';' + value);
                            dst['style'] = (dst['style'] ? dst['style'] + ';' : '') + value;
                        } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
                            dst[key] = value;
                            dstAttr[key] = srcAttr[key];
                        }
                    });
                }
                function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                    var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
                            templateUrl: null,
                            transclude: null,
                            replace: null,
                            $$originalDirective: origAsyncDirective
                        }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl;
                    $compileNode.empty();
                    $http.get($sce.getTrustedResourceUrl(templateUrl), { cache: $templateCache }).success(function (content) {
                        var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                        content = denormalizeTemplate(content);
                        if (origAsyncDirective.replace) {
                            if (jqLiteIsTextNode(content)) {
                                $template = [];
                            } else {
                                $template = jqLite(trim(content));
                            }
                            compileNode = $template[0];
                            if ($template.length != 1 || compileNode.nodeType !== 1) {
                                throw $compileMinErr('tplrt', 'Template for directive \'{0}\' must have exactly one root element. {1}', origAsyncDirective.name, templateUrl);
                            }
                            tempTemplateAttrs = { $attr: {} };
                            replaceWith($rootElement, $compileNode, compileNode);
                            var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                            if (isObject(origAsyncDirective.scope)) {
                                markDirectivesAsIsolate(templateDirectives);
                            }
                            directives = templateDirectives.concat(directives);
                            mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                        } else {
                            compileNode = beforeTemplateCompileNode;
                            $compileNode.html(content);
                        }
                        directives.unshift(derivedSyncDirective);
                        afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext);
                        forEach($rootElement, function (node, i) {
                            if (node == compileNode) {
                                $rootElement[i] = $compileNode[0];
                            }
                        });
                        afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
                        while (linkQueue.length) {
                            var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                            if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                var oldClasses = beforeTemplateLinkNode.className;
                                if (!(previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace)) {
                                    linkNode = jqLiteClone(compileNode);
                                }
                                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
                                safeAddClass(jqLite(linkNode), oldClasses);
                            }
                            if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                            } else {
                                childBoundTranscludeFn = boundTranscludeFn;
                            }
                            afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn);
                        }
                        linkQueue = null;
                    }).error(function (response, code, headers, config) {
                        throw $compileMinErr('tpload', 'Failed to load template: {0}', config.url);
                    });
                    return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                        var childBoundTranscludeFn = boundTranscludeFn;
                        if (linkQueue) {
                            linkQueue.push(scope);
                            linkQueue.push(node);
                            linkQueue.push(rootElement);
                            linkQueue.push(childBoundTranscludeFn);
                        } else {
                            if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                            }
                            afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn);
                        }
                    };
                }
                function byPriority(a, b) {
                    var diff = b.priority - a.priority;
                    if (diff !== 0)
                        return diff;
                    if (a.name !== b.name)
                        return a.name < b.name ? -1 : 1;
                    return a.index - b.index;
                }
                function assertNoDuplicate(what, previousDirective, directive, element) {
                    if (previousDirective) {
                        throw $compileMinErr('multidir', 'Multiple directives [{0}, {1}] asking for {2} on: {3}', previousDirective.name, directive.name, what, startingTag(element));
                    }
                }
                function addTextInterpolateDirective(directives, text) {
                    var interpolateFn = $interpolate(text, true);
                    if (interpolateFn) {
                        directives.push({
                            priority: 0,
                            compile: function textInterpolateCompileFn(templateNode) {
                                var parent = templateNode.parent(), hasCompileParent = parent.length;
                                if (hasCompileParent)
                                    safeAddClass(templateNode.parent(), 'ng-binding');
                                return function textInterpolateLinkFn(scope, node) {
                                    var parent = node.parent(), bindings = parent.data('$binding') || [];
                                    bindings.push(interpolateFn);
                                    parent.data('$binding', bindings);
                                    if (!hasCompileParent)
                                        safeAddClass(parent, 'ng-binding');
                                    scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                                        node[0].nodeValue = value;
                                    });
                                };
                            }
                        });
                    }
                }
                function getTrustedContext(node, attrNormalizedName) {
                    if (attrNormalizedName == 'srcdoc') {
                        return $sce.HTML;
                    }
                    var tag = nodeName_(node);
                    if (attrNormalizedName == 'xlinkHref' || tag == 'FORM' && attrNormalizedName == 'action' || tag == 'LINK' && attrNormalizedName == 'href' || tag != 'IMG' && (attrNormalizedName == 'src' || attrNormalizedName == 'ngSrc')) {
                        return $sce.RESOURCE_URL;
                    }
                }
                function addAttrInterpolateDirective(node, directives, value, name) {
                    var interpolateFn = $interpolate(value, true);
                    if (!interpolateFn)
                        return;
                    if (name === 'multiple' && nodeName_(node) === 'SELECT') {
                        throw $compileMinErr('selmulti', 'Binding to the \'multiple\' attribute is not supported. Element: {0}', startingTag(node));
                    }
                    directives.push({
                        priority: 100,
                        compile: function () {
                            return {
                                pre: function attrInterpolatePreLinkFn(scope, element, attr) {
                                    var $$observers = attr.$$observers || (attr.$$observers = {});
                                    if (EVENT_HANDLER_ATTR_REGEXP.test(name)) {
                                        throw $compileMinErr('nodomevents', 'Interpolations for HTML DOM event attributes are disallowed.  Please use the ' + 'ng- versions (such as ng-click instead of onclick) instead.');
                                    }
                                    interpolateFn = $interpolate(attr[name], true, getTrustedContext(node, name));
                                    if (!interpolateFn)
                                        return;
                                    attr[name] = interpolateFn(scope);
                                    ($$observers[name] || ($$observers[name] = [])).$$inter = true;
                                    (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(newValue, oldValue) {
                                        if (name === 'class' && newValue != oldValue) {
                                            attr.$updateClass(newValue, oldValue);
                                        } else {
                                            attr.$set(name, newValue);
                                        }
                                    });
                                }
                            };
                        }
                    });
                }
                function replaceWith($rootElement, elementsToRemove, newNode) {
                    var firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode, i, ii;
                    if ($rootElement) {
                        for (i = 0, ii = $rootElement.length; i < ii; i++) {
                            if ($rootElement[i] == firstElementToRemove) {
                                $rootElement[i++] = newNode;
                                for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; j < jj; j++, j2++) {
                                    if (j2 < jj) {
                                        $rootElement[j] = $rootElement[j2];
                                    } else {
                                        delete $rootElement[j];
                                    }
                                }
                                $rootElement.length -= removeCount - 1;
                                break;
                            }
                        }
                    }
                    if (parent) {
                        parent.replaceChild(newNode, firstElementToRemove);
                    }
                    var fragment = document.createDocumentFragment();
                    fragment.appendChild(firstElementToRemove);
                    newNode[jqLite.expando] = firstElementToRemove[jqLite.expando];
                    for (var k = 1, kk = elementsToRemove.length; k < kk; k++) {
                        var element = elementsToRemove[k];
                        jqLite(element).remove();
                        fragment.appendChild(element);
                        delete elementsToRemove[k];
                    }
                    elementsToRemove[0] = newNode;
                    elementsToRemove.length = 1;
                }
                function cloneAndAnnotateFn(fn, annotation) {
                    return extend(function () {
                        return fn.apply(null, arguments);
                    }, fn, annotation);
                }
            }
        ];
    }
    var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
    }
    function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
    }
    function tokenDifference(str1, str2) {
        var values = '', tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer:
            for (var i = 0; i < tokens1.length; i++) {
                var token = tokens1[i];
                for (var j = 0; j < tokens2.length; j++) {
                    if (token == tokens2[j])
                        continue outer;
                }
                values += (values.length > 0 ? ' ' : '') + token;
            }
        return values;
    }
    function $ControllerProvider() {
        var controllers = {}, CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (name, constructor) {
            assertNotHasOwnProperty(name, 'controller');
            if (isObject(name)) {
                extend(controllers, name);
            } else {
                controllers[name] = constructor;
            }
        };
        this.$get = [
            '$injector',
            '$window',
            function ($injector, $window) {
                return function (expression, locals) {
                    var instance, match, constructor, identifier;
                    if (isString(expression)) {
                        match = expression.match(CNTRL_REG), constructor = match[1], identifier = match[3];
                        expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, true) || getter($window, constructor, true);
                        assertArgFn(expression, constructor, true);
                    }
                    instance = $injector.instantiate(expression, locals);
                    if (identifier) {
                        if (!(locals && typeof locals.$scope === 'object')) {
                            throw minErr('$controller')('noscp', 'Cannot export controller \'{0}\' as \'{1}\'! No $scope object provided via `locals`.', constructor || expression.name, identifier);
                        }
                        locals.$scope[identifier] = instance;
                    }
                    return instance;
                };
            }
        ];
    }
    function $DocumentProvider() {
        this.$get = [
            '$window',
            function (window) {
                return jqLite(window.document);
            }
        ];
    }
    function $ExceptionHandlerProvider() {
        this.$get = [
            '$log',
            function ($log) {
                return function (exception, cause) {
                    $log.error.apply($log, arguments);
                };
            }
        ];
    }
    function parseHeaders(headers) {
        var parsed = {}, key, val, i;
        if (!headers)
            return parsed;
        forEach(headers.split('\n'), function (line) {
            i = line.indexOf(':');
            key = lowercase(trim(line.substr(0, i)));
            val = trim(line.substr(i + 1));
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    }
    function headersGetter(headers) {
        var headersObj = isObject(headers) ? headers : undefined;
        return function (name) {
            if (!headersObj)
                headersObj = parseHeaders(headers);
            if (name) {
                return headersObj[lowercase(name)] || null;
            }
            return headersObj;
        };
    }
    function transformData(data, headers, fns) {
        if (isFunction(fns))
            return fns(data, headers);
        forEach(fns, function (fn) {
            data = fn(data, headers);
        });
        return data;
    }
    function isSuccess(status) {
        return 200 <= status && status < 300;
    }
    function $HttpProvider() {
        var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/, CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json;charset=utf-8' };
        var defaults = this.defaults = {
            transformResponse: [function (data) {
                    if (isString(data)) {
                        data = data.replace(PROTECTION_PREFIX, '');
                        if (JSON_START.test(data) && JSON_END.test(data))
                            data = fromJson(data);
                    }
                    return data;
                }],
            transformRequest: [function (d) {
                    return isObject(d) && !isFile(d) && !isBlob(d) ? toJson(d) : d;
                }],
            headers: {
                common: { 'Accept': 'application/json, text/plain, */*' },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN'
        };
        var interceptorFactories = this.interceptors = [];
        var responseInterceptorFactories = this.responseInterceptors = [];
        this.$get = [
            '$httpBackend',
            '$browser',
            '$cacheFactory',
            '$rootScope',
            '$q',
            '$injector',
            function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
                var defaultCache = $cacheFactory('$http');
                var reversedInterceptors = [];
                forEach(interceptorFactories, function (interceptorFactory) {
                    reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
                });
                forEach(responseInterceptorFactories, function (interceptorFactory, index) {
                    var responseFn = isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory);
                    reversedInterceptors.splice(index, 0, {
                        response: function (response) {
                            return responseFn($q.when(response));
                        },
                        responseError: function (response) {
                            return responseFn($q.reject(response));
                        }
                    });
                });
                function $http(requestConfig) {
                    var config = {
                        method: 'get',
                        transformRequest: defaults.transformRequest,
                        transformResponse: defaults.transformResponse
                    };
                    var headers = mergeHeaders(requestConfig);
                    extend(config, requestConfig);
                    config.headers = headers;
                    config.method = uppercase(config.method);
                    var serverRequest = function (config) {
                        headers = config.headers;
                        var reqData = transformData(config.data, headersGetter(headers), config.transformRequest);
                        if (isUndefined(reqData)) {
                            forEach(headers, function (value, header) {
                                if (lowercase(header) === 'content-type') {
                                    delete headers[header];
                                }
                            });
                        }
                        if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
                            config.withCredentials = defaults.withCredentials;
                        }
                        return sendReq(config, reqData, headers).then(transformResponse, transformResponse);
                    };
                    var chain = [
                        serverRequest,
                        undefined
                    ];
                    var promise = $q.when(config);
                    forEach(reversedInterceptors, function (interceptor) {
                        if (interceptor.request || interceptor.requestError) {
                            chain.unshift(interceptor.request, interceptor.requestError);
                        }
                        if (interceptor.response || interceptor.responseError) {
                            chain.push(interceptor.response, interceptor.responseError);
                        }
                    });
                    while (chain.length) {
                        var thenFn = chain.shift();
                        var rejectFn = chain.shift();
                        promise = promise.then(thenFn, rejectFn);
                    }
                    promise.success = function (fn) {
                        promise.then(function (response) {
                            fn(response.data, response.status, response.headers, config);
                        });
                        return promise;
                    };
                    promise.error = function (fn) {
                        promise.then(null, function (response) {
                            fn(response.data, response.status, response.headers, config);
                        });
                        return promise;
                    };
                    return promise;
                    function transformResponse(response) {
                        var resp = extend({}, response, { data: transformData(response.data, response.headers, config.transformResponse) });
                        return isSuccess(response.status) ? resp : $q.reject(resp);
                    }
                    function mergeHeaders(config) {
                        var defHeaders = defaults.headers, reqHeaders = extend({}, config.headers), defHeaderName, lowercaseDefHeaderName, reqHeaderName;
                        defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                        defaultHeadersIteration:
                            for (defHeaderName in defHeaders) {
                                lowercaseDefHeaderName = lowercase(defHeaderName);
                                for (reqHeaderName in reqHeaders) {
                                    if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
                                        continue defaultHeadersIteration;
                                    }
                                }
                                reqHeaders[defHeaderName] = defHeaders[defHeaderName];
                            }
                        execHeaders(reqHeaders);
                        return reqHeaders;
                        function execHeaders(headers) {
                            var headerContent;
                            forEach(headers, function (headerFn, header) {
                                if (isFunction(headerFn)) {
                                    headerContent = headerFn();
                                    if (headerContent != null) {
                                        headers[header] = headerContent;
                                    } else {
                                        delete headers[header];
                                    }
                                }
                            });
                        }
                    }
                }
                $http.pendingRequests = [];
                createShortMethods('get', 'delete', 'head', 'jsonp');
                createShortMethodsWithData('post', 'put', 'patch');
                $http.defaults = defaults;
                return $http;
                function createShortMethods(names) {
                    forEach(arguments, function (name) {
                        $http[name] = function (url, config) {
                            return $http(extend(config || {}, {
                                method: name,
                                url: url
                            }));
                        };
                    });
                }
                function createShortMethodsWithData(name) {
                    forEach(arguments, function (name) {
                        $http[name] = function (url, data, config) {
                            return $http(extend(config || {}, {
                                method: name,
                                url: url,
                                data: data
                            }));
                        };
                    });
                }
                function sendReq(config, reqData, reqHeaders) {
                    var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
                    $http.pendingRequests.push(config);
                    promise.then(removePendingReq, removePendingReq);
                    if ((config.cache || defaults.cache) && config.cache !== false && (config.method === 'GET' || config.method === 'JSONP')) {
                        cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache;
                    }
                    if (cache) {
                        cachedResp = cache.get(url);
                        if (isDefined(cachedResp)) {
                            if (isPromiseLike(cachedResp)) {
                                cachedResp.then(removePendingReq, removePendingReq);
                                return cachedResp;
                            } else {
                                if (isArray(cachedResp)) {
                                    resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]);
                                } else {
                                    resolvePromise(cachedResp, 200, {}, 'OK');
                                }
                            }
                        } else {
                            cache.put(url, promise);
                        }
                    }
                    if (isUndefined(cachedResp)) {
                        var xsrfValue = urlIsSameOrigin(config.url) ? $browser.cookies()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                        if (xsrfValue) {
                            reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
                        }
                        $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
                    }
                    return promise;
                    function done(status, response, headersString, statusText) {
                        if (cache) {
                            if (isSuccess(status)) {
                                cache.put(url, [
                                    status,
                                    response,
                                    parseHeaders(headersString),
                                    statusText
                                ]);
                            } else {
                                cache.remove(url);
                            }
                        }
                        resolvePromise(response, status, headersString, statusText);
                        if (!$rootScope.$$phase)
                            $rootScope.$apply();
                    }
                    function resolvePromise(response, status, headers, statusText) {
                        status = Math.max(status, 0);
                        (isSuccess(status) ? deferred.resolve : deferred.reject)({
                            data: response,
                            status: status,
                            headers: headersGetter(headers),
                            config: config,
                            statusText: statusText
                        });
                    }
                    function removePendingReq() {
                        var idx = indexOf($http.pendingRequests, config);
                        if (idx !== -1)
                            $http.pendingRequests.splice(idx, 1);
                    }
                }
                function buildUrl(url, params) {
                    if (!params)
                        return url;
                    var parts = [];
                    forEachSorted(params, function (value, key) {
                        if (value === null || isUndefined(value))
                            return;
                        if (!isArray(value))
                            value = [value];
                        forEach(value, function (v) {
                            if (isObject(v)) {
                                if (isDate(v)) {
                                    v = v.toISOString();
                                } else {
                                    v = toJson(v);
                                }
                            }
                            parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
                        });
                    });
                    if (parts.length > 0) {
                        url += (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
                    }
                    return url;
                }
            }
        ];
    }
    function createXhr(method) {
        if (msie <= 8 && (!method.match(/^(get|post|head|put|delete|options)$/i) || !window.XMLHttpRequest)) {
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest();
        }
        throw minErr('$httpBackend')('noxhr', 'This browser does not support XMLHttpRequest.');
    }
    function $HttpBackendProvider() {
        this.$get = [
            '$browser',
            '$window',
            '$document',
            function ($browser, $window, $document) {
                return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0]);
            }
        ];
    }
    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        var ABORTED = -1;
        return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
            var status;
            $browser.$$incOutstandingRequestCount();
            url = url || $browser.url();
            if (lowercase(method) == 'jsonp') {
                var callbackId = '_' + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function (data) {
                    callbacks[callbackId].data = data;
                    callbacks[callbackId].called = true;
                };
                var jsonpDone = jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), callbackId, function (status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, '', text);
                    callbacks[callbackId] = noop;
                });
            } else {
                var xhr = createXhr(method);
                xhr.open(method, url, true);
                forEach(headers, function (value, key) {
                    if (isDefined(value)) {
                        xhr.setRequestHeader(key, value);
                    }
                });
                xhr.onreadystatechange = function () {
                    if (xhr && xhr.readyState == 4) {
                        var responseHeaders = null, response = null, statusText = '';
                        if (status !== ABORTED) {
                            responseHeaders = xhr.getAllResponseHeaders();
                            response = 'response' in xhr ? xhr.response : xhr.responseText;
                        }
                        if (!(status === ABORTED && msie < 10)) {
                            statusText = xhr.statusText;
                        }
                        completeRequest(callback, status || xhr.status, response, responseHeaders, statusText);
                    }
                };
                if (withCredentials) {
                    xhr.withCredentials = true;
                }
                if (responseType) {
                    try {
                        xhr.responseType = responseType;
                    } catch (e) {
                        if (responseType !== 'json') {
                            throw e;
                        }
                    }
                }
                xhr.send(post || null);
            }
            if (timeout > 0) {
                var timeoutId = $browserDefer(timeoutRequest, timeout);
            } else if (isPromiseLike(timeout)) {
                timeout.then(timeoutRequest);
            }
            function timeoutRequest() {
                status = ABORTED;
                jsonpDone && jsonpDone();
                xhr && xhr.abort();
            }
            function completeRequest(callback, status, response, headersString, statusText) {
                timeoutId && $browserDefer.cancel(timeoutId);
                jsonpDone = xhr = null;
                if (status === 0) {
                    status = response ? 200 : urlResolve(url).protocol == 'file' ? 404 : 0;
                }
                status = status === 1223 ? 204 : status;
                statusText = statusText || '';
                callback(status, response, headersString, statusText);
                $browser.$$completeOutstandingRequest(noop);
            }
        };
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement('script'), callback = null;
            script.type = 'text/javascript';
            script.src = url;
            script.async = true;
            callback = function (event) {
                removeEventListenerFn(script, 'load', callback);
                removeEventListenerFn(script, 'error', callback);
                rawDocument.body.removeChild(script);
                script = null;
                var status = -1;
                var text = 'unknown';
                if (event) {
                    if (event.type === 'load' && !callbacks[callbackId].called) {
                        event = { type: 'error' };
                    }
                    text = event.type;
                    status = event.type === 'error' ? 404 : 200;
                }
                if (done) {
                    done(status, text);
                }
            };
            addEventListenerFn(script, 'load', callback);
            addEventListenerFn(script, 'error', callback);
            if (msie <= 8) {
                script.onreadystatechange = function () {
                    if (isString(script.readyState) && /loaded|complete/.test(script.readyState)) {
                        script.onreadystatechange = null;
                        callback({ type: 'load' });
                    }
                };
            }
            rawDocument.body.appendChild(script);
            return callback;
        }
    }
    var $interpolateMinErr = minErr('$interpolate');
    function $InterpolateProvider() {
        var startSymbol = '{{';
        var endSymbol = '}}';
        this.startSymbol = function (value) {
            if (value) {
                startSymbol = value;
                return this;
            } else {
                return startSymbol;
            }
        };
        this.endSymbol = function (value) {
            if (value) {
                endSymbol = value;
                return this;
            } else {
                return endSymbol;
            }
        };
        this.$get = [
            '$parse',
            '$exceptionHandler',
            '$sce',
            function ($parse, $exceptionHandler, $sce) {
                var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
                function $interpolate(text, mustHaveExpression, trustedContext) {
                    var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
                    while (index < length) {
                        if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
                            index != startIndex && parts.push(text.substring(index, startIndex));
                            parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
                            fn.exp = exp;
                            index = endIndex + endSymbolLength;
                            hasInterpolation = true;
                        } else {
                            index != length && parts.push(text.substring(index));
                            index = length;
                        }
                    }
                    if (!(length = parts.length)) {
                        parts.push('');
                        length = 1;
                    }
                    if (trustedContext && parts.length > 1) {
                        throw $interpolateMinErr('noconcat', 'Error while interpolating: {0}\nStrict Contextual Escaping disallows ' + 'interpolations that concatenate multiple expressions when a trusted value is ' + 'required.  See http://docs.angularjs.org/api/ng.$sce', text);
                    }
                    if (!mustHaveExpression || hasInterpolation) {
                        concat.length = length;
                        fn = function (context) {
                            try {
                                for (var i = 0, ii = length, part; i < ii; i++) {
                                    if (typeof (part = parts[i]) == 'function') {
                                        part = part(context);
                                        if (trustedContext) {
                                            part = $sce.getTrusted(trustedContext, part);
                                        } else {
                                            part = $sce.valueOf(part);
                                        }
                                        if (part == null) {
                                            part = '';
                                        } else {
                                            switch (typeof part) {
                                            case 'string': {
                                                    break;
                                                }
                                            case 'number': {
                                                    part = '' + part;
                                                    break;
                                                }
                                            default: {
                                                    part = toJson(part);
                                                }
                                            }
                                        }
                                    }
                                    concat[i] = part;
                                }
                                return concat.join('');
                            } catch (err) {
                                var newErr = $interpolateMinErr('interr', 'Can\'t interpolate: {0}\n{1}', text, err.toString());
                                $exceptionHandler(newErr);
                            }
                        };
                        fn.exp = text;
                        fn.parts = parts;
                        return fn;
                    }
                }
                $interpolate.startSymbol = function () {
                    return startSymbol;
                };
                $interpolate.endSymbol = function () {
                    return endSymbol;
                };
                return $interpolate;
            }
        ];
    }
    function $IntervalProvider() {
        this.$get = [
            '$rootScope',
            '$window',
            '$q',
            function ($rootScope, $window, $q) {
                var intervals = {};
                function interval(fn, delay, count, invokeApply) {
                    var setInterval = $window.setInterval, clearInterval = $window.clearInterval, deferred = $q.defer(), promise = deferred.promise, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply;
                    count = isDefined(count) ? count : 0;
                    promise.then(null, null, fn);
                    promise.$$intervalId = setInterval(function tick() {
                        deferred.notify(iteration++);
                        if (count > 0 && iteration >= count) {
                            deferred.resolve(iteration);
                            clearInterval(promise.$$intervalId);
                            delete intervals[promise.$$intervalId];
                        }
                        if (!skipApply)
                            $rootScope.$apply();
                    }, delay);
                    intervals[promise.$$intervalId] = deferred;
                    return promise;
                }
                interval.cancel = function (promise) {
                    if (promise && promise.$$intervalId in intervals) {
                        intervals[promise.$$intervalId].reject('canceled');
                        $window.clearInterval(promise.$$intervalId);
                        delete intervals[promise.$$intervalId];
                        return true;
                    }
                    return false;
                };
                return interval;
            }
        ];
    }
    function $LocaleProvider() {
        this.$get = function () {
            return {
                id: 'en-us',
                NUMBER_FORMATS: {
                    DECIMAL_SEP: '.',
                    GROUP_SEP: ',',
                    PATTERNS: [
                        {
                            minInt: 1,
                            minFrac: 0,
                            maxFrac: 3,
                            posPre: '',
                            posSuf: '',
                            negPre: '-',
                            negSuf: '',
                            gSize: 3,
                            lgSize: 3
                        },
                        {
                            minInt: 1,
                            minFrac: 2,
                            maxFrac: 2,
                            posPre: '\xA4',
                            posSuf: '',
                            negPre: '(\xA4',
                            negSuf: ')',
                            gSize: 3,
                            lgSize: 3
                        }
                    ],
                    CURRENCY_SYM: '$'
                },
                DATETIME_FORMATS: {
                    MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
                    SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
                    DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
                    SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
                    AMPMS: [
                        'AM',
                        'PM'
                    ],
                    medium: 'MMM d, y h:mm:ss a',
                    short: 'M/d/yy h:mm a',
                    fullDate: 'EEEE, MMMM d, y',
                    longDate: 'MMMM d, y',
                    mediumDate: 'MMM d, y',
                    shortDate: 'M/d/yy',
                    mediumTime: 'h:mm:ss a',
                    shortTime: 'h:mm a'
                },
                pluralCat: function (num) {
                    if (num === 1) {
                        return 'one';
                    }
                    return 'other';
                }
            };
        };
    }
    var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
            'http': 80,
            'https': 443,
            'ftp': 21
        };
    var $locationMinErr = minErr('$location');
    function encodePath(path) {
        var segments = path.split('/'), i = segments.length;
        while (i--) {
            segments[i] = encodeUriSegment(segments[i]);
        }
        return segments.join('/');
    }
    function parseAbsoluteUrl(absoluteUrl, locationObj, appBase) {
        var parsedUrl = urlResolve(absoluteUrl, appBase);
        locationObj.$$protocol = parsedUrl.protocol;
        locationObj.$$host = parsedUrl.hostname;
        locationObj.$$port = int(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
    }
    function parseAppUrl(relativeUrl, locationObj, appBase) {
        var prefixed = relativeUrl.charAt(0) !== '/';
        if (prefixed) {
            relativeUrl = '/' + relativeUrl;
        }
        var match = urlResolve(relativeUrl, appBase);
        locationObj.$$path = decodeURIComponent(prefixed && match.pathname.charAt(0) === '/' ? match.pathname.substring(1) : match.pathname);
        locationObj.$$search = parseKeyValue(match.search);
        locationObj.$$hash = decodeURIComponent(match.hash);
        if (locationObj.$$path && locationObj.$$path.charAt(0) != '/') {
            locationObj.$$path = '/' + locationObj.$$path;
        }
    }
    function beginsWith(begin, whole) {
        if (whole.indexOf(begin) === 0) {
            return whole.substr(begin.length);
        }
    }
    function stripHash(url) {
        var index = url.indexOf('#');
        return index == -1 ? url : url.substr(0, index);
    }
    function trimEmptyHash(url) {
        return url.replace(/(#.+)|#$/, '$1');
    }
    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf('/') + 1);
    }
    function serverBase(url) {
        return url.substring(0, url.indexOf('/', url.indexOf('//') + 2));
    }
    function LocationHtml5Url(appBase, basePrefix) {
        this.$$html5 = true;
        basePrefix = basePrefix || '';
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this, appBase);
        this.$$parse = function (url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) {
                throw $locationMinErr('ipthprfx', 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            }
            parseAppUrl(pathUrl, this, appBase);
            if (!this.$$path) {
                this.$$path = '/';
            }
            this.$$compose();
        };
        this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
            this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
            this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
        };
        this.$$parseLinkUrl = function (url, relHref) {
            var appUrl, prevAppUrl;
            var rewrittenUrl;
            if ((appUrl = beginsWith(appBase, url)) !== undefined) {
                prevAppUrl = appUrl;
                if ((appUrl = beginsWith(basePrefix, appUrl)) !== undefined) {
                    rewrittenUrl = appBaseNoFile + (beginsWith('/', appUrl) || appUrl);
                } else {
                    rewrittenUrl = appBase + prevAppUrl;
                }
            } else if ((appUrl = beginsWith(appBaseNoFile, url)) !== undefined) {
                rewrittenUrl = appBaseNoFile + appUrl;
            } else if (appBaseNoFile == url + '/') {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
    }
    function LocationHashbangUrl(appBase, hashPrefix) {
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this, appBase);
        this.$$parse = function (url) {
            var withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            var withoutHashUrl = withoutBaseUrl.charAt(0) == '#' ? beginsWith(hashPrefix, withoutBaseUrl) : this.$$html5 ? withoutBaseUrl : '';
            if (!isString(withoutHashUrl)) {
                throw $locationMinErr('ihshprfx', 'Invalid url "{0}", missing hash prefix "{1}".', url, hashPrefix);
            }
            parseAppUrl(withoutHashUrl, this, appBase);
            this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase);
            this.$$compose();
            function removeWindowsDriveName(path, url, base) {
                var windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                var firstPathSegmentMatch;
                if (url.indexOf(base) === 0) {
                    url = url.replace(base, '');
                }
                if (windowsFilePathExp.exec(url)) {
                    return path;
                }
                firstPathSegmentMatch = windowsFilePathExp.exec(path);
                return firstPathSegmentMatch ? firstPathSegmentMatch[1] : path;
            }
        };
        this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
            this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
            this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : '');
        };
        this.$$parseLinkUrl = function (url, relHref) {
            if (stripHash(appBase) == stripHash(url)) {
                this.$$parse(url);
                return true;
            }
            return false;
        };
    }
    function LocationHashbangInHtml5Url(appBase, hashPrefix) {
        this.$$html5 = true;
        LocationHashbangUrl.apply(this, arguments);
        var appBaseNoFile = stripFile(appBase);
        this.$$parseLinkUrl = function (url, relHref) {
            var rewrittenUrl;
            var appUrl;
            if (appBase == stripHash(url)) {
                rewrittenUrl = url;
            } else if (appUrl = beginsWith(appBaseNoFile, url)) {
                rewrittenUrl = appBase + hashPrefix + appUrl;
            } else if (appBaseNoFile === url + '/') {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
        this.$$compose = function () {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
            this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
            this.$$absUrl = appBase + hashPrefix + this.$$url;
        };
    }
    LocationHashbangInHtml5Url.prototype = LocationHashbangUrl.prototype = LocationHtml5Url.prototype = {
        $$html5: false,
        $$replace: false,
        absUrl: locationGetter('$$absUrl'),
        url: function (url) {
            if (isUndefined(url))
                return this.$$url;
            var match = PATH_MATCH.exec(url);
            if (match[1])
                this.path(decodeURIComponent(match[1]));
            if (match[2] || match[1])
                this.search(match[3] || '');
            this.hash(match[5] || '');
            return this;
        },
        protocol: locationGetter('$$protocol'),
        host: locationGetter('$$host'),
        port: locationGetter('$$port'),
        path: locationGetterSetter('$$path', function (path) {
            path = path !== null ? path.toString() : '';
            return path.charAt(0) == '/' ? path : '/' + path;
        }),
        search: function (search, paramValue) {
            switch (arguments.length) {
            case 0:
                return this.$$search;
            case 1:
                if (isString(search) || isNumber(search)) {
                    search = search.toString();
                    this.$$search = parseKeyValue(search);
                } else if (isObject(search)) {
                    forEach(search, function (value, key) {
                        if (value == null)
                            delete search[key];
                    });
                    this.$$search = search;
                } else {
                    throw $locationMinErr('isrcharg', 'The first argument of the `$location#search()` call must be a string or an object.');
                }
                break;
            default:
                if (isUndefined(paramValue) || paramValue === null) {
                    delete this.$$search[search];
                } else {
                    this.$$search[search] = paramValue;
                }
            }
            this.$$compose();
            return this;
        },
        hash: locationGetterSetter('$$hash', function (hash) {
            return hash !== null ? hash.toString() : '';
        }),
        replace: function () {
            this.$$replace = true;
            return this;
        }
    };
    function locationGetter(property) {
        return function () {
            return this[property];
        };
    }
    function locationGetterSetter(property, preprocess) {
        return function (value) {
            if (isUndefined(value))
                return this[property];
            this[property] = preprocess(value);
            this.$$compose();
            return this;
        };
    }
    function $LocationProvider() {
        var hashPrefix = '', html5Mode = false;
        this.hashPrefix = function (prefix) {
            if (isDefined(prefix)) {
                hashPrefix = prefix;
                return this;
            } else {
                return hashPrefix;
            }
        };
        this.html5Mode = function (mode) {
            if (isDefined(mode)) {
                html5Mode = mode;
                return this;
            } else {
                return html5Mode;
            }
        };
        this.$get = [
            '$rootScope',
            '$browser',
            '$sniffer',
            '$rootElement',
            function ($rootScope, $browser, $sniffer, $rootElement) {
                var $location, LocationMode, baseHref = $browser.baseHref(), initialUrl = $browser.url(), appBase;
                if (html5Mode) {
                    appBase = serverBase(initialUrl) + (baseHref || '/');
                    LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
                } else {
                    appBase = stripHash(initialUrl);
                    LocationMode = LocationHashbangUrl;
                }
                $location = new LocationMode(appBase, '#' + hashPrefix);
                $location.$$parseLinkUrl(initialUrl, initialUrl);
                var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
                $rootElement.on('click', function (event) {
                    if (event.ctrlKey || event.metaKey || event.which == 2)
                        return;
                    var elm = jqLite(event.target);
                    while (lowercase(elm[0].nodeName) !== 'a') {
                        if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
                            return;
                    }
                    var absHref = elm.prop('href');
                    var relHref = elm.attr('href') || elm.attr('xlink:href');
                    if (isObject(absHref) && absHref.toString() === '[object SVGAnimatedString]') {
                        absHref = urlResolve(absHref.animVal).href;
                    }
                    if (IGNORE_URI_REGEXP.test(absHref))
                        return;
                    if (absHref && !elm.attr('target') && !event.isDefaultPrevented()) {
                        if ($location.$$parseLinkUrl(absHref, relHref)) {
                            event.preventDefault();
                            if ($location.absUrl() != $browser.url()) {
                                $rootScope.$apply();
                                window.angular['ff-684208-preventDefault'] = true;
                            }
                        }
                    }
                });
                if ($location.absUrl() != initialUrl) {
                    $browser.url($location.absUrl(), true);
                }
                $browser.onUrlChange(function (newUrl) {
                    if ($location.absUrl() != newUrl) {
                        $rootScope.$evalAsync(function () {
                            var oldUrl = $location.absUrl();
                            $location.$$parse(newUrl);
                            if ($rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl).defaultPrevented) {
                                $location.$$parse(oldUrl);
                                $browser.url(oldUrl);
                            } else {
                                afterLocationChange(oldUrl);
                            }
                        });
                        if (!$rootScope.$$phase)
                            $rootScope.$digest();
                    }
                });
                var changeCounter = 0;
                $rootScope.$watch(function $locationWatch() {
                    var oldUrl = trimEmptyHash($browser.url());
                    var newUrl = trimEmptyHash($location.absUrl());
                    var currentReplace = $location.$$replace;
                    if (!changeCounter || oldUrl != newUrl) {
                        changeCounter++;
                        $rootScope.$evalAsync(function () {
                            if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                                $location.$$parse(oldUrl);
                            } else {
                                $browser.url($location.absUrl(), currentReplace);
                                afterLocationChange(oldUrl);
                            }
                        });
                    }
                    $location.$$replace = false;
                    return changeCounter;
                });
                return $location;
                function afterLocationChange(oldUrl) {
                    $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
                }
            }
        ];
    }
    function $LogProvider() {
        var debug = true, self = this;
        this.debugEnabled = function (flag) {
            if (isDefined(flag)) {
                debug = flag;
                return this;
            } else {
                return debug;
            }
        };
        this.$get = [
            '$window',
            function ($window) {
                return {
                    log: consoleLog('log'),
                    info: consoleLog('info'),
                    warn: consoleLog('warn'),
                    error: consoleLog('error'),
                    debug: function () {
                        var fn = consoleLog('debug');
                        return function () {
                            if (debug) {
                                fn.apply(self, arguments);
                            }
                        };
                    }()
                };
                function formatError(arg) {
                    if (arg instanceof Error) {
                        if (arg.stack) {
                            arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
                        } else if (arg.sourceURL) {
                            arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
                        }
                    }
                    return arg;
                }
                function consoleLog(type) {
                    var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = false;
                    try {
                        hasApply = !!logFn.apply;
                    } catch (e) {
                    }
                    if (hasApply) {
                        return function () {
                            var args = [];
                            forEach(arguments, function (arg) {
                                args.push(formatError(arg));
                            });
                            return logFn.apply(console, args);
                        };
                    }
                    return function (arg1, arg2) {
                        logFn(arg1, arg2 == null ? '' : arg2);
                    };
                }
            }
        ];
    }
    var $parseMinErr = minErr('$parse');
    var promiseWarningCache = {};
    var promiseWarning;
    function ensureSafeMemberName(name, fullExpression) {
        if (name === '__defineGetter__' || name === '__defineSetter__' || name === '__lookupGetter__' || name === '__lookupSetter__' || name === '__proto__') {
            throw $parseMinErr('isecfld', 'Attempting to access a disallowed field in Angular expressions! ' + 'Expression: {0}', fullExpression);
        }
        return name;
    }
    function getStringValue(name, fullExpression) {
        name = name + '';
        if (!isString(name)) {
            throw $parseMinErr('iseccst', 'Cannot convert object to primitive value! ' + 'Expression: {0}', fullExpression);
        }
        return name;
    }
    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr('isecfn', 'Referencing Function in Angular expressions is disallowed! Expression: {0}', fullExpression);
            } else if (obj.document && obj.location && obj.alert && obj.setInterval) {
                throw $parseMinErr('isecwindow', 'Referencing the Window in Angular expressions is disallowed! Expression: {0}', fullExpression);
            } else if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) {
                throw $parseMinErr('isecdom', 'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}', fullExpression);
            } else if (obj === Object) {
                throw $parseMinErr('isecobj', 'Referencing Object in Angular expressions is disallowed! Expression: {0}', fullExpression);
            }
        }
        return obj;
    }
    var CALL = Function.prototype.call;
    var APPLY = Function.prototype.apply;
    var BIND = Function.prototype.bind;
    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr('isecfn', 'Referencing Function in Angular expressions is disallowed! Expression: {0}', fullExpression);
            } else if (obj === CALL || obj === APPLY || BIND && obj === BIND) {
                throw $parseMinErr('isecff', 'Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}', fullExpression);
            }
        }
    }
    var OPERATORS = {
        'null': function () {
            return null;
        },
        'true': function () {
            return true;
        },
        'false': function () {
            return false;
        },
        undefined: noop,
        '+': function (self, locals, a, b) {
            a = a(self, locals);
            b = b(self, locals);
            if (isDefined(a)) {
                if (isDefined(b)) {
                    return a + b;
                }
                return a;
            }
            return isDefined(b) ? b : undefined;
        },
        '-': function (self, locals, a, b) {
            a = a(self, locals);
            b = b(self, locals);
            return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
        },
        '*': function (self, locals, a, b) {
            return a(self, locals) * b(self, locals);
        },
        '/': function (self, locals, a, b) {
            return a(self, locals) / b(self, locals);
        },
        '%': function (self, locals, a, b) {
            return a(self, locals) % b(self, locals);
        },
        '^': function (self, locals, a, b) {
            return a(self, locals) ^ b(self, locals);
        },
        '=': noop,
        '===': function (self, locals, a, b) {
            return a(self, locals) === b(self, locals);
        },
        '!==': function (self, locals, a, b) {
            return a(self, locals) !== b(self, locals);
        },
        '==': function (self, locals, a, b) {
            return a(self, locals) == b(self, locals);
        },
        '!=': function (self, locals, a, b) {
            return a(self, locals) != b(self, locals);
        },
        '<': function (self, locals, a, b) {
            return a(self, locals) < b(self, locals);
        },
        '>': function (self, locals, a, b) {
            return a(self, locals) > b(self, locals);
        },
        '<=': function (self, locals, a, b) {
            return a(self, locals) <= b(self, locals);
        },
        '>=': function (self, locals, a, b) {
            return a(self, locals) >= b(self, locals);
        },
        '&&': function (self, locals, a, b) {
            return a(self, locals) && b(self, locals);
        },
        '||': function (self, locals, a, b) {
            return a(self, locals) || b(self, locals);
        },
        '&': function (self, locals, a, b) {
            return a(self, locals) & b(self, locals);
        },
        '|': function (self, locals, a, b) {
            return b(self, locals)(self, locals, a(self, locals));
        },
        '!': function (self, locals, a) {
            return !a(self, locals);
        }
    };
    var ESCAPE = {
        'n': '\n',
        'f': '\f',
        'r': '\r',
        't': '\t',
        'v': '\x0B',
        '\'': '\'',
        '"': '"'
    };
    var Lexer = function (options) {
        this.options = options;
    };
    Lexer.prototype = {
        constructor: Lexer,
        lex: function (text) {
            this.text = text;
            this.index = 0;
            this.ch = undefined;
            this.lastCh = ':';
            this.tokens = [];
            while (this.index < this.text.length) {
                this.ch = this.text.charAt(this.index);
                if (this.is('"\'')) {
                    this.readString(this.ch);
                } else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek())) {
                    this.readNumber();
                } else if (this.isIdent(this.ch)) {
                    this.readIdent();
                } else if (this.is('(){}[].,;:?')) {
                    this.tokens.push({
                        index: this.index,
                        text: this.ch
                    });
                    this.index++;
                } else if (this.isWhitespace(this.ch)) {
                    this.index++;
                    continue;
                } else {
                    var ch2 = this.ch + this.peek();
                    var ch3 = ch2 + this.peek(2);
                    var fn = OPERATORS[this.ch];
                    var fn2 = OPERATORS[ch2];
                    var fn3 = OPERATORS[ch3];
                    if (fn3) {
                        this.tokens.push({
                            index: this.index,
                            text: ch3,
                            fn: fn3
                        });
                        this.index += 3;
                    } else if (fn2) {
                        this.tokens.push({
                            index: this.index,
                            text: ch2,
                            fn: fn2
                        });
                        this.index += 2;
                    } else if (fn) {
                        this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            fn: fn
                        });
                        this.index += 1;
                    } else {
                        this.throwError('Unexpected next character ', this.index, this.index + 1);
                    }
                }
                this.lastCh = this.ch;
            }
            return this.tokens;
        },
        is: function (chars) {
            return chars.indexOf(this.ch) !== -1;
        },
        was: function (chars) {
            return chars.indexOf(this.lastCh) !== -1;
        },
        peek: function (i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : false;
        },
        isNumber: function (ch) {
            return '0' <= ch && ch <= '9';
        },
        isWhitespace: function (ch) {
            return ch === ' ' || ch === '\r' || ch === '\t' || ch === '\n' || ch === '\x0B' || ch === '\xA0';
        },
        isIdent: function (ch) {
            return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' === ch || ch === '$';
        },
        isExpOperator: function (ch) {
            return ch === '-' || ch === '+' || this.isNumber(ch);
        },
        throwError: function (error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? 's ' + start + '-' + this.index + ' [' + this.text.substring(start, end) + ']' : ' ' + end;
            throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].', error, colStr, this.text);
        },
        readNumber: function () {
            var number = '';
            var start = this.index;
            while (this.index < this.text.length) {
                var ch = lowercase(this.text.charAt(this.index));
                if (ch == '.' || this.isNumber(ch)) {
                    number += ch;
                } else {
                    var peekCh = this.peek();
                    if (ch == 'e' && this.isExpOperator(peekCh)) {
                        number += ch;
                    } else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
                        number += ch;
                    } else if (this.isExpOperator(ch) && (!peekCh || !this.isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
                        this.throwError('Invalid exponent');
                    } else {
                        break;
                    }
                }
                this.index++;
            }
            number = 1 * number;
            this.tokens.push({
                index: start,
                text: number,
                literal: true,
                constant: true,
                fn: function () {
                    return number;
                }
            });
        },
        readIdent: function () {
            var parser = this;
            var ident = '';
            var start = this.index;
            var lastDot, peekIndex, methodName, ch;
            while (this.index < this.text.length) {
                ch = this.text.charAt(this.index);
                if (ch === '.' || this.isIdent(ch) || this.isNumber(ch)) {
                    if (ch === '.')
                        lastDot = this.index;
                    ident += ch;
                } else {
                    break;
                }
                this.index++;
            }
            if (lastDot) {
                peekIndex = this.index;
                while (peekIndex < this.text.length) {
                    ch = this.text.charAt(peekIndex);
                    if (ch === '(') {
                        methodName = ident.substr(lastDot - start + 1);
                        ident = ident.substr(0, lastDot - start);
                        this.index = peekIndex;
                        break;
                    }
                    if (this.isWhitespace(ch)) {
                        peekIndex++;
                    } else {
                        break;
                    }
                }
            }
            var token = {
                index: start,
                text: ident
            };
            if (OPERATORS.hasOwnProperty(ident)) {
                token.fn = OPERATORS[ident];
                token.literal = true;
                token.constant = true;
            } else {
                var getter = getterFn(ident, this.options, this.text);
                token.fn = extend(function (self, locals) {
                    return getter(self, locals);
                }, {
                    assign: function (self, value) {
                        return setter(self, ident, value, parser.text, parser.options);
                    }
                });
            }
            this.tokens.push(token);
            if (methodName) {
                this.tokens.push({
                    index: lastDot,
                    text: '.'
                });
                this.tokens.push({
                    index: lastDot + 1,
                    text: methodName
                });
            }
        },
        readString: function (quote) {
            var start = this.index;
            this.index++;
            var string = '';
            var rawString = quote;
            var escape = false;
            while (this.index < this.text.length) {
                var ch = this.text.charAt(this.index);
                rawString += ch;
                if (escape) {
                    if (ch === 'u') {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        if (!hex.match(/[\da-f]{4}/i))
                            this.throwError('Invalid unicode escape [\\u' + hex + ']');
                        this.index += 4;
                        string += String.fromCharCode(parseInt(hex, 16));
                    } else {
                        var rep = ESCAPE[ch];
                        string = string + (rep || ch);
                    }
                    escape = false;
                } else if (ch === '\\') {
                    escape = true;
                } else if (ch === quote) {
                    this.index++;
                    this.tokens.push({
                        index: start,
                        text: rawString,
                        string: string,
                        literal: true,
                        constant: true,
                        fn: function () {
                            return string;
                        }
                    });
                    return;
                } else {
                    string += ch;
                }
                this.index++;
            }
            this.throwError('Unterminated quote', start);
        }
    };
    var Parser = function (lexer, $filter, options) {
        this.lexer = lexer;
        this.$filter = $filter;
        this.options = options;
    };
    Parser.ZERO = extend(function () {
        return 0;
    }, { constant: true });
    Parser.prototype = {
        constructor: Parser,
        parse: function (text) {
            this.text = text;
            this.tokens = this.lexer.lex(text);
            var value = this.statements();
            if (this.tokens.length !== 0) {
                this.throwError('is an unexpected token', this.tokens[0]);
            }
            value.literal = !!value.literal;
            value.constant = !!value.constant;
            return value;
        },
        primary: function () {
            var primary;
            if (this.expect('(')) {
                primary = this.filterChain();
                this.consume(')');
            } else if (this.expect('[')) {
                primary = this.arrayDeclaration();
            } else if (this.expect('{')) {
                primary = this.object();
            } else {
                var token = this.expect();
                primary = token.fn;
                if (!primary) {
                    this.throwError('not a primary expression', token);
                }
                primary.literal = !!token.literal;
                primary.constant = !!token.constant;
            }
            var next, context;
            while (next = this.expect('(', '[', '.')) {
                if (next.text === '(') {
                    primary = this.functionCall(primary, context);
                    context = null;
                } else if (next.text === '[') {
                    context = primary;
                    primary = this.objectIndex(primary);
                } else if (next.text === '.') {
                    context = primary;
                    primary = this.fieldAccess(primary);
                } else {
                    this.throwError('IMPOSSIBLE');
                }
            }
            return primary;
        },
        throwError: function (msg, token) {
            throw $parseMinErr('syntax', 'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].', token.text, msg, token.index + 1, this.text, this.text.substring(token.index));
        },
        peekToken: function () {
            if (this.tokens.length === 0)
                throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
            return this.tokens[0];
        },
        peek: function (e1, e2, e3, e4) {
            if (this.tokens.length > 0) {
                var token = this.tokens[0];
                var t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) {
                    return token;
                }
            }
            return false;
        },
        expect: function (e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            if (token) {
                this.tokens.shift();
                return token;
            }
            return false;
        },
        consume: function (e1) {
            if (!this.expect(e1)) {
                this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
            }
        },
        unaryFn: function (fn, right) {
            return extend(function (self, locals) {
                return fn(self, locals, right);
            }, { constant: right.constant });
        },
        ternaryFn: function (left, middle, right) {
            return extend(function (self, locals) {
                return left(self, locals) ? middle(self, locals) : right(self, locals);
            }, { constant: left.constant && middle.constant && right.constant });
        },
        binaryFn: function (left, fn, right) {
            return extend(function (self, locals) {
                return fn(self, locals, left, right);
            }, { constant: left.constant && right.constant });
        },
        statements: function () {
            var statements = [];
            while (true) {
                if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
                    statements.push(this.filterChain());
                if (!this.expect(';')) {
                    return statements.length === 1 ? statements[0] : function (self, locals) {
                        var value;
                        for (var i = 0; i < statements.length; i++) {
                            var statement = statements[i];
                            if (statement) {
                                value = statement(self, locals);
                            }
                        }
                        return value;
                    };
                }
            }
        },
        filterChain: function () {
            var left = this.expression();
            var token;
            while (true) {
                if (token = this.expect('|')) {
                    left = this.binaryFn(left, token.fn, this.filter());
                } else {
                    return left;
                }
            }
        },
        filter: function () {
            var token = this.expect();
            var fn = this.$filter(token.text);
            var argsFn = [];
            while (true) {
                if (token = this.expect(':')) {
                    argsFn.push(this.expression());
                } else {
                    var fnInvoke = function (self, locals, input) {
                        var args = [input];
                        for (var i = 0; i < argsFn.length; i++) {
                            args.push(argsFn[i](self, locals));
                        }
                        return fn.apply(self, args);
                    };
                    return function () {
                        return fnInvoke;
                    };
                }
            }
        },
        expression: function () {
            return this.assignment();
        },
        assignment: function () {
            var left = this.ternary();
            var right;
            var token;
            if (token = this.expect('=')) {
                if (!left.assign) {
                    this.throwError('implies assignment but [' + this.text.substring(0, token.index) + '] can not be assigned to', token);
                }
                right = this.ternary();
                return function (scope, locals) {
                    return left.assign(scope, right(scope, locals), locals);
                };
            }
            return left;
        },
        ternary: function () {
            var left = this.logicalOR();
            var middle;
            var token;
            if (token = this.expect('?')) {
                middle = this.assignment();
                if (token = this.expect(':')) {
                    return this.ternaryFn(left, middle, this.assignment());
                } else {
                    this.throwError('expected :', token);
                }
            } else {
                return left;
            }
        },
        logicalOR: function () {
            var left = this.logicalAND();
            var token;
            while (true) {
                if (token = this.expect('||')) {
                    left = this.binaryFn(left, token.fn, this.logicalAND());
                } else {
                    return left;
                }
            }
        },
        logicalAND: function () {
            var left = this.equality();
            var token;
            if (token = this.expect('&&')) {
                left = this.binaryFn(left, token.fn, this.logicalAND());
            }
            return left;
        },
        equality: function () {
            var left = this.relational();
            var token;
            if (token = this.expect('==', '!=', '===', '!==')) {
                left = this.binaryFn(left, token.fn, this.equality());
            }
            return left;
        },
        relational: function () {
            var left = this.additive();
            var token;
            if (token = this.expect('<', '>', '<=', '>=')) {
                left = this.binaryFn(left, token.fn, this.relational());
            }
            return left;
        },
        additive: function () {
            var left = this.multiplicative();
            var token;
            while (token = this.expect('+', '-')) {
                left = this.binaryFn(left, token.fn, this.multiplicative());
            }
            return left;
        },
        multiplicative: function () {
            var left = this.unary();
            var token;
            while (token = this.expect('*', '/', '%')) {
                left = this.binaryFn(left, token.fn, this.unary());
            }
            return left;
        },
        unary: function () {
            var token;
            if (this.expect('+')) {
                return this.primary();
            } else if (token = this.expect('-')) {
                return this.binaryFn(Parser.ZERO, token.fn, this.unary());
            } else if (token = this.expect('!')) {
                return this.unaryFn(token.fn, this.unary());
            } else {
                return this.primary();
            }
        },
        fieldAccess: function (object) {
            var parser = this;
            var field = this.expect().text;
            var getter = getterFn(field, this.options, this.text);
            return extend(function (scope, locals, self) {
                return getter(self || object(scope, locals));
            }, {
                assign: function (scope, value, locals) {
                    var o = object(scope, locals);
                    if (!o)
                        object.assign(scope, o = {});
                    return setter(o, field, value, parser.text, parser.options);
                }
            });
        },
        objectIndex: function (obj) {
            var parser = this;
            var indexFn = this.expression();
            this.consume(']');
            return extend(function (self, locals) {
                var o = obj(self, locals), i = getStringValue(indexFn(self, locals), parser.text), v, p;
                ensureSafeMemberName(i, parser.text);
                if (!o)
                    return undefined;
                v = ensureSafeObject(o[i], parser.text);
                if (v && v.then && parser.options.unwrapPromises) {
                    p = v;
                    if (!('$$v' in v)) {
                        p.$$v = undefined;
                        p.then(function (val) {
                            p.$$v = val;
                        });
                    }
                    v = v.$$v;
                }
                return v;
            }, {
                assign: function (self, value, locals) {
                    var key = ensureSafeMemberName(getStringValue(indexFn(self, locals), parser.text), parser.text);
                    var o = ensureSafeObject(obj(self, locals), parser.text);
                    if (!o)
                        obj.assign(self, o = {});
                    return o[key] = value;
                }
            });
        },
        functionCall: function (fn, contextGetter) {
            var argsFn = [];
            if (this.peekToken().text !== ')') {
                do {
                    argsFn.push(this.expression());
                } while (this.expect(','));
            }
            this.consume(')');
            var parser = this;
            return function (scope, locals) {
                var args = [];
                var context = contextGetter ? contextGetter(scope, locals) : scope;
                for (var i = 0; i < argsFn.length; i++) {
                    args.push(ensureSafeObject(argsFn[i](scope, locals), parser.text));
                }
                var fnPtr = fn(scope, locals, context) || noop;
                ensureSafeObject(context, parser.text);
                ensureSafeFunction(fnPtr, parser.text);
                var v = fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
                return ensureSafeObject(v, parser.text);
            };
        },
        arrayDeclaration: function () {
            var elementFns = [];
            var allConstant = true;
            if (this.peekToken().text !== ']') {
                do {
                    if (this.peek(']')) {
                        break;
                    }
                    var elementFn = this.expression();
                    elementFns.push(elementFn);
                    if (!elementFn.constant) {
                        allConstant = false;
                    }
                } while (this.expect(','));
            }
            this.consume(']');
            return extend(function (self, locals) {
                var array = [];
                for (var i = 0; i < elementFns.length; i++) {
                    array.push(elementFns[i](self, locals));
                }
                return array;
            }, {
                literal: true,
                constant: allConstant
            });
        },
        object: function () {
            var keyValues = [];
            var allConstant = true;
            if (this.peekToken().text !== '}') {
                do {
                    if (this.peek('}')) {
                        break;
                    }
                    var token = this.expect(), key = token.string || token.text;
                    this.consume(':');
                    var value = this.expression();
                    keyValues.push({
                        key: key,
                        value: value
                    });
                    if (!value.constant) {
                        allConstant = false;
                    }
                } while (this.expect(','));
            }
            this.consume('}');
            return extend(function (self, locals) {
                var object = {};
                for (var i = 0; i < keyValues.length; i++) {
                    var keyValue = keyValues[i];
                    object[keyValue.key] = keyValue.value(self, locals);
                }
                return object;
            }, {
                literal: true,
                constant: allConstant
            });
        }
    };
    function setter(obj, path, setValue, fullExp, options) {
        ensureSafeObject(obj, fullExp);
        options = options || {};
        var element = path.split('.'), key;
        for (var i = 0; element.length > 1; i++) {
            key = ensureSafeMemberName(element.shift(), fullExp);
            var propertyObj = ensureSafeObject(obj[key], fullExp);
            if (!propertyObj) {
                propertyObj = {};
                obj[key] = propertyObj;
            }
            obj = propertyObj;
            if (obj.then && options.unwrapPromises) {
                promiseWarning(fullExp);
                if (!('$$v' in obj)) {
                    (function (promise) {
                        promise.then(function (val) {
                            promise.$$v = val;
                        });
                    }(obj));
                }
                if (obj.$$v === undefined) {
                    obj.$$v = {};
                }
                obj = obj.$$v;
            }
        }
        key = ensureSafeMemberName(element.shift(), fullExp);
        ensureSafeObject(obj[key], fullExp);
        obj[key] = setValue;
        return setValue;
    }
    var getterFnCacheDefault = {};
    var getterFnCacheExpensive = {};
    function isPossiblyDangerousMemberName(name) {
        return name == 'constructor';
    }
    function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, options) {
        ensureSafeMemberName(key0, fullExp);
        ensureSafeMemberName(key1, fullExp);
        ensureSafeMemberName(key2, fullExp);
        ensureSafeMemberName(key3, fullExp);
        ensureSafeMemberName(key4, fullExp);
        var eso = function (o) {
            return ensureSafeObject(o, fullExp);
        };
        var expensiveChecks = options.expensiveChecks;
        var eso0 = expensiveChecks || isPossiblyDangerousMemberName(key0) ? eso : identity;
        var eso1 = expensiveChecks || isPossiblyDangerousMemberName(key1) ? eso : identity;
        var eso2 = expensiveChecks || isPossiblyDangerousMemberName(key2) ? eso : identity;
        var eso3 = expensiveChecks || isPossiblyDangerousMemberName(key3) ? eso : identity;
        var eso4 = expensiveChecks || isPossiblyDangerousMemberName(key4) ? eso : identity;
        return !options.unwrapPromises ? function cspSafeGetter(scope, locals) {
            var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
            if (pathVal == null)
                return pathVal;
            pathVal = eso0(pathVal[key0]);
            if (!key1)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso1(pathVal[key1]);
            if (!key2)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso2(pathVal[key2]);
            if (!key3)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso3(pathVal[key3]);
            if (!key4)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso4(pathVal[key4]);
            return pathVal;
        } : function cspSafePromiseEnabledGetter(scope, locals) {
            var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
            if (pathVal == null)
                return pathVal;
            pathVal = eso0(pathVal[key0]);
            if (pathVal && pathVal.then) {
                promiseWarning(fullExp);
                if (!('$$v' in pathVal)) {
                    promise = pathVal;
                    promise.$$v = undefined;
                    promise.then(function (val) {
                        promise.$$v = eso0(val);
                    });
                }
                pathVal = eso0(pathVal.$$v);
            }
            if (!key1)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso1(pathVal[key1]);
            if (pathVal && pathVal.then) {
                promiseWarning(fullExp);
                if (!('$$v' in pathVal)) {
                    promise = pathVal;
                    promise.$$v = undefined;
                    promise.then(function (val) {
                        promise.$$v = eso1(val);
                    });
                }
                pathVal = eso1(pathVal.$$v);
            }
            if (!key2)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso2(pathVal[key2]);
            if (pathVal && pathVal.then) {
                promiseWarning(fullExp);
                if (!('$$v' in pathVal)) {
                    promise = pathVal;
                    promise.$$v = undefined;
                    promise.then(function (val) {
                        promise.$$v = eso2(val);
                    });
                }
                pathVal = eso2(pathVal.$$v);
            }
            if (!key3)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso3(pathVal[key3]);
            if (pathVal && pathVal.then) {
                promiseWarning(fullExp);
                if (!('$$v' in pathVal)) {
                    promise = pathVal;
                    promise.$$v = undefined;
                    promise.then(function (val) {
                        promise.$$v = eso3(val);
                    });
                }
                pathVal = eso3(pathVal.$$v);
            }
            if (!key4)
                return pathVal;
            if (pathVal == null)
                return undefined;
            pathVal = eso4(pathVal[key4]);
            if (pathVal && pathVal.then) {
                promiseWarning(fullExp);
                if (!('$$v' in pathVal)) {
                    promise = pathVal;
                    promise.$$v = undefined;
                    promise.then(function (val) {
                        promise.$$v = eso4(val);
                    });
                }
                pathVal = eso4(pathVal.$$v);
            }
            return pathVal;
        };
    }
    function getterFnWithExtraArgs(fn, fullExpression) {
        return function (s, l) {
            return fn(s, l, promiseWarning, ensureSafeObject, fullExpression);
        };
    }
    function getterFn(path, options, fullExp) {
        var expensiveChecks = options.expensiveChecks;
        var getterFnCache = expensiveChecks ? getterFnCacheExpensive : getterFnCacheDefault;
        if (getterFnCache.hasOwnProperty(path)) {
            return getterFnCache[path];
        }
        var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
        if (options.csp) {
            if (pathKeysLength < 6) {
                fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, options);
            } else {
                fn = function (scope, locals) {
                    var i = 0, val;
                    do {
                        val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, options)(scope, locals);
                        locals = undefined;
                        scope = val;
                    } while (i < pathKeysLength);
                    return val;
                };
            }
        } else {
            var code = 'var p;\n';
            if (expensiveChecks) {
                code += 's = eso(s, fe);\nl = eso(l, fe);\n';
            }
            var needsEnsureSafeObject = expensiveChecks;
            forEach(pathKeys, function (key, index) {
                ensureSafeMemberName(key, fullExp);
                var lookupJs = (index ? 's' : '((l&&l.hasOwnProperty("' + key + '"))?l:s)') + '["' + key + '"]';
                var wrapWithEso = expensiveChecks || isPossiblyDangerousMemberName(key);
                if (wrapWithEso) {
                    lookupJs = 'eso(' + lookupJs + ', fe)';
                    needsEnsureSafeObject = true;
                }
                code += 'if(s == null) return undefined;\n' + 's=' + lookupJs + ';\n';
                if (options.unwrapPromises) {
                    code += 'if (s && s.then) {\n' + ' pw("' + fullExp.replace(/(["\r\n])/g, '\\$1') + '");\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=' + (wrapWithEso ? 'eso(v)' : 'v') + ';});\n' + '}\n' + ' s=' + (wrapWithEso ? 'eso(s.$$v)' : 's.$$v') + '\n' + '}\n';
                }
            });
            code += 'return s;';
            var evaledFnGetter = new Function('s', 'l', 'pw', 'eso', 'fe', code);
            evaledFnGetter.toString = valueFn(code);
            if (needsEnsureSafeObject || options.unwrapPromises) {
                evaledFnGetter = getterFnWithExtraArgs(evaledFnGetter, fullExp);
            }
            fn = evaledFnGetter;
        }
        if (path !== 'hasOwnProperty') {
            getterFnCache[path] = fn;
        }
        return fn;
    }
    function $ParseProvider() {
        var cacheDefault = {};
        var cacheExpensive = {};
        var $parseOptions = {
            csp: false,
            unwrapPromises: false,
            logPromiseWarnings: true,
            expensiveChecks: false
        };
        this.unwrapPromises = function (value) {
            if (isDefined(value)) {
                $parseOptions.unwrapPromises = !!value;
                return this;
            } else {
                return $parseOptions.unwrapPromises;
            }
        };
        this.logPromiseWarnings = function (value) {
            if (isDefined(value)) {
                $parseOptions.logPromiseWarnings = value;
                return this;
            } else {
                return $parseOptions.logPromiseWarnings;
            }
        };
        this.$get = [
            '$filter',
            '$sniffer',
            '$log',
            function ($filter, $sniffer, $log) {
                $parseOptions.csp = $sniffer.csp;
                var $parseOptionsExpensive = {
                    csp: $parseOptions.csp,
                    unwrapPromises: $parseOptions.unwrapPromises,
                    logPromiseWarnings: $parseOptions.logPromiseWarnings,
                    expensiveChecks: true
                };
                promiseWarning = function promiseWarningFn(fullExp) {
                    if (!$parseOptions.logPromiseWarnings || promiseWarningCache.hasOwnProperty(fullExp))
                        return;
                    promiseWarningCache[fullExp] = true;
                    $log.warn('[$parse] Promise found in the expression `' + fullExp + '`. ' + 'Automatic unwrapping of promises in Angular expressions is deprecated.');
                };
                return function (exp, expensiveChecks) {
                    var parsedExpression;
                    switch (typeof exp) {
                    case 'string':
                        var cache = expensiveChecks ? cacheExpensive : cacheDefault;
                        if (cache.hasOwnProperty(exp)) {
                            return cache[exp];
                        }
                        var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions;
                        var lexer = new Lexer(parseOptions);
                        var parser = new Parser(lexer, $filter, parseOptions);
                        parsedExpression = parser.parse(exp);
                        if (exp !== 'hasOwnProperty') {
                            cache[exp] = parsedExpression;
                        }
                        return parsedExpression;
                    case 'function':
                        return exp;
                    default:
                        return noop;
                    }
                };
            }
        ];
    }
    function $QProvider() {
        this.$get = [
            '$rootScope',
            '$exceptionHandler',
            function ($rootScope, $exceptionHandler) {
                return qFactory(function (callback) {
                    $rootScope.$evalAsync(callback);
                }, $exceptionHandler);
            }
        ];
    }
    function qFactory(nextTick, exceptionHandler) {
        var defer = function () {
            var pending = [], value, deferred;
            deferred = {
                resolve: function (val) {
                    if (pending) {
                        var callbacks = pending;
                        pending = undefined;
                        value = ref(val);
                        if (callbacks.length) {
                            nextTick(function () {
                                var callback;
                                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                                    callback = callbacks[i];
                                    value.then(callback[0], callback[1], callback[2]);
                                }
                            });
                        }
                    }
                },
                reject: function (reason) {
                    deferred.resolve(createInternalRejectedPromise(reason));
                },
                notify: function (progress) {
                    if (pending) {
                        var callbacks = pending;
                        if (pending.length) {
                            nextTick(function () {
                                var callback;
                                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                                    callback = callbacks[i];
                                    callback[2](progress);
                                }
                            });
                        }
                    }
                },
                promise: {
                    then: function (callback, errback, progressback) {
                        var result = defer();
                        var wrappedCallback = function (value) {
                            try {
                                result.resolve((isFunction(callback) ? callback : defaultCallback)(value));
                            } catch (e) {
                                result.reject(e);
                                exceptionHandler(e);
                            }
                        };
                        var wrappedErrback = function (reason) {
                            try {
                                result.resolve((isFunction(errback) ? errback : defaultErrback)(reason));
                            } catch (e) {
                                result.reject(e);
                                exceptionHandler(e);
                            }
                        };
                        var wrappedProgressback = function (progress) {
                            try {
                                result.notify((isFunction(progressback) ? progressback : defaultCallback)(progress));
                            } catch (e) {
                                exceptionHandler(e);
                            }
                        };
                        if (pending) {
                            pending.push([
                                wrappedCallback,
                                wrappedErrback,
                                wrappedProgressback
                            ]);
                        } else {
                            value.then(wrappedCallback, wrappedErrback, wrappedProgressback);
                        }
                        return result.promise;
                    },
                    'catch': function (callback) {
                        return this.then(null, callback);
                    },
                    'finally': function (callback) {
                        function makePromise(value, resolved) {
                            var result = defer();
                            if (resolved) {
                                result.resolve(value);
                            } else {
                                result.reject(value);
                            }
                            return result.promise;
                        }
                        function handleCallback(value, isResolved) {
                            var callbackOutput = null;
                            try {
                                callbackOutput = (callback || defaultCallback)();
                            } catch (e) {
                                return makePromise(e, false);
                            }
                            if (isPromiseLike(callbackOutput)) {
                                return callbackOutput.then(function () {
                                    return makePromise(value, isResolved);
                                }, function (error) {
                                    return makePromise(error, false);
                                });
                            } else {
                                return makePromise(value, isResolved);
                            }
                        }
                        return this.then(function (value) {
                            return handleCallback(value, true);
                        }, function (error) {
                            return handleCallback(error, false);
                        });
                    }
                }
            };
            return deferred;
        };
        var ref = function (value) {
            if (isPromiseLike(value))
                return value;
            return {
                then: function (callback) {
                    var result = defer();
                    nextTick(function () {
                        result.resolve(callback(value));
                    });
                    return result.promise;
                }
            };
        };
        var reject = function (reason) {
            var result = defer();
            result.reject(reason);
            return result.promise;
        };
        var createInternalRejectedPromise = function (reason) {
            return {
                then: function (callback, errback) {
                    var result = defer();
                    nextTick(function () {
                        try {
                            result.resolve((isFunction(errback) ? errback : defaultErrback)(reason));
                        } catch (e) {
                            result.reject(e);
                            exceptionHandler(e);
                        }
                    });
                    return result.promise;
                }
            };
        };
        var when = function (value, callback, errback, progressback) {
            var result = defer(), done;
            var wrappedCallback = function (value) {
                try {
                    return (isFunction(callback) ? callback : defaultCallback)(value);
                } catch (e) {
                    exceptionHandler(e);
                    return reject(e);
                }
            };
            var wrappedErrback = function (reason) {
                try {
                    return (isFunction(errback) ? errback : defaultErrback)(reason);
                } catch (e) {
                    exceptionHandler(e);
                    return reject(e);
                }
            };
            var wrappedProgressback = function (progress) {
                try {
                    return (isFunction(progressback) ? progressback : defaultCallback)(progress);
                } catch (e) {
                    exceptionHandler(e);
                }
            };
            nextTick(function () {
                ref(value).then(function (value) {
                    if (done)
                        return;
                    done = true;
                    result.resolve(ref(value).then(wrappedCallback, wrappedErrback, wrappedProgressback));
                }, function (reason) {
                    if (done)
                        return;
                    done = true;
                    result.resolve(wrappedErrback(reason));
                }, function (progress) {
                    if (done)
                        return;
                    result.notify(wrappedProgressback(progress));
                });
            });
            return result.promise;
        };
        function defaultCallback(value) {
            return value;
        }
        function defaultErrback(reason) {
            return reject(reason);
        }
        function all(promises) {
            var deferred = defer(), counter = 0, results = isArray(promises) ? [] : {};
            forEach(promises, function (promise, key) {
                counter++;
                ref(promise).then(function (value) {
                    if (results.hasOwnProperty(key))
                        return;
                    results[key] = value;
                    if (!--counter)
                        deferred.resolve(results);
                }, function (reason) {
                    if (results.hasOwnProperty(key))
                        return;
                    deferred.reject(reason);
                });
            });
            if (counter === 0) {
                deferred.resolve(results);
            }
            return deferred.promise;
        }
        return {
            defer: defer,
            reject: reject,
            when: when,
            all: all
        };
    }
    function $$RAFProvider() {
        this.$get = [
            '$window',
            '$timeout',
            function ($window, $timeout) {
                var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
                var cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.mozCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame;
                var rafSupported = !!requestAnimationFrame;
                var raf = rafSupported ? function (fn) {
                    var id = requestAnimationFrame(fn);
                    return function () {
                        cancelAnimationFrame(id);
                    };
                } : function (fn) {
                    var timer = $timeout(fn, 16.66, false);
                    return function () {
                        $timeout.cancel(timer);
                    };
                };
                raf.supported = rafSupported;
                return raf;
            }
        ];
    }
    function $RootScopeProvider() {
        var TTL = 10;
        var $rootScopeMinErr = minErr('$rootScope');
        var lastDirtyWatch = null;
        this.digestTtl = function (value) {
            if (arguments.length) {
                TTL = value;
            }
            return TTL;
        };
        this.$get = [
            '$injector',
            '$exceptionHandler',
            '$parse',
            '$browser',
            function ($injector, $exceptionHandler, $parse, $browser) {
                function Scope() {
                    this.$id = nextUid();
                    this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                    this['this'] = this.$root = this;
                    this.$$destroyed = false;
                    this.$$asyncQueue = [];
                    this.$$postDigestQueue = [];
                    this.$$listeners = {};
                    this.$$listenerCount = {};
                    this.$$isolateBindings = {};
                }
                Scope.prototype = {
                    constructor: Scope,
                    $new: function (isolate) {
                        var ChildScope, child;
                        if (isolate) {
                            child = new Scope();
                            child.$root = this.$root;
                            child.$$asyncQueue = this.$$asyncQueue;
                            child.$$postDigestQueue = this.$$postDigestQueue;
                        } else {
                            if (!this.$$childScopeClass) {
                                this.$$childScopeClass = function () {
                                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                                    this.$$listeners = {};
                                    this.$$listenerCount = {};
                                    this.$id = nextUid();
                                    this.$$childScopeClass = null;
                                };
                                this.$$childScopeClass.prototype = this;
                            }
                            child = new this.$$childScopeClass();
                        }
                        child['this'] = child;
                        child.$parent = this;
                        child.$$prevSibling = this.$$childTail;
                        if (this.$$childHead) {
                            this.$$childTail.$$nextSibling = child;
                            this.$$childTail = child;
                        } else {
                            this.$$childHead = this.$$childTail = child;
                        }
                        return child;
                    },
                    $watch: function (watchExp, listener, objectEquality) {
                        var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                                fn: listener,
                                last: initWatchVal,
                                get: get,
                                exp: watchExp,
                                eq: !!objectEquality
                            };
                        lastDirtyWatch = null;
                        if (!isFunction(listener)) {
                            var listenFn = compileToFn(listener || noop, 'listener');
                            watcher.fn = function (newVal, oldVal, scope) {
                                listenFn(scope);
                            };
                        }
                        if (typeof watchExp == 'string' && get.constant) {
                            var originalFn = watcher.fn;
                            watcher.fn = function (newVal, oldVal, scope) {
                                originalFn.call(this, newVal, oldVal, scope);
                                arrayRemove(array, watcher);
                            };
                        }
                        if (!array) {
                            array = scope.$$watchers = [];
                        }
                        array.unshift(watcher);
                        return function deregisterWatch() {
                            arrayRemove(array, watcher);
                            lastDirtyWatch = null;
                        };
                    },
                    $watchCollection: function (obj, listener) {
                        var self = this;
                        var newValue;
                        var oldValue;
                        var veryOldValue;
                        var trackVeryOldValue = listener.length > 1;
                        var changeDetected = 0;
                        var objGetter = $parse(obj);
                        var internalArray = [];
                        var internalObject = {};
                        var initRun = true;
                        var oldLength = 0;
                        function $watchCollectionWatch() {
                            newValue = objGetter(self);
                            var newLength, key, bothNaN;
                            if (!isObject(newValue)) {
                                if (oldValue !== newValue) {
                                    oldValue = newValue;
                                    changeDetected++;
                                }
                            } else if (isArrayLike(newValue)) {
                                if (oldValue !== internalArray) {
                                    oldValue = internalArray;
                                    oldLength = oldValue.length = 0;
                                    changeDetected++;
                                }
                                newLength = newValue.length;
                                if (oldLength !== newLength) {
                                    changeDetected++;
                                    oldValue.length = oldLength = newLength;
                                }
                                for (var i = 0; i < newLength; i++) {
                                    bothNaN = oldValue[i] !== oldValue[i] && newValue[i] !== newValue[i];
                                    if (!bothNaN && oldValue[i] !== newValue[i]) {
                                        changeDetected++;
                                        oldValue[i] = newValue[i];
                                    }
                                }
                            } else {
                                if (oldValue !== internalObject) {
                                    oldValue = internalObject = {};
                                    oldLength = 0;
                                    changeDetected++;
                                }
                                newLength = 0;
                                for (key in newValue) {
                                    if (newValue.hasOwnProperty(key)) {
                                        newLength++;
                                        if (oldValue.hasOwnProperty(key)) {
                                            bothNaN = oldValue[key] !== oldValue[key] && newValue[key] !== newValue[key];
                                            if (!bothNaN && oldValue[key] !== newValue[key]) {
                                                changeDetected++;
                                                oldValue[key] = newValue[key];
                                            }
                                        } else {
                                            oldLength++;
                                            oldValue[key] = newValue[key];
                                            changeDetected++;
                                        }
                                    }
                                }
                                if (oldLength > newLength) {
                                    changeDetected++;
                                    for (key in oldValue) {
                                        if (oldValue.hasOwnProperty(key) && !newValue.hasOwnProperty(key)) {
                                            oldLength--;
                                            delete oldValue[key];
                                        }
                                    }
                                }
                            }
                            return changeDetected;
                        }
                        function $watchCollectionAction() {
                            if (initRun) {
                                initRun = false;
                                listener(newValue, newValue, self);
                            } else {
                                listener(newValue, veryOldValue, self);
                            }
                            if (trackVeryOldValue) {
                                if (!isObject(newValue)) {
                                    veryOldValue = newValue;
                                } else if (isArrayLike(newValue)) {
                                    veryOldValue = new Array(newValue.length);
                                    for (var i = 0; i < newValue.length; i++) {
                                        veryOldValue[i] = newValue[i];
                                    }
                                } else {
                                    veryOldValue = {};
                                    for (var key in newValue) {
                                        if (hasOwnProperty.call(newValue, key)) {
                                            veryOldValue[key] = newValue[key];
                                        }
                                    }
                                }
                            }
                        }
                        return this.$watch($watchCollectionWatch, $watchCollectionAction);
                    },
                    $digest: function () {
                        var watch, value, last, watchers, asyncQueue = this.$$asyncQueue, postDigestQueue = this.$$postDigestQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg, asyncTask;
                        beginPhase('$digest');
                        $browser.$$checkUrlChange();
                        lastDirtyWatch = null;
                        do {
                            dirty = false;
                            current = target;
                            while (asyncQueue.length) {
                                try {
                                    asyncTask = asyncQueue.shift();
                                    asyncTask.scope.$eval(asyncTask.expression);
                                } catch (e) {
                                    clearPhase();
                                    $exceptionHandler(e);
                                }
                                lastDirtyWatch = null;
                            }
                            traverseScopesLoop:
                                do {
                                    if (watchers = current.$$watchers) {
                                        length = watchers.length;
                                        while (length--) {
                                            try {
                                                watch = watchers[length];
                                                if (watch) {
                                                    if ((value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value === 'number' && typeof last === 'number' && isNaN(value) && isNaN(last))) {
                                                        dirty = true;
                                                        lastDirtyWatch = watch;
                                                        watch.last = watch.eq ? copy(value, null) : value;
                                                        watch.fn(value, last === initWatchVal ? value : last, current);
                                                        if (ttl < 5) {
                                                            logIdx = 4 - ttl;
                                                            if (!watchLog[logIdx])
                                                                watchLog[logIdx] = [];
                                                            logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                                                            logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                                                            watchLog[logIdx].push(logMsg);
                                                        }
                                                    } else if (watch === lastDirtyWatch) {
                                                        dirty = false;
                                                        break traverseScopesLoop;
                                                    }
                                                }
                                            } catch (e) {
                                                clearPhase();
                                                $exceptionHandler(e);
                                            }
                                        }
                                    }
                                    if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                                        while (current !== target && !(next = current.$$nextSibling)) {
                                            current = current.$parent;
                                        }
                                    }
                                } while (current = next);
                            if ((dirty || asyncQueue.length) && !ttl--) {
                                clearPhase();
                                throw $rootScopeMinErr('infdig', '{0} $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: {1}', TTL, toJson(watchLog));
                            }
                        } while (dirty || asyncQueue.length);
                        clearPhase();
                        while (postDigestQueue.length) {
                            try {
                                postDigestQueue.shift()();
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                    },
                    $destroy: function () {
                        if (this.$$destroyed)
                            return;
                        var parent = this.$parent;
                        this.$broadcast('$destroy');
                        this.$$destroyed = true;
                        if (this === $rootScope)
                            return;
                        forEach(this.$$listenerCount, bind(null, decrementListenerCount, this));
                        if (parent.$$childHead == this)
                            parent.$$childHead = this.$$nextSibling;
                        if (parent.$$childTail == this)
                            parent.$$childTail = this.$$prevSibling;
                        if (this.$$prevSibling)
                            this.$$prevSibling.$$nextSibling = this.$$nextSibling;
                        if (this.$$nextSibling)
                            this.$$nextSibling.$$prevSibling = this.$$prevSibling;
                        this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null;
                        this.$$listeners = {};
                        this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [];
                        this.$destroy = this.$digest = this.$apply = noop;
                        this.$on = this.$watch = function () {
                            return noop;
                        };
                    },
                    $eval: function (expr, locals) {
                        return $parse(expr)(this, locals);
                    },
                    $evalAsync: function (expr) {
                        if (!$rootScope.$$phase && !$rootScope.$$asyncQueue.length) {
                            $browser.defer(function () {
                                if ($rootScope.$$asyncQueue.length) {
                                    $rootScope.$digest();
                                }
                            });
                        }
                        this.$$asyncQueue.push({
                            scope: this,
                            expression: expr
                        });
                    },
                    $$postDigest: function (fn) {
                        this.$$postDigestQueue.push(fn);
                    },
                    $apply: function (expr) {
                        try {
                            beginPhase('$apply');
                            return this.$eval(expr);
                        } catch (e) {
                            $exceptionHandler(e);
                        } finally {
                            clearPhase();
                            try {
                                $rootScope.$digest();
                            } catch (e) {
                                $exceptionHandler(e);
                                throw e;
                            }
                        }
                    },
                    $on: function (name, listener) {
                        var namedListeners = this.$$listeners[name];
                        if (!namedListeners) {
                            this.$$listeners[name] = namedListeners = [];
                        }
                        namedListeners.push(listener);
                        var current = this;
                        do {
                            if (!current.$$listenerCount[name]) {
                                current.$$listenerCount[name] = 0;
                            }
                            current.$$listenerCount[name]++;
                        } while (current = current.$parent);
                        var self = this;
                        return function () {
                            var indexOfListener = indexOf(namedListeners, listener);
                            if (indexOfListener !== -1) {
                                namedListeners[indexOfListener] = null;
                                decrementListenerCount(self, 1, name);
                            }
                        };
                    },
                    $emit: function (name, args) {
                        var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                                name: name,
                                targetScope: scope,
                                stopPropagation: function () {
                                    stopPropagation = true;
                                },
                                preventDefault: function () {
                                    event.defaultPrevented = true;
                                },
                                defaultPrevented: false
                            }, listenerArgs = concat([event], arguments, 1), i, length;
                        do {
                            namedListeners = scope.$$listeners[name] || empty;
                            event.currentScope = scope;
                            for (i = 0, length = namedListeners.length; i < length; i++) {
                                if (!namedListeners[i]) {
                                    namedListeners.splice(i, 1);
                                    i--;
                                    length--;
                                    continue;
                                }
                                try {
                                    namedListeners[i].apply(null, listenerArgs);
                                } catch (e) {
                                    $exceptionHandler(e);
                                }
                            }
                            if (stopPropagation)
                                return event;
                            scope = scope.$parent;
                        } while (scope);
                        return event;
                    },
                    $broadcast: function (name, args) {
                        var target = this, current = target, next = target, event = {
                                name: name,
                                targetScope: target,
                                preventDefault: function () {
                                    event.defaultPrevented = true;
                                },
                                defaultPrevented: false
                            }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
                        while (current = next) {
                            event.currentScope = current;
                            listeners = current.$$listeners[name] || [];
                            for (i = 0, length = listeners.length; i < length; i++) {
                                if (!listeners[i]) {
                                    listeners.splice(i, 1);
                                    i--;
                                    length--;
                                    continue;
                                }
                                try {
                                    listeners[i].apply(null, listenerArgs);
                                } catch (e) {
                                    $exceptionHandler(e);
                                }
                            }
                            if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling)) {
                                while (current !== target && !(next = current.$$nextSibling)) {
                                    current = current.$parent;
                                }
                            }
                        }
                        return event;
                    }
                };
                var $rootScope = new Scope();
                return $rootScope;
                function beginPhase(phase) {
                    if ($rootScope.$$phase) {
                        throw $rootScopeMinErr('inprog', '{0} already in progress', $rootScope.$$phase);
                    }
                    $rootScope.$$phase = phase;
                }
                function clearPhase() {
                    $rootScope.$$phase = null;
                }
                function compileToFn(exp, name) {
                    var fn = $parse(exp);
                    assertArgFn(fn, name);
                    return fn;
                }
                function decrementListenerCount(current, count, name) {
                    do {
                        current.$$listenerCount[name] -= count;
                        if (current.$$listenerCount[name] === 0) {
                            delete current.$$listenerCount[name];
                        }
                    } while (current = current.$parent);
                }
                function initWatchVal() {
                }
            }
        ];
    }
    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function (regexp) {
            if (isDefined(regexp)) {
                aHrefSanitizationWhitelist = regexp;
                return this;
            }
            return aHrefSanitizationWhitelist;
        };
        this.imgSrcSanitizationWhitelist = function (regexp) {
            if (isDefined(regexp)) {
                imgSrcSanitizationWhitelist = regexp;
                return this;
            }
            return imgSrcSanitizationWhitelist;
        };
        this.$get = function () {
            return function sanitizeUri(uri, isImage) {
                var regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                var normalizedVal;
                if (!msie || msie >= 8) {
                    normalizedVal = urlResolve(uri).href;
                    if (normalizedVal !== '' && !normalizedVal.match(regex)) {
                        return 'unsafe:' + normalizedVal;
                    }
                }
                return uri;
            };
        };
    }
    var $sceMinErr = minErr('$sce');
    var SCE_CONTEXTS = {
        HTML: 'html',
        CSS: 'css',
        URL: 'url',
        RESOURCE_URL: 'resourceUrl',
        JS: 'js'
    };
    function escapeForRegexp(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
    }
    function adjustMatcher(matcher) {
        if (matcher === 'self') {
            return matcher;
        } else if (isString(matcher)) {
            if (matcher.indexOf('***') > -1) {
                throw $sceMinErr('iwcard', 'Illegal sequence *** in string matcher.  String: {0}', matcher);
            }
            matcher = escapeForRegexp(matcher).replace('\\*\\*', '.*').replace('\\*', '[^:/.?&;]*');
            return new RegExp('^' + matcher + '$');
        } else if (isRegExp(matcher)) {
            return new RegExp('^' + matcher.source + '$');
        } else {
            throw $sceMinErr('imatcher', 'Matchers may only be "self", string patterns or RegExp objects');
        }
    }
    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        if (isDefined(matchers)) {
            forEach(matchers, function (matcher) {
                adjustedMatchers.push(adjustMatcher(matcher));
            });
        }
        return adjustedMatchers;
    }
    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = ['self'], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function (value) {
            if (arguments.length) {
                resourceUrlWhitelist = adjustMatchers(value);
            }
            return resourceUrlWhitelist;
        };
        this.resourceUrlBlacklist = function (value) {
            if (arguments.length) {
                resourceUrlBlacklist = adjustMatchers(value);
            }
            return resourceUrlBlacklist;
        };
        this.$get = [
            '$injector',
            function ($injector) {
                var htmlSanitizer = function htmlSanitizer(html) {
                    throw $sceMinErr('unsafe', 'Attempting to use an unsafe value in a safe context.');
                };
                if ($injector.has('$sanitize')) {
                    htmlSanitizer = $injector.get('$sanitize');
                }
                function matchUrl(matcher, parsedUrl) {
                    if (matcher === 'self') {
                        return urlIsSameOrigin(parsedUrl);
                    } else {
                        return !!matcher.exec(parsedUrl.href);
                    }
                }
                function isResourceUrlAllowedByPolicy(url) {
                    var parsedUrl = urlResolve(url.toString());
                    var i, n, allowed = false;
                    for (i = 0, n = resourceUrlWhitelist.length; i < n; i++) {
                        if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                            allowed = true;
                            break;
                        }
                    }
                    if (allowed) {
                        for (i = 0, n = resourceUrlBlacklist.length; i < n; i++) {
                            if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                                allowed = false;
                                break;
                            }
                        }
                    }
                    return allowed;
                }
                function generateHolderType(Base) {
                    var holderType = function TrustedValueHolderType(trustedValue) {
                        this.$$unwrapTrustedValue = function () {
                            return trustedValue;
                        };
                    };
                    if (Base) {
                        holderType.prototype = new Base();
                    }
                    holderType.prototype.valueOf = function sceValueOf() {
                        return this.$$unwrapTrustedValue();
                    };
                    holderType.prototype.toString = function sceToString() {
                        return this.$$unwrapTrustedValue().toString();
                    };
                    return holderType;
                }
                var trustedValueHolderBase = generateHolderType(), byType = {};
                byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase);
                byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase);
                byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase);
                byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase);
                byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]);
                function trustAs(type, trustedValue) {
                    var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                    if (!Constructor) {
                        throw $sceMinErr('icontext', 'Attempted to trust a value in invalid context. Context: {0}; Value: {1}', type, trustedValue);
                    }
                    if (trustedValue === null || trustedValue === undefined || trustedValue === '') {
                        return trustedValue;
                    }
                    if (typeof trustedValue !== 'string') {
                        throw $sceMinErr('itype', 'Attempted to trust a non-string value in a content requiring a string: Context: {0}', type);
                    }
                    return new Constructor(trustedValue);
                }
                function valueOf(maybeTrusted) {
                    if (maybeTrusted instanceof trustedValueHolderBase) {
                        return maybeTrusted.$$unwrapTrustedValue();
                    } else {
                        return maybeTrusted;
                    }
                }
                function getTrusted(type, maybeTrusted) {
                    if (maybeTrusted === null || maybeTrusted === undefined || maybeTrusted === '') {
                        return maybeTrusted;
                    }
                    var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                    if (constructor && maybeTrusted instanceof constructor) {
                        return maybeTrusted.$$unwrapTrustedValue();
                    }
                    if (type === SCE_CONTEXTS.RESOURCE_URL) {
                        if (isResourceUrlAllowedByPolicy(maybeTrusted)) {
                            return maybeTrusted;
                        } else {
                            throw $sceMinErr('insecurl', 'Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}', maybeTrusted.toString());
                        }
                    } else if (type === SCE_CONTEXTS.HTML) {
                        return htmlSanitizer(maybeTrusted);
                    }
                    throw $sceMinErr('unsafe', 'Attempting to use an unsafe value in a safe context.');
                }
                return {
                    trustAs: trustAs,
                    getTrusted: getTrusted,
                    valueOf: valueOf
                };
            }
        ];
    }
    function $SceProvider() {
        var enabled = true;
        this.enabled = function (value) {
            if (arguments.length) {
                enabled = !!value;
            }
            return enabled;
        };
        this.$get = [
            '$parse',
            '$sniffer',
            '$sceDelegate',
            function ($parse, $sniffer, $sceDelegate) {
                if (enabled && $sniffer.msie && $sniffer.msieDocumentMode < 8) {
                    throw $sceMinErr('iequirks', 'Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks ' + 'mode.  You can fix this by adding the text <!doctype html> to the top of your HTML ' + 'document.  See http://docs.angularjs.org/api/ng.$sce for more information.');
                }
                var sce = shallowCopy(SCE_CONTEXTS);
                sce.isEnabled = function () {
                    return enabled;
                };
                sce.trustAs = $sceDelegate.trustAs;
                sce.getTrusted = $sceDelegate.getTrusted;
                sce.valueOf = $sceDelegate.valueOf;
                if (!enabled) {
                    sce.trustAs = sce.getTrusted = function (type, value) {
                        return value;
                    };
                    sce.valueOf = identity;
                }
                sce.parseAs = function sceParseAs(type, expr) {
                    var parsed = $parse(expr);
                    if (parsed.literal && parsed.constant) {
                        return parsed;
                    } else {
                        return function sceParseAsTrusted(self, locals) {
                            return sce.getTrusted(type, parsed(self, locals));
                        };
                    }
                };
                var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
                forEach(SCE_CONTEXTS, function (enumValue, name) {
                    var lName = lowercase(name);
                    sce[camelCase('parse_as_' + lName)] = function (expr) {
                        return parse(enumValue, expr);
                    };
                    sce[camelCase('get_trusted_' + lName)] = function (value) {
                        return getTrusted(enumValue, value);
                    };
                    sce[camelCase('trust_as_' + lName)] = function (value) {
                        return trustAs(enumValue, value);
                    };
                });
                return sce;
            }
        ];
    }
    function $SnifferProvider() {
        this.$get = [
            '$window',
            '$document',
            function ($window, $document) {
                var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, documentMode = document.documentMode, vendorPrefix, vendorRegex = /^(Moz|webkit|O|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = false, animations = false, match;
                if (bodyStyle) {
                    for (var prop in bodyStyle) {
                        if (match = vendorRegex.exec(prop)) {
                            vendorPrefix = match[0];
                            vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                            break;
                        }
                    }
                    if (!vendorPrefix) {
                        vendorPrefix = 'WebkitOpacity' in bodyStyle && 'webkit';
                    }
                    transitions = !!('transition' in bodyStyle || vendorPrefix + 'Transition' in bodyStyle);
                    animations = !!('animation' in bodyStyle || vendorPrefix + 'Animation' in bodyStyle);
                    if (android && (!transitions || !animations)) {
                        transitions = isString(document.body.style.webkitTransition);
                        animations = isString(document.body.style.webkitAnimation);
                    }
                }
                return {
                    history: !!($window.history && $window.history.pushState && !(android < 4) && !boxee),
                    hashchange: 'onhashchange' in $window && (!documentMode || documentMode > 7),
                    hasEvent: function (event) {
                        if (event == 'input' && msie == 9)
                            return false;
                        if (isUndefined(eventSupport[event])) {
                            var divElm = document.createElement('div');
                            eventSupport[event] = 'on' + event in divElm;
                        }
                        return eventSupport[event];
                    },
                    csp: csp(),
                    vendorPrefix: vendorPrefix,
                    transitions: transitions,
                    animations: animations,
                    android: android,
                    msie: msie,
                    msieDocumentMode: documentMode
                };
            }
        ];
    }
    function $TimeoutProvider() {
        this.$get = [
            '$rootScope',
            '$browser',
            '$q',
            '$exceptionHandler',
            function ($rootScope, $browser, $q, $exceptionHandler) {
                var deferreds = {};
                function timeout(fn, delay, invokeApply) {
                    var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId;
                    timeoutId = $browser.defer(function () {
                        try {
                            deferred.resolve(fn());
                        } catch (e) {
                            deferred.reject(e);
                            $exceptionHandler(e);
                        } finally {
                            delete deferreds[promise.$$timeoutId];
                        }
                        if (!skipApply)
                            $rootScope.$apply();
                    }, delay);
                    promise.$$timeoutId = timeoutId;
                    deferreds[timeoutId] = deferred;
                    return promise;
                }
                timeout.cancel = function (promise) {
                    if (promise && promise.$$timeoutId in deferreds) {
                        deferreds[promise.$$timeoutId].reject('canceled');
                        delete deferreds[promise.$$timeoutId];
                        return $browser.defer.cancel(promise.$$timeoutId);
                    }
                    return false;
                };
                return timeout;
            }
        ];
    }
    var urlParsingNode = document.createElement('a');
    var originUrl = urlResolve(window.location.href, true);
    function urlResolve(url, base) {
        var href = url;
        if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
    }
    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host;
    }
    function $WindowProvider() {
        this.$get = valueFn(window);
    }
    $FilterProvider.$inject = ['$provide'];
    function $FilterProvider($provide) {
        var suffix = 'Filter';
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                forEach(name, function (filter, key) {
                    filters[key] = register(key, filter);
                });
                return filters;
            } else {
                return $provide.factory(name + suffix, factory);
            }
        }
        this.register = register;
        this.$get = [
            '$injector',
            function ($injector) {
                return function (name) {
                    return $injector.get(name + suffix);
                };
            }
        ];
        register('currency', currencyFilter);
        register('date', dateFilter);
        register('filter', filterFilter);
        register('json', jsonFilter);
        register('limitTo', limitToFilter);
        register('lowercase', lowercaseFilter);
        register('number', numberFilter);
        register('orderBy', orderByFilter);
        register('uppercase', uppercaseFilter);
    }
    function filterFilter() {
        return function (array, expression, comparator) {
            if (!isArray(array))
                return array;
            var comparatorType = typeof comparator, predicates = [];
            predicates.check = function (value) {
                for (var j = 0; j < predicates.length; j++) {
                    if (!predicates[j](value)) {
                        return false;
                    }
                }
                return true;
            };
            if (comparatorType !== 'function') {
                if (comparatorType === 'boolean' && comparator) {
                    comparator = function (obj, text) {
                        return angular.equals(obj, text);
                    };
                } else {
                    comparator = function (obj, text) {
                        if (obj && text && typeof obj === 'object' && typeof text === 'object') {
                            for (var objKey in obj) {
                                if (objKey.charAt(0) !== '$' && hasOwnProperty.call(obj, objKey) && comparator(obj[objKey], text[objKey])) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        text = ('' + text).toLowerCase();
                        return ('' + obj).toLowerCase().indexOf(text) > -1;
                    };
                }
            }
            var search = function (obj, text) {
                if (typeof text === 'string' && text.charAt(0) === '!') {
                    return !search(obj, text.substr(1));
                }
                switch (typeof obj) {
                case 'boolean':
                case 'number':
                case 'string':
                    return comparator(obj, text);
                case 'object':
                    switch (typeof text) {
                    case 'object':
                        return comparator(obj, text);
                    default:
                        for (var objKey in obj) {
                            if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
                                return true;
                            }
                        }
                        break;
                    }
                    return false;
                case 'array':
                    for (var i = 0; i < obj.length; i++) {
                        if (search(obj[i], text)) {
                            return true;
                        }
                    }
                    return false;
                default:
                    return false;
                }
            };
            switch (typeof expression) {
            case 'boolean':
            case 'number':
            case 'string':
                expression = { $: expression };
            case 'object':
                for (var key in expression) {
                    (function (path) {
                        if (typeof expression[path] === 'undefined')
                            return;
                        predicates.push(function (value) {
                            return search(path == '$' ? value : value && value[path], expression[path]);
                        });
                    }(key));
                }
                break;
            case 'function':
                predicates.push(expression);
                break;
            default:
                return array;
            }
            var filtered = [];
            for (var j = 0; j < array.length; j++) {
                var value = array[j];
                if (predicates.check(value)) {
                    filtered.push(value);
                }
            }
            return filtered;
        };
    }
    currencyFilter.$inject = ['$locale'];
    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function (amount, currencySymbol) {
            if (isUndefined(currencySymbol))
                currencySymbol = formats.CURRENCY_SYM;
            return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
        };
    }
    numberFilter.$inject = ['$locale'];
    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function (number, fractionSize) {
            return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
        };
    }
    var DECIMAL_SEP = '.';
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (number == null || !isFinite(number) || isObject(number))
            return '';
        var isNegative = number < 0;
        number = Math.abs(number);
        var numStr = number + '', formatedText = '', parts = [];
        var hasExponent = false;
        if (numStr.indexOf('e') !== -1) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            if (match && match[2] == '-' && match[3] > fractionSize + 1) {
                numStr = '0';
                number = 0;
            } else {
                formatedText = numStr;
                hasExponent = true;
            }
        }
        if (!hasExponent) {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
            if (isUndefined(fractionSize)) {
                fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
            }
            number = +(Math.round(+(number.toString() + 'e' + fractionSize)).toString() + 'e' + -fractionSize);
            if (number === 0) {
                isNegative = false;
            }
            var fraction = ('' + number).split(DECIMAL_SEP);
            var whole = fraction[0];
            fraction = fraction[1] || '';
            var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
            if (whole.length >= lgroup + group) {
                pos = whole.length - lgroup;
                for (i = 0; i < pos; i++) {
                    if ((pos - i) % group === 0 && i !== 0) {
                        formatedText += groupSep;
                    }
                    formatedText += whole.charAt(i);
                }
            }
            for (i = pos; i < whole.length; i++) {
                if ((whole.length - i) % lgroup === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
            while (fraction.length < fractionSize) {
                fraction += '0';
            }
            if (fractionSize && fractionSize !== '0')
                formatedText += decimalSep + fraction.substr(0, fractionSize);
        } else {
            if (fractionSize > 0 && number > -1 && number < 1) {
                formatedText = number.toFixed(fractionSize);
            }
        }
        parts.push(isNegative ? pattern.negPre : pattern.posPre);
        parts.push(formatedText);
        parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
        return parts.join('');
    }
    function padNumber(num, digits, trim) {
        var neg = '';
        if (num < 0) {
            neg = '-';
            num = -num;
        }
        num = '' + num;
        while (num.length < digits)
            num = '0' + num;
        if (trim)
            num = num.substr(num.length - digits);
        return neg + num;
    }
    function dateGetter(name, size, offset, trim) {
        offset = offset || 0;
        return function (date) {
            var value = date['get' + name]();
            if (offset > 0 || value > -offset)
                value += offset;
            if (value === 0 && offset == -12)
                value = 12;
            return padNumber(value, size, trim);
        };
    }
    function dateStrGetter(name, shortForm) {
        return function (date, formats) {
            var value = date['get' + name]();
            var get = uppercase(shortForm ? 'SHORT' + name : name);
            return formats[get][value];
        };
    }
    function timeZoneGetter(date) {
        var zone = -1 * date.getTimezoneOffset();
        var paddedZone = zone >= 0 ? '+' : '';
        paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
        return paddedZone;
    }
    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    var DATE_FORMATS = {
        yyyy: dateGetter('FullYear', 4),
        yy: dateGetter('FullYear', 2, 0, true),
        y: dateGetter('FullYear', 1),
        MMMM: dateStrGetter('Month'),
        MMM: dateStrGetter('Month', true),
        MM: dateGetter('Month', 2, 1),
        M: dateGetter('Month', 1, 1),
        dd: dateGetter('Date', 2),
        d: dateGetter('Date', 1),
        HH: dateGetter('Hours', 2),
        H: dateGetter('Hours', 1),
        hh: dateGetter('Hours', 2, -12),
        h: dateGetter('Hours', 1, -12),
        mm: dateGetter('Minutes', 2),
        m: dateGetter('Minutes', 1),
        ss: dateGetter('Seconds', 2),
        s: dateGetter('Seconds', 1),
        sss: dateGetter('Milliseconds', 3),
        EEEE: dateStrGetter('Day'),
        EEE: dateStrGetter('Day', true),
        a: ampmGetter,
        Z: timeZoneGetter
    };
    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = ['$locale'];
    function dateFilter($locale) {
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                if (match[9]) {
                    tzHour = int(match[9] + match[10]);
                    tzMin = int(match[9] + match[11]);
                }
                dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
                var h = int(match[4] || 0) - tzHour;
                var m = int(match[5] || 0) - tzMin;
                var s = int(match[6] || 0);
                var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
                timeSetter.call(date, h, m, s, ms);
                return date;
            }
            return string;
        }
        return function (date, format) {
            var text = '', parts = [], fn, match;
            format = format || 'mediumDate';
            format = $locale.DATETIME_FORMATS[format] || format;
            if (isString(date)) {
                date = NUMBER_STRING.test(date) ? int(date) : jsonStringToDate(date);
            }
            if (isNumber(date)) {
                date = new Date(date);
            }
            if (!isDate(date)) {
                return date;
            }
            while (format) {
                match = DATE_FORMATS_SPLIT.exec(format);
                if (match) {
                    parts = concat(parts, match, 1);
                    format = parts.pop();
                } else {
                    parts.push(format);
                    format = null;
                }
            }
            forEach(parts, function (value) {
                fn = DATE_FORMATS[value];
                text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
            });
            return text;
        };
    }
    function jsonFilter() {
        return function (object) {
            return toJson(object, true);
        };
    }
    var lowercaseFilter = valueFn(lowercase);
    var uppercaseFilter = valueFn(uppercase);
    function limitToFilter() {
        return function (input, limit) {
            if (!isArray(input) && !isString(input))
                return input;
            if (Math.abs(Number(limit)) === Infinity) {
                limit = Number(limit);
            } else {
                limit = int(limit);
            }
            if (limit) {
                return limit > 0 ? input.slice(0, limit) : input.slice(limit);
            } else {
                return isString(input) ? '' : [];
            }
        };
    }
    orderByFilter.$inject = ['$parse'];
    function orderByFilter($parse) {
        return function (array, sortPredicate, reverseOrder) {
            if (!isArrayLike(array))
                return array;
            sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
            if (sortPredicate.length === 0) {
                sortPredicate = ['+'];
            }
            sortPredicate = map(sortPredicate, function (predicate) {
                var descending = false, get = predicate || identity;
                if (isString(predicate)) {
                    if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
                        descending = predicate.charAt(0) == '-';
                        predicate = predicate.substring(1);
                    }
                    if (predicate === '') {
                        return reverseComparator(function (a, b) {
                            return compare(a, b);
                        }, descending);
                    }
                    get = $parse(predicate);
                    if (get.constant) {
                        var key = get();
                        return reverseComparator(function (a, b) {
                            return compare(a[key], b[key]);
                        }, descending);
                    }
                }
                return reverseComparator(function (a, b) {
                    return compare(get(a), get(b));
                }, descending);
            });
            return slice.call(array).sort(reverseComparator(comparator, reverseOrder));
            function comparator(o1, o2) {
                for (var i = 0; i < sortPredicate.length; i++) {
                    var comp = sortPredicate[i](o1, o2);
                    if (comp !== 0)
                        return comp;
                }
                return 0;
            }
            function reverseComparator(comp, descending) {
                return toBoolean(descending) ? function (a, b) {
                    return comp(b, a);
                } : comp;
            }
            function compare(v1, v2) {
                var t1 = typeof v1;
                var t2 = typeof v2;
                if (t1 == t2) {
                    if (isDate(v1) && isDate(v2)) {
                        v1 = v1.valueOf();
                        v2 = v2.valueOf();
                    }
                    if (t1 == 'string') {
                        v1 = v1.toLowerCase();
                        v2 = v2.toLowerCase();
                    }
                    if (v1 === v2)
                        return 0;
                    return v1 < v2 ? -1 : 1;
                } else {
                    return t1 < t2 ? -1 : 1;
                }
            }
        };
    }
    function ngDirective(directive) {
        if (isFunction(directive)) {
            directive = { link: directive };
        }
        directive.restrict = directive.restrict || 'AC';
        return valueFn(directive);
    }
    var htmlAnchorDirective = valueFn({
        restrict: 'E',
        compile: function (element, attr) {
            if (msie <= 8) {
                if (!attr.href && !attr.name) {
                    attr.$set('href', '');
                }
                element.append(document.createComment('IE fix'));
            }
            if (!attr.href && !attr.xlinkHref && !attr.name) {
                return function (scope, element) {
                    var href = toString.call(element.prop('href')) === '[object SVGAnimatedString]' ? 'xlink:href' : 'href';
                    element.on('click', function (event) {
                        if (!element.attr(href)) {
                            event.preventDefault();
                        }
                    });
                };
            }
        }
    });
    var ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function (propName, attrName) {
        if (propName == 'multiple')
            return;
        var normalized = directiveNormalize('ng-' + attrName);
        ngAttributeAliasDirectives[normalized] = function () {
            return {
                priority: 100,
                link: function (scope, element, attr) {
                    scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
                        attr.$set(attrName, !!value);
                    });
                }
            };
        };
    });
    forEach([
        'src',
        'srcset',
        'href'
    ], function (attrName) {
        var normalized = directiveNormalize('ng-' + attrName);
        ngAttributeAliasDirectives[normalized] = function () {
            return {
                priority: 99,
                link: function (scope, element, attr) {
                    var propName = attrName, name = attrName;
                    if (attrName === 'href' && toString.call(element.prop('href')) === '[object SVGAnimatedString]') {
                        name = 'xlinkHref';
                        attr.$attr[name] = 'xlink:href';
                        propName = null;
                    }
                    attr.$observe(normalized, function (value) {
                        if (!value) {
                            if (attrName === 'href') {
                                attr.$set(name, null);
                            }
                            return;
                        }
                        attr.$set(name, value);
                        if (msie && propName)
                            element.prop(propName, attr[name]);
                    });
                }
            };
        };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop
    };
    FormController.$inject = [
        '$element',
        '$attrs',
        '$scope',
        '$animate'
    ];
    function FormController(element, attrs, $scope, $animate) {
        var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {}, controls = [];
        form.$name = attrs.name || attrs.ngForm;
        form.$dirty = false;
        form.$pristine = true;
        form.$valid = true;
        form.$invalid = false;
        parentForm.$addControl(form);
        element.addClass(PRISTINE_CLASS);
        toggleValidCss(true);
        function toggleValidCss(isValid, validationErrorKey) {
            validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
            $animate.setClass(element, (isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey, (isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey);
        }
        form.$addControl = function (control) {
            assertNotHasOwnProperty(control.$name, 'input');
            controls.push(control);
            if (control.$name) {
                form[control.$name] = control;
            }
        };
        form.$removeControl = function (control) {
            if (control.$name && form[control.$name] === control) {
                delete form[control.$name];
            }
            forEach(errors, function (queue, validationToken) {
                form.$setValidity(validationToken, true, control);
            });
            arrayRemove(controls, control);
        };
        form.$setValidity = function (validationToken, isValid, control) {
            var queue = errors[validationToken];
            if (isValid) {
                if (queue) {
                    arrayRemove(queue, control);
                    if (!queue.length) {
                        invalidCount--;
                        if (!invalidCount) {
                            toggleValidCss(isValid);
                            form.$valid = true;
                            form.$invalid = false;
                        }
                        errors[validationToken] = false;
                        toggleValidCss(true, validationToken);
                        parentForm.$setValidity(validationToken, true, form);
                    }
                }
            } else {
                if (!invalidCount) {
                    toggleValidCss(isValid);
                }
                if (queue) {
                    if (includes(queue, control))
                        return;
                } else {
                    errors[validationToken] = queue = [];
                    invalidCount++;
                    toggleValidCss(false, validationToken);
                    parentForm.$setValidity(validationToken, false, form);
                }
                queue.push(control);
                form.$valid = false;
                form.$invalid = true;
            }
        };
        form.$setDirty = function () {
            $animate.removeClass(element, PRISTINE_CLASS);
            $animate.addClass(element, DIRTY_CLASS);
            form.$dirty = true;
            form.$pristine = false;
            parentForm.$setDirty();
        };
        form.$setPristine = function () {
            $animate.removeClass(element, DIRTY_CLASS);
            $animate.addClass(element, PRISTINE_CLASS);
            form.$dirty = false;
            form.$pristine = true;
            forEach(controls, function (control) {
                control.$setPristine();
            });
        };
    }
    var formDirectiveFactory = function (isNgForm) {
        return [
            '$timeout',
            function ($timeout) {
                var formDirective = {
                    name: 'form',
                    restrict: isNgForm ? 'EAC' : 'E',
                    controller: FormController,
                    compile: function () {
                        return {
                            pre: function (scope, formElement, attr, controller) {
                                if (!attr.action) {
                                    var preventDefaultListener = function (event) {
                                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                                    };
                                    addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                                    formElement.on('$destroy', function () {
                                        $timeout(function () {
                                            removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                                        }, 0, false);
                                    });
                                }
                                var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                                if (alias) {
                                    setter(scope, alias, controller, alias);
                                }
                                if (parentFormCtrl) {
                                    formElement.on('$destroy', function () {
                                        parentFormCtrl.$removeControl(controller);
                                        if (alias) {
                                            setter(scope, alias, undefined, alias);
                                        }
                                        extend(controller, nullFormCtrl);
                                    });
                                }
                            }
                        };
                    }
                };
                return formDirective;
            }
        ];
    };
    var formDirective = formDirectiveFactory();
    var ngFormDirective = formDirectiveFactory(true);
    var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
    var inputType = {
        'text': textInputType,
        'number': numberInputType,
        'url': urlInputType,
        'email': emailInputType,
        'radio': radioInputType,
        'checkbox': checkboxInputType,
        'hidden': noop,
        'button': noop,
        'submit': noop,
        'reset': noop,
        'file': noop
    };
    function validate(ctrl, validatorName, validity, value) {
        ctrl.$setValidity(validatorName, validity);
        return validity ? value : undefined;
    }
    function testFlags(validity, flags) {
        var i, flag;
        if (flags) {
            for (i = 0; i < flags.length; ++i) {
                flag = flags[i];
                if (validity[flag]) {
                    return true;
                }
            }
        }
        return false;
    }
    function addNativeHtml5Validators(ctrl, validatorName, badFlags, ignoreFlags, validity) {
        if (isObject(validity)) {
            ctrl.$$hasNativeValidators = true;
            var validator = function (value) {
                if (!ctrl.$error[validatorName] && !testFlags(validity, ignoreFlags) && testFlags(validity, badFlags)) {
                    ctrl.$setValidity(validatorName, false);
                    return;
                }
                return value;
            };
            ctrl.$parsers.push(validator);
        }
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var validity = element.prop(VALIDITY_STATE_PROPERTY);
        var placeholder = element[0].placeholder, noevent = {};
        var type = lowercase(element[0].type);
        ctrl.$$validityState = validity;
        if (!$sniffer.android) {
            var composing = false;
            element.on('compositionstart', function (data) {
                composing = true;
            });
            element.on('compositionend', function () {
                composing = false;
                listener();
            });
        }
        var listener = function (ev) {
            if (composing)
                return;
            var value = element.val();
            if (msie && (ev || noevent).type === 'input' && element[0].placeholder !== placeholder) {
                placeholder = element[0].placeholder;
                return;
            }
            if (type !== 'password' && toBoolean(attr.ngTrim || 'T')) {
                value = trim(value);
            }
            var revalidate = validity && ctrl.$$hasNativeValidators;
            if (ctrl.$viewValue !== value || value === '' && revalidate) {
                if (scope.$root.$$phase) {
                    ctrl.$setViewValue(value);
                } else {
                    scope.$apply(function () {
                        ctrl.$setViewValue(value);
                    });
                }
            }
        };
        if ($sniffer.hasEvent('input')) {
            element.on('input', listener);
        } else {
            var timeout;
            var deferListener = function () {
                if (!timeout) {
                    timeout = $browser.defer(function () {
                        listener();
                        timeout = null;
                    });
                }
            };
            element.on('keydown', function (event) {
                var key = event.keyCode;
                if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
                    return;
                deferListener();
            });
            if ($sniffer.hasEvent('paste')) {
                element.on('paste cut', deferListener);
            }
        }
        element.on('change', listener);
        ctrl.$render = function () {
            element.val(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
        };
        var pattern = attr.ngPattern, patternValidator, match;
        if (pattern) {
            var validateRegex = function (regexp, value) {
                return validate(ctrl, 'pattern', ctrl.$isEmpty(value) || regexp.test(value), value);
            };
            match = pattern.match(/^\/(.*)\/([gim]*)$/);
            if (match) {
                pattern = new RegExp(match[1], match[2]);
                patternValidator = function (value) {
                    return validateRegex(pattern, value);
                };
            } else {
                patternValidator = function (value) {
                    var patternObj = scope.$eval(pattern);
                    if (!patternObj || !patternObj.test) {
                        throw minErr('ngPattern')('noregexp', 'Expected {0} to be a RegExp but was {1}. Element: {2}', pattern, patternObj, startingTag(element));
                    }
                    return validateRegex(patternObj, value);
                };
            }
            ctrl.$formatters.push(patternValidator);
            ctrl.$parsers.push(patternValidator);
        }
        if (attr.ngMinlength) {
            var minlength = int(attr.ngMinlength);
            var minLengthValidator = function (value) {
                return validate(ctrl, 'minlength', ctrl.$isEmpty(value) || value.length >= minlength, value);
            };
            ctrl.$parsers.push(minLengthValidator);
            ctrl.$formatters.push(minLengthValidator);
        }
        if (attr.ngMaxlength) {
            var maxlength = int(attr.ngMaxlength);
            var maxLengthValidator = function (value) {
                return validate(ctrl, 'maxlength', ctrl.$isEmpty(value) || value.length <= maxlength, value);
            };
            ctrl.$parsers.push(maxLengthValidator);
            ctrl.$formatters.push(maxLengthValidator);
        }
    }
    var numberBadFlags = ['badInput'];
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        textInputType(scope, element, attr, ctrl, $sniffer, $browser);
        ctrl.$parsers.push(function (value) {
            var empty = ctrl.$isEmpty(value);
            if (empty || NUMBER_REGEXP.test(value)) {
                ctrl.$setValidity('number', true);
                return value === '' ? null : empty ? value : parseFloat(value);
            } else {
                ctrl.$setValidity('number', false);
                return undefined;
            }
        });
        addNativeHtml5Validators(ctrl, 'number', numberBadFlags, null, ctrl.$$validityState);
        ctrl.$formatters.push(function (value) {
            return ctrl.$isEmpty(value) ? '' : '' + value;
        });
        if (attr.min) {
            var minValidator = function (value) {
                var min = parseFloat(attr.min);
                return validate(ctrl, 'min', ctrl.$isEmpty(value) || value >= min, value);
            };
            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
        if (attr.max) {
            var maxValidator = function (value) {
                var max = parseFloat(attr.max);
                return validate(ctrl, 'max', ctrl.$isEmpty(value) || value <= max, value);
            };
            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
        ctrl.$formatters.push(function (value) {
            return validate(ctrl, 'number', ctrl.$isEmpty(value) || isNumber(value), value);
        });
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        textInputType(scope, element, attr, ctrl, $sniffer, $browser);
        var urlValidator = function (value) {
            return validate(ctrl, 'url', ctrl.$isEmpty(value) || URL_REGEXP.test(value), value);
        };
        ctrl.$formatters.push(urlValidator);
        ctrl.$parsers.push(urlValidator);
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        textInputType(scope, element, attr, ctrl, $sniffer, $browser);
        var emailValidator = function (value) {
            return validate(ctrl, 'email', ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value), value);
        };
        ctrl.$formatters.push(emailValidator);
        ctrl.$parsers.push(emailValidator);
    }
    function radioInputType(scope, element, attr, ctrl) {
        if (isUndefined(attr.name)) {
            element.attr('name', nextUid());
        }
        element.on('click', function () {
            if (element[0].checked) {
                scope.$apply(function () {
                    ctrl.$setViewValue(attr.value);
                });
            }
        });
        ctrl.$render = function () {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue;
        };
        attr.$observe('value', ctrl.$render);
    }
    function checkboxInputType(scope, element, attr, ctrl) {
        var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
        if (!isString(trueValue))
            trueValue = true;
        if (!isString(falseValue))
            falseValue = false;
        element.on('click', function () {
            scope.$apply(function () {
                ctrl.$setViewValue(element[0].checked);
            });
        });
        ctrl.$render = function () {
            element[0].checked = ctrl.$viewValue;
        };
        ctrl.$isEmpty = function (value) {
            return value !== trueValue;
        };
        ctrl.$formatters.push(function (value) {
            return value === trueValue;
        });
        ctrl.$parsers.push(function (value) {
            return value ? trueValue : falseValue;
        });
    }
    var inputDirective = [
        '$browser',
        '$sniffer',
        function ($browser, $sniffer) {
            return {
                restrict: 'E',
                require: '?ngModel',
                link: function (scope, element, attr, ctrl) {
                    if (ctrl) {
                        (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
                    }
                }
            };
        }
    ];
    var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
    var NgModelController = [
        '$scope',
        '$exceptionHandler',
        '$attrs',
        '$element',
        '$parse',
        '$animate',
        function ($scope, $exceptionHandler, $attr, $element, $parse, $animate) {
            this.$viewValue = Number.NaN;
            this.$modelValue = Number.NaN;
            this.$parsers = [];
            this.$formatters = [];
            this.$viewChangeListeners = [];
            this.$pristine = true;
            this.$dirty = false;
            this.$valid = true;
            this.$invalid = false;
            this.$name = $attr.name;
            var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
            if (!ngModelSet) {
                throw minErr('ngModel')('nonassign', 'Expression \'{0}\' is non-assignable. Element: {1}', $attr.ngModel, startingTag($element));
            }
            this.$render = noop;
            this.$isEmpty = function (value) {
                return isUndefined(value) || value === '' || value === null || value !== value;
            };
            var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
            $element.addClass(PRISTINE_CLASS);
            toggleValidCss(true);
            function toggleValidCss(isValid, validationErrorKey) {
                validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
                $animate.removeClass($element, (isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey);
                $animate.addClass($element, (isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
            }
            this.$setValidity = function (validationErrorKey, isValid) {
                if ($error[validationErrorKey] === !isValid)
                    return;
                if (isValid) {
                    if ($error[validationErrorKey])
                        invalidCount--;
                    if (!invalidCount) {
                        toggleValidCss(true);
                        this.$valid = true;
                        this.$invalid = false;
                    }
                } else {
                    toggleValidCss(false);
                    this.$invalid = true;
                    this.$valid = false;
                    invalidCount++;
                }
                $error[validationErrorKey] = !isValid;
                toggleValidCss(isValid, validationErrorKey);
                parentForm.$setValidity(validationErrorKey, isValid, this);
            };
            this.$setPristine = function () {
                this.$dirty = false;
                this.$pristine = true;
                $animate.removeClass($element, DIRTY_CLASS);
                $animate.addClass($element, PRISTINE_CLASS);
            };
            this.$setViewValue = function (value) {
                this.$viewValue = value;
                if (this.$pristine) {
                    this.$dirty = true;
                    this.$pristine = false;
                    $animate.removeClass($element, PRISTINE_CLASS);
                    $animate.addClass($element, DIRTY_CLASS);
                    parentForm.$setDirty();
                }
                forEach(this.$parsers, function (fn) {
                    value = fn(value);
                });
                if (this.$modelValue !== value) {
                    this.$modelValue = value;
                    ngModelSet($scope, value);
                    forEach(this.$viewChangeListeners, function (listener) {
                        try {
                            listener();
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    });
                }
            };
            var ctrl = this;
            $scope.$watch(function ngModelWatch() {
                var value = ngModelGet($scope);
                if (ctrl.$modelValue !== value) {
                    var formatters = ctrl.$formatters, idx = formatters.length;
                    ctrl.$modelValue = value;
                    while (idx--) {
                        value = formatters[idx](value);
                    }
                    if (ctrl.$viewValue !== value) {
                        ctrl.$viewValue = value;
                        ctrl.$render();
                    }
                }
                return value;
            });
        }
    ];
    var ngModelDirective = function () {
        return {
            require: [
                'ngModel',
                '^?form'
            ],
            controller: NgModelController,
            link: function (scope, element, attr, ctrls) {
                var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
                formCtrl.$addControl(modelCtrl);
                scope.$on('$destroy', function () {
                    formCtrl.$removeControl(modelCtrl);
                });
            }
        };
    };
    var ngChangeDirective = valueFn({
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function () {
                scope.$eval(attr.ngChange);
            });
        }
    });
    var requiredDirective = function () {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl)
                    return;
                attr.required = true;
                var validator = function (value) {
                    if (attr.required && ctrl.$isEmpty(value)) {
                        ctrl.$setValidity('required', false);
                        return;
                    } else {
                        ctrl.$setValidity('required', true);
                        return value;
                    }
                };
                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);
                attr.$observe('required', function () {
                    validator(ctrl.$viewValue);
                });
            }
        };
    };
    var ngListDirective = function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
                var parse = function (viewValue) {
                    if (isUndefined(viewValue))
                        return;
                    var list = [];
                    if (viewValue) {
                        forEach(viewValue.split(separator), function (value) {
                            if (value)
                                list.push(trim(value));
                        });
                    }
                    return list;
                };
                ctrl.$parsers.push(parse);
                ctrl.$formatters.push(function (value) {
                    if (isArray(value)) {
                        return value.join(', ');
                    }
                    return undefined;
                });
                ctrl.$isEmpty = function (value) {
                    return !value || !value.length;
                };
            }
        };
    };
    var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
    var ngValueDirective = function () {
        return {
            priority: 100,
            compile: function (tpl, tplAttr) {
                if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
                    return function ngValueConstantLink(scope, elm, attr) {
                        attr.$set('value', scope.$eval(attr.ngValue));
                    };
                } else {
                    return function ngValueLink(scope, elm, attr) {
                        scope.$watch(attr.ngValue, function valueWatchAction(value) {
                            attr.$set('value', value);
                        });
                    };
                }
            }
        };
    };
    var ngBindDirective = ngDirective({
        compile: function (templateElement) {
            templateElement.addClass('ng-binding');
            return function (scope, element, attr) {
                element.data('$binding', attr.ngBind);
                scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
                    element.text(value == undefined ? '' : value);
                });
            };
        }
    });
    var ngBindTemplateDirective = [
        '$interpolate',
        function ($interpolate) {
            return function (scope, element, attr) {
                var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                element.addClass('ng-binding').data('$binding', interpolateFn);
                attr.$observe('ngBindTemplate', function (value) {
                    element.text(value);
                });
            };
        }
    ];
    var ngBindHtmlDirective = [
        '$sce',
        '$parse',
        function ($sce, $parse) {
            return {
                compile: function (tElement) {
                    tElement.addClass('ng-binding');
                    return function (scope, element, attr) {
                        element.data('$binding', attr.ngBindHtml);
                        var parsed = $parse(attr.ngBindHtml);
                        function getStringValue() {
                            return (parsed(scope) || '').toString();
                        }
                        scope.$watch(getStringValue, function ngBindHtmlWatchAction(value) {
                            element.html($sce.getTrustedHtml(parsed(scope)) || '');
                        });
                    };
                }
            };
        }
    ];
    function classDirective(name, selector) {
        name = 'ngClass' + name;
        return [
            '$animate',
            function ($animate) {
                return {
                    restrict: 'AC',
                    link: function (scope, element, attr) {
                        var oldVal;
                        scope.$watch(attr[name], ngClassWatchAction, true);
                        attr.$observe('class', function (value) {
                            ngClassWatchAction(scope.$eval(attr[name]));
                        });
                        if (name !== 'ngClass') {
                            scope.$watch('$index', function ($index, old$index) {
                                var mod = $index & 1;
                                if (mod !== (old$index & 1)) {
                                    var classes = arrayClasses(scope.$eval(attr[name]));
                                    mod === selector ? addClasses(classes) : removeClasses(classes);
                                }
                            });
                        }
                        function addClasses(classes) {
                            var newClasses = digestClassCounts(classes, 1);
                            attr.$addClass(newClasses);
                        }
                        function removeClasses(classes) {
                            var newClasses = digestClassCounts(classes, -1);
                            attr.$removeClass(newClasses);
                        }
                        function digestClassCounts(classes, count) {
                            var classCounts = element.data('$classCounts') || {};
                            var classesToUpdate = [];
                            forEach(classes, function (className) {
                                if (count > 0 || classCounts[className]) {
                                    classCounts[className] = (classCounts[className] || 0) + count;
                                    if (classCounts[className] === +(count > 0)) {
                                        classesToUpdate.push(className);
                                    }
                                }
                            });
                            element.data('$classCounts', classCounts);
                            return classesToUpdate.join(' ');
                        }
                        function updateClasses(oldClasses, newClasses) {
                            var toAdd = arrayDifference(newClasses, oldClasses);
                            var toRemove = arrayDifference(oldClasses, newClasses);
                            toRemove = digestClassCounts(toRemove, -1);
                            toAdd = digestClassCounts(toAdd, 1);
                            if (toAdd.length === 0) {
                                $animate.removeClass(element, toRemove);
                            } else if (toRemove.length === 0) {
                                $animate.addClass(element, toAdd);
                            } else {
                                $animate.setClass(element, toAdd, toRemove);
                            }
                        }
                        function ngClassWatchAction(newVal) {
                            if (selector === true || scope.$index % 2 === selector) {
                                var newClasses = arrayClasses(newVal || []);
                                if (!oldVal) {
                                    addClasses(newClasses);
                                } else if (!equals(newVal, oldVal)) {
                                    var oldClasses = arrayClasses(oldVal);
                                    updateClasses(oldClasses, newClasses);
                                }
                            }
                            oldVal = shallowCopy(newVal);
                        }
                    }
                };
                function arrayDifference(tokens1, tokens2) {
                    var values = [];
                    outer:
                        for (var i = 0; i < tokens1.length; i++) {
                            var token = tokens1[i];
                            for (var j = 0; j < tokens2.length; j++) {
                                if (token == tokens2[j])
                                    continue outer;
                            }
                            values.push(token);
                        }
                    return values;
                }
                function arrayClasses(classVal) {
                    if (isArray(classVal)) {
                        return classVal;
                    } else if (isString(classVal)) {
                        return classVal.split(' ');
                    } else if (isObject(classVal)) {
                        var classes = [], i = 0;
                        forEach(classVal, function (v, k) {
                            if (v) {
                                classes = classes.concat(k.split(' '));
                            }
                        });
                        return classes;
                    }
                    return classVal;
                }
            }
        ];
    }
    var ngClassDirective = classDirective('', true);
    var ngClassOddDirective = classDirective('Odd', 0);
    var ngClassEvenDirective = classDirective('Even', 1);
    var ngCloakDirective = ngDirective({
        compile: function (element, attr) {
            attr.$set('ngCloak', undefined);
            element.removeClass('ng-cloak');
        }
    });
    var ngControllerDirective = [function () {
            return {
                scope: true,
                controller: '@',
                priority: 500
            };
        }];
    var ngEventDirectives = {};
    var forceAsyncEvents = {
        'blur': true,
        'focus': true
    };
    forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '), function (eventName) {
        var directiveName = directiveNormalize('ng-' + eventName);
        ngEventDirectives[directiveName] = [
            '$parse',
            '$rootScope',
            function ($parse, $rootScope) {
                return {
                    compile: function ($element, attr) {
                        var fn = $parse(attr[directiveName], true);
                        return function ngEventHandler(scope, element) {
                            element.on(eventName, function (event) {
                                var callback = function () {
                                    fn(scope, { $event: event });
                                };
                                if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
                                    scope.$evalAsync(callback);
                                } else {
                                    scope.$apply(callback);
                                }
                            });
                        };
                    }
                };
            }
        ];
    });
    var ngIfDirective = [
        '$animate',
        function ($animate) {
            return {
                transclude: 'element',
                priority: 600,
                terminal: true,
                restrict: 'A',
                $$tlb: true,
                link: function ($scope, $element, $attr, ctrl, $transclude) {
                    var block, childScope, previousElements;
                    $scope.$watch($attr.ngIf, function ngIfWatchAction(value) {
                        if (toBoolean(value)) {
                            if (!childScope) {
                                childScope = $scope.$new();
                                $transclude(childScope, function (clone) {
                                    clone[clone.length++] = document.createComment(' end ngIf: ' + $attr.ngIf + ' ');
                                    block = { clone: clone };
                                    $animate.enter(clone, $element.parent(), $element);
                                });
                            }
                        } else {
                            if (previousElements) {
                                previousElements.remove();
                                previousElements = null;
                            }
                            if (childScope) {
                                childScope.$destroy();
                                childScope = null;
                            }
                            if (block) {
                                previousElements = getBlockElements(block.clone);
                                $animate.leave(previousElements, function () {
                                    previousElements = null;
                                });
                                block = null;
                            }
                        }
                    });
                }
            };
        }
    ];
    var ngIncludeDirective = [
        '$http',
        '$templateCache',
        '$anchorScroll',
        '$animate',
        '$sce',
        function ($http, $templateCache, $anchorScroll, $animate, $sce) {
            return {
                restrict: 'ECA',
                priority: 400,
                terminal: true,
                transclude: 'element',
                controller: angular.noop,
                compile: function (element, attr) {
                    var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
                    return function (scope, $element, $attr, ctrl, $transclude) {
                        var changeCounter = 0, currentScope, previousElement, currentElement;
                        var cleanupLastIncludeContent = function () {
                            if (previousElement) {
                                previousElement.remove();
                                previousElement = null;
                            }
                            if (currentScope) {
                                currentScope.$destroy();
                                currentScope = null;
                            }
                            if (currentElement) {
                                $animate.leave(currentElement, function () {
                                    previousElement = null;
                                });
                                previousElement = currentElement;
                                currentElement = null;
                            }
                        };
                        scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
                            var afterAnimation = function () {
                                if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                    $anchorScroll();
                                }
                            };
                            var thisChangeId = ++changeCounter;
                            if (src) {
                                $http.get(src, { cache: $templateCache }).success(function (response) {
                                    if (thisChangeId !== changeCounter)
                                        return;
                                    var newScope = scope.$new();
                                    ctrl.template = response;
                                    var clone = $transclude(newScope, function (clone) {
                                        cleanupLastIncludeContent();
                                        $animate.enter(clone, null, $element, afterAnimation);
                                    });
                                    currentScope = newScope;
                                    currentElement = clone;
                                    currentScope.$emit('$includeContentLoaded');
                                    scope.$eval(onloadExp);
                                }).error(function () {
                                    if (thisChangeId === changeCounter)
                                        cleanupLastIncludeContent();
                                });
                                scope.$emit('$includeContentRequested');
                            } else {
                                cleanupLastIncludeContent();
                                ctrl.template = null;
                            }
                        });
                    };
                }
            };
        }
    ];
    var ngIncludeFillContentDirective = [
        '$compile',
        function ($compile) {
            return {
                restrict: 'ECA',
                priority: -400,
                require: 'ngInclude',
                link: function (scope, $element, $attr, ctrl) {
                    $element.html(ctrl.template);
                    $compile($element.contents())(scope);
                }
            };
        }
    ];
    var ngInitDirective = ngDirective({
        priority: 450,
        compile: function () {
            return {
                pre: function (scope, element, attrs) {
                    scope.$eval(attrs.ngInit);
                }
            };
        }
    });
    var ngNonBindableDirective = ngDirective({
        terminal: true,
        priority: 1000
    });
    var ngPluralizeDirective = [
        '$locale',
        '$interpolate',
        function ($locale, $interpolate) {
            var BRACE = /{}/g;
            return {
                restrict: 'EA',
                link: function (scope, element, attr) {
                    var numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), isWhen = /^when(Minus)?(.+)$/;
                    forEach(attr, function (expression, attributeName) {
                        if (isWhen.test(attributeName)) {
                            whens[lowercase(attributeName.replace('when', '').replace('Minus', '-'))] = element.attr(attr.$attr[attributeName]);
                        }
                    });
                    forEach(whens, function (expression, key) {
                        whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
                    });
                    scope.$watch(function ngPluralizeWatch() {
                        var value = parseFloat(scope.$eval(numberExp));
                        if (!isNaN(value)) {
                            if (!(value in whens))
                                value = $locale.pluralCat(value - offset);
                            return whensExpFns[value](scope, element, true);
                        } else {
                            return '';
                        }
                    }, function ngPluralizeWatchAction(newVal) {
                        element.text(newVal);
                    });
                }
            };
        }
    ];
    var ngRepeatDirective = [
        '$parse',
        '$animate',
        function ($parse, $animate) {
            var NG_REMOVED = '$$NG_REMOVED';
            var ngRepeatMinErr = minErr('ngRepeat');
            return {
                transclude: 'element',
                priority: 1000,
                terminal: true,
                $$tlb: true,
                link: function ($scope, $element, $attr, ctrl, $transclude) {
                    var expression = $attr.ngRepeat;
                    var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), trackByExp, trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, lhs, rhs, valueIdentifier, keyIdentifier, hashFnLocals = { $id: hashKey };
                    if (!match) {
                        throw ngRepeatMinErr('iexp', 'Expected expression in form of \'_item_ in _collection_[ track by _id_]\' but got \'{0}\'.', expression);
                    }
                    lhs = match[1];
                    rhs = match[2];
                    trackByExp = match[3];
                    if (trackByExp) {
                        trackByExpGetter = $parse(trackByExp);
                        trackByIdExpFn = function (key, value, index) {
                            if (keyIdentifier)
                                hashFnLocals[keyIdentifier] = key;
                            hashFnLocals[valueIdentifier] = value;
                            hashFnLocals.$index = index;
                            return trackByExpGetter($scope, hashFnLocals);
                        };
                    } else {
                        trackByIdArrayFn = function (key, value) {
                            return hashKey(value);
                        };
                        trackByIdObjFn = function (key) {
                            return key;
                        };
                    }
                    match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                    if (!match) {
                        throw ngRepeatMinErr('iidexp', '\'_item_\' in \'_item_ in _collection_\' should be an identifier or \'(_key_, _value_)\' expression, but got \'{0}\'.', lhs);
                    }
                    valueIdentifier = match[3] || match[1];
                    keyIdentifier = match[2];
                    var lastBlockMap = {};
                    $scope.$watchCollection(rhs, function ngRepeatAction(collection) {
                        var index, length, previousNode = $element[0], nextNode, nextBlockMap = {}, arrayLength, childScope, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder = [], elementsToRemove;
                        if (isArrayLike(collection)) {
                            collectionKeys = collection;
                            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                        } else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn;
                            collectionKeys = [];
                            for (key in collection) {
                                if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                                    collectionKeys.push(key);
                                }
                            }
                            collectionKeys.sort();
                        }
                        arrayLength = collectionKeys.length;
                        length = nextBlockOrder.length = collectionKeys.length;
                        for (index = 0; index < length; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            trackById = trackByIdFn(key, value, index);
                            assertNotHasOwnProperty(trackById, '`track by` id');
                            if (lastBlockMap.hasOwnProperty(trackById)) {
                                block = lastBlockMap[trackById];
                                delete lastBlockMap[trackById];
                                nextBlockMap[trackById] = block;
                                nextBlockOrder[index] = block;
                            } else if (nextBlockMap.hasOwnProperty(trackById)) {
                                forEach(nextBlockOrder, function (block) {
                                    if (block && block.scope)
                                        lastBlockMap[block.id] = block;
                                });
                                throw ngRepeatMinErr('dupes', 'Duplicates in a repeater are not allowed. Use \'track by\' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}', expression, trackById, toJson(value));
                            } else {
                                nextBlockOrder[index] = { id: trackById };
                                nextBlockMap[trackById] = false;
                            }
                        }
                        for (key in lastBlockMap) {
                            if (lastBlockMap.hasOwnProperty(key)) {
                                block = lastBlockMap[key];
                                elementsToRemove = getBlockElements(block.clone);
                                $animate.leave(elementsToRemove);
                                forEach(elementsToRemove, function (element) {
                                    element[NG_REMOVED] = true;
                                });
                                block.scope.$destroy();
                            }
                        }
                        for (index = 0, length = collectionKeys.length; index < length; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            block = nextBlockOrder[index];
                            if (nextBlockOrder[index - 1])
                                previousNode = getBlockEnd(nextBlockOrder[index - 1]);
                            if (block.scope) {
                                childScope = block.scope;
                                nextNode = previousNode;
                                do {
                                    nextNode = nextNode.nextSibling;
                                } while (nextNode && nextNode[NG_REMOVED]);
                                if (getBlockStart(block) != nextNode) {
                                    $animate.move(getBlockElements(block.clone), null, jqLite(previousNode));
                                }
                                previousNode = getBlockEnd(block);
                            } else {
                                childScope = $scope.$new();
                            }
                            childScope[valueIdentifier] = value;
                            if (keyIdentifier)
                                childScope[keyIdentifier] = key;
                            childScope.$index = index;
                            childScope.$first = index === 0;
                            childScope.$last = index === arrayLength - 1;
                            childScope.$middle = !(childScope.$first || childScope.$last);
                            childScope.$odd = !(childScope.$even = (index & 1) === 0);
                            if (!block.scope) {
                                $transclude(childScope, function (clone) {
                                    clone[clone.length++] = document.createComment(' end ngRepeat: ' + expression + ' ');
                                    $animate.enter(clone, null, jqLite(previousNode));
                                    previousNode = clone;
                                    block.scope = childScope;
                                    block.clone = clone;
                                    nextBlockMap[block.id] = block;
                                });
                            }
                        }
                        lastBlockMap = nextBlockMap;
                    });
                }
            };
            function getBlockStart(block) {
                return block.clone[0];
            }
            function getBlockEnd(block) {
                return block.clone[block.clone.length - 1];
            }
        }
    ];
    var ngShowDirective = [
        '$animate',
        function ($animate) {
            return function (scope, element, attr) {
                scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
                    $animate[toBoolean(value) ? 'removeClass' : 'addClass'](element, 'ng-hide');
                });
            };
        }
    ];
    var ngHideDirective = [
        '$animate',
        function ($animate) {
            return function (scope, element, attr) {
                scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
                    $animate[toBoolean(value) ? 'addClass' : 'removeClass'](element, 'ng-hide');
                });
            };
        }
    ];
    var ngStyleDirective = ngDirective(function (scope, element, attr) {
        scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
            if (oldStyles && newStyles !== oldStyles) {
                forEach(oldStyles, function (val, style) {
                    element.css(style, '');
                });
            }
            if (newStyles)
                element.css(newStyles);
        }, true);
    });
    var ngSwitchDirective = [
        '$animate',
        function ($animate) {
            return {
                restrict: 'EA',
                require: 'ngSwitch',
                controller: [
                    '$scope',
                    function ngSwitchController() {
                        this.cases = {};
                    }
                ],
                link: function (scope, element, attr, ngSwitchController) {
                    var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousElements = [], selectedScopes = [];
                    scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
                        var i, ii;
                        for (i = 0, ii = previousElements.length; i < ii; ++i) {
                            previousElements[i].remove();
                        }
                        previousElements.length = 0;
                        for (i = 0, ii = selectedScopes.length; i < ii; ++i) {
                            var selected = selectedElements[i];
                            selectedScopes[i].$destroy();
                            previousElements[i] = selected;
                            $animate.leave(selected, function () {
                                previousElements.splice(i, 1);
                            });
                        }
                        selectedElements.length = 0;
                        selectedScopes.length = 0;
                        if (selectedTranscludes = ngSwitchController.cases['!' + value] || ngSwitchController.cases['?']) {
                            scope.$eval(attr.change);
                            forEach(selectedTranscludes, function (selectedTransclude) {
                                var selectedScope = scope.$new();
                                selectedScopes.push(selectedScope);
                                selectedTransclude.transclude(selectedScope, function (caseElement) {
                                    var anchor = selectedTransclude.element;
                                    selectedElements.push(caseElement);
                                    $animate.enter(caseElement, anchor.parent(), anchor);
                                });
                            });
                        }
                    });
                }
            };
        }
    ];
    var ngSwitchWhenDirective = ngDirective({
        transclude: 'element',
        priority: 800,
        require: '^ngSwitch',
        link: function (scope, element, attrs, ctrl, $transclude) {
            ctrl.cases['!' + attrs.ngSwitchWhen] = ctrl.cases['!' + attrs.ngSwitchWhen] || [];
            ctrl.cases['!' + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngSwitchDefaultDirective = ngDirective({
        transclude: 'element',
        priority: 800,
        require: '^ngSwitch',
        link: function (scope, element, attr, ctrl, $transclude) {
            ctrl.cases['?'] = ctrl.cases['?'] || [];
            ctrl.cases['?'].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngTranscludeDirective = ngDirective({
        link: function ($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) {
                throw minErr('ngTransclude')('orphan', 'Illegal use of ngTransclude directive in the template! ' + 'No parent directive that requires a transclusion found. ' + 'Element: {0}', startingTag($element));
            }
            $transclude(function (clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    });
    var scriptDirective = [
        '$templateCache',
        function ($templateCache) {
            return {
                restrict: 'E',
                terminal: true,
                compile: function (element, attr) {
                    if (attr.type == 'text/ng-template') {
                        var templateUrl = attr.id, text = element[0].text;
                        $templateCache.put(templateUrl, text);
                    }
                }
            };
        }
    ];
    var ngOptionsMinErr = minErr('ngOptions');
    var ngOptionsDirective = valueFn({ terminal: true });
    var selectDirective = [
        '$compile',
        '$parse',
        function ($compile, $parse) {
            var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, nullModelCtrl = { $setViewValue: noop };
            return {
                restrict: 'E',
                require: [
                    'select',
                    '?ngModel'
                ],
                controller: [
                    '$element',
                    '$scope',
                    '$attrs',
                    function ($element, $scope, $attrs) {
                        var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
                        self.databound = $attrs.ngModel;
                        self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                            ngModelCtrl = ngModelCtrl_;
                            nullOption = nullOption_;
                            unknownOption = unknownOption_;
                        };
                        self.addOption = function (value) {
                            assertNotHasOwnProperty(value, '"option value"');
                            optionsMap[value] = true;
                            if (ngModelCtrl.$viewValue == value) {
                                $element.val(value);
                                if (unknownOption.parent())
                                    unknownOption.remove();
                            }
                        };
                        self.removeOption = function (value) {
                            if (this.hasOption(value)) {
                                delete optionsMap[value];
                                if (ngModelCtrl.$viewValue == value) {
                                    this.renderUnknownOption(value);
                                }
                            }
                        };
                        self.renderUnknownOption = function (val) {
                            var unknownVal = '? ' + hashKey(val) + ' ?';
                            unknownOption.val(unknownVal);
                            $element.prepend(unknownOption);
                            $element.val(unknownVal);
                            unknownOption.prop('selected', true);
                        };
                        self.hasOption = function (value) {
                            return optionsMap.hasOwnProperty(value);
                        };
                        $scope.$on('$destroy', function () {
                            self.renderUnknownOption = noop;
                        });
                    }
                ],
                link: function (scope, element, attr, ctrls) {
                    if (!ctrls[1])
                        return;
                    var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
                    for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
                        if (children[i].value === '') {
                            emptyOption = nullOption = children.eq(i);
                            break;
                        }
                    }
                    selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
                    if (multiple) {
                        ngModelCtrl.$isEmpty = function (value) {
                            return !value || value.length === 0;
                        };
                    }
                    if (optionsExp)
                        setupAsOptions(scope, element, ngModelCtrl);
                    else if (multiple)
                        setupAsMultiple(scope, element, ngModelCtrl);
                    else
                        setupAsSingle(scope, element, ngModelCtrl, selectCtrl);
                    function setupAsSingle(scope, selectElement, ngModelCtrl, selectCtrl) {
                        ngModelCtrl.$render = function () {
                            var viewValue = ngModelCtrl.$viewValue;
                            if (selectCtrl.hasOption(viewValue)) {
                                if (unknownOption.parent())
                                    unknownOption.remove();
                                selectElement.val(viewValue);
                                if (viewValue === '')
                                    emptyOption.prop('selected', true);
                            } else {
                                if (isUndefined(viewValue) && emptyOption) {
                                    selectElement.val('');
                                } else {
                                    selectCtrl.renderUnknownOption(viewValue);
                                }
                            }
                        };
                        selectElement.on('change', function () {
                            scope.$apply(function () {
                                if (unknownOption.parent())
                                    unknownOption.remove();
                                ngModelCtrl.$setViewValue(selectElement.val());
                            });
                        });
                    }
                    function setupAsMultiple(scope, selectElement, ctrl) {
                        var lastView;
                        ctrl.$render = function () {
                            var items = new HashMap(ctrl.$viewValue);
                            forEach(selectElement.find('option'), function (option) {
                                option.selected = isDefined(items.get(option.value));
                            });
                        };
                        scope.$watch(function selectMultipleWatch() {
                            if (!equals(lastView, ctrl.$viewValue)) {
                                lastView = shallowCopy(ctrl.$viewValue);
                                ctrl.$render();
                            }
                        });
                        selectElement.on('change', function () {
                            scope.$apply(function () {
                                var array = [];
                                forEach(selectElement.find('option'), function (option) {
                                    if (option.selected) {
                                        array.push(option.value);
                                    }
                                });
                                ctrl.$setViewValue(array);
                            });
                        });
                    }
                    function setupAsOptions(scope, selectElement, ctrl) {
                        var match;
                        if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                            throw ngOptionsMinErr('iexp', 'Expected expression in form of ' + '\'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\'' + ' but got \'{0}\'. Element: {1}', optionsExp, startingTag(selectElement));
                        }
                        var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), track = match[8], trackFn = track ? $parse(match[8]) : null, optionGroupsCache = [[{
                                        element: selectElement,
                                        label: ''
                                    }]];
                        if (nullOption) {
                            $compile(nullOption)(scope);
                            nullOption.removeClass('ng-scope');
                            nullOption.remove();
                        }
                        selectElement.empty();
                        selectElement.on('change', function () {
                            scope.$apply(function () {
                                var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength, trackIndex;
                                if (multiple) {
                                    value = [];
                                    for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                                        optionGroup = optionGroupsCache[groupIndex];
                                        for (index = 1, length = optionGroup.length; index < length; index++) {
                                            if ((optionElement = optionGroup[index].element)[0].selected) {
                                                key = optionElement.val();
                                                if (keyName)
                                                    locals[keyName] = key;
                                                if (trackFn) {
                                                    for (trackIndex = 0; trackIndex < collection.length; trackIndex++) {
                                                        locals[valueName] = collection[trackIndex];
                                                        if (trackFn(scope, locals) == key)
                                                            break;
                                                    }
                                                } else {
                                                    locals[valueName] = collection[key];
                                                }
                                                value.push(valueFn(scope, locals));
                                            }
                                        }
                                    }
                                } else {
                                    key = selectElement.val();
                                    if (key == '?') {
                                        value = undefined;
                                    } else if (key === '') {
                                        value = null;
                                    } else {
                                        if (trackFn) {
                                            for (trackIndex = 0; trackIndex < collection.length; trackIndex++) {
                                                locals[valueName] = collection[trackIndex];
                                                if (trackFn(scope, locals) == key) {
                                                    value = valueFn(scope, locals);
                                                    break;
                                                }
                                            }
                                        } else {
                                            locals[valueName] = collection[key];
                                            if (keyName)
                                                locals[keyName] = key;
                                            value = valueFn(scope, locals);
                                        }
                                    }
                                }
                                ctrl.$setViewValue(value);
                                render();
                            });
                        });
                        ctrl.$render = render;
                        scope.$watchCollection(valuesFn, render);
                        scope.$watchCollection(function () {
                            var locals = {}, values = valuesFn(scope);
                            if (values) {
                                var toDisplay = new Array(values.length);
                                for (var i = 0, ii = values.length; i < ii; i++) {
                                    locals[valueName] = values[i];
                                    toDisplay[i] = displayFn(scope, locals);
                                }
                                return toDisplay;
                            }
                        }, render);
                        if (multiple) {
                            scope.$watchCollection(function () {
                                return ctrl.$modelValue;
                            }, render);
                        }
                        function getSelectedSet() {
                            var selectedSet = false;
                            if (multiple) {
                                var modelValue = ctrl.$modelValue;
                                if (trackFn && isArray(modelValue)) {
                                    selectedSet = new HashMap([]);
                                    var locals = {};
                                    for (var trackIndex = 0; trackIndex < modelValue.length; trackIndex++) {
                                        locals[valueName] = modelValue[trackIndex];
                                        selectedSet.put(trackFn(scope, locals), modelValue[trackIndex]);
                                    }
                                } else {
                                    selectedSet = new HashMap(modelValue);
                                }
                            }
                            return selectedSet;
                        }
                        function render() {
                            var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, key, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = getSelectedSet(), lastElement, element, label;
                            for (index = 0; length = keys.length, index < length; index++) {
                                key = index;
                                if (keyName) {
                                    key = keys[index];
                                    if (key.charAt(0) === '$')
                                        continue;
                                    locals[keyName] = key;
                                }
                                locals[valueName] = values[key];
                                optionGroupName = groupByFn(scope, locals) || '';
                                if (!(optionGroup = optionGroups[optionGroupName])) {
                                    optionGroup = optionGroups[optionGroupName] = [];
                                    optionGroupNames.push(optionGroupName);
                                }
                                if (multiple) {
                                    selected = isDefined(selectedSet.remove(trackFn ? trackFn(scope, locals) : valueFn(scope, locals)));
                                } else {
                                    if (trackFn) {
                                        var modelCast = {};
                                        modelCast[valueName] = modelValue;
                                        selected = trackFn(scope, modelCast) === trackFn(scope, locals);
                                    } else {
                                        selected = modelValue === valueFn(scope, locals);
                                    }
                                    selectedSet = selectedSet || selected;
                                }
                                label = displayFn(scope, locals);
                                label = isDefined(label) ? label : '';
                                optionGroup.push({
                                    id: trackFn ? trackFn(scope, locals) : keyName ? keys[index] : index,
                                    label: label,
                                    selected: selected
                                });
                            }
                            if (!multiple) {
                                if (nullOption || modelValue === null) {
                                    optionGroups[''].unshift({
                                        id: '',
                                        label: '',
                                        selected: !selectedSet
                                    });
                                } else if (!selectedSet) {
                                    optionGroups[''].unshift({
                                        id: '?',
                                        label: '',
                                        selected: true
                                    });
                                }
                            }
                            for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                                optionGroupName = optionGroupNames[groupIndex];
                                optionGroup = optionGroups[optionGroupName];
                                if (optionGroupsCache.length <= groupIndex) {
                                    existingParent = {
                                        element: optGroupTemplate.clone().attr('label', optionGroupName),
                                        label: optionGroup.label
                                    };
                                    existingOptions = [existingParent];
                                    optionGroupsCache.push(existingOptions);
                                    selectElement.append(existingParent.element);
                                } else {
                                    existingOptions = optionGroupsCache[groupIndex];
                                    existingParent = existingOptions[0];
                                    if (existingParent.label != optionGroupName) {
                                        existingParent.element.attr('label', existingParent.label = optionGroupName);
                                    }
                                }
                                lastElement = null;
                                for (index = 0, length = optionGroup.length; index < length; index++) {
                                    option = optionGroup[index];
                                    if (existingOption = existingOptions[index + 1]) {
                                        lastElement = existingOption.element;
                                        if (existingOption.label !== option.label) {
                                            lastElement.text(existingOption.label = option.label);
                                            lastElement.prop('label', existingOption.label);
                                        }
                                        if (existingOption.id !== option.id) {
                                            lastElement.val(existingOption.id = option.id);
                                        }
                                        if (lastElement[0].selected !== option.selected) {
                                            lastElement.prop('selected', existingOption.selected = option.selected);
                                            if (msie) {
                                                lastElement.prop('selected', existingOption.selected);
                                            }
                                        }
                                    } else {
                                        if (option.id === '' && nullOption) {
                                            element = nullOption;
                                        } else {
                                            (element = optionTemplate.clone()).val(option.id).prop('selected', option.selected).attr('selected', option.selected).prop('label', option.label).text(option.label);
                                        }
                                        existingOptions.push(existingOption = {
                                            element: element,
                                            label: option.label,
                                            id: option.id,
                                            selected: option.selected
                                        });
                                        selectCtrl.addOption(option.label, element);
                                        if (lastElement) {
                                            lastElement.after(element);
                                        } else {
                                            existingParent.element.append(element);
                                        }
                                        lastElement = element;
                                    }
                                }
                                index++;
                                while (existingOptions.length > index) {
                                    option = existingOptions.pop();
                                    selectCtrl.removeOption(option.label);
                                    option.element.remove();
                                }
                            }
                            while (optionGroupsCache.length > groupIndex) {
                                optionGroupsCache.pop()[0].element.remove();
                            }
                        }
                    }
                }
            };
        }
    ];
    var optionDirective = [
        '$interpolate',
        function ($interpolate) {
            var nullSelectCtrl = {
                addOption: noop,
                removeOption: noop
            };
            return {
                restrict: 'E',
                priority: 100,
                compile: function (element, attr) {
                    if (isUndefined(attr.value)) {
                        var interpolateFn = $interpolate(element.text(), true);
                        if (!interpolateFn) {
                            attr.$set('value', element.text());
                        }
                    }
                    return function (scope, element, attr) {
                        var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                        if (selectCtrl && selectCtrl.databound) {
                            element.prop('selected', false);
                        } else {
                            selectCtrl = nullSelectCtrl;
                        }
                        if (interpolateFn) {
                            scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                                attr.$set('value', newVal);
                                if (newVal !== oldVal)
                                    selectCtrl.removeOption(oldVal);
                                selectCtrl.addOption(newVal);
                            });
                        } else {
                            selectCtrl.addOption(attr.value);
                        }
                        element.on('$destroy', function () {
                            selectCtrl.removeOption(attr.value);
                        });
                    };
                }
            };
        }
    ];
    var styleDirective = valueFn({
        restrict: 'E',
        terminal: true
    });
    if (window.angular.bootstrap) {
        console.log('WARNING: Tried to load angular more than once.');
        return;
    }
    bindJQuery();
    publishExternalAPI(angular);
    jqLite(document).ready(function () {
        angularInit(document, bootstrap);
    });
}(window, document));
!window.angular.$$csp() && window.angular.element(document).find('head').prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
define('angular-base', [], function () {
    return;
});
define('angular', [
    'require',
    'exports',
    'jquery',
    'angular-base'
], function (require, exports, jQuery) {
    'use strict';
    var ng = window['angular'];
    window['jQuery'] = jQuery;
    window['$'] = jQuery;
    return ng;
});
define('rcss', [], function () {
    if (typeof window == 'undefined')
        return {
            load: function (n, r, load) {
                load();
            }
        };
    var head = document.getElementsByTagName('head')[0];
    var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0;
    var useImportLoad = false;
    var useOnload = true;
    if (engine[1] || engine[7])
        useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
    else if (engine[2] || engine[8] || 'WebkitAppearance' in document.documentElement.style)
        useOnload = false;
    else if (engine[4])
        useImportLoad = parseInt(engine[4]) < 18;
    var cssAPI = {};
    cssAPI.pluginBuilder = './css-builder';
    var curStyle, curSheet;
    var createStyle = function () {
        curStyle = document.createElement('style');
        head.appendChild(curStyle);
        curSheet = curStyle.styleSheet || curStyle.sheet;
    };
    var ieCnt = 0;
    var ieLoads = [];
    var ieCurCallback;
    var createIeLoad = function (url) {
        curSheet.addImport(url);
        curStyle.onload = function () {
            processIeLoad();
        };
        ieCnt++;
        if (ieCnt == 31) {
            createStyle();
            ieCnt = 0;
        }
    };
    var processIeLoad = function () {
        ieCurCallback();
        var nextLoad = ieLoads.shift();
        if (!nextLoad) {
            ieCurCallback = null;
            return;
        }
        ieCurCallback = nextLoad[1];
        createIeLoad(nextLoad[0]);
    };
    var importLoad = function (url, callback) {
        if (!curSheet || !curSheet.addImport)
            createStyle();
        if (curSheet && curSheet.addImport) {
            if (ieCurCallback) {
                ieLoads.push([
                    url,
                    callback
                ]);
            } else {
                createIeLoad(url);
                ieCurCallback = callback;
            }
        } else {
            curStyle.textContent = '@import "' + url + '";';
            var loadInterval = setInterval(function () {
                try {
                    curStyle.sheet.cssRules;
                    clearInterval(loadInterval);
                    callback();
                } catch (e) {
                }
            }, 10);
        }
    };
    var linkLoad = function (url, callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        if (useOnload)
            link.onload = function () {
                link.onload = function () {
                };
                setTimeout(callback, 7);
            };
        else
            var loadInterval = setInterval(function () {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var sheet = document.styleSheets[i];
                    if (sheet.href == link.href) {
                        clearInterval(loadInterval);
                        return callback();
                    }
                }
            }, 10);
        link.href = url;
        head.appendChild(link);
    };
    cssAPI.normalize = function (name, normalize) {
        if (name.substr(name.length - 4, 4) == '.css')
            name = name.substr(0, name.length - 4);
        return normalize(name);
    };
    cssAPI.load = function (cssId, req, load, config) {
        (useImportLoad ? importLoad : linkLoad)(req.toUrl(cssId + '.css'), load);
    };
    return cssAPI;
});
define('bootstrap', ['angular'], function () {
    if ('undefined' == typeof jQuery)
        throw new Error('Bootstrap\'s JavaScript requires jQuery');
    +function (a) {
        'use strict';
        var b = a.fn.jquery.split(' ')[0].split('.');
        if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3)
            throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
    }(jQuery), +function (a) {
        'use strict';
        function b() {
            var a = document.createElement('bootstrap'), b = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };
            for (var c in b)
                if (void 0 !== a.style[c])
                    return { end: b[c] };
            return !1;
        }
        a.fn.emulateTransitionEnd = function (b) {
            var c = !1, d = this;
            a(this).one('bsTransitionEnd', function () {
                c = !0;
            });
            var e = function () {
                c || a(d).trigger(a.support.transition.end);
            };
            return setTimeout(e, b), this;
        }, a(function () {
            a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
                bindType: a.support.transition.end,
                delegateType: a.support.transition.end,
                handle: function (b) {
                    if (a(b.target).is(this))
                        return b.handleObj.handler.apply(this, arguments);
                }
            });
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var c = a(this), e = c.data('bs.alert');
                e || c.data('bs.alert', e = new d(this)), 'string' == typeof b && e[b].call(c);
            });
        }
        var c = '[data-dismiss="alert"]', d = function (b) {
                a(b).on('click', c, this.close);
            };
        d.VERSION = '3.3.7', d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
            function c() {
                g.detach().trigger('closed.bs.alert').remove();
            }
            var e = a(this), f = e.attr('data-target');
            f || (f = e.attr('href'), f = f && f.replace(/.*(?=#[^\s]*$)/, ''));
            var g = a('#' === f ? [] : f);
            b && b.preventDefault(), g.length || (g = e.closest('.alert')), g.trigger(b = a.Event('close.bs.alert')), b.isDefaultPrevented() || (g.removeClass('in'), a.support.transition && g.hasClass('fade') ? g.one('bsTransitionEnd', c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
        };
        var e = a.fn.alert;
        a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
            return a.fn.alert = e, this;
        }, a(document).on('click.bs.alert.data-api', c, d.prototype.close);
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.button'), f = 'object' == typeof b && b;
                e || d.data('bs.button', e = new c(this, f)), 'toggle' == b ? e.toggle() : b && e.setState(b);
            });
        }
        var c = function (b, d) {
            this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
        };
        c.VERSION = '3.3.7', c.DEFAULTS = { loadingText: 'loading...' }, c.prototype.setState = function (b) {
            var c = 'disabled', d = this.$element, e = d.is('input') ? 'val' : 'html', f = d.data();
            b += 'Text', null == f.resetText && d.data('resetText', d[e]()), setTimeout(a.proxy(function () {
                d[e](null == f[b] ? this.options[b] : f[b]), 'loadingText' == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1));
            }, this), 0);
        }, c.prototype.toggle = function () {
            var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
            if (b.length) {
                var c = this.$element.find('input');
                'radio' == c.prop('type') ? (c.prop('checked') && (a = !1), b.find('.active').removeClass('active'), this.$element.addClass('active')) : 'checkbox' == c.prop('type') && (c.prop('checked') !== this.$element.hasClass('active') && (a = !1), this.$element.toggleClass('active')), c.prop('checked', this.$element.hasClass('active')), a && c.trigger('change');
            } else
                this.$element.attr('aria-pressed', !this.$element.hasClass('active')), this.$element.toggleClass('active');
        };
        var d = a.fn.button;
        a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
            return a.fn.button = d, this;
        }, a(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (c) {
            var d = a(c.target).closest('.btn');
            b.call(d, 'toggle'), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is('input,button') ? d.trigger('focus') : d.find('input:visible,button:visible').first().trigger('focus'));
        }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (b) {
            a(b.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(b.type));
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.carousel'), f = a.extend({}, c.DEFAULTS, d.data(), 'object' == typeof b && b), g = 'string' == typeof b ? b : f.slide;
                e || d.data('bs.carousel', e = new c(this, f)), 'number' == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
            });
        }
        var c = function (b, c) {
            this.$element = a(b), this.$indicators = this.$element.find('.carousel-indicators'), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on('keydown.bs.carousel', a.proxy(this.keydown, this)), 'hover' == this.options.pause && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', a.proxy(this.pause, this)).on('mouseleave.bs.carousel', a.proxy(this.cycle, this));
        };
        c.VERSION = '3.3.7', c.TRANSITION_DURATION = 600, c.DEFAULTS = {
            interval: 5000,
            pause: 'hover',
            wrap: !0,
            keyboard: !0
        }, c.prototype.keydown = function (a) {
            if (!/input|textarea/i.test(a.target.tagName)) {
                switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return;
                }
                a.preventDefault();
            }
        }, c.prototype.cycle = function (b) {
            return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
        }, c.prototype.getItemIndex = function (a) {
            return this.$items = a.parent().children('.item'), this.$items.index(a || this.$active);
        }, c.prototype.getItemForDirection = function (a, b) {
            var c = this.getItemIndex(b), d = 'prev' == a && 0 === c || 'next' == a && c == this.$items.length - 1;
            if (d && !this.options.wrap)
                return b;
            var e = 'prev' == a ? -1 : 1, f = (c + e) % this.$items.length;
            return this.$items.eq(f);
        }, c.prototype.to = function (a) {
            var b = this, c = this.getItemIndex(this.$active = this.$element.find('.item.active'));
            if (!(a > this.$items.length - 1 || a < 0))
                return this.sliding ? this.$element.one('slid.bs.carousel', function () {
                    b.to(a);
                }) : c == a ? this.pause().cycle() : this.slide(a > c ? 'next' : 'prev', this.$items.eq(a));
        }, c.prototype.pause = function (b) {
            return b || (this.paused = !0), this.$element.find('.next, .prev').length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
        }, c.prototype.next = function () {
            if (!this.sliding)
                return this.slide('next');
        }, c.prototype.prev = function () {
            if (!this.sliding)
                return this.slide('prev');
        }, c.prototype.slide = function (b, d) {
            var e = this.$element.find('.item.active'), f = d || this.getItemForDirection(b, e), g = this.interval, h = 'next' == b ? 'left' : 'right', i = this;
            if (f.hasClass('active'))
                return this.sliding = !1;
            var j = f[0], k = a.Event('slide.bs.carousel', {
                    relatedTarget: j,
                    direction: h
                });
            if (this.$element.trigger(k), !k.isDefaultPrevented()) {
                if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                    this.$indicators.find('.active').removeClass('active');
                    var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                    l && l.addClass('active');
                }
                var m = a.Event('slid.bs.carousel', {
                    relatedTarget: j,
                    direction: h
                });
                return a.support.transition && this.$element.hasClass('slide') ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one('bsTransitionEnd', function () {
                    f.removeClass([
                        b,
                        h
                    ].join(' ')).addClass('active'), e.removeClass([
                        'active',
                        h
                    ].join(' ')), i.sliding = !1, setTimeout(function () {
                        i.$element.trigger(m);
                    }, 0);
                }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass('active'), f.addClass('active'), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
            }
        };
        var d = a.fn.carousel;
        a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
            return a.fn.carousel = d, this;
        };
        var e = function (c) {
            var d, e = a(this), f = a(e.attr('data-target') || (d = e.attr('href')) && d.replace(/.*(?=#[^\s]+$)/, ''));
            if (f.hasClass('carousel')) {
                var g = a.extend({}, f.data(), e.data()), h = e.attr('data-slide-to');
                h && (g.interval = !1), b.call(f, g), h && f.data('bs.carousel').to(h), c.preventDefault();
            }
        };
        a(document).on('click.bs.carousel.data-api', '[data-slide]', e).on('click.bs.carousel.data-api', '[data-slide-to]', e), a(window).on('load', function () {
            a('[data-ride="carousel"]').each(function () {
                var c = a(this);
                b.call(c, c.data());
            });
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            var c, d = b.attr('data-target') || (c = b.attr('href')) && c.replace(/.*(?=#[^\s]+$)/, '');
            return a(d);
        }
        function c(b) {
            return this.each(function () {
                var c = a(this), e = c.data('bs.collapse'), f = a.extend({}, d.DEFAULTS, c.data(), 'object' == typeof b && b);
                !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data('bs.collapse', e = new d(this, f)), 'string' == typeof b && e[b]();
            });
        }
        var d = function (b, c) {
            this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
        };
        d.VERSION = '3.3.7', d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
            var a = this.$element.hasClass('width');
            return a ? 'width' : 'height';
        }, d.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass('in')) {
                var b, e = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
                if (!(e && e.length && (b = e.data('bs.collapse'), b && b.transitioning))) {
                    var f = a.Event('show.bs.collapse');
                    if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                        e && e.length && (c.call(e, 'hide'), b || e.data('bs.collapse', null));
                        var g = this.dimension();
                        this.$element.removeClass('collapse').addClass('collapsing')[g](0).attr('aria-expanded', !0), this.$trigger.removeClass('collapsed').attr('aria-expanded', !0), this.transitioning = 1;
                        var h = function () {
                            this.$element.removeClass('collapsing').addClass('collapse in')[g](''), this.transitioning = 0, this.$element.trigger('shown.bs.collapse');
                        };
                        if (!a.support.transition)
                            return h.call(this);
                        var i = a.camelCase([
                            'scroll',
                            g
                        ].join('-'));
                        this.$element.one('bsTransitionEnd', a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                    }
                }
            }
        }, d.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass('in')) {
                var b = a.Event('hide.bs.collapse');
                if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                    var c = this.dimension();
                    this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', !1), this.$trigger.addClass('collapsed').attr('aria-expanded', !1), this.transitioning = 1;
                    var e = function () {
                        this.transitioning = 0, this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
                    };
                    return a.support.transition ? void this.$element[c](0).one('bsTransitionEnd', a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
                }
            }
        }, d.prototype.toggle = function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']();
        }, d.prototype.getParent = function () {
            return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
                var e = a(d);
                this.addAriaAndCollapsedClass(b(e), e);
            }, this)).end();
        }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
            var c = a.hasClass('in');
            a.attr('aria-expanded', c), b.toggleClass('collapsed', !c).attr('aria-expanded', c);
        };
        var e = a.fn.collapse;
        a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
            return a.fn.collapse = e, this;
        }, a(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (d) {
            var e = a(this);
            e.attr('data-target') || d.preventDefault();
            var f = b(e), g = f.data('bs.collapse'), h = g ? 'toggle' : e.data();
            c.call(f, h);
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            var c = b.attr('data-target');
            c || (c = b.attr('href'), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ''));
            var d = c && a(c);
            return d && d.length ? d : b.parent();
        }
        function c(c) {
            c && 3 === c.which || (a(e).remove(), a(f).each(function () {
                var d = a(this), e = b(d), f = { relatedTarget: this };
                e.hasClass('open') && (c && 'click' == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event('hide.bs.dropdown', f)), c.isDefaultPrevented() || (d.attr('aria-expanded', 'false'), e.removeClass('open').trigger(a.Event('hidden.bs.dropdown', f)))));
            }));
        }
        function d(b) {
            return this.each(function () {
                var c = a(this), d = c.data('bs.dropdown');
                d || c.data('bs.dropdown', d = new g(this)), 'string' == typeof b && d[b].call(c);
            });
        }
        var e = '.dropdown-backdrop', f = '[data-toggle="dropdown"]', g = function (b) {
                a(b).on('click.bs.dropdown', this.toggle);
            };
        g.VERSION = '3.3.7', g.prototype.toggle = function (d) {
            var e = a(this);
            if (!e.is('.disabled, :disabled')) {
                var f = b(e), g = f.hasClass('open');
                if (c(), !g) {
                    'ontouchstart' in document.documentElement && !f.closest('.navbar-nav').length && a(document.createElement('div')).addClass('dropdown-backdrop').insertAfter(a(this)).on('click', c);
                    var h = { relatedTarget: this };
                    if (f.trigger(d = a.Event('show.bs.dropdown', h)), d.isDefaultPrevented())
                        return;
                    e.trigger('focus').attr('aria-expanded', 'true'), f.toggleClass('open').trigger(a.Event('shown.bs.dropdown', h));
                }
                return !1;
            }
        }, g.prototype.keydown = function (c) {
            if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
                var d = a(this);
                if (c.preventDefault(), c.stopPropagation(), !d.is('.disabled, :disabled')) {
                    var e = b(d), g = e.hasClass('open');
                    if (!g && 27 != c.which || g && 27 == c.which)
                        return 27 == c.which && e.find(f).trigger('focus'), d.trigger('click');
                    var h = ' li:not(.disabled):visible a', i = e.find('.dropdown-menu' + h);
                    if (i.length) {
                        var j = i.index(c.target);
                        38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger('focus');
                    }
                }
            }
        };
        var h = a.fn.dropdown;
        a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
            return a.fn.dropdown = h, this;
        }, a(document).on('click.bs.dropdown.data-api', c).on('click.bs.dropdown.data-api', '.dropdown form', function (a) {
            a.stopPropagation();
        }).on('click.bs.dropdown.data-api', f, g.prototype.toggle).on('keydown.bs.dropdown.data-api', f, g.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', g.prototype.keydown);
    }(jQuery), +function (a) {
        'use strict';
        function b(b, d) {
            return this.each(function () {
                var e = a(this), f = e.data('bs.modal'), g = a.extend({}, c.DEFAULTS, e.data(), 'object' == typeof b && b);
                f || e.data('bs.modal', f = new c(this, g)), 'string' == typeof b ? f[b](d) : g.show && f.show(d);
            });
        }
        var c = function (b, c) {
            this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find('.modal-dialog'), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find('.modal-content').load(this.options.remote, a.proxy(function () {
                this.$element.trigger('loaded.bs.modal');
            }, this));
        };
        c.VERSION = '3.3.7', c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, c.prototype.toggle = function (a) {
            return this.isShown ? this.hide() : this.show(a);
        }, c.prototype.show = function (b) {
            var d = this, e = a.Event('show.bs.modal', { relatedTarget: b });
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass('modal-open'), this.escape(), this.resize(), this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on('mousedown.dismiss.bs.modal', function () {
                d.$element.one('mouseup.dismiss.bs.modal', function (b) {
                    a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
                });
            }), this.backdrop(function () {
                var e = a.support.transition && d.$element.hasClass('fade');
                d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass('in'), d.enforceFocus();
                var f = a.Event('shown.bs.modal', { relatedTarget: b });
                e ? d.$dialog.one('bsTransitionEnd', function () {
                    d.$element.trigger('focus').trigger(f);
                }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger('focus').trigger(f);
            }));
        }, c.prototype.hide = function (b) {
            b && b.preventDefault(), b = a.Event('hide.bs.modal'), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off('focusin.bs.modal'), this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal'), this.$dialog.off('mousedown.dismiss.bs.modal'), a.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
        }, c.prototype.enforceFocus = function () {
            a(document).off('focusin.bs.modal').on('focusin.bs.modal', a.proxy(function (a) {
                document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger('focus');
            }, this));
        }, c.prototype.escape = function () {
            this.isShown && this.options.keyboard ? this.$element.on('keydown.dismiss.bs.modal', a.proxy(function (a) {
                27 == a.which && this.hide();
            }, this)) : this.isShown || this.$element.off('keydown.dismiss.bs.modal');
        }, c.prototype.resize = function () {
            this.isShown ? a(window).on('resize.bs.modal', a.proxy(this.handleUpdate, this)) : a(window).off('resize.bs.modal');
        }, c.prototype.hideModal = function () {
            var a = this;
            this.$element.hide(), this.backdrop(function () {
                a.$body.removeClass('modal-open'), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger('hidden.bs.modal');
            });
        }, c.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
        }, c.prototype.backdrop = function (b) {
            var d = this, e = this.$element.hasClass('fade') ? 'fade' : '';
            if (this.isShown && this.options.backdrop) {
                var f = a.support.transition && e;
                if (this.$backdrop = a(document.createElement('div')).addClass('modal-backdrop ' + e).appendTo(this.$body), this.$element.on('click.dismiss.bs.modal', a.proxy(function (a) {
                        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ('static' == this.options.backdrop ? this.$element[0].focus() : this.hide()));
                    }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass('in'), !b)
                    return;
                f ? this.$backdrop.one('bsTransitionEnd', b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in');
                var g = function () {
                    d.removeBackdrop(), b && b();
                };
                a.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
            } else
                b && b();
        }, c.prototype.handleUpdate = function () {
            this.adjustDialog();
        }, c.prototype.adjustDialog = function () {
            var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : '',
                paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ''
            });
        }, c.prototype.resetAdjustments = function () {
            this.$element.css({
                paddingLeft: '',
                paddingRight: ''
            });
        }, c.prototype.checkScrollbar = function () {
            var a = window.innerWidth;
            if (!a) {
                var b = document.documentElement.getBoundingClientRect();
                a = b.right - Math.abs(b.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
        }, c.prototype.setScrollbar = function () {
            var a = parseInt(this.$body.css('padding-right') || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || '', this.bodyIsOverflowing && this.$body.css('padding-right', a + this.scrollbarWidth);
        }, c.prototype.resetScrollbar = function () {
            this.$body.css('padding-right', this.originalBodyPad);
        }, c.prototype.measureScrollbar = function () {
            var a = document.createElement('div');
            a.className = 'modal-scrollbar-measure', this.$body.append(a);
            var b = a.offsetWidth - a.clientWidth;
            return this.$body[0].removeChild(a), b;
        };
        var d = a.fn.modal;
        a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
            return a.fn.modal = d, this;
        }, a(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (c) {
            var d = a(this), e = d.attr('href'), f = a(d.attr('data-target') || e && e.replace(/.*(?=#[^\s]+$)/, '')), g = f.data('bs.modal') ? 'toggle' : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
            d.is('a') && c.preventDefault(), f.one('show.bs.modal', function (a) {
                a.isDefaultPrevented() || f.one('hidden.bs.modal', function () {
                    d.is(':visible') && d.trigger('focus');
                });
            }), b.call(f, g, this);
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.tooltip'), f = 'object' == typeof b && b;
                !e && /destroy|hide/.test(b) || (e || d.data('bs.tooltip', e = new c(this, f)), 'string' == typeof b && e[b]());
            });
        }
        var c = function (a, b) {
            this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init('tooltip', a, b);
        };
        c.VERSION = '3.3.7', c.TRANSITION_DURATION = 150, c.DEFAULTS = {
            animation: !0,
            placement: 'top',
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: 'body',
                padding: 0
            }
        }, c.prototype.init = function (b, c, d) {
            if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                    click: !1,
                    hover: !1,
                    focus: !1
                }, this.$element[0] instanceof document.constructor && !this.options.selector)
                throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
            for (var e = this.options.trigger.split(' '), f = e.length; f--;) {
                var g = e[f];
                if ('click' == g)
                    this.$element.on('click.' + this.type, this.options.selector, a.proxy(this.toggle, this));
                else if ('manual' != g) {
                    var h = 'hover' == g ? 'mouseenter' : 'focusin', i = 'hover' == g ? 'mouseleave' : 'focusout';
                    this.$element.on(h + '.' + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + '.' + this.type, this.options.selector, a.proxy(this.leave, this));
                }
            }
            this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            }) : this.fixTitle();
        }, c.prototype.getDefaults = function () {
            return c.DEFAULTS;
        }, c.prototype.getOptions = function (b) {
            return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && 'number' == typeof b.delay && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b;
        }, c.prototype.getDelegateOptions = function () {
            var b = {}, c = this.getDefaults();
            return this._options && a.each(this._options, function (a, d) {
                c[a] != d && (b[a] = d);
            }), b;
        }, c.prototype.enter = function (b) {
            var c = b instanceof this.constructor ? b : a(b.currentTarget).data('bs.' + this.type);
            return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data('bs.' + this.type, c)), b instanceof a.Event && (c.inState['focusin' == b.type ? 'focus' : 'hover'] = !0), c.tip().hasClass('in') || 'in' == c.hoverState ? void (c.hoverState = 'in') : (clearTimeout(c.timeout), c.hoverState = 'in', c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
                'in' == c.hoverState && c.show();
            }, c.options.delay.show)) : c.show());
        }, c.prototype.isInStateTrue = function () {
            for (var a in this.inState)
                if (this.inState[a])
                    return !0;
            return !1;
        }, c.prototype.leave = function (b) {
            var c = b instanceof this.constructor ? b : a(b.currentTarget).data('bs.' + this.type);
            if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data('bs.' + this.type, c)), b instanceof a.Event && (c.inState['focusout' == b.type ? 'focus' : 'hover'] = !1), !c.isInStateTrue())
                return clearTimeout(c.timeout), c.hoverState = 'out', c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
                    'out' == c.hoverState && c.hide();
                }, c.options.delay.hide)) : c.hide();
        }, c.prototype.show = function () {
            var b = a.Event('show.bs.' + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(b);
                var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (b.isDefaultPrevented() || !d)
                    return;
                var e = this, f = this.tip(), g = this.getUID(this.type);
                this.setContent(), f.attr('id', g), this.$element.attr('aria-describedby', g), this.options.animation && f.addClass('fade');
                var h = 'function' == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
                j && (h = h.replace(i, '') || 'top'), f.detach().css({
                    top: 0,
                    left: 0,
                    display: 'block'
                }).addClass(h).data('bs.' + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger('inserted.bs.' + this.type);
                var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
                if (j) {
                    var n = h, o = this.getPosition(this.$viewport);
                    h = 'bottom' == h && k.bottom + m > o.bottom ? 'top' : 'top' == h && k.top - m < o.top ? 'bottom' : 'right' == h && k.right + l > o.width ? 'left' : 'left' == h && k.left - l < o.left ? 'right' : h, f.removeClass(n).addClass(h);
                }
                var p = this.getCalculatedOffset(h, k, l, m);
                this.applyPlacement(p, h);
                var q = function () {
                    var a = e.hoverState;
                    e.$element.trigger('shown.bs.' + e.type), e.hoverState = null, 'out' == a && e.leave(e);
                };
                a.support.transition && this.$tip.hasClass('fade') ? f.one('bsTransitionEnd', q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
            }
        }, c.prototype.applyPlacement = function (b, c) {
            var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css('margin-top'), 10), h = parseInt(d.css('margin-left'), 10);
            isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
                using: function (a) {
                    d.css({
                        top: Math.round(a.top),
                        left: Math.round(a.left)
                    });
                }
            }, b), 0), d.addClass('in');
            var i = d[0].offsetWidth, j = d[0].offsetHeight;
            'top' == c && j != f && (b.top = b.top + f - j);
            var k = this.getViewportAdjustedDelta(c, b, i, j);
            k.left ? b.left += k.left : b.top += k.top;
            var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? 'offsetWidth' : 'offsetHeight';
            d.offset(b), this.replaceArrow(m, d[0][n], l);
        }, c.prototype.replaceArrow = function (a, b, c) {
            this.arrow().css(c ? 'left' : 'top', 50 * (1 - a / b) + '%').css(c ? 'top' : 'left', '');
        }, c.prototype.setContent = function () {
            var a = this.tip(), b = this.getTitle();
            a.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](b), a.removeClass('fade in top bottom left right');
        }, c.prototype.hide = function (b) {
            function d() {
                'in' != e.hoverState && f.detach(), e.$element && e.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + e.type), b && b();
            }
            var e = this, f = a(this.$tip), g = a.Event('hide.bs.' + this.type);
            if (this.$element.trigger(g), !g.isDefaultPrevented())
                return f.removeClass('in'), a.support.transition && f.hasClass('fade') ? f.one('bsTransitionEnd', d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this;
        }, c.prototype.fixTitle = function () {
            var a = this.$element;
            (a.attr('title') || 'string' != typeof a.attr('data-original-title')) && a.attr('data-original-title', a.attr('title') || '').attr('title', '');
        }, c.prototype.hasContent = function () {
            return this.getTitle();
        }, c.prototype.getPosition = function (b) {
            b = b || this.$element;
            var c = b[0], d = 'BODY' == c.tagName, e = c.getBoundingClientRect();
            null == e.width && (e = a.extend({}, e, {
                width: e.right - e.left,
                height: e.bottom - e.top
            }));
            var f = window.SVGElement && c instanceof window.SVGElement, g = d ? {
                    top: 0,
                    left: 0
                } : f ? null : b.offset(), h = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() }, i = d ? {
                    width: a(window).width(),
                    height: a(window).height()
                } : null;
            return a.extend({}, e, h, i, g);
        }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
            return 'bottom' == a ? {
                top: b.top + b.height,
                left: b.left + b.width / 2 - c / 2
            } : 'top' == a ? {
                top: b.top - d,
                left: b.left + b.width / 2 - c / 2
            } : 'left' == a ? {
                top: b.top + b.height / 2 - d / 2,
                left: b.left - c
            } : {
                top: b.top + b.height / 2 - d / 2,
                left: b.left + b.width
            };
        }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
            var e = {
                top: 0,
                left: 0
            };
            if (!this.$viewport)
                return e;
            var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
            if (/right|left/.test(a)) {
                var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
                h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
            } else {
                var j = b.left - f, k = b.left + f + c;
                j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
            }
            return e;
        }, c.prototype.getTitle = function () {
            var a, b = this.$element, c = this.options;
            return a = b.attr('data-original-title') || ('function' == typeof c.title ? c.title.call(b[0]) : c.title);
        }, c.prototype.getUID = function (a) {
            do
                a += ~~(1000000 * Math.random());
            while (document.getElementById(a));
            return a;
        }, c.prototype.tip = function () {
            if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length))
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
            return this.$tip;
        }, c.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
        }, c.prototype.enable = function () {
            this.enabled = !0;
        }, c.prototype.disable = function () {
            this.enabled = !1;
        }, c.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled;
        }, c.prototype.toggle = function (b) {
            var c = this;
            b && (c = a(b.currentTarget).data('bs.' + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data('bs.' + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass('in') ? c.leave(c) : c.enter(c);
        }, c.prototype.destroy = function () {
            var a = this;
            clearTimeout(this.timeout), this.hide(function () {
                a.$element.off('.' + a.type).removeData('bs.' + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null;
            });
        };
        var d = a.fn.tooltip;
        a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
            return a.fn.tooltip = d, this;
        };
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.popover'), f = 'object' == typeof b && b;
                !e && /destroy|hide/.test(b) || (e || d.data('bs.popover', e = new c(this, f)), 'string' == typeof b && e[b]());
            });
        }
        var c = function (a, b) {
            this.init('popover', a, b);
        };
        if (!a.fn.tooltip)
            throw new Error('Popover requires tooltip.js');
        c.VERSION = '3.3.7', c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
            placement: 'right',
            trigger: 'click',
            content: '',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
            return c.DEFAULTS;
        }, c.prototype.setContent = function () {
            var a = this.tip(), b = this.getTitle(), c = this.getContent();
            a.find('.popover-title')[this.options.html ? 'html' : 'text'](b), a.find('.popover-content').children().detach().end()[this.options.html ? 'string' == typeof c ? 'html' : 'append' : 'text'](c), a.removeClass('fade top bottom left right in'), a.find('.popover-title').html() || a.find('.popover-title').hide();
        }, c.prototype.hasContent = function () {
            return this.getTitle() || this.getContent();
        }, c.prototype.getContent = function () {
            var a = this.$element, b = this.options;
            return a.attr('data-content') || ('function' == typeof b.content ? b.content.call(a[0]) : b.content);
        }, c.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find('.arrow');
        };
        var d = a.fn.popover;
        a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
            return a.fn.popover = d, this;
        };
    }(jQuery), +function (a) {
        'use strict';
        function b(c, d) {
            this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || '') + ' .nav li > a', this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on('scroll.bs.scrollspy', a.proxy(this.process, this)), this.refresh(), this.process();
        }
        function c(c) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.scrollspy'), f = 'object' == typeof c && c;
                e || d.data('bs.scrollspy', e = new b(this, f)), 'string' == typeof c && e[c]();
            });
        }
        b.VERSION = '3.3.7', b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        }, b.prototype.refresh = function () {
            var b = this, c = 'offset', d = 0;
            this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = 'position', d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
                var b = a(this), e = b.data('target') || b.attr('href'), f = /^#./.test(e) && a(e);
                return f && f.length && f.is(':visible') && [[
                        f[c]().top + d,
                        e
                    ]] || null;
            }).sort(function (a, b) {
                return a[0] - b[0];
            }).each(function () {
                b.offsets.push(this[0]), b.targets.push(this[1]);
            });
        }, b.prototype.process = function () {
            var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
            if (this.scrollHeight != c && this.refresh(), b >= d)
                return g != (a = f[f.length - 1]) && this.activate(a);
            if (g && b < e[0])
                return this.activeTarget = null, this.clear();
            for (a = e.length; a--;)
                g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
        }, b.prototype.activate = function (b) {
            this.activeTarget = b, this.clear();
            var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents('li').addClass('active');
            d.parent('.dropdown-menu').length && (d = d.closest('li.dropdown').addClass('active')), d.trigger('activate.bs.scrollspy');
        }, b.prototype.clear = function () {
            a(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
        };
        var d = a.fn.scrollspy;
        a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
            return a.fn.scrollspy = d, this;
        }, a(window).on('load.bs.scrollspy.data-api', function () {
            a('[data-spy="scroll"]').each(function () {
                var b = a(this);
                c.call(b, b.data());
            });
        });
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.tab');
                e || d.data('bs.tab', e = new c(this)), 'string' == typeof b && e[b]();
            });
        }
        var c = function (b) {
            this.element = a(b);
        };
        c.VERSION = '3.3.7', c.TRANSITION_DURATION = 150, c.prototype.show = function () {
            var b = this.element, c = b.closest('ul:not(.dropdown-menu)'), d = b.data('target');
            if (d || (d = b.attr('href'), d = d && d.replace(/.*(?=#[^\s]*$)/, '')), !b.parent('li').hasClass('active')) {
                var e = c.find('.active:last a'), f = a.Event('hide.bs.tab', { relatedTarget: b[0] }), g = a.Event('show.bs.tab', { relatedTarget: e[0] });
                if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                    var h = a(d);
                    this.activate(b.closest('li'), c), this.activate(h, h.parent(), function () {
                        e.trigger({
                            type: 'hidden.bs.tab',
                            relatedTarget: b[0]
                        }), b.trigger({
                            type: 'shown.bs.tab',
                            relatedTarget: e[0]
                        });
                    });
                }
            }
        }, c.prototype.activate = function (b, d, e) {
            function f() {
                g.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !1), b.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', !0), h ? (b[0].offsetWidth, b.addClass('in')) : b.removeClass('fade'), b.parent('.dropdown-menu').length && b.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !0), e && e();
            }
            var g = d.find('> .active'), h = e && a.support.transition && (g.length && g.hasClass('fade') || !!d.find('> .fade').length);
            g.length && h ? g.one('bsTransitionEnd', f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass('in');
        };
        var d = a.fn.tab;
        a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
            return a.fn.tab = d, this;
        };
        var e = function (c) {
            c.preventDefault(), b.call(a(this), 'show');
        };
        a(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', e).on('click.bs.tab.data-api', '[data-toggle="pill"]', e);
    }(jQuery), +function (a) {
        'use strict';
        function b(b) {
            return this.each(function () {
                var d = a(this), e = d.data('bs.affix'), f = 'object' == typeof b && b;
                e || d.data('bs.affix', e = new c(this, f)), 'string' == typeof b && e[b]();
            });
        }
        var c = function (b, d) {
            this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on('scroll.bs.affix.data-api', a.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
        };
        c.VERSION = '3.3.7', c.RESET = 'affix affix-top affix-bottom', c.DEFAULTS = {
            offset: 0,
            target: window
        }, c.prototype.getState = function (a, b, c, d) {
            var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
            if (null != c && 'top' == this.affixed)
                return e < c && 'top';
            if ('bottom' == this.affixed)
                return null != c ? !(e + this.unpin <= f.top) && 'bottom' : !(e + g <= a - d) && 'bottom';
            var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
            return null != c && e <= c ? 'top' : null != d && i + j >= a - d && 'bottom';
        }, c.prototype.getPinnedOffset = function () {
            if (this.pinnedOffset)
                return this.pinnedOffset;
            this.$element.removeClass(c.RESET).addClass('affix');
            var a = this.$target.scrollTop(), b = this.$element.offset();
            return this.pinnedOffset = b.top - a;
        }, c.prototype.checkPositionWithEventLoop = function () {
            setTimeout(a.proxy(this.checkPosition, this), 1);
        }, c.prototype.checkPosition = function () {
            if (this.$element.is(':visible')) {
                var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = Math.max(a(document).height(), a(document.body).height());
                'object' != typeof d && (f = e = d), 'function' == typeof e && (e = d.top(this.$element)), 'function' == typeof f && (f = d.bottom(this.$element));
                var h = this.getState(g, b, e, f);
                if (this.affixed != h) {
                    null != this.unpin && this.$element.css('top', '');
                    var i = 'affix' + (h ? '-' + h : ''), j = a.Event(i + '.bs.affix');
                    if (this.$element.trigger(j), j.isDefaultPrevented())
                        return;
                    this.affixed = h, this.unpin = 'bottom' == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace('affix', 'affixed') + '.bs.affix');
                }
                'bottom' == h && this.$element.offset({ top: g - b - f });
            }
        };
        var d = a.fn.affix;
        a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
            return a.fn.affix = d, this;
        }, a(window).on('load', function () {
            a('[data-spy="affix"]').each(function () {
                var c = a(this), d = c.data();
                d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
            });
        });
    }(jQuery);
    return;
});
angular.module('ui.bootstrap', [
    'ui.bootstrap.tpls',
    'ui.bootstrap.transition',
    'ui.bootstrap.collapse',
    'ui.bootstrap.accordion',
    'ui.bootstrap.alert',
    'ui.bootstrap.bindHtml',
    'ui.bootstrap.buttons',
    'ui.bootstrap.carousel',
    'ui.bootstrap.dateparser',
    'ui.bootstrap.position',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.modal',
    'ui.bootstrap.pagination',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.popover',
    'ui.bootstrap.progressbar',
    'ui.bootstrap.rating',
    'ui.bootstrap.tabs',
    'ui.bootstrap.timepicker',
    'ui.bootstrap.typeahead'
]), angular.module('ui.bootstrap.tpls', [
    'template/accordion/accordion-group.html',
    'template/accordion/accordion.html',
    'template/alert/alert.html',
    'template/carousel/carousel.html',
    'template/carousel/slide.html',
    'template/datepicker/datepicker.html',
    'template/datepicker/day.html',
    'template/datepicker/month.html',
    'template/datepicker/popup.html',
    'template/datepicker/year.html',
    'template/modal/backdrop.html',
    'template/modal/window.html',
    'template/pagination/pager.html',
    'template/pagination/pagination.html',
    'template/tooltip/tooltip-html-unsafe-popup.html',
    'template/tooltip/tooltip-popup.html',
    'template/popover/popover.html',
    'template/progressbar/bar.html',
    'template/progressbar/progress.html',
    'template/progressbar/progressbar.html',
    'template/rating/rating.html',
    'template/tabs/tab.html',
    'template/tabs/tabset.html',
    'template/timepicker/timepicker.html',
    'template/typeahead/typeahead-match.html',
    'template/typeahead/typeahead-popup.html'
]), angular.module('ui.bootstrap.transition', []).factory('$transition', [
    '$q',
    '$timeout',
    '$rootScope',
    function (a, b, c) {
        function d(a) {
            for (var b in a)
                if (void 0 !== f.style[b])
                    return a[b];
        }
        var e = function (d, f, g) {
                g = g || {};
                var h = a.defer(), i = e[g.animation ? 'animationEndEventName' : 'transitionEndEventName'], j = function () {
                        c.$apply(function () {
                            d.unbind(i, j), h.resolve(d);
                        });
                    };
                return i && d.bind(i, j), b(function () {
                    angular.isString(f) ? d.addClass(f) : angular.isFunction(f) ? f(d) : angular.isObject(f) && d.css(f), i || h.resolve(d);
                }), h.promise.cancel = function () {
                    i && d.unbind(i, j), h.reject('Transition cancelled');
                }, h.promise;
            }, f = document.createElement('trans'), g = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd',
                transition: 'transitionend'
            }, h = {
                WebkitTransition: 'webkitAnimationEnd',
                MozTransition: 'animationend',
                OTransition: 'oAnimationEnd',
                transition: 'animationend'
            };
        return e.transitionEndEventName = d(g), e.animationEndEventName = d(h), e;
    }
]), angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
    '$transition',
    function (a) {
        return {
            link: function (b, c, d) {
                function e(b) {
                    function d() {
                        j === e && (j = void 0);
                    }
                    var e = a(c, b);
                    return j && j.cancel(), j = e, e.then(d, d), e;
                }
                function f() {
                    k ? (k = !1, g()) : (c.removeClass('collapse').addClass('collapsing'), e({ height: c[0].scrollHeight + 'px' }).then(g));
                }
                function g() {
                    c.removeClass('collapsing'), c.addClass('collapse in'), c.css({ height: 'auto' });
                }
                function h() {
                    if (k)
                        k = !1, i(), c.css({ height: 0 });
                    else {
                        c.css({ height: c[0].scrollHeight + 'px' });
                        {
                            c[0].offsetWidth;
                        }
                        c.removeClass('collapse in').addClass('collapsing'), e({ height: 0 }).then(i);
                    }
                }
                function i() {
                    c.removeClass('collapsing'), c.addClass('collapse');
                }
                var j, k = !0;
                b.$watch(d.collapse, function (a) {
                    a ? h() : f();
                });
            }
        };
    }
]), angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: !0 }).controller('AccordionController', [
    '$scope',
    '$attrs',
    'accordionConfig',
    function (a, b, c) {
        this.groups = [], this.closeOthers = function (d) {
            var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
            e && angular.forEach(this.groups, function (a) {
                a !== d && (a.isOpen = !1);
            });
        }, this.addGroup = function (a) {
            var b = this;
            this.groups.push(a), a.$on('$destroy', function () {
                b.removeGroup(a);
            });
        }, this.removeGroup = function (a) {
            var b = this.groups.indexOf(a);
            -1 !== b && this.groups.splice(b, 1);
        };
    }
]).directive('accordion', function () {
    return {
        restrict: 'EA',
        controller: 'AccordionController',
        transclude: !0,
        replace: !1,
        templateUrl: 'template/accordion/accordion.html'
    };
}).directive('accordionGroup', function () {
    return {
        require: '^accordion',
        restrict: 'EA',
        transclude: !0,
        replace: !0,
        templateUrl: 'template/accordion/accordion-group.html',
        scope: {
            heading: '@',
            isOpen: '=?',
            isDisabled: '=?'
        },
        controller: function () {
            this.setHeading = function (a) {
                this.heading = a;
            };
        },
        link: function (a, b, c, d) {
            d.addGroup(a), a.$watch('isOpen', function (b) {
                b && d.closeOthers(a);
            }), a.toggleOpen = function () {
                a.isDisabled || (a.isOpen = !a.isOpen);
            };
        }
    };
}).directive('accordionHeading', function () {
    return {
        restrict: 'EA',
        transclude: !0,
        template: '',
        replace: !0,
        require: '^accordionGroup',
        link: function (a, b, c, d, e) {
            d.setHeading(e(a, function () {
            }));
        }
    };
}).directive('accordionTransclude', function () {
    return {
        require: '^accordionGroup',
        link: function (a, b, c, d) {
            a.$watch(function () {
                return d[c.accordionTransclude];
            }, function (a) {
                a && (b.html(''), b.append(a));
            });
        }
    };
}), angular.module('ui.bootstrap.alert', []).controller('AlertController', [
    '$scope',
    '$attrs',
    function (a, b) {
        a.closeable = 'close' in b, this.close = a.close;
    }
]).directive('alert', function () {
    return {
        restrict: 'EA',
        controller: 'AlertController',
        templateUrl: 'template/alert/alert.html',
        transclude: !0,
        replace: !0,
        scope: {
            type: '@',
            close: '&'
        }
    };
}).directive('dismissOnTimeout', [
    '$timeout',
    function (a) {
        return {
            require: 'alert',
            link: function (b, c, d, e) {
                a(function () {
                    e.close();
                }, parseInt(d.dismissOnTimeout, 10));
            }
        };
    }
]), angular.module('ui.bootstrap.bindHtml', []).directive('bindHtmlUnsafe', function () {
    return function (a, b, c) {
        b.addClass('ng-binding').data('$binding', c.bindHtmlUnsafe), a.$watch(c.bindHtmlUnsafe, function (a) {
            b.html(a || '');
        });
    };
}), angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
    activeClass: 'active',
    toggleEvent: 'click'
}).controller('ButtonsController', [
    'buttonConfig',
    function (a) {
        this.activeClass = a.activeClass || 'active', this.toggleEvent = a.toggleEvent || 'click';
    }
]).directive('btnRadio', function () {
    return {
        require: [
            'btnRadio',
            'ngModel'
        ],
        controller: 'ButtonsController',
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f.$render = function () {
                b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.btnRadio)));
            }, b.bind(e.toggleEvent, function () {
                var d = b.hasClass(e.activeClass);
                (!d || angular.isDefined(c.uncheckable)) && a.$apply(function () {
                    f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render();
                });
            });
        }
    };
}).directive('btnCheckbox', function () {
    return {
        require: [
            'btnCheckbox',
            'ngModel'
        ],
        controller: 'ButtonsController',
        link: function (a, b, c, d) {
            function e() {
                return g(c.btnCheckboxTrue, !0);
            }
            function f() {
                return g(c.btnCheckboxFalse, !1);
            }
            function g(b, c) {
                var d = a.$eval(b);
                return angular.isDefined(d) ? d : c;
            }
            var h = d[0], i = d[1];
            i.$render = function () {
                b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()));
            }, b.bind(h.toggleEvent, function () {
                a.$apply(function () {
                    i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render();
                });
            });
        }
    };
}), angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
    '$scope',
    '$timeout',
    '$interval',
    '$transition',
    function (a, b, c, d) {
        function e() {
            f();
            var b = +a.interval;
            !isNaN(b) && b > 0 && (h = c(g, b));
        }
        function f() {
            h && (c.cancel(h), h = null);
        }
        function g() {
            var b = +a.interval;
            i && !isNaN(b) && b > 0 ? a.next() : a.pause();
        }
        var h, i, j = this, k = j.slides = a.slides = [], l = -1;
        j.currentSlide = null;
        var m = !1;
        j.select = a.select = function (c, f) {
            function g() {
                if (!m) {
                    if (j.currentSlide && angular.isString(f) && !a.noTransition && c.$element) {
                        c.$element.addClass(f);
                        {
                            c.$element[0].offsetWidth;
                        }
                        angular.forEach(k, function (a) {
                            angular.extend(a, {
                                direction: '',
                                entering: !1,
                                leaving: !1,
                                active: !1
                            });
                        }), angular.extend(c, {
                            direction: f,
                            active: !0,
                            entering: !0
                        }), angular.extend(j.currentSlide || {}, {
                            direction: f,
                            leaving: !0
                        }), a.$currentTransition = d(c.$element, {}), function (b, c) {
                            a.$currentTransition.then(function () {
                                h(b, c);
                            }, function () {
                                h(b, c);
                            });
                        }(c, j.currentSlide);
                    } else
                        h(c, j.currentSlide);
                    j.currentSlide = c, l = i, e();
                }
            }
            function h(b, c) {
                angular.extend(b, {
                    direction: '',
                    active: !0,
                    leaving: !1,
                    entering: !1
                }), angular.extend(c || {}, {
                    direction: '',
                    active: !1,
                    leaving: !1,
                    entering: !1
                }), a.$currentTransition = null;
            }
            var i = k.indexOf(c);
            void 0 === f && (f = i > l ? 'next' : 'prev'), c && c !== j.currentSlide && (a.$currentTransition ? (a.$currentTransition.cancel(), b(g)) : g());
        }, a.$on('$destroy', function () {
            m = !0;
        }), j.indexOfSlide = function (a) {
            return k.indexOf(a);
        }, a.next = function () {
            var b = (l + 1) % k.length;
            return a.$currentTransition ? void 0 : j.select(k[b], 'next');
        }, a.prev = function () {
            var b = 0 > l - 1 ? k.length - 1 : l - 1;
            return a.$currentTransition ? void 0 : j.select(k[b], 'prev');
        }, a.isActive = function (a) {
            return j.currentSlide === a;
        }, a.$watch('interval', e), a.$on('$destroy', f), a.play = function () {
            i || (i = !0, e());
        }, a.pause = function () {
            a.noPause || (i = !1, f());
        }, j.addSlide = function (b, c) {
            b.$element = c, k.push(b), 1 === k.length || b.active ? (j.select(k[k.length - 1]), 1 == k.length && a.play()) : b.active = !1;
        }, j.removeSlide = function (a) {
            var b = k.indexOf(a);
            k.splice(b, 1), k.length > 0 && a.active ? j.select(b >= k.length ? k[b - 1] : k[b]) : l > b && l--;
        };
    }
]).directive('carousel', [function () {
        return {
            restrict: 'EA',
            transclude: !0,
            replace: !0,
            controller: 'CarouselController',
            require: 'carousel',
            templateUrl: 'template/carousel/carousel.html',
            scope: {
                interval: '=',
                noTransition: '=',
                noPause: '='
            }
        };
    }]).directive('slide', function () {
    return {
        require: '^carousel',
        restrict: 'EA',
        transclude: !0,
        replace: !0,
        templateUrl: 'template/carousel/slide.html',
        scope: { active: '=?' },
        link: function (a, b, c, d) {
            d.addSlide(a, b), a.$on('$destroy', function () {
                d.removeSlide(a);
            }), a.$watch('active', function (b) {
                b && d.select(a);
            });
        }
    };
}), angular.module('ui.bootstrap.dateparser', []).service('dateParser', [
    '$locale',
    'orderByFilter',
    function (a, b) {
        function c(a) {
            var c = [], d = a.split('');
            return angular.forEach(e, function (b, e) {
                var f = a.indexOf(e);
                if (f > -1) {
                    a = a.split(''), d[f] = '(' + b.regex + ')', a[f] = '$';
                    for (var g = f + 1, h = f + e.length; h > g; g++)
                        d[g] = '', a[g] = '$';
                    a = a.join(''), c.push({
                        index: f,
                        apply: b.apply
                    });
                }
            }), {
                regex: new RegExp('^' + d.join('') + '$'),
                map: b(c, 'index')
            };
        }
        function d(a, b, c) {
            return 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0;
        }
        this.parsers = {};
        var e = {
            yyyy: {
                regex: '\\d{4}',
                apply: function (a) {
                    this.year = +a;
                }
            },
            yy: {
                regex: '\\d{2}',
                apply: function (a) {
                    this.year = +a + 2000;
                }
            },
            y: {
                regex: '\\d{1,4}',
                apply: function (a) {
                    this.year = +a;
                }
            },
            MMMM: {
                regex: a.DATETIME_FORMATS.MONTH.join('|'),
                apply: function (b) {
                    this.month = a.DATETIME_FORMATS.MONTH.indexOf(b);
                }
            },
            MMM: {
                regex: a.DATETIME_FORMATS.SHORTMONTH.join('|'),
                apply: function (b) {
                    this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b);
                }
            },
            MM: {
                regex: '0[1-9]|1[0-2]',
                apply: function (a) {
                    this.month = a - 1;
                }
            },
            M: {
                regex: '[1-9]|1[0-2]',
                apply: function (a) {
                    this.month = a - 1;
                }
            },
            dd: {
                regex: '[0-2][0-9]{1}|3[0-1]{1}',
                apply: function (a) {
                    this.date = +a;
                }
            },
            d: {
                regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
                apply: function (a) {
                    this.date = +a;
                }
            },
            EEEE: { regex: a.DATETIME_FORMATS.DAY.join('|') },
            EEE: { regex: a.DATETIME_FORMATS.SHORTDAY.join('|') }
        };
        this.parse = function (b, e) {
            if (!angular.isString(b) || !e)
                return b;
            e = a.DATETIME_FORMATS[e] || e, this.parsers[e] || (this.parsers[e] = c(e));
            var f = this.parsers[e], g = f.regex, h = f.map, i = b.match(g);
            if (i && i.length) {
                for (var j, k = {
                            year: 1900,
                            month: 0,
                            date: 1,
                            hours: 0
                        }, l = 1, m = i.length; m > l; l++) {
                    var n = h[l - 1];
                    n.apply && n.apply.call(k, i[l]);
                }
                return d(k.year, k.month, k.date) && (j = new Date(k.year, k.month, k.date, k.hours)), j;
            }
        };
    }
]), angular.module('ui.bootstrap.position', []).factory('$position', [
    '$document',
    '$window',
    function (a, b) {
        function c(a, c) {
            return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c];
        }
        function d(a) {
            return 'static' === (c(a, 'position') || 'static');
        }
        var e = function (b) {
            for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e);)
                e = e.offsetParent;
            return e || c;
        };
        return {
            position: function (b) {
                var c = this.offset(b), d = {
                        top: 0,
                        left: 0
                    }, f = e(b[0]);
                f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, d.left += f.clientLeft - f.scrollLeft);
                var g = b[0].getBoundingClientRect();
                return {
                    width: g.width || b.prop('offsetWidth'),
                    height: g.height || b.prop('offsetHeight'),
                    top: c.top - d.top,
                    left: c.left - d.left
                };
            },
            offset: function (c) {
                var d = c[0].getBoundingClientRect();
                return {
                    width: d.width || c.prop('offsetWidth'),
                    height: d.height || c.prop('offsetHeight'),
                    top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
                    left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
                };
            },
            positionElements: function (a, b, c, d) {
                var e, f, g, h, i = c.split('-'), j = i[0], k = i[1] || 'center';
                e = d ? this.offset(a) : this.position(a), f = b.prop('offsetWidth'), g = b.prop('offsetHeight');
                var l = {
                        center: function () {
                            return e.left + e.width / 2 - f / 2;
                        },
                        left: function () {
                            return e.left;
                        },
                        right: function () {
                            return e.left + e.width;
                        }
                    }, m = {
                        center: function () {
                            return e.top + e.height / 2 - g / 2;
                        },
                        top: function () {
                            return e.top;
                        },
                        bottom: function () {
                            return e.top + e.height;
                        }
                    };
                switch (j) {
                case 'right':
                    h = {
                        top: m[k](),
                        left: l[j]()
                    };
                    break;
                case 'left':
                    h = {
                        top: m[k](),
                        left: e.left - f
                    };
                    break;
                case 'bottom':
                    h = {
                        top: m[j](),
                        left: l[k]()
                    };
                    break;
                default:
                    h = {
                        top: e.top - g,
                        left: l[k]()
                    };
                }
                return h;
            }
        };
    }
]), angular.module('ui.bootstrap.datepicker', [
    'ui.bootstrap.dateparser',
    'ui.bootstrap.position'
]).constant('datepickerConfig', {
    formatDay: 'dd',
    formatMonth: 'MMMM',
    formatYear: 'yyyy',
    formatDayHeader: 'EEE',
    formatDayTitle: 'MMMM yyyy',
    formatMonthTitle: 'yyyy',
    datepickerMode: 'day',
    minMode: 'day',
    maxMode: 'year',
    showWeeks: !0,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller('DatepickerController', [
    '$scope',
    '$attrs',
    '$parse',
    '$interpolate',
    '$timeout',
    '$log',
    'dateFilter',
    'datepickerConfig',
    function (a, b, c, d, e, f, g, h) {
        var i = this, j = { $setViewValue: angular.noop };
        this.modes = [
            'day',
            'month',
            'year'
        ], angular.forEach([
            'formatDay',
            'formatMonth',
            'formatYear',
            'formatDayHeader',
            'formatDayTitle',
            'formatMonthTitle',
            'minMode',
            'maxMode',
            'showWeeks',
            'startingDay',
            'yearRange'
        ], function (c, e) {
            i[c] = angular.isDefined(b[c]) ? 8 > e ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : h[c];
        }), angular.forEach([
            'minDate',
            'maxDate'
        ], function (d) {
            b[d] ? a.$parent.$watch(c(b[d]), function (a) {
                i[d] = a ? new Date(a) : null, i.refreshView();
            }) : i[d] = h[d] ? new Date(h[d]) : null;
        }), a.datepickerMode = a.datepickerMode || h.datepickerMode, a.uniqueId = 'datepicker-' + a.$id + '-' + Math.floor(10000 * Math.random()), this.activeDate = angular.isDefined(b.initDate) ? a.$parent.$eval(b.initDate) : new Date(), a.isActive = function (b) {
            return 0 === i.compare(b.date, i.activeDate) ? (a.activeDateId = b.uid, !0) : !1;
        }, this.init = function (a) {
            j = a, j.$render = function () {
                i.render();
            };
        }, this.render = function () {
            if (j.$modelValue) {
                var a = new Date(j.$modelValue), b = !isNaN(a);
                b ? this.activeDate = a : f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), j.$setValidity('date', b);
            }
            this.refreshView();
        }, this.refreshView = function () {
            if (this.element) {
                this._refreshView();
                var a = j.$modelValue ? new Date(j.$modelValue) : null;
                j.$setValidity('date-disabled', !a || this.element && !this.isDisabled(a));
            }
        }, this.createDateObject = function (a, b) {
            var c = j.$modelValue ? new Date(j.$modelValue) : null;
            return {
                date: a,
                label: g(a, b),
                selected: c && 0 === this.compare(a, c),
                disabled: this.isDisabled(a),
                current: 0 === this.compare(a, new Date())
            };
        }, this.isDisabled = function (c) {
            return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
                date: c,
                mode: a.datepickerMode
            });
        }, this.split = function (a, b) {
            for (var c = []; a.length > 0;)
                c.push(a.splice(0, b));
            return c;
        }, a.select = function (b) {
            if (a.datepickerMode === i.minMode) {
                var c = j.$modelValue ? new Date(j.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render();
            } else
                i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1];
        }, a.move = function (a) {
            var b = i.activeDate.getFullYear() + a * (i.step.years || 0), c = i.activeDate.getMonth() + a * (i.step.months || 0);
            i.activeDate.setFullYear(b, c, 1), i.refreshView();
        }, a.toggleMode = function (b) {
            b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && -1 === b || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b]);
        }, a.keys = {
            13: 'enter',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        var k = function () {
            e(function () {
                i.element[0].focus();
            }, 0, !1);
        };
        a.$on('datepicker.focus', k), a.keydown = function (b) {
            var c = a.keys[b.which];
            if (c && !b.shiftKey && !b.altKey)
                if (b.preventDefault(), b.stopPropagation(), 'enter' === c || 'space' === c) {
                    if (i.isDisabled(i.activeDate))
                        return;
                    a.select(i.activeDate), k();
                } else
                    !b.ctrlKey || 'up' !== c && 'down' !== c ? (i.handleKeyDown(c, b), i.refreshView()) : (a.toggleMode('up' === c ? 1 : -1), k());
        };
    }
]).directive('datepicker', function () {
    return {
        restrict: 'EA',
        replace: !0,
        templateUrl: 'template/datepicker/datepicker.html',
        scope: {
            datepickerMode: '=?',
            dateDisabled: '&'
        },
        require: [
            'datepicker',
            '?^ngModel'
        ],
        controller: 'DatepickerController',
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f);
        }
    };
}).directive('daypicker', [
    'dateFilter',
    function (a) {
        return {
            restrict: 'EA',
            replace: !0,
            templateUrl: 'template/datepicker/day.html',
            require: '^datepicker',
            link: function (b, c, d, e) {
                function f(a, b) {
                    return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? i[b] : 29;
                }
                function g(a, b) {
                    var c = new Array(b), d = new Date(a), e = 0;
                    for (d.setHours(12); b > e;)
                        c[e++] = new Date(d), d.setDate(d.getDate() + 1);
                    return c;
                }
                function h(a) {
                    var b = new Date(a);
                    b.setDate(b.getDate() + 4 - (b.getDay() || 7));
                    var c = b.getTime();
                    return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 86400000) / 7) + 1;
                }
                b.showWeeks = e.showWeeks, e.step = { months: 1 }, e.element = c;
                var i = [
                    31,
                    28,
                    31,
                    30,
                    31,
                    30,
                    31,
                    31,
                    30,
                    31,
                    30,
                    31
                ];
                e._refreshView = function () {
                    var c = e.activeDate.getFullYear(), d = e.activeDate.getMonth(), f = new Date(c, d, 1), i = e.startingDay - f.getDay(), j = i > 0 ? 7 - i : -i, k = new Date(f);
                    j > 0 && k.setDate(-j + 1);
                    for (var l = g(k, 42), m = 0; 42 > m; m++)
                        l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
                            secondary: l[m].getMonth() !== d,
                            uid: b.uniqueId + '-' + m
                        });
                    b.labels = new Array(7);
                    for (var n = 0; 7 > n; n++)
                        b.labels[n] = {
                            abbr: a(l[n].date, e.formatDayHeader),
                            full: a(l[n].date, 'EEEE')
                        };
                    if (b.title = a(e.activeDate, e.formatDayTitle), b.rows = e.split(l, 7), b.showWeeks) {
                        b.weekNumbers = [];
                        for (var o = h(b.rows[0][0].date), p = b.rows.length; b.weekNumbers.push(o++) < p;);
                    }
                }, e.compare = function (a, b) {
                    return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate());
                }, e.handleKeyDown = function (a) {
                    var b = e.activeDate.getDate();
                    if ('left' === a)
                        b -= 1;
                    else if ('up' === a)
                        b -= 7;
                    else if ('right' === a)
                        b += 1;
                    else if ('down' === a)
                        b += 7;
                    else if ('pageup' === a || 'pagedown' === a) {
                        var c = e.activeDate.getMonth() + ('pageup' === a ? -1 : 1);
                        e.activeDate.setMonth(c, 1), b = Math.min(f(e.activeDate.getFullYear(), e.activeDate.getMonth()), b);
                    } else
                        'home' === a ? b = 1 : 'end' === a && (b = f(e.activeDate.getFullYear(), e.activeDate.getMonth()));
                    e.activeDate.setDate(b);
                }, e.refreshView();
            }
        };
    }
]).directive('monthpicker', [
    'dateFilter',
    function (a) {
        return {
            restrict: 'EA',
            replace: !0,
            templateUrl: 'template/datepicker/month.html',
            require: '^datepicker',
            link: function (b, c, d, e) {
                e.step = { years: 1 }, e.element = c, e._refreshView = function () {
                    for (var c = new Array(12), d = e.activeDate.getFullYear(), f = 0; 12 > f; f++)
                        c[f] = angular.extend(e.createDateObject(new Date(d, f, 1), e.formatMonth), { uid: b.uniqueId + '-' + f });
                    b.title = a(e.activeDate, e.formatMonthTitle), b.rows = e.split(c, 3);
                }, e.compare = function (a, b) {
                    return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth());
                }, e.handleKeyDown = function (a) {
                    var b = e.activeDate.getMonth();
                    if ('left' === a)
                        b -= 1;
                    else if ('up' === a)
                        b -= 3;
                    else if ('right' === a)
                        b += 1;
                    else if ('down' === a)
                        b += 3;
                    else if ('pageup' === a || 'pagedown' === a) {
                        var c = e.activeDate.getFullYear() + ('pageup' === a ? -1 : 1);
                        e.activeDate.setFullYear(c);
                    } else
                        'home' === a ? b = 0 : 'end' === a && (b = 11);
                    e.activeDate.setMonth(b);
                }, e.refreshView();
            }
        };
    }
]).directive('yearpicker', [
    'dateFilter',
    function () {
        return {
            restrict: 'EA',
            replace: !0,
            templateUrl: 'template/datepicker/year.html',
            require: '^datepicker',
            link: function (a, b, c, d) {
                function e(a) {
                    return parseInt((a - 1) / f, 10) * f + 1;
                }
                var f = d.yearRange;
                d.step = { years: f }, d.element = b, d._refreshView = function () {
                    for (var b = new Array(f), c = 0, g = e(d.activeDate.getFullYear()); f > c; c++)
                        b[c] = angular.extend(d.createDateObject(new Date(g + c, 0, 1), d.formatYear), { uid: a.uniqueId + '-' + c });
                    a.title = [
                        b[0].label,
                        b[f - 1].label
                    ].join(' - '), a.rows = d.split(b, 5);
                }, d.compare = function (a, b) {
                    return a.getFullYear() - b.getFullYear();
                }, d.handleKeyDown = function (a) {
                    var b = d.activeDate.getFullYear();
                    'left' === a ? b -= 1 : 'up' === a ? b -= 5 : 'right' === a ? b += 1 : 'down' === a ? b += 5 : 'pageup' === a || 'pagedown' === a ? b += ('pageup' === a ? -1 : 1) * d.step.years : 'home' === a ? b = e(d.activeDate.getFullYear()) : 'end' === a && (b = e(d.activeDate.getFullYear()) + f - 1), d.activeDate.setFullYear(b);
                }, d.refreshView();
            }
        };
    }
]).constant('datepickerPopupConfig', {
    datepickerPopup: 'yyyy-MM-dd',
    currentText: 'Today',
    clearText: 'Clear',
    closeText: 'Done',
    closeOnDateSelection: !0,
    appendToBody: !1,
    showButtonBar: !0
}).directive('datepickerPopup', [
    '$compile',
    '$parse',
    '$document',
    '$position',
    'dateFilter',
    'dateParser',
    'datepickerPopupConfig',
    function (a, b, c, d, e, f, g) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                isOpen: '=?',
                currentText: '@',
                clearText: '@',
                closeText: '@',
                dateDisabled: '&'
            },
            link: function (h, i, j, k) {
                function l(a) {
                    return a.replace(/([A-Z])/g, function (a) {
                        return '-' + a.toLowerCase();
                    });
                }
                function m(a) {
                    if (a) {
                        if (angular.isDate(a) && !isNaN(a))
                            return k.$setValidity('date', !0), a;
                        if (angular.isString(a)) {
                            var b = f.parse(a, n) || new Date(a);
                            return isNaN(b) ? void k.$setValidity('date', !1) : (k.$setValidity('date', !0), b);
                        }
                        return void k.$setValidity('date', !1);
                    }
                    return k.$setValidity('date', !0), null;
                }
                var n, o = angular.isDefined(j.closeOnDateSelection) ? h.$parent.$eval(j.closeOnDateSelection) : g.closeOnDateSelection, p = angular.isDefined(j.datepickerAppendToBody) ? h.$parent.$eval(j.datepickerAppendToBody) : g.appendToBody;
                h.showButtonBar = angular.isDefined(j.showButtonBar) ? h.$parent.$eval(j.showButtonBar) : g.showButtonBar, h.getText = function (a) {
                    return h[a + 'Text'] || g[a + 'Text'];
                }, j.$observe('datepickerPopup', function (a) {
                    n = a || g.datepickerPopup, k.$render();
                });
                var q = angular.element('<div datepicker-popup-wrap><div datepicker></div></div>');
                q.attr({
                    'ng-model': 'date',
                    'ng-change': 'dateSelection()'
                });
                var r = angular.element(q.children()[0]);
                j.datepickerOptions && angular.forEach(h.$parent.$eval(j.datepickerOptions), function (a, b) {
                    r.attr(l(b), a);
                }), h.watchData = {}, angular.forEach([
                    'minDate',
                    'maxDate',
                    'datepickerMode'
                ], function (a) {
                    if (j[a]) {
                        var c = b(j[a]);
                        if (h.$parent.$watch(c, function (b) {
                                h.watchData[a] = b;
                            }), r.attr(l(a), 'watchData.' + a), 'datepickerMode' === a) {
                            var d = c.assign;
                            h.$watch('watchData.' + a, function (a, b) {
                                a !== b && d(h.$parent, a);
                            });
                        }
                    }
                }), j.dateDisabled && r.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })'), k.$parsers.unshift(m), h.dateSelection = function (a) {
                    angular.isDefined(a) && (h.date = a), k.$setViewValue(h.date), k.$render(), o && (h.isOpen = !1, i[0].focus());
                }, i.bind('input change keyup', function () {
                    h.$apply(function () {
                        h.date = k.$modelValue;
                    });
                }), k.$render = function () {
                    var a = k.$viewValue ? e(k.$viewValue, n) : '';
                    i.val(a), h.date = m(k.$modelValue);
                };
                var s = function (a) {
                        h.isOpen && a.target !== i[0] && h.$apply(function () {
                            h.isOpen = !1;
                        });
                    }, t = function (a) {
                        h.keydown(a);
                    };
                i.bind('keydown', t), h.keydown = function (a) {
                    27 === a.which ? (a.preventDefault(), a.stopPropagation(), h.close()) : 40 !== a.which || h.isOpen || (h.isOpen = !0);
                }, h.$watch('isOpen', function (a) {
                    a ? (h.$broadcast('datepicker.focus'), h.position = p ? d.offset(i) : d.position(i), h.position.top = h.position.top + i.prop('offsetHeight'), c.bind('click', s)) : c.unbind('click', s);
                }), h.select = function (a) {
                    if ('today' === a) {
                        var b = new Date();
                        angular.isDate(k.$modelValue) ? (a = new Date(k.$modelValue), a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate())) : a = new Date(b.setHours(0, 0, 0, 0));
                    }
                    h.dateSelection(a);
                }, h.close = function () {
                    h.isOpen = !1, i[0].focus();
                };
                var u = a(q)(h);
                q.remove(), p ? c.find('body').append(u) : i.after(u), h.$on('$destroy', function () {
                    u.remove(), i.unbind('keydown', t), c.unbind('click', s);
                });
            }
        };
    }
]).directive('datepickerPopupWrap', function () {
    return {
        restrict: 'EA',
        replace: !0,
        transclude: !0,
        templateUrl: 'template/datepicker/popup.html',
        link: function (a, b) {
            b.bind('click', function (a) {
                a.preventDefault(), a.stopPropagation();
            });
        }
    };
}), angular.module('ui.bootstrap.dropdown', []).constant('dropdownConfig', { openClass: 'open' }).service('dropdownService', [
    '$document',
    function (a) {
        var b = null;
        this.open = function (e) {
            b || (a.bind('click', c), a.bind('keydown', d)), b && b !== e && (b.isOpen = !1), b = e;
        }, this.close = function (e) {
            b === e && (b = null, a.unbind('click', c), a.unbind('keydown', d));
        };
        var c = function (a) {
                if (b) {
                    var c = b.getToggleElement();
                    a && c && c[0].contains(a.target) || b.$apply(function () {
                        b.isOpen = !1;
                    });
                }
            }, d = function (a) {
                27 === a.which && (b.focusToggleElement(), c());
            };
    }
]).controller('DropdownController', [
    '$scope',
    '$attrs',
    '$parse',
    'dropdownConfig',
    'dropdownService',
    '$animate',
    function (a, b, c, d, e, f) {
        var g, h = this, i = a.$new(), j = d.openClass, k = angular.noop, l = b.onToggle ? c(b.onToggle) : angular.noop;
        this.init = function (d) {
            h.$element = d, b.isOpen && (g = c(b.isOpen), k = g.assign, a.$watch(g, function (a) {
                i.isOpen = !!a;
            }));
        }, this.toggle = function (a) {
            return i.isOpen = arguments.length ? !!a : !i.isOpen;
        }, this.isOpen = function () {
            return i.isOpen;
        }, i.getToggleElement = function () {
            return h.toggleElement;
        }, i.focusToggleElement = function () {
            h.toggleElement && h.toggleElement[0].focus();
        }, i.$watch('isOpen', function (b, c) {
            f[b ? 'addClass' : 'removeClass'](h.$element, j), b ? (i.focusToggleElement(), e.open(i)) : e.close(i), k(a, b), angular.isDefined(b) && b !== c && l(a, { open: !!b });
        }), a.$on('$locationChangeSuccess', function () {
            i.isOpen = !1;
        }), a.$on('$destroy', function () {
            i.$destroy();
        });
    }
]).directive('dropdown', function () {
    return {
        controller: 'DropdownController',
        link: function (a, b, c, d) {
            d.init(b);
        }
    };
}).directive('dropdownToggle', function () {
    return {
        require: '?^dropdown',
        link: function (a, b, c, d) {
            if (d) {
                d.toggleElement = b;
                var e = function (e) {
                    e.preventDefault(), b.hasClass('disabled') || c.disabled || a.$apply(function () {
                        d.toggle();
                    });
                };
                b.bind('click', e), b.attr({
                    'aria-haspopup': !0,
                    'aria-expanded': !1
                }), a.$watch(d.isOpen, function (a) {
                    b.attr('aria-expanded', !!a);
                }), a.$on('$destroy', function () {
                    b.unbind('click', e);
                });
            }
        }
    };
}), angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition']).factory('$$stackedMap', function () {
    return {
        createNew: function () {
            var a = [];
            return {
                add: function (b, c) {
                    a.push({
                        key: b,
                        value: c
                    });
                },
                get: function (b) {
                    for (var c = 0; c < a.length; c++)
                        if (b == a[c].key)
                            return a[c];
                },
                keys: function () {
                    for (var b = [], c = 0; c < a.length; c++)
                        b.push(a[c].key);
                    return b;
                },
                top: function () {
                    return a[a.length - 1];
                },
                remove: function (b) {
                    for (var c = -1, d = 0; d < a.length; d++)
                        if (b == a[d].key) {
                            c = d;
                            break;
                        }
                    return a.splice(c, 1)[0];
                },
                removeTop: function () {
                    return a.splice(a.length - 1, 1)[0];
                },
                length: function () {
                    return a.length;
                }
            };
        }
    };
}).directive('modalBackdrop', [
    '$timeout',
    function (a) {
        return {
            restrict: 'EA',
            replace: !0,
            templateUrl: 'template/modal/backdrop.html',
            link: function (b, c, d) {
                b.backdropClass = d.backdropClass || '', b.animate = !1, a(function () {
                    b.animate = !0;
                });
            }
        };
    }
]).directive('modalWindow', [
    '$modalStack',
    '$timeout',
    function (a, b) {
        return {
            restrict: 'EA',
            scope: {
                index: '@',
                animate: '='
            },
            replace: !0,
            transclude: !0,
            templateUrl: function (a, b) {
                return b.templateUrl || 'template/modal/window.html';
            },
            link: function (c, d, e) {
                d.addClass(e.windowClass || ''), c.size = e.size, b(function () {
                    c.animate = !0, d[0].querySelectorAll('[autofocus]').length || d[0].focus();
                }), c.close = function (b) {
                    var c = a.getTop();
                    c && c.value.backdrop && 'static' != c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), b.stopPropagation(), a.dismiss(c.key, 'backdrop click'));
                };
            }
        };
    }
]).directive('modalTransclude', function () {
    return {
        link: function (a, b, c, d, e) {
            e(a.$parent, function (a) {
                b.empty(), b.append(a);
            });
        }
    };
}).factory('$modalStack', [
    '$transition',
    '$timeout',
    '$document',
    '$compile',
    '$rootScope',
    '$$stackedMap',
    function (a, b, c, d, e, f) {
        function g() {
            for (var a = -1, b = n.keys(), c = 0; c < b.length; c++)
                n.get(b[c]).value.backdrop && (a = c);
            return a;
        }
        function h(a) {
            var b = c.find('body').eq(0), d = n.get(a).value;
            n.remove(a), j(d.modalDomEl, d.modalScope, 300, function () {
                d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i();
            });
        }
        function i() {
            if (k && -1 == g()) {
                var a = l;
                j(k, l, 150, function () {
                    a.$destroy(), a = null;
                }), k = void 0, l = void 0;
            }
        }
        function j(c, d, e, f) {
            function g() {
                g.done || (g.done = !0, c.remove(), f && f());
            }
            d.animate = !1;
            var h = a.transitionEndEventName;
            if (h) {
                var i = b(g, e);
                c.bind(h, function () {
                    b.cancel(i), g(), d.$apply();
                });
            } else
                b(g);
        }
        var k, l, m = 'modal-open', n = f.createNew(), o = {};
        return e.$watch(g, function (a) {
            l && (l.index = a);
        }), c.bind('keydown', function (a) {
            var b;
            27 === a.which && (b = n.top(), b && b.value.keyboard && (a.preventDefault(), e.$apply(function () {
                o.dismiss(b.key, 'escape key press');
            })));
        }), o.open = function (a, b) {
            n.add(a, {
                deferred: b.deferred,
                modalScope: b.scope,
                backdrop: b.backdrop,
                keyboard: b.keyboard
            });
            var f = c.find('body').eq(0), h = g();
            if (h >= 0 && !k) {
                l = e.$new(!0), l.index = h;
                var i = angular.element('<div modal-backdrop></div>');
                i.attr('backdrop-class', b.backdropClass), k = d(i)(l), f.append(k);
            }
            var j = angular.element('<div modal-window></div>');
            j.attr({
                'template-url': b.windowTemplateUrl,
                'window-class': b.windowClass,
                size: b.size,
                index: n.length() - 1,
                animate: 'animate'
            }).html(b.content);
            var o = d(j)(b.scope);
            n.top().value.modalDomEl = o, f.append(o), f.addClass(m);
        }, o.close = function (a, b) {
            var c = n.get(a);
            c && (c.value.deferred.resolve(b), h(a));
        }, o.dismiss = function (a, b) {
            var c = n.get(a);
            c && (c.value.deferred.reject(b), h(a));
        }, o.dismissAll = function (a) {
            for (var b = this.getTop(); b;)
                this.dismiss(b.key, a), b = this.getTop();
        }, o.getTop = function () {
            return n.top();
        }, o;
    }
]).provider('$modal', function () {
    var a = {
        options: {
            backdrop: !0,
            keyboard: !0
        },
        $get: [
            '$injector',
            '$rootScope',
            '$q',
            '$http',
            '$templateCache',
            '$controller',
            '$modalStack',
            function (b, c, d, e, f, g, h) {
                function i(a) {
                    return a.template ? d.when(a.template) : e.get(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl, { cache: f }).then(function (a) {
                        return a.data;
                    });
                }
                function j(a) {
                    var c = [];
                    return angular.forEach(a, function (a) {
                        (angular.isFunction(a) || angular.isArray(a)) && c.push(d.when(b.invoke(a)));
                    }), c;
                }
                var k = {};
                return k.open = function (b) {
                    var e = d.defer(), f = d.defer(), k = {
                            result: e.promise,
                            opened: f.promise,
                            close: function (a) {
                                h.close(k, a);
                            },
                            dismiss: function (a) {
                                h.dismiss(k, a);
                            }
                        };
                    if (b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl)
                        throw new Error('One of template or templateUrl options is required.');
                    var l = d.all([i(b)].concat(j(b.resolve)));
                    return l.then(function (a) {
                        var d = (b.scope || c).$new();
                        d.$close = k.close, d.$dismiss = k.dismiss;
                        var f, i = {}, j = 1;
                        b.controller && (i.$scope = d, i.$modalInstance = k, angular.forEach(b.resolve, function (b, c) {
                            i[c] = a[j++];
                        }), f = g(b.controller, i), b.controllerAs && (d[b.controllerAs] = f)), h.open(k, {
                            scope: d,
                            deferred: e,
                            content: a[0],
                            backdrop: b.backdrop,
                            keyboard: b.keyboard,
                            backdropClass: b.backdropClass,
                            windowClass: b.windowClass,
                            windowTemplateUrl: b.windowTemplateUrl,
                            size: b.size
                        });
                    }, function (a) {
                        e.reject(a);
                    }), l.then(function () {
                        f.resolve(!0);
                    }, function () {
                        f.reject(!1);
                    }), k;
                }, k;
            }
        ]
    };
    return a;
}), angular.module('ui.bootstrap.pagination', []).controller('PaginationController', [
    '$scope',
    '$attrs',
    '$parse',
    function (a, b, c) {
        var d = this, e = { $setViewValue: angular.noop }, f = b.numPages ? c(b.numPages).assign : angular.noop;
        this.init = function (f, g) {
            e = f, this.config = g, e.$render = function () {
                d.render();
            }, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function (b) {
                d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages();
            }) : this.itemsPerPage = g.itemsPerPage;
        }, this.calculateTotalPages = function () {
            var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
            return Math.max(b || 0, 1);
        }, this.render = function () {
            a.page = parseInt(e.$viewValue, 10) || 1;
        }, a.selectPage = function (b) {
            a.page !== b && b > 0 && b <= a.totalPages && (e.$setViewValue(b), e.$render());
        }, a.getText = function (b) {
            return a[b + 'Text'] || d.config[b + 'Text'];
        }, a.noPrevious = function () {
            return 1 === a.page;
        }, a.noNext = function () {
            return a.page === a.totalPages;
        }, a.$watch('totalItems', function () {
            a.totalPages = d.calculateTotalPages();
        }), a.$watch('totalPages', function (b) {
            f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render();
        });
    }
]).constant('paginationConfig', {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: !0
}).directive('pagination', [
    '$parse',
    'paginationConfig',
    function (a, b) {
        return {
            restrict: 'EA',
            scope: {
                totalItems: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@'
            },
            require: [
                'pagination',
                '?ngModel'
            ],
            controller: 'PaginationController',
            templateUrl: 'template/pagination/pagination.html',
            replace: !0,
            link: function (c, d, e, f) {
                function g(a, b, c) {
                    return {
                        number: a,
                        text: b,
                        active: c
                    };
                }
                function h(a, b) {
                    var c = [], d = 1, e = b, f = angular.isDefined(k) && b > k;
                    f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
                    for (var h = d; e >= h; h++) {
                        var i = g(h, h, h === a);
                        c.push(i);
                    }
                    if (f && !l) {
                        if (d > 1) {
                            var j = g(d - 1, '...', !1);
                            c.unshift(j);
                        }
                        if (b > e) {
                            var m = g(e + 1, '...', !1);
                            c.push(m);
                        }
                    }
                    return c;
                }
                var i = f[0], j = f[1];
                if (j) {
                    var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize, l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
                    c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function (a) {
                        k = parseInt(a, 10), i.render();
                    });
                    var m = i.render;
                    i.render = function () {
                        m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages));
                    };
                }
            }
        };
    }
]).constant('pagerConfig', {
    itemsPerPage: 10,
    previousText: '\xAB Previous',
    nextText: 'Next \xBB',
    align: !0
}).directive('pager', [
    'pagerConfig',
    function (a) {
        return {
            restrict: 'EA',
            scope: {
                totalItems: '=',
                previousText: '@',
                nextText: '@'
            },
            require: [
                'pager',
                '?ngModel'
            ],
            controller: 'PaginationController',
            templateUrl: 'template/pagination/pager.html',
            replace: !0,
            link: function (b, c, d, e) {
                var f = e[0], g = e[1];
                g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, f.init(g, a));
            }
        };
    }
]), angular.module('ui.bootstrap.tooltip', [
    'ui.bootstrap.position',
    'ui.bootstrap.bindHtml'
]).provider('$tooltip', function () {
    function a(a) {
        var b = /[A-Z]/g, c = '-';
        return a.replace(b, function (a, b) {
            return (b ? c : '') + a.toLowerCase();
        });
    }
    var b = {
            placement: 'top',
            animation: !0,
            popupDelay: 0
        }, c = {
            mouseenter: 'mouseleave',
            click: 'click',
            focus: 'blur'
        }, d = {};
    this.options = function (a) {
        angular.extend(d, a);
    }, this.setTriggers = function (a) {
        angular.extend(c, a);
    }, this.$get = [
        '$window',
        '$compile',
        '$timeout',
        '$document',
        '$position',
        '$interpolate',
        function (e, f, g, h, i, j) {
            return function (e, k, l) {
                function m(a) {
                    var b = a || n.trigger || l, d = c[b] || b;
                    return {
                        show: b,
                        hide: d
                    };
                }
                var n = angular.extend({}, b, d), o = a(e), p = j.startSymbol(), q = j.endSymbol(), r = '<div ' + o + '-popup title="' + p + 'title' + q + '" content="' + p + 'content' + q + '" placement="' + p + 'placement' + q + '" animation="animation" is-open="isOpen"></div>';
                return {
                    restrict: 'EA',
                    compile: function () {
                        var a = f(r);
                        return function (b, c, d) {
                            function f() {
                                D.isOpen ? l() : j();
                            }
                            function j() {
                                (!C || b.$eval(d[k + 'Enable'])) && (s(), D.popupDelay ? z || (z = g(o, D.popupDelay, !1), z.then(function (a) {
                                    a();
                                })) : o()());
                            }
                            function l() {
                                b.$apply(function () {
                                    p();
                                });
                            }
                            function o() {
                                return z = null, y && (g.cancel(y), y = null), D.content ? (q(), w.css({
                                    top: 0,
                                    left: 0,
                                    display: 'block'
                                }), A ? h.find('body').append(w) : c.after(w), E(), D.isOpen = !0, D.$digest(), E) : angular.noop;
                            }
                            function p() {
                                D.isOpen = !1, g.cancel(z), z = null, D.animation ? y || (y = g(r, 500)) : r();
                            }
                            function q() {
                                w && r(), x = D.$new(), w = a(x, angular.noop);
                            }
                            function r() {
                                y = null, w && (w.remove(), w = null), x && (x.$destroy(), x = null);
                            }
                            function s() {
                                t(), u();
                            }
                            function t() {
                                var a = d[k + 'Placement'];
                                D.placement = angular.isDefined(a) ? a : n.placement;
                            }
                            function u() {
                                var a = d[k + 'PopupDelay'], b = parseInt(a, 10);
                                D.popupDelay = isNaN(b) ? n.popupDelay : b;
                            }
                            function v() {
                                var a = d[k + 'Trigger'];
                                F(), B = m(a), B.show === B.hide ? c.bind(B.show, f) : (c.bind(B.show, j), c.bind(B.hide, l));
                            }
                            var w, x, y, z, A = angular.isDefined(n.appendToBody) ? n.appendToBody : !1, B = m(void 0), C = angular.isDefined(d[k + 'Enable']), D = b.$new(!0), E = function () {
                                    var a = i.positionElements(c, w, D.placement, A);
                                    a.top += 'px', a.left += 'px', w.css(a);
                                };
                            D.isOpen = !1, d.$observe(e, function (a) {
                                D.content = a, !a && D.isOpen && p();
                            }), d.$observe(k + 'Title', function (a) {
                                D.title = a;
                            });
                            var F = function () {
                                c.unbind(B.show, j), c.unbind(B.hide, l);
                            };
                            v();
                            var G = b.$eval(d[k + 'Animation']);
                            D.animation = angular.isDefined(G) ? !!G : n.animation;
                            var H = b.$eval(d[k + 'AppendToBody']);
                            A = angular.isDefined(H) ? H : A, A && b.$on('$locationChangeSuccess', function () {
                                D.isOpen && p();
                            }), b.$on('$destroy', function () {
                                g.cancel(y), g.cancel(z), F(), r(), D = null;
                            });
                        };
                    }
                };
            };
        }
    ];
}).directive('tooltipPopup', function () {
    return {
        restrict: 'EA',
        replace: !0,
        scope: {
            content: '@',
            placement: '@',
            animation: '&',
            isOpen: '&'
        },
        templateUrl: 'template/tooltip/tooltip-popup.html'
    };
}).directive('tooltip', [
    '$tooltip',
    function (a) {
        return a('tooltip', 'tooltip', 'mouseenter');
    }
]).directive('tooltipHtmlUnsafePopup', function () {
    return {
        restrict: 'EA',
        replace: !0,
        scope: {
            content: '@',
            placement: '@',
            animation: '&',
            isOpen: '&'
        },
        templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
    };
}).directive('tooltipHtmlUnsafe', [
    '$tooltip',
    function (a) {
        return a('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
    }
]), angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip']).directive('popoverPopup', function () {
    return {
        restrict: 'EA',
        replace: !0,
        scope: {
            title: '@',
            content: '@',
            placement: '@',
            animation: '&',
            isOpen: '&'
        },
        templateUrl: 'template/popover/popover.html'
    };
}).directive('popover', [
    '$tooltip',
    function (a) {
        return a('popover', 'popover', 'click');
    }
]), angular.module('ui.bootstrap.progressbar', []).constant('progressConfig', {
    animate: !0,
    max: 100
}).controller('ProgressController', [
    '$scope',
    '$attrs',
    'progressConfig',
    function (a, b, c) {
        var d = this, e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
        this.bars = [], a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max, this.addBar = function (b, c) {
            e || c.css({ transition: 'none' }), this.bars.push(b), b.$watch('value', function (c) {
                b.percent = +(100 * c / a.max).toFixed(2);
            }), b.$on('$destroy', function () {
                c = null, d.removeBar(b);
            });
        }, this.removeBar = function (a) {
            this.bars.splice(this.bars.indexOf(a), 1);
        };
    }
]).directive('progress', function () {
    return {
        restrict: 'EA',
        replace: !0,
        transclude: !0,
        controller: 'ProgressController',
        require: 'progress',
        scope: {},
        templateUrl: 'template/progressbar/progress.html'
    };
}).directive('bar', function () {
    return {
        restrict: 'EA',
        replace: !0,
        transclude: !0,
        require: '^progress',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function (a, b, c, d) {
            d.addBar(a, b);
        }
    };
}).directive('progressbar', function () {
    return {
        restrict: 'EA',
        replace: !0,
        transclude: !0,
        controller: 'ProgressController',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/progressbar.html',
        link: function (a, b, c, d) {
            d.addBar(a, angular.element(b.children()[0]));
        }
    };
}), angular.module('ui.bootstrap.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller('RatingController', [
    '$scope',
    '$attrs',
    'ratingConfig',
    function (a, b, c) {
        var d = { $setViewValue: angular.noop };
        this.init = function (e) {
            d = e, d.$render = this.render, this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
            var f = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
            a.range = this.buildTemplateObjects(f);
        }, this.buildTemplateObjects = function (a) {
            for (var b = 0, c = a.length; c > b; b++)
                a[b] = angular.extend({ index: b }, {
                    stateOn: this.stateOn,
                    stateOff: this.stateOff
                }, a[b]);
            return a;
        }, a.rate = function (b) {
            !a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(b), d.$render());
        }, a.enter = function (b) {
            a.readonly || (a.value = b), a.onHover({ value: b });
        }, a.reset = function () {
            a.value = d.$viewValue, a.onLeave();
        }, a.onKeydown = function (b) {
            /(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)));
        }, this.render = function () {
            a.value = d.$viewValue;
        };
    }
]).directive('rating', function () {
    return {
        restrict: 'EA',
        require: [
            'rating',
            'ngModel'
        ],
        scope: {
            readonly: '=?',
            onHover: '&',
            onLeave: '&'
        },
        controller: 'RatingController',
        templateUrl: 'template/rating/rating.html',
        replace: !0,
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f);
        }
    };
}), angular.module('ui.bootstrap.tabs', []).controller('TabsetController', [
    '$scope',
    function (a) {
        var b = this, c = b.tabs = a.tabs = [];
        b.select = function (a) {
            angular.forEach(c, function (b) {
                b.active && b !== a && (b.active = !1, b.onDeselect());
            }), a.active = !0, a.onSelect();
        }, b.addTab = function (a) {
            c.push(a), 1 === c.length ? a.active = !0 : a.active && b.select(a);
        }, b.removeTab = function (a) {
            var e = c.indexOf(a);
            if (a.active && c.length > 1 && !d) {
                var f = e == c.length - 1 ? e - 1 : e + 1;
                b.select(c[f]);
            }
            c.splice(e, 1);
        };
        var d;
        a.$on('$destroy', function () {
            d = !0;
        });
    }
]).directive('tabset', function () {
    return {
        restrict: 'EA',
        transclude: !0,
        replace: !0,
        scope: { type: '@' },
        controller: 'TabsetController',
        templateUrl: 'template/tabs/tabset.html',
        link: function (a, b, c) {
            a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1;
        }
    };
}).directive('tab', [
    '$parse',
    function (a) {
        return {
            require: '^tabset',
            restrict: 'EA',
            replace: !0,
            templateUrl: 'template/tabs/tab.html',
            transclude: !0,
            scope: {
                active: '=?',
                heading: '@',
                onSelect: '&select',
                onDeselect: '&deselect'
            },
            controller: function () {
            },
            compile: function (b, c, d) {
                return function (b, c, e, f) {
                    b.$watch('active', function (a) {
                        a && f.select(b);
                    }), b.disabled = !1, e.disabled && b.$parent.$watch(a(e.disabled), function (a) {
                        b.disabled = !!a;
                    }), b.select = function () {
                        b.disabled || (b.active = !0);
                    }, f.addTab(b), b.$on('$destroy', function () {
                        f.removeTab(b);
                    }), b.$transcludeFn = d;
                };
            }
        };
    }
]).directive('tabHeadingTransclude', [function () {
        return {
            restrict: 'A',
            require: '^tab',
            link: function (a, b) {
                a.$watch('headingElement', function (a) {
                    a && (b.html(''), b.append(a));
                });
            }
        };
    }]).directive('tabContentTransclude', function () {
    function a(a) {
        return a.tagName && (a.hasAttribute('tab-heading') || a.hasAttribute('data-tab-heading') || 'tab-heading' === a.tagName.toLowerCase() || 'data-tab-heading' === a.tagName.toLowerCase());
    }
    return {
        restrict: 'A',
        require: '^tabset',
        link: function (b, c, d) {
            var e = b.$eval(d.tabContentTransclude);
            e.$transcludeFn(e.$parent, function (b) {
                angular.forEach(b, function (b) {
                    a(b) ? e.headingElement = b : c.append(b);
                });
            });
        }
    };
}), angular.module('ui.bootstrap.timepicker', []).constant('timepickerConfig', {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: !0,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0
}).controller('TimepickerController', [
    '$scope',
    '$attrs',
    '$parse',
    '$log',
    '$locale',
    'timepickerConfig',
    function (a, b, c, d, e, f) {
        function g() {
            var b = parseInt(a.hours, 10), c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
            return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === p[1] && (b += 12)), b) : void 0;
        }
        function h() {
            var b = parseInt(a.minutes, 10);
            return b >= 0 && 60 > b ? b : void 0;
        }
        function i(a) {
            return angular.isDefined(a) && a.toString().length < 2 ? '0' + a : a;
        }
        function j(a) {
            k(), o.$setViewValue(new Date(n)), l(a);
        }
        function k() {
            o.$setValidity('time', !0), a.invalidHours = !1, a.invalidMinutes = !1;
        }
        function l(b) {
            var c = n.getHours(), d = n.getMinutes();
            a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = 'h' === b ? c : i(c), a.minutes = 'm' === b ? d : i(d), a.meridian = n.getHours() < 12 ? p[0] : p[1];
        }
        function m(a) {
            var b = new Date(n.getTime() + 60000 * a);
            n.setHours(b.getHours(), b.getMinutes()), j();
        }
        var n = new Date(), o = { $setViewValue: angular.noop }, p = angular.isDefined(b.meridians) ? a.$parent.$eval(b.meridians) : f.meridians || e.DATETIME_FORMATS.AMPMS;
        this.init = function (c, d) {
            o = c, o.$render = this.render;
            var e = d.eq(0), g = d.eq(1), h = angular.isDefined(b.mousewheel) ? a.$parent.$eval(b.mousewheel) : f.mousewheel;
            h && this.setupMousewheelEvents(e, g), a.readonlyInput = angular.isDefined(b.readonlyInput) ? a.$parent.$eval(b.readonlyInput) : f.readonlyInput, this.setupInputEvents(e, g);
        };
        var q = f.hourStep;
        b.hourStep && a.$parent.$watch(c(b.hourStep), function (a) {
            q = parseInt(a, 10);
        });
        var r = f.minuteStep;
        b.minuteStep && a.$parent.$watch(c(b.minuteStep), function (a) {
            r = parseInt(a, 10);
        }), a.showMeridian = f.showMeridian, b.showMeridian && a.$parent.$watch(c(b.showMeridian), function (b) {
            if (a.showMeridian = !!b, o.$error.time) {
                var c = g(), d = h();
                angular.isDefined(c) && angular.isDefined(d) && (n.setHours(c), j());
            } else
                l();
        }), this.setupMousewheelEvents = function (b, c) {
            var d = function (a) {
                a.originalEvent && (a = a.originalEvent);
                var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
                return a.detail || b > 0;
            };
            b.bind('mousewheel wheel', function (b) {
                a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault();
            }), c.bind('mousewheel wheel', function (b) {
                a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault();
            });
        }, this.setupInputEvents = function (b, c) {
            if (a.readonlyInput)
                return a.updateHours = angular.noop, void (a.updateMinutes = angular.noop);
            var d = function (b, c) {
                o.$setViewValue(null), o.$setValidity('time', !1), angular.isDefined(b) && (a.invalidHours = b), angular.isDefined(c) && (a.invalidMinutes = c);
            };
            a.updateHours = function () {
                var a = g();
                angular.isDefined(a) ? (n.setHours(a), j('h')) : d(!0);
            }, b.bind('blur', function () {
                !a.invalidHours && a.hours < 10 && a.$apply(function () {
                    a.hours = i(a.hours);
                });
            }), a.updateMinutes = function () {
                var a = h();
                angular.isDefined(a) ? (n.setMinutes(a), j('m')) : d(void 0, !0);
            }, c.bind('blur', function () {
                !a.invalidMinutes && a.minutes < 10 && a.$apply(function () {
                    a.minutes = i(a.minutes);
                });
            });
        }, this.render = function () {
            var a = o.$modelValue ? new Date(o.$modelValue) : null;
            isNaN(a) ? (o.$setValidity('time', !1), d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (a && (n = a), k(), l());
        }, a.incrementHours = function () {
            m(60 * q);
        }, a.decrementHours = function () {
            m(60 * -q);
        }, a.incrementMinutes = function () {
            m(r);
        }, a.decrementMinutes = function () {
            m(-r);
        }, a.toggleMeridian = function () {
            m(720 * (n.getHours() < 12 ? 1 : -1));
        };
    }
]).directive('timepicker', function () {
    return {
        restrict: 'EA',
        require: [
            'timepicker',
            '?^ngModel'
        ],
        controller: 'TimepickerController',
        replace: !0,
        scope: {},
        templateUrl: 'template/timepicker/timepicker.html',
        link: function (a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f, b.find('input'));
        }
    };
}), angular.module('ui.bootstrap.typeahead', [
    'ui.bootstrap.position',
    'ui.bootstrap.bindHtml'
]).factory('typeaheadParser', [
    '$parse',
    function (a) {
        var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
        return {
            parse: function (c) {
                var d = c.match(b);
                if (!d)
                    throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
                return {
                    itemName: d[3],
                    source: a(d[4]),
                    viewMapper: a(d[2] || d[1]),
                    modelMapper: a(d[1])
                };
            }
        };
    }
]).directive('typeahead', [
    '$compile',
    '$parse',
    '$q',
    '$timeout',
    '$document',
    '$position',
    'typeaheadParser',
    function (a, b, c, d, e, f, g) {
        var h = [
            9,
            13,
            27,
            38,
            40
        ];
        return {
            require: 'ngModel',
            link: function (i, j, k, l) {
                var m, n = i.$eval(k.typeaheadMinLength) || 1, o = i.$eval(k.typeaheadWaitMs) || 0, p = i.$eval(k.typeaheadEditable) !== !1, q = b(k.typeaheadLoading).assign || angular.noop, r = b(k.typeaheadOnSelect), s = k.typeaheadInputFormatter ? b(k.typeaheadInputFormatter) : void 0, t = k.typeaheadAppendToBody ? i.$eval(k.typeaheadAppendToBody) : !1, u = i.$eval(k.typeaheadFocusFirst) !== !1, v = b(k.ngModel).assign, w = g.parse(k.typeahead), x = i.$new();
                i.$on('$destroy', function () {
                    x.$destroy();
                });
                var y = 'typeahead-' + x.$id + '-' + Math.floor(10000 * Math.random());
                j.attr({
                    'aria-autocomplete': 'list',
                    'aria-expanded': !1,
                    'aria-owns': y
                });
                var z = angular.element('<div typeahead-popup></div>');
                z.attr({
                    id: y,
                    matches: 'matches',
                    active: 'activeIdx',
                    select: 'select(activeIdx)',
                    query: 'query',
                    position: 'position'
                }), angular.isDefined(k.typeaheadTemplateUrl) && z.attr('template-url', k.typeaheadTemplateUrl);
                var A = function () {
                        x.matches = [], x.activeIdx = -1, j.attr('aria-expanded', !1);
                    }, B = function (a) {
                        return y + '-option-' + a;
                    };
                x.$watch('activeIdx', function (a) {
                    0 > a ? j.removeAttr('aria-activedescendant') : j.attr('aria-activedescendant', B(a));
                });
                var C = function (a) {
                    var b = { $viewValue: a };
                    q(i, !0), c.when(w.source(i, b)).then(function (c) {
                        var d = a === l.$viewValue;
                        if (d && m)
                            if (c.length > 0) {
                                x.activeIdx = u ? 0 : -1, x.matches.length = 0;
                                for (var e = 0; e < c.length; e++)
                                    b[w.itemName] = c[e], x.matches.push({
                                        id: B(e),
                                        label: w.viewMapper(x, b),
                                        model: c[e]
                                    });
                                x.query = a, x.position = t ? f.offset(j) : f.position(j), x.position.top = x.position.top + j.prop('offsetHeight'), j.attr('aria-expanded', !0);
                            } else
                                A();
                        d && q(i, !1);
                    }, function () {
                        A(), q(i, !1);
                    });
                };
                A(), x.query = void 0;
                var D, E = function (a) {
                        D = d(function () {
                            C(a);
                        }, o);
                    }, F = function () {
                        D && d.cancel(D);
                    };
                l.$parsers.unshift(function (a) {
                    return m = !0, a && a.length >= n ? o > 0 ? (F(), E(a)) : C(a) : (q(i, !1), F(), A()), p ? a : a ? void l.$setValidity('editable', !1) : (l.$setValidity('editable', !0), a);
                }), l.$formatters.push(function (a) {
                    var b, c, d = {};
                    return s ? (d.$model = a, s(i, d)) : (d[w.itemName] = a, b = w.viewMapper(i, d), d[w.itemName] = void 0, c = w.viewMapper(i, d), b !== c ? b : a);
                }), x.select = function (a) {
                    var b, c, e = {};
                    e[w.itemName] = c = x.matches[a].model, b = w.modelMapper(i, e), v(i, b), l.$setValidity('editable', !0), r(i, {
                        $item: c,
                        $model: b,
                        $label: w.viewMapper(i, e)
                    }), A(), d(function () {
                        j[0].focus();
                    }, 0, !1);
                }, j.bind('keydown', function (a) {
                    0 !== x.matches.length && -1 !== h.indexOf(a.which) && (-1 != x.activeIdx || 13 !== a.which && 9 !== a.which) && (a.preventDefault(), 40 === a.which ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : 38 === a.which ? (x.activeIdx = (x.activeIdx > 0 ? x.activeIdx : x.matches.length) - 1, x.$digest()) : 13 === a.which || 9 === a.which ? x.$apply(function () {
                        x.select(x.activeIdx);
                    }) : 27 === a.which && (a.stopPropagation(), A(), x.$digest()));
                }), j.bind('blur', function () {
                    m = !1;
                });
                var G = function (a) {
                    j[0] !== a.target && (A(), x.$digest());
                };
                e.bind('click', G), i.$on('$destroy', function () {
                    e.unbind('click', G), t && H.remove();
                });
                var H = a(z)(x);
                t ? e.find('body').append(H) : j.after(H);
            }
        };
    }
]).directive('typeaheadPopup', function () {
    return {
        restrict: 'EA',
        scope: {
            matches: '=',
            query: '=',
            active: '=',
            position: '=',
            select: '&'
        },
        replace: !0,
        templateUrl: 'template/typeahead/typeahead-popup.html',
        link: function (a, b, c) {
            a.templateUrl = c.templateUrl, a.isOpen = function () {
                return a.matches.length > 0;
            }, a.isActive = function (b) {
                return a.active == b;
            }, a.selectActive = function (b) {
                a.active = b;
            }, a.selectMatch = function (b) {
                a.select({ activeIdx: b });
            };
        }
    };
}).directive('typeaheadMatch', [
    '$http',
    '$templateCache',
    '$compile',
    '$parse',
    function (a, b, c, d) {
        return {
            restrict: 'EA',
            scope: {
                index: '=',
                match: '=',
                query: '='
            },
            link: function (e, f, g) {
                var h = d(g.templateUrl)(e.$parent) || 'template/typeahead/typeahead-match.html';
                a.get(h, { cache: b }).success(function (a) {
                    f.replaceWith(c(a.trim())(e));
                });
            }
        };
    }
]).filter('typeaheadHighlight', function () {
    function a(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    return function (b, c) {
        return c ? ('' + b).replace(new RegExp(a(c), 'gi'), '<strong>$&</strong>') : b;
    };
}), angular.module('template/accordion/accordion-group.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/accordion/accordion-group.html', '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n\t  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n');
    }
]), angular.module('template/accordion/accordion.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/accordion/accordion.html', '<div class="panel-group" ng-transclude></div>');
    }
]), angular.module('template/alert/alert.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/alert/alert.html', '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n');
    }
]), angular.module('template/carousel/carousel.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n');
    }
]), angular.module('template/carousel/slide.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/carousel/slide.html', '<div ng-class="{\n    \'active\': leaving || (active && !entering),\n    \'prev\': (next || active) && direction==\'prev\',\n    \'next\': (next || active) && direction==\'next\',\n    \'right\': direction==\'prev\',\n    \'left\': direction==\'next\'\n  }" class="item text-center" ng-transclude></div>\n');
    }
]), angular.module('template/datepicker/datepicker.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/datepicker/datepicker.html', '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>');
    }
]), angular.module('template/datepicker/day.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/datepicker/day.html', '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
    }
]), angular.module('template/datepicker/month.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/datepicker/month.html', '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
    }
]), angular.module('template/datepicker/popup.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/datepicker/popup.html', '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n\t<li ng-transclude></li>\n\t<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n\t\t<span class="btn-group pull-left">\n\t\t\t<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n\t\t\t<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n\t\t</span>\n\t\t<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n\t</li>\n</ul>\n');
    }
]), angular.module('template/datepicker/year.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/datepicker/year.html', '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
    }
]), angular.module('template/modal/backdrop.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/modal/backdrop.html', '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n');
    }
]), angular.module('template/modal/window.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/modal/window.html', '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>');
    }
]), angular.module('template/pagination/pager.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/pagination/pager.html', '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>');
    }
]), angular.module('template/pagination/pagination.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/pagination/pagination.html', '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>');
    }
]), angular.module('template/tooltip/tooltip-html-unsafe-popup.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/tooltip/tooltip-html-unsafe-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n');
    }
]), angular.module('template/tooltip/tooltip-popup.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n');
    }
]), angular.module('template/popover/popover.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n');
    }
]), angular.module('template/progressbar/bar.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/progressbar/bar.html', '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>');
    }
]), angular.module('template/progressbar/progress.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/progressbar/progress.html', '<div class="progress" ng-transclude></div>');
    }
]), angular.module('template/progressbar/progressbar.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/progressbar/progressbar.html', '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>');
    }
]), angular.module('template/rating/rating.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/rating/rating.html', '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>');
    }
]), angular.module('template/tabs/tab.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/tabs/tab.html', '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n');
    }
]), angular.module('template/tabs/tabset.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/tabs/tabset.html', '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n');
    }
]), angular.module('template/timepicker/timepicker.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/timepicker/timepicker.html', '<table>\n\t<tbody>\n\t\t<tr class="text-center">\n\t\t\t<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n\t\t\t<td>&nbsp;</td>\n\t\t\t<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n\t\t\t<td ng-show="showMeridian"></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n\t\t\t\t<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n\t\t\t</td>\n\t\t\t<td>:</td>\n\t\t\t<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n\t\t\t\t<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n\t\t\t</td>\n\t\t\t<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n\t\t</tr>\n\t\t<tr class="text-center">\n\t\t\t<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n\t\t\t<td>&nbsp;</td>\n\t\t\t<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n\t\t\t<td ng-show="showMeridian"></td>\n\t\t</tr>\n\t</tbody>\n</table>\n');
    }
]), angular.module('template/typeahead/typeahead-match.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/typeahead/typeahead-match.html', '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>');
    }
]), angular.module('template/typeahead/typeahead-popup.html', []).run([
    '$templateCache',
    function (a) {
        a.put('template/typeahead/typeahead-popup.html', '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n');
    }
]);
define('angular-ui-bootstrap', [], function () {
    return;
});
'undefined' != typeof module && 'undefined' != typeof exports && module.exports === exports && (module.exports = 'ui.router'), function (a, b, c) {
    'use strict';
    function d(a, b) {
        return R(new (R(function () {
        }, { prototype: a }))(), b);
    }
    function e(a) {
        return Q(arguments, function (b) {
            b !== a && Q(b, function (b, c) {
                a.hasOwnProperty(c) || (a[c] = b);
            });
        }), a;
    }
    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])
                break;
            c.push(a.path[d]);
        }
        return c;
    }
    function g(a) {
        if (Object.keys)
            return Object.keys(a);
        var b = [];
        return Q(a, function (a, c) {
            b.push(c);
        }), b;
    }
    function h(a, b) {
        if (Array.prototype.indexOf)
            return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
            if (d in a && a[d] === b)
                return d;
        return -1;
    }
    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i)
            if (i[l] && i[l].params && (e = g(i[l].params), e.length))
                for (var m in e)
                    h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
        return R({}, j, b);
    }
    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a)
                c.push(d);
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f])
                return !1;
        }
        return !0;
    }
    function k(a, b) {
        var c = {};
        return Q(a, function (a) {
            c[a] = b[a];
        }), c;
    }
    function l(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return Q(c, function (c) {
            c in a && (b[c] = a[c]);
        }), b;
    }
    function m(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var d in a)
            -1 == h(c, d) && (b[d] = a[d]);
        return b;
    }
    function n(a, b) {
        var c = P(a), d = c ? [] : {};
        return Q(a, function (a, e) {
            b(a, e) && (d[c ? d.length : e] = a);
        }), d;
    }
    function o(a, b) {
        var c = P(a) ? [] : {};
        return Q(a, function (a, d) {
            c[d] = b(a, d);
        }), c;
    }
    function p(a, b) {
        var d = 1, f = 2, i = {}, j = [], k = i, l = R(a.when(i), {
                $$promises: i,
                $$values: i
            });
        this.study = function (i) {
            function n(a, c) {
                if (s[c] !== f) {
                    if (r.push(c), s[c] === d)
                        throw r.splice(0, h(r, c)), new Error('Cyclic dependency: ' + r.join(' -> '));
                    if (s[c] = d, N(a))
                        q.push(c, [function () {
                                return b.get(a);
                            }], j);
                    else {
                        var e = b.annotate(a);
                        Q(e, function (a) {
                            a !== c && i.hasOwnProperty(a) && n(i[a], a);
                        }), q.push(c, a, e);
                    }
                    r.pop(), s[c] = f;
                }
            }
            function o(a) {
                return O(a) && a.then && a.$$promises;
            }
            if (!O(i))
                throw new Error('\'invocables\' must be an object');
            var p = g(i || {}), q = [], r = [], s = {};
            return Q(i, n), i = r = s = null, function (d, f, g) {
                function h() {
                    --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t));
                }
                function i(a) {
                    r.$$failure = a, n.reject(a);
                }
                function j(c, e, f) {
                    function j(a) {
                        l.reject(a), i(a);
                    }
                    function k() {
                        if (!L(r.$$failure))
                            try {
                                l.resolve(b.invoke(e, g, t)), l.promise.then(function (a) {
                                    t[c] = a, h();
                                }, j);
                            } catch (a) {
                                j(a);
                            }
                    }
                    var l = a.defer(), m = 0;
                    Q(f, function (a) {
                        s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function (b) {
                            t[a] = b, --m || k();
                        }, j));
                    }), m || k(), s[c] = l.promise;
                }
                if (o(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!O(d))
                        throw new Error('\'locals\' must be an object');
                } else
                    d = k;
                if (f) {
                    if (!o(f))
                        throw new Error('\'parent\' must be a promise returned by $resolve.resolve()');
                } else
                    f = l;
                var n = a.defer(), r = n.promise, s = r.$$promises = {}, t = R({}, d), u = 1 + q.length / 3, v = !1;
                if (L(f.$$failure))
                    return i(f.$$failure), r;
                f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), R(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), f.then(h, i));
                for (var w = 0, x = q.length; x > w; w += 3)
                    d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
                return r;
            };
        }, this.resolve = function (a, b, c, d) {
            return this.study(a)(b, c, d);
        };
    }
    function q(a, b, c) {
        this.fromConfig = function (a, b, c) {
            return L(a.template) ? this.fromString(a.template, b) : L(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : L(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null;
        }, this.fromString = function (a, b) {
            return M(a) ? a(b) : a;
        }, this.fromUrl = function (c, d) {
            return M(c) && (c = c(d)), null == c ? null : a.get(c, {
                cache: b,
                headers: { Accept: 'text/html' }
            }).then(function (a) {
                return a.data;
            });
        }, this.fromProvider = function (a, b, d) {
            return c.invoke(a, null, d || { params: b });
        };
    }
    function r(a, b, e) {
        function f(b, c, d, e) {
            if (q.push(b), o[b])
                return o[b];
            if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(b))
                throw new Error('Invalid parameter name \'' + b + '\' in pattern \'' + a + '\'');
            if (p[b])
                throw new Error('Duplicate parameter name \'' + b + '\' in pattern \'' + a + '\'');
            return p[b] = new U.Param(b, c, d, e), p[b];
        }
        function g(a, b, c, d) {
            var e = [
                    '',
                    ''
                ], f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, '\\$&');
            if (!b)
                return f;
            switch (c) {
            case !1:
                e = [
                    '(',
                    ')' + (d ? '?' : '')
                ];
                break;
            case !0:
                f = f.replace(/\/$/, ''), e = [
                    '(?:/(',
                    ')|/)?'
                ];
                break;
            default:
                e = [
                    '(' + c + '|',
                    ')?'
                ];
            }
            return f + e[0] + b + e[1];
        }
        function h(e, f) {
            var g, h, i, j, k;
            return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ('*' == e[1] ? '.*' : null), h && (j = U.type(h) || d(U.type('string'), { pattern: new RegExp(h, b.caseInsensitive ? 'i' : c) })), {
                id: g,
                regexp: h,
                segment: i,
                type: j,
                cfg: k
            };
        }
        b = R({ params: {} }, O(b) ? b : {});
        var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = '^', m = 0, n = this.segments = [], o = e ? e.params : {}, p = this.params = e ? e.params.$$new() : new U.ParamSet(), q = [];
        this.source = a;
        for (var r, s, t; (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf('?') >= 0));)
            s = f(r.id, r.type, r.cfg, 'path'), l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), m = j.lastIndex;
        t = a.substring(m);
        var u = t.indexOf('?');
        if (u >= 0) {
            var v = this.sourceSearch = t.substring(u);
            if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0)
                for (m = 0; i = k.exec(v);)
                    r = h(i, !0), s = f(r.id, r.type, r.cfg, 'search'), m = j.lastIndex;
        } else
            this.sourcePath = a, this.sourceSearch = '';
        l += g(t) + (b.strict === !1 ? '/?' : '') + '$', n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? 'i' : c), this.prefix = n[0], this.$$paramNames = q;
    }
    function s(a) {
        R(this, a);
    }
    function t() {
        function a(a) {
            return null != a ? a.toString().replace(/~/g, '~~').replace(/\//g, '~2F') : a;
        }
        function e(a) {
            return null != a ? a.toString().replace(/~2F/g, '/').replace(/~~/g, '~') : a;
        }
        function f() {
            return {
                strict: p,
                caseInsensitive: m
            };
        }
        function i(a) {
            return M(a) || P(a) && M(a[a.length - 1]);
        }
        function j() {
            for (; w.length;) {
                var a = w.shift();
                if (a.pattern)
                    throw new Error('You cannot override a type\'s .pattern at runtime.');
                b.extend(u[a.name], l.invoke(a.def));
            }
        }
        function k(a) {
            R(this, a || {});
        }
        U = this;
        var l, m = !1, p = !0, q = !1, u = {}, v = !0, w = [], x = {
                string: {
                    encode: a,
                    decode: e,
                    is: function (a) {
                        return null == a || !L(a) || 'string' == typeof a;
                    },
                    pattern: /[^\/]*/
                },
                'int': {
                    encode: a,
                    decode: function (a) {
                        return parseInt(a, 10);
                    },
                    is: function (a) {
                        return L(a) && this.decode(a.toString()) === a;
                    },
                    pattern: /\d+/
                },
                bool: {
                    encode: function (a) {
                        return a ? 1 : 0;
                    },
                    decode: function (a) {
                        return 0 !== parseInt(a, 10);
                    },
                    is: function (a) {
                        return a === !0 || a === !1;
                    },
                    pattern: /0|1/
                },
                date: {
                    encode: function (a) {
                        return this.is(a) ? [
                            a.getFullYear(),
                            ('0' + (a.getMonth() + 1)).slice(-2),
                            ('0' + a.getDate()).slice(-2)
                        ].join('-') : c;
                    },
                    decode: function (a) {
                        if (this.is(a))
                            return a;
                        var b = this.capture.exec(a);
                        return b ? new Date(b[1], b[2] - 1, b[3]) : c;
                    },
                    is: function (a) {
                        return a instanceof Date && !isNaN(a.valueOf());
                    },
                    equals: function (a, b) {
                        return this.is(a) && this.is(b) && a.toISOString() === b.toISOString();
                    },
                    pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                    capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
                },
                json: {
                    encode: b.toJson,
                    decode: b.fromJson,
                    is: b.isObject,
                    equals: b.equals,
                    pattern: /[^\/]*/
                },
                any: {
                    encode: b.identity,
                    decode: b.identity,
                    equals: b.equals,
                    pattern: /.*/
                }
            };
        t.$$getDefaultValue = function (a) {
            if (!i(a.value))
                return a.value;
            if (!l)
                throw new Error('Injectable functions cannot be called at configuration time');
            return l.invoke(a.value);
        }, this.caseInsensitive = function (a) {
            return L(a) && (m = a), m;
        }, this.strictMode = function (a) {
            return L(a) && (p = a), p;
        }, this.defaultSquashPolicy = function (a) {
            if (!L(a))
                return q;
            if (a !== !0 && a !== !1 && !N(a))
                throw new Error('Invalid squash policy: ' + a + '. Valid policies: false, true, arbitrary-string');
            return q = a, a;
        }, this.compile = function (a, b) {
            return new r(a, R(f(), b));
        }, this.isMatcher = function (a) {
            if (!O(a))
                return !1;
            var b = !0;
            return Q(r.prototype, function (c, d) {
                M(c) && (b = b && L(a[d]) && M(a[d]));
            }), b;
        }, this.type = function (a, b, c) {
            if (!L(b))
                return u[a];
            if (u.hasOwnProperty(a))
                throw new Error('A type named \'' + a + '\' has already been defined.');
            return u[a] = new s(R({ name: a }, b)), c && (w.push({
                name: a,
                def: c
            }), v || j()), this;
        }, Q(x, function (a, b) {
            u[b] = new s(R({ name: b }, a));
        }), u = d(u, {}), this.$get = [
            '$injector',
            function (a) {
                return l = a, v = !1, j(), Q(x, function (a, b) {
                    u[b] || (u[b] = new s(a));
                }), this;
            }
        ], this.Param = function (a, d, e, f) {
            function j(a) {
                var b = O(a) ? g(a) : [], c = -1 === h(b, 'value') && -1 === h(b, 'type') && -1 === h(b, 'squash') && -1 === h(b, 'array');
                return c && (a = { value: a }), a.$$fn = i(a.value) ? a.value : function () {
                    return a.value;
                }, a;
            }
            function k(c, d, e) {
                if (c.type && d)
                    throw new Error('Param \'' + a + '\' has two type configurations.');
                return d ? d : c.type ? b.isString(c.type) ? u[c.type] : c.type instanceof s ? c.type : new s(c.type) : 'config' === e ? u.any : u.string;
            }
            function m() {
                var b = { array: 'search' === f ? 'auto' : !1 }, c = a.match(/\[\]$/) ? { array: !0 } : {};
                return R(b, c, e).array;
            }
            function p(a, b) {
                var c = a.squash;
                if (!b || c === !1)
                    return !1;
                if (!L(c) || null == c)
                    return q;
                if (c === !0 || N(c))
                    return c;
                throw new Error('Invalid squash policy: \'' + c + '\'. Valid policies: false, true, or arbitrary string');
            }
            function r(a, b, d, e) {
                var f, g, i = [
                        {
                            from: '',
                            to: d || b ? c : ''
                        },
                        {
                            from: null,
                            to: d || b ? c : ''
                        }
                    ];
                return f = P(a.replace) ? a.replace : [], N(e) && f.push({
                    from: e,
                    to: c
                }), g = o(f, function (a) {
                    return a.from;
                }), n(i, function (a) {
                    return -1 === h(g, a.from);
                }).concat(f);
            }
            function t() {
                if (!l)
                    throw new Error('Injectable functions cannot be called at configuration time');
                var a = l.invoke(e.$$fn);
                if (null !== a && a !== c && !x.type.is(a))
                    throw new Error('Default value (' + a + ') for parameter \'' + x.id + '\' is not an instance of Type (' + x.type.name + ')');
                return a;
            }
            function v(a) {
                function b(a) {
                    return function (b) {
                        return b.from === a;
                    };
                }
                function c(a) {
                    var c = o(n(x.replace, b(a)), function (a) {
                        return a.to;
                    });
                    return c.length ? c[0] : a;
                }
                return a = c(a), L(a) ? x.type.$normalize(a) : t();
            }
            function w() {
                return '{Param:' + a + ' ' + d + ' squash: \'' + A + '\' optional: ' + z + '}';
            }
            var x = this;
            e = j(e), d = k(e, d, f);
            var y = m();
            d = y ? d.$asArray(y, 'search' === f) : d, 'string' !== d.name || y || 'path' !== f || e.value !== c || (e.value = '');
            var z = e.value !== c, A = p(e, z), B = r(e, y, z, A);
            R(this, {
                id: a,
                type: d,
                location: f,
                array: y,
                squash: A,
                replace: B,
                isOptional: z,
                value: v,
                dynamic: c,
                config: e,
                toString: w
            });
        }, k.prototype = {
            $$new: function () {
                return d(this, R(new k(), { $$parent: this }));
            },
            $$keys: function () {
                for (var a = [], b = [], c = this, d = g(k.prototype); c;)
                    b.push(c), c = c.$$parent;
                return b.reverse(), Q(b, function (b) {
                    Q(g(b), function (b) {
                        -1 === h(a, b) && -1 === h(d, b) && a.push(b);
                    });
                }), a;
            },
            $$values: function (a) {
                var b = {}, c = this;
                return Q(c.$$keys(), function (d) {
                    b[d] = c[d].value(a && a[d]);
                }), b;
            },
            $$equals: function (a, b) {
                var c = !0, d = this;
                return Q(d.$$keys(), function (e) {
                    var f = a && a[e], g = b && b[e];
                    d[e].type.equals(f, g) || (c = !1);
                }), c;
            },
            $$validates: function (a) {
                var d, e, f, g, h, i = this.$$keys();
                for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
                    if (g = e.type.$normalize(f), !e.type.is(g))
                        return !1;
                    if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h))
                        return !1;
                }
                return !0;
            },
            $$parent: c
        }, this.ParamSet = k;
    }
    function u(a, d) {
        function e(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, '$1') : '';
        }
        function f(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
                return b['$' === c ? 0 : Number(c)];
            });
        }
        function g(a, b, c) {
            if (!c)
                return !1;
            var d = a.invoke(b, b, { $match: c });
            return L(d) ? d : !0;
        }
        function h(d, e, f, g, h) {
            function m(a, b, c) {
                return '/' === q ? a : b ? q.slice(0, -1) + a : c ? q.slice(1) + a : a;
            }
            function n(a) {
                function b(a) {
                    var b = a(f, d);
                    return b ? (N(b) && d.replace().url(b), !0) : !1;
                }
                if (!a || !a.defaultPrevented) {
                    p && d.url() === p;
                    p = c;
                    var e, g = j.length;
                    for (e = 0; g > e; e++)
                        if (b(j[e]))
                            return;
                    k && b(k);
                }
            }
            function o() {
                return i = i || e.$on('$locationChangeSuccess', n);
            }
            var p, q = g.baseHref(), r = d.url();
            return l || o(), {
                sync: function () {
                    n();
                },
                listen: function () {
                    return o();
                },
                update: function (a) {
                    return a ? void (r = d.url()) : void (d.url() !== r && (d.url(r), d.replace()));
                },
                push: function (a, b, e) {
                    var f = a.format(b || {});
                    null !== f && b && b['#'] && (f += '#' + b['#']), d.url(f), p = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace();
                },
                href: function (c, e, f) {
                    if (!c.validates(e))
                        return null;
                    var g = a.html5Mode();
                    b.isObject(g) && (g = g.enabled), g = g && h.history;
                    var i = c.format(e);
                    if (f = f || {}, g || null === i || (i = '#' + a.hashPrefix() + i), null !== i && e && e['#'] && (i += '#' + e['#']), i = m(i, g, f.absolute), !f.absolute || !i)
                        return i;
                    var j = !g && i ? '/' : '', k = d.port();
                    return k = 80 === k || 443 === k ? '' : ':' + k, [
                        d.protocol(),
                        '://',
                        d.host(),
                        k,
                        j,
                        i
                    ].join('');
                }
            };
        }
        var i, j = [], k = null, l = !1;
        this.rule = function (a) {
            if (!M(a))
                throw new Error('\'rule\' must be a function');
            return j.push(a), this;
        }, this.otherwise = function (a) {
            if (N(a)) {
                var b = a;
                a = function () {
                    return b;
                };
            } else if (!M(a))
                throw new Error('\'rule\' must be a function');
            return k = a, this;
        }, this.when = function (a, b) {
            var c, h = N(b);
            if (N(a) && (a = d.compile(a)), !h && !M(b) && !P(b))
                throw new Error('invalid \'handler\' in when()');
            var i = {
                    matcher: function (a, b) {
                        return h && (c = d.compile(b), b = [
                            '$match',
                            function (a) {
                                return c.format(a);
                            }
                        ]), R(function (c, d) {
                            return g(c, b, a.exec(d.path(), d.search()));
                        }, { prefix: N(a.prefix) ? a.prefix : '' });
                    },
                    regex: function (a, b) {
                        if (a.global || a.sticky)
                            throw new Error('when() RegExp must not be global or sticky');
                        return h && (c = b, b = [
                            '$match',
                            function (a) {
                                return f(c, a);
                            }
                        ]), R(function (c, d) {
                            return g(c, b, a.exec(d.path()));
                        }, { prefix: e(a) });
                    }
                }, j = {
                    matcher: d.isMatcher(a),
                    regex: a instanceof RegExp
                };
            for (var k in j)
                if (j[k])
                    return this.rule(i[k](a, b));
            throw new Error('invalid \'what\' in when()');
        }, this.deferIntercept = function (a) {
            a === c && (a = !0), l = a;
        }, this.$get = h, h.$inject = [
            '$location',
            '$rootScope',
            '$injector',
            '$browser',
            '$sniffer'
        ];
    }
    function v(a, e) {
        function f(a) {
            return 0 === a.indexOf('.') || 0 === a.indexOf('^');
        }
        function m(a, b) {
            if (!a)
                return c;
            var d = N(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b)
                    throw new Error('No reference point given for path \'' + e + '\'');
                b = m(b);
                for (var h = e.split('.'), i = 0, j = h.length, k = b; j > i; i++)
                    if ('' !== h[i] || 0 !== i) {
                        if ('^' !== h[i])
                            break;
                        if (!k.parent)
                            throw new Error('Path \'' + e + '\' not valid for state \'' + b.name + '\'');
                        k = k.parent;
                    } else
                        k = b;
                h = h.slice(i).join('.'), e = k.name + (k.name && h ? '.' : '') + h;
            }
            var l = z[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l;
        }
        function n(a, b) {
            A[a] || (A[a] = []), A[a].push(b);
        }
        function p(a) {
            for (var b = A[a] || []; b.length;)
                q(b.shift());
        }
        function q(b) {
            b = d(b, {
                self: b,
                resolve: b.resolve || {},
                toString: function () {
                    return this.name;
                }
            });
            var c = b.name;
            if (!N(c) || c.indexOf('@') >= 0)
                throw new Error('State must have a valid name');
            if (z.hasOwnProperty(c))
                throw new Error('State \'' + c + '\' is already defined');
            var e = -1 !== c.indexOf('.') ? c.substring(0, c.lastIndexOf('.')) : N(b.parent) ? b.parent : O(b.parent) && N(b.parent.name) ? b.parent.name : '';
            if (e && !z[e])
                return n(e, b.self);
            for (var f in C)
                M(C[f]) && (b[f] = C[f](b, C.$delegates[f]));
            return z[c] = b, !b[B] && b.url && a.when(b.url, [
                '$match',
                '$stateParams',
                function (a, c) {
                    y.$current.navigable == b && j(a, c) || y.transitionTo(b, a, {
                        inherit: !0,
                        location: !1
                    });
                }
            ]), p(c), b;
        }
        function r(a) {
            return a.indexOf('*') > -1;
        }
        function s(a) {
            for (var b = a.split('.'), c = y.$current.name.split('.'), d = 0, e = b.length; e > d; d++)
                '*' === b[d] && (c[d] = '*');
            return '**' === b[0] && (c = c.slice(h(c, b[1])), c.unshift('**')), '**' === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push('**')), b.length != c.length ? !1 : c.join('') === b.join('');
        }
        function t(a, b) {
            return N(a) && !L(b) ? C[a] : M(b) && N(a) ? (C[a] && !C.$delegates[a] && (C.$delegates[a] = C[a]), C[a] = b, this) : this;
        }
        function u(a, b) {
            return O(a) ? b = a : b.name = a, q(b), this;
        }
        function v(a, e, f, h, l, n, p, q, t) {
            function u(b, c, d, f) {
                var g = a.$broadcast('$stateNotFound', b, c, d);
                if (g.defaultPrevented)
                    return p.update(), D;
                if (!g.retry)
                    return null;
                if (f.$retry)
                    return p.update(), E;
                var h = y.transition = e.when(g.retry);
                return h.then(function () {
                    return h !== y.transition ? A : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options));
                }, function () {
                    return D;
                }), p.update(), h;
            }
            function v(a, c, d, g, i, j) {
                function m() {
                    var c = [];
                    return Q(a.views, function (d, e) {
                        var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};
                        g.$template = [function () {
                                return f.load(e, {
                                    view: d,
                                    locals: i.globals,
                                    params: n,
                                    notify: j.notify
                                }) || '';
                            }], c.push(l.resolve(g, i.globals, i.resolve, a).then(function (c) {
                            if (M(d.controllerProvider) || P(d.controllerProvider)) {
                                var f = b.extend({}, g, i.globals);
                                c.$$controller = h.invoke(d.controllerProvider, null, f);
                            } else
                                c.$$controller = d.controller;
                            c.$$state = a, c.$$controllerAs = d.controllerAs, c.$$resolveAs = d.resolveAs, i[e] = c;
                        }));
                    }), e.all(c).then(function () {
                        return i.globals;
                    });
                }
                var n = d ? c : k(a.params.$$keys(), c), o = { $stateParams: n };
                i.resolve = l.resolve(a.resolve, o, i.resolve, a);
                var p = [i.resolve.then(function (a) {
                        i.globals = a;
                    })];
                return g && p.push(g), e.all(p).then(m).then(function (a) {
                    return i;
                });
            }
            var A = e.reject(new Error('transition superseded')), C = e.reject(new Error('transition prevented')), D = e.reject(new Error('transition aborted')), E = e.reject(new Error('transition failed'));
            return x.locals = {
                resolve: null,
                globals: { $stateParams: {} }
            }, y = {
                params: {},
                current: x.self,
                $current: x,
                transition: null
            }, y.reload = function (a) {
                return y.transitionTo(y.current, n, {
                    reload: a || !0,
                    inherit: !1,
                    notify: !0
                });
            }, y.go = function (a, b, c) {
                return y.transitionTo(a, b, R({
                    inherit: !0,
                    relative: y.$current
                }, c));
            }, y.transitionTo = function (b, c, f) {
                c = c || {}, f = R({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var g, j = y.$current, l = y.params, o = j.path, q = m(b, f.relative), r = c['#'];
                if (!L(q)) {
                    var s = {
                            to: b,
                            toParams: c,
                            options: f
                        }, t = u(s, j.self, l, f);
                    if (t)
                        return t;
                    if (b = s.to, c = s.toParams, f = s.options, q = m(b, f.relative), !L(q)) {
                        if (!f.relative)
                            throw new Error('No such state \'' + b + '\'');
                        throw new Error('Could not resolve \'' + b + '\' from state \'' + f.relative + '\'');
                    }
                }
                if (q[B])
                    throw new Error('Cannot transition to abstract state \'' + b + '\'');
                if (f.inherit && (c = i(n, c || {}, y.$current, q)), !q.params.$$validates(c))
                    return E;
                c = q.params.$$values(c), b = q;
                var z = b.path, D = 0, F = z[D], G = x.locals, H = [];
                if (f.reload) {
                    if (N(f.reload) || O(f.reload)) {
                        if (O(f.reload) && !f.reload.name)
                            throw new Error('Invalid reload state object');
                        var I = f.reload === !0 ? o[0] : m(f.reload);
                        if (f.reload && !I)
                            throw new Error('No such reload state \'' + (N(f.reload) ? f.reload : f.reload.name) + '\'');
                        for (; F && F === o[D] && F !== I;)
                            G = H[D] = F.locals, D++, F = z[D];
                    }
                } else
                    for (; F && F === o[D] && F.ownParams.$$equals(c, l);)
                        G = H[D] = F.locals, D++, F = z[D];
                if (w(b, c, j, l, G, f))
                    return r && (c['#'] = r), y.params = c, S(y.params, n), S(k(b.params.$$keys(), n), b.locals.globals.$stateParams), f.location && b.navigable && b.navigable.url && (p.push(b.navigable.url, c, {
                        $$avoidResync: !0,
                        replace: 'replace' === f.location
                    }), p.update(!0)), y.transition = null, e.when(y.current);
                if (c = k(b.params.$$keys(), c || {}), r && (c['#'] = r), f.notify && a.$broadcast('$stateChangeStart', b.self, c, j.self, l, f).defaultPrevented)
                    return a.$broadcast('$stateChangeCancel', b.self, c, j.self, l), null == y.transition && p.update(), C;
                for (var J = e.when(G), K = D; K < z.length; K++, F = z[K])
                    G = H[K] = d(G), J = v(F, c, F === b, J, G, f);
                var M = y.transition = J.then(function () {
                    var d, e, g;
                    if (y.transition !== M)
                        return A;
                    for (d = o.length - 1; d >= D; d--)
                        g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = D; d < z.length; d++)
                        e = z[d], e.locals = H[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return y.transition !== M ? A : (y.$current = b, y.current = b.self, y.params = c, S(y.params, n), y.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                        $$avoidResync: !0,
                        replace: 'replace' === f.location
                    }), f.notify && a.$broadcast('$stateChangeSuccess', b.self, c, j.self, l), p.update(!0), y.current);
                }).then(null, function (d) {
                    return y.transition !== M ? A : (y.transition = null, g = a.$broadcast('$stateChangeError', b.self, c, j.self, l, d), g.defaultPrevented || p.update(), e.reject(d));
                });
                return M;
            }, y.is = function (a, b, d) {
                d = R({ relative: y.$current }, d || {});
                var e = m(a, d.relative);
                return L(e) ? y.$current !== e ? !1 : b ? j(e.params.$$values(b), n) : !0 : c;
            }, y.includes = function (a, b, d) {
                if (d = R({ relative: y.$current }, d || {}), N(a) && r(a)) {
                    if (!s(a))
                        return !1;
                    a = y.$current.name;
                }
                var e = m(a, d.relative);
                return L(e) ? L(y.$current.includes[e.name]) ? b ? j(e.params.$$values(b), n, g(b)) : !0 : !1 : c;
            }, y.href = function (a, b, d) {
                d = R({
                    lossy: !0,
                    inherit: !0,
                    absolute: !1,
                    relative: y.$current
                }, d || {});
                var e = m(a, d.relative);
                if (!L(e))
                    return null;
                d.inherit && (b = i(n, b || {}, y.$current, e));
                var f = e && d.lossy ? e.navigable : e;
                return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys().concat('#'), b || {}), { absolute: d.absolute }) : null;
            }, y.get = function (a, b) {
                if (0 === arguments.length)
                    return o(g(z), function (a) {
                        return z[a].self;
                    });
                var c = m(a, b || y.$current);
                return c && c.self ? c.self : null;
            }, y;
        }
        function w(a, b, c, d, e, f) {
            function g(a, b, c) {
                function d(b) {
                    return 'search' != a.params[b].location;
                }
                var e = a.params.$$keys().filter(d), f = l.apply({}, [a.params].concat(e)), g = new U.ParamSet(f);
                return g.$$equals(b, c);
            }
            return !f.reload && a === c && (e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b)) ? !0 : void 0;
        }
        var x, y, z = {}, A = {}, B = 'abstract', C = {
                parent: function (a) {
                    if (L(a.parent) && a.parent)
                        return m(a.parent);
                    var b = /^(.+)\.[^.]+$/.exec(a.name);
                    return b ? m(b[1]) : x;
                },
                data: function (a) {
                    return a.parent && a.parent.data && (a.data = a.self.data = d(a.parent.data, a.data)), a.data;
                },
                url: function (a) {
                    var b = a.url, c = { params: a.params || {} };
                    if (N(b))
                        return '^' == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || x).url.concat(b, c);
                    if (!b || e.isMatcher(b))
                        return b;
                    throw new Error('Invalid url \'' + b + '\' in state \'' + a + '\'');
                },
                navigable: function (a) {
                    return a.url ? a : a.parent ? a.parent.navigable : null;
                },
                ownParams: function (a) {
                    var b = a.url && a.url.params || new U.ParamSet();
                    return Q(a.params || {}, function (a, c) {
                        b[c] || (b[c] = new U.Param(c, null, a, 'config'));
                    }), b;
                },
                params: function (a) {
                    var b = l(a.ownParams, a.ownParams.$$keys());
                    return a.parent && a.parent.params ? R(a.parent.params.$$new(), b) : new U.ParamSet();
                },
                views: function (a) {
                    var b = {};
                    return Q(L(a.views) ? a.views : { '': a }, function (c, d) {
                        d.indexOf('@') < 0 && (d += '@' + a.parent.name), c.resolveAs = c.resolveAs || a.resolveAs || '$resolve', b[d] = c;
                    }), b;
                },
                path: function (a) {
                    return a.parent ? a.parent.path.concat(a) : [];
                },
                includes: function (a) {
                    var b = a.parent ? R({}, a.parent.includes) : {};
                    return b[a.name] = !0, b;
                },
                $delegates: {}
            };
        x = q({
            name: '',
            url: '^',
            views: null,
            'abstract': !0
        }), x.navigable = null, this.decorator = t, this.state = u, this.$get = v, v.$inject = [
            '$rootScope',
            '$q',
            '$view',
            '$injector',
            '$resolve',
            '$stateParams',
            '$urlRouter',
            '$location',
            '$urlMatcherFactory'
        ];
    }
    function w() {
        function a(a, b) {
            return {
                load: function (a, c) {
                    var d, e = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                    return c = R(e, c), c.view && (d = b.fromConfig(c.view, c.params, c.locals)), d;
                }
            };
        }
        this.$get = a, a.$inject = [
            '$rootScope',
            '$templateFactory'
        ];
    }
    function x() {
        var a = !1;
        this.useAnchorScroll = function () {
            a = !0;
        }, this.$get = [
            '$anchorScroll',
            '$timeout',
            function (b, c) {
                return a ? b : function (a) {
                    return c(function () {
                        a[0].scrollIntoView();
                    }, 0, !1);
                };
            }
        ];
    }
    function y(a, c, d, e, f) {
        function g() {
            return c.has ? function (a) {
                return c.has(a) ? c.get(a) : null;
            } : function (a) {
                try {
                    return c.get(a);
                } catch (b) {
                    return null;
                }
            };
        }
        function h(a, c) {
            var d = function () {
                return {
                    enter: function (a, b, c) {
                        b.after(a), c();
                    },
                    leave: function (a, b) {
                        a.remove(), b();
                    }
                };
            };
            if (k)
                return {
                    enter: function (a, c, d) {
                        b.version.minor > 2 ? k.enter(a, null, c).then(d) : k.enter(a, null, c, d);
                    },
                    leave: function (a, c) {
                        b.version.minor > 2 ? k.leave(a).then(c) : k.leave(a, c);
                    }
                };
            if (j) {
                var e = j && j(c, a);
                return {
                    enter: function (a, b, c) {
                        e.enter(a, null, b), c();
                    },
                    leave: function (a, b) {
                        e.leave(a), b();
                    }
                };
            }
            return d();
        }
        var i = g(), j = i('$animator'), k = i('$animate'), l = {
                restrict: 'ECA',
                terminal: !0,
                priority: 400,
                transclude: 'element',
                compile: function (c, g, i) {
                    return function (c, g, j) {
                        function k() {
                            if (m && (m.remove(), m = null), o && (o.$destroy(), o = null), n) {
                                var a = n.data('$uiViewAnim');
                                s.leave(n, function () {
                                    a.$$animLeave.resolve(), m = null;
                                }), m = n, n = null;
                            }
                        }
                        function l(h) {
                            var l, m = A(c, j, g, e), t = m && a.$current && a.$current.locals[m];
                            if (h || t !== p) {
                                l = c.$new(), p = a.$current.locals[m], l.$emit('$viewContentLoading', m);
                                var u = i(l, function (a) {
                                    var e = f.defer(), h = f.defer(), i = {
                                            $animEnter: e.promise,
                                            $animLeave: h.promise,
                                            $$animLeave: h
                                        };
                                    a.data('$uiViewAnim', i), s.enter(a, g, function () {
                                        e.resolve(), o && o.$emit('$viewContentAnimationEnded'), (b.isDefined(r) && !r || c.$eval(r)) && d(a);
                                    }), k();
                                });
                                n = u, o = l, o.$emit('$viewContentLoaded', m), o.$eval(q);
                            }
                        }
                        var m, n, o, p, q = j.onload || '', r = j.autoscroll, s = h(j, c);
                        g.inheritedData('$uiView');
                        c.$on('$stateChangeSuccess', function () {
                            l(!1);
                        }), l(!0);
                    };
                }
            };
        return l;
    }
    function z(a, c, d, e) {
        return {
            restrict: 'ECA',
            priority: -400,
            compile: function (f) {
                var g = f.html();
                return function (f, h, i) {
                    var j = d.$current, k = A(f, i, h, e), l = j && j.locals[k];
                    if (l) {
                        h.data('$uiView', {
                            name: k,
                            state: l.$$state
                        }), h.html(l.$template ? l.$template : g);
                        var m = b.extend({}, l);
                        f[l.$$resolveAs] = m;
                        var n = a(h.contents());
                        if (l.$$controller) {
                            l.$scope = f, l.$element = h;
                            var o = c(l.$$controller, l);
                            l.$$controllerAs && (f[l.$$controllerAs] = o, f[l.$$controllerAs][l.$$resolveAs] = m), M(o.$onInit) && o.$onInit(), h.data('$ngControllerController', o), h.children().data('$ngControllerController', o);
                        }
                        n(f);
                    }
                };
            }
        };
    }
    function A(a, b, c, d) {
        var e = d(b.uiView || b.name || '')(a), f = c.inheritedData('$uiView');
        return e.indexOf('@') >= 0 ? e : e + '@' + (f ? f.state.name : '');
    }
    function B(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + '(' + d[1] + ')'), c = a.replace(/\n/g, ' ').match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length)
            throw new Error('Invalid state ref \'' + a + '\'');
        return {
            state: c[1],
            paramExpr: c[3] || null
        };
    }
    function C(a) {
        var b = a.parent().inheritedData('$uiView');
        return b && b.state && b.state.name ? b.state : void 0;
    }
    function D(a) {
        var b = '[object SVGAnimatedString]' === Object.prototype.toString.call(a.prop('href')), c = 'FORM' === a[0].nodeName;
        return {
            attr: c ? 'action' : b ? 'xlink:href' : 'href',
            isAnchor: 'A' === a.prop('tagName').toUpperCase(),
            clickable: !c
        };
    }
    function E(a, b, c, d, e) {
        return function (f) {
            var g = f.which || f.button, h = e();
            if (!(g > 1 || f.ctrlKey || f.metaKey || f.shiftKey || a.attr('target'))) {
                var i = c(function () {
                    b.go(h.state, h.params, h.options);
                });
                f.preventDefault();
                var j = d.isAnchor && !h.href ? 1 : 0;
                f.preventDefault = function () {
                    j-- <= 0 && c.cancel(i);
                };
            }
        };
    }
    function F(a, b) {
        return {
            relative: C(a) || b.$current,
            inherit: !0
        };
    }
    function G(a, c) {
        return {
            restrict: 'A',
            require: [
                '?^uiSrefActive',
                '?^uiSrefActiveEq'
            ],
            link: function (d, e, f, g) {
                var h, i = B(f.uiSref, a.current.name), j = {
                        state: i.state,
                        href: null,
                        params: null
                    }, k = D(e), l = g[1] || g[0], m = null;
                j.options = R(F(e, a), f.uiSrefOpts ? d.$eval(f.uiSrefOpts) : {});
                var n = function (c) {
                    c && (j.params = b.copy(c)), j.href = a.href(i.state, j.params, j.options), m && m(), l && (m = l.$$addStateInfo(i.state, j.params)), null !== j.href && f.$set(k.attr, j.href);
                };
                i.paramExpr && (d.$watch(i.paramExpr, function (a) {
                    a !== j.params && n(a);
                }, !0), j.params = b.copy(d.$eval(i.paramExpr))), n(), k.clickable && (h = E(e, a, c, k, function () {
                    return j;
                }), e.bind('click', h), d.$on('$destroy', function () {
                    e.unbind('click', h);
                }));
            }
        };
    }
    function H(a, b) {
        return {
            restrict: 'A',
            require: [
                '?^uiSrefActive',
                '?^uiSrefActiveEq'
            ],
            link: function (c, d, e, f) {
                function g(b) {
                    m.state = b[0], m.params = b[1], m.options = b[2], m.href = a.href(m.state, m.params, m.options), n && n(), j && (n = j.$$addStateInfo(m.state, m.params)), m.href && e.$set(i.attr, m.href);
                }
                var h, i = D(d), j = f[1] || f[0], k = [
                        e.uiState,
                        e.uiStateParams || null,
                        e.uiStateOpts || null
                    ], l = '[' + k.map(function (a) {
                        return a || 'null';
                    }).join(', ') + ']', m = {
                        state: null,
                        params: null,
                        options: null,
                        href: null
                    }, n = null;
                c.$watch(l, g, !0), g(c.$eval(l)), i.clickable && (h = E(d, a, b, i, function () {
                    return m;
                }), d.bind('click', h), c.$on('$destroy', function () {
                    d.unbind('click', h);
                }));
            }
        };
    }
    function I(a, b, c) {
        return {
            restrict: 'A',
            controller: [
                '$scope',
                '$element',
                '$attrs',
                '$timeout',
                function (b, d, e, f) {
                    function g(b, c, e) {
                        var f = a.get(b, C(d)), g = h(b, c), i = {
                                state: f || { name: b },
                                params: c,
                                hash: g
                            };
                        return p.push(i), q[g] = e, function () {
                            var a = p.indexOf(i);
                            -1 !== a && p.splice(a, 1);
                        };
                    }
                    function h(a, c) {
                        if (!N(a))
                            throw new Error('state should be a string');
                        return O(c) ? a + T(c) : (c = b.$eval(c), O(c) ? a + T(c) : a);
                    }
                    function i() {
                        for (var a = 0; a < p.length; a++)
                            l(p[a].state, p[a].params) ? j(d, q[p[a].hash]) : k(d, q[p[a].hash]), m(p[a].state, p[a].params) ? j(d, n) : k(d, n);
                    }
                    function j(a, b) {
                        f(function () {
                            a.addClass(b);
                        });
                    }
                    function k(a, b) {
                        a.removeClass(b);
                    }
                    function l(b, c) {
                        return a.includes(b.name, c);
                    }
                    function m(b, c) {
                        return a.is(b.name, c);
                    }
                    var n, o, p = [], q = {};
                    n = c(e.uiSrefActiveEq || '', !1)(b);
                    try {
                        o = b.$eval(e.uiSrefActive);
                    } catch (r) {
                    }
                    o = o || c(e.uiSrefActive || '', !1)(b), O(o) && Q(o, function (c, d) {
                        if (N(c)) {
                            var e = B(c, a.current.name);
                            g(e.state, b.$eval(e.paramExpr), d);
                        }
                    }), this.$$addStateInfo = function (a, b) {
                        if (!(O(o) && p.length > 0)) {
                            var c = g(a, b, o);
                            return i(), c;
                        }
                    }, b.$on('$stateChangeSuccess', i), i();
                }
            ]
        };
    }
    function J(a) {
        var b = function (b, c) {
            return a.is(b, c);
        };
        return b.$stateful = !0, b;
    }
    function K(a) {
        var b = function (b, c, d) {
            return a.includes(b, c, d);
        };
        return b.$stateful = !0, b;
    }
    var L = b.isDefined, M = b.isFunction, N = b.isString, O = b.isObject, P = b.isArray, Q = b.forEach, R = b.extend, S = b.copy, T = b.toJson;
    b.module('ui.router.util', ['ng']), b.module('ui.router.router', ['ui.router.util']), b.module('ui.router.state', [
        'ui.router.router',
        'ui.router.util'
    ]), b.module('ui.router', ['ui.router.state']), b.module('ui.router.compat', ['ui.router']), p.$inject = [
        '$q',
        '$injector'
    ], b.module('ui.router.util').service('$resolve', p), q.$inject = [
        '$http',
        '$templateCache',
        '$injector'
    ], b.module('ui.router.util').service('$templateFactory', q);
    var U;
    r.prototype.concat = function (a, b) {
        var c = {
            caseInsensitive: U.caseInsensitive(),
            strict: U.strictMode(),
            squash: U.defaultSquashPolicy()
        };
        return new r(this.sourcePath + a + this.sourceSearch, R(c, b), this);
    }, r.prototype.toString = function () {
        return this.source;
    }, r.prototype.exec = function (a, b) {
        function c(a) {
            function b(a) {
                return a.split('').reverse().join('');
            }
            function c(a) {
                return a.replace(/\\-/g, '-');
            }
            var d = b(a).split(/-(?!\\)/), e = o(d, b);
            return o(e, c).reverse();
        }
        var d = this.regexp.exec(a);
        if (!d)
            return null;
        b = b || {};
        var e, f, g, h = this.parameters(), i = h.length, j = this.segments.length - 1, k = {};
        if (j !== d.length - 1)
            throw new Error('Unbalanced capture group in route \'' + this.source + '\'');
        var l, m;
        for (e = 0; j > e; e++) {
            for (g = h[e], l = this.params[g], m = d[e + 1], f = 0; f < l.replace.length; f++)
                l.replace[f].from === m && (m = l.replace[f].to);
            m && l.array === !0 && (m = c(m)), L(m) && (m = l.type.decode(m)), k[g] = l.value(m);
        }
        for (; i > e; e++) {
            for (g = h[e], k[g] = this.params[g].value(b[g]), l = this.params[g], m = b[g], f = 0; f < l.replace.length; f++)
                l.replace[f].from === m && (m = l.replace[f].to);
            L(m) && (m = l.type.decode(m)), k[g] = l.value(m);
        }
        return k;
    }, r.prototype.parameters = function (a) {
        return L(a) ? this.params[a] || null : this.$$paramNames;
    }, r.prototype.validates = function (a) {
        return this.params.$$validates(a);
    }, r.prototype.format = function (a) {
        function b(a) {
            return encodeURIComponent(a).replace(/-/g, function (a) {
                return '%5C%' + a.charCodeAt(0).toString(16).toUpperCase();
            });
        }
        a = a || {};
        var c = this.segments, d = this.parameters(), e = this.params;
        if (!this.validates(a))
            return null;
        var f, g = !1, h = c.length - 1, i = d.length, j = c[0];
        for (f = 0; i > f; f++) {
            var k = h > f, l = d[f], m = e[l], n = m.value(a[l]), p = m.isOptional && m.type.equals(m.value(), n), q = p ? m.squash : !1, r = m.type.encode(n);
            if (k) {
                var s = c[f + 1], t = f + 1 === h;
                if (q === !1)
                    null != r && (j += P(r) ? o(r, b).join('-') : encodeURIComponent(r)), j += s;
                else if (q === !0) {
                    var u = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    j += s.match(u)[1];
                } else
                    N(q) && (j += q + s);
                t && m.squash === !0 && '/' === j.slice(-1) && (j = j.slice(0, -1));
            } else {
                if (null == r || p && q !== !1)
                    continue;
                if (P(r) || (r = [r]), 0 === r.length)
                    continue;
                r = o(r, encodeURIComponent).join('&' + l + '='), j += (g ? '&' : '?') + (l + '=' + r), g = !0;
            }
        }
        return j;
    }, s.prototype.is = function (a, b) {
        return !0;
    }, s.prototype.encode = function (a, b) {
        return a;
    }, s.prototype.decode = function (a, b) {
        return a;
    }, s.prototype.equals = function (a, b) {
        return a == b;
    }, s.prototype.$subPattern = function () {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2);
    }, s.prototype.pattern = /.*/, s.prototype.toString = function () {
        return '{Type:' + this.name + '}';
    }, s.prototype.$normalize = function (a) {
        return this.is(a) ? a : this.decode(a);
    }, s.prototype.$asArray = function (a, b) {
        function d(a, b) {
            function d(a, b) {
                return function () {
                    return a[b].apply(a, arguments);
                };
            }
            function e(a) {
                return P(a) ? a : L(a) ? [a] : [];
            }
            function f(a) {
                switch (a.length) {
                case 0:
                    return c;
                case 1:
                    return 'auto' === b ? a[0] : a;
                default:
                    return a;
                }
            }
            function g(a) {
                return !a;
            }
            function h(a, b) {
                return function (c) {
                    if (P(c) && 0 === c.length)
                        return c;
                    c = e(c);
                    var d = o(c, a);
                    return b === !0 ? 0 === n(d, g).length : f(d);
                };
            }
            function i(a) {
                return function (b, c) {
                    var d = e(b), f = e(c);
                    if (d.length !== f.length)
                        return !1;
                    for (var g = 0; g < d.length; g++)
                        if (!a(d[g], f[g]))
                            return !1;
                    return !0;
                };
            }
            this.encode = h(d(a, 'encode')), this.decode = h(d(a, 'decode')), this.is = h(d(a, 'is'), !0), this.equals = i(d(a, 'equals')), this.pattern = a.pattern, this.$normalize = h(d(a, '$normalize')), this.name = a.name, this.$arrayMode = b;
        }
        if (!a)
            return this;
        if ('auto' === a && !b)
            throw new Error('\'auto\' array mode is for query parameters only');
        return new d(this, a);
    }, b.module('ui.router.util').provider('$urlMatcherFactory', t), b.module('ui.router.util').run([
        '$urlMatcherFactory',
        function (a) {
        }
    ]), u.$inject = [
        '$locationProvider',
        '$urlMatcherFactoryProvider'
    ], b.module('ui.router.router').provider('$urlRouter', u), v.$inject = [
        '$urlRouterProvider',
        '$urlMatcherFactoryProvider'
    ], b.module('ui.router.state').factory('$stateParams', function () {
        return {};
    }).constant('$state.runtime', { autoinject: !0 }).provider('$state', v).run([
        '$injector',
        function (a) {
            a.get('$state.runtime').autoinject && a.get('$state');
        }
    ]), w.$inject = [], b.module('ui.router.state').provider('$view', w), b.module('ui.router.state').provider('$uiViewScroll', x), y.$inject = [
        '$state',
        '$injector',
        '$uiViewScroll',
        '$interpolate',
        '$q'
    ], z.$inject = [
        '$compile',
        '$controller',
        '$state',
        '$interpolate'
    ], b.module('ui.router.state').directive('uiView', y), b.module('ui.router.state').directive('uiView', z), G.$inject = [
        '$state',
        '$timeout'
    ], H.$inject = [
        '$state',
        '$timeout'
    ], I.$inject = [
        '$state',
        '$stateParams',
        '$interpolate'
    ], b.module('ui.router.state').directive('uiSref', G).directive('uiSrefActive', I).directive('uiSrefActiveEq', I).directive('uiState', H), J.$inject = ['$state'], K.$inject = ['$state'], b.module('ui.router.state').filter('isState', J).filter('includedByState', K);
}(window, window.angular);
define('angular-ui-router', [], function () {
    return;
});
(function (q, g, r) {
    'use strict';
    function F(a) {
        var d = [];
        t(d, g.noop).chars(a);
        return d.join('');
    }
    function l(a) {
        var d = {};
        a = a.split(',');
        var c;
        for (c = 0; c < a.length; c++)
            d[a[c]] = !0;
        return d;
    }
    function G(a, d) {
        function c(a, b, c, h) {
            b = g.lowercase(b);
            if (u[b])
                for (; f.last() && v[f.last()];)
                    e('', f.last());
            w[b] && f.last() == b && e('', b);
            (h = x[b] || !!h) || f.push(b);
            var n = {};
            c.replace(H, function (a, b, d, c, e) {
                n[b] = s(d || c || e || '');
            });
            d.start && d.start(b, n, h);
        }
        function e(a, b) {
            var c = 0, e;
            if (b = g.lowercase(b))
                for (c = f.length - 1; 0 <= c && f[c] != b; c--);
            if (0 <= c) {
                for (e = f.length - 1; e >= c; e--)
                    d.end && d.end(f[e]);
                f.length = c;
            }
        }
        'string' !== typeof a && (a = null === a || 'undefined' === typeof a ? '' : '' + a);
        var b, k, f = [], n = a, h;
        for (f.last = function () {
                return f[f.length - 1];
            }; a;) {
            h = '';
            k = !0;
            if (f.last() && y[f.last()])
                a = a.replace(RegExp('(.*)<\\s*\\/\\s*' + f.last() + '[^>]*>', 'i'), function (a, b) {
                    b = b.replace(I, '$1').replace(J, '$1');
                    d.chars && d.chars(s(b));
                    return '';
                }), e('', f.last());
            else {
                if (0 === a.indexOf('<!--'))
                    b = a.indexOf('--', 4), 0 <= b && a.lastIndexOf('-->', b) === b && (d.comment && d.comment(a.substring(4, b)), a = a.substring(b + 3), k = !1);
                else if (z.test(a)) {
                    if (b = a.match(z))
                        a = a.replace(b[0], ''), k = !1;
                } else if (K.test(a)) {
                    if (b = a.match(A))
                        a = a.substring(b[0].length), b[0].replace(A, e), k = !1;
                } else
                    L.test(a) && ((b = a.match(B)) ? (b[4] && (a = a.substring(b[0].length), b[0].replace(B, c)), k = !1) : (h += '<', a = a.substring(1)));
                k && (b = a.indexOf('<'), h += 0 > b ? a : a.substring(0, b), a = 0 > b ? '' : a.substring(b), d.chars && d.chars(s(h)));
            }
            if (a == n)
                throw M('badparse', a);
            n = a;
        }
        e();
    }
    function s(a) {
        if (!a)
            return '';
        var d = N.exec(a);
        a = d[1];
        var c = d[3];
        if (d = d[2])
            p.innerHTML = d.replace(/</g, '&lt;'), d = 'textContent' in p ? p.textContent : p.innerText;
        return a + d + c;
    }
    function C(a) {
        return a.replace(/&/g, '&amp;').replace(O, function (a) {
            var c = a.charCodeAt(0);
            a = a.charCodeAt(1);
            return '&#' + (1024 * (c - 55296) + (a - 56320) + 65536) + ';';
        }).replace(P, function (a) {
            return '&#' + a.charCodeAt(0) + ';';
        }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function t(a, d) {
        var c = !1, e = g.bind(a, a.push);
        return {
            start: function (a, k, f) {
                a = g.lowercase(a);
                !c && y[a] && (c = a);
                c || !0 !== D[a] || (e('<'), e(a), g.forEach(k, function (c, f) {
                    var m = g.lowercase(f), k = 'img' === a && 'src' === m || 'background' === m;
                    !0 !== Q[m] || !0 === E[m] && !d(c, k) || (e(' '), e(f), e('="'), e(C(c)), e('"'));
                }), e(f ? '/>' : '>'));
            },
            end: function (a) {
                a = g.lowercase(a);
                c || !0 !== D[a] || (e('</'), e(a), e('>'));
                a == c && (c = !1);
            },
            chars: function (a) {
                c || e(C(a));
            }
        };
    }
    var M = g.$$minErr('$sanitize'), B = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, A = /^<\/\s*([\w:-]+)[^>]*>/, H = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, L = /^</, K = /^<\//, I = /\x3c!--(.*?)--\x3e/g, z = /<!DOCTYPE([^>]*?)>/i, J = /<!\[CDATA\[(.*?)]]\x3e/g, O = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, P = /([^\#-~| |!])/g, x = l('area,br,col,hr,img,wbr');
    q = l('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
    r = l('rp,rt');
    var w = g.extend({}, r, q), u = g.extend({}, q, l('address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul')), v = g.extend({}, r, l('a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var')), y = l('script,style'), D = g.extend({}, x, u, v, w), E = l('background,cite,href,longdesc,src'), Q = g.extend({}, E, l('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width')), p = document.createElement('pre'), N = /^(\s*)([\s\S]*?)(\s*)$/;
    g.module('ngSanitize', []).provider('$sanitize', function () {
        this.$get = [
            '$$sanitizeUri',
            function (a) {
                return function (d) {
                    var c = [];
                    G(d, t(c, function (c, b) {
                        return !/^unsafe/.test(a(c, b));
                    }));
                    return c.join('');
                };
            }
        ];
    });
    g.module('ngSanitize').filter('linky', [
        '$sanitize',
        function (a) {
            var d = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/, c = /^mailto:/;
            return function (e, b) {
                function k(a) {
                    a && m.push(F(a));
                }
                function f(a, c) {
                    m.push('<a ');
                    g.isDefined(b) && (m.push('target="'), m.push(b), m.push('" '));
                    m.push('href="', a.replace('"', '&quot;'), '">');
                    k(c);
                    m.push('</a>');
                }
                if (!e)
                    return e;
                for (var n, h = e, m = [], l, p; n = h.match(d);)
                    l = n[0], n[2] == n[3] && (l = 'mailto:' + l), p = n.index, k(h.substr(0, p)), f(l, n[0].replace(c, '')), h = h.substring(p + n[0].length);
                k(h);
                return a(m.join(''));
            };
        }
    ]);
}(window, window.angular));
define('angular-sanitize', [], function () {
    return;
});
(function (p, f, n) {
    'use strict';
    f.module('ngCookies', ['ng']).factory('$cookies', [
        '$rootScope',
        '$browser',
        function (e, b) {
            var c = {}, g = {}, h, k = !1, l = f.copy, m = f.isUndefined;
            b.addPollFn(function () {
                var a = b.cookies();
                h != a && (h = a, l(a, g), l(a, c), k && e.$apply());
            })();
            k = !0;
            e.$watch(function () {
                var a, d, e;
                for (a in g)
                    m(c[a]) && b.cookies(a, n);
                for (a in c)
                    d = c[a], f.isString(d) || (d = '' + d, c[a] = d), d !== g[a] && (b.cookies(a, d), e = !0);
                if (e)
                    for (a in d = b.cookies(), c)
                        c[a] !== d[a] && (m(d[a]) ? delete c[a] : c[a] = d[a]);
            });
            return c;
        }
    ]).factory('$cookieStore', [
        '$cookies',
        function (e) {
            return {
                get: function (b) {
                    return (b = e[b]) ? f.fromJson(b) : b;
                },
                put: function (b, c) {
                    e[b] = f.toJson(c);
                },
                remove: function (b) {
                    delete e[b];
                }
            };
        }
    ]);
}(window, window.angular));
define('angular-cookies', [], function () {
    return;
});
define('app/boot', [
    'require',
    'exports',
    'angular',
    'rcss',
    'jquery',
    'bootstrap',
    'angular-ui-bootstrap',
    'angular-ui-router',
    'angular-sanitize',
    'angular-cookies'
], function (require, exports, angular) {
    'use strict';
    return angular.module('app.boot', [
        'ui.router',
        'ui.bootstrap'
    ]);
});
define('app/configs/appConfig', [
    'require',
    'exports',
    'app/boot',
    'jquery'
], function (require, exports, boot, $) {
    'use strict';
    exports.__esModule = true;
    boot.config([
        '$provide',
        function ($provide) {
            var app = $('#app').length > 0 ? $('#app') : null;
            $provide.constant('$appConfig', {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? eval(app.attr('data-debug')) ? true : false : false
            });
        }
    ]);
});
define('app/configs/dependencyLoader', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    boot.config([
        '$stateProvider',
        function ($stateProvider) {
            var stateFn = $stateProvider.state;
            $stateProvider.state = function (state, config) {
                var lazyArray = config.requires ? config.requires : config.dependencies ? config.dependencies : [];
                if (lazyArray.length > 0) {
                    var resolve = config.resolve || {};
                    resolve.$deps = [
                        '$q',
                        function ($q) {
                            var defer = $q.defer();
                            require(typeof lazyArray === 'string' ? [lazyArray] : lazyArray, function () {
                                defer.resolve(arguments);
                            });
                            return defer.promise;
                        }
                    ];
                    config.resolve = resolve;
                }
                return stateFn(state, config);
            };
        }
    ]);
});
define('app/configs/appEnvironment', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var AjaxState = function () {
        function AjaxState() {
            this.loading = false;
        }
        return AjaxState;
    }();
    var AppEnvironment = function () {
        function AppEnvironment() {
            this.ajaxState = new AjaxState();
        }
        return AppEnvironment;
    }();
    var AppEnvironmentConfig = function () {
        function AppEnvironmentConfig($provide) {
            $provide.constant('$appEnvironment', new AppEnvironment());
        }
        return AppEnvironmentConfig;
    }();
    AppEnvironmentConfig.$inject = ['$provide'];
    boot.config(AppEnvironmentConfig);
});
define('app/configs/rootScope', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var ConfigClass = function () {
        function ConfigClass($provide) {
            ConfigClass.decorator.$inject = [
                '$delegate',
                '$appEnvironment'
            ];
            $provide.decorator('$rootScope', ConfigClass.decorator);
        }
        ConfigClass.decorator = function ($delegate, $appEnvironment) {
            $delegate.$appEnvironment = $appEnvironment;
            return $delegate;
        };
        return ConfigClass;
    }();
    ConfigClass.$inject = ['$provide'];
    boot.config(ConfigClass);
});
define('app/configs/modal', ['app/boot'], function (boot) {
    'use strict';
    boot.constant('app/configs/modal', {
        modals: {},
        _counter: 0
    }).config([
        '$provide',
        'app/configs/modal',
        function ($provide, modal) {
            $provide.decorator('$modal', [
                '$delegate',
                '$rootScope',
                function ($delegate, $rootScope) {
                    var openFn = $delegate.open;
                    $delegate.closeAll = function () {
                        for (var i in modal.modals) {
                            modal.modals[i].dismiss();
                        }
                    };
                    $delegate.open = function (options) {
                        options.isolate = options.isolate === undefined ? true : options.isolate;
                        options.scope = options.scope ? options.scope : $rootScope.$new(options.isolate);
                        options.scope.$data = options.data ? options.data : options.scope.$data ? options.scope.$data : {};
                        options.scope.$handlers = options.handlers ? options.handlers : options.scope.$handlers ? options.scope.$handlers : {};
                        options.scope.$stores = options.stores ? options.stores : options.scope.$stores ? options.scope.$stores : {};
                        options.backdrop = options.backdrop ? options.backdrop : 'static';
                        if (options.single === true) {
                            $delegate.closeAll();
                        }
                        var modalInstance = openFn(options);
                        modalInstance.index = ++modal._counter;
                        modalInstance.result.then(function () {
                            delete modal.modals[modalInstance.index];
                        }, function () {
                            delete modal.modals[modalInstance.index];
                        });
                        modal.modals[modal._counter] = modalInstance;
                        return modalInstance;
                    };
                    return $delegate;
                }
            ]);
        }
    ]);
});
define('app/configs/http', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var HttpConfig = function () {
        function HttpConfig($httpProvider) {
            $httpProvider.defaults.headers.get = !$httpProvider.defaults.headers.get ? {} : $httpProvider.defaults.headers.get;
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get.Pragma = 'no-cache';
            $httpProvider.interceptors.push('app/factories/httpState');
            jQuery.support.cors = true;
        }
        return HttpConfig;
    }();
    HttpConfig.$inject = ['$httpProvider'];
    boot.config(HttpConfig);
});
define('app/configs/route', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var RouteRun = function () {
        function RouteRun($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.$previous = fromState;
                $rootScope.$previousParams = fromParams;
            });
            $state.back = function () {
                if ($rootScope.$previous)
                    return $state.go($rootScope.$previous.name, $rootScope.$previousParams);
            };
        }
        return RouteRun;
    }();
    RouteRun.$inject = [
        '$rootScope',
        '$state',
        '$stateParams'
    ];
    boot.run(RouteRun);
});
define('app/factories/httpState', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    function factory($appEnvironment) {
        return {
            request: function (config) {
                $appEnvironment.ajaxState.loading = true;
                $appEnvironment.ajaxState.url = config.url;
                $appEnvironment.ajaxState.method = config.method;
                $appEnvironment.ajaxState.data = config.data;
                return config;
            },
            requestError: function (rejection) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return rejection;
            },
            response: function (response) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return response;
            },
            responseError: function (rejection) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return rejection;
            }
        };
    }
    factory.$inject = ['$appEnvironment'];
    boot.factory('app/factories/httpState', factory);
});
define('app/factories/httpDataHandler', [
    'require',
    'exports',
    'app/boot',
    'angular'
], function (require, exports, boot, angular) {
    'use strict';
    exports.__esModule = true;
    function factory(popupService) {
        return {
            doResponse: function (response, defer) {
                response.data = angular.extend({ success: false }, response.data);
                if (response.data.success) {
                    defer.resolve(response.data.data);
                } else {
                    this.doError(response, defer);
                }
            },
            doError: function (response, defer) {
                response.data = angular.extend({ success: false }, response.data);
                popupService.error(response.data.message);
                defer.reject(response.data);
            }
        };
    }
    factory.$inject = ['app/services/popupService'];
    boot.factory('app/factories/httpDataHandler', factory);
});
define('app/services/ajaxService', ['app/boot'], function (boot) {
    'use strict';
    boot.service('app/services/ajaxService', [
        '$q',
        '$modal',
        '$appConfig',
        'app/factories/httpDataHandler',
        function ($q, $modal, $appConfig, httpDataHandler) {
            var me = this;
            this.resolveUrl = function (url) {
                return url.indexOf('http://') === 0 || url.indexOf('https://') === 0 ? url : $appConfig.serverUrl + url;
            };
            this.get = function (url) {
                var defer = $q.defer();
                $.ajax({
                    type: 'GET',
                    url: me.resolveUrl(url),
                    success: function (response) {
                        httpDataHandler.doResponse({ data: response }, defer);
                    },
                    error: function (response) {
                        httpDataHandler.doError({ data: response }, defer);
                    }
                });
                return defer.promise;
            };
            this.post = function (url, params) {
                var defer = $q.defer();
                $.ajax({
                    type: 'POST',
                    data: params,
                    url: me.resolveUrl(url),
                    success: function (response) {
                        httpDataHandler.doResponse({ data: response }, defer);
                    },
                    error: function (response) {
                        httpDataHandler.doError({ data: response }, defer);
                    }
                });
                return defer.promise;
            };
            this.json = function (url, params) {
                var defer = $q.defer();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: params,
                    url: me.resolveUrl(url),
                    success: function (response) {
                        httpDataHandler.doResponse({ data: response }, defer);
                    },
                    error: function (response) {
                        httpDataHandler.doError({ data: response }, defer);
                    }
                });
                return defer.promise;
            };
        }
    ]);
});
define('app/services/httpService', [
    'require',
    'exports',
    'app/boot'
], function (require, exports, boot) {
    'use strict';
    exports.__esModule = true;
    var RequestPromise = function () {
        function RequestPromise(defer) {
            this.defer = defer;
        }
        RequestPromise.prototype.cancel = function () {
            this.defer.resolve();
        };
        RequestPromise.prototype.then = function (successCallback, errorCallback, notifyCallback) {
            return this.defer.promise.then(successCallback, errorCallback, notifyCallback);
        };
        RequestPromise.prototype['catch'] = function (onRejected) {
            return this.defer.promise['catch'](onRejected);
        };
        RequestPromise.prototype['finally'] = function (finallyCallback) {
            return this.defer.promise['finally'](finallyCallback);
        };
        return RequestPromise;
    }();
    var HttpService = function () {
        function HttpService($http, $q, $appConfig, httpDataHandler) {
            this.$http = $http;
            this.$q = $q;
            this.$appConfig = $appConfig;
            this.httpDataHandler = httpDataHandler;
        }
        HttpService.prototype.get = function (url) {
            var defer = this.$q.defer();
            var promise = new RequestPromise(defer);
            var self = this;
            this.$http({
                method: 'get',
                url: this.resolveUrl(url),
                withCredentials: false,
                timeout: promise
            }).then(function (response) {
                self.httpDataHandler.doResponse(response, defer);
            })['catch'](function (response) {
                self.httpDataHandler.doError(response, defer);
            });
            return promise;
        };
        HttpService.prototype.post = function (url, param) {
            var defer = this.$q.defer();
            var promise = new RequestPromise(defer);
            var self = this;
            this.$http({
                method: 'post',
                data: param,
                url: this.resolveUrl(url),
                withCredentials: false,
                timeout: promise,
                headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            }).then(function (response) {
                self.httpDataHandler.doResponse(response, defer);
            })['catch'](function (response) {
                self.httpDataHandler.doError(response, defer);
            });
            return promise;
        };
        HttpService.prototype.resolveUrl = function (url) {
            return url.indexOf('http://') === 0 || url.indexOf('https://') === 0 ? url : this.$appConfig.serverUrl + url;
        };
        HttpService.$inject = [
            '$http',
            '$q',
            '$appConfig',
            'app/factories/httpDataHandler'
        ];
        return HttpService;
    }();
    boot.service('app/services/httpService', HttpService);
});
define('app/configs/enums/size', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var Size;
    (function (Size) {
        Size['sm'] = 'sm';
        Size['nm'] = '';
        Size['lg'] = 'lg';
    }(Size = exports.Size || (exports.Size = {})));
});
define('app/services/popupService', [
    'require',
    'exports',
    'app/boot',
    'angular',
    'app/configs/enums/size'
], function (require, exports, boot, angular, size_1) {
    'use strict';
    exports.__esModule = true;
    var ConfirmPromise = function () {
        function ConfirmPromise(defer) {
            this.defer = defer;
        }
        ConfirmPromise.prototype.ok = function (callback) {
            this.defer.promise.then(callback || angular.noop);
            return this;
        };
        ConfirmPromise.prototype.cancel = function (callback) {
            this.defer.promise['catch'](callback || angular.noop);
            return this;
        };
        return ConfirmPromise;
    }();
    var PopupService = function () {
        function PopupService($modal, $q, $rootScope) {
            this.$modal = $modal;
            this.$q = $q;
            this.$rootScope = $rootScope;
        }
        PopupService.prototype.confirm = function (text, size) {
            var defer = this.$q.defer();
            var promise = new ConfirmPromise(defer);
            this.$modal.open({
                templateUrl: 'app/templates/popup/confirm.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), { $data: { text: text ? text : '是否确认操作\uFF1F' } })
            }).result.then(function (result) {
                if (result === true) {
                    defer.resolve(result);
                } else {
                    defer.reject(result);
                }
            });
            return promise;
        };
        PopupService.prototype.error = function (text, size) {
            var defered = this.$q.defer();
            var _data = {};
            if (text === null || text === undefined) {
                _data = angular.extend(_data, { text: '发生错误' });
            } else if (typeof text !== 'string') {
                _data = angular.extend(_data, { contents: text });
            } else {
                _data = angular.extend(_data, { text: text });
            }
            this.$modal.open({
                templateUrl: 'app/templates/popup/error.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), { $data: _data })
            }).result.then(function (result) {
                defered.resolve(result);
            });
            return defered.promise;
        };
        PopupService.prototype.information = function (text, size) {
            var defered = this.$q.defer();
            this.$modal.open({
                templateUrl: 'app/templates/popup/information.html',
                size: size ? size : size_1.Size.sm,
                scope: angular.extend(this.$rootScope.$new(), { $data: { text: text ? text : '操作成功' } })
            }).result.then(function (data) {
                defered.resolve();
            });
            return defered.promise;
        };
        PopupService.$inject = [
            '$modal',
            '$q',
            '$rootScope'
        ];
        return PopupService;
    }();
    boot.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('app/templates/popup/information.html', '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;消息</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>');
            $templateCache.put('app/templates/popup/error.html', '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;错误</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>');
            $templateCache.put('app/templates/popup/confirm.html', '<div><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;确认</h4></div><div class="modal-body clearfix"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close(true)"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button><button class="btn btn-default" type="button" ng-click="$dismiss()"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;取消</button></div></div>');
        }
    ]);
    boot.service('app/services/popupService', PopupService);
});
define('app/services/treeUtility', [
    'require',
    'exports',
    'app/boot',
    'angular'
], function (require, exports, boot, angular) {
    'use strict';
    exports.__esModule = true;
    var TreeContext = function () {
        function TreeContext(defer) {
            this.defer = defer;
            this.result = this.defer.promise;
        }
        TreeContext.prototype.onEach = function (fn) {
            this.eachCallback = fn;
            return this;
        };
        return TreeContext;
    }();
    var TreeConvertContext = function () {
        function TreeConvertContext(defer) {
            this.defer = defer;
            this._key = 'id';
            this._parentKey = 'parentId';
            this.result = this.defer.promise;
        }
        TreeConvertContext.prototype.key = function (name) {
            if (name) {
                this._key = name;
                return this;
            }
            return this._key;
        };
        TreeConvertContext.prototype.parentKey = function (name) {
            if (name) {
                this._parentKey = name;
                return this;
            }
            return this._parentKey;
        };
        TreeConvertContext.prototype.onEach = function (fn) {
            this.eachCallback = fn;
            return this;
        };
        return TreeConvertContext;
    }();
    var TreeUtility = function () {
        function TreeUtility($q, $timeout) {
            this.$q = $q;
            this.$timeout = $timeout;
        }
        TreeUtility.prototype.convertToTree = function (data, context) {
            var map = {};
            data.forEach(function (item, idx, arr) {
                var current = arr[idx];
                map[current[context.key()]] = {
                    $data: current,
                    $key: current[context.key()]
                };
            });
            var root = {
                $data: null,
                $key: null,
                $children: []
            };
            for (var key in map) {
                var current = map[key];
                var parent_1 = map[current.$data[context.parentKey()]];
                if (parent_1) {
                    current.$parent = parent_1;
                    (parent_1.$children || (parent_1.$children = [])).push(current);
                } else {
                    current.$parent = root;
                    root.$children.push(current);
                }
                (context.eachCallback || angular.noop)(current);
            }
            return root;
        };
        TreeUtility.prototype.doEachTree = function (root, context) {
            var self = this;
            root.$children.forEach(function (item) {
                (context.eachCallback || angular.noop)(item);
                if (item.$children) {
                    self.doEachTree(item, context);
                }
            });
        };
        TreeUtility.prototype.toTree = function (data) {
            var self = this;
            var defer = this.$q.defer();
            var context = new TreeConvertContext(defer);
            this.$timeout(function () {
                defer.resolve(self.convertToTree(data, context));
            });
            return context;
        };
        TreeUtility.prototype.eachTree = function (root) {
            var self = this;
            var defer = this.$q.defer();
            var context = new TreeContext(defer);
            this.$timeout(function () {
                self.doEachTree(root, context);
                defer.resolve(root);
            });
            return context;
        };
        TreeUtility.$inject = [
            '$q',
            '$timeout'
        ];
        return TreeUtility;
    }();
    boot.service('app/services/treeUtility', TreeUtility);
});
define('app/directives/title', ['app/boot'], function (boot) {
    'use strict';
    boot.directive('title', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            var _link = function (scope, element, attrs) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    $timeout(function () {
                        document.title = toState.data && toState.data.title ? toState.data.title : '';
                    });
                });
            };
            return {
                restrict: 'E',
                link: _link
            };
        }
    ]);
});
define('app/directives/theme', ['app/boot'], function (boot) {
    'use strict';
    boot.directive('theme', [function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {
            };
            var _controller = function ($scope, $element, $attrs, $appEnvironment) {
                $scope.$appEnvironment = $appEnvironment;
            };
            return {
                scope: {
                    normal: '@',
                    path: '@'
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: [
                    '$scope',
                    '$element',
                    '$attrs',
                    '$appEnvironment',
                    _controller
                ],
                template: '<link ng-href="{{path}}/{{$appEnvironment.theme?$appEnvironment.theme:normal}}.css" rel="stylesheet" />'
            };
        }]);
});
define('app/directives/equals', ['app/boot'], function (boot) {
    'use strict';
    boot.directive('equals', [function () {
            function _link($scope, $element, $attrs, $ctrl) {
                function validator(inputValue) {
                    var valid = inputValue === $scope.$eval($attrs.equals);
                    $ctrl.$setValidity('equal', valid);
                    return valid ? inputValue : null;
                }
                $ctrl.$parsers.push(validator);
                $ctrl.$formatters.push(validator);
                $scope.$watch($attrs.equals, function () {
                    $ctrl.$setViewValue($ctrl.$viewValue);
                });
            }
            return {
                require: 'ngModel',
                link: _link
            };
        }]);
});
define('app/application', [
    'require',
    'exports',
    'angular',
    'app/configs/appConfig',
    'app/configs/dependencyLoader',
    'app/configs/appEnvironment',
    'app/configs/rootScope',
    'app/configs/modal',
    'app/configs/http',
    'app/configs/route',
    'app/factories/httpState',
    'app/factories/httpDataHandler',
    'app/services/ajaxService',
    'app/services/httpService',
    'app/services/popupService',
    'app/services/treeUtility',
    'app/directives/title',
    'app/directives/theme',
    'app/directives/equals'
], function (require, exports, angular) {
    'use strict';
    var application = angular.module('app.application', ['app.boot']);
    var fn = angular.module;
    angular.module = function (name, requires, configFn) {
        var app = fn(name, requires, configFn);
        app.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
            }
        ]);
        if (name !== 'app.application' && application.requires.indexOf(name) < 0)
            application.requires.push(name);
        return app;
    };
    return application;
});