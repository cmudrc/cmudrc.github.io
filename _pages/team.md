---
title: Team
permalink: /team/
layout: single
---

{% for member in site.data.members %}
  {% capture name %} {{member.first}} {{member.last}}, {{member.role}} {% endcapture %}
  {% include lab_member image_path=member.headshot excerpt=member.bio title=name %}
{% endfor %}

