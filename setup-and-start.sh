#!/bin/bash
# setup-and-start.sh
# Project setup & start script

set -e  # Exit on any error

echo ""
echo "Setting up OR starting containerized project"
echo ""

echo "=== Initial Checks Running ==="
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "Please run this script from the project's root directory"
    echo ""
    echo "=== Exited Setup Script Early ==="
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker is not running. Please start Docker and run this script again."
    echo ""
    echo "=== Exited Setup Script Early ==="
    echo ""
    exit 1
fi

# # Clean up existing containers if requested (check for any containers, not just running ones)
# EXISTING_CONTAINERS=$(docker compose ps --services 2>/dev/null)
# if [ -n "$EXISTING_CONTAINERS" ]; then
#     echo "Found existing container(s) for this project:"
#     echo "$EXISTING_CONTAINERS"
#     read -p "Do you want to clean up the old dev containers & use new ones? (y/N): " -n 1 -r
#     echo ""
#     if [[ $REPLY =~ ^[Yy]$ ]]; then
#         echo ""
#         echo "Shutting down any existing development containers & networks"
#         docker compose down --remove-orphans 2>/dev/null || true
#         echo ""
#     fi
# else
#     echo "No existing containers found for this project"
#     echo ""
# fi

# Check for .env file in root
if [ -f ".env" ]; then
    echo "Root environment file found"
    echo ""
    ROOT_NOT_SETUP=false
else
    echo "Root environment file not found, will create one using .env.example"
    echo ""
    ROOT_NOT_SETUP=true
fi

if [ -d "frontend/node_modules" ]; then
    echo "Frontend seems setup, continuing script"
    echo ""
    FRONTEND_NOT_SETUP=false
else
    echo "Frontend dependencies missing, will install dependencies"
    echo ""
    FRONTEND_NOT_SETUP=true
fi

# Check if backend is setup
if [ -f "backend/.env" ] && [ -d "backend/vendor" ] && [ -d "backend/node_modules" ]; then
    echo "Backend seems setup, continuing script"
    echo ""
    BACKEND_NOT_SETUP=false
else
    if [ ! -f "backend/.env" ]; then
        echo "Backend environment file not found, will create one using .env.example"
        echo ""
    fi
    if [ ! -d "backend/vendor" ] || [ ! -d "backend/node_modules" ]; then
        echo "Backend dependencies missing, will install dependencies"
        echo ""
    fi
    BACKEND_NOT_SETUP=true
fi
echo "=== Initial Checks Complete ==="
echo ""

# Frontend setup if needed
if [ "$FRONTEND_NOT_SETUP" = true ]; then
    echo ""
    echo "=== Setting up frontend ==="
    echo ""
    
    # Navigate to frontend directory
    if [ ! -d "frontend" ]; then
        echo "ERROR: Frontend directory not found!"
        exit 1
    fi
    
    cd frontend
    
    # # Copy frontend .env file
    # if [ ! -f ".env" ]; then
    #     echo "Setting up frontend environment file"
    #     if [ -f ".env.example" ]; then
    #         if cp .env.example .env 2>/dev/null; then
    #             echo "Frontend .env file created successfully"
    #         else
    #             echo "ERROR: Failed to copy .env.example to .env"
    #             exit 1
    #         fi
    #     else
    #         echo "WARNING: No frontend .env.example found, please create .env manually"
    #     fi
    # fi

    # Install frontend packages
    if [ ! -d "node_modules" ]; then
        echo ""
        echo "Installing frontend packages"
        echo ""

    # Install npm dependencies
    if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
        echo "Running npm install"
        if ! docker run --rm \
            -v "$PWD":/app \
            -w /app \
            node sh -c "npm install && chown -R $(id -u):$(id -g) node_modules package-lock.json"; then
            echo "ERROR: npm install failed"
            exit 1
        fi
    fi

        
        echo "Frontend package installation complete!"
    fi
    
    # Navigate back to root
    cd ..
    
    echo ""
    echo "=== Frontend setup complete ==="
    echo ""
fi

# Backend setup if needed
if [ "$BACKEND_NOT_SETUP" = true ]; then
    echo ""
    echo "=== Setting up backend ==="
    echo ""
    
    # Navigate to backend directory
    if [ ! -d "backend" ]; then
        echo "ERROR: Backend directory not found!"
        exit 1
    fi
    
    cd backend
    
    # Copy backend .env file
    if [ ! -f ".env" ]; then
        echo "Setting up backend environment file"
        if [ -f ".env.example" ]; then
            if cp .env.example .env 2>/dev/null; then
                echo "Backend .env file created successfully"
            else
                echo "ERROR: Failed to copy .env.example to .env"
                exit 1
            fi
        else
            echo "WARNING: No backend .env.example found, please create .env manually"
        fi
    fi

    # Install backend packages
    if [ ! -d "vendor" ] || [ ! -d "node_modules" ]; then
        echo ""
        echo "Installing backend packages"
        echo ""
        
    # Install composer dependencies
    if [ -f "composer.json" ] && [ ! -d "vendor" ]; then
        echo "Running composer install"
        if ! docker run --rm \
            -v "$PWD":/app \
            -w /app \
            --user "$(id -u):$(id -g)" \
            composer:2.7 install; then
            echo "ERROR: composer install failed"
            exit 1
        fi
    fi

    # Install npm dependencies
    if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
        echo "Running npm install"
        if ! docker run --rm \
            -v "$PWD":/app \
            -w /app \
            node sh -c "npm install && chown -R $(id -u):$(id -g) node_modules package-lock.json"; then
            echo "ERROR: npm install failed"
            exit 1
        fi
    fi

        
        echo "Backend package installation complete!"
    fi
    
    # Navigate back to root
    cd ..
    
    echo ""
    echo "=== Backend setup complete ==="
    echo ""
fi

# Build and start all services
echo ""
echo "=== Project Setup Running ==="
echo ""

# Copy root .env.example contents to .env if there is no .env file in the root directory
if [ "$ROOT_NOT_SETUP" = true ]; then
    echo "Setting up root environment file"
    if [ -f ".env.example" ]; then
        if cp .env.example .env 2>/dev/null; then
            echo "Root .env file created successfully"
        else
            echo "ERROR: Failed to copy .env.example to .env"
            exit 1
        fi
    else
        echo "WARNING: No root .env.example found, please create .env manually"
    fi    
    echo ""
fi

# Start containers
if [ "$ROOT_NOT_SETUP" = true ] || [ "$BACKEND_NOT_SETUP" = true ] || [ "$FRONTEND_NOT_SETUP" = true ]; then
    echo "Running docker compose up --build -d"
    echo ""
    if ! docker compose up --build -d; then
        echo "ERROR: Failed to start containers with build"
        exit 1
    fi
else
    echo "Running docker compose up -d"
    echo ""
    if ! docker compose up -d; then
        echo "ERROR: Failed to start containers"
        exit 1
    fi
fi

# List service ports
echo ""
echo ""
echo ""
echo "=== Service ports ==="
echo ""
echo "Frontend should be available at: http://localhost:5173"
echo "Backend should be available at: http://localhost:80"
echo "PHPMyAdmin should be available at: http://localhost:8080"
echo ""
# if command -v curl >/dev/null 2>&1; then
#     sleep 3
#     curl -s http://localhost:5173 >/dev/null && echo "✓ Frontend is responding" || echo "✗ Frontend not responding yet give it a moment"
#     curl -s http://localhost:80 >/dev/null && echo "✓ Backend is responding" || echo "✗ Backend not responding yet give it a moment"
#     curl -s http://localhost:8080 >/dev/null && echo "✓ PHPMyAdmin is responding" || echo "✗ PHPMyAdmin not responding yet give it a moment"
# fi

echo ""
echo "=== Script Has Finished ==="
echo ""
