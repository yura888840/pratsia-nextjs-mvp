# Recovered dependencies

These ES modules contain the tree-shaken portions of Drizzle ORM and Zod preserved in the supplied production bundle. They are separated from application code so the reconstructed project does not require guessing their original package versions. Their short export names are compiler artifacts. They are not newly authored application code, and upstream licenses continue to apply.

The icon definitions and React icon helpers embedded in app/platform.jsx originated in the bundled Lucide implementation. A future cleanup can replace these recovered dependencies with explicitly versioned upstream packages after equivalence testing. The current project has no dependency on the old .next output or webpack module loader.
