---
title: Team
permalink: /team/
layout: splash
feature_row:
  - image_path: /assets/headshots/McComb.jpeg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
---

{% for member in site.data.members %}
  {% include lab_member image_path=member.headshot excerpt=member.except title=member.last %}
{% endif %}

