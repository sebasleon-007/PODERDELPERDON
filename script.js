const USERS_KEY = 'bitacora-users';
const ENTRIES_KEY = 'bitacora-entries';
const SESSION_KEY = 'bitacora-session';

const $ = (selector) => document.querySelector(selector);
const authSection = $('#auth-section');
const appSection = $('#app-section');
const authForm = $('#auth-form');
const entryForm = $('#entry-form');
const openEntryForm = $('#open-entry-form');
const entryAction = $('#entry-action');
const dateFilter = $('#filter-date');
const subjectFilter = $('#filter-subject');
const subjectSelect = $('#entry-subject');
const entriesView = $('#entries-view');
const subjectBrowser = $('#subject-browser');
const currentYear = new Date().getFullYear();
const yearStart = `${currentYear}-01-01`;
const yearEnd = `${currentYear}-12-31`;
dateFilter.min = yearStart;
dateFilter.max = yearEnd;

const subjects = [
  'DESARROLLO DE APLICACIONES MOVILES_006D',
  'DESARROLLO FULLSTACK II_005D',
  'EL PODER DEL PERDON_001D',
  'ESTADISTICA DESCRIPTIVA_004D',
  'ETICA PARA EL TRABAJO_003D',
  'INGLES INTERMEDIO I_006D',
  'LA PERSONALIDAD DE JESUS_002D',
  'TALLER DE BASE DE DATOS_007D'
];

function subjectOptions(includeAll) {
  return (includeAll ? '<option value="">Todas</option>' : '') +
    subjects.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join('');
}

subjectSelect.innerHTML = subjectOptions(false);
subjectFilter.innerHTML = subjectOptions(true);

function subjectLabel(name) {
  return name;
}
let registerMode = false;
let users = read(USERS_KEY);
let entries = read(ENTRIES_KEY);
let session = localStorage.getItem(SESSION_KEY);
const ADMIN_USERNAME = 'Vitacora';
const ADMIN_PASSWORD = 'Vitacora123456789';
const LIMITED_ADMIN_USERNAME = 'Editor';
const LIMITED_ADMIN_PASSWORD = 'Editor123456';

const adminUser = users.find((user) => user.username === ADMIN_USERNAME);
if (adminUser) {
  adminUser.password = ADMIN_PASSWORD;
  adminUser.admin = true;
  save(USERS_KEY, users);
} else {
  users.push({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD, admin: true });
  save(USERS_KEY, users);
}
const limitedAdmin = users.find((user) => user.username === LIMITED_ADMIN_USERNAME);
if (limitedAdmin) {
  limitedAdmin.password = LIMITED_ADMIN_PASSWORD;
  limitedAdmin.role = 'limited-admin';
  save(USERS_KEY, users);
} else {
  users.push({ username: LIMITED_ADMIN_USERNAME, password: LIMITED_ADMIN_PASSWORD, role: 'limited-admin' });
  save(USERS_KEY, users);
}

const initialEntries = [
  {
    id: 'bitacora-1',
    author: 'PODERDELPERDON',
    title: 'Bitácora 1',
    date: '2026-08-01',
    subject: 'EL PODER DEL PERDON_001D',
    category: 'Reflexión',
    content: `VULNERABILIDAD
Frente a la muerte, se cae toda máscara y aparece lo que somos de verdad.

FRAGILIDAD
Personas distintas, misma fragilidad, mismo llamado a reconciliarse.

NECESIDAD DE AMOR
El perdón conecta a extraños porque todos fuimos hechos para amar y ser amados.

TENSIÓN HUMANA
Todos coincidimos en el perdón; muestra que buscamos trascender más allá de nuestras diferencias.

INQUIETAR
Solo cuando somos vulnerables dejamos de fingir que todo está bien.

La fragilidad del cuerpo nos recuerda que no somos dueños del tiempo.

Inquieta ver que el perdón, no el éxito, es lo que realmente se necesita al final.

Vivimos enfocados en lo urgente, pero al morir aparece lo verdaderamente importante.

EXPLORAR
No reconocemos nuestra vulnerabilidad hasta que es demasiado tarde para actuar.

Olvidamos que el otro es frágil como nosotros, y por eso no lo cuidamos a tiempo.

Postergamos el “te quiero” y el perdón, pensando que siempre habrá tiempo.

Vivimos en tensión entre lo que debería importarnos y lo que realmente priorizamos.`
  },
  {
    id: 'bitacora-2',
    author: 'PODERDELPERDON',
    title: 'Bitácora 2',
    date: '2026-08-15',
    subject: 'EL PODER DEL PERDON_001D',
    category: 'Amor y fragilidad',
    content: `Necesidad estructural de amar: ser valorados, queridos, tener vínculos y sentirnos parte de la naturaleza.

Ética clásica y cristiana.

LIBERTAD
Libre albedrío, capacidad de actuar.

FRAGILIDAD
Vulnerabilidad, daño físico y muerte.

¿Qué es lo que más valoro de mis relaciones?
La confianza, la estabilidad y la honestidad.

¿Qué es lo que más me duele cuando una relación falla?
El tiempo, la confianza y el efecto.

VIDEO
¿Qué acciones concretas causaron la ruptura en la escena?
El chico se había casado hace unos meses, quedó parapléjico de cuello para abajo y tenía un bebé en camino.

¿Cuál era el deseo de amor que había detrás, aunque saliera mal?
Poder perdonar.

¿Cómo se relaciona esto con nuestra propia experiencia de querer amar, pero no saber cómo hacerlo?
Aun bajo tantas dificultades físicas y mentales, él amó a su manera y lo amaron de la misma forma.

MEDITACIÓN
Sabiendo que estoy hecho para amar pero que soy frágil, ¿cuál es esa “grieta” que hoy me cuesta aceptar de mí mismo?

Miedo.`
  },
  {
    id: 'bitacora-28-08-2026',
    author: 'PODERDELPERDON',
    title: 'Bitácora 28/08/2026',
    date: '2026-08-28',
    subject: 'EL PODER DEL PERDON_001D',
    category: 'Perdón y justicia',
    content: `Vínculo transaccional: riqueza, lujos, superficial e intocable.

Vínculo: tristeza y despecho.

Frágil: melancolía, “nada dura para siempre”.

CITA N.º 1
¿Cuál es la diferencia entre perdonar y hacer justicia, según la cita?
La justicia juzga a la persona y la condena; el perdón deja ir todo lo malo y sucedido.

¿Crees que el perdón puede convivir con la justicia o la reemplaza?
Puede convivir, pero también es capaz de reemplazarla.

CITA N.º 2
¿Qué relación hay entre perdón y libertad?

¿Por qué el perdón puede verse como un acto creador que origina algo nuevo?
Podría renacer como persona.

CITA N.º 3
¿Qué significa que nuestras acciones son irreversibles?
Que nuestros actos los hacemos y no hay nada que podamos cambiar del hecho.

¿Por qué el perdón aparece como una necesidad más que como una opción?
Para poder vivir tranquilo, poder amar y ser amado.`
  },
  {
    id: 'bitacora-04-09-2026',
    author: 'PODERDELPERDON',
    title: 'Bitácora 04/09/2026',
    date: '2026-09-04',
    subject: 'EL PODER DEL PERDON_001D',
    category: 'Vínculos',
    content: `Amor: cuidar, querer, sentir especial. Tristeza y necesidad antropológica.

Humillación
Dolor
Traición
Excusa
Confianza
Deslealtad
Orgullo

ACTIVIDAD
Escribe 3 razones dentro de la mochila por las que te cuesta perdonar:

Por el dolor.
Por el resentimiento.
Traición.

Elige un color para el “vínculo cargado de odio” que describe Irene:

Rojo.`
  },
  {
    id: 'bitacora-11-09-2026',
    author: 'PODERDELPERDON',
    title: 'Bitácora 11/09/2026',
    date: '2026-09-11',
    subject: 'EL PODER DEL PERDON_001D',
    category: 'Misericordia',
    content: `MISERICORDIA

LÓGICA DE RETRIBUCIÓN
Daño → culpa → castigo.

OBJETIVO DE CLASE
El perdón es una expresión del amor misericordioso de Dios.

MANERAS DE RESPONDER AL ERROR
¿Qué castigo merece?

LA MIRADA DE LA MISERICORDIA
La misericordia es una forma de mirar al otro que reconoce su error, pero no reduce a la persona a ese error.

LA RESTAURACIÓN DE LA DIGNIDAD
Restaurar la dignidad es volver a tratar a la persona como alguien valioso.
Su error, su historia o la mirada de los demás no agotan quién es.

EL REGALO DE LA GRATITUD
Normalmente damos algo porque alguien lo ganó o lo merece. La gratitud funciona de otra manera: es ofrecer un bien que no depende solamente del mérito del otro.

RUTINA: VER, PENSAR, PREGUNTAR

VER
Vi la escena en la que el sacerdote se acerca a Tim sin ningún tipo de miedo. Me impactó mucho cómo le toma las manos y lo mira directo a los ojos con pura ternura.

Me fijé en que Tim venía de un mundo donde los golpes y el maltrato eran la única forma de contacto físico que conocía, pero este hombre lo toca con respeto y cariño.

No vi en el cura ninguna mirada de juicio, desconfianza o rechazo, a pesar de que Tim era un joven gigante, boxeador y con una actitud muy violenta.

PENSAR
Me quedé pensando en lo fuerte que debe ser que te traten con dignidad por primera vez en la vida. Para alguien como Tim, que siempre se sintió basura o una amenaza, que un desconocido lo mire con amor le rompió todos los esquemas.

Pienso que los discursos no cambian a las personas; lo que realmente transforma es sentirse aceptado y querido. A veces un solo gesto sincero de perdón puede hacer tambalear años de odio y rabia acumulada.

Me hace reflexionar sobre cómo detrás de las personas más duras o defensivas suele haber un dolor enorme que solo necesita ser acogido, no juzgado.

PREGUNTAR
¿De dónde saca ese sacerdote la capacidad de mirar con tanto amor y sin nada de miedo a alguien que la sociedad daría por perdido?

¿Cómo puedo aprender a mirar a los demás con esa misma empatía en mi día a día, incluso a quienes me cuesta aceptar?

CUATRO IDEAS CENTRALES
Misericordia, gratitud, dignidad restaurada y nuevo comienzo.`
  }
];

const missingEntries = initialEntries.filter((initial) => !entries.some((entry) => entry.id === initial.id));
if (missingEntries.length) {
  entries = [...missingEntries, ...entries];
  save(ENTRIES_KEY, entries);
}

function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showMessage(selector, message) {
  $(selector).textContent = message;
}

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = value;
  return element.innerHTML;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(`${value}T12:00:00`));
}

function updateAuthMode() {
  $('#auth-title').textContent = registerMode ? 'Crear cuenta' : 'Iniciar sesión';
  $('#auth-submit').textContent = registerMode ? 'Registrarme' : 'Entrar';
  $('#toggle-auth').textContent = registerMode ? 'Ya tengo una cuenta' : 'Crear una cuenta';
  $('#password').autocomplete = registerMode ? 'new-password' : 'current-password';
  showMessage('#auth-message', '');
}

function showApp() {
  const loggedIn = Boolean(session);
  authSection.hidden = true;
  appSection.hidden = false;
  $('#current-user').parentElement.hidden = !loggedIn;
  entryAction.hidden = !loggedIn;
  entryForm.hidden = true;
  $('#login-to-publish').hidden = loggedIn;
  if (loggedIn) $('#current-user').textContent = session;
  renderEntries();
}

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = $('#username').value.trim();
  const password = $('#password').value;
  const existingUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

  if (registerMode) {
    if (username.length < 3 || password.length < 4) {
      showMessage('#auth-message', 'El usuario debe tener 3 caracteres y la contraseña 4 como mínimo.');
      return;
    }
    if (existingUser) {
      showMessage('#auth-message', 'Ese usuario ya existe.');
      return;
    }
    users.push({ username, password, admin: false });
    save(USERS_KEY, users);
    session = username;
  } else {
    if (!existingUser || existingUser.password !== password) {
      showMessage('#auth-message', 'Usuario o contraseña incorrectos.');
      return;
    }
    session = existingUser.username;
  }

  localStorage.setItem(SESSION_KEY, session);
  authForm.reset();
  showApp();
});

$('#toggle-auth').addEventListener('click', () => {
  registerMode = !registerMode;
  updateAuthMode();
});

$('#nav-home').addEventListener('click', () => {
  authSection.hidden = true;
  appSection.hidden = false;
});

$('#nav-register').addEventListener('click', () => {
  registerMode = true;
  updateAuthMode();
  authSection.hidden = false;
  appSection.hidden = true;
  authSection.scrollIntoView({ behavior: 'smooth' });
});

$('#nav-login').addEventListener('click', () => {
  registerMode = false;
  updateAuthMode();
  authSection.hidden = false;
  appSection.hidden = true;
  authSection.scrollIntoView({ behavior: 'smooth' });
});

$('#logout').addEventListener('click', () => {
  session = null;
  localStorage.removeItem(SESSION_KEY);
  entryForm.reset();
  cancelEdit();
  showApp();
});

entryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = $('#entry-id').value;
  const data = {
    title: $('#entry-title').value.trim(),
    date: $('#entry-date').value,
    subject: subjectSelect.value,
    category: $('#entry-category').value.trim(),
    content: $('#entry-content').value.trim()
  };

  if (id) {
    const entry = entries.find((item) => item.id === id && canManage(item));
    if (!entry) return showMessage('#entry-message', 'No puedes editar esta bitácora.');
    Object.assign(entry, data);
  } else {
    const id = crypto.randomUUID ? crypto.randomUUID() : `entrada-${Date.now()}`;
    entries.unshift({ id, author: session, ...data });
  }

  save(ENTRIES_KEY, entries);
  entryForm.reset();
  cancelEdit();
  entryForm.hidden = true;
  entryAction.hidden = false;
  subjectBrowser.hidden = false;
  showMessage('#entry-message', 'Bitácora guardada.');
  renderEntries();
  renderSubjects();
});

function renderEntries() {
  const query = $('#search').value.toLowerCase().trim();
  const visible = entries.filter((entry) => {
    const text = `${entry.title} ${entry.category} ${entry.content}`.toLowerCase();
    return text.includes(query) &&
      (!dateFilter.value || entry.date === dateFilter.value) &&
      (!subjectFilter.value || (entry.subject || 'EL PODER DEL PERDON_001D') === subjectFilter.value);
  }).sort((first, second) => second.date.localeCompare(first.date));

  $('#entries').innerHTML = visible.map((entry) => `
    <article class="entry-card" tabindex="0" role="button" data-open="${entry.id}" aria-label="Abrir ${escapeHtml(entry.title)}">
      <h3>${escapeHtml(entry.title)}</h3>
      <p>Asignatura: ${escapeHtml(subjectLabel(entry.subject || 'EL PODER DEL PERDON_001D'))}<br>Fecha: ${formatDate(entry.date)}<br>Categoría: ${escapeHtml(entry.category)}<br>Publicado por: ${escapeHtml(entry.author)}</p>
      <p class="card-preview">${escapeHtml(entry.content)}</p>
    </article>
  `).join('');
  $('#no-entries').hidden = visible.length > 0;
}

function renderSubjects() {
  $('#subject-cards').innerHTML = subjects.map((subject) => {
    const count = entries.filter((entry) => (entry.subject || 'EL PODER DEL PERDON_001D') === subject).length;
    return `<button class="subject-card" type="button" data-subject="${escapeHtml(subject)}">
      <strong>${escapeHtml(subject)}</strong>
      <span>${count} ${count === 1 ? 'bitácora' : 'bitácoras'}</span>
    </button>`;
  }).join('');
}

function openSubject(subject) {
  subjectFilter.value = subject;
  subjectBrowser.hidden = true;
  entriesView.hidden = false;
  $('#selected-subject').textContent = subjectLabel(subject);
  renderEntries();
}

function closeSubjects() {
  subjectFilter.value = '';
  entriesView.hidden = true;
  subjectBrowser.hidden = false;
}

function openDetail(id) {
  const entry = entries.find((item) => item.id === id);
  if (!entry) return;
  $('#entries').hidden = true;
  $('#no-entries').hidden = true;
  $('#entry-detail').hidden = false;
  $('#detail-category').textContent = entry.category;
  $('#detail-title').textContent = entry.title;
  $('#detail-meta').textContent = `Asignatura: ${subjectLabel(entry.subject || 'EL PODER DEL PERDON_001D')} | Fecha: ${formatDate(entry.date)} | Autor: ${entry.author}`;
  $('#detail-content').textContent = entry.content;
  $('#detail-actions').innerHTML = canManage(entry)
    ? `<button type="button" data-detail-edit="${entry.id}">Editar</button>
       ${canDelete(entry) ? `<button type="button" data-detail-delete="${entry.id}">Eliminar</button>` : ''}`
    : '';
}

function closeDetail() {
  $('#entry-detail').hidden = true;
  $('#entries').hidden = false;
  renderEntries();
}

function startEdit(id) {
  const entry = entries.find((item) => item.id === id && canManage(item));
  if (!entry) return;
  $('#entry-id').value = entry.id;
  $('#entry-title').value = entry.title;
  $('#entry-date').value = entry.date;
  subjectSelect.value = entry.subject || 'EL PODER DEL PERDON_001D';
  $('#entry-category').value = entry.category;
  $('#entry-content').value = entry.content;
  $('#entry-form-title').textContent = 'Editar bitácora';
  $('#entry-submit').textContent = 'Guardar cambios';
  $('#cancel-edit').hidden = false;
  $('#entry-title').focus();
}

function isAdmin() {
  return users.some((user) => user.username === session && user.admin === true);
}

function isLimitedAdmin() {
  return users.some((user) => user.username === session && user.role === 'limited-admin');
}

function canManage(entry) {
  return Boolean(session) && (isAdmin() || entry.author === session);
}

function canDelete(entry) {
  return Boolean(session) && (isAdmin() || (entry.author === session && !isLimitedAdmin()));
}

function cancelEdit() {
  $('#entry-id').value = '';
  $('#entry-form-title').textContent = 'Agregar bitácora';
  $('#entry-submit').textContent = 'Guardar bitácora';
  $('#cancel-edit').hidden = true;
}

$('#cancel-edit').addEventListener('click', () => {
  entryForm.reset();
  cancelEdit();
  entryForm.hidden = true;
  entryAction.hidden = false;
  subjectBrowser.hidden = false;
});

openEntryForm.addEventListener('click', () => {
  entryForm.hidden = false;
  entryAction.hidden = true;
  subjectBrowser.hidden = true;
  entriesView.hidden = true;
  $('#entry-detail').hidden = true;
  $('#entry-title').focus();
});

$('#entries').addEventListener('click', (event) => {
  const openCard = event.target.closest('[data-open]');
  const openId = openCard ? openCard.dataset.open : '';
  if (openId) openDetail(openId);
});

$('#entries').addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.dataset.open) {
    event.preventDefault();
    openDetail(event.target.dataset.open);
  }
});

$('#subject-cards').addEventListener('click', (event) => {
  const subject = event.target.closest('[data-subject]')?.dataset.subject;
  if (subject) openSubject(subject);
});

$('#back-to-subjects').addEventListener('click', closeSubjects);

$('#back-to-entries').addEventListener('click', closeDetail);

$('#detail-actions').addEventListener('click', (event) => {
  const editId = event.target.dataset.detailEdit;
  const deleteId = event.target.dataset.detailDelete;
  if (editId) {
    closeDetail();
    entryForm.hidden = false;
    entryAction.hidden = true;
    startEdit(editId);
  }
  if (deleteId && canDelete(entries.find((entry) => entry.id === deleteId)) && confirm('¿Eliminar esta bitácora?')) {
    entries = entries.filter((entry) => !(entry.id === deleteId && canManage(entry)));
    save(ENTRIES_KEY, entries);
    renderSubjects();
    closeDetail();
  }
});

$('#search').addEventListener('input', renderEntries);
dateFilter.addEventListener('change', renderEntries);
subjectFilter.addEventListener('change', renderEntries);
updateAuthMode();
showApp();
renderSubjects();
