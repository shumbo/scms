import { injectable } from "inversify";
import { set, get } from "idb-keyval";

import { CONFIG_FILE_NAME } from "../../constants/files";
import { Project } from "../../domain/model/Project/project";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { IDB_DIRECTORY_HANDLE_KEY } from "../../constants/idb";
import { Post } from "../../domain/model/Post/Post";
import { resolveDirectoryHandle } from "../../helpers/FileSystem/resolveFileHandle";

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
  async getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult> {
    if (!this.dh) {
      const savedDh = await get<FileSystemDirectoryHandle>(
        IDB_DIRECTORY_HANDLE_KEY
      );
      if (!savedDh) {
        return { success: false, reason: "NO_SAVED_DIRECTORY" };
      }
      this.dh = savedDh;
    }
    if (!this.currentProject) {
      const projectResult = await this.loadProjectFromDirectoryHandle(this.dh);
      if (!projectResult.success) {
        return projectResult;
      }
      this.currentProject = projectResult.project;
    }
    return { success: true, project: this.currentProject };
  }
  async listPost(): Promise<ProjectRepository.ListPostResult> {
    if (!this.dh || !this.currentProject) {
      return { success: false, reason: "NO_OPENED_PROJECT" };
    }
    let markdownDh: FileSystemDirectoryHandle;
    try {
      markdownDh = await resolveDirectoryHandle(
        this.dh,
        this.currentProject.markdownDirectory
      );
    } catch {
      return { success: false, reason: "NO_MARKDOWN_DIRECTORY" };
    }
    const posts: Post[] = [];
    for await (const [name] of markdownDh.entries()) {
      posts.push(new Post(name));
    }
    return { success: true, posts };
  }
  /**
   * Load Project from DirectoryHandle
   * @param dh DirectoryHandle from which load config file
   * @returns Project or Error with Reason
   */
  private async loadProjectFromDirectoryHandle(
    dh: FileSystemDirectoryHandle
  ): Promise<
    | { success: true; project: Project }
    | { success: false; reason: "INVALID_CONFIG_FILE" }
    | { success: false; reason: "NO_CONFIG_FILE"; directoryName: string }
  > {
    if ((await dh.queryPermission({ mode: "readwrite" })) !== "granted") {
      const result = await dh.requestPermission({ mode: "readwrite" });
      if (result !== "granted") {
        throw new Error();
      }
    }
    let configText: string;
    try {
      const config = await dh.getFileHandle(CONFIG_FILE_NAME);
      const file = await config.getFile();
      configText = await file.text();
    } catch {
      return {
        success: false,
        reason: "NO_CONFIG_FILE",
        directoryName: dh.name,
      };
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
  async open(): Promise<ProjectRepository.OpenResult> {
    let dh: FileSystemDirectoryHandle;
    try {
      dh = await window.showDirectoryPicker();
    } catch {
      return { success: false, reason: "NO_DIRECTORY_SELECTED" };
    }
    this.dh = dh;
    const result = await this.loadProjectFromDirectoryHandle(this.dh);
    if (result.success) {
      await set(IDB_DIRECTORY_HANDLE_KEY, dh);
    }
    return result;
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
