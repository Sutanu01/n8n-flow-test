FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_SUPPORT_TICKETS_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_SUPPORT_TICKETS_URL=${VITE_SUPPORT_TICKETS_URL}

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
