import { useState, useEffect } from 'react';
import { fetchQuestionsCSV, groupQuestionsByDimension } from './csvUtils';
import SurveyHeader from './components/SurveyHeader';
import RespondentForm from './components/RespondentForm';
import QuestionCard from './components/QuestionCard';
import DimensionNav from './components/DimensionNav';
import ProgressBar from './components/ProgressBar';




export default function App() {
  const [step, setStep] = useState<'info' | 'survey' | 'complete'>('info');
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { answer: string; score: number }>>({});
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  // Load questions from CSV on mount
  useEffect(() => {
    fetchQuestionsCSV().then(rows => {
      const dims = groupQuestionsByDimension(rows);
      setDimensions(dims);
      setAllQuestions(dims.flatMap(dim => dim.questions.map((q: any) => ({ ...q, dimensionId: dim.id, dimensionName: dim.name }))));
    });
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle choices for all questions when survey starts, but keep labels in order
  const handleStartSurvey = () => {
    if (name.trim() && projectName.trim() && dimensions.length > 0) {
      const labelOrder = ['A', 'B', 'C', 'D'];
      const shuffled = dimensions.flatMap((dim: any) =>
        dim.questions.map((q: any) => {
          const shuffledChoices = shuffleArray(q.choices);
          const relabeledChoices = shuffledChoices.map((choice: any, idx: number) => ({
            ...(choice as any),
            label: labelOrder[idx],
            id: labelOrder[idx],
          }));
          return {
            ...q,
            choices: relabeledChoices,
            dimensionId: dim.id,
            dimensionName: dim.name,
          };
        })
      );
      setShuffledQuestions(shuffled);
      setStep('survey');
    }
  };

  const questionsToUse = shuffledQuestions.length > 0 ? shuffledQuestions : allQuestions;
  const totalQuestions = questionsToUse.length;
  const currentQuestion = questionsToUse[currentQuestionIndex];
  const currentDimensionId = currentQuestion?.dimensionId || 1;

  // Calculate dimension progress
  const dimensionsWithProgress = dimensions.map((dim: any) => {
    const dimQuestions = questionsToUse.filter((q: any) => q.dimensionId === dim.id);
    const completed = dimQuestions.filter((q: any) => answers[q.id]).length;
    return {
      id: dim.id,
      name: dim.name,
      questionCount: dimQuestions.length,
      completed
    };

  });

  const handleSelectChoice = (choiceId: string) => {
    const selectedChoice = currentQuestion.choices.find((c: { id: string; score: number }) => c.id === choiceId);
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        answer: choiceId,
        score: selectedChoice ? selectedChoice.score : 0,
      },
    });
  };


  // Send answers to backend when survey is completed
  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Prepare payload with name, project_name, and q1_answer/q1_score ...
      const payload: Record<string, any> = {
        name: name,
        project_name: projectName,
      };
      for (let i = 1; i <= 19; i++) {
        const qid = `q${i}`;
        if (answers[qid]) {
          payload[`${qid}_answer`] = answers[qid].answer;
          payload[`${qid}_score`] = answers[qid].score;
        } else {
          payload[`${qid}_answer`] = null;
          payload[`${qid}_score`] = null;
        }
      }
      try {
        await fetch('http://localhost:8000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        // Optionally handle error (e.g., show notification)
        // console.error('Failed to submit survey:', e);
      }
      setStep('complete');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const canProceed = answers[currentQuestion?.id];

  if (step === 'info') {
    return (
      <>
        <SurveyHeader />
        <RespondentForm
          name={name}
          projectName={projectName}
          onNameChange={setName}
          onProjectChange={setProjectName}
          onSubmit={handleStartSurvey}
        />
      </>
    );
  }

  if (step === 'complete') {
    return (
      <div className="w-full flex justify-center bg-background px-2 mt-10">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl leading-tight mb-3 font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Assessment Complete
            </h2>
            <p className="text-muted-foreground text-base">
              Thank you, {name}. Your responses for {projectName} have been recorded.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Respondent</div>
                <div className="text-sm text-foreground">{name}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Project</div>
                <div className="text-sm text-foreground">{projectName}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Questions Answered</div>
                <div className="text-sm text-foreground">{answeredCount} of {totalQuestions}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Completion Rate</div>
                <div className="text-sm text-foreground">{Math.round((answeredCount / totalQuestions) * 100)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SurveyHeader />
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border bg-card p-3 text-[11px]">
          <div className="mb-3">
            <div className="text-[10px] text-muted-foreground mb-1">Respondent</div>
            <div className="text-xs mb-1 truncate">{name}</div>
            <div className="text-[10px] text-muted-foreground truncate">{projectName}</div>
          </div>

          <div className="mb-3">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          <DimensionNav dimensions={dimensionsWithProgress} currentDimension={currentDimensionId}/>
        </aside>

        {/* Main Content - full width, no right empty space */}
        <main className="flex-1 flex flex-col min-h-[calc(100vh-120px)] px-4 md:px-12">
          <div className="flex-1 flex flex-col justify-start items-stretch px-0 pt-2 pb-0 w-full">
            {currentQuestion && (
              <div className="w-full h-full flex flex-col items-stretch justify-start">
                <QuestionCard
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                  question={currentQuestion.text}
                  choices={currentQuestion.choices}
                  selectedChoice={answers[currentQuestion.id]?.answer || null}
                  onSelectChoice={handleSelectChoice}
                  dimensionName={currentQuestion.dimensionName}
                />
                {/* Navigation below question/choices, full width */}
                <div className="flex items-center justify-between w-full mt-6 px-2 md:px-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-2 py-1 text-[11px] text-foreground hover:bg-secondary rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    ← Previous
                  </button>
                  <div className="text-[11px] text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="px-2 py-1 text-[11px] bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Complete Survey' : 'Next →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}