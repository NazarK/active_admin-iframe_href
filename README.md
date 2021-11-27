# ActiveAdmin IFrame Hyper Reference
Open links in modal window by adding class 'iframe_href' to "a" tag.
Open edit, view, create links in iframe (instead of separate tab) in ActiveAdmin. Allowing you to avoid opening multiple tabs, you will stay on same tab in browser.


## Installation
**1. Include to your Gemfile**
```ruby
gem 'active_admin-iframe_href', github: "NazarK/active_admin-iframe_href"
```

**2. Require javascript dependency in active_admin.js**

Turbolinks and jquery supposed to be included in active_admin.js.

```javascript
//= require active_admin/iframe_href
```

**3. Require javascript dependency in active_admin.scss**

```css
//=require active_admin/iframe_href
```

**4. Profit**

Edit, view, show, create buttons will automatically open in iframe now.

## Notes
This works correctly if after update you are redirected to collection index. Iframe is closed automatically if it gets collection index inside of it. Will not work if you a redirected to show action.



## Maintainer
[Nazar Kuliyev](https://github.com/NazarK)
