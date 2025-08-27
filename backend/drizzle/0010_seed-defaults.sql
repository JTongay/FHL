-- Custom SQL migration file, put your code below! --

-- Add FHL League always
BEGIN;
-- This is the default league for the FHL application
INSERT INTO leagues (name) values ('FHL');

commit;