const theftTable = `create table if not exists theft(
    id int primary key auto_increment,
    title varchar(255)not null,
    description varchar(255)not null,
    location varchar(255)not null,
    reportedDate date,
    theftDate date,
    ownerId int NOT NULL,
    policeId int NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES user(id),
    FOREIGN KEY (policeId) REFERENCES user(id),
    active tinyint(1) not null default 0
)`;

module.exports = theftTable;
