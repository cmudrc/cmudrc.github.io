---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
## Journal
{% assign journal_list = site.publications.journals | join: ";" %}
{% include scholar/_includes/publications venue=journal_list link=true %}

## Conference
{% include scholar/_includes/publications venue_search="congress;symposium;conference" link=true %}

## Trade Publications
{% include trade_publications.html %}
