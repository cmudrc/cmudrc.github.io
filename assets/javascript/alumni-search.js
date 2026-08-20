(function () {
  "use strict";

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function initializeAlumniSearch() {
    var input = document.getElementById("alumni-search");
    var entries = Array.prototype.slice.call(document.querySelectorAll("[data-alumni-entry]"));
    var status = document.getElementById("alumni-search-status");
    var noResults = document.getElementById("alumni-no-results");

    if (!input || !entries.length || !status || !noResults) {
      return;
    }

    input.addEventListener("input", function () {
      var query = normalize(input.value);
      var visibleCount = 0;

      entries.forEach(function (entry) {
        var matches = !query || normalize(entry.dataset.search || "").indexOf(query) !== -1;
        entry.hidden = !matches;
        if (matches) {
          visibleCount += 1;
        }
      });

      noResults.hidden = visibleCount !== 0;
      status.textContent = query
        ? "Showing " + visibleCount + " of " + entries.length + " alumni."
        : "Showing all " + entries.length + " alumni.";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAlumniSearch);
  } else {
    initializeAlumniSearch();
  }
})();
