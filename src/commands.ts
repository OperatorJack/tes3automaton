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

export interface RespecCommand {
    rootDir: string;
    searchFor: string;
    replaceWith: string;
    useRegex: boolean;
    caseSensitive: boolean;
    previewOnly: boolean;
}

export async function respec(command: RespecCommand): Promise<string[]> {
    return invoke("respec_execute", { command });
}
