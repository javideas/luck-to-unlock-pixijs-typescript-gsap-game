import {
  CanvasPool,
  getTextureBatchBindGroup
} from "./chunk-MAVLJHSY.js";
import {
  BatchableSprite,
  BigPool,
  BindGroup,
  Bounds,
  Buffer,
  BufferImageSource,
  BufferUsage,
  CanvasSource,
  Color,
  Container,
  DOMAdapter,
  DefaultBatcher,
  ExtensionType,
  Geometry,
  GlProgram,
  GpuProgram,
  InstructionSet,
  Matrix,
  Point,
  Rectangle,
  RendererType,
  Shader,
  Sprite,
  State,
  Texture,
  TexturePool,
  TextureSource,
  TextureStyle,
  Ticker,
  UPDATE_PRIORITY,
  UniformGroup,
  ViewContainer,
  ViewableBuffer,
  __commonJS,
  __toESM,
  boundsPool,
  color32BitToUniform,
  colorBit,
  colorBitGl,
  compileHighShaderGlProgram,
  compileHighShaderGpuProgram,
  deprecation,
  eventemitter3_default,
  extensions,
  generateTextureBatchBit,
  generateTextureBatchBitGl,
  getAdjustedBlendModeBlend,
  getAttributeInfoFromFormat,
  getBatchSamplersUniformGroup,
  getGlobalBounds,
  getLocalBounds,
  getMaxTexturesPerBatch,
  localUniformBit,
  localUniformBitGl,
  matrixPool,
  nextPow2,
  require_earcut,
  roundPixelsBit,
  roundPixelsBitGl,
  uid,
  updateQuadBounds,
  v8_0_0,
  v8_3_4,
  warn
} from "./chunk-Q4ASCR63.js";

// node_modules/parse-svg-path/index.js
var require_parse_svg_path = __commonJS({
  "node_modules/parse-svg-path/index.js"(exports, module) {
    module.exports = parse2;
    var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
    var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
    function parse2(path2) {
      var data = [];
      path2.replace(segment, function(_, command, args) {
        var type = command.toLowerCase();
        args = parseValues(args);
        if (type == "m" && args.length > 2) {
          data.push([command].concat(args.splice(0, 2)));
          type = "l";
          command = command == "m" ? "l" : "L";
        }
        while (true) {
          if (args.length == length[type]) {
            args.unshift(command);
            return data.push(args);
          }
          if (args.length < length[type]) throw new Error("malformed path data");
          data.push([command].concat(args.splice(0, length[type])));
        }
      });
      return data;
    }
    var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
    function parseValues(args) {
      var numbers = args.match(number);
      return numbers ? numbers.map(Number) : [];
    }
  }
});

// node_modules/pixi.js/lib/app/ResizePlugin.mjs
var ResizePlugin = class {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(dom) {
          globalThis.removeEventListener("resize", this.queueResize);
          this._resizeTo = dom;
          if (dom) {
            globalThis.addEventListener("resize", this.queueResize);
            this.resize();
          }
        },
        get() {
          return this._resizeTo;
        }
      }
    );
    this.queueResize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      this._resizeId = requestAnimationFrame(() => this.resize());
    };
    this._cancelResize = () => {
      if (this._resizeId) {
        cancelAnimationFrame(this._resizeId);
        this._resizeId = null;
      }
    };
    this.resize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      let width;
      let height;
      if (this._resizeTo === globalThis.window) {
        width = globalThis.innerWidth;
        height = globalThis.innerHeight;
      } else {
        const { clientWidth, clientHeight } = this._resizeTo;
        width = clientWidth;
        height = clientHeight;
      }
      this.renderer.resize(width, height);
      this.render();
    };
    this._resizeId = null;
    this._resizeTo = null;
    this.resizeTo = options.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize);
    this._cancelResize();
    this._cancelResize = null;
    this.queueResize = null;
    this.resizeTo = null;
    this.resize = null;
  }
};
ResizePlugin.extension = ExtensionType.Application;

// node_modules/pixi.js/lib/app/TickerPlugin.mjs
var TickerPlugin = class {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options);
    Object.defineProperty(
      this,
      "ticker",
      {
        set(ticker) {
          if (this._ticker) {
            this._ticker.remove(this.render, this);
          }
          this._ticker = ticker;
          if (ticker) {
            ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
          }
        },
        get() {
          return this._ticker;
        }
      }
    );
    this.stop = () => {
      this._ticker.stop();
    };
    this.start = () => {
      this._ticker.start();
    };
    this._ticker = null;
    this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
    if (options.autoStart) {
      this.start();
    }
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null;
      oldTicker.destroy();
    }
  }
};
TickerPlugin.extension = ExtensionType.Application;

// node_modules/pixi.js/lib/assets/loader/parsers/LoaderParser.mjs
var LoaderParserPriority = ((LoaderParserPriority2) => {
  LoaderParserPriority2[LoaderParserPriority2["Low"] = 0] = "Low";
  LoaderParserPriority2[LoaderParserPriority2["Normal"] = 1] = "Normal";
  LoaderParserPriority2[LoaderParserPriority2["High"] = 2] = "High";
  return LoaderParserPriority2;
})(LoaderParserPriority || {});

// node_modules/pixi.js/lib/utils/path.mjs
function assertPath(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(path2)}`);
  }
}
function removeUrlParams(url) {
  const re = url.split("?")[0];
  return re.split("#")[0];
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
function normalizeStringPosix(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code = -1;
  for (let i = 0; i <= path2.length; ++i) {
    if (i < path2.length) {
      code = path2.charCodeAt(i);
    } else if (code === 47) {
      break;
    } else {
      code = 47;
    }
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) {
            res += "/..";
          } else {
            res = "..";
          }
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, i)}`;
        } else {
          res = path2.slice(lastSlash + 1, i);
        }
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var path = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(path2) {
    return replaceAll(path2, "\\", "/");
  },
  /**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */
  isUrl(path2) {
    return /^https?:/.test(this.toPosix(path2));
  },
  /**
   * Checks if the path is a data URL
   * @param path - The path to check
   */
  isDataUrl(path2) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(path2);
  },
  /**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */
  isBlobUrl(path2) {
    return path2.startsWith("blob:");
  },
  /**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */
  hasProtocol(path2) {
    return /^[^/:]+:/.test(this.toPosix(path2));
  },
  /**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */
  getProtocol(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    const matchFile = /^file:\/\/\//.exec(path2);
    if (matchFile) {
      return matchFile[0];
    }
    const matchProtocol = /^[^/:]+:\/{0,2}/.exec(path2);
    if (matchProtocol) {
      return matchProtocol[0];
    }
    return "";
  },
  /**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */
  toAbsolute(url, customBaseUrl, customRootUrl) {
    assertPath(url);
    if (this.isDataUrl(url) || this.isBlobUrl(url))
      return url;
    const baseUrl = removeUrlParams(this.toPosix(customBaseUrl ?? DOMAdapter.get().getBaseUrl()));
    const rootUrl = removeUrlParams(this.toPosix(customRootUrl ?? this.rootname(baseUrl)));
    url = this.toPosix(url);
    if (url.startsWith("/")) {
      return path.join(rootUrl, url.slice(1));
    }
    const absolutePath = this.isAbsolute(url) ? url : this.join(baseUrl, url);
    return absolutePath;
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(path2) {
    assertPath(path2);
    if (path2.length === 0)
      return ".";
    if (this.isDataUrl(path2) || this.isBlobUrl(path2))
      return path2;
    path2 = this.toPosix(path2);
    let protocol = "";
    const isAbsolute = path2.startsWith("/");
    if (this.hasProtocol(path2)) {
      protocol = this.rootname(path2);
      path2 = path2.slice(protocol.length);
    }
    const trailingSeparator = path2.endsWith("/");
    path2 = normalizeStringPosix(path2, false);
    if (path2.length > 0 && trailingSeparator)
      path2 += "/";
    if (isAbsolute)
      return `/${path2}`;
    return protocol + path2;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    if (this.hasProtocol(path2))
      return true;
    return path2.startsWith("/");
  },
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */
  join(...segments) {
    if (segments.length === 0) {
      return ".";
    }
    let joined;
    for (let i = 0; i < segments.length; ++i) {
      const arg = segments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === void 0)
          joined = arg;
        else {
          const prevArg = segments[i - 1] ?? "";
          if (this.joinExtensions.includes(this.extname(prevArg).toLowerCase())) {
            joined += `/../${arg}`;
          } else {
            joined += `/${arg}`;
          }
        }
      }
    }
    if (joined === void 0) {
      return ".";
    }
    return this.normalize(joined);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(path2) {
    assertPath(path2);
    if (path2.length === 0)
      return ".";
    path2 = this.toPosix(path2);
    let code = path2.charCodeAt(0);
    const hasRoot = code === 47;
    let end = -1;
    let matchedSlash = true;
    const proto = this.getProtocol(path2);
    const origpath = path2;
    path2 = path2.slice(proto.length);
    for (let i = path2.length - 1; i >= 1; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1)
      return hasRoot ? "/" : this.isUrl(origpath) ? proto + path2 : proto;
    if (hasRoot && end === 1)
      return "//";
    return proto + path2.slice(0, end);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    let root = "";
    if (path2.startsWith("/"))
      root = "/";
    else {
      root = this.getProtocol(path2);
    }
    if (this.isUrl(path2)) {
      const index = path2.indexOf("/", root.length);
      if (index !== -1) {
        root = path2.slice(0, index);
      } else
        root = path2;
      if (!root.endsWith("/"))
        root += "/";
    }
    return root;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(path2, ext) {
    assertPath(path2);
    if (ext)
      assertPath(ext);
    path2 = removeUrlParams(this.toPosix(path2));
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
      if (ext.length === path2.length && ext === path2)
        return "";
      let extIdx = ext.length - 1;
      let firstNonSlashEnd = -1;
      for (i = path2.length - 1; i >= 0; --i) {
        const code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path2.length;
      return path2.slice(start, end);
    }
    for (i = path2.length - 1; i >= 0; --i) {
      if (path2.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return path2.slice(start, end);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(path2) {
    assertPath(path2);
    path2 = removeUrlParams(this.toPosix(path2));
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for (let i = path2.length - 1; i >= 0; --i) {
      const code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(path2) {
    assertPath(path2);
    const ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path2.length === 0)
      return ret;
    path2 = removeUrlParams(this.toPosix(path2));
    let code = path2.charCodeAt(0);
    const isAbsolute = this.isAbsolute(path2);
    let start;
    const protocol = "";
    ret.root = this.rootname(path2);
    if (isAbsolute || this.hasProtocol(path2)) {
      start = 1;
    } else {
      start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path2.length - 1;
    let preDotState = 0;
    for (; i >= start; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute)
          ret.base = ret.name = path2.slice(1, end);
        else
          ret.base = ret.name = path2.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path2.slice(1, startDot);
        ret.base = path2.slice(1, end);
      } else {
        ret.name = path2.slice(startPart, startDot);
        ret.base = path2.slice(startPart, end);
      }
      ret.ext = path2.slice(startDot, end);
    }
    ret.dir = this.dirname(path2);
    if (protocol)
      ret.dir = protocol + ret.dir;
    return ret;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};

// node_modules/pixi.js/lib/assets/utils/convertToList.mjs
var convertToList = (input, transform2, forceTransform = false) => {
  if (!Array.isArray(input)) {
    input = [input];
  }
  if (!transform2) {
    return input;
  }
  return input.map((item) => {
    if (typeof item === "string" || forceTransform) {
      return transform2(item);
    }
    return item;
  });
};

// node_modules/pixi.js/lib/assets/utils/createStringVariations.mjs
function processX(base, ids, depth, result, tags) {
  const id = ids[depth];
  for (let i = 0; i < id.length; i++) {
    const value = id[i];
    if (depth < ids.length - 1) {
      processX(base.replace(result[depth], value), ids, depth + 1, result, tags);
    } else {
      tags.push(base.replace(result[depth], value));
    }
  }
}
function createStringVariations(string) {
  const regex = /\{(.*?)\}/g;
  const result = string.match(regex);
  const tags = [];
  if (result) {
    const ids = [];
    result.forEach((vars) => {
      const split = vars.substring(1, vars.length - 1).split(",");
      ids.push(split);
    });
    processX(string, ids, 0, result, tags);
  } else {
    tags.push(string);
  }
  return tags;
}

// node_modules/pixi.js/lib/assets/utils/isSingleItem.mjs
var isSingleItem = (item) => !Array.isArray(item);

// node_modules/pixi.js/lib/assets/resolver/Resolver.mjs
var Resolver = class {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (bundleId, assetId) => `${bundleId}${this._bundleIdConnector}${assetId}`,
      extractAssetIdFromBundle: (bundleId, assetBundleId) => assetBundleId.replace(`${bundleId}${this._bundleIdConnector}`, "")
    };
    this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector;
    this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId;
    this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle;
    this._assetMap = {};
    this._preferredOrder = [];
    this._parsers = [];
    this._resolverHash = {};
    this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(bundleIdentifier) {
    this._bundleIdConnector = bundleIdentifier.connector ?? this._bundleIdConnector;
    this._createBundleAssetId = bundleIdentifier.createBundleAssetId ?? this._createBundleAssetId;
    this._extractAssetIdFromBundle = bundleIdentifier.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle;
    if (this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar") {
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
    }
  }
  /**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */
  prefer(...preferOrders) {
    preferOrders.forEach((prefer) => {
      this._preferredOrder.push(prefer);
      if (!prefer.priority) {
        prefer.priority = Object.keys(prefer.params);
      }
    });
    this._resolverHash = {};
  }
  /**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */
  set basePath(basePath) {
    this._basePath = basePath;
  }
  get basePath() {
    return this._basePath;
  }
  /**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */
  set rootPath(rootPath) {
    this._rootPath = rootPath;
  }
  get rootPath() {
    return this._rootPath;
  }
  /**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */
  get parsers() {
    return this._parsers;
  }
  /** Used for testing, this resets the resolver to its initial state */
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions);
    this._assetMap = {};
    this._preferredOrder = [];
    this._resolverHash = {};
    this._rootPath = null;
    this._basePath = null;
    this._manifest = null;
    this._bundles = {};
    this._defaultSearchParams = null;
  }
  /**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */
  setDefaultSearchParams(searchParams) {
    if (typeof searchParams === "string") {
      this._defaultSearchParams = searchParams;
    } else {
      const queryValues = searchParams;
      this._defaultSearchParams = Object.keys(queryValues).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryValues[key])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(asset) {
    const { alias, src } = asset;
    const aliasesToUse = convertToList(
      alias || src,
      (value) => {
        if (typeof value === "string")
          return value;
        if (Array.isArray(value))
          return value.map((v) => (v == null ? void 0 : v.src) ?? v);
        if (value == null ? void 0 : value.src)
          return value.src;
        return value;
      },
      true
    );
    return aliasesToUse;
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(manifest) {
    if (this._manifest) {
      warn("[Resolver] Manifest already exists, this will be overwritten");
    }
    this._manifest = manifest;
    manifest.bundles.forEach((bundle) => {
      this.addBundle(bundle.name, bundle.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(bundleId, assets) {
    const assetNames = [];
    let convertedAssets = assets;
    if (!Array.isArray(assets)) {
      convertedAssets = Object.entries(assets).map(([alias, src]) => {
        if (typeof src === "string" || Array.isArray(src)) {
          return { alias, src };
        }
        return { alias, ...src };
      });
    }
    convertedAssets.forEach((asset) => {
      const srcs = asset.src;
      const aliases = asset.alias;
      let ids;
      if (typeof aliases === "string") {
        const bundleAssetId = this._createBundleAssetId(bundleId, aliases);
        assetNames.push(bundleAssetId);
        ids = [aliases, bundleAssetId];
      } else {
        const bundleIds = aliases.map((name) => this._createBundleAssetId(bundleId, name));
        assetNames.push(...bundleIds);
        ids = [...aliases, ...bundleIds];
      }
      this.add({
        ...asset,
        ...{
          alias: ids,
          src: srcs
        }
      });
    });
    this._bundles[bundleId] = assetNames;
  }
  /**
   * Tells the resolver what keys are associated with witch asset.
   * The most important thing the resolver does
   * @example
   * // Single key, single asset:
   * resolver.add({alias: 'foo', src: 'bar.png');
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Multiple keys, single asset:
   * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
   * resolver.resolveUrl('foo') // => 'bar.png'
   * resolver.resolveUrl('boo') // => 'bar.png'
   *
   * // Multiple keys, multiple assets:
   * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Add custom data attached to the resolver
   * Resolver.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
   * @param aliases - the UnresolvedAsset or array of UnresolvedAssets to add to the resolver
   */
  add(aliases) {
    const assets = [];
    if (Array.isArray(aliases)) {
      assets.push(...aliases);
    } else {
      assets.push(aliases);
    }
    let keyCheck;
    keyCheck = (key) => {
      if (this.hasKey(key)) {
        warn(`[Resolver] already has key: ${key} overwriting`);
      }
    };
    const assetArray = convertToList(assets);
    assetArray.forEach((asset) => {
      const { src } = asset;
      let { data, format, loadParser } = asset;
      const srcsToUse = convertToList(src).map((src2) => {
        if (typeof src2 === "string") {
          return createStringVariations(src2);
        }
        return Array.isArray(src2) ? src2 : [src2];
      });
      const aliasesToUse = this.getAlias(asset);
      Array.isArray(aliasesToUse) ? aliasesToUse.forEach(keyCheck) : keyCheck(aliasesToUse);
      const resolvedAssets = [];
      srcsToUse.forEach((srcs) => {
        srcs.forEach((src2) => {
          let formattedAsset = {};
          if (typeof src2 !== "object") {
            formattedAsset.src = src2;
            for (let i = 0; i < this._parsers.length; i++) {
              const parser = this._parsers[i];
              if (parser.test(src2)) {
                formattedAsset = parser.parse(src2);
                break;
              }
            }
          } else {
            data = src2.data ?? data;
            format = src2.format ?? format;
            loadParser = src2.loadParser ?? loadParser;
            formattedAsset = {
              ...formattedAsset,
              ...src2
            };
          }
          if (!aliasesToUse) {
            throw new Error(`[Resolver] alias is undefined for this asset: ${formattedAsset.src}`);
          }
          formattedAsset = this._buildResolvedAsset(formattedAsset, {
            aliases: aliasesToUse,
            data,
            format,
            loadParser
          });
          resolvedAssets.push(formattedAsset);
        });
      });
      aliasesToUse.forEach((alias) => {
        this._assetMap[alias] = resolvedAssets;
      });
    });
  }
  // TODO: this needs an overload like load did in Assets
  /**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */
  resolveBundle(bundleIds) {
    const singleAsset = isSingleItem(bundleIds);
    bundleIds = convertToList(bundleIds);
    const out2 = {};
    bundleIds.forEach((bundleId) => {
      const assetNames = this._bundles[bundleId];
      if (assetNames) {
        const results = this.resolve(assetNames);
        const assets = {};
        for (const key in results) {
          const asset = results[key];
          assets[this._extractAssetIdFromBundle(bundleId, key)] = asset;
        }
        out2[bundleId] = assets;
      }
    });
    return singleAsset ? out2[bundleIds[0]] : out2;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(key) {
    const result = this.resolve(key);
    if (typeof key !== "string") {
      const out2 = {};
      for (const i in result) {
        out2[i] = result[i].src;
      }
      return out2;
    }
    return result.src;
  }
  resolve(keys) {
    const singleAsset = isSingleItem(keys);
    keys = convertToList(keys);
    const result = {};
    keys.forEach((key) => {
      if (!this._resolverHash[key]) {
        if (this._assetMap[key]) {
          let assets = this._assetMap[key];
          const preferredOrder = this._getPreferredOrder(assets);
          preferredOrder == null ? void 0 : preferredOrder.priority.forEach((priorityKey) => {
            preferredOrder.params[priorityKey].forEach((value) => {
              const filteredAssets = assets.filter((asset) => {
                if (asset[priorityKey]) {
                  return asset[priorityKey] === value;
                }
                return false;
              });
              if (filteredAssets.length) {
                assets = filteredAssets;
              }
            });
          });
          this._resolverHash[key] = assets[0];
        } else {
          this._resolverHash[key] = this._buildResolvedAsset({
            alias: [key],
            src: key
          }, {});
        }
      }
      result[key] = this._resolverHash[key];
    });
    return singleAsset ? result[keys[0]] : result;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(key) {
    return !!this._assetMap[key];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(key) {
    return !!this._bundles[key];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(assets) {
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[0];
      const preferred = this._preferredOrder.find((preference) => preference.params.format.includes(asset.format));
      if (preferred) {
        return preferred;
      }
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(url) {
    if (!this._defaultSearchParams)
      return url;
    const paramConnector = /\?/.test(url) ? "&" : "?";
    return `${url}${paramConnector}${this._defaultSearchParams}`;
  }
  _buildResolvedAsset(formattedAsset, data) {
    const { aliases, data: assetData, loadParser, format } = data;
    if (this._basePath || this._rootPath) {
      formattedAsset.src = path.toAbsolute(formattedAsset.src, this._basePath, this._rootPath);
    }
    formattedAsset.alias = aliases ?? formattedAsset.alias ?? [formattedAsset.src];
    formattedAsset.src = this._appendDefaultSearchParams(formattedAsset.src);
    formattedAsset.data = { ...assetData || {}, ...formattedAsset.data };
    formattedAsset.loadParser = loadParser ?? formattedAsset.loadParser;
    formattedAsset.format = format ?? formattedAsset.format ?? getUrlExtension(formattedAsset.src);
    return formattedAsset;
  }
};
Resolver.RETINA_PREFIX = /@([0-9\.]+)x/;
function getUrlExtension(url) {
  return url.split(".").pop().split("?").shift().split("#").shift();
}

// node_modules/pixi.js/lib/assets/utils/copySearchParams.mjs
var copySearchParams = (targetUrl, sourceUrl) => {
  const searchParams = sourceUrl.split("?")[1];
  if (searchParams) {
    targetUrl += `?${searchParams}`;
  }
  return targetUrl;
};

// node_modules/pixi.js/lib/spritesheet/Spritesheet.mjs
var _Spritesheet = class _Spritesheet2 {
  /**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   */
  constructor(texture, data) {
    this.linkedSheets = [];
    this._texture = texture instanceof Texture ? texture : null;
    this.textureSource = texture.source;
    this.textures = {};
    this.animations = {};
    this.data = data;
    const metaResolution = parseFloat(data.meta.scale);
    if (metaResolution) {
      this.resolution = metaResolution;
      texture.source.resolution = this.resolution;
    } else {
      this.resolution = texture.source._resolution;
    }
    this._frames = this.data.frames;
    this._frameKeys = Object.keys(this._frames);
    this._batchIndex = 0;
    this._callback = null;
  }
  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   */
  parse() {
    return new Promise((resolve) => {
      this._callback = resolve;
      this._batchIndex = 0;
      if (this._frameKeys.length <= _Spritesheet2.BATCH_SIZE) {
        this._processFrames(0);
        this._processAnimations();
        this._parseComplete();
      } else {
        this._nextBatch();
      }
    });
  }
  /**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */
  _processFrames(initialFrameIndex) {
    let frameIndex = initialFrameIndex;
    const maxFrames = _Spritesheet2.BATCH_SIZE;
    while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
      const i = this._frameKeys[frameIndex];
      const data = this._frames[i];
      const rect = data.frame;
      if (rect) {
        let frame = null;
        let trim = null;
        const sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame;
        const orig = new Rectangle(
          0,
          0,
          Math.floor(sourceSize.w) / this.resolution,
          Math.floor(sourceSize.h) / this.resolution
        );
        if (data.rotated) {
          frame = new Rectangle(
            Math.floor(rect.x) / this.resolution,
            Math.floor(rect.y) / this.resolution,
            Math.floor(rect.h) / this.resolution,
            Math.floor(rect.w) / this.resolution
          );
        } else {
          frame = new Rectangle(
            Math.floor(rect.x) / this.resolution,
            Math.floor(rect.y) / this.resolution,
            Math.floor(rect.w) / this.resolution,
            Math.floor(rect.h) / this.resolution
          );
        }
        if (data.trimmed !== false && data.spriteSourceSize) {
          trim = new Rectangle(
            Math.floor(data.spriteSourceSize.x) / this.resolution,
            Math.floor(data.spriteSourceSize.y) / this.resolution,
            Math.floor(rect.w) / this.resolution,
            Math.floor(rect.h) / this.resolution
          );
        }
        this.textures[i] = new Texture({
          source: this.textureSource,
          frame,
          orig,
          trim,
          rotate: data.rotated ? 2 : 0,
          defaultAnchor: data.anchor,
          defaultBorders: data.borders,
          label: i.toString()
        });
      }
      frameIndex++;
    }
  }
  /** Parse animations config. */
  _processAnimations() {
    const animations = this.data.animations || {};
    for (const animName in animations) {
      this.animations[animName] = [];
      for (let i = 0; i < animations[animName].length; i++) {
        const frameName = animations[animName][i];
        this.animations[animName].push(this.textures[frameName]);
      }
    }
  }
  /** The parse has completed. */
  _parseComplete() {
    const callback = this._callback;
    this._callback = null;
    this._batchIndex = 0;
    callback.call(this, this.textures);
  }
  /** Begin the next batch of textures. */
  _nextBatch() {
    this._processFrames(this._batchIndex * _Spritesheet2.BATCH_SIZE);
    this._batchIndex++;
    setTimeout(() => {
      if (this._batchIndex * _Spritesheet2.BATCH_SIZE < this._frameKeys.length) {
        this._nextBatch();
      } else {
        this._processAnimations();
        this._parseComplete();
      }
    }, 0);
  }
  /**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */
  destroy(destroyBase = false) {
    var _a;
    for (const i in this.textures) {
      this.textures[i].destroy();
    }
    this._frames = null;
    this._frameKeys = null;
    this.data = null;
    this.textures = null;
    if (destroyBase) {
      (_a = this._texture) == null ? void 0 : _a.destroy();
      this.textureSource.destroy();
    }
    this._texture = null;
    this.textureSource = null;
    this.linkedSheets = [];
  }
};
_Spritesheet.BATCH_SIZE = 1e3;
var Spritesheet = _Spritesheet;

// node_modules/pixi.js/lib/spritesheet/spritesheetAsset.mjs
var validImages = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "basis",
  "etc2",
  "bc7",
  "bc6h",
  "bc5",
  "bc4",
  "bc3",
  "bc2",
  "bc1",
  "eac",
  "astc"
];
function getCacheableAssets(keys, asset, ignoreMultiPack) {
  const out2 = {};
  keys.forEach((key) => {
    out2[key] = asset;
  });
  Object.keys(asset.textures).forEach((key) => {
    out2[key] = asset.textures[key];
  });
  if (!ignoreMultiPack) {
    const basePath = path.dirname(keys[0]);
    asset.linkedSheets.forEach((item, i) => {
      const out22 = getCacheableAssets([`${basePath}/${asset.data.meta.related_multi_packs[i]}`], item, true);
      Object.assign(out2, out22);
    });
  }
  return out2;
}
var spritesheetAsset = {
  extension: ExtensionType.Asset,
  /** Handle the caching of the related Spritesheet Textures */
  cache: {
    test: (asset) => asset instanceof Spritesheet,
    getCacheableAssets: (keys, asset) => getCacheableAssets(keys, asset, false)
  },
  /** Resolve the resolution of the asset. */
  resolver: {
    extension: {
      type: ExtensionType.ResolveParser,
      name: "resolveSpritesheet"
    },
    test: (value) => {
      const tempURL = value.split("?")[0];
      const split = tempURL.split(".");
      const extension = split.pop();
      const format = split.pop();
      return extension === "json" && validImages.includes(format);
    },
    parse: (value) => {
      var _a;
      const split = value.split(".");
      return {
        resolution: parseFloat(((_a = Resolver.RETINA_PREFIX.exec(value)) == null ? void 0 : _a[1]) ?? "1"),
        format: split[split.length - 2],
        src: value
      };
    }
  },
  /**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into Spritesheet
   * All textures in the sprite sheet are then added to the cache
   */
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
      name: "spritesheetLoader"
    },
    async testParse(asset, options) {
      return path.extname(options.src).toLowerCase() === ".json" && !!asset.frames;
    },
    async parse(asset, options, loader) {
      var _a, _b;
      const {
        texture: imageTexture,
        // if user need to use preloaded texture
        imageFilename
        // if user need to use custom filename (not from jsonFile.meta.image)
      } = (options == null ? void 0 : options.data) ?? {};
      let basePath = path.dirname(options.src);
      if (basePath && basePath.lastIndexOf("/") !== basePath.length - 1) {
        basePath += "/";
      }
      let texture;
      if (imageTexture instanceof Texture) {
        texture = imageTexture;
      } else {
        const imagePath = copySearchParams(basePath + (imageFilename ?? asset.meta.image), options.src);
        const assets = await loader.load([imagePath]);
        texture = assets[imagePath];
      }
      const spritesheet = new Spritesheet(
        texture.source,
        asset
      );
      await spritesheet.parse();
      const multiPacks = (_a = asset == null ? void 0 : asset.meta) == null ? void 0 : _a.related_multi_packs;
      if (Array.isArray(multiPacks)) {
        const promises = [];
        for (const item of multiPacks) {
          if (typeof item !== "string") {
            continue;
          }
          let itemUrl = basePath + item;
          if ((_b = options.data) == null ? void 0 : _b.ignoreMultiPack) {
            continue;
          }
          itemUrl = copySearchParams(itemUrl, options.src);
          promises.push(loader.load({
            src: itemUrl,
            data: {
              ignoreMultiPack: true
            }
          }));
        }
        const res = await Promise.all(promises);
        spritesheet.linkedSheets = res;
        res.forEach((item) => {
          item.linkedSheets = [spritesheet].concat(spritesheet.linkedSheets.filter((sp) => sp !== item));
        });
      }
      return spritesheet;
    },
    async unload(spritesheet, _resolvedAsset, loader) {
      await loader.unload(spritesheet.textureSource._sourceOrigin);
      spritesheet.destroy(false);
    }
  }
};

// node_modules/pixi.js/lib/spritesheet/init.mjs
extensions.add(spritesheetAsset);

// node_modules/pixi.js/lib/rendering/mask/utils/addMaskBounds.mjs
var tempBounds = new Bounds();
function addMaskBounds(mask, bounds, skipUpdateTransform) {
  const boundsToMask = tempBounds;
  mask.measurable = true;
  getGlobalBounds(mask, skipUpdateTransform, boundsToMask);
  bounds.addBoundsMask(boundsToMask);
  mask.measurable = false;
}

// node_modules/pixi.js/lib/rendering/mask/utils/addMaskLocalBounds.mjs
function addMaskLocalBounds(mask, bounds, localRoot) {
  const boundsToMask = boundsPool.get();
  mask.measurable = true;
  const tempMatrix3 = matrixPool.get().identity();
  const relativeMask = getMatrixRelativeToParent(mask, localRoot, tempMatrix3);
  getLocalBounds(mask, boundsToMask, relativeMask);
  mask.measurable = false;
  bounds.addBoundsMask(boundsToMask);
  matrixPool.return(tempMatrix3);
  boundsPool.return(boundsToMask);
}
function getMatrixRelativeToParent(target, root, matrix) {
  if (!target) {
    warn("Mask bounds, renderable is not inside the root container");
    return matrix;
  }
  if (target !== root) {
    getMatrixRelativeToParent(target.parent, root, matrix);
    target.updateLocalTransform();
    matrix.append(target.localTransform);
  }
  return matrix;
}

// node_modules/pixi.js/lib/rendering/mask/alpha/AlphaMask.mjs
var AlphaMask = class {
  constructor(options) {
    this.priority = 0;
    this.inverse = false;
    this.pipe = "alphaMask";
    if (options == null ? void 0 : options.mask) {
      this.init(options.mask);
    }
  }
  init(mask) {
    this.mask = mask;
    this.renderMaskToTexture = !(mask instanceof Sprite);
    this.mask.renderable = this.renderMaskToTexture;
    this.mask.includeInBuild = !this.renderMaskToTexture;
    this.mask.measurable = false;
  }
  reset() {
    this.mask.measurable = true;
    this.mask = null;
  }
  addBounds(bounds, skipUpdateTransform) {
    if (!this.inverse) {
      addMaskBounds(this.mask, bounds, skipUpdateTransform);
    }
  }
  addLocalBounds(bounds, localRoot) {
    addMaskLocalBounds(this.mask, bounds, localRoot);
  }
  containsPoint(point, hitTestFn) {
    const mask = this.mask;
    return hitTestFn(mask, point);
  }
  destroy() {
    this.reset();
  }
  static test(mask) {
    return mask instanceof Sprite;
  }
};
AlphaMask.extension = ExtensionType.MaskEffect;

// node_modules/pixi.js/lib/rendering/mask/color/ColorMask.mjs
var ColorMask = class {
  constructor(options) {
    this.priority = 0;
    this.pipe = "colorMask";
    if (options == null ? void 0 : options.mask) {
      this.init(options.mask);
    }
  }
  init(mask) {
    this.mask = mask;
  }
  destroy() {
  }
  static test(mask) {
    return typeof mask === "number";
  }
};
ColorMask.extension = ExtensionType.MaskEffect;

// node_modules/pixi.js/lib/rendering/mask/stencil/StencilMask.mjs
var StencilMask = class {
  constructor(options) {
    this.priority = 0;
    this.pipe = "stencilMask";
    if (options == null ? void 0 : options.mask) {
      this.init(options.mask);
    }
  }
  init(mask) {
    this.mask = mask;
    this.mask.includeInBuild = false;
    this.mask.measurable = false;
  }
  reset() {
    this.mask.measurable = true;
    this.mask.includeInBuild = true;
    this.mask = null;
  }
  addBounds(bounds, skipUpdateTransform) {
    addMaskBounds(this.mask, bounds, skipUpdateTransform);
  }
  addLocalBounds(bounds, localRoot) {
    addMaskLocalBounds(this.mask, bounds, localRoot);
  }
  containsPoint(point, hitTestFn) {
    const mask = this.mask;
    return hitTestFn(mask, point);
  }
  destroy() {
    this.reset();
  }
  static test(mask) {
    return mask instanceof Container;
  }
};
StencilMask.extension = ExtensionType.MaskEffect;

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/ImageSource.mjs
var ImageSource = class extends TextureSource {
  constructor(options) {
    if (options.resource && (globalThis.HTMLImageElement && options.resource instanceof HTMLImageElement)) {
      const canvas = DOMAdapter.get().createCanvas(options.resource.width, options.resource.height);
      const context = canvas.getContext("2d");
      context.drawImage(options.resource, 0, 0, options.resource.width, options.resource.height);
      options.resource = canvas;
      warn("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
    }
    super(options);
    this.uploadMethodId = "image";
    this.autoGarbageCollect = true;
  }
  static test(resource) {
    return globalThis.HTMLImageElement && resource instanceof HTMLImageElement || typeof ImageBitmap !== "undefined" && resource instanceof ImageBitmap || globalThis.VideoFrame && resource instanceof VideoFrame;
  }
};
ImageSource.extension = ExtensionType.TextureSource;

// node_modules/pixi.js/lib/utils/browser/detectVideoAlphaMode.mjs
var promise;
async function detectVideoAlphaMode() {
  promise ?? (promise = (async () => {
    var _a;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
      return "premultiply-alpha-on-upload";
    }
    const video = await new Promise((resolve) => {
      const video2 = document.createElement("video");
      video2.onloadeddata = () => resolve(video2);
      video2.onerror = () => resolve(null);
      video2.autoplay = false;
      video2.crossOrigin = "anonymous";
      video2.preload = "auto";
      video2.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=";
      video2.load();
    });
    if (!video) {
      return "premultiply-alpha-on-upload";
    }
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    const pixel = new Uint8Array(4);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    gl.deleteFramebuffer(framebuffer);
    gl.deleteTexture(texture);
    (_a = gl.getExtension("WEBGL_lose_context")) == null ? void 0 : _a.loseContext();
    return pixel[0] <= pixel[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
  })());
  return promise;
}

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/VideoSource.mjs
var _VideoSource = class _VideoSource2 extends TextureSource {
  constructor(options) {
    super(options);
    this.isReady = false;
    this.uploadMethodId = "video";
    options = {
      ..._VideoSource2.defaultOptions,
      ...options
    };
    this._autoUpdate = true;
    this._isConnectedToTicker = false;
    this._updateFPS = options.updateFPS || 0;
    this._msToNextUpdate = 0;
    this.autoPlay = options.autoPlay !== false;
    this.alphaMode = options.alphaMode ?? "premultiply-alpha-on-upload";
    this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this);
    this._videoFrameRequestCallbackHandle = null;
    this._load = null;
    this._resolve = null;
    this._reject = null;
    this._onCanPlay = this._onCanPlay.bind(this);
    this._onCanPlayThrough = this._onCanPlayThrough.bind(this);
    this._onError = this._onError.bind(this);
    this._onPlayStart = this._onPlayStart.bind(this);
    this._onPlayStop = this._onPlayStop.bind(this);
    this._onSeeked = this._onSeeked.bind(this);
    if (options.autoLoad !== false) {
      void this.load();
    }
  }
  /** Update the video frame if the source is not destroyed and meets certain conditions. */
  updateFrame() {
    if (this.destroyed) {
      return;
    }
    if (this._updateFPS) {
      const elapsedMS = Ticker.shared.elapsedMS * this.resource.playbackRate;
      this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
    }
    if (!this._updateFPS || this._msToNextUpdate <= 0) {
      this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0;
    }
    if (this.isValid) {
      this.update();
    }
  }
  /** Callback to update the video frame and potentially request the next frame update. */
  _videoFrameRequestCallback() {
    this.updateFrame();
    if (this.destroyed) {
      this._videoFrameRequestCallbackHandle = null;
    } else {
      this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
        this._videoFrameRequestCallback
      );
    }
  }
  /**
   * Checks if the resource has valid dimensions.
   * @returns {boolean} True if width and height are set, otherwise false.
   */
  get isValid() {
    return !!this.resource.videoWidth && !!this.resource.videoHeight;
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<this>} Handle the validate event
   */
  async load() {
    if (this._load) {
      return this._load;
    }
    const source = this.resource;
    const options = this.options;
    if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
      source.complete = true;
    }
    source.addEventListener("play", this._onPlayStart);
    source.addEventListener("pause", this._onPlayStop);
    source.addEventListener("seeked", this._onSeeked);
    if (!this._isSourceReady()) {
      if (!options.preload) {
        source.addEventListener("canplay", this._onCanPlay);
      }
      source.addEventListener("canplaythrough", this._onCanPlayThrough);
      source.addEventListener("error", this._onError, true);
    } else {
      this._mediaReady();
    }
    this.alphaMode = await detectVideoAlphaMode();
    this._load = new Promise((resolve, reject) => {
      if (this.isValid) {
        resolve(this);
      } else {
        this._resolve = resolve;
        this._reject = reject;
        if (options.preloadTimeoutMs !== void 0) {
          this._preloadTimeout = setTimeout(() => {
            this._onError(new ErrorEvent(`Preload exceeded timeout of ${options.preloadTimeoutMs}ms`));
          });
        }
        source.load();
      }
    });
    return this._load;
  }
  /**
   * Handle video error events.
   * @param event - The error event
   */
  _onError(event) {
    this.resource.removeEventListener("error", this._onError, true);
    this.emit("error", event);
    if (this._reject) {
      this._reject(event);
      this._reject = null;
      this._resolve = null;
    }
  }
  /**
   * Checks if the underlying source is playing.
   * @returns True if playing.
   */
  _isSourcePlaying() {
    const source = this.resource;
    return !source.paused && !source.ended;
  }
  /**
   * Checks if the underlying source is ready for playing.
   * @returns True if ready.
   */
  _isSourceReady() {
    const source = this.resource;
    return source.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    if (!this.isValid) {
      this._mediaReady();
    }
    this._configureAutoUpdate();
  }
  /** Stops the update loop when a pause event is triggered. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Handles behavior when the video completes seeking to the current playback position. */
  _onSeeked() {
    if (this._autoUpdate && !this._isSourcePlaying()) {
      this._msToNextUpdate = 0;
      this.updateFrame();
      this._msToNextUpdate = 0;
    }
  }
  _onCanPlay() {
    const source = this.resource;
    source.removeEventListener("canplay", this._onCanPlay);
    this._mediaReady();
  }
  _onCanPlayThrough() {
    const source = this.resource;
    source.removeEventListener("canplaythrough", this._onCanPlay);
    if (this._preloadTimeout) {
      clearTimeout(this._preloadTimeout);
      this._preloadTimeout = void 0;
    }
    this._mediaReady();
  }
  /** Fired when the video is loaded and ready to play. */
  _mediaReady() {
    const source = this.resource;
    if (this.isValid) {
      this.isReady = true;
      this.resize(source.videoWidth, source.videoHeight);
    }
    this._msToNextUpdate = 0;
    this.updateFrame();
    this._msToNextUpdate = 0;
    if (this._resolve) {
      this._resolve(this);
      this._resolve = null;
      this._reject = null;
    }
    if (this._isSourcePlaying()) {
      this._onPlayStart();
    } else if (this.autoPlay) {
      void this.resource.play();
    }
  }
  /** Cleans up resources and event listeners associated with this texture. */
  destroy() {
    this._configureAutoUpdate();
    const source = this.resource;
    if (source) {
      source.removeEventListener("play", this._onPlayStart);
      source.removeEventListener("pause", this._onPlayStop);
      source.removeEventListener("seeked", this._onSeeked);
      source.removeEventListener("canplay", this._onCanPlay);
      source.removeEventListener("canplaythrough", this._onCanPlayThrough);
      source.removeEventListener("error", this._onError, true);
      source.pause();
      source.src = "";
      source.load();
    }
    super.destroy();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      this._configureAutoUpdate();
    }
  }
  /**
   * How many times a second to update the texture from the video.
   * Leave at 0 to update at every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(value) {
    if (value !== this._updateFPS) {
      this._updateFPS = value;
      this._configureAutoUpdate();
    }
  }
  /**
   * Configures the updating mechanism based on the current state and settings.
   *
   * This method decides between using the browser's native video frame callback or a custom ticker
   * for updating the video frame. It ensures optimal performance and responsiveness
   * based on the video's state, playback status, and the desired frames-per-second setting.
   *
   * - If `_autoUpdate` is enabled and the video source is playing:
   *   - It will prefer the native video frame callback if available and no specific FPS is set.
   *   - Otherwise, it will use a custom ticker for manual updates.
   * - If `_autoUpdate` is disabled or the video isn't playing, any active update mechanisms are halted.
   */
  _configureAutoUpdate() {
    if (this._autoUpdate && this._isSourcePlaying()) {
      if (!this._updateFPS && this.resource.requestVideoFrameCallback) {
        if (this._isConnectedToTicker) {
          Ticker.shared.remove(this.updateFrame, this);
          this._isConnectedToTicker = false;
          this._msToNextUpdate = 0;
        }
        if (this._videoFrameRequestCallbackHandle === null) {
          this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
            this._videoFrameRequestCallback
          );
        }
      } else {
        if (this._videoFrameRequestCallbackHandle !== null) {
          this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle);
          this._videoFrameRequestCallbackHandle = null;
        }
        if (!this._isConnectedToTicker) {
          Ticker.shared.add(this.updateFrame, this);
          this._isConnectedToTicker = true;
          this._msToNextUpdate = 0;
        }
      }
    } else {
      if (this._videoFrameRequestCallbackHandle !== null) {
        this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle);
        this._videoFrameRequestCallbackHandle = null;
      }
      if (this._isConnectedToTicker) {
        Ticker.shared.remove(this.updateFrame, this);
        this._isConnectedToTicker = false;
        this._msToNextUpdate = 0;
      }
    }
  }
  static test(resource) {
    return globalThis.HTMLVideoElement && resource instanceof HTMLVideoElement;
  }
};
_VideoSource.extension = ExtensionType.TextureSource;
_VideoSource.defaultOptions = {
  ...TextureSource.defaultOptions,
  /** If true, the video will start loading immediately. */
  autoLoad: true,
  /** If true, the video will start playing as soon as it is loaded. */
  autoPlay: true,
  /** The number of times a second to update the texture from the video. Leave at 0 to update at every render. */
  updateFPS: 0,
  /** If true, the video will be loaded with the `crossorigin` attribute. */
  crossorigin: true,
  /** If true, the video will loop when it ends. */
  loop: false,
  /** If true, the video will be muted. */
  muted: true,
  /** If true, the video will play inline. */
  playsinline: true,
  /** If true, the video will be preloaded. */
  preload: false
};
_VideoSource.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
var VideoSource = _VideoSource;

// node_modules/pixi.js/lib/assets/cache/Cache.mjs
var CacheClass = class {
  constructor() {
    this._parsers = [];
    this._cache = /* @__PURE__ */ new Map();
    this._cacheMap = /* @__PURE__ */ new Map();
  }
  /** Clear all entries. */
  reset() {
    this._cacheMap.clear();
    this._cache.clear();
  }
  /**
   * Check if the key exists
   * @param key - The key to check
   */
  has(key) {
    return this._cache.has(key);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(key) {
    const result = this._cache.get(key);
    if (!result) {
      warn(`[Assets] Asset id ${key} was not found in the Cache`);
    }
    return result;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(key, value) {
    const keys = convertToList(key);
    let cacheableAssets;
    for (let i = 0; i < this.parsers.length; i++) {
      const parser = this.parsers[i];
      if (parser.test(value)) {
        cacheableAssets = parser.getCacheableAssets(keys, value);
        break;
      }
    }
    const cacheableMap = new Map(Object.entries(cacheableAssets || {}));
    if (!cacheableAssets) {
      keys.forEach((key2) => {
        cacheableMap.set(key2, value);
      });
    }
    const cacheKeys = [...cacheableMap.keys()];
    const cachedAssets = {
      cacheKeys,
      keys
    };
    keys.forEach((key2) => {
      this._cacheMap.set(key2, cachedAssets);
    });
    cacheKeys.forEach((key2) => {
      const val = cacheableAssets ? cacheableAssets[key2] : value;
      if (this._cache.has(key2) && this._cache.get(key2) !== val) {
        warn("[Cache] already has key:", key2);
      }
      this._cache.set(key2, cacheableMap.get(key2));
    });
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(key) {
    if (!this._cacheMap.has(key)) {
      warn(`[Assets] Asset id ${key} was not found in the Cache`);
      return;
    }
    const cacheMap = this._cacheMap.get(key);
    const cacheKeys = cacheMap.cacheKeys;
    cacheKeys.forEach((key2) => {
      this._cache.delete(key2);
    });
    cacheMap.keys.forEach((key2) => {
      this._cacheMap.delete(key2);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
};
var Cache = new CacheClass();

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/textureFrom.mjs
var sources = [];
extensions.handleByList(ExtensionType.TextureSource, sources);
function autoDetectSource(options = {}) {
  return textureSourceFrom(options);
}
function textureSourceFrom(options = {}) {
  const hasResource = options && options.resource;
  const res = hasResource ? options.resource : options;
  const opts = hasResource ? options : { resource: options };
  for (let i = 0; i < sources.length; i++) {
    const Source = sources[i];
    if (Source.test(res)) {
      return new Source(opts);
    }
  }
  throw new Error(`Could not find a source type for resource: ${opts.resource}`);
}
function resourceToTexture(options = {}, skipCache = false) {
  const hasResource = options && options.resource;
  const resource = hasResource ? options.resource : options;
  const opts = hasResource ? options : { resource: options };
  if (!skipCache && Cache.has(resource)) {
    return Cache.get(resource);
  }
  const texture = new Texture({ source: textureSourceFrom(opts) });
  texture.on("destroy", () => {
    if (Cache.has(resource)) {
      Cache.remove(resource);
    }
  });
  if (!skipCache) {
    Cache.set(resource, texture);
  }
  return texture;
}
function textureFrom(id, skipCache = false) {
  if (typeof id === "string") {
    return Cache.get(id);
  } else if (id instanceof TextureSource) {
    return new Texture({ source: id });
  }
  return resourceToTexture(id, skipCache);
}
Texture.from = textureFrom;
TextureSource.from = textureSourceFrom;

// node_modules/pixi.js/lib/rendering/init.mjs
extensions.add(AlphaMask, ColorMask, StencilMask, VideoSource, ImageSource, CanvasSource, BufferImageSource);

// node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/buildUvs.mjs
function buildUvs(vertices, verticesStride, verticesOffset, uvs, uvsOffset, uvsStride, size, matrix = null) {
  let index = 0;
  verticesOffset *= verticesStride;
  uvsOffset *= uvsStride;
  const a = matrix.a;
  const b = matrix.b;
  const c = matrix.c;
  const d = matrix.d;
  const tx = matrix.tx;
  const ty = matrix.ty;
  while (index < size) {
    const x = vertices[verticesOffset];
    const y = vertices[verticesOffset + 1];
    uvs[uvsOffset] = a * x + c * y + tx;
    uvs[uvsOffset + 1] = b * x + d * y + ty;
    uvsOffset += uvsStride;
    verticesOffset += verticesStride;
    index++;
  }
}
function buildSimpleUvs(uvs, uvsOffset, uvsStride, size) {
  let index = 0;
  uvsOffset *= uvsStride;
  while (index < size) {
    uvs[uvsOffset] = 0;
    uvs[uvsOffset + 1] = 0;
    uvsOffset += uvsStride;
    index++;
  }
}

// node_modules/pixi.js/lib/rendering/renderers/shared/geometry/utils/transformVertices.mjs
function transformVertices(vertices, m, offset, stride, size) {
  const a = m.a;
  const b = m.b;
  const c = m.c;
  const d = m.d;
  const tx = m.tx;
  const ty = m.ty;
  offset = offset || 0;
  stride = stride || 2;
  size = size || vertices.length / stride - offset;
  let index = offset * stride;
  for (let i = 0; i < size; i++) {
    const x = vertices[index];
    const y = vertices[index + 1];
    vertices[index] = a * x + c * y + tx;
    vertices[index + 1] = b * x + d * y + ty;
    index += stride;
  }
}

// node_modules/pixi.js/lib/scene/container/utils/multiplyHexColors.mjs
function multiplyHexColors(color1, color2) {
  if (color1 === 16777215 || !color2)
    return color2;
  if (color2 === 16777215 || !color1)
    return color1;
  const r1 = color1 >> 16 & 255;
  const g1 = color1 >> 8 & 255;
  const b1 = color1 & 255;
  const r2 = color2 >> 16 & 255;
  const g2 = color2 >> 8 & 255;
  const b2 = color2 & 255;
  const r = r1 * r2 / 255;
  const g = g1 * g2 / 255;
  const b = b1 * b2 / 255;
  return (r << 16) + (g << 8) + b;
}

// node_modules/pixi.js/lib/scene/graphics/shared/BatchableGraphics.mjs
var identityMatrix = new Matrix();
var BatchableGraphics = class {
  constructor() {
    this.packAsQuad = false;
    this.batcherName = "default";
    this.applyTransform = true;
    this.roundPixels = 0;
    this._batcher = null;
    this._batch = null;
  }
  get uvs() {
    return this.geometryData.uvs;
  }
  get positions() {
    return this.geometryData.vertices;
  }
  get indices() {
    return this.geometryData.indices;
  }
  get blendMode() {
    if (this.applyTransform) {
      return this.renderable.groupBlendMode;
    }
    return "normal";
  }
  get color() {
    const rgb = this.baseColor;
    const bgr = rgb >> 16 | rgb & 65280 | (rgb & 255) << 16;
    const renderable = this.renderable;
    if (renderable) {
      return multiplyHexColors(bgr, renderable.groupColor) + (this.alpha * renderable.groupAlpha * 255 << 24);
    }
    return bgr + (this.alpha * 255 << 24);
  }
  get transform() {
    var _a;
    return ((_a = this.renderable) == null ? void 0 : _a.groupTransform) || identityMatrix;
  }
  copyTo(gpuBuffer) {
    gpuBuffer.indexOffset = this.indexOffset;
    gpuBuffer.indexSize = this.indexSize;
    gpuBuffer.attributeOffset = this.attributeOffset;
    gpuBuffer.attributeSize = this.attributeSize;
    gpuBuffer.baseColor = this.baseColor;
    gpuBuffer.alpha = this.alpha;
    gpuBuffer.texture = this.texture;
    gpuBuffer.geometryData = this.geometryData;
  }
  reset() {
    this.applyTransform = true;
    this.renderable = null;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildCircle.mjs
var buildCircle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "circle"
  },
  build(shape, points) {
    let x;
    let y;
    let dx;
    let dy;
    let rx;
    let ry;
    if (shape.type === "circle") {
      const circle = shape;
      x = circle.x;
      y = circle.y;
      rx = ry = circle.radius;
      dx = dy = 0;
    } else if (shape.type === "ellipse") {
      const ellipse = shape;
      x = ellipse.x;
      y = ellipse.y;
      rx = ellipse.halfWidth;
      ry = ellipse.halfHeight;
      dx = dy = 0;
    } else {
      const roundedRect = shape;
      const halfWidth = roundedRect.width / 2;
      const halfHeight = roundedRect.height / 2;
      x = roundedRect.x + halfWidth;
      y = roundedRect.y + halfHeight;
      rx = ry = Math.max(0, Math.min(roundedRect.radius, Math.min(halfWidth, halfHeight)));
      dx = halfWidth - rx;
      dy = halfHeight - ry;
    }
    if (!(rx >= 0 && ry >= 0 && dx >= 0 && dy >= 0)) {
      return points;
    }
    const n = Math.ceil(2.3 * Math.sqrt(rx + ry));
    const m = n * 8 + (dx ? 4 : 0) + (dy ? 4 : 0);
    if (m === 0) {
      return points;
    }
    if (n === 0) {
      points[0] = points[6] = x + dx;
      points[1] = points[3] = y + dy;
      points[2] = points[4] = x - dx;
      points[5] = points[7] = y - dy;
      return points;
    }
    let j1 = 0;
    let j2 = n * 4 + (dx ? 2 : 0) + 2;
    let j3 = j2;
    let j4 = m;
    let x0 = dx + rx;
    let y0 = dy;
    let x1 = x + x0;
    let x2 = x - x0;
    let y1 = y + y0;
    points[j1++] = x1;
    points[j1++] = y1;
    points[--j2] = y1;
    points[--j2] = x2;
    if (dy) {
      const y22 = y - y0;
      points[j3++] = x2;
      points[j3++] = y22;
      points[--j4] = y22;
      points[--j4] = x1;
    }
    for (let i = 1; i < n; i++) {
      const a = Math.PI / 2 * (i / n);
      const x02 = dx + Math.cos(a) * rx;
      const y02 = dy + Math.sin(a) * ry;
      const x12 = x + x02;
      const x22 = x - x02;
      const y12 = y + y02;
      const y22 = y - y02;
      points[j1++] = x12;
      points[j1++] = y12;
      points[--j2] = y12;
      points[--j2] = x22;
      points[j3++] = x22;
      points[j3++] = y22;
      points[--j4] = y22;
      points[--j4] = x12;
    }
    x0 = dx;
    y0 = dy + ry;
    x1 = x + x0;
    x2 = x - x0;
    y1 = y + y0;
    const y2 = y - y0;
    points[j1++] = x1;
    points[j1++] = y1;
    points[--j4] = y2;
    points[--j4] = x1;
    if (dx) {
      points[j1++] = x2;
      points[j1++] = y1;
      points[--j4] = y2;
      points[--j4] = x2;
    }
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    if (points.length === 0) {
      return;
    }
    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < points.length; i += 2) {
      centerX += points[i];
      centerY += points[i + 1];
    }
    centerX /= points.length / 2;
    centerY /= points.length / 2;
    let count = verticesOffset;
    vertices[count * verticesStride] = centerX;
    vertices[count * verticesStride + 1] = centerY;
    const centerIndex = count++;
    for (let i = 0; i < points.length; i += 2) {
      vertices[count * verticesStride] = points[i];
      vertices[count * verticesStride + 1] = points[i + 1];
      if (i > 0) {
        indices[indicesOffset++] = count;
        indices[indicesOffset++] = centerIndex;
        indices[indicesOffset++] = count - 1;
      }
      count++;
    }
    indices[indicesOffset++] = centerIndex + 1;
    indices[indicesOffset++] = centerIndex;
    indices[indicesOffset++] = count - 1;
  }
};
var buildEllipse = { ...buildCircle, extension: { ...buildCircle.extension, name: "ellipse" } };
var buildRoundedRectangle = { ...buildCircle, extension: { ...buildCircle.extension, name: "roundedRectangle" } };

// node_modules/pixi.js/lib/scene/graphics/shared/const.mjs
var closePointEps = 1e-4;
var curveEps = 1e-4;

// node_modules/pixi.js/lib/scene/graphics/shared/utils/getOrientationOfPoints.mjs
function getOrientationOfPoints(points) {
  const m = points.length;
  if (m < 6) {
    return 1;
  }
  let area = 0;
  for (let i = 0, x1 = points[m - 2], y1 = points[m - 1]; i < m; i += 2) {
    const x2 = points[i];
    const y2 = points[i + 1];
    area += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  if (area < 0) {
    return -1;
  }
  return 1;
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildLine.mjs
function square(x, y, nx, ny, innerWeight, outerWeight, clockwise, verts) {
  const ix = x - nx * innerWeight;
  const iy = y - ny * innerWeight;
  const ox = x + nx * outerWeight;
  const oy = y + ny * outerWeight;
  let exx;
  let eyy;
  if (clockwise) {
    exx = ny;
    eyy = -nx;
  } else {
    exx = -ny;
    eyy = nx;
  }
  const eix = ix + exx;
  const eiy = iy + eyy;
  const eox = ox + exx;
  const eoy = oy + eyy;
  verts.push(eix, eiy);
  verts.push(eox, eoy);
  return 2;
}
function round(cx, cy, sx, sy, ex, ey, verts, clockwise) {
  const cx2p0x = sx - cx;
  const cy2p0y = sy - cy;
  let angle0 = Math.atan2(cx2p0x, cy2p0y);
  let angle1 = Math.atan2(ex - cx, ey - cy);
  if (clockwise && angle0 < angle1) {
    angle0 += Math.PI * 2;
  } else if (!clockwise && angle0 > angle1) {
    angle1 += Math.PI * 2;
  }
  let startAngle = angle0;
  const angleDiff = angle1 - angle0;
  const absAngleDiff = Math.abs(angleDiff);
  const radius = Math.sqrt(cx2p0x * cx2p0x + cy2p0y * cy2p0y);
  const segCount = (15 * absAngleDiff * Math.sqrt(radius) / Math.PI >> 0) + 1;
  const angleInc = angleDiff / segCount;
  startAngle += angleInc;
  if (clockwise) {
    verts.push(cx, cy);
    verts.push(sx, sy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(cx, cy);
      verts.push(
        cx + Math.sin(angle) * radius,
        cy + Math.cos(angle) * radius
      );
    }
    verts.push(cx, cy);
    verts.push(ex, ey);
  } else {
    verts.push(sx, sy);
    verts.push(cx, cy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(
        cx + Math.sin(angle) * radius,
        cy + Math.cos(angle) * radius
      );
      verts.push(cx, cy);
    }
    verts.push(ex, ey);
    verts.push(cx, cy);
  }
  return segCount * 2;
}
function buildLine(points, lineStyle, flipAlignment, closed, vertices, _verticesStride, _verticesOffset, indices, _indicesOffset) {
  const eps = closePointEps;
  if (points.length === 0) {
    return;
  }
  const style = lineStyle;
  let alignment = style.alignment;
  if (lineStyle.alignment !== 0.5) {
    let orientation = getOrientationOfPoints(points);
    if (flipAlignment)
      orientation *= -1;
    alignment = (alignment - 0.5) * orientation + 0.5;
  }
  const firstPoint = new Point(points[0], points[1]);
  const lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
  const closedShape = closed;
  const closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;
  if (closedShape) {
    points = points.slice();
    if (closedPath) {
      points.pop();
      points.pop();
      lastPoint.set(points[points.length - 2], points[points.length - 1]);
    }
    const midPointX = (firstPoint.x + lastPoint.x) * 0.5;
    const midPointY = (lastPoint.y + firstPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  const verts = vertices;
  const length = points.length / 2;
  let indexCount = points.length;
  const indexStart = verts.length / 2;
  const width = style.width / 2;
  const widthSquared = width * width;
  const miterLimitSquared = style.miterLimit * style.miterLimit;
  let x0 = points[0];
  let y0 = points[1];
  let x1 = points[2];
  let y1 = points[3];
  let x2 = 0;
  let y2 = 0;
  let perpX = -(y0 - y1);
  let perpY = x0 - x1;
  let perp1x = 0;
  let perp1y = 0;
  let dist = Math.sqrt(perpX * perpX + perpY * perpY);
  perpX /= dist;
  perpY /= dist;
  perpX *= width;
  perpY *= width;
  const ratio = alignment;
  const innerWeight = (1 - ratio) * 2;
  const outerWeight = ratio * 2;
  if (!closedShape) {
    if (style.cap === "round") {
      indexCount += round(
        x0 - perpX * (innerWeight - outerWeight) * 0.5,
        y0 - perpY * (innerWeight - outerWeight) * 0.5,
        x0 - perpX * innerWeight,
        y0 - perpY * innerWeight,
        x0 + perpX * outerWeight,
        y0 + perpY * outerWeight,
        verts,
        true
      ) + 2;
    } else if (style.cap === "square") {
      indexCount += square(x0, y0, perpX, perpY, innerWeight, outerWeight, true, verts);
    }
  }
  verts.push(
    x0 - perpX * innerWeight,
    y0 - perpY * innerWeight
  );
  verts.push(
    x0 + perpX * outerWeight,
    y0 + perpY * outerWeight
  );
  for (let i = 1; i < length - 1; ++i) {
    x0 = points[(i - 1) * 2];
    y0 = points[(i - 1) * 2 + 1];
    x1 = points[i * 2];
    y1 = points[i * 2 + 1];
    x2 = points[(i + 1) * 2];
    y2 = points[(i + 1) * 2 + 1];
    perpX = -(y0 - y1);
    perpY = x0 - x1;
    dist = Math.sqrt(perpX * perpX + perpY * perpY);
    perpX /= dist;
    perpY /= dist;
    perpX *= width;
    perpY *= width;
    perp1x = -(y1 - y2);
    perp1y = x1 - x2;
    dist = Math.sqrt(perp1x * perp1x + perp1y * perp1y);
    perp1x /= dist;
    perp1y /= dist;
    perp1x *= width;
    perp1y *= width;
    const dx0 = x1 - x0;
    const dy0 = y0 - y1;
    const dx1 = x1 - x2;
    const dy1 = y2 - y1;
    const dot = dx0 * dx1 + dy0 * dy1;
    const cross = dy0 * dx1 - dy1 * dx0;
    const clockwise = cross < 0;
    if (Math.abs(cross) < 1e-3 * Math.abs(dot)) {
      verts.push(
        x1 - perpX * innerWeight,
        y1 - perpY * innerWeight
      );
      verts.push(
        x1 + perpX * outerWeight,
        y1 + perpY * outerWeight
      );
      if (dot >= 0) {
        if (style.join === "round") {
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 4;
        } else {
          indexCount += 2;
        }
        verts.push(
          x1 - perp1x * outerWeight,
          y1 - perp1y * outerWeight
        );
        verts.push(
          x1 + perp1x * innerWeight,
          y1 + perp1y * innerWeight
        );
      }
      continue;
    }
    const c1 = (-perpX + x0) * (-perpY + y1) - (-perpX + x1) * (-perpY + y0);
    const c2 = (-perp1x + x2) * (-perp1y + y1) - (-perp1x + x1) * (-perp1y + y2);
    const px = (dx0 * c2 - dx1 * c1) / cross;
    const py = (dy1 * c1 - dy0 * c2) / cross;
    const pDist = (px - x1) * (px - x1) + (py - y1) * (py - y1);
    const imx = x1 + (px - x1) * innerWeight;
    const imy = y1 + (py - y1) * innerWeight;
    const omx = x1 - (px - x1) * outerWeight;
    const omy = y1 - (py - y1) * outerWeight;
    const smallerInsideSegmentSq = Math.min(dx0 * dx0 + dy0 * dy0, dx1 * dx1 + dy1 * dy1);
    const insideWeight = clockwise ? innerWeight : outerWeight;
    const smallerInsideDiagonalSq = smallerInsideSegmentSq + insideWeight * insideWeight * widthSquared;
    const insideMiterOk = pDist <= smallerInsideDiagonalSq;
    if (insideMiterOk) {
      if (style.join === "bevel" || pDist / widthSquared > miterLimitSquared) {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
          verts.push(omx, omy);
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
        indexCount += 2;
      } else if (style.join === "round") {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
          indexCount += round(
            x1,
            y1,
            x1 + perpX * outerWeight,
            y1 + perpY * outerWeight,
            x1 + perp1x * outerWeight,
            y1 + perp1y * outerWeight,
            verts,
            true
          ) + 4;
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
          verts.push(omx, omy);
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 4;
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
      } else {
        verts.push(imx, imy);
        verts.push(omx, omy);
      }
    } else {
      verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
      verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
      if (style.join === "round") {
        if (clockwise) {
          indexCount += round(
            x1,
            y1,
            x1 + perpX * outerWeight,
            y1 + perpY * outerWeight,
            x1 + perp1x * outerWeight,
            y1 + perp1y * outerWeight,
            verts,
            true
          ) + 2;
        } else {
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 2;
        }
      } else if (style.join === "miter" && pDist / widthSquared <= miterLimitSquared) {
        if (clockwise) {
          verts.push(omx, omy);
          verts.push(omx, omy);
        } else {
          verts.push(imx, imy);
          verts.push(imx, imy);
        }
        indexCount += 2;
      }
      verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
      verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
      indexCount += 2;
    }
  }
  x0 = points[(length - 2) * 2];
  y0 = points[(length - 2) * 2 + 1];
  x1 = points[(length - 1) * 2];
  y1 = points[(length - 1) * 2 + 1];
  perpX = -(y0 - y1);
  perpY = x0 - x1;
  dist = Math.sqrt(perpX * perpX + perpY * perpY);
  perpX /= dist;
  perpY /= dist;
  perpX *= width;
  perpY *= width;
  verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
  verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
  if (!closedShape) {
    if (style.cap === "round") {
      indexCount += round(
        x1 - perpX * (innerWeight - outerWeight) * 0.5,
        y1 - perpY * (innerWeight - outerWeight) * 0.5,
        x1 - perpX * innerWeight,
        y1 - perpY * innerWeight,
        x1 + perpX * outerWeight,
        y1 + perpY * outerWeight,
        verts,
        false
      ) + 2;
    } else if (style.cap === "square") {
      indexCount += square(x1, y1, perpX, perpY, innerWeight, outerWeight, false, verts);
    }
  }
  const eps2 = curveEps * curveEps;
  for (let i = indexStart; i < indexCount + indexStart - 2; ++i) {
    x0 = verts[i * 2];
    y0 = verts[i * 2 + 1];
    x1 = verts[(i + 1) * 2];
    y1 = verts[(i + 1) * 2 + 1];
    x2 = verts[(i + 2) * 2];
    y2 = verts[(i + 2) * 2 + 1];
    if (Math.abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) < eps2) {
      continue;
    }
    indices.push(i, i + 1, i + 2);
  }
}

// node_modules/pixi.js/lib/scene/graphics/shared/utils/triangulateWithHoles.mjs
var import_earcut = __toESM(require_earcut(), 1);
function triangulateWithHoles(points, holes, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
  const triangles = (0, import_earcut.default)(points, holes, 2);
  if (!triangles) {
    return;
  }
  for (let i = 0; i < triangles.length; i += 3) {
    indices[indicesOffset++] = triangles[i] + verticesOffset;
    indices[indicesOffset++] = triangles[i + 1] + verticesOffset;
    indices[indicesOffset++] = triangles[i + 2] + verticesOffset;
  }
  let index = verticesOffset * verticesStride;
  for (let i = 0; i < points.length; i += 2) {
    vertices[index] = points[i];
    vertices[index + 1] = points[i + 1];
    index += verticesStride;
  }
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildPolygon.mjs
var emptyArray = [];
var buildPolygon = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "polygon"
  },
  build(shape, points) {
    for (let i = 0; i < shape.points.length; i++) {
      points[i] = shape.points[i];
    }
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    triangulateWithHoles(points, emptyArray, vertices, verticesStride, verticesOffset, indices, indicesOffset);
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildRectangle.mjs
var buildRectangle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "rectangle"
  },
  build(shape, points) {
    const rectData = shape;
    const x = rectData.x;
    const y = rectData.y;
    const width = rectData.width;
    const height = rectData.height;
    if (!(width >= 0 && height >= 0)) {
      return points;
    }
    points[0] = x;
    points[1] = y;
    points[2] = x + width;
    points[3] = y;
    points[4] = x + width;
    points[5] = y + height;
    points[6] = x;
    points[7] = y + height;
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    let count = 0;
    verticesOffset *= verticesStride;
    vertices[verticesOffset + count] = points[0];
    vertices[verticesOffset + count + 1] = points[1];
    count += verticesStride;
    vertices[verticesOffset + count] = points[2];
    vertices[verticesOffset + count + 1] = points[3];
    count += verticesStride;
    vertices[verticesOffset + count] = points[6];
    vertices[verticesOffset + count + 1] = points[7];
    count += verticesStride;
    vertices[verticesOffset + count] = points[4];
    vertices[verticesOffset + count + 1] = points[5];
    count += verticesStride;
    const verticesIndex = verticesOffset / verticesStride;
    indices[indicesOffset++] = verticesIndex;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 2;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 3;
    indices[indicesOffset++] = verticesIndex + 2;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildTriangle.mjs
var buildTriangle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "triangle"
  },
  build(shape, points) {
    points[0] = shape.x;
    points[1] = shape.y;
    points[2] = shape.x2;
    points[3] = shape.y2;
    points[4] = shape.x3;
    points[5] = shape.y3;
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    let count = 0;
    verticesOffset *= verticesStride;
    vertices[verticesOffset + count] = points[0];
    vertices[verticesOffset + count + 1] = points[1];
    count += verticesStride;
    vertices[verticesOffset + count] = points[2];
    vertices[verticesOffset + count + 1] = points[3];
    count += verticesStride;
    vertices[verticesOffset + count] = points[4];
    vertices[verticesOffset + count + 1] = points[5];
    const verticesIndex = verticesOffset / verticesStride;
    indices[indicesOffset++] = verticesIndex;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 2;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/utils/buildContextBatches.mjs
var shapeBuilders = {};
extensions.handleByMap(ExtensionType.ShapeBuilder, shapeBuilders);
extensions.add(buildRectangle, buildPolygon, buildTriangle, buildCircle, buildEllipse, buildRoundedRectangle);
var tempRect = new Rectangle();
function buildContextBatches(context, gpuContext) {
  const { geometryData, batches } = gpuContext;
  batches.length = 0;
  geometryData.indices.length = 0;
  geometryData.vertices.length = 0;
  geometryData.uvs.length = 0;
  for (let i = 0; i < context.instructions.length; i++) {
    const instruction = context.instructions[i];
    if (instruction.action === "texture") {
      addTextureToGeometryData(instruction.data, batches, geometryData);
    } else if (instruction.action === "fill" || instruction.action === "stroke") {
      const isStroke = instruction.action === "stroke";
      const shapePath = instruction.data.path.shapePath;
      const style = instruction.data.style;
      const hole = instruction.data.hole;
      if (isStroke && hole) {
        addShapePathToGeometryData(hole.shapePath, style, null, true, batches, geometryData);
      }
      addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData);
    }
  }
}
function addTextureToGeometryData(data, batches, geometryData) {
  const { vertices, uvs, indices } = geometryData;
  const indexOffset = indices.length;
  const vertOffset = vertices.length / 2;
  const points = [];
  const build = shapeBuilders.rectangle;
  const rect = tempRect;
  const texture = data.image;
  rect.x = data.dx;
  rect.y = data.dy;
  rect.width = data.dw;
  rect.height = data.dh;
  const matrix = data.transform;
  build.build(rect, points);
  if (matrix) {
    transformVertices(points, matrix);
  }
  build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
  const textureUvs = texture.uvs;
  uvs.push(
    textureUvs.x0,
    textureUvs.y0,
    textureUvs.x1,
    textureUvs.y1,
    textureUvs.x3,
    textureUvs.y3,
    textureUvs.x2,
    textureUvs.y2
  );
  const graphicsBatch = BigPool.get(BatchableGraphics);
  graphicsBatch.indexOffset = indexOffset;
  graphicsBatch.indexSize = indices.length - indexOffset;
  graphicsBatch.attributeOffset = vertOffset;
  graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
  graphicsBatch.baseColor = data.style;
  graphicsBatch.alpha = data.alpha;
  graphicsBatch.texture = texture;
  graphicsBatch.geometryData = geometryData;
  batches.push(graphicsBatch);
}
function addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData) {
  const { vertices, uvs, indices } = geometryData;
  const lastIndex = shapePath.shapePrimitives.length - 1;
  shapePath.shapePrimitives.forEach(({ shape, transform: matrix }, i) => {
    const indexOffset = indices.length;
    const vertOffset = vertices.length / 2;
    const points = [];
    const build = shapeBuilders[shape.type];
    build.build(shape, points);
    if (matrix) {
      transformVertices(points, matrix);
    }
    if (!isStroke) {
      if (hole && lastIndex === i) {
        if (lastIndex !== 0) {
          console.warn("[Pixi Graphics] only the last shape have be cut out");
        }
        const holeIndices = [];
        const otherPoints = points.slice();
        const holeArrays = getHoleArrays(hole.shapePath);
        holeArrays.forEach((holePoints) => {
          holeIndices.push(otherPoints.length / 2);
          otherPoints.push(...holePoints);
        });
        triangulateWithHoles(otherPoints, holeIndices, vertices, 2, vertOffset, indices, indexOffset);
      } else {
        build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
      }
    } else {
      const close = shape.closePath ?? true;
      const lineStyle = style;
      buildLine(points, lineStyle, false, close, vertices, 2, vertOffset, indices, indexOffset);
    }
    const uvsOffset = uvs.length / 2;
    const texture = style.texture;
    if (texture !== Texture.WHITE) {
      const textureMatrix = style.matrix;
      if (textureMatrix) {
        if (matrix) {
          textureMatrix.append(matrix.clone().invert());
        }
        buildUvs(vertices, 2, vertOffset, uvs, uvsOffset, 2, vertices.length / 2 - vertOffset, textureMatrix);
      }
    } else {
      buildSimpleUvs(uvs, uvsOffset, 2, vertices.length / 2 - vertOffset);
    }
    const graphicsBatch = BigPool.get(BatchableGraphics);
    graphicsBatch.indexOffset = indexOffset;
    graphicsBatch.indexSize = indices.length - indexOffset;
    graphicsBatch.attributeOffset = vertOffset;
    graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
    graphicsBatch.baseColor = style.color;
    graphicsBatch.alpha = style.alpha;
    graphicsBatch.texture = texture;
    graphicsBatch.geometryData = geometryData;
    batches.push(graphicsBatch);
  });
}
function getHoleArrays(shape) {
  if (!shape)
    return [];
  const holePrimitives = shape.shapePrimitives;
  const holeArrays = [];
  for (let k = 0; k < holePrimitives.length; k++) {
    const holePrimitive = holePrimitives[k].shape;
    const holePoints = [];
    const holeBuilder = shapeBuilders[holePrimitive.type];
    holeBuilder.build(holePrimitive, holePoints);
    holeArrays.push(holePoints);
  }
  return holeArrays;
}

// node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContextSystem.mjs
var GpuGraphicsContext = class {
  constructor() {
    this.batches = [];
    this.geometryData = {
      vertices: [],
      uvs: [],
      indices: []
    };
  }
};
var GraphicsContextRenderData = class {
  constructor() {
    this.batcher = new DefaultBatcher();
    this.instructions = new InstructionSet();
  }
  init() {
    this.instructions.reset();
  }
  /**
   * @deprecated since version 8.0.0
   * Use `batcher.geometry` instead.
   * @see {Batcher#geometry}
   */
  get geometry() {
    deprecation(v8_3_4, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead.");
    return this.batcher.geometry;
  }
};
var _GraphicsContextSystem = class _GraphicsContextSystem2 {
  constructor(renderer) {
    this._gpuContextHash = {};
    this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null);
    renderer.renderableGC.addManagedHash(this, "_gpuContextHash");
    renderer.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
  }
  /**
   * Runner init called, update the default options
   * @ignore
   */
  init(options) {
    _GraphicsContextSystem2.defaultOptions.bezierSmoothness = (options == null ? void 0 : options.bezierSmoothness) ?? _GraphicsContextSystem2.defaultOptions.bezierSmoothness;
  }
  getContextRenderData(context) {
    return this._graphicsDataContextHash[context.uid] || this._initContextRenderData(context);
  }
  // Context management functions
  updateGpuContext(context) {
    let gpuContext = this._gpuContextHash[context.uid] || this._initContext(context);
    if (context.dirty) {
      if (gpuContext) {
        this._cleanGraphicsContextData(context);
      } else {
        gpuContext = this._initContext(context);
      }
      buildContextBatches(context, gpuContext);
      const batchMode = context.batchMode;
      if (context.customShader || batchMode === "no-batch") {
        gpuContext.isBatchable = false;
      } else if (batchMode === "auto") {
        gpuContext.isBatchable = gpuContext.geometryData.vertices.length < 400;
      }
      context.dirty = false;
    }
    return gpuContext;
  }
  getGpuContext(context) {
    return this._gpuContextHash[context.uid] || this._initContext(context);
  }
  _initContextRenderData(context) {
    const graphicsData = BigPool.get(GraphicsContextRenderData);
    const { batches, geometryData } = this._gpuContextHash[context.uid];
    const vertexSize = geometryData.vertices.length;
    const indexSize = geometryData.indices.length;
    for (let i = 0; i < batches.length; i++) {
      batches[i].applyTransform = false;
    }
    const batcher = graphicsData.batcher;
    batcher.ensureAttributeBuffer(vertexSize);
    batcher.ensureIndexBuffer(indexSize);
    batcher.begin();
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      batcher.add(batch);
    }
    batcher.finish(graphicsData.instructions);
    const geometry = batcher.geometry;
    geometry.indexBuffer.setDataWithSize(batcher.indexBuffer, batcher.indexSize, true);
    geometry.buffers[0].setDataWithSize(batcher.attributeBuffer.float32View, batcher.attributeSize, true);
    const drawBatches = batcher.batches;
    for (let i = 0; i < drawBatches.length; i++) {
      const batch = drawBatches[i];
      batch.bindGroup = getTextureBatchBindGroup(batch.textures.textures, batch.textures.count);
    }
    this._graphicsDataContextHash[context.uid] = graphicsData;
    return graphicsData;
  }
  _initContext(context) {
    const gpuContext = new GpuGraphicsContext();
    gpuContext.context = context;
    this._gpuContextHash[context.uid] = gpuContext;
    context.on("destroy", this.onGraphicsContextDestroy, this);
    return this._gpuContextHash[context.uid];
  }
  onGraphicsContextDestroy(context) {
    this._cleanGraphicsContextData(context);
    context.off("destroy", this.onGraphicsContextDestroy, this);
    this._gpuContextHash[context.uid] = null;
  }
  _cleanGraphicsContextData(context) {
    const gpuContext = this._gpuContextHash[context.uid];
    if (!gpuContext.isBatchable) {
      if (this._graphicsDataContextHash[context.uid]) {
        BigPool.return(this.getContextRenderData(context));
        this._graphicsDataContextHash[context.uid] = null;
      }
    }
    if (gpuContext.batches) {
      gpuContext.batches.forEach((batch) => {
        BigPool.return(batch);
      });
    }
  }
  destroy() {
    for (const i in this._gpuContextHash) {
      if (this._gpuContextHash[i]) {
        this.onGraphicsContextDestroy(this._gpuContextHash[i].context);
      }
    }
  }
};
_GraphicsContextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "graphicsContext"
};
_GraphicsContextSystem.defaultOptions = {
  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @default 0.5
   */
  bezierSmoothness: 0.5
};
var GraphicsContextSystem = _GraphicsContextSystem;

// node_modules/pixi.js/lib/scene/graphics/shared/GraphicsPipe.mjs
var GraphicsPipe = class {
  constructor(renderer, adaptor) {
    this.state = State.for2d();
    this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
    this.renderer.renderableGC.addManagedHash(this, "_graphicsBatchesHash");
  }
  validateRenderable(graphics) {
    const context = graphics.context;
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(context);
    if (gpuContext.isBatchable || wasBatched !== gpuContext.isBatchable) {
      return true;
    }
    return false;
  }
  addRenderable(graphics, instructionSet) {
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (graphics.didViewUpdate) {
      this._rebuild(graphics);
    }
    if (gpuContext.isBatchable) {
      this._addToBatcher(graphics, instructionSet);
    } else {
      this.renderer.renderPipes.batch.break(instructionSet);
      instructionSet.add(graphics);
    }
  }
  updateRenderable(graphics) {
    const batches = this._graphicsBatchesHash[graphics.uid];
    if (batches) {
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        batch._batcher.updateElement(batch);
      }
    }
  }
  destroyRenderable(graphics) {
    if (this._graphicsBatchesHash[graphics.uid]) {
      this._removeBatchForRenderable(graphics.uid);
    }
    graphics.off("destroyed", this._destroyRenderableBound);
  }
  execute(graphics) {
    if (!graphics.isRenderable)
      return;
    const renderer = this.renderer;
    const context = graphics.context;
    const contextSystem = renderer.graphicsContext;
    if (!contextSystem.getGpuContext(context).batches.length) {
      return;
    }
    const shader = context.customShader || this._adaptor.shader;
    this.state.blendMode = graphics.groupBlendMode;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = graphics.groupTransform;
    localUniforms.uRound = renderer._roundPixels | graphics._roundPixels;
    color32BitToUniform(
      graphics.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._adaptor.execute(this, graphics);
  }
  _rebuild(graphics) {
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (wasBatched) {
      this._removeBatchForRenderable(graphics.uid);
    }
    if (gpuContext.isBatchable) {
      this._initBatchesForRenderable(graphics);
    }
    graphics.batched = gpuContext.isBatchable;
  }
  _addToBatcher(graphics, instructionSet) {
    const batchPipe = this.renderer.renderPipes.batch;
    const batches = this._getBatchesForRenderable(graphics);
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      batchPipe.addToBatch(batch, instructionSet);
    }
  }
  _getBatchesForRenderable(graphics) {
    return this._graphicsBatchesHash[graphics.uid] || this._initBatchesForRenderable(graphics);
  }
  _initBatchesForRenderable(graphics) {
    const context = graphics.context;
    const gpuContext = this.renderer.graphicsContext.getGpuContext(context);
    const roundPixels = this.renderer._roundPixels | graphics._roundPixels;
    const batches = gpuContext.batches.map((batch) => {
      const batchClone = BigPool.get(BatchableGraphics);
      batch.copyTo(batchClone);
      batchClone.renderable = graphics;
      batchClone.roundPixels = roundPixels;
      return batchClone;
    });
    if (this._graphicsBatchesHash[graphics.uid] === void 0) {
      graphics.on("destroyed", this._destroyRenderableBound);
    }
    this._graphicsBatchesHash[graphics.uid] = batches;
    return batches;
  }
  _removeBatchForRenderable(graphicsUid) {
    this._graphicsBatchesHash[graphicsUid].forEach((batch) => {
      BigPool.return(batch);
    });
    this._graphicsBatchesHash[graphicsUid] = null;
  }
  destroy() {
    this.renderer = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.state = null;
    for (const i in this._graphicsBatchesHash) {
      this._removeBatchForRenderable(i);
    }
    this._graphicsBatchesHash = null;
  }
};
GraphicsPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "graphics"
};

// node_modules/pixi.js/lib/scene/mesh/shared/BatchableMesh.mjs
var BatchableMesh = class {
  constructor() {
    this.batcherName = "default";
    this.packAsQuad = false;
    this.indexOffset = 0;
    this.attributeOffset = 0;
    this.roundPixels = 0;
    this._batcher = null;
    this._batch = null;
    this._uvUpdateId = -1;
    this._textureMatrixUpdateId = -1;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  reset() {
    this.renderable = null;
    this.texture = null;
    this._batcher = null;
    this._batch = null;
    this.geometry = null;
    this._uvUpdateId = -1;
    this._textureMatrixUpdateId = -1;
  }
  get uvs() {
    const geometry = this.geometry;
    const uvBuffer = geometry.getBuffer("aUV");
    const uvs = uvBuffer.data;
    let transformedUvs = uvs;
    const textureMatrix = this.texture.textureMatrix;
    if (!textureMatrix.isSimple) {
      transformedUvs = this._transformedUvs;
      if (this._textureMatrixUpdateId !== textureMatrix._updateID || this._uvUpdateId !== uvBuffer._updateID) {
        if (!transformedUvs || transformedUvs.length < uvs.length) {
          transformedUvs = this._transformedUvs = new Float32Array(uvs.length);
        }
        this._textureMatrixUpdateId = textureMatrix._updateID;
        this._uvUpdateId = uvBuffer._updateID;
        textureMatrix.multiplyUvs(uvs, transformedUvs);
      }
    }
    return transformedUvs;
  }
  get positions() {
    return this.geometry.positions;
  }
  get indices() {
    return this.geometry.indices;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  get attributeSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
};

// node_modules/pixi.js/lib/scene/mesh/shared/MeshPipe.mjs
var MeshPipe = class {
  constructor(renderer, adaptor) {
    this.localUniforms = new UniformGroup({
      uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    });
    this.localUniformsBindGroup = new BindGroup({
      0: this.localUniforms
    });
    this._meshDataHash = /* @__PURE__ */ Object.create(null);
    this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
    renderer.renderableGC.addManagedHash(this, "_gpuBatchableMeshHash");
    renderer.renderableGC.addManagedHash(this, "_meshDataHash");
  }
  validateRenderable(mesh) {
    const meshData = this._getMeshData(mesh);
    const wasBatched = meshData.batched;
    const isBatched = mesh.batched;
    meshData.batched = isBatched;
    if (wasBatched !== isBatched) {
      return true;
    } else if (isBatched) {
      const geometry = mesh._geometry;
      if (geometry.indices.length !== meshData.indexSize || geometry.positions.length !== meshData.vertexSize) {
        meshData.indexSize = geometry.indices.length;
        meshData.vertexSize = geometry.positions.length;
        return true;
      }
      const batchableMesh = this._getBatchableMesh(mesh);
      const texture = mesh.texture;
      if (batchableMesh.texture._source !== texture._source) {
        if (batchableMesh.texture._source !== texture._source) {
          return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, texture);
        }
      }
    }
    return false;
  }
  addRenderable(mesh, instructionSet) {
    const batcher = this.renderer.renderPipes.batch;
    const { batched } = this._getMeshData(mesh);
    if (batched) {
      const gpuBatchableMesh = this._getBatchableMesh(mesh);
      gpuBatchableMesh.texture = mesh._texture;
      gpuBatchableMesh.geometry = mesh._geometry;
      batcher.addToBatch(gpuBatchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      instructionSet.add(mesh);
    }
  }
  updateRenderable(mesh) {
    if (mesh.batched) {
      const gpuBatchableMesh = this._gpuBatchableMeshHash[mesh.uid];
      gpuBatchableMesh.texture = mesh._texture;
      gpuBatchableMesh.geometry = mesh._geometry;
      gpuBatchableMesh._batcher.updateElement(gpuBatchableMesh);
    }
  }
  destroyRenderable(mesh) {
    this._meshDataHash[mesh.uid] = null;
    const gpuMesh = this._gpuBatchableMeshHash[mesh.uid];
    if (gpuMesh) {
      BigPool.return(gpuMesh);
      this._gpuBatchableMeshHash[mesh.uid] = null;
    }
    mesh.off("destroyed", this._destroyRenderableBound);
  }
  execute(mesh) {
    if (!mesh.isRenderable)
      return;
    mesh.state.blendMode = getAdjustedBlendModeBlend(mesh.groupBlendMode, mesh.texture._source);
    const localUniforms = this.localUniforms;
    localUniforms.uniforms.uTransformMatrix = mesh.groupTransform;
    localUniforms.uniforms.uRound = this.renderer._roundPixels | mesh._roundPixels;
    localUniforms.update();
    color32BitToUniform(
      mesh.groupColorAlpha,
      localUniforms.uniforms.uColor,
      0
    );
    this._adaptor.execute(this, mesh);
  }
  _getMeshData(mesh) {
    return this._meshDataHash[mesh.uid] || this._initMeshData(mesh);
  }
  _initMeshData(mesh) {
    var _a, _b;
    this._meshDataHash[mesh.uid] = {
      batched: mesh.batched,
      indexSize: (_a = mesh._geometry.indices) == null ? void 0 : _a.length,
      vertexSize: (_b = mesh._geometry.positions) == null ? void 0 : _b.length
    };
    mesh.on("destroyed", this._destroyRenderableBound);
    return this._meshDataHash[mesh.uid];
  }
  _getBatchableMesh(mesh) {
    return this._gpuBatchableMeshHash[mesh.uid] || this._initBatchableMesh(mesh);
  }
  _initBatchableMesh(mesh) {
    const gpuMesh = BigPool.get(BatchableMesh);
    gpuMesh.renderable = mesh;
    gpuMesh.texture = mesh._texture;
    gpuMesh.transform = mesh.groupTransform;
    gpuMesh.roundPixels = this.renderer._roundPixels | mesh._roundPixels;
    this._gpuBatchableMeshHash[mesh.uid] = gpuMesh;
    return gpuMesh;
  }
  destroy() {
    for (const i in this._gpuBatchableMeshHash) {
      if (this._gpuBatchableMeshHash[i]) {
        BigPool.return(this._gpuBatchableMeshHash[i]);
      }
    }
    this._gpuBatchableMeshHash = null;
    this._meshDataHash = null;
    this.localUniforms = null;
    this.localUniformsBindGroup = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.renderer = null;
  }
};
MeshPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "mesh"
};

// node_modules/pixi.js/lib/scene/particle-container/gl/GlParticleContainerAdaptor.mjs
var GlParticleContainerAdaptor = class {
  execute(particleContainerPop, container) {
    const state = particleContainerPop.state;
    const renderer = particleContainerPop.renderer;
    const shader = container.shader || particleContainerPop.defaultShader;
    shader.resources.uTexture = container.texture._source;
    shader.resources.uniforms = particleContainerPop.localUniforms;
    const gl = renderer.gl;
    const buffer = particleContainerPop.getBuffers(container);
    renderer.shader.bind(shader);
    renderer.state.set(state);
    renderer.geometry.bind(buffer.geometry, shader.glProgram);
    const byteSize = buffer.geometry.indexBuffer.data.BYTES_PER_ELEMENT;
    const glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
    gl.drawElements(gl.TRIANGLES, container.particleChildren.length * 6, glType, 0);
  }
};

// node_modules/pixi.js/lib/scene/particle-container/shared/utils/createIndicesForQuads.mjs
function createIndicesForQuads(size, outBuffer = null) {
  const totalIndices = size * 6;
  if (totalIndices > 65535) {
    outBuffer = outBuffer || new Uint32Array(totalIndices);
  } else {
    outBuffer = outBuffer || new Uint16Array(totalIndices);
  }
  if (outBuffer.length !== totalIndices) {
    throw new Error(`Out buffer length is incorrect, got ${outBuffer.length} and expected ${totalIndices}`);
  }
  for (let i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
    outBuffer[i + 0] = j + 0;
    outBuffer[i + 1] = j + 1;
    outBuffer[i + 2] = j + 2;
    outBuffer[i + 3] = j + 0;
    outBuffer[i + 4] = j + 2;
    outBuffer[i + 5] = j + 3;
  }
  return outBuffer;
}

// node_modules/pixi.js/lib/scene/particle-container/shared/utils/generateParticleUpdateFunction.mjs
function generateParticleUpdateFunction(properties) {
  return {
    dynamicUpdate: generateUpdateFunction(properties, true),
    staticUpdate: generateUpdateFunction(properties, false)
  };
}
function generateUpdateFunction(properties, dynamic) {
  const funcFragments = [];
  funcFragments.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
  let offset = 0;
  for (const i in properties) {
    const property = properties[i];
    if (dynamic !== property.dynamic)
      continue;
    funcFragments.push(`offset = index + ${offset}`);
    funcFragments.push(property.code);
    const attributeInfo = getAttributeInfoFromFormat(property.format);
    offset += attributeInfo.stride / 4;
  }
  funcFragments.push(`
            index += stride * 4;
        }
    `);
  funcFragments.unshift(`
        var stride = ${offset};
    `);
  const functionSource = funcFragments.join("\n");
  return new Function("ps", "f32v", "u32v", functionSource);
}

// node_modules/pixi.js/lib/scene/particle-container/shared/ParticleBuffer.mjs
var ParticleBuffer = class {
  constructor(options) {
    this._size = 0;
    this._generateParticleUpdateCache = {};
    const size = this._size = options.size ?? 1e3;
    const properties = options.properties;
    let staticVertexSize = 0;
    let dynamicVertexSize = 0;
    for (const i in properties) {
      const property = properties[i];
      const attributeInfo = getAttributeInfoFromFormat(property.format);
      if (property.dynamic) {
        dynamicVertexSize += attributeInfo.stride;
      } else {
        staticVertexSize += attributeInfo.stride;
      }
    }
    this._dynamicStride = dynamicVertexSize / 4;
    this._staticStride = staticVertexSize / 4;
    this.staticAttributeBuffer = new ViewableBuffer(size * 4 * staticVertexSize);
    this.dynamicAttributeBuffer = new ViewableBuffer(size * 4 * dynamicVertexSize);
    this.indexBuffer = createIndicesForQuads(size);
    const geometry = new Geometry();
    let dynamicOffset = 0;
    let staticOffset = 0;
    this._staticBuffer = new Buffer({
      data: new Float32Array(1),
      label: "static-particle-buffer",
      shrinkToFit: false,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    this._dynamicBuffer = new Buffer({
      data: new Float32Array(1),
      label: "dynamic-particle-buffer",
      shrinkToFit: false,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    for (const i in properties) {
      const property = properties[i];
      const attributeInfo = getAttributeInfoFromFormat(property.format);
      if (property.dynamic) {
        geometry.addAttribute(property.attributeName, {
          buffer: this._dynamicBuffer,
          stride: this._dynamicStride * 4,
          offset: dynamicOffset * 4,
          format: property.format
        });
        dynamicOffset += attributeInfo.size;
      } else {
        geometry.addAttribute(property.attributeName, {
          buffer: this._staticBuffer,
          stride: this._staticStride * 4,
          offset: staticOffset * 4,
          format: property.format
        });
        staticOffset += attributeInfo.size;
      }
    }
    geometry.addIndex(this.indexBuffer);
    const uploadFunction = this.getParticleUpdate(properties);
    this._dynamicUpload = uploadFunction.dynamicUpdate;
    this._staticUpload = uploadFunction.staticUpdate;
    this.geometry = geometry;
  }
  getParticleUpdate(properties) {
    const key = getParticleSyncKey(properties);
    if (this._generateParticleUpdateCache[key]) {
      return this._generateParticleUpdateCache[key];
    }
    this._generateParticleUpdateCache[key] = this.generateParticleUpdate(properties);
    return this._generateParticleUpdateCache[key];
  }
  generateParticleUpdate(properties) {
    return generateParticleUpdateFunction(properties);
  }
  update(particles, uploadStatic) {
    if (particles.length > this._size) {
      uploadStatic = true;
      this._size = Math.max(particles.length, this._size * 1.5 | 0);
      this.staticAttributeBuffer = new ViewableBuffer(this._size * this._staticStride * 4 * 4);
      this.dynamicAttributeBuffer = new ViewableBuffer(this._size * this._dynamicStride * 4 * 4);
      this.indexBuffer = createIndicesForQuads(this._size);
      this.geometry.indexBuffer.setDataWithSize(
        this.indexBuffer,
        this.indexBuffer.byteLength,
        true
      );
    }
    const dynamicAttributeBuffer = this.dynamicAttributeBuffer;
    this._dynamicUpload(particles, dynamicAttributeBuffer.float32View, dynamicAttributeBuffer.uint32View);
    this._dynamicBuffer.setDataWithSize(
      this.dynamicAttributeBuffer.float32View,
      particles.length * this._dynamicStride * 4,
      true
    );
    if (uploadStatic) {
      const staticAttributeBuffer = this.staticAttributeBuffer;
      this._staticUpload(particles, staticAttributeBuffer.float32View, staticAttributeBuffer.uint32View);
      this._staticBuffer.setDataWithSize(
        staticAttributeBuffer.float32View,
        particles.length * this._staticStride * 4,
        true
      );
    }
  }
  destroy() {
    this._staticBuffer.destroy();
    this._dynamicBuffer.destroy();
    this.geometry.destroy();
  }
};
function getParticleSyncKey(properties) {
  const keyGen = [];
  for (const key in properties) {
    const property = properties[key];
    keyGen.push(key, property.code, property.dynamic ? "d" : "s");
  }
  return keyGen.join("_");
}

// node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.frag.mjs
var fragment = "varying vec2 vUV;\nvarying vec4 vColor;\n\nuniform sampler2D uTexture;\n\nvoid main(void){\n    vec4 color = texture2D(uTexture, vUV) * vColor;\n    gl_FragColor = color;\n}";

// node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.vert.mjs
var vertex = "attribute vec2 aVertex;\nattribute vec2 aUV;\nattribute vec4 aColor;\n\nattribute vec2 aPosition;\nattribute float aRotation;\n\nuniform mat3 uTranslationMatrix;\nuniform float uRound;\nuniform vec2 uResolution;\nuniform vec4 uColor;\n\nvarying vec2 vUV;\nvarying vec4 vColor;\n\nvec2 roundPixels(vec2 position, vec2 targetSize)\n{       \n    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n}\n\nvoid main(void){\n    float cosRotation = cos(aRotation);\n    float sinRotation = sin(aRotation);\n    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;\n    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;\n\n    vec2 v = vec2(x, y);\n    v = v + aPosition;\n\n    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    if(uRound == 1.0)\n    {\n        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n    }\n\n    vUV = aUV;\n    vColor = aColor * uColor;\n}\n";

// node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.wgsl.mjs
var wgsl = "\nstruct ParticleUniforms {\n  uProjectionMatrix:mat3x3<f32>,\n  uResolution:vec2<f32>,\n  uRoundPixels:f32,\n};\n\n@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;\n\n@group(1) @binding(0) var uTexture: texture_2d<f32>;\n@group(1) @binding(1) var uSampler : sampler;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) color : vec4<f32>,\n  };\n@vertex\nfn mainVertex(\n  @location(0) aVertex: vec2<f32>,\n  @location(1) aPosition: vec2<f32>,\n  @location(2) aUV: vec2<f32>,\n  @location(3) aColor: vec4<f32>,\n  @location(4) aRotation: f32,\n) -> VSOutput {\n  \n   let v = vec2(\n       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),\n       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)\n   ) + aPosition;\n\n   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n  return VSOutput(\n   position,\n   aUV,\n   aColor,\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) color: vec4<f32>,\n  @builtin(position) position: vec4<f32>,\n) -> @location(0) vec4<f32> {\n\n    var sample = textureSample(uTexture, uSampler, uv) * color;\n   \n    return sample;\n}";

// node_modules/pixi.js/lib/scene/particle-container/shared/shader/ParticleShader.mjs
var ParticleShader = class extends Shader {
  constructor() {
    const glProgram3 = GlProgram.from({
      vertex,
      fragment
    });
    const gpuProgram3 = GpuProgram.from({
      fragment: {
        source: wgsl,
        entryPoint: "mainFragment"
      },
      vertex: {
        source: wgsl,
        entryPoint: "mainVertex"
      }
    });
    super({
      glProgram: glProgram3,
      gpuProgram: gpuProgram3,
      resources: {
        // this will be replaced with the texture from the particle container
        uTexture: Texture.WHITE.source,
        // this will be replaced with the texture style from the particle container
        uSampler: new TextureStyle({}),
        // this will be replaced with the local uniforms from the particle container
        uniforms: {
          uTranslationMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
          uColor: { value: new Color(16777215), type: "vec4<f32>" },
          uRound: { value: 1, type: "f32" },
          uResolution: { value: [0, 0], type: "vec2<f32>" }
        }
      }
    });
  }
};

// node_modules/pixi.js/lib/scene/particle-container/shared/ParticleContainerPipe.mjs
var ParticleContainerPipe = class {
  /**
   * @param renderer - The renderer this sprite batch works for.
   * @param adaptor
   */
  constructor(renderer, adaptor) {
    this.state = State.for2d();
    this._gpuBufferHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.localUniforms = new UniformGroup({
      uTranslationMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array(4), type: "vec4<f32>" },
      uRound: { value: 1, type: "f32" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    });
    this.renderer = renderer;
    this.adaptor = adaptor;
    this.defaultShader = new ParticleShader();
    this.state = State.for2d();
  }
  validateRenderable(_renderable) {
    return false;
  }
  addRenderable(renderable, instructionSet) {
    this.renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add(renderable);
  }
  getBuffers(renderable) {
    return this._gpuBufferHash[renderable.uid] || this._initBuffer(renderable);
  }
  _initBuffer(renderable) {
    this._gpuBufferHash[renderable.uid] = new ParticleBuffer({
      size: renderable.particleChildren.length,
      properties: renderable._properties
    });
    renderable.on("destroyed", this._destroyRenderableBound);
    return this._gpuBufferHash[renderable.uid];
  }
  updateRenderable(_renderable) {
  }
  destroyRenderable(renderable) {
    const buffer = this._gpuBufferHash[renderable.uid];
    buffer.destroy();
    this._gpuBufferHash[renderable.uid] = null;
    renderable.off("destroyed", this._destroyRenderableBound);
  }
  execute(container) {
    const children = container.particleChildren;
    if (children.length === 0) {
      return;
    }
    const renderer = this.renderer;
    const buffer = this.getBuffers(container);
    container.texture || (container.texture = children[0].texture);
    const state = this.state;
    buffer.update(children, container._childrenDirty);
    container._childrenDirty = false;
    state.blendMode = getAdjustedBlendModeBlend(container.blendMode, container.texture._source);
    const uniforms = this.localUniforms.uniforms;
    const transformationMatrix = uniforms.uTranslationMatrix;
    container.worldTransform.copyTo(transformationMatrix);
    transformationMatrix.prepend(renderer.globalUniforms.globalUniformData.projectionMatrix);
    uniforms.uResolution = renderer.globalUniforms.globalUniformData.resolution;
    uniforms.uRound = renderer._roundPixels | container._roundPixels;
    color32BitToUniform(
      container.groupColorAlpha,
      uniforms.uColor,
      0
    );
    this.adaptor.execute(this, container);
  }
  /** Destroys the ParticleRenderer. */
  destroy() {
    if (this.defaultShader) {
      this.defaultShader.destroy();
      this.defaultShader = null;
    }
  }
};

// node_modules/pixi.js/lib/scene/particle-container/shared/GlParticleContainerPipe.mjs
var GlParticleContainerPipe = class extends ParticleContainerPipe {
  constructor(renderer) {
    super(renderer, new GlParticleContainerAdaptor());
  }
};
GlParticleContainerPipe.extension = {
  type: [
    ExtensionType.WebGLPipes
  ],
  name: "particle"
};

// node_modules/pixi.js/lib/scene/particle-container/gpu/GpuParticleContainerAdaptor.mjs
var GpuParticleContainerAdaptor = class {
  execute(particleContainerPop, container) {
    const renderer = particleContainerPop.renderer;
    const shader = container.shader || particleContainerPop.defaultShader;
    shader.groups[0] = renderer.renderPipes.uniformBatch.getUniformBindGroup(particleContainerPop.localUniforms, true);
    shader.groups[1] = renderer.texture.getTextureBindGroup(container.texture);
    const state = particleContainerPop.state;
    const buffer = particleContainerPop.getBuffers(container);
    renderer.encoder.draw({
      geometry: buffer.geometry,
      shader: container.shader || particleContainerPop.defaultShader,
      state,
      size: container.particleChildren.length * 6
    });
  }
};

// node_modules/pixi.js/lib/scene/particle-container/shared/GpuParticleContainerPipe.mjs
var GpuParticleContainerPipe = class extends ParticleContainerPipe {
  constructor(renderer) {
    super(renderer, new GpuParticleContainerAdaptor());
  }
};
GpuParticleContainerPipe.extension = {
  type: [
    ExtensionType.WebGPUPipes
  ],
  name: "particle"
};

// node_modules/pixi.js/lib/scene/text/canvas/CanvasTextPipe.mjs
var CanvasTextPipe = class {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
    this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const newKey = text._getKey();
    if (gpuText.currentKey !== newKey) {
      return true;
    }
    return false;
  }
  addRenderable(text, instructionSet) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(text) {
    text.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(text.uid);
  }
  _destroyRenderableById(textUid) {
    const gpuText = this._gpuText[textUid];
    this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    BigPool.return(gpuText.batchableSprite);
    this._gpuText[textUid] = null;
  }
  _updateText(text) {
    const newKey = text._getKey();
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(text);
    }
    text._didTextUpdate = false;
    const padding = text._style.padding;
    updateQuadBounds(batchableSprite.bounds, text._anchor, batchableSprite.texture, padding);
  }
  _updateGpuText(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.texture) {
      this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    }
    gpuText.texture = batchableSprite.texture = this._renderer.canvasText.getManagedTexture(text);
    gpuText.currentKey = text._getKey();
    batchableSprite.texture = gpuText.texture;
  }
  _getGpuText(text) {
    return this._gpuText[text.uid] || this.initGpuText(text);
  }
  initGpuText(text) {
    const gpuTextData = {
      texture: null,
      currentKey: "--",
      batchableSprite: BigPool.get(BatchableSprite)
    };
    gpuTextData.batchableSprite.renderable = text;
    gpuTextData.batchableSprite.transform = text.groupTransform;
    gpuTextData.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    gpuTextData.batchableSprite.roundPixels = this._renderer._roundPixels | text._roundPixels;
    this._gpuText[text.uid] = gpuTextData;
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    this._updateText(text);
    text.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
};
CanvasTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "text"
};

// node_modules/pixi.js/lib/utils/canvas/getCanvasBoundingBox.mjs
function checkRow(data, width, y) {
  for (let x = 0, index = 4 * y * width; x < width; ++x, index += 4) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function checkColumn(data, width, x, top, bottom) {
  const stride = 4 * width;
  for (let y = top, index = top * stride + 4 * x; y <= bottom; ++y, index += stride) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function getCanvasBoundingBox(canvas, resolution = 1) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d", {
    willReadFrequently: true
  });
  if (context === null) {
    throw new TypeError("Failed to get canvas 2D context");
  }
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let left = 0;
  let top = 0;
  let right = width - 1;
  let bottom = height - 1;
  while (top < height && checkRow(data, width, top))
    ++top;
  if (top === height)
    return Rectangle.EMPTY;
  while (checkRow(data, width, bottom))
    --bottom;
  while (checkColumn(data, width, left, top, bottom))
    ++left;
  while (checkColumn(data, width, right, top, bottom))
    --right;
  ++right;
  ++bottom;
  return new Rectangle(left / resolution, top / resolution, (right - left) / resolution, (bottom - top) / resolution);
}

// node_modules/pixi.js/lib/scene/graphics/shared/fill/FillGradient.mjs
var _FillGradient = class _FillGradient2 {
  constructor(x0, y0, x1, y1) {
    this.uid = uid("fillGradient");
    this.type = "linear";
    this.gradientStops = [];
    this._styleKey = null;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }
  addColorStop(offset, color) {
    this.gradientStops.push({ offset, color: Color.shared.setValue(color).toHexa() });
    this._styleKey = null;
    return this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const defaultSize = _FillGradient2.defaultTextureSize;
    const { gradientStops } = this;
    const canvas = DOMAdapter.get().createCanvas();
    canvas.width = defaultSize;
    canvas.height = defaultSize;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, _FillGradient2.defaultTextureSize, 1);
    for (let i = 0; i < gradientStops.length; i++) {
      const stop = gradientStops[i];
      gradient.addColorStop(stop.offset, stop.color);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, defaultSize, defaultSize);
    this.texture = new Texture({
      source: new ImageSource({
        resource: canvas,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0, y0, x1, y1 } = this;
    const m = new Matrix();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    m.translate(-x0, -y0);
    m.scale(1 / defaultSize, 1 / defaultSize);
    m.rotate(-angle);
    m.scale(256 / dist, 1);
    this.transform = m;
    this._styleKey = null;
  }
  get styleKey() {
    if (this._styleKey) {
      return this._styleKey;
    }
    const stops = this.gradientStops.map((stop) => `${stop.offset}-${stop.color}`).join("-");
    const texture = this.texture.uid;
    const transform2 = this.transform.toArray().join("-");
    return `fill-gradient-${this.uid}-${stops}-${texture}-${transform2}-${this.x0}-${this.y0}-${this.x1}-${this.y1}`;
  }
};
_FillGradient.defaultTextureSize = 256;
var FillGradient = _FillGradient;

// node_modules/pixi.js/lib/scene/graphics/shared/fill/FillPattern.mjs
var repetitionMap = {
  repeat: {
    addressModeU: "repeat",
    addressModeV: "repeat"
  },
  "repeat-x": {
    addressModeU: "repeat",
    addressModeV: "clamp-to-edge"
  },
  "repeat-y": {
    addressModeU: "clamp-to-edge",
    addressModeV: "repeat"
  },
  "no-repeat": {
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge"
  }
};
var FillPattern = class {
  constructor(texture, repetition) {
    this.uid = uid("fillPattern");
    this.transform = new Matrix();
    this._styleKey = null;
    this.texture = texture;
    this.transform.scale(
      1 / texture.frame.width,
      1 / texture.frame.height
    );
    if (repetition) {
      texture.source.style.addressModeU = repetitionMap[repetition].addressModeU;
      texture.source.style.addressModeV = repetitionMap[repetition].addressModeV;
    }
  }
  setTransform(transform2) {
    const texture = this.texture;
    this.transform.copyFrom(transform2);
    this.transform.invert();
    this.transform.scale(
      1 / texture.frame.width,
      1 / texture.frame.height
    );
    this._styleKey = null;
  }
  get styleKey() {
    if (this._styleKey)
      return this._styleKey;
    this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`;
    return this._styleKey;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGToGraphicsPath.mjs
var import_parse_svg_path = __toESM(require_parse_svg_path(), 1);
function SVGToGraphicsPath(svgPath, path2) {
  const commands = (0, import_parse_svg_path.default)(svgPath);
  const subpaths = [];
  let currentSubPath = null;
  let lastX = 0;
  let lastY = 0;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const type = command[0];
    const data = command;
    switch (type) {
      case "M":
        lastX = data[1];
        lastY = data[2];
        path2.moveTo(lastX, lastY);
        break;
      case "m":
        lastX += data[1];
        lastY += data[2];
        path2.moveTo(lastX, lastY);
        break;
      case "H":
        lastX = data[1];
        path2.lineTo(lastX, lastY);
        break;
      case "h":
        lastX += data[1];
        path2.lineTo(lastX, lastY);
        break;
      case "V":
        lastY = data[1];
        path2.lineTo(lastX, lastY);
        break;
      case "v":
        lastY += data[1];
        path2.lineTo(lastX, lastY);
        break;
      case "L":
        lastX = data[1];
        lastY = data[2];
        path2.lineTo(lastX, lastY);
        break;
      case "l":
        lastX += data[1];
        lastY += data[2];
        path2.lineTo(lastX, lastY);
        break;
      case "C":
        lastX = data[5];
        lastY = data[6];
        path2.bezierCurveTo(
          data[1],
          data[2],
          data[3],
          data[4],
          lastX,
          lastY
        );
        break;
      case "c":
        path2.bezierCurveTo(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4],
          lastX + data[5],
          lastY + data[6]
        );
        lastX += data[5];
        lastY += data[6];
        break;
      case "S":
        lastX = data[3];
        lastY = data[4];
        path2.bezierCurveToShort(
          data[1],
          data[2],
          lastX,
          lastY
        );
        break;
      case "s":
        path2.bezierCurveToShort(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4]
        );
        lastX += data[3];
        lastY += data[4];
        break;
      case "Q":
        lastX = data[3];
        lastY = data[4];
        path2.quadraticCurveTo(
          data[1],
          data[2],
          lastX,
          lastY
        );
        break;
      case "q":
        path2.quadraticCurveTo(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4]
        );
        lastX += data[3];
        lastY += data[4];
        break;
      case "T":
        lastX = data[1];
        lastY = data[2];
        path2.quadraticCurveToShort(
          lastX,
          lastY
        );
        break;
      case "t":
        lastX += data[1];
        lastY += data[2];
        path2.quadraticCurveToShort(
          lastX,
          lastY
        );
        break;
      case "A":
        lastX = data[6];
        lastY = data[7];
        path2.arcToSvg(
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          lastX,
          lastY
        );
        break;
      case "a":
        lastX += data[6];
        lastY += data[7];
        path2.arcToSvg(
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          lastX,
          lastY
        );
        break;
      case "Z":
      case "z":
        path2.closePath();
        if (subpaths.length > 0) {
          currentSubPath = subpaths.pop();
          if (currentSubPath) {
            lastX = currentSubPath.startX;
            lastY = currentSubPath.startY;
          } else {
            lastX = 0;
            lastY = 0;
          }
        }
        currentSubPath = null;
        break;
      default:
        warn(`Unknown SVG path command: ${type}`);
    }
    if (type !== "Z" && type !== "z") {
      if (currentSubPath === null) {
        currentSubPath = { startX: lastX, startY: lastY };
        subpaths.push(currentSubPath);
      }
    }
  }
  return path2;
}

// node_modules/pixi.js/lib/maths/shapes/Circle.mjs
var Circle = class _Circle {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(x = 0, y = 0, radius = 0) {
    this.type = "circle";
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  /**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */
  clone() {
    return new _Circle(this.x, this.y, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */
  contains(x, y) {
    if (this.radius <= 0)
      return false;
    const r2 = this.radius * this.radius;
    let dx = this.x - x;
    let dy = this.y - y;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width - The width of the line to check
   * @returns Whether the x/y coordinates are within this Circle
   */
  strokeContains(x, y, width) {
    if (this.radius === 0)
      return false;
    const dx = this.x - x;
    const dy = this.y - y;
    const r = this.radius;
    const w2 = width / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r + w2 && distance > r - w2;
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(out2) {
    out2 = out2 || new Rectangle();
    out2.x = this.x - this.radius;
    out2.y = this.y - this.radius;
    out2.width = this.radius * 2;
    out2.height = this.radius * 2;
    return out2;
  }
  /**
   * Copies another circle to this one.
   * @param circle - The circle to copy from.
   * @returns Returns itself.
   */
  copyFrom(circle) {
    this.x = circle.x;
    this.y = circle.y;
    this.radius = circle.radius;
    return this;
  }
  /**
   * Copies this circle to another one.
   * @param circle - The circle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(circle) {
    circle.copyFrom(this);
    return circle;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
};

// node_modules/pixi.js/lib/maths/shapes/Ellipse.mjs
var Ellipse = class _Ellipse {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(x = 0, y = 0, halfWidth = 0, halfHeight = 0) {
    this.type = "ellipse";
    this.x = x;
    this.y = y;
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {Ellipse} A copy of the ellipse
   */
  clone() {
    return new _Ellipse(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(x, y) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0) {
      return false;
    }
    let normx = (x - this.x) / this.halfWidth;
    let normy = (y - this.y) / this.halfHeight;
    normx *= normx;
    normy *= normy;
    return normx + normy <= 1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse including stroke
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width
   * @returns Whether the x/y coords are within this ellipse
   */
  strokeContains(x, y, width) {
    const { halfWidth, halfHeight } = this;
    if (halfWidth <= 0 || halfHeight <= 0) {
      return false;
    }
    const halfStrokeWidth = width / 2;
    const innerA = halfWidth - halfStrokeWidth;
    const innerB = halfHeight - halfStrokeWidth;
    const outerA = halfWidth + halfStrokeWidth;
    const outerB = halfHeight + halfStrokeWidth;
    const normalizedX = x - this.x;
    const normalizedY = y - this.y;
    const innerEllipse = normalizedX * normalizedX / (innerA * innerA) + normalizedY * normalizedY / (innerB * innerB);
    const outerEllipse = normalizedX * normalizedX / (outerA * outerA) + normalizedY * normalizedY / (outerB * outerB);
    return innerEllipse > 1 && outerEllipse <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(out2) {
    out2 = out2 || new Rectangle();
    out2.x = this.x - this.halfWidth;
    out2.y = this.y - this.halfHeight;
    out2.width = this.halfWidth * 2;
    out2.height = this.halfHeight * 2;
    return out2;
  }
  /**
   * Copies another ellipse to this one.
   * @param ellipse - The ellipse to copy from.
   * @returns Returns itself.
   */
  copyFrom(ellipse) {
    this.x = ellipse.x;
    this.y = ellipse.y;
    this.halfWidth = ellipse.halfWidth;
    this.halfHeight = ellipse.halfHeight;
    return this;
  }
  /**
   * Copies this ellipse to another one.
   * @param ellipse - The ellipse to copy to.
   * @returns Returns given parameter.
   */
  copyTo(ellipse) {
    ellipse.copyFrom(this);
    return ellipse;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
};

// node_modules/pixi.js/lib/maths/misc/squaredDistanceToLineSegment.mjs
function squaredDistanceToLineSegment(x, y, x1, y1, x2, y2) {
  const a = x - x1;
  const b = y - y1;
  const c = x2 - x1;
  const d = y2 - y1;
  const dot = a * c + b * d;
  const lenSq = c * c + d * d;
  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }
  let xx;
  let yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * c;
    yy = y1 + param * d;
  }
  const dx = x - xx;
  const dy = y - yy;
  return dx * dx + dy * dy;
}

// node_modules/pixi.js/lib/maths/shapes/Polygon.mjs
var Polygon = class _Polygon {
  /**
   * @param points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...points) {
    this.type = "polygon";
    let flat = Array.isArray(points[0]) ? points[0] : points;
    if (typeof flat[0] !== "number") {
      const p = [];
      for (let i = 0, il = flat.length; i < il; i++) {
        p.push(flat[i].x, flat[i].y);
      }
      flat = p;
    }
    this.points = flat;
    this.closePath = true;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const points = this.points.slice();
    const polygon = new _Polygon(points);
    polygon.closePath = this.closePath;
    return polygon;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(x, y) {
    let inside = false;
    const length = this.points.length / 2;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      const xi = this.points[i * 2];
      const yi = this.points[i * 2 + 1];
      const xj = this.points[j * 2];
      const yj = this.points[j * 2 + 1];
      const intersect = yi > y !== yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this polygon
   */
  strokeContains(x, y, strokeWidth) {
    const halfStrokeWidth = strokeWidth / 2;
    const halfStrokeWidthSqrd = halfStrokeWidth * halfStrokeWidth;
    const { points } = this;
    const iterationLength = points.length - (this.closePath ? 0 : 2);
    for (let i = 0; i < iterationLength; i += 2) {
      const x1 = points[i];
      const y1 = points[i + 1];
      const x2 = points[(i + 2) % points.length];
      const y2 = points[(i + 3) % points.length];
      const distanceSqrd = squaredDistanceToLineSegment(x, y, x1, y1, x2, y2);
      if (distanceSqrd <= halfStrokeWidthSqrd) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns the framing rectangle of the polygon as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(out2) {
    out2 = out2 || new Rectangle();
    const points = this.points;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i];
      const y = points[i + 1];
      minX = x < minX ? x : minX;
      maxX = x > maxX ? x : maxX;
      minY = y < minY ? y : minY;
      maxY = y > maxY ? y : maxY;
    }
    out2.x = minX;
    out2.width = maxX - minX;
    out2.y = minY;
    out2.height = maxY - minY;
    return out2;
  }
  /**
   * Copies another polygon to this one.
   * @param polygon - The polygon to copy from.
   * @returns Returns itself.
   */
  copyFrom(polygon) {
    this.points = polygon.points.slice();
    this.closePath = polygon.closePath;
    return this;
  }
  /**
   * Copies this polygon to another one.
   * @param polygon - The polygon to copy to.
   * @returns Returns given parameter.
   */
  copyTo(polygon) {
    polygon.copyFrom(this);
    return polygon;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((pointsDesc, currentPoint) => `${pointsDesc}, ${currentPoint}`, "")}]`;
  }
  /**
   * Get the last X coordinate of the polygon
   * @readonly
   */
  get lastX() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the last Y coordinate of the polygon
   * @readonly
   */
  get lastY() {
    return this.points[this.points.length - 1];
  }
  /**
   * Get the first X coordinate of the polygon
   * @readonly
   */
  get x() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the first Y coordinate of the polygon
   * @readonly
   */
  get y() {
    return this.points[this.points.length - 1];
  }
};

// node_modules/pixi.js/lib/maths/shapes/RoundedRectangle.mjs
var isCornerWithinStroke = (pX, pY, cornerX, cornerY, radius, halfStrokeWidth) => {
  const dx = pX - cornerX;
  const dy = pY - cornerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance >= radius - halfStrokeWidth && distance <= radius + halfStrokeWidth;
};
var RoundedRectangle = class _RoundedRectangle {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(x = 0, y = 0, width = 0, height = 0, radius = 20) {
    this.type = "roundedRectangle";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
  }
  /**
   * Returns the framing rectangle of the rounded rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(out2) {
    out2 = out2 || new Rectangle();
    out2.x = this.x;
    out2.y = this.y;
    out2.width = this.width;
    out2.height = this.height;
    return out2;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new _RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(rectangle) {
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;
    return this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(rectangle) {
    rectangle.copyFrom(this);
    return rectangle;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        const radius = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (y >= this.y + radius && y <= this.y + this.height - radius || x >= this.x + radius && x <= this.x + this.width - radius) {
          return true;
        }
        let dx = x - (this.x + radius);
        let dy = y - (this.y + radius);
        const radius2 = radius * radius;
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + this.width - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dy = y - (this.y + this.height - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param pX - The X coordinate of the point to test
   * @param pY - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(pX, pY, strokeWidth) {
    const { x, y, width, height, radius } = this;
    const halfStrokeWidth = strokeWidth / 2;
    const innerX = x + radius;
    const innerY = y + radius;
    const innerWidth = width - radius * 2;
    const innerHeight = height - radius * 2;
    const rightBound = x + width;
    const bottomBound = y + height;
    if ((pX >= x - halfStrokeWidth && pX <= x + halfStrokeWidth || pX >= rightBound - halfStrokeWidth && pX <= rightBound + halfStrokeWidth) && pY >= innerY && pY <= innerY + innerHeight) {
      return true;
    }
    if ((pY >= y - halfStrokeWidth && pY <= y + halfStrokeWidth || pY >= bottomBound - halfStrokeWidth && pY <= bottomBound + halfStrokeWidth) && pX >= innerX && pX <= innerX + innerWidth) {
      return true;
    }
    return (
      // Top-left
      pX < innerX && pY < innerY && isCornerWithinStroke(pX, pY, innerX, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY < innerY && isCornerWithinStroke(pX, pY, rightBound - radius, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, rightBound - radius, bottomBound - radius, radius, halfStrokeWidth) || pX < innerX && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, innerX, bottomBound - radius, radius, halfStrokeWidth)
    );
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveBezier.mjs
var RECURSION_LIMIT = 8;
var FLT_EPSILON = 11920929e-14;
var PATH_DISTANCE_EPSILON = 1;
var curveAngleToleranceEpsilon = 0.01;
var mAngleTolerance = 0;
var mCuspLimit = 0;
function buildAdaptiveBezier(points, sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, smoothness) {
  const scale = 1;
  const smoothing = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
  );
  let distanceTolerance = (PATH_DISTANCE_EPSILON - smoothing) / scale;
  distanceTolerance *= distanceTolerance;
  begin(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance);
  return points;
}
function begin(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance) {
  recursive(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance, 0);
  points.push(eX, eY);
}
function recursive(x1, y1, x2, y2, x3, y3, x4, y4, points, distanceTolerance, level) {
  if (level > RECURSION_LIMIT) {
    return;
  }
  const pi = Math.PI;
  const x12 = (x1 + x2) / 2;
  const y12 = (y1 + y2) / 2;
  const x23 = (x2 + x3) / 2;
  const y23 = (y2 + y3) / 2;
  const x34 = (x3 + x4) / 2;
  const y34 = (y3 + y4) / 2;
  const x123 = (x12 + x23) / 2;
  const y123 = (y12 + y23) / 2;
  const x234 = (x23 + x34) / 2;
  const y234 = (y23 + y34) / 2;
  const x1234 = (x123 + x234) / 2;
  const y1234 = (y123 + y234) / 2;
  if (level > 0) {
    let dx = x4 - x1;
    let dy = y4 - y1;
    const d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx);
    const d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx);
    let da1;
    let da2;
    if (d2 > FLT_EPSILON && d3 > FLT_EPSILON) {
      if ((d2 + d3) * (d2 + d3) <= distanceTolerance * (dx * dx + dy * dy)) {
        if (mAngleTolerance < curveAngleToleranceEpsilon) {
          points.push(x1234, y1234);
          return;
        }
        const a23 = Math.atan2(y3 - y2, x3 - x2);
        da1 = Math.abs(a23 - Math.atan2(y2 - y1, x2 - x1));
        da2 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - a23);
        if (da1 >= pi)
          da1 = 2 * pi - da1;
        if (da2 >= pi)
          da2 = 2 * pi - da2;
        if (da1 + da2 < mAngleTolerance) {
          points.push(x1234, y1234);
          return;
        }
        if (mCuspLimit !== 0) {
          if (da1 > mCuspLimit) {
            points.push(x2, y2);
            return;
          }
          if (da2 > mCuspLimit) {
            points.push(x3, y3);
            return;
          }
        }
      }
    } else if (d2 > FLT_EPSILON) {
      if (d2 * d2 <= distanceTolerance * (dx * dx + dy * dy)) {
        if (mAngleTolerance < curveAngleToleranceEpsilon) {
          points.push(x1234, y1234);
          return;
        }
        da1 = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
        if (da1 >= pi)
          da1 = 2 * pi - da1;
        if (da1 < mAngleTolerance) {
          points.push(x2, y2);
          points.push(x3, y3);
          return;
        }
        if (mCuspLimit !== 0) {
          if (da1 > mCuspLimit) {
            points.push(x2, y2);
            return;
          }
        }
      }
    } else if (d3 > FLT_EPSILON) {
      if (d3 * d3 <= distanceTolerance * (dx * dx + dy * dy)) {
        if (mAngleTolerance < curveAngleToleranceEpsilon) {
          points.push(x1234, y1234);
          return;
        }
        da1 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y3 - y2, x3 - x2));
        if (da1 >= pi)
          da1 = 2 * pi - da1;
        if (da1 < mAngleTolerance) {
          points.push(x2, y2);
          points.push(x3, y3);
          return;
        }
        if (mCuspLimit !== 0) {
          if (da1 > mCuspLimit) {
            points.push(x3, y3);
            return;
          }
        }
      }
    } else {
      dx = x1234 - (x1 + x4) / 2;
      dy = y1234 - (y1 + y4) / 2;
      if (dx * dx + dy * dy <= distanceTolerance) {
        points.push(x1234, y1234);
        return;
      }
    }
  }
  recursive(x1, y1, x12, y12, x123, y123, x1234, y1234, points, distanceTolerance, level + 1);
  recursive(x1234, y1234, x234, y234, x34, y34, x4, y4, points, distanceTolerance, level + 1);
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildAdaptiveQuadratic.mjs
var RECURSION_LIMIT2 = 8;
var FLT_EPSILON2 = 11920929e-14;
var PATH_DISTANCE_EPSILON2 = 1;
var curveAngleToleranceEpsilon2 = 0.01;
var mAngleTolerance2 = 0;
function buildAdaptiveQuadratic(points, sX, sY, cp1x, cp1y, eX, eY, smoothness) {
  const scale = 1;
  const smoothing = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
  );
  let distanceTolerance = (PATH_DISTANCE_EPSILON2 - smoothing) / scale;
  distanceTolerance *= distanceTolerance;
  begin2(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance);
  return points;
}
function begin2(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance) {
  recursive2(points, sX, sY, cp1x, cp1y, eX, eY, distanceTolerance, 0);
  points.push(eX, eY);
}
function recursive2(points, x1, y1, x2, y2, x3, y3, distanceTolerance, level) {
  if (level > RECURSION_LIMIT2) {
    return;
  }
  const pi = Math.PI;
  const x12 = (x1 + x2) / 2;
  const y12 = (y1 + y2) / 2;
  const x23 = (x2 + x3) / 2;
  const y23 = (y2 + y3) / 2;
  const x123 = (x12 + x23) / 2;
  const y123 = (y12 + y23) / 2;
  let dx = x3 - x1;
  let dy = y3 - y1;
  const d = Math.abs((x2 - x3) * dy - (y2 - y3) * dx);
  if (d > FLT_EPSILON2) {
    if (d * d <= distanceTolerance * (dx * dx + dy * dy)) {
      if (mAngleTolerance2 < curveAngleToleranceEpsilon2) {
        points.push(x123, y123);
        return;
      }
      let da = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
      if (da >= pi)
        da = 2 * pi - da;
      if (da < mAngleTolerance2) {
        points.push(x123, y123);
        return;
      }
    }
  } else {
    dx = x123 - (x1 + x3) / 2;
    dy = y123 - (y1 + y3) / 2;
    if (dx * dx + dy * dy <= distanceTolerance) {
      points.push(x123, y123);
      return;
    }
  }
  recursive2(points, x1, y1, x12, y12, x123, y123, distanceTolerance, level + 1);
  recursive2(points, x123, y123, x23, y23, x3, y3, distanceTolerance, level + 1);
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArc.mjs
function buildArc(points, x, y, radius, start, end, clockwise, steps) {
  let dist = Math.abs(start - end);
  if (!clockwise && start > end) {
    dist = 2 * Math.PI - dist;
  } else if (clockwise && end > start) {
    dist = 2 * Math.PI - dist;
  }
  steps = steps || Math.max(6, Math.floor(6 * Math.pow(radius, 1 / 3) * (dist / Math.PI)));
  steps = Math.max(steps, 3);
  let f = dist / steps;
  let t = start;
  f *= clockwise ? -1 : 1;
  for (let i = 0; i < steps + 1; i++) {
    const cs = Math.cos(t);
    const sn = Math.sin(t);
    const nx = x + cs * radius;
    const ny = y + sn * radius;
    points.push(nx, ny);
    t += f;
  }
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcTo.mjs
function buildArcTo(points, x1, y1, x2, y2, radius) {
  const fromX = points[points.length - 2];
  const fromY = points[points.length - 1];
  const a1 = fromY - y1;
  const b1 = fromX - x1;
  const a2 = y2 - y1;
  const b2 = x2 - x1;
  const mm = Math.abs(a1 * b2 - b1 * a2);
  if (mm < 1e-8 || radius === 0) {
    if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
      points.push(x1, y1);
    }
    return;
  }
  const dd = a1 * a1 + b1 * b1;
  const cc = a2 * a2 + b2 * b2;
  const tt = a1 * a2 + b1 * b2;
  const k1 = radius * Math.sqrt(dd) / mm;
  const k2 = radius * Math.sqrt(cc) / mm;
  const j1 = k1 * tt / dd;
  const j2 = k2 * tt / cc;
  const cx = k1 * b2 + k2 * b1;
  const cy = k1 * a2 + k2 * a1;
  const px = b1 * (k2 + j1);
  const py = a1 * (k2 + j1);
  const qx = b2 * (k1 + j2);
  const qy = a2 * (k1 + j2);
  const startAngle = Math.atan2(py - cy, px - cx);
  const endAngle = Math.atan2(qy - cy, qx - cx);
  buildArc(
    points,
    cx + x1,
    cy + y1,
    radius,
    startAngle,
    endAngle,
    b1 * a2 > b2 * a1
  );
}

// node_modules/pixi.js/lib/scene/graphics/shared/buildCommands/buildArcToSvg.mjs
var TAU = Math.PI * 2;
var out = {
  centerX: 0,
  centerY: 0,
  ang1: 0,
  ang2: 0
};
var mapToEllipse = ({ x, y }, rx, ry, cosPhi, sinPhi, centerX, centerY, out2) => {
  x *= rx;
  y *= ry;
  const xp = cosPhi * x - sinPhi * y;
  const yp = sinPhi * x + cosPhi * y;
  out2.x = xp + centerX;
  out2.y = yp + centerY;
  return out2;
};
function approxUnitArc(ang1, ang2) {
  const a1 = ang2 === -1.5707963267948966 ? -0.551915024494 : 4 / 3 * Math.tan(ang2 / 4);
  const a = ang2 === 1.5707963267948966 ? 0.551915024494 : a1;
  const x1 = Math.cos(ang1);
  const y1 = Math.sin(ang1);
  const x2 = Math.cos(ang1 + ang2);
  const y2 = Math.sin(ang1 + ang2);
  return [
    {
      x: x1 - y1 * a,
      y: y1 + x1 * a
    },
    {
      x: x2 + y2 * a,
      y: y2 - x2 * a
    },
    {
      x: x2,
      y: y2
    }
  ];
}
var vectorAngle = (ux, uy, vx, vy) => {
  const sign = ux * vy - uy * vx < 0 ? -1 : 1;
  let dot = ux * vx + uy * vy;
  if (dot > 1) {
    dot = 1;
  }
  if (dot < -1) {
    dot = -1;
  }
  return sign * Math.acos(dot);
};
var getArcCenter = (px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinPhi, cosPhi, pxp, pyp, out2) => {
  const rxSq = Math.pow(rx, 2);
  const rySq = Math.pow(ry, 2);
  const pxpSq = Math.pow(pxp, 2);
  const pypSq = Math.pow(pyp, 2);
  let radicant = rxSq * rySq - rxSq * pypSq - rySq * pxpSq;
  if (radicant < 0) {
    radicant = 0;
  }
  radicant /= rxSq * pypSq + rySq * pxpSq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);
  const centerXp = radicant * rx / ry * pyp;
  const centerYp = radicant * -ry / rx * pxp;
  const centerX = cosPhi * centerXp - sinPhi * centerYp + (px + cx) / 2;
  const centerY = sinPhi * centerXp + cosPhi * centerYp + (py + cy) / 2;
  const vx1 = (pxp - centerXp) / rx;
  const vy1 = (pyp - centerYp) / ry;
  const vx2 = (-pxp - centerXp) / rx;
  const vy2 = (-pyp - centerYp) / ry;
  const ang1 = vectorAngle(1, 0, vx1, vy1);
  let ang2 = vectorAngle(vx1, vy1, vx2, vy2);
  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }
  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }
  out2.centerX = centerX;
  out2.centerY = centerY;
  out2.ang1 = ang1;
  out2.ang2 = ang2;
};
function buildArcToSvg(points, px, py, cx, cy, rx, ry, xAxisRotation = 0, largeArcFlag = 0, sweepFlag = 0) {
  if (rx === 0 || ry === 0) {
    return;
  }
  const sinPhi = Math.sin(xAxisRotation * TAU / 360);
  const cosPhi = Math.cos(xAxisRotation * TAU / 360);
  const pxp = cosPhi * (px - cx) / 2 + sinPhi * (py - cy) / 2;
  const pyp = -sinPhi * (px - cx) / 2 + cosPhi * (py - cy) / 2;
  if (pxp === 0 && pyp === 0) {
    return;
  }
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  const lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  getArcCenter(
    px,
    py,
    cx,
    cy,
    rx,
    ry,
    largeArcFlag,
    sweepFlag,
    sinPhi,
    cosPhi,
    pxp,
    pyp,
    out
  );
  let { ang1, ang2 } = out;
  const { centerX, centerY } = out;
  let ratio = Math.abs(ang2) / (TAU / 4);
  if (Math.abs(1 - ratio) < 1e-7) {
    ratio = 1;
  }
  const segments = Math.max(Math.ceil(ratio), 1);
  ang2 /= segments;
  let lastX = points[points.length - 2];
  let lastY = points[points.length - 1];
  const outCurvePoint = { x: 0, y: 0 };
  for (let i = 0; i < segments; i++) {
    const curve = approxUnitArc(ang1, ang2);
    const { x: x1, y: y1 } = mapToEllipse(curve[0], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    const { x: x2, y: y2 } = mapToEllipse(curve[1], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    const { x, y } = mapToEllipse(curve[2], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    buildAdaptiveBezier(
      points,
      lastX,
      lastY,
      x1,
      y1,
      x2,
      y2,
      x,
      y
    );
    lastX = x;
    lastY = y;
    ang1 += ang2;
  }
}

// node_modules/pixi.js/lib/scene/graphics/shared/path/roundShape.mjs
function roundedShapeArc(g, points, radius) {
  const vecFrom = (p, pp) => {
    const x = pp.x - p.x;
    const y = pp.y - p.y;
    const len = Math.sqrt(x * x + y * y);
    const nx = x / len;
    const ny = y / len;
    return { len, nx, ny };
  };
  const sharpCorner = (i, p) => {
    if (i === 0) {
      g.moveTo(p.x, p.y);
    } else {
      g.lineTo(p.x, p.y);
    }
  };
  let p1 = points[points.length - 1];
  for (let i = 0; i < points.length; i++) {
    const p2 = points[i % points.length];
    const pRadius = p2.radius ?? radius;
    if (pRadius <= 0) {
      sharpCorner(i, p2);
      p1 = p2;
      continue;
    }
    const p3 = points[(i + 1) % points.length];
    const v1 = vecFrom(p2, p1);
    const v2 = vecFrom(p2, p3);
    if (v1.len < 1e-4 || v2.len < 1e-4) {
      sharpCorner(i, p2);
      p1 = p2;
      continue;
    }
    let angle = Math.asin(v1.nx * v2.ny - v1.ny * v2.nx);
    let radDirection = 1;
    let drawDirection = false;
    if (v1.nx * v2.nx - v1.ny * -v2.ny < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else if (angle > 0) {
      radDirection = -1;
      drawDirection = true;
    }
    const halfAngle = angle / 2;
    let cRadius;
    let lenOut = Math.abs(
      Math.cos(halfAngle) * pRadius / Math.sin(halfAngle)
    );
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = pRadius;
    }
    const cX = p2.x + v2.nx * lenOut + -v2.ny * cRadius * radDirection;
    const cY = p2.y + v2.ny * lenOut + v2.nx * cRadius * radDirection;
    const startAngle = Math.atan2(v1.ny, v1.nx) + Math.PI / 2 * radDirection;
    const endAngle = Math.atan2(v2.ny, v2.nx) - Math.PI / 2 * radDirection;
    if (i === 0) {
      g.moveTo(
        cX + Math.cos(startAngle) * cRadius,
        cY + Math.sin(startAngle) * cRadius
      );
    }
    g.arc(cX, cY, cRadius, startAngle, endAngle, drawDirection);
    p1 = p2;
  }
}
function roundedShapeQuadraticCurve(g, points, radius, smoothness) {
  const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  const pointLerp = (p1, p2, t) => ({
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t
  });
  const numPoints = points.length;
  for (let i = 0; i < numPoints; i++) {
    const thisPoint = points[(i + 1) % numPoints];
    const pRadius = thisPoint.radius ?? radius;
    if (pRadius <= 0) {
      if (i === 0) {
        g.moveTo(thisPoint.x, thisPoint.y);
      } else {
        g.lineTo(thisPoint.x, thisPoint.y);
      }
      continue;
    }
    const lastPoint = points[i];
    const nextPoint = points[(i + 2) % numPoints];
    const lastEdgeLength = distance(lastPoint, thisPoint);
    let start;
    if (lastEdgeLength < 1e-4) {
      start = thisPoint;
    } else {
      const lastOffsetDistance = Math.min(lastEdgeLength / 2, pRadius);
      start = pointLerp(
        thisPoint,
        lastPoint,
        lastOffsetDistance / lastEdgeLength
      );
    }
    const nextEdgeLength = distance(nextPoint, thisPoint);
    let end;
    if (nextEdgeLength < 1e-4) {
      end = thisPoint;
    } else {
      const nextOffsetDistance = Math.min(nextEdgeLength / 2, pRadius);
      end = pointLerp(
        thisPoint,
        nextPoint,
        nextOffsetDistance / nextEdgeLength
      );
    }
    if (i === 0) {
      g.moveTo(start.x, start.y);
    } else {
      g.lineTo(start.x, start.y);
    }
    g.quadraticCurveTo(thisPoint.x, thisPoint.y, end.x, end.y, smoothness);
  }
}

// node_modules/pixi.js/lib/scene/graphics/shared/path/ShapePath.mjs
var tempRectangle = new Rectangle();
var ShapePath = class {
  constructor(graphicsPath2D) {
    this.shapePrimitives = [];
    this._currentPoly = null;
    this._bounds = new Bounds();
    this._graphicsPath2D = graphicsPath2D;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(x, y) {
    this.startPoly(x, y);
    return this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(x, y) {
    this._ensurePoly();
    const points = this._currentPoly.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    if (fromX !== x || fromY !== y) {
      points.push(x, y);
    }
    return this;
  }
  /**
   * Adds an arc to the path. The arc is centered at (x, y)
   *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The radius of the arc.
   * @param startAngle - The starting angle of the arc, in radians.
   * @param endAngle - The ending angle of the arc, in radians.
   * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
   * @returns The instance of the current object for chaining.
   */
  arc(x, y, radius, startAngle, endAngle, counterclockwise) {
    this._ensurePoly(false);
    const points = this._currentPoly.points;
    buildArc(points, x, y, radius, startAngle, endAngle, counterclockwise);
    return this;
  }
  /**
   * Adds an arc to the path with the arc tangent to the line joining two specified points.
   * The arc radius is specified by `radius`.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param radius - The radius of the arc.
   * @returns The instance of the current object for chaining.
   */
  arcTo(x1, y1, x2, y2, radius) {
    this._ensurePoly();
    const points = this._currentPoly.points;
    buildArcTo(points, x1, y1, x2, y2, radius);
    return this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    const points = this._currentPoly.points;
    buildArcToSvg(
      points,
      this._currentPoly.lastX,
      this._currentPoly.lastY,
      x,
      y,
      rx,
      ry,
      xAxisRotation,
      largeArcFlag,
      sweepFlag
    );
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y, smoothness) {
    this._ensurePoly();
    const currentPoly = this._currentPoly;
    buildAdaptiveBezier(
      this._currentPoly.points,
      currentPoly.lastX,
      currentPoly.lastY,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      x,
      y,
      smoothness
    );
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the control point.
   * @param cp1y - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothing - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(cp1x, cp1y, x, y, smoothing) {
    this._ensurePoly();
    const currentPoly = this._currentPoly;
    buildAdaptiveQuadratic(
      this._currentPoly.points,
      currentPoly.lastX,
      currentPoly.lastY,
      cp1x,
      cp1y,
      x,
      y,
      smoothing
    );
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    this.endPoly(true);
    return this;
  }
  /**
   * Adds another path to the current path. This method allows for the combination of multiple paths into one.
   * @param path - The `GraphicsPath` object representing the path to add.
   * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
   * @returns The instance of the current object for chaining.
   */
  addPath(path2, transform2) {
    this.endPoly();
    if (transform2 && !transform2.isIdentity()) {
      path2 = path2.clone(true);
      path2.transform(transform2);
    }
    for (let i = 0; i < path2.instructions.length; i++) {
      const instruction = path2.instructions[i];
      this[instruction.action](...instruction.data);
    }
    return this;
  }
  /**
   * Finalizes the drawing of the current path. Optionally, it can close the path.
   * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
   */
  finish(closePath = false) {
    this.endPoly(closePath);
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h, transform2) {
    this.drawShape(new Rectangle(x, y, w, h), transform2);
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius, transform2) {
    this.drawShape(new Circle(x, y, radius), transform2);
    return this;
  }
  /**
   * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
   * @param points - An array of numbers, or or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  poly(points, close, transform2) {
    const polygon = new Polygon(points);
    polygon.closePath = close;
    this.drawShape(polygon, transform2);
    return this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(x, y, radius, sides, rotation = 0, transform2) {
    sides = Math.max(sides | 0, 3);
    const startAngle = -1 * Math.PI / 2 + rotation;
    const delta = Math.PI * 2 / sides;
    const polygon = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      polygon.push(
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      );
    }
    this.poly(polygon, true, transform2);
    return this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(x, y, radius, sides, corner, rotation = 0, smoothness) {
    sides = Math.max(sides | 0, 3);
    if (corner <= 0) {
      return this.regularPoly(x, y, radius, sides, rotation);
    }
    const sideLength = radius * Math.sin(Math.PI / sides) - 1e-3;
    corner = Math.min(corner, sideLength);
    const startAngle = -1 * Math.PI / 2 + rotation;
    const delta = Math.PI * 2 / sides;
    const internalAngle = (sides - 2) * Math.PI / sides / 2;
    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      const x0 = x + radius * Math.cos(angle);
      const y0 = y + radius * Math.sin(angle);
      const a1 = angle + Math.PI + internalAngle;
      const a2 = angle - Math.PI - internalAngle;
      const x1 = x0 + corner * Math.cos(a1);
      const y1 = y0 + corner * Math.sin(a1);
      const x3 = x0 + corner * Math.cos(a2);
      const y3 = y0 + corner * Math.sin(a2);
      if (i === 0) {
        this.moveTo(x1, y1);
      } else {
        this.lineTo(x1, y1);
      }
      this.quadraticCurveTo(x0, y0, x3, y3, smoothness);
    }
    return this.closePath();
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(points, radius, useQuadratic = false, smoothness) {
    if (points.length < 3) {
      return this;
    }
    if (useQuadratic) {
      roundedShapeQuadraticCurve(this, points, radius, smoothness);
    } else {
      roundedShapeArc(this, points, radius);
    }
    return this.closePath();
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(x, y, width, height, fillet) {
    if (fillet === 0) {
      return this.rect(x, y, width, height);
    }
    const maxFillet = Math.min(width, height) / 2;
    const inset = Math.min(maxFillet, Math.max(-maxFillet, fillet));
    const right = x + width;
    const bottom = y + height;
    const dir = inset < 0 ? -inset : 0;
    const size = Math.abs(inset);
    return this.moveTo(x, y + size).arcTo(x + dir, y + dir, x + size, y, size).lineTo(right - size, y).arcTo(right - dir, y + dir, right, y + size, size).lineTo(right, bottom - size).arcTo(right - dir, bottom - dir, x + width - size, bottom, size).lineTo(x + size, bottom).arcTo(x + dir, bottom - dir, x, bottom - size, size).closePath();
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(x, y, width, height, chamfer, transform2) {
    if (chamfer <= 0) {
      return this.rect(x, y, width, height);
    }
    const inset = Math.min(chamfer, Math.min(width, height) / 2);
    const right = x + width;
    const bottom = y + height;
    const points = [
      x + inset,
      y,
      right - inset,
      y,
      right,
      y + inset,
      right,
      bottom - inset,
      right - inset,
      bottom,
      x + inset,
      bottom,
      x,
      bottom - inset,
      x,
      y + inset
    ];
    for (let i = points.length - 1; i >= 2; i -= 2) {
      if (points[i] === points[i - 2] && points[i - 1] === points[i - 3]) {
        points.splice(i - 1, 2);
      }
    }
    return this.poly(points, true, transform2);
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
   * @returns The instance of the current object for chaining.
   */
  ellipse(x, y, radiusX, radiusY, transform2) {
    this.drawShape(new Ellipse(x, y, radiusX, radiusY), transform2);
    return this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  roundRect(x, y, w, h, radius, transform2) {
    this.drawShape(new RoundedRectangle(x, y, w, h, radius), transform2);
    return this;
  }
  /**
   * Draws a given shape on the canvas.
   * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
   * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
   * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
   * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
   * scaling, and translations.
   * @returns The instance of the current object for chaining.
   */
  drawShape(shape, matrix) {
    this.endPoly();
    this.shapePrimitives.push({ shape, transform: matrix });
    return this;
  }
  /**
   * Starts a new polygon path from the specified starting point.
   * This method initializes a new polygon or ends the current one if it exists.
   * @param x - The x-coordinate of the starting point of the new polygon.
   * @param y - The y-coordinate of the starting point of the new polygon.
   * @returns The instance of the current object for chaining.
   */
  startPoly(x, y) {
    let currentPoly = this._currentPoly;
    if (currentPoly) {
      this.endPoly();
    }
    currentPoly = new Polygon();
    currentPoly.points.push(x, y);
    this._currentPoly = currentPoly;
    return this;
  }
  /**
   * Ends the current polygon path. If `closePath` is set to true,
   * the path is closed by connecting the last point to the first one.
   * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
   * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
   *  back to the starting point. False by default.
   * @returns The instance of the current object for chaining.
   */
  endPoly(closePath = false) {
    const shape = this._currentPoly;
    if (shape && shape.points.length > 2) {
      shape.closePath = closePath;
      this.shapePrimitives.push({ shape });
    }
    this._currentPoly = null;
    return this;
  }
  _ensurePoly(start = true) {
    if (this._currentPoly)
      return;
    this._currentPoly = new Polygon();
    if (start) {
      const lastShape = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (lastShape) {
        let lx = lastShape.shape.x;
        let ly = lastShape.shape.y;
        if (lastShape.transform && !lastShape.transform.isIdentity()) {
          const t = lastShape.transform;
          const tempX = lx;
          lx = t.a * lx + t.c * ly + t.tx;
          ly = t.b * tempX + t.d * ly + t.ty;
        }
        this._currentPoly.points.push(lx, ly);
      } else {
        this._currentPoly.points.push(0, 0);
      }
    }
  }
  /** Builds the path. */
  buildPath() {
    const path2 = this._graphicsPath2D;
    this.shapePrimitives.length = 0;
    this._currentPoly = null;
    for (let i = 0; i < path2.instructions.length; i++) {
      const instruction = path2.instructions[i];
      this[instruction.action](...instruction.data);
    }
    this.finish();
  }
  /** Gets the bounds of the path. */
  get bounds() {
    const bounds = this._bounds;
    bounds.clear();
    const shapePrimitives = this.shapePrimitives;
    for (let i = 0; i < shapePrimitives.length; i++) {
      const shapePrimitive = shapePrimitives[i];
      const boundsRect = shapePrimitive.shape.getBounds(tempRectangle);
      if (shapePrimitive.transform) {
        bounds.addRect(boundsRect, shapePrimitive.transform);
      } else {
        bounds.addRect(boundsRect);
      }
    }
    return bounds;
  }
};

// node_modules/pixi.js/lib/scene/graphics/shared/path/GraphicsPath.mjs
var GraphicsPath = class _GraphicsPath {
  /**
   * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
   * @param instructions - An SVG path string or an array of `PathInstruction` objects.
   */
  constructor(instructions) {
    this.instructions = [];
    this.uid = uid("graphicsPath");
    this._dirty = true;
    if (typeof instructions === "string") {
      SVGToGraphicsPath(instructions, this);
    } else {
      this.instructions = (instructions == null ? void 0 : instructions.slice()) ?? [];
    }
  }
  /**
   * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
   * @returns The `ShapePath` instance associated with this `GraphicsPath`.
   */
  get shapePath() {
    if (!this._shapePath) {
      this._shapePath = new ShapePath(this);
    }
    if (this._dirty) {
      this._dirty = false;
      this._shapePath.buildPath();
    }
    return this._shapePath;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @param transform - An optional transformation to apply to the added path.
   * @returns The instance of the current object for chaining.
   */
  addPath(path2, transform2) {
    path2 = path2.clone();
    this.instructions.push({ action: "addPath", data: [path2, transform2] });
    this._dirty = true;
    return this;
  }
  arc(...args) {
    this.instructions.push({ action: "arc", data: args });
    this._dirty = true;
    return this;
  }
  arcTo(...args) {
    this.instructions.push({ action: "arcTo", data: args });
    this._dirty = true;
    return this;
  }
  arcToSvg(...args) {
    this.instructions.push({ action: "arcToSvg", data: args });
    this._dirty = true;
    return this;
  }
  bezierCurveTo(...args) {
    this.instructions.push({ action: "bezierCurveTo", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires two points: the second control point and the end point. The first control point is assumed to be
   * The starting point is the last point in the current path.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveToShort(cp2x, cp2y, x, y, smoothness) {
    const last = this.instructions[this.instructions.length - 1];
    const lastPoint = this.getLastPoint(Point.shared);
    let cp1x = 0;
    let cp1y = 0;
    if (!last || last.action !== "bezierCurveTo") {
      cp1x = lastPoint.x;
      cp1y = lastPoint.y;
    } else {
      cp1x = last.data[2];
      cp1y = last.data[3];
      const currentX = lastPoint.x;
      const currentY = lastPoint.y;
      cp1x = currentX + (currentX - cp1x);
      cp1y = currentY + (currentY - cp1y);
    }
    this.instructions.push({ action: "bezierCurveTo", data: [cp1x, cp1y, cp2x, cp2y, x, y, smoothness] });
    this._dirty = true;
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    this.instructions.push({ action: "closePath", data: [] });
    this._dirty = true;
    return this;
  }
  ellipse(...args) {
    this.instructions.push({ action: "ellipse", data: args });
    this._dirty = true;
    return this;
  }
  lineTo(...args) {
    this.instructions.push({ action: "lineTo", data: args });
    this._dirty = true;
    return this;
  }
  moveTo(...args) {
    this.instructions.push({ action: "moveTo", data: args });
    return this;
  }
  quadraticCurveTo(...args) {
    this.instructions.push({ action: "quadraticCurveTo", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It uses the previous point as the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveToShort(x, y, smoothness) {
    const last = this.instructions[this.instructions.length - 1];
    const lastPoint = this.getLastPoint(Point.shared);
    let cpx1 = 0;
    let cpy1 = 0;
    if (!last || last.action !== "quadraticCurveTo") {
      cpx1 = lastPoint.x;
      cpy1 = lastPoint.y;
    } else {
      cpx1 = last.data[0];
      cpy1 = last.data[1];
      const currentX = lastPoint.x;
      const currentY = lastPoint.y;
      cpx1 = currentX + (currentX - cpx1);
      cpy1 = currentY + (currentY - cpy1);
    }
    this.instructions.push({ action: "quadraticCurveTo", data: [cpx1, cpy1, x, y, smoothness] });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h, transform2) {
    this.instructions.push({ action: "rect", data: [x, y, w, h, transform2] });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius, transform2) {
    this.instructions.push({ action: "circle", data: [x, y, radius, transform2] });
    this._dirty = true;
    return this;
  }
  roundRect(...args) {
    this.instructions.push({ action: "roundRect", data: args });
    this._dirty = true;
    return this;
  }
  poly(...args) {
    this.instructions.push({ action: "poly", data: args });
    this._dirty = true;
    return this;
  }
  regularPoly(...args) {
    this.instructions.push({ action: "regularPoly", data: args });
    this._dirty = true;
    return this;
  }
  roundPoly(...args) {
    this.instructions.push({ action: "roundPoly", data: args });
    this._dirty = true;
    return this;
  }
  roundShape(...args) {
    this.instructions.push({ action: "roundShape", data: args });
    this._dirty = true;
    return this;
  }
  filletRect(...args) {
    this.instructions.push({ action: "filletRect", data: args });
    this._dirty = true;
    return this;
  }
  chamferRect(...args) {
    this.instructions.push({ action: "chamferRect", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @param transform - An optional `Matrix` object to apply a transformation to the star.
   * This can include rotations, scaling, and translations.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  // eslint-disable-next-line max-len
  star(x, y, points, radius, innerRadius, rotation, transform2) {
    innerRadius = innerRadius || radius / 2;
    const startAngle = -1 * Math.PI / 2 + rotation;
    const len = points * 2;
    const delta = Math.PI * 2 / len;
    const polygon = [];
    for (let i = 0; i < len; i++) {
      const r = i % 2 ? innerRadius : radius;
      const angle = i * delta + startAngle;
      polygon.push(
        x + r * Math.cos(angle),
        y + r * Math.sin(angle)
      );
    }
    this.poly(polygon, true, transform2);
    return this;
  }
  /**
   * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
   * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
   * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
   * do not affect the original `GraphicsPath` and vice versa.
   * @param deep - A boolean flag indicating whether the clone should be deep.
   * @returns A new `GraphicsPath` instance that is a clone of the current instance.
   */
  clone(deep = false) {
    const newGraphicsPath2D = new _GraphicsPath();
    if (!deep) {
      newGraphicsPath2D.instructions = this.instructions.slice();
    } else {
      for (let i = 0; i < this.instructions.length; i++) {
        const instruction = this.instructions[i];
        newGraphicsPath2D.instructions.push({ action: instruction.action, data: instruction.data.slice() });
      }
    }
    return newGraphicsPath2D;
  }
  clear() {
    this.instructions.length = 0;
    this._dirty = true;
    return this;
  }
  /**
   * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
   * This method enables the modification of the path's geometry according to the provided
   * transformation matrix, which can include translations, rotations, scaling, and skewing.
   *
   * Each drawing instruction in the path is updated to reflect the transformation,
   * ensuring the visual representation of the path is consistent with the applied matrix.
   *
   * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
   * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
   * allowing for fine-grained control over the path's appearance.
   * @param matrix - A `Matrix` object representing the transformation to apply.
   * @returns The instance of the current object for chaining further operations.
   */
  transform(matrix) {
    if (matrix.isIdentity())
      return this;
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    let x = 0;
    let y = 0;
    let cpx1 = 0;
    let cpy1 = 0;
    let cpx2 = 0;
    let cpy2 = 0;
    let rx = 0;
    let ry = 0;
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];
      const data = instruction.data;
      switch (instruction.action) {
        case "moveTo":
        case "lineTo":
          x = data[0];
          y = data[1];
          data[0] = a * x + c * y + tx;
          data[1] = b * x + d * y + ty;
          break;
        case "bezierCurveTo":
          cpx1 = data[0];
          cpy1 = data[1];
          cpx2 = data[2];
          cpy2 = data[3];
          x = data[4];
          y = data[5];
          data[0] = a * cpx1 + c * cpy1 + tx;
          data[1] = b * cpx1 + d * cpy1 + ty;
          data[2] = a * cpx2 + c * cpy2 + tx;
          data[3] = b * cpx2 + d * cpy2 + ty;
          data[4] = a * x + c * y + tx;
          data[5] = b * x + d * y + ty;
          break;
        case "quadraticCurveTo":
          cpx1 = data[0];
          cpy1 = data[1];
          x = data[2];
          y = data[3];
          data[0] = a * cpx1 + c * cpy1 + tx;
          data[1] = b * cpx1 + d * cpy1 + ty;
          data[2] = a * x + c * y + tx;
          data[3] = b * x + d * y + ty;
          break;
        case "arcToSvg":
          x = data[5];
          y = data[6];
          rx = data[0];
          ry = data[1];
          data[0] = a * rx + c * ry;
          data[1] = b * rx + d * ry;
          data[5] = a * x + c * y + tx;
          data[6] = b * x + d * y + ty;
          break;
        case "circle":
          data[4] = adjustTransform(data[3], matrix);
          break;
        case "rect":
          data[4] = adjustTransform(data[4], matrix);
          break;
        case "ellipse":
          data[8] = adjustTransform(data[8], matrix);
          break;
        case "roundRect":
          data[5] = adjustTransform(data[5], matrix);
          break;
        case "addPath":
          data[0].transform(matrix);
          break;
        case "poly":
          data[2] = adjustTransform(data[2], matrix);
          break;
        default:
          warn("unknown transform action", instruction.action);
          break;
      }
    }
    this._dirty = true;
    return this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  /**
   * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
   * This method is useful for operations that depend on the path's current endpoint,
   * such as connecting subsequent shapes or paths. It supports various drawing instructions,
   * ensuring the last point's position is accurately determined regardless of the path's complexity.
   *
   * If the last instruction is a `closePath`, the method iterates backward through the instructions
   *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
   * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
   * the last point from the nested path.
   * @param out - A `Point` object where the last point's coordinates will be stored.
   * This object is modified directly to contain the result.
   * @returns The `Point` object containing the last point's coordinates.
   */
  getLastPoint(out2) {
    let index = this.instructions.length - 1;
    let lastInstruction = this.instructions[index];
    if (!lastInstruction) {
      out2.x = 0;
      out2.y = 0;
      return out2;
    }
    while (lastInstruction.action === "closePath") {
      index--;
      if (index < 0) {
        out2.x = 0;
        out2.y = 0;
        return out2;
      }
      lastInstruction = this.instructions[index];
    }
    switch (lastInstruction.action) {
      case "moveTo":
      case "lineTo":
        out2.x = lastInstruction.data[0];
        out2.y = lastInstruction.data[1];
        break;
      case "quadraticCurveTo":
        out2.x = lastInstruction.data[2];
        out2.y = lastInstruction.data[3];
        break;
      case "bezierCurveTo":
        out2.x = lastInstruction.data[4];
        out2.y = lastInstruction.data[5];
        break;
      case "arc":
      case "arcToSvg":
        out2.x = lastInstruction.data[5];
        out2.y = lastInstruction.data[6];
        break;
      case "addPath":
        lastInstruction.data[0].getLastPoint(out2);
        break;
    }
    return out2;
  }
};
function adjustTransform(currentMatrix, transform2) {
  if (currentMatrix) {
    return currentMatrix.prepend(transform2);
  }
  return transform2.clone();
}

// node_modules/pixi.js/lib/scene/graphics/shared/svg/SVGParser.mjs
function SVGParser(svg, graphicsContext) {
  if (typeof svg === "string") {
    const div = document.createElement("div");
    div.innerHTML = svg.trim();
    svg = div.querySelector("svg");
  }
  const session = {
    context: graphicsContext,
    path: new GraphicsPath()
  };
  renderChildren(svg, session, null, null);
  return graphicsContext;
}
function renderChildren(svg, session, fillStyle, strokeStyle) {
  const children = svg.children;
  const { fillStyle: f1, strokeStyle: s1 } = parseStyle(svg);
  if (f1 && fillStyle) {
    fillStyle = { ...fillStyle, ...f1 };
  } else if (f1) {
    fillStyle = f1;
  }
  if (s1 && strokeStyle) {
    strokeStyle = { ...strokeStyle, ...s1 };
  } else if (s1) {
    strokeStyle = s1;
  }
  session.context.fillStyle = fillStyle;
  session.context.strokeStyle = strokeStyle;
  let x;
  let y;
  let x1;
  let y1;
  let x2;
  let y2;
  let cx;
  let cy;
  let r;
  let rx;
  let ry;
  let points;
  let pointsString;
  let d;
  let graphicsPath;
  let width;
  let height;
  switch (svg.nodeName.toLowerCase()) {
    case "path":
      d = svg.getAttribute("d");
      graphicsPath = new GraphicsPath(d);
      session.context.path(graphicsPath);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "circle":
      cx = parseFloatAttribute(svg, "cx", 0);
      cy = parseFloatAttribute(svg, "cy", 0);
      r = parseFloatAttribute(svg, "r", 0);
      session.context.ellipse(cx, cy, r, r);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "rect":
      x = parseFloatAttribute(svg, "x", 0);
      y = parseFloatAttribute(svg, "y", 0);
      width = parseFloatAttribute(svg, "width", 0);
      height = parseFloatAttribute(svg, "height", 0);
      rx = parseFloatAttribute(svg, "rx", 0);
      ry = parseFloatAttribute(svg, "ry", 0);
      if (rx || ry) {
        session.context.roundRect(x, y, width, height, rx || ry);
      } else {
        session.context.rect(x, y, width, height);
      }
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "ellipse":
      cx = parseFloatAttribute(svg, "cx", 0);
      cy = parseFloatAttribute(svg, "cy", 0);
      rx = parseFloatAttribute(svg, "rx", 0);
      ry = parseFloatAttribute(svg, "ry", 0);
      session.context.beginPath();
      session.context.ellipse(cx, cy, rx, ry);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "line":
      x1 = parseFloatAttribute(svg, "x1", 0);
      y1 = parseFloatAttribute(svg, "y1", 0);
      x2 = parseFloatAttribute(svg, "x2", 0);
      y2 = parseFloatAttribute(svg, "y2", 0);
      session.context.beginPath();
      session.context.moveTo(x1, y1);
      session.context.lineTo(x2, y2);
      if (strokeStyle)
        session.context.stroke();
      break;
    case "polygon":
      pointsString = svg.getAttribute("points");
      points = pointsString.match(/\d+/g).map((n) => parseInt(n, 10));
      session.context.poly(points, true);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "polyline":
      pointsString = svg.getAttribute("points");
      points = pointsString.match(/\d+/g).map((n) => parseInt(n, 10));
      session.context.poly(points, false);
      if (strokeStyle)
        session.context.stroke();
      break;
    case "g":
    case "svg":
      break;
    default: {
      console.info(`[SVG parser] <${svg.nodeName}> elements unsupported`);
      break;
    }
  }
  for (let i = 0; i < children.length; i++) {
    renderChildren(children[i], session, fillStyle, strokeStyle);
  }
}
function parseFloatAttribute(svg, id, defaultValue) {
  const value = svg.getAttribute(id);
  return value ? Number(value) : defaultValue;
}
function parseStyle(svg) {
  const style = svg.getAttribute("style");
  const strokeStyle = {};
  const fillStyle = {};
  let useFill = false;
  let useStroke = false;
  if (style) {
    const styleParts = style.split(";");
    for (let i = 0; i < styleParts.length; i++) {
      const stylePart = styleParts[i];
      const [key, value] = stylePart.split(":");
      switch (key) {
        case "stroke":
          if (value !== "none") {
            strokeStyle.color = Color.shared.setValue(value).toNumber();
            useStroke = true;
          }
          break;
        case "stroke-width":
          strokeStyle.width = Number(value);
          break;
        case "fill":
          if (value !== "none") {
            useFill = true;
            fillStyle.color = Color.shared.setValue(value).toNumber();
          }
          break;
        case "fill-opacity":
          fillStyle.alpha = Number(value);
          break;
        case "stroke-opacity":
          strokeStyle.alpha = Number(value);
          break;
        case "opacity":
          fillStyle.alpha = Number(value);
          strokeStyle.alpha = Number(value);
          break;
      }
    }
  } else {
    const stroke = svg.getAttribute("stroke");
    if (stroke && stroke !== "none") {
      useStroke = true;
      strokeStyle.color = Color.shared.setValue(stroke).toNumber();
      strokeStyle.width = parseFloatAttribute(svg, "stroke-width", 1);
    }
    const fill = svg.getAttribute("fill");
    if (fill && fill !== "none") {
      useFill = true;
      fillStyle.color = Color.shared.setValue(fill).toNumber();
    }
  }
  return {
    strokeStyle: useStroke ? strokeStyle : null,
    fillStyle: useFill ? fillStyle : null
  };
}

// node_modules/pixi.js/lib/scene/graphics/shared/utils/convertFillInputToFillStyle.mjs
function isColorLike(value) {
  return Color.isColorLike(value);
}
function isFillPattern(value) {
  return value instanceof FillPattern;
}
function isFillGradient(value) {
  return value instanceof FillGradient;
}
function handleColorLike(fill, value, defaultStyle) {
  const temp = Color.shared.setValue(value ?? 0);
  fill.color = temp.toNumber();
  fill.alpha = temp.alpha === 1 ? defaultStyle.alpha : temp.alpha;
  fill.texture = Texture.WHITE;
  return { ...defaultStyle, ...fill };
}
function handleFillPattern(fill, value, defaultStyle) {
  fill.fill = value;
  fill.color = 16777215;
  fill.texture = value.texture;
  fill.matrix = value.transform;
  return { ...defaultStyle, ...fill };
}
function handleFillGradient(fill, value, defaultStyle) {
  value.buildLinearGradient();
  fill.fill = value;
  fill.color = 16777215;
  fill.texture = value.texture;
  fill.matrix = value.transform;
  return { ...defaultStyle, ...fill };
}
function handleFillObject(value, defaultStyle) {
  var _a;
  const style = { ...defaultStyle, ...value };
  if (style.texture) {
    if (style.texture !== Texture.WHITE) {
      const m = ((_a = style.matrix) == null ? void 0 : _a.invert()) || new Matrix();
      m.translate(style.texture.frame.x, style.texture.frame.y);
      m.scale(1 / style.texture.source.width, 1 / style.texture.source.height);
      style.matrix = m;
    }
    const sourceStyle = style.texture.source.style;
    if (sourceStyle.addressMode === "clamp-to-edge") {
      sourceStyle.addressMode = "repeat";
      sourceStyle.update();
    }
  }
  const color = Color.shared.setValue(style.color);
  style.alpha *= color.alpha;
  style.color = color.toNumber();
  style.matrix = style.matrix ? style.matrix.clone() : null;
  return style;
}
function toFillStyle(value, defaultStyle) {
  if (value === void 0 || value === null) {
    return null;
  }
  const fill = {};
  const objectStyle = value;
  if (isColorLike(value)) {
    return handleColorLike(fill, value, defaultStyle);
  } else if (isFillPattern(value)) {
    return handleFillPattern(fill, value, defaultStyle);
  } else if (isFillGradient(value)) {
    return handleFillGradient(fill, value, defaultStyle);
  } else if (objectStyle.fill && isFillPattern(objectStyle.fill)) {
    return handleFillPattern(objectStyle, objectStyle.fill, defaultStyle);
  } else if (objectStyle.fill && isFillGradient(objectStyle.fill)) {
    return handleFillGradient(objectStyle, objectStyle.fill, defaultStyle);
  }
  return handleFillObject(objectStyle, defaultStyle);
}
function toStrokeStyle(value, defaultStyle) {
  const { width, alignment, miterLimit, cap, join, ...rest } = defaultStyle;
  const fill = toFillStyle(value, rest);
  if (!fill) {
    return null;
  }
  return {
    width,
    alignment,
    miterLimit,
    cap,
    join,
    ...fill
  };
}

// node_modules/pixi.js/lib/scene/graphics/shared/GraphicsContext.mjs
var tmpPoint = new Point();
var tempMatrix = new Matrix();
var _GraphicsContext = class _GraphicsContext2 extends eventemitter3_default {
  constructor() {
    super(...arguments);
    this.uid = uid("graphicsContext");
    this.dirty = true;
    this.batchMode = "auto";
    this.instructions = [];
    this._activePath = new GraphicsPath();
    this._transform = new Matrix();
    this._fillStyle = { ..._GraphicsContext2.defaultFillStyle };
    this._strokeStyle = { ..._GraphicsContext2.defaultStrokeStyle };
    this._stateStack = [];
    this._tick = 0;
    this._bounds = new Bounds();
    this._boundsDirty = true;
  }
  /**
   * Creates a new GraphicsContext object that is a clone of this instance, copying all properties,
   * including the current drawing state, transformations, styles, and instructions.
   * @returns A new GraphicsContext instance with the same properties and state as this one.
   */
  clone() {
    const clone = new _GraphicsContext2();
    clone.batchMode = this.batchMode;
    clone.instructions = this.instructions.slice();
    clone._activePath = this._activePath.clone();
    clone._transform = this._transform.clone();
    clone._fillStyle = { ...this._fillStyle };
    clone._strokeStyle = { ...this._strokeStyle };
    clone._stateStack = this._stateStack.slice();
    clone._bounds = this._bounds.clone();
    clone._boundsDirty = true;
    return clone;
  }
  /**
   * The current fill style of the graphics context. This can be a color, gradient, pattern, or a more complex style defined by a FillStyle object.
   */
  get fillStyle() {
    return this._fillStyle;
  }
  set fillStyle(value) {
    this._fillStyle = toFillStyle(value, _GraphicsContext2.defaultFillStyle);
  }
  /**
   * The current stroke style of the graphics context. Similar to fill styles, stroke styles can encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   */
  get strokeStyle() {
    return this._strokeStyle;
  }
  set strokeStyle(value) {
    this._strokeStyle = toStrokeStyle(value, _GraphicsContext2.defaultStrokeStyle);
  }
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param style - The fill style to apply. This can be a simple color, a gradient or pattern object,
   *                or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(style) {
    this._fillStyle = toFillStyle(style, _GraphicsContext2.defaultFillStyle);
    return this;
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param style - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   *                or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(style) {
    this._strokeStyle = toFillStyle(style, _GraphicsContext2.defaultStrokeStyle);
    return this;
  }
  texture(texture, tint, dx, dy, dw, dh) {
    this.instructions.push({
      action: "texture",
      data: {
        image: texture,
        dx: dx || 0,
        dy: dy || 0,
        dw: dw || texture.frame.width,
        dh: dh || texture.frame.height,
        transform: this._transform.clone(),
        alpha: this._fillStyle.alpha,
        style: tint ? Color.shared.setValue(tint).toNumber() : 16777215
      }
    });
    this.onUpdate();
    return this;
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    this._activePath = new GraphicsPath();
    return this;
  }
  fill(style, alpha) {
    let path2;
    const lastInstruction = this.instructions[this.instructions.length - 1];
    if (this._tick === 0 && lastInstruction && lastInstruction.action === "stroke") {
      path2 = lastInstruction.data.path;
    } else {
      path2 = this._activePath.clone();
    }
    if (!path2)
      return this;
    if (style != null) {
      if (alpha !== void 0 && typeof style === "number") {
        deprecation(v8_0_0, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead");
        style = { color: style, alpha };
      }
      this._fillStyle = toFillStyle(style, _GraphicsContext2.defaultFillStyle);
    }
    this.instructions.push({
      action: "fill",
      // TODO copy fill style!
      data: { style: this.fillStyle, path: path2 }
    });
    this.onUpdate();
    this._initNextPathLocation();
    this._tick = 0;
    return this;
  }
  _initNextPathLocation() {
    const { x, y } = this._activePath.getLastPoint(Point.shared);
    this._activePath.clear();
    this._activePath.moveTo(x, y);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillInput parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param style - (Optional) The stroke style to apply. Can be defined as a simple color or a more complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(style) {
    let path2;
    const lastInstruction = this.instructions[this.instructions.length - 1];
    if (this._tick === 0 && lastInstruction && lastInstruction.action === "fill") {
      path2 = lastInstruction.data.path;
    } else {
      path2 = this._activePath.clone();
    }
    if (!path2)
      return this;
    if (style != null) {
      this._strokeStyle = toStrokeStyle(style, _GraphicsContext2.defaultStrokeStyle);
    }
    this.instructions.push({
      action: "stroke",
      // TODO copy fill style!
      data: { style: this.strokeStyle, path: path2 }
    });
    this.onUpdate();
    this._initNextPathLocation();
    this._tick = 0;
    return this;
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  cut() {
    for (let i = 0; i < 2; i++) {
      const lastInstruction = this.instructions[this.instructions.length - 1 - i];
      const holePath = this._activePath.clone();
      if (lastInstruction) {
        if (lastInstruction.action === "stroke" || lastInstruction.action === "fill") {
          if (lastInstruction.data.hole) {
            lastInstruction.data.hole.addPath(holePath);
          } else {
            lastInstruction.data.hole = holePath;
            break;
          }
        }
      }
    }
    this._initNextPathLocation();
    return this;
  }
  /**
   * Adds an arc to the current path, which is centered at (x, y) with the specified radius,
   * starting and ending angles, and direction.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The arc's radius.
   * @param startAngle - The starting angle, in radians.
   * @param endAngle - The ending angle, in radians.
   * @param counterclockwise - (Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise (false). Defaults to false.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arc(x, y, radius, startAngle, endAngle, counterclockwise) {
    this._tick++;
    const t = this._transform;
    this._activePath.arc(
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      radius,
      startAngle,
      endAngle,
      counterclockwise
    );
    return this;
  }
  /**
   * Adds an arc to the current path with the given control points and radius, connected to the previous point
   * by a straight line if necessary.
   * @param x1 - The x-coordinate of the first control point.
   * @param y1 - The y-coordinate of the first control point.
   * @param x2 - The x-coordinate of the second control point.
   * @param y2 - The y-coordinate of the second control point.
   * @param radius - The arc's radius.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arcTo(x1, y1, x2, y2, radius) {
    this._tick++;
    const t = this._transform;
    this._activePath.arcTo(
      t.a * x1 + t.c * y1 + t.tx,
      t.b * x1 + t.d * y1 + t.ty,
      t.a * x2 + t.c * y2 + t.tx,
      t.b * x2 + t.d * y2 + t.ty,
      radius
    );
    return this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this._tick++;
    const t = this._transform;
    this._activePath.arcToSvg(
      rx,
      ry,
      xAxisRotation,
      // should we rotate this with transform??
      largeArcFlag,
      sweepFlag,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty
    );
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y, smoothness) {
    this._tick++;
    const t = this._transform;
    this._activePath.bezierCurveTo(
      t.a * cp1x + t.c * cp1y + t.tx,
      t.b * cp1x + t.d * cp1y + t.ty,
      t.a * cp2x + t.c * cp2y + t.tx,
      t.b * cp2x + t.d * cp2y + t.ty,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      smoothness
    );
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    var _a;
    this._tick++;
    (_a = this._activePath) == null ? void 0 : _a.closePath();
    return this;
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @returns The instance of the current object for chaining.
   */
  ellipse(x, y, radiusX, radiusY) {
    this._tick++;
    this._activePath.ellipse(x, y, radiusX, radiusY, this._transform.clone());
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius) {
    this._tick++;
    this._activePath.circle(x, y, radius, this._transform.clone());
    return this;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @returns The instance of the current object for chaining.
   */
  path(path2) {
    this._tick++;
    this._activePath.addPath(path2, this._transform.clone());
    return this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(x, y) {
    this._tick++;
    const t = this._transform;
    this._activePath.lineTo(
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty
    );
    return this;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(x, y) {
    this._tick++;
    const t = this._transform;
    const instructions = this._activePath.instructions;
    const transformedX = t.a * x + t.c * y + t.tx;
    const transformedY = t.b * x + t.d * y + t.ty;
    if (instructions.length === 1 && instructions[0].action === "moveTo") {
      instructions[0].data[0] = transformedX;
      instructions[0].data[1] = transformedY;
      return this;
    }
    this._activePath.moveTo(
      transformedX,
      transformedY
    );
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cpx - The x-coordinate of the control point.
   * @param cpy - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(cpx, cpy, x, y, smoothness) {
    this._tick++;
    const t = this._transform;
    this._activePath.quadraticCurveTo(
      t.a * cpx + t.c * cpy + t.tx,
      t.b * cpx + t.d * cpy + t.ty,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      smoothness
    );
    return this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h) {
    this._tick++;
    this._activePath.rect(x, y, w, h, this._transform.clone());
    return this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @returns The instance of the current object for chaining.
   */
  roundRect(x, y, w, h, radius) {
    this._tick++;
    this._activePath.roundRect(x, y, w, h, radius, this._transform.clone());
    return this;
  }
  /**
   * Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
   * which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
   * rotated, or translated as needed.
   * @param points - An array of numbers, or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates, of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   */
  poly(points, close) {
    this._tick++;
    this._activePath.poly(points, close, this._transform.clone());
    return this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(x, y, radius, sides, rotation = 0, transform2) {
    this._tick++;
    this._activePath.regularPoly(x, y, radius, sides, rotation, transform2);
    return this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(x, y, radius, sides, corner, rotation) {
    this._tick++;
    this._activePath.roundPoly(x, y, radius, sides, corner, rotation);
    return this;
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(points, radius, useQuadratic, smoothness) {
    this._tick++;
    this._activePath.roundShape(points, radius, useQuadratic, smoothness);
    return this;
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(x, y, width, height, fillet) {
    this._tick++;
    this._activePath.filletRect(x, y, width, height, fillet);
    return this;
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(x, y, width, height, chamfer, transform2) {
    this._tick++;
    this._activePath.chamferRect(x, y, width, height, chamfer, transform2);
    return this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  star(x, y, points, radius, innerRadius = 0, rotation = 0) {
    this._tick++;
    this._activePath.star(x, y, points, radius, innerRadius, rotation, this._transform.clone());
    return this;
  }
  /**
   * Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
   * defined in SVG format to be drawn within the graphics context.
   * @param svg - The SVG string to be parsed and rendered.
   */
  svg(svg) {
    this._tick++;
    SVGParser(svg, this);
    return this;
  }
  /**
   * Restores the most recently saved graphics state by popping the top of the graphics state stack.
   * This includes transformations, fill styles, and stroke styles.
   */
  restore() {
    const state = this._stateStack.pop();
    if (state) {
      this._transform = state.transform;
      this._fillStyle = state.fillStyle;
      this._strokeStyle = state.strokeStyle;
    }
    return this;
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    this._stateStack.push({
      transform: this._transform.clone(),
      fillStyle: { ...this._fillStyle },
      strokeStyle: { ...this._strokeStyle }
    });
    return this;
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this._transform;
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    this._transform.identity();
    return this;
  }
  /**
   * Applies a rotation transformation to the graphics context around the current origin.
   * @param angle - The angle of rotation in radians.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  rotate(angle) {
    this._transform.rotate(angle);
    return this;
  }
  /**
   * Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.
   * @param x - The scale factor in the horizontal direction.
   * @param y - (Optional) The scale factor in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  scale(x, y = x) {
    this._transform.scale(x, y);
    return this;
  }
  setTransform(a, b, c, d, dx, dy) {
    if (a instanceof Matrix) {
      this._transform.set(a.a, a.b, a.c, a.d, a.tx, a.ty);
      return this;
    }
    this._transform.set(a, b, c, d, dx, dy);
    return this;
  }
  transform(a, b, c, d, dx, dy) {
    if (a instanceof Matrix) {
      this._transform.append(a);
      return this;
    }
    tempMatrix.set(a, b, c, d, dx, dy);
    this._transform.append(tempMatrix);
    return this;
  }
  /**
   * Applies a translation transformation to the graphics context, moving the origin by the specified amounts.
   * @param x - The amount to translate in the horizontal direction.
   * @param y - (Optional) The amount to translate in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  translate(x, y = x) {
    this._transform.translate(x, y);
    return this;
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    this._activePath.clear();
    this.instructions.length = 0;
    this.resetTransform();
    this.onUpdate();
    return this;
  }
  onUpdate() {
    if (this.dirty)
      return;
    this.emit("update", this, 16);
    this.dirty = true;
    this._boundsDirty = true;
  }
  /** The bounds of the graphic shape. */
  get bounds() {
    if (!this._boundsDirty)
      return this._bounds;
    const bounds = this._bounds;
    bounds.clear();
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];
      const action = instruction.action;
      if (action === "fill") {
        const data = instruction.data;
        bounds.addBounds(data.path.bounds);
      } else if (action === "texture") {
        const data = instruction.data;
        bounds.addFrame(data.dx, data.dy, data.dx + data.dw, data.dy + data.dh, data.transform);
      }
      if (action === "stroke") {
        const data = instruction.data;
        const padding = data.style.width / 2;
        const _bounds = data.path.bounds;
        bounds.addFrame(
          _bounds.minX - padding,
          _bounds.minY - padding,
          _bounds.maxX + padding,
          _bounds.maxY + padding
        );
      }
    }
    return bounds;
  }
  /**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */
  containsPoint(point) {
    var _a;
    if (!this.bounds.containsPoint(point.x, point.y))
      return false;
    const instructions = this.instructions;
    let hasHit = false;
    for (let k = 0; k < instructions.length; k++) {
      const instruction = instructions[k];
      const data = instruction.data;
      const path2 = data.path;
      if (!instruction.action || !path2)
        continue;
      const style = data.style;
      const shapes = path2.shapePath.shapePrimitives;
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i].shape;
        if (!style || !shape)
          continue;
        const transform2 = shapes[i].transform;
        const transformedPoint = transform2 ? transform2.applyInverse(point, tmpPoint) : point;
        if (instruction.action === "fill") {
          hasHit = shape.contains(transformedPoint.x, transformedPoint.y);
        } else {
          hasHit = shape.strokeContains(transformedPoint.x, transformedPoint.y, style.width);
        }
        const holes = data.hole;
        if (holes) {
          const holeShapes = (_a = holes.shapePath) == null ? void 0 : _a.shapePrimitives;
          if (holeShapes) {
            for (let j = 0; j < holeShapes.length; j++) {
              if (holeShapes[j].shape.contains(transformedPoint.x, transformedPoint.y)) {
                hasHit = false;
              }
            }
          }
        }
        if (hasHit) {
          return true;
        }
      }
    }
    return hasHit;
  }
  /**
   * Destroys the GraphicsData object.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
   * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
   */
  destroy(options = false) {
    this._stateStack.length = 0;
    this._transform = null;
    this.emit("destroy", this);
    this.removeAllListeners();
    const destroyTexture = typeof options === "boolean" ? options : options == null ? void 0 : options.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options == null ? void 0 : options.textureSource;
      if (this._fillStyle.texture) {
        this._fillStyle.texture.destroy(destroyTextureSource);
      }
      if (this._strokeStyle.texture) {
        this._strokeStyle.texture.destroy(destroyTextureSource);
      }
    }
    this._fillStyle = null;
    this._strokeStyle = null;
    this.instructions = null;
    this._activePath = null;
    this._bounds = null;
    this._stateStack = null;
    this.customShader = null;
    this._transform = null;
  }
};
_GraphicsContext.defaultFillStyle = {
  /** The color to use for the fill. */
  color: 16777215,
  /** The alpha value to use for the fill. */
  alpha: 1,
  /** The texture to use for the fill. */
  texture: Texture.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
_GraphicsContext.defaultStrokeStyle = {
  /** The width of the stroke. */
  width: 1,
  /** The color to use for the stroke. */
  color: 16777215,
  /** The alpha value to use for the stroke. */
  alpha: 1,
  /** The alignment of the stroke. */
  alignment: 0.5,
  /** The miter limit to use. */
  miterLimit: 10,
  /** The line cap style to use. */
  cap: "butt",
  /** The line join style to use. */
  join: "miter",
  /** The texture to use for the fill. */
  texture: Texture.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
var GraphicsContext = _GraphicsContext;

// node_modules/pixi.js/lib/scene/text/utils/generateTextStyleKey.mjs
var valuesToIterateForKeys = [
  "align",
  "breakWords",
  "cssOverrides",
  "fontVariant",
  "fontWeight",
  "leading",
  "letterSpacing",
  "lineHeight",
  "padding",
  "textBaseline",
  "trim",
  "whiteSpace",
  "wordWrap",
  "wordWrapWidth",
  "fontFamily",
  "fontStyle",
  "fontSize"
];
function generateTextStyleKey(style) {
  const key = [];
  let index = 0;
  for (let i = 0; i < valuesToIterateForKeys.length; i++) {
    const prop = `_${valuesToIterateForKeys[i]}`;
    key[index++] = style[prop];
  }
  index = addFillStyleKey(style._fill, key, index);
  index = addStokeStyleKey(style._stroke, key, index);
  index = addDropShadowKey(style.dropShadow, key, index);
  return key.join("-");
}
function addFillStyleKey(fillStyle, key, index) {
  var _a;
  if (!fillStyle)
    return index;
  key[index++] = fillStyle.color;
  key[index++] = fillStyle.alpha;
  key[index++] = (_a = fillStyle.fill) == null ? void 0 : _a.styleKey;
  return index;
}
function addStokeStyleKey(strokeStyle, key, index) {
  if (!strokeStyle)
    return index;
  index = addFillStyleKey(strokeStyle, key, index);
  key[index++] = strokeStyle.width;
  key[index++] = strokeStyle.alignment;
  key[index++] = strokeStyle.cap;
  key[index++] = strokeStyle.join;
  key[index++] = strokeStyle.miterLimit;
  return index;
}
function addDropShadowKey(dropShadow, key, index) {
  if (!dropShadow)
    return index;
  key[index++] = dropShadow.alpha;
  key[index++] = dropShadow.angle;
  key[index++] = dropShadow.blur;
  key[index++] = dropShadow.distance;
  key[index++] = Color.shared.setValue(dropShadow.color).toNumber();
  return index;
}

// node_modules/pixi.js/lib/scene/text/TextStyle.mjs
var _TextStyle = class _TextStyle2 extends eventemitter3_default {
  constructor(style = {}) {
    super();
    convertV7Tov8Style(style);
    const fullStyle = { ..._TextStyle2.defaultTextStyle, ...style };
    for (const key in fullStyle) {
      const thisKey = key;
      this[thisKey] = fullStyle[key];
    }
    this.update();
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   * @member {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(value) {
    this._align = value;
    this.update();
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(value) {
    this._breakWords = value;
    this.update();
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(value) {
    if (value !== null && typeof value === "object") {
      this._dropShadow = this._createProxy({ ..._TextStyle2.defaultDropShadow, ...value });
    } else {
      this._dropShadow = value ? this._createProxy({ ..._TextStyle2.defaultDropShadow }) : null;
    }
    this.update();
  }
  /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(value) {
    this._fontFamily = value;
    this.update();
  }
  /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value) {
    if (typeof value === "string") {
      this._fontSize = parseInt(value, 10);
    } else {
      this._fontSize = value;
    }
    this.update();
  }
  /**
   * The font style.
   * @member {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(value) {
    this._fontStyle = value.toLowerCase();
    this.update();
  }
  /**
   * The font variant.
   * @member {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(value) {
    this._fontVariant = value;
    this.update();
  }
  /**
   * The font weight.
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(value) {
    this._fontWeight = value;
    this.update();
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(value) {
    this._leading = value;
    this.update();
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(value) {
    this._letterSpacing = value;
    this.update();
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(value) {
    this._lineHeight = value;
    this.update();
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(value) {
    this._padding = value;
    this.update();
  }
  /** Trim transparent borders. This is an expensive operation so only use this if you have to! */
  get trim() {
    return this._trim;
  }
  set trim(value) {
    this._trim = value;
    this.update();
  }
  /**
   * The baseline of the text that is rendered.
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(value) {
    this._textBaseline = value;
    this.update();
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   * @member {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(value) {
    this._whiteSpace = value;
    this.update();
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(value) {
    this._wordWrap = value;
    this.update();
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(value) {
    this._wordWrapWidth = value;
    this.update();
  }
  /** A fillstyle that will be used on the text e.g., 'red', '#00FF00'. */
  get fill() {
    return this._originalFill;
  }
  set fill(value) {
    if (value === this._originalFill)
      return;
    this._originalFill = value;
    if (this._isFillStyle(value)) {
      this._originalFill = this._createProxy({ ...GraphicsContext.defaultFillStyle, ...value }, () => {
        this._fill = toFillStyle(
          { ...this._originalFill },
          GraphicsContext.defaultFillStyle
        );
      });
    }
    this._fill = toFillStyle(
      value === 0 ? "black" : value,
      GraphicsContext.defaultFillStyle
    );
    this.update();
  }
  /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
  get stroke() {
    return this._originalStroke;
  }
  set stroke(value) {
    if (value === this._originalStroke)
      return;
    this._originalStroke = value;
    if (this._isFillStyle(value)) {
      this._originalStroke = this._createProxy({ ...GraphicsContext.defaultStrokeStyle, ...value }, () => {
        this._stroke = toStrokeStyle(
          { ...this._originalStroke },
          GraphicsContext.defaultStrokeStyle
        );
      });
    }
    this._stroke = toStrokeStyle(value, GraphicsContext.defaultStrokeStyle);
    this.update();
  }
  _generateKey() {
    this._styleKey = generateTextStyleKey(this);
    return this._styleKey;
  }
  update() {
    this._styleKey = null;
    this.emit("update", this);
  }
  /** Resets all properties to the default values */
  reset() {
    const defaultStyle = _TextStyle2.defaultTextStyle;
    for (const key in defaultStyle) {
      this[key] = defaultStyle[key];
    }
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * @returns New cloned TextStyle object
   */
  clone() {
    return new _TextStyle2({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this._dropShadow ? { ...this._dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      textBaseline: this.textBaseline,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth
    });
  }
  /**
   * Destroys this text style.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the texture of the this style
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the this style
   */
  destroy(options = false) {
    var _a, _b, _c, _d;
    this.removeAllListeners();
    const destroyTexture = typeof options === "boolean" ? options : options == null ? void 0 : options.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options == null ? void 0 : options.textureSource;
      if ((_a = this._fill) == null ? void 0 : _a.texture) {
        this._fill.texture.destroy(destroyTextureSource);
      }
      if ((_b = this._originalFill) == null ? void 0 : _b.texture) {
        this._originalFill.texture.destroy(destroyTextureSource);
      }
      if ((_c = this._stroke) == null ? void 0 : _c.texture) {
        this._stroke.texture.destroy(destroyTextureSource);
      }
      if ((_d = this._originalStroke) == null ? void 0 : _d.texture) {
        this._originalStroke.texture.destroy(destroyTextureSource);
      }
    }
    this._fill = null;
    this._stroke = null;
    this.dropShadow = null;
    this._originalStroke = null;
    this._originalFill = null;
  }
  _createProxy(value, cb) {
    return new Proxy(value, {
      set: (target, property, newValue) => {
        target[property] = newValue;
        cb == null ? void 0 : cb(property, newValue);
        this.update();
        return true;
      }
    });
  }
  _isFillStyle(value) {
    return (value ?? null) !== null && !(Color.isColorLike(value) || value instanceof FillGradient || value instanceof FillPattern);
  }
};
_TextStyle.defaultDropShadow = {
  /** Set alpha for the drop shadow */
  alpha: 1,
  /** Set a angle of the drop shadow */
  angle: Math.PI / 6,
  /** Set a shadow blur radius */
  blur: 0,
  /** A fill style to be used on the  e.g., 'red', '#00FF00' */
  color: "black",
  /** Set a distance of the drop shadow */
  distance: 5
};
_TextStyle.defaultTextStyle = {
  /**
   * See {@link TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */
  align: "left",
  /** See {@link TextStyle.breakWords} */
  breakWords: false,
  /** See {@link TextStyle.dropShadow} */
  dropShadow: null,
  /**
   * See {@link TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  fill: "black",
  /**
   * See {@link TextStyle.fontFamily}
   * @type {string|string[]}
   */
  fontFamily: "Arial",
  /**
   * See {@link TextStyle.fontSize}
   * @type {number|string}
   */
  fontSize: 26,
  /**
   * See {@link TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */
  fontStyle: "normal",
  /**
   * See {@link TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */
  fontVariant: "normal",
  /**
   * See {@link TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  fontWeight: "normal",
  /** See {@link TextStyle.leading} */
  leading: 0,
  /** See {@link TextStyle.letterSpacing} */
  letterSpacing: 0,
  /** See {@link TextStyle.lineHeight} */
  lineHeight: 0,
  /** See {@link TextStyle.padding} */
  padding: 0,
  /**
   * See {@link TextStyle.stroke}
   * @type {string|number}
   */
  stroke: null,
  /**
   * See {@link TextStyle.textBaseline}
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  textBaseline: "alphabetic",
  /** See {@link TextStyle.trim} */
  trim: false,
  /**
   * See {@link TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */
  whiteSpace: "pre",
  /** See {@link TextStyle.wordWrap} */
  wordWrap: false,
  /** See {@link TextStyle.wordWrapWidth} */
  wordWrapWidth: 100
};
var TextStyle = _TextStyle;
function convertV7Tov8Style(style) {
  const oldStyle = style;
  if (typeof oldStyle.dropShadow === "boolean" && oldStyle.dropShadow) {
    const defaults = TextStyle.defaultDropShadow;
    style.dropShadow = {
      alpha: oldStyle.dropShadowAlpha ?? defaults.alpha,
      angle: oldStyle.dropShadowAngle ?? defaults.angle,
      blur: oldStyle.dropShadowBlur ?? defaults.blur,
      color: oldStyle.dropShadowColor ?? defaults.color,
      distance: oldStyle.dropShadowDistance ?? defaults.distance
    };
  }
  if (oldStyle.strokeThickness !== void 0) {
    deprecation(v8_0_0, "strokeThickness is now a part of stroke");
    const color = oldStyle.stroke;
    let obj = {};
    if (Color.isColorLike(color)) {
      obj.color = color;
    } else if (color instanceof FillGradient || color instanceof FillPattern) {
      obj.fill = color;
    } else if (Object.hasOwnProperty.call(color, "color") || Object.hasOwnProperty.call(color, "fill")) {
      obj = color;
    } else {
      throw new Error("Invalid stroke value.");
    }
    style.stroke = {
      ...obj,
      width: oldStyle.strokeThickness
    };
  }
  if (Array.isArray(oldStyle.fillGradientStops)) {
    deprecation(v8_0_0, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    let fontSize;
    if (style.fontSize == null) {
      style.fontSize = TextStyle.defaultTextStyle.fontSize;
    } else if (typeof style.fontSize === "string") {
      fontSize = parseInt(style.fontSize, 10);
    } else {
      fontSize = style.fontSize;
    }
    const gradientFill = new FillGradient(0, 0, 0, fontSize * 1.7);
    const fills = oldStyle.fillGradientStops.map((color) => Color.shared.setValue(color).toNumber());
    fills.forEach((number, index) => {
      const ratio = index / (fills.length - 1);
      gradientFill.addColorStop(ratio, number);
    });
    style.fill = {
      fill: gradientFill
    };
  }
}

// node_modules/pixi.js/lib/scene/text/utils/getPo2TextureFromSource.mjs
var tempBounds2 = new Bounds();
function getPo2TextureFromSource(image, width, height, resolution) {
  const bounds = tempBounds2;
  bounds.minX = 0;
  bounds.minY = 0;
  bounds.maxX = image.width / resolution | 0;
  bounds.maxY = image.height / resolution | 0;
  const texture = TexturePool.getOptimalTexture(
    bounds.width,
    bounds.height,
    resolution,
    false
  );
  texture.source.uploadMethodId = "image";
  texture.source.resource = image;
  texture.source.alphaMode = "premultiply-alpha-on-upload";
  texture.frame.width = width / resolution;
  texture.frame.height = height / resolution;
  texture.source.emit("update", texture.source);
  texture.updateUvs();
  return texture;
}

// node_modules/pixi.js/lib/scene/text/canvas/utils/fontStringFromTextStyle.mjs
var genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function fontStringFromTextStyle(style) {
  const fontSizeString = typeof style.fontSize === "number" ? `${style.fontSize}px` : style.fontSize;
  let fontFamilies = style.fontFamily;
  if (!Array.isArray(style.fontFamily)) {
    fontFamilies = style.fontFamily.split(",");
  }
  for (let i = fontFamilies.length - 1; i >= 0; i--) {
    let fontFamily = fontFamilies[i].trim();
    if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && !genericFontFamilies.includes(fontFamily)) {
      fontFamily = `"${fontFamily}"`;
    }
    fontFamilies[i] = fontFamily;
  }
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
}

// node_modules/pixi.js/lib/scene/text/canvas/CanvasTextMetrics.mjs
var contextSettings = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: true
};
var _CanvasTextMetrics = class _CanvasTextMetrics2 {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let result = _CanvasTextMetrics2._experimentalLetterSpacingSupported;
    if (result !== void 0) {
      const proto = DOMAdapter.get().getCanvasRenderingContext2D().prototype;
      result = _CanvasTextMetrics2._experimentalLetterSpacingSupported = "letterSpacing" in proto || "textLetterSpacing" in proto;
    }
    return result;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
    this.text = text;
    this.style = style;
    this.width = width;
    this.height = height;
    this.lines = lines;
    this.lineWidths = lineWidths;
    this.lineHeight = lineHeight;
    this.maxLineWidth = maxLineWidth;
    this.fontProperties = fontProperties;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(text = " ", style, canvas = _CanvasTextMetrics2._canvas, wordWrap = style.wordWrap) {
    var _a;
    const textKey = `${text}:${style.styleKey}`;
    if (_CanvasTextMetrics2._measurementCache[textKey])
      return _CanvasTextMetrics2._measurementCache[textKey];
    const font = fontStringFromTextStyle(style);
    const fontProperties = _CanvasTextMetrics2.measureFont(font);
    if (fontProperties.fontSize === 0) {
      fontProperties.fontSize = style.fontSize;
      fontProperties.ascent = style.fontSize;
    }
    const context = _CanvasTextMetrics2.__context;
    context.font = font;
    const outputText = wordWrap ? _CanvasTextMetrics2._wordWrap(text, style, canvas) : text;
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    const lineWidths = new Array(lines.length);
    let maxLineWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = _CanvasTextMetrics2._measureText(lines[i], style.letterSpacing, context);
      lineWidths[i] = lineWidth;
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    const strokeWidth = ((_a = style._stroke) == null ? void 0 : _a.width) || 0;
    let width = maxLineWidth + strokeWidth;
    if (style.dropShadow) {
      width += style.dropShadow.distance;
    }
    const lineHeight = style.lineHeight || fontProperties.fontSize;
    let height = Math.max(lineHeight, fontProperties.fontSize + strokeWidth) + (lines.length - 1) * (lineHeight + style.leading);
    if (style.dropShadow) {
      height += style.dropShadow.distance;
    }
    const measurements = new _CanvasTextMetrics2(
      text,
      style,
      width,
      height,
      lines,
      lineWidths,
      lineHeight + style.leading,
      maxLineWidth,
      fontProperties
    );
    return measurements;
  }
  static _measureText(text, letterSpacing, context) {
    let useExperimentalLetterSpacing = false;
    if (_CanvasTextMetrics2.experimentalLetterSpacingSupported) {
      if (_CanvasTextMetrics2.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    const metrics = context.measureText(text);
    let metricWidth = metrics.width;
    const actualBoundingBoxLeft = -metrics.actualBoundingBoxLeft;
    const actualBoundingBoxRight = metrics.actualBoundingBoxRight;
    let boundsWidth = actualBoundingBoxRight - actualBoundingBoxLeft;
    if (metricWidth > 0) {
      if (useExperimentalLetterSpacing) {
        metricWidth -= letterSpacing;
        boundsWidth -= letterSpacing;
      } else {
        const val = (_CanvasTextMetrics2.graphemeSegmenter(text).length - 1) * letterSpacing;
        metricWidth += val;
        boundsWidth += val;
      }
    }
    return Math.max(metricWidth, boundsWidth);
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(text, style, canvas = _CanvasTextMetrics2._canvas) {
    const context = canvas.getContext("2d", contextSettings);
    let width = 0;
    let line = "";
    let lines = "";
    const cache = /* @__PURE__ */ Object.create(null);
    const { letterSpacing, whiteSpace } = style;
    const collapseSpaces = _CanvasTextMetrics2._collapseSpaces(whiteSpace);
    const collapseNewlines = _CanvasTextMetrics2._collapseNewlines(whiteSpace);
    let canPrependSpaces = !collapseSpaces;
    const wordWrapWidth = style.wordWrapWidth + letterSpacing;
    const tokens = _CanvasTextMetrics2._tokenize(text);
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (_CanvasTextMetrics2._isNewline(token)) {
        if (!collapseNewlines) {
          lines += _CanvasTextMetrics2._addLine(line);
          canPrependSpaces = !collapseSpaces;
          line = "";
          width = 0;
          continue;
        }
        token = " ";
      }
      if (collapseSpaces) {
        const currIsBreakingSpace = _CanvasTextMetrics2.isBreakingSpace(token);
        const lastIsBreakingSpace = _CanvasTextMetrics2.isBreakingSpace(line[line.length - 1]);
        if (currIsBreakingSpace && lastIsBreakingSpace) {
          continue;
        }
      }
      const tokenWidth = _CanvasTextMetrics2._getFromCache(token, letterSpacing, cache, context);
      if (tokenWidth > wordWrapWidth) {
        if (line !== "") {
          lines += _CanvasTextMetrics2._addLine(line);
          line = "";
          width = 0;
        }
        if (_CanvasTextMetrics2.canBreakWords(token, style.breakWords)) {
          const characters = _CanvasTextMetrics2.wordWrapSplit(token);
          for (let j = 0; j < characters.length; j++) {
            let char = characters[j];
            let lastChar = char;
            let k = 1;
            while (characters[j + k]) {
              const nextChar = characters[j + k];
              if (!_CanvasTextMetrics2.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                char += nextChar;
              } else {
                break;
              }
              lastChar = nextChar;
              k++;
            }
            j += k - 1;
            const characterWidth = _CanvasTextMetrics2._getFromCache(char, letterSpacing, cache, context);
            if (characterWidth + width > wordWrapWidth) {
              lines += _CanvasTextMetrics2._addLine(line);
              canPrependSpaces = false;
              line = "";
              width = 0;
            }
            line += char;
            width += characterWidth;
          }
        } else {
          if (line.length > 0) {
            lines += _CanvasTextMetrics2._addLine(line);
            line = "";
            width = 0;
          }
          const isLastToken = i === tokens.length - 1;
          lines += _CanvasTextMetrics2._addLine(token, !isLastToken);
          canPrependSpaces = false;
          line = "";
          width = 0;
        }
      } else {
        if (tokenWidth + width > wordWrapWidth) {
          canPrependSpaces = false;
          lines += _CanvasTextMetrics2._addLine(line);
          line = "";
          width = 0;
        }
        if (line.length > 0 || !_CanvasTextMetrics2.isBreakingSpace(token) || canPrependSpaces) {
          line += token;
          width += tokenWidth;
        }
      }
    }
    lines += _CanvasTextMetrics2._addLine(line, false);
    return lines;
  }
  /**
   * Convenience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static _addLine(line, newLine = true) {
    line = _CanvasTextMetrics2._trimRight(line);
    line = newLine ? `${line}
` : line;
    return line;
  }
  /**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */
  static _getFromCache(key, letterSpacing, cache, context) {
    let width = cache[key];
    if (typeof width !== "number") {
      width = _CanvasTextMetrics2._measureText(key, letterSpacing, context) + letterSpacing;
      cache[key] = width;
    }
    return width;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static _collapseSpaces(whiteSpace) {
    return whiteSpace === "normal" || whiteSpace === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static _collapseNewlines(whiteSpace) {
    return whiteSpace === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static _trimRight(text) {
    if (typeof text !== "string") {
      return "";
    }
    for (let i = text.length - 1; i >= 0; i--) {
      const char = text[i];
      if (!_CanvasTextMetrics2.isBreakingSpace(char)) {
        break;
      }
      text = text.slice(0, -1);
    }
    return text;
  }
  /**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */
  static _isNewline(char) {
    if (typeof char !== "string") {
      return false;
    }
    return _CanvasTextMetrics2._newlines.includes(char.charCodeAt(0));
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(char, _nextChar) {
    if (typeof char !== "string") {
      return false;
    }
    return _CanvasTextMetrics2._breakingSpaces.includes(char.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static _tokenize(text) {
    const tokens = [];
    let token = "";
    if (typeof text !== "string") {
      return tokens;
    }
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (_CanvasTextMetrics2.isBreakingSpace(char, nextChar) || _CanvasTextMetrics2._isNewline(char)) {
        if (token !== "") {
          tokens.push(token);
          token = "";
        }
        tokens.push(char);
        continue;
      }
      token += char;
    }
    if (token !== "") {
      tokens.push(token);
    }
    return tokens;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(_token, breakWords) {
    return breakWords;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
    return true;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(token) {
    return _CanvasTextMetrics2.graphemeSegmenter(token);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(font) {
    if (_CanvasTextMetrics2._fonts[font]) {
      return _CanvasTextMetrics2._fonts[font];
    }
    const context = _CanvasTextMetrics2._context;
    context.font = font;
    const metrics = context.measureText(_CanvasTextMetrics2.METRICS_STRING + _CanvasTextMetrics2.BASELINE_SYMBOL);
    const properties = {
      ascent: metrics.actualBoundingBoxAscent,
      descent: metrics.actualBoundingBoxDescent,
      fontSize: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    };
    _CanvasTextMetrics2._fonts[font] = properties;
    return properties;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(font = "") {
    if (font) {
      delete _CanvasTextMetrics2._fonts[font];
    } else {
      _CanvasTextMetrics2._fonts = {};
    }
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!_CanvasTextMetrics2.__canvas) {
      let canvas;
      try {
        const c = new OffscreenCanvas(0, 0);
        const context = c.getContext("2d", contextSettings);
        if (context == null ? void 0 : context.measureText) {
          _CanvasTextMetrics2.__canvas = c;
          return c;
        }
        canvas = DOMAdapter.get().createCanvas();
      } catch (ex) {
        canvas = DOMAdapter.get().createCanvas();
      }
      canvas.width = canvas.height = 10;
      _CanvasTextMetrics2.__canvas = canvas;
    }
    return _CanvasTextMetrics2.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    if (!_CanvasTextMetrics2.__context) {
      _CanvasTextMetrics2.__context = _CanvasTextMetrics2._canvas.getContext("2d", contextSettings);
    }
    return _CanvasTextMetrics2.__context;
  }
};
_CanvasTextMetrics.METRICS_STRING = "|ÉqÅ";
_CanvasTextMetrics.BASELINE_SYMBOL = "M";
_CanvasTextMetrics.BASELINE_MULTIPLIER = 1.4;
_CanvasTextMetrics.HEIGHT_MULTIPLIER = 2;
_CanvasTextMetrics.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) === "function") {
    const segmenter = new Intl.Segmenter();
    return (s) => [...segmenter.segment(s)].map((x) => x.segment);
  }
  return (s) => [...s];
})();
_CanvasTextMetrics.experimentalLetterSpacing = false;
_CanvasTextMetrics._fonts = {};
_CanvasTextMetrics._newlines = [
  10,
  // line feed
  13
  // carriage return
];
_CanvasTextMetrics._breakingSpaces = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
];
_CanvasTextMetrics._measurementCache = {};
var CanvasTextMetrics = _CanvasTextMetrics;

// node_modules/pixi.js/lib/scene/text/canvas/utils/getCanvasFillStyle.mjs
function getCanvasFillStyle(fillStyle, context) {
  if (fillStyle.texture === Texture.WHITE && !fillStyle.fill) {
    return Color.shared.setValue(fillStyle.color).setAlpha(fillStyle.alpha ?? 1).toHexa();
  } else if (!fillStyle.fill) {
    const pattern = context.createPattern(fillStyle.texture.source.resource, "repeat");
    const tempMatrix3 = fillStyle.matrix.copyTo(Matrix.shared);
    tempMatrix3.scale(fillStyle.texture.frame.width, fillStyle.texture.frame.height);
    pattern.setTransform(tempMatrix3);
    return pattern;
  } else if (fillStyle.fill instanceof FillPattern) {
    const fillPattern = fillStyle.fill;
    const pattern = context.createPattern(fillPattern.texture.source.resource, "repeat");
    const tempMatrix3 = fillPattern.transform.copyTo(Matrix.shared);
    tempMatrix3.scale(
      fillPattern.texture.frame.width,
      fillPattern.texture.frame.height
    );
    pattern.setTransform(tempMatrix3);
    return pattern;
  } else if (fillStyle.fill instanceof FillGradient) {
    const fillGradient = fillStyle.fill;
    if (fillGradient.type === "linear") {
      const gradient = context.createLinearGradient(
        fillGradient.x0,
        fillGradient.y0,
        fillGradient.x1,
        fillGradient.y1
      );
      fillGradient.gradientStops.forEach((stop) => {
        gradient.addColorStop(stop.offset, Color.shared.setValue(stop.color).toHex());
      });
      return gradient;
    }
  }
  warn("FillStyle not recognised", fillStyle);
  return "red";
}

// node_modules/pixi.js/lib/scene/text/canvas/CanvasTextSystem.mjs
var CanvasTextSystem = class {
  constructor(_renderer) {
    this._activeTextures = {};
    this._renderer = _renderer;
  }
  getTextureSize(text, resolution, style) {
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    let width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    let height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    width = Math.ceil(width - 1e-6);
    height = Math.ceil(height - 1e-6);
    width = nextPow2(width);
    height = nextPow2(height);
    return { width, height };
  }
  getTexture(options, resolution, style, _textKey) {
    if (typeof options === "string") {
      deprecation("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments");
      options = {
        text: options,
        style,
        resolution
      };
    }
    if (!(options.style instanceof TextStyle)) {
      options.style = new TextStyle(options.style);
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(
      options
    );
    this._renderer.texture.initSource(texture._source);
    CanvasPool.returnCanvasAndContext(canvasAndContext);
    return texture;
  }
  createTextureAndCanvas(options) {
    const { text, style } = options;
    const resolution = options.resolution ?? this._renderer.resolution;
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(width, height);
    const { canvas } = canvasAndContext;
    this.renderTextToCanvas(text, style, resolution, canvasAndContext);
    const texture = getPo2TextureFromSource(canvas, width, height, resolution);
    if (style.trim) {
      const trimmed = getCanvasBoundingBox(canvas, resolution);
      texture.frame.copyFrom(trimmed);
      texture.updateUvs();
    }
    return { texture, canvasAndContext };
  }
  getManagedTexture(text) {
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    const textKey = text._getKey();
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].texture;
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(text);
    this._activeTextures[textKey] = {
      canvasAndContext,
      texture,
      usageCount: 1
    };
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      CanvasPool.returnCanvasAndContext(activeTexture.canvasAndContext);
      TexturePool.returnTexture(activeTexture.texture);
      const source = activeTexture.texture.source;
      source.resource = null;
      source.uploadMethodId = "unknown";
      source.alphaMode = "no-premultiply-alpha";
      this._activeTextures[textKey] = null;
    }
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(text, style, resolution, canvasAndContext) {
    var _a, _b, _c, _d;
    const { canvas, context } = canvasAndContext;
    const font = fontStringFromTextStyle(style);
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    const lines = measured.lines;
    const lineHeight = measured.lineHeight;
    const lineWidths = measured.lineWidths;
    const maxLineWidth = measured.maxLineWidth;
    const fontProperties = measured.fontProperties;
    const height = canvas.height;
    context.resetTransform();
    context.scale(resolution, resolution);
    context.textBaseline = style.textBaseline;
    if ((_a = style._stroke) == null ? void 0 : _a.width) {
      const strokeStyle = style._stroke;
      context.lineWidth = strokeStyle.width;
      context.miterLimit = strokeStyle.miterLimit;
      context.lineJoin = strokeStyle.join;
      context.lineCap = strokeStyle.cap;
    }
    context.font = font;
    let linePositionX;
    let linePositionY;
    const passesCount = style.dropShadow ? 2 : 1;
    for (let i = 0; i < passesCount; ++i) {
      const isShadowPass = style.dropShadow && i === 0;
      const dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0;
      const dsOffsetShadow = dsOffsetText * resolution;
      if (isShadowPass) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        const shadowOptions = style.dropShadow;
        const dropShadowColor = shadowOptions.color;
        const dropShadowAlpha = shadowOptions.alpha;
        context.shadowColor = Color.shared.setValue(dropShadowColor).setAlpha(dropShadowAlpha).toRgbaString();
        const dropShadowBlur = shadowOptions.blur * resolution;
        const dropShadowDistance = shadowOptions.distance * resolution;
        context.shadowBlur = dropShadowBlur;
        context.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
        context.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance + dsOffsetShadow;
      } else {
        context.fillStyle = style._fill ? getCanvasFillStyle(style._fill, context) : null;
        if ((_b = style._stroke) == null ? void 0 : _b.width) {
          context.strokeStyle = getCanvasFillStyle(style._stroke, context);
        }
        context.shadowColor = "black";
      }
      let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
      if (lineHeight - fontProperties.fontSize < 0) {
        linePositionYShift = 0;
      }
      const strokeWidth = ((_c = style._stroke) == null ? void 0 : _c.width) ?? 0;
      for (let i2 = 0; i2 < lines.length; i2++) {
        linePositionX = strokeWidth / 2;
        linePositionY = strokeWidth / 2 + i2 * lineHeight + fontProperties.ascent + linePositionYShift;
        if (style.align === "right") {
          linePositionX += maxLineWidth - lineWidths[i2];
        } else if (style.align === "center") {
          linePositionX += (maxLineWidth - lineWidths[i2]) / 2;
        }
        if ((_d = style._stroke) == null ? void 0 : _d.width) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText,
            true
          );
        }
        if (style._fill !== void 0) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText
          );
        }
      }
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(text, style, canvasAndContext, x, y, isStroke = false) {
    const { context } = canvasAndContext;
    const letterSpacing = style.letterSpacing;
    let useExperimentalLetterSpacing = false;
    if (CanvasTextMetrics.experimentalLetterSpacingSupported) {
      if (CanvasTextMetrics.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    if (letterSpacing === 0 || useExperimentalLetterSpacing) {
      if (isStroke) {
        context.strokeText(text, x, y);
      } else {
        context.fillText(text, x, y);
      }
      return;
    }
    let currentPosition = x;
    const stringArray = CanvasTextMetrics.graphemeSegmenter(text);
    let previousWidth = context.measureText(text).width;
    let currentWidth = 0;
    for (let i = 0; i < stringArray.length; ++i) {
      const currentChar = stringArray[i];
      if (isStroke) {
        context.strokeText(currentChar, currentPosition, y);
      } else {
        context.fillText(currentChar, currentPosition, y);
      }
      let textStr = "";
      for (let j = i + 1; j < stringArray.length; ++j) {
        textStr += stringArray[j];
      }
      currentWidth = context.measureText(textStr).width;
      currentPosition += previousWidth - currentWidth + letterSpacing;
      previousWidth = currentWidth;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
};
CanvasTextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "canvasText"
};

// node_modules/pixi.js/lib/scene/graphics/shared/Graphics.mjs
var Graphics = class _Graphics extends ViewContainer {
  /**
   * @param options - Options for the Graphics.
   */
  constructor(options) {
    if (options instanceof GraphicsContext) {
      options = { context: options };
    }
    const { context, roundPixels, ...rest } = options || {};
    super({
      label: "Graphics",
      ...rest
    });
    this.renderPipeId = "graphics";
    if (!context) {
      this._context = this._ownedContext = new GraphicsContext();
    } else {
      this._context = context;
    }
    this._context.on("update", this.onViewUpdate, this);
    this.allowChildren = false;
    this.roundPixels = roundPixels ?? false;
  }
  set context(context) {
    if (context === this._context)
      return;
    this._context.off("update", this.onViewUpdate, this);
    this._context = context;
    this._context.on("update", this.onViewUpdate, this);
    this.onViewUpdate();
  }
  get context() {
    return this._context;
  }
  /**
   * The local bounds of the graphic.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._context.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(bounds) {
    bounds.addBounds(this._context.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    return this._context.containsPoint(point);
  }
  /**
   * Destroys this graphics renderable and optionally its context.
   * @param options - Options parameter. A boolean will act as if all options
   *
   * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
   * then the context will still be destroyed.
   *
   * If you want to explicitly not destroy this context that this graphics created,
   * then you should pass destroy({ context: false })
   *
   * If the context was passed in as an argument to the constructor then it will not be destroyed
   * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
   * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
   * @param {boolean} [options.context=false] - Should destroy the context
   */
  destroy(options) {
    if (this._ownedContext && !options) {
      this._ownedContext.destroy(options);
    } else if (options === true || (options == null ? void 0 : options.context) === true) {
      this._context.destroy(options);
    }
    this._ownedContext = null;
    this._context = null;
    super.destroy(options);
  }
  _callContextMethod(method, args) {
    this.context[method](...args);
    return this;
  }
  // --------------------------------------- GraphicsContext methods ---------------------------------------
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param {FillInput} args - The fill style to apply. This can be a simple color, a gradient or
   * pattern object, or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(...args) {
    return this._callContextMethod("setFillStyle", args);
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param {StrokeInput} args - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   * or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(...args) {
    return this._callContextMethod("setStrokeStyle", args);
  }
  fill(...args) {
    return this._callContextMethod("fill", args);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyle parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param {FillStyle} args - (Optional) The stroke style to apply. Can be defined as a simple color or a more
   * complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(...args) {
    return this._callContextMethod("stroke", args);
  }
  texture(...args) {
    return this._callContextMethod("texture", args);
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   */
  cut() {
    return this._callContextMethod("cut", []);
  }
  arc(...args) {
    return this._callContextMethod("arc", args);
  }
  arcTo(...args) {
    return this._callContextMethod("arcTo", args);
  }
  arcToSvg(...args) {
    return this._callContextMethod("arcToSvg", args);
  }
  bezierCurveTo(...args) {
    return this._callContextMethod("bezierCurveTo", args);
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this._callContextMethod("closePath", []);
  }
  ellipse(...args) {
    return this._callContextMethod("ellipse", args);
  }
  circle(...args) {
    return this._callContextMethod("circle", args);
  }
  path(...args) {
    return this._callContextMethod("path", args);
  }
  lineTo(...args) {
    return this._callContextMethod("lineTo", args);
  }
  moveTo(...args) {
    return this._callContextMethod("moveTo", args);
  }
  quadraticCurveTo(...args) {
    return this._callContextMethod("quadraticCurveTo", args);
  }
  rect(...args) {
    return this._callContextMethod("rect", args);
  }
  roundRect(...args) {
    return this._callContextMethod("roundRect", args);
  }
  poly(...args) {
    return this._callContextMethod("poly", args);
  }
  regularPoly(...args) {
    return this._callContextMethod("regularPoly", args);
  }
  roundPoly(...args) {
    return this._callContextMethod("roundPoly", args);
  }
  roundShape(...args) {
    return this._callContextMethod("roundShape", args);
  }
  filletRect(...args) {
    return this._callContextMethod("filletRect", args);
  }
  chamferRect(...args) {
    return this._callContextMethod("chamferRect", args);
  }
  star(...args) {
    return this._callContextMethod("star", args);
  }
  svg(...args) {
    return this._callContextMethod("svg", args);
  }
  restore(...args) {
    return this._callContextMethod("restore", args);
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    return this._callContextMethod("save", []);
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this.context.getTransform();
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing
   * any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._callContextMethod("resetTransform", []);
  }
  rotateTransform(...args) {
    return this._callContextMethod("rotate", args);
  }
  scaleTransform(...args) {
    return this._callContextMethod("scale", args);
  }
  setTransform(...args) {
    return this._callContextMethod("setTransform", args);
  }
  transform(...args) {
    return this._callContextMethod("transform", args);
  }
  translateTransform(...args) {
    return this._callContextMethod("translate", args);
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this._callContextMethod("clear", []);
  }
  /**
   * The fill style to use.
   * @type {ConvertedFillStyle}
   */
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(value) {
    this._context.fillStyle = value;
  }
  /**
   * The stroke style to use.
   * @type {ConvertedStrokeStyle}
   */
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(value) {
    this._context.strokeStyle = value;
  }
  /**
   * Creates a new Graphics object.
   * Note that only the context of the object is cloned, not its transform (position,scale,etc)
   * @param deep - Whether to create a deep clone of the graphics object. If false, the context
   * will be shared between the two objects (default false). If true, the context will be
   * cloned (recommended if you need to modify the context in any way).
   * @returns - A clone of the graphics object
   */
  clone(deep = false) {
    if (deep) {
      return new _Graphics(this._context.clone());
    }
    this._ownedContext = null;
    const clone = new _Graphics(this._context);
    return clone;
  }
  // -------- v7 deprecations ---------
  /**
   * @param width
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
   */
  lineStyle(width, color, alpha) {
    deprecation(v8_0_0, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
    const strokeStyle = {};
    width && (strokeStyle.width = width);
    color && (strokeStyle.color = color);
    alpha && (strokeStyle.alpha = alpha);
    this.context.strokeStyle = strokeStyle;
    return this;
  }
  /**
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  beginFill(color, alpha) {
    deprecation(v8_0_0, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    const fillStyle = {};
    color && (fillStyle.color = color);
    alpha && (fillStyle.alpha = alpha);
    this.context.fillStyle = fillStyle;
    return this;
  }
  /**
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  endFill() {
    deprecation(v8_0_0, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    this.context.fill();
    const strokeStyle = this.context.strokeStyle;
    if (strokeStyle.width !== GraphicsContext.defaultStrokeStyle.width || strokeStyle.color !== GraphicsContext.defaultStrokeStyle.color || strokeStyle.alpha !== GraphicsContext.defaultStrokeStyle.alpha) {
      this.context.stroke();
    }
    return this;
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
   */
  drawCircle(...args) {
    deprecation(v8_0_0, "Graphics#drawCircle has been renamed to Graphics#circle");
    return this._callContextMethod("circle", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
   */
  drawEllipse(...args) {
    deprecation(v8_0_0, "Graphics#drawEllipse has been renamed to Graphics#ellipse");
    return this._callContextMethod("ellipse", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
   */
  drawPolygon(...args) {
    deprecation(v8_0_0, "Graphics#drawPolygon has been renamed to Graphics#poly");
    return this._callContextMethod("poly", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
   */
  drawRect(...args) {
    deprecation(v8_0_0, "Graphics#drawRect has been renamed to Graphics#rect");
    return this._callContextMethod("rect", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
   */
  drawRoundedRect(...args) {
    deprecation(v8_0_0, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect");
    return this._callContextMethod("roundRect", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#star} instead
   */
  drawStar(...args) {
    deprecation(v8_0_0, "Graphics#drawStar has been renamed to Graphics#star");
    return this._callContextMethod("star", args);
  }
};

// node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/localUniformMSDFBit.mjs
var localUniformMSDFBit = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
    )
  }
};
var localUniformMSDFBitGl = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
    )
  }
};

// node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/mSDFBit.mjs
var mSDFBit = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
    )
  }
};
var mSDFBitGl = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
    )
  }
};

// node_modules/pixi.js/lib/scene/text/sdfShader/SdfShader.mjs
var gpuProgram;
var glProgram;
var SdfShader = class extends Shader {
  constructor() {
    const uniforms = new UniformGroup({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    });
    const maxTextures = getMaxTexturesPerBatch();
    gpuProgram ?? (gpuProgram = compileHighShaderGpuProgram({
      name: "sdf-shader",
      bits: [
        colorBit,
        generateTextureBatchBit(maxTextures),
        localUniformMSDFBit,
        mSDFBit,
        roundPixelsBit
      ]
    }));
    glProgram ?? (glProgram = compileHighShaderGlProgram({
      name: "sdf-shader",
      bits: [
        colorBitGl,
        generateTextureBatchBitGl(maxTextures),
        localUniformMSDFBitGl,
        mSDFBitGl,
        roundPixelsBitGl
      ]
    }));
    super({
      glProgram,
      gpuProgram,
      resources: {
        localUniforms: uniforms,
        batchSamplers: getBatchSamplersUniformGroup(maxTextures)
      }
    });
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/AbstractBitmapFont.mjs
var AbstractBitmapFont = class extends eventemitter3_default {
  constructor() {
    super(...arguments);
    this.chars = /* @__PURE__ */ Object.create(null);
    this.lineHeight = 0;
    this.fontFamily = "";
    this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 };
    this.baseLineOffset = 0;
    this.distanceField = { type: "none", range: 0 };
    this.pages = [];
    this.applyFillAsTint = true;
    this.baseMeasurementFontSize = 100;
    this.baseRenderedFontSize = 100;
  }
  /**
   * The name of the font face.
   * @deprecated since 8.0.0 Use `fontFamily` instead.
   */
  get font() {
    deprecation(v8_0_0, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead.");
    return this.fontFamily;
  }
  /**
   * The map of base page textures (i.e., sheets of glyphs).
   * @deprecated since 8.0.0 Use `pages` instead.
   */
  get pageTextures() {
    deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
    return this.pages;
  }
  /**
   * The size of the font face in pixels.
   * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
   */
  get size() {
    deprecation(v8_0_0, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead.");
    return this.fontMetrics.fontSize;
  }
  /**
   * The kind of distance field for this font or "none".
   * @deprecated since 8.0.0 Use `distanceField.type` instead.
   */
  get distanceFieldRange() {
    deprecation(v8_0_0, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead.");
    return this.distanceField.range;
  }
  /**
   * The range of the distance field in pixels.
   * @deprecated since 8.0.0 Use `distanceField.range` instead.
   */
  get distanceFieldType() {
    deprecation(v8_0_0, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead.");
    return this.distanceField.type;
  }
  destroy(destroyTextures = false) {
    var _a;
    this.emit("destroy", this);
    this.removeAllListeners();
    for (const i in this.chars) {
      (_a = this.chars[i].texture) == null ? void 0 : _a.destroy();
    }
    this.chars = null;
    if (destroyTextures) {
      this.pages.forEach((page) => page.texture.destroy(true));
      this.pages = null;
    }
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/utils/resolveCharacters.mjs
function resolveCharacters(chars) {
  if (chars === "") {
    return [];
  }
  if (typeof chars === "string") {
    chars = [chars];
  }
  const result = [];
  for (let i = 0, j = chars.length; i < j; i++) {
    const item = chars[i];
    if (Array.isArray(item)) {
      if (item.length !== 2) {
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${item.length}.`);
      }
      if (item[0].length === 0 || item[1].length === 0) {
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      }
      const startCode = item[0].charCodeAt(0);
      const endCode = item[1].charCodeAt(0);
      if (endCode < startCode) {
        throw new Error("[BitmapFont]: Invalid character range.");
      }
      for (let i2 = startCode, j2 = endCode; i2 <= j2; i2++) {
        result.push(String.fromCharCode(i2));
      }
    } else {
      result.push(...Array.from(item));
    }
  }
  if (result.length === 0) {
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  }
  return result;
}

// node_modules/pixi.js/lib/scene/text-bitmap/DynamicBitmapFont.mjs
var _DynamicBitmapFont = class _DynamicBitmapFont2 extends AbstractBitmapFont {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(options) {
    super();
    this.resolution = 1;
    this.pages = [];
    this._padding = 0;
    this._measureCache = /* @__PURE__ */ Object.create(null);
    this._currentChars = [];
    this._currentX = 0;
    this._currentY = 0;
    this._currentPageIndex = -1;
    this._skipKerning = false;
    const dynamicOptions = { ..._DynamicBitmapFont2.defaultOptions, ...options };
    this._textureSize = dynamicOptions.textureSize;
    this._mipmap = dynamicOptions.mipmap;
    const style = dynamicOptions.style.clone();
    if (dynamicOptions.overrideFill) {
      style._fill.color = 16777215;
      style._fill.alpha = 1;
      style._fill.texture = Texture.WHITE;
      style._fill.fill = null;
    }
    this.applyFillAsTint = dynamicOptions.overrideFill;
    const requestedFontSize = style.fontSize;
    style.fontSize = this.baseMeasurementFontSize;
    const font = fontStringFromTextStyle(style);
    if (dynamicOptions.overrideSize) {
      if (style._stroke) {
        style._stroke.width *= this.baseRenderedFontSize / requestedFontSize;
      }
    } else {
      style.fontSize = this.baseRenderedFontSize = requestedFontSize;
    }
    this._style = style;
    this._skipKerning = dynamicOptions.skipKerning ?? false;
    this.resolution = dynamicOptions.resolution ?? 1;
    this._padding = dynamicOptions.padding ?? 4;
    this.fontMetrics = CanvasTextMetrics.measureFont(font);
    this.lineHeight = style.lineHeight || this.fontMetrics.fontSize || style.fontSize;
  }
  ensureCharacters(chars) {
    var _a, _b;
    const charList = resolveCharacters(chars).filter((char) => !this._currentChars.includes(char)).filter((char, index, self) => self.indexOf(char) === index);
    if (!charList.length)
      return;
    this._currentChars = [...this._currentChars, ...charList];
    let pageData;
    if (this._currentPageIndex === -1) {
      pageData = this._nextPage();
    } else {
      pageData = this.pages[this._currentPageIndex];
    }
    let { canvas, context } = pageData.canvasAndContext;
    let textureSource = pageData.texture.source;
    const style = this._style;
    let currentX = this._currentX;
    let currentY = this._currentY;
    const fontScale = this.baseRenderedFontSize / this.baseMeasurementFontSize;
    const padding = this._padding * fontScale;
    let maxCharHeight = 0;
    let skipTexture = false;
    for (let i = 0; i < charList.length; i++) {
      const char = charList[i];
      const metrics = CanvasTextMetrics.measureText(char, style, canvas, false);
      const textureGlyphWidth = Math.ceil((style.fontStyle === "italic" ? 2 : 1) * metrics.width);
      metrics.lineHeight = metrics.height;
      const width = metrics.width * fontScale;
      const height = metrics.height * fontScale;
      const paddedWidth = textureGlyphWidth + padding * 2;
      const paddedHeight = height + padding * 2;
      skipTexture = false;
      if (char !== "\n" && char !== "\r" && char !== "	" && char !== " ") {
        skipTexture = true;
        maxCharHeight = Math.ceil(Math.max(paddedHeight, maxCharHeight));
      }
      if (currentX + paddedWidth > this._textureSize) {
        currentY += maxCharHeight;
        maxCharHeight = paddedHeight;
        currentX = 0;
        if (currentY + maxCharHeight > this._textureSize) {
          textureSource.update();
          const pageData2 = this._nextPage();
          canvas = pageData2.canvasAndContext.canvas;
          context = pageData2.canvasAndContext.context;
          textureSource = pageData2.texture.source;
          currentY = 0;
        }
      }
      const xAdvance = width / fontScale - (((_a = style.dropShadow) == null ? void 0 : _a.distance) ?? 0) - (((_b = style._stroke) == null ? void 0 : _b.width) ?? 0);
      this.chars[char] = {
        id: char.codePointAt(0),
        xOffset: -this._padding,
        yOffset: -this._padding,
        xAdvance,
        kerning: {}
      };
      if (skipTexture) {
        this._drawGlyph(
          context,
          metrics,
          currentX + padding,
          currentY + padding,
          fontScale,
          style
        );
        const px = textureSource.width * fontScale;
        const py = textureSource.height * fontScale;
        const frame = new Rectangle(
          currentX / px * textureSource.width,
          currentY / py * textureSource.height,
          paddedWidth / px * textureSource.width,
          paddedHeight / py * textureSource.height
        );
        this.chars[char].texture = new Texture({
          source: textureSource,
          frame
        });
        currentX += Math.ceil(paddedWidth);
      }
    }
    textureSource.update();
    this._currentX = currentX;
    this._currentY = currentY;
    this._skipKerning && this._applyKerning(charList, context);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
    return this.pages;
  }
  _applyKerning(newChars, context) {
    const measureCache = this._measureCache;
    for (let i = 0; i < newChars.length; i++) {
      const first = newChars[i];
      for (let j = 0; j < this._currentChars.length; j++) {
        const second = this._currentChars[j];
        let c1 = measureCache[first];
        if (!c1)
          c1 = measureCache[first] = context.measureText(first).width;
        let c2 = measureCache[second];
        if (!c2)
          c2 = measureCache[second] = context.measureText(second).width;
        let total = context.measureText(first + second).width;
        let amount = total - (c1 + c2);
        if (amount) {
          this.chars[first].kerning[second] = amount;
        }
        total = context.measureText(first + second).width;
        amount = total - (c1 + c2);
        if (amount) {
          this.chars[second].kerning[first] = amount;
        }
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const textureResolution = this.resolution;
    const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
      this._textureSize,
      this._textureSize,
      textureResolution
    );
    this._setupContext(canvasAndContext.context, this._style, textureResolution);
    const resolution = textureResolution * (this.baseRenderedFontSize / this.baseMeasurementFontSize);
    const texture = new Texture({
      source: new ImageSource({
        resource: canvasAndContext.canvas,
        resolution,
        alphaMode: "premultiply-alpha-on-upload",
        autoGenerateMipmaps: this._mipmap
      })
    });
    const pageData = {
      canvasAndContext,
      texture
    };
    this.pages[this._currentPageIndex] = pageData;
    return pageData;
  }
  // canvas style!
  _setupContext(context, style, resolution) {
    style.fontSize = this.baseRenderedFontSize;
    context.scale(resolution, resolution);
    context.font = fontStringFromTextStyle(style);
    style.fontSize = this.baseMeasurementFontSize;
    context.textBaseline = style.textBaseline;
    const stroke = style._stroke;
    const strokeThickness = (stroke == null ? void 0 : stroke.width) ?? 0;
    if (stroke) {
      context.lineWidth = strokeThickness;
      context.lineJoin = stroke.join;
      context.miterLimit = stroke.miterLimit;
      context.strokeStyle = getCanvasFillStyle(stroke, context);
    }
    if (style._fill) {
      context.fillStyle = getCanvasFillStyle(style._fill, context);
    }
    if (style.dropShadow) {
      const shadowOptions = style.dropShadow;
      const rgb = Color.shared.setValue(shadowOptions.color).toArray();
      const dropShadowBlur = shadowOptions.blur * resolution;
      const dropShadowDistance = shadowOptions.distance * resolution;
      context.shadowColor = `rgba(${rgb[0] * 255},${rgb[1] * 255},${rgb[2] * 255},${shadowOptions.alpha})`;
      context.shadowBlur = dropShadowBlur;
      context.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
      context.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance;
    } else {
      context.shadowColor = "black";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
  }
  _drawGlyph(context, metrics, x, y, fontScale, style) {
    const char = metrics.text;
    const fontProperties = metrics.fontProperties;
    const stroke = style._stroke;
    const strokeThickness = ((stroke == null ? void 0 : stroke.width) ?? 0) * fontScale;
    const tx = x + strokeThickness / 2;
    const ty = y - strokeThickness / 2;
    const descent = fontProperties.descent * fontScale;
    const lineHeight = metrics.lineHeight * fontScale;
    if (style.stroke && strokeThickness) {
      context.strokeText(char, tx, ty + lineHeight - descent);
    }
    if (style._fill) {
      context.fillText(char, tx, ty + lineHeight - descent);
    }
  }
  destroy() {
    super.destroy();
    for (let i = 0; i < this.pages.length; i++) {
      const { canvasAndContext, texture } = this.pages[i];
      CanvasPool.returnCanvasAndContext(canvasAndContext);
      texture.destroy(true);
    }
    this.pages = null;
  }
};
_DynamicBitmapFont.defaultOptions = {
  textureSize: 512,
  style: new TextStyle(),
  mipmap: true
};
var DynamicBitmapFont = _DynamicBitmapFont;

// node_modules/pixi.js/lib/scene/text-bitmap/utils/getBitmapTextLayout.mjs
function getBitmapTextLayout(chars, style, font, trimEnd) {
  const layoutData = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: style.fontSize / font.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  layoutData.offsetY = font.baseLineOffset;
  let currentLine = layoutData.lines[0];
  let previousChar = null;
  let firstWord = true;
  const currentWord = {
    spaceWord: false,
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  };
  const nextWord = (word) => {
    const start = currentLine.width;
    for (let j = 0; j < currentWord.index; j++) {
      const position = word.positions[j];
      currentLine.chars.push(word.chars[j]);
      currentLine.charPositions.push(position + start);
    }
    currentLine.width += word.width;
    firstWord = false;
    currentWord.width = 0;
    currentWord.index = 0;
    currentWord.chars.length = 0;
  };
  const nextLine = () => {
    let index = currentLine.chars.length - 1;
    if (trimEnd) {
      let lastChar = currentLine.chars[index];
      while (lastChar === " ") {
        currentLine.width -= font.chars[lastChar].xAdvance;
        lastChar = currentLine.chars[--index];
      }
    }
    layoutData.width = Math.max(layoutData.width, currentLine.width);
    currentLine = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    };
    firstWord = true;
    layoutData.lines.push(currentLine);
    layoutData.height += font.lineHeight;
  };
  const scale = font.baseMeasurementFontSize / style.fontSize;
  const adjustedLetterSpacing = style.letterSpacing * scale;
  const adjustedWordWrapWidth = style.wordWrapWidth * scale;
  for (let i = 0; i < chars.length + 1; i++) {
    let char;
    const isEnd = i === chars.length;
    if (!isEnd) {
      char = chars[i];
    }
    const charData = font.chars[char] || font.chars[" "];
    const isSpace = /(?:\s)/.test(char);
    const isWordBreak = isSpace || char === "\r" || char === "\n" || isEnd;
    if (isWordBreak) {
      const addWordToNextLine = !firstWord && style.wordWrap && currentLine.width + currentWord.width - adjustedLetterSpacing > adjustedWordWrapWidth;
      if (addWordToNextLine) {
        nextLine();
        nextWord(currentWord);
        if (!isEnd) {
          currentLine.charPositions.push(0);
        }
      } else {
        currentWord.start = currentLine.width;
        nextWord(currentWord);
        if (!isEnd) {
          currentLine.charPositions.push(0);
        }
      }
      if (char === "\r" || char === "\n") {
        if (currentLine.width !== 0) {
          nextLine();
        }
      } else if (!isEnd) {
        const spaceWidth = charData.xAdvance + (charData.kerning[previousChar] || 0) + adjustedLetterSpacing;
        currentLine.width += spaceWidth;
        currentLine.spaceWidth = spaceWidth;
        currentLine.spacesIndex.push(currentLine.charPositions.length);
        currentLine.chars.push(char);
      }
    } else {
      const kerning = charData.kerning[previousChar] || 0;
      const nextCharWidth = charData.xAdvance + kerning + adjustedLetterSpacing;
      currentWord.positions[currentWord.index++] = currentWord.width + kerning;
      currentWord.chars.push(char);
      currentWord.width += nextCharWidth;
    }
    previousChar = char;
  }
  nextLine();
  if (style.align === "center") {
    alignCenter(layoutData);
  } else if (style.align === "right") {
    alignRight(layoutData);
  } else if (style.align === "justify") {
    alignJustify(layoutData);
  }
  return layoutData;
}
function alignCenter(measurementData) {
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    const offset = measurementData.width / 2 - line.width / 2;
    for (let j = 0; j < line.charPositions.length; j++) {
      line.charPositions[j] += offset;
    }
  }
}
function alignRight(measurementData) {
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    const offset = measurementData.width - line.width;
    for (let j = 0; j < line.charPositions.length; j++) {
      line.charPositions[j] += offset;
    }
  }
}
function alignJustify(measurementData) {
  const width = measurementData.width;
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    let indy = 0;
    let spaceIndex = line.spacesIndex[indy++];
    let offset = 0;
    const totalSpaces = line.spacesIndex.length;
    const newSpaceWidth = (width - line.width) / totalSpaces;
    const spaceWidth = newSpaceWidth;
    for (let j = 0; j < line.charPositions.length; j++) {
      if (j === spaceIndex) {
        spaceIndex = line.spacesIndex[indy++];
        offset += spaceWidth;
      }
      line.charPositions[j] += offset;
    }
  }
}

// node_modules/pixi.js/lib/scene/text-bitmap/BitmapFontManager.mjs
var fontCount = 0;
var BitmapFontManagerClass = class {
  constructor() {
    this.ALPHA = [["a", "z"], ["A", "Z"], " "];
    this.NUMERIC = [["0", "9"]];
    this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "];
    this.ASCII = [[" ", "~"]];
    this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: false
    };
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(text, style) {
    var _a;
    let fontFamilyKey = `${style.fontFamily}-bitmap`;
    let overrideFill = true;
    if (style._fill.fill && !style._stroke) {
      fontFamilyKey += style._fill.fill.styleKey;
      overrideFill = false;
    } else if (style._stroke || style.dropShadow) {
      let key = style.styleKey;
      key = key.substring(0, key.lastIndexOf("-"));
      fontFamilyKey = `${key}-bitmap`;
      overrideFill = false;
    }
    if (!Cache.has(fontFamilyKey)) {
      const fnt = new DynamicBitmapFont({
        style,
        overrideFill,
        overrideSize: true,
        ...this.defaultOptions
      });
      fontCount++;
      if (fontCount > 50) {
        warn("BitmapText", `You have dynamically created ${fontCount} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``);
      }
      fnt.once("destroy", () => {
        fontCount--;
        Cache.remove(fontFamilyKey);
      });
      Cache.set(
        fontFamilyKey,
        fnt
      );
    }
    const dynamicFont = Cache.get(fontFamilyKey);
    (_a = dynamicFont.ensureCharacters) == null ? void 0 : _a.call(dynamicFont, text);
    return dynamicFont;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  getLayout(text, style, trimEnd = true) {
    const bitmapFont = this.getFont(text, style);
    return getBitmapTextLayout([...text], style, bitmapFont, trimEnd);
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  measureText(text, style, trimEnd = true) {
    return this.getLayout(text, style, trimEnd);
  }
  // eslint-disable-next-line max-len
  install(...args) {
    var _a, _b, _c, _d;
    let options = args[0];
    if (typeof options === "string") {
      options = {
        name: options,
        style: args[1],
        chars: (_a = args[2]) == null ? void 0 : _a.chars,
        resolution: (_b = args[2]) == null ? void 0 : _b.resolution,
        padding: (_c = args[2]) == null ? void 0 : _c.padding,
        skipKerning: (_d = args[2]) == null ? void 0 : _d.skipKerning
      };
      deprecation(v8_0_0, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})");
    }
    const name = options == null ? void 0 : options.name;
    if (!name) {
      throw new Error("[BitmapFontManager] Property `name` is required.");
    }
    options = { ...this.defaultOptions, ...options };
    const textStyle = options.style;
    const style = textStyle instanceof TextStyle ? textStyle : new TextStyle(textStyle);
    const overrideFill = style._fill.fill !== null && style._fill.fill !== void 0;
    const font = new DynamicBitmapFont({
      style,
      overrideFill,
      skipKerning: options.skipKerning,
      padding: options.padding,
      resolution: options.resolution,
      overrideSize: false
    });
    const flatChars = resolveCharacters(options.chars);
    font.ensureCharacters(flatChars.join(""));
    Cache.set(`${name}-bitmap`, font);
    font.once("destroy", () => Cache.remove(`${name}-bitmap`));
    return font;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(name) {
    const cacheKey = `${name}-bitmap`;
    const font = Cache.get(cacheKey);
    if (font) {
      font.destroy();
    }
  }
};
var BitmapFontManager = new BitmapFontManagerClass();

// node_modules/pixi.js/lib/scene/text-bitmap/BitmapTextPipe.mjs
var BitmapTextPipe = class {
  constructor(renderer) {
    this._gpuBitmapText = {};
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_gpuBitmapText");
  }
  validateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    return this._renderer.renderPipes.graphics.validateRenderable(graphicsRenderable);
  }
  addRenderable(bitmapText, instructionSet) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    this._renderer.renderPipes.graphics.addRenderable(graphicsRenderable, instructionSet);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  destroyRenderable(bitmapText) {
    bitmapText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableByUid(bitmapText.uid);
  }
  _destroyRenderableByUid(renderableUid) {
    const context = this._gpuBitmapText[renderableUid].context;
    if (context.customShader) {
      BigPool.return(context.customShader);
      context.customShader = null;
    }
    BigPool.return(this._gpuBitmapText[renderableUid]);
    this._gpuBitmapText[renderableUid] = null;
  }
  updateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    this._renderer.renderPipes.graphics.updateRenderable(graphicsRenderable);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  _updateContext(bitmapText, proxyGraphics) {
    const { context } = proxyGraphics;
    const bitmapFont = BitmapFontManager.getFont(bitmapText.text, bitmapText._style);
    context.clear();
    if (bitmapFont.distanceField.type !== "none") {
      if (!context.customShader) {
        context.customShader = BigPool.get(SdfShader);
      }
    }
    const chars = Array.from(bitmapText.text);
    const style = bitmapText._style;
    let currentY = bitmapFont.baseLineOffset;
    const bitmapTextLayout = getBitmapTextLayout(chars, style, bitmapFont, true);
    let index = 0;
    const padding = style.padding;
    const scale = bitmapTextLayout.scale;
    let tx = bitmapTextLayout.width;
    let ty = bitmapTextLayout.height + bitmapTextLayout.offsetY;
    if (style._stroke) {
      tx += style._stroke.width / scale;
      ty += style._stroke.width / scale;
    }
    context.translate(-bitmapText._anchor._x * tx - padding, -bitmapText._anchor._y * ty - padding).scale(scale, scale);
    const tint = bitmapFont.applyFillAsTint ? style._fill.color : 16777215;
    for (let i = 0; i < bitmapTextLayout.lines.length; i++) {
      const line = bitmapTextLayout.lines[i];
      for (let j = 0; j < line.charPositions.length; j++) {
        const char = chars[index++];
        const charData = bitmapFont.chars[char];
        if (charData == null ? void 0 : charData.texture) {
          context.texture(
            charData.texture,
            tint ? tint : "black",
            Math.round(line.charPositions[j] + charData.xOffset),
            Math.round(currentY + charData.yOffset)
          );
        }
      }
      currentY += bitmapFont.lineHeight;
    }
  }
  _getGpuBitmapText(bitmapText) {
    return this._gpuBitmapText[bitmapText.uid] || this.initGpuText(bitmapText);
  }
  initGpuText(bitmapText) {
    const proxyRenderable = BigPool.get(Graphics);
    this._gpuBitmapText[bitmapText.uid] = proxyRenderable;
    this._updateContext(bitmapText, proxyRenderable);
    bitmapText.on("destroyed", this._destroyRenderableBound);
    return this._gpuBitmapText[bitmapText.uid];
  }
  _updateDistanceField(bitmapText) {
    const context = this._getGpuBitmapText(bitmapText).context;
    const fontFamily = bitmapText._style.fontFamily;
    const dynamicFont = Cache.get(`${fontFamily}-bitmap`);
    const { a, b, c, d } = bitmapText.groupTransform;
    const dx = Math.sqrt(a * a + b * b);
    const dy = Math.sqrt(c * c + d * d);
    const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
    const fontScale = dynamicFont.baseRenderedFontSize / bitmapText._style.fontSize;
    const distance = worldScale * dynamicFont.distanceField.range * (1 / fontScale);
    context.customShader.resources.localUniforms.uniforms.uDistance = distance;
  }
  destroy() {
    for (const uid2 in this._gpuBitmapText) {
      this._destroyRenderableByUid(uid2);
    }
    this._gpuBitmapText = null;
    this._renderer = null;
  }
};
BitmapTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "bitmapText"
};
function syncWithProxy(container, proxy) {
  proxy.groupTransform = container.groupTransform;
  proxy.groupColorAlpha = container.groupColorAlpha;
  proxy.groupColor = container.groupColor;
  proxy.groupBlendMode = container.groupBlendMode;
  proxy.globalDisplayStatus = container.globalDisplayStatus;
  proxy.groupTransform = container.groupTransform;
  proxy.localDisplayStatus = container.localDisplayStatus;
  proxy.groupAlpha = container.groupAlpha;
  proxy._roundPixels = container._roundPixels;
}

// node_modules/pixi.js/lib/scene/text-html/HTMLTextPipe.mjs
var HTMLTextPipe = class {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
    this._renderer.renderableGC.addManagedHash(this, "_gpuText");
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const newKey = htmlText._getKey();
    if (gpuText.textureNeedsUploading) {
      gpuText.textureNeedsUploading = false;
      return true;
    }
    if (gpuText.currentKey !== newKey) {
      return true;
    }
    return false;
  }
  addRenderable(htmlText, instructionSet) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(htmlText) {
    htmlText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(htmlText.uid);
  }
  _destroyRenderableById(htmlTextUid) {
    const gpuText = this._gpuText[htmlTextUid];
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    BigPool.return(gpuText.batchableSprite);
    this._gpuText[htmlTextUid] = null;
  }
  _updateText(htmlText) {
    const newKey = htmlText._getKey();
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(htmlText).catch((e) => {
        console.error(e);
      });
    }
    htmlText._didTextUpdate = false;
    const padding = htmlText._style.padding;
    updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
  }
  async _updateGpuText(htmlText) {
    htmlText._didTextUpdate = false;
    const gpuText = this._getGpuText(htmlText);
    if (gpuText.generatingTexture)
      return;
    const newKey = htmlText._getKey();
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    gpuText.generatingTexture = true;
    gpuText.currentKey = newKey;
    const resolution = htmlText.resolution ?? this._renderer.resolution;
    const texture = await this._renderer.htmlText.getManagedTexture(
      htmlText.text,
      resolution,
      htmlText._style,
      htmlText._getKey()
    );
    const batchableSprite = gpuText.batchableSprite;
    batchableSprite.texture = gpuText.texture = texture;
    gpuText.generatingTexture = false;
    gpuText.textureNeedsUploading = true;
    htmlText.onViewUpdate();
    const padding = htmlText._style.padding;
    updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
  }
  _getGpuText(htmlText) {
    return this._gpuText[htmlText.uid] || this.initGpuText(htmlText);
  }
  initGpuText(htmlText) {
    const gpuTextData = {
      texture: Texture.EMPTY,
      currentKey: "--",
      batchableSprite: BigPool.get(BatchableSprite),
      textureNeedsUploading: false,
      generatingTexture: false
    };
    const batchableSprite = gpuTextData.batchableSprite;
    batchableSprite.renderable = htmlText;
    batchableSprite.transform = htmlText.groupTransform;
    batchableSprite.texture = Texture.EMPTY;
    batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    batchableSprite.roundPixels = this._renderer._roundPixels | htmlText._roundPixels;
    htmlText._resolution = htmlText._autoResolution ? this._renderer.resolution : htmlText.resolution;
    this._gpuText[htmlText.uid] = gpuTextData;
    htmlText.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
};
HTMLTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "htmlText"
};

// node_modules/pixi.js/lib/utils/browser/isSafari.mjs
function isSafari() {
  const { userAgent } = DOMAdapter.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(userAgent);
}

// node_modules/pixi.js/lib/scene/text-html/HTMLTextRenderData.mjs
var nssvg = "http://www.w3.org/2000/svg";
var nsxhtml = "http://www.w3.org/1999/xhtml";
var HTMLTextRenderData = class {
  constructor() {
    this.svgRoot = document.createElementNS(nssvg, "svg");
    this.foreignObject = document.createElementNS(nssvg, "foreignObject");
    this.domElement = document.createElementNS(nsxhtml, "div");
    this.styleElement = document.createElementNS(nsxhtml, "style");
    this.image = new Image();
    const { foreignObject, svgRoot, styleElement, domElement } = this;
    foreignObject.setAttribute("width", "10000");
    foreignObject.setAttribute("height", "10000");
    foreignObject.style.overflow = "hidden";
    svgRoot.appendChild(foreignObject);
    foreignObject.appendChild(styleElement);
    foreignObject.appendChild(domElement);
  }
};

// node_modules/pixi.js/lib/scene/text-html/utils/textStyleToCSS.mjs
function textStyleToCSS(style) {
  const stroke = style._stroke;
  const fill = style._fill;
  const cssStyleString = [
    `color: ${Color.shared.setValue(fill.color).toHex()}`,
    `font-size: ${style.fontSize}px`,
    `font-family: ${style.fontFamily}`,
    `font-weight: ${style.fontWeight}`,
    `font-style: ${style.fontStyle}`,
    `font-variant: ${style.fontVariant}`,
    `letter-spacing: ${style.letterSpacing}px`,
    `text-align: ${style.align}`,
    `padding: ${style.padding}px`,
    `white-space: ${style.whiteSpace === "pre" && style.wordWrap ? "pre-wrap" : style.whiteSpace}`,
    ...style.lineHeight ? [`line-height: ${style.lineHeight}px`] : [],
    ...style.wordWrap ? [
      `word-wrap: ${style.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${style.wordWrapWidth}px`
    ] : [],
    ...stroke ? [strokeToCSS(stroke)] : [],
    ...style.dropShadow ? [dropShadowToCSS(style.dropShadow)] : [],
    ...style.cssOverrides
  ].join(";");
  const cssStyles = [`div { ${cssStyleString} }`];
  tagStyleToCSS(style.tagStyles, cssStyles);
  return cssStyles.join(" ");
}
function dropShadowToCSS(dropShadowStyle) {
  const color = Color.shared.setValue(dropShadowStyle.color).setAlpha(dropShadowStyle.alpha).toHexa();
  const x = Math.round(Math.cos(dropShadowStyle.angle) * dropShadowStyle.distance);
  const y = Math.round(Math.sin(dropShadowStyle.angle) * dropShadowStyle.distance);
  const position = `${x}px ${y}px`;
  if (dropShadowStyle.blur > 0) {
    return `text-shadow: ${position} ${dropShadowStyle.blur}px ${color}`;
  }
  return `text-shadow: ${position} ${color}`;
}
function strokeToCSS(stroke) {
  return [
    `-webkit-text-stroke-width: ${stroke.width}px`,
    `-webkit-text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
    `text-stroke-width: ${stroke.width}px`,
    `text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
var templates = {
  fontSize: `font-size: {{VALUE}}px`,
  fontFamily: `font-family: {{VALUE}}`,
  fontWeight: `font-weight: {{VALUE}}`,
  fontStyle: `font-style: {{VALUE}}`,
  fontVariant: `font-variant: {{VALUE}}`,
  letterSpacing: `letter-spacing: {{VALUE}}px`,
  align: `text-align: {{VALUE}}`,
  padding: `padding: {{VALUE}}px`,
  whiteSpace: `white-space: {{VALUE}}`,
  lineHeight: `line-height: {{VALUE}}px`,
  wordWrapWidth: `max-width: {{VALUE}}px`
};
var transform = {
  fill: (value) => `color: ${Color.shared.setValue(value).toHex()}`,
  breakWords: (value) => `word-wrap: ${value ? "break-all" : "break-word"}`,
  stroke: strokeToCSS,
  dropShadow: dropShadowToCSS
};
function tagStyleToCSS(tagStyles, out2) {
  for (const i in tagStyles) {
    const tagStyle = tagStyles[i];
    const cssTagStyle = [];
    for (const j in tagStyle) {
      if (transform[j]) {
        cssTagStyle.push(transform[j](tagStyle[j]));
      } else if (templates[j]) {
        cssTagStyle.push(templates[j].replace("{{VALUE}}", tagStyle[j]));
      }
    }
    out2.push(`${i} { ${cssTagStyle.join(";")} }`);
  }
}

// node_modules/pixi.js/lib/scene/text-html/HtmlTextStyle.mjs
var HTMLTextStyle = class _HTMLTextStyle extends TextStyle {
  constructor(options = {}) {
    super(options);
    this._cssOverrides = [];
    this.cssOverrides ?? (this.cssOverrides = options.cssOverrides);
    this.tagStyles = options.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(value) {
    this._cssOverrides = value instanceof Array ? value : [value];
    this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    this._styleKey = generateTextStyleKey(this) + this._cssOverrides.join("-");
    return this._styleKey;
  }
  update() {
    this._cssStyle = null;
    super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new _HTMLTextStyle({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    if (!this._cssStyle) {
      this._cssStyle = textStyleToCSS(this);
    }
    return this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...value) {
    const toAdd = value.filter((v) => !this.cssOverrides.includes(v));
    if (toAdd.length > 0) {
      this.cssOverrides.push(...toAdd);
      this.update();
    }
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...value) {
    const toRemove = value.filter((v) => this.cssOverrides.includes(v));
    if (toRemove.length > 0) {
      this.cssOverrides = this.cssOverrides.filter((v) => !toRemove.includes(v));
      this.update();
    }
  }
  set fill(value) {
    if (typeof value !== "string" && typeof value !== "number") {
      warn("[HTMLTextStyle] only color fill is not supported by HTMLText");
    }
    super.fill = value;
  }
  set stroke(value) {
    if (value && typeof value !== "string" && typeof value !== "number") {
      warn("[HTMLTextStyle] only color stroke is not supported by HTMLText");
    }
    super.stroke = value;
  }
};

// node_modules/pixi.js/lib/scene/text-html/utils/extractFontFamilies.mjs
function extractFontFamilies(text, style) {
  const fontFamily = style.fontFamily;
  const fontFamilies = [];
  const dedupe = {};
  const regex = /font-family:([^;"\s]+)/g;
  const matches = text.match(regex);
  function addFontFamily(fontFamily2) {
    if (!dedupe[fontFamily2]) {
      fontFamilies.push(fontFamily2);
      dedupe[fontFamily2] = true;
    }
  }
  if (Array.isArray(fontFamily)) {
    for (let i = 0; i < fontFamily.length; i++) {
      addFontFamily(fontFamily[i]);
    }
  } else {
    addFontFamily(fontFamily);
  }
  if (matches) {
    matches.forEach((match) => {
      const fontFamily2 = match.split(":")[1].trim();
      addFontFamily(fontFamily2);
    });
  }
  for (const i in style.tagStyles) {
    const fontFamily2 = style.tagStyles[i].fontFamily;
    addFontFamily(fontFamily2);
  }
  return fontFamilies;
}

// node_modules/pixi.js/lib/scene/text-html/utils/loadFontAsBase64.mjs
async function loadFontAsBase64(url) {
  const response = await DOMAdapter.get().fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  const dataSrc = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return dataSrc;
}

// node_modules/pixi.js/lib/scene/text-html/utils/loadFontCSS.mjs
async function loadFontCSS(style, url) {
  const dataSrc = await loadFontAsBase64(url);
  return `@font-face {
        font-family: "${style.fontFamily}";
        src: url('${dataSrc}');
        font-weight: ${style.fontWeight};
        font-style: ${style.fontStyle};
    }`;
}

// node_modules/pixi.js/lib/scene/text-html/utils/getFontCss.mjs
var FontStylePromiseCache = /* @__PURE__ */ new Map();
async function getFontCss(fontFamilies, style, defaultOptions) {
  const fontPromises = fontFamilies.filter((fontFamily) => Cache.has(`${fontFamily}-and-url`)).map((fontFamily, i) => {
    if (!FontStylePromiseCache.has(fontFamily)) {
      const { url } = Cache.get(`${fontFamily}-and-url`);
      if (i === 0) {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          fontFamily
        }, url));
      } else {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: defaultOptions.fontWeight,
          fontStyle: defaultOptions.fontStyle,
          fontFamily
        }, url));
      }
    }
    return FontStylePromiseCache.get(fontFamily);
  });
  return (await Promise.all(fontPromises)).join("\n");
}

// node_modules/pixi.js/lib/scene/text-html/utils/getSVGUrl.mjs
function getSVGUrl(text, style, resolution, fontCSS, htmlTextData) {
  const { domElement, styleElement, svgRoot } = htmlTextData;
  domElement.innerHTML = `<style>${style.cssStyle}</style><div style='padding:0;'>${text}</div>`;
  domElement.setAttribute("style", `transform: scale(${resolution});transform-origin: top left; display: inline-block`);
  styleElement.textContent = fontCSS;
  const { width, height } = htmlTextData.image;
  svgRoot.setAttribute("width", width.toString());
  svgRoot.setAttribute("height", height.toString());
  return new XMLSerializer().serializeToString(svgRoot);
}

// node_modules/pixi.js/lib/scene/text-html/utils/getTemporaryCanvasFromImage.mjs
function getTemporaryCanvasFromImage(image, resolution) {
  const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
    image.width,
    image.height,
    resolution
  );
  const { context } = canvasAndContext;
  context.clearRect(0, 0, image.width, image.height);
  context.drawImage(image, 0, 0);
  return canvasAndContext;
}

// node_modules/pixi.js/lib/scene/text-html/utils/loadSVGImage.mjs
function loadSVGImage(image, url, delay) {
  return new Promise(async (resolve) => {
    if (delay) {
      await new Promise((resolve2) => setTimeout(resolve2, 100));
    }
    image.onload = () => {
      resolve();
    };
    image.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(url)}`;
    image.crossOrigin = "anonymous";
  });
}

// node_modules/pixi.js/lib/scene/text-html/utils/measureHtmlText.mjs
var tempHTMLTextRenderData;
function measureHtmlText(text, style, fontStyleCSS, htmlTextRenderData) {
  htmlTextRenderData = htmlTextRenderData || tempHTMLTextRenderData || (tempHTMLTextRenderData = new HTMLTextRenderData());
  const { domElement, styleElement, svgRoot } = htmlTextRenderData;
  domElement.innerHTML = `<style>${style.cssStyle};</style><div style='padding:0'>${text}</div>`;
  domElement.setAttribute("style", "transform-origin: top left; display: inline-block");
  if (fontStyleCSS) {
    styleElement.textContent = fontStyleCSS;
  }
  document.body.appendChild(svgRoot);
  const contentBounds = domElement.getBoundingClientRect();
  svgRoot.remove();
  const descenderPadding = CanvasTextMetrics.measureFont(style.fontStyle).descent;
  const doublePadding = style.padding * 2;
  return {
    width: contentBounds.width - doublePadding,
    height: contentBounds.height + descenderPadding - doublePadding
  };
}

// node_modules/pixi.js/lib/scene/text-html/HTMLTextSystem.mjs
var HTMLTextSystem = class {
  constructor(renderer) {
    this._activeTextures = {};
    this._renderer = renderer;
    this._createCanvas = renderer.type === RendererType.WEBGPU;
  }
  getTexture(options) {
    return this._buildTexturePromise(
      options.text,
      options.resolution,
      options.style
    );
  }
  getManagedTexture(text, resolution, style, textKey) {
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].promise;
    }
    const promise2 = this._buildTexturePromise(text, resolution, style).then((texture) => {
      this._activeTextures[textKey].texture = texture;
      return texture;
    });
    this._activeTextures[textKey] = {
      texture: null,
      promise: promise2,
      usageCount: 1
    };
    return promise2;
  }
  async _buildTexturePromise(text, resolution, style) {
    const htmlTextData = BigPool.get(HTMLTextRenderData);
    const fontFamilies = extractFontFamilies(text, style);
    const fontCSS = await getFontCss(
      fontFamilies,
      style,
      HTMLTextStyle.defaultTextStyle
    );
    const measured = measureHtmlText(text, style, fontCSS, htmlTextData);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const image = htmlTextData.image;
    const uvSafeOffset = 2;
    image.width = (width | 0) + uvSafeOffset;
    image.height = (height | 0) + uvSafeOffset;
    const svgURL = getSVGUrl(text, style, resolution, fontCSS, htmlTextData);
    await loadSVGImage(image, svgURL, isSafari() && fontFamilies.length > 0);
    const resource = image;
    let canvasAndContext;
    if (this._createCanvas) {
      canvasAndContext = getTemporaryCanvasFromImage(image, resolution);
    }
    const texture = getPo2TextureFromSource(
      canvasAndContext ? canvasAndContext.canvas : resource,
      image.width - uvSafeOffset,
      image.height - uvSafeOffset,
      resolution
    );
    if (this._createCanvas) {
      this._renderer.texture.initSource(texture.source);
      CanvasPool.returnCanvasAndContext(canvasAndContext);
    }
    BigPool.return(htmlTextData);
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    if (!activeTexture)
      return;
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      if (activeTexture.texture) {
        this._cleanUp(activeTexture);
      } else {
        activeTexture.promise.then((texture) => {
          activeTexture.texture = texture;
          this._cleanUp(activeTexture);
        }).catch(() => {
          warn("HTMLTextSystem: Failed to clean texture");
        });
      }
      this._activeTextures[textKey] = null;
    }
  }
  _cleanUp(activeTexture) {
    TexturePool.returnTexture(activeTexture.texture);
    activeTexture.texture.source.resource = null;
    activeTexture.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
};
HTMLTextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "htmlText"
};
HTMLTextSystem.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};

// node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs
var _MeshGeometry = class _MeshGeometry2 extends Geometry {
  constructor(...args) {
    let options = args[0] ?? {};
    if (options instanceof Float32Array) {
      deprecation(v8_0_0, "use new MeshGeometry({ positions, uvs, indices }) instead");
      options = {
        positions: options,
        uvs: args[1],
        indices: args[2]
      };
    }
    options = { ..._MeshGeometry2.defaultOptions, ...options };
    const positions = options.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const uvs = options.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = options.indices || new Uint32Array([0, 1, 2, 0, 2, 3]);
    const shrinkToFit = options.shrinkBuffersToFit;
    const positionBuffer = new Buffer({
      data: positions,
      label: "attribute-mesh-positions",
      shrinkToFit,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    const uvBuffer = new Buffer({
      data: uvs,
      label: "attribute-mesh-uvs",
      shrinkToFit,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    const indexBuffer = new Buffer({
      data: indices,
      label: "index-mesh-buffer",
      shrinkToFit,
      usage: BufferUsage.INDEX | BufferUsage.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: positionBuffer,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: uvBuffer,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer,
      topology: options.topology
    });
    this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  set positions(value) {
    this.attributes.aPosition.buffer.data = value;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  set uvs(value) {
    this.attributes.aUV.buffer.data = value;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(value) {
    this.indexBuffer.data = value;
  }
};
_MeshGeometry.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: false
};
var MeshGeometry = _MeshGeometry;

// node_modules/pixi.js/lib/scene/sprite-tiling/shader/tilingBit.mjs
var tilingBit = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
};
var tilingBitGl = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};

// node_modules/pixi.js/lib/scene/sprite-tiling/shader/TilingSpriteShader.mjs
var gpuProgram2;
var glProgram2;
var TilingSpriteShader = class extends Shader {
  constructor() {
    gpuProgram2 ?? (gpuProgram2 = compileHighShaderGpuProgram({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBit,
        tilingBit,
        roundPixelsBit
      ]
    }));
    glProgram2 ?? (glProgram2 = compileHighShaderGlProgram({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBitGl,
        tilingBitGl,
        roundPixelsBitGl
      ]
    }));
    const tilingUniforms = new UniformGroup({
      uMapCoord: { value: new Matrix(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new Matrix(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: glProgram2,
      gpuProgram: gpuProgram2,
      resources: {
        localUniforms: new UniformGroup({
          uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms,
        uTexture: Texture.EMPTY.source,
        uSampler: Texture.EMPTY.source.style
      }
    });
  }
  updateUniforms(width, height, matrix, anchorX, anchorY, texture) {
    const tilingUniforms = this.resources.tilingUniforms;
    const textureWidth = texture.width;
    const textureHeight = texture.height;
    const textureMatrix = texture.textureMatrix;
    const uTextureTransform = tilingUniforms.uniforms.uTextureTransform;
    uTextureTransform.set(
      matrix.a * textureWidth / width,
      matrix.b * textureWidth / height,
      matrix.c * textureHeight / width,
      matrix.d * textureHeight / height,
      matrix.tx / width,
      matrix.ty / height
    );
    uTextureTransform.invert();
    tilingUniforms.uniforms.uMapCoord = textureMatrix.mapCoord;
    tilingUniforms.uniforms.uClampFrame = textureMatrix.uClampFrame;
    tilingUniforms.uniforms.uClampOffset = textureMatrix.uClampOffset;
    tilingUniforms.uniforms.uTextureTransform = uTextureTransform;
    tilingUniforms.uniforms.uSizeAnchor[0] = width;
    tilingUniforms.uniforms.uSizeAnchor[1] = height;
    tilingUniforms.uniforms.uSizeAnchor[2] = anchorX;
    tilingUniforms.uniforms.uSizeAnchor[3] = anchorY;
    if (texture) {
      this.resources.uTexture = texture.source;
      this.resources.uSampler = texture.source.style;
    }
  }
};

// node_modules/pixi.js/lib/scene/sprite-tiling/utils/QuadGeometry.mjs
var QuadGeometry = class extends MeshGeometry {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
};

// node_modules/pixi.js/lib/scene/sprite-tiling/utils/setPositions.mjs
function setPositions(tilingSprite, positions) {
  const anchorX = tilingSprite.anchor.x;
  const anchorY = tilingSprite.anchor.y;
  positions[0] = -anchorX * tilingSprite.width;
  positions[1] = -anchorY * tilingSprite.height;
  positions[2] = (1 - anchorX) * tilingSprite.width;
  positions[3] = -anchorY * tilingSprite.height;
  positions[4] = (1 - anchorX) * tilingSprite.width;
  positions[5] = (1 - anchorY) * tilingSprite.height;
  positions[6] = -anchorX * tilingSprite.width;
  positions[7] = (1 - anchorY) * tilingSprite.height;
}

// node_modules/pixi.js/lib/scene/sprite-tiling/utils/applyMatrix.mjs
function applyMatrix(array, stride, offset, matrix) {
  let index = 0;
  const size = array.length / (stride || 2);
  const a = matrix.a;
  const b = matrix.b;
  const c = matrix.c;
  const d = matrix.d;
  const tx = matrix.tx;
  const ty = matrix.ty;
  offset *= stride;
  while (index < size) {
    const x = array[offset];
    const y = array[offset + 1];
    array[offset] = a * x + c * y + tx;
    array[offset + 1] = b * x + d * y + ty;
    offset += stride;
    index++;
  }
}

// node_modules/pixi.js/lib/scene/sprite-tiling/utils/setUvs.mjs
function setUvs(tilingSprite, uvs) {
  const texture = tilingSprite.texture;
  const width = texture.frame.width;
  const height = texture.frame.height;
  let anchorX = 0;
  let anchorY = 0;
  if (tilingSprite._applyAnchorToTexture) {
    anchorX = tilingSprite.anchor.x;
    anchorY = tilingSprite.anchor.y;
  }
  uvs[0] = uvs[6] = -anchorX;
  uvs[2] = uvs[4] = 1 - anchorX;
  uvs[1] = uvs[3] = -anchorY;
  uvs[5] = uvs[7] = 1 - anchorY;
  const textureMatrix = Matrix.shared;
  textureMatrix.copyFrom(tilingSprite._tileTransform.matrix);
  textureMatrix.tx /= tilingSprite.width;
  textureMatrix.ty /= tilingSprite.height;
  textureMatrix.invert();
  textureMatrix.scale(tilingSprite.width / width, tilingSprite.height / height);
  applyMatrix(uvs, 2, 0, textureMatrix);
}

// node_modules/pixi.js/lib/scene/sprite-tiling/TilingSpritePipe.mjs
var sharedQuad = new QuadGeometry();
var TilingSpritePipe = class {
  constructor(renderer) {
    this._state = State.default2d;
    this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_tilingSpriteDataHash");
  }
  validateRenderable(renderable) {
    const tilingSpriteData = this._getTilingSpriteData(renderable);
    const couldBatch = tilingSpriteData.canBatch;
    this._updateCanBatch(renderable);
    const canBatch = tilingSpriteData.canBatch;
    if (canBatch && canBatch === couldBatch) {
      const { batchableMesh } = tilingSpriteData;
      if (batchableMesh && batchableMesh.texture._source !== renderable.texture._source) {
        return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, renderable.texture);
      }
    }
    return couldBatch !== canBatch;
  }
  addRenderable(tilingSprite, instructionSet) {
    const batcher = this._renderer.renderPipes.batch;
    this._updateCanBatch(tilingSprite);
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { geometry, canBatch } = tilingSpriteData;
    if (canBatch) {
      tilingSpriteData.batchableMesh || (tilingSpriteData.batchableMesh = new BatchableMesh());
      const batchableMesh = tilingSpriteData.batchableMesh;
      if (tilingSprite.didViewUpdate) {
        this._updateBatchableMesh(tilingSprite);
        batchableMesh.geometry = geometry;
        batchableMesh.renderable = tilingSprite;
        batchableMesh.transform = tilingSprite.groupTransform;
        batchableMesh.texture = tilingSprite._texture;
      }
      batchableMesh.roundPixels = this._renderer._roundPixels | tilingSprite._roundPixels;
      batcher.addToBatch(batchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      tilingSpriteData.shader || (tilingSpriteData.shader = new TilingSpriteShader());
      this.updateRenderable(tilingSprite);
      instructionSet.add(tilingSprite);
    }
  }
  execute(tilingSprite) {
    const { shader } = this._tilingSpriteDataHash[tilingSprite.uid];
    shader.groups[0] = this._renderer.globalUniforms.bindGroup;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = tilingSprite.groupTransform;
    localUniforms.uRound = this._renderer._roundPixels | tilingSprite._roundPixels;
    color32BitToUniform(
      tilingSprite.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._state.blendMode = getAdjustedBlendModeBlend(tilingSprite.groupBlendMode, tilingSprite.texture._source);
    this._renderer.encoder.draw({
      geometry: sharedQuad,
      shader,
      state: this._state
    });
  }
  updateRenderable(tilingSprite) {
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { canBatch } = tilingSpriteData;
    if (canBatch) {
      const { batchableMesh } = tilingSpriteData;
      if (tilingSprite.didViewUpdate)
        this._updateBatchableMesh(tilingSprite);
      batchableMesh._batcher.updateElement(batchableMesh);
    } else if (tilingSprite.didViewUpdate) {
      const { shader } = tilingSpriteData;
      shader.updateUniforms(
        tilingSprite.width,
        tilingSprite.height,
        tilingSprite._tileTransform.matrix,
        tilingSprite.anchor.x,
        tilingSprite.anchor.y,
        tilingSprite.texture
      );
    }
  }
  destroyRenderable(tilingSprite) {
    var _a;
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    tilingSpriteData.batchableMesh = null;
    (_a = tilingSpriteData.shader) == null ? void 0 : _a.destroy();
    this._tilingSpriteDataHash[tilingSprite.uid] = null;
    tilingSprite.off("destroyed", this._destroyRenderableBound);
  }
  _getTilingSpriteData(renderable) {
    return this._tilingSpriteDataHash[renderable.uid] || this._initTilingSpriteData(renderable);
  }
  _initTilingSpriteData(tilingSprite) {
    const geometry = new MeshGeometry({
      indices: sharedQuad.indices,
      positions: sharedQuad.positions.slice(),
      uvs: sharedQuad.uvs.slice()
    });
    this._tilingSpriteDataHash[tilingSprite.uid] = {
      canBatch: true,
      renderable: tilingSprite,
      geometry
    };
    tilingSprite.on("destroyed", this._destroyRenderableBound);
    return this._tilingSpriteDataHash[tilingSprite.uid];
  }
  _updateBatchableMesh(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const { geometry } = renderableData;
    const style = tilingSprite.texture.source.style;
    if (style.addressMode !== "repeat") {
      style.addressMode = "repeat";
      style.update();
    }
    setUvs(tilingSprite, geometry.uvs);
    setPositions(tilingSprite, geometry.positions);
  }
  destroy() {
    for (const i in this._tilingSpriteDataHash) {
      this.destroyRenderable(this._tilingSpriteDataHash[i].renderable);
    }
    this._tilingSpriteDataHash = null;
    this._renderer = null;
  }
  _updateCanBatch(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const texture = tilingSprite.texture;
    let _nonPowOf2wrapping = true;
    if (this._renderer.type === RendererType.WEBGL) {
      _nonPowOf2wrapping = this._renderer.context.supports.nonPowOf2wrapping;
    }
    renderableData.canBatch = texture.textureMatrix.isSimple && (_nonPowOf2wrapping || texture.source.isPowerOfTwo);
    return renderableData.canBatch;
  }
};
TilingSpritePipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "tilingSprite"
};

// node_modules/pixi.js/lib/scene/mesh-plane/PlaneGeometry.mjs
var _PlaneGeometry = class _PlaneGeometry2 extends MeshGeometry {
  constructor(...args) {
    super({});
    let options = args[0] ?? {};
    if (typeof options === "number") {
      deprecation(v8_0_0, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead");
      options = {
        width: options,
        height: args[1],
        verticesX: args[2],
        verticesY: args[3]
      };
    }
    this.build(options);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(options) {
    options = { ..._PlaneGeometry2.defaultOptions, ...options };
    this.verticesX = this.verticesX ?? options.verticesX;
    this.verticesY = this.verticesY ?? options.verticesY;
    this.width = this.width ?? options.width;
    this.height = this.height ?? options.height;
    const total = this.verticesX * this.verticesY;
    const verts = [];
    const uvs = [];
    const indices = [];
    const verticesX = this.verticesX - 1;
    const verticesY = this.verticesY - 1;
    const sizeX = this.width / verticesX;
    const sizeY = this.height / verticesY;
    for (let i = 0; i < total; i++) {
      const x = i % this.verticesX;
      const y = i / this.verticesX | 0;
      verts.push(x * sizeX, y * sizeY);
      uvs.push(x / verticesX, y / verticesY);
    }
    const totalSub = verticesX * verticesY;
    for (let i = 0; i < totalSub; i++) {
      const xpos = i % verticesX;
      const ypos = i / verticesX | 0;
      const value = ypos * this.verticesX + xpos;
      const value2 = ypos * this.verticesX + xpos + 1;
      const value3 = (ypos + 1) * this.verticesX + xpos;
      const value4 = (ypos + 1) * this.verticesX + xpos + 1;
      indices.push(
        value,
        value2,
        value3,
        value2,
        value4,
        value3
      );
    }
    this.buffers[0].data = new Float32Array(verts);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint32Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
};
_PlaneGeometry.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
var PlaneGeometry = _PlaneGeometry;

// node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceGeometry.mjs
var _NineSliceGeometry = class _NineSliceGeometry2 extends PlaneGeometry {
  constructor(options = {}) {
    options = { ..._NineSliceGeometry2.defaultOptions, ...options };
    super({
      width: options.width,
      height: options.height,
      verticesX: 4,
      verticesY: 4
    });
    this.update(options);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(options) {
    this.width = options.width ?? this.width;
    this.height = options.height ?? this.height;
    this._originalWidth = options.originalWidth ?? this._originalWidth;
    this._originalHeight = options.originalHeight ?? this._originalHeight;
    this._leftWidth = options.leftWidth ?? this._leftWidth;
    this._rightWidth = options.rightWidth ?? this._rightWidth;
    this._topHeight = options.topHeight ?? this._topHeight;
    this._bottomHeight = options.bottomHeight ?? this._bottomHeight;
    this.updateUvs();
    this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const positions = this.positions;
    const w = this._leftWidth + this._rightWidth;
    const scaleW = this.width > w ? 1 : this.width / w;
    const h = this._topHeight + this._bottomHeight;
    const scaleH = this.height > h ? 1 : this.height / h;
    const scale = Math.min(scaleW, scaleH);
    positions[9] = positions[11] = positions[13] = positions[15] = this._topHeight * scale;
    positions[17] = positions[19] = positions[21] = positions[23] = this.height - this._bottomHeight * scale;
    positions[25] = positions[27] = positions[29] = positions[31] = this.height;
    positions[2] = positions[10] = positions[18] = positions[26] = this._leftWidth * scale;
    positions[4] = positions[12] = positions[20] = positions[28] = this.width - this._rightWidth * scale;
    positions[6] = positions[14] = positions[22] = positions[30] = this.width;
    this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const uvs = this.uvs;
    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
    uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
    uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
    const _uvw = 1 / this._originalWidth;
    const _uvh = 1 / this._originalHeight;
    uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
    uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
    uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
    uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
    this.getBuffer("aUV").update();
  }
};
_NineSliceGeometry.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
var NineSliceGeometry = _NineSliceGeometry;

// node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceSpritePipe.mjs
var NineSliceSpritePipe = class {
  constructor(renderer) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.renderableGC.addManagedHash(this, "_gpuSpriteHash");
  }
  addRenderable(sprite, instructionSet) {
    const gpuSprite = this._getGpuSprite(sprite);
    if (sprite.didViewUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    this._renderer.renderPipes.batch.addToBatch(gpuSprite, instructionSet);
  }
  updateRenderable(sprite) {
    const gpuSprite = this._gpuSpriteHash[sprite.uid];
    if (sprite.didViewUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    gpuSprite._batcher.updateElement(gpuSprite);
  }
  validateRenderable(sprite) {
    const texture = sprite._texture;
    const gpuSprite = this._getGpuSprite(sprite);
    if (gpuSprite.texture._source !== texture._source) {
      return !gpuSprite._batcher.checkAndUpdateTexture(gpuSprite, texture);
    }
    return false;
  }
  destroyRenderable(sprite) {
    const batchableMesh = this._gpuSpriteHash[sprite.uid];
    BigPool.return(batchableMesh.geometry);
    BigPool.return(batchableMesh);
    this._gpuSpriteHash[sprite.uid] = null;
    sprite.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(sprite, batchableSprite) {
    batchableSprite.geometry.update(sprite);
    batchableSprite.texture = sprite._texture;
  }
  _getGpuSprite(sprite) {
    return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
  }
  _initGPUSprite(sprite) {
    const batchableMesh = BigPool.get(BatchableMesh);
    batchableMesh.geometry = BigPool.get(NineSliceGeometry);
    batchableMesh.renderable = sprite;
    batchableMesh.transform = sprite.groupTransform;
    batchableMesh.texture = sprite._texture;
    batchableMesh.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
    this._gpuSpriteHash[sprite.uid] = batchableMesh;
    sprite.on("destroyed", this._destroyRenderableBound);
    return batchableMesh;
  }
  destroy() {
    for (const i in this._gpuSpriteHash) {
      const batchableMesh = this._gpuSpriteHash[i];
      batchableMesh.geometry.destroy();
    }
    this._gpuSpriteHash = null;
    this._renderer = null;
  }
};
NineSliceSpritePipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "nineSliceSprite"
};

// node_modules/pixi.js/lib/filters/FilterPipe.mjs
var FilterPipe = class {
  constructor(renderer) {
    this._renderer = renderer;
  }
  push(filterEffect, container, instructionSet) {
    const renderPipes = this._renderer.renderPipes;
    renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      canBundle: false,
      action: "pushFilter",
      container,
      filterEffect
    });
  }
  pop(_filterEffect, _container, instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: false
    });
  }
  execute(instruction) {
    if (instruction.action === "pushFilter") {
      this._renderer.filter.push(instruction);
    } else if (instruction.action === "popFilter") {
      this._renderer.filter.pop();
    }
  }
  destroy() {
    this._renderer = null;
  }
};
FilterPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "filter"
};

// node_modules/pixi.js/lib/scene/container/bounds/getFastGlobalBounds.mjs
var tempMatrix2 = new Matrix();
function getFastGlobalBounds(target, bounds) {
  bounds.clear();
  _getGlobalBoundsRecursive(target, bounds);
  if (!bounds.isValid) {
    bounds.set(0, 0, 0, 0);
  }
  if (!target.renderGroup) {
    bounds.applyMatrix(target.parentRenderGroup.worldTransform);
  } else {
    bounds.applyMatrix(target.renderGroup.localTransform);
  }
  return bounds;
}
function _getGlobalBoundsRecursive(target, bounds) {
  if (target.localDisplayStatus !== 7 || !target.measurable) {
    return;
  }
  const manageEffects = !!target.effects.length;
  let localBounds = bounds;
  if (target.renderGroup || manageEffects) {
    localBounds = boundsPool.get().clear();
  }
  if (target.boundsArea) {
    bounds.addRect(target.boundsArea, target.worldTransform);
  } else {
    if (target.renderPipeId) {
      const viewBounds = target.bounds;
      localBounds.addFrame(
        viewBounds.minX,
        viewBounds.minY,
        viewBounds.maxX,
        viewBounds.maxY,
        target.groupTransform
      );
    }
    const children = target.children;
    for (let i = 0; i < children.length; i++) {
      _getGlobalBoundsRecursive(children[i], localBounds);
    }
  }
  if (manageEffects) {
    let advanced = false;
    for (let i = 0; i < target.effects.length; i++) {
      if (target.effects[i].addBounds) {
        if (!advanced) {
          advanced = true;
          localBounds.applyMatrix(target.parentRenderGroup.worldTransform);
        }
        target.effects[i].addBounds(localBounds, true);
      }
    }
    if (advanced) {
      localBounds.applyMatrix(target.parentRenderGroup.worldTransform.copyTo(tempMatrix2).invert());
      bounds.addBounds(localBounds, target.relativeGroupTransform);
    }
    bounds.addBounds(localBounds);
    boundsPool.return(localBounds);
  } else if (target.renderGroup) {
    bounds.addBounds(localBounds, target.relativeGroupTransform);
    boundsPool.return(localBounds);
  }
}

// node_modules/pixi.js/lib/scene/container/bounds/getRenderableBounds.mjs
function getGlobalRenderableBounds(renderables, bounds) {
  bounds.clear();
  const tempMatrix3 = bounds.matrix;
  for (let i = 0; i < renderables.length; i++) {
    const renderable = renderables[i];
    if (renderable.globalDisplayStatus < 7) {
      continue;
    }
    bounds.matrix = renderable.worldTransform;
    renderable.addBounds(bounds);
  }
  bounds.matrix = tempMatrix3;
  return bounds;
}

// node_modules/pixi.js/lib/filters/FilterSystem.mjs
var quadGeometry = new Geometry({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
var FilterSystem = class {
  constructor(renderer) {
    this._filterStackIndex = 0;
    this._filterStack = [];
    this._filterGlobalUniforms = new UniformGroup({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    });
    this._globalFilterBindGroup = new BindGroup({});
    this.renderer = renderer;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    var _a;
    return (_a = this._activeFilterData) == null ? void 0 : _a.backTexture;
  }
  push(instruction) {
    var _a;
    const renderer = this.renderer;
    const filters = instruction.filterEffect.filters;
    if (!this._filterStack[this._filterStackIndex]) {
      this._filterStack[this._filterStackIndex] = this._getFilterData();
    }
    const filterData = this._filterStack[this._filterStackIndex];
    this._filterStackIndex++;
    if (filters.length === 0) {
      filterData.skip = true;
      return;
    }
    const bounds = filterData.bounds;
    if (instruction.renderables) {
      getGlobalRenderableBounds(instruction.renderables, bounds);
    } else if (instruction.filterEffect.filterArea) {
      bounds.clear();
      bounds.addRect(instruction.filterEffect.filterArea);
      bounds.applyMatrix(instruction.container.worldTransform);
    } else {
      getFastGlobalBounds(instruction.container, bounds);
    }
    const colorTextureSource = renderer.renderTarget.renderTarget.colorTexture.source;
    let resolution = Infinity;
    let padding = 0;
    let antialias = true;
    let blendRequired = false;
    let enabled = false;
    let clipToViewport = true;
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      resolution = Math.min(resolution, filter.resolution === "inherit" ? colorTextureSource._resolution : filter.resolution);
      padding += filter.padding;
      if (filter.antialias === "off") {
        antialias = false;
      } else if (filter.antialias === "inherit") {
        antialias && (antialias = colorTextureSource.antialias);
      }
      if (!filter.clipToViewport) {
        clipToViewport = false;
      }
      const isCompatible = !!(filter.compatibleRenderers & renderer.type);
      if (!isCompatible) {
        enabled = false;
        break;
      }
      if (filter.blendRequired && !(((_a = renderer.backBuffer) == null ? void 0 : _a.useBackBuffer) ?? true)) {
        warn("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options.");
        enabled = false;
        break;
      }
      enabled = filter.enabled || enabled;
      blendRequired = blendRequired || filter.blendRequired;
    }
    if (!enabled) {
      filterData.skip = true;
      return;
    }
    bounds.scale(resolution);
    if (clipToViewport) {
      const viewPort = renderer.renderTarget.rootViewPort;
      bounds.fitBounds(0, viewPort.width, 0, viewPort.height);
    }
    bounds.ceil().scale(1 / resolution).pad(padding | 0);
    if (!bounds.isPositive) {
      filterData.skip = true;
      return;
    }
    filterData.skip = false;
    filterData.bounds = bounds;
    filterData.blendRequired = blendRequired;
    filterData.container = instruction.container;
    filterData.filterEffect = instruction.filterEffect;
    filterData.previousRenderSurface = renderer.renderTarget.renderSurface;
    filterData.inputTexture = TexturePool.getOptimalTexture(
      bounds.width,
      bounds.height,
      resolution,
      antialias
    );
    renderer.renderTarget.bind(filterData.inputTexture, true);
    renderer.globalUniforms.push({
      offset: bounds
    });
  }
  pop() {
    const renderer = this.renderer;
    this._filterStackIndex--;
    const filterData = this._filterStack[this._filterStackIndex];
    if (filterData.skip) {
      return;
    }
    this._activeFilterData = filterData;
    const inputTexture = filterData.inputTexture;
    const bounds = filterData.bounds;
    let backTexture = Texture.EMPTY;
    renderer.renderTarget.finishRenderPass();
    if (filterData.blendRequired) {
      const previousBounds = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null;
      const renderTarget = renderer.renderTarget.getRenderTarget(filterData.previousRenderSurface);
      backTexture = this.getBackTexture(renderTarget, bounds, previousBounds);
    }
    filterData.backTexture = backTexture;
    const filters = filterData.filterEffect.filters;
    this._globalFilterBindGroup.setResource(inputTexture.source.style, 2);
    this._globalFilterBindGroup.setResource(backTexture.source, 3);
    renderer.globalUniforms.pop();
    if (filters.length === 1) {
      filters[0].apply(this, inputTexture, filterData.previousRenderSurface, false);
      TexturePool.returnTexture(inputTexture);
    } else {
      let flip = filterData.inputTexture;
      let flop = TexturePool.getOptimalTexture(
        bounds.width,
        bounds.height,
        flip.source._resolution,
        false
      );
      let i = 0;
      for (i = 0; i < filters.length - 1; ++i) {
        const filter = filters[i];
        filter.apply(this, flip, flop, true);
        const t = flip;
        flip = flop;
        flop = t;
      }
      filters[i].apply(this, flip, filterData.previousRenderSurface, false);
      TexturePool.returnTexture(flip);
      TexturePool.returnTexture(flop);
    }
    if (filterData.blendRequired) {
      TexturePool.returnTexture(backTexture);
    }
  }
  getBackTexture(lastRenderSurface, bounds, previousBounds) {
    const backgroundResolution = lastRenderSurface.colorTexture.source._resolution;
    const backTexture = TexturePool.getOptimalTexture(
      bounds.width,
      bounds.height,
      backgroundResolution,
      false
    );
    let x = bounds.minX;
    let y = bounds.minY;
    if (previousBounds) {
      x -= previousBounds.minX;
      y -= previousBounds.minY;
    }
    x = Math.floor(x * backgroundResolution);
    y = Math.floor(y * backgroundResolution);
    const width = Math.ceil(bounds.width * backgroundResolution);
    const height = Math.ceil(bounds.height * backgroundResolution);
    this.renderer.renderTarget.copyToTexture(
      lastRenderSurface,
      backTexture,
      { x, y },
      { width, height },
      { x: 0, y: 0 }
    );
    return backTexture;
  }
  applyFilter(filter, input, output, clear) {
    const renderer = this.renderer;
    const filterData = this._filterStack[this._filterStackIndex];
    const bounds = filterData.bounds;
    const offset = Point.shared;
    const previousRenderSurface = filterData.previousRenderSurface;
    const isFinalTarget = previousRenderSurface === output;
    let resolution = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;
    let currentIndex = this._filterStackIndex - 1;
    while (currentIndex > 0 && this._filterStack[currentIndex].skip) {
      --currentIndex;
    }
    if (currentIndex > 0) {
      resolution = this._filterStack[currentIndex].inputTexture.source._resolution;
    }
    const filterUniforms = this._filterGlobalUniforms;
    const uniforms = filterUniforms.uniforms;
    const outputFrame = uniforms.uOutputFrame;
    const inputSize = uniforms.uInputSize;
    const inputPixel = uniforms.uInputPixel;
    const inputClamp = uniforms.uInputClamp;
    const globalFrame = uniforms.uGlobalFrame;
    const outputTexture = uniforms.uOutputTexture;
    if (isFinalTarget) {
      let lastIndex = this._filterStackIndex;
      while (lastIndex > 0) {
        lastIndex--;
        const filterData2 = this._filterStack[this._filterStackIndex - 1];
        if (!filterData2.skip) {
          offset.x = filterData2.bounds.minX;
          offset.y = filterData2.bounds.minY;
          break;
        }
      }
      outputFrame[0] = bounds.minX - offset.x;
      outputFrame[1] = bounds.minY - offset.y;
    } else {
      outputFrame[0] = 0;
      outputFrame[1] = 0;
    }
    outputFrame[2] = input.frame.width;
    outputFrame[3] = input.frame.height;
    inputSize[0] = input.source.width;
    inputSize[1] = input.source.height;
    inputSize[2] = 1 / inputSize[0];
    inputSize[3] = 1 / inputSize[1];
    inputPixel[0] = input.source.pixelWidth;
    inputPixel[1] = input.source.pixelHeight;
    inputPixel[2] = 1 / inputPixel[0];
    inputPixel[3] = 1 / inputPixel[1];
    inputClamp[0] = 0.5 * inputPixel[2];
    inputClamp[1] = 0.5 * inputPixel[3];
    inputClamp[2] = input.frame.width * inputSize[2] - 0.5 * inputPixel[2];
    inputClamp[3] = input.frame.height * inputSize[3] - 0.5 * inputPixel[3];
    const rootTexture = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    globalFrame[0] = offset.x * resolution;
    globalFrame[1] = offset.y * resolution;
    globalFrame[2] = rootTexture.source.width * resolution;
    globalFrame[3] = rootTexture.source.height * resolution;
    const renderTarget = this.renderer.renderTarget.getRenderTarget(output);
    renderer.renderTarget.bind(output, !!clear);
    if (output instanceof Texture) {
      outputTexture[0] = output.frame.width;
      outputTexture[1] = output.frame.height;
    } else {
      outputTexture[0] = renderTarget.width;
      outputTexture[1] = renderTarget.height;
    }
    outputTexture[2] = renderTarget.isRoot ? -1 : 1;
    filterUniforms.update();
    if (renderer.renderPipes.uniformBatch) {
      const batchUniforms = renderer.renderPipes.uniformBatch.getUboResource(filterUniforms);
      this._globalFilterBindGroup.setResource(batchUniforms, 0);
    } else {
      this._globalFilterBindGroup.setResource(filterUniforms, 0);
    }
    this._globalFilterBindGroup.setResource(input.source, 1);
    this._globalFilterBindGroup.setResource(input.source.style, 2);
    filter.groups[0] = this._globalFilterBindGroup;
    renderer.encoder.draw({
      geometry: quadGeometry,
      shader: filter,
      state: filter._state,
      topology: "triangle-list"
    });
    if (renderer.type === RendererType.WEBGL) {
      renderer.renderTarget.finishRenderPass();
    }
  }
  _getFilterData() {
    return {
      skip: false,
      inputTexture: null,
      bounds: new Bounds(),
      container: null,
      filterEffect: null,
      blendRequired: false,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(outputMatrix, sprite) {
    const data = this._activeFilterData;
    const mappedMatrix = outputMatrix.set(
      data.inputTexture._source.width,
      0,
      0,
      data.inputTexture._source.height,
      data.bounds.minX,
      data.bounds.minY
    );
    const worldTransform = sprite.worldTransform.copyTo(Matrix.shared);
    worldTransform.invert();
    mappedMatrix.prepend(worldTransform);
    mappedMatrix.scale(
      1 / sprite.texture.frame.width,
      1 / sprite.texture.frame.height
    );
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
    return mappedMatrix;
  }
};
FilterSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem
  ],
  name: "filter"
};

export {
  ResizePlugin,
  TickerPlugin,
  LoaderParserPriority,
  path,
  convertToList,
  createStringVariations,
  isSingleItem,
  Resolver,
  getUrlExtension,
  copySearchParams,
  Spritesheet,
  spritesheetAsset,
  addMaskBounds,
  addMaskLocalBounds,
  getMatrixRelativeToParent,
  AlphaMask,
  ColorMask,
  StencilMask,
  ImageSource,
  detectVideoAlphaMode,
  VideoSource,
  Cache,
  autoDetectSource,
  resourceToTexture,
  textureFrom,
  buildUvs,
  buildSimpleUvs,
  transformVertices,
  multiplyHexColors,
  BatchableGraphics,
  buildCircle,
  buildEllipse,
  buildRoundedRectangle,
  closePointEps,
  curveEps,
  getOrientationOfPoints,
  buildLine,
  triangulateWithHoles,
  buildPolygon,
  buildRectangle,
  buildTriangle,
  shapeBuilders,
  buildContextBatches,
  GpuGraphicsContext,
  GraphicsContextRenderData,
  GraphicsContextSystem,
  GraphicsPipe,
  BatchableMesh,
  MeshPipe,
  GlParticleContainerAdaptor,
  createIndicesForQuads,
  generateParticleUpdateFunction,
  ParticleBuffer,
  fragment,
  vertex,
  wgsl,
  ParticleShader,
  ParticleContainerPipe,
  GlParticleContainerPipe,
  GpuParticleContainerAdaptor,
  GpuParticleContainerPipe,
  CanvasTextPipe,
  getCanvasBoundingBox,
  FillGradient,
  FillPattern,
  SVGToGraphicsPath,
  Circle,
  Ellipse,
  squaredDistanceToLineSegment,
  Polygon,
  RoundedRectangle,
  buildAdaptiveBezier,
  buildAdaptiveQuadratic,
  buildArc,
  buildArcTo,
  buildArcToSvg,
  roundedShapeArc,
  roundedShapeQuadraticCurve,
  ShapePath,
  GraphicsPath,
  SVGParser,
  toFillStyle,
  toStrokeStyle,
  GraphicsContext,
  generateTextStyleKey,
  TextStyle,
  getPo2TextureFromSource,
  fontStringFromTextStyle,
  CanvasTextMetrics,
  getCanvasFillStyle,
  CanvasTextSystem,
  Graphics,
  localUniformMSDFBit,
  localUniformMSDFBitGl,
  mSDFBit,
  mSDFBitGl,
  SdfShader,
  AbstractBitmapFont,
  resolveCharacters,
  DynamicBitmapFont,
  getBitmapTextLayout,
  BitmapFontManager,
  BitmapTextPipe,
  HTMLTextPipe,
  isSafari,
  nssvg,
  nsxhtml,
  HTMLTextRenderData,
  textStyleToCSS,
  HTMLTextStyle,
  extractFontFamilies,
  loadFontAsBase64,
  loadFontCSS,
  FontStylePromiseCache,
  getFontCss,
  getSVGUrl,
  getTemporaryCanvasFromImage,
  loadSVGImage,
  measureHtmlText,
  HTMLTextSystem,
  MeshGeometry,
  tilingBit,
  tilingBitGl,
  TilingSpriteShader,
  QuadGeometry,
  setPositions,
  applyMatrix,
  setUvs,
  TilingSpritePipe,
  PlaneGeometry,
  NineSliceGeometry,
  NineSliceSpritePipe,
  FilterPipe,
  getFastGlobalBounds,
  _getGlobalBoundsRecursive,
  getGlobalRenderableBounds,
  FilterSystem
};
//# sourceMappingURL=chunk-P6U5SLVF.js.map
