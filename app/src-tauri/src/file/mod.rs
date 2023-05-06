
// pub use file::create_folder;


use std::fs;

pub fn create_folder(path: &str) -> std::io::Result<()> {
    fs::create_dir(path)?;
    Ok(())
}