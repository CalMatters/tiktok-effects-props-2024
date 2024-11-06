from shutil import copytree, ignore_patterns

PROPS = [
    "prop2",
    "prop3",
    "prop4",
    "prop5",
    "prop6",
    "prop32",
    "prop33",
    "prop34",
    "prop35",
    "prop36",
]

for prop in PROPS:
    copytree(
        f"./{prop}/Assets/",
        f"assets/{prop}",
        ignore=ignore_patterns("*.extra", "Subgraphs", "*.scene", "language.json"),
        dirs_exist_ok=True,
    )
