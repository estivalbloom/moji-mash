const Dt = {}, _e = [];
function p(e, t) {
  if (Array.isArray(e)) {
    for (const n of e)
      p(n, t);
    return;
  }
  if (typeof e == "object") {
    for (const n in e)
      p(n, e[n]);
    return;
  }
  be(Object.getOwnPropertyNames(t)), Dt[e] = Object.assign(Dt[e] || {}, t);
}
function E(e) {
  return Dt[e] || {};
}
function Ke() {
  return [...new Set(_e)];
}
function be(e) {
  _e.push(...e);
}
function Vt(e, t) {
  let n;
  const i = e.length, s = [];
  for (n = 0; n < i; n++)
    s.push(t(e[n]));
  return s;
}
function tn(e, t) {
  let n;
  const i = e.length, s = [];
  for (n = 0; n < i; n++)
    t(e[n]) && s.push(e[n]);
  return s;
}
function jt(e) {
  return e % 360 * Math.PI / 180;
}
function en(e) {
  return e.replace(/([A-Z])/g, function(t, n) {
    return "-" + n.toLowerCase();
  });
}
function xe(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function it(e, t, n, i) {
  return (t == null || n == null) && (i = i || e.bbox(), t == null ? t = i.width / i.height * n : n == null && (n = i.height / i.width * t)), {
    width: t,
    height: n
  };
}
function Pt(e, t) {
  const n = e.origin;
  let i = e.ox != null ? e.ox : e.originX != null ? e.originX : "center", s = e.oy != null ? e.oy : e.originY != null ? e.originY : "center";
  n != null && ([i, s] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
  const r = typeof i == "string", o = typeof s == "string";
  if (r || o) {
    const { height: h, width: u, x: a, y: c } = t.bbox();
    r && (i = i.includes("left") ? a : i.includes("right") ? a + u : a + u / 2), o && (s = s.includes("top") ? c : s.includes("bottom") ? c + h : c + h / 2);
  }
  return [i, s];
}
const nn = /* @__PURE__ */ new Set(["desc", "metadata", "title"]), Rt = (e) => nn.has(e.nodeName), ve = (e, t, n = {}) => {
  const i = { ...t };
  for (const s in i)
    i[s].valueOf() === n[s] && delete i[s];
  Object.keys(i).length ? e.node.setAttribute("data-svgjs", JSON.stringify(i)) : (e.node.removeAttribute("data-svgjs"), e.node.removeAttribute("svgjs:data"));
}, Qt = "http://www.w3.org/2000/svg", sn = "http://www.w3.org/1999/xhtml", Ct = "http://www.w3.org/2000/xmlns/", ft = "http://www.w3.org/1999/xlink", g = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
function rn() {
  return g.window;
}
class Wt {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const Q = {}, Jt = "___SYMBOL___ROOT___";
function ut(e, t = Qt) {
  return g.document.createElementNS(t, e);
}
function C(e, t = !1) {
  if (e instanceof Wt) return e;
  if (typeof e == "object")
    return Et(e);
  if (e == null)
    return new Q[Jt]();
  if (typeof e == "string" && e.charAt(0) !== "<")
    return Et(g.document.querySelector(e));
  const n = t ? g.document.createElement("div") : ut("svg");
  return n.innerHTML = e, e = Et(n.firstChild), n.removeChild(n.firstChild), e;
}
function T(e, t) {
  return t && (t instanceof g.window.Node || t.ownerDocument && t instanceof t.ownerDocument.defaultView.Node) ? t : ut(e);
}
function D(e) {
  if (!e) return null;
  if (e.instance instanceof Wt) return e.instance;
  if (e.nodeName === "#document-fragment")
    return new Q.Fragment(e);
  let t = xe(e.nodeName || "Dom");
  return t === "LinearGradient" || t === "RadialGradient" ? t = "Gradient" : Q[t] || (t = "Dom"), new Q[t](e);
}
let Et = D;
function y(e, t = e.name, n = !1) {
  return Q[t] = e, n && (Q[Jt] = e), be(Object.getOwnPropertyNames(e.prototype)), e;
}
function on(e) {
  return Q[e];
}
let hn = 1e3;
function Te(e) {
  return "Svgjs" + xe(e) + hn++;
}
function Se(e) {
  for (let t = e.children.length - 1; t >= 0; t--)
    Se(e.children[t]);
  return e.id && (e.id = Te(e.nodeName)), e;
}
function m(e, t) {
  let n, i;
  for (e = Array.isArray(e) ? e : [e], i = e.length - 1; i >= 0; i--)
    for (n in t)
      e[i].prototype[n] = t[n];
}
function v(e) {
  return function(...t) {
    const n = t[t.length - 1];
    return n && n.constructor === Object && !(n instanceof Array) ? e.apply(this, t.slice(0, -1)).attr(n) : e.apply(this, t);
  };
}
function un() {
  return this.parent().children();
}
function an() {
  return this.parent().index(this);
}
function cn() {
  return this.siblings()[this.position() + 1];
}
function ln() {
  return this.siblings()[this.position() - 1];
}
function fn() {
  const e = this.position();
  return this.parent().add(this.remove(), e + 1), this;
}
function dn() {
  const e = this.position();
  return this.parent().add(this.remove(), e ? e - 1 : 0), this;
}
function pn() {
  return this.parent().add(this.remove()), this;
}
function mn() {
  return this.parent().add(this.remove(), 0), this;
}
function gn(e) {
  e = C(e), e.remove();
  const t = this.position();
  return this.parent().add(e, t), this;
}
function yn(e) {
  e = C(e), e.remove();
  const t = this.position();
  return this.parent().add(e, t + 1), this;
}
function wn(e) {
  return e = C(e), e.before(this), this;
}
function _n(e) {
  return e = C(e), e.after(this), this;
}
p("Dom", {
  siblings: un,
  position: an,
  next: cn,
  prev: ln,
  forward: fn,
  backward: dn,
  front: pn,
  back: mn,
  before: gn,
  after: yn,
  insertBefore: wn,
  insertAfter: _n
});
const Ae = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, bn = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, xn = /rgb\((\d+),(\d+),(\d+)\)/, vn = /(#[a-z_][a-z0-9\-_]*)/i, Tn = /\)\s*,?\s*/, Sn = /\s/g, de = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, pe = /^rgb\(/, me = /^(\s+)?$/, ge = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, An = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, F = /[\s,]+/, Zt = /[MLHVCSQTAZ]/i;
function kn() {
  const e = this.attr("class");
  return e == null ? [] : e.trim().split(F);
}
function Mn(e) {
  return this.classes().indexOf(e) !== -1;
}
function On(e) {
  if (!this.hasClass(e)) {
    const t = this.classes();
    t.push(e), this.attr("class", t.join(" "));
  }
  return this;
}
function jn(e) {
  return this.hasClass(e) && this.attr(
    "class",
    this.classes().filter(function(t) {
      return t !== e;
    }).join(" ")
  ), this;
}
function Cn(e) {
  return this.hasClass(e) ? this.removeClass(e) : this.addClass(e);
}
p("Dom", {
  classes: kn,
  hasClass: Mn,
  addClass: On,
  removeClass: jn,
  toggleClass: Cn
});
function En(e, t) {
  const n = {};
  if (arguments.length === 0)
    return this.node.style.cssText.split(/\s*;\s*/).filter(function(i) {
      return !!i.length;
    }).forEach(function(i) {
      const s = i.split(/\s*:\s*/);
      n[s[0]] = s[1];
    }), n;
  if (arguments.length < 2) {
    if (Array.isArray(e)) {
      for (const i of e) {
        const s = i;
        n[i] = this.node.style.getPropertyValue(s);
      }
      return n;
    }
    if (typeof e == "string")
      return this.node.style.getPropertyValue(e);
    if (typeof e == "object")
      for (const i in e)
        this.node.style.setProperty(
          i,
          e[i] == null || me.test(e[i]) ? "" : e[i]
        );
  }
  return arguments.length === 2 && this.node.style.setProperty(
    e,
    t == null || me.test(t) ? "" : t
  ), this;
}
function Nn() {
  return this.css("display", "");
}
function In() {
  return this.css("display", "none");
}
function zn() {
  return this.css("display") !== "none";
}
p("Dom", {
  css: En,
  show: Nn,
  hide: In,
  visible: zn
});
function Dn(e, t, n) {
  if (e == null)
    return this.data(
      Vt(
        tn(
          this.node.attributes,
          (i) => i.nodeName.indexOf("data-") === 0
        ),
        (i) => i.nodeName.slice(5)
      )
    );
  if (e instanceof Array) {
    const i = {};
    for (const s of e)
      i[s] = this.data(s);
    return i;
  } else if (typeof e == "object")
    for (t in e)
      this.data(t, e[t]);
  else if (arguments.length < 2)
    try {
      return JSON.parse(this.attr("data-" + e));
    } catch {
      return this.attr("data-" + e);
    }
  else
    this.attr(
      "data-" + e,
      t === null ? null : n === !0 || typeof t == "string" || typeof t == "number" ? t : JSON.stringify(t)
    );
  return this;
}
p("Dom", { data: Dn });
function Pn(e, t) {
  if (typeof arguments[0] == "object")
    for (const n in e)
      this.remember(n, e[n]);
  else {
    if (arguments.length === 1)
      return this.memory()[e];
    this.memory()[e] = t;
  }
  return this;
}
function Rn() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let e = arguments.length - 1; e >= 0; e--)
      delete this.memory()[arguments[e]];
  return this;
}
function Ln() {
  return this._memory = this._memory || {};
}
p("Dom", { remember: Pn, forget: Rn, memory: Ln });
function qn(e) {
  return e.length === 4 ? [
    "#",
    e.substring(1, 2),
    e.substring(1, 2),
    e.substring(2, 3),
    e.substring(2, 3),
    e.substring(3, 4),
    e.substring(3, 4)
  ].join("") : e;
}
function Fn(e) {
  const t = Math.round(e), i = Math.max(0, Math.min(255, t)).toString(16);
  return i.length === 1 ? "0" + i : i;
}
function Z(e, t) {
  for (let n = t.length; n--; )
    if (e[t[n]] == null)
      return !1;
  return !0;
}
function $n(e, t) {
  const n = Z(e, "rgb") ? { _a: e.r, _b: e.g, _c: e.b, _d: 0, space: "rgb" } : Z(e, "xyz") ? { _a: e.x, _b: e.y, _c: e.z, _d: 0, space: "xyz" } : Z(e, "hsl") ? { _a: e.h, _b: e.s, _c: e.l, _d: 0, space: "hsl" } : Z(e, "lab") ? { _a: e.l, _b: e.a, _c: e.b, _d: 0, space: "lab" } : Z(e, "lch") ? { _a: e.l, _b: e.c, _c: e.h, _d: 0, space: "lch" } : Z(e, "cmyk") ? { _a: e.c, _b: e.m, _c: e.y, _d: e.k, space: "cmyk" } : { _a: 0, _b: 0, _c: 0, space: "rgb" };
  return n.space = t || n.space, n;
}
function Yn(e) {
  return e === "lab" || e === "xyz" || e === "lch";
}
function Nt(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
class b {
  constructor(...t) {
    this.init(...t);
  }
  // Test if given value is a color
  static isColor(t) {
    return t && (t instanceof b || this.isRgb(t) || this.test(t));
  }
  // Test if given value is an rgb object
  static isRgb(t) {
    return t && typeof t.r == "number" && typeof t.g == "number" && typeof t.b == "number";
  }
  /*
  Generating random colors
  */
  static random(t = "vibrant", n) {
    const { random: i, round: s, sin: r, PI: o } = Math;
    if (t === "vibrant") {
      const h = 24 * i() + 57, u = 38 * i() + 45, a = 360 * i();
      return new b(h, u, a, "lch");
    } else if (t === "sine") {
      n = n ?? i();
      const h = s(80 * r(2 * o * n / 0.5 + 0.01) + 150), u = s(50 * r(2 * o * n / 0.5 + 4.6) + 200), a = s(100 * r(2 * o * n / 0.5 + 2.3) + 150);
      return new b(h, u, a);
    } else if (t === "pastel") {
      const h = 8 * i() + 86, u = 17 * i() + 9, a = 360 * i();
      return new b(h, u, a, "lch");
    } else if (t === "dark") {
      const h = 10 + 10 * i(), u = 50 * i() + 86, a = 360 * i();
      return new b(h, u, a, "lch");
    } else if (t === "rgb") {
      const h = 255 * i(), u = 255 * i(), a = 255 * i();
      return new b(h, u, a);
    } else if (t === "lab") {
      const h = 100 * i(), u = 256 * i() - 128, a = 256 * i() - 128;
      return new b(h, u, a, "lab");
    } else if (t === "grey") {
      const h = 255 * i();
      return new b(h, h, h);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(t) {
    return typeof t == "string" && (de.test(t) || pe.test(t));
  }
  cmyk() {
    const { _a: t, _b: n, _c: i } = this.rgb(), [s, r, o] = [t, n, i].map((w) => w / 255), h = Math.min(1 - s, 1 - r, 1 - o);
    if (h === 1)
      return new b(0, 0, 0, 1, "cmyk");
    const u = (1 - s - h) / (1 - h), a = (1 - r - h) / (1 - h), c = (1 - o - h) / (1 - h);
    return new b(u, a, c, h, "cmyk");
  }
  hsl() {
    const { _a: t, _b: n, _c: i } = this.rgb(), [s, r, o] = [t, n, i].map((k) => k / 255), h = Math.max(s, r, o), u = Math.min(s, r, o), a = (h + u) / 2, c = h === u, l = h - u, w = c ? 0 : a > 0.5 ? l / (2 - h - u) : l / (h + u), x = c ? 0 : h === s ? ((r - o) / l + (r < o ? 6 : 0)) / 6 : h === r ? ((o - s) / l + 2) / 6 : h === o ? ((s - r) / l + 4) / 6 : 0;
    return new b(360 * x, 100 * w, 100 * a, "hsl");
  }
  init(t = 0, n = 0, i = 0, s = 0, r = "rgb") {
    if (t = t || 0, this.space)
      for (const l in this.space)
        delete this[this.space[l]];
    if (typeof t == "number")
      r = typeof s == "string" ? s : r, s = typeof s == "string" ? 0 : s, Object.assign(this, { _a: t, _b: n, _c: i, _d: s, space: r });
    else if (t instanceof Array)
      this.space = n || (typeof t[3] == "string" ? t[3] : t[4]) || "rgb", Object.assign(this, { _a: t[0], _b: t[1], _c: t[2], _d: t[3] || 0 });
    else if (t instanceof Object) {
      const l = $n(t, n);
      Object.assign(this, l);
    } else if (typeof t == "string")
      if (pe.test(t)) {
        const l = t.replace(Sn, ""), [w, x, A] = xn.exec(l).slice(1, 4).map((k) => parseInt(k));
        Object.assign(this, { _a: w, _b: x, _c: A, _d: 0, space: "rgb" });
      } else if (de.test(t)) {
        const l = (k) => parseInt(k, 16), [, w, x, A] = bn.exec(qn(t)).map(l);
        Object.assign(this, { _a: w, _b: x, _c: A, _d: 0, space: "rgb" });
      } else throw Error("Unsupported string format, can't construct Color");
    const { _a: o, _b: h, _c: u, _d: a } = this, c = this.space === "rgb" ? { r: o, g: h, b: u } : this.space === "xyz" ? { x: o, y: h, z: u } : this.space === "hsl" ? { h: o, s: h, l: u } : this.space === "lab" ? { l: o, a: h, b: u } : this.space === "lch" ? { l: o, c: h, h: u } : this.space === "cmyk" ? { c: o, m: h, y: u, k: a } : {};
    Object.assign(this, c);
  }
  lab() {
    const { x: t, y: n, z: i } = this.xyz(), s = 116 * n - 16, r = 500 * (t - n), o = 200 * (n - i);
    return new b(s, r, o, "lab");
  }
  lch() {
    const { l: t, a: n, b: i } = this.lab(), s = Math.sqrt(n ** 2 + i ** 2);
    let r = 180 * Math.atan2(i, n) / Math.PI;
    return r < 0 && (r *= -1, r = 360 - r), new b(t, s, r, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (Yn(this.space)) {
      let { x: t, y: n, z: i } = this;
      if (this.space === "lab" || this.space === "lch") {
        let { l: x, a: A, b: k } = this;
        if (this.space === "lch") {
          const { c: U, h: wt } = this, _t = Math.PI / 180;
          A = U * Math.cos(_t * wt), k = U * Math.sin(_t * wt);
        }
        const S = (x + 16) / 116, O = A / 500 + S, P = S - k / 200, R = 16 / 116, $ = 8856e-6, Y = 7.787;
        t = 0.95047 * (O ** 3 > $ ? O ** 3 : (O - R) / Y), n = 1 * (S ** 3 > $ ? S ** 3 : (S - R) / Y), i = 1.08883 * (P ** 3 > $ ? P ** 3 : (P - R) / Y);
      }
      const s = t * 3.2406 + n * -1.5372 + i * -0.4986, r = t * -0.9689 + n * 1.8758 + i * 0.0415, o = t * 0.0557 + n * -0.204 + i * 1.057, h = Math.pow, u = 31308e-7, a = s > u ? 1.055 * h(s, 1 / 2.4) - 0.055 : 12.92 * s, c = r > u ? 1.055 * h(r, 1 / 2.4) - 0.055 : 12.92 * r, l = o > u ? 1.055 * h(o, 1 / 2.4) - 0.055 : 12.92 * o;
      return new b(255 * a, 255 * c, 255 * l);
    } else if (this.space === "hsl") {
      let { h: t, s: n, l: i } = this;
      if (t /= 360, n /= 100, i /= 100, n === 0)
        return i *= 255, new b(i, i, i);
      const s = i < 0.5 ? i * (1 + n) : i + n - i * n, r = 2 * i - s, o = 255 * Nt(r, s, t + 1 / 3), h = 255 * Nt(r, s, t), u = 255 * Nt(r, s, t - 1 / 3);
      return new b(o, h, u);
    } else if (this.space === "cmyk") {
      const { c: t, m: n, y: i, k: s } = this, r = 255 * (1 - Math.min(1, t * (1 - s) + s)), o = 255 * (1 - Math.min(1, n * (1 - s) + s)), h = 255 * (1 - Math.min(1, i * (1 - s) + s));
      return new b(r, o, h);
    } else
      return this;
  }
  toArray() {
    const { _a: t, _b: n, _c: i, _d: s, space: r } = this;
    return [t, n, i, s, r];
  }
  toHex() {
    const [t, n, i] = this._clamped().map(Fn);
    return `#${t}${n}${i}`;
  }
  toRgb() {
    const [t, n, i] = this._clamped();
    return `rgb(${t},${n},${i})`;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const { _a: t, _b: n, _c: i } = this.rgb(), [s, r, o] = [t, n, i].map((O) => O / 255), h = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92, u = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, a = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, c = (h * 0.4124 + u * 0.3576 + a * 0.1805) / 0.95047, l = (h * 0.2126 + u * 0.7152 + a * 0.0722) / 1, w = (h * 0.0193 + u * 0.1192 + a * 0.9505) / 1.08883, x = c > 8856e-6 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116, A = l > 8856e-6 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, k = w > 8856e-6 ? Math.pow(w, 1 / 3) : 7.787 * w + 16 / 116;
    return new b(x, A, k, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const { _a: t, _b: n, _c: i } = this.rgb(), { max: s, min: r, round: o } = Math, h = (u) => s(0, r(o(u), 255));
    return [t, n, i].map(h);
  }
  /*
  Constructing colors
  */
}
class M {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  // Clone point
  clone() {
    return new M(this);
  }
  init(t, n) {
    const i = { x: 0, y: 0 }, s = Array.isArray(t) ? { x: t[0], y: t[1] } : typeof t == "object" ? { x: t.x, y: t.y } : { x: t, y: n };
    return this.x = s.x == null ? i.x : s.x, this.y = s.y == null ? i.y : s.y, this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(t) {
    return this.clone().transformO(t);
  }
  // Transform point with matrix
  transformO(t) {
    f.isMatrixLike(t) || (t = new f(t));
    const { x: n, y: i } = this;
    return this.x = t.a * n + t.c * i + t.e, this.y = t.b * n + t.d * i + t.f, this;
  }
}
function Bn(e, t) {
  return new M(e, t).transformO(this.screenCTM().inverseO());
}
function K(e, t, n) {
  return Math.abs(t - e) < 1e-6;
}
class f {
  constructor(...t) {
    this.init(...t);
  }
  static formatTransforms(t) {
    const n = t.flip === "both" || t.flip === !0, i = t.flip && (n || t.flip === "x") ? -1 : 1, s = t.flip && (n || t.flip === "y") ? -1 : 1, r = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0, o = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0, h = t.scale && t.scale.length ? t.scale[0] * i : isFinite(t.scale) ? t.scale * i : isFinite(t.scaleX) ? t.scaleX * i : i, u = t.scale && t.scale.length ? t.scale[1] * s : isFinite(t.scale) ? t.scale * s : isFinite(t.scaleY) ? t.scaleY * s : s, a = t.shear || 0, c = t.rotate || t.theta || 0, l = new M(
      t.origin || t.around || t.ox || t.originX,
      t.oy || t.originY
    ), w = l.x, x = l.y, A = new M(
      t.position || t.px || t.positionX || NaN,
      t.py || t.positionY || NaN
    ), k = A.x, S = A.y, O = new M(
      t.translate || t.tx || t.translateX,
      t.ty || t.translateY
    ), P = O.x, R = O.y, $ = new M(
      t.relative || t.rx || t.relativeX,
      t.ry || t.relativeY
    ), Y = $.x, U = $.y;
    return {
      scaleX: h,
      scaleY: u,
      skewX: r,
      skewY: o,
      shear: a,
      theta: c,
      rx: Y,
      ry: U,
      tx: P,
      ty: R,
      ox: w,
      oy: x,
      px: k,
      py: S
    };
  }
  static fromArray(t) {
    return { a: t[0], b: t[1], c: t[2], d: t[3], e: t[4], f: t[5] };
  }
  static isMatrixLike(t) {
    return t.a != null || t.b != null || t.c != null || t.d != null || t.e != null || t.f != null;
  }
  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(t, n, i) {
    const s = t.a * n.a + t.c * n.b, r = t.b * n.a + t.d * n.b, o = t.a * n.c + t.c * n.d, h = t.b * n.c + t.d * n.d, u = t.e + t.a * n.e + t.c * n.f, a = t.f + t.b * n.e + t.d * n.f;
    return i.a = s, i.b = r, i.c = o, i.d = h, i.e = u, i.f = a, i;
  }
  around(t, n, i) {
    return this.clone().aroundO(t, n, i);
  }
  // Transform around a center point
  aroundO(t, n, i) {
    const s = t || 0, r = n || 0;
    return this.translateO(-s, -r).lmultiplyO(i).translateO(s, r);
  }
  // Clones this matrix
  clone() {
    return new f(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(t = 0, n = 0) {
    const i = this.a, s = this.b, r = this.c, o = this.d, h = this.e, u = this.f, a = i * o - s * r, c = a > 0 ? 1 : -1, l = c * Math.sqrt(i * i + s * s), w = Math.atan2(c * s, c * i), x = 180 / Math.PI * w, A = Math.cos(w), k = Math.sin(w), S = (i * r + s * o) / a, O = r * l / (S * i - s) || o * l / (S * s + i), P = h - t + t * A * l + n * (S * A * l - k * O), R = u - n + t * k * l + n * (S * k * l + A * O);
    return {
      // Return the affine parameters
      scaleX: l,
      scaleY: O,
      shear: S,
      rotate: x,
      translateX: P,
      translateY: R,
      originX: t,
      originY: n,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
  // Check if two matrices are equal
  equals(t) {
    if (t === this) return !0;
    const n = new f(t);
    return K(this.a, n.a) && K(this.b, n.b) && K(this.c, n.c) && K(this.d, n.d) && K(this.e, n.e) && K(this.f, n.f);
  }
  // Flip matrix on x or y, at a given offset
  flip(t, n) {
    return this.clone().flipO(t, n);
  }
  flipO(t, n) {
    return t === "x" ? this.scaleO(-1, 1, n, 0) : t === "y" ? this.scaleO(1, -1, 0, n) : this.scaleO(-1, -1, t, n || t);
  }
  // Initialize
  init(t) {
    const n = f.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof q ? t.matrixify() : typeof t == "string" ? f.fromArray(t.split(F).map(parseFloat)) : Array.isArray(t) ? f.fromArray(t) : typeof t == "object" && f.isMatrixLike(t) ? t : typeof t == "object" ? new f().transform(t) : arguments.length === 6 ? f.fromArray([].slice.call(arguments)) : n, this.a = t.a != null ? t.a : n.a, this.b = t.b != null ? t.b : n.b, this.c = t.c != null ? t.c : n.c, this.d = t.d != null ? t.d : n.d, this.e = t.e != null ? t.e : n.e, this.f = t.f != null ? t.f : n.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const t = this.a, n = this.b, i = this.c, s = this.d, r = this.e, o = this.f, h = t * s - n * i;
    if (!h) throw new Error("Cannot invert " + this);
    const u = s / h, a = -n / h, c = -i / h, l = t / h, w = -(u * r + c * o), x = -(a * r + l * o);
    return this.a = u, this.b = a, this.c = c, this.d = l, this.e = w, this.f = x, this;
  }
  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }
  lmultiplyO(t) {
    const n = this, i = t instanceof f ? t : new f(t);
    return f.matrixMultiply(i, n, this);
  }
  // Left multiplies by the given matrix
  multiply(t) {
    return this.clone().multiplyO(t);
  }
  multiplyO(t) {
    const n = this, i = t instanceof f ? t : new f(t);
    return f.matrixMultiply(n, i, this);
  }
  // Rotate matrix
  rotate(t, n, i) {
    return this.clone().rotateO(t, n, i);
  }
  rotateO(t, n = 0, i = 0) {
    t = jt(t);
    const s = Math.cos(t), r = Math.sin(t), { a: o, b: h, c: u, d: a, e: c, f: l } = this;
    return this.a = o * s - h * r, this.b = h * s + o * r, this.c = u * s - a * r, this.d = a * s + u * r, this.e = c * s - l * r + i * r - n * s + n, this.f = l * s + c * r - n * r - i * s + i, this;
  }
  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(t, n = t, i = 0, s = 0) {
    arguments.length === 3 && (s = i, i = n, n = t);
    const { a: r, b: o, c: h, d: u, e: a, f: c } = this;
    return this.a = r * t, this.b = o * n, this.c = h * t, this.d = u * n, this.e = a * t - i * t + i, this.f = c * n - s * n + s, this;
  }
  // Shear matrix
  shear(t, n, i) {
    return this.clone().shearO(t, n, i);
  }
  // eslint-disable-next-line no-unused-vars
  shearO(t, n = 0, i = 0) {
    const { a: s, b: r, c: o, d: h, e: u, f: a } = this;
    return this.a = s + r * t, this.c = o + h * t, this.e = u + a * t - i * t, this;
  }
  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(t, n = t, i = 0, s = 0) {
    arguments.length === 3 && (s = i, i = n, n = t), t = jt(t), n = jt(n);
    const r = Math.tan(t), o = Math.tan(n), { a: h, b: u, c: a, d: c, e: l, f: w } = this;
    return this.a = h + u * r, this.b = u + h * o, this.c = a + c * r, this.d = c + a * o, this.e = l + w * r - s * r, this.f = w + l * o - i * o, this;
  }
  // SkewX
  skewX(t, n, i) {
    return this.skew(t, 0, n, i);
  }
  // SkewY
  skewY(t, n, i) {
    return this.skew(0, t, n, i);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
  // Convert matrix to string
  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }
  // Transform a matrix into another matrix by manipulating the space
  transform(t) {
    if (f.isMatrixLike(t))
      return new f(t).multiplyO(this);
    const n = f.formatTransforms(t), i = this, { x: s, y: r } = new M(n.ox, n.oy).transform(i), o = new f().translateO(n.rx, n.ry).lmultiplyO(i).translateO(-s, -r).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(s, r);
    if (isFinite(n.px) || isFinite(n.py)) {
      const h = new M(s, r).transform(o), u = isFinite(n.px) ? n.px - h.x : 0, a = isFinite(n.py) ? n.py - h.y : 0;
      o.translateO(u, a);
    }
    return o.translateO(n.tx, n.ty), o;
  }
  // Translate matrix
  translate(t, n) {
    return this.clone().translateO(t, n);
  }
  translateO(t, n) {
    return this.e += t || 0, this.f += n || 0, this;
  }
  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
}
function Hn() {
  return new f(this.node.getCTM());
}
function Xn() {
  try {
    if (typeof this.isRoot == "function" && !this.isRoot()) {
      const e = this.rect(1, 1), t = e.node.getScreenCTM();
      return e.remove(), new f(t);
    }
    return new f(this.node.getScreenCTM());
  } catch {
    return console.warn(
      `Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`
    ), new f();
  }
}
y(f, "Matrix");
function B() {
  if (!B.nodes) {
    const e = C().size(2, 0);
    e.node.style.cssText = [
      "opacity: 0",
      "position: absolute",
      "left: -100%",
      "top: -100%",
      "overflow: hidden"
    ].join(";"), e.attr("focusable", "false"), e.attr("aria-hidden", "true");
    const t = e.path().node;
    B.nodes = { svg: e, path: t };
  }
  if (!B.nodes.svg.node.parentNode) {
    const e = g.document.body || g.document.documentElement;
    B.nodes.svg.addTo(e);
  }
  return B.nodes;
}
function ke(e) {
  return !e.width && !e.height && !e.x && !e.y;
}
function Un(e) {
  return e === g.document || (g.document.documentElement.contains || function(t) {
    for (; t.parentNode; )
      t = t.parentNode;
    return t === g.document;
  }).call(g.document.documentElement, e);
}
class j {
  constructor(...t) {
    this.init(...t);
  }
  addOffset() {
    return this.x += g.window.pageXOffset, this.y += g.window.pageYOffset, new j(this);
  }
  init(t) {
    const n = [0, 0, 0, 0];
    return t = typeof t == "string" ? t.split(F).map(parseFloat) : Array.isArray(t) ? t : typeof t == "object" ? [
      t.left != null ? t.left : t.x,
      t.top != null ? t.top : t.y,
      t.width,
      t.height
    ] : arguments.length === 4 ? [].slice.call(arguments) : n, this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return ke(this);
  }
  // Merge rect box with another, return a new instance
  merge(t) {
    const n = Math.min(this.x, t.x), i = Math.min(this.y, t.y), s = Math.max(this.x + this.width, t.x + t.width) - n, r = Math.max(this.y + this.height, t.y + t.height) - i;
    return new j(n, i, s, r);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(t) {
    t instanceof f || (t = new f(t));
    let n = 1 / 0, i = -1 / 0, s = 1 / 0, r = -1 / 0;
    return [
      new M(this.x, this.y),
      new M(this.x2, this.y),
      new M(this.x, this.y2),
      new M(this.x2, this.y2)
    ].forEach(function(h) {
      h = h.transform(t), n = Math.min(n, h.x), i = Math.max(i, h.x), s = Math.min(s, h.y), r = Math.max(r, h.y);
    }), new j(n, s, i - n, r - s);
  }
}
function Me(e, t, n) {
  let i;
  try {
    if (i = t(e.node), ke(i) && !Un(e.node))
      throw new Error("Element not in the dom");
  } catch {
    i = n(e);
  }
  return i;
}
function Gn() {
  const n = Me(this, (s) => s.getBBox(), (s) => {
    try {
      const r = s.clone().addTo(B().svg).show(), o = r.node.getBBox();
      return r.remove(), o;
    } catch (r) {
      throw new Error(
        `Getting bbox of element "${s.node.nodeName}" is not possible: ${r.toString()}`
      );
    }
  });
  return new j(n);
}
function Vn(e) {
  const i = Me(this, (r) => r.getBoundingClientRect(), (r) => {
    throw new Error(
      `Getting rbox of element "${r.node.nodeName}" is not possible`
    );
  }), s = new j(i);
  return e ? s.transform(e.screenCTM().inverseO()) : s.addOffset();
}
function Qn(e, t) {
  const n = this.bbox();
  return e > n.x && t > n.y && e < n.x + n.width && t < n.y + n.height;
}
p({
  viewbox: {
    viewbox(e, t, n, i) {
      return e == null ? new j(this.attr("viewBox")) : this.attr("viewBox", new j(e, t, n, i));
    },
    zoom(e, t) {
      let { width: n, height: i } = this.attr(["width", "height"]);
      if ((!n && !i || typeof n == "string" || typeof i == "string") && (n = this.node.clientWidth, i = this.node.clientHeight), !n || !i)
        throw new Error(
          "Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element"
        );
      const s = this.viewbox(), r = n / s.width, o = i / s.height, h = Math.min(r, o);
      if (e == null)
        return h;
      let u = h / e;
      u === 1 / 0 && (u = Number.MAX_SAFE_INTEGER / 100), t = t || new M(n / 2 / r + s.x, i / 2 / o + s.y);
      const a = new j(s).transform(
        new f({ scale: u, origin: t })
      );
      return this.viewbox(a);
    }
  }
});
y(j, "Box");
class W extends Array {
  constructor(t = [], ...n) {
    if (super(t, ...n), typeof t == "number") return this;
    this.length = 0, this.push(...t);
  }
}
m([W], {
  each(e, ...t) {
    return typeof e == "function" ? this.map((n, i, s) => e.call(n, n, i, s)) : this.map((n) => n[e](...t));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const Wn = ["toArray", "constructor", "each"];
W.extend = function(e) {
  e = e.reduce((t, n) => (Wn.includes(n) || n[0] === "_" || (n in Array.prototype && (t["$" + n] = Array.prototype[n]), t[n] = function(...i) {
    return this.each(n, ...i);
  }), t), {}), m([W], e);
};
function st(e, t) {
  return new W(
    Vt((t || g.document).querySelectorAll(e), function(n) {
      return D(n);
    })
  );
}
function Jn(e) {
  return st(e, this.node);
}
function Zn(e) {
  return D(this.node.querySelector(e));
}
let Kn = 0;
const Oe = {};
function je(e) {
  let t = e.getEventHolder();
  return t === g.window && (t = Oe), t.events || (t.events = {}), t.events;
}
function Kt(e) {
  return e.getEventTarget();
}
function ti(e) {
  let t = e.getEventHolder();
  t === g.window && (t = Oe), t.events && (t.events = {});
}
function Lt(e, t, n, i, s) {
  const r = n.bind(i || e), o = C(e), h = je(o), u = Kt(o);
  t = Array.isArray(t) ? t : t.split(F), n._svgjsListenerId || (n._svgjsListenerId = ++Kn), t.forEach(function(a) {
    const c = a.split(".")[0], l = a.split(".")[1] || "*";
    h[c] = h[c] || {}, h[c][l] = h[c][l] || {}, h[c][l][n._svgjsListenerId] = r, u.addEventListener(c, r, s || !1);
  });
}
function tt(e, t, n, i) {
  const s = C(e), r = je(s), o = Kt(s);
  typeof n == "function" && (n = n._svgjsListenerId, !n) || (t = Array.isArray(t) ? t : (t || "").split(F), t.forEach(function(h) {
    const u = h && h.split(".")[0], a = h && h.split(".")[1];
    let c, l;
    if (n)
      r[u] && r[u][a || "*"] && (o.removeEventListener(
        u,
        r[u][a || "*"][n],
        i || !1
      ), delete r[u][a || "*"][n]);
    else if (u && a) {
      if (r[u] && r[u][a]) {
        for (l in r[u][a])
          tt(o, [u, a].join("."), l);
        delete r[u][a];
      }
    } else if (a)
      for (h in r)
        for (c in r[h])
          a === c && tt(o, [h, a].join("."));
    else if (u) {
      if (r[u]) {
        for (c in r[u])
          tt(o, [u, c].join("."));
        delete r[u];
      }
    } else {
      for (h in r)
        tt(o, h);
      ti(s);
    }
  }));
}
function ei(e, t, n, i) {
  const s = Kt(e);
  return t instanceof g.window.Event || (t = new g.window.CustomEvent(t, {
    detail: n,
    cancelable: !0,
    ...i
  })), s.dispatchEvent(t), t;
}
class dt extends Wt {
  addEventListener() {
  }
  dispatch(t, n, i) {
    return ei(this, t, n, i);
  }
  dispatchEvent(t) {
    const n = this.getEventHolder().events;
    if (!n) return !0;
    const i = n[t.type];
    for (const s in i)
      for (const r in i[s])
        i[s][r](t);
    return !t.defaultPrevented;
  }
  // Fire given event
  fire(t, n, i) {
    return this.dispatch(t, n, i), this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(t, n, i) {
    return tt(this, t, n, i), this;
  }
  // Bind given event to listener
  on(t, n, i, s) {
    return Lt(this, t, n, i, s), this;
  }
  removeEventListener() {
  }
}
y(dt, "EventTarget");
function ye() {
}
const ht = {
  duration: 400,
  ease: ">",
  delay: 0
}, ni = {
  // fill and stroke
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  // text
  "text-anchor": "start"
};
class nt extends Array {
  constructor(...t) {
    super(...t), this.init(...t);
  }
  clone() {
    return new this.constructor(this);
  }
  init(t) {
    return typeof t == "number" ? this : (this.length = 0, this.push(...this.parse(t)), this);
  }
  // Parse whitespace separated string
  parse(t = []) {
    return t instanceof Array ? t : t.trim().split(F).map(parseFloat);
  }
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
  toSet() {
    return new Set(this);
  }
  toString() {
    return this.join(" ");
  }
  // Flattens the array if needed
  valueOf() {
    const t = [];
    return t.push(...this), t;
  }
}
class d {
  // Initialize
  constructor(...t) {
    this.init(...t);
  }
  convert(t) {
    return new d(this.value, t);
  }
  // Divide number
  divide(t) {
    return t = new d(t), new d(this / t, this.unit || t.unit);
  }
  init(t, n) {
    return n = Array.isArray(t) ? t[1] : n, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = n || "", typeof t == "number" ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : typeof t == "string" ? (n = t.match(Ae), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : t instanceof d && (this.value = t.valueOf(), this.unit = t.unit), this;
  }
  // Subtract number
  minus(t) {
    return t = new d(t), new d(this - t, this.unit || t.unit);
  }
  // Add number
  plus(t) {
    return t = new d(t), new d(this + t, this.unit || t.unit);
  }
  // Multiply number
  times(t) {
    return t = new d(t), new d(this * t, this.unit || t.unit);
  }
  toArray() {
    return [this.value, this.unit];
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (this.unit === "%" ? ~~(this.value * 1e8) / 1e6 : this.unit === "s" ? this.value / 1e3 : this.value) + this.unit;
  }
  valueOf() {
    return this.value;
  }
}
const ii = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "color",
  "bgcolor",
  "stop-color",
  "flood-color",
  "lighting-color"
]), Ce = [];
function si(e) {
  Ce.push(e);
}
function ri(e, t, n) {
  if (e == null) {
    e = {}, t = this.node.attributes;
    for (const i of t)
      e[i.nodeName] = ge.test(i.nodeValue) ? parseFloat(i.nodeValue) : i.nodeValue;
    return e;
  } else {
    if (e instanceof Array)
      return e.reduce((i, s) => (i[s] = this.attr(s), i), {});
    if (typeof e == "object" && e.constructor === Object)
      for (t in e) this.attr(t, e[t]);
    else if (t === null)
      this.node.removeAttribute(e);
    else {
      if (t == null)
        return t = this.node.getAttribute(e), t == null ? ni[e] : ge.test(t) ? parseFloat(t) : t;
      t = Ce.reduce((i, s) => s(e, i, this), t), typeof t == "number" ? t = new d(t) : ii.has(e) && b.isColor(t) ? t = new b(t) : t.constructor === Array && (t = new nt(t)), e === "leading" ? this.leading && this.leading(t) : typeof n == "string" ? this.node.setAttributeNS(n, e, t.toString()) : this.node.setAttribute(e, t.toString()), this.rebuild && (e === "font-size" || e === "x") && this.rebuild();
    }
  }
  return this;
}
class H extends dt {
  constructor(t, n) {
    super(), this.node = t, this.type = t.nodeName, n && t !== n && this.attr(n);
  }
  // Add given element at a position
  add(t, n) {
    return t = C(t), t.removeNamespace && this.node instanceof g.window.SVGElement && t.removeNamespace(), n == null ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[n] && this.node.insertBefore(t.node, this.node.childNodes[n]), this;
  }
  // Add element to given container and return self
  addTo(t, n) {
    return C(t).put(this, n);
  }
  // Returns all child elements
  children() {
    return new W(
      Vt(this.node.children, function(t) {
        return D(t);
      })
    );
  }
  // Remove all elements in this container
  clear() {
    for (; this.node.hasChildNodes(); )
      this.node.removeChild(this.node.lastChild);
    return this;
  }
  // Clone element
  clone(t = !0, n = !0) {
    this.writeDataToDom();
    let i = this.node.cloneNode(t);
    return n && (i = Se(i)), new this.constructor(i);
  }
  // Iterates over all children and invokes a given block
  each(t, n) {
    const i = this.children();
    let s, r;
    for (s = 0, r = i.length; s < r; s++)
      t.apply(i[s], [s, i]), n && i[s].each(t, n);
    return this;
  }
  element(t, n) {
    return this.put(new H(ut(t), n));
  }
  // Get first child
  first() {
    return D(this.node.firstChild);
  }
  // Get a element at the given index
  get(t) {
    return D(this.node.childNodes[t]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }
  // Checks if the given element is a child
  has(t) {
    return this.index(t) >= 0;
  }
  html(t, n) {
    return this.xml(t, n, sn);
  }
  // Get / set id
  id(t) {
    return typeof t > "u" && !this.node.id && (this.node.id = Te(this.type)), this.attr("id", t);
  }
  // Gets index of given element
  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }
  // Get the last child
  last() {
    return D(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(t) {
    const n = this.node, i = n.matches || n.matchesSelector || n.msMatchesSelector || n.mozMatchesSelector || n.webkitMatchesSelector || n.oMatchesSelector || null;
    return i && i.call(n, t);
  }
  // Returns the parent element instance
  parent(t) {
    let n = this;
    if (!n.node.parentNode) return null;
    if (n = D(n.node.parentNode), !t) return n;
    do
      if (typeof t == "string" ? n.matches(t) : n instanceof t)
        return n;
    while (n = D(n.node.parentNode));
    return n;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(t, n) {
    return t = C(t), this.add(t, n), t;
  }
  // Add element to given container and return container
  putIn(t, n) {
    return C(t).add(this, n);
  }
  // Remove element
  remove() {
    return this.parent() && this.parent().removeElement(this), this;
  }
  // Remove a given child
  removeElement(t) {
    return this.node.removeChild(t.node), this;
  }
  // Replace this with element
  replace(t) {
    return t = C(t), this.node.parentNode && this.node.parentNode.replaceChild(t.node, this.node), t;
  }
  round(t = 2, n = null) {
    const i = 10 ** t, s = this.attr(n);
    for (const r in s)
      typeof s[r] == "number" && (s[r] = Math.round(s[r] * i) / i);
    return this.attr(s), this;
  }
  // Import / Export raw svg
  svg(t, n) {
    return this.xml(t, n, Qt);
  }
  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(t) {
    return this.node.textContent = t, this;
  }
  wrap(t) {
    const n = this.parent();
    if (!n)
      return this.addTo(t);
    const i = n.index(this);
    return n.put(t, i).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return this.each(function() {
      this.writeDataToDom();
    }), this;
  }
  // Import / Export raw svg
  xml(t, n, i) {
    if (typeof t == "boolean" && (i = n, n = t, t = null), t == null || typeof t == "function") {
      n = n ?? !0, this.writeDataToDom();
      let h = this;
      if (t != null) {
        if (h = D(h.node.cloneNode(!0)), n) {
          const u = t(h);
          if (h = u || h, u === !1) return "";
        }
        h.each(function() {
          const u = t(this), a = u || this;
          u === !1 ? this.remove() : u && this !== a && this.replace(a);
        }, !0);
      }
      return n ? h.node.outerHTML : h.node.innerHTML;
    }
    n = n ?? !1;
    const s = ut("wrapper", i), r = g.document.createDocumentFragment();
    s.innerHTML = t;
    for (let h = s.children.length; h--; )
      r.appendChild(s.firstElementChild);
    const o = this.parent();
    return n ? this.replace(r) && o : this.add(r);
  }
}
m(H, { attr: ri, find: Jn, findOne: Zn });
y(H, "Dom");
class q extends H {
  constructor(t, n) {
    super(t, n), this.dom = {}, this.node.instance = this, (t.hasAttribute("data-svgjs") || t.hasAttribute("svgjs:data")) && this.setData(
      JSON.parse(t.getAttribute("data-svgjs")) ?? JSON.parse(t.getAttribute("svgjs:data")) ?? {}
    );
  }
  // Move element by its center
  center(t, n) {
    return this.cx(t).cy(n);
  }
  // Move by center over x-axis
  cx(t) {
    return t == null ? this.x() + this.width() / 2 : this.x(t - this.width() / 2);
  }
  // Move by center over y-axis
  cy(t) {
    return t == null ? this.y() + this.height() / 2 : this.y(t - this.height() / 2);
  }
  // Get defs
  defs() {
    const t = this.root();
    return t && t.defs();
  }
  // Relative move over x and y axes
  dmove(t, n) {
    return this.dx(t).dy(n);
  }
  // Relative move over x axis
  dx(t = 0) {
    return this.x(new d(t).plus(this.x()));
  }
  // Relative move over y axis
  dy(t = 0) {
    return this.y(new d(t).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }
  // Set height of element
  height(t) {
    return this.attr("height", t);
  }
  // Move element to given x and y values
  move(t, n) {
    return this.x(t).y(n);
  }
  // return array of all ancestors of given type up to the root svg
  parents(t = this.root()) {
    const n = typeof t == "string";
    n || (t = C(t));
    const i = new W();
    let s = this;
    for (; (s = s.parent()) && s.node !== g.document && s.nodeName !== "#document-fragment" && (i.push(s), !(!n && s.node === t.node || n && s.matches(t))); )
      if (s.node === this.root().node)
        return null;
    return i;
  }
  // Get referenced element form attribute value
  reference(t) {
    if (t = this.attr(t), !t) return null;
    const n = (t + "").match(vn);
    return n ? C(n[1]) : null;
  }
  // Get parent document
  root() {
    const t = this.parent(on(Jt));
    return t && t.root();
  }
  // set given data to the elements data property
  setData(t) {
    return this.dom = t, this;
  }
  // Set element size to given width and height
  size(t, n) {
    const i = it(this, t, n);
    return this.width(new d(i.width)).height(new d(i.height));
  }
  // Set width of element
  width(t) {
    return this.attr("width", t);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return ve(this, this.dom), super.writeDataToDom();
  }
  // Move over x-axis
  x(t) {
    return this.attr("x", t);
  }
  // Move over y-axis
  y(t) {
    return this.attr("y", t);
  }
}
m(q, {
  bbox: Gn,
  rbox: Vn,
  inside: Qn,
  point: Bn,
  ctm: Hn,
  screenCTM: Xn
});
y(q, "Element");
const ot = {
  stroke: [
    "color",
    "width",
    "opacity",
    "linecap",
    "linejoin",
    "miterlimit",
    "dasharray",
    "dashoffset"
  ],
  fill: ["color", "opacity", "rule"],
  prefix: function(e, t) {
    return t === "color" ? e : e + "-" + t;
  }
};
["fill", "stroke"].forEach(function(e) {
  const t = {};
  let n;
  t[e] = function(i) {
    if (typeof i > "u")
      return this.attr(e);
    if (typeof i == "string" || i instanceof b || b.isRgb(i) || i instanceof q)
      this.attr(e, i);
    else
      for (n = ot[e].length - 1; n >= 0; n--)
        i[ot[e][n]] != null && this.attr(ot.prefix(e, ot[e][n]), i[ot[e][n]]);
    return this;
  }, p(["Element", "Runner"], t);
});
p(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(e, t, n, i, s, r) {
    return e == null ? new f(this) : this.attr("transform", new f(e, t, n, i, s, r));
  },
  // Map rotation to transform
  rotate: function(e, t, n) {
    return this.transform({ rotate: e, ox: t, oy: n }, !0);
  },
  // Map skew to transform
  skew: function(e, t, n, i) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ skew: e, ox: t, oy: n }, !0) : this.transform({ skew: [e, t], ox: n, oy: i }, !0);
  },
  shear: function(e, t, n) {
    return this.transform({ shear: e, ox: t, oy: n }, !0);
  },
  // Map scale to transform
  scale: function(e, t, n, i) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({ scale: e, ox: t, oy: n }, !0) : this.transform({ scale: [e, t], ox: n, oy: i }, !0);
  },
  // Map translate to transform
  translate: function(e, t) {
    return this.transform({ translate: [e, t] }, !0);
  },
  // Map relative translations to transform
  relative: function(e, t) {
    return this.transform({ relative: [e, t] }, !0);
  },
  // Map flip to transform
  flip: function(e = "both", t = "center") {
    return "xybothtrue".indexOf(e) === -1 && (t = e, e = "both"), this.transform({ flip: e, origin: t }, !0);
  },
  // Opacity
  opacity: function(e) {
    return this.attr("opacity", e);
  }
});
p("radius", {
  // Add x and y radius
  radius: function(e, t = e) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new d(e)) : this.rx(e).ry(t);
  }
});
p("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(e) {
    return new M(this.node.getPointAtLength(e));
  }
});
p(["Element", "Runner"], {
  // Set font
  font: function(e, t) {
    if (typeof e == "object") {
      for (t in e) this.font(t, e[t]);
      return this;
    }
    return e === "leading" ? this.leading(t) : e === "anchor" ? this.attr("text-anchor", t) : e === "size" || e === "family" || e === "weight" || e === "stretch" || e === "variant" || e === "style" ? this.attr("font-" + e, t) : this.attr(e, t);
  }
});
const oi = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseover",
  "mouseout",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "touchstart",
  "touchmove",
  "touchleave",
  "touchend",
  "touchcancel",
  "contextmenu",
  "wheel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel"
].reduce(function(e, t) {
  const n = function(i) {
    return i === null ? this.off(t) : this.on(t, i), this;
  };
  return e[t] = n, e;
}, {});
p("Element", oi);
function hi() {
  return this.attr("transform", null);
}
function ui() {
  return (this.attr("transform") || "").split(Tn).slice(0, -1).map(function(t) {
    const n = t.trim().split("(");
    return [
      n[0],
      n[1].split(F).map(function(i) {
        return parseFloat(i);
      })
    ];
  }).reverse().reduce(function(t, n) {
    return n[0] === "matrix" ? t.lmultiply(f.fromArray(n[1])) : t[n[0]].apply(t, n[1]);
  }, new f());
}
function ai(e, t) {
  if (this === e) return this;
  if (Rt(this.node)) return this.addTo(e, t);
  const n = this.screenCTM(), i = e.screenCTM().inverse();
  return this.addTo(e, t).untransform().transform(i.multiply(n)), this;
}
function ci(e) {
  return this.toParent(this.root(), e);
}
function li(e, t) {
  if (e == null || typeof e == "string") {
    const s = new f(this).decompose();
    return e == null ? s : s[e];
  }
  f.isMatrixLike(e) || (e = { ...e, origin: Pt(e, this) });
  const n = t === !0 ? this : t || !1, i = new f(n).transform(e);
  return this.attr("transform", i);
}
p("Element", {
  untransform: hi,
  matrixify: ui,
  toParent: ai,
  toRoot: ci,
  transform: li
});
class N extends q {
  flatten() {
    return this.each(function() {
      if (this instanceof N)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(t = this.parent(), n = t.index(this)) {
    return n = n === -1 ? t.children().length : n, this.each(function(i, s) {
      return s[s.length - i - 1].toParent(t, n);
    }), this.remove();
  }
}
y(N, "Container");
class te extends N {
  constructor(t, n = t) {
    super(T("defs", t), n);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
y(te, "Defs");
class z extends q {
}
y(z, "Shape");
function ee(e) {
  return this.attr("rx", e);
}
function ne(e) {
  return this.attr("ry", e);
}
function Ee(e) {
  return e == null ? this.cx() - this.rx() : this.cx(e + this.rx());
}
function Ne(e) {
  return e == null ? this.cy() - this.ry() : this.cy(e + this.ry());
}
function Ie(e) {
  return this.attr("cx", e);
}
function ze(e) {
  return this.attr("cy", e);
}
function De(e) {
  return e == null ? this.rx() * 2 : this.rx(new d(e).divide(2));
}
function Pe(e) {
  return e == null ? this.ry() * 2 : this.ry(new d(e).divide(2));
}
const fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cx: Ie,
  cy: ze,
  height: Pe,
  rx: ee,
  ry: ne,
  width: De,
  x: Ee,
  y: Ne
}, Symbol.toStringTag, { value: "Module" }));
class At extends z {
  constructor(t, n = t) {
    super(T("ellipse", t), n);
  }
  size(t, n) {
    const i = it(this, t, n);
    return this.rx(new d(i.width).divide(2)).ry(
      new d(i.height).divide(2)
    );
  }
}
m(At, fi);
p("Container", {
  // Create an ellipse
  ellipse: v(function(e = 0, t = e) {
    return this.put(new At()).size(e, t).move(0, 0);
  })
});
y(At, "Ellipse");
class Re extends H {
  constructor(t = g.document.createDocumentFragment()) {
    super(t);
  }
  // Import / Export raw xml
  xml(t, n, i) {
    if (typeof t == "boolean" && (i = n, n = t, t = null), t == null || typeof t == "function") {
      const s = new H(ut("wrapper", i));
      return s.add(this.node.cloneNode(!0)), s.xml(!1, i);
    }
    return super.xml(t, !1, i);
  }
}
y(Re, "Fragment");
function Le(e, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ fx: new d(e), fy: new d(t) }) : this.attr({ x1: new d(e), y1: new d(t) });
}
function qe(e, t) {
  return (this._element || this).type === "radialGradient" ? this.attr({ cx: new d(e), cy: new d(t) }) : this.attr({ x2: new d(e), y2: new d(t) });
}
const di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  from: Le,
  to: qe
}, Symbol.toStringTag, { value: "Module" }));
class pt extends N {
  constructor(t, n) {
    super(
      T(t + "Gradient", typeof t == "string" ? null : t),
      n
    );
  }
  // custom attr to handle transform
  attr(t, n, i) {
    return t === "transform" && (t = "gradientTransform"), super.attr(t, n, i);
  }
  bbox() {
    return new j();
  }
  targets() {
    return st("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update gradient
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
m(pt, di);
p({
  Container: {
    // Create gradient element in defs
    gradient(...e) {
      return this.defs().gradient(...e);
    }
  },
  // define gradient
  Defs: {
    gradient: v(function(e, t) {
      return this.put(new pt(e)).update(t);
    })
  }
});
y(pt, "Gradient");
class at extends N {
  // Initialize node
  constructor(t, n = t) {
    super(T("pattern", t), n);
  }
  // custom attr to handle transform
  attr(t, n, i) {
    return t === "transform" && (t = "patternTransform"), super.attr(t, n, i);
  }
  bbox() {
    return new j();
  }
  targets() {
    return st("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update pattern by rebuilding
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
p({
  Container: {
    // Create pattern element in defs
    pattern(...e) {
      return this.defs().pattern(...e);
    }
  },
  Defs: {
    pattern: v(function(e, t, n) {
      return this.put(new at()).update(n).attr({
        x: 0,
        y: 0,
        width: e,
        height: t,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
y(at, "Pattern");
class kt extends z {
  constructor(t, n = t) {
    super(T("image", t), n);
  }
  // (re)load image
  load(t, n) {
    if (!t) return this;
    const i = new g.window.Image();
    return Lt(
      i,
      "load",
      function(s) {
        const r = this.parent(at);
        this.width() === 0 && this.height() === 0 && this.size(i.width, i.height), r instanceof at && r.width() === 0 && r.height() === 0 && r.size(this.width(), this.height()), typeof n == "function" && n.call(this, s);
      },
      this
    ), Lt(i, "load error", function() {
      tt(i);
    }), this.attr("href", i.src = t, ft);
  }
}
si(function(e, t, n) {
  return (e === "fill" || e === "stroke") && An.test(t) && (t = n.root().defs().image(t)), t instanceof kt && (t = n.root().defs().pattern(0, 0, (i) => {
    i.add(t);
  })), t;
});
p({
  Container: {
    // create image element, load image and set its size
    image: v(function(e, t) {
      return this.put(new kt()).size(0, 0).load(e, t);
    })
  }
});
y(kt, "Image");
class X extends nt {
  // Get bounding box of points
  bbox() {
    let t = -1 / 0, n = -1 / 0, i = 1 / 0, s = 1 / 0;
    return this.forEach(function(r) {
      t = Math.max(r[0], t), n = Math.max(r[1], n), i = Math.min(r[0], i), s = Math.min(r[1], s);
    }), new j(i, s, t - i, n - s);
  }
  // Move point string
  move(t, n) {
    const i = this.bbox();
    if (t -= i.x, n -= i.y, !isNaN(t) && !isNaN(n))
      for (let s = this.length - 1; s >= 0; s--)
        this[s] = [this[s][0] + t, this[s][1] + n];
    return this;
  }
  // Parse point string and flat array
  parse(t = [0, 0]) {
    const n = [];
    t instanceof Array ? t = Array.prototype.concat.apply([], t) : t = t.trim().split(F).map(parseFloat), t.length % 2 !== 0 && t.pop();
    for (let i = 0, s = t.length; i < s; i = i + 2)
      n.push([t[i], t[i + 1]]);
    return n;
  }
  // Resize poly string
  size(t, n) {
    let i;
    const s = this.bbox();
    for (i = this.length - 1; i >= 0; i--)
      s.width && (this[i][0] = (this[i][0] - s.x) * t / s.width + s.x), s.height && (this[i][1] = (this[i][1] - s.y) * n / s.height + s.y);
    return this;
  }
  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }
  // Convert array to string
  toString() {
    const t = [];
    for (let n = 0, i = this.length; n < i; n++)
      t.push(this[n].join(","));
    return t.join(" ");
  }
  transform(t) {
    return this.clone().transformO(t);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(t) {
    f.isMatrixLike(t) || (t = new f(t));
    for (let n = this.length; n--; ) {
      const [i, s] = this[n];
      this[n][0] = t.a * i + t.c * s + t.e, this[n][1] = t.b * i + t.d * s + t.f;
    }
    return this;
  }
}
const pi = X;
function mi(e) {
  return e == null ? this.bbox().x : this.move(e, this.bbox().y);
}
function gi(e) {
  return e == null ? this.bbox().y : this.move(this.bbox().x, e);
}
function yi(e) {
  const t = this.bbox();
  return e == null ? t.width : this.size(e, t.height);
}
function wi(e) {
  const t = this.bbox();
  return e == null ? t.height : this.size(t.width, e);
}
const ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MorphArray: pi,
  height: wi,
  width: yi,
  x: mi,
  y: gi
}, Symbol.toStringTag, { value: "Module" }));
class ct extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("line", t), n);
  }
  // Get array
  array() {
    return new X([
      [this.attr("x1"), this.attr("y1")],
      [this.attr("x2"), this.attr("y2")]
    ]);
  }
  // Move by left top corner
  move(t, n) {
    return this.attr(this.array().move(t, n).toLine());
  }
  // Overwrite native plot() method
  plot(t, n, i, s) {
    return t == null ? this.array() : (typeof n < "u" ? t = { x1: t, y1: n, x2: i, y2: s } : t = new X(t).toLine(), this.attr(t));
  }
  // Set element size to given width and height
  size(t, n) {
    const i = it(this, t, n);
    return this.attr(this.array().size(i.width, i.height).toLine());
  }
}
m(ct, ie);
p({
  Container: {
    // Create a line element
    line: v(function(...e) {
      return ct.prototype.plot.apply(
        this.put(new ct()),
        e[0] != null ? e : [0, 0, 0, 0]
      );
    })
  }
});
y(ct, "Line");
class bt extends N {
  // Initialize node
  constructor(t, n = t) {
    super(T("marker", t), n);
  }
  // Set height of element
  height(t) {
    return this.attr("markerHeight", t);
  }
  orient(t) {
    return this.attr("orient", t);
  }
  // Set marker refX and refY
  ref(t, n) {
    return this.attr("refX", t).attr("refY", n);
  }
  // Return the fill id
  toString() {
    return "url(#" + this.id() + ")";
  }
  // Update marker
  update(t) {
    return this.clear(), typeof t == "function" && t.call(this, this), this;
  }
  // Set width of element
  width(t) {
    return this.attr("markerWidth", t);
  }
}
p({
  Container: {
    marker(...e) {
      return this.defs().marker(...e);
    }
  },
  Defs: {
    // Create marker
    marker: v(function(e, t, n) {
      return this.put(new bt()).size(e, t).ref(e / 2, t / 2).viewbox(0, 0, e, t).attr("orient", "auto").update(n);
    })
  },
  marker: {
    // Create and attach markers
    marker(e, t, n, i) {
      let s = ["marker"];
      return e !== "all" && s.push(e), s = s.join("-"), e = arguments[1] instanceof bt ? arguments[1] : this.defs().marker(t, n, i), this.attr(s, e);
    }
  }
});
y(bt, "Marker");
function et(e, t) {
  return function(n) {
    return n == null ? this[e] : (this[e] = n, t && t.call(this), this);
  };
}
const _i = {
  "-": function(e) {
    return e;
  },
  "<>": function(e) {
    return -Math.cos(e * Math.PI) / 2 + 0.5;
  },
  ">": function(e) {
    return Math.sin(e * Math.PI / 2);
  },
  "<": function(e) {
    return -Math.cos(e * Math.PI / 2) + 1;
  },
  bezier: function(e, t, n, i) {
    return function(s) {
      return s < 0 ? e > 0 ? t / e * s : n > 0 ? i / n * s : 0 : s > 1 ? n < 1 ? (1 - i) / (1 - n) * s + (i - n) / (1 - n) : e < 1 ? (1 - t) / (1 - e) * s + (t - e) / (1 - e) : 1 : 3 * s * (1 - s) ** 2 * t + 3 * s ** 2 * (1 - s) * i + s ** 3;
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(e, t = "end") {
    t = t.split("-").reverse()[0];
    let n = e;
    return t === "none" ? --n : t === "both" && ++n, (i, s = !1) => {
      let r = Math.floor(i * e);
      const o = i * r % 1 === 0;
      return (t === "start" || t === "both") && ++r, s && o && --r, i >= 0 && r < 0 && (r = 0), i <= 1 && r > n && (r = n), r / n;
    };
  }
};
class se {
  done() {
    return !1;
  }
}
class qt extends se {
  constructor(t = ht.ease) {
    super(), this.ease = _i[t] || t;
  }
  step(t, n, i) {
    return typeof t != "number" ? i < 1 ? t : n : t + (n - t) * this.ease(i);
  }
}
class xt extends se {
  constructor(t) {
    super(), this.stepper = t;
  }
  done(t) {
    return t.done;
  }
  step(t, n, i, s) {
    return this.stepper(t, n, i, s);
  }
}
function we() {
  const e = (this._duration || 500) / 1e3, t = this._overshoot || 0, n = 1e-10, i = Math.PI, s = Math.log(t / 100 + n), r = -s / Math.sqrt(i * i + s * s), o = 3.9 / (r * e);
  this.d = 2 * r * o, this.k = o * o;
}
class bi extends xt {
  constructor(t = 500, n = 0) {
    super(), this.duration(t).overshoot(n);
  }
  step(t, n, i, s) {
    if (typeof t == "string") return t;
    if (s.done = i === 1 / 0, i === 1 / 0) return n;
    if (i === 0) return t;
    i > 100 && (i = 16), i /= 1e3;
    const r = s.velocity || 0, o = -this.d * r - this.k * (t - n), h = t + r * i + o * i * i / 2;
    return s.velocity = r + o * i, s.done = Math.abs(n - h) + Math.abs(r) < 2e-3, s.done ? n : h;
  }
}
m(bi, {
  duration: et("_duration", we),
  overshoot: et("_overshoot", we)
});
class xi extends xt {
  constructor(t = 0.1, n = 0.01, i = 0, s = 1e3) {
    super(), this.p(t).i(n).d(i).windup(s);
  }
  step(t, n, i, s) {
    if (typeof t == "string") return t;
    if (s.done = i === 1 / 0, i === 1 / 0) return n;
    if (i === 0) return t;
    const r = n - t;
    let o = (s.integral || 0) + r * i;
    const h = (r - (s.error || 0)) / i, u = this._windup;
    return u !== !1 && (o = Math.max(-u, Math.min(o, u))), s.error = r, s.integral = o, s.done = Math.abs(r) < 1e-3, s.done ? n : t + (this.P * r + this.I * o + this.D * h);
  }
}
m(xi, {
  windup: et("_windup"),
  p: et("P"),
  i: et("I"),
  d: et("D")
});
const vi = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
}, Ft = {
  M: function(e, t, n) {
    return t.x = n.x = e[0], t.y = n.y = e[1], ["M", t.x, t.y];
  },
  L: function(e, t) {
    return t.x = e[0], t.y = e[1], ["L", e[0], e[1]];
  },
  H: function(e, t) {
    return t.x = e[0], ["H", e[0]];
  },
  V: function(e, t) {
    return t.y = e[0], ["V", e[0]];
  },
  C: function(e, t) {
    return t.x = e[4], t.y = e[5], ["C", e[0], e[1], e[2], e[3], e[4], e[5]];
  },
  S: function(e, t) {
    return t.x = e[2], t.y = e[3], ["S", e[0], e[1], e[2], e[3]];
  },
  Q: function(e, t) {
    return t.x = e[2], t.y = e[3], ["Q", e[0], e[1], e[2], e[3]];
  },
  T: function(e, t) {
    return t.x = e[0], t.y = e[1], ["T", e[0], e[1]];
  },
  Z: function(e, t, n) {
    return t.x = n.x, t.y = n.y, ["Z"];
  },
  A: function(e, t) {
    return t.x = e[5], t.y = e[6], ["A", e[0], e[1], e[2], e[3], e[4], e[5], e[6]];
  }
}, It = "mlhvqtcsaz".split("");
for (let e = 0, t = It.length; e < t; ++e)
  Ft[It[e]] = /* @__PURE__ */ function(n) {
    return function(i, s, r) {
      if (n === "H") i[0] = i[0] + s.x;
      else if (n === "V") i[0] = i[0] + s.y;
      else if (n === "A")
        i[5] = i[5] + s.x, i[6] = i[6] + s.y;
      else
        for (let o = 0, h = i.length; o < h; ++o)
          i[o] = i[o] + (o % 2 ? s.y : s.x);
      return Ft[n](i, s, r);
    };
  }(It[e].toUpperCase());
function Ti(e) {
  const t = e.segment[0];
  return Ft[t](e.segment.slice(1), e.p, e.p0);
}
function $t(e) {
  return e.segment.length && e.segment.length - 1 === vi[e.segment[0].toUpperCase()];
}
function Si(e, t) {
  e.inNumber && G(e, !1);
  const n = Zt.test(t);
  if (n)
    e.segment = [t];
  else {
    const i = e.lastCommand, s = i.toLowerCase(), r = i === s;
    e.segment = [s === "m" ? r ? "l" : "L" : i];
  }
  return e.inSegment = !0, e.lastCommand = e.segment[0], n;
}
function G(e, t) {
  if (!e.inNumber) throw new Error("Parser Error");
  e.number && e.segment.push(parseFloat(e.number)), e.inNumber = t, e.number = "", e.pointSeen = !1, e.hasExponent = !1, $t(e) && Yt(e);
}
function Yt(e) {
  e.inSegment = !1, e.absolute && (e.segment = Ti(e)), e.segments.push(e.segment);
}
function Ai(e) {
  if (!e.segment.length) return !1;
  const t = e.segment[0].toUpperCase() === "A", n = e.segment.length;
  return t && (n === 4 || n === 5);
}
function ki(e) {
  return e.lastToken.toUpperCase() === "E";
}
const Mi = /* @__PURE__ */ new Set([" ", ",", "	", `
`, "\r", "\f"]);
function Oi(e, t = !0) {
  let n = 0, i = "";
  const s = {
    segment: [],
    inNumber: !1,
    number: "",
    lastToken: "",
    inSegment: !1,
    segments: [],
    pointSeen: !1,
    hasExponent: !1,
    absolute: t,
    p0: new M(),
    p: new M()
  };
  for (; s.lastToken = i, i = e.charAt(n++); )
    if (!(!s.inSegment && Si(s, i))) {
      if (i === ".") {
        if (s.pointSeen || s.hasExponent) {
          G(s, !1), --n;
          continue;
        }
        s.inNumber = !0, s.pointSeen = !0, s.number += i;
        continue;
      }
      if (!isNaN(parseInt(i))) {
        if (s.number === "0" || Ai(s)) {
          s.inNumber = !0, s.number = i, G(s, !0);
          continue;
        }
        s.inNumber = !0, s.number += i;
        continue;
      }
      if (Mi.has(i)) {
        s.inNumber && G(s, !1);
        continue;
      }
      if (i === "-" || i === "+") {
        if (s.inNumber && !ki(s)) {
          G(s, !1), --n;
          continue;
        }
        s.number += i, s.inNumber = !0;
        continue;
      }
      if (i.toUpperCase() === "E") {
        s.number += i, s.hasExponent = !0;
        continue;
      }
      if (Zt.test(i)) {
        if (s.inNumber)
          G(s, !1);
        else if ($t(s))
          Yt(s);
        else
          throw new Error("parser Error");
        --n;
      }
    }
  return s.inNumber && G(s, !1), s.inSegment && $t(s) && Yt(s), s.segments;
}
function ji(e) {
  let t = "";
  for (let n = 0, i = e.length; n < i; n++)
    t += e[n][0], e[n][1] != null && (t += e[n][1], e[n][2] != null && (t += " ", t += e[n][2], e[n][3] != null && (t += " ", t += e[n][3], t += " ", t += e[n][4], e[n][5] != null && (t += " ", t += e[n][5], t += " ", t += e[n][6], e[n][7] != null && (t += " ", t += e[n][7])))));
  return t + " ";
}
class J extends nt {
  // Get bounding box of path
  bbox() {
    return B().path.setAttribute("d", this.toString()), new j(B.nodes.path.getBBox());
  }
  // Move path string
  move(t, n) {
    const i = this.bbox();
    if (t -= i.x, n -= i.y, !isNaN(t) && !isNaN(n))
      for (let s, r = this.length - 1; r >= 0; r--)
        s = this[r][0], s === "M" || s === "L" || s === "T" ? (this[r][1] += t, this[r][2] += n) : s === "H" ? this[r][1] += t : s === "V" ? this[r][1] += n : s === "C" || s === "S" || s === "Q" ? (this[r][1] += t, this[r][2] += n, this[r][3] += t, this[r][4] += n, s === "C" && (this[r][5] += t, this[r][6] += n)) : s === "A" && (this[r][6] += t, this[r][7] += n);
    return this;
  }
  // Absolutize and parse path to array
  parse(t = "M0 0") {
    return Array.isArray(t) && (t = Array.prototype.concat.apply([], t).toString()), Oi(t);
  }
  // Resize path string
  size(t, n) {
    const i = this.bbox();
    let s, r;
    for (i.width = i.width === 0 ? 1 : i.width, i.height = i.height === 0 ? 1 : i.height, s = this.length - 1; s >= 0; s--)
      r = this[s][0], r === "M" || r === "L" || r === "T" ? (this[s][1] = (this[s][1] - i.x) * t / i.width + i.x, this[s][2] = (this[s][2] - i.y) * n / i.height + i.y) : r === "H" ? this[s][1] = (this[s][1] - i.x) * t / i.width + i.x : r === "V" ? this[s][1] = (this[s][1] - i.y) * n / i.height + i.y : r === "C" || r === "S" || r === "Q" ? (this[s][1] = (this[s][1] - i.x) * t / i.width + i.x, this[s][2] = (this[s][2] - i.y) * n / i.height + i.y, this[s][3] = (this[s][3] - i.x) * t / i.width + i.x, this[s][4] = (this[s][4] - i.y) * n / i.height + i.y, r === "C" && (this[s][5] = (this[s][5] - i.x) * t / i.width + i.x, this[s][6] = (this[s][6] - i.y) * n / i.height + i.y)) : r === "A" && (this[s][1] = this[s][1] * t / i.width, this[s][2] = this[s][2] * n / i.height, this[s][6] = (this[s][6] - i.x) * t / i.width + i.x, this[s][7] = (this[s][7] - i.y) * n / i.height + i.y);
    return this;
  }
  // Convert array to string
  toString() {
    return ji(this);
  }
}
const Fe = (e) => {
  const t = typeof e;
  return t === "number" ? d : t === "string" ? b.isColor(e) ? b : F.test(e) ? Zt.test(e) ? J : nt : Ae.test(e) ? d : Bt : re.indexOf(e.constructor) > -1 ? e.constructor : Array.isArray(e) ? nt : t === "object" ? lt : Bt;
};
class V {
  constructor(t) {
    this._stepper = t || new qt("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
  }
  at(t) {
    return this._morphObj.morph(
      this._from,
      this._to,
      t,
      this._stepper,
      this._context
    );
  }
  done() {
    return this._context.map(this._stepper.done).reduce(function(n, i) {
      return n && i;
    }, !0);
  }
  from(t) {
    return t == null ? this._from : (this._from = this._set(t), this);
  }
  stepper(t) {
    return t == null ? this._stepper : (this._stepper = t, this);
  }
  to(t) {
    return t == null ? this._to : (this._to = this._set(t), this);
  }
  type(t) {
    return t == null ? this._type : (this._type = t, this);
  }
  _set(t) {
    this._type || this.type(Fe(t));
    let n = new this._type(t);
    return this._type === b && (n = this._to ? n[this._to[4]]() : this._from ? n[this._from[4]]() : n), this._type === lt && (n = this._to ? n.align(this._to) : this._from ? n.align(this._from) : n), n = n.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(n.length)).map(Object).map(function(i) {
      return i.done = !0, i;
    }), n;
  }
}
class Bt {
  constructor(...t) {
    this.init(...t);
  }
  init(t) {
    return t = Array.isArray(t) ? t[0] : t, this.value = t, this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
}
class mt {
  constructor(...t) {
    this.init(...t);
  }
  init(t) {
    return Array.isArray(t) && (t = {
      scaleX: t[0],
      scaleY: t[1],
      shear: t[2],
      rotate: t[3],
      translateX: t[4],
      translateY: t[5],
      originX: t[6],
      originY: t[7]
    }), Object.assign(this, mt.defaults, t), this;
  }
  toArray() {
    const t = this;
    return [
      t.scaleX,
      t.scaleY,
      t.shear,
      t.rotate,
      t.translateX,
      t.translateY,
      t.originX,
      t.originY
    ];
  }
}
mt.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const Ci = (e, t) => e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
class lt {
  constructor(...t) {
    this.init(...t);
  }
  align(t) {
    const n = this.values;
    for (let i = 0, s = n.length; i < s; ++i) {
      if (n[i + 1] === t[i + 1]) {
        if (n[i + 1] === b && t[i + 7] !== n[i + 7]) {
          const h = t[i + 7], u = new b(this.values.splice(i + 3, 5))[h]().toArray();
          this.values.splice(i + 3, 0, ...u);
        }
        i += n[i + 2] + 2;
        continue;
      }
      if (!t[i + 1])
        return this;
      const r = new t[i + 1]().toArray(), o = n[i + 2] + 3;
      n.splice(
        i,
        o,
        t[i],
        t[i + 1],
        t[i + 2],
        ...r
      ), i += n[i + 2] + 2;
    }
    return this;
  }
  init(t) {
    if (this.values = [], Array.isArray(t)) {
      this.values = t.slice();
      return;
    }
    t = t || {};
    const n = [];
    for (const i in t) {
      const s = Fe(t[i]), r = new s(t[i]).toArray();
      n.push([i, s, r.length, ...r]);
    }
    return n.sort(Ci), this.values = n.reduce((i, s) => i.concat(s), []), this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const t = {}, n = this.values;
    for (; n.length; ) {
      const i = n.shift(), s = n.shift(), r = n.shift(), o = n.splice(0, r);
      t[i] = new s(o);
    }
    return t;
  }
}
const re = [Bt, mt, lt];
function Ei(e = []) {
  re.push(...[].concat(e));
}
function Ni() {
  m(re, {
    to(e) {
      return new V().type(this.constructor).from(this.toArray()).to(e);
    },
    fromArray(e) {
      return this.init(e), this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(e, t, n, i, s) {
      const r = function(o, h) {
        return i.step(o, t[h], n, s[h], s);
      };
      return this.fromArray(e.map(r));
    }
  });
}
class rt extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("path", t), n);
  }
  // Get array
  array() {
    return this._array || (this._array = new J(this.attr("d")));
  }
  // Clear array cache
  clear() {
    return delete this._array, this;
  }
  // Set height of element
  height(t) {
    return t == null ? this.bbox().height : this.size(this.bbox().width, t);
  }
  // Move by left top corner
  move(t, n) {
    return this.attr("d", this.array().move(t, n));
  }
  // Plot new path
  plot(t) {
    return t == null ? this.array() : this.clear().attr(
      "d",
      typeof t == "string" ? t : this._array = new J(t)
    );
  }
  // Set element size to given width and height
  size(t, n) {
    const i = it(this, t, n);
    return this.attr("d", this.array().size(i.width, i.height));
  }
  // Set width of element
  width(t) {
    return t == null ? this.bbox().width : this.size(t, this.bbox().height);
  }
  // Move by left top corner over x-axis
  x(t) {
    return t == null ? this.bbox().x : this.move(t, this.bbox().y);
  }
  // Move by left top corner over y-axis
  y(t) {
    return t == null ? this.bbox().y : this.move(this.bbox().x, t);
  }
}
rt.prototype.MorphArray = J;
p({
  Container: {
    // Create a wrapped path element
    path: v(function(e) {
      return this.put(new rt()).plot(e || new J());
    })
  }
});
y(rt, "Path");
function Ii() {
  return this._array || (this._array = new X(this.attr("points")));
}
function zi() {
  return delete this._array, this;
}
function Di(e, t) {
  return this.attr("points", this.array().move(e, t));
}
function Pi(e) {
  return e == null ? this.array() : this.clear().attr(
    "points",
    typeof e == "string" ? e : this._array = new X(e)
  );
}
function Ri(e, t) {
  const n = it(this, e, t);
  return this.attr("points", this.array().size(n.width, n.height));
}
const $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  array: Ii,
  clear: zi,
  move: Di,
  plot: Pi,
  size: Ri
}, Symbol.toStringTag, { value: "Module" }));
class gt extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("polygon", t), n);
  }
}
p({
  Container: {
    // Create a wrapped polygon element
    polygon: v(function(e) {
      return this.put(new gt()).plot(e || new X());
    })
  }
});
m(gt, ie);
m(gt, $e);
y(gt, "Polygon");
class yt extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("polyline", t), n);
  }
}
p({
  Container: {
    // Create a wrapped polygon element
    polyline: v(function(e) {
      return this.put(new yt()).plot(e || new X());
    })
  }
});
m(yt, ie);
m(yt, $e);
y(yt, "Polyline");
class Mt extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("rect", t), n);
  }
}
m(Mt, { rx: ee, ry: ne });
p({
  Container: {
    // Create a rect element
    rect: v(function(e, t) {
      return this.put(new Mt()).size(e, t);
    })
  }
});
y(Mt, "Rect");
class zt {
  constructor() {
    this._first = null, this._last = null;
  }
  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }
  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(t) {
    const n = typeof t.next < "u" ? t : { value: t, next: null, prev: null };
    return this._last ? (n.prev = this._last, this._last.next = n, this._last = n) : (this._last = n, this._first = n), n;
  }
  // Removes the item that was returned from the push
  remove(t) {
    t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t === this._last && (this._last = t.prev), t === this._first && (this._first = t.next), t.prev = null, t.next = null;
  }
  shift() {
    const t = this._first;
    return t ? (this._first = t.next, this._first && (this._first.prev = null), this._last = this._first ? this._last : null, t.value) : null;
  }
}
const _ = {
  nextDraw: null,
  frames: new zt(),
  timeouts: new zt(),
  immediates: new zt(),
  timer: () => g.window.performance || g.window.Date,
  transforms: [],
  frame(e) {
    const t = _.frames.push({ run: e });
    return _.nextDraw === null && (_.nextDraw = g.window.requestAnimationFrame(_._draw)), t;
  },
  timeout(e, t) {
    t = t || 0;
    const n = _.timer().now() + t, i = _.timeouts.push({ run: e, time: n });
    return _.nextDraw === null && (_.nextDraw = g.window.requestAnimationFrame(_._draw)), i;
  },
  immediate(e) {
    const t = _.immediates.push(e);
    return _.nextDraw === null && (_.nextDraw = g.window.requestAnimationFrame(_._draw)), t;
  },
  cancelFrame(e) {
    e != null && _.frames.remove(e);
  },
  clearTimeout(e) {
    e != null && _.timeouts.remove(e);
  },
  cancelImmediate(e) {
    e != null && _.immediates.remove(e);
  },
  _draw(e) {
    let t = null;
    const n = _.timeouts.last();
    for (; (t = _.timeouts.shift()) && (e >= t.time ? t.run() : _.timeouts.push(t), t !== n); )
      ;
    let i = null;
    const s = _.frames.last();
    for (; i !== s && (i = _.frames.shift()); )
      i.run(e);
    let r = null;
    for (; r = _.immediates.shift(); )
      r();
    _.nextDraw = _.timeouts.first() || _.frames.first() ? g.window.requestAnimationFrame(_._draw) : null;
  }
}, Li = function(e) {
  const t = e.start, n = e.runner.duration(), i = t + n;
  return {
    start: t,
    duration: n,
    end: i,
    runner: e.runner
  };
}, qi = function() {
  const e = g.window;
  return (e.performance || e.Date).now();
};
class Ye extends dt {
  // Construct a new timeline on the given element
  constructor(t = qi) {
    super(), this._timeSource = t, this.terminate();
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    return this.time(this.getEndTimeOfTimeline() + 1), this.pause();
  }
  // Calculates the end of the timeline
  getEndTime() {
    const t = this.getLastRunnerInfo(), n = t ? t.runner.duration() : 0;
    return (t ? t.start : this._time) + n;
  }
  getEndTimeOfTimeline() {
    const t = this._runners.map((n) => n.start + n.runner.duration());
    return Math.max(0, ...t);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(t) {
    return this._runners[this._runnerIds.indexOf(t)] || null;
  }
  pause() {
    return this._paused = !0, this._continue();
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  play() {
    return this._paused = !1, this.updateTime()._continue();
  }
  reverse(t) {
    const n = this.speed();
    if (t == null) return this.speed(-n);
    const i = Math.abs(n);
    return this.speed(t ? -i : i);
  }
  // schedules a runner on the timeline
  schedule(t, n, i) {
    if (t == null)
      return this._runners.map(Li);
    let s = 0;
    const r = this.getEndTime();
    if (n = n || 0, i == null || i === "last" || i === "after")
      s = r;
    else if (i === "absolute" || i === "start")
      s = n, n = 0;
    else if (i === "now")
      s = this._time;
    else if (i === "relative") {
      const u = this.getRunnerInfoById(t.id);
      u && (s = u.start + n, n = 0);
    } else if (i === "with-last") {
      const u = this.getLastRunnerInfo();
      s = u ? u.start : this._time;
    } else
      throw new Error('Invalid value for the "when" parameter');
    t.unschedule(), t.timeline(this);
    const o = t.persist(), h = {
      persist: o === null ? this._persist : o,
      start: s + n,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(h), this._runners.sort((u, a) => u.start - a.start), this._runnerIds = this._runners.map((u) => u.runner.id), this.updateTime()._continue(), this;
  }
  seek(t) {
    return this.time(this._time + t);
  }
  source(t) {
    return t == null ? this._timeSource : (this._timeSource = t, this);
  }
  speed(t) {
    return t == null ? this._speed : (this._speed = t, this);
  }
  stop() {
    return this.time(0), this.pause();
  }
  time(t) {
    return t == null ? this._time : (this._time = t, this._continue(!0));
  }
  // Remove the runner from this timeline
  unschedule(t) {
    const n = this._runnerIds.indexOf(t.id);
    return n < 0 ? this : (this._runners.splice(n, 1), this._runnerIds.splice(n, 1), t.timeline(null), this);
  }
  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    return this.active() || (this._lastSourceTime = this._timeSource()), this;
  }
  // Checks if we are running and continues the animation
  _continue(t = !1) {
    return _.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : this._paused ? this : (this._nextFrame = _.frame(this._step), this);
  }
  _stepFn(t = !1) {
    const n = this._timeSource();
    let i = n - this._lastSourceTime;
    t && (i = 0);
    const s = this._speed * i + (this._time - this._lastStepTime);
    this._lastSourceTime = n, t || (this._time += s, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let o = this._runners.length; o--; ) {
      const h = this._runners[o], u = h.runner;
      this._time - h.start <= 0 && u.reset();
    }
    let r = !1;
    for (let o = 0, h = this._runners.length; o < h; o++) {
      const u = this._runners[o], a = u.runner;
      let c = s;
      const l = this._time - u.start;
      if (l <= 0) {
        r = !0;
        continue;
      } else l < c && (c = l);
      if (!a.active()) continue;
      a.step(c).done ? u.persist !== !0 && a.duration() - a.time() + this._time + u.persist < this._time && (a.unschedule(), --o, --h) : r = !0;
    }
    return r && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
  terminate() {
    this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }
}
p({
  Element: {
    timeline: function(e) {
      return e == null ? (this._timeline = this._timeline || new Ye(), this._timeline) : (this._timeline = e, this);
    }
  }
});
class I extends dt {
  constructor(t) {
    super(), this.id = I.id++, t = t ?? ht.duration, t = typeof t == "function" ? new xt(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof t == "number" && t, this._isDeclarative = t instanceof xt, this._stepper = this._isDeclarative ? t : new qt(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new f(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(t, n, i) {
    let s = 1, r = !1, o = 0;
    return t = t ?? ht.duration, n = n ?? ht.delay, i = i || "last", typeof t == "object" && !(t instanceof se) && (n = t.delay ?? n, i = t.when ?? i, r = t.swing || r, s = t.times ?? s, o = t.wait ?? o, t = t.duration ?? ht.duration), {
      duration: t,
      delay: n,
      swing: r,
      times: s,
      wait: o,
      when: i
    };
  }
  active(t) {
    return t == null ? this.enabled : (this.enabled = t, this);
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(t) {
    return this.transforms.lmultiplyO(t), this;
  }
  after(t) {
    return this.on("finished", t);
  }
  animate(t, n, i) {
    const s = I.sanitise(t, n, i), r = new I(s.duration);
    return this._timeline && r.timeline(this._timeline), this._element && r.element(this._element), r.loop(s).schedule(s.delay, s.when);
  }
  clearTransform() {
    return this.transforms = new f(), this;
  }
  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) && (this._queue = this._queue.filter((t) => !t.isTransform));
  }
  delay(t) {
    return this.animate(0, t);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(t) {
    return this.queue(null, t);
  }
  ease(t) {
    return this._stepper = new qt(t), this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */
  element(t) {
    return t == null ? this._element : (this._element = t, t._prepareRunner(), this);
  }
  finish() {
    return this.step(1 / 0);
  }
  loop(t, n, i) {
    return typeof t == "object" && (n = t.swing, i = t.wait, t = t.times), this._times = t || 1 / 0, this._swing = n || !1, this._wait = i || 0, this._times === !0 && (this._times = 1 / 0), this;
  }
  loops(t) {
    const n = this._duration + this._wait;
    if (t == null) {
      const o = Math.floor(this._time / n), u = (this._time - o * n) / this._duration;
      return Math.min(o + u, this._times);
    }
    const i = Math.floor(t), s = t % 1, r = n * i + this._duration * s;
    return this.time(r);
  }
  persist(t) {
    return t == null ? this._persist : (this._persist = t, this);
  }
  position(t) {
    const n = this._time, i = this._duration, s = this._wait, r = this._times, o = this._swing, h = this._reverse;
    let u;
    if (t == null) {
      const w = function(A) {
        const k = o * Math.floor(A % (2 * (s + i)) / (s + i)), S = k && !h || !k && h, O = Math.pow(-1, S) * (A % (s + i)) / i + S;
        return Math.max(Math.min(O, 1), 0);
      }, x = r * (s + i) - s;
      return u = n <= 0 ? Math.round(w(1e-5)) : n < x ? w(n) : Math.round(w(x - 1e-5)), u;
    }
    const a = Math.floor(this.loops()), c = o && a % 2 === 0;
    return u = a + (c && !h || h && c ? t : 1 - t), this.loops(u);
  }
  progress(t) {
    return t == null ? Math.min(1, this._time / this.duration()) : this.time(t * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(t, n, i, s) {
    return this._queue.push({
      initialiser: t || ye,
      runner: n || ye,
      retarget: i,
      isTransform: s,
      initialised: !1,
      finished: !1
    }), this.timeline() && this.timeline()._continue(), this;
  }
  reset() {
    return this._reseted ? this : (this.time(0), this._reseted = !0, this);
  }
  reverse(t) {
    return this._reverse = t ?? !this._reverse, this;
  }
  schedule(t, n, i) {
    if (t instanceof Ye || (i = n, n = t, t = this.timeline()), !t)
      throw Error("Runner cannot be scheduled without timeline");
    return t.schedule(this, n, i), this;
  }
  step(t) {
    if (!this.enabled) return this;
    t = t ?? 16, this._time += t;
    const n = this.position(), i = this._lastPosition !== n && this._time >= 0;
    this._lastPosition = n;
    const s = this.duration(), r = this._lastTime <= 0 && this._time > 0, o = this._lastTime < s && this._time >= s;
    this._lastTime = this._time, r && this.fire("start", this);
    const h = this._isDeclarative;
    this.done = !h && !o && this._time >= s, this._reseted = !1;
    let u = !1;
    return (i || h) && (this._initialise(i), this.transforms = new f(), u = this._run(h ? t : n), this.fire("step", this)), this.done = this.done || u && h, o && this.fire("finished", this), this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(t) {
    if (t == null)
      return this._time;
    const n = t - this._time;
    return this.step(n), this;
  }
  timeline(t) {
    return typeof t > "u" ? this._timeline : (this._timeline = t, this);
  }
  unschedule() {
    const t = this.timeline();
    return t && t.unschedule(this), this;
  }
  // Run each initialise function in the runner if required
  _initialise(t) {
    if (!(!t && !this._isDeclarative))
      for (let n = 0, i = this._queue.length; n < i; ++n) {
        const s = this._queue[n], r = this._isDeclarative || !s.initialised && t;
        t = !s.finished, r && t && (s.initialiser.call(this), s.initialised = !0);
      }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(t, n) {
    if (this._history[t] = {
      morpher: n,
      caller: this._queue[this._queue.length - 1]
    }, this._isDeclarative) {
      const i = this.timeline();
      i && i.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(t) {
    let n = !0;
    for (let i = 0, s = this._queue.length; i < s; ++i) {
      const r = this._queue[i], o = r.runner.call(this, t);
      r.finished = r.finished || o === !0, n = n && r.finished;
    }
    return n;
  }
  // do nothing and return false
  _tryRetarget(t, n, i) {
    if (this._history[t]) {
      if (!this._history[t].caller.initialised) {
        const r = this._queue.indexOf(this._history[t].caller);
        return this._queue.splice(r, 1), !1;
      }
      this._history[t].caller.retarget ? this._history[t].caller.retarget.call(this, n, i) : this._history[t].morpher.to(n), this._history[t].caller.finished = !1;
      const s = this.timeline();
      return s && s.play(), !0;
    }
    return !1;
  }
}
I.id = 0;
class vt {
  constructor(t = new f(), n = -1, i = !0) {
    this.transforms = t, this.id = n, this.done = i;
  }
  clearTransformsFromQueue() {
  }
}
m([I, vt], {
  mergeWith(e) {
    return new vt(
      e.transforms.lmultiply(this.transforms),
      e.id
    );
  }
});
const Be = (e, t) => e.lmultiplyO(t), He = (e) => e.transforms;
function Fi() {
  const t = this._transformationRunners.runners.map(He).reduce(Be, new f());
  this.transform(t), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class $i {
  constructor() {
    this.runners = [], this.ids = [];
  }
  add(t) {
    if (this.runners.includes(t)) return;
    const n = t.id + 1;
    return this.runners.push(t), this.ids.push(n), this;
  }
  clearBefore(t) {
    const n = this.ids.indexOf(t + 1) || 1;
    return this.ids.splice(0, n, 0), this.runners.splice(0, n, new vt()).forEach((i) => i.clearTransformsFromQueue()), this;
  }
  edit(t, n) {
    const i = this.ids.indexOf(t + 1);
    return this.ids.splice(i, 1, t + 1), this.runners.splice(i, 1, n), this;
  }
  getByID(t) {
    return this.runners[this.ids.indexOf(t + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let t = null;
    for (let n = 0; n < this.runners.length; ++n) {
      const i = this.runners[n];
      if (t && i.done && t.done && // don't merge runner when persisted on timeline
      (!i._timeline || !i._timeline._runnerIds.includes(i.id)) && (!t._timeline || !t._timeline._runnerIds.includes(t.id))) {
        this.remove(i.id);
        const r = i.mergeWith(t);
        this.edit(t.id, r), t = r, --n;
      } else
        t = i;
    }
    return this;
  }
  remove(t) {
    const n = this.ids.indexOf(t + 1);
    return this.ids.splice(n, 1), this.runners.splice(n, 1), this;
  }
}
p({
  Element: {
    animate(e, t, n) {
      const i = I.sanitise(e, t, n), s = this.timeline();
      return new I(i.duration).loop(i).element(this).timeline(s.play()).schedule(i.delay, i.when);
    },
    delay(e, t) {
      return this.animate(0, e, t);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(e) {
      this._transformationRunners.clearBefore(e.id);
    },
    _currentTransform(e) {
      return this._transformationRunners.runners.filter((t) => t.id <= e.id).map(He).reduce(Be, new f());
    },
    _addRunner(e) {
      this._transformationRunners.add(e), _.cancelImmediate(this._frameId), this._frameId = _.immediate(Fi.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new $i().add(
        new vt(new f(this))
      ));
    }
  }
});
const Yi = (e, t) => e.filter((n) => !t.includes(n));
m(I, {
  attr(e, t) {
    return this.styleAttr("attr", e, t);
  },
  // Add animatable styles
  css(e, t) {
    return this.styleAttr("css", e, t);
  },
  styleAttr(e, t, n) {
    if (typeof t == "string")
      return this.styleAttr(e, { [t]: n });
    let i = t;
    if (this._tryRetarget(e, i)) return this;
    let s = new V(this._stepper).to(i), r = Object.keys(i);
    return this.queue(
      function() {
        s = s.from(this.element()[e](r));
      },
      function(o) {
        return this.element()[e](s.at(o).valueOf()), s.done();
      },
      function(o) {
        const h = Object.keys(o), u = Yi(h, r);
        if (u.length) {
          const c = this.element()[e](u), l = new lt(s.from()).valueOf();
          Object.assign(l, c), s.from(l);
        }
        const a = new lt(s.to()).valueOf();
        Object.assign(a, o), s.to(a), r = h, i = o;
      }
    ), this._rememberMorpher(e, s), this;
  },
  zoom(e, t) {
    if (this._tryRetarget("zoom", e, t)) return this;
    let n = new V(this._stepper).to(new d(e));
    return this.queue(
      function() {
        n = n.from(this.element().zoom());
      },
      function(i) {
        return this.element().zoom(n.at(i), t), n.done();
      },
      function(i, s) {
        t = s, n.to(i);
      }
    ), this._rememberMorpher("zoom", n), this;
  },
  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(e, t, n) {
    if (t = e.relative || t, this._isDeclarative && !t && this._tryRetarget("transform", e))
      return this;
    const i = f.isMatrixLike(e);
    n = e.affine != null ? e.affine : n ?? !i;
    const s = new V(this._stepper).type(
      n ? mt : f
    );
    let r, o, h, u, a;
    function c() {
      o = o || this.element(), r = r || Pt(e, o), a = new f(t ? void 0 : o), o._addRunner(this), t || o._clearTransformRunnersBefore(this);
    }
    function l(x) {
      t || this.clearTransform();
      const { x: A, y: k } = new M(r).transform(
        o._currentTransform(this)
      );
      let S = new f({ ...e, origin: [A, k] }), O = this._isDeclarative && h ? h : a;
      if (n) {
        S = S.decompose(A, k), O = O.decompose(A, k);
        const R = S.rotate, $ = O.rotate, Y = [R - 360, R, R + 360], U = Y.map((Ze) => Math.abs(Ze - $)), wt = Math.min(...U), _t = U.indexOf(wt);
        S.rotate = Y[_t];
      }
      t && (i || (S.rotate = e.rotate || 0), this._isDeclarative && u && (O.rotate = u)), s.from(O), s.to(S);
      const P = s.at(x);
      return u = P.rotate, h = new f(P), this.addTransform(h), o._addRunner(this), s.done();
    }
    function w(x) {
      (x.origin || "center").toString() !== (e.origin || "center").toString() && (r = Pt(x, o)), e = { ...x, origin: r };
    }
    return this.queue(c, l, w, !0), this._isDeclarative && this._rememberMorpher("transform", s), this;
  },
  // Animatable x-axis
  x(e) {
    return this._queueNumber("x", e);
  },
  // Animatable y-axis
  y(e) {
    return this._queueNumber("y", e);
  },
  ax(e) {
    return this._queueNumber("ax", e);
  },
  ay(e) {
    return this._queueNumber("ay", e);
  },
  dx(e = 0) {
    return this._queueNumberDelta("x", e);
  },
  dy(e = 0) {
    return this._queueNumberDelta("y", e);
  },
  dmove(e, t) {
    return this.dx(e).dy(t);
  },
  _queueNumberDelta(e, t) {
    if (t = new d(t), this._tryRetarget(e, t)) return this;
    const n = new V(this._stepper).to(t);
    let i = null;
    return this.queue(
      function() {
        i = this.element()[e](), n.from(i), n.to(i + t);
      },
      function(s) {
        return this.element()[e](n.at(s)), n.done();
      },
      function(s) {
        n.to(i + new d(s));
      }
    ), this._rememberMorpher(e, n), this;
  },
  _queueObject(e, t) {
    if (this._tryRetarget(e, t)) return this;
    const n = new V(this._stepper).to(t);
    return this.queue(
      function() {
        n.from(this.element()[e]());
      },
      function(i) {
        return this.element()[e](n.at(i)), n.done();
      }
    ), this._rememberMorpher(e, n), this;
  },
  _queueNumber(e, t) {
    return this._queueObject(e, new d(t));
  },
  // Animatable center x-axis
  cx(e) {
    return this._queueNumber("cx", e);
  },
  // Animatable center y-axis
  cy(e) {
    return this._queueNumber("cy", e);
  },
  // Add animatable move
  move(e, t) {
    return this.x(e).y(t);
  },
  amove(e, t) {
    return this.ax(e).ay(t);
  },
  // Add animatable center
  center(e, t) {
    return this.cx(e).cy(t);
  },
  // Add animatable size
  size(e, t) {
    let n;
    return (!e || !t) && (n = this._element.bbox()), e || (e = n.width / n.height * t), t || (t = n.height / n.width * e), this.width(e).height(t);
  },
  // Add animatable width
  width(e) {
    return this._queueNumber("width", e);
  },
  // Add animatable height
  height(e) {
    return this._queueNumber("height", e);
  },
  // Add animatable plot
  plot(e, t, n, i) {
    if (arguments.length === 4)
      return this.plot([e, t, n, i]);
    if (this._tryRetarget("plot", e)) return this;
    const s = new V(this._stepper).type(this._element.MorphArray).to(e);
    return this.queue(
      function() {
        s.from(this._element.array());
      },
      function(r) {
        return this._element.plot(s.at(r)), s.done();
      }
    ), this._rememberMorpher("plot", s), this;
  },
  // Add leading method
  leading(e) {
    return this._queueNumber("leading", e);
  },
  // Add animatable viewbox
  viewbox(e, t, n, i) {
    return this._queueObject("viewbox", new j(e, t, n, i));
  },
  update(e) {
    return typeof e != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", e.offset), this);
  }
});
m(I, { rx: ee, ry: ne, from: Le, to: qe });
y(I, "Runner");
class oe extends N {
  constructor(t, n = t) {
    super(T("svg", t), n), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? D(this.node.querySelector("defs")) || this.put(new te()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof g.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({ xmlns: Qt, version: "1.1" }).attr(
      "xmlns:xlink",
      ft,
      Ct
    ) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({ xmlns: null, version: null }).attr("xmlns:xlink", null, Ct).attr("xmlns:svgjs", null, Ct);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    return this.isRoot() ? this : super.root();
  }
}
p({
  Container: {
    // Create nested svg document
    nested: v(function() {
      return this.put(new oe());
    })
  }
});
y(oe, "Svg", !0);
let he = class extends N {
  // Initialize node
  constructor(t, n = t) {
    super(T("symbol", t), n);
  }
};
p({
  Container: {
    symbol: v(function() {
      return this.put(new he());
    })
  }
});
y(he, "Symbol");
function Bi(e) {
  return this._build === !1 && this.clear(), this.node.appendChild(g.document.createTextNode(e)), this;
}
function Hi() {
  return this.node.getComputedTextLength();
}
function Xi(e, t = this.bbox()) {
  return e == null ? t.x : this.attr("x", this.attr("x") + e - t.x);
}
function Ui(e, t = this.bbox()) {
  return e == null ? t.y : this.attr("y", this.attr("y") + e - t.y);
}
function Gi(e, t, n = this.bbox()) {
  return this.x(e, n).y(t, n);
}
function Vi(e, t = this.bbox()) {
  return e == null ? t.cx : this.attr("x", this.attr("x") + e - t.cx);
}
function Qi(e, t = this.bbox()) {
  return e == null ? t.cy : this.attr("y", this.attr("y") + e - t.cy);
}
function Wi(e, t, n = this.bbox()) {
  return this.cx(e, n).cy(t, n);
}
function Ji(e) {
  return this.attr("x", e);
}
function Zi(e) {
  return this.attr("y", e);
}
function Ki(e, t) {
  return this.ax(e).ay(t);
}
function ts(e) {
  return this._build = !!e, this;
}
const Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  amove: Ki,
  ax: Ji,
  ay: Zi,
  build: ts,
  center: Wi,
  cx: Vi,
  cy: Qi,
  length: Hi,
  move: Gi,
  plain: Bi,
  x: Xi,
  y: Ui
}, Symbol.toStringTag, { value: "Module" }));
class L extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("text", t), n), this.dom.leading = this.dom.leading ?? new d(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(t) {
    return t == null ? this.dom.leading : (this.dom.leading = new d(t), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(t) {
    if (typeof t == "boolean" && (this._rebuild = t), this._rebuild) {
      const n = this;
      let i = 0;
      const s = this.dom.leading;
      this.each(function(r) {
        if (Rt(this.node)) return;
        const o = g.window.getComputedStyle(this.node).getPropertyValue("font-size"), h = s * new d(o);
        this.dom.newLined && (this.attr("x", n.attr("x")), this.text() === `
` ? i += h : (this.attr("dy", r ? h + i : 0), i = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(t) {
    return this.dom = t, this.dom.leading = new d(t.leading || 1.3), this;
  }
  writeDataToDom() {
    return ve(this, this.dom, { leading: 1.3 }), this;
  }
  // Set the text content
  text(t) {
    if (t === void 0) {
      const n = this.node.childNodes;
      let i = 0;
      t = "";
      for (let s = 0, r = n.length; s < r; ++s) {
        if (n[s].nodeName === "textPath" || Rt(n[s])) {
          s === 0 && (i = s + 1);
          continue;
        }
        s !== i && n[s].nodeType !== 3 && D(n[s]).dom.newLined === !0 && (t += `
`), t += n[s].textContent;
      }
      return t;
    }
    if (this.clear().build(!0), typeof t == "function")
      t.call(this, this);
    else {
      t = (t + "").split(`
`);
      for (let n = 0, i = t.length; n < i; n++)
        this.newLine(t[n]);
    }
    return this.build(!1).rebuild();
  }
}
m(L, Xe);
p({
  Container: {
    // Create text element
    text: v(function(e = "") {
      return this.put(new L()).text(e);
    }),
    // Create plain text element
    plain: v(function(e = "") {
      return this.put(new L()).plain(e);
    })
  }
});
y(L, "Text");
class Ot extends z {
  // Initialize node
  constructor(t, n = t) {
    super(T("tspan", t), n), this._build = !1;
  }
  // Shortcut dx
  dx(t) {
    return this.attr("dx", t);
  }
  // Shortcut dy
  dy(t) {
    return this.attr("dy", t);
  }
  // Create new line
  newLine() {
    this.dom.newLined = !0;
    const t = this.parent();
    if (!(t instanceof L))
      return this;
    const n = t.index(this), i = g.window.getComputedStyle(this.node).getPropertyValue("font-size"), s = t.dom.leading * new d(i);
    return this.dy(n ? s : 0).attr("x", t.x());
  }
  // Set text content
  text(t) {
    return t == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof t == "function" ? (this.clear().build(!0), t.call(this, this), this.build(!1)) : this.plain(t), this);
  }
}
m(Ot, Xe);
p({
  Tspan: {
    tspan: v(function(e = "") {
      const t = new Ot();
      return this._build || this.clear(), this.put(t).text(e);
    })
  },
  Text: {
    newLine: function(e = "") {
      return this.tspan(e).newLine();
    }
  }
});
y(Ot, "Tspan");
class ue extends z {
  constructor(t, n = t) {
    super(T("circle", t), n);
  }
  radius(t) {
    return this.attr("r", t);
  }
  // Radius x value
  rx(t) {
    return this.attr("r", t);
  }
  // Alias radius x value
  ry(t) {
    return this.rx(t);
  }
  size(t) {
    return this.radius(new d(t).divide(2));
  }
}
m(ue, { x: Ee, y: Ne, cx: Ie, cy: ze, width: De, height: Pe });
p({
  Container: {
    // Create circle element
    circle: v(function(e = 0) {
      return this.put(new ue()).size(e).move(0, 0);
    })
  }
});
y(ue, "Circle");
class Ht extends N {
  constructor(t, n = t) {
    super(T("clipPath", t), n);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unclip();
    }), super.remove();
  }
  targets() {
    return st("svg [clip-path*=" + this.id() + "]");
  }
}
p({
  Container: {
    // Create clipping element
    clip: v(function() {
      return this.defs().put(new Ht());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(e) {
      const t = e instanceof Ht ? e : this.parent().clip().add(e);
      return this.attr("clip-path", "url(#" + t.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
y(Ht, "ClipPath");
class Ue extends q {
  constructor(t, n = t) {
    super(T("foreignObject", t), n);
  }
}
p({
  Container: {
    foreignObject: v(function(e, t) {
      return this.put(new Ue()).size(e, t);
    })
  }
});
y(Ue, "ForeignObject");
function es(e, t) {
  return this.children().forEach((n) => {
    let i;
    try {
      i = n.node instanceof rn().SVGSVGElement ? new j(n.attr(["x", "y", "width", "height"])) : n.bbox();
    } catch {
      return;
    }
    const s = new f(n), r = s.translate(e, t).transform(s.inverse()), o = new M(i.x, i.y).transform(r);
    n.move(o.x, o.y);
  }), this;
}
function ns(e) {
  return this.dmove(e, 0);
}
function is(e) {
  return this.dmove(0, e);
}
function ss(e, t = this.bbox()) {
  return e == null ? t.height : this.size(t.width, e, t);
}
function rs(e = 0, t = 0, n = this.bbox()) {
  const i = e - n.x, s = t - n.y;
  return this.dmove(i, s);
}
function os(e, t, n = this.bbox()) {
  const i = it(this, e, t, n), s = i.width / n.width, r = i.height / n.height;
  return this.children().forEach((o) => {
    const h = new M(n).transform(new f(o).inverse());
    o.scale(s, r, h.x, h.y);
  }), this;
}
function hs(e, t = this.bbox()) {
  return e == null ? t.width : this.size(e, t.height, t);
}
function us(e, t = this.bbox()) {
  return e == null ? t.x : this.move(e, t.y, t);
}
function as(e, t = this.bbox()) {
  return e == null ? t.y : this.move(t.x, e, t);
}
const Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dmove: es,
  dx: ns,
  dy: is,
  height: ss,
  move: rs,
  size: os,
  width: hs,
  x: us,
  y: as
}, Symbol.toStringTag, { value: "Module" }));
class ae extends N {
  constructor(t, n = t) {
    super(T("g", t), n);
  }
}
m(ae, Ge);
p({
  Container: {
    // Create a group element
    group: v(function() {
      return this.put(new ae());
    })
  }
});
y(ae, "G");
class Tt extends N {
  constructor(t, n = t) {
    super(T("a", t), n);
  }
  // Link target attribute
  target(t) {
    return this.attr("target", t);
  }
  // Link url
  to(t) {
    return this.attr("href", t, ft);
  }
}
m(Tt, Ge);
p({
  Container: {
    // Create a hyperlink element
    link: v(function(e) {
      return this.put(new Tt()).to(e);
    })
  },
  Element: {
    unlink() {
      const e = this.linker();
      if (!e) return this;
      const t = e.parent();
      if (!t)
        return this.remove();
      const n = t.index(e);
      return t.add(this, n), e.remove(), this;
    },
    linkTo(e) {
      let t = this.linker();
      return t || (t = new Tt(), this.wrap(t)), typeof e == "function" ? e.call(t, t) : t.to(e), this;
    },
    linker() {
      const e = this.parent();
      return e && e.node.nodeName.toLowerCase() === "a" ? e : null;
    }
  }
});
y(Tt, "A");
class Xt extends N {
  // Initialize node
  constructor(t, n = t) {
    super(T("mask", t), n);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(t) {
      t.unmask();
    }), super.remove();
  }
  targets() {
    return st("svg [mask*=" + this.id() + "]");
  }
}
p({
  Container: {
    mask: v(function() {
      return this.defs().put(new Xt());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(e) {
      const t = e instanceof Xt ? e : this.parent().mask().add(e);
      return this.attr("mask", "url(#" + t.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
y(Xt, "Mask");
class Ve extends q {
  constructor(t, n = t) {
    super(T("stop", t), n);
  }
  // add color stops
  update(t) {
    return (typeof t == "number" || t instanceof d) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", new d(t.offset)), this;
  }
}
p({
  Gradient: {
    // Add a color stop
    stop: function(e, t, n) {
      return this.put(new Ve()).update(e, t, n);
    }
  }
});
y(Ve, "Stop");
function cs(e, t) {
  if (!e) return "";
  if (!t) return e;
  let n = e + "{";
  for (const i in t)
    n += en(i) + ":" + t[i] + ";";
  return n += "}", n;
}
class Ut extends q {
  constructor(t, n = t) {
    super(T("style", t), n);
  }
  addText(t = "") {
    return this.node.textContent += t, this;
  }
  font(t, n, i = {}) {
    return this.rule("@font-face", {
      fontFamily: t,
      src: n,
      ...i
    });
  }
  rule(t, n) {
    return this.addText(cs(t, n));
  }
}
p("Dom", {
  style(e, t) {
    return this.put(new Ut()).rule(e, t);
  },
  fontface(e, t, n) {
    return this.put(new Ut()).font(e, t, n);
  }
});
y(Ut, "Style");
class ce extends L {
  // Initialize node
  constructor(t, n = t) {
    super(T("textPath", t), n);
  }
  // return the array of the path track element
  array() {
    const t = this.track();
    return t ? t.array() : null;
  }
  // Plot path if any
  plot(t) {
    const n = this.track();
    let i = null;
    return n && (i = n.plot(t)), t == null ? i : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
}
p({
  Container: {
    textPath: v(function(e, t) {
      return e instanceof L || (e = this.text(e)), e.path(t);
    })
  },
  Text: {
    // Create path for text to run on
    path: v(function(e, t = !0) {
      const n = new ce();
      e instanceof rt || (e = this.defs().path(e)), n.attr("href", "#" + e, ft);
      let i;
      if (t)
        for (; i = this.node.firstChild; )
          n.node.appendChild(i);
      return this.put(n);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: v(function(e) {
      return e instanceof L || (e = new L().addTo(this.parent()).text(e)), e.path(this);
    }),
    targets() {
      return st("svg textPath").filter((e) => (e.attr("href") || "").includes(this.id()));
    }
  }
});
ce.prototype.MorphArray = J;
y(ce, "TextPath");
class Qe extends z {
  constructor(t, n = t) {
    super(T("use", t), n);
  }
  // Use element as a reference
  use(t, n) {
    return this.attr("href", (n || "") + "#" + t, ft);
  }
}
p({
  Container: {
    // Create a use element
    use: v(function(e, t) {
      return this.put(new Qe()).use(e, t);
    })
  }
});
y(Qe, "Use");
const ls = C;
m([oe, he, kt, at, bt], E("viewbox"));
m([ct, yt, gt, rt], E("marker"));
m(L, E("Text"));
m(rt, E("Path"));
m(te, E("Defs"));
m([L, Ot], E("Tspan"));
m([Mt, At, pt, I], E("radius"));
m(dt, E("EventTarget"));
m(H, E("Dom"));
m(q, E("Element"));
m(z, E("Shape"));
m([N, Re], E("Container"));
m(pt, E("Gradient"));
m(I, E("Runner"));
W.extend(Ke());
Ei([
  d,
  b,
  j,
  f,
  nt,
  X,
  J,
  M
]);
Ni();
function fs(e) {
  return ls().svg(e).first();
}
async function ds(e, t) {
  const n = fs(e), i = {};
  n.children().forEach((s) => {
    i[s.attr("id")] = s.remove();
  });
  for (let s in t.parts)
    for (let r in t.parts[s]) {
      const h = t.parts[s][r].map((u) => i[u]);
      t.parts[s][r] = { img: void 0, svg: h.reduce((u, a) => u + a.svg(), "") };
    }
  return t;
}
function ps(e, t, n) {
  [e[t], e[n]] = [e[n], e[t]];
}
function ms(e) {
  for (let t = e.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    ps(e, t, n);
  }
}
function gs(e, t, n) {
  let i = [...Array(t - e)].map((s, r) => e + r);
  return ms(i), i.slice(0, n);
}
function ys(e, t) {
  return gs(0, e.length, t).map((i) => e[i]);
}
const ws = await fetch("/emoji/info.json"), { emojiNames: We } = await ws.json(), _s = /_*$/, bs = String.fromCodePoint(65039), xs = String.fromCodePoint(8205), le = [], fe = {}, Gt = {}, vs = ["bot", "mid", "top"];
let St;
async function Ts() {
  await We.reduce(async (e, t) => {
    await e;
    const i = await (await fetch(`/emoji/${t}/cfg.json`)).json();
    if (!i.parts.base)
      return;
    const r = await (await fetch(`/emoji/${t}/emoji.svg`)).text(), o = await ds(r, i), h = i.id.split("-").map((a) => parseInt(a, 16)), u = String.fromCodePoint(...h);
    fe[u] = t, Gt[t] = u, o.svg = r, le[t] = o;
  }, Promise.resolve()), St = Object.values(Gt), St.sort().reverse();
}
function Ss(e) {
  return fe[e];
}
function As(e) {
  return e in fe;
}
function Je(e) {
  return Gt[e];
}
function Cs() {
  return St.join("");
}
function ks(e, t, n) {
  return e && e.parts && e.parts[t] && e.parts[t][n];
}
function Ms(...e) {
  let t = "";
  const n = e.map((r) => {
    const [o, h] = r.split(":"), u = le[o];
    return { char: Je(o), partName: h, emoji: u };
  }), i = Array(e.length).fill("_");
  vs.forEach((r) => {
    n.forEach((o, h) => {
      const { char: u, partName: a, emoji: c } = o;
      ks(c, a, r) && (t += c.parts[a][r].svg, i[h] = u);
    });
  });
  const s = i.join("").replace(_s, "");
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">${t}</svg>`, list: s };
}
function Os(e) {
  const t = ["base", "eyes", "mouth", "extra"], n = [], i = [];
  let s = !1, r = !1;
  for (let o of e)
    o === xs ? (r = !0, i[i.length - 1] += o) : r || bs.indexOf(o) >= 0 ? (r = !1, i[i.length - 1] += o) : i.push(o);
  for (const o of i) {
    !As(o) && o !== " " && o !== "_" && (s = !0);
    const h = Ss(o), u = t.shift() || "extra";
    h && n.push(`${h}:${u}`);
  }
  return { choices: n, failed: s };
}
function Es() {
  const t = ys(St, 4).join(""), { choices: n } = Os(t);
  return Ms(...n);
}
function Ns() {
  return We.map((e) => ({
    name: e,
    char: Je(e),
    svg: le[e].svg
  }));
}
await Ts();
export {
  Ss as charToName,
  Os as emojiStringToPartStringList,
  Ns as getData,
  Cs as list,
  Ms as makeSvgEmoji,
  Je as nameToChar,
  Es as randomEmoji
};
