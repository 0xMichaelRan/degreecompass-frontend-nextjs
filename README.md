# 写在前面

本项目是degree-compass的frontend，使用nextjs框架。

于2024年12月2日开源老代码，并移入我的私有repo继续商业化开发。

希望对大家有帮助！

# 项目结构
```
frontend-nextjs/
├── README.md          # Project documentation
├── package.json       # Project dependencies and scripts
├── public             # Static files
├── src                # Source code
│   ├── app            # Application logic
│   ├── components     # Reusable UI components
│   ├── lib            # Library functions
│   ├── types          # TypeScript types
│   └── utils          # Utility functions

# Setup

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

To use lodash:

```bash
pnpm install lodash
pnpm install --save-dev @types/lodash
```

For more information, please refer to the [backend-flask README](https://github.com/0xMichaelRan/flask-degree-compass/blob/main/README.md).