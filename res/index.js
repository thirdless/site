const projects = [{
    name: "Junior Tutorials",
    descriptions: "Blog and community platform with free access tutorials about general purpose programming languages or graphic APIs such as DirectX or Vulkan.",
    image: "/assets/tutorial.jpg",
    url: "https://juniortutorials.xyz"
},
{
    name: "Pina Image",
    descriptions: "Minimalist photographer portfolio and events website.",
    image: "/assets/photo.jpg",
    url: "https://pina.ioan.cc"
},
{
    name: "Led Matrix",
    descriptions: "Display source code and reverse engineered schematic for OKY3525-1 16x16 led matrix and other similar variants.",
    image: "/assets/matrix.jpg",
    url: "https://github.com/thirdless/LedMatrix"
},
{
    name: "Mazzard",
    descriptions: "Mini game made in Java as an university project, with 2 levels, in which a prince needs to regain his throne since the monsters have won the whole kingdom. (idk im not the best storywriter)",
    image: "/assets/mazzard.png",
    url: "https://github.com/thirdless/game"
},
{
    name: "Sift",
    descriptions: "Mini programming e-learning platform, featuring lessons, forum posts and community profiles.",
    image: "/assets/sift.jpg",
    url: "https://github.com/thirdless/sift"
},
{
    name: "Office Clock",
    descriptions: "Digital office clock, also displaying interior and exterior temperatures, made with RaspberryPi Zero W and a 16x16 Led Matrix Screen.",
    image: "/assets/clock.png",
    url: "https://www.hackster.io/macovei/office-clock-using-raspberrypi-b2e295"
},
{
    name: "Hoggins",
    descriptions: "Customizable first-page, where you can include widgets from reddit and google news posts, to weather widgets and daily themed wallpapers.",
    image: "/assets/hoggins.jpg",
    url: "https://more.ioan.cc"
},
{
    name: "YouTube Music App",
    descriptions: "Youtube Music webwrapper with search through playlist functionality, discord integration and more. Since google doesn't want any native desktop app ever.",
    image: "/assets/youtube.jpg",
    url: "https://github.com/thirdless/YoutubeMusic"
},
{
    name: "Timify",
    descriptions: "Easy to use time management javascipt library. From countdowns, clocks and stopwatches, everything is one line away.",
    image: "/assets/time.jpg",
    url: "https://github.com/thirdless/timify",
    development: true
},
{
    name: "smuwnware",
    descriptions: "Small, fun OS, written in javascript for the browser.",
    development: true
}];

const gradients = [["#b92b27", "#6a4771"], ["#ED8F03", "#FFB75E"], ["#159957", "#155799"]];
const GRID_WIDTH = 3;
const spaces = [0, 4, 8, 10];
const con_values = ["68", "69", "40", "69", "6F", "61", "6E", "2E", "63", "63"];

function averageRgb(img){
    var context = document.createElement("canvas").getContext("2d");
    context.drawImage(img, 0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data.slice(0,3);
}

function contrastWhite(rgb){
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 125 ? false : true;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

let currentGradient = 0;
let projectList = [];
let currentGridPosition = -1;

function generateProject(e){
    let parent = document.createElement("div"),
        title = document.createElement("div"),
        cell = document.createElement("div"),
        image = document.createElement("div");
    
    parent.className = "project--parent";
    title.className = "project--title";
    cell.className = "project--cell";
    image.className = "project--image";

    parent.appendChild(title);
    parent.appendChild(cell);
    cell.appendChild(image);

    title.innerHTML = e.name.replace(" ", "<br>");

    title.classList.add("title--white");

    if(e.image){
        image.style.backgroundImage = "url(" + e.image + ")";
        cell.style.backgroundColor = "rgb(0, 0, 0)";

        let img = new Image();
        img.addEventListener("load", e => {
            let avg = averageRgb(img);

            cell.style.backgroundColor = "rgb(" + avg[0] + ", " + avg[1] + ", " + avg[2] + ")";

            if(!contrastWhite(avg))
                title.classList.remove("title--white");
        });
        img.src = e.image;
    }
    else{
        let gradient = gradients[currentGradient],
            first = hexToRgb(gradient[0]);
        image.style.backgroundImage = "linear-gradient(to right, " + gradient[0] + ", " + gradient[1] + ")";
        cell.style.backgroundColor = "rgb(" + first[0] + ", " + first[1] + ", " + first[2] + ")";
        currentGradient = ++currentGradient >= gradients.length ? 0 : currentGradient;
    }

    document.querySelector(".projects--wrapper").appendChild(parent);
    projectList.push(parent);

    if(spaces.indexOf(++currentGridPosition) > -1)  
        currentGridPosition++;
        
    parent.style.gridRow = ~~(currentGridPosition / GRID_WIDTH + 1);
    parent.style.gridColumn = ~~(currentGridPosition % GRID_WIDTH + 1);
}

function createProjectDetails(parent, data, index){
    let details = document.createElement("div"),
        content = document.createElement("div"),
        close = document.createElement("div"),
        count = document.createElement("div"),
        title = document.createElement("div"),
        dev = document.createElement("div"),
        desc = document.createElement("div"),
        link = document.createElement("a");

    details.className = "project--details";
    content.className = "details--content";
    close.className = "details--close";
    count.className = "details--count";
    title.className = "details--title";
    dev.className = "details--dev";
    desc.className = "details--description";
    link.className = "details--link";

    count.innerHTML = ++index;

    if(index < 10)
        count.innerHTML = "0" + count.innerHTML;

    title.innerHTML = data.name.replace(" ", "<br>");
    dev.innerHTML = `<svg><use href="/assets/icons.svg#icon-alert"></use></svg>In development`;
    desc.innerHTML = data.descriptions;
    link.href = data.url;
    link.innerHTML = "View Project";
    close.innerHTML = `<svg><use href="/assets/icons.svg#icon-back"></use></svg>Close`;

    close.addEventListener("click", closeProject);

    content.appendChild(count);
    content.appendChild(title);

    if(data.development)
        content.appendChild(dev);

    if(data.descriptions)
        content.appendChild(desc);

    if(data.url)
        content.appendChild(link);

    content.appendChild(close);

    details.appendChild(content);
    parent.appendChild(details);
    return details;
}

let currentProject = null,
    projectClosed = true;

function zoomProject(e){
    if(currentProject || !projectClosed)
        return;

    projectClosed = false;

    const IMG_WIDTH = 50,
          PADDING = 5;

    let target = e.currentTarget,
        parent = target.parentNode,
        dimensions = target.getBoundingClientRect(),
        scale = window.innerWidth * IMG_WIDTH / 100 / dimensions.width;
    
    if(scale * dimensions.height > window.innerHeight * ((100 - 2 * PADDING) / 100))
        scale = window.innerHeight * ((100 - 2 * PADDING) / 100) / dimensions.height;

    let transformX = -(dimensions.left + (dimensions.width / 2) - (scale * dimensions.width) / 2) + (window.innerWidth * ((100 - IMG_WIDTH - PADDING) / 100)),
        transformY = -(dimensions.top + (dimensions.height / 2) - (scale * dimensions.height) / 2) + (window.innerHeight - (dimensions.height * scale)) / 2 + PADDING;

    let small = getComputedStyle(document.querySelector("html")).getPropertyValue("--mobile-version");

    if(small){
        scale = window.innerWidth * 0.8 / dimensions.width;
        transformX = -(dimensions.left + (dimensions.width / 2) - (scale * dimensions.width) / 2) + (window.innerWidth * 0.1);
        transformY = -(dimensions.top + (dimensions.height / 2) - (scale * dimensions.height) / 2) + (window.innerHeight * 0.1);
    }

    let index = projectList.indexOf(target);

    if(index == -1)
        return;

    let details = createProjectDetails(parent, projects[index], index);
    parent.classList.add("project--is--open");

    //stop scrolling
    if(!mobile){
        window.scroll(0, scrollOffset);
    }
    details.style.top = window.pageYOffset + "px";
    document.body.style.overflow = "hidden";

    target.classList.add("project--open");
    target.style.zIndex = 3;
    target.querySelector(".project--cell").style.transform = "translate3d(" + transformX + "px, " + transformY + "px, 0) scale3d(" + scale + ", " + scale + ", 1)";

    setTimeout(e => {
        details.classList.add("show");
    }, 50);

    currentProject = target;
}

function closeProject(e){
    if(!currentProject || projectClosed)
        return;

    projectClosed = true;

    if(e && e.currentTarget)
        e.currentTarget.removeEventListener("click", closeProject);

    let parent = currentProject.parentNode,
        details = parent.querySelector(".project--details");

    currentProject.querySelector(".project--cell").style.transform = "";
    parent.classList.remove("project--is--open");
    details.classList.remove("show");

    setTimeout(e => {
        document.body.style.overflow = "";
        currentProject.classList.remove("project--open");
        currentProject.style.zIndex = "";
        parent.removeChild(details);
        currentProject = null;
    }, 1000);
}

let root;

function setBodyHeight(){
    if(root)
        document.body.style.height = root.getBoundingClientRect().height + "px";
}

const SCROLL_FACTOR = 10;
let scrollOffset = 0;
let mobile = false;

function pageScroll(){
    scrollOffset += Math.floor((window.pageYOffset - scrollOffset) / SCROLL_FACTOR);
    root.style.transform = "translate3d(0, -" + scrollOffset + "px, 0)";

    if(!mobile)
        requestAnimationFrame(pageScroll);
}

let loadingElement = null;

function loadingCreate(){
    if(loadingElement)
        loadingElement.parentNode.removeChild(loadingElement);
    
    loadingElement = document.createElement("div");
    loadingElement.className = "loading--cover show";
    document.body.appendChild(loadingElement);

    setTimeout(() => {
        if(loadingElement){
            let effect = document.createElement("div");
            loadingElement.appendChild(effect);

            for(let i = 0; i < 4; i++)
                effect.appendChild(document.createElement("div"));

            setTimeout(() => {
                effect.classList.add("show");
            }, 50);
        }
    }, 1000);
}

function loadingRemove(){
    if(loadingElement)
        loadingElement.classList.remove("show");

    setTimeout(() => {
        if(loadingElement){
            loadingElement.parentNode.removeChild(loadingElement);
            loadingElement = null;
        }
    }, 300);
}

function createSvg(){

}

function dom(){
    root = document.querySelector(".page--root");

    createSvg();

    if(root){
        projects.forEach(e => generateProject(e));
        [...document.querySelectorAll(".project--parent")].map(e => e.addEventListener("click", zoomProject));
    
        setBodyHeight();
        pageScroll();
    
        let link = document.querySelector(".to"),
            to_str = "";
    
        for(let i = 0; i < con_values.length; i++)
            to_str += "&#x" + con_values[i] + ";";
    
        // link.href = 
        let parse = document.createElement("div");
        parse.innerHTML = "mailto:" + to_str;
        link.setAttribute("href", parse.innerHTML);
        link.innerHTML = to_str;
    }
}

function load(){
    setBodyHeight();
    loadingRemove();
}

let resizeTimeout = null;

function resize(){
    if(typeof resizeTimeout === "number")
        clearTimeout(resizeTimeout);

    closeProject();

    resizeTimeout = setTimeout(() => {
        setBodyHeight();
        resizeTimeout = null;
    }, 500);
}

function touch(){
    window.removeEventListener("touchstart", touch);
    mobile = true;
    document.body.classList.add("touch");
}

loadingCreate();
document.addEventListener("DOMContentLoaded", dom);
window.addEventListener("load", load);
window.addEventListener("resize", resize);
window.addEventListener("touchstart", touch);