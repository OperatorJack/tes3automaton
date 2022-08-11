import { invoke } from "@tauri-apps/api/tauri";

/**
 * Get all files under `path` whos extensions are present in `extensions`.
 *
 * This function is recursive and will include files in nested subfolders.
 */
export async function collectFiles(
    path: string,
    extensions: string[]
): Promise<string[]> {
    return invoke("collect_files", { path, extensions });
}
