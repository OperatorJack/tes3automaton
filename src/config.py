import configparser
from pathlib import Path

import typer

from src import (
    DB_WRITE_ERROR, DIR_ERROR, FILE_ERROR, SUCCESS, __app_name__
)

APP_DIR_PATH = Path(typer.get_app_dir(__app_name__))
CONFIG_DIR_PATH = APP_DIR_PATH
CONFIG_FILE_PATH = CONFIG_DIR_PATH / "config.ini"

