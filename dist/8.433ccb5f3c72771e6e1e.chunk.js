webpackJsonp([8],{251:function(e,t,n){"use strict";var o=window.Event;if(window.Event=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{bubbles:!1,cancelable:!1},n=document.createEvent("Event");return n.initEvent(e,Boolean(t.bubbles),Boolean(t.cancelable)),n},o)for(var i in o)window.Event[i]=o[i];window.Event.prototype=o.prototype;var a=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(a.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))},window.CustomEvent=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{bubbles:!1,cancelable:!1,detail:null},n=document.createEvent("CustomEvent");return n.initCustomEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.detail),n},window.CustomEvent.prototype=window.Event.prototype;var l=window.MouseEvent;if(window.MouseEvent=function(e,t){t=t||{};var n=document.createEvent("MouseEvent");return n.initMouseEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.view||window,t.detail,t.screenX,t.screenY,t.clientX,t.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,t.button,t.relatedTarget),n},l)for(var r in l)window.MouseEvent[r]=l[r];window.MouseEvent.prototype=l.prototype}});