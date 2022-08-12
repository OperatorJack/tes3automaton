use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RespecCommand {
    pub root_dir: String,
    pub search_for: String,
    pub replace_with: String,
    pub use_regex: bool,
    pub case_sensitive: bool,
    pub preview_only: bool,
}

impl RespecCommand {
    pub fn execute(self) -> Vec<String> {
        vec![format!("Execute: {self:?}")]
    }
}
