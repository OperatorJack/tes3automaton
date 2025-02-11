# tes3automaton

A CLI tool for automating some repetitive modding actions in TES III: Morrowind. Although intended to be used for Morrowind, some features can be used more generally.

## Requirements

- ImageMagick must be installed on your computer.
- Python 3.12

## Installation

The CLI is not currently published or installable. You must run it locally through python.

- Navigate to the directory containing this README in your terminal.
- Run `.\.venv\Scripts\Activate.ps1` or the appropriate command for your OS to activate the Python virtual environment.
- Run `pip install -r .\requirements.txt` to install the project dependencies.

You can now run the CLI. Try to run it with `python -m src --help`.

## Commands

### batch-img

Allows batch conversion of images between Morrowind image formats and PNG format. This can be used to easily convert large number of textures between DDS, BMP, TGA, and PNG formats. Some potential uses include updating your mods textures to all use DDS format, changing compression levels, or converting textures to PNG to use with AI upscalers.

ex. usage:

```
python -m src batch-img -tp "D:\Morrowind-Tools\tes3automaton-working\input" -f "png" -fp "D:\Morrowind-Tools\tes3automaton-working\output" -t "dds" -c "dxt5"
```

Use `tes3automaton batch-img --help` for more information.
