import { useState } from 'react';
import SurveyHeader from './components/SurveyHeader';
import RespondentForm from './components/RespondentForm';
import QuestionCard from './components/QuestionCard';
import DimensionNav from './components/DimensionNav';
import ProgressBar from './components/ProgressBar';

// Mock survey data - replace with CSV import later
const surveyData = {
  dimensions: [
    {
      id: 1,
      name: 'Code Generation & Accuracy',
      questions: [
        {
          id: 'q1',
          text: 'Code Generation Baseline: How frequently do you or your team use AI to generate code (functions, classes, or modules)?',
          choices: [
            { id: 'A', label: 'A', description: 'Rarely or Never: We primarily write code manually or use traditional snippets/templates.' },
            { id: 'B', label: 'B', description: 'Occasionally: We experiment with AI suggestions but don\'t rely on them regularly.' },
            { id: 'C', label: 'C', description: 'Frequently: AI-generated code is used for many routine tasks or boilerplate sections.' },
            { id: 'D', label: 'D', description: 'Extensively: AI is our primary method for initial code generation across most features.' }
          ]
        },
        {
          id: 'q2',
          text: 'Review Loop & Accuracy: When AI generates a significant block of code, how much manual "fixing" is typically required?',
          choices: [
            { id: 'A', label: 'A', description: 'Heavy Intervention: I rarely use the output as-is; it usually requires significant manual rewriting to make it functional or compliant.' },
            { id: 'B', label: 'B', description: 'Iterative Prompting: The first output is often a "hallucination" or slightly off, requiring 2-3 follow-up prompts to get the desired result.' },
            { id: 'C', label: 'C', description: 'Minor Polishing: The output is 80-90% correct; I usually just need to fix variable names or minor logic to match our project style.' },
            { id: 'D', label: 'D', description: 'Near-Seamless Acceptance: The output is almost always correct and ready for PR after a quick validation, requiring little to no manual code changes.' }
          ]
        },
        {
          id: 'q3',
          text: 'Context Awareness: How well does the AI understand your existing codebase when generating new code?',
          choices: [
            { id: 'A', label: 'A', description: 'Limited Context: AI suggestions often don\'t align with our architecture, naming conventions, or patterns.' },
            { id: 'B', label: 'B', description: 'Basic Understanding: AI catches some patterns but frequently misses project-specific conventions.' },
            { id: 'C', label: 'C', description: 'Good Integration: AI suggestions usually match our coding style and architectural patterns.' },
            { id: 'D', label: 'D', description: 'Excellent Alignment: AI consistently generates code that feels native to our codebase, including edge cases.' }
          ]
        },
        {
          id: 'q4',
          text: 'Complex Logic Handling: How effective is AI at generating complex business logic or algorithms?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Suitable: We avoid using AI for anything beyond simple CRUD operations.' },
            { id: 'B', label: 'B', description: 'Limited Success: AI can handle simple logic but struggles with complex business rules.' },
            { id: 'C', label: 'C', description: 'Moderately Effective: AI can generate complex logic with some guidance and iteration.' },
            { id: 'D', label: 'D', description: 'Highly Capable: AI reliably generates sophisticated algorithms and business logic correctly.' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Testing & Quality Assurance',
      questions: [
        {
          id: 'q5',
          text: 'Test Generation: How extensively do you use AI to generate unit tests, integration tests, or test cases?',
          choices: [
            { id: 'A', label: 'A', description: 'Not at All: We write all tests manually without AI assistance.' },
            { id: 'B', label: 'B', description: 'Experimental: We\'ve tried AI-generated tests but don\'t use them in production.' },
            { id: 'C', label: 'C', description: 'Regular Use: AI generates many of our tests, which we review and refine.' },
            { id: 'D', label: 'D', description: 'Primary Method: AI-generated tests form the foundation of our test suite with minimal manual additions.' }
          ]
        },
        {
          id: 'q6',
          text: 'Test Coverage Quality: How comprehensive and effective are AI-generated tests?',
          choices: [
            { id: 'A', label: 'A', description: 'Poor Coverage: AI tests miss critical edge cases and scenarios.' },
            { id: 'B', label: 'B', description: 'Basic Coverage: AI covers happy paths but requires manual additions for edge cases.' },
            { id: 'C', label: 'C', description: 'Good Coverage: AI generates thorough tests with most edge cases covered.' },
            { id: 'D', label: 'D', description: 'Excellent Coverage: AI-generated tests are comprehensive and catch issues we might have missed.' }
          ]
        },
        {
          id: 'q7',
          text: 'Bug Detection: How effective is AI at identifying and fixing bugs in existing code?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Useful: We don\'t use AI for bug detection or fixing.' },
            { id: 'B', label: 'B', description: 'Occasional Help: AI sometimes spots obvious issues but misses subtle bugs.' },
            { id: 'C', label: 'C', description: 'Valuable Tool: AI regularly identifies bugs and suggests fixes that work with minor adjustments.' },
            { id: 'D', label: 'D', description: 'Critical Asset: AI catches bugs earlier and more reliably than manual reviews alone.' }
          ]
        },
        {
          id: 'q8',
          text: 'Code Review Assistance: How much does AI contribute to your code review process?',
          choices: [
            { id: 'A', label: 'A', description: 'No AI Involvement: Code reviews are entirely manual.' },
            { id: 'B', label: 'B', description: 'Basic Linting: AI provides style and syntax checks only.' },
            { id: 'C', label: 'C', description: 'Substantive Input: AI flags logic issues, security concerns, and suggests improvements.' },
            { id: 'D', label: 'D', description: 'Integrated Partner: AI reviews are a standard part of our process, catching issues before human review.' }
          ]
        },
        {
          id: 'q9',
          text: 'Security Analysis: How does AI help identify security vulnerabilities?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Used: We rely on traditional security scanning tools only.' },
            { id: 'B', label: 'B', description: 'Supplementary: AI provides additional security insights but isn\'t relied upon.' },
            { id: 'C', label: 'C', description: 'Important Layer: AI security analysis is part of our standard workflow.' },
            { id: 'D', label: 'D', description: 'Primary Scanner: AI is our first line of defense for identifying security issues.' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Documentation & Knowledge',
      questions: [
        {
          id: 'q10',
          text: 'Code Documentation: How do you use AI to generate code comments and documentation?',
          choices: [
            { id: 'A', label: 'A', description: 'Manual Only: All documentation is written manually without AI assistance.' },
            { id: 'B', label: 'B', description: 'Basic Summaries: AI generates simple function descriptions that we heavily edit.' },
            { id: 'C', label: 'C', description: 'Standard Practice: AI generates comprehensive documentation that needs minor refinement.' },
            { id: 'D', label: 'D', description: 'Automated Pipeline: AI documentation is generated automatically and rarely requires changes.' }
          ]
        },
        {
          id: 'q11',
          text: 'Knowledge Base Creation: How does AI help with creating or maintaining technical documentation?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Applicable: We don\'t use AI for documentation beyond code comments.' },
            { id: 'B', label: 'B', description: 'Draft Generation: AI creates initial drafts that we substantially rewrite.' },
            { id: 'C', label: 'C', description: 'Collaborative Tool: AI-generated docs form a solid foundation with some editing.' },
            { id: 'D', label: 'D', description: 'Primary Author: AI generates comprehensive documentation that\'s production-ready.' }
          ]
        },
        {
          id: 'q12',
          text: 'Code Explanation: How effectively can AI explain complex code to team members?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Used: Team members explain code to each other directly.' },
            { id: 'B', label: 'B', description: 'Basic Help: AI provides surface-level explanations that miss important details.' },
            { id: 'C', label: 'C', description: 'Helpful Resource: AI explanations are accurate and help team members understand code.' },
            { id: 'D', label: 'D', description: 'Expert Tutor: AI provides insightful explanations that enhance team understanding significantly.' }
          ]
        },
        {
          id: 'q13',
          text: 'API Documentation: How does AI assist in generating and maintaining API documentation?',
          choices: [
            { id: 'A', label: 'A', description: 'Manual Process: All API docs are written and maintained manually.' },
            { id: 'B', label: 'B', description: 'Template Generation: AI creates basic API doc templates we fill in.' },
            { id: 'C', label: 'C', description: 'Automated Generation: AI generates comprehensive API docs from code with minor edits.' },
            { id: 'D', label: 'D', description: 'Fully Integrated: API documentation is automatically generated and synced with code changes.' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Workflow & Productivity',
      questions: [
        {
          id: 'q14',
          text: 'Development Speed: How has AI affected your overall development velocity?',
          choices: [
            { id: 'A', label: 'A', description: 'No Impact: Development speed remains unchanged with AI tools.' },
            { id: 'B', label: 'B', description: 'Marginal Improvement: Slight speed increase (5-15%) in specific tasks only.' },
            { id: 'C', label: 'C', description: 'Significant Boost: 20-40% faster development across most features.' },
            { id: 'D', label: 'D', description: 'Transformative: 50%+ productivity gain, fundamentally changed our development process.' }
          ]
        },
        {
          id: 'q15',
          text: 'Learning Curve: How easy was it for your team to adopt AI coding tools?',
          choices: [
            { id: 'A', label: 'A', description: 'Very Difficult: Significant training and adjustment period required.' },
            { id: 'B', label: 'B', description: 'Moderate Challenge: Took several weeks for team to become comfortable.' },
            { id: 'C', label: 'C', description: 'Relatively Easy: Most team members were productive within days.' },
            { id: 'D', label: 'D', description: 'Seamless: Team adapted immediately with minimal friction.' }
          ]
        },
        {
          id: 'q16',
          text: 'Refactoring Support: How does AI help with code refactoring and modernization?',
          choices: [
            { id: 'A', label: 'A', description: 'Not Reliable: We avoid using AI for refactoring due to consistency concerns.' },
            { id: 'B', label: 'B', description: 'Limited Help: AI can handle simple refactoring but not architectural changes.' },
            { id: 'C', label: 'C', description: 'Effective Tool: AI successfully handles most refactoring tasks with guidance.' },
            { id: 'D', label: 'D', description: 'Powerful Accelerator: AI executes complex refactoring across entire codebases reliably.' }
          ]
        },
        {
          id: 'q17',
          text: 'Cross-Language Support: How well does AI handle multiple programming languages in your stack?',
          choices: [
            { id: 'A', label: 'A', description: 'Single Language Focus: AI only works well with our primary language.' },
            { id: 'B', label: 'B', description: 'Variable Quality: AI performance varies significantly across languages.' },
            { id: 'C', label: 'C', description: 'Consistent Support: AI handles all our languages reasonably well.' },
            { id: 'D', label: 'D', description: 'Polyglot Expert: AI excels across all languages and frameworks we use.' }
          ]
        },
        {
          id: 'q18',
          text: 'Team Collaboration: How has AI impacted collaboration and knowledge sharing?',
          choices: [
            { id: 'A', label: 'A', description: 'Negative Impact: AI has created inconsistency or reduced knowledge sharing.' },
            { id: 'B', label: 'B', description: 'Neutral: No significant change in collaboration patterns.' },
            { id: 'C', label: 'C', description: 'Positive Effect: AI helps standardize practices and share knowledge more effectively.' },
            { id: 'D', label: 'D', description: 'Transformative: AI has fundamentally improved how our team collaborates and learns.' }
          ]
        },
        {
          id: 'q19',
          text: 'Future Outlook: What are your expectations for AI in development over the next year?',
          choices: [
            { id: 'A', label: 'A', description: 'Skeptical: We don\'t expect AI to significantly change our workflow.' },
            { id: 'B', label: 'B', description: 'Cautiously Optimistic: We\'ll continue experimenting but with limited expectations.' },
            { id: 'C', label: 'C', description: 'Confident: We plan to expand AI usage into more areas of development.' },
            { id: 'D', label: 'D', description: 'Fully Committed: AI will be central to our development strategy going forward.' }
          ]
        }
      ]
    }
  ]
};

export default function App() {
  const [step, setStep] = useState<'info' | 'survey' | 'complete'>('info');
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Flatten all questions for easy navigation
  const allQuestions = surveyData.dimensions.flatMap((dim) =>
    dim.questions.map((q) => ({ ...q, dimensionId: dim.id, dimensionName: dim.name }))
  );

  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentDimensionId = currentQuestion?.dimensionId || 1;

  // Calculate dimension progress
  const dimensionsWithProgress = surveyData.dimensions.map((dim) => {
    const dimQuestions = allQuestions.filter((q) => q.dimensionId === dim.id);
    const completed = dimQuestions.filter((q) => answers[q.id]).length;
    return {
      id: dim.id,
      name: dim.name,
      questionCount: dimQuestions.length,
      completed
    };
  });

  const handleStartSurvey = () => {
    if (name.trim() && projectName.trim()) {
      setStep('survey');
    }
  };

  const handleSelectChoice = (choiceId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: choiceId });
  };


  // Send answers to backend when survey is completed
  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit answers to backend
      try {
        // Prepare payload with name, project_name, and q1-q19 as top-level fields
        const payload = {
          name: name,
          project_name: projectName,
          ...answers
        };
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
      <>
        <SurveyHeader />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[3rem] leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Assessment Complete
              </h2>
              <p className="text-muted-foreground text-lg">
                Thank you, {name}. Your responses for {projectName} have been recorded.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Respondent</div>
                  <div className="text-foreground">{name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Project</div>
                  <div className="text-foreground">{projectName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Questions Answered</div>
                  <div className="text-foreground">{answeredCount} of {totalQuestions}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
                  <div className="text-foreground">{Math.round((answeredCount / totalQuestions) * 100)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SurveyHeader />
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border bg-card p-6">
          <div className="mb-8">
            <div className="text-xs text-muted-foreground mb-2">Respondent</div>
            <div className="text-sm mb-1">{name}</div>
            <div className="text-xs text-muted-foreground">{projectName}</div>
          </div>

          <div className="mb-8">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          <DimensionNav dimensions={dimensionsWithProgress} currentDimension={currentDimensionId} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 px-12 py-10 max-w-4xl">
            {currentQuestion && (
              <QuestionCard
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                question={currentQuestion.text}
                choices={currentQuestion.choices}
                selectedChoice={answers[currentQuestion.id] || null}
                onSelectChoice={handleSelectChoice}
                dimensionName={currentQuestion.dimensionName}
              />
            )}
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-border bg-card px-12 py-6">
            <div className="max-w-4xl flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 text-foreground hover:bg-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>

              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Complete Survey' : 'Next →'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}