"""This module provides the tes3automaton CLI."""
# tes3automaton/cli.py

from typing import Optional

import typer

from src import __app_name__, __version__
from src.commands import batch_img

app = typer.Typer()
app.add_typer(batch_img.app)

def _version_callback(value: bool) -> None:
    if value:
        typer.echo(f"{__app_name__} v{__version__}")
        raise typer.Exit()

@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help="Show the application's version and exit.",
        callback=_version_callback,
        is_eager=True,
    )
) -> None:
    return
