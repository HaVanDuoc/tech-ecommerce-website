# CLI sequelize

> Creating the first Model (and Migration)

npx sequelize-cli model:generate --name Gender --attributes firstName:string,lastName:string,email:string

> Running migrations Sequelize

npx sequelize-cli db:migrate --name create-role.js
npx sequelize-cli db:migrate --name create-status.js
npx sequelize-cli db:migrate --name create-gender.js
npx sequelize-cli db:migrate --name create-user.js
npx sequelize-cli db:migrate --name create-category.js
npx sequelize-cli db:migrate --name create-brand.js
npx sequelize-cli db:migrate --name create-feature.js
npx sequelize-cli db:migrate --name create-specification.js
npx sequelize-cli db:migrate --name create-product.js

<!-- cart run after model users -->

npx sequelize-cli db:migrate --name create-cart_session.js
npx sequelize-cli db:migrate --name create-cart_item.js

<!-- order -->

npx sequelize-cli db:migrate --name create-order_status.js
npx sequelize-cli db:seed --seed order_status.js
npx sequelize-cli db:migrate --name create-order_detail.js
npx sequelize-cli db:migrate --name create-order_item.js

<!-- search -->
npx sequelize-cli db:migrate --name create-search.js

> Undoing Migrations

npx sequelize-cli db:migrate:undo --name create-user.js
npx sequelize-cli db:migrate:undo --name create-role.js
npx sequelize-cli db:migrate:undo --name create-status.js
npx sequelize-cli db:migrate:undo --name create-gender.js
npx sequelize-cli db:migrate:undo --name create-product.js
npx sequelize-cli db:migrate:undo --name create-brand.js
npx sequelize-cli db:migrate:undo --name create-feature.js
npx sequelize-cli db:migrate:undo --name create-specification.js
npx sequelize-cli db:migrate:undo --name create-category.js

> Creating the Seed

npx sequelize-cli seed:generate --name gender
npx sequelize-cli seed:generate --name category
npx sequelize-cli seed:generate --name brand

> Running Seeds

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed ratinglevel.js

> Undoing Seeds

npx sequelize-cli db:seed:undo:all

> Migration Skeleton

npx sequelize-cli migration:generate --name add-column-users
