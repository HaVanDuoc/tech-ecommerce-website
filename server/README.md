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

> Running seeds Sequelize

npx sequelize-cli seed:generate --name category

npx sequelize-cli db:seed:all

> Undo 1 migration

npx sequelize-cli db:migrate:undo --name create-user.js
