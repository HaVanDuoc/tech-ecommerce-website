
-- Query get all user
SELECT
    users.id,
    userId,
    firstName,
    middleName,
    lastName,
    email,
    isAdmin,
    statuses.name as 'status',
    roles.name as "role"
FROM
    tech.users
    left join tech.statuses on users.statusId = statuses.statusId
    left join tech.roles on users.roleId = roles.roleId