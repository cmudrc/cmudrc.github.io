---
title: Team
permalink: /team/
layout: splash
---

{% for member in site.data.members %}
{% include figure image_path="{{member.headshot}}" %}{: .align-left}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
<p>{{member.bio}}</p>
{% endfor %}

