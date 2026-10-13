FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies using the lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application source
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

EXPOSE 3000

RUN npm install -g serve
CMD ["serve", "out", "-l", "3000"]

