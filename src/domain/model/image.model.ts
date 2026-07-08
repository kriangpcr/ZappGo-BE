export interface ImageProps {
  id?: string;
  file_name: string;
  bucket: string;
  mime_type: string;
  size: number;
  path: string;
  public_url: string;
  created_at: Date;
}

export class Image {
  readonly id?: string;
  readonly file_name: string;
  readonly bucket: string;
  readonly mime_type: string;
  readonly size: number;
  readonly path: string;
  readonly public_url: string;
  readonly created_at: Date;

  private constructor(props: ImageProps) {
    this.id = props.id;
    this.file_name = props.file_name;
    this.bucket = props.bucket;
    this.mime_type = props.mime_type;
    this.size = props.size;
    this.path = props.path;
    this.public_url = props.public_url;
    this.created_at = props.created_at;
  }

  static create(props: Omit<ImageProps, 'created_at'>): Image {
    return new Image({
      ...props,
      created_at: new Date(),
    });
  }

  static reconstitute(props: ImageProps): Image {
    return new Image(props);
  }
}
