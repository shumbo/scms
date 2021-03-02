import { Project } from "../model/Project/project";

export interface MarkdownService {
  render(project: Project, originalText: string): Promise<string>;
}
