# Basic x86 Assembly Language Tutorial

The tutorial is hosted in GitHub Pages here:

https://munckymagik.github.io/x86-assembly-tutorial/

## Authoring

### Prerequisites

1) Install Rust, see https://rustup.rs/.

2) Install [mdbook](https://rust-lang-nursery.github.io/mdBook/) with `cargo install mdbook`

### Building

Outputs to `./book`.

```
mdbook build
```

Or build, serve and watch the files for changes

```
mdbook serve --open
```

## Publishing

This is done automatically using TravisCI when pushing to `master`. See `.travis.yml`.
