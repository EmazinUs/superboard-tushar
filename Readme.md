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

```bash
git clone https://github.com/your-username/superboard-ui.git
cd frontend

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.