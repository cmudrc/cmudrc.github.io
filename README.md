# Design Research Collective website

This repository contains the public website for the Design Research Collective
at Carnegie Mellon University. The site is built with Jekyll and deployed to
[cmudrc.github.io](https://cmudrc.github.io/) through GitHub Pages.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000` to preview the site.

The Gemfile pins Jekyll 3.10 for compatibility with CSV data on Ruby 3.1. The site is built and deployed by GitHub Actions.

## Publications

The full [publications page](https://cmudrc.github.io/publications/) uses the site's searchable publication browser. The homepage's recent-publications list uses the [`Google Scholar for GitHub Pages` include](https://github.com/cmccomb/google-scholar-for-github-pages) with the same `_data/citations.csv` file.

`_includes/publications` is pinned to upstream commit [`3b9a1aa51dce1093422477309f97976098c93f23`](https://github.com/cmccomb/google-scholar-for-github-pages/commit/3b9a1aa51dce1093422477309f97976098c93f23). When updating it, copy the include from the new commit and update the pinned SHA in `.github/workflows/jekyll.yml`. The Pages workflow verifies the copy against that commit before building the site.
