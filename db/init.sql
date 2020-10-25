
-- CREATE TABLE shipData (
--   shipKey varchar(1000) NOT NULL,
--   shipItem varchar(8000) NOT NULL,
--   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (shipKey)
-- );

CREATE TABLE spaceData (
  id varchar(255) NOT NULL,
  spaceItem varchar(8000) NOT NULL,
  fetchAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
