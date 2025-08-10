import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Brain,
  Heart,
  Moon,
  Zap,
  AlertCircle,
  CheckCircle,
  Star,
  Award,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { quizzes } from '../data/quizzes';
import { healthcareProfessionals } from '../data/professionals'
import ProfessionalsSection from './ProfessionalsSection';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";



const iconMap = {
  brain: Brain,
  heart: Heart,
  moon: Moon,
  zap: Zap,
};

const colorMap = {
  green: 'from-emerald-400 via-green-500 to-teal-500',
  yellow: 'from-amber-400 via-yellow-500 to-orange-400',
  orange: 'from-orange-400 via-red-400 to-pink-500',
  red: 'from-red-400 via-pink-500 to-rose-600',
  blue: 'from-blue-400 via-indigo-500 to-purple-500',
  purple: 'from-purple-400 via-violet-500 to-indigo-500',
  indigo: 'from-indigo-400 via-blue-500 to-cyan-500',
};

const ResultsScreen = ({ results, onBackToWelcome, onStartOver, scoreData, onBack }) => {

  const [showInfo, setShowInfo] = useState(false);


  const getScoreRange = (quizId, score) => {
    if (quizId === 'mixed') {
      const percentage = (score / 30) * 100;
      if (percentage <= 25) {
        return {
          min: 0,
          max: 7,
          label: 'Low Concern',
          description:
            'Your responses suggest minimal concerns across the assessed areas. Keep maintaining your positive mental health habits!',
          color: 'green',
          recommendations: [
            'Continue with healthy lifestyle habits',
            'Maintain regular exercise and sleep schedule',
            'Stay connected with supportive relationships',
          ],
        };
      } else if (percentage <= 50) {
        return {
          min: 8,
          max: 15,
          label: 'Mild Concerns',
          description:
            'Your responses suggest some areas that could benefit from attention. Consider implementing stress management techniques.',
          color: 'yellow',
          recommendations: [
            'Practice mindfulness and relaxation techniques',
            'Consider speaking with a counselor if concerns persist',
            'Focus on self-care activities',
          ],
        };
      } else if (percentage <= 75) {
        return {
          min: 16,
          max: 22,
          label: 'Moderate Concerns',
          description:
            'Your responses suggest moderate concerns that may benefit from professional support.',
          color: 'orange',
          recommendations: [
            'Consider speaking with a mental health professional',
            'Implement daily stress-reduction practices',
            'Build a strong support network',
          ],
        };
      } else {
        return {
          min: 23,
          max: 30,
          label: 'Significant Concerns',
          description:
            'Your responses suggest significant concerns. We recommend seeking professional support.',
          color: 'red',
          recommendations: [
            'Seek professional mental health support',
            'Consider therapy and/or counseling',
            'Reach out to trusted friends or family',
          ],
        };
      }
    }

    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;
    return quiz.scoreRanges.find((range) => score >= range.min && score <= range.max);
  };

  const getScoreIcon = (color) => {
    switch (color) {
      case 'green':
        return <Star className="w-6 h-6 text-emerald-500 animate-gentle-pulse" />;
      case 'yellow':
        return <Sparkles className="w-6 h-6 text-amber-500 animate-gentle-pulse" />;
      case 'orange':
        return <TrendingUp className="w-6 h-6 text-orange-500 animate-gentle-pulse" />;
      case 'red':
        return <Heart className="w-6 h-6 text-rose-500 animate-gentle-pulse" />;
      default:
        return <Award className="w-6 h-6 text-blue-500 animate-gentle-pulse" />;
    }
  };

  const getEncouragingMessage = (color) => {
    switch (color) {
      case 'green':
        return "You're doing great! Keep up the wonderful work! 🌟";
      case 'yellow':
        return "You're on a positive path. Small steps make big differences! 💫";
      case 'orange':
        return "You're taking important steps by being aware. That's strength! 💪";
      case 'red':
        return "You're brave for taking this step. Support is available and you matter! 💝";
      default:
        return 'Thank you for taking care of your mental health! 🌈';
    }
  };

  const getScoreEmoji = (color) => {
    switch (color) {
      case 'green':
        return '🌟';
      case 'yellow':
        return '🌤️';
      case 'orange':
        return '🌅';
      case 'red':
        return '🌸';
      default:
        return '💙';
    }
  };



  useEffect(() => {
    const timer = setTimeout(() => setShowInfo(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { name: "Mood", value: Math.min((scoreData?.mood || 0) * 10, 100) },
    { name: "Anxiety", value: Math.min((scoreData?.anxiety || 0) * 10, 100) },
    { name: "Stress", value: Math.min((scoreData?.stress || 0) * 10, 100) },
    { name: "Sleep", value: Math.min((scoreData?.sleep || 0) * 10, 100) }
  ];


  function getRelevantProfessionals(results) {
    
    console.log(results)
    const { mood, anxiety, stress, sleep } = results[0]?.categoryScores || {};

    const highCategories = Object.entries({ mood, anxiety, stress, sleep })
      .filter(([key, value]) => value >= 1) 
      .map(([key]) => key);

    console.log(highCategories);


    if (highCategories.length === 0) return healthcareProfessionals; 

    const matchedDoctors = healthcareProfessionals.filter(doctor =>
      highCategories.some(category =>
        doctor.expertise.some(exp => exp.toLowerCase().includes(category.toLowerCase()))
      )
    );

    return matchedDoctors

  }

  const relevantDoctors = getRelevantProfessionals(results);
  if (relevantDoctors) {
    console.log(relevantDoctors)
  }

  return (
    <div className="min-h-screen bg-black p-4 py-8 flex items-start justify-center relative overflow-hidden text-gray-100">


      <button
        onClick={() => onBack('welcome')}
        className="absolute top-6 left-6 z-50 
                   p-2 rounded-2xl 
                   bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] 
                   text-white shadow-md 
                   hover:shadow-indigo-500/50 hover:scale-110 hover:rotate-1 
                   transform transition-all duration-500 ease-out"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Floating galaxy-style blurred orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-36 h-36 rounded-full animate-galaxy-float"
          style={{
            background: 'radial-gradient(circle, #8a2be2 0%, #4b0082 40%, transparent 80%)',
            filter: 'blur(60px)',
            opacity: 0.4,
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute top-1/3 right-20 w-28 h-28 rounded-full animate-galaxy-drift"
          style={{
            background: 'radial-gradient(circle, #00ffff 0%, #000080 50%, transparent 90%)',
            filter: 'blur(50px)',
            opacity: 0.35,
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-44 h-44 rounded-full animate-galaxy-float"
          style={{
            background: 'radial-gradient(circle, #ff69b4 0%, #800080 60%, transparent 90%)',
            filter: 'blur(60px)',
            opacity: 0.3,
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full animate-galaxy-drift"
          style={{
            background: 'radial-gradient(circle, #9370db 0%, #4b0082 60%, transparent 90%)',
            filter: 'blur(40px)',
            opacity: 0.3,
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full animate-galaxy-breathe transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, #7fffd4 0%, #191970 70%, transparent 95%)',
            filter: 'blur(55px)',
            opacity: 0.35,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Main container */}
      <div className="max-w-6xl mx-auto relative z-10 w-full space-y-8">

        {/* Gentle Reminder at the top */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-l-4 border-gray-600 rounded-xl p-4 animate-fade-in shadow-md">
          <div className="flex items-start">
            <div className="bg-gray-700 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
              <Heart className="w-5 h-5 text-gray-200 drop-shadow-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-2 text-base drop-shadow-sm">
                A Gentle Reminder 💙
              </h3>
              <p className="text-gray-400 text-sm leading-snug drop-shadow-sm">
                These assessments are like a friendly check-in with yourself – they're here to help guide you,
                not define you. You are so much more than any score! If you're feeling overwhelmed or need
                someone to talk to, reaching out to a mental health professional is a beautiful act of self-care.
                You deserve support and kindness! 🌟
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Results Section */}
          <div className="flex-grow-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => {
              const quiz =
                result.quizId === 'mixed'
                  ? { id: 'mixed', title: 'Mixed Assessment', icon: 'brain', color: 'gray' }
                  : quizzes.find((q) => q.id === result.quizId);
              const scoreRange = getScoreRange(result.quizId, result.score);
              if (!quiz || !scoreRange) return null;

              const IconComponent = iconMap[quiz.icon];
              const percentage = (result.score / result.maxScore) * 100;

              const gradientMap = {
                gray: 'from-gray-700 via-gray-800 to-gray-900',
                green: 'from-green-600 via-emerald-500 to-teal-600',
                orange: 'from-orange-600 via-yellow-500 to-amber-600',
                red: 'from-red-600 via-rose-600 to-pink-600',
              };

              return (
                <div
                  key={result.quizId}
                  className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 overflow-hidden border border-gray-700"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${gradientMap[quiz.color] || gradientMap.gray} p-4 relative`}>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-md">
                          <IconComponent className="w-6 h-6 text-gray-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-200">{quiz.title}</h3>
                          <p className="text-gray-400 text-xs font-medium">
                            {`Completed ${new Date(result.completedAt).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                        {getScoreIcon(scoreRange.color)}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-3 shadow-inner border border-gray-800 mb-4">
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="flex justify-center text-2xl">{getScoreEmoji(scoreRange.color)}</div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-100">
                            {result.score}
                            <span className="text-sm text-gray-400">/{result.maxScore}</span>
                          </div>
                          <div className="text-xs text-gray-400 font-medium">Your Score</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-bold ${scoreRange.color === 'green'
                              ? 'text-emerald-400'
                              : scoreRange.color === 'yellow'
                                ? 'text-amber-400'
                                : scoreRange.color === 'orange'
                                  ? 'text-orange-400'
                                  : 'text-pink-400'
                              }`}
                          >
                            {scoreRange.label}
                          </div>
                          <div className="text-xs text-gray-400 font-medium">{percentage.toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">{scoreRange.description}</p>
                    {scoreRange.recommendations && (
                      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-3 border border-gray-600">
                        <h4 className="font-bold text-gray-300 mb-2 text-sm flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-gray-400" />
                          <span>Suggestions</span>
                        </h4>
                        <ul className="space-y-1">
                          {scoreRange.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-xs text-gray-300 flex items-start">
                              <span className="text-gray-400 mr-2">💚</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Info Card */}

            <div className="flex-grow animate-fade-in">
              {showInfo && (
                <div className="bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70 
                        backdrop-blur-md rounded-2xl shadow-lg border border-gray-700/40 
                        p-6 h-fit">
                  <h3 className="text-lg font-bold bg-gradient-to-r
                         bg-clip-text text-white mb-3">
                    About Your Results
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Based on your assessment, here’s a breakdown of your mental health factors.
                  </p>

                  {/* Chart */}
                  <div className="w-full h-48">
                    <ResponsiveContainer>
                      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3a0ca3" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4361ee" stopOpacity={0.8} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e1e2f",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff"
                          }}
                        />
                        <Bar dataKey="value" fill="url(#purpleGradient)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Healthcare Professionals Section */}
        <ProfessionalsSection relevantDoctors={relevantDoctors} />
      </div>
    </div>
  );




};

export default ResultsScreen;
