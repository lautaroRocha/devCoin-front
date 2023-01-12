// Wrapper

export { default as AppWrap } from './AppWrap/AppWrap';

// Explicacion de como se utiliza el wrapper como base de maquetación.
// El wrapper nos sirve para dar una envoltura base a cada una de nuestras páginas.
// Ej: nosotros vamos a tener el nav a la izquierda en fixed siempre, y esto va a ocupar un % del Width de las páginas. -
// --- entonces debemos crear un wrapper para darle el tamaño que sobre a cada una de las páginas sin necesidad -
// --- de programar esa configuracion a cada una de las páginas.

// Utilización del wrapper
// Una ves creado el wrapper debemos llamarlo y usarlo en la exportación de cada página.
// Ej:

// import { AppWrap } from 'wrapper'
// const Home = () => {
// ----- Contenido
// }


// export AppWrap(Home)

