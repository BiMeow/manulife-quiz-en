/**
 * Quiz structure only. All translatable content (content, from, question, answers,
 * title, subtitle, description, subDescription) is in messages/vi.json and messages/en.json
 * under the "quiz" namespace. Use useTranslations() and keys like:
 * - quiz.stages.{stageIndex}.content, quiz.stages.{stageIndex}.from
 * - quiz.stages.{stageIndex}.questions.{questionIndex}.question
 * - quiz.stages.{stageIndex}.questions.{questionIndex}.answers.{answerIndex}
 * - quiz.results.{resultIndex}.title, .subtitle, .description, .subDescription
 */

export interface QuizAnswer {
  idAnswer: string;
  value: number;
}

export interface QuizQuestion {
  idQuestion: number;
  answers: QuizAnswer[];
}

export interface QuizStage {
  idStage: number;
  className: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  idResult: number;
  image: string;
  imageDeco: string;
  bgColor: string;
  isGood: boolean;
}

export const listStages: QuizStage[] = [
  {
    idStage: 1,
    className: "absolute bottom-[10%] left-[16%] z-3 w-[40%]",
    questions: [
      {
        idQuestion: 1,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
      {
        idQuestion: 2,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
    ],
  },
  {
    idStage: 2,
    className: "absolute bottom-[32%] left-[44%] z-3 w-[40%]",
    questions: [
      {
        idQuestion: 3,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
      {
        idQuestion: 4,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
    ],
  },
  {
    idStage: 3,
    className: "absolute bottom-[48%] left-[16%] z-3 w-[40%]",
    questions: [
      {
        idQuestion: 5,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
      {
        idQuestion: 6,
        answers: [
          { idAnswer: "A.", value: 1 },
          { idAnswer: "B.", value: 2 },
          { idAnswer: "C.", value: 3 },
        ],
      },
    ],
  },
];

export const listResults: QuizResult[] = [
  {
    idResult: 1,
    image: "/images/home/quiz-result-1.png",
    imageDeco: "/images/home/quiz-result-1-deco.png",
    bgColor: "#00a758",
    isGood: true,
  },
  {
    idResult: 2,
    image: "/images/home/quiz-result-2.png",
    imageDeco: "/images/home/quiz-result-2-deco.png",
    bgColor: "#0a19ff",
    isGood: false,
  },
  {
    idResult: 3,
    image: "/images/home/quiz-result-3.png",
    imageDeco: "/images/home/quiz-result-3-deco.png",
    bgColor: "#6d4eb6",
    isGood: false,
  },
];
