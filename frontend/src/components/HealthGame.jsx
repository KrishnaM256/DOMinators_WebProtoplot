import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
    {
        question: "How many glasses of water should you drink daily?",
        options: ["2-3", "4-5", "6-8", "10-12"],
        answer: "6-8",
    },
    {
        question: "Which is a healthy post-workout snack?",
        options: ["Chips", "Chocolate", "Banana & Peanut Butter", "Soda"],
        answer: "Banana & Peanut Butter",
    },
    {
        question: "How long should you exercise daily?",
        options: ["10 min", "20 min", "30 min", "1 hr"],
        answer: "30 min",
    },
];

const HealthGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (selected) => {
        if (selected === questions[currentQuestion].answer) {
            setScore((prev) => prev + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setGameOver(true);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-blue-300 text-gray-800 p-4">
            <h1 className="text-4xl font-bold mb-6">🏃‍♂️ Health Hero Adventure</h1>

            {!gameOver ? (
                <>
                    <motion.div 
                        className="bg-white p-6 rounded shadow-md w-full max-w-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl mb-4">{questions[currentQuestion].question}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all"
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress bar character journey */}
                    <div className="w-full max-w-xl mt-8 h-6 bg-gray-300 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute top-[-20px] left-0"
                            animate={{ x: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        >
                            🧍
                        </motion.div>
                    </div>
                </>
            ) : (
                <motion.div
                    className="text-center bg-white p-6 rounded-lg shadow-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <h2 className="text-3xl font-bold mb-4">🎉 You did it!</h2>
                    <p className="text-xl">Final Score: {score}/{questions.length}</p>
                    <p className="mt-2 text-green-600 font-semibold">You're now a Health Hero! 💪</p>
                    <ul className="mt-4 text-left list-disc pl-5">
                        <li>Drink enough water daily</li>
                        <li>Eat balanced meals</li>
                        <li>Exercise for at least 30 mins</li>
                        <li>Rest and stay positive</li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default HealthGame;
