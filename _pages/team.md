---
title: Team
permalink: /team/
layout: splash
---

{% for member in site.data.members %}
{% include figure image_path="https://cmccomb.com/assets/images/headshot_optimized_square.jpg" %}{: .align-left}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
<p>{{member.bio}}</p>
{% endfor %}

