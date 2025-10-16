# 📱 Proyecto de Automatización Móvil con WebdriverIO + Appium

Este proyecto automatiza pruebas para una aplicación móvil Android usando **WebdriverIO (WDIO)** y **Appium**. 
Está diseñado para ejecutarse en entorno local (VSCode / Visual Studio Code) y emuladores o dispositivos físicos para la aplicación Leonidas.

---

## 📦 Requisitos Previos

Antes de instalar las dependencias del proyecto, asegúrate de tener instalado lo siguiente:

### 🧰 Herramientas Base

| Herramienta       | Versión recomendada | Descripción                                         |
|-------------------|---------------------|-----------------------------------------------------|
| Node.js           | `>=16.x`            | Entorno de ejecución para JavaScript               |
| npm               | `>=8.x`             | Gestor de paquetes de Node.js                      |
| Appium            | `>=2.x`             | Servidor de automatización para apps móviles       |
| Android SDK       | `Command Line Tools`| Necesario para compilar y ejecutar emuladores      |
| Java JDK          | `>=11`              | Requerido por Appium para interactuar con Android  |

> ⚠️ Asegúrate de agregar `JAVA_HOME`, `ANDROID_HOME`, y `PATH` correctamente en tus variables de entorno.

---

## 📁 Instalación del Proyecto

1. **Clona el repositorio**:

```bash
git clone https://github.com/JesusZamudioAxity/LeonidasApp.git
cd tu-repo

2.- Instala las dependencias de Node.js:

npm install

3.- 📱 Appium + Android Drivers

Asegúrate de tener Appium instalado globalmente:

npm install -g appium


4.- drivers instalados en Appium:

appium driver install uiautomator2


📝 Estructura general del proyecto

├── test/
│   └── login.test.js
│   ├── ASN/
│       ├── tracking.test.js
│       └── cerrarASN.test.js
│   ├── almacenamiento/
│       ├── almacenamientoCritico.test.js
│       └── almacenamientoStringer.test.js
│       └── almacenamientoNormal.test.js
│       └── almacenamientoMixed.test.js
│       └── almacenamientoMasivo.test.js
│       └── moverRan.test.js
|
├── pageObjects/
|   └login.page.js 
│   └── ASN/
│       ├── tracking.page.js
│       └── cerrasASN.page.js
│   ├── almacenamiento/
│       ├── almacenamientoCritico.page.js
│       └── almacenamientoStringer.page.js
│       └── almacenamientoNormal.page.js
│       └── almacenamientoMixed.page.js
│       └── almacenamientoMasivo.page.js
│       └── moverRan.test.js
│
├── utils/
│   └── ASN/
│       ├── trackingData.json    
│       └── cerrarASN.json
│   ├── almacenamiento/
│       ├── almcritico.page.js
│       └── almastringer.page.js
│       └── almnormal.page.js
│       └── almmixed.page.js
│       └── almasivo.page.js
│       └── moverRan.test.js
   ├── dataHelpers/
│       ├── asetUpASN.js
│       └── setupDatosAlmacenamiento.js
│   ├── db-test.js
│   ├── testDataManager.js
│   └── uiHelpers.js
│
├── wdio.conf.js
└── package.json

⚙️ Importante: Es necesario adaptar las capacidades de ejecución de las capacidades del emulador o dispositivo fisico
y cambiar los datos de la carpeta data para la ejecución correcta
✅ wdio.conf.js
✅ data/ASN

✅ Lanza las pruebas con WDIO:

### 1. Ejecutar un archivo específico con `--spec`

Ejecuta un test scripts en `package.json`:

🚀 npm run test:login
🚀 npm run test:tracking
🚀 npm run test:ASN
🚀 npm run test:ran
🚀 npm run test:critico
🚀 npm run test:normal
🚀 npm run test:mixed
🚀 npm run test:stringer
🚀 npm run test:masivo

---

### 2. Ejecutar un grupo de tests (suite) con `--suite`

Si tienes definidas suites en `wdio.conf.js`, puedes ejecutar grupos de tests así:

🚀 npx wdio run wdio.conf.js --suite login
🚀 npx wdio run wdio.conf.js --suite tracking
🚀 npx wdio run wdio.conf.js --suite ASN
🚀 npx wdio run wdio.conf.js --suite ran
🚀 npx wdio run wdio.conf.js --suite critico
🚀 npx wdio run wdio.conf.js --suite normal
🚀 npx wdio run wdio.conf.js --suite mixed
🚀 npx wdio run wdio.conf.js --suite stringer
🚀 npx wdio run wdio.conf.js --suite masivo

Correr todas las suites 
🚀 npx wdio run wdio.conf.js --suite all
 
### 3. 🛠️ Genera el reporte:
🚀 npm run report:allure 
ó
🚀 npx allure generate allure-results --clean -o allure-report

### 4. 🌐 Abre el reporte en tu navegador:
🚀 npm run report:open
ó
🚀 npx allure open allure-report

Importante - Requisito para la ejecución de autómatas
Para poder ejecutar un autómata, es necesario cumplir una de las siguientes condiciones:
La aplicación debe estar cerrada completamente antes de iniciar la ejecución (el autómata se ejecuta desde el proceso de inicio de sesión).
El usuario debe haber iniciado sesión correctamente y ejecutar el autómata desde los puntos de menú generales.

Importante: El autómata ha sido codificado específicamente para ejecutarse desde el proceso de login o desde el menú principal de la 
aplicación. Otros puntos de ejecución no están soportados y pueden generar errores.
