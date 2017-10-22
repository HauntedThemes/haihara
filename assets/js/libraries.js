/*!
 * Share Selected Text
 * version: 1.1.1
 * license: MIT
 * url: https://github.com/VincentLoy/share-selected-text
 * author: Vincent Loy <vincent.loy1@gmail.com>
 * contributors:
 *  - Wendy Beth <wendybeth010@gmail.com>
 *  - Dmitry Motorin <dmitry.mot@gmail.com>
 *  - Dustin Armstrong
 */
"use strict";!function(t){var e=function(){return document.querySelector('meta[property="og:url"]')&&document.querySelector('meta[property="og:url"]').getAttribute("content")?document.querySelector('meta[property="og:url"]').getAttribute("content"):window.location.href},n=50,o=1.33,r=140,i=24,a=2,l=3,s=250,c={popup:"popup",page:"page"},u=r-i-a-l,d={twitter:"twitter",buffer:"buffer",digg:"digg",linkedin:"linkedin",stumbleupon:"stumbleupon",reddit:"reddit",tumblr:"tumblr",facebook:"facebook"},p=/[ .,!?\/\\\+\-=*£$€:~§%^µ)(|@"{}&#><_]/g,f=/[ ,\/\\\+\-=*£$€:~§%^µ)(|@"{}&#><_]/g,m=e(),h=void 0,b=void 0,g={},w=function(t){t=t||{};for(var e=1;e<arguments.length;e+=1)if(arguments[e])for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t},y=function(){h.classList.remove("active")},v=function(){h.classList.add("active")},x=function(t){for(;t.length&&t[0].match(p);)t=t.substring(1,t.length);for(;t.length&&t[t.length-1].match(f);)t=t.substring(0,t.length-1);return t},S=function(t){var e=arguments.length<=1||void 0===arguments[1]?"":arguments[1],n="",o=u;return t?(b.twitterUsername&&e===d.twitter&&(n=" via @"+b.twitterUsername,o=u-n.length),t.length>u?(t=t.substring(0,o),t=t.substring(0,t.lastIndexOf(" "))+"..."):t=t.substring(0,o+l),x(t)):""},k=function(t,e){e=b.sanitize?S(e,t):x(e);var n="https://twitter.com/intent/tweet?url="+m+'&text="'+e+'"';b.twitterUsername&&b.twitterUsername.length&&(n+="&via="+b.twitterUsername);var o="https://facebook.com/dialog/share?display="+b.facebookDisplayMode+"&href="+m;if(document.querySelector('meta[property="fb:app_id"]')&&document.querySelector('meta[property="fb:app_id"]').getAttribute("content")){var r=document.querySelector('meta[property="fb:app_id"]');o+="&app_id="+r}else if(b.facebookAppID&&b.facebookAppID.length)o+="&app_id="+b.facebookAppID;else{var i=b.buttons.indexOf("facebook");i>-1&&b.buttons.splice(i,1)}var a={twitter:n,buffer:'https://buffer.com/add?text="'+e+'"&url='+m,digg:"http://digg.com/submit?url="+m+"&title="+e,linkedin:"https://www.linkedin.com/shareArticle?url="+m+"&title="+e,stumbleupon:"http://www.stumbleupon.com/submit?url="+m+"&title="+e,reddit:"https://reddit.com/submit?url="+m+"&title="+e,tumblr:"https://www.tumblr.com/widgets/share/tool?canonicalUrl="+m+"&caption="+e,facebook:o};return a.hasOwnProperty(t)?a[t]:""},A=function(t){var e=document.documentElement.scrollTop||document.body.scrollTop,r=document.querySelector("body");h.style.top=e+t.top-n*o+"px",h.style.left=t.left+t.width/2-r.getBoundingClientRect().width/2+"px",Array.prototype.forEach.call(b.buttons,function(t){h.querySelector(".share-selected-text-btn-"+t).href=k(t,g.text)}),window.setTimeout(function(){v()},b.tooltipTimeout)},C=function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],n=document.createElement("A"),o=document.createElement("i");return b.anchorsClass?n.classList.add("share-selected-text-btn","share-selected-text-btn-"+t,""+b.anchorsClass):n.classList.add("share-selected-text-btn","share-selected-text-btn-"+t),e?o.classList.add(""+e):o.classList.add("icon-sst-"+t,"fa","fa-"+t),o.style.pointerEvents="none",n.addEventListener("click",function(t){t.preventDefault();var e="status=no,menubar=no,location=no,scrollbars=no,width=720,height=540",n=t.target.href;window.open(n,"Share this post",e)}),n.href=k(t,g.text?g.text:""),n.appendChild(o),n},E=function(){var t=document.querySelector("body"),e=document.createElement("DIV"),o=document.createElement("DIV");return e.classList.add("share-selected-text-main-container"),o.classList.add("share-selected-text-inner"),b.tooltipClass&&o.classList.add(b.tooltipClass),e.style.height=n+"px",e.style.top=0,e.style.left=0,Array.prototype.forEach.call(b.buttons,function(t){var e=C(t);o.appendChild(e)}),e.appendChild(o),t.appendChild(e),e},L=function(){var t="",e=void 0;return window.getSelection?(e=window.getSelection(),t=e.toString()):document.selection&&"Control"!==document.selection.type&&(e=document.selection.createRange(),t=e.text),{selection:e,text:t}},q=function(){if(g=L(),g.text.length){var t=g.selection.getRangeAt(0),e=t.getBoundingClientRect();A(e)}else y()};t.shareSelectedText=function(t,e){var n=document.querySelectorAll(t);b=w({tooltipClass:"",sanitize:!0,buttons:[d.twitter,d.buffer],anchorsClass:"",twitterUsername:"",facebookAppID:"",facebookDisplayMode:c.popup,tooltipTimeout:s},e),h=E(),Array.prototype.forEach.call(n,function(t){t.addEventListener("mouseup",function(){q()})})}}(window),window.jQuery&&!function(t,e){var n=function(t,n){e(t,n)};t.fn.shareSelectedText=function(t){return n(this.selector,t)}}(jQuery,shareSelectedText);

/**
* ghostHunter - 0.3.5
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
*/
!function(a){!function(){var a=function(b){var c=new a.Index;return c.pipeline.add(a.trimmer,/*a.stopWordFilter,*/a.stemmer),b&&b.call(c,c),c};a.version="0.7.0",a.utils={},a.utils.warn=function(a){return function(b){a.console&&console.warn&&console.warn(b)}}(this),a.utils.asString=function(a){return void 0===a||null===a?"":a.toString()},a.EventEmitter=function(){this.events={}},a.EventEmitter.prototype.addListener=function(){var a=Array.prototype.slice.call(arguments),b=a.pop(),c=a;if("function"!=typeof b)throw new TypeError("last argument must be a function");c.forEach(function(a){this.hasHandler(a)||(this.events[a]=[]),this.events[a].push(b)},this)},a.EventEmitter.prototype.removeListener=function(a,b){if(this.hasHandler(a)){var c=this.events[a].indexOf(b);this.events[a].splice(c,1),this.events[a].length||delete this.events[a]}},a.EventEmitter.prototype.emit=function(a){if(this.hasHandler(a)){var b=Array.prototype.slice.call(arguments,1);this.events[a].forEach(function(a){a.apply(void 0,b)})}},a.EventEmitter.prototype.hasHandler=function(a){return a in this.events},a.tokenizer=function(b){return arguments.length&&null!=b&&void 0!=b?Array.isArray(b)?b.map(function(b){return a.utils.asString(b).toLowerCase()}):b.toString().trim().toLowerCase().split(a.tokenizer.seperator):[]},a.tokenizer.seperator=/[\s\-]+/,a.tokenizer.load=function(a){var b=this.registeredFunctions[a];if(!b)throw new Error("Cannot load un-registered function: "+a);return b},a.tokenizer.label="default",a.tokenizer.registeredFunctions={default:a.tokenizer},a.tokenizer.registerFunction=function(b,c){c in this.registeredFunctions&&a.utils.warn("Overwriting existing tokenizer: "+c),b.label=c,this.registeredFunctions[c]=b},a.Pipeline=function(){this._stack=[]},a.Pipeline.registeredFunctions={},a.Pipeline.registerFunction=function(b,c){c in this.registeredFunctions&&a.utils.warn("Overwriting existing registered function: "+c),b.label=c,a.Pipeline.registeredFunctions[b.label]=b},a.Pipeline.warnIfFunctionNotRegistered=function(b){var c=b.label&&b.label in this.registeredFunctions;c||a.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",b)},a.Pipeline.load=function(b){var c=new a.Pipeline;return b.forEach(function(b){var d=a.Pipeline.registeredFunctions[b];if(!d)throw new Error("Cannot load un-registered function: "+b);c.add(d)}),c},a.Pipeline.prototype.add=function(){var b=Array.prototype.slice.call(arguments);b.forEach(function(b){a.Pipeline.warnIfFunctionNotRegistered(b),this._stack.push(b)},this)},a.Pipeline.prototype.after=function(b,c){a.Pipeline.warnIfFunctionNotRegistered(c);var d=this._stack.indexOf(b);if(-1==d)throw new Error("Cannot find existingFn");d+=1,this._stack.splice(d,0,c)},a.Pipeline.prototype.before=function(b,c){a.Pipeline.warnIfFunctionNotRegistered(c);var d=this._stack.indexOf(b);if(-1==d)throw new Error("Cannot find existingFn");this._stack.splice(d,0,c)},a.Pipeline.prototype.remove=function(a){var b=this._stack.indexOf(a);-1!=b&&this._stack.splice(b,1)},a.Pipeline.prototype.run=function(a){for(var b=[],c=a.length,d=this._stack.length,e=0;c>e;e++){for(var f=a[e],g=0;d>g&&(f=this._stack[g](f,e,a),void 0!==f&&""!==f);g++);void 0!==f&&""!==f&&b.push(f)}return b},a.Pipeline.prototype.reset=function(){this._stack=[]},a.Pipeline.prototype.toJSON=function(){return this._stack.map(function(b){return a.Pipeline.warnIfFunctionNotRegistered(b),b.label})},a.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},a.Vector.Node=function(a,b,c){this.idx=a,this.val=b,this.next=c},a.Vector.prototype.insert=function(b,c){this._magnitude=void 0;var d=this.list;if(!d)return this.list=new a.Vector.Node(b,c,d),this.length++;if(b<d.idx)return this.list=new a.Vector.Node(b,c,d),this.length++;for(var e=d,f=d.next;void 0!=f;){if(b<f.idx)return e.next=new a.Vector.Node(b,c,f),this.length++;e=f,f=f.next}return e.next=new a.Vector.Node(b,c,f),this.length++},a.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var a,b=this.list,c=0;b;)a=b.val,c+=a*a,b=b.next;return this._magnitude=Math.sqrt(c)},a.Vector.prototype.dot=function(a){for(var b=this.list,c=a.list,d=0;b&&c;)b.idx<c.idx?b=b.next:b.idx>c.idx?c=c.next:(d+=b.val*c.val,b=b.next,c=c.next);return d},a.Vector.prototype.similarity=function(a){return this.dot(a)/(this.magnitude()*a.magnitude())},a.SortedSet=function(){this.length=0,this.elements=[]},a.SortedSet.load=function(a){var b=new this;return b.elements=a,b.length=a.length,b},a.SortedSet.prototype.add=function(){var a,b;for(a=0;a<arguments.length;a++)b=arguments[a],~this.indexOf(b)||this.elements.splice(this.locationFor(b),0,b);this.length=this.elements.length},a.SortedSet.prototype.toArray=function(){return this.elements.slice()},a.SortedSet.prototype.map=function(a,b){return this.elements.map(a,b)},a.SortedSet.prototype.forEach=function(a,b){return this.elements.forEach(a,b)},a.SortedSet.prototype.indexOf=function(a){for(var b=0,c=this.elements.length,d=c-b,e=b+Math.floor(d/2),f=this.elements[e];d>1;){if(f===a)return e;a>f&&(b=e),f>a&&(c=e),d=c-b,e=b+Math.floor(d/2),f=this.elements[e]}return f===a?e:-1},a.SortedSet.prototype.locationFor=function(a){for(var b=0,c=this.elements.length,d=c-b,e=b+Math.floor(d/2),f=this.elements[e];d>1;)a>f&&(b=e),f>a&&(c=e),d=c-b,e=b+Math.floor(d/2),f=this.elements[e];return f>a?e:a>f?e+1:void 0},a.SortedSet.prototype.intersect=function(b){for(var c=new a.SortedSet,d=0,e=0,f=this.length,g=b.length,h=this.elements,i=b.elements;!(d>f-1||e>g-1);)h[d]!==i[e]?h[d]<i[e]?d++:h[d]>i[e]&&e++:(c.add(h[d]),d++,e++);return c},a.SortedSet.prototype.clone=function(){var b=new a.SortedSet;return b.elements=this.toArray(),b.length=b.elements.length,b},a.SortedSet.prototype.union=function(a){var b,c,d;this.length>=a.length?(b=this,c=a):(b=a,c=this),d=b.clone();for(var e=0,f=c.toArray();e<f.length;e++)d.add(f[e]);return d},a.SortedSet.prototype.toJSON=function(){return this.toArray()},a.Index=function(){this._fields=[],this._ref="id",this.pipeline=new a.Pipeline,this.documentStore=new a.Store,this.tokenStore=new a.TokenStore,this.corpusTokens=new a.SortedSet,this.eventEmitter=new a.EventEmitter,this.tokenizerFn=a.tokenizer,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},a.Index.prototype.on=function(){var a=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,a)},a.Index.prototype.off=function(a,b){return this.eventEmitter.removeListener(a,b)},a.Index.load=function(b){b.version!==a.version&&a.utils.warn("version mismatch: current "+a.version+" importing "+b.version);var c=new this;return c._fields=b.fields,c._ref=b.ref,c.tokenizer=a.tokenizer.load(b.tokenizer),c.documentStore=a.Store.load(b.documentStore),c.tokenStore=a.TokenStore.load(b.tokenStore),c.corpusTokens=a.SortedSet.load(b.corpusTokens),c.pipeline=a.Pipeline.load(b.pipeline),c},a.Index.prototype.field=function(a,b){var b=b||{},c={name:a,boost:b.boost||1};return this._fields.push(c),this},a.Index.prototype.ref=function(a){return this._ref=a,this},a.Index.prototype.tokenizer=function(b){var c=b.label&&b.label in a.tokenizer.registeredFunctions;return c||a.utils.warn("Function is not a registered tokenizer. This may cause problems when serialising the index"),this.tokenizerFn=b,this},a.Index.prototype.add=function(b,c){var d={},e=new a.SortedSet,f=b[this._ref],c=void 0===c||c;this._fields.forEach(function(a){var c=this.pipeline.run(this.tokenizerFn(b[a.name]));d[a.name]=c;for(var f=0;f<c.length;f++){var g=c[f];e.add(g),this.corpusTokens.add(g)}},this),this.documentStore.set(f,e);for(var g=0;g<e.length;g++){for(var h=e.elements[g],i=0,j=0;j<this._fields.length;j++){var k=this._fields[j],l=d[k.name],m=l.length;if(m){for(var n=0,o=0;m>o;o++)l[o]===h&&n++;i+=n/m*k.boost}}this.tokenStore.add(h,{ref:f,tf:i})}c&&this.eventEmitter.emit("add",b,this)},a.Index.prototype.remove=function(a,b){var c=a[this._ref],b=void 0===b||b;if(this.documentStore.has(c)){var d=this.documentStore.get(c);this.documentStore.remove(c),d.forEach(function(a){this.tokenStore.remove(a,c)},this),b&&this.eventEmitter.emit("remove",a,this)}},a.Index.prototype.update=function(a,b){var b=void 0===b||b;this.remove(a,!1),this.add(a,!1),b&&this.eventEmitter.emit("update",a,this)},a.Index.prototype.idf=function(a){var b="@"+a;if(Object.prototype.hasOwnProperty.call(this._idfCache,b))return this._idfCache[b];var c=this.tokenStore.count(a),d=1;return c>0&&(d=1+Math.log(this.documentStore.length/c)),this._idfCache[b]=d},a.Index.prototype.search=function(b){var c=this.pipeline.run(this.tokenizerFn(b)),d=new a.Vector,e=[],f=this._fields.reduce(function(a,b){return a+b.boost},0),g=c.some(function(a){return this.tokenStore.has(a)},this);if(!g)return[];c.forEach(function(b,c,g){var h=1/g.length*this._fields.length*f,i=this,j=this.tokenStore.expand(b).reduce(function(c,e){var f=i.corpusTokens.indexOf(e),g=i.idf(e),j=1,k=new a.SortedSet;if(e!==b){var l=Math.max(3,e.length-b.length);j=1/Math.log(l)}f>-1&&d.insert(f,h*g*j);for(var m=i.tokenStore.get(e),n=Object.keys(m),o=n.length,p=0;o>p;p++)k.add(m[n[p]].ref);return c.union(k)},new a.SortedSet);e.push(j)},this);var h=e.reduce(function(a,b){return a.intersect(b)});return h.map(function(a){return{ref:a,score:d.similarity(this.documentVector(a))}},this).sort(function(a,b){return b.score-a.score})},a.Index.prototype.documentVector=function(b){for(var c=this.documentStore.get(b),d=c.length,e=new a.Vector,f=0;d>f;f++){var g=c.elements[f],h=this.tokenStore.get(g)[b].tf,i=this.idf(g);e.insert(this.corpusTokens.indexOf(g),h*i)}return e},a.Index.prototype.toJSON=function(){return{version:a.version,fields:this._fields,ref:this._ref,tokenizer:this.tokenizerFn.label,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},a.Index.prototype.use=function(a){var b=Array.prototype.slice.call(arguments,1);b.unshift(this),a.apply(this,b)},a.Store=function(){this.store={},this.length=0},a.Store.load=function(b){var c=new this;return c.length=b.length,c.store=Object.keys(b.store).reduce(function(c,d){return c[d]=a.SortedSet.load(b.store[d]),c},{}),c},a.Store.prototype.set=function(a,b){this.has(a)||this.length++,this.store[a]=b},a.Store.prototype.get=function(a){return this.store[a]},a.Store.prototype.has=function(a){return a in this.store},a.Store.prototype.remove=function(a){this.has(a)&&(delete this.store[a],this.length--)},a.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},a.stemmer=function(){var a={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},b={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},c="[^aeiou]",d="[aeiouy]",e=c+"[^aeiouy]*",f=d+"[aeiou]*",g="^("+e+")?"+f+e,h="^("+e+")?"+f+e+"("+f+")?$",i="^("+e+")?"+f+e+f+e,j="^("+e+")?"+d,k=new RegExp(g),l=new RegExp(i),m=new RegExp(h),n=new RegExp(j),o=/^(.+?)(ss|i)es$/,p=/^(.+?)([^s])s$/,q=/^(.+?)eed$/,r=/^(.+?)(ed|ing)$/,s=/.$/,t=/(at|bl|iz)$/,u=new RegExp("([^aeiouylsz])\\1$"),v=new RegExp("^"+e+d+"[^aeiouwxy]$"),w=/^(.+?[^aeiou])y$/,x=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,y=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,z=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,A=/^(.+?)(s|t)(ion)$/,B=/^(.+?)e$/,C=/ll$/,D=new RegExp("^"+e+d+"[^aeiouwxy]$"),E=function(c){var d,e,f,g,h,i,j;if(c.length<3)return c;if(f=c.substr(0,1),"y"==f&&(c=f.toUpperCase()+c.substr(1)),g=o,h=p,g.test(c)?c=c.replace(g,"$1$2"):h.test(c)&&(c=c.replace(h,"$1$2")),g=q,h=r,g.test(c)){var E=g.exec(c);g=k,g.test(E[1])&&(g=s,c=c.replace(g,""))}else if(h.test(c)){var E=h.exec(c);d=E[1],h=n,h.test(d)&&(c=d,h=t,i=u,j=v,h.test(c)?c+="e":i.test(c)?(g=s,c=c.replace(g,"")):j.test(c)&&(c+="e"))}if(g=w,g.test(c)){var E=g.exec(c);d=E[1],c=d+"i"}if(g=x,g.test(c)){var E=g.exec(c);d=E[1],e=E[2],g=k,g.test(d)&&(c=d+a[e])}if(g=y,g.test(c)){var E=g.exec(c);d=E[1],e=E[2],g=k,g.test(d)&&(c=d+b[e])}if(g=z,h=A,g.test(c)){var E=g.exec(c);d=E[1],g=l,g.test(d)&&(c=d)}else if(h.test(c)){var E=h.exec(c);d=E[1]+E[2],h=l,h.test(d)&&(c=d)}if(g=B,g.test(c)){var E=g.exec(c);d=E[1],g=l,h=m,i=D,(g.test(d)||h.test(d)&&!i.test(d))&&(c=d)}return g=C,h=l,g.test(c)&&h.test(c)&&(g=s,c=c.replace(g,"")),"y"==f&&(c=f.toLowerCase()+c.substr(1)),c};return E}(),a.Pipeline.registerFunction(a.stemmer,"stemmer"),a.generateStopWordFilter=function(a){var b=a.reduce(function(a,b){return a[b]=b,a},{});return function(a){return a&&b[a]!==a?a:void 0}},a.stopWordFilter=a.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),a.Pipeline.registerFunction(a.stopWordFilter,"stopWordFilter"),a.trimmer=function(a){return a.replace(/^\W+/,"").replace(/\W+$/,"")},a.Pipeline.registerFunction(a.trimmer,"trimmer"),a.TokenStore=function(){this.root={docs:{}},this.length=0},a.TokenStore.load=function(a){var b=new this;return b.root=a.root,b.length=a.length,b},a.TokenStore.prototype.add=function(a,b,c){var c=c||this.root,d=a.charAt(0),e=a.slice(1);return d in c||(c[d]={docs:{}}),0===e.length?(c[d].docs[b.ref]=b,void(this.length+=1)):this.add(e,b,c[d])},a.TokenStore.prototype.has=function(a){if(!a)return!1;for(var b=this.root,c=0;c<a.length;c++){if(!b[a.charAt(c)])return!1;b=b[a.charAt(c)]}return!0},a.TokenStore.prototype.getNode=function(a){if(!a)return{};for(var b=this.root,c=0;c<a.length;c++){if(!b[a.charAt(c)])return{};b=b[a.charAt(c)]}return b},a.TokenStore.prototype.get=function(a,b){return this.getNode(a,b).docs||{}},a.TokenStore.prototype.count=function(a,b){return Object.keys(this.get(a,b)).length},a.TokenStore.prototype.remove=function(a,b){if(a){for(var c=this.root,d=0;d<a.length;d++){if(!(a.charAt(d)in c))return;c=c[a.charAt(d)]}delete c.docs[b]}},a.TokenStore.prototype.expand=function(a,b){var c=this.getNode(a),d=c.docs||{},b=b||[];return Object.keys(d).length&&b.push(a),Object.keys(c).forEach(function(c){"docs"!==c&&b.concat(this.expand(a+c,b))},this),b},a.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.lunr=b()}(this,function(){return a})}(),a.fn.ghostHunter=function(b){var d=a.extend({},a.fn.ghostHunter.defaults,b);if(d.results)return c.init(this,d),c},a.fn.ghostHunter.defaults={resultsData:!1,onPageLoad:!1,onKeyUp:!1,result_template:"<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",info_template:"<p>Number of posts found: {{amount}}</p>",displaySearchInfo:!0,zeroResultsInfo:!0,before:!1,onComplete:!1,includepages:!1,filterfields:!1};var b=function(a){var b=new Date(a),c=["January","February","March","April","May","June","July","August","September","October","November","December"];return b.getDate()+" "+c[b.getMonth()]+" "+b.getFullYear()},c={isInit:!1,init:function(a,b){var c=this;this.target=a,this.results=b.results,this.blogData={},this.result_template=b.result_template,this.info_template=b.info_template,this.zeroResultsInfo=b.zeroResultsInfo,this.displaySearchInfo=b.displaySearchInfo,this.before=b.before,this.onComplete=b.onComplete,this.includepages=b.includepages,this.filterfields=b.filterfields,this.index=lunr(function(){this.field("title",{boost:10}),this.field("description"),this.field("link"),this.field("markdown",{boost:5}),this.field("pubDate"),this.field("tag"),this.ref("id")}),b.onPageLoad?c.loadAPI():a.focus(function(){c.loadAPI()}),a.closest("form").submit(function(b){b.preventDefault(),c.find(a.val())}),b.onKeyUp&&a.keyup(function(){c.find(a.val())})},loadAPI:function(){if(this.isInit)return!1;var c=this.index,d=this.blogData;obj={limit:"all",include:"tags"},this.includepages&&(obj.filter="(page:true,page:false)"),a.get(ghost.url.api("posts",obj)).done(function(a){searchData=a.posts,searchData.forEach(function(a){var e=a.tags.map(function(a){return a.name});null==a.meta_description&&(a.meta_description="");var f=e.join(", ");f.length<1&&(f="undefined");var g={id:String(a.id),title:String(a.title),description:String(a.meta_description),markdown:String(a.markdown),pubDate:String(a.created_at),tag:f,link:String(a.url)};g.prettyPubDate=b(g.pubDate);var h=b(g.pubDate);c.add(g),d[a.id]={title:a.title,description:a.meta_description,pubDate:h,link:a.url}})}),this.isInit=!0},find:function(b){var c=this.index.search(b),d=a(this.results),e=[];d.empty(),this.before&&this.before(),(this.zeroResultsInfo||c.length>0)&&this.displaySearchInfo&&d.append(this.format(this.info_template,{amount:c.length}));for(var f=0;f<c.length;f++){var g=c[f].ref,h=this.blogData[g];d.append(this.format(this.result_template,h)),e.push(h)}this.onComplete&&this.onComplete(e)},clear:function(){a(this.results).empty(),this.target.val("")},format:function(a,b){return a.replace(/{{([^{}]*)}}/g,function(a,c){var d=b[c];return"string"==typeof d||"number"==typeof d?d:a})}}}(jQuery);

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript - 2.3.0
 * http://github.com/janl/mustache.js
 */
(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(global.Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.3.0";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});

/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var c,f;c=window.jQuery;f=c(window);c.fn.stick_in_parent=function(b){var A,w,J,n,B,K,p,q,L,k,E,t;null==b&&(b={});t=b.sticky_class;B=b.inner_scrolling;E=b.recalc_every;k=b.parent;q=b.offset_top;p=b.spacer;w=b.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=c(document);null==w&&(w=!0);L=function(a){var b;return window.getComputedStyle?(a=window.getComputedStyle(a[0]),b=parseFloat(a.getPropertyValue("width"))+parseFloat(a.getPropertyValue("margin-left"))+
parseFloat(a.getPropertyValue("margin-right")),"border-box"!==a.getPropertyValue("box-sizing")&&(b+=parseFloat(a.getPropertyValue("border-left-width"))+parseFloat(a.getPropertyValue("border-right-width"))+parseFloat(a.getPropertyValue("padding-left"))+parseFloat(a.getPropertyValue("padding-right"))),b):a.outerWidth(!0)};J=function(a,b,n,C,F,u,r,G){var v,H,m,D,I,d,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";
v=m=!1;(h=null!=p?p&&a.closest(p):c("<div />"))&&h.css("position",a.css("position"));x=function(){var d,f,e;if(!G&&(I=A.height(),d=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),b=parseInt(g.css("padding-bottom"),10),n=g.offset().top+d+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:L(a),
height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,d=q,z=E,l=function(){var c,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+d>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:d}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,d=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),c={position:"",width:"",top:""},a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
B&&(c=f.height(),u+q>c&&!v&&(d-=l,d=Math.max(c-u,d),d=Math.min(q,d),m&&a.css({top:d+"px"})))):e>F&&(m=!0,c={position:"fixed",top:d},c.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(c).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+d>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:b,top:"auto"}).trigger("sticky_kit:bottom")},
y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);c(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),c(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,
0)}};n=0;for(K=this.length;n<K;n++)b=this[n],J(c(b));return this}}).call(this);
