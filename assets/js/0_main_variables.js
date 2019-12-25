const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
const isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const page_content = $(window);
const mobile = device.mobile();
const tablet = device.tablet();
let headerSmall = false;
let header, scroll_top, aboutImg, scrollTopBtn;
const headerMaxScroll = 50;
const scrollBtnBorder = 500;
let showScrollBtn = false;
let bufer = 0;
let cursor;
let buferMax = isSafari ? 10 : isFirefox ? 30 : 200;
let window_width = $(window).innerWidth();
let window_height = $(window).innerHeight();
let menu_btn_access = true;
let fadeSiteDesk = false;
let fadeSiteMob = false;
let screenNow;
let changeScreenAccess = true;
const animationTime = 250;
const production = window.location.hostname !== 'localhost' ? true : false;
let mobMenuOpen = false;
let copyMailAccess = true;
let blockquoteBlock, aboutBlock;


const aosFadeArrDone = [
    // '.parallaxDotsItem:not(.custom)'
    '.firstScreen .content > *',
    '.gridInfo .text > *',
    '.advantages h2',
    '.advantagesList li .wrap',
    '.howWork .text > *',
    '.howWorkList li',
    '.aboutBlock .text > *',
    'blockquote',
    '.priceItem',
    '.faqBlock h2',
    '.accordion',
];

if (isMacLike) $("body, html").addClass("isMacLike");
if (isSafari) $("body, html").addClass("isSafari");
const mainBtnSvg = {
    left: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00006 0.998779V12.9988H13.0001" stroke="#00994E" stroke-width="2"/>
    </svg>`,
    right: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13.9987L12 1.99872L1.04907e-06 1.99872" stroke="#00994E" stroke-width="2"/>
    </svg>`
};
const advantagesSVG = `<svg width="10" height="25" viewBox="0 0 10 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="10" height="25" fill="#00994E" fill-opacity="0.2"/>
<rect x="2" y="2" width="6" height="21" fill="#00994E" fill-opacity="0.2"/>
<rect x="4" y="4" width="2" height="17" fill="#00994E"/>
</svg>`;
const howWorkListSVG = `<svg width="18" height="64" viewBox="0 0 18 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="64" fill="#007940" fill-opacity="0.1"/>
<rect x="4" y="4" width="10" height="56" fill="#007940" fill-opacity="0.1"/>
<rect x="8" y="8" width="2" height="48" fill="#007940"/>
</svg>`;
const bgLines = `<div class="bgLines">
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
</div>`
// const bgLines = `<div class="bgLines"></div>`