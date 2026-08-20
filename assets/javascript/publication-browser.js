(function () {
  "use strict";

  const browser = document.querySelector("[data-publication-browser]");

  if (!browser) {
    return;
  }

  const list = browser.querySelector("[data-publication-list]");
  const queryInput = browser.querySelector("[data-publication-query]");
  const typeSelect = browser.querySelector("[data-publication-type]");
  const yearSelect = browser.querySelector("[data-publication-year]");
  const sortSelect = browser.querySelector("[data-publication-sort]");
  const resetButton = browser.querySelector("[data-publication-reset]");
  const status = browser.querySelector("[data-publication-status]");
  const empty = browser.querySelector("[data-publication-empty]");
  const collator = new Intl.Collator("en", { sensitivity: "base" });

  if (!list || !queryInput || !typeSelect || !yearSelect || !sortSelect || !resetButton || !status || !empty) {
    return;
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  const entries = Array.from(list.querySelectorAll("[data-publication-entry]")).map(function (element) {
    return {
      element: element,
      index: Number(element.dataset.publicationIndex),
      search: normalize(element.dataset.publicationSearch),
      title: normalize(element.dataset.publicationTitle),
      type: element.dataset.publicationType,
      year: Number(element.dataset.publicationYear)
    };
  });

  const years = Array.from(new Set(entries.map(function (entry) {
    return entry.year;
  }).filter(Number.isFinite))).sort(function (a, b) {
    return b - a;
  });

  years.forEach(function (year) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.append(option);
  });

  function compareEntries(a, b) {
    let result = 0;

    if (sortSelect.value === "oldest") {
      result = a.year - b.year;
    } else if (sortSelect.value === "title") {
      result = collator.compare(a.title, b.title);
      if (result === 0) {
        result = b.year - a.year;
      }
    } else {
      result = b.year - a.year;
    }

    if (result === 0) {
      result = collator.compare(a.title, b.title);
    }

    if (result === 0) {
      result = a.index - b.index;
    }

    return result;
  }

  function updatePublications() {
    const queryTerms = normalize(queryInput.value).split(/\s+/).filter(Boolean);
    const selectedType = typeSelect.value;
    const selectedYear = yearSelect.value;
    const sortedEntries = entries.slice().sort(compareEntries);
    const fragment = document.createDocumentFragment();
    let visibleCount = 0;

    sortedEntries.forEach(function (entry) {
      const matchesQuery = queryTerms.every(function (term) {
        return entry.search.includes(term);
      });
      const matchesType = selectedType === "all" || entry.type === selectedType;
      const matchesYear = selectedYear === "all" || entry.year === Number(selectedYear);
      const isVisible = matchesQuery && matchesType && matchesYear;

      entry.element.hidden = !isVisible;
      visibleCount += isVisible ? 1 : 0;
      fragment.append(entry.element);
    });

    list.append(fragment);
    list.hidden = visibleCount === 0;
    empty.hidden = visibleCount !== 0;
    status.textContent = "Showing " + visibleCount + " of " + entries.length + " publications.";
  }

  queryInput.addEventListener("input", updatePublications);
  typeSelect.addEventListener("change", updatePublications);
  yearSelect.addEventListener("change", updatePublications);
  sortSelect.addEventListener("change", updatePublications);
  resetButton.addEventListener("click", function () {
    queryInput.value = "";
    typeSelect.value = "all";
    yearSelect.value = "all";
    sortSelect.value = "newest";
    updatePublications();
    queryInput.focus();
  });

  updatePublications();
}());
