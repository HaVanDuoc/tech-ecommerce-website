# CLI sequelize

> Running migrations Sequelize

npx sequelize-cli db:migrate --name create-role.js
npx sequelize-cli db:migrate --name create-user.js
npx sequelize-cli db:migrate --name create-category.js
npx sequelize-cli db:migrate --name create-manufacturer.js
npx sequelize-cli db:migrate --name create-feature.js
npx sequelize-cli db:migrate --name create-specification.js
npx sequelize-cli db:migrate --name create-product.js

> Undoing Migrations

npx sequelize-cli db:migrate:undo --name create-user.js
npx sequelize-cli db:migrate:undo --name create-role.js
npx sequelize-cli db:migrate:undo --name create-product.js
npx sequelize-cli db:migrate:undo --name create-manufacturer.js
npx sequelize-cli db:migrate:undo --name create-feature.js
npx sequelize-cli db:migrate:undo --name create-specification.js
npx sequelize-cli db:migrate:undo --name create-category.js

> Creating the Seed

npx sequelize-cli seed:generate --name role
npx sequelize-cli seed:generate --name category

> Running Seeds

npx sequelize-cli db:seed:all

> Undoing Seeds

npx sequelize-cli db:seed:undo:all
