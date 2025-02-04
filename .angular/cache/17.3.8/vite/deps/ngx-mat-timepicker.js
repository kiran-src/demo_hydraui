import {
  MatInput,
  MatInputModule
} from "./chunk-QSG46TRX.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-Y47MMKIV.js";
import "./chunk-G7OQJRVH.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-MTPMAAYW.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatSuffix
} from "./chunk-7RTSC4DC.js";
import {
  MAT_FAB_DEFAULT_OPTIONS,
  MatButton,
  MatButtonModule,
  MatIconButton,
  MatMiniFabButton
} from "./chunk-U5W7IVM3.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-GN2I7UU7.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "./chunk-MVFG4YZR.js";
import {
  A11yModule,
  CdkTrapFocus,
  MatCommonModule,
  MatOption,
  MatOptionModule
} from "./chunk-AKLBWIKO.js";
import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-45TI43DM.js";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  Overlay,
  OverlayModule
} from "./chunk-YAHPHKLN.js";
import "./chunk-OMYCMQ7J.js";
import {
  PortalModule
} from "./chunk-CJK5GT5Z.js";
import {
  Platform,
  coerceBooleanProperty
} from "./chunk-E3OGXLVR.js";
import "./chunk-7I6II3U3.js";
import "./chunk-CJNMZQC3.js";
import "./chunk-SGS2LYIP.js";
import {
  AsyncPipe,
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  SlicePipe
} from "./chunk-GQZ4FHHY.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  NgModule,
  Optional,
  Output,
  Pipe,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-35JAWRVK.js";
import "./chunk-Q3LSS7YV.js";
import "./chunk-JMVNMYSP.js";
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  map,
  shareReplay,
  takeUntil,
  tap
} from "./chunk-V7OZNMUU.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-DHZM6WDG.js";

// node_modules/ts-luxon/dist/ts-luxon.es6.js
var TsLuxonError = class extends Error {
};
var InvalidDateTimeError = class extends TsLuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
};
var InvalidDurationError = class extends TsLuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
};
var InvalidIntervalError = class extends TsLuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
};
var InvalidUnitError = class _InvalidUnitError extends TsLuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
    Object.setPrototypeOf(this, _InvalidUnitError.prototype);
  }
};
var InvalidZoneError = class _InvalidZoneError extends TsLuxonError {
  constructor(zoneName) {
    super(`${zoneName} is an invalid or unknown zone specifier`);
    Object.setPrototypeOf(this, _InvalidZoneError.prototype);
  }
};
var ConflictingSpecificationError = class _ConflictingSpecificationError extends TsLuxonError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _ConflictingSpecificationError.prototype);
  }
};
var InvalidArgumentError = class _InvalidArgumentError extends TsLuxonError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _InvalidArgumentError.prototype);
  }
};
var ZoneIsAbstractError = class _ZoneIsAbstractError extends TsLuxonError {
  constructor() {
    super("Zone is an abstract class");
    Object.setPrototypeOf(this, _ZoneIsAbstractError.prototype);
  }
};
function silenceUnusedWarning(...args) {
  args.length;
}
var Zone = class {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} [ts] - Epoch milliseconds for which to get the name
   * @param {Object} [options] - Options to affect the format
   * @param {string} [options.format] - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} [options.locale] - What locale to return the offset name in.
   * @return {string | null}
   */
  offsetName(ts, options) {
    silenceUnusedWarning(ts, options);
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    silenceUnusedWarning(ts, format);
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    silenceUnusedWarning(ts);
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} other - the zone to compare
   * @return {boolean}
   */
  equals(other) {
    silenceUnusedWarning(other);
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ZoneIsAbstractError();
  }
};
var Intl$1 = Intl;
var dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    try {
      dtfCache[zone] = new Intl$1.DateTimeFormat("en-US", {
        hour12: false,
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        era: "short"
      });
    } catch (_a) {
      throw new InvalidZoneError(zone);
    }
  }
  return dtfCache[zone];
}
var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, "");
  const parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted);
  const [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date);
  const filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i];
    const pos = typeToPos[type];
    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
var ianaZoneCache = {};
var IANAZone = class _IANAZone extends Zone {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new _IANAZone(name);
    }
    return ianaZoneCache[name];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  /**
   * Returns whether the provided string is a valid specifier.
   * This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(s2) {
    return this.isValidZone(s2);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl$1.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }
  constructor(name) {
    super();
    this._zoneName = name;
    this._valid = _IANAZone.isValidZone(name);
  }
  /** @override **/
  get type() {
    return "iana";
  }
  /** @override **/
  get name() {
    return this._zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale } = {}) {
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    const date = new Date(ts);
    if (isNaN(+date)) {
      return NaN;
    }
    const dtf = makeDTF(this.name);
    let yearAlt;
    const [year, month, day, adOrBc, hour, minute, second] = typeof dtf.formatToParts === typeof isNaN ? partsOffset(dtf, date) : hackyOffset(dtf, date);
    if (adOrBc === "BC") {
      yearAlt = -Math.abs(+year) + 1;
    }
    const adjustedHour = hour === 24 ? 0 : hour;
    const asUTC = objToLocalTS({
      year: yearAlt || +year,
      month: +month,
      day: +day,
      hour: +adjustedHour,
      minute: +minute,
      second: +second,
      millisecond: 0
    });
    let asTS = +date;
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  }
  /** @override **/
  equals(other) {
    return other.type === "iana" && other.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this._valid;
  }
};
function __rest(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
var n = "numeric";
var s = "short";
var l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  }
}
var weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."],
    milliseconds: []
    // never used
  };
  const normalizedUnit = Duration.normalizeUnit(unit), unitTexts = units[normalizedUnit], lastable = ["hours", "minutes", "seconds"].indexOf(normalizedUnit) === -1;
  if (numeric === "auto" && lastable) {
    const isDay = normalizedUnit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${unitTexts[0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${unitTexts[0]}`;
      case 0:
        return isDay ? "today" : `this ${unitTexts[0]}`;
    }
  }
  const isInPast = Object.is(count, -0) || count < 0, formatValue = Math.abs(count), singular = formatValue === 1, formatUnit = narrow ? singular ? unitTexts[1] : unitTexts[2] || unitTexts[1] : singular ? unitTexts[0] : normalizedUnit;
  return isInPast ? `${formatValue} ${formatUnit} ago` : `in ${formatValue} ${formatUnit}`;
}
var intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl$1.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
var intlDTCache = {};
function getCachedDTF(locString, options = {}) {
  const key = JSON.stringify([locString, options]);
  let dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl$1.DateTimeFormat(locString, options);
    intlDTCache[key] = dtf;
  }
  return dtf;
}
var intlNumCache = {};
function getCachedINF(locString, options) {
  const key = JSON.stringify([locString, options]);
  let inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl$1.NumberFormat(locString, options);
    intlNumCache[key] = inf;
  }
  return inf;
}
var intlRelCache = {};
function getCachedRTF(locale, options = {}) {
  const key = JSON.stringify([locale, options]);
  let inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl$1.RelativeTimeFormat(locale, options);
    intlRelCache[key] = inf;
  }
  return inf;
}
var sysLocaleCache;
function systemLocale() {
  if (!sysLocaleCache) {
    sysLocaleCache = new Intl$1.DateTimeFormat().resolvedOptions().locale;
  }
  return sysLocaleCache;
}
function parseLocaleString(localeStr) {
  const xIndex = localeStr.indexOf("-x-");
  if (xIndex !== -1) {
    localeStr = localeStr.substring(0, xIndex);
  }
  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    let selectedStr;
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
      selectedStr = localeStr;
    } catch (e) {
      const smaller = localeStr.substring(0, uIndex);
      options = getCachedDTF(smaller).resolvedOptions();
      selectedStr = smaller;
    }
    const { numberingSystem, calendar } = options;
    return [selectedStr, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    if (!localeStr.includes("-u-")) {
      localeStr += "-u";
    }
    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }
    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = DateTime.utc(2009, i, 1);
    ms.push(f(dt));
  }
  return ms;
}
function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}
function listStuff(loc, length, englishFn, intlFn) {
  const mode = loc.listingMode();
  if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
var PolyNumberFormatter = class {
  constructor(intl, forceSimple, opts) {
    const { padTo, floor } = opts, otherOpts = __rest(opts, ["padTo", "floor"]);
    this._padTo = padTo || 0;
    this._floor = floor || false;
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = Object.assign({ useGrouping: false }, opts);
      if (this._padTo > 0) {
        intlOpts.minimumIntegerDigits = padTo;
      }
      this._inf = getCachedINF(intl, intlOpts);
    }
  }
  format(i) {
    if (this._inf) {
      const fixed = this._floor ? Math.floor(i) : i;
      return this._inf.format(fixed);
    } else {
      const fixed = this._floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(fixed, this._padTo);
    }
  }
};
var PolyDateFormatter = class {
  get dtf() {
    return this._dtf;
  }
  constructor(dt, intl, opts) {
    this._opts = opts;
    let z;
    if (this._opts.timeZone) {
      this._dt = dt;
    } else if (dt.zone.type === "fixed") {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).isValid) {
        z = offsetZ;
        this._dt = dt;
      } else {
        z = "UTC";
        this._dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
        this._originalZone = dt.zone;
      }
    } else if (dt.zone.type === "system") {
      this._dt = dt;
    } else if (dt.zone.type === "iana") {
      this._dt = dt;
      z = dt.zone.name;
    } else {
      z = "UTC";
      this._dt = dt.setZone("UTC").plus({ minutes: dt.offset });
      this._originalZone = dt.zone;
    }
    const intlOpts = Object.assign(Object.assign({}, this._opts), { timeZone: this._opts.timeZone || z });
    this._dtf = getCachedDTF(intl, intlOpts);
  }
  format() {
    if (this._originalZone) {
      return this.formatToParts().map(({ value }) => value).join("");
    }
    return this.dtf.format(this._dt.toJSDate());
  }
  formatToParts() {
    const parts = this.dtf.formatToParts(this._dt.toJSDate());
    if (!!this._originalZone) {
      return parts.map((part) => {
        if (part.type === "timeZoneName") {
          const offsetName = this._originalZone.offsetName(this._dt.ts, {
            locale: this._dt.locale,
            format: this._opts.timeZoneName
          });
          return Object.assign(Object.assign({}, part), {
            // tslint:disable-next-line:no-non-null-assertion
            value: offsetName
          });
        } else {
          return part;
        }
      });
    }
    return parts;
  }
  resolvedOptions() {
    return this._dtf.resolvedOptions();
  }
};
var PolyRelFormatter = class {
  constructor(locale, isEnglish, opts) {
    this._opts = Object.assign({ style: "long" }, opts);
    if (!isEnglish && hasRelative()) {
      this._rtf = getCachedRTF(locale, opts);
    }
  }
  format(count, unit) {
    if (this._rtf) {
      return this._rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this._opts.numeric, this._opts.style !== "long");
    }
  }
  formatToParts(count, unit) {
    if (this._rtf) {
      return this._rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
};
var Locale = class _Locale {
  get fastNumbers() {
    if (this._fastNumbersCached === void 0) {
      this._fastNumbersCached = this._supportsFastNumbers();
    }
    return this._fastNumbersCached;
  }
  constructor(locale, numberingSystem, outputCalendar, weekSettings, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
    this.locale = parsedLocale;
    this.numberingSystem = numberingSystem || parsedNumberingSystem;
    this.outputCalendar = outputCalendar || parsedOutputCalendar;
    this._intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this._weekSettings = weekSettings;
    this._weekdaysCache = { format: {}, standalone: {} };
    this._monthsCache = { format: {}, standalone: {} };
    this._meridiemCache = void 0;
    this._eraCache = {};
    this._specifiedLocale = specifiedLocale;
    this._fastNumbersCached = void 0;
  }
  static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
    return new _Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
  }
  static fromObject({ locale, numberingSystem, outputCalendar, weekSettings } = {}) {
    return _Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
  }
  static fromOpts(opts) {
    return _Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.weekSettings, opts.defaultToEN);
  }
  static resetCache() {
    sysLocaleCache = void 0;
    intlLFCache = {};
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  }
  //
  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return _Locale.create(alts.locale || this._specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, validateWeekSettings(alts.weekSettings) || this._weekSettings, alts.defaultToEN || false);
    }
  }
  dtFormatter(dt, intlOptions = {}) {
    return new PolyDateFormatter(dt, this._intl, intlOptions);
  }
  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
  eras(length) {
    return listStuff(this, length, eras, (len) => {
      const intl = { era: len };
      if (!this._eraCache[len]) {
        this._eraCache[len] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
      }
      return this._eraCache[len];
    });
  }
  extract(dt, intlOptions, field) {
    const df = this.dtFormatter(dt, intlOptions), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field.toLowerCase());
    if (!matching) {
      throw new Error(`Invalid extract field ${field}`);
    }
    return matching.value;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getWeekSettings() {
    if (this._weekSettings) {
      return this._weekSettings;
    } else if (!hasLocaleWeekInfo()) {
      return FALLBACK_WEEK_SETTINGS;
    } else {
      return this._getCachedWeekInfo(this.locale);
    }
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  isEnglish() {
    return (
      // tslint:disable-next-line:no-bitwise
      !!~["en", "en-us"].indexOf(this.locale.toLowerCase()) || new Intl$1.DateTimeFormat(this._intl).resolvedOptions().locale.startsWith("en-us")
    );
  }
  listFormatter(opts = {}) {
    return getCachedLF(this._intl, opts);
  }
  // In Luxon boolean param "defaultOK" was still there, although unused
  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }
  meridiems() {
    return listStuff(
      this,
      "long",
      // arbitrary unused value
      () => meridiems,
      () => {
        if (this._meridiemCache === void 0) {
          this._meridiemCache = [
            DateTime.utc(2016, 11, 13, 9),
            DateTime.utc(2016, 11, 13, 19)
          ].map((dt) => this.extract(dt, { hour: "numeric", hourCycle: "h12" }, "dayPeriod"));
        }
        return this._meridiemCache;
      }
    );
  }
  months(length, format = false) {
    return listStuff(this, length, months, (len) => {
      const intl = format ? { month: len, day: "numeric" } : { month: len };
      const formatStr = format ? "format" : "standalone";
      if (!this._monthsCache[formatStr][len]) {
        this._monthsCache[formatStr][len] = mapMonths((dt) => this.extract(dt, intl, "month"));
      }
      return this._monthsCache[formatStr][len];
    });
  }
  numberFormatter(options = {}) {
    return new PolyNumberFormatter(this._intl, this.fastNumbers, options);
  }
  redefaultToEN(alts = {}) {
    return this.clone(Object.assign(Object.assign({}, alts), { defaultToEN: true }));
  }
  redefaultToSystem(alts = {}) {
    return this.clone(Object.assign(Object.assign({}, alts), { defaultToEN: false }));
  }
  relFormatter(options = {}) {
    return new PolyRelFormatter(this._intl, this.isEnglish(), options);
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
  weekdays(length, format = false) {
    return listStuff(this, length, weekdays, (len) => {
      const intl = format ? { weekday: len, year: "numeric", month: "long", day: "numeric" } : { weekday: len };
      const formatStr = format ? "format" : "standalone";
      if (!this._weekdaysCache[formatStr][len]) {
        this._weekdaysCache[formatStr][len] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
      }
      return this._weekdaysCache[formatStr][len];
    });
  }
  //
  _getCachedWeekInfo(locString) {
    let data = _Locale._weekInfoCache[locString];
    if (!data) {
      const locale = new Intl$1.Locale(locString);
      data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
      _Locale._weekInfoCache[locString] = data;
    }
    return data;
  }
  _supportsFastNumbers() {
    if (this.numberingSystem && this.numberingSystem !== "latn") {
      return false;
    } else {
      return this.numberingSystem === "latn" || !this.locale || this.locale.startsWith("en") || Intl$1.DateTimeFormat(this._intl).resolvedOptions().numberingSystem === "latn";
    }
  }
};
Locale._weekInfoCache = {};
var singleton$1 = null;
var FixedOffsetZone = class _FixedOffsetZone extends Zone {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton$1 === null) {
      singleton$1 = new _FixedOffsetZone(0);
    }
    return singleton$1;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this._fixed === 0 ? "Etc/UTC" : `Etc/GMT${formatOffset(-this._fixed, "narrow")}`;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return true;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return true;
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this._fixed === 0 ? "UTC" : `UTC${formatOffset(this._fixed, "narrow")}`;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  constructor(offset2) {
    super();
    this._fixed = offset2;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset2) {
    return offset2 === 0 ? _FixedOffsetZone.utcInstance : new _FixedOffsetZone(offset2);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s2) {
    if (s2) {
      const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new _FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }
    return null;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone._fixed === this._fixed;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(_ts_, format) {
    return formatOffset(this._fixed, format);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this._fixed;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
};
var InvalidZone = class _InvalidZone extends Zone {
  constructor(_zoneName) {
    super();
    this._zoneName = _zoneName;
    Object.setPrototypeOf(this, _InvalidZone.prototype);
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this._zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return false;
  }
  /** @override **/
  get isValid() {
    return false;
  }
};
var singleton = null;
var SystemZone = class _SystemZone extends Zone {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    if (singleton === null) {
      singleton = new _SystemZone();
    }
    return singleton;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  get isValid() {
    return true;
  }
};
var normalizeZone = (input, defaultZone2) => {
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "default") {
      return defaultZone2;
    } else if (lowered === "local" || lowered === "system") {
      return SystemZone.instance;
    } else if (lowered === "utc" || lowered === "gmt") {
      return FixedOffsetZone.utcInstance;
    } else {
      return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
    }
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && "offset" in input && typeof input["offset"] === "function") {
    return input;
  } else {
    return new InvalidZone(input);
  }
};
var numberingSystems = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  const intValue = parseInt(str, 10);
  if (!isNaN(intValue)) {
    return intValue;
  }
  let digits = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (str[i].search(numberingSystems.hanidec) !== -1) {
      digits += hanidecChars.indexOf(str[i]);
    } else {
      for (const key in numberingSystemsUTF16) {
        const [min, max] = numberingSystemsUTF16[key];
        if (code >= min && code <= max) {
          digits += code - min;
          break;
        }
      }
    }
  }
  return parseInt(digits, 10);
}
var digitRegexCache = {};
function resetDigitRegexCache() {
  digitRegexCache = {};
}
function digitRegex({ numberingSystem }, append = "") {
  const ns = numberingSystem || "latn";
  if (!digitRegexCache[ns]) {
    digitRegexCache[ns] = {};
  }
  if (!digitRegexCache[ns][append]) {
    digitRegexCache[ns][append] = new RegExp(`${numberingSystems[ns]}${append}`);
  }
  return digitRegexCache[ns][append];
}
var now = () => Date.now();
var defaultZone = "system";
var defaultLocale;
var defaultNumberingSystem;
var defaultOutputCalendar;
var twoDigitCutoffYear = 60;
var throwOnInvalid = false;
var defaultWeekSettings;
var Settings = class {
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   */
  static get defaultLocale() {
    return defaultLocale;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   */
  static set defaultWeekSettings(weekSettings) {
    defaultWeekSettings = validateWeekSettings(weekSettings);
  }
  static get defaultWeekSettings() {
    return defaultWeekSettings;
  }
  /**
   * [TS] had to use type Zone here. I created another setter to use a ZoneLike instead
   * Let's face it. This is ugly. The original should have this approach as well.
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   */
  static set defaultZone(zone) {
    defaultZone = zone;
  }
  /**
   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
   */
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }
  /**
   * [TS] can't use the real setter here because set and get must have the same type.
   * Let's face this. This is bullshit. But I get that you want to make life easier for users.
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   */
  static set defaultZoneLike(zone) {
    defaultZone = zone;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static set now(n2) {
    now = n2;
  }
  /**
   * Get the callback for returning the current timestamp.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static get now() {
    return now;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }
  /**
   * Get whether TSLuxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(cutoffYear) {
    twoDigitCutoffYear = cutoffYear % 100;
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return twoDigitCutoffYear;
  }
  // Methods
  /**
   * Reset TSLuxon's global caches. Should only be necessary in testing scenarios.
   */
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
    DateTime.resetCache();
    resetDigitRegexCache();
  }
};
var Invalid = class {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
    this._formattedExplanation = "";
    explanation && (this._formattedExplanation = `: ${explanation}`);
  }
  toMessage() {
    return `${this.reason}${this._formattedExplanation}`;
  }
};
var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder;
  const month0 = table.findIndex((i) => i < ordinal);
  const day = ordinal - table[month0];
  return { month: month0 + 1, day };
}
function dayOfWeek(year, month, day) {
  const d = new Date(Date.UTC(year, month - 1, day));
  if (year < 100 && year >= 0) {
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  const js = d.getUTCDay();
  return js === 0 ? 7 : js;
}
function gregorianToWeek(gregObj, minDaysInFirstWeek = FALLBACK_WEEK_SETTINGS.minimalDays, startOfWeek = FALLBACK_WEEK_SETTINGS.firstDay) {
  const { year, month, day } = gregObj;
  const ordinal = computeOrdinal(year, month, day);
  const weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
  let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
  } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return Object.assign({ weekYear, weekNumber, weekday }, timeObject(gregObj));
}
function weekToGregorian(weekData, minDaysInFirstWeek = FALLBACK_WEEK_SETTINGS.minimalDays, startOfWeek = FALLBACK_WEEK_SETTINGS.firstDay) {
  const { weekYear, weekNumber, weekday } = weekData;
  const weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek);
  const yearInDays = daysInYear(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return Object.assign({ year, month, day }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return Object.assign({ year, ordinal }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return Object.assign({ year, month, day }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.weekNumber);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  }
  return false;
}
function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  }
  return false;
}
function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  }
  return false;
}
function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  }
  return false;
}
function isoWeekdayToLocal(isoWeekday, startOfWeek) {
  return (isoWeekday - startOfWeek + 7) % 7 + 1;
}
function usesLocalWeekValues(obj, loc) {
  const hasLocaleWeekData = isDefined(obj.localWeekday) || isDefined(obj.localWeekNumber) || isDefined(obj.localWeekYear);
  if (hasLocaleWeekData) {
    const hasIsoWeekData = isDefined(obj.weekday) || isDefined(obj.weekNumber) || isDefined(obj.weekYear);
    if (hasIsoWeekData) {
      throw new ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
    }
    if (isDefined(obj.localWeekday)) {
      obj.weekday = obj.localWeekday;
    }
    if (isDefined(obj.localWeekNumber)) {
      obj.weekNumber = obj.localWeekNumber;
    }
    if (isDefined(obj.localWeekYear)) {
      obj.weekYear = obj.localWeekYear;
    }
    delete obj.localWeekday;
    delete obj.localWeekNumber;
    delete obj.localWeekYear;
    return {
      minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
      startOfWeek: loc.getStartOfWeek()
    };
  } else {
    return { minDaysInFirstWeek: FALLBACK_WEEK_SETTINGS.minimalDays, startOfWeek: FALLBACK_WEEK_SETTINGS.firstDay };
  }
}
function isDefined(o) {
  return typeof o !== "undefined";
}
function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return isNumber(o) && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl$1 !== "undefined" && !!Intl$1.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}
function hasLocaleWeekInfo() {
  try {
    return typeof Intl$1 !== "undefined" && !!Intl$1.Locale && ("weekInfo" in Intl$1.Locale.prototype || "getWeekInfo" in Intl$1.Locale.prototype);
  } catch (e) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  const bestResult = arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (compare(best[0], pair[0]) === best[0]) {
      return best;
    }
    return pair;
  }, [by(arr[0]), arr[0]]);
  return bestResult[1];
}
function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}
function validateWeekSettings(settings) {
  if (!settings) {
    return void 0;
  } else if (typeof settings !== "object") {
    throw new InvalidArgumentError("Week settings must be an object");
  } else {
    if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some((v) => !integerBetween(v, 1, 7))) {
      throw new InvalidArgumentError("Invalid week settings");
    }
    return {
      firstDay: settings.firstDay,
      minimalDays: settings.minimalDays,
      weekend: settings.weekend
    };
  }
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x, n2) {
  return x - n2 * Math.floor(x / n2);
}
function padStart(input, n2 = 2) {
  const minus = +input < 0 ? "-" : "";
  const target = minus ? +input * -1 : input;
  let result;
  if (target.toString().length < n2) {
    result = ("0".repeat(n2) + target).slice(-n2);
  } else {
    result = target.toString();
  }
  return `${minus}${result}`;
}
function parseInteger(text) {
  if (!!text) {
    return parseInt(text, 10);
  }
  return void 0;
}
function parseFloating(text) {
  if (!!text) {
    return parseFloat(text);
  }
  return void 0;
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    const f = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f);
  }
}
function roundTo(value, digits, towardZero = false) {
  const factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
  return rounder(value * factor) / factor;
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  return [31, isLeapYear(modYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
}
function objToLocalTS(obj) {
  let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
  }
  return +d;
}
function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
  const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
  return -fwdlw + minDaysInFirstWeek - 1;
}
function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
  const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
  return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else {
    return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
  }
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
  const date = new Date(ts);
  const intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone
  };
  const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts);
  const parsed = new Intl$1.DateTimeFormat(locale, modified).formatToParts(date).find((m) => m.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) {
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  }
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  return Object.keys(obj).reduce((acc, u) => {
    obj[u] !== void 0 && obj[u] !== null && (acc[normalizer(u)] = asNumber(obj[u]));
    return acc;
  }, {});
}
function formatOffset(offset2, format) {
  const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
var ORDERED_UNITS = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
var REVERSE_ORDERED_UNITS = ORDERED_UNITS.slice(0).reverse();
var HUMAN_ORDERED_UNITS = [
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
var PLURAL_MAPPING = {
  year: "year",
  years: "year",
  quarter: "quarter",
  quarters: "quarter",
  month: "month",
  months: "month",
  day: "day",
  days: "day",
  hour: "hour",
  hours: "hour",
  localweeknumber: "localWeekNumber",
  localweeknumbers: "localWeekNumber",
  localweekday: "localWeekday",
  localweekdays: "localWeekday",
  localweekyear: "localWeekYear",
  localweekyears: "localWeekYear",
  minute: "minute",
  minutes: "minute",
  second: "second",
  seconds: "second",
  millisecond: "millisecond",
  milliseconds: "millisecond",
  weekday: "weekday",
  weekdays: "weekday",
  weeknumber: "weekNumber",
  weeksnumber: "weekNumber",
  weeknumbers: "weekNumber",
  weekyear: "weekYear",
  weekyears: "weekYear",
  ordinal: "ordinal"
};
var FALLBACK_WEEK_SETTINGS = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
function stringifyTokens(splits, tokenToString) {
  let s2 = "";
  for (const token of splits) {
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
var TokenToFormatOpts = {
  /* eslint-disable @typescript-eslint/naming-convention */
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
  /* eslint-enable @typescript-eslint/naming-convention */
};
var Formatter = class _Formatter {
  constructor(locale, formatOptions) {
    this._opts = formatOptions;
    this._loc = locale;
    this._systemLoc = void 0;
  }
  static create(locale, options = {}) {
    return new _Formatter(locale, options);
  }
  static macroTokenToFormatOpts(token) {
    return TokenToFormatOpts[token];
  }
  static parseFormat(fmt) {
    let current = null, currentFull = "", bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }
    if (currentFull.length > 0) {
      splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
    }
    return splits;
  }
  dtFormatter(dt, opts = {}) {
    return this._loc.dtFormatter(dt, Object.assign(Object.assign({}, this._opts), opts));
  }
  formatDateTime(dt, opts) {
    return this.dtFormatter(dt, opts).format();
  }
  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this._loc.listingMode() === "en", useDateTimeFormatter = this._loc.outputCalendar && this._loc.outputCalendar !== "gregory", string = (opts, extract) => this._loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({ hour: "numeric", hourCycle: "h12" }, "dayPeriod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" }, "weekday"), maybeMacro = (token) => {
      const formatOpts = _Formatter.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
      switch (token) {
        case "S":
          return this.num(dt.millisecond);
        case "u":
        case "SSS":
          return this.num(dt.millisecond, 3);
        case "s":
          return this.num(dt.second);
        case "ss":
          return this.num(dt.second, 2);
        case "uu":
          return this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(dt.millisecond / 100));
        case "m":
          return this.num(dt.minute);
        case "mm":
          return this.num(dt.minute, 2);
        case "h":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return this.num(dt.hour);
        case "HH":
          return this.num(dt.hour, 2);
        case "Z":
          return formatOffset2({ format: "narrow", allowZ: this._opts.allowZ });
        case "ZZ":
          return formatOffset2({ format: "short", allowZ: this._opts.allowZ });
        case "ZZZ":
          return formatOffset2({ format: "techie", allowZ: this._opts.allowZ });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "short", locale: this._loc.locale }) || "";
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "long", locale: this._loc.locale }) || "";
        case "z":
          return dt.zoneName || "";
        case "a":
          return meridiem();
        case "d":
          return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
        case "c":
          return this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        case "E":
          return this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        case "L":
          return useDateTimeFormatter ? string({ month: "numeric", day: "numeric" }, "month") : this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({ month: "2-digit", day: "numeric" }, "month") : this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        case "M":
          return useDateTimeFormatter ? string({ month: "numeric" }, "month") : this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({ month: "2-digit" }, "month") : this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        case "y":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({ year: "2-digit" }, "year") : this.num(parseInt(dt.year.toString().slice(-2), 10), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 6);
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return this.num(parseInt(dt.weekYear.toString().slice(-2), 10), 2);
        case "kkkk":
          return this.num(dt.weekYear, 4);
        case "W":
          return this.num(dt.weekNumber);
        case "WW":
          return this.num(dt.weekNumber, 2);
        case "o":
          return this.num(dt.ordinal);
        case "ooo":
          return this.num(dt.ordinal, 3);
        case "q":
          return this.num(dt.quarter);
        case "qq":
          return this.num(dt.quarter, 2);
        case "X":
          return this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(_Formatter.parseFormat(fmt), tokenToString);
  }
  formatDateTimeParts(dt, opts) {
    return this.dtFormatter(dt, opts).formatToParts();
  }
  formatDurationFromString(dur, format) {
    const tokenToField = (token) => {
      switch (token[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return void 0;
      }
    };
    const tokenToString = (lildur) => (token) => {
      const mapped = tokenToField(token);
      if (mapped) {
        return this.num(lildur.get(mapped), token.length);
      } else {
        return token;
      }
    };
    const tokens = _Formatter.parseFormat(format);
    const realTokens = tokens.reduce((found, { literal, val }) => literal ? found : found.concat(val), []);
    const collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => !!t));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
  formatInterval(interval, opts = {}) {
    if (!interval.isValid) {
      throw Error("Invalid Interval provided!");
    }
    const df = this.dtFormatter(interval.start, opts);
    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
  }
  formatWithSystemDefault(dt, opts) {
    if (this._systemLoc === void 0) {
      this._systemLoc = this._loc.redefaultToSystem();
    }
    const df = this._systemLoc.dtFormatter(dt, Object.assign(Object.assign({}, this._opts), opts));
    return df.format();
  }
  num(n2, p = 0) {
    if (this._opts.forceSimple) {
      return padStart(n2, p);
    }
    const opts = Object.assign({}, this._opts);
    if (p > 0) {
      opts.padTo = p;
    }
    return this._loc.numberFormatter(opts).format(n2);
  }
  resolvedOptions(dt, opts = {}) {
    return this.dtFormatter(dt, opts).resolvedOptions();
  }
};
function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
  return (m) => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
    const [val, zone, next] = ex(m, cursor);
    return [Object.assign(Object.assign({}, mergedVals), val), zone || mergedZone, next];
  }, [{}, null, 1]).slice(0, 2);
}
function parse(s2, ...patterns) {
  if (s2 === void 0 || s2 === null) {
    return [null, null];
  }
  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s2);
    if (!!m) {
      return extractor(m);
    }
  }
  return [null, null];
}
function simpleParse(...keys) {
  return (match2, cursor) => {
    const ret = {};
    let i;
    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match2[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}
var IANA_REGEX = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
var isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${IANA_REGEX.source})\\])?)?`;
var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
var isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
var isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekday");
var extractISOOrdinalData = simpleParse("year", "ordinal");
var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
var sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${IANA_REGEX.source}))?`);
var sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match2, pos, fallback) {
  return isUndefined(match2[pos]) ? fallback : parseInteger(match2[pos]);
}
function extractISOYmd(match2, cursor) {
  const item = {
    year: int(match2, cursor, 0),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  const item = {
    hour: int(match2, cursor, 0),
    minute: int(match2, cursor + 1, 0),
    second: int(match2, cursor + 2, 0),
    millisecond: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
var isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
var isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function extractISODuration(match2) {
  const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
  const hasNegativePrefix = s2.startsWith("-");
  const negativeSeconds = !!secondStr && secondStr.startsWith("-");
  const maybeNegate = (num, force = false) => typeof num === "number" && (force || num && hasNegativePrefix) ? -num : num;
  return [{
    years: maybeNegate(parseFloating(yearStr)),
    months: maybeNegate(parseFloating(monthStr)),
    weeks: maybeNegate(parseFloating(weekStr)),
    days: maybeNegate(parseFloating(dayStr)),
    hours: maybeNegate(parseFloating(hourStr)),
    minutes: maybeNegate(parseFloating(minuteStr)),
    seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
  }];
}
var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  let weekday;
  if (weekdayStr) {
    weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  const year = yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr);
  return {
    year,
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr),
    second: parseInteger(secondStr),
    weekday
  };
}
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  let offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
var rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseHTTPDate(s2) {
  return parse(s2, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODate(s2) {
  return parse(s2, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, combineExtractors(extractISOTime)]);
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s2) {
  return parse(s2, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}
var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
};
var casualMatrix = Object.assign({ years: {
  quarters: 4,
  months: 12,
  weeks: 52,
  days: 365,
  hours: 365 * 24,
  minutes: 365 * 24 * 60,
  seconds: 365 * 24 * 60 * 60,
  milliseconds: 365 * 24 * 60 * 60 * 1e3
}, quarters: {
  months: 3,
  weeks: 13,
  days: 91,
  hours: 91 * 24,
  minutes: 91 * 24 * 60,
  seconds: 91 * 24 * 60 * 60,
  milliseconds: 91 * 24 * 60 * 60 * 1e3
}, months: {
  weeks: 4,
  days: 30,
  hours: 30 * 24,
  minutes: 30 * 24 * 60,
  seconds: 30 * 24 * 60 * 60,
  milliseconds: 30 * 24 * 60 * 60 * 1e3
} }, lowOrderMatrix);
var daysInYearAccurate = 146097 / 400;
var daysInMonthAccurate = 146097 / 4800;
var accurateMatrix = Object.assign({ years: {
  quarters: 4,
  months: 12,
  weeks: daysInYearAccurate / 7,
  days: daysInYearAccurate,
  hours: daysInYearAccurate * 24,
  minutes: daysInYearAccurate * 24 * 60,
  seconds: daysInYearAccurate * 24 * 60 * 60,
  milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
}, quarters: {
  months: 3,
  weeks: daysInYearAccurate / 28,
  days: daysInYearAccurate / 4,
  hours: daysInYearAccurate * 24 / 4,
  minutes: daysInYearAccurate * 24 * 60 / 4,
  seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
  milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
}, months: {
  weeks: daysInMonthAccurate / 7,
  days: daysInMonthAccurate,
  hours: daysInMonthAccurate * 24,
  minutes: daysInMonthAccurate * 24 * 60,
  seconds: daysInMonthAccurate * 24 * 60 * 60,
  milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
} }, lowOrderMatrix);
function durationToMillis(matrix, vals) {
  var _a;
  let sum = (_a = vals.milliseconds) !== null && _a !== void 0 ? _a : 0;
  for (const unit of REVERSE_ORDERED_UNITS.slice(1)) {
    if (vals[unit]) {
      sum += vals[unit] * matrix[unit]["milliseconds"];
    }
  }
  return sum;
}
function eq(v1, v2) {
  if (v1 === void 0 || v1 === 0) {
    return v2 === void 0 || v2 === 0;
  }
  return v1 === v2;
}
function normalizeValues(matrix, vals) {
  const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
  REVERSE_ORDERED_UNITS.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const previousVal = vals[previous] * factor;
        const conv = matrix[current][previous];
        const rollUp = Math.floor(previousVal / conv);
        vals[current] += rollUp * factor;
        vals[previous] -= rollUp * conv * factor;
      }
      return current;
    } else {
      return previous;
    }
  }, null);
  ORDERED_UNITS.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const fraction = vals[previous] % 1;
        vals[previous] -= fraction;
        vals[current] += fraction * matrix[previous][current];
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
function removeZeroes(vals = {}) {
  return Object.entries(vals).reduce((acc, [key, value]) => {
    if (value !== 0) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
var Duration = class _Duration {
  static get _INVALID() {
    return "Invalid Duration";
  }
  /**
   * Returns the conversion system to use
   * @type {ConversionAccuracy}
   */
  get conversionAccuracy() {
    return this._conversionAccuracy;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this._values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this._values.hours || 0 : NaN;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this._invalid ? this._invalid.explanation : null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this._invalid ? this._invalid.reason : null;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this._invalid === null;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this._loc.locale : void 0;
  }
  /**
   * Get the conversion matrix of a Duration
   * @type {ConversionMatrix}
   */
  get matrix() {
    return this._matrix;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this._values.milliseconds || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this._values.minutes || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this._values.months || 0 : NaN;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {NumberingSystem}
   */
  get numberingSystem() {
    return this.isValid ? this._loc.numberingSystem : void 0;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this._values.quarters || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this._values.seconds || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this._values.weeks || 0 : NaN;
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this._values.years || 0 : NaN;
  }
  /**
   * @private
   */
  constructor(config2) {
    const accurate = config2.conversionAccuracy === "longterm" || false;
    let matrix, conversionAccuracy;
    if (accurate) {
      conversionAccuracy = "longterm";
      matrix = accurateMatrix;
    } else {
      conversionAccuracy = "casual";
      matrix = casualMatrix;
    }
    if (config2.matrix) {
      matrix = config2.matrix;
    }
    this._values = config2.values || {};
    this._loc = config2.loc || Locale.create();
    this._conversionAccuracy = conversionAccuracy;
    this._invalid = config2.invalid || null;
    this._matrix = matrix;
    this._isLuxonDuration = true;
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return _Duration.fromMillis(durationLike);
    } else if (_Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return _Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
    }
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = parseISODuration(text);
    if (parsed) {
      return _Duration.fromObject(parsed, opts);
    } else {
      return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(text, opts = {}) {
    const [parsed] = parseISOTimeOnly(text);
    if (parsed) {
      return _Duration.fromObject(parsed, opts);
    } else {
      return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} milliseconds of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(milliseconds, opts = {}) {
    return _Duration.fromObject({ milliseconds }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
    }
    return new _Duration({
      values: normalizeObject(obj, _Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy,
      matrix: opts.matrix
    });
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new _Duration({ invalid });
    }
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {Object} o
   * @return {boolean}
   */
  static isDuration(o) {
    return !!o && o._isLuxonDuration || false;
  }
  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      localWeekNumber: "localWeekNumbers",
      localWeekYear: "localWeekYears",
      localWeekday: "localWeekdays",
      localWeekNumbers: "localWeekNumbers",
      localWeekYears: "localWeekYears",
      localWeekdays: "localWeekdays",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit];
    if (!normalized) {
      throw new InvalidUnitError(unit);
    }
    return normalized;
  }
  // PUBLIC INSTANCE
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Duration { values: ${JSON.stringify(this._values)} }`;
    } else {
      return `Duration { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.shiftTo(unit).get(unit);
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    if (!this._loc.equals(other._loc)) {
      return false;
    }
    for (const u of ORDERED_UNITS) {
      if (!eq(this._values[u], other._values[u])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(unit) {
    return this[_Duration.normalizeUnit(unit)];
  }
  getMaxUnit(onlyHuman = false) {
    const refUnits = onlyHuman ? HUMAN_ORDERED_UNITS : ORDERED_UNITS;
    const val = this.shiftTo(...refUnits).toObject();
    return refUnits.find((k) => (val[k] || 0) > 0) || REVERSE_ORDERED_UNITS[0];
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid) {
      return this;
    }
    const result = {};
    Object.keys(this._values).forEach((unit) => {
      result[unit] = asNumber(fn(this._values[unit], unit));
    });
    return this._clone(this, { values: result }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object} duration - The amount to subtract. Either a Luxon Duration or the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) {
      return this;
    }
    const dur = _Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) {
      return this;
    }
    const negated = {};
    Object.keys(this._values).forEach((unit) => {
      negated[unit] = this._values[unit] === 0 ? 0 : -this._values[unit];
    });
    return this._clone(this, { values: negated }, true);
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) {
      return this;
    }
    const vals = this.toObject();
    normalizeValues(this._matrix, vals);
    return this._clone(this, { values: vals }, true);
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object} duration - The amount to add. Either a Luxon Duration or the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) {
      return this;
    }
    const dur = _Duration.fromDurationLike(duration), result = {};
    ORDERED_UNITS.forEach((unit) => {
      if (dur._values[unit] !== void 0 || this._values[unit] !== void 0) {
        result[unit] = dur.get(unit) + this.get(unit);
      }
    });
    return this._clone(this, { values: result }, true);
  }
  /**
   * "Set" the locale and/or numberingSystem and/or conversionAccuracy. Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
    const loc = this._loc.clone({ locale, numberingSystem });
    const opts = { loc, matrix, conversionAccuracy };
    return this._clone(this, opts);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) {
      return this;
    }
    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
    return this._clone(this, { values: vals }, true);
  }
  /**
   * "Set" the values of specified units. Non-specified units stay unchanged. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid) {
      return this;
    }
    const mixed = Object.assign(Object.assign({}, this._values), normalizeObject(values, _Duration.normalizeUnit));
    return this._clone(this, { values: mixed });
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid || units.length === 0) {
      return this;
    }
    units = units.map((u) => _Duration.normalizeUnit(u));
    const built = {}, accumulated = {}, vals = this.toObject();
    let lastUnit;
    ORDERED_UNITS.forEach((k) => {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        let own = 0;
        Object.keys(accumulated).forEach((ak) => {
          own += this._matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        });
        if (isNumber(vals[k])) {
          own += vals[k];
        }
        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    });
    Object.keys(accumulated).forEach((key) => {
      const v = accumulated[key];
      if (v !== 0) {
        built[lastUnit] += key === lastUnit ? v : v / this._matrix[lastUnit][key];
      }
    });
    return this._clone(this, { values: built }, true).normalize();
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    if (!this.isValid) {
      return this;
    }
    return this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds");
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations' conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(fmt, opts = { floor: true }) {
    const fmtOpts = Object.assign(Object.assign({}, opts), { floor: opts.round !== false && opts.floor !== false });
    return this.isValid ? Formatter.create(this._loc, fmtOpts).formatDurationFromString(this, fmt) : _Duration._INVALID;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(opts = {}) {
    if (!this.isValid) {
      return _Duration._INVALID;
    }
    const maxUnit = this.getMaxUnit(true);
    const refUnits = !!opts.onlyHumanUnits ? HUMAN_ORDERED_UNITS : ORDERED_UNITS;
    const shifted = this.shiftTo(...refUnits.slice(refUnits.indexOf(maxUnit)));
    const shiftedValues = shifted.toObject();
    const l2 = refUnits.map((unit) => {
      const val = shiftedValues[unit];
      if (isUndefined(val) || val === 0) {
        return null;
      }
      return this._loc.numberFormatter(Object.assign(Object.assign({ style: "unit", unitDisplay: "long" }, opts), { unit: unit.slice(0, -1) })).format(val);
    }).filter((n2) => n2);
    const mergedOpts = Object.assign({ type: "conjunction", style: opts.listStyle || "narrow" }, opts);
    return this._loc.listFormatter(mergedOpts).format(l2);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) {
      return null;
    }
    let s2 = "P";
    if (this.years !== 0) {
      s2 += this.years + "Y";
    }
    if (this.months !== 0 || this.quarters !== 0) {
      s2 += this.months + this.quarters * 3 + "M";
    }
    if (this.weeks !== 0) {
      s2 += this.weeks + "W";
    }
    if (this.days !== 0) {
      s2 += this.days + "D";
    }
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) {
      s2 += "T";
    }
    if (this.hours !== 0) {
      s2 += this.hours + "H";
    }
    if (this.minutes !== 0) {
      s2 += this.minutes + "M";
    }
    if (this.seconds !== 0 || this.milliseconds !== 0) {
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    }
    if (s2 === "P") {
      s2 += "T0S";
    }
    return s2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    const millis = this.toMillis();
    if (millis < 0 || millis >= 864e5) {
      return null;
    }
    opts = Object.assign(Object.assign({ suppressMilliseconds: false, suppressSeconds: false, includePrefix: false, format: "extended" }, opts), { includeOffset: false });
    const dateTime = DateTime.fromMillis(millis, { zone: "UTC" });
    return dateTime.toISOTime(opts);
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns the value of this Duration in milliseconds.
   * @return {number}
   */
  toMillis() {
    if (!this.isValid) {
      return NaN;
    }
    return durationToMillis(this.matrix, this._values);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    if (!this.isValid) {
      return {};
    }
    return Object.assign({}, this._values);
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * @private
   */
  // clone really means "create another instance just like this one, but with these changes"
  _clone(dur, alts, clear = false) {
    const conf = {
      values: clear ? alts.values : Object.assign(Object.assign({}, dur._values), alts.values || {}),
      loc: dur._loc.clone(alts.loc),
      conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
      matrix: alts.matrix || dur.matrix
    };
    return new _Duration(conf);
  }
};
var INVALID$1 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
  }
}
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
  }
}
var Interval = class _Interval {
  /**
   * Returns the end of the Interval
   */
  get end() {
    return this.isValid ? this._e : null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   */
  get invalidReason() {
    return this._invalid ? this._invalid.reason : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns the start of the Interval
   */
  get start() {
    return this.isValid ? this._s : null;
  }
  /**
   * @private
   */
  constructor(config2) {
    this._s = config2.start;
    this._e = config2.end;
    this._invalid = config2.invalid || null;
    this._isLuxonInterval = true;
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object} duration - the length of the Interval, as a Duration object.
   */
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return new _Interval({
      start: dt,
      end: dt ? dt.plus(dur) : void 0
    });
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object} duration - the length of the Interval, as a Duration object.
   */
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return new _Interval({
      start: dt ? dt.minus(dur) : void 0,
      end: dt
    });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   */
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    const validateError = validateStartEnd(builtStart, builtEnd);
    return validateError || new _Interval({
      start: builtStart,
      end: builtEnd
    });
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   */
  static fromISO(text, opts = {}) {
    const [s2, e] = (text || "").split("/", 2);
    if (s2 && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e2) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e2) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return _Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return _Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s2, opts);
        if (dur.isValid) {
          return _Interval.before(end, dur);
        }
      }
    }
    return _Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   */
  static invalid(reason, explanation) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new _Interval({ invalid });
    }
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {Object} o
   */
  static isInterval(o) {
    return !!o && o._isLuxonInterval || false;
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Interval[]} intervals
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a._s.valueOf() - b._s.valueOf()).reduce(([sofar, current], item) => {
      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]);
    if (final) {
      found.push(final);
    }
    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Interval[]} intervals
   * @return {Interval[]}
   */
  static xor(intervals) {
    let start = null, currentCount = 0;
    const results = [], ends = intervals.map((i) => [
      { time: i._s, type: "s" },
      { time: i._e, type: "e" }
    ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => +a.time - +b.time);
    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && start.valueOf() !== i.time.valueOf()) {
          results.push(_Interval.fromDateTimes(start, i.time));
        }
        start = null;
      }
    }
    return _Interval.merge(results);
  }
  // PUBLIC INSTANCE
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Interval { start: ${this._s.toISO()}, end: ${this._e.toISO()} }`;
    } else {
      return `Interval { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    return +other._e === +this._s;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    return +this._e === +other._s;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    return this._s <= dateTime && this._e > dateTime;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   */
  count(unit = "milliseconds", opts) {
    if (!this.isValid) {
      return NaN;
    }
    const start = this.start.startOf(unit, opts);
    let end;
    if (opts === null || opts === void 0 ? void 0 : opts.useLocaleWeeks) {
      end = this.end.reconfigure({ locale: start.locale });
    } else {
      end = this.end;
    }
    end = end.startOf(unit, opts);
    return Math.floor(end.diff(start, unit).get(unit)) + +(end.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns Intervals representing the span(s) of time in this Interval that don't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Interval[]}
   */
  difference(...intervals) {
    return _Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Interval[]}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) {
      return [];
    }
    return this.splitBy({ milliseconds: this.length() / numberOfParts }).slice(0, numberOfParts);
  }
  /**
   * Returns true if this Interval fully contains the specified Interval,
   * specifically if the intersection (of this Interval and the other Interval) is equal to the other Interval;
   * false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) {
      return false;
    }
    return this._s <= other._s && this._e >= other._e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    return this._s.equals(other._s) && this._e.equals(other._e);
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this._e.minus(1).hasSame(this._s, unit) : false;
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval|null}
   */
  intersection(other) {
    if (!this.isValid) {
      return this;
    }
    const s2 = this._s > other._s ? this._s : other._s, e = this._e < other._e ? this._e : other._e;
    if (s2 >= e) {
      return null;
    } else {
      return _Interval.fromDateTimes(s2, e);
    }
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) {
      return false;
    }
    return this._s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) {
      return false;
    }
    return this._e <= dateTime;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this._s.valueOf() === this._e.valueOf();
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} [unit='milliseconds'] - the unit (such as 'hours' or 'days') to return the length in.
   */
  length(unit = "milliseconds") {
    return this.toDuration(unit).get(unit);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return _Interval.fromDateTimes(mapFn(this._s), mapFn(this._e));
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this._e > other._s && this._s < other._e;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) {
      return this;
    }
    return _Interval.fromDateTimes(start || this._s, end || this._e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...[DateTime]} dateTimes - the unit of time to count.
   * @return {Interval[]}
   */
  splitAt(...dateTimes) {
    const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort((a, b) => a.toMillis() - b.toMillis());
    const results = [];
    let s2 = this._s, i = 0;
    while (s2 < this._e) {
      const added = sorted[i] || this._e;
      const next = +added > +this._e ? this._e : added;
      results.push(_Interval.fromDateTimes(s2, next));
      s2 = next;
      i += 1;
    }
    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object} duration - The length of each resulting interval, as a Duration object.
   * @return {Interval[]}
   */
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    let s2 = this._s, idx = 1, next;
    const results = [];
    while (s2 < this._e) {
      const added = this.start.plus(dur.mapUnits((x) => x * idx));
      next = +added > +this._e ? this._e : added;
      results.push(_Interval.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit = "milliseconds", opts = {}) {
    if (!this.isValid) {
      return Duration.invalid(this._invalid.reason);
    }
    return this._e.diff(this._s, unit, opts);
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(dateFormat, { separator = " - " } = {}) {
    if (!this.isValid) {
      return INVALID$1;
    }
    return `${this._s.toFormat(dateFormat)}${separator}${this._e.toFormat(dateFormat)}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} options - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(options = {}) {
    if (!this.isValid) {
      return INVALID$1;
    }
    return `${this._s.toISO(options)}/${this._e.toISO(options)}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid) {
      return INVALID$1;
    }
    return `${this._s.toISODate()}/${this._e.toISODate()}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} options - The same options as {@link DateTime#toISO}
   * @return {string}
   *
   */
  toISOTime(options = {}) {
    if (!this.isValid) {
      return INVALID$1;
    }
    return `${this._s.toISOTime(options)}/${this._e.toISOTime(options)}`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this._s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) {
      return INVALID$1;
    }
    return `[${this._s.toISO()} – ${this._e.toISO()})`;
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) {
      return this;
    }
    const s2 = this._s < other._s ? this._s : other._s, e = this._e > other._e ? this._e : other._e;
    return _Interval.fromDateTimes(s2, e);
  }
};
var Info = class {
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} options - options
   * @param {string} [options.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {string[]}
   */
  static eras(length = "short", { locale } = {}) {
    return Locale.create(locale, void 0, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { relative: false }
   */
  static features() {
    return { relative: hasRelative(), localeWeek: hasLocaleWeekInfo() };
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   */
  static getMinimumDaysInFirstWeek({ locale, locObj } = {}) {
    return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale, locObj } = {}) {
    return (locObj || Locale.create(locale)).getStartOfWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale, locObj } = {}) {
    return (locObj || Locale.create(locale)).getWeekendDays().slice();
  }
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });
    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} options - options
   * @param {string} [options.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {string[]}
   */
  static meridiems({ locale } = {}) {
    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {string[]}
   */
  static months(length = "long", { locale = null, locObj = null, numberingSystem = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info.months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locObj] - an existing locale object to use
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem] - the numbering system
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {string[]}
   */
  static monthsFormat(length = "long", { locale, locObj, numberingSystem, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid IANA time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is the string "system", the system's time zone is returned.
   * * If `input` is the string "default", the default time zone, as defined in
   *   Settings.defaultZone is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj] - an existing locale object to use
   * @param {string} [opts.numberingSystem] - the numbering system
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {string[]}
   */
  static weekdays(length = "long", { locale, locObj, numberingSystem } = {}) {
    return (locObj || Locale.create(locale, numberingSystem)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} options - options
   * @param {string} [options.locale] - the locale code
   * @param {string} [options.numberingSystem] - the numbering system
   * @return {string[]}
   */
  static weekdaysFormat(length = "long", { locale, locObj, numberingSystem } = {}) {
    return (locObj || Locale.create(locale, numberingSystem)).weekdays(length, true);
  }
};
function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("days").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }
    ],
    ["days", dayDiff]
  ];
  const results = {};
  const earlier = cursor;
  let lowestOrder, highWater;
  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;
      results[unit] = differ(cursor, later);
      highWater = earlier.plus(results);
      if (highWater > later) {
        results[unit]--;
        cursor = earlier.plus(results);
        if (cursor > later) {
          highWater = cursor;
          results[unit]--;
          cursor = earlier.plus(results);
        }
      } else {
        cursor = highWater;
      }
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
var diff = (earlier, later, units, opts) => {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
  const remainingMillis = +later - +cursor;
  const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (+highWater - +cursor);
    }
  }
  const duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
};
var missingFtp = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i) => i) {
  return { regex, deser: ([s2]) => post(parseDigits(s2)) };
}
var spaceOrNBSPPattern = `[ ${String.fromCharCode(160)}]`;
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSPPattern, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSPPattern);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  return {
    regex: RegExp(strings.map(fixListRegex).join("|")),
    deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
  };
}
function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
}
function simple(regex) {
  return { regex, deser: ([s2]) => s2 };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({
    regex: RegExp(escapeToken(t.val)),
    deser: ([s2]) => s2,
    literal: true
  }), unitate = (t) => {
    if (token.literal) {
      return literal(t);
    }
    switch (t.val) {
      case "G":
        return oneOf(loc.eras("short"), 0);
      case "GG":
        return oneOf(loc.eras("long"), 0);
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true), 1);
      case "MMMM":
        return oneOf(loc.months("long", true), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false), 1);
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "a":
        return oneOf(loc.meridiems(), 0);
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true), 1);
      case "Z":
      case "ZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
      case "ZZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      default:
        return literal(t);
    }
  };
  const unit = unitate(token) || {
    invalidReason: missingFtp
  };
  return Object.assign(Object.assign({}, unit), { token });
}
var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function tokenForPart(part, formatOpts, resolvedOpts) {
  const { type, value } = part;
  if (type === "literal") {
    const isSpace = /^\s+$/.test(value);
    return {
      literal: !isSpace,
      val: isSpace ? " " : value
    };
  }
  const style2 = formatOpts[type];
  let actualType = type;
  if (type === "hour") {
    if (formatOpts.hour12 != null) {
      actualType = formatOpts.hour12 ? "hour12" : "hour24";
    } else if (formatOpts.hourCycle != null) {
      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
        actualType = "hour12";
      } else {
        actualType = "hour24";
      }
    } else {
      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
    }
  }
  let val = partTypeStyleToTokenVal[actualType];
  if (typeof val === "object") {
    val = val[style2];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}
function match(input, regex, handlers) {
  const matches = regex.exec(input);
  const all = {};
  if (matches !== null) {
    let matchIndex = 1;
    handlers.forEach((h) => {
      const groups = h.groups ? h.groups + 1 : 1;
      if (!h.literal) {
        all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
      }
      matchIndex += groups;
    });
  }
  return [matches, all];
}
function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let zone = null;
  let specificOffset;
  if (isDefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (isDefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(+matches.Z);
    }
    specificOffset = +matches.Z;
  }
  if (isDefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (isDefined(matches.h)) {
    if (+matches.h < 12 && matches.a === 1) {
      matches.h = matches.h + 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (isDefined(matches.u)) {
    matches.S = parseMillis(matches.u) || 0;
  }
  const values = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }
    return r;
  }, {});
  return [values, zone, specificOffset];
}
var dummyDateTimeCache;
function getDummyDateTime(locale) {
  if (dummyDateTimeCache === void 0) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555, {
      locale: locale.locale
    });
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  const tokens = formatOptsToTokens(formatOpts, locale);
  if (tokens == null || tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
}
var TokenParser = class {
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  constructor(locale, format) {
    this.locale = locale;
    this.format = format;
    this._mapTokens();
  }
  explainFromTokens(input) {
    if (!this.isValid) {
      return { input, tokens: this.tokens, invalidReason: this.invalidReason };
    } else {
      const [rawMatches, matches] = match(input, this.regex, this.handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
      if (matches.hasOwnProperty("a") && matches.hasOwnProperty("H")) {
        throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
      }
      return {
        input,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches,
        matches,
        result,
        zone,
        specificOffset
      };
    }
  }
  _mapTokens() {
    this.tokens = expandMacroTokens(Formatter.parseFormat(this.format), this.locale);
    const units = this.tokens.map((t) => unitForToken(t, this.locale));
    this.disqualifyingUnit = units.find((t) => t.invalidReason);
    this.units = units.filter((u) => !u.invalidReason);
    if (!this.disqualifyingUnit) {
      const [regexString, handlers] = buildRegex(this.units);
      this.regex = RegExp(regexString, "i");
      this.handlers = handlers;
    }
  }
};
function explainFromTokens(locale, input, format) {
  const parser = new TokenParser(locale, format);
  return parser.explainFromTokens(input);
}
function sanitizeSpaces(input) {
  return input.replace(/\u202F/g, " ");
}
function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, sanitizeSpaces(input), sanitizeSpaces(format));
  return [result, zone, specificOffset, invalidReason];
}
function formatOptsToTokens(formatOpts, locale) {
  if (!formatOpts) {
    return null;
  }
  const formatter = Formatter.create(locale, formatOpts);
  const df = formatter.dtFormatter(getDummyDateTime(locale));
  const parts = df.formatToParts();
  const resolvedOpts = df.resolvedOptions();
  return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
}
var INVALID = "Invalid DateTime";
var MAX_DATE = 864e13;
function fixOffset(localTS, o, tz) {
  let utcGuess = localTS - o * 60 * 1e3;
  const o2 = tz.offset(utcGuess);
  if (o === o2) {
    return [utcGuess, o];
  }
  utcGuess -= (o2 - o) * 60 * 1e3;
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }
  return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  const d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
    const interpretationZone = parsedZone || zone;
    const inst = DateTime.fromObject(parsed || void 0, Object.assign(Object.assign({}, opts), { zone: interpretationZone, specificOffset }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`));
  }
}
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
var defaultUnitValues = {
  year: 0,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var orderedUnits = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
var orderedWeekUnits = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
];
var orderedOrdinalUnits = [
  "year",
  "ordinal",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function normalizeUnit(unit) {
  const normalized = PLURAL_MAPPING[unit.toLowerCase()];
  if (!normalized) {
    throw new InvalidUnitError(unit);
  }
  return normalized;
}
var DateTime = class _DateTime {
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   */
  get day() {
    return this.isValid ? this._c.day : NaN;
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   */
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   */
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   */
  get hour() {
    return this.isValid ? this._c.hour : NaN;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   */
  get invalidExplanation() {
    return this._invalid ? this._invalid.explanation : void 0;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   */
  get invalidReason() {
    return this._invalid ? this._invalid.reason : void 0;
  }
  /**
   * Get whether the DateTime is in a DST.
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   */
  get isInLeapYear() {
    return isLeapYear(this.year);
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   */
  get isValid() {
    return this._invalid === null;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get a clone of the Locale instance of a DateTime.
   */
  get loc() {
    return this.isValid ? this._loc.clone() : void 0;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   */
  get localWeekNumber() {
    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   */
  get localWeekYear() {
    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekYear : NaN;
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   */
  get localWeekday() {
    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekday : NaN;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   */
  get locale() {
    return this.isValid ? this._loc.locale : void 0;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   */
  get millisecond() {
    return this.isValid ? this._c.millisecond : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   */
  get minute() {
    return this.isValid ? this._c.minute : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   */
  get month() {
    return this.isValid ? this._c.month : NaN;
  }
  /**
   * Get the human-readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   */
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this._loc })[this.month - 1] : null;
  }
  /**
   * Get the human-readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   */
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this._loc })[this.month - 1] : null;
  }
  /**
   * Get the numbering system of a DateTime, such as "beng". The numbering system is used when formatting the DateTime
   */
  get numberingSystem() {
    return this.isValid ? this._loc.numberingSystem : void 0;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   */
  get offset() {
    return this.isValid ? +this._o : NaN;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   */
  get offsetNameLong() {
    if (!this.isValid) {
      return null;
    }
    return this.zone.offsetName(this._ts, {
      format: "long",
      locale: this.locale
    });
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   */
  get offsetNameShort() {
    if (!this.isValid) {
      return null;
    }
    return this.zone.offsetName(this._ts, {
      format: "short",
      locale: this.locale
    });
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   */
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this._c).ordinal : NaN;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   */
  get outputCalendar() {
    return this.isValid ? this._loc.outputCalendar : void 0;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   */
  get quarter() {
    return this.isValid ? Math.ceil(this._c.month / 3) : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   */
  get second() {
    return this.isValid ? this._c.second : NaN;
  }
  /**
   * Get the timestamp.
   * @example DateTime.local(1970, 1, 1, 0, 0, 0, 654).ts //=> 654
   */
  get ts() {
    return this._ts;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   */
  get weekNumber() {
    return this.isValid ? this._possiblyCachedWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   */
  get weekYear() {
    return this.isValid ? this._possiblyCachedWeekData(this).weekYear : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   */
  get weekday() {
    return this.isValid ? this._possiblyCachedWeekData(this).weekday : NaN;
  }
  /**
   * Get the human-readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   */
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this._loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human-readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   */
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this._loc })[this.weekday - 1] : null;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? weeksInWeekYear(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   */
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   */
  get year() {
    return this.isValid ? this._c.year : NaN;
  }
  /**
   * Get the time zone associated with this DateTime.
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * @access private
   */
  constructor(config2) {
    const zone = config2.zone || Settings.defaultZone;
    let invalid = config2.invalid || // invalid timestamp can happen when using plus or minus with 1E8 days resulting in overflows
    (Number.isNaN(config2.ts) ? new Invalid("invalid timestamp") : null) || (!zone.isValid ? _DateTime._unsupportedZone(zone) : null);
    this._ts = isUndefined(config2.ts) ? Settings.now() : config2.ts;
    let o, c;
    if (!invalid) {
      const unchanged = !!config2.old && config2.old.ts === this._ts && config2.old.zone.equals(zone);
      if (unchanged) {
        [c, o] = [config2.old.c, config2.old.o];
      } else {
        const ot = isNumber(config2.o) && !config2.old ? config2.o : zone.offset(this.ts);
        c = tsToObj(this._ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? void 0 : c;
        o = invalid ? void 0 : ot;
      }
    }
    this._zone = zone;
    this._loc = config2.loc || Locale.create();
    this._invalid = invalid;
    this._weekData = null;
    this._c = c;
    this._o = o;
    this._isLuxonDateTime = true;
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return new TokenParser(localeToUse, fmt);
  }
  /**
   * Produce the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   */
  static expandFormat(fmt, localeOpts = {}) {
    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
    return expanded.map((t) => t.val).join("");
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone="local"] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   */
  static fromFormat(text, fmt, opts = {}) {
    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    const { locale, numberingSystem } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
    if (invalid) {
      return _DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone || null, opts, `format ${fmt}`, text, specificOffset);
    }
  }
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {DateTimeOptions} options - options taken by fromFormat()
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale, numberingSystem } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {DateTimeOptions} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(text, formatParser, opts = {}) {
    if (isUndefined(text) || isUndefined(formatParser)) {
      throw new InvalidArgumentError("fromFormatParser requires an input string and a format parser");
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    if (!localeToUse.equals(formatParser.locale)) {
      throw new InvalidArgumentError(`fromFormatParser called with a locale of ${localeToUse}, but the format parser was created for ${formatParser.locale}`);
    }
    const { result, zone, specificOffset, invalidReason } = formatParser.explainFromTokens(text);
    if (invalidReason) {
      return _DateTime.invalid(invalidReason);
    } else {
      return parseDataToDateTime(result, zone, opts, `format ${formatParser.format}`, text, specificOffset);
    }
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone="local"] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale="system's locale"] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   */
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", text);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone="local"] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO("2016-05-25T09:08:34.123+06:00", {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = parseISODate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from a Javascript Date object. Uses the default zone.
   * @param {Date} date - a Javascript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone="local"] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return _DateTime.invalid("invalid input");
    }
    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return _DateTime.invalid(_DateTime._unsupportedZone(zoneToUse));
    }
    return new _DateTime({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone="local"] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return _DateTime.invalid("Timestamp out of range");
    } else {
      return new _DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone="local"] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale="system's locale"] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(obj = {}, opts = {}) {
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return _DateTime.invalid(_DateTime._unsupportedZone(zoneToUse));
    }
    const loc = Locale.fromObject(opts);
    const normalized = normalizeObject(obj, normalizeUnit);
    const tsNow = Settings.now(), offsetProvis = isNumber(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = isDefined(normalized.ordinal), containsGregorYear = isDefined(normalized.year), containsGregorMD = isDefined(normalized.month) || isDefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, loc);
    const tmpNow = tsToObj(tsNow, offsetProvis);
    const config2 = {
      containsGregor,
      containsOrdinal,
      loc,
      normalized,
      obj,
      offsetProvis,
      useWeekData,
      zoneToUse
    };
    if (useWeekData) {
      return _DateTime._buildObject(config2, orderedWeekUnits, defaultWeekUnitValues, gregorianToWeek(tmpNow, minDaysInFirstWeek, startOfWeek));
    } else if (containsOrdinal) {
      return _DateTime._buildObject(config2, orderedOrdinalUnits, defaultOrdinalUnitValues, gregorianToOrdinal(tmpNow));
    } else {
      return _DateTime._buildObject(config2, orderedUnits, defaultUnitValues, tmpNow);
    }
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone="local"] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale="system's locale"] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone="local"] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   */
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = parseSQL(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone="local"] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    }
    return new _DateTime({
      ts: seconds * 1e3,
      zone: normalizeZone(options.zone, Settings.defaultZone),
      loc: Locale.fromObject(options)
    });
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return _DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return _DateTime.fromFormatExplain(text, fmt, options);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   */
  static invalid(reason, explanation) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    }
    return new _DateTime({ invalid });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {Object} o
   */
  static isDateTime(o) {
    return !!(o && o._isLuxonDateTime);
  }
  /**
   * Create a local DateTime
   * @param args - The date values (year, month, etc.) and/or the configuration options for the DateTime
   * @example {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @example {number} [month=1] - The month, 1-indexed
   * @example {number} [day=1] - The day of the month, 1-indexed
   * @example {number} [hour=0] - The hour of the day, in 24-hour time
   * @example {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @example {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @example {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                //~> now
   * @example DateTime.local({ zone: "America/New_York" })    //~> now, in US east coast time
   * @example DateTime.local(2017)                            //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                         //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                  //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" }) //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)          //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)     //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local(...args) {
    const [opts, dateValues] = this._lastOpts(args);
    const [year, month, day, hour, minute, second, millisecond] = dateValues;
    return _DateTime._quickDT({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    }, opts);
  }
  static max(...dateTimes) {
    if (!dateTimes.every(_DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
  }
  static min(...dateTimes) {
    if (!dateTimes.every(_DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
  }
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new _DateTime({});
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(formatOpts, localeOpts = {}) {
    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
    return !tokenList ? null : tokenList.map((t) => t ? t.val : null).join("");
  }
  static resetCache() {
    this._zoneOffsetTs = void 0;
    this._zoneOffsetGuessCache = /* @__PURE__ */ new Map();
  }
  /**
   * Create a DateTime in UTC
   * @param args - The date values (year, month, etc.) and/or the configuration options for the DateTime
   * @example {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @example {number} [month=1] - The month, 1-indexed
   * @example {number} [day=1] - The day of the month
   * @example {number} [hour=0] - The hour of the day, in 24-hour time
   * @example {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @example {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @example {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example {Object} options - configuration options for the DateTime
   * @example {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @example {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @example {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                            //~> now
   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" } )       //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr }) //~> 2017-03-12T05:45:10.765Z
   * @return {DateTime}
   */
  static utc(...args) {
    const [opts, dateValues] = this._lastOpts(args);
    const [year, month, day, hour, minute, second, millisecond] = dateValues;
    opts.zone = FixedOffsetZone.utcInstance;
    return this._quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * @private
   */
  static _buildObject(config2, units, defaultValues, objNow) {
    let foundFirst = false;
    units.forEach((u) => {
      const v = config2.normalized[u];
      if (isDefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        config2.normalized[u] = defaultValues[u];
      } else {
        config2.normalized[u] = objNow[u];
      }
    });
    const higherOrderInvalid = config2.useWeekData ? hasInvalidWeekData(config2.normalized) : config2.containsOrdinal ? hasInvalidOrdinalData(config2.normalized) : hasInvalidGregorianData(config2.normalized);
    const invalid = higherOrderInvalid || hasInvalidTimeData(config2.normalized);
    if (invalid) {
      return _DateTime.invalid(invalid);
    }
    const gregorian = config2.useWeekData ? weekToGregorian(config2.normalized) : config2.containsOrdinal ? ordinalToGregorian(config2.normalized) : config2.normalized, [tsFinal, offsetFinal] = objToTS(gregorian, config2.offsetProvis, config2.zoneToUse), inst = new _DateTime({
      ts: tsFinal,
      zone: config2.zoneToUse,
      o: offsetFinal,
      loc: config2.loc
    });
    if (config2.normalized.weekday && config2.containsGregor && config2.obj.weekday !== inst.weekday) {
      return _DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${config2.normalized.weekday} and a date of ${inst.toISO()}`);
    }
    if (!inst.isValid) {
      return _DateTime.invalid(inst._invalid);
    }
    return inst;
  }
  /**
   * @private
   */
  static _diffRelative(start, end, opts) {
    const round = isUndefined(opts.round) ? true : opts.round, format = (c, unit) => {
      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
      const formatter = end._loc.clone(opts).relFormatter(opts);
      return formatter.format(c, unit);
    }, differ = (unit) => {
      if (opts.calendary) {
        if (!end.hasSame(start, unit)) {
          return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
        }
        return 0;
      }
      return end.diff(start, unit).get(unit);
    };
    if (opts.unit) {
      return format(differ(opts.unit), opts.unit);
    }
    for (const unit of opts.units) {
      const count = differ(unit);
      if (Math.abs(count) >= 1) {
        return format(count, unit);
      }
    }
    return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
  }
  /**
   * @private
   * cache offsets for zones based on the current timestamp when this function is
   * first called. When we are handling a datetime from components like (year,
   * month, day, hour) in a time zone, we need a guess about what the timezone
   * offset is so that we can convert into a UTC timestamp. One way is to find the
   * offset of now in the zone. The actual date may have a different offset (for
   * example, if we handle a date in June while we're in December in a zone that
   * observes DST), but we can check and adjust that.
   * When handling many dates, calculating the offset for now every time is
   * expensive. It's just a guess, so we can cache the offset to use even if we
   * are right on a time change boundary (we'll just correct in the other
   * direction). Using a timestamp from first read is a slight optimization for
   * handling dates close to the current date, since those dates will usually be
   * in the same offset (we could set the timestamp statically, instead). We use a
   * single timestamp for all zones to make things a bit more predictable.
   * This is safe for quickDT (used by local() and utc()) because we don't fill in
   * higher-order units from tsNow (as we do in fromObject, this requires that
   * offset is calculated from tsNow).
   */
  static _guessOffsetForZone(zone) {
    if (!this._zoneOffsetGuessCache.has(zone)) {
      if (this._zoneOffsetTs === void 0) {
        this._zoneOffsetTs = Settings.now();
      }
      this._zoneOffsetGuessCache.set(zone, zone.offset(this._zoneOffsetTs));
    }
    return this._zoneOffsetGuessCache.get(zone);
  }
  /**
   * @private
   */
  static _lastOpts(argList) {
    let opts = {}, args;
    if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
      opts = argList.pop();
      args = argList;
    } else {
      args = Array.from(argList);
    }
    return [opts, args];
  }
  /**
   * @private
   */
  // this is a dumbed down version of fromObject() that runs about 60% faster
  // but doesn't do any validation, makes a bunch of assumptions about what units
  // are present, and so on.
  static _quickDT(obj, opts) {
    const zone = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zone.isValid) {
      return _DateTime.invalid(this._unsupportedZone(zone));
    }
    const loc = Locale.fromObject(opts);
    const tsNow = Settings.now();
    let ts, o;
    if (isDefined(obj.year)) {
      for (const u of orderedUnits) {
        if (isUndefined(obj[u])) {
          obj[u] = defaultUnitValues[u];
        }
      }
      const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
      if (invalid) {
        return _DateTime.invalid(invalid);
      }
      const offsetProvis = this._guessOffsetForZone(zone);
      [ts, o] = objToTS(obj, offsetProvis, zone);
    } else {
      ts = tsNow;
    }
    return new _DateTime({ ts, zone, loc, o });
  }
  /**
   * @private
   */
  static _unsupportedZone(zone) {
    return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
  }
  // PUBLIC
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
    } else {
      return `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      const reason = this.invalidReason || otherDateTime.invalidReason;
      return Duration.invalid(reason, "created by diffing an invalid DateTime");
    }
    const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, Object.assign({ locale: this.locale, numberingSystem: this.numberingSystem }, opts));
    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Returns the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(_DateTime.now(), unit, opts);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit, { useLocaleWeeks = false } = {}) {
    return this.plus({ [unit]: 1 }).startOf(unit, { useLocaleWeeks }).minus({ milliseconds: 1 });
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   */
  equals(other) {
    return this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this._loc.equals(other._loc);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed) {
      return [this];
    }
    const dayMs = 864e5;
    const minuteMs = 6e4;
    const localTS = objToLocalTS(this._c);
    const oEarlier = this.zone.offset(localTS - dayMs);
    const oLater = this.zone.offset(localTS + dayMs);
    const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
    const o2 = this.zone.offset(localTS - oLater * minuteMs);
    if (o1 === o2) {
      return [this];
    }
    const ts1 = localTS - o1 * minuteMs;
    const ts2 = localTS - o2 * minuteMs;
    const c1 = tsToObj(ts1, o1);
    const c2 = tsToObj(ts2, o2);
    if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
      return [this._clone({ ts: ts1 }), this._clone({ ts: ts2 })];
    }
    return [this];
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   */
  hasSame(otherDateTime, unit, opts) {
    if (!this.isValid) {
      return false;
    }
    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return +adjustedToZone.startOf(unit) <= inputMs && inputMs <= +adjustedToZone.endOf(unit, opts);
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(duration) {
    if (!this.isValid) {
      return this;
    }
    const dur = Duration.fromDurationLike(duration).negate();
    return this._clone(this._adjustTime(dur));
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object} duration - The amount to add. Either a Luxon Duration or the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) {
      return this;
    }
    const dur = Duration.fromDurationLike(duration);
    return this._clone(this._adjustTime(dur));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} [options] - the options to set
   * @param {string} [options.locale] - ;
   * @param {CalendarSystem} [options.outputCalendar] - ;
   * @param {NumberingSystem} [options.numberingSystem] - ;
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure(options) {
    const loc = this._loc.clone(options);
    return this._clone({ loc });
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(this._loc.clone(opts), opts).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   */
  set(values) {
    if (!this.isValid) {
      return this;
    }
    const normalized = normalizeObject(values, normalizeUnit);
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, this.loc);
    const settingWeekStuff = isDefined(normalized.weekYear) || isDefined(normalized.weekNumber) || isDefined(normalized.weekday);
    const containsOrdinal = isDefined(normalized.ordinal), containsGregorYear = isDefined(normalized.year), containsGregorMD = isDefined(normalized.month) || isDefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian(Object.assign(Object.assign({}, gregorianToWeek(this._c, minDaysInFirstWeek, startOfWeek)), normalized), minDaysInFirstWeek, startOfWeek);
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(Object.assign(Object.assign({}, gregorianToOrdinal(this._c)), normalized));
    } else {
      mixed = Object.assign(Object.assign({}, this.toObject()), normalized);
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    const [ts, o] = objToTS(mixed, this._o, this.zone);
    return this._clone({ ts, o });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone="local"] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return _DateTime.invalid(_DateTime._unsupportedZone(zone));
    } else {
      let newTS = this._ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this._ts);
        const asObj = this.toObject();
        newTS = objToTS(asObj, offsetGuess, zone)[0];
      }
      return this._clone({ ts: newTS, zone });
    }
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('week').toISOTime(); //=> '2014-03-03', weeks always start on a Monday
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   */
  startOf(unit, { useLocaleWeeks = false } = {}) {
    if (!this.isValid) {
      return this;
    }
    const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      case "quarters":
      case "months":
        o.day = 1;
      case "weeks":
      case "days":
        o.hour = 0;
      case "hours":
        o.minute = 0;
      case "minutes":
        o.second = 0;
      case "seconds":
        o.millisecond = 0;
        break;
    }
    if (normalizedUnit === "weeks") {
      if (useLocaleWeeks) {
        const startOfWeek = this.loc.getStartOfWeek();
        const { weekday } = this;
        if (weekday < startOfWeek) {
          o.weekNumber = this.weekNumber - 1;
        }
        o.weekday = startOfWeek;
      } else {
        o.weekday = 1;
      }
    }
    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }
    return this.set(o);
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? Formatter.create(this._loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} options - options
   * @param {boolean} [options.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [options.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [options.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [options.extendedZone=false] - add the time zone format extension
   * @param {string} [options.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({ format = "extended", suppressSeconds = false, suppressMilliseconds = false, includeOffset = true, extendedZone = false } = {}) {
    if (!this.isValid) {
      return null;
    }
    const ext = format === "extended";
    return [
      this._toISODate(ext),
      "T",
      this._toISOTime(ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone)
    ].join("");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} options - options
   * @param {string} [options.format="extended"] - choose between the basic and extended (default) format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format = "extended" } = { format: "extended" }) {
    if (!this.isValid) {
      return null;
    }
    return this._toISODate(format === "extended");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({ suppressMilliseconds = false, suppressSeconds = false, includeOffset = true, includePrefix = false, extendedZone = false, format = "extended" } = {}) {
    if (!this.isValid) {
      return null;
    }
    return [
      includePrefix ? "T" : "",
      this._toISOTime(format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone)
    ].join("");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns a Javascript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this._ts : NaN);
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: "day", value: "25" },
   *                                   //=>   { type: "literal", value: "/" },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: "literal", value: "/" },
   *                                   //=>   { type: "year", value: "1982" }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid ? Formatter.create(this._loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this._loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = { includeConfig: false }) {
    if (!this.isValid) {
      return {};
    }
    const base = Object.assign({}, this._c);
    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this._loc.numberingSystem;
      base.locale = this._loc.locale;
    }
    return base;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of a time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"     * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} [options.locale] - override the locale of this DateTime
   * @param {string} [options.numberingSystem] - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid) {
      return null;
    }
    const base = options.base || _DateTime.fromObject({}, { zone: this.zone });
    const padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return _DateTime._diffRelative(base, this.plus(padding), Object.assign(Object.assign({}, options), {
      numeric: "always",
      units,
      unit
    }));
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.locale] - override the locale of this DateTime
   * @param {string} [options.unit] - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} [options.numberingSystem] - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid) {
      return null;
    }
    return _DateTime._diffRelative(options.base || _DateTime.fromObject({}, { zone: this.zone }), this, Object.assign(Object.assign({}, options), { numeric: "auto", units: ["years", "months", "days"], calendary: true }));
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return this._toISODate(true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> "05:15:16.345 America/New_York"
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      includeOffsetSpace && (fmt += " ");
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this._ts / 1e3 : NaN;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset2 = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} other - the other end point of the Interval
   */
  until(other) {
    return Interval.fromDateTimes(this, other);
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  // PRIVATE
  /**
   * @private
   */
  /**
   * create a new DT instance by adding a duration, adjusting for DSTs
   * Remember that compared to Luxon.js I don't need to pass the instance as argument here,
   * because it's a private member of the instance itself.
   * Honestly don't know why he didn't do this way!
   * @param dur
   * @private
   */
  _adjustTime(dur) {
    const previousOffset = this._o, year = this._c.year + Math.trunc(dur.years), month = this._c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = Object.assign(Object.assign({}, this._c), {
      year,
      month,
      day: Math.min(this._c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
    }), millisToAdd = Duration.fromObject({
      years: dur.years - Math.trunc(dur.years),
      quarters: dur.quarters - Math.trunc(dur.quarters),
      months: dur.months - Math.trunc(dur.months),
      weeks: dur.weeks - Math.trunc(dur.weeks),
      days: dur.days - Math.trunc(dur.days),
      hours: dur.hours,
      minutes: dur.minutes,
      seconds: dur.seconds,
      milliseconds: dur.milliseconds
    }).as("milliseconds"), localTS = objToLocalTS(c);
    let [ts, o] = fixOffset(localTS, previousOffset, this.zone);
    if (millisToAdd !== 0) {
      ts += millisToAdd;
      o = this.zone.offset(ts);
    }
    return { ts, o };
  }
  /**
   * @private
   */
  // clone really means, "make a new object with these modifications". all "setters" really use this
  // to create a new object while only changing some of the properties
  _clone(alts) {
    const current = {
      ts: this._ts,
      zone: this.zone,
      c: this._c,
      o: this._o,
      loc: this._loc,
      invalid: this._invalid || void 0
    };
    return new _DateTime(Object.assign(Object.assign(Object.assign({}, current), alts), { old: current }));
  }
  _possiblyCachedLocalWeekData(dt) {
    if (!dt._localWeekData) {
      dt._localWeekData = gregorianToWeek(dt._c, dt.loc.getMinDaysInFirstWeek(), dt.loc.getStartOfWeek());
    }
    return dt._localWeekData;
  }
  /**
   * @private
   */
  // we cache week data on the DT object and this method intermediates the cache
  _possiblyCachedWeekData(dt) {
    if (dt._weekData === null) {
      dt._weekData = gregorianToWeek(dt._c);
    }
    return dt._weekData;
  }
  _toISODate(extended) {
    const longFormat = this._c.year > 9999 || this._c.year < 0;
    let c = "";
    if (longFormat && this._c.year >= 0) {
      c += "+";
    }
    c += padStart(this._c.year, longFormat ? 6 : 4);
    if (extended) {
      c += "-";
      c += padStart(this._c.month);
      c += "-";
      c += padStart(this._c.day);
    } else {
      c += padStart(this._c.month);
      c += padStart(this._c.day);
    }
    return c;
  }
  _toISOTime(extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
    let c = padStart(this._c.hour);
    if (extended) {
      c += ":";
      c += padStart(this._c.minute);
      if (this._c.millisecond !== 0 || this._c.second !== 0 || !suppressSeconds) {
        c += ":";
      }
    } else {
      c += padStart(this._c.minute);
    }
    if (this._c.millisecond !== 0 || this._c.second !== 0 || !suppressSeconds) {
      c += padStart(this._c.second);
      if (this._c.millisecond !== 0 || !suppressMilliseconds) {
        c += ".";
        c += padStart(this._c.millisecond, 3);
      }
    }
    if (includeOffset) {
      if (this.isOffsetFixed && this.offset === 0 && !extendedZone) {
        c += "Z";
      } else if (this._o < 0) {
        c += "-";
        c += padStart(Math.trunc(-this._o / 60));
        c += ":";
        c += padStart(Math.trunc(-this._o % 60));
      } else {
        c += "+";
        c += padStart(Math.trunc(this._o / 60));
        c += ":";
        c += padStart(Math.trunc(this._o % 60));
      }
    }
    if (extendedZone) {
      c += "[" + this.zone.ianaName + "]";
    }
    return c;
  }
};
DateTime.DATETIME_FULL = DATETIME_FULL;
DateTime.DATETIME_FULL_WITH_SECONDS = DATETIME_FULL_WITH_SECONDS;
DateTime.DATETIME_HUGE = DATETIME_HUGE;
DateTime.DATETIME_HUGE_WITH_SECONDS = DATETIME_HUGE_WITH_SECONDS;
DateTime.DATETIME_MED = DATETIME_MED;
DateTime.DATETIME_MED_WITH_SECONDS = DATETIME_MED_WITH_SECONDS;
DateTime.DATETIME_MED_WITH_WEEKDAY = DATETIME_MED_WITH_WEEKDAY;
DateTime.DATETIME_SHORT = DATETIME_SHORT;
DateTime.DATETIME_SHORT_WITH_SECONDS = DATETIME_SHORT_WITH_SECONDS;
DateTime.DATE_FULL = DATE_FULL;
DateTime.DATE_HUGE = DATE_HUGE;
DateTime.DATE_MED = DATE_MED;
DateTime.DATE_MED_WITH_WEEKDAY = DATE_MED_WITH_WEEKDAY;
DateTime.DATE_SHORT = DATE_SHORT;
DateTime.TIME_24_SIMPLE = TIME_24_SIMPLE;
DateTime.TIME_24_WITH_LONG_OFFSET = TIME_24_WITH_LONG_OFFSET;
DateTime.TIME_24_WITH_SECONDS = TIME_24_WITH_SECONDS;
DateTime.TIME_24_WITH_SHORT_OFFSET = TIME_24_WITH_SHORT_OFFSET;
DateTime.TIME_SIMPLE = TIME_SIMPLE;
DateTime.TIME_WITH_LONG_OFFSET = TIME_WITH_LONG_OFFSET;
DateTime.TIME_WITH_SECONDS = TIME_WITH_SECONDS;
DateTime.TIME_WITH_SHORT_OFFSET = TIME_WITH_SHORT_OFFSET;
DateTime._zoneOffsetGuessCache = /* @__PURE__ */ new Map();

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var _MatToolbarRow = class _MatToolbarRow {
};
_MatToolbarRow.ɵfac = function MatToolbarRow_Factory(t) {
  return new (t || _MatToolbarRow)();
};
_MatToolbarRow.ɵdir = ɵɵdefineDirective({
  type: _MatToolbarRow,
  selectors: [["mat-toolbar-row"]],
  hostAttrs: [1, "mat-toolbar-row"],
  exportAs: ["matToolbarRow"],
  standalone: true
});
var MatToolbarRow = _MatToolbarRow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      },
      standalone: true
    }]
  }], null, null);
})();
var _MatToolbar = class _MatToolbar {
  constructor(_elementRef, _platform, document) {
    this._elementRef = _elementRef;
    this._platform = _platform;
    this._document = document;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
};
_MatToolbar.ɵfac = function MatToolbar_Factory(t) {
  return new (t || _MatToolbar)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(DOCUMENT));
};
_MatToolbar.ɵcmp = ɵɵdefineComponent({
  type: _MatToolbar,
  selectors: [["mat-toolbar"]],
  contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, MatToolbarRow, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._toolbarRows = _t);
    }
  },
  hostAttrs: [1, "mat-toolbar"],
  hostVars: 6,
  hostBindings: function MatToolbar_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
      ɵɵclassProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["matToolbar"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c1,
  decls: 2,
  vars: 0,
  template: function MatToolbar_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c0);
      ɵɵprojection(0);
      ɵɵprojection(1, 1);
    }
  },
  styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],
  encapsulation: 2,
  changeDetection: 0
});
var MatToolbar = _MatToolbar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var _MatToolbarModule = class _MatToolbarModule {
};
_MatToolbarModule.ɵfac = function MatToolbarModule_Factory(t) {
  return new (t || _MatToolbarModule)();
};
_MatToolbarModule.ɵmod = ɵɵdefineNgModule({
  type: _MatToolbarModule,
  imports: [MatCommonModule, MatToolbar, MatToolbarRow],
  exports: [MatToolbar, MatToolbarRow, MatCommonModule]
});
_MatToolbarModule.ɵinj = ɵɵdefineInjector({
  imports: [MatCommonModule, MatCommonModule]
});
var MatToolbarModule = _MatToolbarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/ngx-mat-timepicker/fesm2022/ngx-mat-timepicker.mjs
var _c02 = ["clockFace"];
var _c12 = ["clockHand"];
var _c2 = ["*", "*"];
var _c3 = (a0) => ({
  "clock-face__clock-hand_minute": a0
});
var _c4 = (a0) => ({
  "transform": a0
});
var _c5 = (a0) => ({
  $implicit: a0
});
function NgxMatTimepickerFaceComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 10);
    ɵɵpipe(1, "activeHour");
    ɵɵtext(2);
    ɵɵpipe(3, "timeLocalizer");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ɵɵpipeBind3(1, 4, time_r1.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.isClockFaceDisabled) ? ctx_r1.color : void 0)("ngStyle", ɵɵpureFunction1(11, _c4, "rotateZ(-" + time_r1.angle + "deg)"))("disabled", time_r1.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(3, 8, time_r1.time, ctx_r1.timeUnit.HOUR), " ");
  }
}
function NgxMatTimepickerFaceComponent_ng_template_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵelement(1, "input", 14, 4);
    ɵɵpipe(3, "minutesFormatter");
    ɵɵpipe(4, "timeLocalizer");
    ɵɵelementStart(5, "button", 10);
    ɵɵpipe(6, "activeMinute");
    ɵɵpipe(7, "activeMinute");
    ɵɵtext(8);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const time_r3 = ctx.$implicit;
    const current_r4 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(24, _c4, "rotateZ(" + time_r3.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("value", ɵɵpipeBind2(4, 11, ɵɵpipeBind2(3, 8, time_r3.time, ctx_r1.minutesGap), ctx_r1.timeUnit.MINUTE));
    ɵɵadvance(4);
    ɵɵclassProp("dot", ctx_r1.dottedMinutesInGap && current_r4.value === "" && !ɵɵpipeBind4(6, 14, time_r3.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, 1, ctx_r1.isClockFaceDisabled));
    ɵɵproperty("color", ɵɵpipeBind4(7, 19, time_r3.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.minutesGap, ctx_r1.isClockFaceDisabled) ? ctx_r1.color : void 0)("ngStyle", ɵɵpureFunction1(26, _c4, "rotateZ(-" + time_r3.angle + "deg)"))("disabled", time_r3.disabled);
    ɵɵadvance(3);
    ɵɵtextInterpolate1(" ", current_r4.value, " ");
  }
}
function NgxMatTimepickerFaceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_ng_template_2_div_1_Template, 9, 28, "div", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.faceTime)("ngForTrackBy", ctx_r1.trackByTime);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_1_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 0, ["*ngTemplateOutlet", "hourButton; context: {$implicit: time}"]);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_1_ng_content_1_Template, 1, 0, "ng-content", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r5 = ctx.$implicit;
    ɵɵnextContext(2);
    const hourButton_r6 = ɵɵreference(1);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(3, _c4, "rotateZ(" + time_r5.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", hourButton_r6)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c5, time_r5));
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_div_1_ng_content_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1, ["*ngTemplateOutlet", "hourButton; context: {$implicit: time}"]);
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_3_div_1_ng_content_1_Template, 1, 0, "ng-content", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const time_r7 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    const hourButton_r6 = ɵɵreference(1);
    ɵɵstyleProp("top", "calc(50% - " + ctx_r1.innerClockFaceSize + "px)")("height", ctx_r1.innerClockFaceSize, "px");
    ɵɵproperty("ngStyle", ɵɵpureFunction1(7, _c4, "rotateZ(" + time_r7.angle + "deg)"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", hourButton_r6)("ngTemplateOutletContext", ɵɵpureFunction1(9, _c5, time_r7));
  }
}
function NgxMatTimepickerFaceComponent_div_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_3_div_1_Template, 2, 11, "div", 18);
    ɵɵpipe(2, "slice");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx_r1.faceTime, 12, 24))("ngForTrackBy", ctx_r1.trackByTime);
  }
}
function NgxMatTimepickerFaceComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, NgxMatTimepickerFaceComponent_div_6_div_1_Template, 2, 7, "div", 12);
    ɵɵpipe(2, "slice");
    ɵɵtemplate(3, NgxMatTimepickerFaceComponent_div_6_div_3_Template, 3, 6, "div", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 3, ctx_r1.faceTime, 0, 12))("ngForTrackBy", ctx_r1.trackByTime);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.faceTime.length > 12);
  }
}
function NgxMatTimepickerFaceComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 20);
    ɵɵelement(1, "span", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
var _c6 = (a0) => ({
  "active": a0
});
function NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5);
    ɵɵlistener("@scaleInOut.done", function NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template_div_animation_scaleInOut_done_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.animationDone());
    });
    ɵɵelementStart(1, "p");
    ɵɵtext(2, "Current time would be invalid in this period.");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    ɵɵproperty("@scaleInOut", void 0);
  }
}
function NgxMatTimepickerPeriodComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxMatTimepickerPeriodComponent_ng_template_6_div_0_Template, 3, 1, "div", 4);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r2.isPeriodAvailable);
  }
}
function NgxMatTimepickerDialControlComponent_input_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 2);
    ɵɵpipe(1, "timeLocalizer");
    ɵɵlistener("ngModelChange", function NgxMatTimepickerDialControlComponent_input_0_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.time = $event);
    })("input", function NgxMatTimepickerDialControlComponent_input_0_Template_input_input_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateTime());
    })("focus", function NgxMatTimepickerDialControlComponent_input_0_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c6, ctx_r1.isActive))("ngModel", ɵɵpipeBind3(1, 4, ctx_r1.time, ctx_r1.timeUnit, true))("disabled", ctx_r1.disabled)("ngxMatTimepickerAutofocus", ctx_r1.isActive);
  }
}
function NgxMatTimepickerDialControlComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 3);
    ɵɵpipe(1, "ngxMatTimepickerParser");
    ɵɵpipe(2, "timeLocalizer");
    ɵɵlistener("ngModelChange", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onModelChange($event));
    })("input", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_input_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateTime());
    })("focus", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    })("keydown", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeydown($event));
    })("keypress", function NgxMatTimepickerDialControlComponent_ng_template_1_Template_input_keypress_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changeTimeByKeyboard($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(11, _c6, ctx_r1.isActive))("ngModel", ɵɵpipeBind3(2, 7, ɵɵpipeBind2(1, 4, ctx_r1.time, ctx_r1.timeUnit), ctx_r1.timeUnit, true))("disabled", ctx_r1.disabled)("ngxMatTimepickerAutofocus", ctx_r1.isActive);
  }
}
var _c7 = (a0) => ({
  "timepicker-dial__hint-container--hidden": a0
});
function NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-period", 8);
    ɵɵlistener("periodChanged", function NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template_ngx_mat_timepicker_period_periodChanged_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.changePeriod($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("selectedPeriod", ctx_r1.period)("activeTimeUnit", ctx_r1.activeTimeUnit)("maxTime", ctx_r1.maxTime)("minTime", ctx_r1.minTime)("format", ctx_r1.format)("hours", ctx_r1.hours)("minutes", ctx_r1.minutes)("selectedHour", ctx_r1.hour)("meridiems", ctx_r1.meridiems);
  }
}
function NgxMatTimepickerDialComponent_div_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerDialComponent_div_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "small", 11);
    ɵɵtext(1, " * use arrows (");
    ɵɵelementStart(2, "span");
    ɵɵtext(3, "⇅");
    ɵɵelementEnd();
    ɵɵtext(4, ") to change the time");
    ɵɵelementEnd();
  }
}
function NgxMatTimepickerDialComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtemplate(1, NgxMatTimepickerDialComponent_div_8_ng_container_1_Template, 1, 0, "ng-container", 10)(2, NgxMatTimepickerDialComponent_div_8_ng_template_2_Template, 5, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const editableHintDefault_r3 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c7, !ctx_r1.isHintVisible));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.editableHintTmpl ? ctx_r1.editableHintTmpl : editableHintDefault_r3);
  }
}
var _c8 = ["*"];
function NgxMatTimepickerContentComponent_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerContentComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerContentComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const timepickerOutlet_r1 = ɵɵreference(4);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r1);
  }
}
function NgxMatTimepickerContentComponent_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerContentComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxMatTimepickerContentComponent_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const timepickerOutlet_r1 = ɵɵreference(4);
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r1);
  }
}
function NgxMatTimepickerContentComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function NgxMatTimepickerDialogComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "CANCEL ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerDialogComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "OK ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-24-hours-face", 17);
    ɵɵpipe(1, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format);
  }
}
function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-12-hours-face", 18);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("period", ɵɵpipeBind1(2, 7, ctx_r1.selectedPeriod))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime);
  }
}
function NgxMatTimepickerDialogComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerDialogComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template, 2, 7, "ngx-mat-timepicker-24-hours-face", 16)(2, NgxMatTimepickerDialogComponent_div_14_ng_template_2_Template, 3, 9, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ampmHours_r5 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.data.format === 24)("ngIfElse", ampmHours_r5);
  }
}
function NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-minutes-face", 19);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵpipe(3, "async");
    ɵɵlistener("minuteChange", function NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template_ngx_mat_timepicker_minutes_face_minuteChange_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinuteChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color)("dottedMinutesInGap", ctx_r1.data.dottedMinutesInGap)("selectedMinute", ɵɵpipeBind1(1, 9, ctx_r1.selectedMinute))("selectedHour", (tmp_6_0 = ɵɵpipeBind1(2, 11, ctx_r1.selectedHour)) == null ? null : tmp_6_0.time)("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format)("period", ɵɵpipeBind1(3, 13, ctx_r1.selectedPeriod))("minutesGap", ctx_r1.data.minutesGap);
  }
}
function NgxMatTimepickerDialogComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerDialogComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "CANCEL ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 15);
    ɵɵtext(1, "OK ");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r1.color);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-24-hours-face", 17);
    ɵɵpipe(1, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template_ngx_mat_timepicker_24_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-12-hours-face", 18);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵlistener("hourChange", function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourChange($event));
    })("hourSelected", function NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template_ngx_mat_timepicker_12_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("color", ctx_r1.color)("selectedHour", ɵɵpipeBind1(1, 5, ctx_r1.selectedHour))("period", ɵɵpipeBind1(2, 7, ctx_r1.selectedPeriod))("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime);
  }
}
function NgxMatTimepickerStandaloneComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMatTimepickerStandaloneComponent_div_14_ngx_mat_timepicker_24_hours_face_1_Template, 2, 7, "ngx-mat-timepicker-24-hours-face", 16)(2, NgxMatTimepickerStandaloneComponent_div_14_ng_template_2_Template, 3, 9, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ampmHours_r5 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.data.format === 24)("ngIfElse", ampmHours_r5);
  }
}
function NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-mat-timepicker-minutes-face", 19);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵpipe(3, "async");
    ɵɵlistener("minuteChange", function NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template_ngx_mat_timepicker_minutes_face_minuteChange_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onMinuteChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("dottedMinutesInGap", ctx_r1.data.dottedMinutesInGap)("color", ctx_r1.color)("selectedMinute", ɵɵpipeBind1(1, 9, ctx_r1.selectedMinute))("selectedHour", (tmp_6_0 = ɵɵpipeBind1(2, 11, ctx_r1.selectedHour)) == null ? null : tmp_6_0.time)("minTime", ctx_r1.data.minTime)("maxTime", ctx_r1.data.maxTime)("format", ctx_r1.data.format)("period", ɵɵpipeBind1(3, 13, ctx_r1.selectedPeriod))("minutesGap", ctx_r1.data.minutesGap);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerStandaloneComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-mat-timepicker-provider");
  }
}
var _c9 = [[["", "ngxMatTimepickerToggleIcon", ""]]];
var _c10 = ["[ngxMatTimepickerToggleIcon]"];
function NgxMatTimepickerToggleComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 3);
    ɵɵelementEnd();
  }
}
var _c11 = (a0) => ({
  "ngx-mat-timepicker--disabled": a0
});
function NgxMatTimepickerFieldComponent_mat_form_field_5_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    ɵɵproperty("value", option_r4);
    ɵɵadvance();
    ɵɵtextInterpolate(option_r4);
  }
}
function NgxMatTimepickerFieldComponent_mat_form_field_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-form-field", 9)(1, "mat-select", 10);
    ɵɵlistener("selectionChange", function NgxMatTimepickerFieldComponent_mat_form_field_5_Template_mat_select_selectionChange_1_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.changePeriod($event));
    });
    ɵɵtemplate(2, NgxMatTimepickerFieldComponent_mat_form_field_5_mat_option_2_Template, 2, 2, "mat-option", 11);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r2.color);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.disabled || ctx_r2.isChangePeriodDisabled)("ngModel", ctx_r2.period);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.periods);
  }
}
function NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ngx-mat-timepicker-toggle", 13)(1, "span", 14);
    ɵɵtemplate(2, NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_ng_container_2_Template, 1, 0, "ng-container", 15);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    const timepicker_r5 = ɵɵreference(8);
    const defaultIcon_r6 = ɵɵreference(10);
    ɵɵproperty("for", timepicker_r5)("disabled", ctx_r2.disabled);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.toggleIcon || defaultIcon_r6);
  }
}
function NgxMatTimepickerFieldComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, "watch_later");
    ɵɵelementEnd();
  }
}
var NgxMatTimepickerFormat;
(function(NgxMatTimepickerFormat2) {
  NgxMatTimepickerFormat2["TWELVE"] = "hh:mm a";
  NgxMatTimepickerFormat2["TWELVE_SHORT"] = "h:m a";
  NgxMatTimepickerFormat2["TWENTY_FOUR"] = "HH:mm";
  NgxMatTimepickerFormat2["TWENTY_FOUR_SHORT"] = "H:m";
})(NgxMatTimepickerFormat || (NgxMatTimepickerFormat = {}));
var NgxMatTimepickerPeriods;
(function(NgxMatTimepickerPeriods2) {
  NgxMatTimepickerPeriods2["AM"] = "AM";
  NgxMatTimepickerPeriods2["PM"] = "PM";
})(NgxMatTimepickerPeriods || (NgxMatTimepickerPeriods = {}));
var _NgxMatTimepickerAdapter = class _NgxMatTimepickerAdapter {
  /***
   *  Format hour according to time format (12 or 24)
   */
  static formatHour(currentHour, format, period) {
    if (this.isTwentyFour(format)) {
      return currentHour;
    }
    const hour = period === NgxMatTimepickerPeriods.AM ? currentHour : currentHour + 12;
    if (period === NgxMatTimepickerPeriods.AM && hour === 12) {
      return 0;
    } else if (period === NgxMatTimepickerPeriods.PM && hour === 24) {
      return 12;
    }
    return hour;
  }
  static formatTime(time, opts) {
    if (!time) {
      return "Invalid Time";
    }
    const parsedTime = this.parseTime(time, opts).setLocale(this.defaultLocale);
    if (!parsedTime.isValid) {
      return "Invalid time";
    }
    const isTwelve = !this.isTwentyFour(opts.format);
    if (isTwelve) {
      return parsedTime.toLocaleString(__spreadProps(__spreadValues({}, DateTime.TIME_SIMPLE), {
        hour12: isTwelve
      })).replace(/\u200E/g, "");
    }
    return parsedTime.toISOTime({
      includeOffset: false,
      suppressMilliseconds: true,
      suppressSeconds: true
    }).replace(/\u200E/g, "");
  }
  static fromDateTimeToString(time, format) {
    return time.reconfigure({
      numberingSystem: this.defaultNumberingSystem,
      locale: this.defaultLocale
    }).toFormat(this.isTwentyFour(format) ? NgxMatTimepickerFormat.TWENTY_FOUR : NgxMatTimepickerFormat.TWELVE);
  }
  static isBetween(time, before, after, unit = "minutes") {
    const innerUnit = unit === "hours" ? unit : void 0;
    return this.isSameOrBefore(time, after, innerUnit) && this.isSameOrAfter(time, before, innerUnit);
  }
  static isSameOrAfter(time, compareWith, unit = "minutes") {
    if (unit === "hours") {
      return time.hour >= compareWith.hour;
    }
    return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
  }
  static isSameOrBefore(time, compareWith, unit = "minutes") {
    if (unit === "hours") {
      return time.hour <= compareWith.hour;
    }
    return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
  }
  static isTimeAvailable(time, min, max, granularity, minutesGap, format) {
    if (!time) {
      return void 0;
    }
    const convertedTime = this.parseTime(time, {
      format
    });
    const minutes = convertedTime.minute;
    if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
      throw new Error(`Your minutes - ${minutes} doesn't match your minutesGap - ${minutesGap}`);
    }
    const isAfter = min && !max && this.isSameOrAfter(convertedTime, min, granularity);
    const isBefore = max && !min && this.isSameOrBefore(convertedTime, max, granularity);
    const between = min && max && this.isBetween(convertedTime, min, max, granularity);
    const isAvailable = !min && !max;
    return isAfter || isBefore || between || isAvailable;
  }
  static isTwentyFour(format) {
    return format === 24;
  }
  static parseTime(time, opts) {
    const localeOpts = this._getLocaleOptionsByTime(time, opts);
    let timeMask = NgxMatTimepickerFormat.TWENTY_FOUR_SHORT;
    if (time.match(/\s/g)) {
      time = time.replace(/\.\s*/g, "");
      timeMask = NgxMatTimepickerFormat.TWELVE_SHORT;
    }
    return DateTime.fromFormat(time.replace(/\s+/g, " "), timeMask, {
      numberingSystem: localeOpts.numberingSystem,
      locale: localeOpts.locale
    });
  }
  static toLocaleTimeString(time, opts = {}) {
    const {
      format = this.defaultFormat,
      locale = this.defaultLocale
    } = opts;
    let hourCycle = "h12";
    let timeMask = NgxMatTimepickerFormat.TWELVE_SHORT;
    if (this.isTwentyFour(format)) {
      hourCycle = "h23";
      timeMask = NgxMatTimepickerFormat.TWENTY_FOUR_SHORT;
    }
    return DateTime.fromFormat(time, timeMask).reconfigure({
      locale,
      numberingSystem: opts.numberingSystem,
      defaultToEN: opts.defaultToEN,
      outputCalendar: opts.outputCalendar
    }).toLocaleString(__spreadProps(__spreadValues({}, DateTime.TIME_SIMPLE), {
      hourCycle
    }));
  }
  /**
   *
   * @param time
   * @param opts
   * @private
   */
  static _getLocaleOptionsByTime(time, opts) {
    const {
      numberingSystem,
      locale
    } = DateTime.now().reconfigure({
      locale: opts.locale,
      numberingSystem: opts.numberingSystem,
      outputCalendar: opts.outputCalendar,
      defaultToEN: opts.defaultToEN
    }).resolvedLocaleOptions();
    return isNaN(parseInt(time, 10)) ? {
      numberingSystem,
      locale
    } : {
      numberingSystem: this.defaultNumberingSystem,
      locale: this.defaultLocale
    };
  }
};
_NgxMatTimepickerAdapter.defaultFormat = 12;
_NgxMatTimepickerAdapter.defaultLocale = "en-US";
_NgxMatTimepickerAdapter.defaultNumberingSystem = "latn";
var NgxMatTimepickerAdapter = _NgxMatTimepickerAdapter;
var NgxMatTimepickerUnits;
(function(NgxMatTimepickerUnits2) {
  NgxMatTimepickerUnits2[NgxMatTimepickerUnits2["HOUR"] = 0] = "HOUR";
  NgxMatTimepickerUnits2[NgxMatTimepickerUnits2["MINUTE"] = 1] = "MINUTE";
})(NgxMatTimepickerUnits || (NgxMatTimepickerUnits = {}));
var NGX_MAT_TIMEPICKER_CONFIG = new InjectionToken("NGX_MAT_TIMEPICKER_CONFIG");
var DEFAULT_HOUR = {
  time: 12,
  angle: 360
};
var DEFAULT_MINUTE = {
  time: 0,
  angle: 360
};
var _NgxMatTimepickerService = class _NgxMatTimepickerService {
  constructor() {
    this._hour$ = new BehaviorSubject(DEFAULT_HOUR);
    this._minute$ = new BehaviorSubject(DEFAULT_MINUTE);
    this._period$ = new BehaviorSubject(NgxMatTimepickerPeriods.AM);
  }
  set hour(hour) {
    this._hour$.next(hour);
  }
  set minute(minute) {
    this._minute$.next(minute);
  }
  set period(period) {
    const isPeriodValid = period === NgxMatTimepickerPeriods.AM || period === NgxMatTimepickerPeriods.PM;
    if (isPeriodValid) {
      this._period$.next(period);
    }
  }
  get selectedHour() {
    return this._hour$.asObservable();
  }
  get selectedMinute() {
    return this._minute$.asObservable();
  }
  get selectedPeriod() {
    return this._period$.asObservable();
  }
  getFullTime(format) {
    const selectedHour = this._hour$.getValue().time;
    const selectedMinute = this._minute$.getValue().time;
    const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
    const minute = selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
    const period = format === 12 ? this._period$.getValue() : "";
    const time = `${hour}:${minute} ${period}`.trim();
    return NgxMatTimepickerAdapter.formatTime(time, {
      format
    });
  }
  setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
    time || this._resetTime();
    try {
      if (NgxMatTimepickerAdapter.isTimeAvailable(time, min, max, "minutes", minutesGap)) {
        this._setDefaultTime(time, format);
      }
    } catch (e) {
      console.error(e);
    }
  }
  _resetTime() {
    this.hour = __spreadValues({}, DEFAULT_HOUR);
    this.minute = __spreadValues({}, DEFAULT_MINUTE);
    this.period = NgxMatTimepickerPeriods.AM;
  }
  _setDefaultTime(time, format) {
    const defaultDto = NgxMatTimepickerAdapter.parseTime(time, {
      format
    });
    if (defaultDto.isValid) {
      const period = time.substring(time.length - 2).toUpperCase();
      const hour = defaultDto.hour;
      this.hour = __spreadProps(__spreadValues({}, DEFAULT_HOUR), {
        time: formatHourByPeriod(hour, period)
      });
      this.minute = __spreadProps(__spreadValues({}, DEFAULT_MINUTE), {
        time: defaultDto.minute
      });
      this.period = period;
    } else {
      this._resetTime();
    }
  }
};
_NgxMatTimepickerService.ɵfac = function NgxMatTimepickerService_Factory(t) {
  return new (t || _NgxMatTimepickerService)();
};
_NgxMatTimepickerService.ɵprov = ɵɵdefineInjectable({
  token: _NgxMatTimepickerService,
  factory: _NgxMatTimepickerService.ɵfac,
  providedIn: "root"
});
var NgxMatTimepickerService = _NgxMatTimepickerService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function formatHourByPeriod(hour, period) {
  switch (period) {
    case NgxMatTimepickerPeriods.AM:
      return hour === 0 ? 12 : hour;
    case NgxMatTimepickerPeriods.PM:
      return hour === 12 ? 12 : hour - 12;
    default:
      return hour;
  }
}
var _NgxMatTimepickerEventService = class _NgxMatTimepickerEventService {
  get backdropClick() {
    return this._backdropClick$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  get keydownEvent() {
    return this._keydownEvent$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  constructor() {
    this._backdropClick$ = new Subject();
    this._keydownEvent$ = new Subject();
  }
  dispatchEvent(event) {
    switch (event.type) {
      case "click":
        this._backdropClick$.next(event);
        break;
      case "keydown":
        this._keydownEvent$.next(event);
        break;
      default:
        throw new Error("no such event type");
    }
  }
};
_NgxMatTimepickerEventService.ɵfac = function NgxMatTimepickerEventService_Factory(t) {
  return new (t || _NgxMatTimepickerEventService)();
};
_NgxMatTimepickerEventService.ɵprov = ɵɵdefineInjectable({
  token: _NgxMatTimepickerEventService,
  factory: _NgxMatTimepickerEventService.ɵfac,
  providedIn: "root"
});
var NgxMatTimepickerEventService = _NgxMatTimepickerEventService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerEventService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NGX_MAT_TIMEPICKER_LOCALE = new InjectionToken("TimeLocale", {
  providedIn: "root",
  factory: () => NgxMatTimepickerAdapter.defaultLocale
});
var _NgxMatTimepickerLocaleService = class _NgxMatTimepickerLocaleService {
  get locale() {
    return this._locale;
  }
  constructor(initialLocale) {
    this._locale = initialLocale;
  }
  updateLocale(newValue) {
    this._locale = newValue || this._initialLocale;
  }
};
_NgxMatTimepickerLocaleService.ɵfac = function NgxMatTimepickerLocaleService_Factory(t) {
  return new (t || _NgxMatTimepickerLocaleService)(ɵɵinject(NGX_MAT_TIMEPICKER_LOCALE));
};
_NgxMatTimepickerLocaleService.ɵprov = ɵɵdefineInjectable({
  token: _NgxMatTimepickerLocaleService,
  factory: _NgxMatTimepickerLocaleService.ɵfac,
  providedIn: "root"
});
var NgxMatTimepickerLocaleService = _NgxMatTimepickerLocaleService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerLocaleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_LOCALE]
    }]
  }], null);
})();
var _NgxMatTimepickerBaseDirective = class _NgxMatTimepickerBaseDirective {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get defaultTime() {
    return this._defaultTime;
  }
  set defaultTime(time) {
    this._defaultTime = time;
    this._setDefaultTime(time);
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerSrv, _eventSrv, _timepickerLocaleSrv, data) {
    this._timepickerSrv = _timepickerSrv;
    this._eventSrv = _eventSrv;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this.data = data;
    this.activeTimeUnit = NgxMatTimepickerUnits.HOUR;
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
    this._subsCtrl$ = new Subject();
    this.color = data.color;
    this.defaultTime = data.defaultTime;
  }
  changePeriod(period) {
    this._timepickerSrv.period = period;
    this._onTimeChange();
  }
  changeTimeUnit(unit) {
    this.activeTimeUnit = unit;
  }
  close() {
    this.data.timepickerBaseRef.close();
  }
  ngOnDestroy() {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  ngOnInit() {
    this._defineTime();
    this.selectedHour = this._timepickerSrv.selectedHour.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedMinute = this._timepickerSrv.selectedMinute.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedPeriod = this._timepickerSrv.selectedPeriod.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.data.timepickerBaseRef.timeUpdated.pipe(takeUntil(this._subsCtrl$)).subscribe({
      next: (v) => {
        v && this._setDefaultTime(v);
      }
    });
  }
  onHourChange(hour) {
    this._timepickerSrv.hour = hour;
    this._onTimeChange();
  }
  onHourSelected(hour) {
    if (!this.data.hoursOnly) {
      this.changeTimeUnit(NgxMatTimepickerUnits.MINUTE);
    }
    this.data.timepickerBaseRef.hourSelected.next(hour);
  }
  onKeydown(e) {
    this._eventSrv.dispatchEvent(e);
    e.stopPropagation();
  }
  onMinuteChange(minute) {
    this._timepickerSrv.minute = minute;
    this._onTimeChange();
  }
  setTime() {
    this.data.timepickerBaseRef.timeSet.emit(this._timepickerSrv.getFullTime(this.data.format));
    this.close();
  }
  _defineTime() {
    const minTime = this.data.minTime;
    if (minTime && !this.data.time && !this.data.defaultTime) {
      const time = NgxMatTimepickerAdapter.fromDateTimeToString(minTime, this.data.format);
      this._setDefaultTime(time);
    }
  }
  _onTimeChange() {
    const time = NgxMatTimepickerAdapter.toLocaleTimeString(this._timepickerSrv.getFullTime(this.data.format), {
      locale: this._locale,
      format: this.data.format
    });
    this.data.timepickerBaseRef.timeChanged.emit(time);
  }
  _setDefaultTime(time) {
    this._timepickerSrv.setDefaultTimeIfAvailable(time, this.data.minTime, this.data.maxTime, this.data.format, this.data.minutesGap);
  }
};
_NgxMatTimepickerBaseDirective.ɵfac = function NgxMatTimepickerBaseDirective_Factory(t) {
  return new (t || _NgxMatTimepickerBaseDirective)(ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService), ɵɵdirectiveInject(NGX_MAT_TIMEPICKER_CONFIG));
};
_NgxMatTimepickerBaseDirective.ɵdir = ɵɵdefineDirective({
  type: _NgxMatTimepickerBaseDirective,
  selectors: [["", "ngxMatTimepickerBase", ""]],
  hostBindings: function NgxMatTimepickerBaseDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgxMatTimepickerBaseDirective_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
  },
  inputs: {
    color: "color",
    defaultTime: "defaultTime"
  },
  standalone: true
});
var NgxMatTimepickerBaseDirective = _NgxMatTimepickerBaseDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerBaseDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerBase]",
      standalone: true
    }]
  }], () => [{
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_CONFIG]
    }]
  }], {
    color: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var NgxMatTimepickerUtils = class {
  static get DEFAULT_MINUTES_GAP() {
    return 5;
  }
  static disableHours(hours, config2) {
    if (config2.min || config2.max) {
      return hours.map((value) => {
        const hour = NgxMatTimepickerAdapter.isTwentyFour(config2.format) ? value.time : NgxMatTimepickerAdapter.formatHour(value.time, config2.format, config2.period);
        const currentTime = DateTime.fromObject({
          hour
        }).toFormat(NgxMatTimepickerFormat.TWELVE);
        return __spreadProps(__spreadValues({}, value), {
          disabled: !NgxMatTimepickerAdapter.isTimeAvailable(currentTime, config2.min, config2.max, "hours")
        });
      });
    }
    return hours;
  }
  static disableMinutes(minutes, selectedHour, config2) {
    if (config2.min || config2.max) {
      const hour = NgxMatTimepickerAdapter.formatHour(selectedHour, config2.format, config2.period);
      let currentTime = DateTime.fromObject({
        hour,
        minute: 0
      });
      return minutes.map((value) => {
        currentTime = currentTime.set({
          minute: value.time
        });
        return __spreadProps(__spreadValues({}, value), {
          disabled: !NgxMatTimepickerAdapter.isTimeAvailable(currentTime.toFormat(NgxMatTimepickerFormat.TWELVE), config2.min, config2.max, "minutes")
        });
      });
    }
    return minutes;
  }
  static getHours(format) {
    return Array(format).fill(1).map((v, i) => {
      const angleStep = 30;
      const time = v + i;
      const angle = angleStep * time;
      return {
        time: time === 24 ? 0 : time,
        angle
      };
    });
  }
  static getMinutes(gap = 1) {
    const minutesCount = 60;
    const angleStep = 360 / minutesCount;
    const minutes = [];
    for (let i = 0; i < minutesCount; i++) {
      const angle = angleStep * i;
      if (i % gap === 0) {
        minutes.push({
          time: i,
          angle: angle !== 0 ? angle : 360
        });
      }
    }
    return minutes;
  }
  static isDigit(e) {
    if ([46, 8, 9, 27, 13].some((n2) => n2 === e.keyCode) || // Allow: Ctrl/cmd+A
    e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+C
    e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+X
    e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true) || // Allow: home, end, left, right, up, down
    e.keyCode >= 35 && e.keyCode <= 40) {
      return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
  }
};
var NgxMatTimepickerMeasure;
(function(NgxMatTimepickerMeasure2) {
  NgxMatTimepickerMeasure2["hour"] = "hour";
  NgxMatTimepickerMeasure2["minute"] = "minute";
})(NgxMatTimepickerMeasure || (NgxMatTimepickerMeasure = {}));
var _NgxMatTimepickerTimeLocalizerPipe = class _NgxMatTimepickerTimeLocalizerPipe {
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerLocaleSrv) {
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
  }
  transform(time, timeUnit, isKeyboardEnabled = false) {
    if (time == null || time === "") {
      return "";
    }
    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR: {
        const format = time === 0 || isKeyboardEnabled ? "HH" : "H";
        return this._formatTime(NgxMatTimepickerMeasure.hour, time, format);
      }
      case NgxMatTimepickerUnits.MINUTE:
        return this._formatTime(NgxMatTimepickerMeasure.minute, time, "mm");
      default:
        throw new Error(`There is no Time Unit with type ${timeUnit}`);
    }
  }
  _formatTime(timeMeasure, time, format) {
    try {
      return DateTime.fromObject({
        [timeMeasure]: +time
      }).setLocale(this._locale).toFormat(format);
    } catch {
      throw new Error(`Cannot format provided time - ${time} to locale - ${this._locale}`);
    }
  }
};
_NgxMatTimepickerTimeLocalizerPipe.ɵfac = function NgxMatTimepickerTimeLocalizerPipe_Factory(t) {
  return new (t || _NgxMatTimepickerTimeLocalizerPipe)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService, 16));
};
_NgxMatTimepickerTimeLocalizerPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeLocalizer",
  type: _NgxMatTimepickerTimeLocalizerPipe,
  pure: true,
  standalone: true
});
var NgxMatTimepickerTimeLocalizerPipe = _NgxMatTimepickerTimeLocalizerPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerTimeLocalizerPipe, [{
    type: Pipe,
    args: [{
      name: "timeLocalizer",
      standalone: true
    }]
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var _NgxMatTimepickerMinutesFormatterPipe = class _NgxMatTimepickerMinutesFormatterPipe {
  transform(minute, gap = NgxMatTimepickerUtils.DEFAULT_MINUTES_GAP) {
    if (!minute) {
      return minute;
    }
    return minute % gap === 0 ? minute : "";
  }
};
_NgxMatTimepickerMinutesFormatterPipe.ɵfac = function NgxMatTimepickerMinutesFormatterPipe_Factory(t) {
  return new (t || _NgxMatTimepickerMinutesFormatterPipe)();
};
_NgxMatTimepickerMinutesFormatterPipe.ɵpipe = ɵɵdefinePipe({
  name: "minutesFormatter",
  type: _NgxMatTimepickerMinutesFormatterPipe,
  pure: true,
  standalone: true
});
var NgxMatTimepickerMinutesFormatterPipe = _NgxMatTimepickerMinutesFormatterPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerMinutesFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "minutesFormatter",
      standalone: true
    }]
  }], null, null);
})();
var _NgxMatTimepickerActiveMinutePipe = class _NgxMatTimepickerActiveMinutePipe {
  transform(minute, currentMinute, gap, isClockFaceDisabled) {
    if (minute == null || isClockFaceDisabled) {
      return false;
    }
    return currentMinute === minute && minute % (gap || NgxMatTimepickerUtils.DEFAULT_MINUTES_GAP) === 0;
  }
};
_NgxMatTimepickerActiveMinutePipe.ɵfac = function NgxMatTimepickerActiveMinutePipe_Factory(t) {
  return new (t || _NgxMatTimepickerActiveMinutePipe)();
};
_NgxMatTimepickerActiveMinutePipe.ɵpipe = ɵɵdefinePipe({
  name: "activeMinute",
  type: _NgxMatTimepickerActiveMinutePipe,
  pure: true,
  standalone: true
});
var NgxMatTimepickerActiveMinutePipe = _NgxMatTimepickerActiveMinutePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerActiveMinutePipe, [{
    type: Pipe,
    args: [{
      name: "activeMinute",
      standalone: true
    }]
  }], null, null);
})();
var _NgxMatTimepickerActiveHourPipe = class _NgxMatTimepickerActiveHourPipe {
  transform(hour, currentHour, isClockFaceDisabled) {
    if (hour == null || isClockFaceDisabled) {
      return false;
    }
    return hour === currentHour;
  }
};
_NgxMatTimepickerActiveHourPipe.ɵfac = function NgxMatTimepickerActiveHourPipe_Factory(t) {
  return new (t || _NgxMatTimepickerActiveHourPipe)();
};
_NgxMatTimepickerActiveHourPipe.ɵpipe = ɵɵdefinePipe({
  name: "activeHour",
  type: _NgxMatTimepickerActiveHourPipe,
  pure: true,
  standalone: true
});
var NgxMatTimepickerActiveHourPipe = _NgxMatTimepickerActiveHourPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerActiveHourPipe, [{
    type: Pipe,
    args: [{
      name: "activeHour",
      standalone: true
    }]
  }], null, null);
})();
function roundAngle(angle, step) {
  return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
  if (y > y0 && x >= x0) {
    return 180 - currentAngle;
  } else if (y > y0 && x < x0) {
    return 180 + currentAngle;
  } else if (y < y0 && x < x0) {
    return 360 - currentAngle;
  } else {
    return currentAngle;
  }
}
var CLOCK_HAND_STYLES = {
  small: {
    height: "75px",
    top: "calc(50% - 75px)"
  },
  large: {
    height: "103px",
    top: "calc(50% - 103px)"
  }
};
var _NgxMatTimepickerFaceComponent = class _NgxMatTimepickerFaceComponent {
  constructor() {
    this.color = "primary";
    this.innerClockFaceSize = 85;
    this.timeChange = new EventEmitter();
    this.timeSelected = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
  }
  ngAfterViewInit() {
    this._setClockHandPosition();
    this._addTouchEvents();
  }
  ngOnChanges(changes) {
    const faceTimeChanges = changes["faceTime"];
    const selectedTimeChanges = changes["selectedTime"];
    if (faceTimeChanges && faceTimeChanges.currentValue && selectedTimeChanges && selectedTimeChanges.currentValue) {
      this.selectedTime = this.faceTime.find((time) => time.time === this.selectedTime.time);
    }
    if (selectedTimeChanges && selectedTimeChanges.currentValue) {
      this._setClockHandPosition();
    }
    if (faceTimeChanges && faceTimeChanges.currentValue) {
      setTimeout(() => this._selectAvailableTime());
    }
  }
  ngOnDestroy() {
    this._removeTouchEvents();
  }
  onMousedown(e) {
    e.preventDefault();
    this._isStarted = true;
  }
  onMouseup(e) {
    e.preventDefault();
    this._isStarted = false;
  }
  selectTime(e) {
    if (!this._isStarted && e instanceof MouseEvent && e.type !== "click") {
      return;
    }
    const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
    const centerX = clockFaceCords.left + clockFaceCords.width / 2;
    const centerY = clockFaceCords.top + clockFaceCords.height / 2;
    const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
    const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
    const isInnerClockChosen = this.format && this._isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
    const angleStep = this.unit === NgxMatTimepickerUnits.MINUTE ? 6 * (this.minutesGap || 1) : 30;
    const roundedAngle = roundAngle(circleAngle, angleStep);
    const angle = (roundedAngle || 360) + (isInnerClockChosen ? 360 : 0);
    const selectedTime = this.faceTime.find((val) => val.angle === angle);
    if (selectedTime && !selectedTime.disabled) {
      this.timeChange.next(selectedTime);
      if (!this._isStarted) {
        this.timeSelected.next(selectedTime.time);
      }
    }
  }
  trackByTime(_item_, time) {
    return time.time;
  }
  _addTouchEvents() {
    this._touchStartHandler = this.onMousedown.bind(this);
    this._touchEndHandler = this.onMouseup.bind(this);
    this.clockFace.nativeElement.addEventListener("touchstart", this._touchStartHandler);
    this.clockFace.nativeElement.addEventListener("touchend", this._touchEndHandler);
  }
  _decreaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
  }
  _increaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
  }
  _isInnerClockFace(x0, y0, x, y) {
    return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
  }
  _removeTouchEvents() {
    this.clockFace.nativeElement.removeEventListener("touchstart", this._touchStartHandler);
    this.clockFace.nativeElement.removeEventListener("touchend", this._touchEndHandler);
  }
  _selectAvailableTime() {
    const currentTime = this.faceTime.find((time) => this.selectedTime.time === time.time);
    this.isClockFaceDisabled = this.faceTime.every((time) => time.disabled);
    if (currentTime && currentTime.disabled && !this.isClockFaceDisabled) {
      const availableTime = this.faceTime.find((time) => !time.disabled);
      this.timeChange.next(availableTime);
    }
  }
  _setClockHandPosition() {
    if (NgxMatTimepickerAdapter.isTwentyFour(this.format)) {
      if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
        this._decreaseClockHand();
      } else {
        this._increaseClockHand();
      }
    }
    if (this.selectedTime) {
      this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
  }
};
_NgxMatTimepickerFaceComponent.ɵfac = function NgxMatTimepickerFaceComponent_Factory(t) {
  return new (t || _NgxMatTimepickerFaceComponent)();
};
_NgxMatTimepickerFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerFaceComponent,
  selectors: [["ngx-mat-timepicker-face"]],
  viewQuery: function NgxMatTimepickerFaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c02, 7);
      ɵɵviewQuery(_c12, 7, ElementRef);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockFace = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockHand = _t.first);
    }
  },
  hostBindings: function NgxMatTimepickerFaceComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mousedown", function NgxMatTimepickerFaceComponent_mousedown_HostBindingHandler($event) {
        return ctx.onMousedown($event);
      })("mouseup", function NgxMatTimepickerFaceComponent_mouseup_HostBindingHandler($event) {
        return ctx.onMouseup($event);
      })("click", function NgxMatTimepickerFaceComponent_click_HostBindingHandler($event) {
        return ctx.selectTime($event);
      })("touchmove", function NgxMatTimepickerFaceComponent_touchmove_HostBindingHandler($event) {
        return ctx.selectTime($event.changedTouches[0]);
      })("touchend", function NgxMatTimepickerFaceComponent_touchend_HostBindingHandler($event) {
        return ctx.selectTime($event.changedTouches[0]);
      })("mousemove", function NgxMatTimepickerFaceComponent_mousemove_HostBindingHandler($event) {
        return ctx.selectTime($event);
      });
    }
  },
  inputs: {
    color: "color",
    dottedMinutesInGap: "dottedMinutesInGap",
    faceTime: "faceTime",
    format: "format",
    minutesGap: "minutesGap",
    selectedTime: "selectedTime",
    unit: "unit"
  },
  outputs: {
    timeChange: "timeChange",
    timeSelected: "timeSelected"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c2,
  decls: 11,
  vars: 9,
  consts: [["hourButton", ""], ["minutesFace", ""], ["clockFace", ""], ["clockHand", ""], ["current", ""], [1, "clock-face"], ["class", "clock-face__container", 4, "ngIf", "ngIfElse"], [1, "clock-face__clock-hand", 3, "color", "ngClass", "hidden"], ["mat-mini-fab", "", 3, "color", 4, "ngIf"], [1, "clock-face__center", 3, "color"], ["mat-mini-fab", "", "disableRipple", "", 1, "mat-elevation-z0", 3, "color", "ngStyle", "disabled"], [1, "clock-face__container"], ["class", "clock-face__number clock-face__number--outer", 3, "ngStyle", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "clock-face__number", "clock-face__number--outer", 3, "ngStyle"], ["type", "hidden", 3, "value"], ["class", "clock-face__inner", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "clock-face__inner"], ["class", "clock-face__number clock-face__number--inner", 3, "top", "ngStyle", "height", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "clock-face__number", "clock-face__number--inner", 3, "ngStyle"], ["mat-mini-fab", "", 3, "color"], [1, "clock-face__clock-hand_minute_dot"]],
  template: function NgxMatTimepickerFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c2);
      ɵɵtemplate(0, NgxMatTimepickerFaceComponent_ng_template_0_Template, 4, 13, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerFaceComponent_ng_template_2_Template, 2, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
      ɵɵelementStart(4, "div", 5, 2);
      ɵɵtemplate(6, NgxMatTimepickerFaceComponent_div_6_Template, 4, 7, "div", 6);
      ɵɵelementStart(7, "mat-toolbar", 7, 3);
      ɵɵtemplate(9, NgxMatTimepickerFaceComponent_button_9_Template, 2, 1, "button", 8);
      ɵɵelementEnd();
      ɵɵelement(10, "mat-toolbar", 9);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      const minutesFace_r8 = ɵɵreference(3);
      ɵɵadvance(6);
      ɵɵproperty("ngIf", ctx.unit !== ctx.timeUnit.MINUTE)("ngIfElse", minutesFace_r8);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color)("ngClass", ɵɵpureFunction1(7, _c3, ctx.unit === ctx.timeUnit.MINUTE))("hidden", ctx.isClockFaceDisabled);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.unit === ctx.timeUnit.MINUTE);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color);
    }
  },
  dependencies: [MatButtonModule, MatMiniFabButton, NgStyle, NgForOf, NgIf, NgTemplateOutlet, MatToolbarModule, MatToolbar, NgClass, SlicePipe, NgxMatTimepickerActiveHourPipe, NgxMatTimepickerActiveMinutePipe, NgxMatTimepickerMinutesFormatterPipe, NgxMatTimepickerTimeLocalizerPipe],
  styles: ['ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed{--mdc-fab-small-container-color: transparent;--mat-fab-small-disabled-state-container-color: transparent;--mat-fab-hover-state-layer-opacity: 0;box-shadow:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed .mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot{position:relative}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot:after{content:" ";background-color:#777;width:3px;height:3px;border-radius:50%;left:50%;top:50%;position:absolute;transform:translate(-50%,-50%)}ngx-mat-timepicker-face .clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;box-sizing:border-box;background-color:#c8c8c880!important}ngx-mat-timepicker-face .clock-face__inner{position:absolute;top:0;left:0;width:100%;height:100%}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void{box-shadow:none;background-color:transparent}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void>span.mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face .clock-face__container{margin-left:-2px}ngx-mat-timepicker-face .clock-face__number{position:absolute;transform-origin:25px 100%;width:50px;text-align:center;z-index:2;top:calc(50% - 125px);left:calc(50% - 25px)}ngx-mat-timepicker-face .clock-face__number--outer{height:125px}ngx-mat-timepicker-face .clock-face__number--outer>span{font-size:16px}ngx-mat-timepicker-face .clock-face__number--inner>span{font-size:14px}ngx-mat-timepicker-face .clock-face__clock-hand{height:103px;width:2px;padding:0;transform-origin:1px 100%;position:absolute;top:calc(50% - 103px);z-index:1}ngx-mat-timepicker-face .clock-face__center{width:8px;height:8px;padding:0;position:absolute;border-radius:50%;top:50%;left:50%;margin:-4px}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button{position:absolute;top:-22px;left:calc(50% - 20px);box-sizing:content-box;display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button .clock-face__clock-hand_minute_dot{display:block;width:4px;height:4px;background:#fff;border-radius:50%}@media (max-device-width: 1023px) and (orientation: landscape){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}@media screen and (max-width: 360px){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}\n'],
  encapsulation: 2,
  changeDetection: 0
});
var NgxMatTimepickerFaceComponent = _NgxMatTimepickerFaceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [MatButtonModule, NgStyle, NgForOf, NgIf, NgTemplateOutlet, MatToolbarModule, NgClass, SlicePipe, NgxMatTimepickerActiveHourPipe, NgxMatTimepickerActiveMinutePipe, NgxMatTimepickerMinutesFormatterPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<!-- DEFAULT TEMPLATES - START -->\r
<ng-template #hourButton\r
             let-time>\r
    <button mat-mini-fab\r
            disableRipple\r
            class="mat-elevation-z0"\r
            [color]="(time.time | activeHour: selectedTime?.time : isClockFaceDisabled) ? color : undefined"\r
            [ngStyle]="{'transform': 'rotateZ(-'+ time.angle +'deg)'}"\r
            [disabled]="time.disabled">\r
        {{time.time | timeLocalizer: timeUnit.HOUR}}\r
    </button>\r
</ng-template>\r
<ng-template #minutesFace>\r
    <div class="clock-face__container">\r
        <div class="clock-face__number clock-face__number--outer"\r
             [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"\r
             *ngFor="let time of faceTime; trackBy: trackByTime">\r
			<input #current\r
				   type="hidden"\r
				   [value]="time.time | minutesFormatter: minutesGap | timeLocalizer: timeUnit.MINUTE" />\r
            <button mat-mini-fab\r
                    disableRipple\r
                    class="mat-elevation-z0"\r
					[class.dot]="dottedMinutesInGap && current.value === '' && !(time.time | activeMinute: selectedTime?.time:1:isClockFaceDisabled)"\r
                    [color]="(time.time | activeMinute: selectedTime?.time:minutesGap:isClockFaceDisabled) ? color : undefined"\r
                    [ngStyle]="{'transform': 'rotateZ(-'+ time.angle +'deg)'}"\r
                    [disabled]="time.disabled">\r
                {{current.value}}\r
            </button>\r
        </div>\r
    </div>\r
</ng-template>\r
<!-- DEFAULT TEMPLATES - END -->\r
<div class="clock-face"\r
     #clockFace>\r
    <div *ngIf="unit !== timeUnit.MINUTE;else minutesFace"\r
         class="clock-face__container">\r
        <div class="clock-face__number clock-face__number--outer"\r
             [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"\r
             *ngFor="let time of faceTime | slice: 0 : 12; trackBy: trackByTime">\r
            <ng-content *ngTemplateOutlet="hourButton; context: {$implicit: time}"></ng-content>\r
        </div>\r
        <div class="clock-face__inner"\r
             *ngIf="faceTime.length > 12">\r
            <div class="clock-face__number clock-face__number--inner"\r
                 [style.top]="'calc(50% - ' + innerClockFaceSize + 'px)'"\r
                 [ngStyle]="{'transform': 'rotateZ('+ time.angle +'deg)'}"\r
                 [style.height.px]="innerClockFaceSize"\r
                 *ngFor="let time of faceTime | slice: 12 : 24; trackBy: trackByTime">\r
                <ng-content *ngTemplateOutlet="hourButton; context: {$implicit: time}"></ng-content>\r
            </div>\r
        </div>\r
    </div>\r
    <mat-toolbar class="clock-face__clock-hand"\r
                 [color]="color"\r
                 [ngClass]="{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}"\r
                 #clockHand\r
                 [hidden]="isClockFaceDisabled">\r
        <button mat-mini-fab\r
                *ngIf="unit === timeUnit.MINUTE"\r
                [color]="color">\r
            <span class="clock-face__clock-hand_minute_dot"></span>\r
        </button>\r
    </mat-toolbar>\r
    <mat-toolbar class="clock-face__center"\r
                 [color]="color"></mat-toolbar>\r
</div>\r
`,
      styles: ['ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed{--mdc-fab-small-container-color: transparent;--mat-fab-small-disabled-state-container-color: transparent;--mat-fab-hover-state-layer-opacity: 0;box-shadow:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed .mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot{position:relative}ngx-mat-timepicker-face [mat-mini-fab].mat-unthemed.dot:after{content:" ";background-color:#777;width:3px;height:3px;border-radius:50%;left:50%;top:50%;position:absolute;transform:translate(-50%,-50%)}ngx-mat-timepicker-face .clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;box-sizing:border-box;background-color:#c8c8c880!important}ngx-mat-timepicker-face .clock-face__inner{position:absolute;top:0;left:0;width:100%;height:100%}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void{box-shadow:none;background-color:transparent}ngx-mat-timepicker-face .clock-face [mat-mini-fab].mat-void>span.mat-mdc-button-persistent-ripple{display:none}ngx-mat-timepicker-face .clock-face__container{margin-left:-2px}ngx-mat-timepicker-face .clock-face__number{position:absolute;transform-origin:25px 100%;width:50px;text-align:center;z-index:2;top:calc(50% - 125px);left:calc(50% - 25px)}ngx-mat-timepicker-face .clock-face__number--outer{height:125px}ngx-mat-timepicker-face .clock-face__number--outer>span{font-size:16px}ngx-mat-timepicker-face .clock-face__number--inner>span{font-size:14px}ngx-mat-timepicker-face .clock-face__clock-hand{height:103px;width:2px;padding:0;transform-origin:1px 100%;position:absolute;top:calc(50% - 103px);z-index:1}ngx-mat-timepicker-face .clock-face__center{width:8px;height:8px;padding:0;position:absolute;border-radius:50%;top:50%;left:50%;margin:-4px}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button{position:absolute;top:-22px;left:calc(50% - 20px);box-sizing:content-box;display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-face .clock-face__clock-hand_minute>button .clock-face__clock-hand_minute_dot{display:block;width:4px;height:4px;background:#fff;border-radius:50%}@media (max-device-width: 1023px) and (orientation: landscape){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}@media screen and (max-width: 360px){ngx-mat-timepicker-face .clock-face{width:250px;height:250px}}\n']
    }]
  }], null, {
    clockFace: [{
      type: ViewChild,
      args: ["clockFace", {
        static: true
      }]
    }],
    clockHand: [{
      type: ViewChild,
      args: ["clockHand", {
        static: true,
        read: ElementRef
      }]
    }],
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    faceTime: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    selectedTime: [{
      type: Input
    }],
    timeChange: [{
      type: Output
    }],
    timeSelected: [{
      type: Output
    }],
    unit: [{
      type: Input
    }],
    onMousedown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    onMouseup: [{
      type: HostListener,
      args: ["mouseup", ["$event"]]
    }],
    selectTime: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }, {
      type: HostListener,
      args: ["touchmove", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["touchend", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["mousemove", ["$event"]]
    }]
  });
})();
var _NgxMatTimepickerMinutesFaceComponent = class _NgxMatTimepickerMinutesFaceComponent {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  constructor() {
    this.minuteChange = new EventEmitter();
    this.minutesList = [];
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);
      this.minutesList = NgxMatTimepickerUtils.disableMinutes(minutes, this.selectedHour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
};
_NgxMatTimepickerMinutesFaceComponent.ɵfac = function NgxMatTimepickerMinutesFaceComponent_Factory(t) {
  return new (t || _NgxMatTimepickerMinutesFaceComponent)();
};
_NgxMatTimepickerMinutesFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerMinutesFaceComponent,
  selectors: [["ngx-mat-timepicker-minutes-face"]],
  inputs: {
    color: "color",
    dottedMinutesInGap: "dottedMinutesInGap",
    format: "format",
    maxTime: "maxTime",
    minTime: "minTime",
    minutesGap: "minutesGap",
    period: "period",
    selectedHour: "selectedHour",
    selectedMinute: "selectedMinute"
  },
  outputs: {
    minuteChange: "minuteChange"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 1,
  vars: 6,
  consts: [[3, "timeChange", "color", "dottedMinutesInGap", "faceTime", "selectedTime", "minutesGap", "unit"]],
  template: function NgxMatTimepickerMinutesFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMatTimepickerMinutesFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
        return ctx.minuteChange.next($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.color)("dottedMinutesInGap", ctx.dottedMinutesInGap)("faceTime", ctx.minutesList)("selectedTime", ctx.selectedMinute)("minutesGap", ctx.minutesGap)("unit", ctx.timeUnit.MINUTE);
    }
  },
  dependencies: [NgxMatTimepickerFaceComponent],
  encapsulation: 2
});
var NgxMatTimepickerMinutesFaceComponent = _NgxMatTimepickerMinutesFaceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerMinutesFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-minutes-face",
      standalone: true,
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\r\n						 [dottedMinutesInGap]="dottedMinutesInGap"\r\n						 [faceTime]="minutesList"\r\n						 [selectedTime]="selectedMinute"\r\n						 [minutesGap]="minutesGap"\r\n						 (timeChange)="minuteChange.next($event)"\r\n						 [unit]="timeUnit.MINUTE"></ngx-mat-timepicker-face>\r\n'
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minuteChange: [{
      type: Output
    }],
    minutesGap: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }],
    selectedMinute: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepickerHoursFaceDirective = class _NgxMatTimepickerHoursFaceDirective {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  set format(newValue) {
    this._format = newValue;
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
  }
  get format() {
    return this._format;
  }
  constructor() {
    this.hourChange = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.hoursList = [];
    this._color = "primary";
    this._format = 24;
  }
  onTimeSelected(time) {
    this.hourSelected.next(time);
  }
};
_NgxMatTimepickerHoursFaceDirective.ɵfac = function NgxMatTimepickerHoursFaceDirective_Factory(t) {
  return new (t || _NgxMatTimepickerHoursFaceDirective)();
};
_NgxMatTimepickerHoursFaceDirective.ɵdir = ɵɵdefineDirective({
  type: _NgxMatTimepickerHoursFaceDirective,
  selectors: [["", "ngxMatTimepickerHoursFace", ""]],
  inputs: {
    color: "color",
    format: "format",
    maxTime: "maxTime",
    minTime: "minTime",
    selectedHour: "selectedHour"
  },
  outputs: {
    hourChange: "hourChange",
    hourSelected: "hourSelected"
  },
  standalone: true
});
var NgxMatTimepickerHoursFaceDirective = _NgxMatTimepickerHoursFaceDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerHoursFaceDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerHoursFace]",
      standalone: true
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hourChange: [{
      type: Output
    }],
    hourSelected: [{
      type: Output
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepicker12HoursFaceComponent = class _NgxMatTimepicker12HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  constructor() {
    super();
    this.format = 12;
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
};
_NgxMatTimepicker12HoursFaceComponent.ɵfac = function NgxMatTimepicker12HoursFaceComponent_Factory(t) {
  return new (t || _NgxMatTimepicker12HoursFaceComponent)();
};
_NgxMatTimepicker12HoursFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepicker12HoursFaceComponent,
  selectors: [["ngx-mat-timepicker-12-hours-face"]],
  inputs: {
    period: "period"
  },
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 1,
  vars: 3,
  consts: [[3, "timeChange", "timeSelected", "color", "selectedTime", "faceTime"]],
  template: function NgxMatTimepicker12HoursFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMatTimepicker12HoursFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
        return ctx.hourChange.next($event);
      })("timeSelected", function NgxMatTimepicker12HoursFaceComponent_Template_ngx_mat_timepicker_face_timeSelected_0_listener($event) {
        return ctx.onTimeSelected($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.color)("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList);
    }
  },
  dependencies: [NgxMatTimepickerFaceComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NgxMatTimepicker12HoursFaceComponent = _NgxMatTimepicker12HoursFaceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepicker12HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-12-hours-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\r\n                     [selectedTime]="selectedHour"\r\n                     [faceTime]="hoursList"\r\n                     (timeChange)="hourChange.next($event)"\r\n                     (timeSelected)="onTimeSelected($event)"></ngx-mat-timepicker-face>\r\n'
    }]
  }], () => [], {
    period: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepicker24HoursFaceComponent = class _NgxMatTimepicker24HoursFaceComponent extends NgxMatTimepickerHoursFaceDirective {
  constructor() {
    super();
    this.format = 24;
  }
  ngAfterContentInit() {
    this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
      min: this.minTime,
      max: this.maxTime,
      format: this.format
    });
  }
};
_NgxMatTimepicker24HoursFaceComponent.ɵfac = function NgxMatTimepicker24HoursFaceComponent_Factory(t) {
  return new (t || _NgxMatTimepicker24HoursFaceComponent)();
};
_NgxMatTimepicker24HoursFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepicker24HoursFaceComponent,
  selectors: [["ngx-mat-timepicker-24-hours-face"]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  decls: 1,
  vars: 4,
  consts: [[3, "timeChange", "timeSelected", "color", "selectedTime", "faceTime", "format"]],
  template: function NgxMatTimepicker24HoursFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-mat-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMatTimepicker24HoursFaceComponent_Template_ngx_mat_timepicker_face_timeChange_0_listener($event) {
        return ctx.hourChange.next($event);
      })("timeSelected", function NgxMatTimepicker24HoursFaceComponent_Template_ngx_mat_timepicker_face_timeSelected_0_listener($event) {
        return ctx.onTimeSelected($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.color)("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList)("format", ctx.format);
    }
  },
  dependencies: [NgxMatTimepickerFaceComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NgxMatTimepicker24HoursFaceComponent = _NgxMatTimepicker24HoursFaceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepicker24HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-24-hours-face",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgxMatTimepickerFaceComponent],
      template: '<ngx-mat-timepicker-face [color]="color"\r\n                     [selectedTime]="selectedHour"\r\n                     [faceTime]="hoursList"\r\n                     [format]="format"\r\n                     (timeChange)="hourChange.next($event)"\r\n                     (timeSelected)="onTimeSelected($event)"></ngx-mat-timepicker-face>\r\n'
    }]
  }], () => [], null);
})();
var _NgxMatTimepickerPeriodComponent = class _NgxMatTimepickerPeriodComponent {
  constructor(_overlay) {
    this._overlay = _overlay;
    this.isPeriodAvailable = true;
    this.overlayScrollStrategy = this._overlay.scrollStrategies.reposition();
    this.periodChanged = new EventEmitter();
    this.timePeriod = NgxMatTimepickerPeriods;
  }
  animationDone() {
    this.isPeriodAvailable = true;
  }
  changePeriod(period) {
    this.isPeriodAvailable = this._isSwitchPeriodAvailable(period);
    if (this.isPeriodAvailable) {
      this.periodChanged.next(period);
    }
  }
  _getDisabledTimeByPeriod(period) {
    switch (this.activeTimeUnit) {
      case NgxMatTimepickerUnits.HOUR:
        return NgxMatTimepickerUtils.disableHours(this.hours, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      case NgxMatTimepickerUnits.MINUTE:
        return NgxMatTimepickerUtils.disableMinutes(this.minutes, +this.selectedHour, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      default:
        throw new Error("no such NgxMatTimepickerUnits");
    }
  }
  _isSwitchPeriodAvailable(period) {
    const time = this._getDisabledTimeByPeriod(period);
    return !time.every((t) => t.disabled);
  }
};
_NgxMatTimepickerPeriodComponent.ɵfac = function NgxMatTimepickerPeriodComponent_Factory(t) {
  return new (t || _NgxMatTimepickerPeriodComponent)(ɵɵdirectiveInject(Overlay));
};
_NgxMatTimepickerPeriodComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerPeriodComponent,
  selectors: [["ngx-mat-timepicker-period"]],
  inputs: {
    activeTimeUnit: "activeTimeUnit",
    format: "format",
    hours: "hours",
    maxTime: "maxTime",
    meridiems: "meridiems",
    minTime: "minTime",
    minutes: "minutes",
    selectedHour: "selectedHour",
    selectedPeriod: "selectedPeriod"
  },
  outputs: {
    periodChanged: "periodChanged"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 7,
  vars: 12,
  consts: [["eventPanelOrigin", "cdkOverlayOrigin"], ["cdkOverlayOrigin", "", 1, "timepicker-period"], ["type", "button", 1, "timepicker-dial__item", "timepicker-period__btn", 3, "click", "ngClass"], ["cdkConnectedOverlay", "", "cdkConnectedOverlayPanelClass", "todo-remove-pointer-events-if-necessary", 3, "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"], ["class", "timepicker-period__warning", 4, "ngIf"], [1, "timepicker-period__warning"]],
  template: function NgxMatTimepickerPeriodComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 1, 0)(2, "button", 2);
      ɵɵlistener("click", function NgxMatTimepickerPeriodComponent_Template_button_click_2_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changePeriod(ctx.timePeriod.AM));
      });
      ɵɵtext(3);
      ɵɵelementEnd();
      ɵɵelementStart(4, "button", 2);
      ɵɵlistener("click", function NgxMatTimepickerPeriodComponent_Template_button_click_4_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changePeriod(ctx.timePeriod.PM));
      });
      ɵɵtext(5);
      ɵɵelementEnd()();
      ɵɵtemplate(6, NgxMatTimepickerPeriodComponent_ng_template_6_Template, 1, 1, "ng-template", 3);
    }
    if (rf & 2) {
      const eventPanelOrigin_r4 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c6, ctx.selectedPeriod === ctx.timePeriod.AM));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.meridiems[0]);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c6, ctx.selectedPeriod === ctx.timePeriod.PM));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.meridiems[1]);
      ɵɵadvance();
      ɵɵproperty("cdkConnectedOverlayScrollStrategy", ctx.overlayScrollStrategy)("cdkConnectedOverlayPositionStrategy", ctx.overlayPositionStrategy)("cdkConnectedOverlayOrigin", eventPanelOrigin_r4)("cdkConnectedOverlayOpen", !ctx.isPeriodAvailable);
    }
  },
  dependencies: [CdkOverlayOrigin, NgClass, CdkConnectedOverlay, NgIf],
  styles: [".timepicker-period[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}.timepicker-period__btn[_ngcontent-%COMP%]{opacity:.5;padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;user-select:none;outline:none;border-radius:3px;transition:background-color .5s;color:inherit}.timepicker-period__btn.active[_ngcontent-%COMP%]{opacity:1}.timepicker-period__btn[_ngcontent-%COMP%]:focus{background-color:#00000012}.timepicker-period__warning[_ngcontent-%COMP%]{padding:5px 10px;border-radius:3px;background-color:#0000008c;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin:0;font-size:12px;font-weight:700;color:#fff}"],
  data: {
    animation: [trigger("scaleInOut", [transition(":enter", [style({
      transform: "scale(0)"
    }), animate(".2s", style({
      transform: "scale(1)"
    })), sequence([animate("3s", style({
      opacity: 1
    })), animate(".3s", style({
      opacity: 0
    }))])])])]
  }
});
var NgxMatTimepickerPeriodComponent = _NgxMatTimepickerPeriodComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerPeriodComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-period",
      animations: [trigger("scaleInOut", [transition(":enter", [style({
        transform: "scale(0)"
      }), animate(".2s", style({
        transform: "scale(1)"
      })), sequence([animate("3s", style({
        opacity: 1
      })), animate(".3s", style({
        opacity: 0
      }))])])])],
      standalone: true,
      imports: [CdkOverlayOrigin, NgClass, CdkConnectedOverlay, NgIf],
      template: `<div class="timepicker-period"\r
	 cdkOverlayOrigin\r
     #eventPanelOrigin="cdkOverlayOrigin">\r
	<button class="timepicker-dial__item timepicker-period__btn"\r
			[ngClass]="{'active': selectedPeriod === timePeriod.AM}"\r
			(click)="changePeriod(timePeriod.AM)"\r
			type="button">{{meridiems[0]}}</button>\r
	<button class="timepicker-dial__item timepicker-period__btn"\r
			[ngClass]="{'active': selectedPeriod === timePeriod.PM}"\r
			(click)="changePeriod(timePeriod.PM)"\r
			type="button">{{meridiems[1]}}</button>\r
</div>\r
<ng-template\r
		cdkConnectedOverlay\r
		cdkConnectedOverlayPanelClass="todo-remove-pointer-events-if-necessary"\r
		[cdkConnectedOverlayScrollStrategy]="overlayScrollStrategy"\r
		[cdkConnectedOverlayPositionStrategy]="overlayPositionStrategy"\r
		[cdkConnectedOverlayOrigin]="eventPanelOrigin"\r
		[cdkConnectedOverlayOpen]="!isPeriodAvailable">\r
	<div class="timepicker-period__warning"\r
		 *ngIf="!isPeriodAvailable"\r
		 [@scaleInOut]\r
		 (@scaleInOut.done)="animationDone()">\r
		<p>Current time would be invalid in this period.</p>\r
	</div>\r
</ng-template>\r
`,
      styles: [".timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{opacity:.5;padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;user-select:none;outline:none;border-radius:3px;transition:background-color .5s;color:inherit}.timepicker-period__btn.active{opacity:1}.timepicker-period__btn:focus{background-color:#00000012}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:#0000008c;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-weight:700;color:#fff}\n"]
    }]
  }], () => [{
    type: Overlay
  }], {
    activeTimeUnit: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hours: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    meridiems: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minutes: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }],
    selectedHour: [{
      type: Input
    }],
    selectedPeriod: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepickerParserPipe = class _NgxMatTimepickerParserPipe {
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerLocaleSrv) {
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this._numberingSystem = DateTime.local().setLocale(this._locale).resolvedLocaleOptions().numberingSystem;
  }
  transform(time, timeUnit = NgxMatTimepickerUnits.HOUR) {
    if (time == null || time === "") {
      return "";
    }
    if (!isNaN(+time)) {
      return `${time}`;
    }
    if (timeUnit === NgxMatTimepickerUnits.MINUTE) {
      return this._parseTime(time, "mm", NgxMatTimepickerMeasure.minute).toString();
    }
    return this._parseTime(time, "HH", NgxMatTimepickerMeasure.hour).toString();
  }
  _parseTime(time, format, timeMeasure) {
    const parsedTime = DateTime.fromFormat(String(time), format, {
      numberingSystem: this._numberingSystem
    })[timeMeasure];
    if (!isNaN(parsedTime)) {
      return parsedTime;
    }
    throw new Error(`Cannot parse time - ${time}`);
  }
};
_NgxMatTimepickerParserPipe.ɵfac = function NgxMatTimepickerParserPipe_Factory(t) {
  return new (t || _NgxMatTimepickerParserPipe)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService, 16));
};
_NgxMatTimepickerParserPipe.ɵpipe = ɵɵdefinePipe({
  name: "ngxMatTimepickerParser",
  type: _NgxMatTimepickerParserPipe,
  pure: true,
  standalone: true
});
_NgxMatTimepickerParserPipe.ɵprov = ɵɵdefineInjectable({
  token: _NgxMatTimepickerParserPipe,
  factory: _NgxMatTimepickerParserPipe.ɵfac
});
var NgxMatTimepickerParserPipe = _NgxMatTimepickerParserPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerParserPipe, [{
    type: Pipe,
    args: [{
      name: "ngxMatTimepickerParser",
      standalone: true
    }]
  }, {
    type: Injectable
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var _NgxMatTimepickerAutofocusDirective = class _NgxMatTimepickerAutofocusDirective {
  constructor(_element, _document) {
    this._element = _element;
    this._document = _document;
    this._activeElement = this._document.activeElement;
  }
  ngOnChanges() {
    if (this.isFocusActive) {
      setTimeout(() => this._element.nativeElement.focus({
        preventScroll: true
      }));
    }
  }
  ngOnDestroy() {
    setTimeout(() => this._activeElement.focus({
      preventScroll: true
    }));
  }
};
_NgxMatTimepickerAutofocusDirective.ɵfac = function NgxMatTimepickerAutofocusDirective_Factory(t) {
  return new (t || _NgxMatTimepickerAutofocusDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT, 8));
};
_NgxMatTimepickerAutofocusDirective.ɵdir = ɵɵdefineDirective({
  type: _NgxMatTimepickerAutofocusDirective,
  selectors: [["", "ngxMatTimepickerAutofocus", ""]],
  inputs: {
    isFocusActive: [InputFlags.None, "ngxMatTimepickerAutofocus", "isFocusActive"]
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature]
});
var NgxMatTimepickerAutofocusDirective = _NgxMatTimepickerAutofocusDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerAutofocusDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerAutofocus]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    isFocusActive: [{
      type: Input,
      args: ["ngxMatTimepickerAutofocus"]
    }]
  });
})();
function retainSelection() {
  this.selectionStart = this.selectionEnd;
}
var _NgxMatTimepickerDialControlComponent = class _NgxMatTimepickerDialControlComponent {
  get _selectedTime() {
    if (!!this.time) {
      return this.timeList.find((t) => t.time === +this.time);
    }
    return void 0;
  }
  constructor(_elRef, _timeParserPipe) {
    this._elRef = _elRef;
    this._timeParserPipe = _timeParserPipe;
    this.focused = new EventEmitter();
    this.timeChanged = new EventEmitter();
    this.timeUnitChanged = new EventEmitter();
    this.unfocused = new EventEmitter();
  }
  changeTimeByKeyboard(e) {
    const char = String.fromCharCode(e.keyCode);
    if (isTimeDisabledToChange(this.time, char, this.timeList)) {
      e.preventDefault();
    }
  }
  ngAfterViewInit() {
    this._elRef.nativeElement.querySelector("input").addEventListener("select", retainSelection, false);
  }
  ngOnDestroy() {
    this._elRef.nativeElement.querySelector("input").removeEventListener("select", retainSelection);
  }
  onKeydown(e) {
    if (!NgxMatTimepickerUtils.isDigit(e)) {
      e.preventDefault();
    } else {
      this._changeTimeByArrow(e.keyCode);
    }
  }
  onModelChange(value) {
    this.time = this._timeParserPipe.transform(value, this.timeUnit);
  }
  saveTimeAndChangeTimeUnit(event, unit) {
    event.preventDefault();
    this.previousTime = this.time;
    this.timeUnitChanged.next(unit);
    this.focused.next();
  }
  updateTime() {
    if (this._selectedTime) {
      this.timeChanged.next(this._selectedTime);
      this.previousTime = this._selectedTime.time;
    }
  }
  _addTime(amount) {
    return `0${+this.time + amount}`.substr(-2);
  }
  _changeTimeByArrow(keyCode) {
    let time;
    if (keyCode === 38) {
      time = this._addTime(this.minutesGap || 1);
    } else if (keyCode === 40) {
      time = this._addTime(-1 * (this.minutesGap || 1));
    }
    if (!isTimeUnavailable(time, this.timeList)) {
      this.time = time;
      this.updateTime();
    }
  }
};
_NgxMatTimepickerDialControlComponent.ɵfac = function NgxMatTimepickerDialControlComponent_Factory(t) {
  return new (t || _NgxMatTimepickerDialControlComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxMatTimepickerParserPipe));
};
_NgxMatTimepickerDialControlComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerDialControlComponent,
  selectors: [["ngx-mat-timepicker-dial-control"]],
  inputs: {
    disabled: "disabled",
    isActive: "isActive",
    isEditable: "isEditable",
    minutesGap: "minutesGap",
    time: "time",
    timeList: "timeList",
    timeUnit: "timeUnit"
  },
  outputs: {
    focused: "focused",
    timeChanged: "timeChanged",
    timeUnitChanged: "timeUnitChanged",
    unfocused: "unfocused"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([NgxMatTimepickerParserPipe]), ɵɵStandaloneFeature],
  decls: 3,
  vars: 2,
  consts: [["editableTemplate", ""], ["class", "timepicker-dial__control timepicker-dial__item", "readonly", "", 3, "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus", "ngModelChange", "input", "focus", 4, "ngIf", "ngIfElse"], ["readonly", "", 1, "timepicker-dial__control", "timepicker-dial__item", 3, "ngModelChange", "input", "focus", "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus"], [1, "timepicker-dial__control", "timepicker-dial__item", "timepicker-dial__control_editable", 3, "ngModelChange", "input", "focus", "keydown", "keypress", "ngClass", "ngModel", "disabled", "ngxMatTimepickerAutofocus"]],
  template: function NgxMatTimepickerDialControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NgxMatTimepickerDialControlComponent_input_0_Template, 2, 10, "input", 1)(1, NgxMatTimepickerDialControlComponent_ng_template_1_Template, 3, 13, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const editableTemplate_r4 = ɵɵreference(2);
      ɵɵproperty("ngIf", !ctx.isEditable)("ngIfElse", editableTemplate_r4);
    }
  },
  dependencies: [NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgClass, NgxMatTimepickerAutofocusDirective, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
  styles: [".timepicker-dial__control[_ngcontent-%COMP%]{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:center;color:inherit}.timepicker-dial__control[_ngcontent-%COMP%]:focus{outline:none;background-color:#0000001a}.timepicker-dial__control[_ngcontent-%COMP%]:disabled{cursor:default}"]
});
var NgxMatTimepickerDialControlComponent = _NgxMatTimepickerDialControlComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dial-control",
      providers: [NgxMatTimepickerParserPipe],
      standalone: true,
      imports: [NgIf, FormsModule, NgClass, NgxMatTimepickerAutofocusDirective, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<input class="timepicker-dial__control timepicker-dial__item"\r
       [ngClass]="{'active': isActive}"\r
       [ngModel]="time | timeLocalizer: timeUnit: true"\r
       (ngModelChange)="time = $event"\r
       [disabled]="disabled"\r
       (input)="updateTime()"\r
       (focus)="saveTimeAndChangeTimeUnit($event, timeUnit)"\r
       readonly\r
       [ngxMatTimepickerAutofocus]="isActive"\r
       *ngIf="!isEditable;else editableTemplate">\r
\r
<ng-template #editableTemplate>\r
    <input class="timepicker-dial__control timepicker-dial__item timepicker-dial__control_editable"\r
           [ngClass]="{'active': isActive}"\r
           [ngModel]="time | ngxMatTimepickerParser: timeUnit | timeLocalizer: timeUnit : true"\r
           (ngModelChange)="onModelChange($event)"\r
           [disabled]="disabled"\r
           (input)="updateTime()"\r
           (focus)="saveTimeAndChangeTimeUnit($event, timeUnit)"\r
           [ngxMatTimepickerAutofocus]="isActive"\r
           (keydown)="onKeydown($event)"\r
           (keypress)="changeTimeByKeyboard($event)">\r
</ng-template>\r
`,
      styles: [".timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:center;color:inherit}.timepicker-dial__control:focus{outline:none;background-color:#0000001a}.timepicker-dial__control:disabled{cursor:default}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgxMatTimepickerParserPipe
  }], {
    disabled: [{
      type: Input
    }],
    focused: [{
      type: Output
    }],
    isActive: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    time: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timeList: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }],
    timeUnitChanged: [{
      type: Output
    }],
    unfocused: [{
      type: Output
    }]
  });
})();
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
  const isNumber2 = /\d/.test(nextTime);
  if (isNumber2) {
    const time = currentTime + nextTime;
    return isTimeUnavailable(time, timeList);
  }
  return void 0;
}
function isTimeUnavailable(time, timeList) {
  const selectedTime = timeList.find((value) => value.time === +time);
  return !selectedTime || selectedTime && selectedTime.disabled;
}
var _NgxMatTimepickerDialComponent = class _NgxMatTimepickerDialComponent {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get hourString() {
    return `${this.hour}`;
  }
  get minuteString() {
    return `${this.minute}`;
  }
  get _locale() {
    return this._localeSrv.locale;
  }
  constructor(_localeSrv) {
    this._localeSrv = _localeSrv;
    this.hourChanged = new EventEmitter();
    this.meridiems = Info.meridiems({
      locale: this._locale
    });
    this.minuteChanged = new EventEmitter();
    this.periodChanged = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
    this.timeUnitChanged = new EventEmitter();
    this._color = "primary";
  }
  changeHour(hour) {
    this.hourChanged.next(hour);
  }
  changeMinute(minute) {
    this.minuteChanged.next(minute);
  }
  changePeriod(period) {
    this.periodChanged.next(period);
  }
  changeTimeUnit(unit) {
    this.timeUnitChanged.next(unit);
  }
  hideHint() {
    this.isHintVisible = false;
  }
  ngOnChanges(changes) {
    const periodChanged = changes["period"] && changes["period"].currentValue;
    if (periodChanged || changes["format"] && changes["format"].currentValue) {
      const hours = NgxMatTimepickerUtils.getHours(this.format);
      this.hours = NgxMatTimepickerUtils.disableHours(hours, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
    if (periodChanged || changes["hour"] && changes["hour"].currentValue) {
      const minutes = NgxMatTimepickerUtils.getMinutes(this.minutesGap);
      this.minutes = NgxMatTimepickerUtils.disableMinutes(minutes, +this.hour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
  showHint() {
    this.isHintVisible = true;
  }
};
_NgxMatTimepickerDialComponent.ɵfac = function NgxMatTimepickerDialComponent_Factory(t) {
  return new (t || _NgxMatTimepickerDialComponent)(ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
};
_NgxMatTimepickerDialComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerDialComponent,
  selectors: [["ngx-mat-timepicker-dial"]],
  inputs: {
    activeTimeUnit: "activeTimeUnit",
    color: "color",
    editableHintTmpl: "editableHintTmpl",
    format: "format",
    hour: "hour",
    hoursOnly: "hoursOnly",
    isEditable: "isEditable",
    maxTime: "maxTime",
    minTime: "minTime",
    minute: "minute",
    minutesGap: "minutesGap",
    period: "period"
  },
  outputs: {
    hourChanged: "hourChanged",
    minuteChanged: "minuteChanged",
    periodChanged: "periodChanged",
    timeUnitChanged: "timeUnitChanged"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 9,
  vars: 14,
  consts: [["editableHintDefault", ""], [1, "timepicker-dial"], [1, "timepicker-dial__container"], [1, "timepicker-dial__time"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable", "minutesGap", "disabled"], ["class", "timepicker-dial__period", 3, "selectedPeriod", "activeTimeUnit", "maxTime", "minTime", "format", "hours", "minutes", "selectedHour", "meridiems", "periodChanged", 4, "ngIf"], [3, "ngClass", 4, "ngIf"], [1, "timepicker-dial__period", 3, "periodChanged", "selectedPeriod", "activeTimeUnit", "maxTime", "minTime", "format", "hours", "minutes", "selectedHour", "meridiems"], [3, "ngClass"], [4, "ngTemplateOutlet"], [1, "timepicker-dial__hint"]],
  template: function NgxMatTimepickerDialComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "ngx-mat-timepicker-dial-control", 4);
      ɵɵlistener("timeUnitChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeUnitChanged_3_listener($event) {
        return ctx.changeTimeUnit($event);
      })("timeChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeChanged_3_listener($event) {
        return ctx.changeHour($event);
      })("focused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_focused_3_listener() {
        return ctx.showHint();
      })("unfocused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_unfocused_3_listener() {
        return ctx.hideHint();
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "span");
      ɵɵtext(5, ":");
      ɵɵelementEnd();
      ɵɵelementStart(6, "ngx-mat-timepicker-dial-control", 5);
      ɵɵlistener("timeUnitChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeUnitChanged_6_listener($event) {
        return ctx.changeTimeUnit($event);
      })("timeChanged", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_timeChanged_6_listener($event) {
        return ctx.changeMinute($event);
      })("focused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_focused_6_listener() {
        return ctx.showHint();
      })("unfocused", function NgxMatTimepickerDialComponent_Template_ngx_mat_timepicker_dial_control_unfocused_6_listener() {
        return ctx.hideHint();
      });
      ɵɵelementEnd()();
      ɵɵtemplate(7, NgxMatTimepickerDialComponent_ngx_mat_timepicker_period_7_Template, 1, 9, "ngx-mat-timepicker-period", 6);
      ɵɵelementEnd();
      ɵɵtemplate(8, NgxMatTimepickerDialComponent_div_8_Template, 4, 4, "div", 7);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("timeList", ctx.hours)("time", ctx.hourString)("timeUnit", ctx.timeUnit.HOUR)("isActive", ctx.activeTimeUnit === ctx.timeUnit.HOUR)("isEditable", ctx.isEditable);
      ɵɵadvance(3);
      ɵɵproperty("timeList", ctx.minutes)("time", ctx.minuteString)("timeUnit", ctx.timeUnit.MINUTE)("isActive", ctx.activeTimeUnit === ctx.timeUnit.MINUTE)("isEditable", ctx.isEditable)("minutesGap", ctx.minutesGap)("disabled", ctx.hoursOnly);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.format !== 24);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isEditable || ctx.editableHintTmpl);
    }
  },
  dependencies: [NgxMatTimepickerDialControlComponent, NgIf, NgxMatTimepickerPeriodComponent, NgClass, NgTemplateOutlet],
  styles: [".timepicker-dial[_ngcontent-%COMP%]{text-align:center}.timepicker-dial__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.timepicker-dial__time[_ngcontent-%COMP%]{display:flex;align-items:baseline;line-height:normal;font-size:50px}.timepicker-dial__period[_ngcontent-%COMP%]{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden[_ngcontent-%COMP%]{visibility:hidden}.timepicker-dial__hint[_ngcontent-%COMP%]{display:inline-block;font-size:10px}.timepicker-dial__hint[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px}"],
  changeDetection: 0
});
var NgxMatTimepickerDialComponent = _NgxMatTimepickerDialComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dial",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgxMatTimepickerDialControlComponent, NgIf, NgxMatTimepickerPeriodComponent, NgClass, NgTemplateOutlet],
      template: `<div class="timepicker-dial">\r
    <div class="timepicker-dial__container">\r
        <div class="timepicker-dial__time">\r
            <ngx-mat-timepicker-dial-control [timeList]="hours"\r
                                         [time]="hourString"\r
                                         [timeUnit]="timeUnit.HOUR"\r
                                         [isActive]="activeTimeUnit === timeUnit.HOUR"\r
                                         [isEditable]="isEditable"\r
                                         (timeUnitChanged)="changeTimeUnit($event)"\r
                                         (timeChanged)="changeHour($event)"\r
                                         (focused)="showHint()"\r
                                         (unfocused)="hideHint()">\r
\r
            </ngx-mat-timepicker-dial-control>\r
            <span>:</span>\r
            <ngx-mat-timepicker-dial-control [timeList]="minutes"\r
                                         [time]="minuteString"\r
                                         [timeUnit]="timeUnit.MINUTE"\r
                                         [isActive]="activeTimeUnit === timeUnit.MINUTE"\r
                                         [isEditable]="isEditable"\r
                                         [minutesGap]="minutesGap"\r
                                         [disabled]="hoursOnly"\r
                                         (timeUnitChanged)="changeTimeUnit($event)"\r
                                         (timeChanged)="changeMinute($event)"\r
                                         (focused)="showHint()"\r
                                         (unfocused)="hideHint()">\r
\r
            </ngx-mat-timepicker-dial-control>\r
        </div>\r
        <ngx-mat-timepicker-period class="timepicker-dial__period"\r
                                   *ngIf="format !== 24"\r
                                   [selectedPeriod]="period"\r
                                   [activeTimeUnit]="activeTimeUnit"\r
                                   [maxTime]="maxTime"\r
                                   [minTime]="minTime"\r
                                   [format]="format"\r
                                   [hours]="hours"\r
                                   [minutes]="minutes"\r
                                   [selectedHour]="hour"\r
                                   [meridiems]="meridiems"\r
                                   (periodChanged)="changePeriod($event)"></ngx-mat-timepicker-period>\r
    </div>\r
    <div *ngIf="isEditable || editableHintTmpl"\r
         [ngClass]="{'timepicker-dial__hint-container--hidden': !isHintVisible}">\r
        <ng-container *ngTemplateOutlet="editableHintTmpl ? editableHintTmpl : editableHintDefault"></ng-container>\r
        <ng-template #editableHintDefault>\r
            <small class="timepicker-dial__hint"> * use arrows (<span>&#8645;</span>) to change the time</small>\r
        </ng-template>\r
    </div>\r
</div>\r
`,
      styles: [".timepicker-dial{text-align:center}.timepicker-dial__container{display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px}.timepicker-dial__hint span{font-size:14px}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerLocaleService
  }], {
    activeTimeUnit: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    editableHintTmpl: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hour: [{
      type: Input
    }],
    hourChanged: [{
      type: Output
    }],
    hoursOnly: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    minute: [{
      type: Input
    }],
    minuteChanged: [{
      type: Output
    }],
    minutesGap: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }],
    timeUnitChanged: [{
      type: Output
    }]
  });
})();
var _NgxMatTimepickerContentComponent = class _NgxMatTimepickerContentComponent {
};
_NgxMatTimepickerContentComponent.ɵfac = function NgxMatTimepickerContentComponent_Factory(t) {
  return new (t || _NgxMatTimepickerContentComponent)();
};
_NgxMatTimepickerContentComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerContentComponent,
  selectors: [["ngx-mat-timepicker-content"]],
  inputs: {
    appendToInput: "appendToInput",
    inputElement: "inputElement"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c8,
  decls: 5,
  vars: 2,
  consts: [["timepickerModal", ""], ["timepickerOutlet", ""], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"]],
  template: function NgxMatTimepickerContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, NgxMatTimepickerContentComponent_div_0_Template, 2, 1, "div", 2)(1, NgxMatTimepickerContentComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, NgxMatTimepickerContentComponent_ng_template_3_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const timepickerModal_r2 = ɵɵreference(2);
      ɵɵproperty("ngIf", ctx.appendToInput)("ngIfElse", timepickerModal_r2);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2
});
var NgxMatTimepickerContentComponent = _NgxMatTimepickerContentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerContentComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-content",
      standalone: true,
      imports: [NgIf, NgTemplateOutlet],
      template: '<div *ngIf="appendToInput;else timepickerModal">\r\n	<ng-container *ngTemplateOutlet="timepickerOutlet"></ng-container>\r\n</div>\r\n<ng-template #timepickerModal>\r\n	<ng-container *ngTemplateOutlet="timepickerOutlet"></ng-container>\r\n</ng-template>\r\n<ng-template #timepickerOutlet>\r\n	<ng-content></ng-content>\r\n</ng-template>\r\n'
    }]
  }], null, {
    appendToInput: [{
      type: Input
    }],
    inputElement: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepickerDialogComponent = class _NgxMatTimepickerDialogComponent extends NgxMatTimepickerBaseDirective {
  constructor(data, _dialogRef, timepickerSrv, eventSrv, timepickerLocaleSrv) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
    this.data = data;
    this._dialogRef = _dialogRef;
  }
  close() {
    this._dialogRef.close();
  }
};
_NgxMatTimepickerDialogComponent.ɵfac = function NgxMatTimepickerDialogComponent_Factory(t) {
  return new (t || _NgxMatTimepickerDialogComponent)(ɵɵdirectiveInject(MAT_DIALOG_DATA), ɵɵdirectiveInject(MatDialogRef), ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
};
_NgxMatTimepickerDialogComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerDialogComponent,
  selectors: [["ngx-mat-timepicker-dialog"]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  decls: 21,
  vars: 29,
  consts: [["cancelBtnDefault", ""], ["confirmBtnDefault", ""], ["ampmHours", ""], ["mat-dialog-content", ""], [3, "appendToInput", "inputElement"], [1, "timepicker", 3, "ngClass"], [1, "timepicker-header", 3, "color"], [3, "periodChanged", "timeUnitChanged", "hourChanged", "minuteChanged", "color", "format", "hour", "minute", "period", "activeTimeUnit", "minTime", "maxTime", "isEditable", "editableHintTmpl", "minutesGap", "hoursOnly"], [1, "timepicker__main-content"], [1, "timepicker__body", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "color", "dottedMinutesInGap", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap", "minuteChange", 4, "ngSwitchCase"], ["mat-dialog-actions", ""], [3, "click"], [4, "ngTemplateOutlet"], ["mat-button", "", 3, "color"], [3, "color", "selectedHour", "minTime", "maxTime", "format", "hourChange", "hourSelected", 4, "ngIf", "ngIfElse"], [3, "hourChange", "hourSelected", "color", "selectedHour", "minTime", "maxTime", "format"], [3, "hourChange", "hourSelected", "color", "selectedHour", "period", "minTime", "maxTime"], [3, "minuteChange", "color", "dottedMinutesInGap", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap"]],
  template: function NgxMatTimepickerDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵtemplate(0, NgxMatTimepickerDialogComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerDialogComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
      ɵɵelementStart(4, "div", 3)(5, "ngx-mat-timepicker-content", 4)(6, "div", 5)(7, "mat-toolbar", 6)(8, "ngx-mat-timepicker-dial", 7);
      ɵɵpipe(9, "async");
      ɵɵpipe(10, "async");
      ɵɵpipe(11, "async");
      ɵɵlistener("periodChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_periodChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changePeriod($event));
      })("timeUnitChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_timeUnitChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeTimeUnit($event));
      })("hourChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_hourChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onHourChange($event));
      })("minuteChanged", function NgxMatTimepickerDialogComponent_Template_ngx_mat_timepicker_dial_minuteChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onMinuteChange($event));
      });
      ɵɵelementEnd()();
      ɵɵelementStart(12, "div", 8)(13, "div", 9);
      ɵɵtemplate(14, NgxMatTimepickerDialogComponent_div_14_Template, 4, 2, "div", 10)(15, NgxMatTimepickerDialogComponent_ngx_mat_timepicker_minutes_face_15_Template, 4, 15, "ngx-mat-timepicker-minutes-face", 11);
      ɵɵelementEnd()()()()();
      ɵɵelementStart(16, "div", 12)(17, "div", 13);
      ɵɵlistener("click", function NgxMatTimepickerDialogComponent_Template_div_click_17_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.close());
      });
      ɵɵtemplate(18, NgxMatTimepickerDialogComponent_ng_container_18_Template, 1, 0, "ng-container", 14);
      ɵɵelementEnd();
      ɵɵelementStart(19, "div", 13);
      ɵɵlistener("click", function NgxMatTimepickerDialogComponent_Template_div_click_19_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.setTime());
      });
      ɵɵtemplate(20, NgxMatTimepickerDialogComponent_ng_container_20_Template, 1, 0, "ng-container", 14);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_10_0;
      const cancelBtnDefault_r7 = ɵɵreference(1);
      const confirmBtnDefault_r8 = ɵɵreference(3);
      ɵɵadvance(5);
      ɵɵproperty("appendToInput", ctx.data.appendToInput)("inputElement", ctx.data.inputElement);
      ɵɵadvance();
      ɵɵproperty("ngClass", ctx.data.timepickerClass);
      ɵɵadvance();
      ɵɵclassProp("is-editable", ctx.data.enableKeyboardInput);
      ɵɵproperty("color", ctx.color);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color)("format", ctx.data.format)("hour", (tmp_9_0 = ɵɵpipeBind1(9, 23, ctx.selectedHour)) == null ? null : tmp_9_0.time)("minute", (tmp_10_0 = ɵɵpipeBind1(10, 25, ctx.selectedMinute)) == null ? null : tmp_10_0.time)("period", ɵɵpipeBind1(11, 27, ctx.selectedPeriod))("activeTimeUnit", ctx.activeTimeUnit)("minTime", ctx.data.minTime)("maxTime", ctx.data.maxTime)("isEditable", ctx.data.enableKeyboardInput)("editableHintTmpl", ctx.data.editableHintTmpl)("minutesGap", ctx.data.minutesGap)("hoursOnly", ctx.data.hoursOnly);
      ɵɵadvance(5);
      ɵɵproperty("ngSwitch", ctx.activeTimeUnit);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.HOUR);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.MINUTE);
      ɵɵadvance(3);
      ɵɵproperty("ngTemplateOutlet", ctx.data.cancelBtnTmpl ? ctx.data.cancelBtnTmpl : cancelBtnDefault_r7);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.data.confirmBtnTmpl ? ctx.data.confirmBtnTmpl : confirmBtnDefault_r8);
    }
  },
  dependencies: [
    AsyncPipe,
    // Common
    NgClass,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    // Material
    MatButtonModule,
    MatButton,
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    MatToolbarModule,
    MatToolbar,
    // NgxMatTimepicker
    NgxMatTimepickerContentComponent,
    NgxMatTimepickerDialComponent,
    NgxMatTimepicker24HoursFaceComponent,
    NgxMatTimepicker12HoursFaceComponent,
    NgxMatTimepickerMinutesFaceComponent
  ],
  styles: ["div.ngx-mat-timepicker-dialog>mat-dialog-container{padding-top:0}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content]{padding:0;max-height:85vh}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header.is-editable{height:auto}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] .clock-face{margin:16px}div.ngx-mat-timepicker-dialog>mat-dialog-container div[mat-dialog-actions]{justify-content:flex-end;display:flex}\n"],
  encapsulation: 2
});
var NgxMatTimepickerDialogComponent = _NgxMatTimepickerDialogComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDialogComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-dialog",
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [
        AsyncPipe,
        // Common
        NgClass,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgTemplateOutlet,
        // Material
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        // NgxMatTimepicker
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepickerMinutesFaceComponent
      ],
      template: '<ng-template #cancelBtnDefault>\r\n	<button mat-button\r\n			[color]="color">CANCEL\r\n	</button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n	<button mat-button\r\n			[color]="color">OK\r\n	</button>\r\n</ng-template>\r\n<div mat-dialog-content>\r\n	<ngx-mat-timepicker-content [appendToInput]="data.appendToInput"\r\n								[inputElement]="data.inputElement">\r\n		<div class="timepicker"\r\n			 [ngClass]="data.timepickerClass">\r\n			<mat-toolbar [color]="color"\r\n						 [class.is-editable]="data.enableKeyboardInput"\r\n						 class="timepicker-header">\r\n				<ngx-mat-timepicker-dial [color]="color"\r\n										 [format]="data.format"\r\n										 [hour]="(selectedHour | async)?.time"\r\n										 [minute]="(selectedMinute | async)?.time"\r\n										 [period]="selectedPeriod | async"\r\n										 [activeTimeUnit]="activeTimeUnit"\r\n										 [minTime]="data.minTime"\r\n										 [maxTime]="data.maxTime"\r\n										 [isEditable]="data.enableKeyboardInput"\r\n										 [editableHintTmpl]="data.editableHintTmpl"\r\n										 [minutesGap]="data.minutesGap"\r\n										 [hoursOnly]="data.hoursOnly"\r\n										 (periodChanged)="changePeriod($event)"\r\n										 (timeUnitChanged)="changeTimeUnit($event)"\r\n										 (hourChanged)="onHourChange($event)"\r\n										 (minuteChanged)="onMinuteChange($event)"\r\n				></ngx-mat-timepicker-dial>\r\n			</mat-toolbar>\r\n			<div class="timepicker__main-content">\r\n				<div class="timepicker__body"\r\n					 [ngSwitch]="activeTimeUnit">\r\n					<div *ngSwitchCase="timeUnit.HOUR">\r\n						<ngx-mat-timepicker-24-hours-face *ngIf="data.format === 24;else ampmHours"\r\n														  [color]="color"\r\n														  (hourChange)="onHourChange($event)"\r\n														  [selectedHour]="selectedHour | async"\r\n														  [minTime]="data.minTime"\r\n														  [maxTime]="data.maxTime"\r\n														  [format]="data.format"\r\n														  (hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-24-hours-face>\r\n						<ng-template #ampmHours>\r\n							<ngx-mat-timepicker-12-hours-face\r\n									[color]="color"\r\n									(hourChange)="onHourChange($event)"\r\n									[selectedHour]="selectedHour | async"\r\n									[period]="selectedPeriod | async"\r\n									[minTime]="data.minTime"\r\n									[maxTime]="data.maxTime"\r\n									(hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-12-hours-face>\r\n						</ng-template>\r\n					</div>\r\n					<ngx-mat-timepicker-minutes-face *ngSwitchCase="timeUnit.MINUTE"\r\n													 [color]="color"\r\n													 [dottedMinutesInGap]="data.dottedMinutesInGap"\r\n													 [selectedMinute]="selectedMinute | async"\r\n													 [selectedHour]="(selectedHour | async)?.time"\r\n													 [minTime]="data.minTime"\r\n													 [maxTime]="data.maxTime"\r\n													 [format]="data.format"\r\n													 [period]="selectedPeriod | async"\r\n													 [minutesGap]="data.minutesGap"\r\n													 (minuteChange)="onMinuteChange($event)"></ngx-mat-timepicker-minutes-face>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</ngx-mat-timepicker-content>\r\n</div>\r\n<div mat-dialog-actions>\r\n	<div (click)="close()">\r\n		<ng-container\r\n				*ngTemplateOutlet="data.cancelBtnTmpl ? data.cancelBtnTmpl : cancelBtnDefault"></ng-container>\r\n	</div>\r\n	<div (click)="setTime()">\r\n		<ng-container\r\n				*ngTemplateOutlet="data.confirmBtnTmpl ? data.confirmBtnTmpl : confirmBtnDefault"></ng-container>\r\n	</div>\r\n</div>\r\n',
      styles: ["div.ngx-mat-timepicker-dialog>mat-dialog-container{padding-top:0}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content]{padding:0;max-height:85vh}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] mat-toolbar.timepicker-header.is-editable{height:auto}div.ngx-mat-timepicker-dialog>mat-dialog-container [mat-dialog-content] .clock-face{margin:16px}div.ngx-mat-timepicker-dialog>mat-dialog-container div[mat-dialog-actions]{justify-content:flex-end;display:flex}\n"]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_DIALOG_DATA]
    }]
  }, {
    type: MatDialogRef
  }, {
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var _NgxMatTimepickerStandaloneComponent = class _NgxMatTimepickerStandaloneComponent extends NgxMatTimepickerBaseDirective {
  constructor(data, timepickerSrv, eventSrv, timepickerLocaleSrv) {
    super(timepickerSrv, eventSrv, timepickerLocaleSrv, data);
    this.data = data;
  }
  close() {
    this.data.timepickerBaseRef.close();
  }
};
_NgxMatTimepickerStandaloneComponent.ɵfac = function NgxMatTimepickerStandaloneComponent_Factory(t) {
  return new (t || _NgxMatTimepickerStandaloneComponent)(ɵɵdirectiveInject(NGX_MAT_TIMEPICKER_CONFIG), ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerEventService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
};
_NgxMatTimepickerStandaloneComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerStandaloneComponent,
  selectors: [["ngx-mat-timepicker-standalone"]],
  hostVars: 2,
  hostBindings: function NgxMatTimepickerStandaloneComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("mat-app-background", true);
    }
  },
  standalone: true,
  features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  decls: 21,
  vars: 29,
  consts: [["cancelBtnDefault", ""], ["confirmBtnDefault", ""], ["ampmHours", ""], ["cdkTrapFocus", ""], [3, "appendToInput", "inputElement"], [1, "timepicker", 3, "ngClass"], [1, "timepicker-header", 3, "color"], [3, "periodChanged", "timeUnitChanged", "hourChanged", "minuteChanged", "color", "format", "hour", "minute", "period", "activeTimeUnit", "minTime", "maxTime", "isEditable", "editableHintTmpl", "minutesGap", "hoursOnly"], [1, "timepicker__main-content"], [1, "timepicker__body", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "dottedMinutesInGap", "color", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap", "minuteChange", 4, "ngSwitchCase"], [1, "ngx-mat-timepicker-standalone-actions"], [3, "click"], [4, "ngTemplateOutlet"], ["mat-button", "", 3, "color"], [3, "color", "selectedHour", "minTime", "maxTime", "format", "hourChange", "hourSelected", 4, "ngIf", "ngIfElse"], [3, "hourChange", "hourSelected", "color", "selectedHour", "minTime", "maxTime", "format"], [3, "hourChange", "hourSelected", "color", "selectedHour", "period", "minTime", "maxTime"], [3, "minuteChange", "dottedMinutesInGap", "color", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap"]],
  template: function NgxMatTimepickerStandaloneComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵtemplate(0, NgxMatTimepickerStandaloneComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, NgxMatTimepickerStandaloneComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
      ɵɵelementStart(4, "div", 3)(5, "ngx-mat-timepicker-content", 4)(6, "div", 5)(7, "mat-toolbar", 6)(8, "ngx-mat-timepicker-dial", 7);
      ɵɵpipe(9, "async");
      ɵɵpipe(10, "async");
      ɵɵpipe(11, "async");
      ɵɵlistener("periodChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_periodChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changePeriod($event));
      })("timeUnitChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_timeUnitChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeTimeUnit($event));
      })("hourChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_hourChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onHourChange($event));
      })("minuteChanged", function NgxMatTimepickerStandaloneComponent_Template_ngx_mat_timepicker_dial_minuteChanged_8_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onMinuteChange($event));
      });
      ɵɵelementEnd()();
      ɵɵelementStart(12, "div", 8)(13, "div", 9);
      ɵɵtemplate(14, NgxMatTimepickerStandaloneComponent_div_14_Template, 4, 2, "div", 10)(15, NgxMatTimepickerStandaloneComponent_ngx_mat_timepicker_minutes_face_15_Template, 4, 15, "ngx-mat-timepicker-minutes-face", 11);
      ɵɵelementEnd()()()();
      ɵɵelementStart(16, "div", 12)(17, "div", 13);
      ɵɵlistener("click", function NgxMatTimepickerStandaloneComponent_Template_div_click_17_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.close());
      });
      ɵɵtemplate(18, NgxMatTimepickerStandaloneComponent_ng_container_18_Template, 1, 0, "ng-container", 14);
      ɵɵelementEnd();
      ɵɵelementStart(19, "div", 13);
      ɵɵlistener("click", function NgxMatTimepickerStandaloneComponent_Template_div_click_19_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.setTime());
      });
      ɵɵtemplate(20, NgxMatTimepickerStandaloneComponent_ng_container_20_Template, 1, 0, "ng-container", 14);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_10_0;
      const cancelBtnDefault_r7 = ɵɵreference(1);
      const confirmBtnDefault_r8 = ɵɵreference(3);
      ɵɵadvance(5);
      ɵɵproperty("appendToInput", ctx.data.appendToInput)("inputElement", ctx.data.inputElement);
      ɵɵadvance();
      ɵɵproperty("ngClass", ctx.data.timepickerClass);
      ɵɵadvance();
      ɵɵclassProp("is-editable", ctx.data.enableKeyboardInput);
      ɵɵproperty("color", ctx.color);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color)("format", ctx.data.format)("hour", (tmp_9_0 = ɵɵpipeBind1(9, 23, ctx.selectedHour)) == null ? null : tmp_9_0.time)("minute", (tmp_10_0 = ɵɵpipeBind1(10, 25, ctx.selectedMinute)) == null ? null : tmp_10_0.time)("period", ɵɵpipeBind1(11, 27, ctx.selectedPeriod))("activeTimeUnit", ctx.activeTimeUnit)("minTime", ctx.data.minTime)("maxTime", ctx.data.maxTime)("isEditable", ctx.data.enableKeyboardInput)("editableHintTmpl", ctx.data.editableHintTmpl)("minutesGap", ctx.data.minutesGap)("hoursOnly", ctx.data.hoursOnly);
      ɵɵadvance(5);
      ɵɵproperty("ngSwitch", ctx.activeTimeUnit);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.HOUR);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.MINUTE);
      ɵɵadvance(3);
      ɵɵproperty("ngTemplateOutlet", ctx.data.cancelBtnTmpl ? ctx.data.cancelBtnTmpl : cancelBtnDefault_r7);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.data.confirmBtnTmpl ? ctx.data.confirmBtnTmpl : confirmBtnDefault_r8);
    }
  },
  dependencies: [MatButtonModule, MatButton, A11yModule, CdkTrapFocus, NgxMatTimepickerContentComponent, NgClass, MatToolbarModule, MatToolbar, NgxMatTimepickerDialComponent, NgSwitch, NgSwitchCase, NgIf, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgTemplateOutlet, AsyncPipe],
  styles: ["ngx-mat-timepicker-standalone{display:block;border-radius:4px;box-shadow:0 0 5px 2px #00000040;overflow:hidden}ngx-mat-timepicker-standalone ngx-mat-timepicker-content{display:block}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header.is-editable{height:auto}ngx-mat-timepicker-standalone ngx-mat-timepicker-content .clock-face{margin:16px}ngx-mat-timepicker-standalone .ngx-mat-timepicker-standalone-actions{display:flex;flex-direction:row;justify-content:flex-end;padding:0 16px 16px}\n"],
  encapsulation: 2
});
var NgxMatTimepickerStandaloneComponent = _NgxMatTimepickerStandaloneComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerStandaloneComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-standalone",
      host: {
        "[class.mat-app-background]": "true"
      },
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [MatButtonModule, A11yModule, NgxMatTimepickerContentComponent, NgClass, MatToolbarModule, NgxMatTimepickerDialComponent, NgSwitch, NgSwitchCase, NgIf, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgTemplateOutlet, AsyncPipe],
      template: '<ng-template #cancelBtnDefault>\r\n	<button mat-button\r\n			[color]="color">CANCEL\r\n	</button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n	<button mat-button\r\n			[color]="color">OK\r\n	</button>\r\n</ng-template>\r\n<div cdkTrapFocus>\r\n	<ngx-mat-timepicker-content [appendToInput]="data.appendToInput"\r\n								[inputElement]="data.inputElement">\r\n		<div class="timepicker"\r\n			 [ngClass]="data.timepickerClass">\r\n			<mat-toolbar [color]="color"\r\n						 [class.is-editable]="data.enableKeyboardInput"\r\n						 class="timepicker-header">\r\n				<ngx-mat-timepicker-dial [color]="color"\r\n										 [format]="data.format"\r\n										 [hour]="(selectedHour | async)?.time"\r\n										 [minute]="(selectedMinute | async)?.time"\r\n										 [period]="selectedPeriod | async"\r\n										 [activeTimeUnit]="activeTimeUnit"\r\n										 [minTime]="data.minTime"\r\n										 [maxTime]="data.maxTime"\r\n										 [isEditable]="data.enableKeyboardInput"\r\n										 [editableHintTmpl]="data.editableHintTmpl"\r\n										 [minutesGap]="data.minutesGap"\r\n										 [hoursOnly]="data.hoursOnly"\r\n										 (periodChanged)="changePeriod($event)"\r\n										 (timeUnitChanged)="changeTimeUnit($event)"\r\n										 (hourChanged)="onHourChange($event)"\r\n										 (minuteChanged)="onMinuteChange($event)">\r\n				</ngx-mat-timepicker-dial>\r\n			</mat-toolbar>\r\n			<div class="timepicker__main-content">\r\n				<div class="timepicker__body"\r\n					 [ngSwitch]="activeTimeUnit">\r\n					<div *ngSwitchCase="timeUnit.HOUR">\r\n						<ngx-mat-timepicker-24-hours-face *ngIf="data.format === 24;else ampmHours"\r\n														  [color]="color"\r\n														  (hourChange)="onHourChange($event)"\r\n														  [selectedHour]="selectedHour | async"\r\n														  [minTime]="data.minTime"\r\n														  [maxTime]="data.maxTime"\r\n														  [format]="data.format"\r\n														  (hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-24-hours-face>\r\n						<ng-template #ampmHours>\r\n							<ngx-mat-timepicker-12-hours-face\r\n									[color]="color"\r\n									(hourChange)="onHourChange($event)"\r\n									[selectedHour]="selectedHour | async"\r\n									[period]="selectedPeriod | async"\r\n									[minTime]="data.minTime"\r\n									[maxTime]="data.maxTime"\r\n									(hourSelected)="onHourSelected($event)"></ngx-mat-timepicker-12-hours-face>\r\n						</ng-template>\r\n					</div>\r\n					<ngx-mat-timepicker-minutes-face *ngSwitchCase="timeUnit.MINUTE"\r\n													 [dottedMinutesInGap]="data.dottedMinutesInGap"\r\n													 [color]="color"\r\n													 [selectedMinute]="selectedMinute | async"\r\n													 [selectedHour]="(selectedHour | async)?.time"\r\n													 [minTime]="data.minTime"\r\n													 [maxTime]="data.maxTime"\r\n													 [format]="data.format"\r\n													 [period]="selectedPeriod | async"\r\n													 [minutesGap]="data.minutesGap"\r\n													 (minuteChange)="onMinuteChange($event)"></ngx-mat-timepicker-minutes-face>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</ngx-mat-timepicker-content>\r\n\r\n	<div class="ngx-mat-timepicker-standalone-actions">\r\n		<div (click)="close()">\r\n			<ng-container\r\n					*ngTemplateOutlet="data.cancelBtnTmpl ? data.cancelBtnTmpl : cancelBtnDefault"></ng-container>\r\n		</div>\r\n		<div (click)="setTime()">\r\n			<ng-container\r\n					*ngTemplateOutlet="data.confirmBtnTmpl ? data.confirmBtnTmpl : confirmBtnDefault"></ng-container>\r\n		</div>\r\n	</div>\r\n</div>\r\n',
      styles: ["ngx-mat-timepicker-standalone{display:block;border-radius:4px;box-shadow:0 0 5px 2px #00000040;overflow:hidden}ngx-mat-timepicker-standalone ngx-mat-timepicker-content{display:block}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header{display:flex;justify-content:center;align-items:center}ngx-mat-timepicker-standalone ngx-mat-timepicker-content mat-toolbar.timepicker-header.is-editable{height:auto}ngx-mat-timepicker-standalone ngx-mat-timepicker-content .clock-face{margin:16px}ngx-mat-timepicker-standalone .ngx-mat-timepicker-standalone-actions{display:flex;flex-direction:row;justify-content:flex-end;padding:0 16px 16px}\n"]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGX_MAT_TIMEPICKER_CONFIG]
    }]
  }, {
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerEventService
  }, {
    type: NgxMatTimepickerLocaleService
  }], null);
})();
var config;
var _NgxMatTimepickerProvider = class _NgxMatTimepickerProvider {
};
_NgxMatTimepickerProvider.ɵfac = function NgxMatTimepickerProvider_Factory(t) {
  return new (t || _NgxMatTimepickerProvider)();
};
_NgxMatTimepickerProvider.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerProvider,
  selectors: [["ngx-mat-timepicker-provider"]],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NGX_MAT_TIMEPICKER_CONFIG,
    useFactory() {
      return config;
    }
  }]), ɵɵStandaloneFeature],
  decls: 1,
  vars: 0,
  template: function NgxMatTimepickerProvider_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "ngx-mat-timepicker-standalone");
    }
  },
  dependencies: [NgxMatTimepickerStandaloneComponent],
  encapsulation: 2
});
var NgxMatTimepickerProvider = _NgxMatTimepickerProvider;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerProvider, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-provider",
      template: `
		<ngx-mat-timepicker-standalone></ngx-mat-timepicker-standalone>`,
      standalone: true,
      providers: [{
        provide: NGX_MAT_TIMEPICKER_CONFIG,
        useFactory() {
          return config;
        }
      }],
      imports: [NgxMatTimepickerStandaloneComponent]
    }]
  }], null, null);
})();
var _NgxMatTimepickerComponent = class _NgxMatTimepickerComponent {
  set appendToInput(newValue) {
    this._appendToInput = coerceBooleanProperty(newValue);
  }
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  get disabled() {
    return this._timepickerInput && this._timepickerInput.disabled;
  }
  set dottedMinutesInGap(newValue) {
    this._dottedMinutesInGap = coerceBooleanProperty(newValue);
  }
  get dottedMinutesInGap() {
    return this._dottedMinutesInGap;
  }
  set enableKeyboardInput(newValue) {
    this._enableKeyboardInput = coerceBooleanProperty(newValue);
  }
  get enableKeyboardInput() {
    return this._enableKeyboardInput;
  }
  get format() {
    return this._timepickerInput ? this._timepickerInput.format : this._format;
  }
  set format(value) {
    this._format = NgxMatTimepickerAdapter.isTwentyFour(value) ? 24 : 12;
  }
  get inputElement() {
    return this._timepickerInput && this._timepickerInput.element;
  }
  get maxTime() {
    return this._timepickerInput ? this._timepickerInput.max : this.max;
  }
  get minTime() {
    return this._timepickerInput ? this._timepickerInput.min : this.min;
  }
  get minutesGap() {
    return this._minutesGap;
  }
  set minutesGap(gap) {
    if (gap == null) {
      return;
    }
    gap = Math.floor(gap);
    this._minutesGap = gap <= 59 ? gap : 1;
  }
  get overlayOrigin() {
    return this._timepickerInput ? this._timepickerInput.cdkOverlayOrigin : void 0;
  }
  get time() {
    return this._timepickerInput && this._timepickerInput.value;
  }
  constructor(_dialog) {
    this._dialog = _dialog;
    this.closed = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.hoursOnly = false;
    this.id = `ngx_mat_timepicker_${++_NgxMatTimepickerComponent.nextId}`;
    this.isEsc = true;
    this.opened = new EventEmitter();
    this.overlayPositions = [{
      originX: "center",
      originY: "bottom",
      overlayX: "center",
      overlayY: "top",
      offsetY: 0
    }, {
      originX: "center",
      originY: "top",
      overlayX: "center",
      overlayY: "bottom",
      offsetY: 0
    }];
    this.showPicker = false;
    this.timeChanged = new EventEmitter();
    this.timeSet = new EventEmitter();
    this.timeUpdated = new BehaviorSubject(void 0);
    this._appendToInput = false;
    this._color = "primary";
    this._dottedMinutesInGap = false;
    this._enableKeyboardInput = false;
    this._format = 12;
  }
  close() {
    if (this._appendToInput) {
      this._overlayRef && this._overlayRef.dispose();
    } else {
      this._dialogRef && this._dialogRef.close();
    }
    this.inputElement.focus();
    this.showPicker = false;
    this.closed.emit();
  }
  open() {
    config = {
      timepickerBaseRef: this,
      time: this.time,
      defaultTime: this.defaultTime,
      dottedMinutesInGap: this._dottedMinutesInGap,
      maxTime: this.maxTime,
      minTime: this.minTime,
      format: this.format,
      minutesGap: this.minutesGap,
      disableAnimation: this.disableAnimation,
      cancelBtnTmpl: this.cancelBtnTmpl,
      confirmBtnTmpl: this.confirmBtnTmpl,
      editableHintTmpl: this.editableHintTmpl,
      disabled: this.disabled,
      enableKeyboardInput: this.enableKeyboardInput,
      preventOverlayClick: this.preventOverlayClick,
      appendToInput: this._appendToInput,
      hoursOnly: this.hoursOnly,
      timepickerClass: this.timepickerClass,
      inputElement: this.inputElement,
      color: this.color
    };
    if (this._appendToInput) {
      this.showPicker = true;
    } else {
      this._dialogRef = this._dialog.open(NgxMatTimepickerDialogComponent, {
        panelClass: "ngx-mat-timepicker-dialog",
        data: __spreadValues({}, config)
      });
      this._dialogRef.afterClosed().subscribe(() => {
        this.closed.emit();
      });
    }
    this.opened.emit();
  }
  /***
   * Register an input with this timepicker.
   * input - The timepicker input to register with this timepicker
   */
  registerInput(input) {
    if (this._timepickerInput) {
      console.warn("Input for this timepicker was already set", input.element);
      throw Error("A Timepicker can only be associated with a single input.");
    }
    this._timepickerInput = input;
  }
  unregisterInput() {
    this._timepickerInput = void 0;
  }
  updateTime(time) {
    this.timeUpdated.next(time);
  }
};
_NgxMatTimepickerComponent.nextId = 0;
_NgxMatTimepickerComponent.ɵfac = function NgxMatTimepickerComponent_Factory(t) {
  return new (t || _NgxMatTimepickerComponent)(ɵɵdirectiveInject(MatDialog));
};
_NgxMatTimepickerComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerComponent,
  selectors: [["ngx-mat-timepicker"]],
  hostVars: 1,
  hostBindings: function NgxMatTimepickerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵhostProperty("id", ctx.id);
    }
  },
  inputs: {
    appendToInput: "appendToInput",
    color: "color",
    dottedMinutesInGap: "dottedMinutesInGap",
    enableKeyboardInput: "enableKeyboardInput",
    format: "format",
    minutesGap: "minutesGap",
    cancelBtnTmpl: "cancelBtnTmpl",
    confirmBtnTmpl: "confirmBtnTmpl",
    defaultTime: "defaultTime",
    disableAnimation: "disableAnimation",
    editableHintTmpl: "editableHintTmpl",
    hoursOnly: "hoursOnly",
    isEsc: "isEsc",
    max: "max",
    min: "min",
    preventOverlayClick: "preventOverlayClick",
    timepickerClass: "timepickerClass"
  },
  outputs: {
    closed: "closed",
    hourSelected: "hourSelected",
    opened: "opened",
    timeChanged: "timeChanged",
    timeSet: "timeSet"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 1,
  vars: 4,
  consts: [["cdkConnectedOverlay", "", "cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop", 3, "backdropClick", "cdkConnectedOverlayPositions", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"]],
  template: function NgxMatTimepickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NgxMatTimepickerComponent_ng_template_0_Template, 1, 0, "ng-template", 0);
      ɵɵlistener("backdropClick", function NgxMatTimepickerComponent_Template_ng_template_backdropClick_0_listener() {
        return ctx.close();
      });
    }
    if (rf & 2) {
      ɵɵproperty("cdkConnectedOverlayPositions", ctx.overlayPositions)("cdkConnectedOverlayHasBackdrop", true)("cdkConnectedOverlayOrigin", ctx.overlayOrigin)("cdkConnectedOverlayOpen", ctx.showPicker);
    }
  },
  dependencies: [CdkConnectedOverlay, NgxMatTimepickerProvider],
  encapsulation: 2
});
var NgxMatTimepickerComponent = _NgxMatTimepickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker",
      template: `
		<ng-template
				cdkConnectedOverlay
				[cdkConnectedOverlayPositions]="overlayPositions"
				[cdkConnectedOverlayHasBackdrop]="!0"
				cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
				(backdropClick)="close()"
				[cdkConnectedOverlayOrigin]="overlayOrigin"
				[cdkConnectedOverlayOpen]="showPicker">
			<ngx-mat-timepicker-provider></ngx-mat-timepicker-provider>
		</ng-template>
    `,
      standalone: true,
      imports: [CdkConnectedOverlay, NgxMatTimepickerStandaloneComponent, NgxMatTimepickerProvider]
    }]
  }], () => [{
    type: MatDialog
  }], {
    appendToInput: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    dottedMinutesInGap: [{
      type: Input
    }],
    enableKeyboardInput: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    cancelBtnTmpl: [{
      type: Input
    }],
    closed: [{
      type: Output
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    disableAnimation: [{
      type: Input
    }],
    editableHintTmpl: [{
      type: Input
    }],
    hourSelected: [{
      type: Output
    }],
    hoursOnly: [{
      type: Input
    }],
    id: [{
      type: HostBinding,
      args: ["id"]
    }],
    isEsc: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    opened: [{
      type: Output
    }],
    preventOverlayClick: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timepickerClass: [{
      type: Input
    }],
    timeSet: [{
      type: Output
    }]
  });
})();
var _NgxMatTimepickerToggleIconDirective = class _NgxMatTimepickerToggleIconDirective {
};
_NgxMatTimepickerToggleIconDirective.ɵfac = function NgxMatTimepickerToggleIconDirective_Factory(t) {
  return new (t || _NgxMatTimepickerToggleIconDirective)();
};
_NgxMatTimepickerToggleIconDirective.ɵdir = ɵɵdefineDirective({
  type: _NgxMatTimepickerToggleIconDirective,
  selectors: [["", "ngxMatTimepickerToggleIcon", ""]],
  standalone: true
});
var NgxMatTimepickerToggleIconDirective = _NgxMatTimepickerToggleIconDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerToggleIconDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepickerToggleIcon]",
      standalone: true
    }]
  }], null, null);
})();
var _NgxMatTimepickerToggleComponent = class _NgxMatTimepickerToggleComponent {
  get disabled() {
    return this._disabled === void 0 ? this.timepicker?.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  open(event) {
    if (this.timepicker) {
      this.timepicker.open();
      event.stopPropagation();
    }
  }
};
_NgxMatTimepickerToggleComponent.ɵfac = function NgxMatTimepickerToggleComponent_Factory(t) {
  return new (t || _NgxMatTimepickerToggleComponent)();
};
_NgxMatTimepickerToggleComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerToggleComponent,
  selectors: [["ngx-mat-timepicker-toggle"]],
  contentQueries: function NgxMatTimepickerToggleComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, NgxMatTimepickerToggleIconDirective, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customIcon = _t.first);
    }
  },
  inputs: {
    disabled: "disabled",
    timepicker: [InputFlags.None, "for", "timepicker"]
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c10,
  decls: 3,
  vars: 2,
  consts: [["color", "", "mat-icon-button", "", "type", "button", 1, "ngx-mat-timepicker-toggle", "mat-elevation-z0", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "class", "ngx-mat-timepicker-toggle-default-icon", "fill", "currentColor", "viewBox", "0 0 24 24", "width", "24px", "height", "24px", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 24 24", "width", "24px", "height", "24px", 1, "ngx-mat-timepicker-toggle-default-icon"], ["d", "M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"]],
  template: function NgxMatTimepickerToggleComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c9);
      ɵɵelementStart(0, "button", 0);
      ɵɵlistener("click", function NgxMatTimepickerToggleComponent_Template_button_click_0_listener($event) {
        return ctx.open($event);
      });
      ɵɵtemplate(1, NgxMatTimepickerToggleComponent__svg_svg_1_Template, 2, 0, "svg", 1);
      ɵɵprojection(2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("disabled", ctx.disabled);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.customIcon);
    }
  },
  dependencies: [MatButtonModule, MatIconButton, NgIf],
  styles: ["button.ngx-mat-timepicker-toggle{background-color:transparent;text-align:center;-webkit-user-select:none;user-select:none;cursor:pointer;box-shadow:none}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{margin:auto}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}body .ngx-mat-timepicker-toggle{color:#0000008a}\n"],
  encapsulation: 2
});
var NgxMatTimepickerToggleComponent = _NgxMatTimepickerToggleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerToggleComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-toggle",
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [MatButtonModule, NgIf],
      template: '<button class="ngx-mat-timepicker-toggle mat-elevation-z0"\r\n        color=""\r\n        mat-icon-button\r\n        (click)="open($event)"\r\n        [disabled]="disabled"\r\n        type="button">\r\n    <svg xmlns="http://www.w3.org/2000/svg"\r\n         class="ngx-mat-timepicker-toggle-default-icon"\r\n         fill="currentColor"\r\n         viewBox="0 0 24 24"\r\n         width="24px"\r\n         height="24px"\r\n         *ngIf="!customIcon">\r\n        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />\r\n    </svg>\r\n\r\n    <ng-content select="[ngxMatTimepickerToggleIcon]"></ng-content>\r\n</button>\r\n',
      styles: ["button.ngx-mat-timepicker-toggle{background-color:transparent;text-align:center;-webkit-user-select:none;user-select:none;cursor:pointer;box-shadow:none}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{margin:auto}.mat-form-field .ngx-mat-timepicker-toggle-default-icon{display:block;width:1.5em;height:1.5em}body .ngx-mat-timepicker-toggle{color:#0000008a}\n"]
    }]
  }], null, {
    disabled: [{
      type: Input
    }],
    customIcon: [{
      type: ContentChild,
      args: [NgxMatTimepickerToggleIconDirective, {
        static: true
      }]
    }],
    timepicker: [{
      type: Input,
      args: ["for"]
    }]
  });
})();
function concatTime(currentTime, nextTime) {
  const isNumber2 = /\d/.test(nextTime);
  if (isNumber2) {
    const time = currentTime + nextTime;
    return +time;
  }
  return void 0;
}
var _NgxMatTimepickerControlComponent = class _NgxMatTimepickerControlComponent {
  set color(newValue) {
    this._color = newValue;
  }
  get color() {
    return this._color;
  }
  set floatLabel(newValue) {
    this._floatLabel = newValue;
  }
  get floatLabel() {
    return this._floatLabel;
  }
  constructor(_timeParser) {
    this._timeParser = _timeParser;
    this.id = _NgxMatTimepickerControlComponent.nextId++;
    this.timeChanged = new EventEmitter();
    this._color = "primary";
    this._floatLabel = "auto";
  }
  changeTime(event) {
    event.stopPropagation();
    const char = event.data;
    const time = concatTime(String(this.time), char);
    this._changeTimeIfValid(time);
  }
  decrease() {
    if (!this.disabled) {
      let previousTime = +this.time - 1;
      if (previousTime < this.min) {
        previousTime = this.max;
      }
      if (this._isSelectedTimeDisabled(previousTime)) {
        previousTime = this._getAvailableTime(previousTime, this._getPrevAvailableTime.bind(this));
      }
      if (previousTime !== this.time) {
        this.timeChanged.emit(previousTime);
      }
    }
  }
  increase() {
    if (!this.disabled) {
      let nextTime = +this.time + 1;
      if (nextTime > this.max) {
        nextTime = this.min;
      }
      if (this._isSelectedTimeDisabled(nextTime)) {
        nextTime = this._getAvailableTime(nextTime, this._getNextAvailableTime.bind(this));
      }
      if (nextTime !== this.time) {
        this.timeChanged.emit(nextTime);
      }
    }
  }
  ngOnChanges(changes) {
    if (changes["timeList"] && this.time != null) {
      if (this._isSelectedTimeDisabled(this.time)) {
        this._setAvailableTime();
      }
    }
  }
  onBlur() {
    this.isFocused = false;
    if (this._previousTime !== this.time) {
      this._changeTimeIfValid(+this.time);
    }
  }
  onFocus() {
    this.isFocused = true;
    this._previousTime = this.time;
  }
  onKeydown(event) {
    event.stopPropagation();
    if (!NgxMatTimepickerUtils.isDigit(event)) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        this.increase();
        break;
      case "ArrowDown":
        this.decrease();
        break;
    }
    if (this.preventTyping && event.key !== "Tab") {
      event.preventDefault();
    }
  }
  onModelChange(value) {
    this.time = +this._timeParser.transform(value, this.timeUnit);
  }
  _changeTimeIfValid(value) {
    if (!isNaN(value)) {
      this.time = value;
      if (this.time > this.max) {
        const timeString = String(value);
        this.time = +timeString[timeString.length - 1];
      }
      if (this.time < this.min) {
        this.time = this.min;
      }
      this.timeChanged.emit(this.time);
    }
  }
  _getAvailableTime(currentTime, fn) {
    const currentTimeIndex = this.timeList.findIndex((time) => time.time === currentTime);
    const availableTime = fn(currentTimeIndex);
    return availableTime != null ? availableTime : this.time;
  }
  _getNextAvailableTime(index) {
    const timeCollection = this.timeList;
    const maxValue = timeCollection.length;
    for (let i = index + 1; i < maxValue; i++) {
      const time = timeCollection[i];
      if (!time.disabled) {
        return time.time;
      }
    }
    return void 0;
  }
  _getPrevAvailableTime(index) {
    for (let i = index; i >= 0; i--) {
      const time = this.timeList[i];
      if (!time.disabled) {
        return time.time;
      }
    }
    return void 0;
  }
  _isSelectedTimeDisabled(time) {
    return this.timeList.find((faceTime) => faceTime.time === time).disabled;
  }
  _setAvailableTime() {
    this.time = this.timeList.find((t) => !t.disabled).time;
    this.timeChanged.emit(this.time);
  }
};
_NgxMatTimepickerControlComponent.nextId = 0;
_NgxMatTimepickerControlComponent.ɵfac = function NgxMatTimepickerControlComponent_Factory(t) {
  return new (t || _NgxMatTimepickerControlComponent)(ɵɵdirectiveInject(NgxMatTimepickerParserPipe));
};
_NgxMatTimepickerControlComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerControlComponent,
  selectors: [["ngx-mat-timepicker-time-control"]],
  inputs: {
    color: "color",
    disabled: "disabled",
    floatLabel: "floatLabel",
    max: "max",
    min: "min",
    placeholder: "placeholder",
    preventTyping: "preventTyping",
    time: "time",
    timeList: "timeList",
    timeUnit: "timeUnit"
  },
  outputs: {
    timeChanged: "timeChanged"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([NgxMatTimepickerParserPipe]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 13,
  vars: 19,
  consts: [[1, "ngx-mat-timepicker-control", 3, "color", "floatLabel", "ngClass"], ["matInput", "", "maxlength", "2", 3, "ngModelChange", "keydown", "beforeinput", "focus", "blur", "id", "name", "ngModel", "placeholder", "disabled"], ["matSuffix", "", 1, "arrows-wrap"], ["role", "button", 1, "arrow", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "18", "viewBox", "0 0 24 24", "width", "18"], ["d", "M0 0h24v24H0z", "fill", "none"], ["d", "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"]],
  template: function NgxMatTimepickerControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "mat-form-field", 0)(1, "input", 1);
      ɵɵpipe(2, "ngxMatTimepickerParser");
      ɵɵpipe(3, "timeLocalizer");
      ɵɵlistener("ngModelChange", function NgxMatTimepickerControlComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.onModelChange($event);
      })("keydown", function NgxMatTimepickerControlComponent_Template_input_keydown_1_listener($event) {
        return ctx.onKeydown($event);
      })("beforeinput", function NgxMatTimepickerControlComponent_Template_input_beforeinput_1_listener($event) {
        return ctx.changeTime($event);
      })("focus", function NgxMatTimepickerControlComponent_Template_input_focus_1_listener() {
        return ctx.onFocus();
      })("blur", function NgxMatTimepickerControlComponent_Template_input_blur_1_listener() {
        return ctx.onBlur();
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "div", 2)(5, "span", 3);
      ɵɵlistener("click", function NgxMatTimepickerControlComponent_Template_span_click_5_listener() {
        return ctx.increase();
      });
      ɵɵnamespaceSVG();
      ɵɵelementStart(6, "svg", 4);
      ɵɵelement(7, "path", 5)(8, "path", 6);
      ɵɵelementEnd()();
      ɵɵnamespaceHTML();
      ɵɵelementStart(9, "span", 3);
      ɵɵlistener("click", function NgxMatTimepickerControlComponent_Template_span_click_9_listener() {
        return ctx.decrease();
      });
      ɵɵnamespaceSVG();
      ɵɵelementStart(10, "svg", 4);
      ɵɵelement(11, "path", 7)(12, "path", 8);
      ɵɵelementEnd()()()();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("ngClass", ɵɵpureFunction1(17, _c6, ctx.isFocused));
      ɵɵadvance();
      ɵɵpropertyInterpolate1("id", "ngx_mat_timepicker_field_", ctx.id, "");
      ɵɵpropertyInterpolate1("name", "ngx_mat_timepicker_field_", ctx.id, "");
      ɵɵproperty("ngModel", ɵɵpipeBind3(3, 13, ɵɵpipeBind2(2, 10, ctx.time, ctx.timeUnit), ctx.timeUnit, true))("placeholder", ctx.placeholder)("disabled", ctx.disabled);
    }
  },
  dependencies: [MatFormFieldModule, MatFormField, MatSuffix, NgClass, MatInputModule, MatInput, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
  styles: [".ngx-mat-timepicker-control[_ngcontent-%COMP%]{width:60px;min-width:60px}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%]{position:relative;z-index:1}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%] > .arrow[_ngcontent-%COMP%]{text-align:center;opacity:.5;height:15px;cursor:pointer;transition:opacity .2s;-webkit-user-select:none;user-select:none}.ngx-mat-timepicker-control[_ngcontent-%COMP%]   .arrows-wrap[_ngcontent-%COMP%] > .arrow[_ngcontent-%COMP%]:hover{opacity:1}"],
  changeDetection: 0
});
var NgxMatTimepickerControlComponent = _NgxMatTimepickerControlComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-time-control",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [NgxMatTimepickerParserPipe],
      standalone: true,
      imports: [MatFormFieldModule, NgClass, MatInputModule, FormsModule, NgxMatTimepickerParserPipe, NgxMatTimepickerTimeLocalizerPipe],
      template: `<mat-form-field [color]="color"\r
                [floatLabel]="floatLabel"\r
                [ngClass]="{'active': isFocused}"\r
                class="ngx-mat-timepicker-control">\r
    <input id="ngx_mat_timepicker_field_{{id}}"\r
           name="ngx_mat_timepicker_field_{{id}}"\r
           matInput\r
           maxlength="2"\r
           [ngModel]="time | ngxMatTimepickerParser: timeUnit | timeLocalizer: timeUnit : true"\r
           (ngModelChange)="onModelChange($event)"\r
           [placeholder]="placeholder"\r
           [disabled]="disabled"\r
           (keydown)="onKeydown($event)"\r
           (beforeinput)="changeTime($event)"\r
           (focus)="onFocus()"\r
           (blur)="onBlur()" />\r
    <div class="arrows-wrap"\r
         matSuffix>\r
        <span class="arrow"\r
              role="button"\r
              (click)="increase()">\r
            <svg xmlns="http://www.w3.org/2000/svg"\r
                 height="18"\r
                 viewBox="0 0 24 24"\r
                 width="18">\r
                <path d="M0 0h24v24H0z"\r
                      fill="none" />\r
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />\r
            </svg>\r
        </span>\r
        <span class="arrow"\r
              role="button"\r
              (click)="decrease()">\r
            <svg xmlns="http://www.w3.org/2000/svg"\r
                 height="18"\r
                 viewBox="0 0 24 24"\r
                 width="18">\r
                <path d="M0 0h24v24H0V0z"\r
                      fill="none" />\r
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />\r
            </svg>\r
        </span>\r
    </div>\r
</mat-form-field>\r
`,
      styles: [".ngx-mat-timepicker-control{width:60px;min-width:60px}.ngx-mat-timepicker-control .arrows-wrap{position:relative;z-index:1}.ngx-mat-timepicker-control .arrows-wrap>.arrow{text-align:center;opacity:.5;height:15px;cursor:pointer;transition:opacity .2s;-webkit-user-select:none;user-select:none}.ngx-mat-timepicker-control .arrows-wrap>.arrow:hover{opacity:1}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerParserPipe
  }], {
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    preventTyping: [{
      type: Input
    }],
    time: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    timeList: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepickerFieldComponent = class _NgxMatTimepickerFieldComponent {
  get color() {
    return this._color;
  }
  set color(newValue) {
    this._color = newValue;
  }
  get defaultTime() {
    return this._defaultTime;
  }
  set defaultTime(val) {
    this._defaultTime = val;
    this._isDefaultTime = !!val;
  }
  get floatLabel() {
    return this._floatLabel;
  }
  set floatLabel(newValue) {
    this._floatLabel = newValue;
  }
  get format() {
    return this._format;
  }
  set format(value) {
    if (NgxMatTimepickerAdapter.isTwentyFour(value)) {
      this._format = 24;
      this.minHour = 0;
      this.maxHour = 23;
    } else {
      this._format = 12;
      this.minHour = 1;
      this.maxHour = 12;
    }
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    const isDynamicallyChanged = value && this._previousFormat && this._previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this._updateTime(this.timepickerTime);
    }
    this._previousFormat = this._format;
  }
  get max() {
    return this._max;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get min() {
    return this._min;
  }
  set min(value) {
    if (typeof value === "string") {
      this._min = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_timepickerService, _timepickerLocaleSrv) {
    this._timepickerService = _timepickerService;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this.hour$ = new BehaviorSubject(void 0);
    this.maxHour = 12;
    this.minHour = 1;
    this.minute$ = new BehaviorSubject(void 0);
    this.period = NgxMatTimepickerPeriods.AM;
    this.periods = [NgxMatTimepickerPeriods.AM, NgxMatTimepickerPeriods.PM];
    this.timeChanged = new EventEmitter();
    this.timeUnit = NgxMatTimepickerUnits;
    this._color = "primary";
    this._floatLabel = "auto";
    this._format = 12;
    this._isFirstTimeChange = true;
    this._subsCtrl$ = new Subject();
    this._onChange = () => {
    };
    this._onTouched = () => {
    };
  }
  changeHour(hour) {
    this._timepickerService.hour = this.hoursList.find((h) => h.time === hour);
    this._changeTime();
  }
  changeMinute(minute) {
    this._timepickerService.minute = this.minutesList.find((m) => m.time === minute);
    this._changeTime();
  }
  changePeriod(event) {
    this._timepickerService.period = event.value;
    this._changeTime();
  }
  ngOnDestroy() {
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  ngOnInit() {
    this._initTime(this.defaultTime);
    this.hoursList = NgxMatTimepickerUtils.getHours(this._format);
    this.minutesList = NgxMatTimepickerUtils.getMinutes();
    this.isTimeRangeSet = !!(this.min || this.max);
    this._timepickerService.selectedHour.pipe(tap((clockTime) => this._selectedHour = clockTime?.time), map(this._changeDefaultTimeValue.bind(this)), tap(() => this.isTimeRangeSet && this._updateAvailableMinutes())).subscribe({
      next: (v) => this.hour$.next(v)
    });
    this._timepickerService.selectedMinute.pipe(map(this._changeDefaultTimeValue.bind(this)), tap(() => this._isFirstTimeChange = false)).subscribe({
      next: (v) => this.minute$.next(v)
    });
    if (this.format === 12) {
      this._timepickerService.selectedPeriod.pipe(distinctUntilChanged(), tap((period) => this.period = period), tap((period) => this.isChangePeriodDisabled = this._isPeriodDisabled(period)), takeUntil(this._subsCtrl$)).subscribe(() => this.isTimeRangeSet && this._updateAvailableTime());
    } else {
      this.isTimeRangeSet && this._updateAvailableTime();
    }
  }
  onTimeSet(time) {
    this._updateTime(time);
    this._emitLocalTimeChange(time);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  writeValue(val) {
    if (val) {
      this._initTime(val);
    } else {
      this._resetTime();
    }
  }
  _changeDefaultTimeValue(clockFaceTime) {
    if (!this._isDefaultTime && this._isFirstTimeChange) {
      return __spreadProps(__spreadValues({}, clockFaceTime), {
        time: null
      });
    }
    return clockFaceTime;
  }
  _changeTime() {
    if (!isNaN(this.hour$.getValue()?.time) && !isNaN(this.minute$.getValue()?.time)) {
      const time = this._timepickerService.getFullTime(this.format);
      this.timepickerTime = time;
      this._emitLocalTimeChange(time);
    }
  }
  _emitLocalTimeChange(time) {
    const localTime = NgxMatTimepickerAdapter.toLocaleTimeString(time, {
      format: this.format,
      locale: this._locale
    });
    this._onChange(localTime);
    this._onTouched(localTime);
    this.timeChanged.emit(localTime);
  }
  _initTime(time) {
    const isDefaultTimeAvailable = NgxMatTimepickerAdapter.isTimeAvailable(time, this.min, this.max, "minutes", null, this.format);
    if (!isDefaultTimeAvailable) {
      if (this.min) {
        this._updateTime(NgxMatTimepickerAdapter.fromDateTimeToString(this.min, this.format));
        return;
      }
      if (this.max) {
        this._updateTime(NgxMatTimepickerAdapter.fromDateTimeToString(this.max, this.format));
        return;
      }
    }
    this._updateTime(time);
  }
  _isPeriodDisabled(period) {
    return NgxMatTimepickerUtils.disableHours(NgxMatTimepickerUtils.getHours(12), {
      min: this.min,
      max: this.max,
      format: 12,
      period: period === NgxMatTimepickerPeriods.AM ? NgxMatTimepickerPeriods.PM : NgxMatTimepickerPeriods.AM
    }).every((time) => time.disabled);
  }
  _resetTime() {
    this._timepickerService.hour = {
      angle: 0,
      time: null
    };
    this._timepickerService.minute = {
      angle: 0,
      time: null
    };
  }
  _updateAvailableHours() {
    this.hoursList = NgxMatTimepickerUtils.disableHours(this.hoursList, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  _updateAvailableMinutes() {
    this.minutesList = NgxMatTimepickerUtils.disableMinutes(this.minutesList, this._selectedHour, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  _updateAvailableTime() {
    this._updateAvailableHours();
    if (this._selectedHour) {
      this._updateAvailableMinutes();
    }
  }
  _updateTime(time) {
    if (time) {
      const formattedTime = NgxMatTimepickerAdapter.formatTime(time, {
        locale: this._locale,
        format: this.format
      });
      this._timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min, this.max, this.format);
      this.timepickerTime = formattedTime;
    }
  }
};
_NgxMatTimepickerFieldComponent.ɵfac = function NgxMatTimepickerFieldComponent_Factory(t) {
  return new (t || _NgxMatTimepickerFieldComponent)(ɵɵdirectiveInject(NgxMatTimepickerService), ɵɵdirectiveInject(NgxMatTimepickerLocaleService));
};
_NgxMatTimepickerFieldComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxMatTimepickerFieldComponent,
  selectors: [["ngx-mat-timepicker-field"]],
  inputs: {
    color: "color",
    defaultTime: "defaultTime",
    floatLabel: "floatLabel",
    format: "format",
    max: "max",
    min: "min",
    cancelBtnTmpl: "cancelBtnTmpl",
    confirmBtnTmpl: "confirmBtnTmpl",
    controlOnly: "controlOnly",
    disabled: "disabled",
    toggleIcon: "toggleIcon"
  },
  outputs: {
    timeChanged: "timeChanged"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([NgxMatTimepickerService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: _NgxMatTimepickerFieldComponent,
    multi: true
  }]), ɵɵStandaloneFeature],
  decls: 11,
  vars: 32,
  consts: [["timepicker", ""], ["defaultIcon", ""], [1, "ngx-mat-timepicker", 3, "ngClass"], [1, "ngx-mat-timepicker__control--first", 3, "timeChanged", "color", "floatLabel", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping"], [1, "separator-colon", "ngx-mat-timepicker__control--second"], [1, "ngx-mat-timepicker__control--third", 3, "timeChanged", "color", "floatLabel", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping"], ["class", "period-select ngx-mat-timepicker__control--forth", 3, "color", 4, "ngIf"], ["class", "ngx-mat-timepicker__toggle", 3, "for", "disabled", 4, "ngIf"], [3, "timeSet", "color", "min", "max", "defaultTime", "format", "cancelBtnTmpl", "confirmBtnTmpl"], [1, "period-select", "ngx-mat-timepicker__control--forth", 3, "color"], [3, "selectionChange", "disabled", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "ngx-mat-timepicker__toggle", 3, "for", "disabled"], ["ngxMatTimepickerToggleIcon", ""], [4, "ngTemplateOutlet"]],
  template: function NgxMatTimepickerFieldComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 2)(1, "ngx-mat-timepicker-time-control", 3);
      ɵɵlistener("timeChanged", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_time_control_timeChanged_1_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeHour($event));
      });
      ɵɵelementEnd();
      ɵɵelementStart(2, "span", 4);
      ɵɵtext(3, ":");
      ɵɵelementEnd();
      ɵɵelementStart(4, "ngx-mat-timepicker-time-control", 5);
      ɵɵlistener("timeChanged", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_time_control_timeChanged_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeMinute($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(5, NgxMatTimepickerFieldComponent_mat_form_field_5_Template, 3, 4, "mat-form-field", 6)(6, NgxMatTimepickerFieldComponent_ngx_mat_timepicker_toggle_6_Template, 3, 3, "ngx-mat-timepicker-toggle", 7);
      ɵɵelementEnd();
      ɵɵelementStart(7, "ngx-mat-timepicker", 8, 0);
      ɵɵlistener("timeSet", function NgxMatTimepickerFieldComponent_Template_ngx_mat_timepicker_timeSet_7_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onTimeSet($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(9, NgxMatTimepickerFieldComponent_ng_template_9_Template, 2, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_16_0;
      ɵɵproperty("ngClass", ɵɵpureFunction1(30, _c11, ctx.disabled));
      ɵɵadvance();
      ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("placeholder", "HH")("time", (tmp_6_0 = ctx.hour$.getValue()) == null ? null : tmp_6_0.time)("min", ctx.minHour)("max", ctx.maxHour)("timeUnit", ctx.timeUnit.HOUR)("disabled", ctx.disabled)("timeList", ctx.hoursList)("preventTyping", ctx.isTimeRangeSet);
      ɵɵadvance(3);
      ɵɵproperty("color", ctx.color)("floatLabel", ctx.floatLabel)("placeholder", "MM")("time", (tmp_16_0 = ctx.minute$.getValue()) == null ? null : tmp_16_0.time)("min", 0)("max", 59)("timeUnit", ctx.timeUnit.MINUTE)("disabled", ctx.disabled)("timeList", ctx.minutesList)("preventTyping", ctx.isTimeRangeSet);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.format !== 24);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.controlOnly);
      ɵɵadvance();
      ɵɵproperty("color", ctx.color)("min", ctx.min)("max", ctx.max)("defaultTime", ctx.timepickerTime)("format", ctx.format)("cancelBtnTmpl", ctx.cancelBtnTmpl)("confirmBtnTmpl", ctx.confirmBtnTmpl);
    }
  },
  dependencies: [NgClass, NgxMatTimepickerControlComponent, NgIf, MatFormFieldModule, MatFormField, MatSelectModule, MatSelect, MatOption, FormsModule, NgControlStatus, NgModel, NgForOf, MatOptionModule, NgxMatTimepickerToggleComponent, NgxMatTimepickerToggleIconDirective, NgTemplateOutlet, NgxMatTimepickerComponent, MatIconModule, MatIcon],
  styles: [".ngx-mat-timepicker{display:flex;align-items:center;height:100%}.ngx-mat-timepicker--disabled{background:#00000012;pointer-events:none}.ngx-mat-timepicker .separator-colon{margin-left:5px;margin-right:5px}.ngx-mat-timepicker .period-select{width:60px;min-width:60px;margin-left:8px;text-align:center}.ngx-mat-timepicker__control--first{order:1}.ngx-mat-timepicker__control--second{order:2}.ngx-mat-timepicker__control--third{order:3}.ngx-mat-timepicker__control--forth{order:4}.ngx-mat-timepicker__toggle{order:4;margin-bottom:1.5em;margin-left:4px}.ngx-mat-timepicker__toggle span.mat-button-wrapper{font-size:24px}\n"],
  encapsulation: 2,
  changeDetection: 0
});
var NgxMatTimepickerFieldComponent = _NgxMatTimepickerFieldComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerFieldComponent, [{
    type: Component,
    args: [{
      selector: "ngx-mat-timepicker-field",
      providers: [NgxMatTimepickerService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxMatTimepickerFieldComponent,
        multi: true
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      imports: [NgClass, NgxMatTimepickerControlComponent, NgIf, MatFormFieldModule, MatSelectModule, FormsModule, NgForOf, MatOptionModule, NgxMatTimepickerToggleComponent, NgxMatTimepickerToggleIconDirective, NgTemplateOutlet, NgxMatTimepickerComponent, MatIconModule],
      template: `<div class="ngx-mat-timepicker"\r
     [ngClass]="{'ngx-mat-timepicker--disabled': disabled}">\r
    <ngx-mat-timepicker-time-control\r
            class="ngx-mat-timepicker__control--first"\r
            [color]="color"\r
            [floatLabel]="floatLabel"\r
            [placeholder]="'HH'"\r
            [time]="hour$.getValue()?.time"\r
            [min]="minHour"\r
            [max]="maxHour"\r
            [timeUnit]="timeUnit.HOUR"\r
            [disabled]="disabled"\r
            [timeList]="hoursList"\r
            [preventTyping]="isTimeRangeSet"\r
            (timeChanged)="changeHour($event)"></ngx-mat-timepicker-time-control>\r
    <span class="separator-colon ngx-mat-timepicker__control--second">:</span>\r
    <ngx-mat-timepicker-time-control\r
            class="ngx-mat-timepicker__control--third"\r
            [color]="color"\r
            [floatLabel]="floatLabel"\r
            [placeholder]="'MM'"\r
            [time]="minute$.getValue()?.time"\r
            [min]="0"\r
            [max]="59"\r
            [timeUnit]="timeUnit.MINUTE"\r
            [disabled]="disabled"\r
            [timeList]="minutesList"\r
            [preventTyping]="isTimeRangeSet"\r
            (timeChanged)="changeMinute($event)"></ngx-mat-timepicker-time-control>\r
    <mat-form-field class="period-select ngx-mat-timepicker__control--forth"\r
                    *ngIf="format !== 24"\r
                    [color]="color">\r
        <mat-select [disabled]="disabled || isChangePeriodDisabled"\r
                    (selectionChange)="changePeriod($event)"\r
                    [ngModel]="period">\r
            <mat-option *ngFor="let option of periods"\r
                        [value]="option">{{option}}</mat-option>\r
        </mat-select>\r
    </mat-form-field>\r
    <ngx-mat-timepicker-toggle\r
            class="ngx-mat-timepicker__toggle"\r
            *ngIf="!controlOnly"\r
            [for]="timepicker"\r
            [disabled]="disabled">\r
        <span ngxMatTimepickerToggleIcon>\r
            <ng-container *ngTemplateOutlet="toggleIcon || defaultIcon"></ng-container>\r
        </span>\r
    </ngx-mat-timepicker-toggle>\r
</div>\r
<ngx-mat-timepicker\r
        [color]="color"\r
        [min]="min"\r
        [max]="max"\r
        [defaultTime]="timepickerTime"\r
        [format]="format"\r
        [cancelBtnTmpl]="cancelBtnTmpl"\r
        [confirmBtnTmpl]="confirmBtnTmpl"\r
        (timeSet)="onTimeSet($event)"\r
        #timepicker></ngx-mat-timepicker>\r
\r
<ng-template #defaultIcon>\r
    <mat-icon>watch_later</mat-icon>\r
</ng-template>\r
`,
      styles: [".ngx-mat-timepicker{display:flex;align-items:center;height:100%}.ngx-mat-timepicker--disabled{background:#00000012;pointer-events:none}.ngx-mat-timepicker .separator-colon{margin-left:5px;margin-right:5px}.ngx-mat-timepicker .period-select{width:60px;min-width:60px;margin-left:8px;text-align:center}.ngx-mat-timepicker__control--first{order:1}.ngx-mat-timepicker__control--second{order:2}.ngx-mat-timepicker__control--third{order:3}.ngx-mat-timepicker__control--forth{order:4}.ngx-mat-timepicker__toggle{order:4;margin-bottom:1.5em;margin-left:4px}.ngx-mat-timepicker__toggle span.mat-button-wrapper{font-size:24px}\n"]
    }]
  }], () => [{
    type: NgxMatTimepickerService
  }, {
    type: NgxMatTimepickerLocaleService
  }], {
    color: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    cancelBtnTmpl: [{
      type: Input
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    controlOnly: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }],
    toggleIcon: [{
      type: Input
    }]
  });
})();
var _NgxMatTimepickerDirective = class _NgxMatTimepickerDirective {
  get element() {
    return this._elementRef && this._elementRef.nativeElement;
  }
  get format() {
    return this._format;
  }
  set format(value) {
    this._format = NgxMatTimepickerAdapter.isTwentyFour(+value) ? 24 : 12;
    const isDynamicallyChanged = value && this._previousFormat && this._previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this.value = this._value;
      this._timepicker.updateTime(this._value);
    }
    this._previousFormat = this._format;
  }
  get max() {
    return this._max;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get min() {
    return this._min;
  }
  set min(value) {
    if (typeof value === "string") {
      this._min = NgxMatTimepickerAdapter.parseTime(value, {
        locale: this._locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  set timepicker(picker) {
    this._registerTimepicker(picker);
  }
  get value() {
    if (!this._value) {
      return "";
    }
    return NgxMatTimepickerAdapter.toLocaleTimeString(this._value, {
      format: this.format,
      locale: this._locale
    });
  }
  set value(value) {
    if (!value) {
      this._value = "";
      this._updateInputValue();
      return;
    }
    const time = NgxMatTimepickerAdapter.formatTime(value, {
      locale: this._locale,
      format: this.format
    });
    const isAvailable = NgxMatTimepickerAdapter.isTimeAvailable(time, this._min, this._max, "minutes", this._timepicker.minutesGap, this._format);
    if (isAvailable) {
      this._value = time;
      this._updateInputValue();
      return;
    }
    console.warn("Selected time doesn't match min or max value");
  }
  set _defaultTime(time) {
    this._timepicker.defaultTime = NgxMatTimepickerAdapter.formatTime(time, {
      locale: this._locale,
      format: this.format
    });
  }
  get _locale() {
    return this._timepickerLocaleSrv.locale;
  }
  constructor(_elementRef, _timepickerLocaleSrv, _matFormField) {
    this._elementRef = _elementRef;
    this._timepickerLocaleSrv = _timepickerLocaleSrv;
    this._matFormField = _matFormField;
    this.cdkOverlayOrigin = new CdkOverlayOrigin(this._matFormField ? this._matFormField.getConnectedOverlayOrigin() : this._elementRef);
    this._format = 12;
    this._subsCtrl$ = new Subject();
    this._value = "";
    this.onTouched = () => {
    };
    this._onChange = () => {
    };
  }
  ngOnChanges(changes) {
    const vChanges = changes["value"];
    if (vChanges && vChanges.currentValue) {
      this._defaultTime = vChanges.currentValue;
    }
  }
  ngOnDestroy() {
    this._unregisterTimepicker();
    this._subsCtrl$.next();
    this._subsCtrl$.complete();
  }
  onClick(event) {
    if (!this.disableClick) {
      this._timepicker.open();
      event.stopPropagation();
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  updateValue(e) {
    this.value = e.target.value;
    this._onChange(this.value);
  }
  writeValue(value) {
    this.value = value;
    if (value) {
      this._defaultTime = value;
    }
  }
  _registerTimepicker(picker) {
    if (picker) {
      this._timepicker = picker;
      this._timepicker.registerInput(this);
      this._timepicker.timeSet.pipe(takeUntil(this._subsCtrl$)).subscribe((time) => {
        this.value = time;
        this._onChange(this.value);
        this.onTouched();
        this._defaultTime = this._value;
      });
    } else {
      throw new Error("NgxMatTimepickerComponent is not defined. Please make sure you passed the timepicker to ngxMatTimepicker directive");
    }
  }
  _unregisterTimepicker() {
    if (this._timepicker) {
      this._timepicker.unregisterInput();
    }
  }
  _updateInputValue() {
    this._elementRef.nativeElement.value = this.value;
  }
};
_NgxMatTimepickerDirective.ɵfac = function NgxMatTimepickerDirective_Factory(t) {
  return new (t || _NgxMatTimepickerDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgxMatTimepickerLocaleService), ɵɵdirectiveInject(MatFormField, 8));
};
_NgxMatTimepickerDirective.ɵdir = ɵɵdefineDirective({
  type: _NgxMatTimepickerDirective,
  selectors: [["", "ngxMatTimepicker", ""]],
  hostVars: 2,
  hostBindings: function NgxMatTimepickerDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("blur", function NgxMatTimepickerDirective_blur_HostBindingHandler() {
        return ctx.onTouched();
      })("click", function NgxMatTimepickerDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      })("change", function NgxMatTimepickerDirective_change_HostBindingHandler($event) {
        return ctx.updateValue($event);
      });
    }
    if (rf & 2) {
      ɵɵhostProperty("disabled", ctx.disabled);
      ɵɵattribute("cdkOverlayOrigin", ctx.cdkOverlayOrigin);
    }
  },
  inputs: {
    format: "format",
    max: "max",
    min: "min",
    timepicker: [InputFlags.None, "ngxMatTimepicker", "timepicker"],
    value: "value",
    disableClick: "disableClick",
    disabled: "disabled"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: _NgxMatTimepickerDirective,
    multi: true
  }]), ɵɵNgOnChangesFeature]
});
var NgxMatTimepickerDirective = _NgxMatTimepickerDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMatTimepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxMatTimepickerDirective,
        multi: true
      }],
      // tslint:disable-next-line:no-host-metadata-property
      host: {
        "[disabled]": "disabled",
        "(blur)": "onTouched()"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgxMatTimepickerLocaleService
  }, {
    type: MatFormField,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MatFormField]
    }]
  }], {
    format: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    timepicker: [{
      type: Input,
      args: ["ngxMatTimepicker"]
    }],
    value: [{
      type: Input
    }],
    cdkOverlayOrigin: [{
      type: HostBinding,
      args: ["attr.cdkOverlayOrigin"]
    }],
    disableClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    updateValue: [{
      type: HostListener,
      args: ["change", ["$event"]]
    }]
  });
})();
var _NgxMatTimepickerTimeFormatterPipe = class _NgxMatTimepickerTimeFormatterPipe {
  transform(time, timeUnit) {
    if (time == null || time === "") {
      return time;
    }
    switch (timeUnit) {
      case NgxMatTimepickerUnits.HOUR:
        return DateTime.fromObject({
          hour: +time
        }).toFormat("HH");
      case NgxMatTimepickerUnits.MINUTE:
        return DateTime.fromObject({
          minute: +time
        }).toFormat("mm");
      default:
        throw new Error("no such time unit");
    }
  }
};
_NgxMatTimepickerTimeFormatterPipe.ɵfac = function NgxMatTimepickerTimeFormatterPipe_Factory(t) {
  return new (t || _NgxMatTimepickerTimeFormatterPipe)();
};
_NgxMatTimepickerTimeFormatterPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeFormatter",
  type: _NgxMatTimepickerTimeFormatterPipe,
  pure: true,
  standalone: true
});
var NgxMatTimepickerTimeFormatterPipe = _NgxMatTimepickerTimeFormatterPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerTimeFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "timeFormatter",
      standalone: true
    }]
  }], null, null);
})();
var _NgxMatTimepickerModule = class _NgxMatTimepickerModule {
  static setLocale(locale) {
    return {
      ngModule: _NgxMatTimepickerModule,
      providers: [{
        provide: NGX_MAT_TIMEPICKER_LOCALE,
        useValue: locale
      }, {
        provide: NGX_MAT_TIMEPICKER_CONFIG,
        useValue: void 0
      }, NgxMatTimepickerLocaleService]
    };
  }
};
_NgxMatTimepickerModule.ɵfac = function NgxMatTimepickerModule_Factory(t) {
  return new (t || _NgxMatTimepickerModule)();
};
_NgxMatTimepickerModule.ɵmod = ɵɵdefineNgModule({
  type: _NgxMatTimepickerModule,
  imports: [
    CommonModule,
    A11yModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    OverlayModule,
    PortalModule,
    // Not really used, but needed to use it as abstract class
    NgxMatTimepickerBaseDirective,
    NgxMatTimepickerHoursFaceDirective,
    //
    NgxMatTimepickerActiveHourPipe,
    NgxMatTimepickerActiveMinutePipe,
    NgxMatTimepickerComponent,
    NgxMatTimepickerDialComponent,
    NgxMatTimepickerDialControlComponent,
    NgxMatTimepickerDialogComponent,
    NgxMatTimepickerDirective,
    NgxMatTimepickerFaceComponent,
    NgxMatTimepickerMinutesFaceComponent,
    NgxMatTimepickerPeriodComponent,
    NgxMatTimepickerStandaloneComponent,
    NgxMatTimepickerToggleComponent,
    NgxMatTimepicker12HoursFaceComponent,
    NgxMatTimepicker24HoursFaceComponent,
    NgxMatTimepickerToggleIconDirective,
    NgxMatTimepickerAutofocusDirective,
    NgxMatTimepickerMinutesFormatterPipe,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerControlComponent,
    NgxMatTimepickerParserPipe,
    NgxMatTimepickerContentComponent,
    NgxMatTimepickerTimeFormatterPipe,
    NgxMatTimepickerTimeLocalizerPipe
  ],
  exports: [NgxMatTimepickerComponent, NgxMatTimepickerToggleComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerDirective, NgxMatTimepickerToggleIconDirective]
});
_NgxMatTimepickerModule.ɵinj = ɵɵdefineInjector({
  providers: [NgxMatTimepickerLocaleService, {
    provide: MAT_FAB_DEFAULT_OPTIONS,
    useValue: {
      color: "void"
    }
  }],
  imports: [CommonModule, A11yModule, FormsModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule, MatToolbarModule, MatIconModule, OverlayModule, PortalModule, NgxMatTimepickerComponent, NgxMatTimepickerDialComponent, NgxMatTimepickerDialControlComponent, NgxMatTimepickerDialogComponent, NgxMatTimepickerFaceComponent, NgxMatTimepickerMinutesFaceComponent, NgxMatTimepickerStandaloneComponent, NgxMatTimepickerToggleComponent, NgxMatTimepicker12HoursFaceComponent, NgxMatTimepicker24HoursFaceComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerControlComponent]
});
var NgxMatTimepickerModule = _NgxMatTimepickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMatTimepickerModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        A11yModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        OverlayModule,
        PortalModule,
        // Not really used, but needed to use it as abstract class
        NgxMatTimepickerBaseDirective,
        NgxMatTimepickerHoursFaceDirective,
        //
        NgxMatTimepickerActiveHourPipe,
        NgxMatTimepickerActiveMinutePipe,
        NgxMatTimepickerComponent,
        NgxMatTimepickerDialComponent,
        NgxMatTimepickerDialControlComponent,
        NgxMatTimepickerDialogComponent,
        NgxMatTimepickerDirective,
        NgxMatTimepickerFaceComponent,
        NgxMatTimepickerMinutesFaceComponent,
        NgxMatTimepickerPeriodComponent,
        NgxMatTimepickerStandaloneComponent,
        NgxMatTimepickerToggleComponent,
        NgxMatTimepicker12HoursFaceComponent,
        NgxMatTimepicker24HoursFaceComponent,
        NgxMatTimepickerToggleIconDirective,
        NgxMatTimepickerAutofocusDirective,
        NgxMatTimepickerMinutesFormatterPipe,
        NgxMatTimepickerFieldComponent,
        NgxMatTimepickerControlComponent,
        NgxMatTimepickerParserPipe,
        NgxMatTimepickerContentComponent,
        NgxMatTimepickerTimeFormatterPipe,
        NgxMatTimepickerTimeLocalizerPipe
      ],
      exports: [NgxMatTimepickerComponent, NgxMatTimepickerToggleComponent, NgxMatTimepickerFieldComponent, NgxMatTimepickerDirective, NgxMatTimepickerToggleIconDirective],
      providers: [NgxMatTimepickerLocaleService, {
        provide: MAT_FAB_DEFAULT_OPTIONS,
        useValue: {
          color: "void"
        }
      }]
    }]
  }], null, null);
})();
export {
  NgxMatTimepickerComponent,
  NgxMatTimepickerDirective,
  NgxMatTimepickerFieldComponent,
  NgxMatTimepickerLocaleService,
  NgxMatTimepickerModule,
  NgxMatTimepickerToggleComponent,
  NgxMatTimepickerToggleIconDirective
};
//# sourceMappingURL=ngx-mat-timepicker.js.map
