import { Image } from '@domain/model';
import { Image as PrismaImage } from '@prisma/client';

export class PrismaImageMapper {
  public static toPrisma(image: Partial<Image>): PrismaImage {
    return {
      id: image.id,
      file_name: image.file_name,
      bucket: image.bucket,
      mime_type: image.mime_type,
      size: image.size,
      path: image.path,
      public_url: image.public_url,
      created_at: image.created_at,
    };
  }

  public static toDomain(image: PrismaImage): Image {
    if (!image) return null;
    return Image.reconstitute(image);
  }
}
