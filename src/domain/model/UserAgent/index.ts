import bowser from "bowser";

export class UserAgent {
  public readonly ua: string;
  private parser: bowser.Parser.Parser;
  constructor(ua: string) {
    this.ua = ua;
    this.parser = bowser.getParser(this.ua);
  }
  get supportFileSystemAccessAPI(): boolean {
    return (
      this.parser.satisfies({
        desktop: {
          chrome: ">=86",
        },
      }) ?? false
    );
  }
}
