import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Calendar, User, Award, Languages, ChevronRight } from 'lucide-react';
import { healthcareProfessionals } from '../data/professionals';
import BookingModal from './BookingModal';

const ProfessionalsSection = ({ relevantDoctors }) => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookAppointment = (professional) => {
    setSelectedProfessional(professional);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedProfessional(null);
  };

  return (
    <div className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8 animate-fade-in relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-2 drop-shadow-md">
            Recommended Healthcare Professionals
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with qualified mental health professionals who can provide personalized support and guidance on your wellness journey.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {relevantDoctors.map((professional, index) => (
            <div
              key={professional.id}
              className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-105 overflow-hidden border border-gray-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100">
            
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                <div className="relative z-10 flex items-start space-x-3">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-16 h-16 rounded-xl object-cover border-4 border-white/20 shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-200 mb-1">{professional.name}</h3>
                    <p className="text-gray-400 text-sm font-semibold mb-1">{professional.title}</p>
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-yellow-300 fill-current" />
                        <span className="font-semibold">{professional.rating}</span>
                        <span className="text-gray-400">({professional.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-gray-400" />
                        <span>{professional.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            
              <div className="p-4">
                
                <div className="mb-3">
                  <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 mb-2 border border-gray-700">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-gentle-pulse"></div>
                    <span className="text-gray-300 font-semibold text-xs">{professional.specialization}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{professional.bio}</p>
                </div>

            
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gray-300" />
                      <span className="font-semibold text-gray-200 text-sm">Consultation</span>
                    </div>
                    <p className="text-gray-100 font-bold text-sm">${professional.consultationFee}</p>
                  </div>

                  <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-300" />
                      <span className="font-semibold text-gray-200 text-sm">Location</span>
                    </div>
                    <p className="text-gray-400 text-xs font-medium">{professional.location}</p>
                  </div>
                </div>

        
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Languages className="w-4 h-4 text-gray-300" />
                    <span className="font-semibold text-gray-200 text-sm">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {professional.languages.map((language, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

              
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-1 text-sm flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-300" />
                    <span>Credentials</span>
                  </h4>
                  <div className="space-y-0.5">
                    {professional.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-400 text-xs">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>

            
                <button
                  onClick={() => handleBookAppointment(professional)}
                  className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 animate-soft-glow text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      
        <div className="w-full px-4 md:px-0 mt-12 animate-fade-in relative z-10">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-l-4 border-gray-600 rounded-xl p-4 shadow-md max-w-full mx-auto">
            <div className="flex items-start">
              <div className="bg-gray-700 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
                <User className="w-5 h-5 text-gray-200 drop-shadow-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-300 mb-2 text-base drop-shadow-sm">
                  Professional Support Available
                </h3>
                <p className="text-gray-400 text-sm leading-snug drop-shadow-sm">
                  All listed professionals are licensed and experienced in their respective fields.
                  Appointments are available both in-person and via telehealth. Insurance coverage may apply —
                  please check with your provider and the professional's office for details.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>


      {showBooking && selectedProfessional && (
        <BookingModal
          professional={selectedProfessional}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );

};

export default ProfessionalsSection;