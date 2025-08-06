Project Name:
Superboard UI - Frontend Developer Technical Assignment

Project Description:
My task is to build a responsive "Campaign page" similar to the provided mockup. This application will display campaign information across three device formats (desktop, tablet, and mobile) and will require both visual implementation and functional components.

Project Requirements:

## Requirements

### Core Functionality

1. Create a responsive dashboard that displays properly on desktop, tablet, and mobile devices
2. Implement the following sections:
   - Campaign header with title and description
   - Campaign progress metrics (~75K USD worth of tokens, ~$17,000 traded)
   - Rewards section with collectible items
   - Quests section with clickable items
   - Leaderboard section (simplified version is acceptable)

### Technical Requirements

1. Use next.js with TypeScript
2. Implement responsive design using CSS/SCSS (no UI libraries like Material UI or Tailwind allowed)
3. Create reusable components for UI elements (cards, buttons, progress indicators)
4. Implement proper state management (React Context or Redux)
5. Mock API calls with placeholder data (provide simulated loading states)
6. Include at least one interactive element (e.g., clicking on a quest card shows details)
7. Include proper error handling and loading states

## API Specification

Mock the following API endpoints using hardcoded data (you can find the data from the current website):

- `GET /api/campaign` - Returns campaign details
- `GET /api/rewards` - Returns available rewards
- `GET /api/quests` - Returns available quests
- `GET /api/progress` - Returns user's campaign progress

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

````bash
git clone https://github.com/harshvardhan614/superboard-harshvardhan.git
cd frontend

**Installation**

Install the project dependencies using npm:

```bash
npm install
````

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

**Code Quality Tools Setup**

This project uses Husky, lint-staged, and Prettier to maintain code quality and consistent formatting. Here's how to set them up:

1. **Install Dependencies**

```bash
# Install Prettier
npm install --save-dev prettier

# Install Husky and lint-staged
npm install --save-dev husky lint-staged
```

2. **Initialize Husky**

```bash
# Initialize Husky
npx husky install
```

3. **Configure Prettier**

Create a `.prettierrc` file in the root directory:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

4. **Configure lint-staged**

Add the following to your `package.json`:

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "**/*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

5. **Add Husky Pre-commit Hook**

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

Now, whenever you commit changes, Husky will automatically run Prettier and ESLint on your staged files to ensure consistent code formatting and quality.

You can also manually format your code using:

```bash
npm run format
```
