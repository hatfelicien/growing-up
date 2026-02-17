-- Create users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create modules table
CREATE TABLE modules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  lessons JSONB DEFAULT '[]'::jsonb,
  quiz JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user
INSERT INTO users (username, password) VALUES ('admin', 'password123');

-- Insert modules with lessons
INSERT INTO modules (id, title, description, icon, color, lessons, quiz) VALUES
('puberty', 'My Changing Body', 'Understanding puberty and the changes you are going through.', 'Sparkles', 'bg-purple-100', 
'[{"id":"puberty-1","title":"What is Puberty?","type":"youtube","duration":"3 min","videoId":"gv21b3ZpSLg","content":"Puberty is a special time when you grow from being a child into an adult. It usually happens between ages 8 and 13, but everyone is different! It starts when your brain sends signals to your body to make hormones.\n\nKey Changes You Might See:\n• You will grow taller and your body shape will change (hips widening).\n• Breasts will start to develop.\n• Hair will grow in new places (underarms, legs, and private parts).\n• Your skin might get oily and you might get pimples (acne).\n• You might start to sweat more.\n\nRemember: All these changes are normal and healthy!"},{"id":"puberty-2","title":"Physical Changes & Feelings","type":"reading","duration":"5 min","content":"It''s not just your body that changes—your feelings do too!\n\nEmotional Changes:\n• Mood Swings: You might feel happy one minute and sad or angry the next. This is due to hormones.\n• Sensitivity: You might feel more sensitive about what people say.\n• New Feelings: You might start having crushes or new feelings about others.\n\nDealing with Body Odor:\nBecause you sweat more, it''s important to:\n• Bath or shower every day.\n• Use deodorant if you want to.\n• Wear clean clothes.\n\nSkin Care:\nIf you get pimples, wash your face twice a day with gentle soap. Don''t pop them!"},{"id":"puberty-3","title":"Breast Development","type":"reading","duration":"4 min","content":"One of the first signs of puberty is breast development.\n\nWhat to expect:\n• It starts with \"buds\" or small lumps under the nipple. This can be tender or sore.\n• One breast might grow faster than the other. This is totally normal! They usually even out over time.\n• Breasts come in all shapes and sizes. There is no \"perfect\" size.\n\nDo I need a bra?\nYou can start wearing a \"training bra\" whenever you feel ready or if you need support for sports. Talk to your parent/guardian about getting your first bra."},{"id":"puberty-4","title":"Body Hair & Shaving","type":"reading","duration":"4 min","content":"Hair will start to grow under your arms and around your private parts (pubic hair). It might also get darker on your legs.\n\nDo I have to shave?\nNO. Body hair is natural and protects the skin.\n• Some girls choose to shave, and some do not. It is your choice.\n• If you decide to shave, ask an adult to show you how to do it safely to avoid cuts.\n• Never share razors with anyone, as this can spread germs."},{"id":"puberty-5","title":"Nutrition for Growth","type":"reading","duration":"5 min","content":"Your body is growing fast right now (the \"growth spurt\"), so it needs extra fuel!\n\nSuper Foods for Growing Girls:\n• Iron: Spinach, beans, and meat. You need this because of your period.\n• Calcium: Milk, yogurt, and leafy greens help build strong bones.\n• Water: Drink plenty of water to keep your skin clear and your energy up.\n\nTry to eat less sugary snacks and more fruits and vegetables."}]'::jsonb,
'{"id":"quiz-puberty","questions":[{"question":"Puberty connects childhood to...","options":["Old age","Adulthood","Infancy"],"correct":1},{"question":"What causes mood swings during puberty?","options":["Eating too much","Hormones","Growing taller"],"correct":1},{"question":"Is it normal for one breast to grow faster?","options":["Yes, very normal","No, see a doctor"],"correct":0}]}'::jsonb),

('hygiene', 'Menstrual Health', 'Everything you need to know about periods and hygiene.', 'Droplet', 'bg-red-100',
'[{"id":"hygiene-1","title":"Why do we have periods?","type":"reading","duration":"4 min","content":"A period is when blood comes out through the vagina. It is a sign that your body is healthy and capable of having children one day.\n\n• It happens about once a month (every 28 days on average).\n• It usually lasts 3 to 7 days.\n• The blood is actually the lining of your uterus shedding because there was no baby.\n\nPremenstrual Syndrome (PMS):\nBefore your period, you might feel bloating, cramps, or moodiness. This is PMS and it goes away once your period starts."},{"id":"hygiene-2","title":"Using Pads Safely","type":"youtube","duration":"5 min","videoId":"rA61duNIPjw","content":"Change your pad every 4-6 hours to stay clean and prevent infection. Wash your hands before and after changing."}]'::jsonb,
'{"id":"quiz-hygiene","questions":[{"question":"How often should you change a pad?","options":["Every 2 days","Every 4-6 hours","Only at night"],"correct":1},{"question":"Where should you put used pads?","options":["In the toilet","In the bin","Under the bed"],"correct":1},{"question":"Is period blood dirty?","options":["Yes, very","No, it''s natural"],"correct":1}]}'::jsonb),

('safety', 'Staying Safe', 'Knowing your rights, safe touches, and saying no.', 'Shield', 'bg-blue-100',
'[{"id":"safety-1","title":"My Body, My Rules","type":"youtube","videoId":"zNTUMNKSNwk","duration":"6 min","content":"Your body belongs to YOU. You are the boss of your body.\n\nSafe Touch (Good Touch):\n• Makes you feel happy, loved, and safe.\n• Examples: A high-five, holding hands with a friend, a hug from parents (if you want it).\n\nUnsafe Touch (Bad Touch):\n• Makes you feel scared, uncomfortable, hurt, or confused.\n• Any touch on your private parts (areas covered by a swimsuit) is UNSAFE unless it is a doctor or parent helping with health/hygiene.\n• Being asked to keep a \"secret\" about a touch is a big warning sign.\n\nThe Rule: NO, GO, TELL\n1. Say NO loudly.\n2. GO away from the person.\n3. TELL a trusted adult (parent, teacher) immediately. Keep telling until someone listens."}]'::jsonb,
'{"id":"quiz-safety","questions":[{"question":"Who is the boss of your body?","options":["Your friends","You","Strangers"],"correct":1},{"question":"What should you do if a touch feels unsafe?","options":["Keep it a secret","Say NO, Run, and Tell an adult","Ignore it"],"correct":1},{"question":"Is it okay to share your address online?","options":["Yes, with everyone","No, never"],"correct":1}]}'::jsonb),

('mind', 'Healthy Mind', 'Handling emotions, confidence, and stress.', 'Smile', 'bg-yellow-100',
'[{"id":"mind-1","title":"Understanding Emotions","type":"youtube","videoId":"Cce6vAX8FW0","duration":"4 min","content":"It is normal to feel like an emotional roller coaster during puberty!\n\n• It is okay to feel sad, angry, or anxious.\n• Emotions are like clouds—they come and go.\n\nTips for a Healthy Mind:\n1. Talk about it: Share your feelings with a friend or trusted adult.\n2. Sleep well: Your growing brain needs rest.\n3. Move your body: Exercise releases \"happy hormones.\"\n4. Be kind to yourself: Don''t compare yourself to others on social media. You are unique and special."}]'::jsonb,
'{"id":"quiz-mind","questions":[{"question":"Is it normal to feel sad sometimes?","options":["No, never","Yes, it is okay","Only babies cry"],"correct":1},{"question":"What should you do if friends pressure you?","options":["Do it to fit in","Say No and stick to it","Hide from them"],"correct":1},{"question":"How can you calm down quickly?","options":["Yell loudly","Deep breathing","Run away"],"correct":1}]}'::jsonb);
