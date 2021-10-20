---
title: Team
permalink: /team/
layout: splash
---

{% for member in site.data.members %}
  {% include lab_member image_path=member.headshot excerpt=member.bio title=member.last %}
{% endfor %}

