# Stage 1: Base Development Image
FROM node:18-alpine AS development
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=5000
ENV NODE_ENV=development
EXPOSE 5000
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Stage 2: Install Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

# Stage 3: Build Application
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install

# Stage 4: Production Image
FROM node:18-alpine AS production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=5000
ENV NODE_ENV=production
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app .
USER node
EXPOSE 5000
CMD ["node", "src/index.js"]
