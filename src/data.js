export const initialState = {
  authStep: 'email',
  email: '',
  code: '',
  user: null,
  selectedRole: 'student',
  subscriptionActive: false,
  progress: {
    l1: { watched: true, passed: true, score: 100 },
    l2: { watched: true, passed: false, score: 50 }
  }
}

export const roles = [
  { id: 'student', label: 'Ученик' },
  { id: 'teacher', label: 'Преподаватель' },
  { id: 'admin', label: 'Администратор' }
]

export const courses = [
  {
    id: 'c1',
    title: 'Английский для начинающих',
    teacher: 'Анна Романова',
    category: 'Языки',
    duration: '8 недель',
    price: '990 ₽ / мес',
    lessonsCount: 6,
    modules: [
      {
        id: 'm1',
        title: 'База: приветствие и знакомство',
        lessons: [
          {
            id: 'l1',
            title: 'Как представиться на английском',
            videoDuration: '08:40',
            test: {
              id: 't1',
              passScore: 70,
              questions: [
                {
                  id: 'q1',
                  text: 'Как по-английски сказать «Меня зовут Анна»?',
                  options: ['I call Anna', 'My name is Anna', 'Me is Anna'],
                  correctIndex: 1
                },
                {
                  id: 'q2',
                  text: 'Какое приветствие универсально?',
                  options: ['Goodbye', 'Hello', 'Yesterday'],
                  correctIndex: 1
                }
              ]
            }
          },
          {
            id: 'l2',
            title: 'Простые фразы для первого диалога',
            videoDuration: '11:20',
            test: {
              id: 't2',
              passScore: 70,
              questions: [
                {
                  id: 'q3',
                  text: 'Что означает “Nice to meet you”?',
                  options: ['Приятно познакомиться', 'Как пройти в библиотеку', 'Я не понимаю'],
                  correctIndex: 0
                },
                {
                  id: 'q4',
                  text: 'Как ответить на “How are you?”',
                  options: ['I am fine', 'Blue table', 'Yesterday cat'],
                  correctIndex: 0
                }
              ]
            }
          }
        ]
      },
      {
        id: 'm2',
        title: 'Повседневный разговор',
        lessons: [
          {
            id: 'l3',
            title: 'Диалог в кафе',
            videoDuration: '12:05',
            test: {
              id: 't3',
              passScore: 70,
              questions: [
                {
                  id: 'q5',
                  text: 'Как попросить кофе?',
                  options: ['I would like a coffee', 'Coffee no', 'I am coffee'],
                  correctIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Быстрый старт в дизайне',
    teacher: 'Илья Морозов',
    category: 'Дизайн',
    duration: '6 недель',
    price: '1490 ₽ / мес',
    lessonsCount: 4,
    modules: [
      {
        id: 'm3',
        title: 'Визуальная база',
        lessons: [
          {
            id: 'l4',
            title: 'Композиция без боли',
            videoDuration: '15:45',
            test: {
              id: 't4',
              passScore: 70,
              questions: [
                {
                  id: 'q6',
                  text: 'Что помогает выстраивать иерархию?',
                  options: ['Размер и контраст', 'Случайность', 'Хаос'],
                  correctIndex: 0
                }
              ]
            }
          }
        ]
      }
    ]
  }
]
