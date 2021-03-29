## What is SCMS?

SCMS is a markdown editor for websites built with static site generators, such as Hugo, Hexo, Gatsby, Jekyll. In addition to the typical markdown editor features, it manages the assets (images). It works completely on browser thanks to the [File System Access API](https://wicg.github.io/file-system-access/).

## Requirements

### Browser

To use SCMS, you need a browser that supports File System Access API. Chrome 86+ is recommended, but it should also work on Edge 86+ and Opera 72+.

### Statically-generated Website

SCMS manages

- Article Markdown Files
- Image files that are statically served on a specific path

Therefore, SCMS requires the project to have the following two directories:

- directory that recognize `.md` files inside as articles (e.g. `posts`, `articles`)
- directory that statically serves files inside from a path (e.g. `public`, `assets`)

## Usage

### Select Directory

Click "Open" on the top page to open the directory select modal. Choose the directory that you are using with static site generators.

### Project Setup

If you choose the directory for the first time, you need to configure the project.

Enter the four information that are required by SCMS.

1. Name of the project
1. Directory to place markdown files (e.g. `posts`, `articles`)
1. Directory to place images (e.g. `public`, `assets`)
1. Path from which the images are served (e.g. `/assets`)

For example, the below is the directory structure of the typical Hugo project.

```
.
├── content
│   └── posts
│       ├── Hello.md
├── layouts
└── static
    ├── Picture1.png
```

Any markdown files under `content/posts` become visible as posts, and files under `static` is available on the website on the root (`/`).

The configuration of the project would be

| Key                | Value            |
| ------------------ | ---------------- |
| Project Name       | Sample Hugo Blog |
| Markdown Directory | /content/posts   |
| Asset Directory    | /static          |
| Asset Serving Path | /                |

If you want to place images under `./static/images`, your `Asset Serving Path` also will be `/images`.

You may edit the project configuration anytime from `Home` screen.

### Create/Edit Posts

The posts table will list all markdown files that are in the `Markdown Directory`. Hit the `Edit` button to open the article editor.

To insert an image to the article, click the image icon on top of the markdown editor and select an image on the system. The image will be copied to the `Asset Directory` and inserted.
