<p align="center">
  <img src="https://user-images.githubusercontent.com/51327920/196569422-b0731147-cb72-46f8-b0ae-7601dd93453e.png" alt="Next.js TypeScript Starter">
</p>

<br />

<div align="center"><strong>Randomize videos from your favorite Youtube Channel</strong></div>

<br />

![Peek 2022-10-18 21-30](https://user-images.githubusercontent.com/51327920/196569759-c74d75ec-2fc8-4473-8c14-b2bf47c2e55d.gif)

<br />

### Development

To start the project locally, run:

```bash
yarn dev
```

Open `http://localhost:3000` with your browser to see the result.

## Documentation

### Requirements

- Node.js >= 12.22.0
- Yarn 1 (Classic)

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `yarn dev` — Starts the application in development mode at `http://localhost:3000`.
- `yarn build` — Creates an optimized production build of your application.
- `yarn start` — Starts the application in production mode.
- `yarn type-check` — Validate code using TypeScript compiler.
- `yarn lint` — Runs ESLint for all files in the `src` directory.
- `yarn format` — Runs Prettier for all files in the `src` directory.
- `yarn commit` — Run commitizen. Alternative to `git commit`.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';

// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to npm

This starter uses Yarn 1 (Classic) by default, but this choice is yours. If you'd like to switch to npm, delete the `yarn.lock` file, install the dependencies with `npm i`, change the CI workflow, and Husky Git hooks to use npm commands.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
