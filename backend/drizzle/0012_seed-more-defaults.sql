-- Custom SQL migration file, put your code below! --

BEGIN;

-- Insert the World Champion. We should always have one.
INSERT INTO awards (name, description, league_id) 
SELECT 'World Champion', 'The champion of the league', l.id 
FROM leagues l
WHERE l.name = 'FHL'
AND NOT EXISTS (
    SELECT 1 FROM awards a 
    WHERE a.name = 'World Champion' AND a.league_id = l.id
);

commit;