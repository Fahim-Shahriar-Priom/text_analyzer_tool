# text_analyzer_tool
make changes to env to connect to your database 
create table 

CREATE TABLE `text_analyzer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `created_by` VARCHAR(45) NOT NULL DEFAULT 'admin',
  `create_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


run text command 
npm test -- --detectOpenHandles

run the project
pm2 start / node index.js 
