---
layout: splash
classes: wide
title: Publications
permalink: /publications/
---
<ol>
{% for citation in site.data.citations reversed %}
  <li>
    {% assign url = citation.Title | cgi_escape | prepend: "https://scholar.google.com/scholar?q=" %}
    {% assign size = citation.Authors | size | minus: 2 %}
    {% assign authors = citation.Authors | slice: 0, size | split: ";" | array_to_sentence_string %}
    {{ authors }} ({{citation.Year}}) <a href="{{ url }}">"{{citation.Title}}"</a> <i>{{citation.Publication}}</i>.
  </li>
{% endfor %}
</ol>
