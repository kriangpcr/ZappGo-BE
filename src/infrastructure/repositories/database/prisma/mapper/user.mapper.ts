import { User } from '@domain/model';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  public static toPrisma(user: Partial<User>): PrismaUser {
    return {
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      prefix: user.prefix,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      phone: user.phone,
    };
  }

  public static toDomain(user: PrismaUser): User {
    if (!user) return null;
    return User.reconstitute(user);
  }
}
