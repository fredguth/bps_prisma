declare global {
  namespace App {
    interface Locals {
      auth: import("lucia").AuthRequest;
      user: import("lucia").User | undefined;
    }
  }
  namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type DatabaseUserAttributes = {
			id: string
			name: string
			email: string
			cpf: string
		}
		// type DatabaseSessionAttributes = {};
	}

  var __prisma: import("@prisma/client").PrismaClient;
}

export {};
