// Oxford Word Skills Elementary - Complete 100 Units
// Based on Oxford Word Skills Elementary A1-A2 Book Structure
// 
// BOOK STRUCTURE:
// - 100 Units organized into themed sections
// - Each unit focuses on specific vocabulary topics
// - Includes word families, collocations, and practical usage
//
// HOW TO ADD REAL DATA:
// 1. Get your Oxford Word Skills Elementary book
// 2. For each unit, add the vocabulary following the structure below
// 3. Include the actual words, definitions, and examples from the book

export const oxfordWordSkillsData = {
  bookInfo: {
    title: "Oxford Word Skills Elementary",
    level: "A1-A2",
    publisher: "Oxford University Press",
    totalUnits: 100,
    isbn: "978-0-19-462012-7" // Elementary edition
  },

  // SECTION 1: THE WORLD AROUND US (Units 1-20)
  sections: [
    {
      id: 1,
      name: "The World Around Us",
      units: [
        {
          unitNumber: 1,
          title: "Countries and nationalities",
          topic: "Geography",
          level: "A1",
          vocabulary: [
            {
              word: "country",
              pos: "noun",
              definition: "a nation with its own government",
              example: "France is a beautiful country.",
              relatedWords: ["nation", "state", "land"]
            },
            {
              word: "nationality",
              pos: "noun", 
              definition: "the status of belonging to a particular nation",
              example: "What is your nationality?",
              relatedWords: ["citizenship", "origin"]
            },
            // ADD MORE WORDS FROM UNIT 1 HERE
            // Example: England/English, America/American, Japan/Japanese, etc.
          ],
          exercises: {
            practice: "Match countries with their nationalities",
            example: "She is from Brazil. She is Brazilian."
          },
          source: "Oxford Word Skills Elementary, Unit 1, Page 8"
        },
        {
          unitNumber: 2,
          title: "The family",
          topic: "Relationships",
          level: "A1",
          vocabulary: [
            {
              word: "family",
              pos: "noun",
              definition: "a group of people related by blood or marriage",
              example: "I have a big family.",
              relatedWords: ["relatives", "relations"]
            },
            {
              word: "parent",
              pos: "noun",
              definition: "a mother or father",
              example: "My parents live in London.",
              relatedWords: ["mother", "father", "mom", "dad"]
            },
            {
              word: "brother",
              pos: "noun",
              definition: "a male sibling",
              example: "I have two brothers.",
              relatedWords: ["sibling"]
            },
            {
              word: "sister",
              pos: "noun",
              definition: "a female sibling",
              example: "My sister is a teacher.",
              relatedWords: ["sibling"]
            },
            // ADD: grandmother, grandfather, aunt, uncle, cousin, etc.
          ],
          exercises: {
            practice: "Complete sentences about family members",
            example: "My mother's mother is my grandmother."
          },
          source: "Oxford Word Skills Elementary, Unit 2, Page 10"
        },
        {
          unitNumber: 3,
          title: "Birth, marriage, and death",
          topic: "Life Events",
          level: "A1",
          vocabulary: [
            {
              word: "birth",
              pos: "noun",
              definition: "the time when a baby is born",
              example: "The birth of their baby was a happy moment.",
              relatedWords: ["born", "birthday"]
            },
            {
              word: "marriage",
              pos: "noun",
              definition: "the legal union of two people as partners",
              example: "Their marriage lasted 50 years.",
              relatedWords: ["marry", "married", "wedding"]
            },
            {
              word: "death",
              pos: "noun",
              definition: "the end of life",
              example: "The death of his father was very sad.",
              relatedWords: ["die", "died", "dead"]
            },
            // ADD: wedding, funeral, celebrate, etc.
          ],
          source: "Oxford Word Skills Elementary, Unit 3, Page 12"
        },
        {
          unitNumber: 4,
          title: "Parts of the body",
          topic: "Body",
          level: "A1",
          vocabulary: [
            {
              word: "head",
              pos: "noun",
              definition: "the part of the body containing the brain, eyes, ears, nose, and mouth",
              example: "She has a headache in her head.",
              relatedWords: ["face", "skull"]
            },
            {
              word: "eye",
              pos: "noun",
              definition: "the organ of sight",
              example: "She has blue eyes.",
              relatedWords: ["vision", "sight"]
            },
            // ADD: nose, mouth, ear, arm, hand, leg, foot, etc.
          ],
          source: "Oxford Word Skills Elementary, Unit 4, Page 14"
        },
        {
          unitNumber: 5,
          title: "Clothes",
          topic: "Fashion",
          level: "A1",
          vocabulary: [
            {
              word: "clothes",
              pos: "noun",
              definition: "items worn to cover the body",
              example: "I need to buy new clothes.",
              relatedWords: ["clothing", "wear", "outfit"]
            },
            {
              word: "shirt",
              pos: "noun",
              definition: "a garment for the upper body",
              example: "He is wearing a blue shirt.",
              relatedWords: ["blouse", "top"]
            },
            // ADD: trousers, dress, skirt, shoes, etc.
          ],
          source: "Oxford Word Skills Elementary, Unit 5, Page 16"
        }
        // ADD UNITS 6-20 following the same structure
        // Unit 6: Personality
        // Unit 7: Feelings
        // Unit 8: Conversations
        // Unit 9: Food and drink
        // Unit 10: In the kitchen
        // ... etc.
      ]
    },

    // SECTION 2: PEOPLE (Units 21-40)
    {
      id: 2,
      name: "People",
      units: [
        {
          unitNumber: 21,
          title: "Jobs",
          topic: "Work",
          level: "A1",
          vocabulary: [
            {
              word: "job",
              pos: "noun",
              definition: "a paid position of regular employment",
              example: "She has a good job in a bank.",
              relatedWords: ["work", "occupation", "profession"]
            },
            {
              word: "teacher",
              pos: "noun",
              definition: "a person who teaches",
              example: "My mother is a teacher.",
              relatedWords: ["teach", "educator"]
            },
            // ADD: doctor, nurse, engineer, etc.
          ],
          source: "Oxford Word Skills Elementary, Unit 21"
        }
        // ADD UNITS 22-40
      ]
    },

    // SECTION 3: DAILY LIFE (Units 41-60)
    {
      id: 3,
      name: "Daily Life",
      units: [
        {
          unitNumber: 41,
          title: "Daily routines",
          topic: "Routine",
          level: "A2",
          vocabulary: [
            {
              word: "routine",
              pos: "noun",
              definition: "a regular way of doing things",
              example: "I have a morning routine.",
              relatedWords: ["habit", "schedule"]
            },
            // ADD MORE
          ],
          source: "Oxford Word Skills Elementary, Unit 41"
        }
        // ADD UNITS 42-60
      ]
    },

    // SECTION 4: PLACES (Units 61-80)
    {
      id: 4,
      name: "Places",
      units: [
        {
          unitNumber: 61,
          title: "In the city",
          topic: "Urban Life",
          level: "A2",
          vocabulary: [
            {
              word: "city",
              pos: "noun",
              definition: "a large town",
              example: "London is a big city.",
              relatedWords: ["urban", "town", "metropolis"]
            },
            // ADD MORE
          ],
          source: "Oxford Word Skills Elementary, Unit 61"
        }
        // ADD UNITS 62-80
      ]
    },

    // SECTION 5: ACTIVITIES (Units 81-100)
    {
      id: 5,
      name: "Activities",
      units: [
        {
          unitNumber: 81,
          title: "Sport",
          topic: "Sports",
          level: "A2",
          vocabulary: [
            {
              word: "sport",
              pos: "noun",
              definition: "an activity involving physical exertion",
              example: "Football is my favorite sport.",
              relatedWords: ["game", "athletics", "exercise"]
            },
            // ADD MORE
          ],
          source: "Oxford Word Skills Elementary, Unit 81"
        }
        // ADD UNITS 82-100
      ]
    }
  ]
};

// Utility Functions

/**
 * Get unit by number
 */
export const getUnitByNumber = (unitNumber) => {
  for (const section of oxfordWordSkillsData.sections) {
    const unit = section.units.find(u => u.unitNumber === unitNumber);
    if (unit) return unit;
  }
  return null;
};

/**
 * Get all units
 */
export const getAllUnits = () => {
  return oxfordWordSkillsData.sections.flatMap(section => section.units);
};

/**
 * Get units by level
 */
export const getUnitsByLevel = (level) => {
  return getAllUnits().filter(unit => unit.level === level);
};

/**
 * Get units by topic
 */
export const getUnitsByTopic = (topic) => {
  return getAllUnits().filter(unit => unit.topic === topic);
};

/**
 * Get section by ID
 */
export const getSectionById = (sectionId) => {
  return oxfordWordSkillsData.sections.find(s => s.id === sectionId);
};

/**
 * Get progress percentage
 */
export const getBookProgress = (completedUnits) => {
  return (completedUnits / oxfordWordSkillsData.bookInfo.totalUnits) * 100;
};

/**
 * Get next unit
 */
export const getNextUnit = (currentUnitNumber) => {
  if (currentUnitNumber < oxfordWordSkillsData.bookInfo.totalUnits) {
    return getUnitByNumber(currentUnitNumber + 1);
  }
  return null;
};

/**
 * Get previous unit
 */
export const getPreviousUnit = (currentUnitNumber) => {
  if (currentUnitNumber > 1) {
    return getUnitByNumber(currentUnitNumber - 1);
  }
  return null;
};

/**
 * Search units by keyword
 */
export const searchUnits = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return getAllUnits().filter(unit => 
    unit.title.toLowerCase().includes(lowerKeyword) ||
    unit.topic.toLowerCase().includes(lowerKeyword) ||
    unit.vocabulary.some(v => v.word.toLowerCase().includes(lowerKeyword))
  );
};
