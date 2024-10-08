/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../routes/__root'
import { Route as WaitlistImport } from './../routes/waitlist'
import { Route as DatabaseImport } from './../routes/database'
import { Route as AuthImport } from './../routes/_auth'
import { Route as IndexImport } from './../routes/index'
import { Route as DashboardDashboardImport } from './../routes/_dashboard/dashboard'
import { Route as DashboardDashboardIndexImport } from './../routes/_dashboard/dashboard.index'
import { Route as AuthLoginIndexImport } from './../routes/_auth/login/index'
import { Route as AuthLoginErrorImport } from './../routes/_auth/login/error'
import { Route as DashboardDashboardDbIndexImport } from './../routes/_dashboard/dashboard.db.index'
import { Route as DashboardDashboardProjectsProjectIdImport } from './../routes/_dashboard/dashboard.projects.$projectId'

// Create/Update Routes

const WaitlistRoute = WaitlistImport.update({
  path: '/waitlist',
  getParentRoute: () => rootRoute,
} as any)

const DatabaseRoute = DatabaseImport.update({
  path: '/database',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardDashboardRoute = DashboardDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const DashboardDashboardIndexRoute = DashboardDashboardIndexImport.update({
  path: '/',
  getParentRoute: () => DashboardDashboardRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/login/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginErrorRoute = AuthLoginErrorImport.update({
  path: '/login/error',
  getParentRoute: () => AuthRoute,
} as any)

const DashboardDashboardDbIndexRoute = DashboardDashboardDbIndexImport.update({
  path: '/db/',
  getParentRoute: () => DashboardDashboardRoute,
} as any)

const DashboardDashboardProjectsProjectIdRoute =
  DashboardDashboardProjectsProjectIdImport.update({
    path: '/projects/$projectId',
    getParentRoute: () => DashboardDashboardRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/database': {
      preLoaderRoute: typeof DatabaseImport
      parentRoute: typeof rootRoute
    }
    '/waitlist': {
      preLoaderRoute: typeof WaitlistImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard/dashboard': {
      preLoaderRoute: typeof DashboardDashboardImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login/error': {
      preLoaderRoute: typeof AuthLoginErrorImport
      parentRoute: typeof AuthImport
    }
    '/_auth/login/': {
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/dashboard/': {
      preLoaderRoute: typeof DashboardDashboardIndexImport
      parentRoute: typeof DashboardDashboardImport
    }
    '/_dashboard/dashboard/projects/$projectId': {
      preLoaderRoute: typeof DashboardDashboardProjectsProjectIdImport
      parentRoute: typeof DashboardDashboardImport
    }
    '/_dashboard/dashboard/db/': {
      preLoaderRoute: typeof DashboardDashboardDbIndexImport
      parentRoute: typeof DashboardDashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute.addChildren([AuthLoginErrorRoute, AuthLoginIndexRoute]),
  DatabaseRoute,
  WaitlistRoute,
  DashboardDashboardRoute.addChildren([
    DashboardDashboardIndexRoute,
    DashboardDashboardProjectsProjectIdRoute,
    DashboardDashboardDbIndexRoute,
  ]),
])

/* prettier-ignore-end */
