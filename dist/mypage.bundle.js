(()=>{"use strict";var e={338:e=>{e.exports=JSON.parse('{"validation":{"valueMissing":"Please fill out this field.","typeMismatch":{"email":"Please enter a non-empty email address.","url":"Please enter a non-empty URL."},"badInput":"Please enter a valid value.","patternMismatch":"Please match the requested format.","tooLong":"Please shorten this text to {} characters or less.","tooShort":"Please lengthen this text to {} characters or more.","rangeOverflow":"Value must be less than or equal to {}.","rangeUnderflow":"Value must be greater than or equal to {}.","stepMismatch":"Please enter a valid value.","shoudBeNextDay":"Please enter a date after tomorrow.","shouldBeThreeMonth":"Please enter a date within 3 months.","mailOrAddressMismatch":"Email or password is invalid.","existsMail":"Email has already been taken.","passwordUnmatch":"Password doesn\'t match.","underTenKb":"Please select a file with a size of 10 KB or less.","onlyImageFile":"Please select an image file."},"user":{"gender":{"unregistered":"not answered","male":"male","female":"female","other":"other"},"rank":{"premium":"Premium","normal":"Normal"},"unregistered":"not answered","notification":{"true":"received","false":"not received"},"deleteConfirm":"If you cancel your membership, all information will be deleted.\\nDo you wish to proceed?","deleteComplete":"The process has been completed. Thank you for your service."},"plans":{"premiumOnly":"❤️Premium members ONLY❤️","memberOnly":"members ONLY","oneAdult":"{} per guest","minHeadCount":"at least {} person(s)","reserveLink":"Reserve room"},"reserve":{"planDescLong":"{} per night. If contains Sun or Sat, plus 25%. {} - {} persons. Max {} nights","planDescShort":"{} per night. If contains Sun or Sat, plus 25%.","roomInfo":"Room info","totalBill":"Total {} (included taxes)","term":"{} - {}. {} night(s)","headCount":"{} person(s)","breakfast":"Breakfast","earlyCheckIn":"Early check-in","sightseeing":"Sightseeing","none":"none","username":"{}","contact":{"no":"not required","email":"Email: {}","tel":"Tel: {}"}}}')},277:e=>{e.exports=JSON.parse('[{"email":"clark@example.com","password":"password","username":"Clark Evans","rank":"premium","address":"Mountain View, California","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"diana@example.com","password":"pass1234","username":"Diana Johansson","rank":"normal","address":"Redmond, Washington","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"ororo@example.com","password":"pa55w0rd!","username":"Ororo Saldana","rank":"premium","address":"Cupertino, California","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"miles@example.com","password":"pass-pass","username":"Miles Boseman","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')},754:e=>{e.exports=JSON.parse('{"validation":{"valueMissing":"このフィールドを入力してください。","typeMismatch":{"email":"メールアドレスを入力してください。","url":"URLを入力してください。"},"badInput":"有効な値を入力してください。","patternMismatch":"指定されている形式で入力してください。","tooLong":"{}文字以内で入力してください。","tooShort":"{}文字以上で入力してください。","rangeOverflow":"{}以下の値を入力してください。","rangeUnderflow":"{}以上の値を入力してください。","stepMismatch":"有効な値を入力してください。","shoudBeNextDay":"翌日以降の日付を入力してください。","shouldBeThreeMonth":"3ヶ月以内の日付を入力してください。","mailOrAddressMismatch":"メールアドレスまたはパスワードが違います。","existsMail":"このメールアドレスはすでに登録済みです。","passwordUnmatch":"入力されたパスワードと一致しません。","underTenKb":"ファイルサイズは10KB以下にしてください。","onlyImageFile":"画像ファイルを選択してください。"},"user":{"gender":{"unregistered":"未登録","male":"男性","female":"女性","other":"その他"},"rank":{"premium":"プレミアム会員","normal":"一般会員"},"unregistered":"未登録","notification":{"true":"受け取る","false":"受け取らない"},"deleteConfirm":"退会すると全ての情報が削除されます。\\nよろしいですか？","deleteComplete":"退会処理を完了しました。ご利用ありがとうございました。"},"plans":{"premiumOnly":"❤️プレミアム会員限定❤️","memberOnly":"会員限定","oneAdult":"大人1名{}","minHeadCount":"{}名様から","reserveLink":"このプランで予約"},"reserve":{"planDescLong":"お一人様1泊{}〜、土日は25%アップ。{}名様〜{}名様、最長{}泊","planDescShort":"お一人様1泊{}〜、土日は25%アップ","roomInfo":"部屋情報","totalBill":"合計 {}（税込み）","term":"{} 〜 {} {}泊","headCount":"{}名様","breakfast":"朝食バイキング","earlyCheckIn":"昼からチェックインプラン","sightseeing":"お得な観光プラン","none":"なし","username":"{}様","contact":{"no":"希望しない","email":"メール：{}","tel":"電話：{}"}}}')},4:e=>{e.exports=JSON.parse('[{"email":"ichiro@example.com","password":"password","username":"山田一郎","rank":"premium","address":"東京都豊島区池袋","tel":"01234567891","gender":"1","birthday":"","notification":true},{"email":"sakura@example.com","password":"pass1234","username":"松本さくら","rank":"normal","address":"神奈川県横浜市鶴見区大黒ふ頭","tel":"","gender":"2","birthday":"2000-04-01","notification":false},{"email":"jun@example.com","password":"pa55w0rd!","username":"林潤","rank":"premium","address":"大阪府大阪市北区梅田","tel":"01212341234","gender":"9","birthday":"1988-12-17","notification":false},{"email":"yoshiki@example.com","password":"pass-pass","username":"木村良樹","rank":"normal","address":"","tel":"01298765432","gender":"0","birthday":"1992-08-31","notification":true}]')}},r={};function a(t){var n=r[t];if(void 0!==n)return n.exports;var o=r[t]={exports:{}};return e[t](o,o.exports,a),o.exports}(()=>{const e={ja:a(754),"en-US":a(338)},r={ja:a(4),"en-US":a(277)},t=(new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",currencyDisplay:"name"}),new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",currencyDisplay:"symbol"}),{ja:new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}),"en-US":new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"})});function n(){return $("html").attr("lang")}function o(r){return r=void 0!==r?r:n(),e[r]}function s(){document.cookie="session=; max-age=0"}function i(){const e=Array.prototype.slice.call(arguments),r=e.shift();let a=o();const t=r.split(".");let n;for(let e=0;e<t.length&&(n=a[t[e]],"string"!=typeof n);e++)a=a[t[e]];for(let r=0;r<e.length;r++)n=n.replace("{}",e[r]);return n}const l={0:i("user.gender.unregistered"),1:i("user.gender.male"),2:i("user.gender.female"),9:i("user.gender.other")};history.replaceState(null,"","mypage.html");const m=document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/,"$1");m||function(){let e;e=2===location.pathname.split("/").length?location.pathname.replace(/(\/.+\.html)/,"/index.html"):location.pathname.replace(/(\/.+)(\/.+\.html)/,"$1/index.html"),location.assign(location.origin+e)}(),$((function(){const e=function(e){const a=(t=void 0!==t?t:n(),r[t]);var t;let o=null;for(let r=0;r<a.length;r++)if(a[r].email===e){o=a[r];break}return o?(o.preset=!0,o):(o=localStorage.getItem(e),o?JSON.parse(o):null)}(m);var a,o;e&&($("#email").text(e.email),$("#username").text(e.username),"premium"===e.rank?$("#rank").text(i("user.rank.premium")):"normal"===e.rank&&$("#rank").text(i("user.rank.normal")),$("#address").text(e.address?e.address:i("user.unregistered")),$("#tel").text(e.tel?e.tel:i("user.unregistered")),$("#gender").text(l[e.gender]),$("#birthday").text(e.birthday?(a=function(e){const r=e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(!r||4!==r.length)return null;const a=parseInt(r[1],10),t=parseInt(r[2],10),n=parseInt(r[3],10);return new Date(a,t-1,n)}(e.birthday),(o=void 0!==o?o:n(),t[o]).format(a)):i("user.unregistered")),$("#notification").text(e.notification?i("user.notification.true"):i("user.notification.false")),e.icon&&$("<img>",{class:"img-thumbnail",src:e.icon.image,width:e.icon.width,height:e.icon.height,css:{backgroundColor:e.icon.color}}).appendTo("#icon-holder"),$("#logout-form").submit((function(){s()})),e.preset||($("#icon-link").removeClass("disabled").removeAttr("tabindex").removeAttr("aria-disabled"),$("#delete-form > button").prop("disabled",!1),$("#delete-form").submit((function(){if(!confirm(i("user.deleteConfirm")))return!1;s(),localStorage.removeItem(e.email),alert(i("user.deleteComplete"))}))))}))})()})();
//# sourceMappingURL=mypage.bundle.js.map