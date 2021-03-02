import { injectable } from "inversify";

import { Post } from "../../domain/model/Post/Post";
import { Project } from "../../domain/model/Project/project";
import { PostRepository } from "../../domain/repository/PostRepository";
import { resolveFileHandle } from "../../helpers/FileSystem/resolveFileHandle";

@injectable()
export class PostRepositoryImpl implements PostRepository {
  private async handleToPost(
    filepath: string,
    handle: FileSystemFileHandle
  ): Promise<Post> {
    const content = await (await handle.getFile()).text();
    return new Post(filepath, content);
  }
  async list(project: Project): Promise<PostRepository.ListResult> {
    const posts: Post[] = [];
    for await (const [, handle] of project.markdownDirectoryHandle.entries()) {
      if (handle.kind === "directory") {
        continue;
      }
      posts.push(await this.handleToPost(handle.name, handle));
    }
    return { success: true, posts };
  }
  async get(
    project: Project,
    filepath: string
  ): Promise<PostRepository.GetResult> {
    let fileHandle: FileSystemFileHandle;
    try {
      fileHandle = await resolveFileHandle(
        project.markdownDirectoryHandle,
        filepath
      );
    } catch {
      return { success: false, reason: "NO_SUCH_FILE" };
    }
    return {
      success: true,
      post: await this.handleToPost(filepath, fileHandle),
    };
  }
  async save(
    project: Project,
    post: Post,
    content: string
  ): Promise<PostRepository.SaveResult> {
    let fileHandle: FileSystemFileHandle;
    try {
      fileHandle = await resolveFileHandle(
        project.markdownDirectoryHandle,
        post.filepath
      );
    } catch {
      return { success: false, reason: "NO_SUCH_FILE" };
    }
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return { success: true };
  }
  async create(
    project: Project,
    filepath: string,
    content: string
  ): Promise<PostRepository.CreateResult> {
    let fileHandle: FileSystemFileHandle;
    try {
      fileHandle = await resolveFileHandle(
        project.markdownDirectoryHandle,
        filepath,
        {
          create: true,
        }
      );
    } catch {
      return { success: false, reason: "ALREADY_EXISTS" };
    }
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return { success: true };
  }
}
