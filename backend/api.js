/**
 * TASK COLLABORATION APP - API DOCUMENTATION
 * Base URL: http://localhost:[PORT]/api
 * 
 * Authentication:
 * - Most endpoints require a JWT token in the Authorization header
 * - Header format: Authorization: Bearer <token>
 */

// =============================================================================
// AUTH ENDPOINTS
// =============================================================================

/**
 * POST /api/auth/register
 * @description User registration with email and password
 * @access Public
 * @body {
 *   name: string (required) - User's full name
 *   email: string (required) - User's email address
 *   password: string (required) - User's password
 * }
 * @returns {
 *   _id: string - User ID
 *   token: string - JWT token (valid for 7 days)
 * }
 * @example
 * POST /api/auth/register
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * Response: { "_id": "user123", "token": "eyJhbGc..." }
 */

/**
 * POST /api/auth/login
 * @description User login with credentials
 * @access Public
 * @body {
 *   email: string (required) - User's email address
 *   password: string (required) - User's password
 * }
 * @returns {
 *   _id: string - User ID
 *   token: string - JWT token (valid for 7 days)
 * }
 * @example
 * POST /api/auth/login
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * Response: { "_id": "user123", "token": "eyJhbGc..." }
 */

// =============================================================================
// BOARD ENDPOINTS
// =============================================================================

/**
 * POST /api/boards
 * @description Create a new board
 * @access Private (requires authentication)
 * @body {
 *   title: string (required) - Board name/title
 * }
 * @returns {
 *   _id: string - Board ID
 *   title: string - Board title
 *   owner: string - User ID of board creator
 *   members: [string] - Array of user IDs who are members
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 * @example
 * POST /api/boards
 * Headers: Authorization: Bearer <token>
 * {
 *   "title": "My Project Board"
 * }
 * Response: { "_id": "board123", "title": "My Project Board", "owner": "user123", ... }
 */

/**
 * GET /api/boards
 * @description Get all boards that the user is a member of
 * @access Private (requires authentication)
 * @query none
 * @returns [
 *   {
 *     _id: string - Board ID
 *     title: string - Board title
 *     owner: string - User ID of board creator
 *     members: [string] - Array of member user IDs
 *     createdAt: timestamp
 *     updatedAt: timestamp
 *   }
 * ]
 * @example
 * GET /api/boards
 * Headers: Authorization: Bearer <token>
 * Response: [{ "_id": "board123", "title": "My Project Board", ... }]
 */

/**
 * GET /api/boards/:boardId
 * @description Get detailed information about a specific board including its lists and tasks
 * @access Private (requires authentication)
 * @params {
 *   boardId: string (required) - Board ID
 * }
 * @returns {
 *   board: {
 *     _id: string - Board ID
 *     title: string - Board title
 *     owner: string - User ID of board creator
 *     members: [{
 *       _id: string - User ID
 *       name: string - User name
 *       email: string - User email
 *     }]
 *   },
 *   lists: [{
 *     _id: string - List ID
 *     title: string - List title
 *     boardId: string - Board ID
 *     position: number - Position order in board
 *     tasks: [{
 *       _id: string - Task ID
 *       title: string - Task title
 *       description: string - Task description
 *       listId: string - List ID it belongs to
 *       boardId: string - Board ID
 *       position: number - Position in list
 *       status: string - Task status
 *       assignedTo: string - User ID assigned to task
 *       createdAt: timestamp
 *       updatedAt: timestamp
 *     }]
 *   }]
 * }
 * @example
 * GET /api/boards/board123
 * Headers: Authorization: Bearer <token>
 * Response: { "board": {...}, "lists": [...] }
 */

// =============================================================================
// LIST ENDPOINTS
// =============================================================================

/**
 * POST /api/lists
 * @description Create a new list in a board
 * @access Private (requires authentication)
 * @body {
 *   title: string (required) - List name/title
 *   boardId: string (required) - Board ID the list belongs to
 *   position: number (optional) - Position order in board (defaults to next available)
 * }
 * @returns {
 *   _id: string - List ID
 *   title: string - List title
 *   boardId: string - Board ID
 *   position: number - Position in board
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 * @example
 * POST /api/lists
 * Headers: Authorization: Bearer <token>
 * {
 *   "title": "To Do",
 *   "boardId": "board123"
 * }
 * Response: { "_id": "list123", "title": "To Do", "boardId": "board123", ... }
 */

// =============================================================================
// TASK ENDPOINTS
// =============================================================================

/**
 * POST /api/tasks
 * @description Create a new task in a list
 * @access Private (requires authentication)
 * @body {
 *   title: string (required) - Task title
 *   description: string (optional) - Task description
 *   listId: string (required) - List ID the task belongs to
 *   boardId: string (required) - Board ID the task belongs to
 *   position: number (optional) - Position in list
 *   assignedTo: string (optional) - User ID to assign task to
 *   status: string (optional) - Task status (e.g., "todo", "in-progress", "done")
 * }
 * @returns {
 *   _id: string - Task ID
 *   title: string - Task title
 *   description: string - Task description
 *   listId: string - List ID
 *   boardId: string - Board ID
 *   position: number - Position in list
 *   assignedTo: string - Assigned user ID
 *   status: string - Task status
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 * @example
 * POST /api/tasks
 * Headers: Authorization: Bearer <token>
 * {
 *   "title": "Complete API documentation",
 *   "description": "Write API docs for frontend team",
 *   "listId": "list123",
 *   "boardId": "board123",
 *   "status": "todo"
 * }
 * Response: { "_id": "task123", "title": "Complete API documentation", ... }
 */

/**
 * GET /api/tasks/board/:boardId
 * @description Get all tasks for a specific board with pagination and search
 * @access Private (requires authentication)
 * @params {
 *   boardId: string (required) - Board ID
 * }
 * @query {
 *   page: number (optional) - Page number for pagination (default: 1)
 *   limit: number (optional) - Tasks per page (default: 20)
 *   search: string (optional) - Search query to filter tasks by title
 * }
 * @returns [
 *   {
 *     _id: string - Task ID
 *     title: string - Task title
 *     description: string - Task description
 *     listId: string - List ID
 *     boardId: string - Board ID
 *     position: number - Position
 *     assignedTo: string - Assigned user ID
 *     status: string - Task status
 *     createdAt: timestamp
 *     updatedAt: timestamp
 *   }
 * ]
 * @example
 * GET /api/tasks/board/board123?page=1&limit=20&search=bug
 * Headers: Authorization: Bearer <token>
 * Response: [{ "_id": "task123", "title": "Fix login bug", ... }]
 */

/**
 * PATCH /api/tasks/:id
 * @description Update an existing task
 * @access Private (requires authentication)
 * @params {
 *   id: string (required) - Task ID
 * }
 * @body {
 *   title: string (optional) - Updated task title
 *   description: string (optional) - Updated description
 *   status: string (optional) - Updated status
 *   assignedTo: string (optional) - Updated assignee
 *   position: number (optional) - Updated position
 * }
 * @returns {
 *   _id: string - Task ID
 *   title: string - Updated task title
 *   description: string - Updated description
 *   listId: string - List ID
 *   boardId: string - Board ID
 *   position: number - Position
 *   assignedTo: string - Assigned user ID
 *   status: string - Updated status
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 * @example
 * PATCH /api/tasks/task123
 * Headers: Authorization: Bearer <token>
 * {
 *   "status": "in-progress",
 *   "assignedTo": "user456"
 * }
 * Response: { "_id": "task123", "status": "in-progress", "assignedTo": "user456", ... }
 */

/**
 * DELETE /api/tasks/:id
 * @description Delete a task
 * @access Private (requires authentication)
 * @params {
 *   id: string (required) - Task ID
 * }
 * @returns {
 *   message: string - "Task deleted"
 * }
 * @example
 * DELETE /api/tasks/task123
 * Headers: Authorization: Bearer <token>
 * Response: { "message": "Task deleted" }
 */

/**
 * PATCH /api/tasks/move/:taskId
 * @description Move a task to a different list (used for drag-and-drop functionality)
 * @access Private (requires authentication)
 * @params {
 *   taskId: string (required) - Task ID to move
 * }
 * @body {
 *   sourceListId: string (required) - Current list ID
 *   destinationListId: string (required) - Target list ID
 *   newPosition: number (required) - New position in destination list
 * }
 * @returns {
 *   _id: string - Task ID
 *   title: string - Task title
 *   description: string - Task description
 *   listId: string - Updated list ID (destinationListId)
 *   boardId: string - Board ID
 *   position: number - Updated position
 *   assignedTo: string - Assigned user ID
 *   status: string - Task status
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 * @example
 * PATCH /api/tasks/move/task123
 * Headers: Authorization: Bearer <token>
 * {
 *   "sourceListId": "list123",
 *   "destinationListId": "list456",
 *   "newPosition": 2
 * }
 * Response: { "_id": "task123", "listId": "list456", "position": 2, ... }
 */

// =============================================================================
// ACTIVITY ENDPOINTS
// =============================================================================

/**
 * GET /api/activities/:boardId
 * @description Get all activities/logs for a specific board
 * @access Private (requires authentication)
 * @params {
 *   boardId: string (required) - Board ID
 * }
 * @returns [
 *   {
 *     _id: string - Activity ID
 *     user: {
 *       _id: string - User ID
 *       name: string - User name
 *     },
 *     action: string - Action performed (e.g., "created task", "updated task", "deleted task", "moved task")
 *     taskId: string - Task ID (if applicable)
 *     boardId: string - Board ID
 *     createdAt: timestamp
 *   }
 * ]
 * @example
 * GET /api/activities/board123
 * Headers: Authorization: Bearer <token>
 * Response: [
 *   {
 *     "_id": "activity123",
 *     "user": { "_id": "user123", "name": "John Doe" },
 *     "action": "created task",
 *     "taskId": "task123",
 *     "boardId": "board123",
 *     "createdAt": "2024-02-17T10:30:00Z"
 *   }
 * ]
 */

// =============================================================================
// REAL-TIME FEATURES (WebSocket/Socket.io)
// =============================================================================

/**
 * SOCKET EVENTS
 * 
 * Connection & Rooms:
 * - Join a board room to receive real-time updates
 * - Event: socket.emit("joinBoard", boardId)
 * 
 * Emitted Events (Listen for these on the frontend):
 * - "taskCreated": Task was created in the board
 *   Data: { _id, title, description, listId, boardId, position, ... }
 * 
 * - "taskUpdated": Task was updated
 *   Data: { _id, title, description, status, assignedTo, ... }
 * 
 * - "taskMoved": Task was moved to a different list
 *   Data: { _id, title, listId, position, ... }
 * 
 * - "taskDeleted": Task was deleted
 *   Data: taskId (just the ID string)
 * 
 * @example Frontend initialization
 * const socket = io("http://localhost:5000");
 * socket.emit("joinBoard", "board123");
 * 
 * socket.on("taskCreated", (task) => {
 *   console.log("New task created:", task);
 * });
 * 
 * socket.on("taskUpdated", (task) => {
 *   console.log("Task updated:", task);
 * });
 * 
 * socket.on("taskMoved", (task) => {
 *   console.log("Task moved:", task);
 * });
 * 
 * socket.on("taskDeleted", (taskId) => {
 *   console.log("Task deleted:", taskId);
 * });
 */

// =============================================================================
// ERROR RESPONSES
// =============================================================================

/**
 * All endpoints may return error responses with appropriate HTTP status codes:
 * 
 * 400 Bad Request
 * { "message": "Error description" }
 * 
 * 401 Unauthorized
 * { "message": "Invalid credentials" } or { "message": "Invalid token" }
 * 
 * 404 Not Found
 * { "message": "Resource not found" }
 * 
 * 500 Internal Server Error
 * { "error": "Error description" }
 */

// =============================================================================
// FRONTEND SETUP EXAMPLE
// =============================================================================

/**
 * Example of how to use these endpoints in a frontend:
 * 
 * 1. Register or Login:
 *    POST /api/auth/register or POST /api/auth/login
 *    Store the returned token in localStorage
 * 
 * 2. Fetch all boards:
 *    GET /api/boards
 *    Include token in Authorization header
 * 
 * 3. Get board details with lists and tasks:
 *    GET /api/boards/:boardId
 *    Include token in Authorization header
 * 
 * 4. Create a new task:
 *    POST /api/tasks
 *    Include token in header and task data in body
 * 
 * 5. Update task status or other fields:
 *    PATCH /api/tasks/:taskId
 *    Include token in header
 * 
 * 6. Drag and drop task to new list:
 *    PATCH /api/tasks/move/:taskId
 *    Include source, destination, and position info
 * 
 * 7. Real-time updates:
 *    Connect to socket.io and emit "joinBoard" event
 *    Listen to socket events for auto-updates
 * 
 * 8. Track activities:
 *    GET /api/activities/:boardId
 *    See what actions users performed
 */

export const API_DOCUMENTATION = {
  version: "1.0.0",
  baseUrl: "http://localhost:[PORT]/api",
  description: "Task Collaboration Application API"
};

{/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap" rel="stylesheet"></link> */}