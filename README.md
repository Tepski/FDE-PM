# DT Monitoring

## Project Description
DT Monitoring is a web application designed to help monitor and manage various operational aspects, including downtime tracking, annual data overviews, Kanban task management, maintenance scheduling, and spare parts inventory. Built with Next.js, it provides a comprehensive platform for operational oversight.

## Features
-   **Downtime Management:** Track and analyze operational downtimes.
-   **Annual Data Overview:** View and manage annual operational data.
-   **Kanban Board:** A visual board for task and workflow management.
-   **Maintenance Scheduling:** Plan and monitor equipment maintenance.
-   **Spare Parts Inventory:** Manage and track spare parts.

## Technologies Used
-   **Framework:** Next.js (16.0.1)
-   **UI Library:** React (19.2.0)
-   **Styling:**
    -   Material UI (`@mui/material`, `@mui/x-date-pickers`, `@mui/x-date-pickers-pro`)
    -   Tailwind CSS (`tailwindcss`, `@tailwindplus/elements`)
-   **Date Management:** Day.js (`dayjs`)
-   **Icons:** Lucide React (`lucide-react`)
-   **Database:** PostgreSQL (`pg`)
-   **Language:** TypeScript

## Getting Started

### Prerequisites
-   Node.js (LTS version recommended)
-   npm or Yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/dtmonitoring.git
    cd dtmonitoring
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server
To start the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production
To build the application for production:
```bash
npm run build
# or
yarn build
```
This command generates the `out` directory with the production-ready static files (if using `next export`) or optimized Next.js build.

### Exporting Static Site (if applicable)
If you intend to export a static HTML site:
```bash
npm run export
# or
yarn export
```

## Project Structure

```
.
├── app/                  # Main application pages and routes
│   ├── annual/           # Annual data management module
│   ├── downtime/         # Downtime tracking module
│   ├── kanban/           # Kanban board module
│   ├── maintenance/      # Maintenance scheduling module
│   └── spare/            # Spare parts inventory module
├── components/           # Reusable UI components
│   ├── ui/               # UI specific components (Dropdown, Modal)
├── public/               # Static assets
├── utils/                # Utility functions and helpers
│   ├── database.tsx      # Database connection and queries
│   └── items.tsx         # Item-related utilities
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # This file
├── tsconfig.json         # TypeScript configuration
└── global.d.ts           # Global type declarations
```

## Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
