create database Alianbot;
use Alianbot;
create table Members (
	ID int not null auto_increment,
    UserName varchar(25) not null,
    NickName varchar(25),
    PassWd password not null,
    primary key(ID),
	unique(UserName)
);
create table Commands(
	ID int not null auto_increment,
	AddedBy varchar(25),
	KeyWord varchar(25) not null,
	Response varchar(50) not null,
	primary key(ID),
	foreign key(AddedBy)references Members(UserName)
);
create table Votes(
	ID int not null auto_increment,
	LaunchedBy varchar(25),
	Topic varchar(30) not null,
	Options  not null,
	primary key(ID),
	foreign key(LaunchedBy)references Member(UserName)
);
create table Songs(
	ID int not null auto_increment,
	OrderedBy varchar(25),
	RequestTO url not null,
	PlayStatus varchar(10),
	primary key(ID),
	foreign key(OrderedBy)references Member(UserName)
)