---
layout: splash
classes: wide
title: Publications
permalink: /publications/
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: "https://images.unsplash.com/photo-1595694548657-8e6f0d681f8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
---
## Journal
{% for this_year in (2015..2022) reversed %}
<h3> {{this_year}} </h3>
{% assign journal_list = site.publications.journals | join: ";" %}
{% include scholar/_includes/publications venue=journal_list link=true year=this_year %}
{% endfor %}

## Conference
{% for this_year in (2013..2022) reversed %}
<h3> {{this_year}} </h3>
{% include scholar/_includes/publications venue_search="congress;symposium;conference" year=this_year link=true %}
{% endfor %}

## Trade Publications
{% include trade_publications.html %}
