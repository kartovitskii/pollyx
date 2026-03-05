import { ref, onMounted, onUnmounted, readonly } from 'vue';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = false,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = true, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), true), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var DiffMatchPatchInstance = null;
function loadDiffMatchPatch() {
  if (DiffMatchPatchInstance) {
    return DiffMatchPatchInstance;
  }
  if (typeof window !== 'undefined' && window.diff_match_patch) {
    DiffMatchPatchInstance = window.diff_match_patch;
    return DiffMatchPatchInstance;
  }
  if (typeof window !== 'undefined' && window.DiffMatchPatch) {
    DiffMatchPatchInstance = window.DiffMatchPatch;
    return DiffMatchPatchInstance;
  }
  if (typeof global !== 'undefined' && global.diff_match_patch) {
    DiffMatchPatchInstance = global.diff_match_patch;
    return DiffMatchPatchInstance;
  }
  try {
    // @ts-ignore
    var module = require('diff-match-patch');
    if (module && typeof module === 'function') {
      DiffMatchPatchInstance = module;
      return DiffMatchPatchInstance;
    }
    if (module && module["default"] && typeof module["default"] === 'function') {
      DiffMatchPatchInstance = module["default"];
      return DiffMatchPatchInstance;
    }
  } catch (e) {}
  if (typeof require !== 'undefined') {
    try {
      return import('diff-match-patch').then(function (module) {
        if (module["default"] && typeof module["default"] === 'function') {
          DiffMatchPatchInstance = module["default"];
        } else if (typeof module === 'function') {
          DiffMatchPatchInstance = module;
        }
        return DiffMatchPatchInstance;
      });
    } catch (e) {}
  }
  throw new Error('DiffMatchPatch library is required. ' + 'Please install it via npm: npm install diff-match-patch\n' + 'Or include it via CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js"></script>');
}
function createDiffMatchPatch() {
  var DMP = loadDiffMatchPatch();
  if (DMP && typeof DMP === 'function') {
    return new DMP();
  }
  if (DMP && typeof DMP.diff_match_patch === 'function') {
    return new DMP.diff_match_patch();
  }
  throw new Error('Failed to create DiffMatchPatch instance');
}

var DiffEngine = /*#__PURE__*/function () {
  function DiffEngine() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, DiffEngine);
    this.options = _objectSpread2({
      timeout: 1.0,
      editCost: 4
    }, options);
    try {
      this.dmp = createDiffMatchPatch();
      if (this.dmp) {
        this.dmp.Diff_Timeout = this.options.timeout;
        this.dmp.Diff_EditCost = this.options.editCost;
      }
    } catch (error) {
      console.error('Failed to initialize DiffEngine:', error.message);
      // Создаем заглушку, которая будет использовать полную замену
      this.dmp = null;
    }
  }
  return _createClass(DiffEngine, [{
    key: "computeDiff",
    value: function computeDiff(oldHtml, newHtml) {
      if (!this.dmp) {
        return {
          hasChanges: oldHtml !== newHtml,
          patches: [],
          html: newHtml,
          statistics: {
            patchesCount: 0,
            successfulPatches: 0,
            failedPatches: 0
          }
        };
      }
      if (oldHtml === newHtml) {
        return {
          hasChanges: false,
          patches: [],
          html: oldHtml,
          statistics: {
            patchesCount: 0,
            successfulPatches: 0,
            failedPatches: 0
          }
        };
      }
      try {
        var patches = this.dmp.patch_make(oldHtml, newHtml);
        var _this$dmp$patch_apply = this.dmp.patch_apply(patches, oldHtml),
          _this$dmp$patch_apply2 = _slicedToArray(_this$dmp$patch_apply, 2),
          patchedHtml = _this$dmp$patch_apply2[0],
          results = _this$dmp$patch_apply2[1];
        return {
          hasChanges: patches.length > 0,
          patches: patches,
          results: results,
          html: patchedHtml,
          statistics: {
            patchesCount: patches.length,
            successfulPatches: results.filter(function (r) {
              return r === true;
            }).length,
            failedPatches: results.filter(function (r) {
              return r === false;
            }).length
          }
        };
      } catch (error) {
        console.warn('Diff computation failed, falling back to full replace:', error);
        return {
          hasChanges: true,
          patches: [],
          html: newHtml,
          statistics: {
            patchesCount: 0,
            successfulPatches: 0,
            failedPatches: 0
          }
        };
      }
    }
  }, {
    key: "applyDiffToElement",
    value: function applyDiffToElement(element, diff) {
      if (!diff || !diff.hasChanges) return false;
      try {
        // Если нет патчей или dmp не работал, используем полную замену
        if (!this.dmp || diff.patches.length === 0) {
          element.innerHTML = diff.html;
          return true;
        }
        if (diff.patches.length < 5) {
          element.innerHTML = diff.html;
          return true;
        }
        this.applyPatchesSmart(element, diff);
        return true;
      } catch (error) {
        console.warn('Failed to apply diff, falling back to full replace:', error);
        element.innerHTML = diff.html;
        return true;
      }
    }
  }, {
    key: "applyPatchesSmart",
    value: function applyPatchesSmart(element, diff) {
      var focusedElement = document.activeElement;
      var focusedElementId = focusedElement === null || focusedElement === void 0 ? void 0 : focusedElement.id;
      var selection = this.saveSelection();
      element.innerHTML = diff.html;
      if (focusedElementId) {
        var newFocusedElement = document.getElementById(focusedElementId);
        if (newFocusedElement && newFocusedElement.tagName === (focusedElement === null || focusedElement === void 0 ? void 0 : focusedElement.tagName)) {
          newFocusedElement.focus();
          this.restoreSelection(newFocusedElement, selection);
        }
      }
    }
  }, {
    key: "saveSelection",
    value: function saveSelection() {
      var sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return null;
      try {
        var range = sel.getRangeAt(0);
        return {
          startContainer: this.getNodePath(range.startContainer),
          startOffset: range.startOffset,
          endContainer: this.getNodePath(range.endContainer),
          endOffset: range.endOffset
        };
      } catch (e) {
        return null;
      }
    }
  }, {
    key: "restoreSelection",
    value: function restoreSelection(element, selection) {
      if (!selection) return;
      try {
        var startNode = this.findNodeByPath(element, selection.startContainer);
        var endNode = this.findNodeByPath(element, selection.endContainer);
        if (startNode && endNode) {
          var range = document.createRange();
          range.setStart(startNode, selection.startOffset);
          range.setEnd(endNode, selection.endOffset);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } catch (e) {
        // Ignore selection restoration errors
      }
    }
  }, {
    key: "getNodePath",
    value: function getNodePath(node) {
      if (!node || node === document.body) return 'body';
      var path = [];
      var currentNode = node;
      while (currentNode && currentNode !== document.body) {
        var index = 0;
        var sibling = currentNode.previousSibling;
        while (sibling) {
          index++;
          sibling = sibling.previousSibling;
        }
        path.unshift({
          tag: currentNode.nodeName,
          index: index
        });
        currentNode = currentNode.parentNode;
      }
      return path;
    }
  }, {
    key: "findNodeByPath",
    value: function findNodeByPath(root, path) {
      if (path === 'body') return document.body;
      if (!Array.isArray(path)) return null;
      var node = root;
      var _iterator = _createForOfIteratorHelper(path),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var segment = _step.value;
          var found = null;
          var index = 0;
          var _iterator2 = _createForOfIteratorHelper(node.childNodes),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var child = _step2.value;
              if (child.nodeName === segment.tag) {
                if (index === segment.index) {
                  found = child;
                  break;
                }
                index++;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (!found) return null;
          node = found;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return node;
    }
  }, {
    key: "getDiffReport",
    value: function getDiffReport(diff) {
      if (!diff.hasChanges) return 'No changes detected';
      return {
        summary: "".concat(diff.statistics.patchesCount, " patches applied, ").concat(diff.statistics.failedPatches, " failed"),
        patches: diff.patches.map(function (patch, index) {
          return {
            index: index,
            changes: patch.changes.length,
            successful: diff.results[index]
          };
        })
      };
    }
  }]);
}();

var WebSocketManager = /*#__PURE__*/function () {
  function WebSocketManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var pollingInstance = arguments.length > 1 ? arguments[1] : undefined;
    _classCallCheck(this, WebSocketManager);
    this.options = _objectSpread2({
      url: null,
      reconnectInterval: 5000,
      fallbackAfter: 3
    }, options);
    this.polling = pollingInstance;
    this.ws = null;
    this.errorCount = 0;
    this.reconnectTimer = null;
    this.eventHandlers = new Map();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  return _createClass(WebSocketManager, [{
    key: "connect",
    value: function connect() {
      if (!this.options.url) {
        console.error('WebSocket URL is required');
        return;
      }
      try {
        this.ws = new WebSocket(this.options.url);
        this.ws.onopen = this.handleOpen;
        this.ws.onmessage = this.handleMessage;
        this.ws.onerror = this.handleError;
        this.ws.onclose = this.handleClose;
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        this.handleFallback();
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    }
  }, {
    key: "handleOpen",
    value: function handleOpen() {
      this.errorCount = 0;
      this.emit('open');
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(event) {
      this.emit('message', event.data);
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      this.errorCount++;
      this.emit('error', error);
      if (this.errorCount >= this.options.fallbackAfter) {
        this.handleFallback();
      }
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      var _this = this;
      this.emit('close');
      if (this.polling.state.useWebSocket && this.errorCount < this.options.fallbackAfter) {
        this.reconnectTimer = setTimeout(function () {
          _this.connect();
        }, this.options.reconnectInterval);
      }
    }
  }, {
    key: "handleFallback",
    value: function handleFallback() {
      this.polling.state.useWebSocket = false;
      this.disconnect();
      this.emit('fallback');
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.ws && this.ws.readyState === WebSocket.OPEN;
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      if (!this.eventHandlers.has(event)) {
        this.eventHandlers.set(event, new Set());
      }
      this.eventHandlers.get(event).add(handler);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      if (this.eventHandlers.has(event)) {
        this.eventHandlers.get(event)["delete"](handler);
      }
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      if (this.eventHandlers.has(event)) {
        this.eventHandlers.get(event).forEach(function (handler) {
          try {
            handler(data);
          } catch (error) {
            console.error("Error in WebSocket ".concat(event, " handler:"), error);
          }
        });
      }
    }
  }]);
}();

var RetryStrategy = /*#__PURE__*/function () {
  function RetryStrategy() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, RetryStrategy);
    this.options = _objectSpread2({
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 30000,
      factor: 2,
      jitter: true
    }, options);
    this.reset();
  }
  return _createClass(RetryStrategy, [{
    key: "calculateDelay",
    value: function calculateDelay(attempt) {
      var delay = this.options.baseDelay * Math.pow(this.options.factor, attempt - 1);
      delay = Math.min(delay, this.options.maxDelay);
      if (this.options.jitter) {
        delay = delay * (0.5 + Math.random() * 0.5);
      }
      return Math.floor(delay);
    }
  }, {
    key: "shouldRetry",
    value: function shouldRetry(attempt, error) {
      this.state.lastAttempt = attempt;
      this.state.lastError = error;
      if (attempt >= this.options.maxAttempts) {
        this.state.exceededMaxAttempts = true;
        return false;
      }
      if (error && error.name === 'AbortError') {
        this.state.aborted = true;
        return false;
      }
      return true;
    }
  }, {
    key: "getDelayForAttempt",
    value: function getDelayForAttempt(attempt) {
      var delay = this.calculateDelay(attempt);
      this.state.lastDelay = delay;
      return delay;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.state = {
        attempt: 0,
        lastAttempt: null,
        lastError: null,
        lastDelay: null,
        exceededMaxAttempts: false,
        aborted: false,
        startTime: Date.now()
      };
    }
  }, {
    key: "resetAttempts",
    value: function resetAttempts() {
      this.state.attempt = 0;
      this.state.lastAttempt = null;
      this.state.lastError = null;
      this.state.lastDelay = null;
      this.state.exceededMaxAttempts = false;
      this.state.aborted = false;
    }
  }, {
    key: "getState",
    value: function getState() {
      return _objectSpread2({}, this.state);
    }
  }, {
    key: "isReset",
    value: function isReset() {
      return this.state.attempt === 0 && this.state.lastAttempt === null && this.state.lastError === null;
    }
  }]);
}();

var Logger = /*#__PURE__*/function () {
  function Logger() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _classCallCheck(this, Logger);
    this.debugMode = debug;
    this.prefix = '[Pollyx]';
  }
  return _createClass(Logger, [{
    key: "info",
    value: function info() {
      if (this.debugMode) {
        var _console;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_console = console).log.apply(_console, [this.prefix, '[INFO]'].concat(args));
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (this.debugMode) {
        var _console2;
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        (_console2 = console).warn.apply(_console2, [this.prefix, '[WARN]'].concat(args));
      }
    }
  }, {
    key: "error",
    value: function error() {
      var _console3;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      // Ошибки логируем всегда, независимо от debugMode
      (_console3 = console).error.apply(_console3, [this.prefix, '[ERROR]'].concat(args));
    }
  }, {
    key: "debug",
    value: function debug() {
      if (this.debugMode) {
        var _console4;
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        (_console4 = console).debug.apply(_console4, [this.prefix, '[DEBUG]'].concat(args));
      }
    }
  }, {
    key: "log",
    value: function log() {
      if (this.debugMode) {
        var _console5;
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        (_console5 = console).log.apply(_console5, [this.prefix, '[LOG]'].concat(args));
      }
    }
  }, {
    key: "setDebug",
    value: function setDebug(enabled) {
      this.debugMode = enabled;
    }
  }, {
    key: "isDebug",
    value: function isDebug() {
      return this.debugMode;
    }
  }]);
}();

var Pollyx = /*#__PURE__*/function () {
  function Pollyx(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Pollyx);
    if (!element) {
      throw new Error('Pollyx: Element is required');
    }
    this.id = Symbol('polling-instance');
    this.element = element;
    this.options = this.mergeOptions(Pollyx.defaultOptions, options);
    this.diffEngine = new DiffEngine();
    this.retryStrategy = new RetryStrategy(this.options.retry);
    this.wsManager = this.options.websocket.enabled ? new WebSocketManager(this.options.websocket, this) : null;
    this.logger = new Logger(this.options.debug);
    this.state = {
      fetching: false,
      retryCount: 0,
      error: null,
      lastUpdate: null,
      lastHtml: null,
      useWebSocket: this.options.websocket.enabled,
      wsErrorCount: 0,
      isActive: false
    };
    this.pendingRequests = new Map();
    this.intervalId = null;
    this.abortController = null;
    this.handlers = new Map();
    this.fetch = this.fetch.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleWebSocketMessage = this.handleWebSocketMessage.bind(this);
    Pollyx.instances.set(this.id, this);
    if (this.options.autoStart) {
      this.start();
    }
    this.logger.info('Pollyx initialized');
  }
  return _createClass(Pollyx, [{
    key: "mergeOptions",
    value: function mergeOptions(defaults, custom) {
      var merged = _objectSpread2({}, defaults);
      for (var key in custom) {
        if (key === 'retry' || key === 'websocket') {
          merged[key] = _objectSpread2(_objectSpread2({}, defaults[key]), custom[key]);
        } else {
          merged[key] = custom[key];
        }
      }
      return merged;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;
      if (this.state.isActive) {
        this.logger.warn('Polling already active');
        return;
      }
      this.state.isActive = true;
      this.state.retryCount = 0;
      if (this.wsManager && this.state.useWebSocket) {
        this.wsManager.connect();
        this.wsManager.on('message', this.handleWebSocketMessage);
      }
      this.intervalId = setInterval(function () {
        return _this.fetch();
      }, this.options.interval);
      this.addVisibilityListener();
      this.emitStatus('started');
      this.logger.info('Polling started');
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.state.isActive) return;
      this.state.isActive = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      if (this.wsManager) {
        this.wsManager.disconnect();
        this.wsManager.off('message', this.handleWebSocketMessage);
      }
      this.removeVisibilityListener();
      this.emitStatus('stopped');
      this.logger.info('Polling stopped');
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        var force,
          requestPromise,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              force = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
              if (!(!this.state.isActive && !force)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (!(this.state.fetching && !force)) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              if (!(this.options.deduplicate && this.pendingRequests.has(this.options.url))) {
                _context.n = 3;
                break;
              }
              this.logger.debug('Using cached request');
              return _context.a(2, this.pendingRequests.get(this.options.url));
            case 3:
              if (!(this.wsManager && this.state.useWebSocket && this.wsManager.isConnected())) {
                _context.n = 4;
                break;
              }
              this.logger.debug('Using WebSocket instead of fetch');
              return _context.a(2, null);
            case 4:
              this.abortController = new AbortController();
              this.state.fetching = true;
              this.state.error = null;
              this.emitStatus('fetching');
              this.logger.debug('Fetching...');
              requestPromise = this.performFetch();
              if (this.options.deduplicate) {
                this.pendingRequests.set(this.options.url, requestPromise);
                requestPromise["finally"](function () {
                  _this2.pendingRequests["delete"](_this2.options.url);
                });
              }
              return _context.a(2, requestPromise);
          }
        }, _callee, this);
      }));
      function fetch() {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
  }, {
    key: "performFetch",
    value: function () {
      var _performFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var response, html, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return fetch(this.options.url, {
                method: this.options.method,
                headers: this.options.headers,
                signal: this.abortController.signal
              });
            case 1:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 2;
                break;
              }
              throw new Error("HTTP ".concat(response.status, ": ").concat(response.statusText));
            case 2:
              _context2.n = 3;
              return response.text();
            case 3:
              html = _context2.v;
              this.state.retryCount = 0;
              this.state.lastUpdate = Date.now();
              _context2.n = 4;
              return this.processUpdate(html);
            case 4:
              if (typeof this.options.onUpdate === 'function') {
                this.options.onUpdate(html, this);
              }
              this.emitStatus('success');
              this.logger.debug('Fetch successful');
              return _context2.a(2, html);
            case 5:
              _context2.p = 5;
              _t = _context2.v;
              if (!(_t.name === 'AbortError')) {
                _context2.n = 6;
                break;
              }
              this.logger.debug('Fetch aborted');
              return _context2.a(2);
            case 6:
              this.state.error = _t;
              this.emitStatus('error', {
                error: _t.message
              });
              if (typeof this.options.onError === 'function') {
                this.options.onError(_t, this);
              }
              this.logger.error('Fetch failed', _t);
              if (!this.retryStrategy.shouldRetry(this.state.retryCount + 1, _t)) {
                _context2.n = 7;
                break;
              }
              _context2.n = 7;
              return this.retry();
            case 7:
              throw _t;
            case 8:
              _context2.p = 8;
              this.state.fetching = false;
              this.abortController = null;
              return _context2.f(8);
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 5, 8, 9]]);
      }));
      function performFetch() {
        return _performFetch.apply(this, arguments);
      }
      return performFetch;
    }()
  }, {
    key: "retry",
    value: function () {
      var _retry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var delay;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.state.retryCount++;
              delay = this.retryStrategy.getDelayForAttempt(this.state.retryCount);
              this.emitStatus('retrying', {
                attempt: this.state.retryCount,
                delay: delay
              });
              this.logger.debug('Retrying', {
                attempt: this.state.retryCount,
                delay: delay
              });
              _context3.n = 1;
              return new Promise(function (resolve) {
                return setTimeout(resolve, delay);
              });
            case 1:
              return _context3.a(2, this.fetch(true));
          }
        }, _callee3, this);
      }));
      function retry() {
        return _retry.apply(this, arguments);
      }
      return retry;
    }()
  }, {
    key: "processUpdate",
    value: function () {
      var _processUpdate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(newHtml) {
        var diff;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.options.diffUpdates) {
                _context4.n = 1;
                break;
              }
              this.element.innerHTML = newHtml;
              this.executeHandlers(newHtml, this.state.lastHtml);
              return _context4.a(2);
            case 1:
              diff = this.diffEngine.computeDiff(this.state.lastHtml || this.element.innerHTML, newHtml);
              if (diff.hasChanges) {
                this.diffEngine.applyDiffToElement(this.element, diff);
                this.executeHandlers(newHtml, this.state.lastHtml, diff);
                this.emitStatus('diff_applied', diff.statistics);
                this.logger.debug('Diff applied', diff.statistics);
              }
              this.state.lastHtml = newHtml;
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function processUpdate(_x) {
        return _processUpdate.apply(this, arguments);
      }
      return processUpdate;
    }()
  }, {
    key: "executeHandlers",
    value: function executeHandlers(newHtml, oldHtml) {
      var _this3 = this;
      var diff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.handlers.forEach(function (handler, name) {
        try {
          handler.call(_this3.element, newHtml, oldHtml, _this3, diff);
        } catch (error) {
          _this3.logger.error("Handler \"".concat(name, "\" failed"), error);
        }
      });
    }
  }, {
    key: "handleWebSocketMessage",
    value: function handleWebSocketMessage(data) {
      this.logger.debug('WebSocket message received');
      this.processUpdate(data);
    }
  }, {
    key: "registerHandler",
    value: function registerHandler(name, handler) {
      if (typeof handler !== 'function') {
        throw new Error('Handler must be a function');
      }
      this.handlers.set(name, handler);
      this.emitStatus('handler_registered', {
        name: name
      });
      this.logger.debug('Handler registered', {
        name: name
      });
    }
  }, {
    key: "unregisterHandler",
    value: function unregisterHandler(name) {
      this.handlers["delete"](name);
      this.emitStatus('handler_unregistered', {
        name: name
      });
    }
  }, {
    key: "addVisibilityListener",
    value: function addVisibilityListener() {
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }, {
    key: "removeVisibilityListener",
    value: function removeVisibilityListener() {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange() {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
        this.fetch();
      }
    }
  }, {
    key: "emitStatus",
    value: function emitStatus(status) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var event = new CustomEvent('pollyx:status', {
        detail: _objectSpread2({
          status: status,
          instance: this,
          timestamp: Date.now()
        }, data),
        bubbles: true
      });
      this.element.dispatchEvent(event);
      if (typeof this.options.onStatusChange === 'function') {
        this.options.onStatusChange(status, data, this);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      Pollyx.instances["delete"](this.id);
      this.logger.info('Pollyx destroyed');
    }
  }], [{
    key: "getInstance",
    value: function getInstance(id) {
      return Pollyx.instances.get(id);
    }
  }, {
    key: "getAllInstances",
    value: function getAllInstances() {
      return Array.from(Pollyx.instances.values());
    }
  }, {
    key: "stopAll",
    value: function stopAll() {
      Pollyx.instances.forEach(function (instance) {
        return instance.stop();
      });
    }
  }, {
    key: "startAll",
    value: function startAll() {
      Pollyx.instances.forEach(function (instance) {
        return instance.start();
      });
    }
  }, {
    key: "destroyAll",
    value: function destroyAll() {
      Pollyx.instances.forEach(function (instance) {
        return instance.destroy();
      });
    }
  }]);
}();
_defineProperty(Pollyx, "version", '1.0.1');
_defineProperty(Pollyx, "instances", new Map());
_defineProperty(Pollyx, "defaultOptions", {
  interval: 60000,
  url: typeof window !== 'undefined' ? window.location.href : '/',
  method: 'GET',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'text/html'
  },
  retry: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    factor: 2,
    jitter: true
  },
  deduplicate: true,
  diffUpdates: true,
  preserveFocus: true,
  websocket: {
    enabled: false,
    url: null,
    fallbackAfter: 3,
    reconnectInterval: 5000
  },
  autoStart: true,
  debug: false,
  onUpdate: null,
  onError: null,
  onStatusChange: null
});

function usePollingVue() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = ref(null);
  var error = ref(null);
  var isFetching = ref(false);
  var status = ref('idle');
  var pollingInstance = null;
  var elementRef = ref(null);
  onMounted(function () {
    if (!elementRef.value) {
      elementRef.value = document.createElement('div');
    }
    pollingInstance = new Pollyx(elementRef.value, _objectSpread2(_objectSpread2({}, options), {}, {
      onUpdate: function onUpdate(html, instance) {
        data.value = html;
        if (options.onUpdate) options.onUpdate(html, instance);
      },
      onError: function onError(err, instance) {
        error.value = err;
        if (options.onError) options.onError(err, instance);
      },
      onStatusChange: function onStatusChange(newStatus, data, instance) {
        status.value = newStatus;
        isFetching.value = newStatus === 'fetching';
        if (options.onStatusChange) options.onStatusChange(newStatus, data, instance);
      }
    }));
  });
  onUnmounted(function () {
    if (pollingInstance) {
      pollingInstance.destroy();
    }
  });
  return {
    data: readonly(data),
    error: readonly(error),
    isFetching: readonly(isFetching),
    status: readonly(status),
    start: function start() {
      var _pollingInstance;
      return (_pollingInstance = pollingInstance) === null || _pollingInstance === void 0 ? void 0 : _pollingInstance.start();
    },
    stop: function stop() {
      var _pollingInstance2;
      return (_pollingInstance2 = pollingInstance) === null || _pollingInstance2 === void 0 ? void 0 : _pollingInstance2.stop();
    },
    refetch: function refetch() {
      var _pollingInstance3;
      return (_pollingInstance3 = pollingInstance) === null || _pollingInstance3 === void 0 ? void 0 : _pollingInstance3.fetch(true);
    }
  };
}

export { usePollingVue };
//# sourceMappingURL=vue.js.map
