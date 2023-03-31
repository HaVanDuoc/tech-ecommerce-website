USE TECH;

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