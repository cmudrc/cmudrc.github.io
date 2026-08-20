---
layout: splash
classes: wide solid-hero
title: Tools & Data
permalink: /tools-and-data/
header:
  og_image: "/assets/social-card.png"
  og_image_alt: "Carnegie Mellon University Design Research Collective"
  overlay_color: "#1e3f3e"
  excerpt: "Open tools, benchmarks, datasets, and research infrastructure for human-centered AI and computational engineering design."
---

<section class="resource-section live-catalog" aria-label="Public tools and data catalog" data-live-tool-catalog>
  <div class="catalog-toolbar" role="search" aria-label="Filter the public tools and data catalog">
    <div class="catalog-control catalog-control--search">
      <label for="tool-catalog-search">Search tools and data</label>
      <input id="tool-catalog-search" type="search" autocomplete="off" placeholder="Name, description, language, or topic" aria-controls="tool-catalog">
    </div>
    <div class="catalog-control">
      <label for="tool-catalog-source">Source</label>
      <select id="tool-catalog-source" aria-controls="tool-catalog">
        <option value="all">All sources</option>
        <option value="github">GitHub</option>
        <option value="hugging-face">Hugging Face</option>
        <option value="arctic-data-center">Arctic Data Center</option>
      </select>
    </div>
    <div class="catalog-control">
      <label for="tool-catalog-type">Resource type</label>
      <select id="tool-catalog-type" aria-controls="tool-catalog">
        <option value="all">All resource types</option>
        <option value="software">Software repositories</option>
        <option value="dataset">Datasets</option>
        <option value="model">Models</option>
        <option value="space">Interactive demos</option>
      </select>
    </div>
    <div class="catalog-control">
      <label for="tool-catalog-sort">Sort</label>
      <select id="tool-catalog-sort" aria-controls="tool-catalog">
        <option value="recent">Recently updated</option>
        <option value="title">Name, A–Z</option>
      </select>
    </div>
  </div>

  <p class="catalog-status" id="tool-catalog-status" role="status" aria-live="polite" aria-atomic="true">Loading the live catalog…</p>
  <div class="resource-grid" id="tool-catalog" aria-busy="true"></div>
  <noscript><p>The live inventory requires JavaScript. Browse the complete catalog on <a href="https://github.com/cmudrc">GitHub</a> and <a href="https://huggingface.co/cmudrc">Hugging Face</a>.</p></noscript>
</section>

<script defer src="{{ '/assets/javascript/live-tool-catalog.js' | relative_url }}"></script>
