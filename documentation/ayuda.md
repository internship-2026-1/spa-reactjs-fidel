# hacer

├── assets/             # Archivos estáticos (globales)
├── common/             # UI Kit base, hooks globales, utilidades
├── config/             # Variables de entorno y constantes
├── layouts/            # Estructuras de página (MainLayout, AuthLayout)
├── routes/             # Definición de rutas y guards (protección de rutas)
├── services/           # Clientes base (Axios instance, interceptores, sockets)
│
├── modules/            # <--- DIVISIÓN POR ACCESO
│   ├── public/         # Módulos accesibles sin autenticación
│   │   ├── home/       # Sub-módulo (Landing page, etc.)
│   │   └── auth/       # Login, Registro, Recuperar contraseña
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── pages/
│   │       └── types/
│   │
│   └── private/        # Módulos protegidos por login
│       ├── dashboard/
│       ├── settings/
│       └── users/      # Ejemplo: Gestión de usuarios
│           ├── components/ # Componentes exclusivos (UserTable, UserForm)
│           ├── hooks/      # Lógica (useFetchUsers, useDeleteUser)
│           ├── pages/      # Vistas (UserListPage, UserProfilePage)
│           ├── types/      # Interfaces (User.ts, UserResponse.ts)
│           └── index.ts    # Punto de entrada del módulo
│
├── index.html       # Documento inicial
├── App.jsx             # Orquestador global y Providers
└── main.jsx            # Punto de entrada
