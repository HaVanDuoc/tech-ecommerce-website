-- GET ALL USER
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

-- Get List Products
select
    products.id,
    products.productId,
    products.name,
    products.image,
    products.price,
    products.stock,
    products.rating,
    products.isActive,
    products.categoryId as 'category',
    products.brandId as 'brand'
from
    products
    left join categories on products.categoryId = categories.categoryId
    left join brands on products.brandId = brands.brandId;

-- Get product
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
-- 
select
    id,
    categoryId,
    name,
    link,
    accessTime
from
    categories
order by
    accessTime;

-- 
-- 
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
WHERE
    categories.name = "Điện thoại";

-- 
-- 
-- 
select
    categorybrands.id,
    categorybrands.categoryId,
    categorybrands.brandId,
    categories.name as 'nameCategory',
    brands.name as 'nameBrand'
from
    categorybrands
    left join categories on categorybrands.categoryId = categories.id
    left join brands on categorybrands.brandId = brands.id
where
    categorybrands.categoryId = "9";