---
layout: splash
classes: wide solid-hero
title: Publications
permalink: /publications/
header:
  og_image: "/assets/social-card.png"
  og_image_alt: "Carnegie Mellon University Design Research Collective"
  overlay_color: "#1e3f3e"
  excerpt: "Search the lab's journal articles, conference papers, preprints, and public-facing research writing."
---
<p>This index is generated from the lab's publication data. New records become searchable and sortable without additional page maintenance.</p>

<div class="publication-browser" data-publication-browser>
  <div class="catalog-toolbar publication-toolbar" role="search" aria-label="Search and filter publications" data-publication-controls>
    <div class="catalog-control catalog-control--search">
      <label for="publication-search">Search publications</label>
      <input id="publication-search" type="search" autocomplete="off" placeholder="Author, title, venue, topic, or year" aria-controls="publication-list" data-publication-query>
    </div>
    <div class="catalog-control">
      <label for="publication-type">Type</label>
      <select id="publication-type" aria-controls="publication-list" data-publication-type>
        <option value="all">All types</option>
        <option value="journal">Journal</option>
        <option value="conference">Conference</option>
        <option value="preprint">Preprint</option>
        <option value="trade">Trade publication</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="catalog-control">
      <label for="publication-year">Year</label>
      <select id="publication-year" aria-controls="publication-list" data-publication-year>
        <option value="all">All years</option>
      </select>
    </div>
    <div class="catalog-control">
      <label for="publication-sort">Sort</label>
      <select id="publication-sort" aria-controls="publication-list" data-publication-sort>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title, A–Z</option>
      </select>
    </div>
    <button class="btn btn--primary catalog-toolbar__action" type="button" data-publication-reset>Reset</button>
  </div>

  <p class="catalog-status" data-publication-status aria-live="polite" aria-atomic="true">Showing all {{ site.data.citations | size }} publications.</p>
  {% include publication_browser.html %}
  <p class="catalog-empty" data-publication-empty hidden>No publications match these filters.</p>
</div>

<script defer src="{{ '/assets/javascript/publication-browser.js' | relative_url }}"></script>
