#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]



pub mod file;

use std::process::Command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![go_mod_init])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn go_mod_init() {
    let go_mod_result = Command::new("go")
        .arg("mod")
        .arg("init")
        .arg("output")
        .current_dir("/Users/chanwityimneam/Desktop/Project/kuma/out")
        .status()
        .expect("failed to execute go mod init command");

    if go_mod_result.success() {
        println!("Initialized go module successfully");
    } else {
        println!("Failed to initialize go module");
    }
}
