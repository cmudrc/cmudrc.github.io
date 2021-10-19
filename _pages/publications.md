---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
<ol>
{% for citation in site.data.citations %}
  <li>
    {{ citation.Authors | split: ";" | join: "," }} ({{citation.Year}}) <a href={{ citations.Title | cgi_escape | prepend: https://scholar.google.com/scholar?q= }}>"{{citation.Title}}"</a> <i>{{citation.Publication}}</i>
  </li>
{% endfor %}
</ol>
