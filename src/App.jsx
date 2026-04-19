import { useMemo, useState } from 'react'
import { courses, initialState, roles } from './data'

function Header({ user, role, onRoleChange, onLogout }) {
  return (
    <div className="topbar">
      <div>
        <div className="eyebrow">mobile-first MVP</div>
        <h1>AMTEC School</h1>
      </div>
      <div className="row gap wrap-end">
        {user && (
          <>
            <select className="input small-select" value={role} onChange={(e) => onRoleChange(e.target.value)}>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
            <button className="ghost-btn" onClick={onLogout}>Выйти</button>
          </>
        )}
      </div>
    </div>
  )
}

function AuthScreen({ email, code, authStep, setEmail, setCode, onSendCode, onLogin }) {
  return (
    <div className="auth-shell">
      <div className="phone">
        <div className="hero-card">
          <div className="badge">Mini app / web app</div>
          <h2>Онлайн-школа, которая выглядит уже как продукт</h2>
          <p>Вход по email и одноразовому коду, подписка, курсы, уроки, тесты и кабинеты для всех ролей.</p>
        </div>

        <div className="card">
          <h3>Вход</h3>
          <p className="muted">Без паролей. Просто email и код.</p>
          <label className="label">Email</label>
          <input className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {authStep === 'code' && (
            <>
              <label className="label">Одноразовый код</label>
              <input className="input" placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} />
            </>
          )}
          {authStep === 'email'
            ? <button className="primary-btn" onClick={onSendCode}>Получить код</button>
            : <button className="primary-btn" onClick={onLogin}>Войти</button>}
          <div className="hint">Демо-код: <b>123456</b></div>
        </div>

        <div className="stats-grid">
          <div className="mini-card"><span>72%</span><small>среднее досматривание</small></div>
          <div className="mini-card"><span>84%</span><small>успешных тестов</small></div>
          <div className="mini-card"><span>12</span><small>активных курсов</small></div>
        </div>
      </div>
    </div>
  )
}

function SubscriptionGate({ onActivate }) {
  return (
    <div className="page">
      <div className="card premium">
        <div className="badge">Подписка</div>
        <h2>Открой полный доступ к курсам</h2>
        <p className="muted">Сюда потом можно подключить ЮKassa или Robokassa.</p>
        <div className="price-box">
          <div>
            <div className="price">990 ₽ <span>/ месяц</span></div>
            <div className="muted">Доступ ко всем урокам, тестам и прогрессу</div>
          </div>
          <button className="primary-btn" onClick={onActivate}>Активировать подписку</button>
        </div>
        <div className="feature-list">
          <div className="feature-item">Видеоуроки по модулям</div>
          <div className="feature-item">Тест после каждого урока</div>
          <div className="feature-item">Пересдача без ограничений</div>
          <div className="feature-item">Прогресс и возврат в обучение</div>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  )
}

function StudentView({ progress, setProgress }) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])
  const [selectedLesson, setSelectedLesson] = useState(courses[0].modules[0].lessons[0])
  const [answers, setAnswers] = useState({})
  const [attemptResult, setAttemptResult] = useState(null)

  const totalLessons = useMemo(() => selectedCourse.modules.flatMap((m) => m.lessons).length, [selectedCourse])
  const passedLessons = useMemo(() => {
    const ids = selectedCourse.modules.flatMap((m) => m.lessons.map((l) => l.id))
    return ids.filter((id) => progress[id]?.passed).length
  }, [selectedCourse, progress])
  const coursePercent = Math.round((passedLessons / totalLessons) * 100)

  const submitTest = () => {
    const questions = selectedLesson.test.questions
    let correct = 0
    questions.forEach((q) => {
      if (Number(answers[q.id]) === q.correctIndex) correct += 1
    })
    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= selectedLesson.test.passScore
    setProgress((prev) => ({ ...prev, [selectedLesson.id]: { watched: true, passed, score } }))
    setAttemptResult({ score, passed })
  }

  const resetTest = () => {
    setAnswers({})
    setAttemptResult(null)
  }

  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <div className="row between">
            <div>
              <div className="badge soft">Ученик</div>
              <h2>Мой прогресс</h2>
            </div>
            <div className="right-metric">
              <strong>{coursePercent}%</strong>
              <small>по курсу</small>
            </div>
          </div>
          <ProgressBar value={coursePercent} />
          <div className="stats-grid">
            <div className="mini-card"><span>{passedLessons}/{totalLessons}</span><small>уроков пройдено</small></div>
            <div className="mini-card"><span>2</span><small>активных курса</small></div>
            <div className="mini-card"><span>1</span><small>подписка активна</small></div>
          </div>
        </div>

        <div className="section-title">Курсы</div>
        <div className="course-grid">
          {courses.map((course) => (
            <button key={course.id} className={`course-card ${selectedCourse.id === course.id ? 'course-card-active' : ''}`} onClick={() => {
              setSelectedCourse(course)
              setSelectedLesson(course.modules[0].lessons[0])
              setAnswers({})
              setAttemptResult(null)
            }}>
              <div className="badge">{course.category}</div>
              <h3>{course.title}</h3>
              <p>{course.teacher}</p>
              <div className="course-meta">
                <span>{course.duration}</span>
                <span>{course.lessonsCount} уроков</span>
              </div>
            </button>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <div className="row between">
              <h3>Структура курса</h3>
              <span className="muted">{selectedCourse.title}</span>
            </div>
            {selectedCourse.modules.map((module) => (
              <div key={module.id} className="module-box">
                <div className="module-title">{module.title}</div>
                <div className="lesson-list">
                  {module.lessons.map((lesson) => {
                    const lessonProgress = progress[lesson.id]
                    return (
                      <button key={lesson.id} className={`lesson-item ${selectedLesson.id === lesson.id ? 'lesson-item-active' : ''}`} onClick={() => {
                        setSelectedLesson(lesson)
                        setAnswers({})
                        setAttemptResult(null)
                      }}>
                        <div>
                          <div className="lesson-title">{lesson.title}</div>
                          <div className="muted">{lesson.videoDuration}</div>
                        </div>
                        <div className={`pill ${lessonProgress?.passed ? 'pill-success' : 'pill-default'}`}>
                          {lessonProgress?.passed ? `Пройден (${lessonProgress.score}%)` : 'Не завершён'}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="badge soft">Урок + тест</div>
            <h3>{selectedLesson.title}</h3>
            <div className="video-placeholder">
              <div className="play-circle">▶</div>
              <div>
                <strong>Видеоурок</strong>
                <div className="muted">Длительность: {selectedLesson.videoDuration}</div>
              </div>
            </div>

            <div className="test-box">
              <h4>Проверка после урока</h4>
              <p className="muted">Урок считается пройденным только после успешного теста.</p>

              {selectedLesson.test.questions.map((q, idx) => (
                <div key={q.id} className="question-box">
                  <div className="question-title">{idx + 1}. {q.text}</div>
                  <div className="options">
                    {q.options.map((option, optionIndex) => (
                      <label key={option} className="option">
                        <input type="radio" name={q.id} checked={String(answers[q.id]) === String(optionIndex)} onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }))} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="row gap">
                <button className="primary-btn" onClick={submitTest}>Проверить тест</button>
                <button className="ghost-btn" onClick={resetTest}>Сбросить</button>
              </div>

              {attemptResult && (
                <div className={`result-box ${attemptResult.passed ? 'result-success' : 'result-fail'}`}>
                  <strong>{attemptResult.passed ? 'Тест пройден' : 'Тест не пройден'}</strong>
                  <div>Результат: {attemptResult.score}%</div>
                  {!attemptResult.passed && <div className="muted">Можно пересдать.</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeacherView() {
  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <div className="row between">
            <div>
              <div className="badge soft">Преподаватель</div>
              <h2>Мои курсы</h2>
            </div>
            <button className="primary-btn">+ Создать курс</button>
          </div>
          <p className="muted">Курсы, модули, уроки и тесты.</p>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="badge">{course.category}</div>
              <h3>{course.title}</h3>
              <p>{course.teacher}</p>
              <div className="course-meta">
                <span>{course.modules.length} модулей</span>
                <span>{course.lessonsCount} уроков</span>
              </div>
              <div className="row gap top-gap">
                <button className="ghost-btn">Редактировать</button>
                <button className="ghost-btn">Добавить урок</button>
              </div>
            </div>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <h3>Конструктор курса</h3>
            <div className="form-grid">
              <input className="input" placeholder="Название курса" />
              <input className="input" placeholder="Категория" />
              <input className="input" placeholder="Название модуля" />
              <input className="input" placeholder="Название урока" />
              <textarea className="input textarea" placeholder="Описание урока" />
              <button className="primary-btn">Сохранить черновик</button>
            </div>
          </div>
          <div className="card">
            <h3>Конструктор теста</h3>
            <div className="question-box">
              <div className="question-title">Вопрос</div>
              <input className="input" placeholder="Введите текст вопроса" />
            </div>
            <div className="form-grid">
              <input className="input" placeholder="Вариант 1" />
              <input className="input" placeholder="Вариант 2" />
              <input className="input" placeholder="Вариант 3" />
              <input className="input" placeholder="Правильный ответ" />
            </div>
            <div className="row gap top-gap">
              <button className="primary-btn">Добавить вопрос</button>
              <button className="ghost-btn">Сохранить тест</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminView() {
  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <div className="badge soft">Администратор</div>
          <h2>Панель управления школой</h2>
          <p className="muted">Метрики, преподаватели, реактивация и уведомления.</p>
        </div>

        <div className="stats-grid stats-grid-large">
          <div className="mini-card"><span>1 248</span><small>учеников</small></div>
          <div className="mini-card"><span>37</span><small>преподавателей</small></div>
          <div className="mini-card"><span>82%</span><small>удержание</small></div>
          <div className="mini-card"><span>396 000 ₽</span><small>MRR</small></div>
        </div>

        <div className="two-col">
          <div className="card">
            <h3>Управление преподавателями</h3>
            <div className="list">
              <div className="list-item"><strong>Анна Романова</strong><span>3 курса</span></div>
              <div className="list-item"><strong>Илья Морозов</strong><span>2 курса</span></div>
              <div className="list-item"><strong>Мария Волкова</strong><span>1 курс</span></div>
            </div>
            <button className="primary-btn top-gap">Добавить преподавателя</button>
          </div>

          <div className="card">
            <h3>Уведомления и реактивация</h3>
            <div className="feature-list">
              <div className="feature-item">Письмо тем, кто не заходил 7 дней</div>
              <div className="feature-item">Напоминание о новом уроке</div>
              <div className="feature-item">Дожим оплаты после пробного доступа</div>
            </div>
            <div className="row gap top-gap">
              <button className="primary-btn">Запустить кампанию</button>
              <button className="ghost-btn">Настроить шаблоны</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [state, setState] = useState(initialState)

  const setProgress = (updater) => {
    setState((prev) => ({
      ...prev,
      progress: typeof updater === 'function' ? updater(prev.progress) : updater
    }))
  }

  const onSendCode = () => {
    if (!state.email.trim()) return
    setState((prev) => ({ ...prev, authStep: 'code' }))
  }

  const onLogin = () => {
    if (state.code !== '123456') return
    setState((prev) => ({
      ...prev,
      user: { email: prev.email || 'demo@school.app' },
      selectedRole: 'student'
    }))
  }

  const onLogout = () => setState({ ...initialState })

  return (
    <div className="app-shell">
      <Header user={state.user} role={state.selectedRole} onRoleChange={(role) => setState((prev) => ({ ...prev, selectedRole: role }))} onLogout={onLogout} />

      {!state.user ? (
        <AuthScreen
          email={state.email}
          code={state.code}
          authStep={state.authStep}
          setEmail={(email) => setState((prev) => ({ ...prev, email }))}
          setCode={(code) => setState((prev) => ({ ...prev, code }))}
          onSendCode={onSendCode}
          onLogin={onLogin}
        />
      ) : !state.subscriptionActive ? (
        <SubscriptionGate onActivate={() => setState((prev) => ({ ...prev, subscriptionActive: true }))} />
      ) : state.selectedRole === 'student' ? (
        <StudentView progress={state.progress} setProgress={setProgress} />
      ) : state.selectedRole === 'teacher' ? (
        <TeacherView />
      ) : (
        <AdminView />
      )}
    </div>
  )
}
