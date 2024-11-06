import json
from glob import glob
from shutil import copy, ignore_patterns

ICON_FILE_NAME = "icon.png"
ICON_INFO_FILE_NAME = "iconInfo.json"
ICON_INFO_JSON = {"0": {}, "1": {}, "2": {"templateId": "0"}}


def get_prop_name(fp):
    return fp.split("/")[-1].split(".")[0]


def write_icon_info_json(prop_name):
    with open(
        f"{prop_name}/icon/{ICON_INFO_FILE_NAME}", mode="w", encoding="utf-8"
    ) as write_file:
        json.dump(ICON_INFO_JSON, write_file)


def set_icon(icon_fp):
    prop_name = get_prop_name(icon_fp)
    copy(icon_fp, f"{prop_name}/icon/{ICON_FILE_NAME}", follow_symlinks=True)
    write_icon_info_json(prop_name)


def set_icons():
    icon_fps = list(glob("icons/*"))
    for icon_fp in icon_fps:
        set_icon(icon_fp)


def main():
    set_icons()


if __name__ == "__main__":
    main()
    print("Effect icons set")
