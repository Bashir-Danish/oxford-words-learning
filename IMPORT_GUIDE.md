# 📥 Quick Import Guide - Oxford Word Skills Elementary

## 🚀 Getting Started

1. Open your app: `http://localhost:5173`
2. Click the **"Import Data"** tab at the top
3. Choose your format (Simple or CSV)
4. Paste your data
5. Click **"Import Data"**
6. Done! Your units are saved

---

## 📝 FORMAT 1: SIMPLE (Recommended - Easiest!)

### Structure:
```
UnitNumber. Unit Title
word | part-of-speech | definition | example | related-words

UnitNumber. Next Unit Title
word | part-of-speech | definition | example | related-words
```

### Example from Book - Unit 1 (Classroom vocabulary):

```
1. Classroom vocabulary
board | noun | surface for writing | The teacher writes on the board. | whiteboard, blackboard
desk | noun | table for studying | Students sit at their desks. | table
pen | noun | writing tool | I write with a pen. | pencil, marker
book | noun | printed pages | Open your book. | textbook, notebook
teacher | noun | person who teaches | The teacher explains the lesson. | instructor, educator
student | noun | person who learns | Students do homework. | pupil, learner
```

### Example from Book - Unit 2 (Grammar words):

```
2. Grammar words
verb | noun | action word | Run is a verb. | action word
noun | noun | naming word | Dog is a noun. | name
adjective | noun | describing word | Happy is an adjective. | descriptor
adverb | noun | modifies verb | Quickly is an adverb. | modifier
```

---

## 📊 FORMAT 2: CSV (For Spreadsheets)

### Structure:
```csv
unitNumber,unitTitle,word,pos,definition,example,relatedWords
```

### Example (copy to Excel/Google Sheets first, then export as CSV):

```csv
unitNumber,unitTitle,word,pos,definition,example,relatedWords
1,Classroom vocabulary,board,noun,surface for writing,The teacher writes on the board.,whiteboard;blackboard
1,Classroom vocabulary,desk,noun,table for studying,Students sit at their desks.,table
1,Classroom vocabulary,pen,noun,writing tool,I write with a pen.,pencil;marker
2,Grammar words,verb,noun,action word,Run is a verb.,action word
2,Grammar words,noun,noun,naming word,Dog is a noun.,name
```

**Note:** Related words use semicolon (;) not comma

---

## 🎯 Real Examples from Your Oxford Book

### LEARNING ENGLISH Section:

```
1. Classroom vocabulary
classroom | noun | room for teaching | We study in the classroom. | class, room
blackboard | noun | dark writing surface | Write on the blackboard. | board
whiteboard | noun | white writing surface | The teacher uses the whiteboard. | board
desk | noun | student table | Sit at your desk. | table
chair | noun | seat | Pull up a chair. | seat
book | noun | reading material | Open your book to page 10. | textbook
pen | noun | writing instrument | Use a pen. | ballpoint
pencil | noun | erasable writing tool | Draw with a pencil. | lead pencil
ruler | noun | measuring tool | Use a ruler to draw lines. | measure
eraser | noun | removes pencil marks | Use an eraser. | rubber

2. Grammar words
grammar | noun | language rules | Learn English grammar. | rules, syntax
verb | noun | action word | Run is a verb. | action word
noun | noun | naming word | Cat is a noun. | name, thing
adjective | noun | describing word | Big is an adjective. | descriptor
adverb | noun | verb modifier | Quickly is an adverb. | modifier
pronoun | noun | replaces noun | He is a pronoun. | substitute
preposition | noun | shows relation | In is a preposition. | relation word
conjunction | noun | connecting word | And is a conjunction. | connector
```

### NUMBERS AND TIME Section:

```
6. Numbers
number | noun | mathematical value | Write the number 5. | digit, figure
one | noun | number 1 | One plus one equals two. | 1
two | noun | number 2 | Two students arrived. | 2
three | noun | number 3 | Three books on the table. | 3
ten | noun | number 10 | Count to ten. | 10
hundred | noun | number 100 | One hundred people came. | 100
thousand | noun | number 1000 | Two thousand dollars. | 1000

7. Telling the time
time | noun | when something happens | What time is it? | hour, moment
hour | noun | 60 minutes | One hour later. | 60 minutes
minute | noun | 60 seconds | Wait a minute. | moment
second | noun | unit of time | Count the seconds. | moment
clock | noun | time device | Look at the clock. | timepiece
watch | noun | wrist clock | Check your watch. | wristwatch
```

### PEOPLE Section:

```
10. Parts of the body
head | noun | top of body | She shook her head. | skull
face | noun | front of head | Wash your face. | visage
eye | noun | organ of sight | Open your eyes. | sight
ear | noun | organ of hearing | Listen with your ears. | hearing
nose | noun | organ of smell | She has a small nose. | smell
mouth | noun | opening for eating | Open your mouth. | oral
hand | noun | end of arm | Raise your hand. | palm
finger | noun | digit on hand | Point with your finger. | digit
leg | noun | lower limb | He hurt his leg. | limb
foot | noun | end of leg | My foot hurts. | feet (plural)
```

---

## ⚡ Quick Tips for Fast Entry

### Method 1: Type While Reading
1. Open book to Unit 1
2. Open Import page in app
3. Type unit number and title
4. Type each word line by line
5. Use TAB or | to separate fields

### Method 2: Use Spreadsheet First
1. Open Excel/Google Sheets
2. Create columns: unitNumber, unitTitle, word, pos, definition, example, relatedWords
3. Type data in neat rows
4. Export as CSV
5. Copy CSV content
6. Paste in app (CSV format)

### Method 3: Batch Entry
1. Do 5-10 units at once
2. Import all together
3. App will save automatically
4. Check stats to confirm count

---

## 🎓 Unit Structure from Your Book

Based on the contents pages you showed:

### LEARNING ENGLISH (Units 1-5)
1. Classroom vocabulary
2. Grammar words  
3. Using this book
4. Learning new words
5. Classroom activities

### NUMBERS AND TIME (Units 6-9)
6. Numbers
7. Telling the time
8. Days, seasons and dates
9. Time and phrases

### PEOPLE (Units 10-17)
10. Parts of the body
11. Describing people
12. Physical actions
13. Personal information
14. Family
15. Personality
16. Relationships
17. Feeling

... and so on for all 100 units!

---

## 📈 After Importing

The app will:
- ✅ Save to localStorage
- ✅ Show unit count
- ✅ Show word count
- ✅ Make units available for practice
- ✅ Allow you to export anytime

### Export Options:
1. **Export JSON** - Backup your data
2. **Generate JS File** - Create permanent file
3. Save to `src/data/oxfordUnitsData.js`

---

## 🔧 Troubleshooting

**Problem:** "Import failed"
**Solution:** Check format - make sure | separators are correct

**Problem:** "No units showing"
**Solution:** Make sure unit number starts with number (1. 2. etc.)

**Problem:** "Missing fields"
**Solution:** All fields are optional except word and unit title

**Problem:** "Want to edit imported data"
**Solution:** Export JSON, edit in text editor, re-import

---

## 💡 Pro Tips

1. **Start Small** - Import 5 units first to test
2. **Use Simple Format** - Much easier than CSV
3. **One Session** - Do 10-20 units per sitting
4. **Back Up Often** - Click "Export JSON" after each session
5. **Generate JS File** - Create permanent file when done

---

## 📚 Your Workflow

```
Day 1: Import Units 1-10 (Learning English + Numbers)
Day 2: Practice Units 1-10
Day 3: Import Units 11-20 (People)
Day 4: Practice Units 11-20
...and so on!
```

---

## 🎉 Example: Import First 3 Units Now!

Copy this and paste in the Import page:

```
1. Classroom vocabulary
board | noun | surface for writing | The teacher writes on the board. | whiteboard, blackboard
desk | noun | student table | Students sit at their desks. | table
pen | noun | writing tool | Write with a pen. | pencil, marker
book | noun | reading material | Open your book. | textbook
teacher | noun | person who teaches | The teacher explains. | instructor

2. Grammar words
verb | noun | action word | Run is a verb. | action
noun | noun | naming word | Dog is a noun. | name
adjective | noun | describing word | Happy is an adjective. | descriptor

3. Using this book
dictionary | noun | word reference book | Look it up in a dictionary. | reference
vocabulary | noun | set of words | Build your vocabulary. | words, lexicon
example | noun | sample | Here is an example. | sample, instance
exercise | noun | practice activity | Do the exercise. | practice, drill
```

Then click **"Import Data"** and you're done! 🎊

---

**Happy Learning! 📚✨**

*Make sure you have your Oxford Word Skills Elementary book handy!*
