# CLI sequelize

> Creating the first Model (and Migration)

npx sequelize-cli model:generate --name Gender --attributes firstName:string,lastName:string,email:string

> Running migrations Sequelize

npx sequelize-cli db:migrate --name create-role.js
npx sequelize-cli db:migrate --name create-status.js
npx sequelize-cli db:migrate --name create-gender.js
npx sequelize-cli db:migrate --name create-user.js
npx sequelize-cli db:migrate --name create-category.js
npx sequelize-cli db:migrate --name create-manufacturer.js
npx sequelize-cli db:migrate --name create-feature.js
npx sequelize-cli db:migrate --name create-specification.js
npx sequelize-cli db:migrate --name create-product.js

> Undoing Migrations

npx sequelize-cli db:migrate:undo --name create-user.js
npx sequelize-cli db:migrate:undo --name create-role.js
npx sequelize-cli db:migrate:undo --name create-status.js
npx sequelize-cli db:migrate:undo --name create-gender.js
npx sequelize-cli db:migrate:undo --name create-product.js
npx sequelize-cli db:migrate:undo --name create-manufacturer.js
npx sequelize-cli db:migrate:undo --name create-feature.js
npx sequelize-cli db:migrate:undo --name create-specification.js
npx sequelize-cli db:migrate:undo --name create-category.js

> Creating the Seed

npx sequelize-cli seed:generate --name gender

> Running Seeds

npx sequelize-cli db:seed:all

> Undoing Seeds

npx sequelize-cli db:seed:undo:all

> Migration Skeleton

npx sequelize-cli migration:generate --name add-foreign-key-gender