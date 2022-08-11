use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

pub fn iter_files<P, E>(path: P, extensions: &[E]) -> impl Iterator<Item = PathBuf> + '_
where
    P: AsRef<Path>,
    E: AsRef<OsStr>,
{
    WalkDir::new(path).into_iter().filter_map(move |entry| {
        let path = entry.ok()?.into_path();
        let extension = path.extension()?;
        extensions
            .iter()
            .find(|e| extension.eq_ignore_ascii_case(e))?;
        Some(path)
    })
}
