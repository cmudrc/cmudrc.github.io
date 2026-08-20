(function () {
  "use strict";

  const section = document.querySelector("[data-live-tool-catalog]");

  if (!section) {
    return;
  }

  const catalog = section.querySelector("#tool-catalog");
  const queryInput = section.querySelector("#tool-catalog-search");
  const sourceSelect = section.querySelector("#tool-catalog-source");
  const typeSelect = section.querySelector("#tool-catalog-type");
  const sortSelect = section.querySelector("#tool-catalog-sort");
  const status = section.querySelector("#tool-catalog-status");
  const showAllButton = section.querySelector("#tool-catalog-show-all");
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const collator = new Intl.Collator("en", { sensitivity: "base" });
  const sourceListFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction"
  });
  const initialLimit = 18;
  const administrativeRepositories = new Set([
    "branding",
    "cmudrc.github.io",
    "prepare-asme-submission-package"
  ]);
  const manuscriptOnlyPattern = /(paper|supplement|submission)/i;
  const curatedItems = [{
    name: "Community survey data on permafrost thaw, coastal erosion, and civil infrastructure damage in Arctic Alaska",
    source: "arctic-data-center",
    category: "dataset",
    sourceLabel: "Arctic Data Center",
    kind: "Dataset",
    description: "Survey responses from Point Lay, Wainwright, Utqiaġvik, and Kaktovik collected from October 29, 2021, through February 1, 2022.",
    metadata: "Liew, Xiao, Farquharson, Nicolsky, Jensen, Romanovsky, Peirce, Alessa, McComb, Zhang, and Jones (2023)",
    url: "https://arcticdata.io/catalog/view/doi:10.18739/A24746S9G",
    updated: null,
    featured: true,
    search: normalize([
      "Community survey data on permafrost thaw, coastal erosion, and civil infrastructure damage in Arctic Alaska",
      "Survey responses from Point Lay, Wainwright, Utqiaġvik, and Kaktovik",
      "Liew Xiao Farquharson Nicolsky Jensen Romanovsky Peirce Alessa McComb Zhang Jones",
      "Arctic Data Center dataset"
    ].join(" "))
  }];
  let items = curatedItems.slice();
  const loadedSources = new Set(["Arctic Data Center"]);
  let showAll = false;

  if (!catalog || !queryInput || !sourceSelect || !typeSelect || !sortSelect || !status || !showAllButton) {
    return;
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function cleanDescription(value) {
    return String(value || "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]*>/g, " ")
      .replace(/[#*_`>|]+/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function summarize(value, fallback) {
    const description = cleanDescription(value) || fallback;

    if (description.length <= 220) {
      return description;
    }

    const shortened = description.slice(0, 217);
    const lastSpace = shortened.lastIndexOf(" ");
    return shortened.slice(0, lastSpace > 150 ? lastSpace : 217).trimEnd() + "…";
  }

  function sentenceCase(value) {
    const label = String(value || "").replace(/[-_]+/g, " ").trim();
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
  }

  function sourceListLabel() {
    return loadedSources.size > 0
      ? sourceListFormatter.format(Array.from(loadedSources))
      : "the public source APIs";
  }

  function formatDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      iso: date.toISOString(),
      label: dateFormatter.format(date),
      timestamp: date.getTime()
    };
  }

  async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The source returned an unexpected response.");
    }

    return data;
  }

  function githubItems(repositories) {
    return repositories.filter(function (repository) {
      return repository &&
        !repository.archived &&
        !repository.disabled &&
        !repository.fork &&
        !repository.is_template &&
        !administrativeRepositories.has(repository.name) &&
        !manuscriptOnlyPattern.test(repository.name);
    }).map(function (repository) {
      const date = formatDate(repository.pushed_at || repository.updated_at);
      const language = repository.language || "Software";
      const topics = Array.isArray(repository.topics) ? repository.topics : [];

      return {
        name: repository.name,
        source: "github",
        category: "software",
        sourceLabel: "GitHub",
        kind: language + " repository",
        description: summarize(
          repository.description,
          "Public research software from the Design Research Collective."
        ),
        url: repository.html_url,
        updated: date,
        search: normalize([
          repository.name,
          repository.description,
          language,
          topics.join(" "),
          "GitHub repository software code"
        ].join(" "))
      };
    });
  }

  function huggingFaceItems(datasets) {
    return datasets.filter(function (dataset) {
      return dataset &&
        typeof dataset.id === "string" &&
        dataset.id.startsWith("cmudrc/") &&
        !dataset.private &&
        !dataset.disabled &&
        !dataset.gated;
    }).map(function (dataset) {
      const name = dataset.id.split("/").slice(1).join("/");
      const tags = Array.isArray(dataset.tags) ? dataset.tags : [];

      return {
        name: name,
        source: "hugging-face",
        category: "dataset",
        sourceLabel: "Hugging Face",
        kind: "Dataset",
        description: summarize(
          dataset.description,
          "Public research dataset from the Design Research Collective."
        ),
        url: "https://huggingface.co/datasets/" + dataset.id,
        updated: formatDate(dataset.lastModified),
        search: normalize([
          name,
          dataset.description,
          tags.join(" "),
          "Hugging Face dataset data"
        ].join(" "))
      };
    });
  }

  function huggingFaceModelItems(models) {
    return models.filter(function (model) {
      return model &&
        typeof model.id === "string" &&
        model.id.startsWith("cmudrc/") &&
        !model.private &&
        !model.disabled &&
        (model.gated === false || model.gated == null);
    }).map(function (model) {
      const name = model.id.split("/").slice(1).join("/");
      const tags = Array.isArray(model.tags) ? model.tags : [];
      const task = String(model.pipeline_tag || "research").replace(/[-_]+/g, " ");

      return {
        name: name,
        source: "hugging-face",
        category: "model",
        sourceLabel: "Hugging Face",
        kind: sentenceCase(task) + " model",
        description: summarize(
          model.description,
          "Public " + task + " model from the Design Research Collective."
        ),
        url: "https://huggingface.co/" + model.id,
        updated: formatDate(model.lastModified),
        search: normalize([
          name,
          model.description,
          task,
          tags.join(" "),
          "Hugging Face model"
        ].join(" "))
      };
    });
  }

  function huggingFaceSpaceItems(spaces) {
    return spaces.filter(function (space) {
      return space &&
        typeof space.id === "string" &&
        space.id.startsWith("cmudrc/") &&
        !space.private &&
        !space.disabled &&
        (space.gated === false || space.gated == null);
    }).map(function (space) {
      const name = space.id.split("/").slice(1).join("/");
      const tags = Array.isArray(space.tags) ? space.tags : [];
      const sdk = String(space.sdk || "hosted").replace(/[-_]+/g, " ");

      return {
        name: name,
        source: "hugging-face",
        category: "space",
        sourceLabel: "Hugging Face",
        kind: sentenceCase(sdk) + " interactive demo",
        description: summarize(
          space.description,
          "Interactive research application built with " + sdk + "."
        ),
        url: "https://huggingface.co/spaces/" + space.id,
        updated: formatDate(space.lastModified),
        search: normalize([
          name,
          space.description,
          sdk,
          tags.join(" "),
          "Hugging Face Space GUI app demo"
        ].join(" "))
      };
    });
  }

  function compareItems(a, b) {
    if (sortSelect.value === "title") {
      return collator.compare(a.name, b.name) || collator.compare(a.sourceLabel, b.sourceLabel);
    }

    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }

    const aTimestamp = a.updated ? a.updated.timestamp : 0;
    const bTimestamp = b.updated ? b.updated.timestamp : 0;
    return bTimestamp - aTimestamp || collator.compare(a.name, b.name);
  }

  function createCard(item) {
    const card = document.createElement("article");
    const type = document.createElement("p");
    const sourceBadge = document.createElement("span");
    const sourceText = document.createElement("span");
    const kindBadge = document.createElement("span");
    const kindIcon = document.createElement("i");
    const kindText = document.createElement("span");
    const heading = document.createElement("h3");
    const description = document.createElement("p");
    const metadata = document.createElement("p");
    const links = document.createElement("ul");
    const linkItem = document.createElement("li");
    const link = document.createElement("a");

    card.className = "resource-card live-resource-card live-resource-card--" + item.category;
    type.className = "resource-card__type";
    sourceBadge.className = "resource-card__badge resource-card__badge--source";
    sourceText.textContent = item.sourceLabel;

    if (item.source === "github") {
      const sourceIcon = document.createElement("i");
      sourceIcon.className = "fab fa-github";
      sourceIcon.setAttribute("aria-hidden", "true");
      sourceBadge.append(sourceIcon);
    } else if (item.source === "hugging-face") {
      const sourceIcon = document.createElement("span");
      sourceIcon.className = "resource-card__emoji";
      sourceIcon.setAttribute("aria-hidden", "true");
      sourceIcon.textContent = "🤗";
      sourceBadge.append(sourceIcon);
    } else {
      const sourceIcon = document.createElement("i");
      sourceIcon.className = "fas fa-snowflake";
      sourceIcon.setAttribute("aria-hidden", "true");
      sourceBadge.append(sourceIcon);
    }

    sourceBadge.append(sourceText);
    kindBadge.className = "resource-card__badge resource-card__badge--kind";
    kindIcon.className = {
      dataset: "fas fa-database",
      model: "fas fa-brain",
      software: "fas fa-code",
      space: "fas fa-window-maximize"
    }[item.category] || "fas fa-cube";
    kindIcon.setAttribute("aria-hidden", "true");
    kindText.textContent = item.kind;
    kindBadge.append(kindIcon, kindText);
    type.append(sourceBadge, kindBadge);
    heading.textContent = item.name;
    description.textContent = item.description;
    metadata.className = "resource-card__meta";

    if (item.metadata) {
      metadata.textContent = item.metadata;
    } else if (item.updated) {
      const time = document.createElement("time");
      time.dateTime = item.updated.iso;
      time.textContent = "Updated " + item.updated.label;
      metadata.append(time);
    } else {
      metadata.textContent = "Update date unavailable";
    }

    links.className = "resource-card__links";
    links.setAttribute("aria-label", "Links for " + item.name);
    link.href = item.url;
    if (item.category === "model") {
      link.textContent = "View model";
    } else if (item.category === "space") {
      link.textContent = "Open interactive demo";
    } else if (item.category === "dataset") {
      link.textContent = "View dataset";
    } else {
      link.textContent = "View repository";
    }
    linkItem.append(link);
    links.append(linkItem);
    card.append(type, heading, description, metadata, links);
    return card;
  }

  function renderCatalog() {
    const queryTerms = normalize(queryInput.value).split(/\s+/).filter(Boolean);
    const selectedSource = sourceSelect.value;
    const selectedType = typeSelect.value;
    const matchingItems = items.filter(function (item) {
      const matchesQuery = queryTerms.every(function (term) {
        return item.search.includes(term);
      });
      const matchesSource = selectedSource === "all" || item.source === selectedSource;
      const matchesType = selectedType === "all" || item.category === selectedType;
      return matchesQuery && matchesSource && matchesType;
    }).sort(compareItems);
    const visibleItems = showAll ? matchingItems : matchingItems.slice(0, initialLimit);
    const fragment = document.createDocumentFragment();

    if (matchingItems.length === 0) {
      const empty = document.createElement("p");
      empty.className = "catalog-empty";
      empty.textContent = "No public resources match these filters.";
      fragment.append(empty);
    } else {
      visibleItems.forEach(function (item) {
        fragment.append(createCard(item));
      });
    }

    catalog.replaceChildren(fragment);
    catalog.setAttribute("aria-busy", "false");
    showAllButton.hidden = showAll || matchingItems.length <= initialLimit;
    showAllButton.textContent = "Show all " + matchingItems.length + " items";

    if (matchingItems.length === items.length && visibleItems.length < matchingItems.length) {
      status.textContent = "Showing " + visibleItems.length + " of " + matchingItems.length + " catalog items from " + sourceListLabel() + ".";
    } else {
      status.textContent = "Showing " + visibleItems.length + " of " + matchingItems.length + " matching items (" + items.length + " total) from " + sourceListLabel() + ".";
    }
  }

  queryInput.addEventListener("input", function () {
    showAll = false;
    renderCatalog();
  });
  sourceSelect.addEventListener("change", function () {
    showAll = false;
    renderCatalog();
  });
  typeSelect.addEventListener("change", function () {
    showAll = false;
    renderCatalog();
  });
  sortSelect.addEventListener("change", renderCatalog);
  showAllButton.addEventListener("click", function () {
    showAll = true;
    renderCatalog();
  });

  const githubRequest = fetchJson("https://api.github.com/orgs/cmudrc/repos?per_page=100&type=public&sort=pushed&direction=desc");
  const huggingFaceDatasetRequest = fetchJson("https://huggingface.co/api/datasets?author=cmudrc&limit=100&full=true");
  const huggingFaceModelRequest = fetchJson("https://huggingface.co/api/models?author=cmudrc&limit=100&full=true");
  const huggingFaceSpaceRequest = fetchJson("https://huggingface.co/api/spaces?author=cmudrc&limit=100&full=true");

  Promise.allSettled([
    githubRequest,
    huggingFaceDatasetRequest,
    huggingFaceModelRequest,
    huggingFaceSpaceRequest
  ]).then(function (results) {
    if (results[0].status === "fulfilled") {
      items = items.concat(githubItems(results[0].value));
      loadedSources.add("GitHub");
    }

    if (results[1].status === "fulfilled") {
      items = items.concat(huggingFaceItems(results[1].value));
      loadedSources.add("Hugging Face");
    }

    if (results[2].status === "fulfilled") {
      items = items.concat(huggingFaceModelItems(results[2].value));
      loadedSources.add("Hugging Face");
    }

    if (results[3].status === "fulfilled") {
      items = items.concat(huggingFaceSpaceItems(results[3].value));
      loadedSources.add("Hugging Face");
    }

    if (items.length === 0) {
      const error = document.createElement("p");
      error.className = "catalog-empty";
      error.textContent = "The live catalog could not be loaded. Try again or browse the lab's public profiles using the links above.";
      catalog.replaceChildren(error);
      catalog.setAttribute("aria-busy", "false");
      status.textContent = "Live catalog unavailable.";
      return;
    }

    renderCatalog();
  });
}());
