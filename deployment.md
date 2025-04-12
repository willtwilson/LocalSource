---
description: Build and deployment guide for LocalSource application
globs: ["*.md", "docs/**/*.md"]
alwaysApply: true
---

# LocalSource Build Guide

- **Prerequisites**
  - Node.js 20.x or later
  - npm 9.x or later
  - Tailscale installed and configured
  - Supabase account and project
  - PM2 (for development)

- **Environment Setup**
  ```bash
  # ✅ DO: Clone and setup environment
  git clone <repository-url>
  cd LocalSource
  cp .env.example .env

  # ❌ DON'T: Commit .env file or sensitive credentials
  git add .env
  ```

  - Configure `.env`:
  ```env
  # ✅ DO: Use proper environment variable names
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  TS_AUTHKEY=your_tailscale_authkey

  # ❌ DON'T: Use hardcoded values or expose sensitive data
  SUPABASE_URL=https://example.supabase.co
  ```

- **Development Setup**
  ```bash
  # ✅ DO: Use proper installation commands
  npm install
  sudo pm2 start npm --name "localsource" -- run dev

  # ✅ DO: Monitor application
  pm2 logs localsource
  pm2 monit

  # ✅ DO: Clean shutdown
  pm2 stop localsource
  ```

- **Production Build**
  ```bash
  # ✅ DO: Build and verify
  npm run build
  npm run preview
  ```

- **Docker Deployment (Future)**
  - Development environment with hot-reload
  - Production environment with nginx
  - Test environment for CI/CD
  - See [Task #8](mdc:tasks/tasks.json) for Docker migration details

- **Automated Maintenance**
  - Docker Cleanup (Weekly)
    ```bash
    # ✅ DO: Regular cleanup
    docker system prune -af --volumes
    docker image prune -a
    ```
  - Log Management
    ```bash
    # ✅ DO: Proper log rotation
    logrotate /etc/logrotate.d/localsource
    ```
  - System Health Monitoring
    ```bash
    # ✅ DO: Monitor system resources
    df -h | awk '{ if($5 > "80%") print $0 }'
    free -m | awk '/Mem:/ {print "Memory usage: " $3/$2 * 100 "%"}'
    ```

- **Troubleshooting**
  ```bash
  # ✅ DO: Fix common permission issues
  sudo usermod -aG docker $USER
  sudo chown -R $USER:$USER ~/.pm2

  # ✅ DO: Clean node_modules properly
  rm -rf node_modules
  npm cache clean --force
  npm install
  ```

- **Log Locations**
  - Application: `~/.pm2/logs/`
  - Build: `./logs/build/`
  - System: `/var/log/`

- **Support Resources**
  - [Documentation](mdc:docs/README.md)
  - [Issue Tracker](mdc:CONTRIBUTING.md)
  - [Development Team](mdc:TEAM.md)

- **Contributing**
  ```bash
  # ✅ DO: Follow proper branch workflow
  git checkout -b feature/your-feature
  npm test
  git push origin feature/your-feature
  ```

See [dev_workflow.mdc](mdc:.cursor/rules/dev_workflow.mdc) for task-driven development process.

## License

[License details here] 