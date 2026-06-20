import type { Module, Topic, Question } from '../types';

function makeMcq(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[],
  solutionSteps?: string[]
): Question {
  const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return {
    id,
    type: 'mcq',
    prompt,
    options,
    correctIndex: options.indexOf(correct),
    explanation,
    difficulty,
    tags,
    solutionSteps,
  };
}

function makeRewrite(
  id: string,
  givenSentence: string,
  prompt: string,
  modelAnswer: string,
  acceptedAnswers: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[],
  solutionSteps?: string[]
): Question {
  return {
    id,
    type: 'rewrite',
    prompt,
    givenSentence,
    correctAnswer: modelAnswer,
    acceptedAnswers,
    explanation,
    difficulty,
    tags,
    solutionSteps,
  };
}

const tenses: Topic = {
  id: 'tenses',
  title: 'Tenses (Zeitformen)',
  summary: 'Present Perfect vs Past Simple, Past Perfect, future forms — the essentials.',
  lesson: {
    intro:
      'English has many tenses, but for the Oberstufe you need a solid grasp of the most common ones — especially the difference between Present Perfect and Past Simple.',
    rules: [
      {
        title: 'Present Perfect vs Past Simple',
        body: 'Present Perfect (have + past participle) is used for experiences with present relevance, recent events, or unfinished time. Past Simple is used for finished events at a specific past time.',
        examples: [
          'I have visited Paris three times. (life experience)',
          'I visited Paris last summer. (finished, specific time)',
          'She has lived here for 5 years. (still lives here)',
        ],
      },
      {
        title: 'Past Perfect',
        body: 'Used for an action that was completed before another past action. Form: had + past participle.',
        examples: [
          'When I arrived, the film had already started.',
          'She had studied English before she moved to London.',
        ],
      },
      {
        title: 'Future forms',
        body: 'will + infinitive (decisions, predictions), going to + infinitive (plans, predictions based on evidence), Present Continuous (arrangements).',
        examples: [
          'I will help you tomorrow. (decision)',
          'I am going to study medicine. (plan)',
          'I am meeting John at 6 pm. (arrangement)',
        ],
      },
      {
        title: 'Signal words (typical time markers)',
        body: 'Each tense has typical signal words. Recognise them to choose the right tense.',
        examples: [
          'Present Perfect: ever, never, already, yet, just, recently, so far',
          'Past Simple: yesterday, ago, last week, in 2010, when I was young',
          'Future: tomorrow, next week, in the future',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      't1',
      'Choose the correct form:\n\n"I ___ (visit) Paris three times in my life."',
      'have visited',
      ['visited', 'have visit', 'am visiting'],
      'Life experience with "three times" + "in my life" → Present Perfect (have + past participle).',
      1,
      ['tense', 'present-perfect'],
      [
        'Identify the signal: "three times in my life" → life experience, still relevant.',
        'Rule: life experiences use Present Perfect (have + past participle).',
        'Form: visit → visited (past participle) → have visited.',
        'Wrong: "have visit" (no past participle), "visited" (no present relevance).',
      ]
    ),
    makeMcq(
      't2',
      'Choose the correct form:\n\n"I ___ (go) to the cinema yesterday."',
      'went',
      ['have gone', 'had gone', 'was going'],
      '"Yesterday" = specific past time → Past Simple. go → went (irregular).',
      1,
      ['tense', 'past-simple'],
      [
        'Identify the signal: "yesterday" → specific past time.',
        'Rule: specific past times use Past Simple.',
        'Form: go is irregular → went (NOT "goed").',
        'Wrong: "have gone" (Present Perfect, no present relevance here), "had gone" (Past Perfect, no earlier past event).',
      ]
    ),
    makeMcq(
      't3',
      'Choose the correct form:\n\n"When I arrived, the film ___ (already start)."',
      'had already started',
      ['has already started', 'already started', 'was already starting'],
      'Past Perfect for an action completed BEFORE another past action. "already" + "arrived" (past) → earlier past action.',
      2,
      ['tense', 'past-perfect'],
      [
        'Identify the context: TWO past actions — "arrived" and "started".',
        'Which happened first? "Started" (before arrival).',
        'Earlier past action → Past Perfect (had + past participle).',
        'Form: start → started → had started. With "already": had already started.',
      ]
    ),
    makeMcq(
      't4',
      'Choose the correct form:\n\n"Look at the clouds! It ___ (rain)."',
      'is going to rain',
      ['will rain', 'rains', 'is raining'],
      'Prediction based on present evidence (clouds) → going to. NOT will (will = decision/prediction without evidence).',
      2,
      ['tense', 'future'],
      [
        'Identify the cue: "Look at the clouds" = present evidence.',
        'Rule: predictions based on present evidence use "going to".',
        'Form: be going to + infinitive → is going to rain.',
        'Wrong: "will rain" (decision/prediction, no evidence), "is raining" (present, not future).',
      ]
    ),
    makeMcq(
      't5',
      'Choose the correct form:\n\n"I ___ (live) in Berlin for five years now."',
      'have lived',
      ['am living', 'lived', 'had lived'],
      '"For five years now" + still relevant → Present Perfect (continuous, but simple also acceptable).',
      2,
      ['tense', 'present-perfect'],
      [
        'Identify the signal: "for five years now" + present relevance.',
        'Rule: actions starting in the past and still continuing → Present Perfect.',
        'Form: live → lived → have lived.',
        '"am living" = present only, no connection to past start.',
      ]
    ),
    makeMcq(
      't6',
      'Choose the correct form:\n\n"She ___ (meet) him at a party last weekend."',
      'met',
      ['has met', 'had met', 'is meeting'],
      '"Last weekend" = specific past time → Past Simple. meet → met (irregular).',
      1,
      ['tense', 'past-simple'],
      [
        'Identify the signal: "last weekend" = specific past time.',
        'Rule: Past Simple for specific past events.',
        'Form: meet is irregular → met.',
        '"has met" needs present relevance, which is not given here.',
      ]
    ),
    makeMcq(
      't7',
      'Choose the correct form:\n\n"By the time you arrive, I ___ (finish) dinner."',
      'will have finished',
      ['finish', 'will finish', 'have finished'],
      'Future Perfect for an action that will be completed BEFORE a future point. By + future time marker.',
      3,
      ['tense', 'future-perfect'],
      [
        'Identify the structure: "By the time you arrive" (future point).',
        'Rule: action completed BEFORE a future point → Future Perfect.',
        'Form: will have + past participle → will have finished.',
        '"will finish" = simple future, action not yet completed at that point.',
      ]
    ),
  ],
};

const conditionals: Topic = {
  id: 'conditionals',
  title: 'Conditionals (If-Sätze)',
  summary: 'Type 1, 2, 3, and mixed conditionals — for logical thinking and essays.',
  lesson: {
    intro:
      'Conditionals describe a cause and its effect. English has three main types and mixed forms — essential for argumentative writing.',
    rules: [
      {
        title: 'Type 1: Real / Likely',
        body: 'Real situation in the present or future. If + Present Simple, will + infinitive.',
        examples: [
          'If it rains, I will stay home.',
          'If you study hard, you will pass the exam.',
          'If she calls, I will tell her.',
        ],
      },
      {
        title: 'Type 2: Unreal / Hypothetical Present',
        body: 'Unreal or unlikely situation in the present. If + Past Simple, would + infinitive.',
        examples: [
          'If I won the lottery, I would travel the world. (but I will not win)',
          'If I were you, I would apologize.',
          'If we had more time, we would visit the museum.',
        ],
      },
      {
        title: 'Type 3: Unreal Past',
        body: 'Unreal situation in the past. If + Past Perfect, would have + past participle.',
        examples: [
          'If I had studied harder, I would have passed the exam.',
          'If they had left earlier, they would have caught the train.',
        ],
      },
      {
        title: 'Mixed Conditionals',
        body: 'Mixing time frames: present result of a past condition, or past result of a present condition.',
        examples: [
          'If I had studied medicine, I would be a doctor now. (past condition → present result)',
          'If I were braver, I would have spoken up yesterday. (present condition → past result)',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'c1',
      'Choose the correct form:\n\n"If it ___ (rain), I will stay home."',
      'rains',
      ['will rain', 'rained', 'would rain'],
      'Type 1: real/likely. If-clause = Present Simple (rains), main clause = will + infinitive.',
      1,
      ['conditional', 'type-1'],
      [
        'Identify the conditional type: "If it rains, I will stay home" — Type 1 (real, likely).',
        'Rule: Type 1 uses Present Simple in the if-clause, will + infinitive in the main clause.',
        'Form: rain → rains (3rd person singular, present simple).',
        '"will rain" in if-clause is wrong — English uses present tense for the condition.',
      ]
    ),
    makeMcq(
      'c2',
      'Choose the correct form:\n\n"If I ___ (be) you, I would apologise."',
      'were',
      ['am', 'was', 'be'],
      'Type 2: unreal present. Standard formula: If I were you (subjunctive). "If I was" is colloquial but grammatically "were" is correct.',
      1,
      ['conditional', 'type-2', 'subjunctive'],
      [
        'Identify the type: "If I were you, I would" — Type 2 (unreal present, advice).',
        'Rule: Type 2 uses Past Simple in the if-clause.',
        'For "to be" in 1st/3rd person singular, use "were" (subjunctive).',
        'Even though "was" is common in speech, "were" is the grammatically correct form.',
      ]
    ),
    makeMcq(
      'c3',
      'Choose the correct form:\n\n"If she ___ (study) harder, she would have passed the exam."',
      'had studied',
      ['studied', 'has studied', 'would study'],
      'Type 3: unreal past. If-clause = Past Perfect (had + past participle).',
      2,
      ['conditional', 'type-3'],
      [
        'Identify the type: "would have passed" in main clause → Type 3 (unreal past).',
        'Rule: Type 3 uses Past Perfect in the if-clause.',
        'Form: study → studied → had studied.',
        '"studied" is Past Simple — wrong, the past action must be earlier than another past action.',
      ]
    ),
    makeMcq(
      'c4',
      'Choose the correct form:\n\n"If I had won the lottery, I ___ (travel) the world."',
      'would travel',
      ['will travel', 'would have travelled', 'travelled'],
      'Type 2: unreal present (but speaker can dream). If-clause = Past Simple (won), main = would + infinitive.',
      2,
      ['conditional', 'type-2'],
      [
        'Identify the type: speaker is imagining a present/future action ("I would travel") that is unlikely.',
        'Rule: Type 2 uses Past Simple in if-clause, would + infinitive in main clause.',
        'Form: travel → would travel.',
        '"would have travelled" is Type 3 (unreal past) — wrong here.',
      ]
    ),
    makeMcq(
      'c5',
      'Choose the correct conditional type:\n\n"If you had told me earlier, I would have helped you."',
      'Type 3 (unreal past)',
      ['Type 1 (real)', 'Type 2 (unreal present)', 'Type 0 (general truth)'],
      '"had told" + "would have helped" = Past Perfect + would have + past participle = Type 3.',
      3,
      ['conditional', 'type-3'],
      [
        'Identify the forms: "had told" (Past Perfect), "would have helped" (would have + past participle).',
        'Rule: Past Perfect in if-clause + would have + past participle in main clause = Type 3.',
        'Meaning: past action did not happen → past result did not happen either.',
      ]
    ),
    makeMcq(
      'c6',
      'Choose the correct form:\n\n"If I ___ (have) more time, I would learn Spanish."',
      'had',
      ['have', 'will have', 'would have'],
      'Type 2: if-clause = Past Simple. have → had.',
      2,
      ['conditional', 'type-2'],
      [
        'Identify the type: "I would learn" = unreal/imagined present → Type 2.',
        'Rule: Type 2 uses Past Simple in if-clause.',
        'Form: have → had (Past Simple, all persons except singular use "had" naturally).',
      ]
    ),
  ],
};

const passive: Topic = {
  id: 'passive',
  title: 'Passive Voice',
  summary: 'Active vs Passive — when to use, how to form in all tenses.',
  lesson: {
    intro:
      'In the passive voice, the action is more important than the doer. This is common in academic and scientific writing.',
    rules: [
      {
        title: 'Form: be + past participle',
        body: 'Passive = form of "be" (conjugated for tense) + past participle. The doer is introduced by "by" (optional).',
        examples: [
          'Active: "They build houses." → Passive: "Houses are built (by them)."',
          'Active: "She wrote the letter." → Passive: "The letter was written (by her)."',
        ],
      },
      {
        title: 'Tense changes in passive',
        body: 'Only the form of "be" changes — the past participle stays the same.',
        examples: [
          'Present Simple: Active "builds" → Passive "is built"',
          'Past Simple: Active "wrote" → Passive "was written"',
          'Present Perfect: Active "has written" → Passive "has been written"',
          'Future: Active "will build" → Passive "will be built"',
        ],
      },
      {
        title: 'When to use passive',
        body: 'Use passive when the action or the receiver is more important than the doer, when the doer is unknown, or in scientific writing.',
        examples: [
          '"The window was broken." (we do not know who)',
          '"The experiment was conducted in 2020." (scientific style)',
          '"German is spoken in Germany." (general fact)',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'p1',
      'Change to passive:\n\n"They built the house in 1990."',
      'The house was built in 1990.',
      ['The house is built in 1990.', 'The house has been built in 1990.', 'The house built in 1990.'],
      'Past Simple passive: was/were + past participle. "They" → "the house" (object of active = subject of passive).',
      2,
      ['passive', 'past-simple'],
      [
        'Identify the tense: "built" (Past Simple) → passive needs "was/were + built".',
        'Identify the object: "the house" — this becomes the subject of the passive sentence.',
        'Form: The house was built.',
        'Add the time: "in 1990".',
      ]
    ),
    makeMcq(
      'p2',
      'Change to passive:\n\n"Somebody has stolen my bike."',
      'My bike has been stolen.',
      ['My bike is stolen.', 'My bike was stolen.', 'My bike has stolen.'],
      'Present Perfect passive: has/have been + past participle.',
      2,
      ['passive', 'present-perfect'],
      [
        'Identify the tense: "has stolen" (Present Perfect) → passive needs "has/have been + stolen".',
        'Identify the object: "my bike" — this becomes the subject of the passive sentence.',
        'Form: My bike has been stolen.',
        'Doer "somebody" is unknown — we omit it.',
      ]
    ),
    makeMcq(
      'p3',
      'Change to passive:\n\n"They will announce the results tomorrow."',
      'The results will be announced tomorrow.',
      ['The results are announced tomorrow.', 'The results will announce tomorrow.', 'The results have been announced tomorrow.'],
      'Future passive: will be + past participle.',
      2,
      ['passive', 'future'],
      [
        'Identify the tense: "will announce" (Future Simple) → passive needs "will be + announced".',
        'Identify the object: "the results" — becomes the subject.',
        'Form: The results will be announced.',
        'Add the time: "tomorrow".',
      ]
    ),
    makeMcq(
      'p4',
      'Which sentence is in the passive voice?',
      'The cake was eaten by the children.',
      ['The children ate the cake.', 'The children are eating the cake.', 'The children have eaten the cake.'],
      'Passive = be + past participle. "was eaten" is passive. "by the children" introduces the doer.',
      1,
      ['passive', 'identify'],
      [
        'Look for the form "be + past participle".',
        '"was eaten" = passive (was = past of be, eaten = past participle).',
        '"by the children" is the optional doer agent.',
      ]
    ),
    makeMcq(
      'p5',
      'Change to passive:\n\n"They are building a new hospital."',
      'A new hospital is being built.',
      ['A new hospital is built.', 'A new hospital has been built.', 'A new hospital builds.'],
      'Present Continuous passive: is/are being + past participle.',
      3,
      ['passive', 'present-continuous'],
      [
        'Identify the tense: "are building" (Present Continuous) → passive needs "is/are being + built".',
        'Identify the object: "a new hospital" — becomes the subject.',
        'Form: A new hospital is being built.',
        'Doer omitted (often unknown in such cases).',
      ]
    ),
    makeMcq(
      'p6',
      'Change to passive:\n\n"Shakespeare wrote Hamlet."',
      'Hamlet was written by Shakespeare.',
      ['Hamlet wrote by Shakespeare.', 'Hamlet has been written by Shakespeare.', 'Shakespeare was written by Hamlet.'],
      'Past Simple passive: was + past participle. "Shakespeare" (subject of active) becomes "by Shakespeare" in passive.',
      2,
      ['passive', 'past-simple'],
      [
        'Identify the tense: "wrote" (Past Simple) → passive needs "was + written".',
        'Identify the object: "Hamlet" — becomes the subject of passive.',
        'Form: Hamlet was written.',
        'Add doer: "by Shakespeare".',
      ]
    ),
  ],
};

const modals: Topic = {
  id: 'modals',
  title: 'Modals & Advanced',
  summary: 'Modal verbs in past, reported speech, mixed constructions — for confident writing.',
  lesson: {
    intro:
      'Modals express ability, possibility, permission, and obligation. In advanced writing, you also need to handle reported speech and complex structures.',
    rules: [
      {
        title: 'Modal verbs in the past',
        body: 'Modals have past forms: can → could, may → might, will → would, must → had to. They are followed by have + past participle for past actions.',
        examples: [
          'Present: "She can swim." → Past: "She could swim (as a child)."',
          'Present: "He may come." → Past: "He may have come." (possibility in the past)',
          'Present: "She must study." → Past: "She had to study." (obligation in the past)',
        ],
      },
      {
        title: 'Reported Speech',
        body: 'When reporting what someone said, the tense usually shifts one step back. Pronouns and time expressions also change.',
        examples: [
          'Direct: "I am tired." → Reported: He said (that) he was tired.',
          'Direct: "I will help you." → Reported: She said (that) she would help me.',
          'Direct: "Yesterday I met John." → Reported: He said (that) he had met John the day before.',
        ],
      },
      {
        title: 'Gerund vs Infinitive',
        body: 'Some verbs are followed by gerund (-ing), others by infinitive (to + verb), and some take both with different meanings.',
        examples: [
          'Gerund: enjoy, avoid, mind, finish, suggest → "I enjoy reading."',
          'Infinitive: want, decide, hope, plan, promise → "I want to travel."',
          'Both: stop, remember, regret, try → "I stopped smoking" (no longer) vs "I stopped to smoke" (in order to)',
        ],
      },
      {
        title: 'Relative Clauses',
        body: 'Relative clauses add information about a noun. Defining (no commas) and non-defining (with commas) clauses differ.',
        examples: [
          'Defining: "The man who lives next door is a doctor." (essential information)',
          'Non-defining: "My brother, who lives in Berlin, is a doctor." (extra information)',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'm1',
      'Choose the correct form:\n\n"She ___ (can) help us, but she was too busy."',
      'could',
      ['can', 'will can', 'musted'],
      'Past of "can" = "could". With simple past meaning, just "could" (no "have + past participle" needed here).',
      1,
      ['modal', 'past'],
      [
        'Identify the time: "but she was too busy" — past situation.',
        'Rule: past of "can" = "could".',
        'Since it refers to a general past ability, simple "could" is enough.',
        'No need for "could have" here — that would imply a different lost opportunity.',
      ]
    ),
    makeMcq(
      'm3',
      'Choose the correct form:\n\n"I enjoy ___ (read) novels."',
      'reading',
      ['to read', 'read', 'reads'],
      'After "enjoy" use gerund (-ing form).',
      1,
      ['modal', 'gerund-infinitive'],
      [
        'Identify the verb: "enjoy".',
        'Rule: enjoy is followed by the gerund (-ing form), not the infinitive.',
        'Form: read → reading (gerund).',
      ]
    ),
    makeMcq(
      'm4',
      'Choose the correct form:\n\n"I want ___ (travel) to Japan next year."',
      'to travel',
      ['traveling', 'travel', 'travelled'],
      'After "want" use infinitive (to + verb).',
      1,
      ['modal', 'gerund-infinitive'],
      [
        'Identify the verb: "want".',
        'Rule: want is followed by the infinitive (to + verb).',
        'Form: to travel (infinitive).',
        '"traveling" is the gerund — wrong for "want".',
      ]
    ),
    makeMcq(
      'm5',
      'Choose the correct form:\n\n"He ___ (must) leave early yesterday."',
      'had to',
      ['must', 'musted', 'has to'],
      'Past of "must" (obligation) = "had to". "musted" is not a word.',
      2,
      ['modal', 'past'],
      [
        'Identify the time: "yesterday" — past.',
        'Rule: past of "must" (obligation) = "had to".',
        '"musted" is NOT a word — common mistake.',
        'Form: He had to leave early.',
      ]
    ),
    makeMcq(
      'm6',
      'Choose the correct relative clause:\n\n"My sister, ___ lives in Paris, is a doctor."',
      'who',
      ['which', 'where', 'what'],
      'Non-defining relative clause (commas). "who" refers to a person (sister).',
      2,
      ['modal', 'relative-clause'],
      [
        'Identify the structure: commas → non-defining relative clause (extra information).',
        'Identify the antecedent: "My sister" (a person).',
        'Rule: use "who" for people, "which" for things, "where" for places.',
        'Form: My sister, who lives in Paris, is a doctor.',
      ]
    ),
  ],
};

const indirectSpeech: Topic = {
  id: 'indirect-speech',
  title: 'Indirect Speech (Reported Speech)',
  summary: 'Direct → Indirect: tense shifts, pronoun changes, time/place markers.',
  lesson: {
    intro:
      'When we report what someone said (or thought, or wrote), we usually shift the tense one step back and adjust pronouns and time expressions. This is essential for academic writing and summaries.',
    rules: [
      {
        title: 'Tense shift: one step back',
        body: 'In reported speech, the verb usually moves one tense into the past. Modals also shift: will → would, can → could, may → might, must → had to.',
        examples: [
          'Present Simple → Past Simple: "I live in Berlin" → He said (that) he lived in Berlin.',
          'Present Continuous → Past Continuous: "I am working" → She said (that) she was working.',
          'Present Perfect → Past Perfect: "I have finished" → He said (that) he had finished.',
          'Past Simple → Past Perfect: "I saw him" → She said (that) she had seen him.',
          'will → would, can → could, may → might, must → had to',
        ],
      },
      {
        title: 'Pronoun and reference shifts',
        body: 'Pronouns change to fit the new perspective (1st person speaker → 3rd person reported).',
        examples: [
          '"I am tired" → She said (that) she was tired.',
          '"We need help" → They said (that) they needed help.',
          '"My book is on the table" → He said (that) his book was on the table.',
        ],
      },
      {
        title: 'Time and place shifts',
        body: 'Time and place markers also shift: today → that day, yesterday → the day before, tomorrow → the next day, here → there, now → then.',
        examples: [
          '"I will do it tomorrow" → He said (that) he would do it the next day.',
          '"I saw her yesterday" → She said (that) she had seen her the day before.',
          '"It is hot here" → He said (that) it was hot there.',
        ],
      },
      {
        title: 'Reporting questions and commands',
        body: 'Yes/no questions use "if" or "whether"; wh-questions use the wh-word. Commands use "told/asked + person + to + infinitive".',
        examples: [
          '"Do you like pizza?" → He asked if/whether I liked pizza.',
          '"Where do you live?" → She asked where I lived.',
          '"Close the door!" → He told me to close the door.',
          '"Please help me" → She asked me to help her.',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'is1',
      'Report the sentence:\n\n"I am tired," she said.',
      'She said (that) she was tired.',
      ['She said (that) she is tired.', 'She said (that) she tired.', 'She said (that) I was tired.'],
      'Reported speech: am → was (one step back). Pronoun I → she.',
      1,
      ['reported-speech', 'statement'],
      [
        'Identify the original tense: present simple "am".',
        'Rule: in reported speech, tense shifts one step back: am → was.',
        'Pronoun changes: I (speaker) → she (about whom we are reporting).',
        'Optional "that": She said that she was tired.',
      ]
    ),
    makeMcq(
      'is2',
      'Report the sentence:\n\n"I have finished my homework," Tom said.',
      'Tom said (that) he had finished his homework.',
      ['Tom said (that) he has finished his homework.', 'Tom said (that) he finished his homework.', 'Tom said (that) I had finished my homework.'],
      'Present Perfect → Past Perfect. I → he.',
      2,
      ['reported-speech', 'tense-shift'],
      [
        'Identify the original tense: present perfect "have finished".',
        'Rule: shift one step back → past perfect "had finished".',
        'Pronoun: I → he (Tom is reporting about himself in third person).',
      ]
    ),
    makeMcq(
      'is3',
      'Report the question:\n\n"Do you like coffee?" he asked.',
      'He asked if/whether I liked coffee.',
      ['He asked if I like coffee.', 'He asked do I like coffee.', 'He asked that I liked coffee.'],
      'Yes/no question → use "if" or "whether". Tense shift: like → liked. Pronoun: you → I.',
      2,
      ['reported-speech', 'question'],
      [
        'Identify the type: yes/no question → use "if" or "whether".',
        'Rule: do/does/did are removed in reported questions.',
        'Tense shift: like (present) → liked (past).',
        'Pronoun: you → I (from the asker\'s perspective).',
      ]
    ),
    makeMcq(
      'is4',
      'Report the question:\n\n"Where do you live?" she asked.',
      'She asked where I lived.',
      ['She asked where do I live.', 'She asked where I live.', 'She asked that I lived where.'],
      'wh-question → keep the wh-word. do/does removed. Tense shift: live → lived. Pronoun: you → I.',
      2,
      ['reported-speech', 'question'],
      [
        'Identify the type: wh-question (where) → keep the wh-word.',
        'Rule: in reported questions, the word order is normal (no do/does).',
        'Tense shift: live (present) → lived (past).',
        'Pronoun: you → I.',
      ]
    ),
    makeMcq(
      'is5',
      'Report the command:\n\n"Close the window!" he said to me.',
      'He told me to close the window.',
      ['He said me to close the window.', 'He told to me close the window.', 'He told me close the window.'],
      'Commands use "told + person + to + infinitive". NOT "said me to".',
      2,
      ['reported-speech', 'command'],
      [
        'Identify the type: imperative (command).',
        'Rule: report commands with "told + person + to + infinitive".',
        'For requests, use "asked + person + to + infinitive".',
        'Wrong: "said me to" — "say" is not used with a personal object for commands.',
      ]
    ),
    makeMcq(
      'is6',
      'Report the sentence:\n\n"I will call you tomorrow," she said.',
      'She said (that) she would call me the next day.',
      ['She said (that) she will call me tomorrow.', 'She said (that) she would call me tomorrow.', 'She said (that) she called me the next day.'],
      'will → would. tomorrow → the next day. Pronoun: I → she, you → me.',
      3,
      ['reported-speech', 'time-shift'],
      [
        'Identify the tense: "will call" → future.',
        'Rule: will → would (modal shift).',
        'Time shift: tomorrow → the next day.',
        'Pronoun: I → she, you → me.',
      ]
    ),
    makeRewrite(
      'is7',
      '"I have been studying English for five years," Anna said.',
      'Report the sentence in indirect speech:',
      'Anna said (that) she had been studying English for five years.',
      [
        'Anna said she had been studying English for five years.',
        'Anna said (that) she had studied English for five years.',
        'Anna said that she had been studying English for five years.',
      ],
      'Present Perfect Continuous → Past Perfect Continuous. Pronoun I → she.',
      3,
      ['reported-speech', 'rewrite'],
      [
        'Identify the tense: Present Perfect Continuous (have been studying).',
        'Shift one step back: Present Perfect Continuous → Past Perfect Continuous (had been studying).',
        'Pronoun: I (Anna\'s perspective) → she.',
        'Keep "for five years" unchanged (it still fits).',
      ]
    ),
  ],
};

const participles: Topic = {
  id: 'participles',
  title: 'Participle Clauses',
  summary: 'Reduce relative and adverbial clauses with present and past participles — a hallmark of academic English.',
  lesson: {
    intro:
      'Participle clauses allow you to compress information and write in a more sophisticated, academic style. They replace relative or adverbial clauses.',
    rules: [
      {
        title: 'Present participle (-ing)',
        body: 'Used when the subject of the reduced clause is active, and the action is simultaneous.',
        examples: [
          '"The man who is sitting by the window is my uncle." → "The man sitting by the window is my uncle."',
          '"She walked down the street while she was singing." → "She walked down the street, singing."',
        ],
      },
      {
        title: 'Past participle (-ed / irregular)',
        body: 'Used when the reduced clause is passive, or when the action is completed.',
        examples: [
          '"The book that was written in 1850 is famous." → "The book written in 1850 is famous."',
          '"All the tickets that were sold were returned." → "All the tickets sold were returned."',
        ],
      },
      {
        title: 'Perfect participle (having + past participle)',
        body: 'Used when the action in the reduced clause happened BEFORE the main action.',
        examples: [
          '"After he had finished his work, he went home." → "Having finished his work, he went home."',
          '"When she had read the book, she returned it to the library." → "Having read the book, she returned it to the library."',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'pc1',
      'Reduce the relative clause:\n\n"The man who is sitting by the window is my uncle."',
      'The man sitting by the window is my uncle.',
      ['The man sat by the window is my uncle.', 'The man by the window is sitting my uncle.', 'The man to sit by the window is my uncle.'],
      'Active + simultaneous → present participle (-ing). "who is sitting" → "sitting".',
      2,
      ['participle', 'present'],
      [
        'Identify the relative clause: "who is sitting".',
        'Rule: active + simultaneous → present participle (-ing).',
        'Remove "who is" → keep "sitting".',
        'Wrong: "The man sat" changes the tense.',
      ]
    ),
    makeMcq(
      'pc2',
      'Reduce the relative clause:\n\n"The book that was written in 1850 is famous."',
      'The book written in 1850 is famous.',
      ['The book writing in 1850 is famous.', 'The book wrote in 1850 is famous.', 'The book having written in 1850 is famous.'],
      'Passive → past participle (-ed). "that was written" → "written".',
      2,
      ['participle', 'past'],
      [
        'Identify the relative clause: "that was written".',
        'Rule: passive → past participle.',
        'Remove "that was" → keep "written".',
        'Wrong: "writing" is present participle (active), wrong for passive.',
      ]
    ),
    makeMcq(
      'pc3',
      'Reduce the adverbial clause:\n\n"After he had finished his work, he went home."',
      'Having finished his work, he went home.',
      ['Finishing his work, he went home.', 'Finished his work, he went home.', 'His work finished, he went home.'],
      'Earlier action → perfect participle (having + past participle). "had finished" → "having finished".',
      3,
      ['participle', 'perfect'],
      [
        'Identify the temporal relationship: "After he had finished" → action completed BEFORE the main action.',
        'Rule: earlier action → perfect participle (having + past participle).',
        'Form: had finished → having finished.',
        'Wrong: "Finishing" is simultaneous (wrong), "Finished" lacks "having".',
      ]
    ),
  ],
};

const wordFormation: Topic = {
  id: 'word-formation',
  title: 'Word Formation',
  summary: 'Prefixes, suffixes, and conversion — essential for vocabulary and the Oberstufe Abitur.',
  lesson: {
    intro:
      'English builds words through prefixes (at the start) and suffixes (at the end). Knowing the most common ones helps you decode unfamiliar words and write precisely.',
    rules: [
      {
        title: 'Negative prefixes',
        body: 'Common negative prefixes: un-, in-/im-/il-/ir-, dis-, non-, anti-.',
        examples: [
          'un- + happy = unhappy',
          'in- + tolerant = intolerant (im- before m/p: impossible, imbalanced; il- before l: illegal; ir- before r: irregular)',
          'dis- + agree = disagree',
          'non- + sense = nonsense, non-violent',
          'anti- + social = antisocial',
        ],
      },
      {
        title: 'Noun suffixes',
        body: 'Common noun suffixes: -tion/-sion (action/result), -ment (state/action), -ness (state/quality), -ity (quality), -er/-or (person who does), -ist (specialist).',
        examples: [
          'educate → education, decide → decision',
          'develop → development, agree → agreement',
          'happy → happiness, kind → kindness',
          'curious → curiosity, possible → possibility',
          'write → writer, act → actor',
          'art → artist, science → scientist',
        ],
      },
      {
        title: 'Adjective suffixes',
        body: 'Common adjective suffixes: -able/-ible (can be done), -ful (full of), -less (without), -ous (full of), -al (related to), -ive (having tendency).',
        examples: [
          'read → readable, response → responsible',
          'hope → hopeful, joy → joyful',
          'hope → hopeless, home → homeless',
          'danger → dangerous, fame → famous',
          'culture → cultural, nature → natural',
          'create → creative, act → active',
        ],
      },
      {
        title: 'Verb and adverb suffixes',
        body: 'Verb suffix: -ize/-ise (make/cause). Adverb suffix: -ly (in the manner of).',
        examples: [
          'modern → modernize, final → finalize',
          'happy → happily, slow → slowly',
          'NOTE: "friendly", "lovely", "lonely" are adjectives ending in -ly, NOT adverbs.',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'wf1',
      'Choose the correct word:\n\n"The story was so ___ that I could not put it down." (UNREAD)',
      'unputdownable',
      ['unputable', 'unputable', 'misreadable'],
      'Three negative prefixes + verb + -able suffix: un- + put + down + -able. (Yes, this is a real word in English!)',
      2,
      ['word-formation', 'negative-prefix', 'suffix'],
      [
        'Identify the meaning: "so ... that I could not put it down" → opposite of being able to put it down.',
        'Apply negative prefix: un- + put.',
        'Add suffix: put + down + -able (capable of being put down → un- + putdownable).',
      ]
    ),
    makeMcq(
      'wf2',
      'Choose the correct noun form:\n\n"The ___ of the country is its people." (DIVERSE)',
      'diversity',
      ['diverse', 'diversion', 'diverseness'],
      'Adjective → noun: drop -e, add -ity → diversity.',
      2,
      ['word-formation', 'noun-suffix'],
      [
        'Identify the base word: diverse (adjective).',
        'Rule: adjective ending in -se → noun ending in -sity.',
        'Form: diverse → diversity.',
        'Wrong: "diversion" comes from "divert", "diverse" is an adjective.',
      ]
    ),
    makeMcq(
      'wf3',
      'Choose the correct adjective:\n\n"This task is ___ for students." (POSSIBLE)',
      'impossible',
      ['unpossible', 'dispossible', 'nonpossible'],
      'Negative of "possible" uses "im-" (form of "in-" before "p") → impossible.',
      1,
      ['word-formation', 'negative-prefix'],
      [
        'Identify the base: possible.',
        'Rule: "in-" becomes "im-" before bilabial consonants (m, p, b).',
        'Form: in- + possible → impossible.',
        '"unpossible" is a common error but not standard English.',
      ]
    ),
    makeMcq(
      'wf4',
      'Choose the correct suffix:\n\n"She is a famous ___" (ART).',
      'artist',
      ['artian', 'artion', 'artment'],
      'Person who practices → -ist. art + ist = artist.',
      1,
      ['word-formation', 'noun-suffix'],
      [
        'Identify the meaning: a person who practices art.',
        'Rule: specialist/practitioner → -ist.',
        'Form: art + ist → artist.',
        'Wrong: -ian (e.g., musician), -ion (action), -ment (state) — none fit here.',
      ]
    ),
  ],
};

const inversion: Topic = {
  id: 'inversion',
  title: 'Inversion & Emphasis',
  summary: 'Fronting for emphasis: negative adverbials, only after, so/such ... that — for sophisticated style.',
  lesson: {
    intro:
      'Inversion puts the verb before the subject. It is used for emphasis, especially in formal and literary English, and after certain expressions.',
    rules: [
      {
        title: 'After negative or restrictive adverbials',
        body: 'When a sentence starts with a negative or restrictive adverb, the verb comes before the subject.',
        examples: [
          'Normal: "I have never seen such a sight." → Inversion: "Never have I seen such a sight."',
          'Normal: "He rarely comes here." → Inversion: "Rarely does he come here."',
          'Normal: "She did not only sing but also danced." → "Not only did she sing, but she also danced."',
          'Normal: "We could hardly hear him." → "Hardly could we hear him."',
        ],
      },
      {
        title: 'After "only" + adverbial',
        body: '"Only after/when/if/later/then" at the start triggers inversion.',
        examples: [
          'Normal: "He realised the truth only later." → "Only later did he realise the truth."',
          'Normal: "I will help you if you ask." → "Only if you ask will I help you."',
        ],
      },
      {
        title: 'Cleft sentences for emphasis',
        body: 'Cleft sentences split one idea into two clauses to emphasize a particular part. Common patterns: "It is/was X that ..." and "What ... is/was ...".',
        examples: [
          'Normal: "John broke the window." → Cleft: "It was John who broke the window."',
          'Normal: "I need more time." → Cleft: "What I need is more time."',
          'Normal: "She likes chocolate." → Cleft: "It is chocolate that she likes."',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'iv1',
      'Choose the inverted form:\n\n"I have never seen such a beautiful sunset."',
      'Never have I seen such a beautiful sunset.',
      ['Never I have seen such a beautiful sunset.', 'Never have seen I such a beautiful sunset.', 'Never I saw such a beautiful sunset.'],
      'Negative adverbial "Never" at the start → inversion: auxiliary + subject + main verb. have (aux) + I (subj) + seen.',
      3,
      ['inversion', 'negative-adverbial'],
      [
        'Identify the trigger: "Never" at the start of the sentence.',
        'Rule: after negative adverbials, use inversion: auxiliary + subject + past participle.',
        'Form: "have I seen" (not "I have seen").',
        'Wrong: "Never I have seen" — no inversion (subject before auxiliary).',
      ]
    ),
    makeMcq(
      'iv2',
      'Choose the inverted form:\n\n"She not only sang but also danced."',
      'Not only did she sing, but she also danced.',
      ['Not only she sang, but she also danced.', 'Not only sang she, but she also danced.', 'She not only did sing, but she also danced.'],
      '"Not only" at the start → inversion in the first clause: did + she + sing.',
      3,
      ['inversion', 'not-only'],
      [
        'Identify the trigger: "Not only" at the start.',
        'Rule: with "not only ... but also", invert the first clause.',
        'Form: did + she + sing (not "she sang").',
        'Wrong: "Not only she sang" — no inversion.',
      ]
    ),
    makeMcq(
      'iv3',
      'Choose the cleft sentence that emphasises "John":\n\n"John broke the window."',
      'It was John who broke the window.',
      ['John was the one broke the window.', 'It was John that the window broke.', 'John, who broke the window.'],
      'Cleft: "It is/was X that/who ..." emphasises the subject (John).',
      2,
      ['inversion', 'cleft'],
      [
        'Identify what to emphasise: John (the doer).',
        'Rule: cleft sentence = "It is/was + emphasised part + that/who + rest".',
        'Form: It was John who broke the window.',
        'Wrong: "the window" is not the subject of the original sentence.',
      ]
    ),
   ],
};

// ─── EF Themen (NRW 11. sınıf) ──────────────────────────────────────────────
// 6 zentrale Themen: Identity, Technology, Globalisation, Media, Education, Communication

const identity: Topic = {
  id: 'identity',
  title: 'Identity & Belonging',
  summary: 'Teenage identity, cultural heritage, gender roles — the big question: who am I?',
  lesson: {
    intro: 'In EF (11. sınıf) arbeitet ihr mit themenbasierten Inhalten. „Identity" ist eines der ersten Themen — es geht um die Frage: Wer bin ich? Welche Rolle spielen Herkunft, Kultur, Familie, Geschlecht? Im Abitur müsst ihr Texte zu diesem Thema analysieren, Stellung nehmen und diskutieren.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: 'Diese Wörter kommen in fast jedem Identity-Text vor:',
        examples: [
          'self-identity / sense of self — Selbstbild / Identitätsgefühl',
          'belonging — Zugehörigkeit',
          'cultural heritage — kulturelles Erbe',
          'stereotype / prejudice — Vorurteil',
          'gender roles — Geschlechterrollen',
          'upbringing — Erziehung',
          'in-between / hybrid identity — Zwischen-Identität',
        ],
      },
      {
        title: 'Typische Abitur-Themen',
        body: 'Drei Klassiker für die Abiturprüfung:',
        examples: [
          'Multikulturelle Identität: Was bedeutet es, zwischen zwei Kulturen zu leben?',
          'Gender & Gesellschaft: Sind traditionelle Geschlechterrollen noch zeitgemäß?',
          'Coming of Age: Wie verändert sich Identität in der Pubertät?',
        ],
      },
    ],
  },
  questions: [
    makeMcq('id1', 'What does „belonging" mean?',
      'A feeling of being accepted and connected to a group.',
      ['Being alone', 'Forgetting your identity', 'Moving to another country'],
      '„Belonging" (Zugehörigkeit) — das Gefühl, Teil einer Gruppe oder Gemeinschaft zu sein, akzeptiert zu werden.',
      1, ['identity', 'vocabulary']),
    makeMcq('id2', 'What is a „stereotype"?',
      'A simplified, generalised image of a group of people.',
      ['A personal opinion', 'A scientific fact', 'A unique individual'],
      'Stereotype = vereinfachte, oft negative Verallgemeinerung über eine Gruppe. Beispiel: „Alle Teenager sind faul."',
      1, ['identity', 'vocabulary']),
    makeMcq('id3', 'What is „cultural heritage"?',
      'Traditions, customs and values passed down within a culture.',
      ['A type of modern technology', 'A new brand', 'A sport'],
      'Cultural heritage (kulturelles Erbe) = Bräuche, Traditionen, Werte einer Kultur, die von Generation zu Generation weitergegeben werden.',
      1, ['identity', 'vocabulary']),
    makeMcq('id4', 'What is meant by „gender roles"?',
      'Social expectations of how men and women should behave.',
      ['Biological differences', 'Personal hobbies', 'Sports activities'],
      'Gender roles (Geschlechterrollen) = gesellschaftliche Erwartungen, wie sich Männer und Frauen verhalten sollen. Diese sind sozial konstruiert, nicht biologisch.',
      2, ['identity', 'vocabulary']),
    makeMcq('id5', 'What is a „hyphenated identity"?',
      'A person with mixed cultural background (e.g. Turkish-German).',
      ['Someone with no identity', 'A type of punctuation', 'A person with one strong culture'],
      'Hyphenated identity = Person mit gemischter kultureller Identität, z.B. „Turkish-German", „British-Indian". Beide Kulturen sind Teil der Identität.',
      2, ['identity', 'concept']),
    makeMcq('id6', 'What does the term „upbringing" refer to?',
      'How parents raise and educate their children.',
      ['A school subject', 'A type of sport', 'A work contract'],
      'Upbringing (Erziehung) = wie Eltern ihre Kinder aufziehen und bilden — Werte, Regeln, Verhaltensweisen.',
      1, ['identity', 'vocabulary']),
    makeMcq('id7', 'Which of these is a typical coming-of-age experience?',
      'Rebelling against parental authority to find one\'s own identity.',
      ['Getting a job', 'Buying a house', 'Retiring from work'],
      'Coming of age = der Übergang vom Kind zum Erwachsenen. Rebellion, Selbstfindung und Identitätssuche sind typische Themen.',
      2, ['identity', 'coming-of-age']),
    makeMcq('id8', 'A text says: „She struggled between two cultures." What is meant?',
      'She had difficulty combining two different cultural identities.',
      ['She travelled a lot', 'She disliked her parents', 'She was rich'],
      '„Between two cultures" = zwischen zwei kulturellen Welten. Typisches Thema für Migrantenkinder: Spagat zwischen Familie und Mehrheitsgesellschaft.',
      2, ['identity', 'analysis']),
    makeMcq('id9', 'Which of these best describes a „role model"?',
      'A person whose behaviour others try to copy or learn from.',
      ['A character in a film', 'A type of clothing', 'A test result'],
      'Role model (Vorbild) = eine Person, deren Verhalten oder Erfolg andere nachahmen oder von dem sie lernen.',
      1, ['identity', 'vocabulary']),
    makeMcq('id10', 'In a discussion about identity, what does „self-perception" mean?',
      'How a person sees and understands themselves.',
      ['How others see you', 'Your income', 'Your nationality'],
      'Self-perception (Selbstwahrnehmung) = wie eine Person sich selbst sieht und versteht — im Gegensatz zu Fremdwahrnehmung.',
      2, ['identity', 'vocabulary']),
  ],
};

const technology: Topic = {
  id: 'technology',
  title: 'Technology & Digital Life',
  summary: 'Social media, AI, digital divide — how technology shapes our lives.',
  lesson: {
    intro: 'Technology ist ein zentrales EF-Thema. Ihr müsst Vorteile (Konnektivität, Lernen) und Nachteile (Sucht, Datenschutz, Desinformation) diskutieren können. Im Abitur kommen oft Texte über AI, social media, oder den digital divide.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: '',
        examples: [
          'social media — soziale Netzwerke',
          'artificial intelligence (AI) — künstliche Intelligenz',
          'digital divide — digitale Kluft',
          'privacy / data protection — Datenschutz',
          'screen time — Bildschirmzeit',
          'misinformation / fake news — Falschinformation',
          'cyberbullying — Cybermobbing',
        ],
      },
      {
        title: 'Typische Abitur-Themen',
        body: '',
        examples: [
          'AI in schools: replacement of teachers or helpful tool?',
          'Social media and mental health: connection or harm?',
          'Digital divide: who benefits, who is left behind?',
        ],
      },
    ],
  },
  questions: [
    makeMcq('te1', 'What is the „digital divide"?',
      'The gap between people who have access to digital technology and those who do not.',
      ['A new social media app', 'A type of mobile phone', 'A password system'],
      'Digital divide (digitale Kluft) = Unterschied zwischen Menschen mit und ohne Zugang zu digitaler Technologie — oft nach Alter, Einkommen, Region.',
      2, ['technology', 'vocabulary']),
    makeMcq('te2', 'What is „artificial intelligence" (AI)?',
      'Computer systems that can perform tasks usually requiring human intelligence.',
      ['A natural brain', 'A type of phone', 'A new language'],
      'AI (künstliche Intelligenz) = Computersysteme, die Aufgaben übernehmen, die normalerweise menschliche Intelligenz erfordern — Sprache, Bilderkennung, Entscheidungen.',
      1, ['technology', 'vocabulary']),
    makeMcq('te3', 'What is meant by „misinformation"?',
      'False or misleading information, often spread unintentionally.',
      ['Verified news', 'Scientific data', 'A new app'],
      'Misinformation = falsche oder irreführende Informationen, oft ohne böse Absicht verbreitet. Verwandt: Disinformation (gezielt).',
      2, ['technology', 'vocabulary']),
    makeMcq('te4', 'What is „cyberbullying"?',
      'Bullying that takes place through digital devices and online platforms.',
      ['A competitive game', 'A type of exam', 'A new technology'],
      'Cyberbullying (Cybermobbing) = Mobbing, das online stattfindet — beleidigende Nachrichten, peinliche Fotos, Ausgrenzung in Gruppenchats.',
      1, ['technology', 'vocabulary']),
    makeMcq('te5', 'What is meant by „data privacy"?',
      'The right to control how your personal information is collected and used.',
      ['A new kind of computer', 'A password manager', 'A type of virus'],
      'Data privacy (Datenschutz) = das Recht, zu kontrollieren, wie persönliche Daten gesammelt und verwendet werden.',
      2, ['technology', 'vocabulary']),
    makeMcq('te6', "A text argues that social media creates 'echo chambers'. What does this mean?",
      'People only see opinions that match their own, reinforcing their views.',
      ['A new video effect', 'A type of music', 'A physical place'],
      'Echo chamber = Umgebung, in der man nur Meinungen hört, die den eigenen entsprechen — keine Vielfalt, keine kritische Auseinandersetzung.',
      3, ['technology', 'analysis']),
    makeMcq('te7', 'What is meant by „screen time"?',
      'The amount of time spent using digital devices with a screen.',
      ['A new movie', 'A computer error', 'A new keyboard'],
      'Screen time = die Zeit, die man mit Bildschirmgeräten verbringt. Im Diskurs oft negativ konnotiert (zu viel Bildschirmzeit).',
      1, ['technology', 'vocabulary']),
    makeMcq('te8', 'What is an „algorithm" in social media?',
      'A computer programme that decides which content you see first.',
      ['A type of music', 'A new app', 'A type of battery'],
      'Algorithm = Computerprogramm, das entscheidet, was dir angezeigt wird. Soziale Medien optimieren auf Engagement (Likes, Klicks).',
      2, ['technology', 'vocabulary']),
    makeMcq('te9', 'A text argues that AI can be a useful tool in classrooms. What is the argument?',
      'AI helps with personalisation — students learn at their own pace.',
      ['AI replaces all teachers', 'AI is only for entertainment', 'AI makes all decisions for students'],
      'Pro-AI-Argument: personalisiertes Lernen, schnelle Hilfe, bessere Individualisierung. Contra: Bedenken bzgl. Datenschutz, Abhängigkeit.',
      2, ['technology', 'argument']),
    makeMcq('te10', 'What is „online privacy" concerned with?',
      'Protecting your personal data when using the internet.',
      ['Buying products online', 'Streaming movies', 'Online gaming'],
      'Online privacy (Online-Datenschutz) = Schutz persönlicher Daten im Internet — was wird geteilt, was nicht?',
      1, ['technology', 'vocabulary']),
  ],
};

const globalisation: Topic = {
  id: 'globalisation',
  title: 'Globalisation & World Issues',
  summary: 'Migration, climate change, world economy — the big challenges of our time.',
  lesson: {
    intro: 'Globalisation ist ein Kernthema in EF. Es geht um weltweite Vernetzung — Handel, Migration, Kommunikation, Klima. Im Abitur diskutiert ihr Vor- und Nachteile und analysiert Texte zu Migration, Klimawandel und wirtschaftlicher Ungleichheit.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: '',
        examples: [
          'migration — Wanderung / Wanderungsbewegung',
          'refugee / asylum seeker — Flüchtling / Asylbewerber',
          'climate change — Klimawandel',
          'sustainability — Nachhaltigkeit',
          'fair trade — fairer Handel',
          'global supply chain — globale Lieferkette',
          'cultural homogenisation — kulturelle Vereinheitlichung',
        ],
      },
      {
        title: 'Typische Abitur-Themen',
        body: '',
        examples: [
          'Migration: Fluchtursachen, Integration, Vorurteile.',
          'Climate change: responsibility, action, future generations.',
          'Globalisation: winners and losers, local vs global.',
        ],
      },
    ],
  },
  questions: [
    makeMcq('gl1', 'What is a „refugee"?',
      'A person who has left their country because of war, persecution or disaster.',
      ['A tourist', 'A business traveller', 'A student'],
      'Refugee (Flüchtling) = Person, die ihr Land verlassen hat wegen Krieg, Verfolgung oder Katastrophe. Rechtlich geschützt durch Genfer Konvention.',
      1, ['globalisation', 'vocabulary']),
    makeMcq('gl2', 'What is „climate change"?',
      'Long-term shifts in temperatures and weather patterns across the globe.',
      ['A daily weather change', 'A type of season', 'A new fashion'],
      'Climate change (Klimawandel) = langfristige Veränderung der globalen Temperaturen und Wettermuster — hauptsächlich durch menschliche Aktivität verursacht.',
      1, ['globalisation', 'vocabulary']),
    makeMcq('gl3', 'What is „fair trade"?',
      'Trade that gives producers in poor countries fair prices and better working conditions.',
      ['Cheap imports from anywhere', 'Online shopping', 'Trade between neighbouring countries only'],
      'Fair trade = Handel, bei dem Produzenten in armen Ländern faire Preise und bessere Arbeitsbedingungen erhalten.',
      2, ['globalisation', 'vocabulary']),
    makeMcq('gl4', 'What is „sustainability"?',
      'Meeting today\'s needs without harming the ability of future generations to meet theirs.',
      ['Using more resources', 'Faster production', 'Avoiding all change'],
      'Sustainability (Nachhaltigkeit) = Bedürfnisse der Gegenwart befriedigen, ohne die Möglichkeit künftiger Generationen zu gefährden.',
      2, ['globalisation', 'vocabulary']),
    makeMcq('gl5', 'What is meant by „brain drain"?',
      'When skilled workers leave their country to work elsewhere.',
      ['A type of headache', 'A new technology', 'A type of music'],
      'Brain drain = Abwanderung qualifizierter Arbeitskräfte aus ihrem Herkunftsland — oft in reichere Länder, was Herkunftsländer schwächt.',
      3, ['globalisation', 'vocabulary']),
    makeMcq('gl6', 'What is a „global supply chain"?',
      'A network of companies across different countries producing and distributing a product.',
      ['A type of store', 'A transportation system', 'A government agency'],
      'Global supply chain (globale Lieferkette) = Netzwerk von Unternehmen in verschiedenen Ländern, die ein Produkt herstellen und verteilen.',
      2, ['globalisation', 'vocabulary']),
    makeMcq('gl7', 'A text says: „Globalisation benefits the rich more than the poor." This is a…',
      'Critical view of globalisation.',
      ['Positive view', 'Neutral statement', 'Joke'],
      'Kritik an Globalisierung: Gewinne ungleich verteilt, multinationale Konzerne profitieren mehr als lokale Bevölkerung.',
      2, ['globalisation', 'analysis']),
    makeMcq('gl8', 'What is „cultural homogenisation"?',
      'When local cultures become similar to a dominant global culture.',
      ['Protecting local traditions', 'A type of music', 'A government policy'],
      'Cultural homogenisation = weltweite Vereinheitlichung von Kultur durch globale Medien/Marken — lokale Traditionen verschwinden.',
      3, ['globalisation', 'vocabulary']),
    makeMcq('gl9', 'What is a „push factor" in migration?',
      'A reason that forces people to leave their home country.',
      ['A reason to stay', 'A new job opportunity', 'A vacation'],
      'Push factor (Treibender Faktor) = Faktor, der Menschen zur Auswanderung zwingt — Krieg, Armut, Verfolgung. Gegensatz: Pull factor (anziehender Faktor).',
      2, ['globalisation', 'vocabulary']),
    makeMcq('gl10', 'What is a „pull factor" in migration?',
      'A reason that attracts people to a new country.',
      ['A reason to stay', 'Forced displacement', 'A natural disaster at home'],
      'Pull factor (Anziehender Faktor) = Faktor, der Menschen in ein anderes Land zieht — Arbeitsplätze, Sicherheit, Freiheit, Familie.',
      2, ['globalisation', 'vocabulary']),
  ],
};

const media: Topic = {
  id: 'media',
  title: 'Media & Society',
  summary: 'Press freedom, fake news, advertising, representation — how media shapes reality.',
  lesson: {
    intro: 'Media ist ein zentrales EF-Thema. Ihr lernt, kritisch mit Medien umzugehen: Quellen prüfen, Standpunkte erkennen, Werbung von Information unterscheiden. Im Abitur analysiert ihr Medientexte und diskutiert Pressefreiheit, Fake News und Repräsentation.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: '',
        examples: [
          'press freedom / freedom of the press — Pressefreiheit',
          'bias / biased reporting — voreingenommene Berichterstattung',
          'tabloid journalism — Boulevardjournalismus',
          'citizen journalism — Bürgerjournalismus',
          'censorship — Zensur',
          'representation — Repräsentation / Darstellung',
        ],
      },
      {
        title: 'Typische Abitur-Themen',
        body: '',
        examples: [
          'Is press freedom essential for democracy?',
          'How do algorithms shape what we see online?',
          'Whose voices are heard — and whose are not?',
        ],
      },
    ],
  },
  questions: [
    makeMcq('me1', 'What is „press freedom"?',
      'The right of journalists to report without censorship or government control.',
      ['A new technology', 'A type of advertisement', 'A new app'],
      'Press freedom (Pressefreiheit) = Recht von Journalisten, ohne Zensur oder staatliche Kontrolle zu berichten. Grundpfeiler der Demokratie.',
      1, ['media', 'vocabulary']),
    makeMcq('me2', 'What is a „biased" report?',
      'A report that favours one side or viewpoint unfairly.',
      ['A neutral report', 'A scientific study', 'A weather forecast'],
      'Biased (voreingenommen) = Berichterstattung, die eine Seite unfair bevorzugt. Kann gewollt oder unbewusst sein.',
      1, ['media', 'vocabulary']),
    makeMcq('me3', 'What is „tabloid journalism"?',
      'Journalism that focuses on sensational stories, celebrity gossip and scandals.',
      ['Serious investigative journalism', 'Academic writing', 'Scientific publishing'],
      'Tabloid journalism (Boulevardjournalismus) = Sensationsjournalismus, der auf Promi-Klatsch, Skandale und schockierende Geschichten setzt. Beispiel: BILD, Daily Mail.',
      1, ['media', 'vocabulary']),
    makeMcq('me4', 'What is „citizen journalism"?',
      'Ordinary people creating and sharing news, especially online.',
      ['Journalism for politicians', 'Sports journalism', 'Fashion journalism'],
      'Citizen journalism (Bürgerjournalismus) = normale Bürger erstellen und teilen Nachrichten, oft online (z.B. Smartphone-Videos, Social Media Posts).',
      2, ['media', 'vocabulary']),
    makeMcq('me5', 'What is „censorship"?',
      'The suppression of speech, public communication or other information.',
      ['Free speech', 'Public education', 'Voting rights'],
      'Censorship (Zensur) = Unterdrückung von Meinungen, Kommunikation oder Informationen — durch Staat, Institutionen oder Selbstzensur.',
      1, ['media', 'vocabulary']),
    makeMcq('me6', 'A headline reads: „SHOCKING SECRET Doctors Don\'t Want You to Know!" What is this?',
      'A typical clickbait headline using emotional words.',
      ['A serious news report', 'A scientific finding', 'A government statement'],
      'Clickbait = Überschrift, die mit extremen Wörtern Aufmerksamkeit erregt. „Doctors Hate This One Trick" — klassisches Schema.',
      2, ['media', 'analysis']),
    makeMcq('me7', 'What is meant by „representation" in media?',
      'How different groups of people are shown in the media.',
      ['A government report', 'A type of statistic', 'A new technology'],
      'Representation (Repräsentation) = wie verschiedene Gruppen in Medien dargestellt werden. Unterrepräsentation von Minderheiten ist ein Problem.',
      2, ['media', 'vocabulary']),
    makeMcq('me8', 'What is a „source" in journalism?',
      'A person, document or organisation that provides information for a report.',
      ['A type of software', 'A new technology', 'A social media account'],
      'Source (Quelle) = Person, Dokument oder Organisation, die Informationen für einen Bericht liefert. Gute Journalisten prüfen mehrere Quellen.',
      1, ['media', 'vocabulary']),
    makeMcq('me9', 'What is the main purpose of advertising?',
      'To persuade people to buy a product or service.',
      ['To inform objectively', 'To entertain', 'To teach history'],
      'Werbung zielt darauf, Menschen zum Kauf eines Produkts oder einer Dienstleistung zu überreden. Nicht neutral informieren.',
      1, ['media', 'vocabulary']),
    makeMcq('me10', 'What is „media literacy"?',
      'The ability to critically analyse and evaluate media messages.',
      ['A new film', 'A type of computer', 'A government program'],
      'Media literacy (Medienkompetenz) = Fähigkeit, Medieninhalte kritisch zu analysieren und zu bewerten — Quellen prüfen, Bias erkennen.',
      2, ['media', 'vocabulary']),
  ],
};

const education: Topic = {
  id: 'education',
  title: 'Education & Learning',
  summary: 'School systems, lifelong learning, digital classrooms — what is the future of education?',
  lesson: {
    intro: 'Education ist ein klassisches EF-Thema. Ihr diskutiert Schulsysteme, G8/G9, lebenslanges Lernen, Digitalisierung. Im Abitur analysiert ihr Texte zu Chancengleichheit, Bildungsreformen und Rolle der Lehrer.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: '',
        examples: [
          'academic performance / achievement — schulische Leistung',
          'equal opportunities / social mobility — Chancengleichheit / sozialer Aufstieg',
          'lifelong learning — lebenslanges Lernen',
          'vocational training — Berufsausbildung',
          'homework — Hausaufgaben',
          'tuition fees — Studiengebühren',
        ],
      },
      {
        title: 'Typische Abitur-Themen',
        body: '',
        examples: [
          'Does homework help students learn?',
          'Should university be free for everyone?',
          'Is lifelong learning important in the modern world?',
        ],
      },
    ],
  },
  questions: [
    makeMcq('ed1', 'What is „lifelong learning"?',
      'Continuing to learn throughout your life, not just during school.',
      ['A type of school', 'Learning only until age 18', 'A new technology'],
      'Lifelong learning = kontinuierliches Lernen über die Schulzeit hinaus — berufliche Weiterbildung, persönliche Entwicklung.',
      1, ['education', 'vocabulary']),
    makeMcq('ed2', 'What are „tuition fees"?',
      'Money paid by students for university education.',
      ['Taxes', 'School books', 'Teacher salaries'],
      'Tuition fees (Studiengebühren) = Geld, das Studierende für ihre Universitätsausbildung zahlen. In Deutschland oft 0 € (öffentlich), in UK/USA hoch.',
      1, ['education', 'vocabulary']),
    makeMcq('ed3', 'What is meant by „social mobility"?',
      'The movement of people between different social classes.',
      ['Travelling abroad', 'A new sport', 'A type of car'],
      'Social mobility (soziale Mobilität) = Wechsel von Personen zwischen sozialen Schichten — Aufstieg oder Abstieg.',
      2, ['education', 'vocabulary']),
    makeMcq('ed4', 'What is „vocational training"?',
      'Education that prepares people for a specific job or trade.',
      ['Academic study', 'Sports training', 'Language learning'],
      'Vocational training (Berufsausbildung) = Ausbildung, die auf einen bestimmten Beruf vorbereitet. In Deutschland: duales System.',
      1, ['education', 'vocabulary']),
    makeMcq('ed5', 'What is meant by „equal opportunities" in education?',
      'Everyone has the same chance to succeed regardless of background.',
      ['Everyone gets the same grades', 'Schools are free', 'Teachers are equal'],
      'Equal opportunities (Chancengleichheit) = jeder hat die gleiche Chance auf Erfolg, unabhängig von Herkunft, Geschlecht, Einkommen. Realität oft ungleich.',
      2, ['education', 'vocabulary']),
    makeMcq('ed6', 'A text argues: „Standardised tests don\'t measure real intelligence." What is the view?',
      'Tests measure memorisation, not creativity or critical thinking.',
      ['Tests are perfect', 'Tests are the only way', 'Tests are too easy'],
      'Kritik an Standardtests: sie messen oft nur Auswendiglernen, nicht Kreativität, Problemlösung oder kritisches Denken.',
      3, ['education', 'analysis']),
    makeMcq('ed7', 'What is a „private school"?',
      'A school that is not run by the state and charges fees.',
      ['A school run by the state', 'A school for adults', 'A school with no rules'],
      'Private school (Privatschule) = nicht-staatliche Schule, die Gebühren verlangt. In Deutschland: ca. 6 % der Schüler auf Privatschulen.',
      1, ['education', 'vocabulary']),
    makeMcq('ed8', 'What is meant by „academic performance"?',
      'How well a student does in their studies, often measured by grades.',
      ['Sports ability', 'Social skills', 'Personality'],
      'Academic performance (schulische Leistung) = wie gut ein Schüler im Studium abschneidet, oft gemessen durch Noten.',
      1, ['education', 'vocabulary']),
    makeMcq('ed9', 'What is a „study programme"?',
      'A course of study at a university or college.',
      ['A sports event', 'A government program', 'A type of school'],
      'Study programme (Studiengang) = Lehrprogramm an einer Universität oder Hochschule — Bachelor, Master, etc.',
      1, ['education', 'vocabulary']),
    makeMcq('ed10', 'Why is „G8" (Abitur after 12 years) controversial in Germany?',
      'Many believe students face too much pressure and have less free time.',
      ['It is too easy', 'It is too long', 'It is too expensive'],
      'G8-Debatte: Befürworter sagen effizienter Weg zum Abitur. Kritiker: mehr Stress, weniger Freizeit, weniger Reife fürs Studium.',
      2, ['education', 'analysis']),
  ],
};

const communication: Topic = {
  id: 'communication',
  title: 'Communication & Body Language',
  summary: 'Intercultural communication, body language, verbal vs non-verbal — how we connect.',
  lesson: {
    intro: 'Communication ist ein neues EF-Thema (auch Q1). Es geht darum, wie wir kommunizieren — verbal (Worte) und non-verbal (Körpersprache). Im Abitur analysiert ihr Texte zu interkultureller Kommunikation, Missverständnissen und digitaler Kommunikation.',
    rules: [
      {
        title: 'Wichtiger Wortschatz',
        body: '',
        examples: [
          'verbal communication — verbale Kommunikation (Worte)',
          'non-verbal communication — nonverbale Kommunikation (Körpersprache)',
          'eye contact — Blickkontakt',
          'body language — Körpersprache',
          'intercultural communication — interkulturelle Kommunikation',
          'miscommunication / misunderstanding — Missverständnis',
        ],
      },
      {
        title: 'Kulturelle Unterschiede',
        body: '',
        examples: [
          'Blickkontakt: in Deutschland direkt (Aufrichtigkeit), in manchen Kulturen respektlos (Ältere).',
          'Abstand: Südeuropäer stehen näher, Nordeuropäer weiter — kann zu Missverständnissen führen.',
          'Händedruck, Verbeugung, Kuss — kulturspezifisch.',
        ],
      },
    ],
  },
  questions: [
    makeMcq('co1', 'What is „body language"?',
      'Communication through posture, gestures, facial expressions and eye contact.',
      ['Speaking loudly', 'Written communication', 'A type of language class'],
      'Body language (Körpersprache) = Kommunikation durch Haltung, Gestik, Mimik und Blickkontakt — oft stärker als Worte.',
      1, ['communication', 'vocabulary']),
    makeMcq('co2', 'What is „eye contact"?',
      'Looking directly into someone\'s eyes while communicating.',
      ['Looking at a screen', 'A type of camera', 'A book about eyes'],
      'Eye contact (Blickkontakt) = direkter Blick in die Augen — signalisiert Aufmerksamkeit, Vertrauen, Ehrlichkeit (kulturell unterschiedlich).',
      1, ['communication', 'vocabulary']),
    makeMcq('co3', 'What is „intercultural communication"?',
      'Communication between people from different cultural backgrounds.',
      ['Talking in your own language', 'Communication between friends', 'Communication at work'],
      'Intercultural communication = Kommunikation zwischen Menschen verschiedener Kulturen — erfordert Verständnis für kulturelle Unterschiede.',
      1, ['communication', 'vocabulary']),
    makeMcq('co4', 'What is a „misunderstanding"?',
      'A failure to understand something correctly.',
      ['A type of understanding', 'A new technology', 'A kind of agreement'],
      'Misunderstanding (Missverständnis) = Situation, in der etwas nicht richtig verstanden wird — oft durch kulturelle Unterschiede oder unklare Sprache.',
      1, ['communication', 'vocabulary']),
    makeMcq('co5', 'In many Western cultures, strong eye contact is seen as a sign of…',
      'Confidence and honesty.',
      ['Disrespect', 'Boredom', 'Confusion'],
      'In westlichen Kulturen: direkter Blickkontakt = Selbstvertrauen, Ehrlichkeit. In manchen asiatischen Kulturen: Respektlosigkeit gegenüber Älteren.',
      2, ['communication', 'culture']),
    makeMcq('co6', 'What is meant by „active listening"?',
      'Fully concentrating on what someone is saying and responding thoughtfully.',
      ['Listening to music', 'A type of hearing test', 'Ignoring the speaker'],
      'Active listening = aufmerksames, konzentriertes Zuhören mit verbalem/nonverbalem Feedback — Augenkontakt, Nicken, Rückfragen.',
      2, ['communication', 'vocabulary']),
    makeMcq('co7', 'What is a „gesture"?',
      'A movement of the body, especially hands or arms, to express meaning.',
      ['A written word', 'A type of clothing', 'A musical instrument'],
      'Gesture (Geste) = Körperbewegung, besonders mit Händen/Armen, um Bedeutung auszudrücken. Kulturell unterschiedlich: Daumen hoch vs. beleidigend.',
      1, ['communication', 'vocabulary']),
    makeMcq('co8', 'Why might direct eye contact be uncomfortable in some cultures?',
      'It may be seen as disrespectful, especially towards elders.',
      ['Because of poor eyesight', 'Because of weather', 'Because of hunger'],
      'In vielen asiatischen/arabischen Kulturen: Blickkontakt mit Älteren/Autoritätspersonen gilt als respektlos. Wichtig für interkulturelle Kompetenz.',
      2, ['communication', 'culture']),
    makeMcq('co9', 'What is „non-verbal communication"?',
      'Communication without words — through facial expressions, posture, gestures.',
      ['A type of language', 'Speaking in a foreign language', 'A type of writing'],
      'Non-verbal communication (nonverbale Kommunikation) = Kommunikation ohne Worte — Mimik, Gestik, Körperhaltung, Augenkontakt, Stimme.',
      1, ['communication', 'vocabulary']),
    makeMcq('co10', 'What is „intercultural competence"?',
      'The ability to communicate effectively across cultural boundaries.',
      ['A type of exam', 'A new technology', 'A government program'],
      'Intercultural competence (interkulturelle Kompetenz) = Fähigkeit, effektiv über kulturelle Grenzen hinweg zu kommunizieren — mit Respekt und Verständnis.',
      2, ['communication', 'vocabulary']),
  ],
};

export const englischModule: Module = {
  id: 'englisch',
  title: 'English',
  description: 'Tenses, conditionals, passive voice, modals, indirect speech, participles, word formation, inversion, and 6 EF themes (Identity, Technology, Globalisation, Media, Education, Communication) — for confident English at Oberstufe and Abitur.',
  icon: 'languages',
  color: 'green',
  topics: [
    tenses, conditionals, passive, modals, indirectSpeech, participles, wordFormation, inversion,
    identity, technology, globalisation, media, education, communication,
  ],
};
