from shutil import copytree, ignore_patterns
import json

PROPS = [
    "prop2",
    "prop3",
    "prop4",
    "prop5",
    "prop6",
    "prop32",
    "prop33",
    "prop35",
    "prop36",
    # "prop34",
]
PROP_32_N_QUESTIONS = 4
PROP_34_N_QUESTIONS = 1

PROP_3_OPTION_VALUES = [[1, -1, 0], [1, -1, 0], [-1, 1, 0], [0, 0, 0]]
PROP_6_OPTION_VALUES = [[-1, 1, 0], [1, -1, 0], [1, -1, 0], [0, 0, 0]]
PROP_35_OPTION_VALUES = [[1, -1, 0], [1, -1, 0], [-1, 1, 0], [0, 0, 0]]


def generate_port_value_numbers_obj(option_value_nums):
    return {
        "type": "Number",
        "value": [{"type": "Number", "value": value} for value in option_value_nums],
    }


def write_graph_file(fp, json_obj):
    with open(fp, mode="w", encoding="utf-8") as write_file:
        json.dump(json_obj, write_file)


def set_n_questions(prop, n_questions):
    effect_graph_file = f"{prop}/Graph/graph.json"
    with open(effect_graph_file, mode="r", encoding="utf-8") as read_file:
        effect_graph = json.load(read_file)
        graph_node_list = effect_graph["containers"][0]["graph"]["nodeList"]
        for node in graph_node_list:
            if node["name"] == "Check quiz completion":
                subgraph_node_list = node["subContainer"]["graph"]["nodeList"]
                for node in subgraph_node_list:
                    if node["name"] == "n_questions":
                        node["variable"]["initialValue"] = n_questions

        write_graph_file(effect_graph_file, effect_graph)


def set_option_values(prop, option_values):
    effect_graph_file = f"{prop}/Graph/graph.json"
    with open(effect_graph_file, mode="r", encoding="utf-8") as read_file:
        effect_graph = json.load(read_file)
        graph_node_list = effect_graph["containers"][0]["graph"]["nodeList"]
        for node in graph_node_list:
            if node["name"] == "Set options":
                node["inputPorts"][2]["portValue"] = generate_port_value_numbers_obj(
                    option_values.pop(0)
                )
            if node["name"] == "Next question":
                subgraph_node_list = node["subContainer"]["graph"]["nodeList"]
                for node in subgraph_node_list:
                    if node["name"] == "Set options":
                        node["inputPorts"][2]["portValue"] = (
                            generate_port_value_numbers_obj(option_values.pop(0))
                        )

        write_graph_file(effect_graph_file, effect_graph)


for prop in PROPS:
    copytree("./effect-template", f"{prop}/")


set_n_questions("prop32", PROP_32_N_QUESTIONS)
# set_n_questions("prop34", PROP_34_N_QUESTIONS)

set_option_values("prop3", PROP_3_OPTION_VALUES)
set_option_values("prop6", PROP_6_OPTION_VALUES)
set_option_values("prop35", PROP_35_OPTION_VALUES)
print("REMINDER: Remember to edit prop 34")