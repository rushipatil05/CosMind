import React, { useEffect, useState } from 'react';
import { Brain, Heart, Users, Clock, MapPin, Phone } from 'lucide-react';
import RiveHero from './components/RiveHero/RiveHero'
import NumberPreloader from './components/NumberPreLoader/NumberPreLoader';
import MentalHealthLanding from './components/MentalHealthLanding/MentalHeadingLanding';
import QuizComponent from './components/QuizComponent'
import ResultsScreen from './components/ResultsScreen'
import VideoSection from './components/VideoSection'
import { quizzes } from '../src/data/quizzes';

function App() {
  const [startnow, setstartnow] = useState(false)
  const [showRiveHero, setShowRiveHero] = useState(false);
  const [currentState, setCurrentState] = useState('home');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [mixedQuiz, setMixedQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 700);



   useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 700);
    }

    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    createMixedQuiz()
    // console.log(results[0]?.categoryScores || {})
  }, [currentState])


  const createMixedQuiz = () => {
    // Get all questions from all quizzes
    const allQuestions = [];
    quizzes.forEach(quiz => {
      quiz.questions.forEach(question => {
        allQuestions.push({
          ...question,
          sourceQuiz: quiz.id,
          sourceQuizTitle: quiz.title,
          sourceQuizIcon: quiz.icon,
          sourceQuizColor: quiz.color
        });
      });
    });

    // Shuffle and take 10 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    // Create mixed quiz object
    const mixed = {
      id: 'mixed',
      title: 'Mixed Mental Health Assessment',
      description: 'A comprehensive 10-question assessment covering multiple areas',
      icon: 'brain',
      color: 'purple',
      questions: selectedQuestions
    };

    setMixedQuiz(mixed);
    // setCurrentState('quiz');
  };

  const handleQuizComplete = (result) => {
    setResults([result]);
    setCurrentState('results');
  };

  const handleBackToWelcome = () => {
    setMixedQuiz(null);
    setCurrentState('home');
  };

  const handleStartOver = () => {
    setMixedQuiz(null);
    setResults([]);
    setCurrentState('home');
  };

  const resetApp = () => {
    setCurrentState('home');
    setQuizAnswers([]);
    setSelectedDoctor(null);
    setAppointmentData(null);
  };

  if (currentState === 'quiz') {
    return (
      <QuizComponent
        quiz={mixedQuiz}
        onComplete={handleQuizComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (currentState === 'welcome') {
    return (
      <MentalHealthLanding 
      setCurrentState={setCurrentState}
      />
    );
  }

  if (currentState === 'results') {
    return (
      <ResultsScreen
        results={results}
        scoreData={results[0]?.categoryScores || {}}
        onBack={setCurrentState}
        onStartOver={handleStartOver}
      />
    );
  }
  if (currentState === 'videos') {
    return (
      <VideoSection 
      onBack={setCurrentState}
      />
    );
  }

  if (currentState === 'booking' && selectedDoctor) {
    return (
      <BookingForm
        doctor={selectedDoctor}
        onComplete={(data) => {
          setAppointmentData(data);
          setCurrentState('slip');
        }}
        onBack={() => setCurrentState('results')}
      />
    );
  }

  if (currentState === 'slip' && appointmentData) {
    return (
      <AppointmentSlip
        appointmentData={appointmentData}
        onHome={resetApp}
      />
    );
  }

  return (
    <>
      {!showRiveHero && <NumberPreloader onComplete={() => setShowRiveHero(true)} />}
      {showRiveHero && (
        isDesktop
          ? (!startnow ? (
              <RiveHero setstartnow={setstartnow} />
            ) : (
              <MentalHealthLanding setCurrentState={setCurrentState} />
            ))
          : (
            <MentalHealthLanding setCurrentState={setCurrentState} />
          )
      )}
    </>
  );
}

export default App;