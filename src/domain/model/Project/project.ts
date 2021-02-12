export class Project {
  constructor(
    public readonly name: string,
    public readonly markdownDirectory: string,
    public readonly assetDirectory: string,
    public readonly assetServingPath: string
  ) {}
}
