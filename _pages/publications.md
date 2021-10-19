---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
<ol>
{% for citation in site.data.citations %}
  <li>
    {% assign url = citations.Title | cgi_escape | prepend: "https://scholar.google.com/scholar?q=" %}
    {{ citation.Authors | split: ";" | join: "," }} ({{citation.Year}}) <a href="{{ url }}">"{{citation.Title}}"</a> <i>{{citation.Publication}}</i>
  </li>
{% endfor %}
</ol>
