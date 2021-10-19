---
title: Team
permalink: /team/
layout: single
---

{% for member in site.data.members %}
<h2>{{member.first}} {{member.last}}</h2>
<h3>{{member.role}}</h3>
<p>{{member.bio}}</p>
{% endfor %}
