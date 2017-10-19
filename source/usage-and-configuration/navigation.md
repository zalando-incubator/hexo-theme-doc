---
title: Navigation
---

# Navigation

Navigation is fully customizable by updating the `navigation.yaml` file located in your `source/_data` folder.   
Within that file you will describe how the **navigation/menu** links will be presented to the user.

Navigation entries are grouped by **category**.   
There are two main navigation **categories**:

* **logo**: used to define the values for the logo in the top navigation bar
* **main**: used to define the values showed in the left sidebar

For each navigation item you **must** define a `type` and, depending on the `type`, other attributes such as `text` and/or `path`.

Each navigation item can have a special property called `children`, that, as you might have guessed, gives you the ability to "nest" navigation entries.

*source/_data/navigation.yaml example*

```yaml
logo:
- text: My Documentation
  type: link
  path: index.html

main:
- text: PROJECTS
  type: label
- text: My Awesome Projects
  type: link
  path: projects/my-awesome-project.html
  children:
  - text: My Awesome Projects Page 1
    type: link
    path: projects/my-awesome-project-page-1.html
```

There are two `types` of navigation items:

* **label**: navigation item as a label (it's not an anchor so it doesn't need a `path` value)
* **link**: navigation item as a link

<br>
The `path` value for a link navigation item is just the markdown `filepath`, but with `.html` as extension.
