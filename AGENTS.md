# Architecture rules

- Staff workspace access is enforced by database policies using protected user_roles, never browser storage; authentication alone must not expose firm records.
- Profiles contain only user-facing information; role assignment is an administrative Cloud operation until a verified first administrator is established.
- Staff operational pages live under /staff and are noindex; public pages and their canonical addresses remain unchanged.
- Backend phase tracking lives in roadmap.md; ROADMAP.md is historical and its old names, colors and domains must not override later user requirements.