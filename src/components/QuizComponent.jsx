import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const QuizComponent = ({ quiz, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);
  const [frontCardIndex, setFrontCardIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Ensure we only show 4 options max
  const options = currentQuestion.options.slice(0, 4);

  // Set selected option based on existing answer when question changes
  React.useEffect(() => {
    const existingAnswer = answers[currentQuestion.id];
    if (existingAnswer !== undefined) {
      const optionIndex = options.findIndex(option => option.value === existingAnswer);
      setSelectedOption(optionIndex !== -1 ? optionIndex : null);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestionIndex, currentQuestion.id, answers, options]);

  const handleCardClick = (optionIndex) => {
    if (isRotating) return;

    // If clicking the front card, select it
    if (optionIndex === frontCardIndex) {
      setSelectedOption(optionIndex);
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: options[optionIndex].value }));
      return;
    }

    // Otherwise, rotate to bring this card to front
    setIsRotating(true);
    setFrontCardIndex(optionIndex);

    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };

  const handlePrevious = () => {
    if (isFirstQuestion || isTransitioning) return;

    // Start gentle transition
    setIsTransitioning(true);

    // Gentle fade out with longer duration
    setTimeout(() => {
      setQuestionVisible(false);
    }, 200);

    // Smooth card transition with staggered timing
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev - 1);
      setFrontCardIndex(0); // Reset to first card for previous question

      // Gentle fade in for previous question
      setTimeout(() => {
        setQuestionVisible(true);

        // Complete transition after content is visible
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 400);
    }, 600);
  };


  const handleNext = () => {
    if (selectedOption === null) return;

    // Start gentle transition
    setIsTransitioning(true);

    // Gentle fade out with longer duration
    setTimeout(() => {
      setQuestionVisible(false);
    }, 200);

    // Smooth card transition with staggered timing
    setTimeout(() => {
      if (isLastQuestion) {
        handleComplete();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setFrontCardIndex(0); // Reset to first card for next question
        setSelectedOption(null); // Reset selection for next question

        // Gentle fade in for new question
        setTimeout(() => {
          setQuestionVisible(true);

          // Complete transition after content is visible
          setTimeout(() => {
            setIsTransitioning(false);
          }, 300);
        }, 400);
      }
    }, 600);
  };

  const handleComplete = () => {
    setIsCompleting(true);

    setTimeout(() => {

      const categoryScores = {
        mood: 0,
        anxiety: 0,
        stress: 0,
        sleep: 0,
      };

      quiz.questions.forEach((question) => {
        const answerValue = answers[question.id] || 0;
        const category = question.category || 'mood'; 

        if (categoryScores.hasOwnProperty(category)) {
          categoryScores[category] += answerValue;
        }
      });

      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
      const maxScore = quiz.questions.reduce((sum, q) => sum + Math.max(...q.options.map(opt => opt.value)), 0);

      const result = {
        quizId: quiz.id,
        score: totalScore,
        maxScore,
        completedAt: new Date(),
        answers,
        categoryScores,
      };

      onComplete(result);
    }, 1500);
  }

  const getOptionGradient = (value) => {
    switch (value) {
      case 0: return 'from-emerald-400 via-green-500 to-teal-600';
      case 1: return 'from-yellow-400 via-amber-500 to-orange-500';
      case 2: return 'from-orange-500 via-red-500 to-pink-600';
      case 3: return 'from-red-500 via-pink-600 to-purple-700';
      case 4: return 'from-purple-600 via-indigo-700 to-blue-800';
      default: return 'from-gray-400 via-slate-500 to-gray-600';
    }
  };

  const getCardPosition = (optionIndex) => {
    // Calculate relative position based on front card
    const relativeIndex = (optionIndex - frontCardIndex + options.length) % options.length;
    const isSelected = selectedOption === optionIndex;


    // Add transition effects
    const baseTransform = (() => {
      if (isTransitioning) {
        // Gentle fade and scale down instead of flying out
        return `translateX(0) translateY(0) rotate(0deg) scale(0.85)`;
      }

      switch (relativeIndex) {
        case 0: // Front card
          return isSelected ? 'translateX(0) translateY(-10px) rotate(0deg) scale(1.05)' : 'translateX(0) translateY(0) rotate(0deg) scale(1)';
        case 1: // Right card
          return 'translateX(140px) translateY(30px) rotate(15deg) scale(0.85)';
        case 2: // Back card
          return 'translateX(0) translateY(60px) rotate(0deg) scale(0.7)';
        case 3: // Left card
          return 'translateX(-140px) translateY(30px) rotate(-15deg) scale(0.85)';
        default:
          return 'translateX(0) translateY(0) rotate(0deg) scale(1)';
      }
    })();
    return {
      transform: baseTransform,
      zIndex: isTransitioning ? 60 - relativeIndex : (relativeIndex === 0 ? 50 : 40 - relativeIndex * 5),
      opacity: isTransitioning ? 0 : (relativeIndex === 0 ? 1 : 1 - (relativeIndex * 0.2)),
    };
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
        {/* Optional: add those blurred floating gradient circles for galaxy effect here if needed */}

        <div className="text-center animate-fade-in max-w-sm mx-auto p-8 bg-black/40 backdrop-blur-md rounded-3xl shadow-xl border border-purple-700/50">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-700 via-pink-600 to-purple-500 rounded-full flex items-center justify-center animate-breathe shadow-2xl animate-soft-glow">
              <CheckCircle className="w-12 h-12 text-white animate-gentle-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-300 mb-4 drop-shadow-lg">
            Processing Your Responses
          </h2>

          <p className="text-gray-400 text-lg">
            Analyzing your answers with care...
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-gentle-pulse"></div>
              <div
                className="w-3 h-3 bg-purple-300 rounded-full animate-gentle-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className="w-3 h-3 bg-purple-200 rounded-full animate-gentle-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );

  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black text-gray-100 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-36 h-36 rounded-full animate-galaxy-float"
          style={{
            background:
              'radial-gradient(circle, #8a2be2 0%, #4b0082 40%, transparent 80%)',
            filter: 'blur(60px)',
            opacity: 0.4,
            mixBlendMode: 'screen',
          }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-28 h-28 rounded-full animate-galaxy-drift"
          style={{
            background:
              'radial-gradient(circle, #00ffff 0%, #000080 50%, transparent 90%)',
            filter: 'blur(50px)',
            opacity: 0.35,
            mixBlendMode: 'screen',
          }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-44 h-44 rounded-full animate-galaxy-float"
          style={{
            background:
              'radial-gradient(circle, #ff69b4 0%, #800080 60%, transparent 90%)',
            filter: 'blur(60px)',
            opacity: 0.3,
            mixBlendMode: 'screen',
          }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full animate-galaxy-drift"
          style={{
            background:
              'radial-gradient(circle, #9370db 0%, #4b0082 60%, transparent 90%)',
            filter: 'blur(40px)',
            opacity: 0.3,
            mixBlendMode: 'screen',
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full animate-galaxy-breathe transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(circle, #7fffd4 0%, #191970 70%, transparent 95%)',
            filter: 'blur(55px)',
            opacity: 0.35,
            mixBlendMode: 'screen',
          }}
        ></div>
      </div>

      <div className="relative z-10 p-4 py-8 max-w-md mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 animate-fade-in flex-shrink-0">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-purple-600/70"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <span className="text-sm text-white/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-purple-600/60">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 animate-fade-in flex-shrink-0">
          <div className="bg-black/50 rounded-full h-2 overflow-hidden border border-white/30">
            <div
              className="h-full transition-all duration-700 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                background: '#00ffff',
                boxShadow: '0 0 10px 3px #00ffff',
              }}
            />
          </div>
        </div>

        {/* Question Title */}
        <div
          className={`text-center mb-6 flex-shrink-0 transition-all duration-500 ${questionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
        >
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-300 mb-2 leading-tight drop-shadow-lg">
            {currentQuestion.text}
          </h1>
        </div>

        {/* Circular Card Stack */}
        <div className="relative flex-1 flex items-center justify-center min-h-0">
          {options.map((option, index) => {
            const cardStyle = getCardPosition(index);
            const isSelected = selectedOption === index;
            const isFront = index === frontCardIndex;

            return (
              <div
                key={index}
                className={`absolute w-60 h-80 cursor-pointer transition-all duration-600 ease-out ${isRotating || isTransitioning ? 'transition-all duration-1000' : 'transition-all duration-500'
                  }`}
                style={cardStyle}
                onClick={() => !isTransitioning && handleCardClick(index)}
              >
                {/* Card */}
                <div
                  className={`w-full h-full rounded-3xl shadow-2xl border-4 border-purple-900/70 overflow-hidden relative backdrop-blur-[20px] bg-gradient-to-br from-purple-900 via-black to-purple-800 ${isFront ? 'ring-4 ring-purple-600/50' : ''
                    } ${isSelected ? 'ring-8 ring-pink-500/70 shadow-pink-700/70' : ''}`}
                >
                  {/* Professional overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]"></div>

                  {/* Card Content */}
                  <div className="inset-0 flex flex-col items-center justify-center p-8 text-center relative z-10 text-white">
                    {/* Option Number Indicator */}
                    <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg border border-purple-700/50">
                      <span className="text-white font-bold text-base tracking-wide">
                        {index + 1}
                      </span>
                    </div>

                    {/* Front Card Indicator */}
                    {isFront && (
                      <div className="absolute top-6 right-6 bg-purple-700/40 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-purple-600/60 animate-gentle-pulse">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-breathe shadow-sm"></div>
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-6 right-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl w-10 h-10 flex items-center justify-center animate-gentle-pulse shadow-xl border-2 border-pink-400 animate-soft-glow">
                        <CheckCircle className="w-5 h-5 text-white drop-shadow-sm" />
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                      {/* Emoji/Icon based on severity */}
                      <div className="text-5xl drop-shadow-lg">
                        {option.value === 0 && "😊"}
                        {option.value === 1 && "🙂"}
                        {option.value === 2 && "😐"}
                        {option.value === 3 && "😔"}
                      </div>

                      {/* Option Text */}
                      <h3 className="text-xl font-bold leading-tight tracking-wide max-w-48 drop-shadow-md">
                        {option.text}
                      </h3>

                      {/* Severity Indicator */}
                      <div className="flex space-x-2 bg-black/30 rounded-full px-4 py-2 shadow-lg border border-purple-700/40">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= option.value
                              ? "bg-purple-400 shadow-sm scale-110 animate-gentle-pulse"
                              : "bg-purple-700/50"
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Label */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-purple-700/40">
                        <span className="text-purple-300 text-sm font-semibold tracking-wide drop-shadow-sm">
                          {option.value === 0 && "Not at all"}
                          {option.value === 1 && "Several days"}
                          {option.value === 2 && "More than half"}
                          {option.value === 3 && "Nearly every day"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-purple-900/20 transition-all duration-700 rounded-3xl backdrop-blur-[2px]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div
          className={`text-center mt-4 flex-shrink-0 transition-all duration-500 ${questionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <p className="text-gray-300 text-base mb-3 font-medium drop-shadow-sm">
            {selectedOption === null
              ? frontCardIndex === 0
                ? "Tap the front card to select, or tap other cards to rotate"
                : "Tap the front card to select your answer"
              : "Great! Click Next to continue"}
          </p>

          <div className="justify-center space-x-3 bg-black/30 rounded-full px-4 py-2 shadow-lg border border-purple-700/40 inline-flex">
            {options.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${index === frontCardIndex
                  ? "bg-purple-400 scale-125 shadow-sm animate-gentle-pulse"
                  : "bg-purple-700/50"
                  }`}
              />
            ))}
          </div>
        </div>


        {/* Next Button */}
        {selectedOption !== null && !isTransitioning && (
          <div className="mt-4 flex justify-center items-center gap-4 flex-shrink-0 animate-fade-in">
            {!isFirstQuestion && (
              <button
                onClick={handlePrevious}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl border border-white/30 flex items-center space-x-2 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isTransitioning}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl border border-purple-800 flex items-center space-x-3 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed animate-soft-glow"
              disabled={isTransitioning}
            >
              <span>{isLastQuestion ? "Complete Quiz" : "Next Question"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}



        {/* Transition Loading State */}
        {isTransitioning && (
          <div className="text-center mt-4 flex-shrink-0 animate-fade-in">
            <div className="bg-black/60 text-purple-300 font-medium py-3 px-8 rounded-2xl shadow-xl border border-purple-800 flex items-center space-x-3 mx-auto tracking-wide animate-gentle-pulse">
              <div className="w-5 h-5 border-2 border-purple-700 border-t-pink-400 rounded-full animate-spin-slow"></div>
              <span>Loading next question...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default QuizComponent;