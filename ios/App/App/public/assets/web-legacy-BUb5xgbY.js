System.register(["./index-legacy-CrD9C-Gh.js"],(function(e,a){"use strict";var t;return{setters:[e=>{t=e.W}],execute:function(){e("ShareWeb",class extends t{async canShare(){return"undefined"!=typeof navigator&&navigator.share?{value:!0}:{value:!1}}async share(e){if("undefined"==typeof navigator||!navigator.share)throw this.unavailable("Share API not available in this browser");return await navigator.share({title:e.title,text:e.text,url:e.url}),{}}})}}}));
