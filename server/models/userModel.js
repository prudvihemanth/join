const userTable = `create table if not exists user(
    id int primary key auto_increment,
    name varchar(255)not null,
    email varchar(255)not null,
    role enum('police','owner') default 'police',
    active tinyint(1) not null default 0
)`;

module.exports = userTable;
