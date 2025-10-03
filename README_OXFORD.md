# 📚 Oxford Word Skills Elementary - Vocabulary Learning App

An interactive web application for learning vocabulary from the **Oxford Word Skills Elementary (A1-A2)** book.

## 🎯 What is This?

This app helps you learn English vocabulary from the **Oxford University Press** Oxford Word Skills Elementary book through:
- ✅ Interactive sentence creation
- ✅ Unit-based structure (100 units)
- ✅ Progress tracking
- ✅ Real-time feedback
- ✅ Spaced repetition

## 📖 About Oxford Word Skills Elementary

**Oxford Word Skills Elementary** is published by Oxford University Press and contains:
- **100 Units** of vocabulary lessons
- **A1-A2 Level** (Elementary English)
- **5 Main Sections:** World Around Us, People, Daily Life, Places, Activities
- **ISBN:** 978-0-19-462012-7

## ✨ Key Features

### 1. **Unit-Based Learning**
- Follow the book's 100-unit structure
- Learn vocabulary in context
- Progress sequentially or jump to any unit

### 2. **Interactive Practice**
- Write sentences using new vocabulary
- Get instant feedback
- See real-world examples

### 3. **Smart Tracking**
- Track which units you've completed
- Monitor your learning streak
- See progress charts

### 4. **Multiple Practice Modes**
- **Daily Challenge** - One unit per day
- **Browse Mode** - Choose any unit
- **Review Mode** - Practice previous units

## 🚀 How to Use

### Starting the App

1. **Open Terminal** in this folder
2. **Run:** `npm run dev`
3. **Open Browser:** Go to `http://localhost:5173`

### Learning Workflow

```
Step 1: Choose a Unit → 
Step 2: Read Vocabulary → 
Step 3: Write Sentence → 
Step 4: Get Feedback → 
Step 5: Save & Move On
```

## 📊 Current Status

### ✅ What's Working Now:
- Complete app interface
- 50 sample word families (for testing)
- All practice features
- Progress tracking

### 📝 What You Need to Add:
- **Oxford Word Skills data** from your book
- Open `src/data/oxfordWordSkills.js`
- Add vocabulary from each unit
- Follow the template provided

## 🔧 File Structure

```
oxford words/
├── src/
│   ├── data/
│   │   ├── wordFamilies.js      # Current 50 sample families
│   │   └── oxfordWordSkills.js  # New 100-unit structure (ADD YOUR DATA HERE)
│   ├── components/              # React components
│   ├── utils/                   # Helper functions
│   └── App.jsx                  # Main app
├── OXFORD_WORD_SKILLS_GUIDE.md  # Complete guide for adding data
└── README_OXFORD.md             # This file
```

## 📚 How to Add Oxford Word Skills Data

### Quick Start (5 minutes):

1. **Open your Oxford Word Skills Elementary book**
2. **Edit:** `src/data/oxfordWordSkills.js`
3. **Find Unit 1** in the file (already templated)
4. **Add words** from your book following this format:

```javascript
{
  word: "England",
  pos: "noun",
  definition: "a country in the UK",
  example: "I live in England.",
  relatedWords: ["English", "British"]
}
```

5. **Save** and refresh the browser

### Detailed Instructions:

See **`OXFORD_WORD_SKILLS_GUIDE.md`** for:
- Complete list of all 100 units
- Step-by-step data entry guide
- CSV import option
- Learning strategies

## 🎓 Why Use This App?

### Traditional Book Learning:
❌ Passive reading
❌ No immediate feedback
❌ Hard to track progress
❌ Limited practice

### This App:
✅ Active sentence creation
✅ Instant feedback
✅ Automatic progress tracking
✅ Unlimited practice
✅ Fun and engaging

## 🔐 Data Source & Copyright

⚠️ **IMPORTANT:** 

- You must **own** the Oxford Word Skills Elementary book
- Add vocabulary data **manually** from your own book
- This respects Oxford University Press copyright
- The app structure is yours; the content is Oxford's

## 📖 Book Information

- **Title:** Oxford Word Skills Elementary
- **Level:** A1-A2
- **Publisher:** Oxford University Press
- **ISBN:** 978-0-19-462012-7
- **Units:** 100
- **Purchase:** Available at bookstores or online

## 🎯 Learning Tips

1. **Start Small** - Add 5-10 units to begin
2. **Practice Daily** - Build a streak
3. **Review Regularly** - Use Review Mode
4. **Create Real Sentences** - Make them meaningful
5. **Track Progress** - Check your dashboard

## 🛠️ Technical Details

- **Framework:** React 19
- **Build Tool:** Vite
- **Storage:** LocalStorage (offline capable)
- **No Backend Required**

## 📱 Device Compatibility

✅ Desktop computers
✅ Laptops
✅ Tablets
✅ Mobile phones
✅ Works offline after initial load

## 🚦 Getting Started Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Start dev server (`npm run dev`)
- [ ] Open app in browser
- [ ] Test with sample data (50 families included)
- [ ] Get your Oxford Word Skills book
- [ ] Read `OXFORD_WORD_SKILLS_GUIDE.md`
- [ ] Start adding Unit 1 data
- [ ] Practice and learn!

## 💡 Pro Tips

### For Fast Data Entry:
1. Use the CSV import method (see guide)
2. Type while looking at the book
3. Add 1-2 units per study session
4. Verify as you go

### For Best Learning:
1. Add units as you study them
2. Don't rush to add all 100
3. Master each unit before moving on
4. Review previous units weekly

## 🤔 Common Questions

**Q: Do I need all 100 units to start?**
A: No! Start with 5-10 units. Add more as you study.

**Q: Where do I get the vocabulary data?**
A: From your Oxford Word Skills Elementary book. You need to own it.

**Q: Can I share my completed data file?**
A: No, that would violate Oxford's copyright. Each user needs their own book.

**Q: Does this replace the book?**
A: No, this supplements the book with interactive practice.

**Q: Can I use this for other Oxford books?**
A: The structure is adaptable. You'd need to modify the data format.

## 🎉 Next Steps

1. **Read** `OXFORD_WORD_SKILLS_GUIDE.md`
2. **Get** your Oxford Word Skills Elementary book
3. **Add** vocabulary data for Unit 1
4. **Practice** and see how it works
5. **Continue** adding units as you study

## 📞 Need Help?

If you need assistance with:
- Technical issues
- Data format questions
- Feature requests

Check the guide file first, then ask for help!

---

**Happy Learning! 🎓📚**

*This app helps you learn from Oxford Word Skills Elementary more effectively through interactive practice and progress tracking.*
