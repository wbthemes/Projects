<script>
/*<![CDATA[*/
!function(r,i,t){var u,o=/^data-(.+)/,a='IntersectionObserver',c=/p/.test(i.readyState),s=[],f=s.slice,l='deferjs',n='load',e='pageshow',d='forEach',h='shift';function m(e){i.head.appendChild(e)}function v(e,n){f.call(e.attributes)[d](n)}function p(e,n,t,o){return o=(o=n?i.getElementById(n):o)||i.createElement(e),n&&(o.id=n),t&&(o.onload=t),o}function y(e,n){return f.call((n||i).querySelectorAll(e))}function b(t,e){y('source',t)[d](b),v(t,function(e,n){(n=o.exec(e.name))&&(t[n[1]]=e.value)}),e&&(t.className+=' '+e),n in t&&t[n]()}function I(e){u(function(o){o=y(e||'[type=deferjs]'),function e(n,t){(n=o[h]())&&(n.parentNode.removeChild(n),(t=p(n.nodeName)).text=n.text,v(n,function(e){'type'!=e.name&&t.setAttribute(e.name,e.value)}),t.src&&!t.hasAttribute('async')?(t.onload=t.onerror=e,m(t)):(m(t),e()))}()})}(u=function(e,n){c?t(e,n):s.push(e,n)}).all=I,u.js=function(n,t,e,o){u(function(e){(e=p('SCRIPT',t,o)).src=n,m(e)},e)},u.css=function(n,t,e,o){u(function(e){(e=p('LINK',t,o)).rel='stylesheet',e.href=n,m(e)},e)},u.dom=function(e,n,t,z,o,i){function c(e){o&&!1===o(e)||b(e,t)}u(function(t){t=a in r&&new r[a](function(e){e[d](function(e,n){e.isIntersecting&&(n=e.target)&&(z&&z(n),t.unobserve(n),c(n))})},i),y(e||'[data-src]')[d](function(e){l in e||(e[l]=1,t?t.observe(e):c(e))})},n)},u.reveal=b,r.Defer=u,r.addEventListener('on'+e in r?e:n,function(){for(I();s[0];t(s[h](),s[h]()))c=1})}(this,document,setTimeout);'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');function related_temp(t){return(t.title?"<div class='widget-title position-relative  mb-3 text-uppercase fw-light'><span>"+t.title+"</span></div>":"")+"<div class='row row-cols-sm-2'>"+t.posts.map(function(t,e){return"<article class='mb-4'><div class='h-100 overflow-hidden rounded position-relative border jt-border-light bg-archive shadow-sm'>"+(t.img?"<div class='item-thumbnail'><a class='jt-bg-light d-block ratio ratio-21x9' href='"+t.url+"'><img alt='"+t.title+"' class='object-cover lazy-"+t.grup_id+" lazyload' data-src='"+t.img+"' loading='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='/></a></div>":"")+"<div class='item-content p-4'><h2 class='item-title fs-6 mb-2' itemprop='headline'><a class='text-reset' href='"+t.url+"'>"+t.title+"</a></h2><div class='item-meta text-secondary d-flex flex-wrap fw-light'>"+("Unknown"!=t.author?"<small class='me-2'><svg aria-hidden='true' class='me-1 jt-icon'><use xlink:href='#i-user'/></svg>"+t.author+"</small>":"")+"<small class='me-2'><svg aria-hidden='true' class='me-1 jt-icon'><use xlink:href='#i-clock'/></svg>"+t.date+"</small></div></div></div></article>"}).join("")+"</div>"}function sitemap_temp(t){return"<div class='accordion'>"+t.categories.map(function(t,e){return"<div class='accordion-item'><input "+(0==e?"checked":"")+" id='sitemap-list-"+e+"' name='sitemap' type='radio' class='d-none'/><label for='sitemap-list-"+e+"' class='accordion-header accordion-button collapsed'>"+t.term+"</label><div class='accordion-collapse collapse border-top jt-border-light d-block-check'><div class='accordion-body'><div class='sitemap-list' data-label='"+t.term+"' data-func='sitemap_list_temp' data-items='9999'><div class='text-center'><div class='spinner-grow text-light' role='status'><span class='visually-hidden'>Loading...</span></div></div></div></div></div></div>"}).join("")+"</div>"}function sitemap_list_temp(t){return"<ul class='list-unstyled fs-7'>"+t.posts.map(function(t,e){return"<li class='mb-2'><a href='"+t.url+"'>"+t.title+"</a></li>"}).join("")+"</ul>"}function sitemap_cb(t){var e=".sitemap-list";null!==document.querySelector(e)&&Defer.dom(e,100,"loaded",jo.loadCustomPosts)}function related_inline_temp(t){return"<div class='px-3 py-2 mb-4 border border-3 jt-border-light rounded'>"+(t.title?"<div class='fw-light pb-3'><span>"+t.title+"</span></div>":"")+"<ul class='ps-3 fw-bold'>"+t.posts.map(function(t,e){return"<li class='mb-2'><a href='"+t.url+"'>"+t.title+"</a></li>"}).join("")+"</ul></div>"}function sidebar_temp(t){return(t.title?"<div class='widget-title position-relative fs-6 mb-3'><span>"+t.title+"</span></div>":"")+"<div class='mb-4'>"+t.posts.map(function(t,e){return"<div class='item-post d-flex mb-3'>"+(t.img?"<div class='item-thumbnail me-3' style='width:85px'><a class='rounded jt-bg-light overflow-hidden d-block ratio ratio-1x1' href='"+t.url+"'><img alt='"+t.title+"' class='object-cover lazy-"+t.grup_id+" lazyload' data-src='"+t.img+"' loading='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='/></a></div>":"")+"<div class='item-content col'><h3 class='item-title fs-7 mb-2' itemprop='headline'><a class='text-reset' href='"+t.url+"'>"+t.title+"</a></h3><div class='item-meta text-secondary d-flex flex-wrap fs-8'><small class='me-2'><svg aria-hidden='true' class='me-1 jt-icon'><use xlink:href='#i-clock'/></svg>"+t.date+"</small></div></div></div>"}).join("")+"</div>"}function toc_temp(o){var r=0,d=1;return"<div id='toc-post' class='d-inline-block px-3 py-2 mb-4 jt-bg-light rounded'><input id='toc-toggle' class='d-none' autocomplete='off' type='checkbox'/><label for='toc-toggle' class='toc-toggler d-flex align-items-center'><span class='fw-light pe-3'>Table of content</span><span class='dropdown-toggle ms-auto'></span></label>"+o.map(function(t,e){var i=t.level,l="";if(0==e)l+='<ul class="ps-3 pt-3 d-none d-block-check fs-7">';else if(r<i)l+='<ul class="ps-3 pt-2 fs-8"><li>',d++;else if(i<r&&1<d){for(var s=0;s<r-i;s++)l+="</li></ul>";d--}if(r=i,l+=0<e?"</li>":"",l+='<li class="mb-2">',l+='<a class="text-reset hover-text-primary" href="#'+t.id+'">'+t.title+"</a>",e==o.length-1)for(var a=1;a<r;a++)l+="</li></ul>";return l}).join("").replace(/<li>\s*<\/li>/gi,"")+"</div>"}

function jtCallback(){
/*Your Script is here to maintain performance.*/


// the example below if you use url.
// Defer.css('your_css_url','your-style-id',100);
// Defer.js('your_script_url','your-script-id',100);


}
/*]]>*/</script>
<!-- Your Style and Script before </body> is here -->
<script>
   // <![CDATA[
    function addAttributes() {
      var links = document.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        if (links[i].hostname !== window.location.hostname) {
          links[i].setAttribute('rel', 'nofollow noopener noreferrer');
        }
      }
    }
    window.onload = addAttributes;
    // ]]>
</script>
<script>
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos &gt; currentScrollPos) {
      document.getElementById(&quot;ATnav&quot;).style.bottom = &quot;10px&quot;;
    } else {
      document.getElementById(&quot;ATnav&quot;).style.bottom = &quot;-80px&quot;;
    }
    prevScrollpos = currentScrollPos;
  };
</script>
<script>
function share() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href,
    })
    .then(() =&gt; console.log(&#39;Successfully shared!&#39;))
    .catch((error) =&gt; console.log(&#39;Error sharing:&#39;, error));
  } else {
    alert(&#39;Share not supported on this browser. Please copy the URL manually.&#39;);
  }
}
</script>
  <script>/*<![CDATA[*/
const codeBox = {
      img: "https:www.dktechnozone.in/favicon.ico", /* Your favicon url */
      title: "by dk technozone" /* Your blog title */
};
/* Code_Box@main.js */ 0<document.querySelectorAll("div.pre.cdBox").length&&(()=>{let e=document.querySelectorAll("div.pre.cdBox");function t(e,t,a){if(a="string"==typeof a?a:"text/plain",t="string"==typeof t?t:"File_"+(new Date).getTime()+".txt",e){if(a=new Blob([e],{type:a}),navigator.msSaveBlob)return navigator.msSaveBlob(a,t);{let e=window.URL.createObjectURL(a),l=document.createElement("a");l.classList.add("hidden"),l.href=e,l.download=t,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(e)}}}for(let a=0;a<e.length;a++){let l=e[a];l.classList.add("adv");let n=l.dataset.text||"File_"+(new Date).getTime(),s=l.dataset.file||n,d=l.dataset.lang||".txt",i=void 0!==l.dataset.time?isNaN(Number(l.dataset.time))?"false"===l.dataset.time?0:10:Number(l.dataset.time):10,o=void 0===l.dataset.download||"true"==l.dataset.download,r=void 0===l.dataset.copy||"true"==l.dataset.copy,c=void 0===l.dataset.view||"true"==l.dataset.view,p=l.querySelector("pre"),m=p.innerText;l.insertAdjacentHTML("afterbegin","<div class='preM'><div class='preT'><span class='prTl'>"+(null==n?"&lt;/&gt;":n)+"</span><span class='prCd'></span></div><div class='preA'>"+(c?"\x3c!--[ Preview ]--\x3e<button class='prVw' aria-label='blob Button'><svg viewBox='0 0 24 24'><path d='M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z'/></svg></button>":"")+(o?"\x3c!--[ Download ]--\x3e<button class='prDl' aria-label='Download Button'><svg viewBox='0 0 24 24'><path class='a' d='M8 17V15H16V17H8M16 10L12 14L8 10H10.5V6H13.5V10H16M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z'/><path class='b' d='M13,2.03C17.73,2.5 21.5,6.25 21.95,11C22.5,16.5 18.5,21.38 13,21.93V19.93C16.64,19.5 19.5,16.61 19.96,12.97C20.5,8.58 17.39,4.59 13,4.05V2.05L13,2.03M11,2.06V4.06C9.57,4.26 8.22,4.84 7.1,5.74L5.67,4.26C7.19,3 9.05,2.25 11,2.06M4.26,5.67L5.69,7.1C4.8,8.23 4.24,9.58 4.05,11H2.05C2.25,9.04 3,7.19 4.26,5.67M2.06,13H4.06C4.24,14.42 4.81,15.77 5.69,16.9L4.27,18.33C3.03,16.81 2.26,14.96 2.06,13M7.1,18.37C8.23,19.25 9.58,19.82 11,20V22C9.04,21.79 7.18,21 5.67,19.74L7.1,18.37M12,16.5L7.5,12H11V8H13V12H16.5L12,16.5Z'/><path class='c' d='M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M7,15H17V17H7V15M10.3,11.2L8.4,9.3L7,10.7L10.3,14L17,7.3L15.6,5.9L10.3,11.2Z'/></svg></button>":"")+(r?"\x3c!--[ Copy ]--\x3e<button class='prCp' aria-label='copy Button'><svg viewBox='0 0 24 24'><path class='a' d='M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z'/><path class='b' d='M20,16V10H22V16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H16V4H8V16H20M10.91,7.08L14,10.17L20.59,3.58L22,5L14,13L9.5,8.5L10.91,7.08M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z'/></svg></button>":"")+"</div></div>");let v=l.querySelector(".prVw"),L=l.querySelector(".prDl"),w=l.querySelector(".prCp"),u=l.querySelector(".prCd");null!==v&&v.addEventListener("click",(()=>{var e="#252526",t=codeBox.img;e="<!DOCTYPE html><html><head><title>"+s.replace(/\./g,"").replace(/ /g,"_")+d+"</title><meta content='width=device-width,initial-scale=1,user-scalable=1,minimum-scale=1,maximum-scale=5' name='viewport'/><meta content='"+e+"' name='theme-color'/><meta content='"+e+"' name='msapplication-navbutton-color'/><meta content='"+e+"' name='apple-mobile-web-app-status-bar-style'/><link rel='shortcut icon' type='image/png' href='"+t+"'><style>body{min-height:100vh;background:#fff;color:#000}*{margin:0;padding:0}html{line-height:1em;background:#1d1f21;color:#c5c8c6}pre{white-space:pre-wrap;word-wrap:break-word;word-break:break-all;padding:12px}pre i{font-style:normal}</style></head><body><div class='pre'>"+p.outerHTML+"</div></body></html>",e=new Blob([e],{type:"text/html"}),window.navigator.msSaveOrOpenBlob?window.navigator.msSaveOrOpenBlob(blobObject,fileName):(e=window.URL.createObjectURL(e),window.open(e,"_blank"),window.URL.revokeObjectURL(e))})),null!==L&&L.addEventListener("click",(()=>{L.disabled=!0;let e=i;l.classList.add("pnd","str"),u.innerHTML=0!==i?"Please wait "+e+"s...":"Please wait...";let a=setInterval((()=>{0!==i&&--e,0!==i&&(u.innerHTML="Please wait "+e+"s..."),e<=0&&(clearInterval(a),setTimeout((()=>{u.innerHTML="Downloading...",setTimeout((()=>{l.classList.remove("pnd"),l.classList.add("dwn"),t(m,s.replace(/\./g,"").replace(/ /g,"_")+codeBox.title+d,"text/plain"),u.innerHTML="Download started...",setTimeout((()=>{l.classList.remove("dwn","str"),L.disabled=!1}),3e3)}),2e3)}),1e3))}),1e3)})),null!==w&&w.addEventListener("click",(()=>{var e=getSelection(),t=document.createRange();t.selectNodeContents(p),e.removeAllRanges(),e.addRange(t),document.execCommand("copy"),e.removeAllRanges(),w.disabled=!0,l.classList.add("cpd"),setTimeout((function(){l.classList.remove("cpd"),w.disabled=!1}),3e3)}))}})();
/*]]>*/</script>
                 
  <style>
        .bottom-alert {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: gray;
            color: #fff;
            padding: 6px 10px;
            text-align: center;
            display: none;
            
            border-radius: 9px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
           z-index: 999999999999;
        }
    </style>
<div class='bottom-alert' id='bottomAlert'>Code Copied!</div>

<script>
    var codeElements = document.querySelectorAll(&quot;pre&quot;);
    codeElements.forEach(function(element) {
        element.addEventListener(&quot;dblclick&quot;, function() {
            copyToClipboard(element);
        });
    });
    function copyToClipboard(element) {
        var tempTextArea = document.createElement(&quot;textarea&quot;);
        tempTextArea.value = element.textContent;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); 
        document.execCommand(&quot;copy&quot;);
        document.body.removeChild(tempTextArea);
        
        showBottomAlert();
    }
    function showBottomAlert() {
        var bottomAlert = document.getElementById(&quot;bottomAlert&quot;);
        bottomAlert.style.display = &quot;block&quot;;
        setTimeout(function() {
            bottomAlert.style.display = &quot;none&quot;;
        }, 3000);
    }
</script>
