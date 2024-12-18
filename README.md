# 📋 Playwright Test Automation Suite

Este proyecto implementa un conjunto de pruebas automatizadas utilizando **Playwright** para validar funcionalidades de una aplicación web, enfocándose en registro de usuarios, inicio de sesión, recuperación de contraseñas y compras de productos.

---

## 📁 Estructura del Proyecto

```plaintext
project-root/
│
├── pages/
│   ├── registerPage.ts     # Métodos para la página de registro
│   ├── loginPage.ts        # Métodos para la página de inicio de sesión
│   └── purchasePage.ts     # Métodos para la página de compras
│
├── tests/
│   └── maintests.spec.ts             # Archivo principal con los casos de prueba
│
├── userdata.json           # Datos de usuario (emails, contraseñas, etc.)
├── test-data.json          # Descripción de casos de prueba y sus pasos
└── README.md               # Documentación general del proyecto
