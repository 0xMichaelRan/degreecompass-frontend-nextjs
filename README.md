Init the project with pnpm:

```bash
pnpm create next-app nextjs-degree-compass
```

Add shadcn/ui to the project:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input card select table label checkbox
pnpm dlx shadcn@latest add tooltip
pnpm dlx shadcn@latest add textarea accordion
```

To support makrdown:

```bash
pnpm install react-markdown remark-gfm
pnpm install -D @tailwindcss/typography
```

TODO:

* Search function
* Add Q&A section using LLM
* User login and register
* Would be good to integrate the following site: http://school.nseac.com/spe.php?speid=090103

