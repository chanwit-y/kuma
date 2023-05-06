#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


mod file;

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
fn go_mod_init(name: &str) {
    println!("{}", name);
    let project_path = format!("/Users/chanwityimneam/Desktop/Project/kuma/out/{}", name);
    println!("{}", project_path);
    file::create_folder(project_path.as_str().clone());
    // file::create_folder("/Users/chanwityimneam/Desktop/Project/kuma/out/beer");
    let go_mod_result = Command::new("go")
        .arg("mod")
        .arg("init")
        .arg(name)
        .current_dir(project_path)
        .status()
        .expect("failed to execute go mod init command");

    if go_mod_result.success() {
        println!("Initialized go module successfully");
    } else {
        println!("Failed to initialize go module");
    }
}
