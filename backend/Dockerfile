FROM node:24-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency files
COPY package.json ./
# Copy application code
COPY . ./

# Install dependencies
RUN pnpm install

# Expose port
EXPOSE 4000

# Start the application (will be overridden by docker-compose command)
CMD ["pnpm", "run", "dev"]
