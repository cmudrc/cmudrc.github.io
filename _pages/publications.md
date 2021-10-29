---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
## Journal
{% for this_year in (2015..2022) %}
<h3> {{this_year}} </h3>
{% assign journal_list = site.publications.journals | join: ";" %}
{% include scholar/_includes/publications venue=journal_list link=true year=this_year %}
{% endfor %}

## Conference
{% include scholar/_includes/publications venue_search="congress;symposium;conference" link=true %}

## Trade Publications
{% include trade_publications.html %}
