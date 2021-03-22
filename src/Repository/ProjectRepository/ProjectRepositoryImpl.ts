import { injectable } from "inversify";
import { set, get } from "idb-keyval";

import { CONFIG_FILE_NAME } from "../../constants/files";
import { Project, ProjectConfig } from "../../domain/model/Project/project";
import { ProjectRepository } from "../../domain/repository/ProjectRepository";
import { IDB_DIRECTORY_HANDLE_KEY } from "../../constants/idb";
import { resolveDirectoryHandle } from "../../helpers/FileSystem/resolveDirectoryHandle";

function encodeProject(project: ProjectConfig): string {
  return JSON.stringify({
    name: project.name,
    "markdown-directory": project.markdownDirectory,
    "asset-directory": project.assetDirectory,
    "asset-serving-path": project.assetServingPath,
  });
}

function decodeProject(str: string): ProjectConfig {
  // TODO: Object validation
  const obj = JSON.parse(str);
  return {
    name: obj.name,
    markdownDirectory: obj["markdown-directory"],
    assetDirectory: obj["asset-directory"],
    assetServingPath: obj["asset-serving-path"],
  };
}

@injectable()
export class ProjectRepositoryImpl implements ProjectRepository {
  private currentProject: Project | null = null;

  /**
   * Load Project from DirectoryHandle
   * @param dh DirectoryHandle from which load config file
   * @returns Project or Error with Reason
   */
  private async loadProjectFromDirectoryHandle(
    dh: FileSystemDirectoryHandle
  ): Promise<
    | { success: true; project: Project }
    | {
        success: false;
        reason:
          | "INVALID_CONFIG_FILE"
          | "NO_MARKDOWN_DIRECTORY"
          | "NO_ASSET_DIRECTORY";
      }
    | {
        success: false;
        reason: "NO_CONFIG_FILE";
        directoryHandle: FileSystemDirectoryHandle;
      }
  > {
    if ((await dh.queryPermission({ mode: "readwrite" })) !== "granted") {
      const result = await dh.requestPermission({ mode: "readwrite" });
      if (result !== "granted") {
        throw new Error();
      }
    }
    let configText: string;
    try {
      const configFile = await dh.getFileHandle(CONFIG_FILE_NAME);
      const file = await configFile.getFile();
      configText = await file.text();
    } catch {
      return {
        success: false,
        reason: "NO_CONFIG_FILE",
        directoryHandle: dh,
      };
    }

    let config: ProjectConfig;
    try {
      config = decodeProject(configText);
    } catch (e) {
      return { success: false, reason: "INVALID_CONFIG_FILE" };
    }

    let markdownDh: FileSystemDirectoryHandle;
    try {
      markdownDh = await resolveDirectoryHandle(dh, config.markdownDirectory);
    } catch {
      return { success: false, reason: "NO_MARKDOWN_DIRECTORY" };
    }
    let assetDh: FileSystemDirectoryHandle;
    try {
      assetDh = await resolveDirectoryHandle(dh, config.assetDirectory);
    } catch {
      return { success: false, reason: "NO_ASSET_DIRECTORY" };
    }
    const project: Project = new Project(
      dh,
      markdownDh,
      assetDh,
      config.name,
      config.markdownDirectory,
      config.assetDirectory,
      config.assetServingPath
    );

    this.currentProject = project;
    return { success: true, project };
  }

  async getCurrentProject(): Promise<ProjectRepository.GetCurrentProjectResult> {
    if (!this.currentProject) {
      const savedDh = await get<FileSystemDirectoryHandle>(
        IDB_DIRECTORY_HANDLE_KEY
      );
      if (!savedDh) {
        return { success: false, reason: "NO_SAVED_DIRECTORY" };
      }
      const projectResult = await this.loadProjectFromDirectoryHandle(savedDh);
      if (!projectResult.success) {
        return projectResult;
      }
      this.currentProject = projectResult.project;
    }
    return { success: true, project: this.currentProject };
  }

  async open(): Promise<ProjectRepository.OpenResult> {
    let dh: FileSystemDirectoryHandle;
    try {
      dh = await window.showDirectoryPicker();
    } catch {
      return { success: false, reason: "NO_DIRECTORY_SELECTED" };
    }
    const result = await this.loadProjectFromDirectoryHandle(dh);
    if (result.success) {
      await set(IDB_DIRECTORY_HANDLE_KEY, dh);
    }
    return result;
  }

  async create(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectRepository.CreateResult> {
    let fh: FileSystemFileHandle;
    try {
      fh = await dh.getFileHandle(CONFIG_FILE_NAME, { create: true });
    } catch {
      return { success: false, reason: "ERROR_CREATE_FILE" };
    }
    let markdownDh: FileSystemDirectoryHandle;
    try {
      markdownDh = await resolveDirectoryHandle(dh, config.markdownDirectory);
    } catch {
      return { success: false, reason: "NO_MARKDOWN_DIRECTORY" };
    }
    let assetDh: FileSystemDirectoryHandle;
    try {
      assetDh = await resolveDirectoryHandle(dh, config.assetDirectory);
    } catch {
      return { success: false, reason: "NO_ASSET_DIRECTORY" };
    }
    const writable = await fh.createWritable();
    await writable.write(encodeProject(config));
    await writable.close();
    this.currentProject = new Project(
      dh,
      markdownDh,
      assetDh,
      config.name,
      config.markdownDirectory,
      config.assetDirectory,
      config.assetServingPath
    );
    return { success: true, project: this.currentProject };
  }

  async update(
    dh: FileSystemDirectoryHandle,
    config: ProjectConfig
  ): Promise<ProjectRepository.UpdateResult> {
    let fh: FileSystemFileHandle;
    try {
      fh = await dh.getFileHandle(CONFIG_FILE_NAME, { create: false });
    } catch {
      return { success: false, reason: "ERROR_UPDATE_FILE" };
    }
    let markdownDh: FileSystemDirectoryHandle;
    try {
      markdownDh = await resolveDirectoryHandle(dh, config.markdownDirectory);
    } catch {
      return { success: false, reason: "NO_MARKDOWN_DIRECTORY" };
    }
    let assetDh: FileSystemDirectoryHandle;
    try {
      assetDh = await resolveDirectoryHandle(dh, config.assetDirectory);
    } catch {
      return { success: false, reason: "NO_ASSET_DIRECTORY" };
    }
    const writable = await fh.createWritable();
    await writable.write(encodeProject(config));
    await writable.close();
    this.currentProject = new Project(
      dh,
      markdownDh,
      assetDh,
      config.name,
      config.markdownDirectory,
      config.assetDirectory,
      config.assetServingPath
    );
    return { success: true, project: this.currentProject };
  }

  close(): void {
    this.currentProject = null;
  }

  async hasOpenedProject(): Promise<boolean> {
    if (this.currentProject) {
      return true;
    }
    const savedDh = await get<FileSystemDirectoryHandle>(
      IDB_DIRECTORY_HANDLE_KEY
    );
    return !!savedDh;
  }
}
