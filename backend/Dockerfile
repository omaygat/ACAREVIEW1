# Imagen base
FROM node:22-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
