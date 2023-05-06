mod file {
    use std::fs;

    pub fn create_folder(path: &str) -> std::io::Result<()> {
        fs::create_dir(path)?;
        Ok(())
    }
}
