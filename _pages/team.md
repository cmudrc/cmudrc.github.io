---
title: Team
permalink: /team/
layout: splash
---
content

{% for member in site.data.members %}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
![image-left](/https://cmccomb.com/assets/images/headshot_optimized_square.jpg){: .align-left}
<p>{{member.bio}}</p>
{% endfor %}

