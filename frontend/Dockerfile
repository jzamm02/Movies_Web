# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

#CMD ["sh", "-c", "npm run test && npm run test:e2e && npm run dev"]

