---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
<ul>
{% for citation in site.data.citations %}
  <li>
    {{ citation.Authors | replace: ";", ","}} ({{citation.Year}}) "{{citation.Title}}" <i>{{citation.Publication}}</i>
  </li>
{% endfor %}
</ul>
