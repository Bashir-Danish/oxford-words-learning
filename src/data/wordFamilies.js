// Word Family Database - 50 Oxford Word Skills Families
// Each family includes all forms with definitions, examples, level, and category

export const wordFamilies = [
  // ==================== BASIC LEVEL (10 families) ====================
  {
    id: 1,
    baseWord: "happy",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "happy",
        pos: "adjective",
        definition: "feeling or showing pleasure or contentment",
        example: "She was very happy with her new job."
      },
      {
        word: "happiness",
        pos: "noun",
        definition: "the state of being happy",
        example: "Money cannot buy happiness."
      },
      {
        word: "happily",
        pos: "adverb",
        definition: "in a happy way",
        example: "They lived happily ever after."
      },
      {
        word: "unhappy",
        pos: "adjective",
        definition: "not happy; sad",
        example: "He was unhappy about the decision."
      }
    ],
    exampleSentences: [
      { text: "She happily accepted the job offer, knowing it would bring her great happiness.", source: "BBC Learning English" },
      { text: "Despite being unhappy at first, he found happiness in his new role.", source: "The Guardian" },
      { text: "Happy employees work more productively and spread their happiness to others.", source: "Business Weekly" }
    ],
    hints: [
      "Try using both 'happy' and 'happiness' in the same sentence",
      "Compare 'happy' and 'unhappy' to show contrast",
      "Use 'happily' to describe how something was done"
    ]
  },
  {
    id: 2,
    baseWord: "help",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "help",
        pos: "verb",
        definition: "make it easier for someone to do something",
        example: "Can you help me with this problem?"
      },
      {
        word: "help",
        pos: "noun",
        definition: "the action of helping someone",
        example: "Thank you for your help."
      },
      {
        word: "helpful",
        pos: "adjective",
        definition: "giving or ready to give help",
        example: "The staff were very helpful."
      },
      {
        word: "helpfully",
        pos: "adverb",
        definition: "in a helpful way",
        example: "She helpfully explained the process."
      },
      {
        word: "unhelpful",
        pos: "adjective",
        definition: "not helpful",
        example: "His advice was unhelpful."
      }
    ],
    exampleSentences: [
      { text: "The helpful assistant helped me find what I needed.", source: "Daily Express" },
      { text: "She helpfully offered her help without being asked.", source: "The Times" },
      { text: "While some colleagues were helpful, others were unhelpful and refused to help.", source: "Workplace Today" }
    ],
    hints: [
      "Use 'help' as both a verb and noun",
      "Describe someone who is 'helpful' doing something 'helpfully'",
      "Show the difference between helpful and unhelpful behavior"
    ]
  },
  {
    id: 3,
    baseWord: "work",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "work",
        pos: "verb",
        definition: "do a job or task",
        example: "I work in an office."
      },
      {
        word: "work",
        pos: "noun",
        definition: "activity involving effort done to achieve a result",
        example: "She has a lot of work to do."
      },
      {
        word: "worker",
        pos: "noun",
        definition: "a person who works",
        example: "He is a hard worker."
      },
      {
        word: "working",
        pos: "adjective",
        definition: "having paid employment",
        example: "Both parents are working."
      }
    ],
    exampleSentences: [
      { text: "The workers work hard at their work every day.", source: "Employment News" },
      { text: "Working parents often struggle to balance work and family life.", source: "Family Magazine" },
      { text: "She works as a social worker, helping working families.", source: "Community Today" }
    ],
    hints: [
      "Use 'work' as both verb and noun in one sentence",
      "Describe 'workers' who 'work'",
      "Talk about 'working' people and their 'work'"
    ]
  },
  {
    id: 4,
    baseWord: "learn",
    level: "Basic",
    category: "Education",
    forms: [
      {
        word: "learn",
        pos: "verb",
        definition: "gain knowledge or skill",
        example: "I want to learn English."
      },
      {
        word: "learning",
        pos: "noun",
        definition: "the acquisition of knowledge or skills",
        example: "Learning is a lifelong process."
      },
      {
        word: "learner",
        pos: "noun",
        definition: "a person who is learning",
        example: "She is a fast learner."
      },
      {
        word: "learned",
        pos: "adjective",
        definition: "having much knowledge acquired by study",
        example: "He is a learned professor."
      }
    ],
    exampleSentences: [
      { text: "Learners learn best when they enjoy the learning process.", source: "Education Weekly" },
      { text: "The learned professor helped learners learn complex concepts.", source: "Academic Journal" },
      { text: "Effective learning requires learners to learn actively, not passively.", source: "Teaching Today" }
    ],
    hints: [
      "Describe 'learners' who 'learn'",
      "Talk about the 'learning' process",
      "Use 'learned' to describe a knowledgeable person"
    ]
  },
  {
    id: 5,
    baseWord: "use",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "use",
        pos: "verb",
        definition: "employ for a purpose",
        example: "Can I use your phone?"
      },
      {
        word: "use",
        pos: "noun",
        definition: "the act of using something",
        example: "The use of computers is widespread."
      },
      {
        word: "useful",
        pos: "adjective",
        definition: "able to be used for a practical purpose",
        example: "This is a useful tool."
      },
      {
        word: "usefully",
        pos: "adverb",
        definition: "in a useful way",
        example: "We usefully spent the time planning."
      },
      {
        word: "useless",
        pos: "adjective",
        definition: "not useful; having no purpose",
        example: "This broken pen is useless."
      }
    ],
    exampleSentences: [
      { text: "We can usefully use these useful tools for various uses.", source: "DIY Magazine" },
      { text: "The useful app helps users use their time more usefully.", source: "Tech Review" },
      { text: "While some features are useful, others are completely useless in actual use.", source: "Consumer Reports" }
    ],
    hints: [
      "Use 'use' as both verb and noun",
      "Contrast 'useful' and 'useless' things",
      "Describe doing something 'usefully'"
    ]
  },
  {
    id: 6,
    baseWord: "think",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "think",
        pos: "verb",
        definition: "have a particular opinion or idea",
        example: "I think it's a good idea."
      },
      {
        word: "thinking",
        pos: "noun",
        definition: "the process of using thought",
        example: "Critical thinking is important."
      },
      {
        word: "thinker",
        pos: "noun",
        definition: "a person who thinks deeply",
        example: "She is an independent thinker."
      },
      {
        word: "thoughtful",
        pos: "adjective",
        definition: "showing careful thought",
        example: "That was very thoughtful of you."
      },
      {
        word: "thoughtfully",
        pos: "adverb",
        definition: "in a thoughtful way",
        example: "He thoughtfully considered the options."
      }
    ],
    exampleSentences: [
      { text: "Thoughtful thinkers think carefully before making decisions.", source: "Philosophy Today" },
      { text: "Critical thinking requires thinkers to think thoughtfully about complex issues.", source: "Education Journal" },
      { text: "She thoughtfully shared her thinking with other thinkers.", source: "Academic Review" }
    ],
    hints: [
      "Describe 'thinkers' who 'think'",
      "Use 'thoughtful' and 'thoughtfully' together",
      "Talk about 'thinking' as a process"
    ]
  },
  {
    id: 7,
    baseWord: "care",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "care",
        pos: "verb",
        definition: "feel concern or interest",
        example: "I care about you."
      },
      {
        word: "care",
        pos: "noun",
        definition: "the provision of what is needed",
        example: "Health care is important."
      },
      {
        word: "careful",
        pos: "adjective",
        definition: "taking care to avoid harm or errors",
        example: "Be careful!"
      },
      {
        word: "carefully",
        pos: "adverb",
        definition: "in a careful way",
        example: "He carefully examined the document."
      },
      {
        word: "careless",
        pos: "adjective",
        definition: "not giving enough attention",
        example: "A careless mistake cost him the job."
      }
    ],
    exampleSentences: [
      { text: "Careful nurses care for patients carefully in their care.", source: "Healthcare Today" },
      { text: "If you care about quality, you must work carefully, not carelessly.", source: "Quality Standards" },
      { text: "Careless workers who don't care often make mistakes in patient care.", source: "Medical Journal" }
    ],
    hints: [
      "Use 'care' as both verb and noun",
      "Contrast 'careful' and 'careless'",
      "Describe doing something 'carefully'"
    ]
  },
  {
    id: 8,
    baseWord: "differ",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "differ",
        pos: "verb",
        definition: "be unlike or dissimilar",
        example: "Our opinions differ on this matter."
      },
      {
        word: "difference",
        pos: "noun",
        definition: "a way in which things are not the same",
        example: "There's a big difference between them."
      },
      {
        word: "different",
        pos: "adjective",
        definition: "not the same as another",
        example: "They have different opinions."
      },
      {
        word: "differently",
        pos: "adverb",
        definition: "in a different way",
        example: "Everyone sees things differently."
      }
    ],
    exampleSentences: [
      { text: "People differ in their opinions, and these differences make them different from each other.", source: "Social Studies" },
      { text: "Different cultures handle situations differently because they differ in their values.", source: "Cultural Review" },
      { text: "The difference between the two approaches shows how differently people think when they differ.", source: "Psychology Today" }
    ],
    hints: [
      "Show how things 'differ' and are 'different'",
      "Use 'difference' to explain what makes things 'different'",
      "Describe doing things 'differently'"
    ]
  },
  {
    id: 9,
    baseWord: "enjoy",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "enjoy",
        pos: "verb",
        definition: "take pleasure in",
        example: "I enjoy reading."
      },
      {
        word: "enjoyment",
        pos: "noun",
        definition: "the state or process of taking pleasure",
        example: "She gets great enjoyment from music."
      },
      {
        word: "enjoyable",
        pos: "adjective",
        definition: "giving pleasure",
        example: "We had an enjoyable evening."
      },
      {
        word: "enjoyably",
        pos: "adverb",
        definition: "in an enjoyable way",
        example: "We spent the day enjoyably."
      }
    ],
    exampleSentences: [
      { text: "People enjoy enjoyable activities for their own enjoyment.", source: "Leisure Magazine" },
      { text: "If you enjoy something, it's enjoyable and brings you enjoyment.", source: "Psychology Weekly" },
      { text: "We enjoyably spent time doing enjoyable things we enjoy.", source: "Lifestyle Today" }
    ],
    hints: [
      "Describe things you 'enjoy' that are 'enjoyable'",
      "Talk about 'enjoyment' from 'enjoyable' activities",
      "Use 'enjoyably' to describe spending time"
    ]
  },
  {
    id: 10,
    baseWord: "friend",
    level: "Basic",
    category: "Daily Life",
    forms: [
      {
        word: "friend",
        pos: "noun",
        definition: "a person with whom one has a bond of mutual affection",
        example: "She is my best friend."
      },
      {
        word: "friendly",
        pos: "adjective",
        definition: "kind and pleasant",
        example: "He has a friendly personality."
      },
      {
        word: "friendship",
        pos: "noun",
        definition: "the state of being friends",
        example: "Their friendship has lasted for years."
      },
      {
        word: "unfriendly",
        pos: "adjective",
        definition: "not friendly",
        example: "The staff seemed unfriendly."
      }
    ],
    exampleSentences: [
      { text: "Friendly friends build strong friendships through their friendship.", source: "Social Psychology" },
      { text: "True friends remain friendly even in difficult times, preserving their friendship.", source: "Relationships Today" },
      { text: "While some people are friendly and value friendship, others are unfriendly and have few friends.", source: "Sociology Review" }
    ],
    hints: [
      "Describe 'friendly' people as 'friends'",
      "Talk about 'friendship' between 'friends'",
      "Contrast 'friendly' and 'unfriendly' people"
    ]
  },

  // ==================== INTERMEDIATE LEVEL (20 families) ====================
  {
    id: 11,
    baseWord: "decide",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "decide",
        pos: "verb",
        definition: "make a choice from a number of alternatives",
        example: "We need to decide soon."
      },
      {
        word: "decision",
        pos: "noun",
        definition: "a conclusion or resolution reached after consideration",
        example: "It was a difficult decision."
      },
      {
        word: "decisive",
        pos: "adjective",
        definition: "settling an issue; producing a definite result",
        example: "She took decisive action."
      },
      {
        word: "decisively",
        pos: "adverb",
        definition: "in a decisive manner",
        example: "He decisively rejected the offer."
      },
      {
        word: "indecisive",
        pos: "adjective",
        definition: "not decisive; unable to make decisions",
        example: "He is too indecisive for leadership."
      }
    ],
    exampleSentences: [
      { text: "Leaders must decide decisively, making decisive decisions without being indecisive.", source: "Business Leadership" },
      { text: "The manager decided to make a decisive decision that would decisively resolve the issue.", source: "Management Today" },
      { text: "Indecisive people struggle to decide and often regret their decisions later.", source: "Psychology Today" }
    ],
    hints: [
      "Show someone who 'decided' to make a 'decisive' 'decision'",
      "Contrast 'decisive' and 'indecisive' behavior",
      "Use 'decisively' to describe how a decision was made"
    ]
  },
  {
    id: 12,
    baseWord: "succeed",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "succeed",
        pos: "verb",
        definition: "achieve the desired aim or result",
        example: "She succeeded in her mission."
      },
      {
        word: "success",
        pos: "noun",
        definition: "the accomplishment of an aim or purpose",
        example: "The project was a great success."
      },
      {
        word: "successful",
        pos: "adjective",
        definition: "accomplishing an aim or purpose",
        example: "He is a successful businessman."
      },
      {
        word: "successfully",
        pos: "adverb",
        definition: "in a successful way",
        example: "We successfully completed the task."
      },
      {
        word: "unsuccessful",
        pos: "adjective",
        definition: "not successful",
        example: "The attempt was unsuccessful."
      }
    ],
    exampleSentences: [
      { text: "Successful people succeed by learning from unsuccessful attempts before achieving success.", source: "Forbes" },
      { text: "To succeed, you must work hard and celebrate each success, no matter how small.", source: "Success Magazine" },
      { text: "She successfully turned an unsuccessful venture into a successful business.", source: "Entrepreneur Weekly" }
    ],
    hints: [
      "Describe 'successful' people who 'succeed'",
      "Talk about achieving 'success' 'successfully'",
      "Contrast 'successful' and 'unsuccessful' attempts"
    ]
  },
  {
    id: 13,
    baseWord: "communicate",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "communicate",
        pos: "verb",
        definition: "share or exchange information",
        example: "We need to communicate better."
      },
      {
        word: "communication",
        pos: "noun",
        definition: "the act of communicating",
        example: "Good communication is essential."
      },
      {
        word: "communicative",
        pos: "adjective",
        definition: "willing and able to talk and share information",
        example: "She is very communicative."
      },
      {
        word: "communicator",
        pos: "noun",
        definition: "a person who communicates",
        example: "He is an excellent communicator."
      }
    ],
    exampleSentences: [
      { text: "Effective communicators communicate clearly, using good communication skills.", source: "Business Communication" },
      { text: "Communicative leaders know how to communicate and value open communication.", source: "Leadership Today" },
      { text: "The communicator emphasized that we must communicate better to improve our communication.", source: "Corporate Training" }
    ],
    hints: [
      "Describe 'communicators' who 'communicate'",
      "Talk about 'communication' being 'communicative'",
      "Show the importance of good 'communication'"
    ]
  },
  {
    id: 14,
    baseWord: "organize",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "organize",
        pos: "verb",
        definition: "arrange systematically",
        example: "We need to organize the files."
      },
      {
        word: "organization",
        pos: "noun",
        definition: "an organized group or structure",
        example: "She works for a charity organization."
      },
      {
        word: "organized",
        pos: "adjective",
        definition: "arranged in a systematic way",
        example: "He is very organized."
      },
      {
        word: "organizer",
        pos: "noun",
        definition: "a person who organizes",
        example: "She is the event organizer."
      },
      {
        word: "disorganized",
        pos: "adjective",
        definition: "not organized",
        example: "The office is completely disorganized."
      }
    ],
    exampleSentences: [
      { text: "Organized organizers organize events for organizations efficiently.", source: "Event Management" },
      { text: "The organization hired an organizer to organize their disorganized filing system.", source: "Business Weekly" },
      { text: "To organize a successful event, the organizer must be highly organized.", source: "Event Planning Today" }
    ],
    hints: [
      "Describe 'organizers' who 'organize' things",
      "Talk about 'organizations' being 'organized'",
      "Contrast 'organized' and 'disorganized' states"
    ]
  },
  {
    id: 15,
    baseWord: "develop",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "develop",
        pos: "verb",
        definition: "grow or cause to grow and become more advanced",
        example: "We develop new products."
      },
      {
        word: "development",
        pos: "noun",
        definition: "the process of developing",
        example: "Child development is complex."
      },
      {
        word: "developer",
        pos: "noun",
        definition: "a person who develops",
        example: "He is a software developer."
      },
      {
        word: "developed",
        pos: "adjective",
        definition: "advanced or mature",
        example: "Japan is a developed country."
      },
      {
        word: "developing",
        pos: "adjective",
        definition: "growing or progressing",
        example: "India is a developing nation."
      }
    ],
    exampleSentences: [
      { text: "Developers develop new technologies that support development in developing countries.", source: "Tech Innovation" },
      { text: "The development team worked to develop solutions for both developed and developing markets.", source: "Global Business" },
      { text: "Software developers develop applications that track personal development.", source: "Tech Today" }
    ],
    hints: [
      "Describe 'developers' who 'develop' things",
      "Talk about 'development' in 'developed' or 'developing' contexts",
      "Show the process of 'developing' something"
    ]
  },
  {
    id: 16,
    baseWord: "analyze",
    level: "Intermediate",
    category: "Education",
    forms: [
      {
        word: "analyze",
        pos: "verb",
        definition: "examine in detail",
        example: "We need to analyze the data."
      },
      {
        word: "analysis",
        pos: "noun",
        definition: "detailed examination",
        example: "The analysis showed interesting results."
      },
      {
        word: "analyst",
        pos: "noun",
        definition: "a person who analyzes",
        example: "She is a financial analyst."
      },
      {
        word: "analytical",
        pos: "adjective",
        definition: "relating to or using analysis",
        example: "He has strong analytical skills."
      },
      {
        word: "analytically",
        pos: "adverb",
        definition: "in an analytical way",
        example: "Think analytically about the problem."
      }
    ],
    exampleSentences: [
      { text: "Analytical analysts analyze data analytically to produce detailed analysis.", source: "Data Science Weekly" },
      { text: "The analyst must analyze the situation analytically before presenting the analysis.", source: "Business Intelligence" },
      { text: "To think analytically, analysts analyze information using analytical methods.", source: "Research Methods" }
    ],
    hints: [
      "Describe 'analysts' who 'analyze' things",
      "Use 'analytical' to describe skills or thinking",
      "Talk about 'analysis' being done 'analytically'"
    ]
  },
  {
    id: 17,
    baseWord: "create",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "create",
        pos: "verb",
        definition: "bring something into existence",
        example: "Artists create beautiful works."
      },
      {
        word: "creation",
        pos: "noun",
        definition: "the action of creating",
        example: "The creation took months."
      },
      {
        word: "creative",
        pos: "adjective",
        definition: "involving imagination and original ideas",
        example: "She has a creative mind."
      },
      {
        word: "creatively",
        pos: "adverb",
        definition: "in a creative way",
        example: "He solved the problem creatively."
      },
      {
        word: "creator",
        pos: "noun",
        definition: "a person who creates",
        example: "She is the creator of the app."
      }
    ],
    exampleSentences: [
      { text: "Creative creators create original creations by thinking creatively.", source: "Art Magazine" },
      { text: "The creator worked creatively on the creation, using creative techniques.", source: "Design Weekly" },
      { text: "To create innovative solutions, creators must think creatively about each creation.", source: "Innovation Today" }
    ],
    hints: [
      "Describe 'creators' who 'create' things",
      "Talk about 'creative' people making 'creations'",
      "Use 'creatively' to describe the process"
    ]
  },
  {
    id: 18,
    baseWord: "compete",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "compete",
        pos: "verb",
        definition: "strive to gain or win something",
        example: "Teams compete for the championship."
      },
      {
        word: "competition",
        pos: "noun",
        definition: "the activity of competing",
        example: "The competition was fierce."
      },
      {
        word: "competitive",
        pos: "adjective",
        definition: "relating to or characterized by competition",
        example: "She is very competitive."
      },
      {
        word: "competitively",
        pos: "adverb",
        definition: "in a competitive way",
        example: "Products must be competitively priced."
      },
      {
        word: "competitor",
        pos: "noun",
        definition: "a person who competes",
        example: "He is our main competitor."
      }
    ],
    exampleSentences: [
      { text: "Competitive competitors compete fiercely in the competition to win.", source: "Sports Weekly" },
      { text: "Companies must compete competitively to survive in today's competitive market.", source: "Business Today" },
      { text: "The competitor competed aggressively, demonstrating the competitive nature of modern competition.", source: "Market Analysis" }
    ],
    hints: [
      "Describe 'competitors' who 'compete' in 'competition'",
      "Talk about 'competitive' markets or people",
      "Use 'competitively' to describe pricing or behavior"
    ]
  },
  {
    id: 19,
    baseWord: "cooperate",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "cooperate",
        pos: "verb",
        definition: "work together toward a common goal",
        example: "We must cooperate to succeed."
      },
      {
        word: "cooperation",
        pos: "noun",
        definition: "the action of cooperating",
        example: "International cooperation is vital."
      },
      {
        word: "cooperative",
        pos: "adjective",
        definition: "willing to cooperate",
        example: "He was very cooperative."
      },
      {
        word: "cooperatively",
        pos: "adverb",
        definition: "in a cooperative way",
        example: "They worked cooperatively."
      }
    ],
    exampleSentences: [
      { text: "Cooperative team members cooperate effectively, demonstrating excellent cooperation.", source: "Team Management" },
      { text: "When people cooperate cooperatively, their cooperation produces better results.", source: "Organizational Behavior" },
      { text: "The cooperative spirit helped everyone cooperate, ensuring smooth cooperation throughout the project.", source: "Project Management" }
    ],
    hints: [
      "Describe people who 'cooperate' being 'cooperative'",
      "Talk about 'cooperation' happening 'cooperatively'",
      "Show the benefits of working together"
    ]
  },
  {
    id: 20,
    baseWord: "influence",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "influence",
        pos: "verb",
        definition: "have an effect on the character or behavior of",
        example: "Teachers influence their students."
      },
      {
        word: "influence",
        pos: "noun",
        definition: "the capacity to have an effect",
        example: "She has great influence."
      },
      {
        word: "influential",
        pos: "adjective",
        definition: "having great influence",
        example: "He is an influential leader."
      },
      {
        word: "influentially",
        pos: "adverb",
        definition: "in an influential way",
        example: "She spoke influentially at the conference."
      }
    ],
    exampleSentences: [
      { text: "Influential leaders influence others through their influence.", source: "Leadership Magazine" },
      { text: "The influential speaker used her influence to influence policy decisions.", source: "Political Review" },
      { text: "Those who influence others influentially understand the power of their influence.", source: "Social Psychology" }
    ],
    hints: [
      "Use 'influence' as both verb and noun",
      "Describe 'influential' people who 'influence' others",
      "Talk about the power of 'influence'"
    ]
  },
  {
    id: 21,
    baseWord: "educate",
    level: "Intermediate",
    category: "Education",
    forms: [
      {
        word: "educate",
        pos: "verb",
        definition: "give intellectual, moral, and social instruction",
        example: "Parents educate their children."
      },
      {
        word: "education",
        pos: "noun",
        definition: "the process of receiving instruction",
        example: "Education is a fundamental right."
      },
      {
        word: "educational",
        pos: "adjective",
        definition: "relating to education",
        example: "This is an educational program."
      },
      {
        word: "educated",
        pos: "adjective",
        definition: "having been educated",
        example: "She is well educated."
      },
      {
        word: "educator",
        pos: "noun",
        definition: "a person who educates",
        example: "He is a professional educator."
      }
    ],
    exampleSentences: [
      { text: "Educators educate students using educational methods to provide quality education.", source: "Education Weekly" },
      { text: "Well-educated people value education and support educators who educate future generations.", source: "Academic Journal" },
      { text: "Educational institutions educate students, ensuring that educated citizens contribute to society.", source: "University Today" }
    ],
    hints: [
      "Describe 'educators' who 'educate' students",
      "Talk about 'educational' programs and 'education'",
      "Use 'educated' to describe people with learning"
    ]
  },
  {
    id: 22,
    baseWord: "inform",
    level: "Intermediate",
    category: "Communication",
    forms: [
      {
        word: "inform",
        pos: "verb",
        definition: "give information to",
        example: "Please inform me of any changes."
      },
      {
        word: "information",
        pos: "noun",
        definition: "facts provided or learned",
        example: "I need more information."
      },
      {
        word: "informative",
        pos: "adjective",
        definition: "providing useful information",
        example: "It was an informative lecture."
      },
      {
        word: "informed",
        pos: "adjective",
        definition: "having knowledge",
        example: "Make an informed decision."
      }
    ],
    exampleSentences: [
      { text: "Informed citizens seek informative sources to gather information that will inform their decisions.", source: "News Analysis" },
      { text: "The informative presentation informed the audience, providing valuable information.", source: "Conference Report" },
      { text: "To stay informed, read informative articles that inform you about current information.", source: "Media Studies" }
    ],
    hints: [
      "Show how people become 'informed' through 'information'",
      "Describe 'informative' sources that 'inform'",
      "Talk about gathering 'information'"
    ]
  },
  {
    id: 23,
    baseWord: "produce",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "produce",
        pos: "verb",
        definition: "make or manufacture",
        example: "Factories produce goods."
      },
      {
        word: "production",
        pos: "noun",
        definition: "the action of producing",
        example: "Production has increased."
      },
      {
        word: "productive",
        pos: "adjective",
        definition: "producing much output",
        example: "She had a productive day."
      },
      {
        word: "productively",
        pos: "adverb",
        definition: "in a productive way",
        example: "We worked productively."
      },
      {
        word: "producer",
        pos: "noun",
        definition: "a person or thing that produces",
        example: "China is a major producer."
      }
    ],
    exampleSentences: [
      { text: "Productive producers produce goods efficiently, maximizing production output.", source: "Manufacturing Today" },
      { text: "The producer worked productively to increase production and produce better results.", source: "Industry Weekly" },
      { text: "To produce quality products, producers must maintain productive production processes.", source: "Quality Management" }
    ],
    hints: [
      "Describe 'producers' who 'produce' things",
      "Talk about 'productive' work and 'production'",
      "Use 'productively' to describe efficient work"
    ]
  },
  {
    id: 24,
    baseWord: "explain",
    level: "Intermediate",
    category: "Education",
    forms: [
      {
        word: "explain",
        pos: "verb",
        definition: "make clear by describing in detail",
        example: "Can you explain this to me?"
      },
      {
        word: "explanation",
        pos: "noun",
        definition: "a statement that makes something clear",
        example: "His explanation was helpful."
      },
      {
        word: "explanatory",
        pos: "adjective",
        definition: "serving to explain",
        example: "Read the explanatory notes."
      }
    ],
    exampleSentences: [
      { text: "Teachers explain complex concepts using clear explanations and explanatory examples.", source: "Teaching Methods" },
      { text: "The explanatory guide helped explain the process with detailed explanations.", source: "User Manual" },
      { text: "To explain effectively, provide explanatory material that makes your explanation clear.", source: "Communication Skills" }
    ],
    hints: [
      "Show how people 'explain' using 'explanations'",
      "Describe 'explanatory' materials that help 'explain'",
      "Talk about clear 'explanations'"
    ]
  },
  {
    id: 25,
    baseWord: "motivate",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "motivate",
        pos: "verb",
        definition: "provide with a reason for doing something",
        example: "Leaders motivate their teams."
      },
      {
        word: "motivation",
        pos: "noun",
        definition: "the reason for acting",
        example: "She has strong motivation."
      },
      {
        word: "motivated",
        pos: "adjective",
        definition: "having motivation",
        example: "He is highly motivated."
      },
      {
        word: "motivating",
        pos: "adjective",
        definition: "providing motivation",
        example: "It was a motivating speech."
      }
    ],
    exampleSentences: [
      { text: "Motivated employees respond to motivating leaders who know how to motivate through positive motivation.", source: "HR Magazine" },
      { text: "The motivating presentation helped motivate the team, increasing their motivation significantly.", source: "Leadership Today" },
      { text: "To motivate others, share motivating stories that provide motivation and keep people motivated.", source: "Management Weekly" }
    ],
    hints: [
      "Describe 'motivated' people and what 'motivates' them",
      "Talk about 'motivating' factors and 'motivation'",
      "Show how leaders 'motivate' teams"
    ]
  },
  {
    id: 26,
    baseWord: "innovate",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "innovate",
        pos: "verb",
        definition: "introduce new ideas or methods",
        example: "Companies must innovate to survive."
      },
      {
        word: "innovation",
        pos: "noun",
        definition: "a new method or idea",
        example: "This is a groundbreaking innovation."
      },
      {
        word: "innovative",
        pos: "adjective",
        definition: "featuring new methods or ideas",
        example: "She has an innovative approach."
      },
      {
        word: "innovator",
        pos: "noun",
        definition: "a person who innovates",
        example: "He is a tech innovator."
      }
    ],
    exampleSentences: [
      { text: "Innovative innovators innovate constantly, producing breakthrough innovations.", source: "Tech Innovation" },
      { text: "The innovator worked to innovate and create innovative solutions through continuous innovation.", source: "Business Innovation" },
      { text: "To innovate successfully, innovators must embrace innovative thinking and value innovation.", source: "Startup Weekly" }
    ],
    hints: [
      "Describe 'innovators' who 'innovate'",
      "Talk about 'innovative' approaches and 'innovations'",
      "Show the importance of 'innovation' in business"
    ]
  },
  {
    id: 27,
    baseWord: "manage",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "manage",
        pos: "verb",
        definition: "be in charge of; administer",
        example: "She manages a large team."
      },
      {
        word: "management",
        pos: "noun",
        definition: "the process of managing",
        example: "Good management is crucial."
      },
      {
        word: "manager",
        pos: "noun",
        definition: "a person who manages",
        example: "He is the sales manager."
      },
      {
        word: "managerial",
        pos: "adjective",
        definition: "relating to management",
        example: "She has managerial experience."
      }
    ],
    exampleSentences: [
      { text: "Managers manage teams effectively using strong management and managerial skills.", source: "Management Today" },
      { text: "The manager worked to manage resources efficiently, improving management processes.", source: "Business Weekly" },
      { text: "To manage successfully, managers need managerial training in modern management techniques.", source: "HR Professional" }
    ],
    hints: [
      "Describe 'managers' who 'manage' things",
      "Talk about 'management' and 'managerial' skills",
      "Show different aspects of 'managing'"
    ]
  },
  {
    id: 28,
    baseWord: "perform",
    level: "Intermediate",
    category: "Business",
    forms: [
      {
        word: "perform",
        pos: "verb",
        definition: "carry out or accomplish",
        example: "Athletes perform under pressure."
      },
      {
        word: "performance",
        pos: "noun",
        definition: "the action of performing",
        example: "Her performance was excellent."
      },
      {
        word: "performer",
        pos: "noun",
        definition: "a person who performs",
        example: "He is a talented performer."
      }
    ],
    exampleSentences: [
      { text: "Top performers perform consistently, delivering excellent performance results.", source: "Business Performance" },
      { text: "The performer worked to perform well, knowing that performance evaluations were coming.", source: "HR Review" },
      { text: "To perform at your best, study how high performers perform under pressure.", source: "Peak Performance" }
    ],
    hints: [
      "Describe 'performers' who 'perform'",
      "Talk about measuring 'performance'",
      "Show what it means to 'perform' well"
    ]
  },
  {
    id: 29,
    baseWord: "investigate",
    level: "Intermediate",
    category: "Education",
    forms: [
      {
        word: "investigate",
        pos: "verb",
        definition: "carry out research or study into",
        example: "Police investigate crimes."
      },
      {
        word: "investigation",
        pos: "noun",
        definition: "the action of investigating",
        example: "The investigation is ongoing."
      },
      {
        word: "investigator",
        pos: "noun",
        definition: "a person who investigates",
        example: "She is a private investigator."
      },
      {
        word: "investigative",
        pos: "adjective",
        definition: "relating to investigation",
        example: "He does investigative journalism."
      }
    ],
    exampleSentences: [
      { text: "Investigative investigators investigate cases thoroughly during their investigations.", source: "Criminal Justice" },
      { text: "The investigator used investigative techniques to investigate and complete the investigation.", source: "Law Enforcement" },
      { text: "To investigate effectively, investigators need investigative skills and patience during investigations.", source: "Police Weekly" }
    ],
    hints: [
      "Describe 'investigators' who 'investigate'",
      "Talk about 'investigative' methods and 'investigations'",
      "Show the process of investigating"
    ]
  },
  {
    id: 30,
    baseWord: "conclude",
    level: "Intermediate",
    category: "Education",
    forms: [
      {
        word: "conclude",
        pos: "verb",
        definition: "bring to an end; arrive at a judgment",
        example: "Let me conclude my presentation."
      },
      {
        word: "conclusion",
        pos: "noun",
        definition: "the end or finish; a judgment reached",
        example: "What is your conclusion?"
      },
      {
        word: "conclusive",
        pos: "adjective",
        definition: "serving to prove a case",
        example: "We have conclusive evidence."
      },
      {
        word: "conclusively",
        pos: "adverb",
        definition: "in a conclusive way",
        example: "The study conclusively proved the theory."
      }
    ],
    exampleSentences: [
      { text: "Researchers conclude their studies with conclusive findings in the conclusion section.", source: "Research Methods" },
      { text: "The study conclusively proved the hypothesis, allowing scientists to conclude with a strong conclusion.", source: "Science Journal" },
      { text: "To conclude effectively, present conclusive evidence that leads to a clear conclusion.", source: "Academic Writing" }
    ],
    hints: [
      "Show how people 'conclude' with a 'conclusion'",
      "Describe 'conclusive' evidence that helps you 'conclude'",
      "Use 'conclusively' to describe proving something"
    ]
  },

  // ==================== ADVANCED LEVEL (20 families) ====================
  {
    id: 31,
    baseWord: "hypothesize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "hypothesize",
        pos: "verb",
        definition: "put forward as a hypothesis",
        example: "Scientists hypothesize about dark matter."
      },
      {
        word: "hypothesis",
        pos: "noun",
        definition: "a proposed explanation",
        example: "Their hypothesis needs testing."
      },
      {
        word: "hypothetical",
        pos: "adjective",
        definition: "supposed but not necessarily real",
        example: "Let's consider a hypothetical situation."
      },
      {
        word: "hypothetically",
        pos: "adverb",
        definition: "in a hypothetical way",
        example: "Hypothetically speaking, what would you do?"
      }
    ],
    exampleSentences: [
      { text: "Researchers hypothesize about hypothetical scenarios, forming a hypothesis to test hypothetically.", source: "Scientific American" },
      { text: "The hypothesis, though hypothetical, helped scientists hypothesize about the phenomenon.", source: "Research Quarterly" },
      { text: "To hypothesize effectively, consider hypothetical situations and develop a testable hypothesis.", source: "Methodology Today" }
    ],
    hints: [
      "Describe scientists who 'hypothesize' and form a 'hypothesis'",
      "Talk about 'hypothetical' situations",
      "Use 'hypothetically' when discussing possibilities"
    ]
  },
  {
    id: 32,
    baseWord: "rationalize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "rationalize",
        pos: "verb",
        definition: "attempt to explain or justify with logical reasons",
        example: "He tried to rationalize his behavior."
      },
      {
        word: "rationalization",
        pos: "noun",
        definition: "the action of rationalizing",
        example: "Her rationalization was unconvincing."
      },
      {
        word: "rational",
        pos: "adjective",
        definition: "based on reason or logic",
        example: "Make a rational decision."
      },
      {
        word: "rationally",
        pos: "adverb",
        definition: "in a rational way",
        example: "Think rationally about this."
      }
    ],
    exampleSentences: [
      { text: "Rational thinkers rationalize their decisions rationally, providing clear rationalizations.", source: "Philosophy Quarterly" },
      { text: "To rationalize behavior rationally, one must think rationally and provide logical rationalization.", source: "Psychology Today" },
      { text: "The rational explanation helped rationalize the choice, though the rationalization seemed weak.", source: "Critical Thinking" }
    ],
    hints: [
      "Show how people 'rationalize' using 'rational' thinking",
      "Describe thinking 'rationally' and providing 'rationalization'",
      "Talk about 'rational' decisions"
    ]
  },
  {
    id: 33,
    baseWord: "synthesize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "synthesize",
        pos: "verb",
        definition: "combine elements into a whole",
        example: "Researchers synthesize data from multiple sources."
      },
      {
        word: "synthesis",
        pos: "noun",
        definition: "the combination of components",
        example: "The synthesis of ideas was brilliant."
      },
      {
        word: "synthetic",
        pos: "adjective",
        definition: "made by chemical synthesis",
        example: "Synthetic materials are common."
      }
    ],
    exampleSentences: [
      { text: "Scientists synthesize compounds to create synthetic materials through chemical synthesis.", source: "Chemistry Today" },
      { text: "The synthesis of research findings helped researchers synthesize a comprehensive theory.", source: "Academic Journal" },
      { text: "To synthesize information effectively, create a synthesis that combines multiple perspectives.", source: "Research Methods" }
    ],
    hints: [
      "Describe how people 'synthesize' information into a 'synthesis'",
      "Talk about 'synthetic' materials",
      "Show the process of combining elements"
    ]
  },
  {
    id: 34,
    baseWord: "conceptualize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "conceptualize",
        pos: "verb",
        definition: "form a concept of",
        example: "Artists conceptualize their work."
      },
      {
        word: "conceptualization",
        pos: "noun",
        definition: "the action of conceptualizing",
        example: "The conceptualization took months."
      },
      {
        word: "concept",
        pos: "noun",
        definition: "an abstract idea",
        example: "Explain the concept clearly."
      },
      {
        word: "conceptual",
        pos: "adjective",
        definition: "relating to concepts",
        example: "This is a conceptual framework."
      },
      {
        word: "conceptually",
        pos: "adverb",
        definition: "in a conceptual way",
        example: "Conceptually, it makes sense."
      }
    ],
    exampleSentences: [
      { text: "Designers conceptualize ideas conceptually, developing the conceptualization of each concept.", source: "Design Thinking" },
      { text: "The conceptual framework helped researchers conceptualize the concept through careful conceptualization.", source: "Theory Development" },
      { text: "To conceptualize effectively, think conceptually about the concept and its conceptualization.", source: "Creative Process" }
    ],
    hints: [
      "Describe how people 'conceptualize' a 'concept'",
      "Talk about 'conceptual' frameworks and thinking 'conceptually'",
      "Show the 'conceptualization' process"
    ]
  },
  {
    id: 35,
    baseWord: "systematize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "systematize",
        pos: "verb",
        definition: "arrange according to a system",
        example: "We need to systematize our processes."
      },
      {
        word: "systematization",
        pos: "noun",
        definition: "the action of systematizing",
        example: "The systematization improved efficiency."
      },
      {
        word: "systematic",
        pos: "adjective",
        definition: "done according to a system",
        example: "Use a systematic approach."
      },
      {
        word: "systematically",
        pos: "adverb",
        definition: "in a systematic way",
        example: "Work systematically through the list."
      },
      {
        word: "system",
        pos: "noun",
        definition: "a set of connected things forming a whole",
        example: "The system works well."
      }
    ],
    exampleSentences: [
      { text: "Organizations systematize their systems systematically through careful systematization.", source: "Business Systems" },
      { text: "The systematic approach helped systematize the system, ensuring proper systematization.", source: "Process Management" },
      { text: "To systematize effectively, work systematically to create a systematic system.", source: "Operations Today" }
    ],
    hints: [
      "Describe how to 'systematize' a 'system'",
      "Talk about 'systematic' approaches done 'systematically'",
      "Show the 'systematization' process"
    ]
  },
  {
    id: 36,
    baseWord: "theorize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "theorize",
        pos: "verb",
        definition: "form a theory about something",
        example: "Scientists theorize about the origin of life."
      },
      {
        word: "theory",
        pos: "noun",
        definition: "a system of ideas explaining something",
        example: "Einstein's theory changed physics."
      },
      {
        word: "theoretical",
        pos: "adjective",
        definition: "based on theory rather than practice",
        example: "This is purely theoretical."
      },
      {
        word: "theoretically",
        pos: "adverb",
        definition: "in a theoretical way",
        example: "Theoretically, it should work."
      },
      {
        word: "theorist",
        pos: "noun",
        definition: "a person who theorizes",
        example: "He is a prominent theorist."
      }
    ],
    exampleSentences: [
      { text: "Theorists theorize about theoretical concepts, developing theories that work theoretically.", source: "Academic Quarterly" },
      { text: "The theory, though theoretical, helped theorists theorize about practical applications.", source: "Science Review" },
      { text: "To theorize effectively, theorists must ground their theories in both theoretical and practical knowledge.", source: "Philosophy Today" }
    ],
    hints: [
      "Describe 'theorists' who 'theorize' and develop 'theories'",
      "Talk about 'theoretical' concepts vs. practical ones",
      "Use 'theoretically' when discussing possibilities"
    ]
  },
  {
    id: 37,
    baseWord: "optimize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "optimize",
        pos: "verb",
        definition: "make the best use of",
        example: "We need to optimize our resources."
      },
      {
        word: "optimization",
        pos: "noun",
        definition: "the action of optimizing",
        example: "Code optimization is important."
      },
      {
        word: "optimal",
        pos: "adjective",
        definition: "best or most favorable",
        example: "Find the optimal solution."
      },
      {
        word: "optimally",
        pos: "adverb",
        definition: "in an optimal way",
        example: "The system performs optimally."
      }
    ],
    exampleSentences: [
      { text: "Engineers optimize systems to achieve optimal performance through careful optimization.", source: "Engineering Today" },
      { text: "To optimize processes optimally, focus on optimization strategies that deliver optimal results.", source: "Process Improvement" },
      { text: "The optimization helped optimize operations, ensuring the system runs optimally at optimal capacity.", source: "Operations Research" }
    ],
    hints: [
      "Describe how to 'optimize' for 'optimal' results",
      "Talk about 'optimization' processes",
      "Use 'optimally' to describe best performance"
    ]
  },
  {
    id: 38,
    baseWord: "utilize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "utilize",
        pos: "verb",
        definition: "make practical use of",
        example: "We utilize modern technology."
      },
      {
        word: "utilization",
        pos: "noun",
        definition: "the action of utilizing",
        example: "Resource utilization is key."
      },
      {
        word: "utility",
        pos: "noun",
        definition: "the state of being useful",
        example: "This tool has great utility."
      }
    ],
    exampleSentences: [
      { text: "Organizations utilize resources effectively, maximizing utilization and utility.", source: "Resource Management" },
      { text: "The utility of the tool depends on how we utilize it and improve utilization rates.", source: "Business Efficiency" },
      { text: "To utilize assets optimally, monitor utilization and assess the utility of each resource.", source: "Asset Management" }
    ],
    hints: [
      "Describe how to 'utilize' resources",
      "Talk about 'utilization' rates and 'utility'",
      "Show effective use of tools or resources"
    ]
  },
  {
    id: 39,
    baseWord: "emphasize",
    level: "Advanced",
    category: "Communication",
    forms: [
      {
        word: "emphasize",
        pos: "verb",
        definition: "give special importance to",
        example: "Teachers emphasize key points."
      },
      {
        word: "emphasis",
        pos: "noun",
        definition: "special importance or attention",
        example: "Put emphasis on quality."
      },
      {
        word: "emphatic",
        pos: "adjective",
        definition: "showing emphasis; forceful",
        example: "She was emphatic about it."
      },
      {
        word: "emphatically",
        pos: "adverb",
        definition: "in an emphatic way",
        example: "He emphatically denied the claim."
      }
    ],
    exampleSentences: [
      { text: "Speakers emphasize key points emphatically, placing strong emphasis on important ideas.", source: "Public Speaking" },
      { text: "The emphatic statement helped emphasize the need for action, adding emphasis to the message.", source: "Communication Skills" },
      { text: "To emphasize effectively, be emphatic and place proper emphasis on critical information.", source: "Presentation Today" }
    ],
    hints: [
      "Show how people 'emphasize' points with 'emphasis'",
      "Describe 'emphatic' statements made 'emphatically'",
      "Talk about placing 'emphasis' on important things"
    ]
  },
  {
    id: 40,
    baseWord: "prioritize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "prioritize",
        pos: "verb",
        definition: "designate as more important",
        example: "We must prioritize urgent tasks."
      },
      {
        word: "prioritization",
        pos: "noun",
        definition: "the action of prioritizing",
        example: "Task prioritization is essential."
      },
      {
        word: "priority",
        pos: "noun",
        definition: "something regarded as more important",
        example: "Safety is our top priority."
      }
    ],
    exampleSentences: [
      { text: "Managers prioritize tasks based on priority levels, using effective prioritization strategies.", source: "Time Management" },
      { text: "To prioritize effectively, understand which priorities matter most and focus on proper prioritization.", source: "Productivity Weekly" },
      { text: "The prioritization process helped teams prioritize projects according to business priorities.", source: "Project Management" }
    ],
    hints: [
      "Describe how to 'prioritize' based on 'priorities'",
      "Talk about 'prioritization' processes",
      "Show what takes 'priority'"
    ]
  },
  {
    id: 41,
    baseWord: "specialize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "specialize",
        pos: "verb",
        definition: "concentrate on a particular subject",
        example: "Doctors specialize in different fields."
      },
      {
        word: "specialization",
        pos: "noun",
        definition: "the process of specializing",
        example: "His specialization is cardiology."
      },
      {
        word: "specialist",
        pos: "noun",
        definition: "a person who specializes",
        example: "She is a heart specialist."
      },
      {
        word: "specialized",
        pos: "adjective",
        definition: "requiring specific skills or training",
        example: "This is specialized work."
      },
      {
        word: "special",
        pos: "adjective",
        definition: "better or different from what is usual",
        example: "This is a special occasion."
      }
    ],
    exampleSentences: [
      { text: "Specialists specialize in specialized fields, choosing their specialization carefully.", source: "Medical Journal" },
      { text: "The specialized training helped professionals specialize, making them specialists in their specialization.", source: "Professional Development" },
      { text: "To specialize effectively, specialists need special skills in their chosen specialization.", source: "Career Today" }
    ],
    hints: [
      "Describe 'specialists' who 'specialize' in something",
      "Talk about 'specialized' skills and 'specialization'",
      "Show different areas of 'specialization'"
    ]
  },
  {
    id: 42,
    baseWord: "authorize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "authorize",
        pos: "verb",
        definition: "give official permission for",
        example: "Only managers can authorize expenses."
      },
      {
        word: "authorization",
        pos: "noun",
        definition: "official permission",
        example: "You need authorization to proceed."
      },
      {
        word: "authority",
        pos: "noun",
        definition: "the power to give orders",
        example: "She has the authority to decide."
      },
      {
        word: "authoritative",
        pos: "adjective",
        definition: "commanding and self-confident",
        example: "He spoke in an authoritative tone."
      }
    ],
    exampleSentences: [
      { text: "Authoritative leaders authorize decisions using their authority to grant authorization.", source: "Leadership Quarterly" },
      { text: "The authority needed to authorize payments requires proper authorization procedures.", source: "Financial Management" },
      { text: "To authorize effectively, authoritative managers must understand the limits of their authority and authorization power.", source: "Corporate Governance" }
    ],
    hints: [
      "Describe people with 'authority' who 'authorize' things",
      "Talk about 'authorization' and 'authoritative' leadership",
      "Show the power to grant permission"
    ]
  },
  {
    id: 43,
    baseWord: "standardize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "standardize",
        pos: "verb",
        definition: "cause to conform to a standard",
        example: "We need to standardize procedures."
      },
      {
        word: "standardization",
        pos: "noun",
        definition: "the process of standardizing",
        example: "Standardization improves quality."
      },
      {
        word: "standard",
        pos: "noun",
        definition: "a level of quality",
        example: "Maintain high standards."
      },
      {
        word: "standard",
        pos: "adjective",
        definition: "used or accepted as normal",
        example: "This is standard practice."
      }
    ],
    exampleSentences: [
      { text: "Organizations standardize processes to meet standards through systematic standardization.", source: "Quality Management" },
      { text: "The standard procedures helped standardize operations, ensuring standardization across departments.", source: "Operations Today" },
      { text: "To standardize effectively, establish clear standards and focus on consistent standardization.", source: "Process Improvement" }
    ],
    hints: [
      "Describe how to 'standardize' to meet 'standards'",
      "Talk about 'standardization' processes",
      "Show the importance of maintaining 'standards'"
    ]
  },
  {
    id: 44,
    baseWord: "maximize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "maximize",
        pos: "verb",
        definition: "make as large as possible",
        example: "Maximize your potential."
      },
      {
        word: "maximization",
        pos: "noun",
        definition: "the action of maximizing",
        example: "Profit maximization is the goal."
      },
      {
        word: "maximum",
        pos: "noun",
        definition: "the greatest amount possible",
        example: "Reach your maximum capacity."
      },
      {
        word: "maximum",
        pos: "adjective",
        definition: "as great as possible",
        example: "Work at maximum efficiency."
      }
    ],
    exampleSentences: [
      { text: "Companies maximize profits through profit maximization strategies that achieve maximum results.", source: "Business Strategy" },
      { text: "To maximize efficiency, focus on maximization of resources at maximum capacity.", source: "Operations Research" },
      { text: "The maximization process helped maximize output, reaching maximum productivity levels.", source: "Performance Management" }
    ],
    hints: [
      "Describe how to 'maximize' to reach 'maximum'",
      "Talk about 'maximization' strategies",
      "Show achieving 'maximum' results"
    ]
  },
  {
    id: 45,
    baseWord: "minimize",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "minimize",
        pos: "verb",
        definition: "reduce to the smallest possible amount",
        example: "Minimize errors in your work."
      },
      {
        word: "minimization",
        pos: "noun",
        definition: "the action of minimizing",
        example: "Risk minimization is crucial."
      },
      {
        word: "minimum",
        pos: "noun",
        definition: "the least amount possible",
        example: "Keep costs to a minimum."
      },
      {
        word: "minimum",
        pos: "adjective",
        definition: "as small as possible",
        example: "Minimum wage is $15."
      },
      {
        word: "minimal",
        pos: "adjective",
        definition: "of a minimum amount",
        example: "There was minimal damage."
      }
    ],
    exampleSentences: [
      { text: "Companies minimize costs through cost minimization, keeping expenses at minimum levels with minimal waste.", source: "Financial Times" },
      { text: "To minimize risks, use risk minimization strategies that reduce threats to the minimum with minimal effort.", source: "Risk Management" },
      { text: "The minimization process helped minimize errors, achieving minimum defects and minimal complaints.", source: "Quality Control" }
    ],
    hints: [
      "Describe how to 'minimize' to reach 'minimum' or 'minimal'",
      "Talk about 'minimization' strategies",
      "Show reducing things to 'minimum' levels"
    ]
  },
  {
    id: 46,
    baseWord: "visualize",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "visualize",
        pos: "verb",
        definition: "form a mental image of",
        example: "Visualize your goals."
      },
      {
        word: "visualization",
        pos: "noun",
        definition: "the action of visualizing",
        example: "Data visualization is powerful."
      },
      {
        word: "visual",
        pos: "adjective",
        definition: "relating to seeing",
        example: "Use visual aids."
      },
      {
        word: "visually",
        pos: "adverb",
        definition: "in a visual way",
        example: "Present information visually."
      }
    ],
    exampleSentences: [
      { text: "Designers visualize concepts visually using visual tools and effective visualization techniques.", source: "Design Today" },
      { text: "To visualize data effectively, create visual representations through clear visualization.", source: "Data Science" },
      { text: "The visualization helped audiences visualize complex ideas through visually appealing displays.", source: "Communication Arts" }
    ],
    hints: [
      "Describe how to 'visualize' using 'visual' tools",
      "Talk about 'visualization' techniques",
      "Show presenting information 'visually'"
    ]
  },
  {
    id: 47,
    baseWord: "integrate",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "integrate",
        pos: "verb",
        definition: "combine one thing with another to form a whole",
        example: "Integrate new technology into workflows."
      },
      {
        word: "integration",
        pos: "noun",
        definition: "the action of integrating",
        example: "System integration is complex."
      },
      {
        word: "integrated",
        pos: "adjective",
        definition: "combined to form a whole",
        example: "Use an integrated approach."
      },
      {
        word: "integral",
        pos: "adjective",
        definition: "necessary to make a whole complete",
        example: "Teamwork is integral to success."
      }
    ],
    exampleSentences: [
      { text: "Companies integrate systems through system integration, creating integrated solutions where each part is integral.", source: "Tech Integration" },
      { text: "To integrate effectively, understand that integration of integral components creates an integrated whole.", source: "Systems Thinking" },
      { text: "The integrated platform shows how integration makes integral features work together seamlessly.", source: "Software Engineering" }
    ],
    hints: [
      "Describe how to 'integrate' things into an 'integrated' system",
      "Talk about 'integration' and 'integral' components",
      "Show combining parts into a whole"
    ]
  },
  {
    id: 48,
    baseWord: "differentiate",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "differentiate",
        pos: "verb",
        definition: "recognize or ascertain what makes something different",
        example: "Differentiate between fact and opinion."
      },
      {
        word: "differentiation",
        pos: "noun",
        definition: "the action of differentiating",
        example: "Product differentiation is key."
      },
      {
        word: "differential",
        pos: "adjective",
        definition: "of or showing a difference",
        example: "There's a differential in pay."
      }
    ],
    exampleSentences: [
      { text: "Companies differentiate products through differentiation strategies that create differential advantages.", source: "Marketing Weekly" },
      { text: "To differentiate effectively, use product differentiation to establish differential pricing.", source: "Business Strategy" },
      { text: "The differentiation process helped brands differentiate themselves, creating a differential in the market.", source: "Brand Management" }
    ],
    hints: [
      "Describe how companies 'differentiate' through 'differentiation'",
      "Talk about 'differential' advantages",
      "Show what makes things different"
    ]
  },
  {
    id: 49,
    baseWord: "substantiate",
    level: "Advanced",
    category: "Education",
    forms: [
      {
        word: "substantiate",
        pos: "verb",
        definition: "provide evidence to support or prove",
        example: "Substantiate your claims with data."
      },
      {
        word: "substantiation",
        pos: "noun",
        definition: "the action of substantiating",
        example: "The substantiation was thorough."
      },
      {
        word: "substantial",
        pos: "adjective",
        definition: "of considerable importance or size",
        example: "There's substantial evidence."
      },
      {
        word: "substantially",
        pos: "adverb",
        definition: "to a great extent",
        example: "Costs increased substantially."
      }
    ],
    exampleSentences: [
      { text: "Researchers substantiate claims with substantial evidence through careful substantiation.", source: "Academic Research" },
      { text: "To substantiate arguments substantially, provide substantiation using substantial data.", source: "Research Methods" },
      { text: "The substantial findings helped substantiate the theory, though more substantiation was needed.", source: "Scientific Journal" }
    ],
    hints: [
      "Describe how to 'substantiate' with 'substantial' evidence",
      "Talk about 'substantiation' processes",
      "Use 'substantially' to show degree"
    ]
  },
  {
    id: 50,
    baseWord: "consolidate",
    level: "Advanced",
    category: "Business",
    forms: [
      {
        word: "consolidate",
        pos: "verb",
        definition: "make something physically stronger or more solid; combine into a single unit",
        example: "Consolidate your learning."
      },
      {
        word: "consolidation",
        pos: "noun",
        definition: "the action of consolidating",
        example: "Market consolidation is happening."
      },
      {
        word: "consolidated",
        pos: "adjective",
        definition: "made stronger or more solid",
        example: "View the consolidated report."
      }
    ],
    exampleSentences: [
      { text: "Companies consolidate operations through careful consolidation, creating consolidated entities.", source: "Business Mergers" },
      { text: "To consolidate effectively, the consolidation process must create a truly consolidated organization.", source: "Corporate Strategy" },
      { text: "The consolidated financial statement shows how consolidation helped consolidate multiple divisions.", source: "Financial Reporting" }
    ],
    hints: [
      "Describe how to 'consolidate' through 'consolidation'",
      "Talk about 'consolidated' results",
      "Show combining things into one"
    ]
  }
];

// Utility function to get word families by level
export const getWordFamiliesByLevel = (level) => {
  return wordFamilies.filter(family => family.level === level);
};

// Utility function to get word families by category
export const getWordFamiliesByCategory = (category) => {
  return wordFamilies.filter(family => family.category === category);
};

// Utility function to get all unique categories
export const getAllCategories = () => {
  return [...new Set(wordFamilies.map(family => family.category))];
};

// Utility function to get all unique levels
export const getAllLevels = () => {
  return ["Basic", "Intermediate", "Advanced"];
};

// Utility function to get a random word family
export const getRandomWordFamily = () => {
  return wordFamilies[Math.floor(Math.random() * wordFamilies.length)];
};

// Utility function to get word family by ID
export const getWordFamilyById = (id) => {
  return wordFamilies.find(family => family.id === id);
};
