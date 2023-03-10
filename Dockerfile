# STEP 1: Build
# FROM node:10 as builder

# LABEL authors="cipchk <cipchk@qq.com>"

# COPY package.json package-lock.json ./

# RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
# RUN npm i && mkdir /ng-alain && cp -R ./node_modules ./ng-alain

# WORKDIR /ng-alain

# COPY . .

# RUN npm run build

# STEP 2: Setup
FROM nginx:alpine

COPY _nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /ng-alain/_nginx/ssl/* /etc/nginx/ssl/

RUN rm -rf /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]
