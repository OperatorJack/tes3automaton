#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod lib;
use lib::iter_files;

mod respec;
use respec::RespecCommand;

#[tauri::command]
fn collect_files(path: String, extensions: Vec<String>) -> Vec<String> {
    iter_files(&path, &extensions)
        .filter_map(|path| path.into_os_string().into_string().ok())
        .collect()
}

#[tauri::command]
fn respec_execute(command: RespecCommand) -> Vec<String> {
    command.execute()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![collect_files, respec_execute])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
