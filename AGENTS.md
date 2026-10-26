# AGENTS.md

## Project overview
- This project is a small vanilla JavaScript CRUD app for managing products.
- The UI is a static page served from `index.html` and styled by `style.css`.
- Product data is stored in `db.json` and served by JSON Server.
- Main logic lives in `app.js`; it uses Axios to read, create, update, and delete records from `http://localhost:3000/products`.

## Local workflow
- No bundler or framework is used.
- Run the mock API with:
  - `npx json-server --watch db.json --port 3000`
- Open the page in a browser after the API is running.
- Keep the API base URL stable; do not rename the `products` resource unless it is updated everywhere.

## Coding conventions
- Prefer the existing vanilla JavaScript style over introducing frameworks or modules.
- Use `async/await` for API calls and keep error handling consistent.
- Keep DOM lookups near the top of the file and reuse the same selector classes/ids already used by the page.
- After a create, update, or delete action, refresh the product list by calling the read function again.
- Avoid unnecessary refactors; the app is intentionally simple and direct.

## editor.occurrencesHighlight guidance
- When the editor highlights repeated symbols, treat those occurrences as a sign that the same concept is used in multiple places.
- Update all relevant references together when changing a variable, function, or DOM selector name.
- In this codebase, repeated names such as `products`, `getProducts`, `updateProduct`, `deleteProduct`, `form`, and the matching HTML class names are especially important to keep consistent.
- Prefer stable, descriptive names so occurrences are easy to follow during edits.
- If an identifier is repeated across the app, keep the same name to preserve the signal from occurrences highlighting.
- Do not introduce duplicate names that make the highlight pattern misleading or harder to track.
- Use occurrence highlighting before refactoring to confirm the full impact on `app.js`, `index.html`, and `style.css`.

## Safe change patterns
- Update the API calls and UI behavior together.
- Keep the HTML structure and CSS classes in sync with the JS selectors.
- Preserve the current CRUD flow: list -> create -> update -> delete.
- Favor minimal, targeted edits over broad rewrites.
