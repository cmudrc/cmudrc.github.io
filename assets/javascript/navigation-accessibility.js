(function () {
  "use strict";

  function normalizePath(path) {
    var normalized = path.replace(/index\.html$/, "").replace(/\/+$/, "");
    return normalized || "/";
  }

  function initializeNavigationAccessibility() {
    var toggle = document.querySelector(".greedy-nav__toggle");
    var overflowMenu = document.querySelector(".greedy-nav .hidden-links");

    if (toggle && overflowMenu) {
      if (!overflowMenu.id) {
        overflowMenu.id = "site-nav-overflow";
      }

      toggle.setAttribute("aria-controls", overflowMenu.id);

      var updateExpandedState = function () {
        toggle.setAttribute("aria-expanded", toggle.classList.contains("close") ? "true" : "false");
      };

      updateExpandedState();
      new MutationObserver(updateExpandedState).observe(toggle, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    var currentPath = normalizePath(window.location.pathname);
    document.querySelectorAll(".greedy-nav a[href]").forEach(function (link) {
      var linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
      if (linkPath === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavigationAccessibility);
  } else {
    initializeNavigationAccessibility();
  }
})();
