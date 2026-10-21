import { useMemo, useState } from "react"

type IconName = "home" | "book" | "calendar" | "chart" | "message" | "settings" | "search" | "bell" | "arrow" | "clock" | "check" | "play" | "plus"

const iconPaths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v17H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15a1.7 1.7 0 0 0-1.55-1H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63a1.7 1.7 0 0 0 1-1.55V3h4v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9a1.7 1.7 0 0 0 1.55 1H21v4h-.08a1.7 1.7 0 0 0-1.52 1Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m9 7 8 5-8 5z" />,
  plus: <path d="M12 5v14M5 12h14" />,
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

const navigation: { label: string; icon: IconName }[] = [
  { label: "Inicio", icon: "home" },
  { label: "Mis cursos", icon: "book" },
  { label: "Calendario", icon: "calendar" },
  { label: "Calificaciones", icon: "chart" },
  { label: "Mensajes", icon: "message" },
]

const courses = [
  {
    title: "Matemática avanzada",
    teacher: "Prof. Carlos Vega",
    progress: 74,
    tone: "blue",
    mark: "MA",
    next: "Álgebra lineal",
  },
  {
    title: "Ciencias naturales",
    teacher: "Prof. Ana Torres",
    progress: 62,
    tone: "green",
    mark: "CN",
    next: "Ecosistemas",
  },
  {
    title: "Lengua y literatura",
    teacher: "Prof. Laura Méndez",
    progress: 86,
    tone: "violet",
    mark: "LL",
    next: "Narrativa contemporánea",
  },
]

const schedule = [
  {
    time: "08:00",
    title: "Matemática avanzada",
    detail: "Aula virtual 03",
    tone: "blue",
  },
  {
    time: "10:15",
    title: "Ciencias naturales",
    detail: "Laboratorio virtual",
    tone: "green",
  },
  {
    time: "12:00",
    title: "Lengua y literatura",
    detail: "Aula virtual 08",
    tone: "violet",
  },
]

export default function App() {
  const [active, setActive] = useState("Inicio")
  const [query, setQuery] = useState("")
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [toast, setToast] = useState("")

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand" aria-label="Colegio Vision">
          <span className="brand-mark">
            <span>V</span>
          </span>
          <span className="brand-copy">
            <strong>Vision</strong>
            <small>Colegio Particular</small>
          </span>
        </div>

        <nav className="main-nav" aria-label="Navegación principal">
          <span className="nav-eyebrow">MENÚ PRINCIPAL</span>
          {navigation.map((item) => (
            <button
              className={`nav-item ${active === item.label ? "active" : ""}`}
              key={item.label}
              onClick={() => setActive(item.label)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.label === "Mensajes" && (
                <span className="nav-badge">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="vision-card">
          <span className="vision-card-orbit" />
          <small>VISIÓN 2025</small>
          <strong>Aprende sin límites</strong>
          <p>Todo tu potencial, en un solo lugar.</p>
        </div>
        <button
          className="nav-item settings"
          onClick={() => setActive("Configuración")}
        >
          <Icon name="settings" />
          <span>Configuración</span>
        </button>
        <div className="sidebar-profile">
          <div className="avatar">
            SM
            <span className="online-dot" />
          </div>
          <span>
            <strong>Sofía Martínez</strong>
            <small>4to Secundaria · A</small>
          </span>
          <button aria-label="Opciones de perfil">•••</button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">
              <span>V</span>
            </span>
            <strong>Vision</strong>
          </div>
          <label className="search">
            <Icon name="search" size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar cursos, tareas o recursos..."
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="top-actions">
            <button
              className="icon-button"
              aria-label="Notificaciones"
              onClick={() => setNoticeOpen((value) => !value)}
            >
              <Icon name="bell" />
              <span />
            </button>
            <div className="date-block">
              <small>HOY</small>
              <strong>24 de junio, 2025</strong>
            </div>
          </div>
          {noticeOpen && (
            <div className="notification-panel">
              <div>
                <strong>Notificaciones</strong>
                <span>2 nuevas</span>
              </div>
              <p>
                <b>Trabajo calificado</b>Obtuviste 18/20 en Ciencias.
              </p>
              <p>
                <b>Recordatorio</b>Tu clase de Matemática inicia en 20 min.
              </p>
            </div>
          )}
        </header>

        <div className="content">
          {active === "Inicio" ? (
            <>
              <section className="welcome-row reveal">
                <div>
                  <span className="eyebrow">MARTES, 24 DE JUNIO</span>
                  <h1>
                    Buenos días, Sofía <span>✦</span>
                  </h1>
                  <p>
                    Hoy es un buen día para seguir avanzando. Tienes{" "}
                    <strong>3 clases</strong> programadas.
                  </p>
                </div>
                <button
                  className="outline-button"
                  onClick={() => setActive("Calendario")}
                >
                  Ver calendario <Icon name="arrow" size={17} />
                </button>
              </section>

              <section className="hero-card reveal delay-1">
                <div
                  className="hero-image"
                  role="img"
                  aria-label="Estudiante desarrollando sus actividades académicas"
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="live-label">
                    <i /> PRÓXIMA CLASE · 08:00
                  </span>
                  <h2>
                    Matemática
                    <br />
                    avanzada
                  </h2>
                  <p>Álgebra lineal · Prof. Carlos Vega</p>
                  <button
                    className="primary-button"
                    onClick={() =>
                      notify("Ingresando al aula de Matemática...")
                    }
                  >
                    Ingresar al aula <Icon name="arrow" size={18} />
                  </button>
                </div>
                <div className="hero-status">
                  <Icon name="clock" size={17} />
                  <span>Empieza en</span>
                  <strong>18 min</strong>
                </div>
              </section>

              <section className="dashboard-grid">
                <div className="courses-panel reveal delay-2">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">TU APRENDIZAJE</span>
                      <h2>Continúa aprendiendo</h2>
                    </div>
                    <button onClick={() => setActive("Mis cursos")}>
                      Ver todos <Icon name="arrow" size={16} />
                    </button>
                  </div>
                  <div className="course-list">
                    {filteredCourses.map((course) => (
                      <button
                        className="course-card"
                        key={course.title}
                        onClick={() => notify(`Abriendo ${course.title}`)}
                      >
                        <span className={`course-icon ${course.tone}`}>
                          {course.mark}
                        </span>
                        <span className="course-info">
                          <span className="course-meta">{course.next}</span>
                          <strong>{course.title}</strong>
                          <small>{course.teacher}</small>
                          <span className="progress-track">
                            <i
                              className={course.tone}
                              style={{ width: `${course.progress}%` }}
                            />
                          </span>
                        </span>
                        <span className="course-percent">
                          {course.progress}%
                        </span>
                        <span className="course-arrow">
                          <Icon name="play" size={16} />
                        </span>
                      </button>
                    ))}
                    {filteredCourses.length === 0 && (
                      <div className="empty-state">
                        No encontramos cursos con “{query}”.
                      </div>
                    )}
                  </div>
                </div>

                <aside className="schedule-panel reveal delay-3">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">AGENDA</span>
                      <h2>Clases de hoy</h2>
                    </div>
                    <button
                      className="tiny-button"
                      aria-label="Agregar evento"
                      onClick={() => notify("Nuevo evento listo para crear")}
                    >
                      <Icon name="plus" size={18} />
                    </button>
                  </div>
                  <div className="schedule-list">
                    {schedule.map((item, index) => (
                      <div className="schedule-item" key={item.time}>
                        <span className="schedule-time">{item.time}</span>
                        <span className={`schedule-line ${item.tone}`} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </span>
                        {index === 0 ? (
                          <button
                            aria-label="Entrar a clase"
                            onClick={() => notify("Conectando con el aula...")}
                          >
                            <Icon name="arrow" size={16} />
                          </button>
                        ) : (
                          <Icon name="check" size={17} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="achievement">
                    <span className="achievement-icon">★</span>
                    <span>
                      <small>RACHA DE APRENDIZAJE</small>
                      <strong>12 días consecutivos</strong>
                    </span>
                    <b>+40</b>
                  </div>
                </aside>
              </section>
            </>
          ) : (
            <section className="placeholder-view reveal">
              <span className="placeholder-icon">
                <Icon
                  name={
                    navigation.find((item) => item.label === active)?.icon ||
                    "settings"
                  }
                  size={30}
                />
              </span>
              <span className="eyebrow">CAMPUS VIRTUAL VISION</span>
              <h1>{active}</h1>
              <p>
                Este espacio está listo para acompañar tu aprendizaje. La
                información de {active.toLowerCase()} aparecerá aquí.
              </p>
              <button
                className="primary-button"
                onClick={() => setActive("Inicio")}
              >
                <Icon name="arrow" size={18} /> Volver al inicio
              </button>
            </section>
          )}
        </div>
      </main>

      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navigation.slice(0, 5).map((item) => (
          <button
            key={item.label}
            className={active === item.label ? "active" : ""}
            onClick={() => setActive(item.label)}
          >
            <Icon name={item.icon} size={20} />
            <span>
              {item.label === "Calificaciones" ? "Notas" : item.label}
            </span>
          </button>
        ))}
      </nav>
      {toast && (
        <div className="toast">
          <span>
            <Icon name="check" size={16} />
          </span>
          {toast}
        </div>
      )}
    </div>
  )
}
