# involta-task
Тестовый стенд involta (frontend)
-----------------------------------------------------------------
Реализовано:
1. Сформирован шаблон для редактора editor.js, на первом месте закреплен блок параграфа, на втором блок изображения
2. Собран контейнер docker'a, состоящий из 1-го image. (frontend-image)
3. Фронт развернут на порте `http://localhost:3000`
4. Можно добавлять новые блоки: List, Header, Embed, SimpleImage
5. Добавлена возможность добавлять и перемещать любые блоки.
6. Первые два блока зафиксированы их нельзя перемещать и добавлять между ними новый блок.
------------------------------------------------------------------
Использовано:
1. Основа - React.js
2. Сам editor.js и его составные части
------------------------------------------------------------------
Чтобы запустить:
1. Прописать в терминале `git clone https://github.com/vips998/task-involta.git`
2. Перейти в корень папки, прописать `docker build -t frontend-image .`
3. В корне папки, прописать `docker-compose up`
4. Перейти по адресу **localhost:3000**
5. Для проверки работоспособности добавьте новый блок под первыми двумя
6. Чтобы завершить работу, пропишите в терминале `docker-compose down`
