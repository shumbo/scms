export class Post {
  public readonly filepath: string;
  public readonly content: string;
  constructor(filepath: string, content: string) {
    this.filepath = filepath;
    this.content = content;
  }
}
