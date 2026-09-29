<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Each landing page section that owns interactive state lives as its own component under `src/components/` and is rendered from `src/routes/index.tsx`; the route file stays a composition of sections so sections stay independently testable.
- Form fields validate with zod in the component that owns them and surface errors beside the field, because there is no backend service to reject bad input yet.
