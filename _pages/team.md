---
title: Team
permalink: /team/
layout: single
---

{% for member in site.data.members %}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
<p>{{member.bio}}</p>
{% endfor %}
