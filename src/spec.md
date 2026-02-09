# Specification

## Summary
**Goal:** Fix the admin login flow so entering the correct admin code (“275101MAU”) reliably authorizes the caller and grants access to the admin-only editor without showing AccessDenied.

**Planned changes:**
- Backend: add/ensure a callable admin-status API (`isCallerAdmin`) that returns true/false (no traps) and uses the same authorization rule as admin-only update methods (e.g., `updateHomePageContent`).
- Frontend: update `AdminLoginDialog` to verify the admin code via the backend (not only a local string check) and show a clear English error message on failure.
- Frontend: after successful login, refresh/invalidate the React Query `['isAdmin']` cache so `useAdminAuth()` updates immediately (no hard reload), and ensure the dialog open/close behavior remains stable (no auto-close loops).

**User-visible outcome:** From the NavBar or Footer Admin entry, entering exactly “275101MAU” takes the user directly to the EditorPage (not AccessDenied), and the app switches into admin/editor mode immediately after successful login.
