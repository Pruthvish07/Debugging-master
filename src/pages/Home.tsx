import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Award, Play, RotateCcw, Trophy, Code2, Lightbulb, SkipForward } from 'lucide-react';
import confetti from 'canvas-confetti';
import { problemsPool, Problem } from '../data/problems';

export default function HomePage() {
  const [step, setStep] = useState<'home' | 'quiz' | 'result' | 'leaderboard'>('home');
  const [name, setName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [activeProblems, setActiveProblems] = useState<Problem[]>([]);
  const [answers, setAnswers] = useState<{ isCorrect: boolean; time: number }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // Timer logic
  useEffect(() => {
    if (step !== 'quiz' || isAnimating) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [step, isAnimating, currentIndex]);

  const shuffle = <T,>(array: T[]): T[] => {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  const generateSession = () => {
    const beginner = shuffle([...problemsPool.filter(p => p.difficulty === 'Beginner')]).slice(0, 4);
    const intermediate = shuffle([...problemsPool.filter(p => p.difficulty === 'Intermediate')]).slice(0, 4);
    const expert = shuffle([...problemsPool.filter(p => p.difficulty === 'Expert')]).slice(0, 2);
    
    return shuffle([...beginner, ...intermediate, ...expert]);
  };

  const handleStart = () => {
    if (!name.trim()) return;
    const session = generateSession();
    setActiveProblems(session);
    setStep('quiz');
    setCurrentIndex(0);
    setScore(0);
    setTimer(0);
    setAnswers([]);
    setShowHint(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnimating) return;
    
    setSelectedOption(index);
    const problem = activeProblems[currentIndex];
    const isCorrect = index === problem.correctOptionIndex;
    
    setIsAnimating(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      const points = Math.max(10, 1000 - timer * 15 - (showHint ? 250 : 0));
      setScore(s => s + points);
    }
    
    setAnswers(prev => [...prev, { isCorrect, time: timer }]);
  };

  const handleGiveUp = () => {
    if (isAnimating) return;
    setIsAnimating('wrong');
    setSelectedOption(-1);
    setAnswers(prev => [...prev, { isCorrect: false, time: timer }]);
  };

  const handleNext = () => {
    setIsAnimating(null);
    setSelectedOption(null);
    setTimer(0);
    setShowHint(false);
    
    if (currentIndex < activeProblems.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setStep('result');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    const totalTime = answers.reduce((acc, curr) => acc + curr.time, 0) + timer;
    
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score, totalTime })
      });
      const data = await res.json();
      setLeaderboard(data);
    } catch (e) {
      console.error(e);
    }
  };

  const viewLeaderboard = async () => {
    setStep('leaderboard');
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    } catch (e) {
      console.error(e);
    }
  };

  const restart = () => {
    setStep('home');
    setName('');
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 sm:mt-12 w-full max-w-md mx-auto"
          >
            <div className="bg-[#111111] border border-[#333333] p-6 sm:p-8 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
              <div>
                <h2 className="text-2xl font-serif italic text-white mb-2">Welcome Dev!</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Test your logic through 10 tricky Python debugging scenarios. The faster you spot the correct behavior, the higher your score.
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your alias..."
                  className="w-full px-4 py-3 rounded bg-black border border-[#333333] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors font-mono text-sm text-gray-300"
                />
                <button
                  onClick={handleStart}
                  disabled={!name.trim()}
                  className="w-full py-3 px-4 flex items-center justify-center space-x-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-wider text-sm"
                >
                  <span>Start Challenge</span>
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={viewLeaderboard}
                  className="w-full py-3 px-4 flex items-center justify-center space-x-2 rounded-full border border-white/10 hover:bg-white/5 font-medium transition-colors uppercase tracking-widest text-xs text-gray-300"
                >
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span>View Leaderboard</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-1.5 sm:space-x-2">
                {activeProblems.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 sm:h-3 w-2 sm:w-3 border rounded-full transition-colors ${
                      idx === currentIndex ? 'border-purple-500 bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : idx < currentIndex ? 'bg-[#10b981] border-[#10b981]' : 'bg-[#111111] border-[#333333]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-[#e5e5e5]">{score} pts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="w-8 tabular-nums text-white text-sm">{timer}s</span>
                </div>
                <button onClick={restart} className="flex items-center text-gray-500 justify-center w-6 h-6 hover:text-white transition-colors border-l border-[#333333] pl-3" title="Restart App">
                  <RotateCcw className="w-4 h-4 text-rose-500/70 hover:text-rose-400 transition-colors" />
                </button>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#333333] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
              <div className="p-4 border-b border-[#333333] bg-black/20 text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                System Context // Problem {(currentIndex + 1).toString().padStart(2, '0')}
              </div>
              <div className="p-5 md:p-8 pt-6">
                <div className="flex items-center space-x-3 mb-3">
                  <h2 className="text-xl md:text-2xl font-serif italic text-white leading-none">
                    {activeProblems[currentIndex].title}
                  </h2>
                  <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded font-bold border ${
                    activeProblems[currentIndex].difficulty === 'Beginner' ? 'border-[#10b981]/30 text-[#10b981] bg-[#10b981]/10' :
                    activeProblems[currentIndex].difficulty === 'Intermediate' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' :
                    'border-[#ef4444]/30 text-[#ef4444] bg-[#ef4444]/10'
                  }`}>
                    {activeProblems[currentIndex].difficulty}
                  </span>
                </div>
                <div className="bg-black rounded-lg p-4 font-mono text-sm leading-relaxed border border-[#333333] text-emerald-400/80 overflow-x-auto my-6 selection:bg-purple-900/40">
                  <pre><code>{activeProblems[currentIndex].code}</code></pre>
                </div>
              </div>

              <div className="p-5 md:p-8 bg-black/40 border-t border-[#333333]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {activeProblems[currentIndex].options.map((opt, idx) => {
                    const isCorrectTarget = idx === activeProblems[currentIndex].correctOptionIndex;
                    
                    let btnStateStyle = "bg-[#111111] border-[#333333] hover:border-purple-500 hover:bg-black text-[#e5e5e5]";
                    
                    if (isAnimating) {
                      if (selectedOption === -1) {
                        btnStateStyle = isCorrectTarget 
                          ? "bg-[#10b981]/10 border-[#10b981] text-[#10b981]" 
                          : "bg-black/50 border-[#333333] text-gray-600 opacity-50";
                      } else if (idx === selectedOption) {
                        btnStateStyle = isCorrectTarget 
                          ? "bg-[#10b981]/10 border-[#10b981] text-[#10b981]" 
                          : "bg-[#ef4444]/10 border-[#ef4444] text-[#ef4444]";
                      } else if (isCorrectTarget) {
                        btnStateStyle = "bg-[#10b981]/5 border-[#10b981]/50 text-[#10b981]/70";
                      } else {
                        btnStateStyle = "bg-black/50 border-[#333333] text-gray-600 opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        disabled={!!isAnimating}
                        onClick={() => handleAnswer(idx)}
                        className={`text-left p-3.5 md:p-4 rounded-xl border-2 transition-all flex items-start space-x-3 text-sm md:text-base ${btnStateStyle}`}
                        animate={isAnimating && idx === selectedOption && !isCorrectTarget ? { x: [-5, 5, -5, 5, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isAnimating ? (
                            (selectedOption !== -1 && idx === selectedOption && !isCorrectTarget) ? <XCircle className="w-5 h-5 text-rose-500" /> :
                            isCorrectTarget ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                            <div className="w-5 h-5 rounded-full border-2 border-[#333333] opacity-30" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-[#333333]" />
                          )}
                        </div>
                        <span className="font-mono text-sm">{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                <AnimatePresence>
                  {showHint && !isAnimating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden rounded-lg"
                    >
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed rounded flex items-start space-x-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-500 tracking-widest text-[10px] uppercase block mb-1">System Hint (Score Reduced)</strong> 
                          {activeProblems[currentIndex].hint}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isAnimating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden rounded-lg"
                    >
                      <div className="p-4 bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm leading-relaxed rounded">
                        <strong className="text-purple-300 tracking-widest text-[10px] uppercase block mb-2">System Log // Explanation</strong> 
                        {activeProblems[currentIndex].explanation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 pt-6 border-t border-[#333333] flex justify-between items-center">
                  {isAnimating ? (
                    <button 
                      onClick={handleNext}
                      className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm"
                    >
                      <span>{currentIndex < activeProblems.length - 1 ? 'Next Question' : 'View Results'}</span>
                      <SkipForward className="w-4 h-4" />
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setShowHint(true)} 
                        disabled={showHint || !!isAnimating}
                        className="flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-400 disabled:opacity-30 transition-all font-mono"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>{showHint ? "Hint Evaluated" : "Request Hint"}</span>
                      </button>

                      <button 
                        onClick={handleGiveUp}
                        disabled={!!isAnimating}
                        className="flex items-center space-x-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 disabled:opacity-30 transition-all font-mono"
                      >
                        <span>Proceed / Give Up</span>
                        <SkipForward className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 sm:mt-12 w-full max-w-lg mx-auto"
          >
            <div className="bg-[#111111] border border-[#333333] p-6 sm:p-8 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center space-y-8">
              <div>
                <Award className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-serif italic text-white mb-2">Challenge Complete!</h2>
                <p className="text-gray-400 text-sm sm:text-base">Great job navigating those tricky closures and quirks, {name}.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border border-[#333333] p-4 rounded-lg shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">Final Score</div>
                  <div className="text-3xl sm:text-4xl font-light text-white">{score}</div>
                </div>
                <div className="bg-black border border-[#333333] p-4 rounded-lg shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">Accuracy</div>
                  <div className="text-3xl sm:text-4xl font-light text-[#10b981]">
                    {activeProblems.length > 0 ? Math.round((answers.filter(a => a.isCorrect).length / activeProblems.length) * 100) : 0}%
                  </div>
                </div>
              </div>

              <button
                onClick={viewLeaderboard}
                className="w-full py-4 px-6 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-500/20 uppercase tracking-widest text-sm"
              >
                View Leaderboard
              </button>
            </div>
          </motion.div>
        )}

        {step === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto pb-10"
          >
            <div className="bg-[#111111] border border-[#333333] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[#333333] flex items-center justify-between bg-black/20">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl sm:text-2xl font-serif italic text-white">Top Debuggers</h2>
                </div>
                <button
                  onClick={restart}
                  className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors rounded-full border border-white/10 px-4 py-1.5 hover:bg-white/5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
              
              <div className="divide-y divide-white/5 bg-black/40">
                {leaderboard.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 mono text-sm">No entries yet. Be the first!</div>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <div key={idx} className={`p-4 flex items-center justify-between transition-colors hover:bg-white/5 ${idx === 0 ? 'border-l-2 border-purple-500 bg-purple-500/5' : ''}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`font-mono text-xs w-6 flex justify-center ${
                          idx === 0 ? 'text-purple-400' : 
                          idx === 1 ? 'text-gray-300' :
                          idx === 2 ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div>
                          <div className="font-medium italic font-serif text-sm sm:text-base text-gray-200">{entry.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">{new Date(entry.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[#8b5cf6] text-sm sm:text-base">{entry.score} pts</div>
                        <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{entry.totalTime}s</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
