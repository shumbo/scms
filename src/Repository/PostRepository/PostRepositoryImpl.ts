import { injectable } from "inversify";

import { Post } from "../../domain/model/Post/Post";
import { Project } from "../../domain/model/Project/project";
import { PostRepository } from "../../domain/repository/PostRepository";
import { listFiles } from "../../helpers/FileSystem/listFiles";
import { resolveFileHandle } from "../../helpers/FileSystem/resolveFileHandle";

@injectable()
export class PostRepositoryImpl implements PostRepository {
  private async handleToPost(
    filepath: string,
    handle: FileSystemFileHandle
  ): Promise<Post> {
    return Post.init(filepath, handle);
  }
  async list(project: Project): Promise<PostRepository.ListResult> {
    const files = await listFiles(project.markdownDirectoryHandle);
    const posts = await Promise.all(
      files
        .filter((e) => !e.handle.name.startsWith("."))
        .map((e) => this.handleToPost(e.path, e.handle))
    );
    return {
      success: true,
      posts: posts.sort((a, b) => b.lastModified - a.lastModified),
    };
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
