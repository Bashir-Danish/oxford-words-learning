# Oxford 3000 Vocabulary Learning App

A modern, interactive vocabulary learning application built with React that helps you master the Oxford 3000 essential English words.

## 🎯 Features

### ✨ Interactive Card Slider
- **Flip Cards**: Click to flip between word and definition
- **Beautiful Animations**: Smooth 3D card flip effects
- **Progress Tracking**: Visual progress bar showing your position
- **Word Details**: ID numbers, CEFR levels, difficulty ratings

### 📊 Smart Filtering
- **Filter by Level**: A1, A2, B1, B2 (CEFR levels)
- **Filter by Status**: All words, learned, or not learned
- **Search**: Find words by text in word, definition, or example
- **Live Statistics**: See word counts for each filter

### 📈 Comprehensive Statistics
- **Overall Progress**: Circular progress indicator
- **Level-by-Level Progress**: Track progress for each CEFR level
- **Milestones**: Achievement badges for learning goals
- **Learning Tips**: Personalized recommendations based on progress

### 💾 Automatic Progress Saving
- Progress automatically saved to browser localStorage
- No account needed - everything works offline
- Resume where you left off

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Installation

1. Make sure all dependencies are installed:
```bash
npm install
```

2. The JSON data file is already in the `public` folder

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically `http://localhost:5173` or `http://localhost:5174`)

## 📖 How to Use

### Learning Mode

1. **View Word Card**
   - Front: Shows the word, part of speech, and ID number
   - Click "🔄 Flip" to see the definition

2. **Navigate Between Words**
   - Use "← Previous" and "Next →" buttons
   - Track your position with the progress bar

3. **Mark Words as Learned**
   - Click "✓ Mark as Learned" when you've mastered a word
   - Learned words are highlighted with a green badge

4. **Show More Details**
   - Click "▼ Show More Details" to see:
     - Word family members
     - Synonyms
     - Opposites (antonyms)

5. **Apply Filters**
   - Filter by CEFR level (A1-B2)
   - Show only learned or not-learned words
   - Search for specific words

### Statistics Mode

Click the "📊 Statistics" button to view:
- Overall completion percentage
- Progress breakdown by level
- Achievement milestones
- Personalized learning tips

## 📁 File Structure

```
src/
├── hooks/
│   └── useVocabulary.js         # Custom hook for vocabulary management
├── components/
│   ├── WordCardSlider.jsx       # Main word card component
│   ├── WordCardSlider.css       # Card styles with animations
│   ├── VocabularyFilters.jsx    # Filter controls
│   ├── VocabularyFilters.css    # Filter styles
│   ├── VocabularyStatistics.jsx # Statistics dashboard
│   └── VocabularyStatistics.css # Statistics styles
├── AppNew.jsx                    # Main application component
├── App.css                       # Application styles
└── main.jsx                      # React entry point

public/
└── OXFORD_3000_ENHANCED_TEMPLATE.json  # Vocabulary data
```

## 🎨 Features Breakdown

### Word Card Details
Each word includes:
- **ID**: Unique identifier (1-3000)
- **Word**: The vocabulary word
- **Part of Speech**: noun, verb, adjective, etc.
- **Level**: CEFR level (A1, A2, B1, B2)
- **Definition**: Clear English explanation
- **Example**: Real-world usage example
- **Persian Translation**: Farsi translation
- **Word Family**: Related words
- **Synonyms**: Words with similar meaning
- **Opposites**: Antonyms
- **Difficulty**: Easy, medium, or hard

### CEFR Levels
- **A1 (Beginner)**: ~800 words - Basic everyday vocabulary
- **A2 (Elementary)**: ~1000 words - Common everyday situations
- **B1 (Intermediate)**: ~800 words - More complex topics
- **B2 (Upper Intermediate)**: ~400 words - Advanced and abstract topics

## 💡 Learning Tips

1. **Start with A1**: Build a strong foundation with beginner words
2. **Daily Practice**: Learn 5-10 words per day consistently
3. **Use in Context**: Create 3-5 sentences for each new word
4. **Regular Review**: Weekly review of learned words
5. **Focus**: Complete one level before moving to the next
6. **Apply Filters**: Use level filters to focus your learning

## 🔧 Technical Details

### Technologies Used
- **React**: UI framework
- **Custom Hooks**: State management with useVocabulary
- **CSS3**: Animations and styling
- **localStorage**: Progress persistence
- **Vite**: Build tool

### Data Structure
The JSON file contains:
- Metadata (title, version, word counts)
- Vocabulary array (all words with details)
- Statistics (by level, part of speech, difficulty)
- Instructions and guides

## 🎓 Expanding the Data

The template currently contains 20 sample words. To add more:

1. Edit `public/OXFORD_3000_ENHANCED_TEMPLATE.json`
2. Add words following the same structure
3. Update `metadata.totalWords` and `wordCounts`
4. Refresh the app - changes will load automatically

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Data Not Loading
- Ensure `OXFORD_3000_ENHANCED_TEMPLATE.json` is in the `public` folder
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R)

### Progress Not Saving
- Check that localStorage is enabled in your browser
- Clear browser cache and restart
- Check browser privacy settings

## 📝 License

Educational use only - Based on Oxford University Press vocabulary lists

## 🙏 Credits

- Oxford University Press for the Oxford 3000 word list
- CEFR (Common European Framework of Reference) for level guidelines

---

**Enjoy learning! 🚀📚**
