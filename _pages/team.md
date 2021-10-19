---
title: Team
permalink: /team/
layout: splash
---
content

{% for member in site.data.members %}
<h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
<div style="width:100%">
<div style="min-width:300px; display: table-cell;">
{%include figure image_path="https://cmccomb.com/assets/images/headshot_optimized_square.jpg" %}
</div>
<div style="display:table-cell; width:100%; vertical-align: top">
<p>{{member.bio}}</p>
</div>
</div>
{% endfor %}

