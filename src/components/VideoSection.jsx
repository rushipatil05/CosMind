import React, { useState } from 'react';
import { Play, Clock, Tag, BookOpen, Heart, Star, Filter, Search, X, ArrowLeft } from 'lucide-react';
import { mentalHealthVideos, videoCategories } from '../data/videos';

const VideoSection = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filteredVideos = mentalHealthVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' ||
      video.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  const getCategoryColor = (categoryId) => {
    const category = videoCategories.find(cat => cat.id === categoryId);
    return category ? category.color : 'purple';
  };

  const colorMap = {
    purple: 'from-[#3a0ca3] via-[#7209b7] to-[#4361ee]',
    blue: 'from-blue-400 via-cyan-500 to-teal-500',
    orange: 'from-orange-400 via-amber-500 to-yellow-500',
    indigo: 'from-cyan-400 via-teal-500 to-blue-500',
    pink: 'from-rose-400 via-pink-500 to-red-500',
    teal: 'from-teal-400 via-cyan-500 to-emerald-500',
    red: 'from-red-400 via-pink-500 to-rose-600',
    yellow: 'from-yellow-400 via-amber-500 to-orange-500',
    green: 'from-green-400 via-emerald-500 to-teal-500'
  };

  return (
    <div className="bg-black py-16 px-4 min-h-screen">

      {/* Back Button */}
      <button
        onClick={()=>onBack('welcome')}
        className="absolute top-6 left-6 z-50 
             p-2 rounded-2xl 
             bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] 
             text-white shadow-md 
             hover:shadow-indigo-500/50 hover:scale-110 hover:rotate-1 
             transform transition-all duration-500 ease-out"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 
                  p-2 rounded-full
                  bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] 
                  shadow-md 
                  hover:shadow-indigo-500/50 hover:scale-110 hover:rotate-1 
                  transform transition-all duration-500 ease-out">
            <Play className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold 
                 bg-gradient-to-r from-[#3a0ca3]/50 via-[#7209b7] to-[#4361ee] 
                 bg-clip-text text-transparent mb-4">
            Mental Health Education
          </h2>
        </div>


        {/* Search and Filter Section */}
        <div className="mb-12 animate-fade-in">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6  hover:shadow-2xl transition-all duration-500 ease-out">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search videos by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-14 py-4 
               bg-gray-900/40 backdrop-blur-md border border-gray-600/50 
               rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
               transition-all duration-300 text-gray-200 placeholder-gray-400
               shadow-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-gray-300">Categories:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {videoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id
                    ? `bg-gradient-to-r ${colorMap[category.color]} text-white shadow-lg`
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center animate-fade-in">
          <p className="text-gray-400 font-medium">
            {filteredVideos.length === mentalHealthVideos.length
              ? `Showing all ${filteredVideos.length} videos`
              : `Found ${filteredVideos.length} video${filteredVideos.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="bg-black/30 backdrop-blur-lg rounded-3xl shadow-md hover:shadow-purple-400/20 transition-all duration-700 transform hover:scale-[1.02] overflow-hidden animate-slide-up border border-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleVideoClick(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-full p-4 shadow-lg animate-gentle-pulse border border-purple-500/50">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${colorMap[getCategoryColor(video.category.toLowerCase().replace(/\s+/g, '-'))]} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                  {video.category}
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-3 leading-tight transition-colors duration-300">
                  {video.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-transparent hover:bg-gradient-to-br hover:from-[#3a0ca3cc] hover:via-[#7209b7cc] hover:to-[#4361eecc] text-white/80 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border border-white/20 backdrop-blur-sm shadow-sm transition-all duration-300 ease-out"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Key Points Preview */}
                <div className="bg-gradient-to-br from-gray-900/80 to-teal-900/30 rounded-2xl p-4 border border-teal-700/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-white" />
                    <span className="font-semibold text-white text-sm">What you'll learn:</span>
                  </div>
                  <ul className="space-y-1">
                    {video.keyPoints.slice(0, 2).map((point, pointIndex) => (
                      <li key={pointIndex} className="text-gray-300 text-sm flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                    {video.keyPoints.length > 2 && (
                      <li className="text-white text-sm font-medium">
                        + {video.keyPoints.length - 2} more insights...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Watch Button */}
                <button className="w-full mt-4 bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] hover:shadow-indigo-500/50 hover:scale-110 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform shadow-md flex items-center justify-center space-x-2 border border-indigo-500/30">
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4 border border-gray-700">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No videos found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
          </div>
        )}

        {/* Encouraging Footer */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-gray-800/80 via-teal-900/30 to-gray-800/80 border-l-4 border-purple-500 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl border">
            <div className="flex items-start">
              <div className="bg-purple-600 rounded-full p-2 mr-4 mt-1 flex-shrink-0 border border-purple-500/50">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-purple-300 mb-3 text-lg">Your Learning Journey Matters 💙</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every video you watch is a step toward better understanding yourself and your mental health.
                  Remember, seeking knowledge and support is a sign of strength, not weakness. You're taking
                  control of your wellbeing, and that's something to be proud of! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-grey-600 via-grey-600 to-black-700 text-white p-6 rounded-t-3xl relative">
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300 border border-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="pr-12">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="bg-black/30 px-3 py-1 rounded-full border border-gray-600">
                    {selectedVideo.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="p-6">
              <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden mb-6 border border-gray-700">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-200 mb-3">About This Video</h3>
                <p className="text-gray-400 leading-relaxed">{selectedVideo.description}</p>
              </div>

              {/* Key Points */}
              <div className="bg-gradient-to-br from-gray-800/80 to-teal-900/30 rounded-2xl p-6 border border-teal-700/30 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-5 h-5 text-teal-400" />
                  <h4 className="font-bold text-teal-300">Key Learning Points</h4>
                </div>
                <ul className="space-y-3">
                  {selectedVideo.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-300 flex items-start font-medium">
                      <span className="text-teal-400 mr-3 text-lg">✨</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-200 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-teal-900/50 text-teal-300 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border border-teal-700/30"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;