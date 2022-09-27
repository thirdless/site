var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(e){return e.raw=e};$jscomp.createTemplateTagFirstArgWithRaw=function(e,k){e.raw=k;return e};$jscomp.arrayIteratorImpl=function(e){var k=0;return function(){return k<e.length?{done:!1,value:e[k++]}:{done:!0}}};$jscomp.arrayIterator=function(e){return{next:$jscomp.arrayIteratorImpl(e)}};$jscomp.makeIterator=function(e){var k="undefined"!=typeof Symbol&&Symbol.iterator&&e[Symbol.iterator];return k?k.call(e):$jscomp.arrayIterator(e)};
$jscomp.arrayFromIterator=function(e){for(var k,p=[];!(k=e.next()).done;)p.push(k.value);return p};$jscomp.arrayFromIterable=function(e){return e instanceof Array?e:$jscomp.arrayFromIterator($jscomp.makeIterator(e))};
(function(){function e(b){return(b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b))?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:null}function k(b){var c=document.createElement("div"),a=document.createElement("div"),d=document.createElement("div"),f=document.createElement("div");c.className="project--parent";a.className="project--title";d.className="project--cell";f.className="project--image";c.appendChild(a);c.appendChild(d);d.appendChild(f);a.innerHTML=b.name.replace(" ","<br>");
a.classList.add("title--white");if(b.image){f.style.backgroundImage="url("+b.image+")";d.style.backgroundColor="rgb(0, 0, 0)";var m=new Image;m.addEventListener("load",function(g){g=document.createElement("canvas").getContext("2d");g.drawImage(m,0,0,1,1);g=g.getImageData(0,0,1,1).data.slice(0,3);d.style.backgroundColor="rgb("+g[0]+", "+g[1]+", "+g[2]+")";125<(299*g[0]+587*g[1]+114*g[2])/1E3&&a.classList.remove("title--white")});m.src=b.image}else{b=D[q];var l=e(b[0]);f.style.backgroundImage="linear-gradient(to right, "+
b[0]+", "+b[1]+")";d.style.backgroundColor="rgb("+l[0]+", "+l[1]+", "+l[2]+")";q=++q>=D.length?0:q}document.querySelector(".projects--wrapper").appendChild(c);E.push(c);-1<J.indexOf(++r)&&r++;c.style.gridRow=~~(r/3+1);c.style.gridColumn=~~(r%3+1)}function p(b,c,a){var d=document.createElement("div"),f=document.createElement("div"),m=document.createElement("div"),l=document.createElement("div"),g=document.createElement("div"),y=document.createElement("div"),z=document.createElement("div"),t=document.createElement("a");
d.className="project--details";f.className="details--content";m.className="details--close";l.className="details--count";g.className="details--title";y.className="details--dev";z.className="details--description";t.className="details--link";l.innerHTML=++a;10>a&&(l.innerHTML="0"+l.innerHTML);g.innerHTML=c.name.replace(" ","<br>");y.innerHTML='<svg><use href="/assets/icons.svg#icon-alert"></use></svg>In development';z.innerHTML=c.descriptions;t.href=c.url;t.innerHTML="View Project";m.innerHTML='<svg><use href="/assets/icons.svg#icon-back"></use></svg>Close';
m.addEventListener("click",A);f.appendChild(l);f.appendChild(g);c.development&&f.appendChild(y);c.descriptions&&f.appendChild(z);c.url&&f.appendChild(t);f.appendChild(m);d.appendChild(f);b.appendChild(d);return d}function K(b){if(!n&&u){u=!1;b=b.currentTarget;var c=b.parentNode,a=b.getBoundingClientRect(),d=50*window.innerWidth/100/a.width;d*a.height>.9*window.innerHeight&&(d=.9*window.innerHeight/a.height);var f=-(a.left+a.width/2-d*a.width/2)+.45*window.innerWidth,m=-(a.top+a.height/2-d*a.height/
2)+(window.innerHeight-a.height*d)/2+5;getComputedStyle(document.querySelector("html")).getPropertyValue("--mobile-version")&&(d=.8*window.innerWidth/a.width,f=-(a.left+a.width/2-d*a.width/2)+.1*window.innerWidth,m=-(a.top+a.height/2-d*a.height/2)+.05*window.innerHeight);a=E.indexOf(b);if(-1!=a){var l=p(c,F[a],a);c.classList.add("project--is--open");B||window.scroll(0,v);l.style.top=window.pageYOffset+"px";document.body.style.overflow="hidden";b.classList.add("project--open");b.style.zIndex=3;b.querySelector(".project--cell").style.transform=
"translate3d("+f+"px, "+m+"px, 0) scale3d("+d+", "+d+", 1)";setTimeout(function(g){l.classList.add("show")},50);n=b}}}function A(b){if(n&&!u){u=!0;b&&b.currentTarget&&b.currentTarget.removeEventListener("click",A);var c=n.parentNode,a=c.querySelector(".project--details");n.querySelector(".project--cell").style.transform="";c.classList.remove("project--is--open");a.classList.remove("show");setTimeout(function(d){document.body.style.overflow="";n.classList.remove("project--open");n.style.zIndex="";
c.removeChild(a);n=null},1E3)}}function C(){w&&(document.body.style.height=w.getBoundingClientRect().height+"px")}function G(){v+=Math.floor((window.pageYOffset-v)/10);w.style.transform="translate3d(0, -"+v+"px, 0)";B||requestAnimationFrame(G)}function L(){h&&h.classList.remove("show");setTimeout(function(){h&&(h.parentNode.removeChild(h),h=null)},300)}function H(){window.removeEventListener("touchstart",H);B=!0;document.body.classList.add("touch")}var F=[{name:"Sift",descriptions:"Online integrated development environment \u2015 create, store and edit files, collaborate with people simultaneously on projects, and also build and run projects in multiple languages from every device you want.",
image:"/assets/sift.jpg",url:"http://sift.ioan.cc"},{name:"Junior Tutorials",descriptions:"Blog and community platform with free access tutorials about general purpose programming languages or graphic APIs such as DirectX or Vulkan.",image:"/assets/tutorial.jpg",url:"https://juniortutorials.xyz"},{name:"Pina Image",descriptions:"Minimalist photographer portfolio and events website.",image:"/assets/photo.jpg",url:"https://pinaimage.ro"},{name:"Led Matrix",descriptions:"Display source code and reverse engineered schematic for OKY3525-1 16x16 led matrix and other similar variants.",
image:"/assets/matrix.jpg",url:"https://github.com/thirdless/LedMatrix"},{name:"Mazzard",descriptions:"Mini game made in Java as an university project, with 2 levels, in which a prince needs to regain his throne since the monsters have won the whole kingdom. (idk im not the best storywriter)",image:"/assets/mazzard.png",url:"https://github.com/thirdless/game"},{name:"Crottle",descriptions:"Mini programming e-learning platform, featuring lessons, forum posts and community profiles.",image:"/assets/crottle.jpg",
url:"https://github.com/thirdless/crottle"},{name:"Office Clock",descriptions:"Digital office clock, also displaying interior and exterior temperatures, made with RaspberryPi Zero W and a 16x16 Led Matrix Screen.",image:"/assets/clock.png",url:"https://www.hackster.io/macovei/office-clock-using-raspberrypi-b2e295"},{name:"Hoggins",descriptions:"Customizable first-page, where you can include widgets from reddit and google news posts, to weather widgets and daily themed wallpapers.",image:"/assets/hoggins.jpg",
url:"https://more.ioan.cc"},{name:"YouTube Music App",descriptions:"Youtube Music webwrapper with search through playlist functionality, discord integration and more. Since google doesn't want any native desktop app ever.",image:"/assets/youtube.jpg",url:"https://github.com/thirdless/YoutubeMusic"},{name:"Timify",descriptions:"Easy to use time management javascipt library. From countdowns, clocks and stopwatches, everything is one line away.",image:"/assets/time.jpg",url:"https://github.com/thirdless/timify",
development:!0},{name:"smuwnware",descriptions:"Small, fun OS, written in javascript for the browser.",development:!0}],D=[["#b92b27","#6a4771"],["#ED8F03","#FFB75E"],["#159957","#155799"]],J=[0,4,8,10,12],I="68 69 40 69 6F 61 6E 2E 63 63".split(" "),q=0,E=[],r=-1,n=null,u=!0,w,v=0,B=!1,h=null,x=null;(function(){h&&h.parentNode.removeChild(h);h=document.createElement("div");h.className="loading--cover show";document.body.appendChild(h);setTimeout(function(){if(h){var b=document.createElement("div");
h.appendChild(b);for(var c=0;4>c;c++)b.appendChild(document.createElement("div"));setTimeout(function(){b.classList.add("show")},50)}},1E3)})();document.addEventListener("DOMContentLoaded",function(){if(w=document.querySelector(".page--root")){F.forEach(function(d){return k(d)});[].concat($jscomp.arrayFromIterable(document.querySelectorAll(".project--parent"))).map(function(d){return d.addEventListener("click",K)});C();G();for(var b=document.querySelector(".to"),c="",a=0;a<I.length;a++)c+="&#x"+I[a]+
";";a=document.createElement("div");a.innerHTML="mailto:"+c;b.setAttribute("href",a.innerHTML);b.innerHTML=c}});window.addEventListener("load",function(){C();L()});window.addEventListener("resize",function(){"number"===typeof x&&clearTimeout(x);A();x=setTimeout(function(){C();x=null},500)});window.addEventListener("touchstart",H)})();
