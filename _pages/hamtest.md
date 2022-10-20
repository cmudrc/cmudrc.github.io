---
layout: splash
classes: wide
title: Chat Test
permalink: /test/
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: "https://images.unsplash.com/photo-1595694548657-8e6f0d681f8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
  caption: "[**Evy Prentice**](https://unsplash.com/@evy_prentice) on [*Unsplash*](https://unsplash.com)"
---
## Journal
{% assign journal_list = site.publications.journals | join: ";" %}
{% include scholar/_includes/publications venue=journal_list link=true %}

## Conference
{% include scholar/_includes/publications venue_search="congress;symposium;conference" link=true %}

## Trade Publications
{% include trade_publications.html %}


{% include hammie_chat.html %}
