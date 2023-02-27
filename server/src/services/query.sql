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
    left join brands on products.brandId = brands.brandId