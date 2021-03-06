BEGIN;

TRUNCATE
  "word",
  "language",
  "user";


INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    --password: pass
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  ),
  (
    2,
    'Nick',
    'Nick',
    --password: nick
    '$2a$12$th63jKgIvG4RTu9sKu4HC.DXd.wtO1CLpgW5/OHgPcySGuVfwAise'
    
  ),
  (
    3,
    'Rahim',
    'Rahim',
    '$2a$12$Vq6tqdp5a1FVg52RXV.tAuMdsAlLaN0kYh7cMUhq3v3VLBjg4s9Vm'

  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Spanish', 1), (2, 'Spanish', 2), (3, 'Spanish', 3);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'escritorio',	'desk', 2),
  (2, 1, 'lavaplatos',	'dishwasher', 3),
  (3, 1, 'la iglesia',	'church', 4),
  (4, 1, 'lapanadería',	'bakery', 5),
  (5, 1, 'matemáticas',	'math', 6),
  (6, 1, 'escuela',	'school', 7),
  (7, 1, 'manta',	'blanket', 8),
  (8, 1, 'la camisa',	'shirt', 9),
  (9, 1, 'la cabra',	'goat', 10),
  (10, 1, 'la charca',	'pond', 11),
  (11, 1, 'la colina',	'hill', 12),
  (12, 1, 'el caballo',	'horse', 13),
  (13, 1, 'cascada',	'waterfall', 14),
  (14, 1, 'la montaña',	'mountain', null);


UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
