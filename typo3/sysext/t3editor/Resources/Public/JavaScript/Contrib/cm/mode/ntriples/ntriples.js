!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}((function(e){"use strict";e.defineMode("ntriples",(function(){var e=0,n=1,t=2,r=3,i=4,a=5,o=6,u=7,f=8,l=9,s=10,c=11,p=12;function d(d,h){var v,b=d.location;v=b==e&&"<"==h?n:b==e&&"_"==h?t:b==r&&"<"==h?i:b==a&&"<"==h?o:b==a&&"_"==h?u:b==a&&'"'==h?f:b==n&&">"==h?r:b==t&&" "==h?r:b==i&&">"==h?a:b==o&&">"==h?c:b==u&&" "==h?c:b==f&&'"'==h?c:b==l&&" "==h?c:b==s&&">"==h?c:b==f&&"@"==h?l:b==f&&"^"==h?s:" "!=h||b!=e&&b!=r&&b!=a&&b!=c?b==c&&"."==h?e:p:b,d.location=v}return{startState:function(){return{location:e,uris:[],anchors:[],bnodes:[],langs:[],types:[]}},token:function(e,n){var t=e.next();if("<"==t){d(n,t);var r="";return e.eatWhile((function(e){return"#"!=e&&">"!=e&&(r+=e,!0)})),n.uris.push(r),e.match("#",!1)?"variable":(e.next(),d(n,">"),"variable")}if("#"==t){var i="";return e.eatWhile((function(e){return">"!=e&&" "!=e&&(i+=e,!0)})),n.anchors.push(i),"variable-2"}if(">"==t)return d(n,">"),"variable";if("_"==t){d(n,t);var a="";return e.eatWhile((function(e){return" "!=e&&(a+=e,!0)})),n.bnodes.push(a),e.next(),d(n," "),"builtin"}if('"'==t)return d(n,t),e.eatWhile((function(e){return'"'!=e})),e.next(),"@"!=e.peek()&&"^"!=e.peek()&&d(n,'"'),"string";if("@"==t){d(n,"@");var o="";return e.eatWhile((function(e){return" "!=e&&(o+=e,!0)})),n.langs.push(o),e.next(),d(n," "),"string-2"}if("^"==t){e.next(),d(n,"^");var u="";return e.eatWhile((function(e){return">"!=e&&(u+=e,!0)})),n.types.push(u),e.next(),d(n,">"),"variable"}" "==t&&d(n,t),"."==t&&d(n,t)}}})),e.defineMIME("application/n-triples","ntriples"),e.defineMIME("application/n-quads","ntriples"),e.defineMIME("text/n-triples","ntriples")}));