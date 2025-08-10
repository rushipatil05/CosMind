export const quizzes = [
  {
    id: 'phq9',
    title: 'Depression Assessment',
    description: 'PHQ-9 - Patient Health Questionnaire',
    icon: 'brain',
    color: 'blue',
    questions: [
      {
        id: 'phq9_1',
        text: 'Little interest or pleasure in doing things',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_2',
        text: 'Feeling down, depressed, or hopeless',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_4',
        text: 'Feeling tired or having little energy',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_5',
        text: 'Poor appetite or overeating',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_6',
        text: 'Feeling bad about yourself or that you are a failure',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_7',
        text: 'Trouble concentrating on things like reading or watching TV',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_8',
        text: 'Moving or speaking slowly, or being fidgety and restless',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'phq9_9',
        text: 'Thoughts that you would be better off dead or hurting yourself',
        category: 'mood',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoreRanges: [
      {
        min: 0,
        max: 4,
        label: 'Minimal Depression',
        description: 'Your responses suggest minimal depression symptoms. Keep taking care of your mental health!',
        color: 'green',
        recommendations: [
          'Continue with healthy lifestyle habits',
          'Stay connected with friends and family',
          'Maintain regular exercise and sleep schedule'
        ]
      },
      {
        min: 5,
        max: 9,
        label: 'Mild Depression',
        description: 'Your responses suggest mild depression symptoms. Consider speaking with a healthcare professional.',
        color: 'yellow',
        recommendations: [
          'Consider speaking with a counselor or therapist',
          'Focus on self-care activities',
          'Reach out to trusted friends or family'
        ]
      },
      {
        min: 10,
        max: 14,
        label: 'Moderate Depression',
        description: 'Your responses suggest moderate depression symptoms. We recommend seeking professional support.',
        color: 'orange',
        recommendations: [
          'Schedule an appointment with a mental health professional',
          'Consider therapy or counseling',
          'Discuss treatment options with your doctor'
        ]
      },
      {
        min: 15,
        max: 19,
        label: 'Moderately Severe Depression',
        description: 'Your responses suggest moderately severe depression. Professional help is recommended.',
        color: 'red',
        recommendations: [
          'Seek immediate professional help',
          'Consider therapy and/or medication',
          'Build a strong support network'
        ]
      },
      {
        min: 20,
        max: 27,
        label: 'Severe Depression',
        description: 'Your responses suggest severe depression. Please seek immediate professional help.',
        color: 'red',
        recommendations: [
          'Contact a mental health professional immediately',
          'Consider inpatient or intensive outpatient treatment',
          'Reach out to crisis hotlines if needed'
        ]
      }
    ]
  },
  {
    id: 'gad7',
    title: 'Anxiety Assessment',
    description: 'GAD-7 - Generalized Anxiety Disorder Scale',
    icon: 'heart',
    color: 'green',
    questions: [
      {
        id: 'gad7_1',
        text: 'Feeling nervous, anxious, or on edge',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_2',
        text: 'Not being able to stop or control worrying',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_3',
        text: 'Worrying too much about different things',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_4',
        text: 'Trouble relaxing',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_5',
        text: 'Being so restless that it is hard to sit still',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_6',
        text: 'Becoming easily annoyed or irritable',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'gad7_7',
        text: 'Feeling afraid as if something awful might happen',
        category: 'anxiety',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoreRanges: [
      {
        min: 0,
        max: 4,
        label: 'Minimal Anxiety',
        description: 'Your responses suggest minimal anxiety symptoms. Great job managing your stress!',
        color: 'green',
        recommendations: [
          'Continue with stress management techniques',
          'Maintain healthy boundaries',
          'Practice mindfulness and relaxation'
        ]
      },
      {
        min: 5,
        max: 9,
        label: 'Mild Anxiety',
        description: 'Your responses suggest mild anxiety symptoms. Consider stress management techniques.',
        color: 'yellow',
        recommendations: [
          'Try relaxation techniques like deep breathing',
          'Consider regular exercise or meditation',
          'Speak with a counselor if symptoms persist'
        ]
      },
      {
        min: 10,
        max: 14,
        label: 'Moderate Anxiety',
        description: 'Your responses suggest moderate anxiety symptoms. Professional support may be helpful.',
        color: 'orange',
        recommendations: [
          'Consider therapy or counseling',
          'Learn anxiety management techniques',
          'Discuss with a healthcare professional'
        ]
      },
      {
        min: 15,
        max: 21,
        label: 'Severe Anxiety',
        description: 'Your responses suggest severe anxiety symptoms. We recommend seeking professional help.',
        color: 'red',
        recommendations: [
          'Seek professional mental health support',
          'Consider therapy and/or medication',
          'Practice grounding techniques for immediate relief'
        ]
      }
    ]
  },
  {
    id: 'stress',
    title: 'Stress Level Assessment',
    description: 'Evaluate your current stress levels and coping mechanisms',
    icon: 'zap',
    color: 'purple',
    questions: [
      {
        id: 'stress_1',
        text: 'Feeling overwhelmed by daily responsibilities',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_2',
        text: 'Physical tension like headaches or muscle tightness',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_3',
        text: 'Trouble concentrating due to stress or worry',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_4',
        text: 'Feeling emotionally drained or exhausted',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_5',
        text: 'Difficulty making decisions or feeling indecisive',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_6',
        text: 'Feeling like you have no control over situations',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_7',
        text: 'Changes in appetite due to stress',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'stress_8',
        text: 'Feeling irritable or short-tempered',
        category: 'stress',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoreRanges: [
      {
        min: 0,
        max: 6,
        label: 'Low Stress',
        description: 'Your stress levels appear to be well-managed. Keep up the great work!',
        color: 'green',
        recommendations: [
          'Continue with current stress management strategies',
          'Maintain work-life balance',
          'Keep practicing healthy coping mechanisms'
        ]
      },
      {
        min: 7,
        max: 12,
        label: 'Moderate Stress',
        description: 'You\'re experiencing moderate stress levels. Consider implementing stress reduction techniques.',
        color: 'yellow',
        recommendations: [
          'Practice regular stress-reduction activities',
          'Consider time management techniques',
          'Ensure adequate rest and relaxation'
        ]
      },
      {
        min: 13,
        max: 18,
        label: 'High Stress',
        description: 'Your stress levels are quite high. It would be beneficial to address this proactively.',
        color: 'orange',
        recommendations: [
          'Consider professional stress management counseling',
          'Evaluate and modify current stressors where possible',
          'Implement daily stress-reduction practices'
        ]
      },
      {
        min: 19,
        max: 24,
        label: 'Very High Stress',
        description: 'You\'re experiencing very high stress levels. We strongly recommend seeking support.',
        color: 'red',
        recommendations: [
          'Seek professional help for stress management',
          'Consider counseling or therapy',
          'Evaluate major life changes to reduce stress'
        ]
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Quality Assessment',
    description: 'Evaluate your sleep patterns and quality',
    icon: 'moon',
    color: 'indigo',
    questions: [
      {
        id: 'sleep_1',
        text: 'Trouble falling asleep at night',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_2',
        text: 'Waking up frequently during the night',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_3',
        text: 'Waking up too early and unable to fall back asleep',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_4',
        text: 'Feeling tired or fatigued during the day',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_5',
        text: 'Difficulty concentrating due to poor sleep',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_6',
        text: 'Poor sleep affecting your mood or emotions',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      },
      {
        id: 'sleep_7',
        text: 'Relying on sleep aids or medications to fall asleep',
        category: 'sleep',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 }
        ]
      }
    ],
    scoreRanges: [
      {
        min: 0,
        max: 5,
        label: 'Good Sleep Quality',
        description: 'Your sleep quality appears to be good. Keep maintaining healthy sleep habits!',
        color: 'green',
        recommendations: [
          'Continue with current sleep routine',
          'Maintain consistent sleep schedule',
          'Keep bedroom environment optimal for sleep'
        ]
      },
      {
        min: 6,
        max: 10,
        label: 'Moderate Sleep Issues',
        description: 'You may be experiencing some sleep difficulties. Consider improving sleep hygiene.',
        color: 'yellow',
        recommendations: [
          'Establish a consistent bedtime routine',
          'Limit screen time before bed',
          'Create a comfortable sleep environment'
        ]
      },
      {
        min: 11,
        max: 15,
        label: 'Significant Sleep Problems',
        description: 'You\'re experiencing notable sleep problems. Consider speaking with a healthcare provider.',
        color: 'orange',
        recommendations: [
          'Consult with a sleep specialist or doctor',
          'Consider a sleep study if recommended',
          'Evaluate medications that might affect sleep'
        ]
      },
      {
        min: 16,
        max: 21,
        label: 'Severe Sleep Disorders',
        description: 'Your sleep issues are severe and may significantly impact your health. Seek professional help.',
        color: 'red',
        recommendations: [
          'Seek immediate medical consultation',
          'Consider sleep disorder evaluation',
          'Discuss treatment options with healthcare provider'
        ]
      }
    ]
  }
];