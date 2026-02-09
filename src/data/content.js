
export const content = {
  modules: [
    {
      id: 'puberty',
      title: 'My Changing Body',
      description: 'Understanding puberty and the changes you are going through.',
      icon: 'Sparkles', // Lucide icon name
      color: 'bg-purple-100',
      lessons: [
        {
          id: 'puberty-1',
          title: 'What is Puberty?',
          type: 'youtube', // Changed from 'video' to 'youtube'
          duration: '3 min',
          videoId: 'gv21b3ZpSLg', // 'Always Changing and Growing Up - Girls Puberty Education'
          content: `Puberty is a special time when you grow from being a child into an adult. It usually happens between ages 8 and 13, but everyone is different! It starts when your brain sends signals to your body to make hormones.

Key Changes You Might See:
• You will grow taller and your body shape will change (hips widening).
• Breasts will start to develop.
• Hair will grow in new places (underarms, legs, and private parts).
• Your skin might get oily and you might get pimples (acne).
• You might start to sweat more.

Remember: All these changes are normal and healthy!`
        },
        {
          id: 'puberty-2',
          title: 'Physical Changes & Feelings',
          type: 'reading',
          duration: '5 min',
          content: `It's not just your body that changes—your feelings do too!

Emotional Changes:
• Mood Swings: You might feel happy one minute and sad or angry the next. This is due to hormones.
• Sensitivity: You might feel more sensitive about what people say.
• New Feelings: You might start having crushes or new feelings about others.

Dealing with Body Odor:
Because you sweat more, it's important to:
• Bath or shower every day.
• Use deodorant if you want to.
• Wear clean clothes.

Skin Care:
If you get pimples, wash your face twice a day with gentle soap. Don't pop them!`
        },
        {
          id: 'puberty-3',
          title: 'Breast Development',
          type: 'reading',
          duration: '4 min',
          content: `One of the first signs of puberty is breast development.

What to expect:
• It starts with "buds" or small lumps under the nipple. This can be tender or sore.
• One breast might grow faster than the other. This is totally normal! They usually even out over time.
• Breasts come in all shapes and sizes. There is no "perfect" size.

Do I need a bra?
You can start wearing a "training bra" whenever you feel ready or if you need support for sports. Talk to your parent/guardian about getting your first bra.`
        },
        {
          id: 'puberty-4',
          title: 'Body Hair & Shaving',
          type: 'reading',
          duration: '4 min',
          content: `Hair will start to grow under your arms and around your private parts (pubic hair). It might also get darker on your legs.

Do I have to shave?
NO. Body hair is natural and protects the skin.
• Some girls choose to shave, and some do not. It is your choice.
• If you decide to shave, ask an adult to show you how to do it safely to avoid cuts.
• Never share razors with anyone, as this can spread germs.`
        },
        {
          id: 'puberty-5',
          title: 'Nutrition for Growth',
          type: 'reading',
          duration: '5 min',
          content: `Your body is growing fast right now (the "growth spurt"), so it needs extra fuel!

Super Foods for Growing Girls:
• Iron: Spinach, beans, and meat. You need this because of your period.
• Calcium: Milk, yogurt, and leafy greens help build strong bones.
• Water: Drink plenty of water to keep your skin clear and your energy up.

Try to eat less sugary snacks and more fruits and vegetables.`
        }
      ],
      quiz: {
        id: 'quiz-puberty',
        questions: [
          {
            question: "Puberty connects childhood to...",
            options: ["Old age", "Adulthood", "Infancy"],
            correct: 1
          },
          {
            question: "What causes mood swings during puberty?",
            options: ["Eating too much", "Hormones", "Growing taller"],
            correct: 1
          },
          {
            question: "Is it normal for one breast to grow faster?",
            options: ["Yes, very normal", "No, see a doctor"],
            correct: 0
          }
        ]
      }
    },
    {
      id: 'hygiene',
      title: 'Menstrual Health',
      description: 'Everything you need to know about periods and hygiene.',
      icon: 'Droplet',
      color: 'bg-red-100',
      lessons: [
        {
          id: 'hygiene-1',
          title: 'Why do we have periods?',
          type: 'reading',
          duration: '4 min',
          content: `A period is when blood comes out through the vagina. It is a sign that your body is healthy and capable of having children one day.

• It happens about once a month (every 28 days on average).
• It usually lasts 3 to 7 days.
• The blood is actually the lining of your uterus shedding because there was no baby.

Premenstrual Syndrome (PMS):
Before your period, you might feel bloating, cramps, or moodiness. This is PMS and it goes away once your period starts.`
        },
        {
          id: 'hygiene-2',
          title: 'Using Pads Safely',
          type: 'youtube', // Changed type
          duration: '5 min',
          videoId: 'rA61duNIPjw', // 'Tampons vs. Pads vs. Menstrual Cups vs. Period Underwear'
          content: `Change your pad every 4-6 hours to stay clean and prevent infection. Wash your hands before and after changing.`
        },
        {
          id: 'hygiene-3',
          title: 'Tracking Your Cycle',
          type: 'reading',
          duration: '3 min',
          content: `It is helpful to know when your period is coming so you can be prepared.
          
How to Track:
Mark the FIRST day of bleeding on a calendar. Count the days until the next time you bleed. This is your cycle length.
Average cycle is 28 days, but 21-35 days is also normal.

Keep a "Period Kit" in your bag:
• Make sure to have 1-2 spare pads.
• Clean underwear.
• Pain relief if needed (ask an adult).`
        },
        {
          id: 'hygiene-4',
          title: 'Managing Period Pain',
          type: 'reading',
          duration: '4 min',
          content: `Cramps (pain in the lower tummy) are common during periods.

Tips to feel better:
• Warmth: Put a hot water bottle on your tummy.
• Hydrate: Drink warm water or herbal tea.
• Move: Gentle walking or stretching can actually help!
• Rest: getting good sleep is important.

If the pain is very bad and stops you from going to school, tell a parent or doctor.`
        },
        {
          id: 'hygiene-5',
          title: 'Myths vs Facts',
          type: 'reading',
          duration: '3 min',
          content: `There are many false stories about periods. Let's bust them!

MYTH: You shouldn't wash your hair during your period.
FACT: False! A warm bath or shower helps you feel clean and relaxes muscles.

MYTH: Period blood is "dirty" blood.
FACT: False. It is just blood and tissue. It is not dirty or bad.

MYTH: You cannot play sports.
FACT: False! You can run, jump, and play. Exercise helps cramps!`
        },
        {
          id: 'hygiene-6',
          title: 'Infections & When to see a Doctor',
          type: 'reading',
          duration: '4 min',
          content: `It is important to keep your private parts clean to avoid infection.

Warning Signs:
• Bad smell that doesn't go away after washing.
• Itching or burning when you pee.
• Strange color discharge (green or yellow).

Prevention:
• Wipe from FRONT to BACK after using the toilet.
• Wear cotton underwear.
• Don't use strong soaps inside your vagina (it cleans itself!). Wash only the outside with water.`
        }
      ],
      quiz: {
        id: 'quiz-hygiene',
        questions: [
          {
            question: "How often should you change a pad?",
            options: ["Every 2 days", "Every 4-6 hours", "Only at night"],
            correct: 1
          },
          {
            question: "Where should you put used pads?",
            options: ["In the toilet", "In the bin", "Under the bed"],
            correct: 1
          },
          {
            question: "Is period blood dirty?",
            options: ["Yes, very", "No, it's natural"],
            correct: 1
          }
        ]
      }
    },
    {
      id: 'safety',
      title: 'Staying Safe',
      description: 'Knowing your rights, safe touches, and saying no.',
      icon: 'Shield',
      color: 'bg-blue-100',
      lessons: [
        {
          id: 'safety-1',
          title: 'My Body, My Rules',
          type: 'youtube', // Updated to video
          videoId: 'zNTUMNKSNwk', // Protect Yourself Rules - Safe Touch / Unsafe Touch
          duration: '6 min',
          content: `Your body belongs to YOU. You are the boss of your body.

Safe Touch (Good Touch):
• Makes you feel happy, loved, and safe.
• Examples: A high-five, holding hands with a friend, a hug from parents (if you want it).

Unsafe Touch (Bad Touch):
• Makes you feel scared, uncomfortable, hurt, or confused.
• Any touch on your private parts (areas covered by a swimsuit) is UNSAFE unless it is a doctor or parent helping with health/hygiene.
• Being asked to keep a "secret" about a touch is a big warning sign.

The Rule: NO, GO, TELL
1. Say NO loudly.
2. GO away from the person.
3. TELL a trusted adult (parent, teacher) immediately. Keep telling until someone listens.`
        },
        {
          id: 'safety-2',
          title: 'Internet Safety',
          type: 'youtube', // Updated to video
          videoId: 'y6XunxJMcaE', // Keeping Kids Safe on the Internet
          duration: '5 min',
          content: `The internet is great for learning, but we must be careful.

Rules for Online Safety:
• Never share your address, school, or phone number with strangers.
• People online might not be who they say they are.
• Never send photos of your body to anyone. Once a photo is sent, you cannot get it back.
• If someone says something mean or weird online, BLOCK them and tell an adult.`
        },
        {
          id: 'safety-3',
          title: 'Bullying',
          type: 'reading',
          duration: '4 min',
          content: `Bullying is when someone is mean to you on purpose, over and over.

Types of Bullying:
• Physical: Hitting or pushing.
• Verbal: Teasing or calling names.
• Social: Leaving someone out or spreading rumors.

What to do:
• Do not fight back.
• Walk away and stay calm.
• Talk to a teacher or parent. You are not a "tattle-tale" for reporting bullying—you are brave.`
        },
        {
          id: 'safety-4',
          title: 'Who are Trusted Adults?',
          type: 'reading',
          duration: '3 min',
          content: `A trusted adult is someone who listens to you and helps keep you safe.

Examples:
• Parents or Grandparents
• Teachers
• Doctors or Nurses
• Aunts or Uncles

If you have a problem, tell one of these people. If the first person doesn't help, tell another one. Keep telling until you get help.`
        },
        {
          id: 'safety-5',
          title: 'Safe Places',
          type: 'reading',
          duration: '3 min',
          content: `Knowing where to go when you feel unsafe is important.
          
Safe Places in your Community:
• School
• A neighbor you trust
• A library or clinic

If you are lost or scared:
• Look for a police officer or security guard.
• Go into a shop and ask for help.
• Don't go with strangers who offer you a ride.`
        }
      ],
      quiz: {
        id: 'quiz-safety',
        questions: [
          {
            question: "Who is the boss of your body?",
            options: ["Your friends", "You", "Strangers"],
            correct: 1
          },
          {
            question: "What should you do if a touch feels unsafe?",
            options: ["Keep it a secret", "Say NO, Run, and Tell an adult", "Ignore it"],
            correct: 1
          },
          {
            question: "Is it okay to share your address online?",
            options: ["Yes, with everyone", "No, never"],
            correct: 1
          }
        ]
      }
    },
    {
      id: 'mind',
      title: 'Healthy Mind',
      description: 'Handling emotions, confidence, and stress.',
      icon: 'Smile',
      color: 'bg-yellow-100',
      lessons: [
        {
          id: 'mind-1',
          title: 'Understanding Emotions',
          type: 'youtube', // Updated to video
          videoId: 'Cce6vAX8FW0', // How To MASTER Your Emotions
          duration: '4 min',
          content: `It is normal to feel like an emotional roller coaster during puberty!

• It is okay to feel sad, angry, or anxious.
• Emotions are like clouds—they come and go.

Tips for a Healthy Mind:
1. Talk about it: Share your feelings with a friend or trusted adult.
2. Sleep well: Your growing brain needs rest.
3. Move your body: Exercise releases "happy hormones."
4. Be kind to yourself: Don't compare yourself to others on social media. You are unique and special.`
        },
        {
          id: 'mind-2',
          title: 'Building Confidence',
          type: 'reading',
          duration: '3 min',
          content: `Self-esteem is how much you like yourself.

How to boost confidence:
• Focus on what you are good at (drawing, sports, being a good friend).
• Stand tall and speak clearly.
• Help others—it makes you feel good too!
• Practice "Positive Self-Talk". Instead of saying "I can't do this," say "I will try my best."`
        },
        {
          id: 'mind-3',
          title: 'Body Image',
          type: 'reading',
          duration: '5 min',
          content: `Body image is how you see your own physical appearance.

Remember:
• Bodies come in all shapes, sizes, and colors. All are beautiful.
• Photos on social media (Instagram/TikTok) are often "filtered" or fake. Do not compare yourself to them.
• Focus on what your body CAN DO (run, dance, hug, think), not just how it looks.`
        },
        {
          id: 'mind-4',
          title: 'Handling Peer Pressure',
          type: 'reading',
          duration: '4 min',
          content: `Peer pressure is when friends try to make you do something you don't want to do.

Types of Pressure:
• "Everyone else is doing it."
• "Don't be scared/boring."

How to say NO:
• Say it like you mean it: "No, I don't want to."
• Make an excuse: "My mom will be mad."
• Suggest something else: "Let's go play basketball instead."

True friends will respect your "No".`
        },
        {
          id: 'mind-5',
          title: 'Stress Busters',
          type: 'reading',
          duration: '3 min',
          content: `School and friends can sometimes be stressful.

Quick ways to calm down:
1. Deep Breathing: Breathe in for 4 seconds, hold for 4, breathe out for 4.
2. The "5-4-3-2-1" Game: Look around and name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.
3. Draw or write in a journal.`
        }
      ],
      quiz: {
        id: 'quiz-mind',
        questions: [
          {
            question: "Is it normal to feel sad sometimes?",
            options: ["No, never", "Yes, it is okay", "Only babies cry"],
            correct: 1
          },
          {
            question: "What should you do if friends pressure you?",
            options: ["Do it to fit in", "Say No and stick to it", "Hide from them"],
            correct: 1
          },
          {
            question: "How can you calm down quickly?",
            options: ["Yell loudly", "Deep breathing", "Run away"],
            correct: 1
          }
        ]
      }
    }
  ]
};
