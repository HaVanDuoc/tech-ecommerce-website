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

-- 
-- 
-- 
select
    brands.name,
    brands.logo,
    brands.link
from
    categorybrands
    left join brands on brands.id = categorybrands.brandId
    left join categories on categories.id = categorybrands.categoryId
where
    categories.name = "Điện thoại";

-- 
-- 
-- 
select
    brands.id,
    brands.brandId,
    brands.name
from
    categorybrands
    left join categories on categorybrands.categoryId = categories.id
    left join brands on categorybrands.brandId = brands.id
where
    categorybrands.categoryId = "9";

-- 
select
    *
from
    (
        select
            users.id as 'user_id',
            users.avatar,
            users.firstName,
            users.middleName,
            users.lastName,
            rtrim(
                ltrim(
                    CONCAT(
                        IFNULL(users.firstName, ''),
                        ' ',
                        IFNULL(users.middleName, ''),
                        ' ',
                        users.lastName
                    )
                )
            ) as fullName,
            users.phoneNumber,
            users.address,
            users.dateOfBirth,
            genders.name as 'gender'
        from
            users
            left join genders on genders.code = users.genderCode
    ) as u
where
    u.phoneNumber like N'% %'
    or u.fullName like N'%Văn%';

-- 
SELECT
    users.id,
    users.userId,
    users.avatar,
    rtrim(
        ltrim(
            concat(
                ifnull(users.firstName, ''),
                ' ',
                ifnull(users.middleName, ''),
                ' ',
                users.lastName
            )
        )
    ) as fullName,
    users.dateOfBirth,
    genders.name as 'gender',
    users.email,
    users.phoneNumber,
    users.address
FROM
    users
    left join genders on genders.code = users.genderCode
where
    users.id = 26