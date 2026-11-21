DELETE FROM gear_affix
WHERE id IN (
  SELECT id FROM gear_item
  WHERE name in ('Headhunter', 'Squire')
)