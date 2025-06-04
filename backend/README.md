## 🚀 Backend Setup Guide

The backend uses [Laravel Sail](https://laravel.com/docs/sail), a light-weight command-line interface for interacting with Laravel's default Docker development environment. You only need Docker installed to get started. If you're unfamiliar with Sail, check out the [Sail documentation](https://laravel.com/docs/sail) for more details.

---

### ✅ Prerequisites

-   [Git](https://git-scm.com/)
-   [Node.js](https://github.com/nvm-sh/nvm)
-   [Composer](https://laravel.com/docs/#installing-php)
-   [Docker](https://www.docker.com/)

---

### 📄 Clone the repository

```bash
git clone <repository-url>
cd qxote-input-app-V2
```

### 📦 Install packages

Run the `install-packages.sh` script if you have Docker running

Or alternatively install the packages using your host machine

```bash
npm install
composer install
```

### ⚙️ Copy the environment file

```bash
cp .env.example .env
```

### 🐳 Start Laravel Sail

```bash
./vendor/bin/sail up -d
```

_Using `-d` runs Sail in detached mode so your terminal remains free._

### 🔑 Generate the application key

```bash
./vendor/bin/sail artisan key:generate
```

### 🗃️ Run database migrations

```bash
./vendor/bin/sail artisan migrate
```

### 👷‍♂️ Start Vite

```bash
./vendor/bin/sail npm run dev
```

### ⛔ Stop Sail (when you're done working)

```bash
./vendor/bin/sail down
```

_This stops and removes the Sail containers but preserves volumes (like your database data)._

---

### ✨ Formatting

Before commiting code, remember to run [Prettier](https://prettier.io/) and [Pint](https://laravel.com/docs/12.x/pint)

```bash
./vendor/bin/pint
```
