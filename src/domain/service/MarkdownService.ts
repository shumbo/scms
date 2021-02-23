export interface MarkdownService {
  render(originalText: string): Promise<string>;
}
