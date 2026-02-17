backend/
│
├── src/
│   ├── config/
│   │     └── db.js
│   │
│   ├── models/
│   │     ├── User.js
│   │     ├── Board.js
│   │     ├── List.js
│   │     ├── Task.js
│   │     └── Activity.js
│   │
│   ├── controllers/
│   │     ├── auth.controller.js
│   │     ├── board.controller.js
│   │     ├── list.controller.js
│   │     └── task.controller.js
│   │
│   ├── routes/
│   │     ├── auth.routes.js
│   │     ├── board.routes.js
│   │     ├── list.routes.js
│   │     └── task.routes.js
│   │
│   ├── middleware/
│   │     ├── auth.middleware.js
│   │     └── error.middleware.js
│   │
│   ├── sockets/
│   │     └── socket.js
│   │
│   └── server.js
│
├── .env
└── package.json