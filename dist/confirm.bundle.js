!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(1);function o(e,...t){let n=Object(r.g)();const o=e.split(".");let a;for(const e of o){if(a=n[e],"string"==typeof a)break;n=n[e]}for(const e of t)a=a.replace("{}",e);return a}},function(e,t,n){"use strict";n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return m})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return p})),n.d(t,"d",(function(){return h})),n.d(t,"e",(function(){return g})),n.d(t,"a",(function(){return b}));const r={ja:n(6),"en-US":n(7)},o={ja:n(8),"en-US":n(9)},a={ja:new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",currencyDisplay:"name"}),"en-US":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",currencyDisplay:"symbol"})},i={ja:new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}),"en-US":new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"})},s={ja:new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}),"en-US":new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit"})},c={ja:function(e){const t=e.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);if(!t||4!==t.length)return null;const n=parseInt(t[1],10),r=parseInt(t[2],10),o=parseInt(t[3],10);return new Date(n,r-1,o)},"en-US":function(e){const t=e.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(!t||4!==t.length)return null;const n=parseInt(t[3],10),r=parseInt(t[1],10),o=parseInt(t[2],10);return new Date(n,r-1,o)}},l={ja:1e3,"en-US":10};function u(){return document.getElementsByTagName("html")[0].lang}function d(e){return e=void 0!==e?e:u(),r[e]}function m(e){return e=void 0!==e?e:u(),o[e]}function f(e){return e=void 0!==e?e:u(),a[e]}function p(e){return e=void 0!==e?e:u(),i[e]}function h(e){return e=void 0!==e?e:u(),s[e]}function g(e){return e=void 0!==e?e:u(),c[e]}function b(e){return e=void 0!==e?e:u(),l[e]}},function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"g",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"h",(function(){return s})),n.d(t,"i",(function(){return c})),n.d(t,"c",(function(){return l})),n.d(t,"e",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"j",(function(){return m})),n.d(t,"a",(function(){return f}));var r=n(1);function o(e){let t=Object(r.h)().find((function(t){return t.email===e}));return t?(t.preset=!0,t):(t=localStorage.getItem(e),t?JSON.parse(t):null)}function a(e,t){const n=o(e);return n&&n.password===t}function i(){return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/,"$1")}function s(e){document.cookie="session="+e+"; max-age=630720000"}function c(){document.cookie="session=; max-age=0"}function l(){return""+(Math.floor(9e9*Math.random())+1e9)}function u(){return document.cookie.replace(/(?:(?:^|.*;\s*)transaction\s*\=\s*([^;]*).*$)|^.*$/,"$1")}function d(){document.cookie="transaction=; max-age=0"}function m(){document.getElementById("signup-holder").classList.replace("d-block","d-none"),document.getElementById("login-holder").classList.replace("d-block","d-none"),document.getElementById("mypage-holder").classList.replace("d-none","d-block"),document.getElementById("logout-holder").classList.replace("d-none","d-block"),document.getElementById("logout-form").addEventListener("submit",(function(){c()}))}function f(e,t){return!e.only||!!t&&("member"===e.only||("premium"===e.only?"premium"===t.rank:void 0))}},function(e,t,n){"use strict";function r(e){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}function o(){let e;e=2===location.pathname.split("/").length?location.pathname.replace(/(\/.+\.html)/,"/index.html"):location.pathname.replace(/(\/.+)(\/.+\.html)/,"$1/index.html"),location.assign(location.origin+e)}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return l})),n.d(t,"f",(function(){return u}));var r=n(1);function o(e){return Object(r.b)().format(e)}function a(e){return Object(r.c)().format(e)}function i(e){return Object(r.d)().format(e)}function s(e){return Object(r.e)()(e)}function c(e){return e<10?"0"+e:""+e}function l(e){return e.getFullYear()+"-"+c(e.getMonth()+1)+"-"+c(e.getDate())}function u(e){const t=e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(!t||4!==t.length)return null;const n=parseInt(t[1],10),r=parseInt(t[2],10),o=parseInt(t[3],10);return new Date(n,r-1,o)}},,function(e){e.exports=JSON.parse('{"validation":{"valueMissing":"このフィールドを入力してください。","typeMismatch":{"email":"メールアドレスを入力してください。","url":"URLを入力してください。"},"badInput":"有効な値を入力してください。","patternMismatch":"指定されている形式で入力してください。","tooLong":"{}文字以内で入力してください。","tooShort":"{}文字以上で入力してください。","rangeOverflow":"{}以下の値を入力してください。","rangeUnderflow":"{}以上の値を入力してください。","stepMismatch":"有効な値を入力してください。","shoudBeNextDay":"翌日以降の日付を入力してください。","shouldBeThreeMonth":"3ヶ月以内の日付を入力してください。","mailOrAddressMismatch":"メールアドレスまたはパスワードが違います。","existsMail":"このメールアドレスはすでに登録済みです。","passwordUnmatch":"入力されたパスワードと一致しません。","underTenKb":"ファイルサイズは10KB以下にしてください。","onlyImageFile":"画像ファイルを選択してください。"},"user":{"gender":{"unregistered":"未登録","male":"男性","female":"女性","other":"その他"},"rank":{"premium":"プレミアム会員","normal":"一般会員"},"unregistered":"未登録","notification":{"true":"受け取る","false":"受け取らない"},"deleteConfirm":"退会すると全ての情報が削除されます。\\nよろしいですか？","deleteComplete":"退会処理を完了しました。ご利用ありがとうございました。"},"plans":{"premiumOnly":"❤️プレミアム会員限定❤️","memberOnly":"会員限定","oneAdult":"大人1名{}","minHeadCount":"{}名様から","reserveLink":"このプランで予約"},"reserve":{"planDescLong":"お一人様1泊{}〜、土日は25%アップ。{}名様〜{}名様、最長{}泊","planDescShort":"お一人様1泊{}〜、土日は25%アップ","roomInfo":"部屋情報","totalBill":"合計 {}（税込み）","term":"{} 〜 {} {}泊","headCount":"{}名様","breakfast":"朝食バイキング","earlyCheckIn":"昼からチェックインプラン","sightseeing":"お得な観光プラン","none":"なし","username":"{}様","contact":{"no":"希望しない","email":"メール：{}","tel":"電話：{}"}}}')},function(e){e.exports=JSON.parse('{"validation":{"valueMissing":"Please fill out this field.","typeMismatch":{"email":"Please enter a non-empty email address.","url":"Please enter a non-empty URL."},"badInput":"Please enter a valid value.","patternMismatch":"Please match the requested format.","tooLong":"Please shorten this text to {} characters or less","tooShort":"Please lengthen this text to {} characters or more","rangeOverflow":"Value must be less than or equal to {}.","rangeUnderflow":"Value must be greater than or equal to {}.","stepMismatch":"Please enter a valid value.","shoudBeNextDay":"Please enter a date after tomorrow.","shouldBeThreeMonth":"Please enter a date within 3 months.","mailOrAddressMismatch":"Email or password is invalid.","existsMail":"Email has already been taken.","passwordUnmatch":"Password doesn\'t match.","underTenKb":"Please select a file with a size of 10 KB or less.","onlyImageFile":"Please select an image file."},"user":{"gender":{"unregistered":"not answered","male":"male","female":"female","other":"other"},"rank":{"premium":"Premium","normal":"Normal"},"unregistered":"not answered","notification":{"true":"received","false":"not received"},"deleteConfirm":"If you cancel your membership, all information will be deleted.\\nDo you wish to proceed?","deleteComplete":"The process has been completed. Thank you for your service."},"plans":{"premiumOnly":"❤️Premium members ONLY❤️","memberOnly":"members ONLY","oneAdult":"{} per guest","minHeadCount":"at least {} person(s)","reserveLink":"Reserve room"},"reserve":{"planDescLong":"{} per night. If contains Sun or Sat, plus 25%. {} - {} persons. Max {} nights","planDescShort":"{} per night. If contains Sun or Sat, plus 25%.","roomInfo":"Room info","totalBill":"Total {} (included taxes)","term":"{} - {}. {} night(s)","headCount":"{} person(s)","breakfast":"Breakfast","earlyCheckIn":"Early check-in","sightseeing":"Sightseeing","none":"none","username":"{}","contact":{"no":"not required","email":"Email: {}","tel":"Tel: {}"}}}')},function(e){e.exports=JSON.parse('[{"email":"ichiro@example.com","password":"password","username":"山田一郎","rank":"premium","address":"東京都豊島区池袋","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"sakura@example.com","password":"pass1234","username":"松本さくら","rank":"normal","address":"神奈川県横浜市鶴見区大黒ふ頭","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"jun@example.com","password":"pa55w0rd!","username":"林潤","rank":"premium","address":"大阪府大阪市北区梅田","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"yoshiki@example.com","password":"pass-pass","username":"木村良樹","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')},function(e){e.exports=JSON.parse('[{"email":"clark@example.com","password":"password","username":"Clark Evans","rank":"premium","address":"Mountain View, California","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"diana@example.com","password":"pass1234","username":"Diana Johansson","rank":"normal","address":"Redmond, Washington","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"ororo@example.com","password":"pa55w0rd!","username":"Ororo Saldana","rank":"premium","address":"Cupertino, California","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"miles@example.com","password":"pass-pass","username":"Miles Boseman","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')},function(e,t,n){"use strict";function r(e,t,n,r,o,a,i,s){let c=e*r*n;for(let o=0;o<n;o++){const n=new Date(t.getFullYear(),t.getMonth(),t.getDate());n.setDate(n.getDate()+o),0!==n.getDay()&&6!==n.getDay()||(c+=.25*e*r)}return o&&(c+=s*r*n),a&&(c+=s*r),i&&(c+=s*r),c}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";n.r(t);var r=n(3),o=n(4),a=n(1),i=n(2),s=n(10),c=n(0);history.replaceState(null,"","confirm.html"),Object(r.a)((function(){const e=Object(i.e)();if(!e)return void Object(r.b)();const t=sessionStorage.getItem(e);if(!t)return void Object(r.b)();const n=JSON.parse(t);Object(i.b)(),sessionStorage.removeItem(e);const l=Object(o.f)(n.date),u=new Date(l.getFullYear(),l.getMonth(),l.getDate()+n.term),d=Object(s.a)(n.roomBill,l,n.term,n.headCount,n.breakfast,n.earlyCheckIn,n.sightseeing,Object(a.a)());document.getElementById("total-bill").textContent=Object(c.a)("reserve.totalBill",Object(o.a)(d)),document.getElementById("plan-name").textContent=n.planName,document.getElementById("plan-desc").textContent=Object(c.a)("reserve.planDescShort",Object(o.a)(n.roomBill)),document.getElementById("term").textContent=Object(c.a)("reserve.term",Object(o.c)(l),Object(o.c)(u),n.term),document.getElementById("head-count").textContent=Object(c.a)("reserve.headCount",n.headCount);let m="";n.breakfast&&(m+="<li>"+Object(c.a)("reserve.breakfast")+"</li>"),n.earlyCheckIn&&(m+="<li>"+Object(c.a)("reserve.earlyCheckIn")+"</li>"),n.sightseeing&&(m+="<li>"+Object(c.a)("reserve.sightseeing")+"</li>"),m=m.length>0?"<ul>"+m+"</ul>":Object(c.a)("reserve.none"),document.getElementById("plans").innerHTML=m,document.getElementById("username").textContent=Object(c.a)("reserve.username",n.username);let f="";"no"===n.contact?f+=Object(c.a)("reserve.contact.no"):"email"===n.contact?f+=Object(c.a)("reserve.contact.email",n.email):"tel"===n.contact&&(f+=Object(c.a)("reserve.contact.tel",n.tel)),document.getElementById("contact").textContent=f,document.getElementById("comment").textContent=n.comment?n.comment:Object(c.a)("reserve.none"),$("#success-modal").on("hidden.bs.modal",(function(){window.close()}))}))}]);
//# sourceMappingURL=confirm.bundle.js.map