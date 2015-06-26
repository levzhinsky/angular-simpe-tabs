## Angular Simple Tabs

* s-tab - define tab with name. It's possible to have few tabs with the same name
* s-toggle-tab - defines what tab should be toggled on click
* s-expanded - makes tab expanded by default. Default behavior - tab is hidden

### Usage

```html
<div s-tab='myTabName' s-expanded></div>
<button s-toggle-tab='myTabName'></button>
```

### How to run specs
* npm install -g karma-cli
* npm install -g bower
* npm install
* bower install
* karma start --no-auto-watch --single-run --browsers Firefox