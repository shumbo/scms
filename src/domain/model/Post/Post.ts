export class Post {
  public readonly filepath: string;
  public readonly content: string;
  public readonly lastModified: number;
  constructor(filepath: string, lastModified: number, content: string) {
    this.filepath = filepath;
    this.lastModified = lastModified;
    this.content = content;
  }
  static async init(
    filepath: string,
    handle: FileSystemFileHandle
  ): Promise<Post> {
    const file = await handle.getFile();
    const content = await file.text();
    return new Post(filepath, file.lastModified, content);
  }
}
