## Architecture Specification: Container / Hook / UI

This application uses a feature-sliced, domain-driven architecture. Every major feature (e.g., `settings`, `projects`, `tasks`) contains its own isolated ecosystem divided into five distinct layers: **Containers**, **Hooks**, **UI**, **Schemas**, and **Server**.

The primary goal of this pattern is **strict separation of concerns**.

### 1. The Directory Structure

Within any feature folder (e.g., `src/app/(app)/projects/`), the code must be organized as follows:

```text
projects/
├── containers/   # The Glue (Smart Components)
├── hooks/        # The Brain (State & Logic)
├── ui/           # The Face (Dumb Components)
├── schemas/      # Zod schemas, constants, feature-local utilities
├── server/       # Feature-specific tRPC router (project.router.ts)
├── page.tsx      # The Next.js Route Entry Point
```

**Important:** Do NOT use `_components/` or `lib/` folders in features. Use `ui/` for components and `schemas/` for utilities.

---

### 2. Layer Responsibilities

#### **UI (`ui/`) - "The Face"**

**Rule:** UI components must be "dumb" and purely presentational.

* **DO:** Accept data and callbacks strictly via `props`.
* **DO:** Handle their own highly localized visual state (e.g., an `isOpen` state for a generic dropdown, or internal CSS toggles).
* **DO NOT:** Fetch data, call tRPC mutations, read from global contexts (unless it's a theme provider), or use complex `useEffect` logic.
* **Testability:** You should be able to render a UI component perfectly in a tool like Storybook just by hardcoding props.

**LITMUS TEST for the UI Folder:**
If the file contains ANY of the following imports, it **DOES NOT** belong in the `ui/` folder:
* `api.*.useQuery` or `api.*.useMutation`
* `useSession` or `useUser` (Auth contexts)
* `useRouter` or `usePathname` (if used to trigger data fetches)
If it has these, it must be split into a Hook and a Container!


#### **Hooks (`hooks/`) - "The Brain"**

**Rule:** Hooks handle all business logic, data fetching, and complex state management.

* **DO:** Encapsulate tRPC queries, mutations, form validation logic, and complex `useState`/`useReducer` flows.
* **DO:** Return a clean object containing exactly what the Container and UI need (e.g., `return { data, isLoading, handleSave }`).
* **DO NOT:** Return JSX or HTML. Hooks are strictly for logic.
* **Naming:** Do not append -ui to file names. Name the file based on what the HTML element represents (e.g., create-task-form.tsx, task-list.tsx, task-layout.tsx).
* **Testability:** You should be able to test the hook independently of the UI to verify that data transforms and state updates work correctly.

#### **Containers (`containers/`) - "The Glue"**

**Rule:** Containers connect the Brain (Hooks) to the Face (UI).

* **DO:** Call the feature-specific custom hook(s) to grab data and actions.
* **DO:** Render the dumb components from the `ui/` folder and pass the hook's data down as props.
* **DO NOT:** Write complex data manipulation or inline state logic here. If the logic is longer than a few lines, abstract it into the hook.
* **DO NOT:** Write complex, deeply nested HTML/Tailwind here. If the JSX is getting long, abstract it into a component in the `ui/` folder.

---

### 3. Handling Dialogs, Modals, and Complex Forms

Dialogs, Drawers, and Modals often blur the lines because they require UI, State, and Data mutations. **Treat them as mini-features and apply the exact same pattern:**

1. **`lib/feature-schemas.ts`**: Contains Zod schemas and inferred TypeScript types for all forms within the feature.
2. **`hooks/use-feature-action.ts`**: Contains ONLY the tRPC mutations and success/error toasts. NO `useState` for form fields or manual validation logic.
3. **`ui/feature-form.tsx`**: The dumb presentational component receiving `UseFormReturn` and `onSubmit` as props. Uses Shadcn's `<Form>` and `<FormField>`. NO `<Dialog>` or `<DialogTrigger>` shells here.
4. **`containers/feature-dialog.tsx`**: Renders the `<Dialog>` shell, initializes `useForm` with the zod schema, handles data fetching for form select fields, and passes the form object down to the `<FeatureForm />`.

see `docs\dialog_design.md` for detailed design guide.

**Prop-Drilling and UI Abstraction Anti-Patterns:**
* **DO NOT** create a root `ui/feature-ui.tsx` component that takes 30+ props just to pass them down to nested components. If the Container is already managing the state, it is perfectly acceptable for the Container to directly compose and render the smaller UI components (like tables, headers, and filters).
* The "UI" layer is meant for atomic, reusable, dumb components (e.g., `user-list-table.tsx`, `create-user-form.tsx`), NOT necessarily a massive monolithic UI wrapper that mirrors the entire container.


---

### 4. Global vs. Feature-Specific

* **Feature-Specific:** If a UI component, hook, or container is only used by *one* specific domain (e.g., `use-contacts.ts` or `contact-avatar.tsx`), it must live inside that feature's directory.
* **Global:** Only promote code to the root `src/components/ui`, `src/hooks`, or `src/lib` folders if it is explicitly shared across **two or more** different feature domains.

---

### 5. Schemas, Constants, and Utilities

Not everything in a feature is a component or a hook. Features often require local configurations, Zod validation schemas, or pure utility functions.

**Rule:** Non-React files must never be placed in `ui/`, `containers/`, or `hooks/`.

* **DO:** Place feature-specific constants, configs, and helper functions in a local `schemas/` folder (e.g., `projects/schemas/project-schemas.ts`).
* **DO:** Keep validation schemas (like Zod) close to the feature if they are only used by that feature's forms or API routes.
* **DO NOT:** Put standard TypeScript/JavaScript files in the `ui/` folder. The `ui/` folder is strictly for `.tsx` files that return JSX.
* **DO NOT:** Use `lib/` folder in features — use `schemas/` instead.

---

### 6. Feature-Specific tRPC Routers

Each feature owns its own tRPC router, co-located within the feature folder.

**Rule:** Routers live in `<feature>/server/<feature>.router.ts`.

```text
tasks/
├── server/
│   └── task.router.ts    # Contains taskRouter
├── containers/
├── hooks/
├── ui/
├── schemas/
└── page.tsx
```

* **DO:** Name the file `<feature>.router.ts` (e.g., `task.router.ts`, `project.router.ts`).
* **DO:** Export the router and register it in `src/server/api/root.ts`.
* **DO NOT:** Put routers in a central `server/api/routers/` folder — they belong with their feature.

---
