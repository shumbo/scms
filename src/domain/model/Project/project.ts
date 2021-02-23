export class Project<T = FileSystemDirectoryHandle> {
  constructor(
    public readonly directoryHandle: T,
    public readonly name: string,
    public readonly markdownDirectory: string,
    public readonly assetDirectory: string,
    public readonly assetServingPath: string
  ) {}
}
