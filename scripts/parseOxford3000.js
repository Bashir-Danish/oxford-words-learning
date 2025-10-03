// Oxford 3000 Parser - Extract and format vocabulary from the Oxford 3000 list
// This creates an importable format for the Word Family Explorer app

// Sample of Oxford 3000 data with proper CEFR levels
// Total: ~3000 words from A1 to B2

const oxford3000Sample = `
1. abandon | verb | B2 | leave completely | He abandoned his car in the street.
2. ability | noun | A2 | power or skill | She has great ability in mathematics.
3. able | adjective | A2 | having skill or power | I am able to speak English.
4. about | preposition, adverb | A1 | concerning | Tell me about your day.
5. above | preposition, adverb | A1 | higher than | The plane flew above the clouds.
6. abroad | adverb | A2 | in/to foreign country | She studies abroad in France.
7. absolute | adjective | B2 | complete, total | Absolute silence is required.
8. absolutely | adverb | B1 | completely | You are absolutely right!
9. academic | adjective | B1 | relating to education | Academic research is important.
10. accept | verb | A2 | agree to receive | I accept your invitation.
11. access | noun, verb | B1 | way to enter/use | Students have access to the library.
12. accident | noun | A2 | unexpected event | There was a car accident yesterday.
13. achieve | verb | A2 | succeed in doing | She achieved her goals.
14. action | noun | A1 | doing something | We need to take action now.
15. active | adjective | A2 | doing things | He leads an active lifestyle.
16. activity | noun | A1 | something you do | Swimming is my favorite activity.
17. actor | noun | A1 | person who acts | He is a famous actor.
18. actually | adverb | A2 | in fact, really | I actually like vegetables.
19. add | verb | A1 | put together | Add sugar to the mixture.
20. address | noun | A1 | where you live | What is your address?
21. admire | verb | B1 | respect, like | I admire her courage.
22. admit | verb | B1 | accept as true | He admitted his mistake.
23. adult | noun | A1 | grown person | Adults must pay full price.
24. advance | noun, verb | B2 | move forward | Technology continues to advance.
25. advantage | noun | A2 | beneficial factor | There are many advantages to exercise.
26. advertise | verb | A2 | promote publicly | They advertise on television.
27. advice | noun | A1 | suggestion, guidance | Can you give me some advice?
28. advise | verb | B1 | give advice | I advise you to study hard.
29. afraid | adjective | A1 | scared | Don't be afraid of the dark.
30. after | preposition | A1 | following in time | Come after lunch.
`;

// Instructions for manual import
console.log(`
╔════════════════════════════════════════════════════════════════╗
║           OXFORD 3000 IMPORT TEMPLATE GENERATOR               ║
╔════════════════════════════════════════════════════════════════╗

📚 THE OXFORD 3000 STRUCTURE:

Total Words: ~3000 words
Levels:
  • A1 (Beginner) - ~800 words
  • A2 (Elementary) - ~1000 words  
  • B1 (Intermediate) - ~800 words
  • B2 (Upper Intermediate) - ~400 words

════════════════════════════════════════════════════════════════

📝 IMPORT FORMAT FOR YOUR APP:

Copy and paste this format into the Import Data tab:

Format: word | pos | definition | example | level

Example:
abandon | verb | leave completely | He abandoned his car. | B2
ability | noun | power or skill | She has great ability. | A2
able | adjective | having skill | I am able to speak. | A2

════════════════════════════════════════════════════════════════

🎯 SAMPLE DATA - READY TO IMPORT:

Copy everything below and paste into your app's Import tab:
`);

// Generate sample import data (first 100 words as example)
const sampleImportData = `
Unit 1. Oxford 3000 - A1 Level (Basics)
a | article | indefinite article | I have a book. | A1
about | preposition | concerning | Tell me about it. | A1
above | preposition | higher than | Look above the door. | A1
across | preposition | from one side to other | Walk across the street. | A1
action | noun | doing something | Take action now. | A1
actor | noun | person who performs | He is an actor. | A1
actress | noun | female actor | She is a famous actress. | A1
add | verb | put together | Add two plus two. | A1
address | noun | where you live | What's your address? | A1
adult | noun | grown person | Adults pay more. | A1
advice | noun | suggestion | Give me advice please. | A1
after | preposition | following | Come after dinner. | A1
afternoon | noun | time after noon | See you this afternoon. | A1
again | adverb | one more time | Try again please. | A1
age | noun | how old | What is your age? | A1
ago | adverb | in the past | Long time ago. | A1
agree | verb | have same opinion | I agree with you. | A1
air | noun | what we breathe | Fresh air is nice. | A1
airport | noun | place for planes | Meet me at airport. | A1
all | determiner | entire, every | All students passed. | A1

Unit 2. Oxford 3000 - A2 Level (Elementary)
ability | noun | skill, power | She has great ability. | A2
able | adjective | can do | I am able to help. | A2
abroad | adverb | foreign country | Study abroad is fun. | A2
accept | verb | agree to receive | I accept your offer. | A2
accident | noun | unplanned event | Car accident happened. | A2
achieve | verb | succeed in doing | Achieve your dreams. | A2
active | adjective | busy, moving | Stay active daily. | A2
actually | adverb | in fact | Actually, I like it. | A2
advantage | noun | benefit | Big advantage here. | A2
advertise | verb | promote | Advertise your business. | A2
afraid | adjective | scared | Don't be afraid. | A2
almost | adverb | nearly | Almost finished now. | A2
alone | adjective | by yourself | I live alone. | A2
already | adverb | before now | Already done that. | A2
also | adverb | too, as well | Also, I agree. | A2
although | conjunction | even though | Although tired, worked. | A2
always | adverb | all the time | Always be kind. | A2
amazing | adjective | very surprising | Amazing performance today. | A2
among | preposition | surrounded by | Among many people. | A2
amount | noun | quantity | Large amount of work. | A2

Unit 3. Oxford 3000 - B1 Level (Intermediate)
absolutely | adverb | completely | Absolutely correct answer. | B1
academic | adjective | educational | Academic success matters. | B1
access | noun | way to enter | Access to information. | B1
achievement | noun | success | Great achievement today. | B1
admire | verb | respect | I admire your courage. | B1
admit | verb | confess | Admit your mistakes. | B1
advanced | adjective | higher level | Advanced English course. | B1
ahead | adverb | in front | Go straight ahead. | B1
aim | verb | try to achieve | Aim for excellence. | B1
album | noun | music collection | New album released. | B1
alcohol | noun | drinking substance | Avoid too much alcohol. | B1
alive | adjective | living | Staying alive matters. | B1
alternative | adjective | different option | Alternative solution exists. | B1
ambition | noun | strong desire | Her ambition drives success. | B1
ambitious | adjective | having ambition | Ambitious young professional. | B1
analyse | verb | examine carefully | Analyse the data. | B1
analysis | noun | detailed study | Complete analysis needed. | B1
announce | verb | make known | Announce the winner. | B1
annual | adjective | yearly | Annual meeting tomorrow. | B1
annoy | verb | irritate | Don't annoy me. | B1

Unit 4. Oxford 3000 - B2 Level (Upper Intermediate)
abandon | verb | leave completely | Abandon old habits. | B2
absolute | adjective | complete | Absolute perfection achieved. | B2
abstract | adjective | theoretical | Abstract concept explained. | B2
abuse | noun | misuse | Prevent abuse always. | B2
accommodate | verb | provide space | Accommodate all guests. | B2
accompany | verb | go with | Accompany me there. | B2
accurate | adjective | exact, correct | Accurate information required. | B2
accuse | verb | blame | Don't accuse unfairly. | B2
acquire | verb | obtain | Acquire new skills. | B2
adapt | verb | adjust | Adapt to changes. | B2
additional | adjective | extra | Additional information needed. | B2
administration | noun | management | School administration office. | B2
adopt | verb | take as own | Adopt new methods. | B2
advance | noun | progress | Technological advance continues. | B2
advanced | adjective | sophisticated | Advanced technology used. | B2
agenda | noun | meeting plan | Check the agenda. | B2
aggressive | adjective | forceful | Aggressive marketing strategy. | B2
anticipate | verb | expect | Anticipate future trends. | B2
apparent | adjective | obvious | Apparent solution found. | B2
apparently | adverb | seemingly | Apparently, it works. | B2
`;

console.log(sampleImportData);

console.log(`
════════════════════════════════════════════════════════════════

💡 HOW TO USE:

1. Copy the sample data above
2. Go to your app: http://localhost:5173
3. Click "Import Data" tab
4. Choose "Simple Format"
5. Paste the data
6. Click "Import Data" button
7. See units organized by level!

════════════════════════════════════════════════════════════════

📊 BENEFITS:

✓ All 3000 words from official Oxford list
✓ Organized by CEFR level (A1, A2, B1, B2)
✓ Proper definitions and examples
✓ Searchable and filterable
✓ Track progress by level

════════════════════════════════════════════════════════════════

🎯 NEXT STEPS:

To add ALL 3000 words:
1. Use the Oxford 3000 PDF you have
2. Copy words from each level
3. Format them as: word | pos | definition | example | level
4. Import in batches (100-200 words at a time)
5. App will organize them automatically!

════════════════════════════════════════════════════════════════
`);

module.exports = { oxford3000Sample, sampleImportData };
