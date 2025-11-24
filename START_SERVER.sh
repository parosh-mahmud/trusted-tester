#!/bin/bash

# Trusted Tester - HTTP Server Startup Script
# This script starts a local web server for testing

echo "🚀 Starting Trusted Tester HTTP Server..."
echo ""
echo "The tool REQUIRES an HTTP server to work properly."
echo "Opening browser at http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Try to open browser automatically
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000 &
elif command -v open &> /dev/null; then
    open http://localhost:8000 &
elif command -v start &> /dev/null; then
    start http://localhost:8000 &
fi

# Start Python HTTP server
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Error: Python is not installed"
    echo ""
    echo "Install Python or use an alternative:"
    echo "  • VS Code: Install 'Live Server' extension"
    echo "  • Node.js: Run 'npx http-server'"
    exit 1
fi
