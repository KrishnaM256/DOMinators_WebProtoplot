import React, { useState, useEffect } from 'react';
import { FaAppleAlt, FaRunning, FaGlassWhiskey, FaTrophy, FaHeart } from 'react-icons/fa';

const WellnessQuest = () => {
  // Game state
  const [gameStage, setGameStage] = useState('welcome'); // welcome, nutrition, exercise, hydration, results
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [healthPoints, setHealthPoints] = useState(100);
  const [hydrationLevel, setHydrationLevel] = useState(50);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [waterConsumed, setWaterConsumed] = useState(0);

  // Nutrition game data
  const foodItems = [
    { id: 1, name: 'Apple', type: 'fruit', healthValue: 20, icon: <FaAppleAlt /> },
    { id: 2, name: 'Pizza', type: 'junk', healthValue: -15 },
    { id: 3, name: 'Salad', type: 'vegetable', healthValue: 25 },
    { id: 4, name: 'Burger', type: 'junk', healthValue: -20 },
    { id: 5, name: 'Grilled Chicken', type: 'protein', healthValue: 30 },
    { id: 6, name: 'Soda', type: 'junk', healthValue: -25 },
    { id: 7, name: 'Brown Rice', type: 'grain', healthValue: 15 },
    { id: 8, name: 'Donut', type: 'junk', healthValue: -10 },
  ];

  // Exercise game data
  const exercises = [
    { id: 1, name: '10 Jumping Jacks', energyCost: 10, healthGain: 15, icon: <FaRunning /> },
    { id: 2, name: '5 Push-ups', energyCost: 15, healthGain: 20 },
    { id: 3, name: '30s Plank', energyCost: 20, healthGain: 25 },
    { id: 4, name: '10 Squats', energyCost: 12, healthGain: 18 },
    { id: 5, name: '1min Jog in Place', energyCost: 25, healthGain: 30 },
  ];

  // Game effects
  useEffect(() => {
    // Update health points based on selections
    const nutritionScore = selectedFoods.reduce((sum, food) => sum + food.healthValue, 0);
    const exerciseScore = completedExercises.reduce((sum, ex) => sum + ex.healthGain, 0);
    const hydrationBonus = Math.floor(hydrationLevel / 10);
    
    const totalHealth = 100 + nutritionScore + exerciseScore + hydrationBonus;
    setHealthPoints(Math.max(0, Math.min(100, totalHealth)));
  }, [selectedFoods, completedExercises, hydrationLevel]);

  // Game actions
  const selectFood = (food) => {
    setSelectedFoods([...selectedFoods, food]);
    setScore(score + Math.max(0, food.healthValue));
    setStreak(food.type === 'junk' ? 0 : streak + 1);
  };

  const completeExercise = (exercise) => {
    if (energyLevel >= exercise.energyCost) {
      setCompletedExercises([...completedExercises, exercise]);
      setEnergyLevel(energyLevel - exercise.energyCost);
      setScore(score + exercise.healthGain);
      setStreak(streak + 1);
    }
  };

  const drinkWater = () => {
    setWaterConsumed(waterConsumed + 1);
    setHydrationLevel(Math.min(100, hydrationLevel + 10));
    setScore(score + 5);
    setStreak(streak + 1);
  };

  const startGame = () => {
    setGameStage('nutrition');
    setScore(0);
    setStreak(0);
    setHealthPoints(100);
    setHydrationLevel(50);
    setEnergyLevel(50);
    setSelectedFoods([]);
    setCompletedExercises([]);
    setWaterConsumed(0);
  };

  // Game components
  const WelcomeScreen = () => (
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Wellness Quest</h1>
      <p className="mb-6 text-gray-700">
        Embark on a journey to better health! Learn about nutrition, exercise, and hydration
        through fun interactive challenges.
      </p>
      <div className="flex justify-center space-x-4 mb-6">
        <div className="text-center p-4 border rounded-lg">
          <FaAppleAlt className="text-3xl text-red-400 mx-auto mb-2" />
          <p>Nutrition</p>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <FaRunning className="text-3xl text-blue-400 mx-auto mb-2" />
          <p>Exercise</p>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <FaGlassWhiskey className="text-3xl text-blue-200 mx-auto mb-2" />
          <p>Hydration</p>
        </div>
      </div>
      <button
        onClick={startGame}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        Start Your Wellness Journey
      </button>
    </div>
  );

  const NutritionGame = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
        <FaAppleAlt className="mr-2" /> Nutrition Challenge
      </h2>
      <p className="mb-4">Build a balanced meal by selecting healthy foods!</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {foodItems.map((food) => (
          <button
            key={food.id}
            onClick={() => selectFood(food)}
            disabled={selectedFoods.some(f => f.id === food.id)}
            className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
              food.type === 'junk' ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'
            } ${selectedFoods.some(f => f.id === food.id) ? 'opacity-50' : ''}`}
          >
            {food.icon && React.cloneElement(food.icon, { className: 'text-2xl mb-2' })}
            <span>{food.name}</span>
            <span className={`text-xs mt-1 ${
              food.healthValue > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {food.healthValue > 0 ? `+${food.healthValue}HP` : `${food.healthValue}HP`}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Your Meal:</h3>
        {selectedFoods.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedFoods.map((food, index) => (
              <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                food.type === 'junk' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {food.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Select foods to build your meal</p>
        )}
      </div>
      
      <button
        onClick={() => setGameStage('exercise')}
        disabled={selectedFoods.length < 3}
        className={`mt-4 bg-blue-500 text-white py-2 px-6 rounded-full ${
          selectedFoods.length < 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        Next: Exercise Challenge
      </button>
    </div>
  );

  const ExerciseGame = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
        <FaRunning className="mr-2" /> Exercise Challenge
      </h2>
      <p className="mb-4">
        Complete exercises to boost your health! Energy: {energyLevel}/100
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => completeExercise(exercise)}
            disabled={energyLevel < exercise.energyCost || completedExercises.some(ex => ex.id === exercise.id)}
            className={`p-4 border rounded-lg text-left flex justify-between items-center ${
              energyLevel < exercise.energyCost ? 'bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
            } ${completedExercises.some(ex => ex.id === exercise.id) ? 'opacity-50' : ''}`}
          >
            <div>
              <h3 className="font-medium">{exercise.name}</h3>
              <p className="text-sm text-gray-600">
                Energy: -{exercise.energyCost} | Health: +{exercise.healthGain}
              </p>
            </div>
            {exercise.icon && React.cloneElement(exercise.icon, { className: 'text-xl' })}
          </button>
        ))}
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Completed Exercises:</h3>
        {completedExercises.length > 0 ? (
          <ul className="list-disc pl-5">
            {completedExercises.map((ex, index) => (
              <li key={index}>{ex.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Complete exercises to boost your health</p>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setGameStage('nutrition')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-full"
        >
          Back to Nutrition
        </button>
        <button
          onClick={() => setGameStage('hydration')}
          disabled={completedExercises.length < 2}
          className={`bg-blue-500 text-white py-2 px-6 rounded-full ${
            completedExercises.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Next: Hydration Challenge
        </button>
      </div>
    </div>
  );

  const HydrationGame = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
        <FaGlassWhiskey className="mr-2" /> Hydration Challenge
      </h2>
      <p className="mb-4">
        Stay hydrated! Your hydration level: {hydrationLevel}/100
      </p>
      
      <div className="relative h-8 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${hydrationLevel}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {hydrationLevel}%
        </div>
      </div>
      
      <button
        onClick={drinkWater}
        disabled={hydrationLevel >= 100}
        className={`w-full py-4 rounded-full flex items-center justify-center ${
          hydrationLevel >= 100
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-400 hover:bg-blue-500 text-white'
        }`}
      >
        <FaGlassWhiskey className="mr-2" />
        Drink Water (+10% hydration)
      </button>
      
      <p className="mt-4 text-center text-gray-600">
        Glasses consumed today: {waterConsumed}
      </p>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setGameStage('exercise')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-full"
        >
          Back to Exercise
        </button>
        <button
          onClick={() => setGameStage('results')}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full"
        >
          See Results
        </button>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Your Wellness Results</h1>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            {/* Health progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4ade80"
              strokeWidth="8"
              strokeDasharray={`${healthPoints * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <FaHeart className="text-4xl text-red-500" />
            <span className="text-2xl font-bold mt-2">{healthPoints}</span>
            <span className="text-sm">Health Points</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span>Nutrition Score</span>
          <span className="font-bold">{selectedFoods.reduce((sum, f) => sum + Math.max(0, f.healthValue), 0)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span>Exercise Score</span>
          <span className="font-bold">{completedExercises.reduce((sum, ex) => sum + ex.healthGain, 0)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span>Hydration Bonus</span>
          <span className="font-bold">{Math.floor(hydrationLevel / 10)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
          <span className="font-semibold">Total Score</span>
          <span className="font-bold text-green-600">{score}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Your Wellness Streak</h3>
        <div className="flex justify-center">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center ${
                i < streak ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={startGame}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        Play Again
      </button>
    </div>
  );

  // Main game render
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Game header with stats */}
      <div className="max-w-4xl mx-auto mb-6 bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-1" />
            <span>{healthPoints} HP</span>
          </div>
          <div className="flex items-center">
            <FaGlassWhiskey className="text-blue-400 mr-1" />
            <span>{hydrationLevel}% Hydration</span>
          </div>
          <div className="flex items-center">
            <FaRunning className="text-blue-600 mr-1" />
            <span>{energyLevel} Energy</span>
          </div>
        </div>
        <div className="flex items-center">
          <FaTrophy className="text-yellow-500 mr-1" />
          <span>{score} Points</span>
        </div>
      </div>
      
      {/* Current game stage */}
      {gameStage === 'welcome' && <WelcomeScreen />}
      {gameStage === 'nutrition' && <NutritionGame />}
      {gameStage === 'exercise' && <ExerciseGame />}
      {gameStage === 'hydration' && <HydrationGame />}
      {gameStage === 'results' && <ResultsScreen />}
    </div>
  );
};

export default WellnessQuest;