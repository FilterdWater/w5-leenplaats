#!/bin/bash
# stop-and-cleanup.sh
# Script to shutdown dev environment

set -e  # Exit on any error

echo ""
echo "=== Running Stop & Cleanup Script ==="
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "Please run this script from the project's root directory"
    echo ""
    echo "=== Exited Stop Script Early ==="
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker is not running. Please start Docker and run this script again."
    echo ""
    echo "=== Exited Stop Script Early ==="
    echo ""
    exit 1
fi

# Check if any containers are actually running
# RUNNING_CONTAINERS=$(docker compose ps --services --filter "status=running" 2>/dev/null)
# if [ -z "$RUNNING_CONTAINERS" ]; then
#     echo "No containers are currently running for this project."
#     echo ""
#     read -p "Do you still want to see cleanup options? (y/N): " -n 1 -r
#     echo ""
#     if [[ ! $REPLY =~ ^[Yy]$ ]]; then
#         echo "Exiting..."
#         exit 0
#     fi
# fi

# Option selection
echo ""
echo "=== Cleanup Options ==="
echo ""
echo "  [1] Stop containers"
echo "  [2] Remove containers and networks"
echo "  [3] Remove containers, networks and images"
echo "  [4] Remove everything: containers, networks, images AND volumes"
echo ""
read -p "Choose option (1-4) or press Enter to cancel: " choice
echo ""

# Options and logic
case $choice in
    1)
        echo ""
        echo "Stopping containers..."
        echo ""
        if docker compose stop; then
            echo ""
            echo "✓ Containers stopped successfully"
        else
            echo "✗ Failed to stop containers"
            exit 1
        fi
        echo ""
        ;;
    2)
        echo ""
        echo "Removing containers and networks"
        echo ""
        if docker compose down --remove-orphans; then
            echo ""
            echo "✓ Containers and networks removed successfully"
        else
            echo "✗ Failed to remove containers and networks"
            exit 1
        fi
        echo ""
        ;;
    3)
        echo ""
        echo "Removing containers, networks and images"
        echo ""
        if docker compose down --rmi all --remove-orphans; then
            echo ""
            echo "✓ Containers, networks and images removed successfully"
        else
            echo "✗ Failed to remove containers and images"
            exit 1
        fi
        echo ""
        ;;
    4)
        echo ""
        echo "=== WARNING: Complete Project Destruction ==="
        echo ""
        echo "This will delete everything Docker related to the project:"
        echo "- All containers"
        echo "- All networks" 
        echo "- All images"
        echo "- All volumes"
        echo ""
        read -p "Are you sure? Type 'DELETE' to confirm: " confirm
        if [ "$confirm" = "DELETE" ]; then
            echo ""
            echo "Removing everything"
            echo ""
            if docker compose down --rmi all --volumes --remove-orphans; then
                echo ""
                echo "✓ Everything removed"
            else
                echo "✗ Failed to remove everything"
                exit 1
            fi
        else
            echo ""
            echo "✓ Cancelled - nothing was removed"
        fi
        echo ""
        ;;
    "")
        echo ""
        echo "✓ Cancelled - no action taken"
        echo ""
        ;;
    *)
        echo ""
        echo "✗ Invalid option selected"
        echo ""
        exit 1
        ;;
esac

echo ""
echo "=== Script Has Finished ==="
echo ""