from pathlib import Path
from typing import Optional
from wand.image import Image, COMPRESSION_TYPES

import typer

from src import ERRORS, __app_name__, __version__
from src import config
app = typer.Typer()

COMPRESSION_TYPES_STR = ', '.join(COMPRESSION_TYPES)
def complete_compression_type(incomplete: str):
    for txt in COMPRESSION_TYPES:
        if txt.startswith(incomplete):
            yield (txt)

ALLOWED_IMAGE_FORMATS = ["dds", "bmp", "tga", "png"]
ALLOWED_IMAGE_FORMATS_STR = ', '.join(ALLOWED_IMAGE_FORMATS)
def complete_image_format(incomplete: str):
    for txt in ALLOWED_IMAGE_FORMATS:
        if txt.startswith(incomplete):
            yield (txt)

@app.command()
def batch_img(
    from_directory_path: str = typer.Option(
        str(config.APP_DIR_PATH),
        "--from-path",
        "-fp",
        prompt="Directory path containing input files?",
    ),
    from_format: str = typer.Option(
        "",
        "--from-format",
        "-f",
        prompt="From format type (dds, tga, bmp, png)?",
        help=ALLOWED_IMAGE_FORMATS_STR,
        autocompletion=complete_image_format
    ),
    to_directory_path: str = typer.Option(
        str(config.APP_DIR_PATH),
        "--to-path",
        "-tp",
        prompt="Directory path to save output files?",
    ),
    to_format: str = typer.Option(
        "",
        "--to-format",
        "-t",
        prompt="To format type (dds, tga, bmp, png)?",
        help=ALLOWED_IMAGE_FORMATS_STR,
        autocompletion=complete_image_format
    ),
    compression: Optional[str] = typer.Option(
        "",
        "--compression",
        "-c",
        prompt="To format compression?",
        help=COMPRESSION_TYPES_STR,
        autocompletion=complete_compression_type,
        
    ),
    auto_compression: str = typer.Option(
        True,
        "--auto-compression",
        "-ac",
        prompt="Use auto compression?",
        help="If enabled, the image will be searched for alpha channels and an appropriate compression is determined for the output iamge format.",
    ),
) -> None:
    """Convert the images in directory_path from from_format to to_format."""
    to_path_obj = Path(to_directory_path)
    if (not to_path_obj.is_dir()):
        to_path_obj.mkdir(parents = True, exist_ok=True)
        typer.secho(f"Created directory {to_directory_path}")

    typer.secho(f"Searching for images in {from_directory_path}")

    from_files = Path(from_directory_path).glob(f"*.{from_format}")

    convert_count = 0
    for from_file in from_files:
        with Image(filename=from_file) as img:
            selected_compression = compression
            if (auto_compression):
                is_alpha = img.alpha_channel
                if (is_alpha):
                    if (to_format == "dds"):
                        selected_compression = "dxt5"
                    else:
                        selected_compression = "dxt1"
            else:
                img.compression = selected_compression

            base_file = from_file.stem
            to_file = f"{to_directory_path}\\{base_file}.{to_format}"
            img.save(filename=to_file)
            
            convert_count += 1
            typer.secho(f"Converted {from_file} -> {to_file} (Compression: {selected_compression})")
    
    
    typer.secho()
    typer.secho(f"Converted {convert_count} images")
    typer.secho(f"Done!")

    pass