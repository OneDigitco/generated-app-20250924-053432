# Clarity

A visually stunning, minimalist to-do list application focused on simplicity and clarity.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/OneDigitco/generated-app-20250924-053432)

Clarity is a visually stunning, minimalist to-do list application designed for focus and simplicity. It provides a clean, clutter-free interface where users can effortlessly manage their daily tasks. Core functionalities include adding, editing, deleting, and marking tasks as complete. The application prioritizes an exceptional user experience through smooth animations, intuitive controls, and a serene visual design. All tasks are persisted in the browser's local storage, ensuring data is saved between sessions without requiring a backend. The UI is built with a mobile-first approach, scaling beautifully from handheld devices to large desktop screens.

## Key Features

- **Task Management:** Add, edit, delete, and mark tasks as complete.
- **Data Persistence:** Tasks are automatically saved to your browser's local storage.
- **Filtering:** View all, active, or completed tasks.
- **Stunning UI:** A clean, minimalist design with smooth animations and a beautiful dark mode.
- **Responsive Design:** Flawless experience on desktop, tablets, and mobile devices.
- **Keyboard Accessible:** Fully navigable using a keyboard.

## Technology Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Persistence:** LocalStorage API
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/clarity_todo_list.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd clarity_todo_list
    ```
3.  Install the dependencies:
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) with your browser to see the result.

## Usage

- **Add a task:** Type your task into the input field at the top and press `Enter` or click the add button.
- **Complete a task:** Click the checkbox next to a task to mark it as complete. The task text will be struck through.
- **Edit a task:** Hover over a task and click the edit icon. Modify the text and press `Enter` to save.
- **Delete a task:** Hover over a task and click the delete icon. A confirmation dialog will appear.
- **Filter tasks:** Use the "All", "Active", and "Completed" buttons at the bottom to filter your task list.

## Deployment

This project is optimized for deployment on the Cloudflare Pages platform.

To deploy your application, run the build command and then the deploy command:

```bash
# Build the application for production
bun run build

# Deploy to Cloudflare
bun run deploy
```

This will trigger the Wrangler CLI to build and deploy your application. You will be prompted to log in to your Cloudflare account if you haven't already.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/OneDigitco/generated-app-20250924-053432)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.