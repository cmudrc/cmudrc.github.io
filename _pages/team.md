---
title: Team
permalink: /team/
layout: splash
---

{% for member in site.data.members %}
  <div style="width:100%">
    <div style="    display:inline-block:    max-width:300px;">
      <img src="https://cmccomb.com/assets/images/headshot_optimized_square.jpg">
    </div>
    <div style="    display:inline-block;    width:100%; ">
      <h2>{{member.first}} {{member.last}}, {{member.role}}</h2>
      <p>{{member.bio}}</p>
    </div>
  </div>
{% endfor %}
