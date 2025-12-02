# BlogSphere Admin Dashboard

Professional admin dashboard for content management built with React, TypeScript, and Vite.

## Features

- **Dashboard** - Statistics and overview
- **Content Management** - Posts, Categories, and Series management
- **System Management** - Users and Roles management
- **Responsive Design** - Mobile-friendly interface
- **Dark Theme** - Professional dark UI
- **Real-time Updates** - Live data synchronization

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/blogsphere-ui.git
   cd blogsphere-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_APP_NAME=BlogSphere
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
blogsphere-ui/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   ├── modules/
│   │   │   ├── categories/
│   │   │   ├── posts/
│   │   │   ├── series/
│   │   │   ├── users/
│   │   │   └── roles/
│   │   └── dashboard/
│   │       └── Dashboard.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Categories.tsx
│   │   ├── Posts.tsx
│   │   ├── Series.tsx
│   │   ├── Users.tsx
│   │   ├── Roles.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── categories.ts
│   │   ├── posts.ts
│   │   ├── series.ts
│   │   ├── users.ts
│   │   └── roles.ts
│   ├── store/
│   │   └── appStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

| Variable            | Description          |
| ------------------- | -------------------- |
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_APP_NAME`     | Application name     |

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready to be deployed to any static hosting service.

## License

MIT
