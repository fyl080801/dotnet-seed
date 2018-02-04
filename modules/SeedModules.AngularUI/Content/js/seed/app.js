define('rcss', [], function () {
    if ('undefined' == typeof window)
        return {
            load: function (a, b, c) {
                c();
            }
        };
    var a = document.getElementsByTagName('head')[0], b = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0, c = !1, d = !0;
    b[1] || b[7] ? c = parseInt(b[1]) < 6 || parseInt(b[7]) <= 9 : b[2] || b[8] ? d = !1 : b[4] && (c = parseInt(b[4]) < 18);
    var e = {};
    e.pluginBuilder = './css-builder';
    var f, g, h, i = function () {
            f = document.createElement('style'), a.appendChild(f), g = f.styleSheet || f.sheet;
        }, j = 0, k = [], l = function (a) {
            g.addImport(a), f.onload = function () {
                m();
            }, j++, 31 == j && (i(), j = 0);
        }, m = function () {
            h();
            var a = k.shift();
            return a ? (h = a[1], void l(a[0])) : void (h = null);
        }, n = function (a, b) {
            if (g && g.addImport || i(), g && g.addImport)
                h ? k.push([
                    a,
                    b
                ]) : (l(a), h = b);
            else {
                f.textContent = '@import "' + a + '";';
                var c = setInterval(function () {
                    try {
                        f.sheet.cssRules, clearInterval(c), b();
                    } catch (a) {
                    }
                }, 10);
            }
        }, o = function (b, c) {
            var e = document.createElement('link');
            if (e.type = 'text/css', e.rel = 'stylesheet', d)
                e.onload = function () {
                    e.onload = function () {
                    }, setTimeout(c, 7);
                };
            else
                var f = setInterval(function () {
                    for (var a = 0; a < document.styleSheets.length; a++) {
                        var b = document.styleSheets[a];
                        if (b.href == e.href)
                            return clearInterval(f), c();
                    }
                }, 10);
            e.href = b, a.appendChild(e);
        };
    return e.normalize = function (a, b) {
        return '.css' == a.substr(a.length - 4, 4) && (a = a.substr(0, a.length - 4)), b(a);
    }, e.load = function (a, b, d, e) {
        (c ? n : o)(b.toUrl(a + '.css'), d);
    }, e;
});
define('angular', [], function () {
    (function (V, W, v) {
        'use strict';
        function z(b) {
            return function () {
                var a = arguments[0], c, a = '[' + (b ? b + ':' : '') + a + '] http://errors.angularjs.org/1.2.32/' + (b ? b + '/' : '') + a;
                for (c = 1; c < arguments.length; c++)
                    a = a + (1 == c ? '?' : '&') + 'p' + (c - 1) + '=' + encodeURIComponent('function' == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, '') : 'undefined' == typeof arguments[c] ? 'undefined' : 'string' != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
                return Error(a);
            };
        }
        function Ra(b) {
            if (null == b || Ha(b))
                return !1;
            var a = b.length;
            return 1 === b.nodeType && a ? !0 : E(b) || M(b) || 0 === a || 'number' === typeof a && 0 < a && a - 1 in b;
        }
        function r(b, a, c) {
            var d;
            if (b)
                if (O(b))
                    for (d in b)
                        'prototype' == d || ('length' == d || 'name' == d || b.hasOwnProperty && !b.hasOwnProperty(d)) || a.call(c, b[d], d);
                else if (M(b) || Ra(b))
                    for (d = 0; d < b.length; d++)
                        a.call(c, b[d], d);
                else if (b.forEach && b.forEach !== r)
                    b.forEach(a, c);
                else
                    for (d in b)
                        b.hasOwnProperty(d) && a.call(c, b[d], d);
            return b;
        }
        function Wb(b) {
            var a = [], c;
            for (c in b)
                b.hasOwnProperty(c) && a.push(c);
            return a.sort();
        }
        function Tc(b, a, c) {
            for (var d = Wb(b), e = 0; e < d.length; e++)
                a.call(c, b[d[e]], d[e]);
            return d;
        }
        function Xb(b) {
            return function (a, c) {
                b(c, a);
            };
        }
        function hb() {
            for (var b = na.length, a; b;) {
                b--;
                a = na[b].charCodeAt(0);
                if (57 == a)
                    return na[b] = 'A', na.join('');
                if (90 == a)
                    na[b] = '0';
                else
                    return na[b] = String.fromCharCode(a + 1), na.join('');
            }
            na.unshift('0');
            return na.join('');
        }
        function Yb(b, a) {
            a ? b.$$hashKey = a : delete b.$$hashKey;
        }
        function F(b) {
            var a = b.$$hashKey;
            r(arguments, function (a) {
                a !== b && r(a, function (a, c) {
                    b[c] = a;
                });
            });
            Yb(b, a);
            return b;
        }
        function U(b) {
            return parseInt(b, 10);
        }
        function Zb(b, a) {
            return F(new (F(function () {
            }, { prototype: b }))(), a);
        }
        function B() {
        }
        function ga(b) {
            return b;
        }
        function Z(b) {
            return function () {
                return b;
            };
        }
        function H(b) {
            return 'undefined' === typeof b;
        }
        function G(b) {
            return 'undefined' !== typeof b;
        }
        function T(b) {
            return null != b && 'object' === typeof b;
        }
        function E(b) {
            return 'string' === typeof b;
        }
        function ib(b) {
            return 'number' === typeof b;
        }
        function ua(b) {
            return '[object Date]' === Aa.call(b);
        }
        function O(b) {
            return 'function' === typeof b;
        }
        function jb(b) {
            return '[object RegExp]' === Aa.call(b);
        }
        function Ha(b) {
            return b && b.document && b.location && b.alert && b.setInterval;
        }
        function Uc(b) {
            return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
        }
        function Vc(b, a, c) {
            var d = [];
            r(b, function (b, f, g) {
                d.push(a.call(c, b, f, g));
            });
            return d;
        }
        function Sa(b, a) {
            if (b.indexOf)
                return b.indexOf(a);
            for (var c = 0; c < b.length; c++)
                if (a === b[c])
                    return c;
            return -1;
        }
        function Ta(b, a) {
            var c = Sa(b, a);
            0 <= c && b.splice(c, 1);
            return a;
        }
        function Ia(b, a, c, d) {
            if (Ha(b) || b && b.$evalAsync && b.$watch)
                throw Ua('cpws');
            if (a) {
                if (b === a)
                    throw Ua('cpi');
                c = c || [];
                d = d || [];
                if (T(b)) {
                    var e = Sa(c, b);
                    if (-1 !== e)
                        return d[e];
                    c.push(b);
                    d.push(a);
                }
                if (M(b))
                    for (var f = a.length = 0; f < b.length; f++)
                        e = Ia(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a.push(e);
                else {
                    var g = a.$$hashKey;
                    M(a) ? a.length = 0 : r(a, function (b, c) {
                        delete a[c];
                    });
                    for (f in b)
                        e = Ia(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e;
                    Yb(a, g);
                }
            } else if (a = b)
                M(b) ? a = Ia(b, [], c, d) : ua(b) ? a = new Date(b.getTime()) : jb(b) ? (a = RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), a.lastIndex = b.lastIndex) : T(b) && (a = Ia(b, {}, c, d));
            return a;
        }
        function ha(b, a) {
            if (M(b)) {
                a = a || [];
                for (var c = 0; c < b.length; c++)
                    a[c] = b[c];
            } else if (T(b))
                for (c in a = a || {}, b)
                    !kb.call(b, c) || '$' === c.charAt(0) && '$' === c.charAt(1) || (a[c] = b[c]);
            return a || b;
        }
        function Ba(b, a) {
            if (b === a)
                return !0;
            if (null === b || null === a)
                return !1;
            if (b !== b && a !== a)
                return !0;
            var c = typeof b, d;
            if (c == typeof a && 'object' == c)
                if (M(b)) {
                    if (!M(a))
                        return !1;
                    if ((c = b.length) == a.length) {
                        for (d = 0; d < c; d++)
                            if (!Ba(b[d], a[d]))
                                return !1;
                        return !0;
                    }
                } else {
                    if (ua(b))
                        return ua(a) ? isNaN(b.getTime()) && isNaN(a.getTime()) || b.getTime() === a.getTime() : !1;
                    if (jb(b) && jb(a))
                        return b.toString() == a.toString();
                    if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Ha(b) || Ha(a) || M(a))
                        return !1;
                    c = {};
                    for (d in b)
                        if ('$' !== d.charAt(0) && !O(b[d])) {
                            if (!Ba(b[d], a[d]))
                                return !1;
                            c[d] = !0;
                        }
                    for (d in a)
                        if (!c.hasOwnProperty(d) && '$' !== d.charAt(0) && a[d] !== v && !O(a[d]))
                            return !1;
                    return !0;
                }
            return !1;
        }
        function Ab(b, a) {
            var c = 2 < arguments.length ? va.call(arguments, 2) : [];
            return !O(a) || a instanceof RegExp ? a : c.length ? function () {
                return arguments.length ? a.apply(b, c.concat(va.call(arguments, 0))) : a.apply(b, c);
            } : function () {
                return arguments.length ? a.apply(b, arguments) : a.call(b);
            };
        }
        function Wc(b, a) {
            var c = a;
            'string' === typeof b && '$' === b.charAt(0) ? c = v : Ha(a) ? c = '$WINDOW' : a && W === a ? c = '$DOCUMENT' : a && (a.$evalAsync && a.$watch) && (c = '$SCOPE');
            return c;
        }
        function oa(b, a) {
            return 'undefined' === typeof b ? v : JSON.stringify(b, Wc, a ? '  ' : null);
        }
        function $b(b) {
            return E(b) ? JSON.parse(b) : b;
        }
        function Va(b) {
            'function' === typeof b ? b = !0 : b && 0 !== b.length ? (b = A('' + b), b = !('f' == b || '0' == b || 'false' == b || 'no' == b || 'n' == b || '[]' == b)) : b = !1;
            return b;
        }
        function ia(b) {
            b = D(b).clone();
            try {
                b.empty();
            } catch (a) {
            }
            var c = D('<div>').append(b).html();
            try {
                return 3 === b[0].nodeType ? A(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
                    return '<' + A(b);
                });
            } catch (d) {
                return A(c);
            }
        }
        function ac(b) {
            try {
                return decodeURIComponent(b);
            } catch (a) {
            }
        }
        function bc(b) {
            var a = {}, c, d;
            r((b || '').split('&'), function (b) {
                b && (c = b.replace(/\+/g, '%20').split('='), d = ac(c[0]), G(d) && (b = G(c[1]) ? ac(c[1]) : !0, kb.call(a, d) ? M(a[d]) ? a[d].push(b) : a[d] = [
                    a[d],
                    b
                ] : a[d] = b));
            });
            return a;
        }
        function Bb(b) {
            var a = [];
            r(b, function (b, d) {
                M(b) ? r(b, function (b) {
                    a.push(Ca(d, !0) + (!0 === b ? '' : '=' + Ca(b, !0)));
                }) : a.push(Ca(d, !0) + (!0 === b ? '' : '=' + Ca(b, !0)));
            });
            return a.length ? a.join('&') : '';
        }
        function lb(b) {
            return Ca(b, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
        }
        function Ca(b, a) {
            return encodeURIComponent(b).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, a ? '%20' : '+');
        }
        function Xc(b, a) {
            function c(a) {
                a && d.push(a);
            }
            var d = [b], e, f, g = [
                    'ng:app',
                    'ng-app',
                    'x-ng-app',
                    'data-ng-app'
                ], h = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
            r(g, function (a) {
                g[a] = !0;
                c(W.getElementById(a));
                a = a.replace(':', '\\:');
                b.querySelectorAll && (r(b.querySelectorAll('.' + a), c), r(b.querySelectorAll('.' + a + '\\:'), c), r(b.querySelectorAll('[' + a + ']'), c));
            });
            r(d, function (a) {
                if (!e) {
                    var b = h.exec(' ' + a.className + ' ');
                    b ? (e = a, f = (b[2] || '').replace(/\s+/g, ',')) : r(a.attributes, function (b) {
                        !e && g[b.name] && (e = a, f = b.value);
                    });
                }
            });
            e && a(e, f ? [f] : []);
        }
        function cc(b, a) {
            var c = function () {
                    b = D(b);
                    if (b.injector()) {
                        var c = b[0] === W ? 'document' : ia(b);
                        throw Ua('btstrpd', c.replace(/</, '&lt;').replace(/>/, '&gt;'));
                    }
                    a = a || [];
                    a.unshift([
                        '$provide',
                        function (a) {
                            a.value('$rootElement', b);
                        }
                    ]);
                    a.unshift('ng');
                    c = dc(a);
                    c.invoke([
                        '$rootScope',
                        '$rootElement',
                        '$compile',
                        '$injector',
                        '$animate',
                        function (a, b, c, d, e) {
                            a.$apply(function () {
                                b.data('$injector', d);
                                c(b)(a);
                            });
                        }
                    ]);
                    return c;
                }, d = /^NG_DEFER_BOOTSTRAP!/;
            if (V && !d.test(V.name))
                return c();
            V.name = V.name.replace(d, '');
            Wa.resumeBootstrap = function (b) {
                r(b, function (b) {
                    a.push(b);
                });
                c();
            };
        }
        function mb(b, a) {
            a = a || '_';
            return b.replace(Yc, function (b, d) {
                return (d ? a : '') + b.toLowerCase();
            });
        }
        function Cb(b, a, c) {
            if (!b)
                throw Ua('areq', a || '?', c || 'required');
            return b;
        }
        function Xa(b, a, c) {
            c && M(b) && (b = b[b.length - 1]);
            Cb(O(b), a, 'not a function, got ' + (b && 'object' === typeof b ? b.constructor.name || 'Object' : typeof b));
            return b;
        }
        function Da(b, a) {
            if ('hasOwnProperty' === b)
                throw Ua('badname', a);
        }
        function ec(b, a, c) {
            if (!a)
                return b;
            a = a.split('.');
            for (var d, e = b, f = a.length, g = 0; g < f; g++)
                d = a[g], b && (b = (e = b)[d]);
            return !c && O(b) ? Ab(e, b) : b;
        }
        function Db(b) {
            var a = b[0];
            b = b[b.length - 1];
            if (a === b)
                return D(a);
            var c = [a];
            do {
                a = a.nextSibling;
                if (!a)
                    break;
                c.push(a);
            } while (a !== b);
            return D(c);
        }
        function Zc(b) {
            var a = z('$injector'), c = z('ng');
            b = b.angular || (b.angular = {});
            b.$$minErr = b.$$minErr || z;
            return b.module || (b.module = function () {
                var b = {};
                return function (e, f, g) {
                    if ('hasOwnProperty' === e)
                        throw c('badname', 'module');
                    f && b.hasOwnProperty(e) && (b[e] = null);
                    return b[e] || (b[e] = function () {
                        function b(a, d, e) {
                            return function () {
                                c[e || 'push']([
                                    a,
                                    d,
                                    arguments
                                ]);
                                return n;
                            };
                        }
                        if (!f)
                            throw a('nomod', e);
                        var c = [], d = [], m = b('$injector', 'invoke'), n = {
                                _invokeQueue: c,
                                _runBlocks: d,
                                requires: f,
                                name: e,
                                provider: b('$provide', 'provider'),
                                factory: b('$provide', 'factory'),
                                service: b('$provide', 'service'),
                                value: b('$provide', 'value'),
                                constant: b('$provide', 'constant', 'unshift'),
                                animation: b('$animateProvider', 'register'),
                                filter: b('$filterProvider', 'register'),
                                controller: b('$controllerProvider', 'register'),
                                directive: b('$compileProvider', 'directive'),
                                config: m,
                                run: function (a) {
                                    d.push(a);
                                    return this;
                                }
                            };
                        g && m(g);
                        return n;
                    }());
                };
            }());
        }
        function $c(b) {
            F(b, {
                bootstrap: cc,
                copy: Ia,
                extend: F,
                equals: Ba,
                element: D,
                forEach: r,
                injector: dc,
                noop: B,
                bind: Ab,
                toJson: oa,
                fromJson: $b,
                identity: ga,
                isUndefined: H,
                isDefined: G,
                isString: E,
                isFunction: O,
                isObject: T,
                isNumber: ib,
                isElement: Uc,
                isArray: M,
                version: ad,
                isDate: ua,
                lowercase: A,
                uppercase: Ja,
                callbacks: { counter: 0 },
                $$minErr: z,
                $$csp: Ya
            });
            Za = Zc(V);
            try {
                Za('ngLocale');
            } catch (a) {
                Za('ngLocale', []).provider('$locale', bd);
            }
            Za('ng', ['ngLocale'], [
                '$provide',
                function (a) {
                    a.provider({ $$sanitizeUri: cd });
                    a.provider('$compile', fc).directive({
                        a: dd,
                        input: gc,
                        textarea: gc,
                        form: ed,
                        script: fd,
                        select: gd,
                        style: hd,
                        option: id,
                        ngBind: jd,
                        ngBindHtml: kd,
                        ngBindTemplate: ld,
                        ngClass: md,
                        ngClassEven: nd,
                        ngClassOdd: od,
                        ngCloak: pd,
                        ngController: qd,
                        ngForm: rd,
                        ngHide: sd,
                        ngIf: td,
                        ngInclude: ud,
                        ngInit: vd,
                        ngNonBindable: wd,
                        ngPluralize: xd,
                        ngRepeat: yd,
                        ngShow: zd,
                        ngStyle: Ad,
                        ngSwitch: Bd,
                        ngSwitchWhen: Cd,
                        ngSwitchDefault: Dd,
                        ngOptions: Ed,
                        ngTransclude: Fd,
                        ngModel: Gd,
                        ngList: Hd,
                        ngChange: Id,
                        required: hc,
                        ngRequired: hc,
                        ngValue: Jd
                    }).directive({ ngInclude: Kd }).directive(Eb).directive(ic);
                    a.provider({
                        $anchorScroll: Ld,
                        $animate: Md,
                        $browser: Nd,
                        $cacheFactory: Od,
                        $controller: Pd,
                        $document: Qd,
                        $exceptionHandler: Rd,
                        $filter: jc,
                        $interpolate: Sd,
                        $interval: Td,
                        $http: Ud,
                        $httpBackend: Vd,
                        $location: Wd,
                        $log: Xd,
                        $parse: Yd,
                        $rootScope: Zd,
                        $q: $d,
                        $sce: ae,
                        $sceDelegate: be,
                        $sniffer: ce,
                        $templateCache: de,
                        $timeout: ee,
                        $window: fe,
                        $$rAF: ge,
                        $$asyncCallback: he
                    });
                }
            ]);
        }
        function $a(b) {
            return b.replace(ie, function (a, b, d, e) {
                return e ? d.toUpperCase() : d;
            }).replace(je, 'Moz$1');
        }
        function Fb(b, a, c, d) {
            function e(b) {
                var e = c && b ? [this.filter(b)] : [this], k = a, l, m, n, q, p, s;
                if (!d || null != b)
                    for (; e.length;)
                        for (l = e.shift(), m = 0, n = l.length; m < n; m++)
                            for (q = D(l[m]), k ? q.triggerHandler('$destroy') : k = !k, p = 0, q = (s = q.children()).length; p < q; p++)
                                e.push(Ea(s[p]));
                return f.apply(this, arguments);
            }
            var f = Ea.fn[b], f = f.$original || f;
            e.$original = f;
            Ea.fn[b] = e;
        }
        function S(b) {
            if (b instanceof S)
                return b;
            E(b) && (b = $(b));
            if (!(this instanceof S)) {
                if (E(b) && '<' != b.charAt(0))
                    throw Gb('nosel');
                return new S(b);
            }
            if (E(b)) {
                var a = b;
                b = W;
                var c;
                if (c = ke.exec(a))
                    b = [b.createElement(c[1])];
                else {
                    var d = b, e;
                    b = d.createDocumentFragment();
                    c = [];
                    if (Hb.test(a)) {
                        d = b.appendChild(d.createElement('div'));
                        e = (le.exec(a) || [
                            '',
                            ''
                        ])[1].toLowerCase();
                        e = ca[e] || ca._default;
                        d.innerHTML = '<div>&#160;</div>' + e[1] + a.replace(me, '<$1></$2>') + e[2];
                        d.removeChild(d.firstChild);
                        for (a = e[0]; a--;)
                            d = d.lastChild;
                        a = 0;
                        for (e = d.childNodes.length; a < e; ++a)
                            c.push(d.childNodes[a]);
                        d = b.firstChild;
                        d.textContent = '';
                    } else
                        c.push(d.createTextNode(a));
                    b.textContent = '';
                    b.innerHTML = '';
                    b = c;
                }
                Ib(this, b);
                D(W.createDocumentFragment()).append(this);
            } else
                Ib(this, b);
        }
        function Jb(b) {
            return b.cloneNode(!0);
        }
        function Ka(b) {
            Kb(b);
            var a = 0;
            for (b = b.childNodes || []; a < b.length; a++)
                Ka(b[a]);
        }
        function kc(b, a, c, d) {
            if (G(d))
                throw Gb('offargs');
            var e = pa(b, 'events');
            pa(b, 'handle') && (H(a) ? r(e, function (a, c) {
                ab(b, c, a);
                delete e[c];
            }) : r(a.split(' '), function (a) {
                H(c) ? (ab(b, a, e[a]), delete e[a]) : Ta(e[a] || [], c);
            }));
        }
        function Kb(b, a) {
            var c = b.ng339, d = bb[c];
            d && (a ? delete bb[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, '$destroy'), kc(b)), delete bb[c], b.ng339 = v));
        }
        function pa(b, a, c) {
            var d = b.ng339, d = bb[d || -1];
            if (G(c))
                d || (b.ng339 = d = ++ne, d = bb[d] = {}), d[a] = c;
            else
                return d && d[a];
        }
        function Lb(b, a, c) {
            var d = pa(b, 'data'), e = G(c), f = !e && G(a), g = f && !T(a);
            d || g || pa(b, 'data', d = {});
            if (e)
                d[a] = c;
            else if (f) {
                if (g)
                    return d && d[a];
                F(d, a);
            } else
                return d;
        }
        function Mb(b, a) {
            return b.getAttribute ? -1 < (' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + a + ' ') : !1;
        }
        function nb(b, a) {
            a && b.setAttribute && r(a.split(' '), function (a) {
                b.setAttribute('class', $((' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').replace(' ' + $(a) + ' ', ' ')));
            });
        }
        function ob(b, a) {
            if (a && b.setAttribute) {
                var c = (' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ');
                r(a.split(' '), function (a) {
                    a = $(a);
                    -1 === c.indexOf(' ' + a + ' ') && (c += a + ' ');
                });
                b.setAttribute('class', $(c));
            }
        }
        function Ib(b, a) {
            if (a) {
                a = a.nodeName || !G(a.length) || Ha(a) ? [a] : a;
                for (var c = 0; c < a.length; c++)
                    b.push(a[c]);
            }
        }
        function lc(b, a) {
            return pb(b, '$' + (a || 'ngController') + 'Controller');
        }
        function pb(b, a, c) {
            9 == b.nodeType && (b = b.documentElement);
            for (a = M(a) ? a : [a]; b;) {
                for (var d = 0, e = a.length; d < e; d++)
                    if ((c = D.data(b, a[d])) !== v)
                        return c;
                b = b.parentNode || 11 === b.nodeType && b.host;
            }
        }
        function mc(b) {
            for (var a = 0, c = b.childNodes; a < c.length; a++)
                Ka(c[a]);
            for (; b.firstChild;)
                b.removeChild(b.firstChild);
        }
        function nc(b, a) {
            var c = qb[a.toLowerCase()];
            return c && oc[b.nodeName] && c;
        }
        function oe(b, a) {
            var c = function (c, e) {
                c.preventDefault || (c.preventDefault = function () {
                    c.returnValue = !1;
                });
                c.stopPropagation || (c.stopPropagation = function () {
                    c.cancelBubble = !0;
                });
                c.target || (c.target = c.srcElement || W);
                if (H(c.defaultPrevented)) {
                    var f = c.preventDefault;
                    c.preventDefault = function () {
                        c.defaultPrevented = !0;
                        f.call(c);
                    };
                    c.defaultPrevented = !1;
                }
                c.isDefaultPrevented = function () {
                    return c.defaultPrevented || !1 === c.returnValue;
                };
                var g = ha(a[e || c.type] || []);
                r(g, function (a) {
                    a.call(b, c);
                });
                8 >= u ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, delete c.stopPropagation, delete c.isDefaultPrevented);
            };
            c.elem = b;
            return c;
        }
        function La(b, a) {
            var c = typeof b, d;
            'function' == c || 'object' == c && null !== b ? 'function' == typeof (d = b.$$hashKey) ? d = b.$$hashKey() : d === v && (d = b.$$hashKey = (a || hb)()) : d = b;
            return c + ':' + d;
        }
        function cb(b, a) {
            if (a) {
                var c = 0;
                this.nextUid = function () {
                    return ++c;
                };
            }
            r(b, this.put, this);
        }
        function pc(b) {
            var a, c;
            'function' === typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(pe, ''), c = c.match(qe), r(c[1].split(re), function (b) {
                b.replace(se, function (b, c, d) {
                    a.push(d);
                });
            })), b.$inject = a) : M(b) ? (c = b.length - 1, Xa(b[c], 'fn'), a = b.slice(0, c)) : Xa(b, 'fn', !0);
            return a;
        }
        function dc(b) {
            function a(a) {
                return function (b, c) {
                    if (T(b))
                        r(b, Xb(a));
                    else
                        return a(b, c);
                };
            }
            function c(a, b) {
                Da(a, 'service');
                if (O(b) || M(b))
                    b = n.instantiate(b);
                if (!b.$get)
                    throw db('pget', a);
                return m[a + h] = b;
            }
            function d(a, b) {
                return c(a, { $get: b });
            }
            function e(a) {
                var b = [], c, d, f, h;
                r(a, function (a) {
                    if (!l.get(a)) {
                        l.put(a, !0);
                        try {
                            if (E(a))
                                for (c = Za(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, f = 0, h = d.length; f < h; f++) {
                                    var g = d[f], k = n.get(g[0]);
                                    k[g[1]].apply(k, g[2]);
                                }
                            else
                                O(a) ? b.push(n.invoke(a)) : M(a) ? b.push(n.invoke(a)) : Xa(a, 'module');
                        } catch (p) {
                            throw M(a) && (a = a[a.length - 1]), p.message && (p.stack && -1 == p.stack.indexOf(p.message)) && (p = p.message + '\n' + p.stack), db('modulerr', a, p.stack || p.message || p);
                        }
                    }
                });
                return b;
            }
            function f(a, b) {
                function c(d) {
                    if (a.hasOwnProperty(d)) {
                        if (a[d] === g)
                            throw db('cdep', d + ' <- ' + k.join(' <- '));
                        return a[d];
                    }
                    try {
                        return k.unshift(d), a[d] = g, a[d] = b(d);
                    } catch (e) {
                        throw a[d] === g && delete a[d], e;
                    } finally {
                        k.shift();
                    }
                }
                function d(a, b, e) {
                    var f = [], h = pc(a), g, k, p;
                    k = 0;
                    for (g = h.length; k < g; k++) {
                        p = h[k];
                        if ('string' !== typeof p)
                            throw db('itkn', p);
                        f.push(e && e.hasOwnProperty(p) ? e[p] : c(p));
                    }
                    M(a) && (a = a[g]);
                    return a.apply(b, f);
                }
                return {
                    invoke: d,
                    instantiate: function (a, b) {
                        var c = function () {
                            }, e;
                        c.prototype = (M(a) ? a[a.length - 1] : a).prototype;
                        c = new c();
                        e = d(a, c, b);
                        return T(e) || O(e) ? e : c;
                    },
                    get: c,
                    annotate: pc,
                    has: function (b) {
                        return m.hasOwnProperty(b + h) || a.hasOwnProperty(b);
                    }
                };
            }
            var g = {}, h = 'Provider', k = [], l = new cb([], !0), m = {
                    $provide: {
                        provider: a(c),
                        factory: a(d),
                        service: a(function (a, b) {
                            return d(a, [
                                '$injector',
                                function (a) {
                                    return a.instantiate(b);
                                }
                            ]);
                        }),
                        value: a(function (a, b) {
                            return d(a, Z(b));
                        }),
                        constant: a(function (a, b) {
                            Da(a, 'constant');
                            m[a] = b;
                            q[a] = b;
                        }),
                        decorator: function (a, b) {
                            var c = n.get(a + h), d = c.$get;
                            c.$get = function () {
                                var a = p.invoke(d, c);
                                return p.invoke(b, null, { $delegate: a });
                            };
                        }
                    }
                }, n = m.$injector = f(m, function () {
                    throw db('unpr', k.join(' <- '));
                }), q = {}, p = q.$injector = f(q, function (a) {
                    a = n.get(a + h);
                    return p.invoke(a.$get, a);
                });
            r(e(b), function (a) {
                p.invoke(a || B);
            });
            return p;
        }
        function Ld() {
            var b = !0;
            this.disableAutoScrolling = function () {
                b = !1;
            };
            this.$get = [
                '$window',
                '$location',
                '$rootScope',
                function (a, c, d) {
                    function e(a) {
                        var b = null;
                        r(a, function (a) {
                            b || 'a' !== A(a.nodeName) || (b = a);
                        });
                        return b;
                    }
                    function f() {
                        var b = c.hash(), d;
                        b ? (d = g.getElementById(b)) ? d.scrollIntoView() : (d = e(g.getElementsByName(b))) ? d.scrollIntoView() : 'top' === b && a.scrollTo(0, 0) : a.scrollTo(0, 0);
                    }
                    var g = a.document;
                    b && d.$watch(function () {
                        return c.hash();
                    }, function () {
                        d.$evalAsync(f);
                    });
                    return f;
                }
            ];
        }
        function he() {
            this.$get = [
                '$$rAF',
                '$timeout',
                function (b, a) {
                    return b.supported ? function (a) {
                        return b(a);
                    } : function (b) {
                        return a(b, 0, !1);
                    };
                }
            ];
        }
        function te(b, a, c, d) {
            function e(a) {
                try {
                    a.apply(null, va.call(arguments, 1));
                } finally {
                    if (s--, 0 === s)
                        for (; K.length;)
                            try {
                                K.pop()();
                            } catch (b) {
                                c.error(b);
                            }
                }
            }
            function f(a, b) {
                (function da() {
                    r(w, function (a) {
                        a();
                    });
                    t = b(da, a);
                }());
            }
            function g() {
                x != h.url() && (x = h.url(), r(aa, function (a) {
                    a(h.url());
                }));
            }
            var h = this, k = a[0], l = b.location, m = b.history, n = b.setTimeout, q = b.clearTimeout, p = {};
            h.isMock = !1;
            var s = 0, K = [];
            h.$$completeOutstandingRequest = e;
            h.$$incOutstandingRequestCount = function () {
                s++;
            };
            h.notifyWhenNoOutstandingRequests = function (a) {
                r(w, function (a) {
                    a();
                });
                0 === s ? a() : K.push(a);
            };
            var w = [], t;
            h.addPollFn = function (a) {
                H(t) && f(100, n);
                w.push(a);
                return a;
            };
            var x = l.href, L = a.find('base'), y = null;
            h.url = function (a, c) {
                l !== b.location && (l = b.location);
                m !== b.history && (m = b.history);
                if (a) {
                    if (x != a) {
                        var e = x && Fa(x) === Fa(a);
                        x = a;
                        if (!e && d.history)
                            c ? m.replaceState(null, '', a) : (m.pushState(null, '', a), L.attr('href', L.attr('href')));
                        else if (e || (y = a), c)
                            l.replace(a);
                        else if (e) {
                            var e = l, f;
                            f = a.indexOf('#');
                            f = -1 === f ? '' : a.substr(f + 1);
                            e.hash = f;
                        } else
                            l.href = a;
                        return h;
                    }
                } else
                    return y || l.href.replace(/%27/g, '\'');
            };
            var aa = [], P = !1;
            h.onUrlChange = function (a) {
                if (!P) {
                    if (d.history)
                        D(b).on('popstate', g);
                    if (d.hashchange)
                        D(b).on('hashchange', g);
                    else
                        h.addPollFn(g);
                    P = !0;
                }
                aa.push(a);
                return a;
            };
            h.$$checkUrlChange = g;
            h.baseHref = function () {
                var a = L.attr('href');
                return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
            };
            var N = {}, ba = '', Q = h.baseHref();
            h.cookies = function (a, b) {
                var d, e, f, h;
                if (a)
                    b === v ? k.cookie = escape(a) + '=;path=' + Q + ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : E(b) && (d = (k.cookie = escape(a) + '=' + escape(b) + ';path=' + Q).length + 1, 4096 < d && c.warn('Cookie \'' + a + '\' possibly not set or overflowed because it was too large (' + d + ' > 4096 bytes)!'));
                else {
                    if (k.cookie !== ba)
                        for (ba = k.cookie, d = ba.split('; '), N = {}, f = 0; f < d.length; f++)
                            e = d[f], h = e.indexOf('='), 0 < h && (a = unescape(e.substring(0, h)), N[a] === v && (N[a] = unescape(e.substring(h + 1))));
                    return N;
                }
            };
            h.defer = function (a, b) {
                var c;
                s++;
                c = n(function () {
                    delete p[c];
                    e(a);
                }, b || 0);
                p[c] = !0;
                return c;
            };
            h.defer.cancel = function (a) {
                return p[a] ? (delete p[a], q(a), e(B), !0) : !1;
            };
        }
        function Nd() {
            this.$get = [
                '$window',
                '$log',
                '$sniffer',
                '$document',
                function (b, a, c, d) {
                    return new te(b, d, a, c);
                }
            ];
        }
        function Od() {
            this.$get = function () {
                function b(b, d) {
                    function e(a) {
                        a != n && (q ? q == a && (q = a.n) : q = a, f(a.n, a.p), f(a, n), n = a, n.n = null);
                    }
                    function f(a, b) {
                        a != b && (a && (a.p = b), b && (b.n = a));
                    }
                    if (b in a)
                        throw z('$cacheFactory')('iid', b);
                    var g = 0, h = F({}, d, { id: b }), k = {}, l = d && d.capacity || Number.MAX_VALUE, m = {}, n = null, q = null;
                    return a[b] = {
                        put: function (a, b) {
                            if (l < Number.MAX_VALUE) {
                                var c = m[a] || (m[a] = { key: a });
                                e(c);
                            }
                            if (!H(b))
                                return a in k || g++, k[a] = b, g > l && this.remove(q.key), b;
                        },
                        get: function (a) {
                            if (l < Number.MAX_VALUE) {
                                var b = m[a];
                                if (!b)
                                    return;
                                e(b);
                            }
                            return k[a];
                        },
                        remove: function (a) {
                            if (l < Number.MAX_VALUE) {
                                var b = m[a];
                                if (!b)
                                    return;
                                b == n && (n = b.p);
                                b == q && (q = b.n);
                                f(b.n, b.p);
                                delete m[a];
                            }
                            delete k[a];
                            g--;
                        },
                        removeAll: function () {
                            k = {};
                            g = 0;
                            m = {};
                            n = q = null;
                        },
                        destroy: function () {
                            m = h = k = null;
                            delete a[b];
                        },
                        info: function () {
                            return F({}, h, { size: g });
                        }
                    };
                }
                var a = {};
                b.info = function () {
                    var b = {};
                    r(a, function (a, e) {
                        b[e] = a.info();
                    });
                    return b;
                };
                b.get = function (b) {
                    return a[b];
                };
                return b;
            };
        }
        function de() {
            this.$get = [
                '$cacheFactory',
                function (b) {
                    return b('templates');
                }
            ];
        }
        function fc(b, a) {
            var c = {}, d = 'Directive', e = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, f = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/, g = /^(on[a-z]+|formaction)$/;
            this.directive = function k(a, e) {
                Da(a, 'directive');
                E(a) ? (Cb(e, 'directiveFactory'), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, [
                    '$injector',
                    '$exceptionHandler',
                    function (b, d) {
                        var e = [];
                        r(c[a], function (c, f) {
                            try {
                                var g = b.invoke(c);
                                O(g) ? g = { compile: Z(g) } : !g.compile && g.link && (g.compile = Z(g.link));
                                g.priority = g.priority || 0;
                                g.index = f;
                                g.name = g.name || a;
                                g.require = g.require || g.controller && g.name;
                                g.restrict = g.restrict || 'A';
                                e.push(g);
                            } catch (k) {
                                d(k);
                            }
                        });
                        return e;
                    }
                ])), c[a].push(e)) : r(a, Xb(k));
                return this;
            };
            this.aHrefSanitizationWhitelist = function (b) {
                return G(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
            };
            this.imgSrcSanitizationWhitelist = function (b) {
                return G(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
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
                function (a, b, m, n, q, p, s, K, w, t, x, L) {
                    function y(a, b, c, d, e) {
                        a instanceof D || (a = D(a));
                        r(a, function (b, c) {
                            3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = D(b).wrap('<span></span>').parent()[0]);
                        });
                        var f = P(a, b, a, c, d, e);
                        aa(a, 'ng-scope');
                        return function (b, c, d, e) {
                            Cb(b, 'scope');
                            var g = c ? Ma.clone.call(a) : a;
                            r(d, function (a, b) {
                                g.data('$' + b + 'Controller', a);
                            });
                            d = 0;
                            for (var k = g.length; d < k; d++) {
                                var p = g[d].nodeType;
                                1 !== p && 9 !== p || g.eq(d).data('$scope', b);
                            }
                            c && c(g, b);
                            f && f(b, g, g, e);
                            return g;
                        };
                    }
                    function aa(a, b) {
                        try {
                            a.addClass(b);
                        } catch (c) {
                        }
                    }
                    function P(a, b, c, d, e, f) {
                        function g(a, c, d, e) {
                            var f, p, m, l, q, n, w;
                            f = c.length;
                            var s = Array(f);
                            for (l = 0; l < f; l++)
                                s[l] = c[l];
                            n = l = 0;
                            for (q = k.length; l < q; n++)
                                p = s[n], c = k[l++], f = k[l++], c ? (c.scope ? (m = a.$new(), D.data(p, '$scope', m)) : m = a, w = c.transcludeOnThisElement ? N(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? N(a, b) : null, c(f, m, p, d, w)) : f && f(a, p.childNodes, v, e);
                        }
                        for (var k = [], p, m, l, q, n = 0; n < a.length; n++)
                            p = new Nb(), m = ba(a[n], [], p, 0 === n ? d : v, e), (f = m.length ? J(m, a[n], p, b, c, null, [], [], f) : null) && f.scope && aa(p.$$element, 'ng-scope'), p = f && f.terminal || !(l = a[n].childNodes) || !l.length ? null : P(l, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), k.push(f, p), q = q || f || p, f = null;
                        return q ? g : null;
                    }
                    function N(a, b, c) {
                        return function (d, e, f) {
                            var g = !1;
                            d || (d = a.$new(), g = d.$$transcluded = !0);
                            e = b(d, e, f, c);
                            if (g)
                                e.on('$destroy', function () {
                                    d.$destroy();
                                });
                            return e;
                        };
                    }
                    function ba(a, b, c, d, g) {
                        var k = c.$attr, p;
                        switch (a.nodeType) {
                        case 1:
                            p = Na(a).toLowerCase();
                            da(b, qa(p), 'E', d, g);
                            for (var l, m, q, n, w = a.attributes, s = 0, t = w && w.length; s < t; s++) {
                                var K = !1, x = !1;
                                l = w[s];
                                if (!u || 8 <= u || l.specified) {
                                    m = l.name;
                                    q = $(l.value);
                                    l = qa(m);
                                    if (n = U.test(l))
                                        m = mb(l.substr(6), '-');
                                    var y = l.replace(/(Start|End)$/, '');
                                    l === y + 'Start' && (K = m, x = m.substr(0, m.length - 5) + 'end', m = m.substr(0, m.length - 6));
                                    l = qa(m.toLowerCase());
                                    k[l] = m;
                                    if (n || !c.hasOwnProperty(l))
                                        c[l] = q, nc(a, l) && (c[l] = !0);
                                    S(a, b, q, l);
                                    da(b, l, 'A', d, g, K, x);
                                }
                            }
                            'input' === p && 'hidden' === a.getAttribute('type') && a.setAttribute('autocomplete', 'off');
                            a = a.className;
                            if (E(a) && '' !== a)
                                for (; p = f.exec(a);)
                                    l = qa(p[2]), da(b, l, 'C', d, g) && (c[l] = $(p[3])), a = a.substr(p.index + p[0].length);
                            break;
                        case 3:
                            if (11 === u)
                                for (; a.parentNode && a.nextSibling && 3 === a.nextSibling.nodeType;)
                                    a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
                            A(b, a.nodeValue);
                            break;
                        case 8:
                            try {
                                if (p = e.exec(a.nodeValue))
                                    l = qa(p[1]), da(b, l, 'M', d, g) && (c[l] = $(p[2]));
                            } catch (r) {
                            }
                        }
                        b.sort(H);
                        return b;
                    }
                    function Q(a, b, c) {
                        var d = [], e = 0;
                        if (b && a.hasAttribute && a.hasAttribute(b)) {
                            do {
                                if (!a)
                                    throw ja('uterdir', b, c);
                                1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                                d.push(a);
                                a = a.nextSibling;
                            } while (0 < e);
                        } else
                            d.push(a);
                        return D(d);
                    }
                    function C(a, b, c) {
                        return function (d, e, f, g, k) {
                            e = Q(e[0], b, c);
                            return a(d, e, f, g, k);
                        };
                    }
                    function J(a, c, d, e, f, g, k, q, n) {
                        function w(a, b, c, d) {
                            if (a) {
                                c && (a = C(a, c, d));
                                a.require = I.require;
                                a.directiveName = z;
                                if (L === I || I.$$isolateScope)
                                    a = qc(a, { isolateScope: !0 });
                                k.push(a);
                            }
                            if (b) {
                                c && (b = C(b, c, d));
                                b.require = I.require;
                                b.directiveName = z;
                                if (L === I || I.$$isolateScope)
                                    b = qc(b, { isolateScope: !0 });
                                q.push(b);
                            }
                        }
                        function t(a, b, c, d) {
                            var e, f = 'data', g = !1;
                            if (E(b)) {
                                for (; '^' == (e = b.charAt(0)) || '?' == e;)
                                    b = b.substr(1), '^' == e && (f = 'inheritedData'), g = g || '?' == e;
                                e = null;
                                d && 'data' === f && (e = d[b]);
                                e = e || c[f]('$' + b + 'Controller');
                                if (!e && !g)
                                    throw ja('ctreq', b, a);
                            } else
                                M(b) && (e = [], r(b, function (b) {
                                    e.push(t(a, b, c, d));
                                }));
                            return e;
                        }
                        function K(a, e, f, g, n) {
                            function w(a, b) {
                                var c;
                                2 > arguments.length && (b = a, a = v);
                                Ga && (c = ba);
                                return n(a, b, c);
                            }
                            var x, R, y, N, C, Q, ba = {}, ra;
                            x = c === f ? d : ha(d, new Nb(D(f), d.$attr));
                            R = x.$$element;
                            if (L) {
                                var ve = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                                Q = e.$new(!0);
                                !J || J !== L && J !== L.$$originalDirective ? R.data('$isolateScopeNoTemplate', Q) : R.data('$isolateScope', Q);
                                aa(R, 'ng-isolate-scope');
                                r(L.scope, function (a, c) {
                                    var d = a.match(ve) || [], f = d[3] || c, g = '?' == d[2], d = d[1], k, m, n, q;
                                    Q.$$isolateBindings[c] = d + f;
                                    switch (d) {
                                    case '@':
                                        x.$observe(f, function (a) {
                                            Q[c] = a;
                                        });
                                        x.$$observers[f].$$scope = e;
                                        x[f] && (Q[c] = b(x[f])(e));
                                        break;
                                    case '=':
                                        if (g && !x[f])
                                            break;
                                        m = p(x[f]);
                                        q = m.literal ? Ba : function (a, b) {
                                            return a === b || a !== a && b !== b;
                                        };
                                        n = m.assign || function () {
                                            k = Q[c] = m(e);
                                            throw ja('nonassign', x[f], L.name);
                                        };
                                        k = Q[c] = m(e);
                                        Q.$watch(function () {
                                            var a = m(e);
                                            q(a, Q[c]) || (q(a, k) ? n(e, a = Q[c]) : Q[c] = a);
                                            return k = a;
                                        }, null, m.literal);
                                        break;
                                    case '&':
                                        m = p(x[f]);
                                        Q[c] = function (a) {
                                            return m(e, a);
                                        };
                                        break;
                                    default:
                                        throw ja('iscp', L.name, c, a);
                                    }
                                });
                            }
                            ra = n && w;
                            P && r(P, function (a) {
                                var b = {
                                        $scope: a === L || a.$$isolateScope ? Q : e,
                                        $element: R,
                                        $attrs: x,
                                        $transclude: ra
                                    }, c;
                                C = a.controller;
                                '@' == C && (C = x[a.name]);
                                c = s(C, b);
                                ba[a.name] = c;
                                Ga || R.data('$' + a.name + 'Controller', c);
                                a.controllerAs && (b.$scope[a.controllerAs] = c);
                            });
                            g = 0;
                            for (y = k.length; g < y; g++)
                                try {
                                    N = k[g], N(N.isolateScope ? Q : e, R, x, N.require && t(N.directiveName, N.require, R, ba), ra);
                                } catch (u) {
                                    m(u, ia(R));
                                }
                            g = e;
                            L && (L.template || null === L.templateUrl) && (g = Q);
                            a && a(g, f.childNodes, v, n);
                            for (g = q.length - 1; 0 <= g; g--)
                                try {
                                    N = q[g], N(N.isolateScope ? Q : e, R, x, N.require && t(N.directiveName, N.require, R, ba), ra);
                                } catch (I) {
                                    m(I, ia(R));
                                }
                        }
                        n = n || {};
                        for (var x = -Number.MAX_VALUE, N, P = n.controllerDirectives, L = n.newIsolateScopeDirective, J = n.templateDirective, da = n.nonTlbTranscludeDirective, H = !1, F = !1, Ga = n.hasElementTranscludeDirective, A = d.$$element = D(c), I, z, u, S = e, Oa, ka = 0, U = a.length; ka < U; ka++) {
                            I = a[ka];
                            var X = I.$$start, Y = I.$$end;
                            X && (A = Q(c, X, Y));
                            u = v;
                            if (x > I.priority)
                                break;
                            if (u = I.scope)
                                N = N || I, I.templateUrl || (eb('new/isolated scope', L, I, A), T(u) && (L = I));
                            z = I.name;
                            !I.templateUrl && I.controller && (u = I.controller, P = P || {}, eb('\'' + z + '\' controller', P[z], I, A), P[z] = I);
                            if (u = I.transclude)
                                H = !0, I.$$tlb || (eb('transclusion', da, I, A), da = I), 'element' == u ? (Ga = !0, x = I.priority, u = A, A = d.$$element = D(W.createComment(' ' + z + ': ' + d[z] + ' ')), c = A[0], ra(f, va.call(u, 0), c), S = y(u, e, x, g && g.name, { nonTlbTranscludeDirective: da })) : (u = D(Jb(c)).contents(), A.empty(), S = y(u, e));
                            if (I.template)
                                if (F = !0, eb('template', J, I, A), J = I, u = O(I.template) ? I.template(A, d) : I.template, u = V(u), I.replace) {
                                    g = I;
                                    u = Hb.test(u) ? D($(u)) : [];
                                    c = u[0];
                                    if (1 != u.length || 1 !== c.nodeType)
                                        throw ja('tplrt', z, '');
                                    ra(f, A, c);
                                    U = { $attr: {} };
                                    u = ba(c, [], U);
                                    var we = a.splice(ka + 1, a.length - (ka + 1));
                                    L && G(u);
                                    a = a.concat(u).concat(we);
                                    B(d, U);
                                    U = a.length;
                                } else
                                    A.html(u);
                            if (I.templateUrl)
                                F = !0, eb('template', J, I, A), J = I, I.replace && (g = I), K = ue(a.splice(ka, a.length - ka), A, d, f, H && S, k, q, {
                                    controllerDirectives: P,
                                    newIsolateScopeDirective: L,
                                    templateDirective: J,
                                    nonTlbTranscludeDirective: da
                                }), U = a.length;
                            else if (I.compile)
                                try {
                                    Oa = I.compile(A, d, S), O(Oa) ? w(null, Oa, X, Y) : Oa && w(Oa.pre, Oa.post, X, Y);
                                } catch (Z) {
                                    m(Z, ia(A));
                                }
                            I.terminal && (K.terminal = !0, x = Math.max(x, I.priority));
                        }
                        K.scope = N && !0 === N.scope;
                        K.transcludeOnThisElement = H;
                        K.templateOnThisElement = F;
                        K.transclude = S;
                        n.hasElementTranscludeDirective = Ga;
                        return K;
                    }
                    function G(a) {
                        for (var b = 0, c = a.length; b < c; b++)
                            a[b] = Zb(a[b], { $$isolateScope: !0 });
                    }
                    function da(b, e, f, g, p, l, n) {
                        if (e === p)
                            return null;
                        p = null;
                        if (c.hasOwnProperty(e)) {
                            var q;
                            e = a.get(e + d);
                            for (var w = 0, s = e.length; w < s; w++)
                                try {
                                    q = e[w], (g === v || g > q.priority) && -1 != q.restrict.indexOf(f) && (l && (q = Zb(q, {
                                        $$start: l,
                                        $$end: n
                                    })), b.push(q), p = q);
                                } catch (x) {
                                    m(x);
                                }
                        }
                        return p;
                    }
                    function B(a, b) {
                        var c = b.$attr, d = a.$attr, e = a.$$element;
                        r(a, function (d, e) {
                            '$' != e.charAt(0) && (b[e] && b[e] !== d && (d += ('style' === e ? ';' : ' ') + b[e]), a.$set(e, d, !0, c[e]));
                        });
                        r(b, function (b, f) {
                            'class' == f ? (aa(e, b), a['class'] = (a['class'] ? a['class'] + ' ' : '') + b) : 'style' == f ? (e.attr('style', e.attr('style') + ';' + b), a.style = (a.style ? a.style + ';' : '') + b) : '$' == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f]);
                        });
                    }
                    function ue(a, b, c, d, e, f, g, k) {
                        var p = [], l, m, w = b[0], s = a.shift(), x = F({}, s, {
                                templateUrl: null,
                                transclude: null,
                                replace: null,
                                $$originalDirective: s
                            }), K = O(s.templateUrl) ? s.templateUrl(b, c) : s.templateUrl;
                        b.empty();
                        n.get(t.getTrustedResourceUrl(K), { cache: q }).success(function (q) {
                            var n, t;
                            q = V(q);
                            if (s.replace) {
                                q = Hb.test(q) ? D($(q)) : [];
                                n = q[0];
                                if (1 != q.length || 1 !== n.nodeType)
                                    throw ja('tplrt', s.name, K);
                                q = { $attr: {} };
                                ra(d, b, n);
                                var y = ba(n, [], q);
                                T(s.scope) && G(y);
                                a = y.concat(a);
                                B(c, q);
                            } else
                                n = w, b.html(q);
                            a.unshift(x);
                            l = J(a, n, c, e, b, s, f, g, k);
                            r(d, function (a, c) {
                                a == n && (d[c] = b[0]);
                            });
                            for (m = P(b[0].childNodes, e); p.length;) {
                                q = p.shift();
                                t = p.shift();
                                var L = p.shift(), C = p.shift(), y = b[0];
                                if (t !== w) {
                                    var Q = t.className;
                                    k.hasElementTranscludeDirective && s.replace || (y = Jb(n));
                                    ra(L, D(t), y);
                                    aa(D(y), Q);
                                }
                                t = l.transcludeOnThisElement ? N(q, l.transclude, C) : C;
                                l(m, q, y, d, t);
                            }
                            p = null;
                        }).error(function (a, b, c, d) {
                            throw ja('tpload', d.url);
                        });
                        return function (a, b, c, d, e) {
                            a = e;
                            p ? (p.push(b), p.push(c), p.push(d), p.push(a)) : (l.transcludeOnThisElement && (a = N(b, l.transclude, e)), l(m, b, c, d, a));
                        };
                    }
                    function H(a, b) {
                        var c = b.priority - a.priority;
                        return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
                    }
                    function eb(a, b, c, d) {
                        if (b)
                            throw ja('multidir', b.name, c.name, a, ia(d));
                    }
                    function A(a, c) {
                        var d = b(c, !0);
                        d && a.push({
                            priority: 0,
                            compile: function (a) {
                                var b = a.parent().length;
                                b && aa(a.parent(), 'ng-binding');
                                return function (a, c) {
                                    var e = c.parent(), f = e.data('$binding') || [];
                                    f.push(d);
                                    e.data('$binding', f);
                                    b || aa(e, 'ng-binding');
                                    a.$watch(d, function (a) {
                                        c[0].nodeValue = a;
                                    });
                                };
                            }
                        });
                    }
                    function z(a, b) {
                        if ('srcdoc' == b)
                            return t.HTML;
                        var c = Na(a);
                        if ('xlinkHref' == b || 'FORM' == c && 'action' == b || 'LINK' == c && 'href' == b || 'IMG' != c && ('src' == b || 'ngSrc' == b))
                            return t.RESOURCE_URL;
                    }
                    function S(a, c, d, e) {
                        var f = b(d, !0);
                        if (f) {
                            if ('multiple' === e && 'SELECT' === Na(a))
                                throw ja('selmulti', ia(a));
                            c.push({
                                priority: 100,
                                compile: function () {
                                    return {
                                        pre: function (c, d, k) {
                                            d = k.$$observers || (k.$$observers = {});
                                            if (g.test(e))
                                                throw ja('nodomevents');
                                            if (f = b(k[e], !0, z(a, e)))
                                                k[e] = f(c), (d[e] || (d[e] = [])).$$inter = !0, (k.$$observers && k.$$observers[e].$$scope || c).$watch(f, function (a, b) {
                                                    'class' === e && a != b ? k.$updateClass(a, b) : k.$set(e, a);
                                                });
                                        }
                                    };
                                }
                            });
                        }
                    }
                    function ra(a, b, c) {
                        var d = b[0], e = b.length, f = d.parentNode, g, k;
                        if (a)
                            for (g = 0, k = a.length; g < k; g++)
                                if (a[g] == d) {
                                    a[g++] = c;
                                    k = g + e - 1;
                                    for (var p = a.length; g < p; g++, k++)
                                        k < p ? a[g] = a[k] : delete a[g];
                                    a.length -= e - 1;
                                    break;
                                }
                        f && f.replaceChild(c, d);
                        a = W.createDocumentFragment();
                        a.appendChild(d);
                        c[D.expando] = d[D.expando];
                        d = 1;
                        for (e = b.length; d < e; d++)
                            f = b[d], D(f).remove(), a.appendChild(f), delete b[d];
                        b[0] = c;
                        b.length = 1;
                    }
                    function qc(a, b) {
                        return F(function () {
                            return a.apply(null, arguments);
                        }, a, b);
                    }
                    var Nb = function (a, b) {
                        this.$$element = a;
                        this.$attr = b || {};
                    };
                    Nb.prototype = {
                        $normalize: qa,
                        $addClass: function (a) {
                            a && 0 < a.length && x.addClass(this.$$element, a);
                        },
                        $removeClass: function (a) {
                            a && 0 < a.length && x.removeClass(this.$$element, a);
                        },
                        $updateClass: function (a, b) {
                            var c = rc(a, b), d = rc(b, a);
                            0 === c.length ? x.removeClass(this.$$element, d) : 0 === d.length ? x.addClass(this.$$element, c) : x.setClass(this.$$element, c, d);
                        },
                        $set: function (a, b, c, d) {
                            var e = nc(this.$$element[0], a);
                            e && (this.$$element.prop(a, b), d = e);
                            this[a] = b;
                            d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = mb(a, '-'));
                            e = Na(this.$$element).toUpperCase();
                            if ('A' === e && ('href' === a || 'xlinkHref' === a) || 'IMG' === e && 'src' === a)
                                this[a] = b = L(b, 'src' === a);
                            !1 !== c && (null === b || b === v ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                            (c = this.$$observers) && r(c[a], function (a) {
                                try {
                                    a(b);
                                } catch (c) {
                                    m(c);
                                }
                            });
                        },
                        $observe: function (a, b) {
                            var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                            e.push(b);
                            K.$evalAsync(function () {
                                e.$$inter || b(c[a]);
                            });
                            return b;
                        }
                    };
                    var ka = b.startSymbol(), Ga = b.endSymbol(), V = '{{' == ka || '}}' == Ga ? ga : function (a) {
                            return a.replace(/\{\{/g, ka).replace(/}}/g, Ga);
                        }, U = /^ngAttr[A-Z]/;
                    return y;
                }
            ];
        }
        function qa(b) {
            return $a(b.replace(xe, ''));
        }
        function rc(b, a) {
            var c = '', d = b.split(/\s+/), e = a.split(/\s+/), f = 0;
            a:
                for (; f < d.length; f++) {
                    for (var g = d[f], h = 0; h < e.length; h++)
                        if (g == e[h])
                            continue a;
                    c += (0 < c.length ? ' ' : '') + g;
                }
            return c;
        }
        function Pd() {
            var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
            this.register = function (a, d) {
                Da(a, 'controller');
                T(a) ? F(b, a) : b[a] = d;
            };
            this.$get = [
                '$injector',
                '$window',
                function (c, d) {
                    return function (e, f) {
                        var g, h, k;
                        E(e) && (g = e.match(a), h = g[1], k = g[3], e = b.hasOwnProperty(h) ? b[h] : ec(f.$scope, h, !0) || ec(d, h, !0), Xa(e, h, !0));
                        g = c.instantiate(e, f);
                        if (k) {
                            if (!f || 'object' !== typeof f.$scope)
                                throw z('$controller')('noscp', h || e.name, k);
                            f.$scope[k] = g;
                        }
                        return g;
                    };
                }
            ];
        }
        function Qd() {
            this.$get = [
                '$window',
                function (b) {
                    return D(b.document);
                }
            ];
        }
        function Rd() {
            this.$get = [
                '$log',
                function (b) {
                    return function (a, c) {
                        b.error.apply(b, arguments);
                    };
                }
            ];
        }
        function sc(b) {
            var a = {}, c, d, e;
            if (!b)
                return a;
            r(b.split('\n'), function (b) {
                e = b.indexOf(':');
                c = A($(b.substr(0, e)));
                d = $(b.substr(e + 1));
                c && (a[c] = a[c] ? a[c] + ', ' + d : d);
            });
            return a;
        }
        function tc(b) {
            var a = T(b) ? b : v;
            return function (c) {
                a || (a = sc(b));
                return c ? a[A(c)] || null : a;
            };
        }
        function uc(b, a, c) {
            if (O(c))
                return c(b, a);
            r(c, function (c) {
                b = c(b, a);
            });
            return b;
        }
        function Ud() {
            var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = { 'Content-Type': 'application/json;charset=utf-8' }, e = this.defaults = {
                    transformResponse: [function (d) {
                            E(d) && (d = d.replace(c, ''), b.test(d) && a.test(d) && (d = $b(d)));
                            return d;
                        }],
                    transformRequest: [function (a) {
                            return T(a) && '[object File]' !== Aa.call(a) && '[object Blob]' !== Aa.call(a) ? oa(a) : a;
                        }],
                    headers: {
                        common: { Accept: 'application/json, text/plain, */*' },
                        post: ha(d),
                        put: ha(d),
                        patch: ha(d)
                    },
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                }, f = this.interceptors = [], g = this.responseInterceptors = [];
            this.$get = [
                '$httpBackend',
                '$browser',
                '$cacheFactory',
                '$rootScope',
                '$q',
                '$injector',
                function (a, b, c, d, n, q) {
                    function p(a) {
                        function b(a) {
                            var d = F({}, a, { data: uc(a.data, a.headers, c.transformResponse) });
                            return 200 <= a.status && 300 > a.status ? d : n.reject(d);
                        }
                        var c = {
                                method: 'get',
                                transformRequest: e.transformRequest,
                                transformResponse: e.transformResponse
                            }, d = function (a) {
                                var b = e.headers, c = F({}, a.headers), d, f, b = F({}, b.common, b[A(a.method)]);
                                a:
                                    for (d in b) {
                                        a = A(d);
                                        for (f in c)
                                            if (A(f) === a)
                                                continue a;
                                        c[d] = b[d];
                                    }
                                (function (a) {
                                    var b;
                                    r(a, function (c, d) {
                                        O(c) && (b = c(), null != b ? a[d] = b : delete a[d]);
                                    });
                                }(c));
                                return c;
                            }(a);
                        F(c, a);
                        c.headers = d;
                        c.method = Ja(c.method);
                        var f = [
                                function (a) {
                                    d = a.headers;
                                    var c = uc(a.data, tc(d), a.transformRequest);
                                    H(c) && r(d, function (a, b) {
                                        'content-type' === A(b) && delete d[b];
                                    });
                                    H(a.withCredentials) && !H(e.withCredentials) && (a.withCredentials = e.withCredentials);
                                    return s(a, c, d).then(b, b);
                                },
                                v
                            ], g = n.when(c);
                        for (r(t, function (a) {
                                (a.request || a.requestError) && f.unshift(a.request, a.requestError);
                                (a.response || a.responseError) && f.push(a.response, a.responseError);
                            }); f.length;) {
                            a = f.shift();
                            var h = f.shift(), g = g.then(a, h);
                        }
                        g.success = function (a) {
                            g.then(function (b) {
                                a(b.data, b.status, b.headers, c);
                            });
                            return g;
                        };
                        g.error = function (a) {
                            g.then(null, function (b) {
                                a(b.data, b.status, b.headers, c);
                            });
                            return g;
                        };
                        return g;
                    }
                    function s(c, f, g) {
                        function l(a, b, c, e) {
                            C && (200 <= a && 300 > a ? C.put(u, [
                                a,
                                b,
                                sc(c),
                                e
                            ]) : C.remove(u));
                            q(b, a, c, e);
                            d.$$phase || d.$apply();
                        }
                        function q(a, b, d, e) {
                            b = Math.max(b, 0);
                            (200 <= b && 300 > b ? t.resolve : t.reject)({
                                data: a,
                                status: b,
                                headers: tc(d),
                                config: c,
                                statusText: e
                            });
                        }
                        function s() {
                            var a = Sa(p.pendingRequests, c);
                            -1 !== a && p.pendingRequests.splice(a, 1);
                        }
                        var t = n.defer(), r = t.promise, C, J, u = K(c.url, c.params);
                        p.pendingRequests.push(c);
                        r.then(s, s);
                        !c.cache && !e.cache || (!1 === c.cache || 'GET' !== c.method && 'JSONP' !== c.method) || (C = T(c.cache) ? c.cache : T(e.cache) ? e.cache : w);
                        if (C)
                            if (J = C.get(u), G(J)) {
                                if (J && O(J.then))
                                    return J.then(s, s), J;
                                M(J) ? q(J[1], J[0], ha(J[2]), J[3]) : q(J, 200, {}, 'OK');
                            } else
                                C.put(u, r);
                        H(J) && ((J = Ob(c.url) ? b.cookies()[c.xsrfCookieName || e.xsrfCookieName] : v) && (g[c.xsrfHeaderName || e.xsrfHeaderName] = J), a(c.method, u, f, l, g, c.timeout, c.withCredentials, c.responseType));
                        return r;
                    }
                    function K(a, b) {
                        if (!b)
                            return a;
                        var c = [];
                        Tc(b, function (a, b) {
                            null === a || H(a) || (M(a) || (a = [a]), r(a, function (a) {
                                T(a) && (a = ua(a) ? a.toISOString() : oa(a));
                                c.push(Ca(b) + '=' + Ca(a));
                            }));
                        });
                        0 < c.length && (a += (-1 == a.indexOf('?') ? '?' : '&') + c.join('&'));
                        return a;
                    }
                    var w = c('$http'), t = [];
                    r(f, function (a) {
                        t.unshift(E(a) ? q.get(a) : q.invoke(a));
                    });
                    r(g, function (a, b) {
                        var c = E(a) ? q.get(a) : q.invoke(a);
                        t.splice(b, 0, {
                            response: function (a) {
                                return c(n.when(a));
                            },
                            responseError: function (a) {
                                return c(n.reject(a));
                            }
                        });
                    });
                    p.pendingRequests = [];
                    (function (a) {
                        r(arguments, function (a) {
                            p[a] = function (b, c) {
                                return p(F(c || {}, {
                                    method: a,
                                    url: b
                                }));
                            };
                        });
                    }('get', 'delete', 'head', 'jsonp'));
                    (function (a) {
                        r(arguments, function (a) {
                            p[a] = function (b, c, d) {
                                return p(F(d || {}, {
                                    method: a,
                                    url: b,
                                    data: c
                                }));
                            };
                        });
                    }('post', 'put', 'patch'));
                    p.defaults = e;
                    return p;
                }
            ];
        }
        function ye(b) {
            if (8 >= u && (!b.match(/^(get|post|head|put|delete|options)$/i) || !V.XMLHttpRequest))
                return new V.ActiveXObject('Microsoft.XMLHTTP');
            if (V.XMLHttpRequest)
                return new V.XMLHttpRequest();
            throw z('$httpBackend')('noxhr');
        }
        function Vd() {
            this.$get = [
                '$browser',
                '$window',
                '$document',
                function (b, a, c) {
                    return ze(b, ye, b.defer, a.angular.callbacks, c[0]);
                }
            ];
        }
        function ze(b, a, c, d, e) {
            function f(a, b, c) {
                var f = e.createElement('script'), g = null;
                f.type = 'text/javascript';
                f.src = a;
                f.async = !0;
                g = function (a) {
                    ab(f, 'load', g);
                    ab(f, 'error', g);
                    e.body.removeChild(f);
                    f = null;
                    var h = -1, s = 'unknown';
                    a && ('load' !== a.type || d[b].called || (a = { type: 'error' }), s = a.type, h = 'error' === a.type ? 404 : 200);
                    c && c(h, s);
                };
                rb(f, 'load', g);
                rb(f, 'error', g);
                8 >= u && (f.onreadystatechange = function () {
                    E(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null, g({ type: 'load' }));
                });
                e.body.appendChild(f);
                return g;
            }
            var g = -1;
            return function (e, k, l, m, n, q, p, s) {
                function K() {
                    t = g;
                    L && L();
                    y && y.abort();
                }
                function w(a, d, e, f, g) {
                    P && c.cancel(P);
                    L = y = null;
                    0 === d && (d = e ? 200 : 'file' == wa(k).protocol ? 404 : 0);
                    a(1223 === d ? 204 : d, e, f, g || '');
                    b.$$completeOutstandingRequest(B);
                }
                var t;
                b.$$incOutstandingRequestCount();
                k = k || b.url();
                if ('jsonp' == A(e)) {
                    var x = '_' + (d.counter++).toString(36);
                    d[x] = function (a) {
                        d[x].data = a;
                        d[x].called = !0;
                    };
                    var L = f(k.replace('JSON_CALLBACK', 'angular.callbacks.' + x), x, function (a, b) {
                        w(m, a, d[x].data, '', b);
                        d[x] = B;
                    });
                } else {
                    var y = a(e);
                    y.open(e, k, !0);
                    r(n, function (a, b) {
                        G(a) && y.setRequestHeader(b, a);
                    });
                    y.onreadystatechange = function () {
                        if (y && 4 == y.readyState) {
                            var a = null, b = null, c = '';
                            t !== g && (a = y.getAllResponseHeaders(), b = 'response' in y ? y.response : y.responseText);
                            t === g && 10 > u || (c = y.statusText);
                            w(m, t || y.status, b, a, c);
                        }
                    };
                    p && (y.withCredentials = !0);
                    if (s)
                        try {
                            y.responseType = s;
                        } catch (aa) {
                            if ('json' !== s)
                                throw aa;
                        }
                    y.send(l || null);
                }
                if (0 < q)
                    var P = c(K, q);
                else
                    q && O(q.then) && q.then(K);
            };
        }
        function Sd() {
            var b = '{{', a = '}}';
            this.startSymbol = function (a) {
                return a ? (b = a, this) : b;
            };
            this.endSymbol = function (b) {
                return b ? (a = b, this) : a;
            };
            this.$get = [
                '$parse',
                '$exceptionHandler',
                '$sce',
                function (c, d, e) {
                    function f(f, l, m) {
                        for (var n, q, p = 0, s = [], K = f.length, w = !1, t = []; p < K;)
                            -1 != (n = f.indexOf(b, p)) && -1 != (q = f.indexOf(a, n + g)) ? (p != n && s.push(f.substring(p, n)), s.push(p = c(w = f.substring(n + g, q))), p.exp = w, p = q + h, w = !0) : (p != K && s.push(f.substring(p)), p = K);
                        (K = s.length) || (s.push(''), K = 1);
                        if (m && 1 < s.length)
                            throw vc('noconcat', f);
                        if (!l || w)
                            return t.length = K, p = function (a) {
                                try {
                                    for (var b = 0, c = K, g; b < c; b++) {
                                        if ('function' == typeof (g = s[b]))
                                            if (g = g(a), g = m ? e.getTrusted(m, g) : e.valueOf(g), null == g)
                                                g = '';
                                            else
                                                switch (typeof g) {
                                                case 'string':
                                                    break;
                                                case 'number':
                                                    g = '' + g;
                                                    break;
                                                default:
                                                    g = oa(g);
                                                }
                                        t[b] = g;
                                    }
                                    return t.join('');
                                } catch (h) {
                                    a = vc('interr', f, h.toString()), d(a);
                                }
                            }, p.exp = f, p.parts = s, p;
                    }
                    var g = b.length, h = a.length;
                    f.startSymbol = function () {
                        return b;
                    };
                    f.endSymbol = function () {
                        return a;
                    };
                    return f;
                }
            ];
        }
        function Td() {
            this.$get = [
                '$rootScope',
                '$window',
                '$q',
                function (b, a, c) {
                    function d(d, g, h, k) {
                        var l = a.setInterval, m = a.clearInterval, n = c.defer(), q = n.promise, p = 0, s = G(k) && !k;
                        h = G(h) ? h : 0;
                        q.then(null, null, d);
                        q.$$intervalId = l(function () {
                            n.notify(p++);
                            0 < h && p >= h && (n.resolve(p), m(q.$$intervalId), delete e[q.$$intervalId]);
                            s || b.$apply();
                        }, g);
                        e[q.$$intervalId] = n;
                        return q;
                    }
                    var e = {};
                    d.cancel = function (b) {
                        return b && b.$$intervalId in e ? (e[b.$$intervalId].reject('canceled'), a.clearInterval(b.$$intervalId), delete e[b.$$intervalId], !0) : !1;
                    };
                    return d;
                }
            ];
        }
        function bd() {
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
                        MONTH: 'January February March April May June July August September October November December'.split(' '),
                        SHORTMONTH: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
                        DAY: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
                        SHORTDAY: 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
                        AMPMS: [
                            'AM',
                            'PM'
                        ],
                        medium: 'MMM d, y h:mm:ss a',
                        'short': 'M/d/yy h:mm a',
                        fullDate: 'EEEE, MMMM d, y',
                        longDate: 'MMMM d, y',
                        mediumDate: 'MMM d, y',
                        shortDate: 'M/d/yy',
                        mediumTime: 'h:mm:ss a',
                        shortTime: 'h:mm a'
                    },
                    pluralCat: function (b) {
                        return 1 === b ? 'one' : 'other';
                    }
                };
            };
        }
        function Pb(b) {
            b = b.split('/');
            for (var a = b.length; a--;)
                b[a] = lb(b[a]);
            return b.join('/');
        }
        function wc(b, a, c) {
            b = wa(b, c);
            a.$$protocol = b.protocol;
            a.$$host = b.hostname;
            a.$$port = U(b.port) || Ae[b.protocol] || null;
        }
        function xc(b, a, c) {
            var d = '/' !== b.charAt(0);
            d && (b = '/' + b);
            b = wa(b, c);
            a.$$path = decodeURIComponent(d && '/' === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
            a.$$search = bc(b.search);
            a.$$hash = decodeURIComponent(b.hash);
            a.$$path && '/' != a.$$path.charAt(0) && (a.$$path = '/' + a.$$path);
        }
        function sa(b, a) {
            if (0 === a.indexOf(b))
                return a.substr(b.length);
        }
        function Fa(b) {
            var a = b.indexOf('#');
            return -1 == a ? b : b.substr(0, a);
        }
        function yc(b) {
            return b.replace(/(#.+)|#$/, '$1');
        }
        function Qb(b) {
            return b.substr(0, Fa(b).lastIndexOf('/') + 1);
        }
        function zc(b, a) {
            this.$$html5 = !0;
            a = a || '';
            var c = Qb(b);
            wc(b, this, b);
            this.$$parse = function (a) {
                var e = sa(c, a);
                if (!E(e))
                    throw Rb('ipthprfx', a, c);
                xc(e, this, b);
                this.$$path || (this.$$path = '/');
                this.$$compose();
            };
            this.$$compose = function () {
                var a = Bb(this.$$search), b = this.$$hash ? '#' + lb(this.$$hash) : '';
                this.$$url = Pb(this.$$path) + (a ? '?' + a : '') + b;
                this.$$absUrl = c + this.$$url.substr(1);
            };
            this.$$parseLinkUrl = function (d, e) {
                var f, g;
                (f = sa(b, d)) !== v ? (g = f, g = (f = sa(a, f)) !== v ? c + (sa('/', f) || f) : b + g) : (f = sa(c, d)) !== v ? g = c + f : c == d + '/' && (g = c);
                g && this.$$parse(g);
                return !!g;
            };
        }
        function Sb(b, a) {
            var c = Qb(b);
            wc(b, this, b);
            this.$$parse = function (d) {
                var e = sa(b, d) || sa(c, d), e = '#' == e.charAt(0) ? sa(a, e) : this.$$html5 ? e : '';
                if (!E(e))
                    throw Rb('ihshprfx', d, a);
                xc(e, this, b);
                d = this.$$path;
                var f = /^\/[A-Z]:(\/.*)/;
                0 === e.indexOf(b) && (e = e.replace(b, ''));
                f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
                this.$$path = d;
                this.$$compose();
            };
            this.$$compose = function () {
                var c = Bb(this.$$search), e = this.$$hash ? '#' + lb(this.$$hash) : '';
                this.$$url = Pb(this.$$path) + (c ? '?' + c : '') + e;
                this.$$absUrl = b + (this.$$url ? a + this.$$url : '');
            };
            this.$$parseLinkUrl = function (a, c) {
                return Fa(b) == Fa(a) ? (this.$$parse(a), !0) : !1;
            };
        }
        function Ac(b, a) {
            this.$$html5 = !0;
            Sb.apply(this, arguments);
            var c = Qb(b);
            this.$$parseLinkUrl = function (d, e) {
                var f, g;
                b == Fa(d) ? f = d : (g = sa(c, d)) ? f = b + a + g : c === d + '/' && (f = c);
                f && this.$$parse(f);
                return !!f;
            };
            this.$$compose = function () {
                var c = Bb(this.$$search), e = this.$$hash ? '#' + lb(this.$$hash) : '';
                this.$$url = Pb(this.$$path) + (c ? '?' + c : '') + e;
                this.$$absUrl = b + a + this.$$url;
            };
        }
        function sb(b) {
            return function () {
                return this[b];
            };
        }
        function Bc(b, a) {
            return function (c) {
                if (H(c))
                    return this[b];
                this[b] = a(c);
                this.$$compose();
                return this;
            };
        }
        function Wd() {
            var b = '', a = !1;
            this.hashPrefix = function (a) {
                return G(a) ? (b = a, this) : b;
            };
            this.html5Mode = function (b) {
                return G(b) ? (a = b, this) : a;
            };
            this.$get = [
                '$rootScope',
                '$browser',
                '$sniffer',
                '$rootElement',
                function (c, d, e, f) {
                    function g(a) {
                        c.$broadcast('$locationChangeSuccess', h.absUrl(), a);
                    }
                    var h, k = d.baseHref(), l = d.url();
                    a ? (k = l.substring(0, l.indexOf('/', l.indexOf('//') + 2)) + (k || '/'), e = e.history ? zc : Ac) : (k = Fa(l), e = Sb);
                    h = new e(k, '#' + b);
                    h.$$parseLinkUrl(l, l);
                    var m = /^\s*(javascript|mailto):/i;
                    f.on('click', function (a) {
                        if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                            for (var b = D(a.target); 'a' !== A(b[0].nodeName);)
                                if (b[0] === f[0] || !(b = b.parent())[0])
                                    return;
                            var e = b.prop('href'), g = b.attr('href') || b.attr('xlink:href');
                            T(e) && '[object SVGAnimatedString]' === e.toString() && (e = wa(e.animVal).href);
                            m.test(e) || (!e || (b.attr('target') || a.isDefaultPrevented()) || !h.$$parseLinkUrl(e, g)) || (a.preventDefault(), h.absUrl() != d.url() && (c.$apply(), V.angular['ff-684208-preventDefault'] = !0));
                        }
                    });
                    h.absUrl() != l && d.url(h.absUrl(), !0);
                    d.onUrlChange(function (a) {
                        h.absUrl() != a && (c.$evalAsync(function () {
                            var b = h.absUrl();
                            h.$$parse(a);
                            c.$broadcast('$locationChangeStart', a, b).defaultPrevented ? (h.$$parse(b), d.url(b)) : g(b);
                        }), c.$$phase || c.$digest());
                    });
                    var n = 0;
                    c.$watch(function () {
                        var a = yc(d.url()), b = yc(h.absUrl()), e = h.$$replace;
                        n && a == b || (n++, c.$evalAsync(function () {
                            c.$broadcast('$locationChangeStart', h.absUrl(), a).defaultPrevented ? h.$$parse(a) : (d.url(h.absUrl(), e), g(a));
                        }));
                        h.$$replace = !1;
                        return n;
                    });
                    return h;
                }
            ];
        }
        function Xd() {
            var b = !0, a = this;
            this.debugEnabled = function (a) {
                return G(a) ? (b = a, this) : b;
            };
            this.$get = [
                '$window',
                function (c) {
                    function d(a) {
                        a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? 'Error: ' + a.message + '\n' + a.stack : a.stack : a.sourceURL && (a = a.message + '\n' + a.sourceURL + ':' + a.line));
                        return a;
                    }
                    function e(a) {
                        var b = c.console || {}, e = b[a] || b.log || B;
                        a = !1;
                        try {
                            a = !!e.apply;
                        } catch (k) {
                        }
                        return a ? function () {
                            var a = [];
                            r(arguments, function (b) {
                                a.push(d(b));
                            });
                            return e.apply(b, a);
                        } : function (a, b) {
                            e(a, null == b ? '' : b);
                        };
                    }
                    return {
                        log: e('log'),
                        info: e('info'),
                        warn: e('warn'),
                        error: e('error'),
                        debug: function () {
                            var c = e('debug');
                            return function () {
                                b && c.apply(a, arguments);
                            };
                        }()
                    };
                }
            ];
        }
        function la(b, a) {
            if ('__defineGetter__' === b || '__defineSetter__' === b || '__lookupGetter__' === b || '__lookupSetter__' === b || '__proto__' === b)
                throw ea('isecfld', a);
            return b;
        }
        function Cc(b, a) {
            b += '';
            if (!E(b))
                throw ea('iseccst', a);
            return b;
        }
        function ma(b, a) {
            if (b) {
                if (b.constructor === b)
                    throw ea('isecfn', a);
                if (b.document && b.location && b.alert && b.setInterval)
                    throw ea('isecwindow', a);
                if (b.children && (b.nodeName || b.prop && b.attr && b.find))
                    throw ea('isecdom', a);
                if (b === Object)
                    throw ea('isecobj', a);
            }
            return b;
        }
        function tb(b, a, c, d, e) {
            ma(b, d);
            e = e || {};
            a = a.split('.');
            for (var f, g = 0; 1 < a.length; g++) {
                f = la(a.shift(), d);
                var h = ma(b[f], d);
                h || (h = {}, b[f] = h);
                b = h;
                b.then && e.unwrapPromises && (xa(d), '$$v' in b || function (a) {
                    a.then(function (b) {
                        a.$$v = b;
                    });
                }(b), b.$$v === v && (b.$$v = {}), b = b.$$v);
            }
            f = la(a.shift(), d);
            ma(b[f], d);
            return b[f] = c;
        }
        function Pa(b) {
            return 'constructor' == b;
        }
        function Dc(b, a, c, d, e, f, g) {
            la(b, f);
            la(a, f);
            la(c, f);
            la(d, f);
            la(e, f);
            var h = function (a) {
                    return ma(a, f);
                }, k = g.expensiveChecks, l = k || Pa(b) ? h : ga, m = k || Pa(a) ? h : ga, n = k || Pa(c) ? h : ga, q = k || Pa(d) ? h : ga, p = k || Pa(e) ? h : ga;
            return g.unwrapPromises ? function (g, h) {
                var k = h && h.hasOwnProperty(b) ? h : g, t;
                if (null == k)
                    return k;
                (k = l(k[b])) && k.then && (xa(f), '$$v' in k || (t = k, t.$$v = v, t.then(function (a) {
                    t.$$v = l(a);
                })), k = l(k.$$v));
                if (!a)
                    return k;
                if (null == k)
                    return v;
                (k = m(k[a])) && k.then && (xa(f), '$$v' in k || (t = k, t.$$v = v, t.then(function (a) {
                    t.$$v = m(a);
                })), k = m(k.$$v));
                if (!c)
                    return k;
                if (null == k)
                    return v;
                (k = n(k[c])) && k.then && (xa(f), '$$v' in k || (t = k, t.$$v = v, t.then(function (a) {
                    t.$$v = n(a);
                })), k = n(k.$$v));
                if (!d)
                    return k;
                if (null == k)
                    return v;
                (k = q(k[d])) && k.then && (xa(f), '$$v' in k || (t = k, t.$$v = v, t.then(function (a) {
                    t.$$v = q(a);
                })), k = q(k.$$v));
                if (!e)
                    return k;
                if (null == k)
                    return v;
                (k = p(k[e])) && k.then && (xa(f), '$$v' in k || (t = k, t.$$v = v, t.then(function (a) {
                    t.$$v = p(a);
                })), k = p(k.$$v));
                return k;
            } : function (f, g) {
                var h = g && g.hasOwnProperty(b) ? g : f;
                if (null == h)
                    return h;
                h = l(h[b]);
                if (!a)
                    return h;
                if (null == h)
                    return v;
                h = m(h[a]);
                if (!c)
                    return h;
                if (null == h)
                    return v;
                h = n(h[c]);
                if (!d)
                    return h;
                if (null == h)
                    return v;
                h = q(h[d]);
                return e ? null == h ? v : h = p(h[e]) : h;
            };
        }
        function Be(b, a) {
            return function (c, d) {
                return b(c, d, xa, ma, a);
            };
        }
        function Ec(b, a, c) {
            var d = a.expensiveChecks, e = d ? Ce : De;
            if (e.hasOwnProperty(b))
                return e[b];
            var f = b.split('.'), g = f.length, h;
            if (a.csp)
                h = 6 > g ? Dc(f[0], f[1], f[2], f[3], f[4], c, a) : function (b, d) {
                    var e = 0, h;
                    do
                        h = Dc(f[e++], f[e++], f[e++], f[e++], f[e++], c, a)(b, d), d = v, b = h;
                    while (e < g);
                    return h;
                };
            else {
                var k = 'var p;\n';
                d && (k += 's = eso(s, fe);\nl = eso(l, fe);\n');
                var l = d;
                r(f, function (b, e) {
                    la(b, c);
                    var f = (e ? 's' : '((l&&l.hasOwnProperty("' + b + '"))?l:s)') + '["' + b + '"]', g = d || Pa(b);
                    g && (f = 'eso(' + f + ', fe)', l = !0);
                    k += 'if(s == null) return undefined;\ns=' + f + ';\n';
                    a.unwrapPromises && (k += 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, '\\$1') + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=' + (g ? 'eso(v)' : 'v') + ';});\n}\n s=' + (g ? 'eso(s.$$v)' : 's.$$v') + '\n}\n');
                });
                k += 'return s;';
                h = new Function('s', 'l', 'pw', 'eso', 'fe', k);
                h.toString = Z(k);
                if (l || a.unwrapPromises)
                    h = Be(h, c);
            }
            'hasOwnProperty' !== b && (e[b] = h);
            return h;
        }
        function Yd() {
            var b = {}, a = {}, c = {
                    csp: !1,
                    unwrapPromises: !1,
                    logPromiseWarnings: !0,
                    expensiveChecks: !1
                };
            this.unwrapPromises = function (a) {
                return G(a) ? (c.unwrapPromises = !!a, this) : c.unwrapPromises;
            };
            this.logPromiseWarnings = function (a) {
                return G(a) ? (c.logPromiseWarnings = a, this) : c.logPromiseWarnings;
            };
            this.$get = [
                '$filter',
                '$sniffer',
                '$log',
                function (d, e, f) {
                    c.csp = e.csp;
                    var g = {
                        csp: c.csp,
                        unwrapPromises: c.unwrapPromises,
                        logPromiseWarnings: c.logPromiseWarnings,
                        expensiveChecks: !0
                    };
                    xa = function (a) {
                        c.logPromiseWarnings && !Fc.hasOwnProperty(a) && (Fc[a] = !0, f.warn('[$parse] Promise found in the expression `' + a + '`. Automatic unwrapping of promises in Angular expressions is deprecated.'));
                    };
                    return function (e, f) {
                        var l;
                        switch (typeof e) {
                        case 'string':
                            var m = f ? a : b;
                            if (m.hasOwnProperty(e))
                                return m[e];
                            l = f ? g : c;
                            var n = new Tb(l);
                            l = new fb(n, d, l).parse(e);
                            'hasOwnProperty' !== e && (m[e] = l);
                            return l;
                        case 'function':
                            return e;
                        default:
                            return B;
                        }
                    };
                }
            ];
        }
        function $d() {
            this.$get = [
                '$rootScope',
                '$exceptionHandler',
                function (b, a) {
                    return Ee(function (a) {
                        b.$evalAsync(a);
                    }, a);
                }
            ];
        }
        function Ee(b, a) {
            function c(a) {
                return a;
            }
            function d(a) {
                return g(a);
            }
            var e = function () {
                    var g = [], l, m;
                    return m = {
                        resolve: function (a) {
                            if (g) {
                                var c = g;
                                g = v;
                                l = f(a);
                                c.length && b(function () {
                                    for (var a, b = 0, d = c.length; b < d; b++)
                                        a = c[b], l.then(a[0], a[1], a[2]);
                                });
                            }
                        },
                        reject: function (a) {
                            m.resolve(h(a));
                        },
                        notify: function (a) {
                            if (g) {
                                var c = g;
                                g.length && b(function () {
                                    for (var b, d = 0, e = c.length; d < e; d++)
                                        b = c[d], b[2](a);
                                });
                            }
                        },
                        promise: {
                            then: function (b, f, h) {
                                var m = e(), K = function (d) {
                                        try {
                                            m.resolve((O(b) ? b : c)(d));
                                        } catch (e) {
                                            m.reject(e), a(e);
                                        }
                                    }, w = function (b) {
                                        try {
                                            m.resolve((O(f) ? f : d)(b));
                                        } catch (c) {
                                            m.reject(c), a(c);
                                        }
                                    }, t = function (b) {
                                        try {
                                            m.notify((O(h) ? h : c)(b));
                                        } catch (d) {
                                            a(d);
                                        }
                                    };
                                g ? g.push([
                                    K,
                                    w,
                                    t
                                ]) : l.then(K, w, t);
                                return m.promise;
                            },
                            'catch': function (a) {
                                return this.then(null, a);
                            },
                            'finally': function (a) {
                                function b(a, c) {
                                    var d = e();
                                    c ? d.resolve(a) : d.reject(a);
                                    return d.promise;
                                }
                                function d(e, f) {
                                    var g = null;
                                    try {
                                        g = (a || c)();
                                    } catch (h) {
                                        return b(h, !1);
                                    }
                                    return g && O(g.then) ? g.then(function () {
                                        return b(e, f);
                                    }, function (a) {
                                        return b(a, !1);
                                    }) : b(e, f);
                                }
                                return this.then(function (a) {
                                    return d(a, !0);
                                }, function (a) {
                                    return d(a, !1);
                                });
                            }
                        }
                    };
                }, f = function (a) {
                    return a && O(a.then) ? a : {
                        then: function (c) {
                            var d = e();
                            b(function () {
                                d.resolve(c(a));
                            });
                            return d.promise;
                        }
                    };
                }, g = function (a) {
                    var b = e();
                    b.reject(a);
                    return b.promise;
                }, h = function (c) {
                    return {
                        then: function (f, g) {
                            var h = e();
                            b(function () {
                                try {
                                    h.resolve((O(g) ? g : d)(c));
                                } catch (b) {
                                    h.reject(b), a(b);
                                }
                            });
                            return h.promise;
                        }
                    };
                };
            return {
                defer: e,
                reject: g,
                when: function (h, l, m, n) {
                    var q = e(), p, s = function (b) {
                            try {
                                return (O(l) ? l : c)(b);
                            } catch (d) {
                                return a(d), g(d);
                            }
                        }, K = function (b) {
                            try {
                                return (O(m) ? m : d)(b);
                            } catch (c) {
                                return a(c), g(c);
                            }
                        }, w = function (b) {
                            try {
                                return (O(n) ? n : c)(b);
                            } catch (d) {
                                a(d);
                            }
                        };
                    b(function () {
                        f(h).then(function (a) {
                            p || (p = !0, q.resolve(f(a).then(s, K, w)));
                        }, function (a) {
                            p || (p = !0, q.resolve(K(a)));
                        }, function (a) {
                            p || q.notify(w(a));
                        });
                    });
                    return q.promise;
                },
                all: function (a) {
                    var b = e(), c = 0, d = M(a) ? [] : {};
                    r(a, function (a, e) {
                        c++;
                        f(a).then(function (a) {
                            d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                        }, function (a) {
                            d.hasOwnProperty(e) || b.reject(a);
                        });
                    });
                    0 === c && b.resolve(d);
                    return b.promise;
                }
            };
        }
        function ge() {
            this.$get = [
                '$window',
                '$timeout',
                function (b, a) {
                    var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function (a) {
                            var b = c(a);
                            return function () {
                                d(b);
                            };
                        } : function (b) {
                            var c = a(b, 16.66, !1);
                            return function () {
                                a.cancel(c);
                            };
                        };
                    f.supported = e;
                    return f;
                }
            ];
        }
        function Zd() {
            var b = 10, a = z('$rootScope'), c = null;
            this.digestTtl = function (a) {
                arguments.length && (b = a);
                return b;
            };
            this.$get = [
                '$injector',
                '$exceptionHandler',
                '$parse',
                '$browser',
                function (d, e, f, g) {
                    function h() {
                        this.$id = hb();
                        this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                        this['this'] = this.$root = this;
                        this.$$destroyed = !1;
                        this.$$asyncQueue = [];
                        this.$$postDigestQueue = [];
                        this.$$listeners = {};
                        this.$$listenerCount = {};
                        this.$$isolateBindings = {};
                    }
                    function k(b) {
                        if (q.$$phase)
                            throw a('inprog', q.$$phase);
                        q.$$phase = b;
                    }
                    function l(a, b) {
                        var c = f(a);
                        Xa(c, b);
                        return c;
                    }
                    function m(a, b, c) {
                        do
                            a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
                        while (a = a.$parent);
                    }
                    function n() {
                    }
                    h.prototype = {
                        constructor: h,
                        $new: function (a) {
                            a ? (a = new h(), a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function () {
                                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                                this.$$listeners = {};
                                this.$$listenerCount = {};
                                this.$id = hb();
                                this.$$childScopeClass = null;
                            }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass());
                            a['this'] = a;
                            a.$parent = this;
                            a.$$prevSibling = this.$$childTail;
                            this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                            return a;
                        },
                        $watch: function (a, b, d) {
                            var e = l(a, 'watch'), f = this.$$watchers, g = {
                                    fn: b,
                                    last: n,
                                    get: e,
                                    exp: a,
                                    eq: !!d
                                };
                            c = null;
                            if (!O(b)) {
                                var h = l(b || B, 'listener');
                                g.fn = function (a, b, c) {
                                    h(c);
                                };
                            }
                            if ('string' == typeof a && e.constant) {
                                var k = g.fn;
                                g.fn = function (a, b, c) {
                                    k.call(this, a, b, c);
                                    Ta(f, g);
                                };
                            }
                            f || (f = this.$$watchers = []);
                            f.unshift(g);
                            return function () {
                                Ta(f, g);
                                c = null;
                            };
                        },
                        $watchCollection: function (a, b) {
                            var c = this, d, e, g, h = 1 < b.length, k = 0, l = f(a), m = [], n = {}, q = !0, r = 0;
                            return this.$watch(function () {
                                d = l(c);
                                var a, b, f;
                                if (T(d))
                                    if (Ra(d))
                                        for (e !== m && (e = m, r = e.length = 0, k++), a = d.length, r !== a && (k++, e.length = r = a), b = 0; b < a; b++)
                                            f = e[b] !== e[b] && d[b] !== d[b], f || e[b] === d[b] || (k++, e[b] = d[b]);
                                    else {
                                        e !== n && (e = n = {}, r = 0, k++);
                                        a = 0;
                                        for (b in d)
                                            d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? (f = e[b] !== e[b] && d[b] !== d[b], f || e[b] === d[b] || (k++, e[b] = d[b])) : (r++, e[b] = d[b], k++));
                                        if (r > a)
                                            for (b in k++, e)
                                                e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (r--, delete e[b]);
                                    }
                                else
                                    e !== d && (e = d, k++);
                                return k;
                            }, function () {
                                q ? (q = !1, b(d, d, c)) : b(d, g, c);
                                if (h)
                                    if (T(d))
                                        if (Ra(d)) {
                                            g = Array(d.length);
                                            for (var a = 0; a < d.length; a++)
                                                g[a] = d[a];
                                        } else
                                            for (a in g = {}, d)
                                                kb.call(d, a) && (g[a] = d[a]);
                                    else
                                        g = d;
                            });
                        },
                        $digest: function () {
                            var d, f, h, l, m = this.$$asyncQueue, r = this.$$postDigestQueue, L, y, v = b, P, N = [], u, Q, C;
                            k('$digest');
                            g.$$checkUrlChange();
                            c = null;
                            do {
                                y = !1;
                                for (P = this; m.length;) {
                                    try {
                                        C = m.shift(), C.scope.$eval(C.expression);
                                    } catch (J) {
                                        q.$$phase = null, e(J);
                                    }
                                    c = null;
                                }
                                a:
                                    do {
                                        if (l = P.$$watchers)
                                            for (L = l.length; L--;)
                                                try {
                                                    if (d = l[L])
                                                        if ((f = d.get(P)) !== (h = d.last) && !(d.eq ? Ba(f, h) : 'number' === typeof f && 'number' === typeof h && isNaN(f) && isNaN(h)))
                                                            y = !0, c = d, d.last = d.eq ? Ia(f, null) : f, d.fn(f, h === n ? f : h, P), 5 > v && (u = 4 - v, N[u] || (N[u] = []), Q = O(d.exp) ? 'fn: ' + (d.exp.name || d.exp.toString()) : d.exp, Q += '; newVal: ' + oa(f) + '; oldVal: ' + oa(h), N[u].push(Q));
                                                        else if (d === c) {
                                                            y = !1;
                                                            break a;
                                                        }
                                                } catch (D) {
                                                    q.$$phase = null, e(D);
                                                }
                                        if (!(l = P.$$childHead || P !== this && P.$$nextSibling))
                                            for (; P !== this && !(l = P.$$nextSibling);)
                                                P = P.$parent;
                                    } while (P = l);
                                if ((y || m.length) && !v--)
                                    throw q.$$phase = null, a('infdig', b, oa(N));
                            } while (y || m.length);
                            for (q.$$phase = null; r.length;)
                                try {
                                    r.shift()();
                                } catch (G) {
                                    e(G);
                                }
                        },
                        $destroy: function () {
                            if (!this.$$destroyed) {
                                var a = this.$parent;
                                this.$broadcast('$destroy');
                                this.$$destroyed = !0;
                                this !== q && (r(this.$$listenerCount, Ab(null, m, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = B, this.$on = this.$watch = function () {
                                    return B;
                                });
                            }
                        },
                        $eval: function (a, b) {
                            return f(a)(this, b);
                        },
                        $evalAsync: function (a) {
                            q.$$phase || q.$$asyncQueue.length || g.defer(function () {
                                q.$$asyncQueue.length && q.$digest();
                            });
                            this.$$asyncQueue.push({
                                scope: this,
                                expression: a
                            });
                        },
                        $$postDigest: function (a) {
                            this.$$postDigestQueue.push(a);
                        },
                        $apply: function (a) {
                            try {
                                return k('$apply'), this.$eval(a);
                            } catch (b) {
                                e(b);
                            } finally {
                                q.$$phase = null;
                                try {
                                    q.$digest();
                                } catch (c) {
                                    throw e(c), c;
                                }
                            }
                        },
                        $on: function (a, b) {
                            var c = this.$$listeners[a];
                            c || (this.$$listeners[a] = c = []);
                            c.push(b);
                            var d = this;
                            do
                                d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
                            while (d = d.$parent);
                            var e = this;
                            return function () {
                                var d = Sa(c, b);
                                -1 !== d && (c[d] = null, m(e, 1, a));
                            };
                        },
                        $emit: function (a, b) {
                            var c = [], d, f = this, g = !1, h = {
                                    name: a,
                                    targetScope: f,
                                    stopPropagation: function () {
                                        g = !0;
                                    },
                                    preventDefault: function () {
                                        h.defaultPrevented = !0;
                                    },
                                    defaultPrevented: !1
                                }, k = [h].concat(va.call(arguments, 1)), l, m;
                            do {
                                d = f.$$listeners[a] || c;
                                h.currentScope = f;
                                l = 0;
                                for (m = d.length; l < m; l++)
                                    if (d[l])
                                        try {
                                            d[l].apply(null, k);
                                        } catch (n) {
                                            e(n);
                                        }
                                    else
                                        d.splice(l, 1), l--, m--;
                                if (g)
                                    break;
                                f = f.$parent;
                            } while (f);
                            return h;
                        },
                        $broadcast: function (a, b) {
                            for (var c = this, d = this, f = {
                                        name: a,
                                        targetScope: this,
                                        preventDefault: function () {
                                            f.defaultPrevented = !0;
                                        },
                                        defaultPrevented: !1
                                    }, g = [f].concat(va.call(arguments, 1)), h, k; c = d;) {
                                f.currentScope = c;
                                d = c.$$listeners[a] || [];
                                h = 0;
                                for (k = d.length; h < k; h++)
                                    if (d[h])
                                        try {
                                            d[h].apply(null, g);
                                        } catch (l) {
                                            e(l);
                                        }
                                    else
                                        d.splice(h, 1), h--, k--;
                                if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling))
                                    for (; c !== this && !(d = c.$$nextSibling);)
                                        c = c.$parent;
                            }
                            return f;
                        }
                    };
                    var q = new h();
                    return q;
                }
            ];
        }
        function cd() {
            var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*((https?|ftp|file):|data:image\/)/;
            this.aHrefSanitizationWhitelist = function (a) {
                return G(a) ? (b = a, this) : b;
            };
            this.imgSrcSanitizationWhitelist = function (b) {
                return G(b) ? (a = b, this) : a;
            };
            this.$get = function () {
                return function (c, d) {
                    var e = d ? a : b, f;
                    if (!u || 8 <= u)
                        if (f = wa(c).href, '' !== f && !f.match(e))
                            return 'unsafe:' + f;
                    return c;
                };
            };
        }
        function Fe(b) {
            if ('self' === b)
                return b;
            if (E(b)) {
                if (-1 < b.indexOf('***'))
                    throw ya('iwcard', b);
                b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08').replace('\\*\\*', '.*').replace('\\*', '[^:/.?&;]*');
                return RegExp('^' + b + '$');
            }
            if (jb(b))
                return RegExp('^' + b.source + '$');
            throw ya('imatcher');
        }
        function Gc(b) {
            var a = [];
            G(b) && r(b, function (b) {
                a.push(Fe(b));
            });
            return a;
        }
        function be() {
            this.SCE_CONTEXTS = fa;
            var b = ['self'], a = [];
            this.resourceUrlWhitelist = function (a) {
                arguments.length && (b = Gc(a));
                return b;
            };
            this.resourceUrlBlacklist = function (b) {
                arguments.length && (a = Gc(b));
                return a;
            };
            this.$get = [
                '$injector',
                function (c) {
                    function d(a) {
                        var b = function (a) {
                            this.$$unwrapTrustedValue = function () {
                                return a;
                            };
                        };
                        a && (b.prototype = new a());
                        b.prototype.valueOf = function () {
                            return this.$$unwrapTrustedValue();
                        };
                        b.prototype.toString = function () {
                            return this.$$unwrapTrustedValue().toString();
                        };
                        return b;
                    }
                    var e = function (a) {
                        throw ya('unsafe');
                    };
                    c.has('$sanitize') && (e = c.get('$sanitize'));
                    var f = d(), g = {};
                    g[fa.HTML] = d(f);
                    g[fa.CSS] = d(f);
                    g[fa.URL] = d(f);
                    g[fa.JS] = d(f);
                    g[fa.RESOURCE_URL] = d(g[fa.URL]);
                    return {
                        trustAs: function (a, b) {
                            var c = g.hasOwnProperty(a) ? g[a] : null;
                            if (!c)
                                throw ya('icontext', a, b);
                            if (null === b || b === v || '' === b)
                                return b;
                            if ('string' !== typeof b)
                                throw ya('itype', a);
                            return new c(b);
                        },
                        getTrusted: function (c, d) {
                            if (null === d || d === v || '' === d)
                                return d;
                            var f = g.hasOwnProperty(c) ? g[c] : null;
                            if (f && d instanceof f)
                                return d.$$unwrapTrustedValue();
                            if (c === fa.RESOURCE_URL) {
                                var f = wa(d.toString()), m, n, q = !1;
                                m = 0;
                                for (n = b.length; m < n; m++)
                                    if ('self' === b[m] ? Ob(f) : b[m].exec(f.href)) {
                                        q = !0;
                                        break;
                                    }
                                if (q)
                                    for (m = 0, n = a.length; m < n; m++)
                                        if ('self' === a[m] ? Ob(f) : a[m].exec(f.href)) {
                                            q = !1;
                                            break;
                                        }
                                if (q)
                                    return d;
                                throw ya('insecurl', d.toString());
                            }
                            if (c === fa.HTML)
                                return e(d);
                            throw ya('unsafe');
                        },
                        valueOf: function (a) {
                            return a instanceof f ? a.$$unwrapTrustedValue() : a;
                        }
                    };
                }
            ];
        }
        function ae() {
            var b = !0;
            this.enabled = function (a) {
                arguments.length && (b = !!a);
                return b;
            };
            this.$get = [
                '$parse',
                '$sniffer',
                '$sceDelegate',
                function (a, c, d) {
                    if (b && c.msie && 8 > c.msieDocumentMode)
                        throw ya('iequirks');
                    var e = ha(fa);
                    e.isEnabled = function () {
                        return b;
                    };
                    e.trustAs = d.trustAs;
                    e.getTrusted = d.getTrusted;
                    e.valueOf = d.valueOf;
                    b || (e.trustAs = e.getTrusted = function (a, b) {
                        return b;
                    }, e.valueOf = ga);
                    e.parseAs = function (b, c) {
                        var d = a(c);
                        return d.literal && d.constant ? d : function (a, c) {
                            return e.getTrusted(b, d(a, c));
                        };
                    };
                    var f = e.parseAs, g = e.getTrusted, h = e.trustAs;
                    r(fa, function (a, b) {
                        var c = A(b);
                        e[$a('parse_as_' + c)] = function (b) {
                            return f(a, b);
                        };
                        e[$a('get_trusted_' + c)] = function (b) {
                            return g(a, b);
                        };
                        e[$a('trust_as_' + c)] = function (b) {
                            return h(a, b);
                        };
                    });
                    return e;
                }
            ];
        }
        function ce() {
            this.$get = [
                '$window',
                '$document',
                function (b, a) {
                    var c = {}, d = U((/android (\d+)/.exec(A((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), f = a[0] || {}, g = f.documentMode, h, k = /^(Moz|webkit|O|ms)(?=[A-Z])/, l = f.body && f.body.style, m = !1, n = !1;
                    if (l) {
                        for (var q in l)
                            if (m = k.exec(q)) {
                                h = m[0];
                                h = h.substr(0, 1).toUpperCase() + h.substr(1);
                                break;
                            }
                        h || (h = 'WebkitOpacity' in l && 'webkit');
                        m = !!('transition' in l || h + 'Transition' in l);
                        n = !!('animation' in l || h + 'Animation' in l);
                        !d || m && n || (m = E(f.body.style.webkitTransition), n = E(f.body.style.webkitAnimation));
                    }
                    return {
                        history: !(!b.history || !b.history.pushState || 4 > d || e),
                        hashchange: 'onhashchange' in b && (!g || 7 < g),
                        hasEvent: function (a) {
                            if ('input' == a && 9 == u)
                                return !1;
                            if (H(c[a])) {
                                var b = f.createElement('div');
                                c[a] = 'on' + a in b;
                            }
                            return c[a];
                        },
                        csp: Ya(),
                        vendorPrefix: h,
                        transitions: m,
                        animations: n,
                        android: d,
                        msie: u,
                        msieDocumentMode: g
                    };
                }
            ];
        }
        function ee() {
            this.$get = [
                '$rootScope',
                '$browser',
                '$q',
                '$exceptionHandler',
                function (b, a, c, d) {
                    function e(e, h, k) {
                        var l = c.defer(), m = l.promise, n = G(k) && !k;
                        h = a.defer(function () {
                            try {
                                l.resolve(e());
                            } catch (a) {
                                l.reject(a), d(a);
                            } finally {
                                delete f[m.$$timeoutId];
                            }
                            n || b.$apply();
                        }, h);
                        m.$$timeoutId = h;
                        f[h] = l;
                        return m;
                    }
                    var f = {};
                    e.cancel = function (b) {
                        return b && b.$$timeoutId in f ? (f[b.$$timeoutId].reject('canceled'), delete f[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1;
                    };
                    return e;
                }
            ];
        }
        function wa(b, a) {
            var c = b;
            u && (X.setAttribute('href', c), c = X.href);
            X.setAttribute('href', c);
            return {
                href: X.href,
                protocol: X.protocol ? X.protocol.replace(/:$/, '') : '',
                host: X.host,
                search: X.search ? X.search.replace(/^\?/, '') : '',
                hash: X.hash ? X.hash.replace(/^#/, '') : '',
                hostname: X.hostname,
                port: X.port,
                pathname: '/' === X.pathname.charAt(0) ? X.pathname : '/' + X.pathname
            };
        }
        function Ob(b) {
            b = E(b) ? wa(b) : b;
            return b.protocol === Hc.protocol && b.host === Hc.host;
        }
        function fe() {
            this.$get = Z(V);
        }
        function jc(b) {
            function a(d, e) {
                if (T(d)) {
                    var f = {};
                    r(d, function (b, c) {
                        f[c] = a(c, b);
                    });
                    return f;
                }
                return b.factory(d + c, e);
            }
            var c = 'Filter';
            this.register = a;
            this.$get = [
                '$injector',
                function (a) {
                    return function (b) {
                        return a.get(b + c);
                    };
                }
            ];
            a('currency', Ic);
            a('date', Jc);
            a('filter', Ge);
            a('json', He);
            a('limitTo', Ie);
            a('lowercase', Je);
            a('number', Kc);
            a('orderBy', Lc);
            a('uppercase', Ke);
        }
        function Ge() {
            return function (b, a, c) {
                if (!M(b))
                    return b;
                var d = typeof c, e = [];
                e.check = function (a) {
                    for (var b = 0; b < e.length; b++)
                        if (!e[b](a))
                            return !1;
                    return !0;
                };
                'function' !== d && (c = 'boolean' === d && c ? function (a, b) {
                    return Wa.equals(a, b);
                } : function (a, b) {
                    if (a && b && 'object' === typeof a && 'object' === typeof b) {
                        for (var d in a)
                            if ('$' !== d.charAt(0) && kb.call(a, d) && c(a[d], b[d]))
                                return !0;
                        return !1;
                    }
                    b = ('' + b).toLowerCase();
                    return -1 < ('' + a).toLowerCase().indexOf(b);
                });
                var f = function (a, b) {
                    if ('string' === typeof b && '!' === b.charAt(0))
                        return !f(a, b.substr(1));
                    switch (typeof a) {
                    case 'boolean':
                    case 'number':
                    case 'string':
                        return c(a, b);
                    case 'object':
                        switch (typeof b) {
                        case 'object':
                            return c(a, b);
                        default:
                            for (var d in a)
                                if ('$' !== d.charAt(0) && f(a[d], b))
                                    return !0;
                        }
                        return !1;
                    case 'array':
                        for (d = 0; d < a.length; d++)
                            if (f(a[d], b))
                                return !0;
                        return !1;
                    default:
                        return !1;
                    }
                };
                switch (typeof a) {
                case 'boolean':
                case 'number':
                case 'string':
                    a = { $: a };
                case 'object':
                    for (var g in a)
                        (function (b) {
                            'undefined' !== typeof a[b] && e.push(function (c) {
                                return f('$' == b ? c : c && c[b], a[b]);
                            });
                        }(g));
                    break;
                case 'function':
                    e.push(a);
                    break;
                default:
                    return b;
                }
                d = [];
                for (g = 0; g < b.length; g++) {
                    var h = b[g];
                    e.check(h) && d.push(h);
                }
                return d;
            };
        }
        function Ic(b) {
            var a = b.NUMBER_FORMATS;
            return function (b, d) {
                H(d) && (d = a.CURRENCY_SYM);
                return Mc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d);
            };
        }
        function Kc(b) {
            var a = b.NUMBER_FORMATS;
            return function (b, d) {
                return Mc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
            };
        }
        function Mc(b, a, c, d, e) {
            if (null == b || !isFinite(b) || T(b))
                return '';
            var f = 0 > b;
            b = Math.abs(b);
            var g = b + '', h = '', k = [], l = !1;
            if (-1 !== g.indexOf('e')) {
                var m = g.match(/([\d\.]+)e(-?)(\d+)/);
                m && '-' == m[2] && m[3] > e + 1 ? (g = '0', b = 0) : (h = g, l = !0);
            }
            if (l)
                0 < e && (-1 < b && 1 > b) && (h = b.toFixed(e));
            else {
                g = (g.split(Nc)[1] || '').length;
                H(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac));
                b = +(Math.round(+(b.toString() + 'e' + e)).toString() + 'e' + -e);
                0 === b && (f = !1);
                b = ('' + b).split(Nc);
                g = b[0];
                b = b[1] || '';
                var m = 0, n = a.lgSize, q = a.gSize;
                if (g.length >= n + q)
                    for (m = g.length - n, l = 0; l < m; l++)
                        0 === (m - l) % q && 0 !== l && (h += c), h += g.charAt(l);
                for (l = m; l < g.length; l++)
                    0 === (g.length - l) % n && 0 !== l && (h += c), h += g.charAt(l);
                for (; b.length < e;)
                    b += '0';
                e && '0' !== e && (h += d + b.substr(0, e));
            }
            k.push(f ? a.negPre : a.posPre);
            k.push(h);
            k.push(f ? a.negSuf : a.posSuf);
            return k.join('');
        }
        function Ub(b, a, c) {
            var d = '';
            0 > b && (d = '-', b = -b);
            for (b = '' + b; b.length < a;)
                b = '0' + b;
            c && (b = b.substr(b.length - a));
            return d + b;
        }
        function Y(b, a, c, d) {
            c = c || 0;
            return function (e) {
                e = e['get' + b]();
                if (0 < c || e > -c)
                    e += c;
                0 === e && -12 == c && (e = 12);
                return Ub(e, a, d);
            };
        }
        function ub(b, a) {
            return function (c, d) {
                var e = c['get' + b](), f = Ja(a ? 'SHORT' + b : b);
                return d[f][e];
            };
        }
        function Jc(b) {
            function a(a) {
                var b;
                if (b = a.match(c)) {
                    a = new Date(0);
                    var f = 0, g = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, k = b[8] ? a.setUTCHours : a.setHours;
                    b[9] && (f = U(b[9] + b[10]), g = U(b[9] + b[11]));
                    h.call(a, U(b[1]), U(b[2]) - 1, U(b[3]));
                    f = U(b[4] || 0) - f;
                    g = U(b[5] || 0) - g;
                    h = U(b[6] || 0);
                    b = Math.round(1000 * parseFloat('0.' + (b[7] || 0)));
                    k.call(a, f, g, h, b);
                }
                return a;
            }
            var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
            return function (c, e) {
                var f = '', g = [], h, k;
                e = e || 'mediumDate';
                e = b.DATETIME_FORMATS[e] || e;
                E(c) && (c = Le.test(c) ? U(c) : a(c));
                ib(c) && (c = new Date(c));
                if (!ua(c))
                    return c;
                for (; e;)
                    (k = Me.exec(e)) ? (g = g.concat(va.call(k, 1)), e = g.pop()) : (g.push(e), e = null);
                r(g, function (a) {
                    h = Ne[a];
                    f += h ? h(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
                });
                return f;
            };
        }
        function He() {
            return function (b) {
                return oa(b, !0);
            };
        }
        function Ie() {
            return function (b, a) {
                return M(b) || E(b) ? (a = Infinity === Math.abs(Number(a)) ? Number(a) : U(a)) ? 0 < a ? b.slice(0, a) : b.slice(a) : E(b) ? '' : [] : b;
            };
        }
        function Lc(b) {
            return function (a, c, d) {
                function e(a, b) {
                    return Va(b) ? function (b, c) {
                        return a(c, b);
                    } : a;
                }
                function f(a, b) {
                    var c = typeof a, d = typeof b;
                    return c == d ? (ua(a) && ua(b) && (a = a.valueOf(), b = b.valueOf()), 'string' == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
                }
                if (!Ra(a))
                    return a;
                c = M(c) ? c : [c];
                0 === c.length && (c = ['+']);
                c = Vc(c, function (a) {
                    var c = !1, d = a || ga;
                    if (E(a)) {
                        if ('+' == a.charAt(0) || '-' == a.charAt(0))
                            c = '-' == a.charAt(0), a = a.substring(1);
                        if ('' === a)
                            return e(function (a, b) {
                                return f(a, b);
                            }, c);
                        d = b(a);
                        if (d.constant) {
                            var l = d();
                            return e(function (a, b) {
                                return f(a[l], b[l]);
                            }, c);
                        }
                    }
                    return e(function (a, b) {
                        return f(d(a), d(b));
                    }, c);
                });
                return va.call(a).sort(e(function (a, b) {
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d](a, b);
                        if (0 !== e)
                            return e;
                    }
                    return 0;
                }, d));
            };
        }
        function za(b) {
            O(b) && (b = { link: b });
            b.restrict = b.restrict || 'AC';
            return Z(b);
        }
        function Oc(b, a, c, d) {
            function e(a, c) {
                c = c ? '-' + mb(c, '-') : '';
                d.setClass(b, (a ? vb : wb) + c, (a ? wb : vb) + c);
            }
            var f = this, g = b.parent().controller('form') || xb, h = 0, k = f.$error = {}, l = [];
            f.$name = a.name || a.ngForm;
            f.$dirty = !1;
            f.$pristine = !0;
            f.$valid = !0;
            f.$invalid = !1;
            g.$addControl(f);
            b.addClass(Qa);
            e(!0);
            f.$addControl = function (a) {
                Da(a.$name, 'input');
                l.push(a);
                a.$name && (f[a.$name] = a);
            };
            f.$removeControl = function (a) {
                a.$name && f[a.$name] === a && delete f[a.$name];
                r(k, function (b, c) {
                    f.$setValidity(c, !0, a);
                });
                Ta(l, a);
            };
            f.$setValidity = function (a, b, c) {
                var d = k[a];
                if (b)
                    d && (Ta(d, c), d.length || (h--, h || (e(b), f.$valid = !0, f.$invalid = !1), k[a] = !1, e(!0, a), g.$setValidity(a, !0, f)));
                else {
                    h || e(b);
                    if (d) {
                        if (-1 != Sa(d, c))
                            return;
                    } else
                        k[a] = d = [], h++, e(!1, a), g.$setValidity(a, !1, f);
                    d.push(c);
                    f.$valid = !1;
                    f.$invalid = !0;
                }
            };
            f.$setDirty = function () {
                d.removeClass(b, Qa);
                d.addClass(b, yb);
                f.$dirty = !0;
                f.$pristine = !1;
                g.$setDirty();
            };
            f.$setPristine = function () {
                d.removeClass(b, yb);
                d.addClass(b, Qa);
                f.$dirty = !1;
                f.$pristine = !0;
                r(l, function (a) {
                    a.$setPristine();
                });
            };
        }
        function ta(b, a, c, d) {
            b.$setValidity(a, c);
            return c ? d : v;
        }
        function Pc(b, a) {
            var c, d;
            if (a)
                for (c = 0; c < a.length; ++c)
                    if (d = a[c], b[d])
                        return !0;
            return !1;
        }
        function Oe(b, a, c, d, e) {
            T(e) && (b.$$hasNativeValidators = !0, b.$parsers.push(function (f) {
                if (b.$error[a] || Pc(e, d) || !Pc(e, c))
                    return f;
                b.$setValidity(a, !1);
            }));
        }
        function zb(b, a, c, d, e, f) {
            var g = a.prop(Pe), h = a[0].placeholder, k = {}, l = A(a[0].type);
            d.$$validityState = g;
            if (!e.android) {
                var m = !1;
                a.on('compositionstart', function (a) {
                    m = !0;
                });
                a.on('compositionend', function () {
                    m = !1;
                    n();
                });
            }
            var n = function (e) {
                if (!m) {
                    var f = a.val();
                    if (u && 'input' === (e || k).type && a[0].placeholder !== h)
                        h = a[0].placeholder;
                    else if ('password' !== l && Va(c.ngTrim || 'T') && (f = $(f)), e = g && d.$$hasNativeValidators, d.$viewValue !== f || '' === f && e)
                        b.$root.$$phase ? d.$setViewValue(f) : b.$apply(function () {
                            d.$setViewValue(f);
                        });
                }
            };
            if (e.hasEvent('input'))
                a.on('input', n);
            else {
                var q, p = function () {
                        q || (q = f.defer(function () {
                            n();
                            q = null;
                        }));
                    };
                a.on('keydown', function (a) {
                    a = a.keyCode;
                    91 === a || (15 < a && 19 > a || 37 <= a && 40 >= a) || p();
                });
                if (e.hasEvent('paste'))
                    a.on('paste cut', p);
            }
            a.on('change', n);
            d.$render = function () {
                a.val(d.$isEmpty(d.$viewValue) ? '' : d.$viewValue);
            };
            var s = c.ngPattern;
            s && ((e = s.match(/^\/(.*)\/([gim]*)$/)) ? (s = RegExp(e[1], e[2]), e = function (a) {
                return ta(d, 'pattern', d.$isEmpty(a) || s.test(a), a);
            }) : e = function (c) {
                var e = b.$eval(s);
                if (!e || !e.test)
                    throw z('ngPattern')('noregexp', s, e, ia(a));
                return ta(d, 'pattern', d.$isEmpty(c) || e.test(c), c);
            }, d.$formatters.push(e), d.$parsers.push(e));
            if (c.ngMinlength) {
                var r = U(c.ngMinlength);
                e = function (a) {
                    return ta(d, 'minlength', d.$isEmpty(a) || a.length >= r, a);
                };
                d.$parsers.push(e);
                d.$formatters.push(e);
            }
            if (c.ngMaxlength) {
                var w = U(c.ngMaxlength);
                e = function (a) {
                    return ta(d, 'maxlength', d.$isEmpty(a) || a.length <= w, a);
                };
                d.$parsers.push(e);
                d.$formatters.push(e);
            }
        }
        function Vb(b, a) {
            b = 'ngClass' + b;
            return [
                '$animate',
                function (c) {
                    function d(a, b) {
                        var c = [], d = 0;
                        a:
                            for (; d < a.length; d++) {
                                for (var e = a[d], m = 0; m < b.length; m++)
                                    if (e == b[m])
                                        continue a;
                                c.push(e);
                            }
                        return c;
                    }
                    function e(a) {
                        if (!M(a)) {
                            if (E(a))
                                return a.split(' ');
                            if (T(a)) {
                                var b = [];
                                r(a, function (a, c) {
                                    a && (b = b.concat(c.split(' ')));
                                });
                                return b;
                            }
                        }
                        return a;
                    }
                    return {
                        restrict: 'AC',
                        link: function (f, g, h) {
                            function k(a, b) {
                                var c = g.data('$classCounts') || {}, d = [];
                                r(a, function (a) {
                                    if (0 < b || c[a])
                                        c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
                                });
                                g.data('$classCounts', c);
                                return d.join(' ');
                            }
                            function l(b) {
                                if (!0 === a || f.$index % 2 === a) {
                                    var l = e(b || []);
                                    if (!m) {
                                        var p = k(l, 1);
                                        h.$addClass(p);
                                    } else if (!Ba(b, m)) {
                                        var s = e(m), p = d(l, s), l = d(s, l), l = k(l, -1), p = k(p, 1);
                                        0 === p.length ? c.removeClass(g, l) : 0 === l.length ? c.addClass(g, p) : c.setClass(g, p, l);
                                    }
                                }
                                m = ha(b);
                            }
                            var m;
                            f.$watch(h[b], l, !0);
                            h.$observe('class', function (a) {
                                l(f.$eval(h[b]));
                            });
                            'ngClass' !== b && f.$watch('$index', function (c, d) {
                                var g = c & 1;
                                if (g !== (d & 1)) {
                                    var l = e(f.$eval(h[b]));
                                    g === a ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g));
                                }
                            });
                        }
                    };
                }
            ];
        }
        var Pe = 'validity', A = function (b) {
                return E(b) ? b.toLowerCase() : b;
            }, kb = Object.prototype.hasOwnProperty, Ja = function (b) {
                return E(b) ? b.toUpperCase() : b;
            }, u, D, Ea, va = [].slice, Qe = [].push, Aa = Object.prototype.toString, Ua = z('ng'), Wa = V.angular || (V.angular = {}), Za, Na, na = [
                '0',
                '0',
                '0'
            ];
        u = U((/msie (\d+)/.exec(A(navigator.userAgent)) || [])[1]);
        isNaN(u) && (u = U((/trident\/.*; rv:(\d+)/.exec(A(navigator.userAgent)) || [])[1]));
        B.$inject = [];
        ga.$inject = [];
        var M = function () {
                return O(Array.isArray) ? Array.isArray : function (b) {
                    return '[object Array]' === Aa.call(b);
                };
            }(), $ = function () {
                return String.prototype.trim ? function (b) {
                    return E(b) ? b.trim() : b;
                } : function (b) {
                    return E(b) ? b.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : b;
                };
            }();
        Na = 9 > u ? function (b) {
            b = b.nodeName ? b : b[0];
            return b.scopeName && 'HTML' != b.scopeName ? Ja(b.scopeName + ':' + b.nodeName) : b.nodeName;
        } : function (b) {
            return b.nodeName ? b.nodeName : b[0].nodeName;
        };
        var Ya = function () {
                if (G(Ya.isActive_))
                    return Ya.isActive_;
                var b = !(!W.querySelector('[ng-csp]') && !W.querySelector('[data-ng-csp]'));
                if (!b)
                    try {
                        new Function('');
                    } catch (a) {
                        b = !0;
                    }
                return Ya.isActive_ = b;
            }, Yc = /[A-Z]/g, ad = {
                full: '1.2.32',
                major: 1,
                minor: 2,
                dot: 32,
                codeName: 'alternation-intention'
            };
        S.expando = 'ng339';
        var bb = S.cache = {}, ne = 1, rb = V.document.addEventListener ? function (b, a, c) {
                b.addEventListener(a, c, !1);
            } : function (b, a, c) {
                b.attachEvent('on' + a, c);
            }, ab = V.document.removeEventListener ? function (b, a, c) {
                b.removeEventListener(a, c, !1);
            } : function (b, a, c) {
                b.detachEvent('on' + a, c);
            };
        S._data = function (b) {
            return this.cache[b[this.expando]] || {};
        };
        var ie = /([\:\-\_]+(.))/g, je = /^moz([A-Z])/, Gb = z('jqLite'), ke = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Hb = /<|&#?\w+;/, le = /<([\w:]+)/, me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ca = {
                option: [
                    1,
                    '<select multiple="multiple">',
                    '</select>'
                ],
                thead: [
                    1,
                    '<table>',
                    '</table>'
                ],
                col: [
                    2,
                    '<table><colgroup>',
                    '</colgroup></table>'
                ],
                tr: [
                    2,
                    '<table><tbody>',
                    '</tbody></table>'
                ],
                td: [
                    3,
                    '<table><tbody><tr>',
                    '</tr></tbody></table>'
                ],
                _default: [
                    0,
                    '',
                    ''
                ]
            };
        ca.optgroup = ca.option;
        ca.tbody = ca.tfoot = ca.colgroup = ca.caption = ca.thead;
        ca.th = ca.td;
        var Ma = S.prototype = {
                ready: function (b) {
                    function a() {
                        c || (c = !0, b());
                    }
                    var c = !1;
                    'complete' === W.readyState ? setTimeout(a) : (this.on('DOMContentLoaded', a), S(V).on('load', a));
                },
                toString: function () {
                    var b = [];
                    r(this, function (a) {
                        b.push('' + a);
                    });
                    return '[' + b.join(', ') + ']';
                },
                eq: function (b) {
                    return 0 <= b ? D(this[b]) : D(this[this.length + b]);
                },
                length: 0,
                push: Qe,
                sort: [].sort,
                splice: [].splice
            }, qb = {};
        r('multiple selected checked disabled readOnly required open'.split(' '), function (b) {
            qb[A(b)] = b;
        });
        var oc = {};
        r('input select option textarea button form details'.split(' '), function (b) {
            oc[Ja(b)] = !0;
        });
        r({
            data: Lb,
            removeData: Kb
        }, function (b, a) {
            S[a] = b;
        });
        r({
            data: Lb,
            inheritedData: pb,
            scope: function (b) {
                return D.data(b, '$scope') || pb(b.parentNode || b, [
                    '$isolateScope',
                    '$scope'
                ]);
            },
            isolateScope: function (b) {
                return D.data(b, '$isolateScope') || D.data(b, '$isolateScopeNoTemplate');
            },
            controller: lc,
            injector: function (b) {
                return pb(b, '$injector');
            },
            removeAttr: function (b, a) {
                b.removeAttribute(a);
            },
            hasClass: Mb,
            css: function (b, a, c) {
                a = $a(a);
                if (G(c))
                    b.style[a] = c;
                else {
                    var d;
                    8 >= u && (d = b.currentStyle && b.currentStyle[a], '' === d && (d = 'auto'));
                    d = d || b.style[a];
                    8 >= u && (d = '' === d ? v : d);
                    return d;
                }
            },
            attr: function (b, a, c) {
                var d = A(a);
                if (qb[d])
                    if (G(c))
                        c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d));
                    else
                        return b[a] || (b.attributes.getNamedItem(a) || B).specified ? d : v;
                else if (G(c))
                    b.setAttribute(a, c);
                else if (b.getAttribute)
                    return b = b.getAttribute(a, 2), null === b ? v : b;
            },
            prop: function (b, a, c) {
                if (G(c))
                    b[a] = c;
                else
                    return b[a];
            },
            text: function () {
                function b(b, d) {
                    var e = a[b.nodeType];
                    if (H(d))
                        return e ? b[e] : '';
                    b[e] = d;
                }
                var a = [];
                9 > u ? (a[1] = 'innerText', a[3] = 'nodeValue') : a[1] = a[3] = 'textContent';
                b.$dv = '';
                return b;
            }(),
            val: function (b, a) {
                if (H(a)) {
                    if ('SELECT' === Na(b) && b.multiple) {
                        var c = [];
                        r(b.options, function (a) {
                            a.selected && c.push(a.value || a.text);
                        });
                        return 0 === c.length ? null : c;
                    }
                    return b.value;
                }
                b.value = a;
            },
            html: function (b, a) {
                if (H(a))
                    return b.innerHTML;
                for (var c = 0, d = b.childNodes; c < d.length; c++)
                    Ka(d[c]);
                b.innerHTML = a;
            },
            empty: mc
        }, function (b, a) {
            S.prototype[a] = function (a, d) {
                var e, f, g = this.length;
                if (b !== mc && (2 == b.length && b !== Mb && b !== lc ? a : d) === v) {
                    if (T(a)) {
                        for (e = 0; e < g; e++)
                            if (b === Lb)
                                b(this[e], a);
                            else
                                for (f in a)
                                    b(this[e], f, a[f]);
                        return this;
                    }
                    e = b.$dv;
                    g = e === v ? Math.min(g, 1) : g;
                    for (f = 0; f < g; f++) {
                        var h = b(this[f], a, d);
                        e = e ? e + h : h;
                    }
                    return e;
                }
                for (e = 0; e < g; e++)
                    b(this[e], a, d);
                return this;
            };
        });
        r({
            removeData: Kb,
            dealoc: Ka,
            on: function a(c, d, e, f) {
                if (G(f))
                    throw Gb('onargs');
                var g = pa(c, 'events'), h = pa(c, 'handle');
                g || pa(c, 'events', g = {});
                h || pa(c, 'handle', h = oe(c, g));
                r(d.split(' '), function (d) {
                    var f = g[d];
                    if (!f) {
                        if ('mouseenter' == d || 'mouseleave' == d) {
                            var m = W.body.contains || W.body.compareDocumentPosition ? function (a, c) {
                                var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                                return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16));
                            } : function (a, c) {
                                if (c)
                                    for (; c = c.parentNode;)
                                        if (c === a)
                                            return !0;
                                return !1;
                            };
                            g[d] = [];
                            a(c, {
                                mouseleave: 'mouseout',
                                mouseenter: 'mouseover'
                            }[d], function (a) {
                                var c = a.relatedTarget;
                                c && (c === this || m(this, c)) || h(a, d);
                            });
                        } else
                            rb(c, d, h), g[d] = [];
                        f = g[d];
                    }
                    f.push(e);
                });
            },
            off: kc,
            one: function (a, c, d) {
                a = D(a);
                a.on(c, function f() {
                    a.off(c, d);
                    a.off(c, f);
                });
                a.on(c, d);
            },
            replaceWith: function (a, c) {
                var d, e = a.parentNode;
                Ka(a);
                r(new S(c), function (c) {
                    d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                    d = c;
                });
            },
            children: function (a) {
                var c = [];
                r(a.childNodes, function (a) {
                    1 === a.nodeType && c.push(a);
                });
                return c;
            },
            contents: function (a) {
                return a.contentDocument || a.childNodes || [];
            },
            append: function (a, c) {
                r(new S(c), function (c) {
                    1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c);
                });
            },
            prepend: function (a, c) {
                if (1 === a.nodeType) {
                    var d = a.firstChild;
                    r(new S(c), function (c) {
                        a.insertBefore(c, d);
                    });
                }
            },
            wrap: function (a, c) {
                c = D(c)[0];
                var d = a.parentNode;
                d && d.replaceChild(c, a);
                c.appendChild(a);
            },
            remove: function (a) {
                Ka(a);
                var c = a.parentNode;
                c && c.removeChild(a);
            },
            after: function (a, c) {
                var d = a, e = a.parentNode;
                r(new S(c), function (a) {
                    e.insertBefore(a, d.nextSibling);
                    d = a;
                });
            },
            addClass: ob,
            removeClass: nb,
            toggleClass: function (a, c, d) {
                c && r(c.split(' '), function (c) {
                    var f = d;
                    H(f) && (f = !Mb(a, c));
                    (f ? ob : nb)(a, c);
                });
            },
            parent: function (a) {
                return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
            },
            next: function (a) {
                if (a.nextElementSibling)
                    return a.nextElementSibling;
                for (a = a.nextSibling; null != a && 1 !== a.nodeType;)
                    a = a.nextSibling;
                return a;
            },
            find: function (a, c) {
                return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
            },
            clone: Jb,
            triggerHandler: function (a, c, d) {
                var e, f;
                e = c.type || c;
                var g = (pa(a, 'events') || {})[e];
                g && (e = {
                    preventDefault: function () {
                        this.defaultPrevented = !0;
                    },
                    isDefaultPrevented: function () {
                        return !0 === this.defaultPrevented;
                    },
                    stopPropagation: B,
                    type: e,
                    target: a
                }, c.type && (e = F(e, c)), c = ha(g), f = d ? [e].concat(d) : [e], r(c, function (c) {
                    c.apply(a, f);
                }));
            }
        }, function (a, c) {
            S.prototype[c] = function (c, e, f) {
                for (var g, h = 0; h < this.length; h++)
                    H(g) ? (g = a(this[h], c, e, f), G(g) && (g = D(g))) : Ib(g, a(this[h], c, e, f));
                return G(g) ? g : this;
            };
            S.prototype.bind = S.prototype.on;
            S.prototype.unbind = S.prototype.off;
        });
        cb.prototype = {
            put: function (a, c) {
                this[La(a, this.nextUid)] = c;
            },
            get: function (a) {
                return this[La(a, this.nextUid)];
            },
            remove: function (a) {
                var c = this[a = La(a, this.nextUid)];
                delete this[a];
                return c;
            }
        };
        var qe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, re = /,/, se = /^\s*(_?)(\S+?)\1\s*$/, pe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, db = z('$injector'), Re = z('$animate'), Md = [
                '$provide',
                function (a) {
                    this.$$selectors = {};
                    this.register = function (c, d) {
                        var e = c + '-animation';
                        if (c && '.' != c.charAt(0))
                            throw Re('notcsel', c);
                        this.$$selectors[c.substr(1)] = e;
                        a.factory(e, d);
                    };
                    this.classNameFilter = function (a) {
                        1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
                        return this.$$classNameFilter;
                    };
                    this.$get = [
                        '$timeout',
                        '$$asyncCallback',
                        function (a, d) {
                            return {
                                enter: function (a, c, g, h) {
                                    g ? g.after(a) : (c && c[0] || (c = g.parent()), c.append(a));
                                    h && d(h);
                                },
                                leave: function (a, c) {
                                    a.remove();
                                    c && d(c);
                                },
                                move: function (a, c, d, h) {
                                    this.enter(a, c, d, h);
                                },
                                addClass: function (a, c, g) {
                                    c = E(c) ? c : M(c) ? c.join(' ') : '';
                                    r(a, function (a) {
                                        ob(a, c);
                                    });
                                    g && d(g);
                                },
                                removeClass: function (a, c, g) {
                                    c = E(c) ? c : M(c) ? c.join(' ') : '';
                                    r(a, function (a) {
                                        nb(a, c);
                                    });
                                    g && d(g);
                                },
                                setClass: function (a, c, g, h) {
                                    r(a, function (a) {
                                        ob(a, c);
                                        nb(a, g);
                                    });
                                    h && d(h);
                                },
                                enabled: B
                            };
                        }
                    ];
                }
            ], ja = z('$compile');
        fc.$inject = [
            '$provide',
            '$$sanitizeUriProvider'
        ];
        var xe = /^(x[\:\-_]|data[\:\-_])/i, vc = z('$interpolate'), Se = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Ae = {
                http: 80,
                https: 443,
                ftp: 21
            }, Rb = z('$location');
        Ac.prototype = Sb.prototype = zc.prototype = {
            $$html5: !1,
            $$replace: !1,
            absUrl: sb('$$absUrl'),
            url: function (a) {
                if (H(a))
                    return this.$$url;
                a = Se.exec(a);
                a[1] && this.path(decodeURIComponent(a[1]));
                (a[2] || a[1]) && this.search(a[3] || '');
                this.hash(a[5] || '');
                return this;
            },
            protocol: sb('$$protocol'),
            host: sb('$$host'),
            port: sb('$$port'),
            path: Bc('$$path', function (a) {
                a = null !== a ? a.toString() : '';
                return '/' == a.charAt(0) ? a : '/' + a;
            }),
            search: function (a, c) {
                switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (E(a) || ib(a))
                        a = a.toString(), this.$$search = bc(a);
                    else if (T(a))
                        r(a, function (c, e) {
                            null == c && delete a[e];
                        }), this.$$search = a;
                    else
                        throw Rb('isrcharg');
                    break;
                default:
                    H(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
                }
                this.$$compose();
                return this;
            },
            hash: Bc('$$hash', function (a) {
                return null !== a ? a.toString() : '';
            }),
            replace: function () {
                this.$$replace = !0;
                return this;
            }
        };
        var ea = z('$parse'), Fc = {}, xa, Te = Function.prototype.call, Ue = Function.prototype.apply, Qc = Function.prototype.bind, gb = {
                'null': function () {
                    return null;
                },
                'true': function () {
                    return !0;
                },
                'false': function () {
                    return !1;
                },
                undefined: B,
                '+': function (a, c, d, e) {
                    d = d(a, c);
                    e = e(a, c);
                    return G(d) ? G(e) ? d + e : d : G(e) ? e : v;
                },
                '-': function (a, c, d, e) {
                    d = d(a, c);
                    e = e(a, c);
                    return (G(d) ? d : 0) - (G(e) ? e : 0);
                },
                '*': function (a, c, d, e) {
                    return d(a, c) * e(a, c);
                },
                '/': function (a, c, d, e) {
                    return d(a, c) / e(a, c);
                },
                '%': function (a, c, d, e) {
                    return d(a, c) % e(a, c);
                },
                '^': function (a, c, d, e) {
                    return d(a, c) ^ e(a, c);
                },
                '=': B,
                '===': function (a, c, d, e) {
                    return d(a, c) === e(a, c);
                },
                '!==': function (a, c, d, e) {
                    return d(a, c) !== e(a, c);
                },
                '==': function (a, c, d, e) {
                    return d(a, c) == e(a, c);
                },
                '!=': function (a, c, d, e) {
                    return d(a, c) != e(a, c);
                },
                '<': function (a, c, d, e) {
                    return d(a, c) < e(a, c);
                },
                '>': function (a, c, d, e) {
                    return d(a, c) > e(a, c);
                },
                '<=': function (a, c, d, e) {
                    return d(a, c) <= e(a, c);
                },
                '>=': function (a, c, d, e) {
                    return d(a, c) >= e(a, c);
                },
                '&&': function (a, c, d, e) {
                    return d(a, c) && e(a, c);
                },
                '||': function (a, c, d, e) {
                    return d(a, c) || e(a, c);
                },
                '&': function (a, c, d, e) {
                    return d(a, c) & e(a, c);
                },
                '|': function (a, c, d, e) {
                    return e(a, c)(a, c, d(a, c));
                },
                '!': function (a, c, d) {
                    return !d(a, c);
                }
            }, Ve = {
                n: '\n',
                f: '\f',
                r: '\r',
                t: '\t',
                v: '\x0B',
                '\'': '\'',
                '"': '"'
            }, Tb = function (a) {
                this.options = a;
            };
        Tb.prototype = {
            constructor: Tb,
            lex: function (a) {
                this.text = a;
                this.index = 0;
                this.ch = v;
                this.lastCh = ':';
                for (this.tokens = []; this.index < this.text.length;) {
                    this.ch = this.text.charAt(this.index);
                    if (this.is('"\''))
                        this.readString(this.ch);
                    else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek()))
                        this.readNumber();
                    else if (this.isIdent(this.ch))
                        this.readIdent();
                    else if (this.is('(){}[].,;:?'))
                        this.tokens.push({
                            index: this.index,
                            text: this.ch
                        }), this.index++;
                    else if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue;
                    } else {
                        a = this.ch + this.peek();
                        var c = a + this.peek(2), d = gb[this.ch], e = gb[a], f = gb[c];
                        f ? (this.tokens.push({
                            index: this.index,
                            text: c,
                            fn: f
                        }), this.index += 3) : e ? (this.tokens.push({
                            index: this.index,
                            text: a,
                            fn: e
                        }), this.index += 2) : d ? (this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            fn: d
                        }), this.index += 1) : this.throwError('Unexpected next character ', this.index, this.index + 1);
                    }
                    this.lastCh = this.ch;
                }
                return this.tokens;
            },
            is: function (a) {
                return -1 !== a.indexOf(this.ch);
            },
            was: function (a) {
                return -1 !== a.indexOf(this.lastCh);
            },
            peek: function (a) {
                a = a || 1;
                return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
            },
            isNumber: function (a) {
                return '0' <= a && '9' >= a;
            },
            isWhitespace: function (a) {
                return ' ' === a || '\r' === a || '\t' === a || '\n' === a || '\x0B' === a || '\xA0' === a;
            },
            isIdent: function (a) {
                return 'a' <= a && 'z' >= a || 'A' <= a && 'Z' >= a || '_' === a || '$' === a;
            },
            isExpOperator: function (a) {
                return '-' === a || '+' === a || this.isNumber(a);
            },
            throwError: function (a, c, d) {
                d = d || this.index;
                c = G(c) ? 's ' + c + '-' + this.index + ' [' + this.text.substring(c, d) + ']' : ' ' + d;
                throw ea('lexerr', a, c, this.text);
            },
            readNumber: function () {
                for (var a = '', c = this.index; this.index < this.text.length;) {
                    var d = A(this.text.charAt(this.index));
                    if ('.' == d || this.isNumber(d))
                        a += d;
                    else {
                        var e = this.peek();
                        if ('e' == d && this.isExpOperator(e))
                            a += d;
                        else if (this.isExpOperator(d) && e && this.isNumber(e) && 'e' == a.charAt(a.length - 1))
                            a += d;
                        else if (!this.isExpOperator(d) || e && this.isNumber(e) || 'e' != a.charAt(a.length - 1))
                            break;
                        else
                            this.throwError('Invalid exponent');
                    }
                    this.index++;
                }
                a *= 1;
                this.tokens.push({
                    index: c,
                    text: a,
                    literal: !0,
                    constant: !0,
                    fn: function () {
                        return a;
                    }
                });
            },
            readIdent: function () {
                for (var a = this, c = '', d = this.index, e, f, g, h; this.index < this.text.length;) {
                    h = this.text.charAt(this.index);
                    if ('.' === h || this.isIdent(h) || this.isNumber(h))
                        '.' === h && (e = this.index), c += h;
                    else
                        break;
                    this.index++;
                }
                if (e)
                    for (f = this.index; f < this.text.length;) {
                        h = this.text.charAt(f);
                        if ('(' === h) {
                            g = c.substr(e - d + 1);
                            c = c.substr(0, e - d);
                            this.index = f;
                            break;
                        }
                        if (this.isWhitespace(h))
                            f++;
                        else
                            break;
                    }
                d = {
                    index: d,
                    text: c
                };
                if (gb.hasOwnProperty(c))
                    d.fn = gb[c], d.literal = !0, d.constant = !0;
                else {
                    var k = Ec(c, this.options, this.text);
                    d.fn = F(function (a, c) {
                        return k(a, c);
                    }, {
                        assign: function (d, e) {
                            return tb(d, c, e, a.text, a.options);
                        }
                    });
                }
                this.tokens.push(d);
                g && (this.tokens.push({
                    index: e,
                    text: '.'
                }), this.tokens.push({
                    index: e + 1,
                    text: g
                }));
            },
            readString: function (a) {
                var c = this.index;
                this.index++;
                for (var d = '', e = a, f = !1; this.index < this.text.length;) {
                    var g = this.text.charAt(this.index), e = e + g;
                    if (f)
                        'u' === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError('Invalid unicode escape [\\u' + f + ']'), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Ve[g] || g, f = !1;
                    else if ('\\' === g)
                        f = !0;
                    else {
                        if (g === a) {
                            this.index++;
                            this.tokens.push({
                                index: c,
                                text: e,
                                string: d,
                                literal: !0,
                                constant: !0,
                                fn: function () {
                                    return d;
                                }
                            });
                            return;
                        }
                        d += g;
                    }
                    this.index++;
                }
                this.throwError('Unterminated quote', c);
            }
        };
        var fb = function (a, c, d) {
            this.lexer = a;
            this.$filter = c;
            this.options = d;
        };
        fb.ZERO = F(function () {
            return 0;
        }, { constant: !0 });
        fb.prototype = {
            constructor: fb,
            parse: function (a) {
                this.text = a;
                this.tokens = this.lexer.lex(a);
                a = this.statements();
                0 !== this.tokens.length && this.throwError('is an unexpected token', this.tokens[0]);
                a.literal = !!a.literal;
                a.constant = !!a.constant;
                return a;
            },
            primary: function () {
                var a;
                if (this.expect('('))
                    a = this.filterChain(), this.consume(')');
                else if (this.expect('['))
                    a = this.arrayDeclaration();
                else if (this.expect('{'))
                    a = this.object();
                else {
                    var c = this.expect();
                    (a = c.fn) || this.throwError('not a primary expression', c);
                    a.literal = !!c.literal;
                    a.constant = !!c.constant;
                }
                for (var d; c = this.expect('(', '[', '.');)
                    '(' === c.text ? (a = this.functionCall(a, d), d = null) : '[' === c.text ? (d = a, a = this.objectIndex(a)) : '.' === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError('IMPOSSIBLE');
                return a;
            },
            throwError: function (a, c) {
                throw ea('syntax', c.text, a, c.index + 1, this.text, this.text.substring(c.index));
            },
            peekToken: function () {
                if (0 === this.tokens.length)
                    throw ea('ueoe', this.text);
                return this.tokens[0];
            },
            peek: function (a, c, d, e) {
                if (0 < this.tokens.length) {
                    var f = this.tokens[0], g = f.text;
                    if (g === a || g === c || g === d || g === e || !(a || c || d || e))
                        return f;
                }
                return !1;
            },
            expect: function (a, c, d, e) {
                return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
            },
            consume: function (a) {
                this.expect(a) || this.throwError('is unexpected, expecting [' + a + ']', this.peek());
            },
            unaryFn: function (a, c) {
                return F(function (d, e) {
                    return a(d, e, c);
                }, { constant: c.constant });
            },
            ternaryFn: function (a, c, d) {
                return F(function (e, f) {
                    return a(e, f) ? c(e, f) : d(e, f);
                }, { constant: a.constant && c.constant && d.constant });
            },
            binaryFn: function (a, c, d) {
                return F(function (e, f) {
                    return c(e, f, a, d);
                }, { constant: a.constant && d.constant });
            },
            statements: function () {
                for (var a = [];;)
                    if (0 < this.tokens.length && !this.peek('}', ')', ';', ']') && a.push(this.filterChain()), !this.expect(';'))
                        return 1 === a.length ? a[0] : function (c, d) {
                            for (var e, f = 0; f < a.length; f++) {
                                var g = a[f];
                                g && (e = g(c, d));
                            }
                            return e;
                        };
            },
            filterChain: function () {
                for (var a = this.expression(), c;;)
                    if (c = this.expect('|'))
                        a = this.binaryFn(a, c.fn, this.filter());
                    else
                        return a;
            },
            filter: function () {
                for (var a = this.expect(), c = this.$filter(a.text), d = [];;)
                    if (a = this.expect(':'))
                        d.push(this.expression());
                    else {
                        var e = function (a, e, h) {
                            h = [h];
                            for (var k = 0; k < d.length; k++)
                                h.push(d[k](a, e));
                            return c.apply(a, h);
                        };
                        return function () {
                            return e;
                        };
                    }
            },
            expression: function () {
                return this.assignment();
            },
            assignment: function () {
                var a = this.ternary(), c, d;
                return (d = this.expect('=')) ? (a.assign || this.throwError('implies assignment but [' + this.text.substring(0, d.index) + '] can not be assigned to', d), c = this.ternary(), function (d, f) {
                    return a.assign(d, c(d, f), f);
                }) : a;
            },
            ternary: function () {
                var a = this.logicalOR(), c, d;
                if (this.expect('?')) {
                    c = this.assignment();
                    if (d = this.expect(':'))
                        return this.ternaryFn(a, c, this.assignment());
                    this.throwError('expected :', d);
                } else
                    return a;
            },
            logicalOR: function () {
                for (var a = this.logicalAND(), c;;)
                    if (c = this.expect('||'))
                        a = this.binaryFn(a, c.fn, this.logicalAND());
                    else
                        return a;
            },
            logicalAND: function () {
                var a = this.equality(), c;
                if (c = this.expect('&&'))
                    a = this.binaryFn(a, c.fn, this.logicalAND());
                return a;
            },
            equality: function () {
                var a = this.relational(), c;
                if (c = this.expect('==', '!=', '===', '!=='))
                    a = this.binaryFn(a, c.fn, this.equality());
                return a;
            },
            relational: function () {
                var a = this.additive(), c;
                if (c = this.expect('<', '>', '<=', '>='))
                    a = this.binaryFn(a, c.fn, this.relational());
                return a;
            },
            additive: function () {
                for (var a = this.multiplicative(), c; c = this.expect('+', '-');)
                    a = this.binaryFn(a, c.fn, this.multiplicative());
                return a;
            },
            multiplicative: function () {
                for (var a = this.unary(), c; c = this.expect('*', '/', '%');)
                    a = this.binaryFn(a, c.fn, this.unary());
                return a;
            },
            unary: function () {
                var a;
                return this.expect('+') ? this.primary() : (a = this.expect('-')) ? this.binaryFn(fb.ZERO, a.fn, this.unary()) : (a = this.expect('!')) ? this.unaryFn(a.fn, this.unary()) : this.primary();
            },
            fieldAccess: function (a) {
                var c = this, d = this.expect().text, e = Ec(d, this.options, this.text);
                return F(function (c, d, h) {
                    return e(h || a(c, d));
                }, {
                    assign: function (e, g, h) {
                        (h = a(e, h)) || a.assign(e, h = {});
                        return tb(h, d, g, c.text, c.options);
                    }
                });
            },
            objectIndex: function (a) {
                var c = this, d = this.expression();
                this.consume(']');
                return F(function (e, f) {
                    var g = a(e, f), h = Cc(d(e, f), c.text), k;
                    la(h, c.text);
                    if (!g)
                        return v;
                    (g = ma(g[h], c.text)) && (g.then && c.options.unwrapPromises) && (k = g, '$$v' in g || (k.$$v = v, k.then(function (a) {
                        k.$$v = a;
                    })), g = g.$$v);
                    return g;
                }, {
                    assign: function (e, f, g) {
                        var h = la(Cc(d(e, g), c.text), c.text);
                        (g = ma(a(e, g), c.text)) || a.assign(e, g = {});
                        return g[h] = f;
                    }
                });
            },
            functionCall: function (a, c) {
                var d = [];
                if (')' !== this.peekToken().text) {
                    do
                        d.push(this.expression());
                    while (this.expect(','));
                }
                this.consume(')');
                var e = this;
                return function (f, g) {
                    for (var h = [], k = c ? c(f, g) : f, l = 0; l < d.length; l++)
                        h.push(ma(d[l](f, g), e.text));
                    l = a(f, g, k) || B;
                    ma(k, e.text);
                    var m = e.text;
                    if (l) {
                        if (l.constructor === l)
                            throw ea('isecfn', m);
                        if (l === Te || l === Ue || Qc && l === Qc)
                            throw ea('isecff', m);
                    }
                    h = l.apply ? l.apply(k, h) : l(h[0], h[1], h[2], h[3], h[4]);
                    return ma(h, e.text);
                };
            },
            arrayDeclaration: function () {
                var a = [], c = !0;
                if (']' !== this.peekToken().text) {
                    do {
                        if (this.peek(']'))
                            break;
                        var d = this.expression();
                        a.push(d);
                        d.constant || (c = !1);
                    } while (this.expect(','));
                }
                this.consume(']');
                return F(function (c, d) {
                    for (var g = [], h = 0; h < a.length; h++)
                        g.push(a[h](c, d));
                    return g;
                }, {
                    literal: !0,
                    constant: c
                });
            },
            object: function () {
                var a = [], c = !0;
                if ('}' !== this.peekToken().text) {
                    do {
                        if (this.peek('}'))
                            break;
                        var d = this.expect(), d = d.string || d.text;
                        this.consume(':');
                        var e = this.expression();
                        a.push({
                            key: d,
                            value: e
                        });
                        e.constant || (c = !1);
                    } while (this.expect(','));
                }
                this.consume('}');
                return F(function (c, d) {
                    for (var e = {}, k = 0; k < a.length; k++) {
                        var l = a[k];
                        e[l.key] = l.value(c, d);
                    }
                    return e;
                }, {
                    literal: !0,
                    constant: c
                });
            }
        };
        var De = {}, Ce = {}, ya = z('$sce'), fa = {
                HTML: 'html',
                CSS: 'css',
                URL: 'url',
                RESOURCE_URL: 'resourceUrl',
                JS: 'js'
            }, X = W.createElement('a'), Hc = wa(V.location.href, !0);
        jc.$inject = ['$provide'];
        Ic.$inject = ['$locale'];
        Kc.$inject = ['$locale'];
        var Nc = '.', Ne = {
                yyyy: Y('FullYear', 4),
                yy: Y('FullYear', 2, 0, !0),
                y: Y('FullYear', 1),
                MMMM: ub('Month'),
                MMM: ub('Month', !0),
                MM: Y('Month', 2, 1),
                M: Y('Month', 1, 1),
                dd: Y('Date', 2),
                d: Y('Date', 1),
                HH: Y('Hours', 2),
                H: Y('Hours', 1),
                hh: Y('Hours', 2, -12),
                h: Y('Hours', 1, -12),
                mm: Y('Minutes', 2),
                m: Y('Minutes', 1),
                ss: Y('Seconds', 2),
                s: Y('Seconds', 1),
                sss: Y('Milliseconds', 3),
                EEEE: ub('Day'),
                EEE: ub('Day', !0),
                a: function (a, c) {
                    return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
                },
                Z: function (a) {
                    a = -1 * a.getTimezoneOffset();
                    return a = (0 <= a ? '+' : '') + (Ub(Math[0 < a ? 'floor' : 'ceil'](a / 60), 2) + Ub(Math.abs(a % 60), 2));
                }
            }, Me = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Le = /^\-?\d+$/;
        Jc.$inject = ['$locale'];
        var Je = Z(A), Ke = Z(Ja);
        Lc.$inject = ['$parse'];
        var dd = Z({
                restrict: 'E',
                compile: function (a, c) {
                    8 >= u && (c.href || c.name || c.$set('href', ''), a.append(W.createComment('IE fix')));
                    if (!c.href && !c.xlinkHref && !c.name)
                        return function (a, c) {
                            var f = '[object SVGAnimatedString]' === Aa.call(c.prop('href')) ? 'xlink:href' : 'href';
                            c.on('click', function (a) {
                                c.attr(f) || a.preventDefault();
                            });
                        };
                }
            }), Eb = {};
        r(qb, function (a, c) {
            if ('multiple' != a) {
                var d = qa('ng-' + c);
                Eb[d] = function () {
                    return {
                        priority: 100,
                        link: function (a, f, g) {
                            a.$watch(g[d], function (a) {
                                g.$set(c, !!a);
                            });
                        }
                    };
                };
            }
        });
        r([
            'src',
            'srcset',
            'href'
        ], function (a) {
            var c = qa('ng-' + a);
            Eb[c] = function () {
                return {
                    priority: 99,
                    link: function (d, e, f) {
                        var g = a, h = a;
                        'href' === a && '[object SVGAnimatedString]' === Aa.call(e.prop('href')) && (h = 'xlinkHref', f.$attr[h] = 'xlink:href', g = null);
                        f.$observe(c, function (c) {
                            c ? (f.$set(h, c), u && g && e.prop(g, f[h])) : 'href' === a && f.$set(h, null);
                        });
                    }
                };
            };
        });
        var xb = {
            $addControl: B,
            $removeControl: B,
            $setValidity: B,
            $setDirty: B,
            $setPristine: B
        };
        Oc.$inject = [
            '$element',
            '$attrs',
            '$scope',
            '$animate'
        ];
        var Rc = function (a) {
                return [
                    '$timeout',
                    function (c) {
                        return {
                            name: 'form',
                            restrict: a ? 'EAC' : 'E',
                            controller: Oc,
                            compile: function () {
                                return {
                                    pre: function (a, e, f, g) {
                                        if (!f.action) {
                                            var h = function (a) {
                                                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                                            };
                                            rb(e[0], 'submit', h);
                                            e.on('$destroy', function () {
                                                c(function () {
                                                    ab(e[0], 'submit', h);
                                                }, 0, !1);
                                            });
                                        }
                                        var k = e.parent().controller('form'), l = f.name || f.ngForm;
                                        l && tb(a, l, g, l);
                                        if (k)
                                            e.on('$destroy', function () {
                                                k.$removeControl(g);
                                                l && tb(a, l, v, l);
                                                F(g, xb);
                                            });
                                    }
                                };
                            }
                        };
                    }
                ];
            }, ed = Rc(), rd = Rc(!0), We = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Xe = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, Ye = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Sc = {
                text: zb,
                number: function (a, c, d, e, f, g) {
                    zb(a, c, d, e, f, g);
                    e.$parsers.push(function (a) {
                        var c = e.$isEmpty(a);
                        if (c || Ye.test(a))
                            return e.$setValidity('number', !0), '' === a ? null : c ? a : parseFloat(a);
                        e.$setValidity('number', !1);
                        return v;
                    });
                    Oe(e, 'number', Ze, null, e.$$validityState);
                    e.$formatters.push(function (a) {
                        return e.$isEmpty(a) ? '' : '' + a;
                    });
                    d.min && (a = function (a) {
                        var c = parseFloat(d.min);
                        return ta(e, 'min', e.$isEmpty(a) || a >= c, a);
                    }, e.$parsers.push(a), e.$formatters.push(a));
                    d.max && (a = function (a) {
                        var c = parseFloat(d.max);
                        return ta(e, 'max', e.$isEmpty(a) || a <= c, a);
                    }, e.$parsers.push(a), e.$formatters.push(a));
                    e.$formatters.push(function (a) {
                        return ta(e, 'number', e.$isEmpty(a) || ib(a), a);
                    });
                },
                url: function (a, c, d, e, f, g) {
                    zb(a, c, d, e, f, g);
                    a = function (a) {
                        return ta(e, 'url', e.$isEmpty(a) || We.test(a), a);
                    };
                    e.$formatters.push(a);
                    e.$parsers.push(a);
                },
                email: function (a, c, d, e, f, g) {
                    zb(a, c, d, e, f, g);
                    a = function (a) {
                        return ta(e, 'email', e.$isEmpty(a) || Xe.test(a), a);
                    };
                    e.$formatters.push(a);
                    e.$parsers.push(a);
                },
                radio: function (a, c, d, e) {
                    H(d.name) && c.attr('name', hb());
                    c.on('click', function () {
                        c[0].checked && a.$apply(function () {
                            e.$setViewValue(d.value);
                        });
                    });
                    e.$render = function () {
                        c[0].checked = d.value == e.$viewValue;
                    };
                    d.$observe('value', e.$render);
                },
                checkbox: function (a, c, d, e) {
                    var f = d.ngTrueValue, g = d.ngFalseValue;
                    E(f) || (f = !0);
                    E(g) || (g = !1);
                    c.on('click', function () {
                        a.$apply(function () {
                            e.$setViewValue(c[0].checked);
                        });
                    });
                    e.$render = function () {
                        c[0].checked = e.$viewValue;
                    };
                    e.$isEmpty = function (a) {
                        return a !== f;
                    };
                    e.$formatters.push(function (a) {
                        return a === f;
                    });
                    e.$parsers.push(function (a) {
                        return a ? f : g;
                    });
                },
                hidden: B,
                button: B,
                submit: B,
                reset: B,
                file: B
            }, Ze = ['badInput'], gc = [
                '$browser',
                '$sniffer',
                function (a, c) {
                    return {
                        restrict: 'E',
                        require: '?ngModel',
                        link: function (d, e, f, g) {
                            g && (Sc[A(f.type)] || Sc.text)(d, e, f, g, c, a);
                        }
                    };
                }
            ], vb = 'ng-valid', wb = 'ng-invalid', Qa = 'ng-pristine', yb = 'ng-dirty', $e = [
                '$scope',
                '$exceptionHandler',
                '$attrs',
                '$element',
                '$parse',
                '$animate',
                function (a, c, d, e, f, g) {
                    function h(a, c) {
                        c = c ? '-' + mb(c, '-') : '';
                        g.removeClass(e, (a ? wb : vb) + c);
                        g.addClass(e, (a ? vb : wb) + c);
                    }
                    this.$modelValue = this.$viewValue = Number.NaN;
                    this.$parsers = [];
                    this.$formatters = [];
                    this.$viewChangeListeners = [];
                    this.$pristine = !0;
                    this.$dirty = !1;
                    this.$valid = !0;
                    this.$invalid = !1;
                    this.$name = d.name;
                    var k = f(d.ngModel), l = k.assign;
                    if (!l)
                        throw z('ngModel')('nonassign', d.ngModel, ia(e));
                    this.$render = B;
                    this.$isEmpty = function (a) {
                        return H(a) || '' === a || null === a || a !== a;
                    };
                    var m = e.inheritedData('$formController') || xb, n = 0, q = this.$error = {};
                    e.addClass(Qa);
                    h(!0);
                    this.$setValidity = function (a, c) {
                        q[a] !== !c && (c ? (q[a] && n--, n || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), this.$invalid = !0, this.$valid = !1, n++), q[a] = !c, h(c, a), m.$setValidity(a, c, this));
                    };
                    this.$setPristine = function () {
                        this.$dirty = !1;
                        this.$pristine = !0;
                        g.removeClass(e, yb);
                        g.addClass(e, Qa);
                    };
                    this.$setViewValue = function (d) {
                        this.$viewValue = d;
                        this.$pristine && (this.$dirty = !0, this.$pristine = !1, g.removeClass(e, Qa), g.addClass(e, yb), m.$setDirty());
                        r(this.$parsers, function (a) {
                            d = a(d);
                        });
                        this.$modelValue !== d && (this.$modelValue = d, l(a, d), r(this.$viewChangeListeners, function (a) {
                            try {
                                a();
                            } catch (d) {
                                c(d);
                            }
                        }));
                    };
                    var p = this;
                    a.$watch(function () {
                        var c = k(a);
                        if (p.$modelValue !== c) {
                            var d = p.$formatters, e = d.length;
                            for (p.$modelValue = c; e--;)
                                c = d[e](c);
                            p.$viewValue !== c && (p.$viewValue = c, p.$render());
                        }
                        return c;
                    });
                }
            ], Gd = function () {
                return {
                    require: [
                        'ngModel',
                        '^?form'
                    ],
                    controller: $e,
                    link: function (a, c, d, e) {
                        var f = e[0], g = e[1] || xb;
                        g.$addControl(f);
                        a.$on('$destroy', function () {
                            g.$removeControl(f);
                        });
                    }
                };
            }, Id = Z({
                require: 'ngModel',
                link: function (a, c, d, e) {
                    e.$viewChangeListeners.push(function () {
                        a.$eval(d.ngChange);
                    });
                }
            }), hc = function () {
                return {
                    require: '?ngModel',
                    link: function (a, c, d, e) {
                        if (e) {
                            d.required = !0;
                            var f = function (a) {
                                if (d.required && e.$isEmpty(a))
                                    e.$setValidity('required', !1);
                                else
                                    return e.$setValidity('required', !0), a;
                            };
                            e.$formatters.push(f);
                            e.$parsers.unshift(f);
                            d.$observe('required', function () {
                                f(e.$viewValue);
                            });
                        }
                    }
                };
            }, Hd = function () {
                return {
                    require: 'ngModel',
                    link: function (a, c, d, e) {
                        var f = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ',';
                        e.$parsers.push(function (a) {
                            if (!H(a)) {
                                var c = [];
                                a && r(a.split(f), function (a) {
                                    a && c.push($(a));
                                });
                                return c;
                            }
                        });
                        e.$formatters.push(function (a) {
                            return M(a) ? a.join(', ') : v;
                        });
                        e.$isEmpty = function (a) {
                            return !a || !a.length;
                        };
                    }
                };
            }, af = /^(true|false|\d+)$/, Jd = function () {
                return {
                    priority: 100,
                    compile: function (a, c) {
                        return af.test(c.ngValue) ? function (a, c, f) {
                            f.$set('value', a.$eval(f.ngValue));
                        } : function (a, c, f) {
                            a.$watch(f.ngValue, function (a) {
                                f.$set('value', a);
                            });
                        };
                    }
                };
            }, jd = za({
                compile: function (a) {
                    a.addClass('ng-binding');
                    return function (a, d, e) {
                        d.data('$binding', e.ngBind);
                        a.$watch(e.ngBind, function (a) {
                            d.text(a == v ? '' : a);
                        });
                    };
                }
            }), ld = [
                '$interpolate',
                function (a) {
                    return function (c, d, e) {
                        c = a(d.attr(e.$attr.ngBindTemplate));
                        d.addClass('ng-binding').data('$binding', c);
                        e.$observe('ngBindTemplate', function (a) {
                            d.text(a);
                        });
                    };
                }
            ], kd = [
                '$sce',
                '$parse',
                function (a, c) {
                    return {
                        compile: function (d) {
                            d.addClass('ng-binding');
                            return function (d, f, g) {
                                f.data('$binding', g.ngBindHtml);
                                var h = c(g.ngBindHtml);
                                d.$watch(function () {
                                    return (h(d) || '').toString();
                                }, function (c) {
                                    f.html(a.getTrustedHtml(h(d)) || '');
                                });
                            };
                        }
                    };
                }
            ], md = Vb('', !0), od = Vb('Odd', 0), nd = Vb('Even', 1), pd = za({
                compile: function (a, c) {
                    c.$set('ngCloak', v);
                    a.removeClass('ng-cloak');
                }
            }), qd = [function () {
                    return {
                        scope: !0,
                        controller: '@',
                        priority: 500
                    };
                }], ic = {}, bf = {
                blur: !0,
                focus: !0
            };
        r('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '), function (a) {
            var c = qa('ng-' + a);
            ic[c] = [
                '$parse',
                '$rootScope',
                function (d, e) {
                    return {
                        compile: function (f, g) {
                            var h = d(g[c], !0);
                            return function (c, d) {
                                d.on(a, function (d) {
                                    var f = function () {
                                        h(c, { $event: d });
                                    };
                                    bf[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f);
                                });
                            };
                        }
                    };
                }
            ];
        });
        var td = [
                '$animate',
                function (a) {
                    return {
                        transclude: 'element',
                        priority: 600,
                        terminal: !0,
                        restrict: 'A',
                        $$tlb: !0,
                        link: function (c, d, e, f, g) {
                            var h, k, l;
                            c.$watch(e.ngIf, function (f) {
                                Va(f) ? k || (k = c.$new(), g(k, function (c) {
                                    c[c.length++] = W.createComment(' end ngIf: ' + e.ngIf + ' ');
                                    h = { clone: c };
                                    a.enter(c, d.parent(), d);
                                })) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = Db(h.clone), a.leave(l, function () {
                                    l = null;
                                }), h = null));
                            });
                        }
                    };
                }
            ], ud = [
                '$http',
                '$templateCache',
                '$anchorScroll',
                '$animate',
                '$sce',
                function (a, c, d, e, f) {
                    return {
                        restrict: 'ECA',
                        priority: 400,
                        terminal: !0,
                        transclude: 'element',
                        controller: Wa.noop,
                        compile: function (g, h) {
                            var k = h.ngInclude || h.src, l = h.onload || '', m = h.autoscroll;
                            return function (g, h, p, r, K) {
                                var w = 0, t, x, u, y = function () {
                                        x && (x.remove(), x = null);
                                        t && (t.$destroy(), t = null);
                                        u && (e.leave(u, function () {
                                            x = null;
                                        }), x = u, u = null);
                                    };
                                g.$watch(f.parseAsResourceUrl(k), function (f) {
                                    var k = function () {
                                            !G(m) || m && !g.$eval(m) || d();
                                        }, p = ++w;
                                    f ? (a.get(f, { cache: c }).success(function (a) {
                                        if (p === w) {
                                            var c = g.$new();
                                            r.template = a;
                                            a = K(c, function (a) {
                                                y();
                                                e.enter(a, null, h, k);
                                            });
                                            t = c;
                                            u = a;
                                            t.$emit('$includeContentLoaded');
                                            g.$eval(l);
                                        }
                                    }).error(function () {
                                        p === w && y();
                                    }), g.$emit('$includeContentRequested')) : (y(), r.template = null);
                                });
                            };
                        }
                    };
                }
            ], Kd = [
                '$compile',
                function (a) {
                    return {
                        restrict: 'ECA',
                        priority: -400,
                        require: 'ngInclude',
                        link: function (c, d, e, f) {
                            d.html(f.template);
                            a(d.contents())(c);
                        }
                    };
                }
            ], vd = za({
                priority: 450,
                compile: function () {
                    return {
                        pre: function (a, c, d) {
                            a.$eval(d.ngInit);
                        }
                    };
                }
            }), wd = za({
                terminal: !0,
                priority: 1000
            }), xd = [
                '$locale',
                '$interpolate',
                function (a, c) {
                    var d = /{}/g;
                    return {
                        restrict: 'EA',
                        link: function (e, f, g) {
                            var h = g.count, k = g.$attr.when && f.attr(g.$attr.when), l = g.offset || 0, m = e.$eval(k) || {}, n = {}, q = c.startSymbol(), p = c.endSymbol(), s = /^when(Minus)?(.+)$/;
                            r(g, function (a, c) {
                                s.test(c) && (m[A(c.replace('when', '').replace('Minus', '-'))] = f.attr(g.$attr[c]));
                            });
                            r(m, function (a, e) {
                                n[e] = c(a.replace(d, q + h + '-' + l + p));
                            });
                            e.$watch(function () {
                                var c = parseFloat(e.$eval(h));
                                if (isNaN(c))
                                    return '';
                                c in m || (c = a.pluralCat(c - l));
                                return n[c](e, f, !0);
                            }, function (a) {
                                f.text(a);
                            });
                        }
                    };
                }
            ], yd = [
                '$parse',
                '$animate',
                function (a, c) {
                    var d = z('ngRepeat');
                    return {
                        transclude: 'element',
                        priority: 1000,
                        terminal: !0,
                        $$tlb: !0,
                        link: function (e, f, g, h, k) {
                            var l = g.ngRepeat, m = l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), n, q, p, s, u, v, t = { $id: La };
                            if (!m)
                                throw d('iexp', l);
                            g = m[1];
                            h = m[2];
                            (m = m[3]) ? (n = a(m), q = function (a, c, d) {
                                v && (t[v] = a);
                                t[u] = c;
                                t.$index = d;
                                return n(e, t);
                            }) : (p = function (a, c) {
                                return La(c);
                            }, s = function (a) {
                                return a;
                            });
                            m = g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                            if (!m)
                                throw d('iidexp', g);
                            u = m[3] || m[1];
                            v = m[2];
                            var x = {};
                            e.$watchCollection(h, function (a) {
                                var g, h, m = f[0], n, t = {}, G, C, J, A, E, B, z, H = [];
                                if (Ra(a))
                                    B = a, E = q || p;
                                else {
                                    E = q || s;
                                    B = [];
                                    for (J in a)
                                        a.hasOwnProperty(J) && '$' != J.charAt(0) && B.push(J);
                                    B.sort();
                                }
                                G = B.length;
                                h = H.length = B.length;
                                for (g = 0; g < h; g++)
                                    if (J = a === B ? g : B[g], A = a[J], n = E(J, A, g), Da(n, '`track by` id'), x.hasOwnProperty(n))
                                        z = x[n], delete x[n], t[n] = z, H[g] = z;
                                    else {
                                        if (t.hasOwnProperty(n))
                                            throw r(H, function (a) {
                                                a && a.scope && (x[a.id] = a);
                                            }), d('dupes', l, n, oa(A));
                                        H[g] = { id: n };
                                        t[n] = !1;
                                    }
                                for (J in x)
                                    x.hasOwnProperty(J) && (z = x[J], g = Db(z.clone), c.leave(g), r(g, function (a) {
                                        a.$$NG_REMOVED = !0;
                                    }), z.scope.$destroy());
                                g = 0;
                                for (h = B.length; g < h; g++) {
                                    J = a === B ? g : B[g];
                                    A = a[J];
                                    z = H[g];
                                    H[g - 1] && (m = H[g - 1].clone[H[g - 1].clone.length - 1]);
                                    if (z.scope) {
                                        C = z.scope;
                                        n = m;
                                        do
                                            n = n.nextSibling;
                                        while (n && n.$$NG_REMOVED);
                                        z.clone[0] != n && c.move(Db(z.clone), null, D(m));
                                        m = z.clone[z.clone.length - 1];
                                    } else
                                        C = e.$new();
                                    C[u] = A;
                                    v && (C[v] = J);
                                    C.$index = g;
                                    C.$first = 0 === g;
                                    C.$last = g === G - 1;
                                    C.$middle = !(C.$first || C.$last);
                                    C.$odd = !(C.$even = 0 === (g & 1));
                                    z.scope || k(C, function (a) {
                                        a[a.length++] = W.createComment(' end ngRepeat: ' + l + ' ');
                                        c.enter(a, null, D(m));
                                        m = a;
                                        z.scope = C;
                                        z.clone = a;
                                        t[z.id] = z;
                                    });
                                }
                                x = t;
                            });
                        }
                    };
                }
            ], zd = [
                '$animate',
                function (a) {
                    return function (c, d, e) {
                        c.$watch(e.ngShow, function (c) {
                            a[Va(c) ? 'removeClass' : 'addClass'](d, 'ng-hide');
                        });
                    };
                }
            ], sd = [
                '$animate',
                function (a) {
                    return function (c, d, e) {
                        c.$watch(e.ngHide, function (c) {
                            a[Va(c) ? 'addClass' : 'removeClass'](d, 'ng-hide');
                        });
                    };
                }
            ], Ad = za(function (a, c, d) {
                a.$watch(d.ngStyle, function (a, d) {
                    d && a !== d && r(d, function (a, d) {
                        c.css(d, '');
                    });
                    a && c.css(a);
                }, !0);
            }), Bd = [
                '$animate',
                function (a) {
                    return {
                        restrict: 'EA',
                        require: 'ngSwitch',
                        controller: [
                            '$scope',
                            function () {
                                this.cases = {};
                            }
                        ],
                        link: function (c, d, e, f) {
                            var g = [], h = [], k = [], l = [];
                            c.$watch(e.ngSwitch || e.on, function (d) {
                                var n, q;
                                n = 0;
                                for (q = k.length; n < q; ++n)
                                    k[n].remove();
                                n = k.length = 0;
                                for (q = l.length; n < q; ++n) {
                                    var p = h[n];
                                    l[n].$destroy();
                                    k[n] = p;
                                    a.leave(p, function () {
                                        k.splice(n, 1);
                                    });
                                }
                                h.length = 0;
                                l.length = 0;
                                if (g = f.cases['!' + d] || f.cases['?'])
                                    c.$eval(e.change), r(g, function (d) {
                                        var e = c.$new();
                                        l.push(e);
                                        d.transclude(e, function (c) {
                                            var e = d.element;
                                            h.push(c);
                                            a.enter(c, e.parent(), e);
                                        });
                                    });
                            });
                        }
                    };
                }
            ], Cd = za({
                transclude: 'element',
                priority: 800,
                require: '^ngSwitch',
                link: function (a, c, d, e, f) {
                    e.cases['!' + d.ngSwitchWhen] = e.cases['!' + d.ngSwitchWhen] || [];
                    e.cases['!' + d.ngSwitchWhen].push({
                        transclude: f,
                        element: c
                    });
                }
            }), Dd = za({
                transclude: 'element',
                priority: 800,
                require: '^ngSwitch',
                link: function (a, c, d, e, f) {
                    e.cases['?'] = e.cases['?'] || [];
                    e.cases['?'].push({
                        transclude: f,
                        element: c
                    });
                }
            }), Fd = za({
                link: function (a, c, d, e, f) {
                    if (!f)
                        throw z('ngTransclude')('orphan', ia(c));
                    f(function (a) {
                        c.empty();
                        c.append(a);
                    });
                }
            }), fd = [
                '$templateCache',
                function (a) {
                    return {
                        restrict: 'E',
                        terminal: !0,
                        compile: function (c, d) {
                            'text/ng-template' == d.type && a.put(d.id, c[0].text);
                        }
                    };
                }
            ], cf = z('ngOptions'), Ed = Z({ terminal: !0 }), gd = [
                '$compile',
                '$parse',
                function (a, c) {
                    var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = { $setViewValue: B };
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
                            function (a, c, d) {
                                var k = this, l = {}, m = e, n;
                                k.databound = d.ngModel;
                                k.init = function (a, c, d) {
                                    m = a;
                                    n = d;
                                };
                                k.addOption = function (c) {
                                    Da(c, '"option value"');
                                    l[c] = !0;
                                    m.$viewValue == c && (a.val(c), n.parent() && n.remove());
                                };
                                k.removeOption = function (a) {
                                    this.hasOption(a) && (delete l[a], m.$viewValue == a && this.renderUnknownOption(a));
                                };
                                k.renderUnknownOption = function (c) {
                                    c = '? ' + La(c) + ' ?';
                                    n.val(c);
                                    a.prepend(n);
                                    a.val(c);
                                    n.prop('selected', !0);
                                };
                                k.hasOption = function (a) {
                                    return l.hasOwnProperty(a);
                                };
                                c.$on('$destroy', function () {
                                    k.renderUnknownOption = B;
                                });
                            }
                        ],
                        link: function (e, g, h, k) {
                            function l(a, c, d, e) {
                                d.$render = function () {
                                    var a = d.$viewValue;
                                    e.hasOption(a) ? (B.parent() && B.remove(), c.val(a), '' === a && A.prop('selected', !0)) : H(a) && A ? c.val('') : e.renderUnknownOption(a);
                                };
                                c.on('change', function () {
                                    a.$apply(function () {
                                        B.parent() && B.remove();
                                        d.$setViewValue(c.val());
                                    });
                                });
                            }
                            function m(a, c, d) {
                                var e;
                                d.$render = function () {
                                    var a = new cb(d.$viewValue);
                                    r(c.find('option'), function (c) {
                                        c.selected = G(a.get(c.value));
                                    });
                                };
                                a.$watch(function () {
                                    Ba(e, d.$viewValue) || (e = ha(d.$viewValue), d.$render());
                                });
                                c.on('change', function () {
                                    a.$apply(function () {
                                        var a = [];
                                        r(c.find('option'), function (c) {
                                            c.selected && a.push(c.value);
                                        });
                                        d.$setViewValue(a);
                                    });
                                });
                            }
                            function n(e, f, g) {
                                function h() {
                                    var a = { '': [] }, c = [''], d, k, s, v, w;
                                    s = g.$modelValue;
                                    v = B(e) || [];
                                    var E = n ? Wb(v) : v, H, R, C;
                                    R = {};
                                    C = !1;
                                    if (p)
                                        if (k = g.$modelValue, y && M(k))
                                            for (C = new cb([]), d = {}, w = 0; w < k.length; w++)
                                                d[m] = k[w], C.put(y(e, d), k[w]);
                                        else
                                            C = new cb(k);
                                    w = C;
                                    var F, L;
                                    for (C = 0; H = E.length, C < H; C++) {
                                        k = C;
                                        if (n) {
                                            k = E[C];
                                            if ('$' === k.charAt(0))
                                                continue;
                                            R[n] = k;
                                        }
                                        R[m] = v[k];
                                        d = r(e, R) || '';
                                        (k = a[d]) || (k = a[d] = [], c.push(d));
                                        p ? d = G(w.remove(y ? y(e, R) : A(e, R))) : (y ? (d = {}, d[m] = s, d = y(e, d) === y(e, R)) : d = s === A(e, R), w = w || d);
                                        F = l(e, R);
                                        F = G(F) ? F : '';
                                        k.push({
                                            id: y ? y(e, R) : n ? E[C] : C,
                                            label: F,
                                            selected: d
                                        });
                                    }
                                    p || (z || null === s ? a[''].unshift({
                                        id: '',
                                        label: '',
                                        selected: !w
                                    }) : w || a[''].unshift({
                                        id: '?',
                                        label: '',
                                        selected: !0
                                    }));
                                    R = 0;
                                    for (E = c.length; R < E; R++) {
                                        d = c[R];
                                        k = a[d];
                                        D.length <= R ? (s = {
                                            element: x.clone().attr('label', d),
                                            label: k.label
                                        }, v = [s], D.push(v), f.append(s.element)) : (v = D[R], s = v[0], s.label != d && s.element.attr('label', s.label = d));
                                        F = null;
                                        C = 0;
                                        for (H = k.length; C < H; C++)
                                            d = k[C], (w = v[C + 1]) ? (F = w.element, w.label !== d.label && (F.text(w.label = d.label), F.prop('label', w.label)), w.id !== d.id && F.val(w.id = d.id), F[0].selected !== d.selected && (F.prop('selected', w.selected = d.selected), u && F.prop('selected', w.selected))) : ('' === d.id && z ? L = z : (L = t.clone()).val(d.id).prop('selected', d.selected).attr('selected', d.selected).prop('label', d.label).text(d.label), v.push({
                                                element: L,
                                                label: d.label,
                                                id: d.id,
                                                selected: d.selected
                                            }), q.addOption(d.label, L), F ? F.after(L) : s.element.append(L), F = L);
                                        for (C++; v.length > C;)
                                            d = v.pop(), q.removeOption(d.label), d.element.remove();
                                    }
                                    for (; D.length > R;)
                                        D.pop()[0].element.remove();
                                }
                                var k;
                                if (!(k = s.match(d)))
                                    throw cf('iexp', s, ia(f));
                                var l = c(k[2] || k[1]), m = k[4] || k[6], n = k[5], r = c(k[3] || ''), A = c(k[2] ? k[1] : m), B = c(k[7]), y = k[8] ? c(k[8]) : null, D = [[{
                                                element: f,
                                                label: ''
                                            }]];
                                z && (a(z)(e), z.removeClass('ng-scope'), z.remove());
                                f.empty();
                                f.on('change', function () {
                                    e.$apply(function () {
                                        var a, c = B(e) || [], d = {}, k, l, q, r, s, t, u;
                                        if (p)
                                            for (l = [], r = 0, t = D.length; r < t; r++)
                                                for (a = D[r], q = 1, s = a.length; q < s; q++) {
                                                    if ((k = a[q].element)[0].selected) {
                                                        k = k.val();
                                                        n && (d[n] = k);
                                                        if (y)
                                                            for (u = 0; u < c.length && (d[m] = c[u], y(e, d) != k); u++);
                                                        else
                                                            d[m] = c[k];
                                                        l.push(A(e, d));
                                                    }
                                                }
                                        else if (k = f.val(), '?' == k)
                                            l = v;
                                        else if ('' === k)
                                            l = null;
                                        else if (y)
                                            for (u = 0; u < c.length; u++) {
                                                if (d[m] = c[u], y(e, d) == k) {
                                                    l = A(e, d);
                                                    break;
                                                }
                                            }
                                        else
                                            d[m] = c[k], n && (d[n] = k), l = A(e, d);
                                        g.$setViewValue(l);
                                        h();
                                    });
                                });
                                g.$render = h;
                                e.$watchCollection(B, h);
                                e.$watchCollection(function () {
                                    var a = {}, c = B(e);
                                    if (c) {
                                        for (var d = Array(c.length), f = 0, g = c.length; f < g; f++)
                                            a[m] = c[f], d[f] = l(e, a);
                                        return d;
                                    }
                                }, h);
                                p && e.$watchCollection(function () {
                                    return g.$modelValue;
                                }, h);
                            }
                            if (k[1]) {
                                var q = k[0];
                                k = k[1];
                                var p = h.multiple, s = h.ngOptions, z = !1, A, t = D(W.createElement('option')), x = D(W.createElement('optgroup')), B = t.clone();
                                h = 0;
                                for (var y = g.children(), E = y.length; h < E; h++)
                                    if ('' === y[h].value) {
                                        A = z = y.eq(h);
                                        break;
                                    }
                                q.init(k, z, B);
                                p && (k.$isEmpty = function (a) {
                                    return !a || 0 === a.length;
                                });
                                s ? n(e, g, k) : p ? m(e, g, k) : l(e, g, k, q);
                            }
                        }
                    };
                }
            ], id = [
                '$interpolate',
                function (a) {
                    var c = {
                        addOption: B,
                        removeOption: B
                    };
                    return {
                        restrict: 'E',
                        priority: 100,
                        compile: function (d, e) {
                            if (H(e.value)) {
                                var f = a(d.text(), !0);
                                f || e.$set('value', d.text());
                            }
                            return function (a, d, e) {
                                var l = d.parent(), m = l.data('$selectController') || l.parent().data('$selectController');
                                m && m.databound ? d.prop('selected', !1) : m = c;
                                f ? a.$watch(f, function (a, c) {
                                    e.$set('value', a);
                                    a !== c && m.removeOption(c);
                                    m.addOption(a);
                                }) : m.addOption(e.value);
                                d.on('$destroy', function () {
                                    m.removeOption(e.value);
                                });
                            };
                        }
                    };
                }
            ], hd = Z({
                restrict: 'E',
                terminal: !0
            });
        V.angular.bootstrap ? console.log('WARNING: Tried to load angular more than once.') : ((Ea = V.jQuery) && Ea.fn.on ? (D = Ea, F(Ea.fn, {
            scope: Ma.scope,
            isolateScope: Ma.isolateScope,
            controller: Ma.controller,
            injector: Ma.injector,
            inheritedData: Ma.inheritedData
        }), Fb('remove', !0, !0, !1), Fb('empty', !1, !1, !1), Fb('html', !1, !1, !0)) : D = S, Wa.element = D, $c(Wa), D(W).ready(function () {
            Xc(W, cc);
        }));
    }(window, document));
    !window.angular.$$csp() && window.angular.element(document).find('head').prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
    return angular;
});
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
define('bootstrap', ['jquery'], function () {
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
define('ui-bootstrap-tpls', [
    'angular',
    'bootstrap'
], function () {
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
    return;
});
define('angular-ui-router', ['angular'], function () {
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
    return;
});
require.config({
    paths: {
        'rcss': '../bower_components/require-css/css.min',
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min'
    },
    shim: {
        'angular': { exports: 'angular' },
        'bootstrap': { deps: ['jquery'] },
        'ui-bootstrap-tpls': {
            deps: [
                'angular',
                'bootstrap'
            ]
        },
        'angular-ui-router': { deps: ['angular'] }
    }
});
define('app', [
    'rcss',
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'angular-ui-router'
], function () {
    'use strict';
});