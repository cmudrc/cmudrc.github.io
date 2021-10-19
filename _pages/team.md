---
title: Team
permalink: /team/
layout: splash
---
content

{% for member in site.data.members %}
<img src="https://cmccomb.com/assets/images/headshot_optimized_square.jpg" width="300">{: .align-left}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
<p>{{member.bio}}</p>
{% endfor %}

