-- Query get all user
-- server\src\services\adminService.js
SELECT
    users.id,
    userId,
    firstName,
    middleName,
    lastName,
    email,
    avatar,
    transactionVolume,
    isAdmin,
    statuses.name as 'status',
    roles.name as "role"
FROM
    users
    left join statuses on users.statusId = statuses.statusId
    left join roles on users.roleId = roles.roleId