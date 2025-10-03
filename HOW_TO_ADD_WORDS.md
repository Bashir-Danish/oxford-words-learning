# How to Add More Words to the Vocabulary App

## 📝 Overview
The app automatically loads words from `public/OXFORD_3000_ENHANCED_TEMPLATE.json` and saves your learning progress to browser localStorage. This means:

✅ **Words persist** - Add them once to the JSON file  
✅ **Progress persists** - Your "learned" status is saved automatically  
✅ **Survives refresh** - Your progress is preserved even after closing the browser  

---

## 🎯 Quick Steps

### 1. Open the JSON File
Navigate to: `public/OXFORD_3000_ENHANCED_TEMPLATE.json`

### 2. Add New Words to the `vocabulary` Array

Copy this template and paste it into the `vocabulary` array:

```json
{
  "id": 25,
  "word": "your-word-here",
  "pos": "noun",
  "level": "A1",
  "definition": "your definition here",
  "family": ["related (adj)", "relation (n)"],
  "synonyms": ["similar", "equivalent"],
  "opposites": ["opposite", "contrary"],
  "example": "Your example sentence here.",
  "persian": "ترجمه فارسی",
  "learned": false,
  "dateAdded": "2025-01-03",
  "difficulty": "easy"
}
```

### 3. Update Metadata (Optional but Recommended)

Update the word counts in the `metadata` section:

```json
"metadata": {
  "totalWords": 25,  // Update this!
  "wordCounts": {
    "A1": { "count": 9 },  // Update counts per level
    "A2": { "count": 6 },
    // ... etc
  }
}
```

---

## 📚 Field Descriptions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | number | ✅ Yes | Unique identifier (increment from last word) | `25` |
| `word` | string | ✅ Yes | The vocabulary word | `"beautiful"` |
| `pos` | string | ✅ Yes | Part of speech | `"adjective"` |
| `level` | string | ✅ Yes | CEFR level (A1, A2, B1, B2, C1, C2) | `"A2"` |
| `definition` | string | ✅ Yes | Clear English definition | `"pleasing to the eye"` |
| `family` | array | ⚪ Optional | Related words | `["beauty (n)", "beautifully (adv)"]` |
| `synonyms` | array | ⚪ Optional | Similar words | `["pretty", "lovely", "attractive"]` |
| `opposites` | array | ⚪ Optional | Opposite words | `["ugly", "unattractive"]` |
| `example` | string | ✅ Yes | Example sentence | `"She is a beautiful person."` |
| `persian` | string | ⚪ Optional | Persian/Farsi translation | `"زیبا"` |
| `learned` | boolean | ✅ Yes | Always set to `false` for new words | `false` |
| `dateAdded` | string | ⚪ Optional | Date added (YYYY-MM-DD) | `"2025-01-03"` |
| `difficulty` | string | ⚪ Optional | `"easy"`, `"medium"`, or `"hard"` | `"medium"` |

---

## 🎨 Part of Speech Options

Common values for the `pos` field:
- `"noun"` - person, place, thing
- `"verb"` - action word
- `"adjective"` - describes a noun
- `"adverb"` - describes a verb
- `"preposition"` - in, on, at, etc.
- `"conjunction"` - and, but, or, etc.
- `"pronoun"` - he, she, it, etc.
- `"article"` - a, an, the

---

## 🌈 CEFR Levels Explained

| Level | Name | Description | Target Count |
|-------|------|-------------|--------------|
| **A1** | Beginner | Basic everyday words | 800 |
| **A2** | Elementary | Common everyday situations | 1000 |
| **B1** | Intermediate | More complex topics | 800 |
| **B2** | Upper Intermediate | Advanced and abstract topics | 400 |
| **C1** | Advanced | Effective operational proficiency | 500 |
| **C2** | Mastery | Near-native speaker level | 500 |

---

## ✨ Example: Adding Multiple Words

```json
{
  "vocabulary": [
    // ... existing words ...
    {
      "id": 25,
      "word": "environment",
      "pos": "noun",
      "level": "B1",
      "definition": "the natural world around us",
      "family": ["environmental (adj)", "environmentalist (n)"],
      "synonyms": ["surroundings", "habitat", "ecosystem"],
      "opposites": [],
      "example": "We must protect the environment for future generations.",
      "persian": "محیط زیست",
      "learned": false,
      "dateAdded": "2025-01-03",
      "difficulty": "medium"
    },
    {
      "id": 26,
      "word": "challenge",
      "pos": "noun",
      "level": "B1",
      "definition": "a difficult task or situation",
      "family": ["challenge (v)", "challenging (adj)", "challenged (adj)"],
      "synonyms": ["difficulty", "problem", "obstacle"],
      "opposites": ["ease", "simplicity"],
      "example": "Learning a new language is a challenge.",
      "persian": "چالش",
      "learned": false,
      "dateAdded": "2025-01-03",
      "difficulty": "medium"
    }
  ]
}
```

---

## 💾 How Progress is Saved

### Automatic Saving
- When you click **"✓ Mark as Learned"**, the app:
  1. Updates the word's `learned` status
  2. Adds a `lastModified` timestamp
  3. Saves to browser localStorage immediately
  4. Recalculates statistics

### What Gets Saved
```javascript
{
  "vocabulary": [
    {
      "id": 1,
      "learned": true,
      "lastModified": "2025-01-03T11:45:00.000Z"
    }
    // ... for all words
  ],
  "lastUpdated": "2025-01-03T11:45:00.000Z"
}
```

### Where It's Saved
- **Location**: Browser localStorage
- **Key**: `vocabularyProgress`
- **Persistence**: Survives page refresh, browser restart
- **Cleared**: Only when you clear browser data

---

## 🔄 Updating Statistics

After adding words, update the `statistics` section (or the app will recalculate):

```json
"statistics": {
  "byLevel": {
    "A1": { "total": 9, "learned": 0, "notLearned": 9, "percentComplete": 0 },
    "A2": { "total": 7, "learned": 0, "notLearned": 7, "percentComplete": 0 }
  }
}
```

---

## 🚀 Best Practices

### 1. **Consistent ID Numbering**
   - Always increment from the last ID
   - Never reuse IDs
   - Keep them sequential

### 2. **Quality Definitions**
   - Keep definitions clear and concise
   - Use simple language
   - Focus on the most common meaning

### 3. **Useful Examples**
   - Use complete sentences
   - Show natural usage
   - Keep them simple and relatable

### 4. **Level Appropriateness**
   - Match difficulty to CEFR level
   - A1 = very basic, common words
   - C2 = sophisticated, rare words

### 5. **Persian Translations**
   - Use proper Persian/Farsi script
   - Include common variations if needed
   - Can leave empty if unknown

---

## 🐛 Troubleshooting

### Words Not Showing?
- Check JSON syntax (use a JSON validator)
- Ensure no duplicate IDs
- Refresh the page (Ctrl+Shift+R)

### Progress Not Saving?
- Check browser localStorage is enabled
- Check browser console for errors
- Try clearing localStorage and starting fresh

### Statistics Wrong?
- The app recalculates on load
- Just add the words; statistics auto-update

---

## 📊 Bulk Import Tips

For adding many words:

1. **Use a spreadsheet** (Excel/Google Sheets)
2. **Create columns** for each field
3. **Use formulas** to generate JSON format
4. **Copy-paste** into the JSON file
5. **Validate** JSON syntax
6. **Test** with a few words first

---

## ✅ Checklist Before Adding Words

- [ ] Unique ID assigned
- [ ] Word spelled correctly
- [ ] Part of speech specified
- [ ] Appropriate CEFR level
- [ ] Clear definition provided
- [ ] Example sentence included
- [ ] `learned` set to `false`
- [ ] JSON syntax valid (no missing commas/quotes)
- [ ] File saved
- [ ] Page refreshed

---

## 🎉 That's It!

The app will automatically:
- ✅ Load your new words
- ✅ Display them in the card slider
- ✅ Save your progress when you mark them as learned
- ✅ Keep your progress across sessions
- ✅ Calculate statistics dynamically

**Happy Learning! 📚🚀**
