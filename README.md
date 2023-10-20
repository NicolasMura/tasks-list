# Tasks List Test

Frontend (Angular) Nx monorepo for a technical test.

- [Tasks List Test](#tasks-list-test)
  - [Requirements](#requirements)
  - [Dev Setup](#dev-setup)
  - [Cheat sheet](#cheat-sheet)

## Requirements

To contribute to this project and run it locally, you will need:

- [Node JS ^16.14.0 || ^18.10.0](https://nodejs.org/en)
- [Angular 16.x](https://angular.io/guide/versions)
- [Typescript >=4.9.3 <5.2.0](https://www.typescriptlang.org)
- [RXJS ^6.5.3 || ^7.4.0](https://rxjs.dev/)

## Dev Setup

```bash
  # install the dependencies
  yarn
  yarn add -g nx # not mandatory, you can use `npx nx` instead

  # run the app - it will start a server and livereload the app
  nx serve # or `npx nx serve`
```

## Cheat sheet

This project was integrated in a [Nx](https://nx.dev) monorepo with the help of below command:

```bash
  npx create-nx-workspace@latest tasks-list --preset=angular-monorepo --appName=frontend --e2eTestRunner=cypress --interactive=false --routing=true --standaloneApi=true --style=scss --nxCloud=false --packageManager=yarn
```

Material was added with:

```shell
  yarn add @angular/material
  npx nx g @angular/material:ng-add --project=frontend
```

Tailwind was added with:

```shell
  npx nx g @nx/angular:setup-tailwind frontend
```

Angular components (like pages) were added to the frontend app with:

```shell
  npx nx generate @nx/angular:component --name=task-list --project=frontend --standalone=true --style=none --no-interactive
```

Other Angular components were added to shared libraries with:

```shell
  npx nx generate @nx/angular:library --name=task --prefix=ses --directory=libs/components/task --changeDetection=OnPush --flat=true --projectNameAndRootFormat=as-provided --skipModule=true --standalone=true --style=none --no-interactive
```

Angular services were added to the libs with:

```shell
  npx nx generate @nx/angular:library --name=api-sdk --directory=libs/api-sdk --flat=true --projectNameAndRootFormat=as-provided --skipModule=true --style=none --no-interactive
  npx nx generate @schematics/angular:service --name=task --project=frontend --path=libs/api-sdk/src/api --no-interactive
```
