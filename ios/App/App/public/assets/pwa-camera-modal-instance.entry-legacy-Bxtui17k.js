System.register(["./index-legacy-BpnKgwgI.js"],(function(e,t){"use strict";var n,o,i,r;return{setters:[e=>{n=e.h,o=e.g,i=e.r,r=e.c}],execute:function(){var t=function(e,t,n,o){function i(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,r){function c(e){try{s(o.next(e))}catch(e){r(e)}}function a(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){e.done?n(e.value):i(e.value).then(c,a)}s((o=o.apply(e,t||[])).next())}))},c=function(e,t){var n,o,i,r,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(e){return function(t){return s([e,t])}}function s(a){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,a[0]&&(c=0)),c;)try{if(n=1,o&&(i=2&a[0]?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,o=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((i=(i=c.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){c.label=a[1];break}if(6===a[0]&&c.label<i[1]){c.label=i[1],i=a;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(a);break}i[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],o=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}};e("pwa_camera_modal_instance",function(){function e(e){var n=this;i(this,e),this.onPhoto=r(this,"onPhoto",7),this.noDeviceError=r(this,"noDeviceError",7),this.handlePhoto=function(e){return t(n,void 0,void 0,(function(){return c(this,(function(t){return this.onPhoto.emit(e),[2]}))}))},this.handleNoDeviceError=function(e){return t(n,void 0,void 0,(function(){return c(this,(function(t){return this.noDeviceError.emit(e),[2]}))}))},this.facingMode="user",this.hidePicker=!1,this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image"}return e.prototype.handleBackdropClick=function(e){e.target!==this.el&&this.onPhoto.emit(null)},e.prototype.handleComponentClick=function(e){e.stopPropagation()},e.prototype.handleBackdropKeyUp=function(e){"Escape"===e.key&&this.onPhoto.emit(null)},e.prototype.render=function(){var e=this;return n("div",{class:"wrapper",onClick:function(t){return e.handleBackdropClick(t)}},n("div",{class:"content"},n("pwa-camera",{onClick:function(t){return e.handleComponentClick(t)},facingMode:this.facingMode,hidePicker:this.hidePicker,handlePhoto:this.handlePhoto,handleNoDeviceError:this.handleNoDeviceError,noDevicesButtonText:this.noDevicesButtonText,noDevicesText:this.noDevicesText})))},Object.defineProperty(e.prototype,"el",{get:function(){return o(this)},enumerable:!1,configurable:!0}),e}()).style=":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:var(--inset-width);height:var(--inset-height);max-height:100%}@media only screen and (max-width: 600px){.content{width:100%;height:100%}}"}}}));
