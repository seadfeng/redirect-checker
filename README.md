# Redirect Checker

Redirect Checker is an open-source tool designed to analyze and verify URL redirects. It helps webmasters, SEO professionals, and developers understand redirect chains, identify issues, and optimize website performance.

## Features

- Analyze single or multiple URL redirects
- Detailed redirect chain visualization
- Support for various redirect types (301, 302, meta refresh, JavaScript)
- Custom user-agent selection
- SEO impact assessment
- Redirect loop detection
- HTTP header analysis (Status Code, X-Robots-Tag, Rel Canonical)

## Installation

To set up the Redirect Checker project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/seadfeng/redirect-checker.git
cd redirect-checker
```

2. Install dependencies:

```sh
npm install
# or
yarn install
# or
pnpm install
```

## Usage Guide

### Running the Development Server

To start the development server, run one of the following commands:

```sh
npm run dev
# or
# yarn dev
or
# pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### How to Use

1. Enter the URL you want to check in the input field.
2. (Optional) Select a user-agent from the dropdown menu.
3. Click the "Check" button.
4. Review the results, including the redirect chain, status codes, and final destination.

## Project Structure

The project is structured as follows:

- `.vscode/`: VS Code configuration files
- `bin/`: Binary files or scripts
- `public/`: Public assets
- `src/`: Source code
  - Components
  - Pages
  - Styles
- `.env`: Environment variables
- `.eslintrc.json`: ESLint configuration
- `.gitignore`: Git ignore file
- `README.md`: This file
- `components.json`: Component configuration
- `env.d.ts`: TypeScript definitions for environment variables
- `next.config.mjs`: Next.js configuration
- `package-lock.json`: NPM package lock file
- `package.json`: Project dependencies and scripts
- `postcss.config.js`: PostCSS configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `wrangler.toml`: Cloudflare Workers configuration

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- ESLint
- PostCSS


## Free Redirect Checker API

```sh
curl --request POST \
  --url https://redirectcheck.pages.dev/api/redirectcheck \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.2.0' \
  --data '{ 
	"url": "https://proxysites.ai"
}'
```

## Contributing

We welcome contributions to the Redirect Checker project. Please feel free to submit issues, feature requests, or pull requests.

## License

[MIT License](MIT-LICENSE)

## About

Redirect Checker is maintained by [seadfeng](https://github.com/seadfeng). For more information, visit the [project homepage](https://redirectchecker.org/).

## Tags

- redirect-urls
- redirect-page
- redirect-checker