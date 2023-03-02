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

