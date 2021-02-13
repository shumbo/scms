import { injectable } from "inversify";

import { CONFIG_FILE_NAME } from "../../constants/files";
import { Project } from "../../domain/model/Project/project";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";

function encodeProject(project: Project): string {
  return JSON.stringify({
    name: project.name,
    "markdown-directory": project.markdownDirectory,
    "asset-directory": project.assetDirectory,
    "asset-serving-path": project.assetServingPath,
  });
}

function decodeProject(str: string): Project {
  const obj = JSON.parse(str);
  return new Project(
    obj.name,
    obj["markdown-directory"],
    obj["asset-directory"],
    obj["asset-serving-path"]
  );
}

@injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  private currentProject: Project | null = null;
  private dh: FileSystemDirectoryHandle | null = null;
  async open(): Promise<ProjectRepository.OpenResult> {
    let dh: FileSystemDirectoryHandle;
    try {
      dh = await window.showDirectoryPicker();
    } catch {
      return { success: false, reason: "NO_DIRECTORY_SELECTED" };
    }
    this.dh = dh;
    let configText: string;
    try {
      const config = await dh.getFileHandle(CONFIG_FILE_NAME);
      const file = await config.getFile();
      configText = await file.text();
    } catch {
      return { success: false, reason: "NO_CONFIG_FILE" };
    }
    let project: Project;
    try {
      project = decodeProject(configText);
    } catch (e) {
      return { success: false, reason: "INVALID_CONFIG_FILE" };
    }
    this.currentProject = project;
    return { success: true, project };
  }
  async create(project: Project): Promise<ProjectRepository.CreateResult> {
    if (!this.dh) {
      return { success: false, reason: "NO_OPENED_DIRECTORY" };
    }
    const dh = this.dh;
    let fh: FileSystemFileHandle;
    try {
      fh = await dh.getFileHandle(CONFIG_FILE_NAME, { create: true });
    } catch {
      return { success: false, reason: "ERROR_CREATE_FILE" };
    }
    const writable = await fh.createWritable();
    await writable.write(encodeProject(project));
    await writable.close();
    this.currentProject = project;
    return { success: true };
  }
}
