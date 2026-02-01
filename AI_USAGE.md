# AI Usage Report

This project was built with the assistance of an Agentic AI.

## AI Tools Used
- **Agentic Coding Assistant**: Used for project scaffolding, code generation, refactoring, and test writing.
- **Tools**:
    - `run_command`: To execute shell commands for project initialization, installing dependencies, and running tests.
    - `write_to_file` & `replace_file_content`: To create and modify source code files.
    - `view_file` & `list_dir`: To explore the codebase and filesystem.
    - `task_boundary`: To manage task context and progress.

## How AI Was Leveraged
1. **Scaffolding**: The AI used `@nestjs/cli` to generate the project structure and modules (`auth`, `users`, `tasks`).
2. **Implementation**:
    - Generated the `User` and `Task` entities with TypeORM decorators.
    - Implemented `AuthService` with JWT issuance and `bcrypt` hashing.
    - Implemented `TasksService` with CRUD logic.
    - Created DTOs with `class-validator` decorators (`CreateTaskDto`).
    - Implemented `JwtStrategy` and `RolesGuard` for security.
3. **Refactoring & Debugging**:
    - Identified missing dependencies (`passport-local`).
    - Debugged and fixed unit test failures related to `bcrypt` mocking by switching to `jest.mock`.
4. **Testing**:
    - Generated comprehensive unit tests for `AuthService` and `TasksService` covering success and failure scenarios.
5. **Documentation**:
    - Auto-generated `README.md` and this `AI_USAGE.md`.

## Quality Assurance
The AI ensured:
- **Clean Code**: Followed NestJS best practices (Dependency Injection, Modularization).
- **Robustness**: Added validation pipes and error handling (NotFoundException, UnauthorizedException).
- **Verification**: Verified the implementation with 10 passing unit tests.
