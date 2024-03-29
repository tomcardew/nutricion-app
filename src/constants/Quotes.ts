const quotes: string[] = [
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "Nunca pienses en lo que te queda, sino en lo que has logrado.",
    "Sin esfuerzo no hay recompensa.",
    "Cuando pienses en rendirte, recuerda la razón por la que empezaste.",
    "Si alguna vez vas a perder, ¡pierde las ganas de rendirte!",
    "A la cima no se llega superando a los demás, sino superándote a ti mismo.",
    "Eres más fuerte de lo que piensas.",
    "El dolor que sientes ahora es la fuerza que sentirás mañana.",
    "Obsesión es como los vagos llaman a la determinación.",
    "Estás a un entrenamiento de distancia de ponerte de buen humor.",
    "Las excusas no queman calorías.",
    "Todo lo que duele te enseña.",
    "Sólo tú decides tus límites.",
    "Si empiezas hoy, verás los resultados un día antes.",
    "Cuanto más sudas en el entrenamiento, menos sangras en el combate.",
    "El miedo solo está en la mente.",
    "Una cosa es creer y otra hacer.Si crees que puedes hacer algo y no lo haces, vives en una fantasía.",
    "Se supone que debe ser difícil.Si no lo fuese, todo el mundo lo haría.Lo que lo hace grande es que es difícil.",
    "Mi fuerza física me hace imparable, pero mi fuerza de voluntad me hace indestructible.",
    "La resistencia con la que te enfrentas en el gimnasio y la resistencia con la que te encuentras en la vida solo pueden construir un carácter fuerte.",
    "Si los obstáculos son largos, salta con más energía.",
    "Haz lo que quieres hacer antes de que se convierta en lo que te gustaría haber hecho.",
    "Mantener nuestro cuerpo con buena salud es un deber.De lo contrario no seremos capaces de mantener nuestras mentes fuertes y claras. – Buda",
    "No se trata de si fracasas, se trata de si eres capaz de levantarte.",
    "Mañana puedes tener remordimientos o agujetas.Tú decides.",
    "Conoce tus limitaciones.Después desafíalas.",
    "Lo que cuenta no es el número de horas que trabajas, sino la energía que pones en esas horas.",
    "No importa lo despacio que vayas, estás adelantando a todos los que están tirados en el sofá.",
    "Solo los caminos duros llevan a la grandeza.",
    "La fuerza no viene de una capacidad física.Viene de una voluntad indomable. – Mahatma Gandhi",
    "Cuida tu cuerpo.Es el único lugar que tienes para vivir. – Jim Rohn",
    "Recuerda esto: tu cuerpo es tu esclavo.Trabaja para ti, no tú para el. – Jack LaLanne",
    "Cada paso que das es un paso alejado de donde solías estar. – Brian Chargualaf",
    "Demasiado ocupado es un mito.La gente busca tiempo para las cosas que son importantes.",
    "El primer paso es el más importante.Es el más crucial y más efectivo, ya que iniciará la dirección que has elegido. – Steve Backley",
    "Los que piensan que no tienen tiempo para hacer ejercicio, tarde o temprano encontrarán tiempo para estar enfermos. – Edward Stanley",
    "La única prueba es lo que ves al mirarte en el espejo.",
    "Es más fácil mantenerse en forma si nunca pierdes la forma en primer lugar. – Bill Loguidice",
    "Si sientes que no tienes más fuerzas, piensa en la recompensa.",
    "Conseguiremos muchas más cosas si pensamos que nada es imposible. – Vince Lombardi",
    "El dolor es temporal, el orgullo para siempre.",
    "Pensar en ir al gimnasio quema entre 0 y 0 calorías.",
    "Siempre parece imposible hasta que se hace. – Nelson Mandela",
    "Qué desgracia es para un hombre crecer sin ver la belleza y fuerza de lo que su cuerpo es capaz. – Sócrates",
    "Para ser el número uno, tienes que entrenar como si fueras el número dos. – Maurice Green",
    "Si eres capaz de enviar un mensaje que se pueda leer entre sesiones, probablemente no estas trabajando lo suficiente. – Dave Tate",
    "Si quieres verme conseguir algo, dime que no puedo hacerlo. – Maya Angelou",
    "El milagro no es que terminé.El milagro es que tuve el coraje de empezar. – John Bingham",
    "Un cuerpo en forma y saludable: esa es la mejor declaración de moda. – Jess C.Scott",
    "Al final del día, tu salud es tu responsabilidad. – Jillian Michaels",
    "Te sorprendería lo que dos horas de ejercicio diario y quinientas abdominales pueden hacer por ti. – Justina Chen",
    "Hacer más ejercicio no solo es bueno para tu cintura.Es un antidepresivo natural que te deja de buen humor. – Auliq Ice",
    "Sacrificaré lo que sea necesario para ser el mejor. – J.J.Watt",
    "El mejor día para comenzar a hacer ejercicio es hoy.Mañana puede convertirse en semanas, meses o años. – Mark Dilworth",
    "La capacidad es lo que eres capaz de hacer.La motivación determina lo que haces.La actitud determina qué tan bien lo haces. – Lou Holtz",
    "El dolor es la debilidad que está abandonando tu cuerpo. – Tera Lynn Childs",
    "Es sólo el ejercicio lo que mantiene el espíritu y guarda la mente y el vigor. – Cicerón",
    "La voluntad es un músculo que necesita ser ejercitado, igual que el resto. – Lynn Jennings",
    "La energía y la persistencia conquistan todas las cosas. – Benjamin Franklin",
    "Los obstáculos son esas cosas espantosas que se ven cuando desvías la atención del objetivo. – Henry Ford",
    "El mejor reconocimiento para el cansancio no es lo que obtienes de él, sino en lo que te conviertes gracias a él. – John Ruskin",
    "La montaña más alta siempre está dentro de nosotros. – Walter Bonatti",
    "Hay epidemias de todo tipo, el gusto por el deporte es una epidemia de salud. – Jean Giraudoux",
    "El deporte mide el valor humano en milímetros y centésimas de segundo. – Bernard Arcand",
    "Si te quedas corto en la nutrición, te quedarás corto a la hora de maximizar el desarrollo de tu físico. – Ernie Taylor",
    "Fijar objetivos es el primer paso para transformar lo invisible en visible. – Anthony Robbins",
    "Nunca es demasiado tarde para convertirte en lo que pudiste haber sido. ",
    "La motivación es lo que te pone en marcha, y el hábito es lo que hace que sigas.",
    "Para tener éxito, en primer lugar debemos creer que podemos",
    "Da siempre lo mejor de ti.Lo que siembres hoy dará su fruto mañana",
    "No se es un perdedor hasta que se deja de intentarlo",
    "No mires el reloj, haz lo que este hace: seguir adelante",
    "La clave para iniciar algo es dejar de hablar y ponerse a realizar",
    "Tan solo juega, diviértete, disfruta del juego",
    "Siempre se puede ser mejor",
    "Puedo, luego existo",
    "No se puede ganar a la persona que nunca se rinde",
    "Hagas lo que hagas, hazlo intensamente",
    "Si caíste ayer, ponte en pie hoy",
    "Si no se pierde, no se puede disfrutar de las victorias",
    "Para ganar se necesita talento, repetir requiere carácter",
    "Empieza donde estás, usa lo que tienes, haz lo que puedes",
    "El comienzo es el momento más importante del trabajo",
    "Si vas paso a paso y con confianza, puedes llegar lejos",
    "Marcarse objetivos es el primer paso para convertir lo invisible en visible",
    "Cuanto más difícil es la victoria, mayor es la satisfacción de ganar",
    "Cuando algo es lo suficientemente importante, lo haces, aunque las posibilidades no estén a tu favor",
    "Paso a paso y el proceso se completa",
    "La edad no es una barrera, sino una limitación que le pones a tu mente",
    "Nadie que haya dado lo mejor de sí mismo lo ha lamentado nunca",
    "Ganar no lo es todo, pero hacer el esfuerzo para ganar sí lo es",
    "Si puedes creer en ello, tu mente puede alcanzarlo",
    "Un atleta no puede correr con dinero en sus bolsillos, sino con esperanza en su corazón y sueños en su cabeza",
    "El esfuerzo continuado, y no la inteligencia o la fuerza, es la clave del éxito",
    "Lo que caracteriza a los grandes jugadores es que se mantienen decididos en las situaciones difíciles",
    "He fallado una y otra vez en mi vida, por eso he conseguido el éxito(Michael Jordan)",
    "Si tienes miedo a fallar, probablemente falles",
    "Siempre he creído que si uno se pone a trabajar, los resultados llegarán tarde o temprano(Michael Jordan)"]

export default quotes;