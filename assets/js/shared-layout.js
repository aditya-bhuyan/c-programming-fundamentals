/* shared-layout.js — inject topbar, sidebar, and footer into every page */
(function () {
  var CHAPTERS = [
    { num: "00", title: "Getting Started",           href: "chapters/00-getting-started/index.html" },
    { num: "01", title: "Variables & Data Types",    href: "chapters/01-variables/index.html" },
    { num: "02", title: "Operators & Expressions",   href: "chapters/02-operators/index.html" },
    { num: "03", title: "Control Flow",              href: "chapters/03-control-flow/index.html" },
    { num: "04", title: "Functions",                 href: "chapters/04-functions/index.html" },
    { num: "05", title: "Arrays & Strings",          href: "chapters/05-arrays-strings/index.html" },
    { num: "06", title: "Pointers",                  href: "chapters/06-pointers/index.html" },
    { num: "07", title: "Structures & Unions",       href: "chapters/07-structs/index.html" },
    { num: "08", title: "File I/O",                  href: "chapters/08-file-io/index.html" },
    { num: "09", title: "Dynamic Memory",            href: "chapters/09-dynamic-memory/index.html" }
  ];

  /* resolve a relative href from the current page back to root */
  function rootRel(href) {
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var prefix = depth > 0 ? Array(depth).fill("..").join("/") + "/" : "";
    return prefix + href;
  }

  /* topbar */
  var topbarHtml =
    '<a class="site-title" href="' + rootRel("index.html") + '">C Programming<span> Fundamentals</span></a>' +
    '<nav>' +
    '<a href="' + rootRel("index.html") + '">Home</a>' +
    '<a href="' + rootRel("chapters/00-getting-started/index.html") + '">Chapters</a>' +
    '<a href="' + rootRel("intro.html") + '">Setup</a>' +
    '</nav>' +
    '<button class="menu-toggle" aria-label="Toggle sidebar">&#9776;</button>';

  /* sidebar chapters list */
  var chapLinks = CHAPTERS.map(function (c) {
    return '<li><a href="' + rootRel(c.href) + '"><span class="icon">&#128218;</span> ' + c.num + '. ' + c.title + '</a></li>';
  }).join("");

  var sidebarHtml =
    '<h3>Navigation</h3><ul>' +
    '<li><a href="' + rootRel("index.html") + '"><span class="icon">&#127968;</span> Home</a></li>' +
    '<li><a href="' + rootRel("intro.html") + '"><span class="icon">&#9881;</span> Setup &amp; Install</a></li>' +
    '</ul>' +
    '<div class="sidebar-divider"></div>' +
    '<h3>Chapters</h3><ul>' + chapLinks + '</ul>';

  /* footer */
  var footerHtml =
    'Licensed under <a href="' + rootRel("LICENSE") + '">GNU GPL v3</a> &bull; ' +
    'By <a href="https://linkedin.com/in/adityabhuyan" target="_blank" rel="noopener">Aditya Pratap Bhuyan</a> &bull; ' +
    '<a href="https://github.com/aditya-bhuyan/c-programming-fundamentals" target="_blank" rel="noopener">GitHub</a>';

  document.addEventListener("DOMContentLoaded", function () {
    var tb = document.querySelector(".topbar");
    if (tb) tb.innerHTML = topbarHtml;
    var sb = document.querySelector(".sidebar");
    if (sb) sb.innerHTML = sidebarHtml;
    var ft = document.querySelector("footer");
    if (ft) ft.innerHTML = footerHtml;
  });
})();
