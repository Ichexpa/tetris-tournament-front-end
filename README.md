# Torneo de Tetris Front
## Sistema Gestor de Torneos de Tetris
Pablo Ramírez, presidente de la Asociación de eSports del Centro Cultural Digital, se
comunicó con el equipo de desarrollo para solicitar el diseño de un sistema que permita
gestionar los torneos de Tetris que organizan mensualmente. Pablo plantea la siguiente
situación.
Actualmente, los organizadores del centro cultural gestionan los torneos de manera manual
utilizando hojas de cálculo y grupos de mensajería, lo que diculta el seguimiento de las
partidas y la coordinación entre participantes.
En base a esto, se busca crear un sistema donde tanto organizadores como jugadores
puedan registrarse para participar de manera organizada.
Los organizadores deben poder crear torneos especicando nombre, fechas de inicio y n,
cantidad máxima de participantes y reglas básicas del formato (mejor de 3 o mejor de 5
partidas). Los torneos pueden congurarse en formato de eliminación simple o doble
(opcional) según se desee.
Para participar, los jugadores deben poder inscribirse en los torneos disponibles y
conrmar su participación antes del inicio. El sistema debe mostrar claramente la lista de
participantes y el estado de sus conrmaciones. Una vez alcanzado el máximo de
participantes, las inscripciones deben cerrarse automáticamente.
Una vez iniciado el torneo, el sistema debe generar automáticamente las llaves iniciales y
mostrar el bracket actualizado. Los organizadores serán los responsables de registrar los
resultados de cada partida, tras lo cual el bracket debe actualizarse automáticamente.
Cada jugador debe tener un perl que muestre sus estadísticas básicas (victorias/derrotas)
y su historial de participación en torneos anteriores. El sistema debe mantener un ranking
global que refleje el desempeño de los jugadores. Los puntos se otorgarán según la
posición nal obtenida en cada torneo, con bonicaciones por participar en torneos más
grandes y un sistema de decaimiento para torneos antiguos. Esto asegura que el ranking
refleje tanto el rendimiento histórico como la actividad reciente de los jugadores.
Tanto organizadores como jugadores deben tener acceso a un panel personalizado donde
pueden ver los torneos activos y sus próximos enfrentamientos. Los torneos deben poder
ltrarse por estado (próximo, en curso, nalizado), nombre y fecha para facilitar su
búsqueda.

## Tecnologias Útilizadas:

* [React](https://es.react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)

## Librerias Útilizadas:

* [@g-loot/react-tournament-brackets](https://www.npmjs.com/package/@g-loot/react-tournament-brackets)
* [ShadCn](https://ui.shadcn.com/)

# Configuración y ejecución

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/Ichexpa/tetris-tournament-front-end
```
2. Accede al directorio del proyecto.
```bash
cd tetris-tournament-front-end
```
3. Instala las dependencias
 ```bash
npm install
  ```
4. Ejecuta la aplicación
 ```bash
npm run dev
 ```

5. Abre tu navegador y accede a [localhost](#) para comenzar a utilizar la aplicación.
## Autore

- **Nombre del Autor**: [Hector Mauricio Mamaní](https://github.com/ichexpa)
- **Email**: maurobvx@gmail.com
