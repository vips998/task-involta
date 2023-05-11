FROM task-involta

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node","App.js"]