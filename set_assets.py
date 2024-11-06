from shutil import copytree, ignore_patterns
from set_icons import set_icons

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


def set_assets():
    for prop in PROPS:
        copytree(
            f"assets/{prop}",
            f"./{prop}/Assets/",
            ignore=ignore_patterns("*.extra"),
            dirs_exist_ok=True,
        )
    set_icons()


def main():
    set_assets()


if __name__ == "__main__":
    main()
