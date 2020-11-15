!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}({1:function(e,n,t){"use strict";
/**
 *  emoji-log
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 *
 *  Art by Colin J. Randall
 *
 *               \
 *                \
 *                 \\
 *                  \\
 *                   >\/7
 *               _.-(6'  \
 *              (=___._/` \
 *                   )  \ |
 *                  /   / |
 *                 /    > /
 *                j    < _\
 *            _.-' :      ``.
 *            \ r=._\        `.
 *           <`\\_  \         .`-.
 *            \ r-7  `-. ._  ' .  `\
 *             \`,      `-.`7  7)   )
 *              \/         \|  \'  / `-._
 *                         ||    .'
 *                          \\  (
 *                           >\  >
 *                       ,.-' >.'
 *                      <.'_.''
 *                        <'
 *
 */Object.defineProperty(n,"__esModule",{value:!0});var o;function r(e,n="🐶",t){const r=(i=e)&&(null==i?void 0:i.stack)&&(null==i?void 0:i.message)&&"string"==typeof i.stack&&"string"==typeof i.message;var i;const u=r?e.message:e,c=t||(null==e?void 0:e.toString().length)*o.LINE_LENGTH_VARIABLE||o.DEFAULT_LINE_LENGTH;console.log(`\n      /‾${"‾‾".repeat(c)}‾\n  ${n} < `,u,`\n      \\_${"__".repeat(c)}_\n  `),r&&("undefined"!=typeof window?(console.groupCollapsed(n+" > Stack Trace:"),console.error(e.stack),console.groupEnd()):(console.log(n+" > Stack Trace:"),console.error(e.stack)))}n.CustomConsole=class{},function(e){e[e.LINE_LENGTH_VARIABLE=.66]="LINE_LENGTH_VARIABLE",e[e.DEFAULT_LINE_LENGTH=4]="DEFAULT_LINE_LENGTH",e[e.ONE=1]="ONE",e[e.TWO=2]="TWO",e[e.THREE=3]="THREE"}(o||(o={})),console.emoji=function(...e){const n=[];return n[0]=function(){return r("Meow","🐱"),this},n[o.ONE]=function(e){return r(e),this},n[o.TWO]=function(e,n){return r(n,e),this},n[o.THREE]=function(e,n,t){return r(n,e,t),this},this.emoji=function(...e){return n[e.length](...e),this},this.emoji(...e),this}},8:function(e,n,t){"use strict";t.r(n);t(1);console.emoji("🦄","Hello World from options main file!")}});