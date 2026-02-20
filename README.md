Gastadol Client - Financial Management Ecosystem
Autor: Diego Muller y David Herrera| Estado: Prototipado y Desarrollo de UI

Descripción del Proyecto
Esta es la interfaz de usuario de Gastadol, una plataforma diseñada para centralizar y automatizar la gestión patrimonial personal. El frontend actúa como un centro de visualización para los datos procesados por el ecosistema de microservicios, permitiendo un seguimiento eficiente de flujos de caja y presupuestos.

Stack Tecnológico
Core: React 18+ con Vite para un entorno de desarrollo de alto rendimiento y Hot Module Replacement (HMR).

Lenguaje: JavaScript (JSX) con arquitectura funcional y Hooks.

Estilizado: Preparado para implementación de CSS modular o frameworks responsivos.

Entorno de Desarrollo: Alojado en Ubuntu Server con gestión remota vía SSH.

Estructura del Repositorio
src/: Código fuente de los componentes, hooks y lógica de la aplicación.

public/: Activos estáticos y recursos globales.

vite.config.js: Configuración técnica del bundler y servidor de desarrollo.

.gitignore: Exclusión de dependencias locales y archivos de configuración sensibles.

Despliegue y Ejecución
Para levantar la base de este frontend en un entorno local o de servidor:

Instalación de dependencias:

Bash
npm install

Ejecución en modo desarrollo:

Bash
npm run dev
Compilación para producción:

Bash
npm run build
