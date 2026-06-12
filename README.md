# Aprende Conmigo

Sitio web educativo e inclusivo para niños de 3 a 6 años. Incluye módulos para
baja visión, discapacidad físico-motora y TEA nivel 2.

## Arquitectura

El proyecto utiliza HTML, CSS y JavaScript nativos. No requiere Node.js, base
de datos ni proceso de compilación para funcionar en producción.

```text
.
├── index.html                 Entrada única de la aplicación
├── .htaccess                  Rutas y cabeceras para Apache/Hostinger
└── assets
    ├── css
    │   ├── styles.css         Manifiesto de estilos
    │   ├── base.css           Variables, tipografía y navegación
    │   ├── home.css           Pantalla principal
    │   ├── modules.css        Menús y tarjetas de módulos
    │   ├── activities.css     Juegos, progreso y resultados
    │   ├── motor-routes.css   Escenarios accesibles de Lucas
    │   ├── tea.css            Comunicador, respiración y panel adulto
    │   └── responsive.css     Adaptación móvil y movimiento reducido
    ├── images
    │   └── activities         Miniaturas locales de las actividades
    └── js
        ├── app.js             Registro de rutas
        ├── core               Servicios compartidos
        │   ├── router.js
        │   ├── speech.js
        │   ├── storage.js
        │   └── ui.js
        └── modules
            ├── home.js
            ├── low-vision     Módulo de baja visión
            ├── motor          Módulo físico-motor
            ├── tea            Módulo TEA nivel 2
            └── shared         Datos reutilizables
```

Cada actividad está aislada en su propio archivo. Para agregar un módulo nuevo:

1. Crear una carpeta dentro de `assets/js/modules`.
2. Implementar su menú y actividades.
3. Registrar las rutas en `assets/js/app.js`.
4. Reutilizar los servicios de `core` para audio, progreso y componentes.

## Uso local

Los módulos JavaScript necesitan un servidor HTTP. Desde la raíz del proyecto:

```powershell
python -m http.server 8080
```

Abrir `http://localhost:8080`.

## Despliegue en Hostinger

1. Abrir el Administrador de archivos de Hostinger.
2. Entrar a `public_html`.
3. Subir el contenido de este repositorio, incluido `.htaccess`.
4. Confirmar que `index.html` quede directamente dentro de `public_html`.
5. Abrir el dominio y comprobar las seis actividades.

No se debe subir la carpeta `.git`.

## Accesibilidad incluida

- Navegación por teclado, mouse y pantalla táctil.
- Foco visible y áreas de selección amplias.
- Alto contraste y texto escalable.
- Síntesis de voz para repetir instrucciones.
- Cancelación automática del audio al navegar, ocultar o cerrar la página.
- Compatibilidad con reducción de movimiento.
- Entre dos y cuatro opciones por ronda.
- Progreso básico almacenado localmente en el dispositivo.
- Configuración local de sonido, ciclos, frases y pictogramas del módulo TEA.

La síntesis de voz depende de las voces instaladas en el navegador y el sistema
operativo. No se recopilan ni envían datos personales.
