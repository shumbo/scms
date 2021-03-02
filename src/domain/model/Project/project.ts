export class Project {
  constructor(
    public readonly directoryHandle: FileSystemDirectoryHandle,
    public readonly markdownDirectoryHandle: FileSystemDirectoryHandle,
    public readonly assetDirectoryHandle: FileSystemDirectoryHandle,
    public readonly name: string,
    public readonly markdownDirectory: string,
    public readonly assetDirectory: string,
    public readonly assetServingPath: string
  ) {}
  toProjectConfig(): ProjectConfig {
    return {
      name: this.name,
      markdownDirectory: this.markdownDirectory,
      assetDirectory: this.assetDirectory,
      assetServingPath: this.assetServingPath,
    };
  }
}

export interface ProjectConfig {
  name: string;
  markdownDirectory: string;
  assetDirectory: string;
  assetServingPath: string;
}
