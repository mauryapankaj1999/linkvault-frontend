# DECISIONS

This document records the main implementation choices and the
development process for Link Vault.

## What I used AI for

-   Used AI assistance to understand the assignment requirements and
    break the work into frontend, backend, and deployment tasks.
-   Used AI assistance while drafting and reviewing Express routes,
    MongoDB/Mongoose operations, React components, and API integration.
-   Used AI assistance to troubleshoot deployment configuration and
    environment-variable issues.
-   Used AI assistance to prepare setup documentation and identify edge
    cases to test.

## What I verified myself

-   Ran the backend locally and checked that it connected to MongoDB.
-   Tested bookmark creation locally and observed a successful
    `201 Created` response.
-   Deployed the backend to Render and confirmed from the service logs
    that the server started and MongoDB connected successfully.
-   Deployed the frontend to Vercel.
-   Checked the browser Network panel to compare the local and deployed
    API requests. This exposed an incorrect deployed request URL that
    needed to be corrected.
-   Tested the bookmark list and pagination in the frontend during
    development.

> Before submitting, update this section if any item above was not
> personally checked or if you complete additional tests.

## What I would do differently

-   Add automated backend tests for validation, duplicate URLs,
    pagination, update/delete behavior, and URL-security edge cases from
    the beginning.
-   Add frontend component and end-to-end tests for the main bookmark
    workflows.
-   Improve SSRF protection by validating and controlling the actual
    network connection destination, not only resolving and checking a
    hostname before the request.
-   Add structured logging and centralized error handling for easier
    production debugging.
-   Add rate limiting and request-size limits to the API.
-   Add CI checks for linting, type checking, and tests before
    deployment.
-   Improve accessibility and add clearer empty, loading, and error
    states.
-   Add monitoring for the deployed API and document operational
    recovery steps.

## Key implementation decisions

-   Used MongoDB with Mongoose for bookmark persistence.
-   Used React Query (TanStack Query) to manage server state and refresh
    bookmark data after mutations.
-   Used a Vite environment variable (`VITE_API_URL`) to configure the
    frontend API base URL for local and deployed environments.
-   Kept metadata extraction best-effort so a website timeout or
    metadata parsing failure does not necessarily prevent saving the
    bookmark.
-   Used HTTP/HTTPS protocol validation and basic private/local IP
    checks as an initial URL safety layer.
