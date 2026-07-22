# ---------- BUILD ----------
FROM node:22-bullseye-slim AS builder

WORKDIR /app

# 1. Copy package files และติดตั้ง dependencies ทั้งหมดก่อน
COPY package*.json ./
RUN npm ci

# 2. Copy prisma schema และทำการ generate client เพื่อ cache ขั้นตอนนี้ไว้
COPY prisma ./prisma/
RUN npx prisma generate

# 3. Copy source code ทั้งหมดและ build project
COPY . .
RUN npm run build

# 4. ลบ devDependencies ออกเพื่อลดขนาด node_modules ก่อนย้ายไป production stage
RUN npm prune --production


# ---------- PRODUCTION ----------
FROM node:22-bullseye-slim

# กำหนด NODE_ENV เพื่อให้ runtime (NestJS/Express) รันในโหมด optimize
ENV NODE_ENV=production

WORKDIR /app

# Copy production node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma
# กำหนดสิทธิ์โฟลเดอร์ให้เป็นของ node user
RUN chown -R node:node /app

# สลับไปใช้ node user เพื่อความปลอดภัย
USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]
