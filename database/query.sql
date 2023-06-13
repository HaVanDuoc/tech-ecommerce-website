USE TECH;

-- Get users
select
    users.id,
    userId,
    firstName,
    middleName,
    lastName,
    email,
    avatar,
    statuses.name,
    tbl_SumPayment.sumPayment
from
    users
    left join statuses on statuses.statusId = users.statusId
    left join roles on roles.roleId = users.roleId
    left join (
        select
            order_details.user_id,
            sum(total) as sumPayment
        from
            order_details
        group by
            user_id
    ) tbl_SumPayment on tbl_SumPayment.user_id = users.id
order by
    users.createdAt desc
limit
    10 offset 0;

--
-- 
update
    products
set
    view = view + 1
where
    id > -1
    and name = "Lenovo Yoga Tab 11";

-- 
-- 
update
    products
set
    view = view + 1
where
    id = 8;

-- 
select
    count(*) as couter
from
    cart_items
    left join cart_sessions on cart_sessions.id = cart_items.cart_session_id
where
    user_id = 26;

-- 
select
    count(*) as amount_order
from
    order_details
    left join order_statuses on order_statuses.id = order_details.status_id
where
    order_details.user_id = 26
    and order_statuses.status = "Chờ xác nhận";

-- GET ALL USER
-- server\src\services\adminService.js
SELECT
    users.id,
    userId,
    firstName,
    middleName,
    lastName,
    userName,
    email,
    avatar,
    dateOfBirth,
    transactionVolume,
    statuses.name as 'status',
    roles.name as "role"
FROM
    users
    left join statuses on users.statusId = statuses.statusId
    left join roles on users.roleId = roles.roleId;

-- GET USER
SELECT
    users.id,
    userId,
    firstName,
    middleName,
    lastName,
    userName,
    email,
    password,
    avatar,
    dateOfBirth,
    phoneNumber,
    address,
    transactionVolume,
    genders.name as 'gender',
    statuses.name as 'status',
    roles.name as "role"
FROM
    users
    left join statuses on users.statusId = statuses.statusId
    left join roles on users.roleId = roles.roleId
    left join genders on users.genderCode = genders.code
WhERE
    userId = "U00000001"
LIMIT
    1;

-- Get List Product
SELECT
    products.id,
    products.productId,
    products.name,
    products.image,
    products.price,
    products.rating,
    products.stock,
    products.isActive,
    categories.name as 'category',
    brands.name as 'brand'
FROM
    products
    LEFT JOIN categories on products.categoryId = categories.categoryId
    LEFT JOIN brands on products.brandId = brands.brandId
Where
    products.productId = "P00000001"
LIMIT
    1;

-- 
-- Select current user
-- 
select
    users.userId,
    users.firstName,
    users.middleName,
    users.lastName,
    users.userName,
    users.email,
    genders.name as 'gender',
    users.avatar,
    users.phoneNumber,
    users.address,
    users.transactionVolume,
    users.dateOfBirth
from
    users
    left join genders on genders.code = users.genderCode
where
    users.userId = 'U00000001'
limit
    1;

-- get latest products
select
    products.id,
    products.name,
    products.image,
    products.price,
    products.rating,
    products.stock,
    products.discount,
    products.isActive,
    categories.name as "category"
from
    products
    left join categories on categories.categoryId = products.categoryId
order by
    products.createdAt desc
limit
    20;

-- Count all products điện thoại
select
    count(*) as 'count'
from
    products
    left join categories on categories.categoryId = products.categoryId
where
    categories.name = "Điện thoại";

-- get cart
select
    products.id,
    products.name,
    products.image,
    products.price,
    products.discount
from
    cart_items
    left join products on products.id = cart_items.product_id
where
    cart_items.cart_session_id = 3;

-- 
select
    order_details.id,
    order_details.code,
    order_details.total,
    order_statuses.status,
    order_details.createdAt
from
    order_details
    left join order_statuses on order_statuses.id = order_details.status_id
    left join order_items on order_items.order_detail_id = order_details.id
where
    order_details.user_id = 26
    and order_statuses.status = "Đã hủy"
group by
    order_details.id
order by
    order_details.createdAt asc;

-- 
select
    order_items.id,
    order_items.quantity,
    order_items.product_id,
    products.productId,
    products.name as 'name_product',
    products.image,
    products.price,
    products.discount,
    order_items.createdAt
from
    order_items
    left join products on products.id = order_items.product_id
where
    order_items.order_detail_id = 8;

-- 
select
    order_statuses.status
from
    order_details
    left join order_statuses on order_statuses.id = order_details.status_id
where
    order_details.id = 10;

-- 
SELECT
    products.id,
    products.name,
    products.price,
    products.discount,
    product.image
FROM
    products
Where
    name LIKE "${key}%";

-- 
select
    *
from
    searches
    left join (
        select
            products.id,
            products.name,
            products.price,
            products.discount,
            products.image,
            categories.link as 'categoryLink'
        from
            products
            left join categories on categories.categoryId = products.categoryId
    ) as temp on temp.id = searches.product_id
order by
    searches.createdAt desc
limit
    6;

-- 
select
    order_details.user_id as 'user_id',
    users.userId,
    users.firstName,
    users.middleName,
    users.lastName,
    users.email,
    users.phoneNumber,
    users.address,
    users.dateOfBirth,
    users.genderCode,
    order_details.id as 'order_id',
    order_details.total,
    order_statuses.status as 'order_status',
    order_details.code as 'code_order',
    order_details.createdAt
from
    order_details
    left join users on order_details.user_id = users.id
    left join order_statuses on order_details.status_id = order_statuses.id
where
    code = '1d6afae1-5794-488e-b9e0-657317ae89cb';

--
select
    order_items.order_detail_id,
    table_2.id as 'product_id',
    table_2.name as 'name_product',
    order_items.quantity,
    order_items.createdAt as 'createdAt_order',
    table_2.image,
    table_2.price,
    table_2.discount,
    table_2.category
from
    order_items
    left join (
        select
            products.id,
            products.name,
            products.image,
            products.price,
            products.discount,
            categories.name as 'category'
        from
            products
            left join categories on categories.categoryId = products.categoryId
    ) table_2 on table_2.id = order_items.product_id
where
    order_detail_id = 8;

-- 
select
    table_orders.id as 'order_id',
    table_orders.code as 'order_code',
    table_orders.total,
    table_orders.order_status,
    table_orders.order_status_id,
    table_orders.user_id,
    table_users.userId,
    table_users.firstName,
    table_users.middleName,
    table_users.lastName,
    table_users.email,
    table_users.phoneNumber,
    table_users.address,
    table_users.dateOfBirth,
    table_users.gender,
    table_orders.createdAt
from
    (
        SELECT
            order_details.id,
            order_details.code,
            order_details.user_id as 'user_id',
            order_details.total,
            order_details.status_id as 'order_status_id',
            order_statuses.status as 'order_status',
            order_details.createdAt
        FROM
            order_details
            left join order_statuses on order_statuses.id = order_details.status_id
        where
            code = '1d6afae1-5794-488e-b9e0-657317ae89cb'
    ) as table_orders
    left join (
        SELECT
            users.id,
            users.userId,
            users.firstName,
            users.middleName,
            users.lastName,
            users.dateOfBirth,
            genders.name as 'gender',
            users.email,
            users.phoneNumber,
            users.address
        FROM
            users
            left join genders on genders.code = users.genderCode
    ) as table_users on table_orders.user_id = table_users.id;

-- 
select
    order_items.id as 'order_items_id',
    order_details.total as 'total_money',
    products.price as 'price_product',
    products.discount as 'discount_product'
from
    order_items
    left join products on products.id = order_items.product_id
    left join order_details on order_details.id = order_items.order_detail_id
where
    order_items.id = 13;