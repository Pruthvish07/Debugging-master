export interface ErrorTopic {
  id: string;
  title: string;
  description: string;
  example: string;
  category: 'Critical' | 'Logical' | 'Data' | 'Pythonic';
}

export const errorDatabase: ErrorTopic[] = [
  {
    id: "FE_001",
    title: "Syntax Error",
    category: "Critical",
    description: "Occurs when the code violates the grammatical rules of the programming language, making it impossible to parse.",
    example: "if True\n    print('Missing colon!')"
  },
  {
    id: "FE_002",
    title: "Run-time Error",
    category: "Critical",
    description: "An error that occurs while the program is running, often causing it to crash or terminate unexpectedly.",
    example: "result = 10 / 0  # ZeroDivisionError"
  },
  {
    id: "FE_003",
    title: "Semantic / Logic Error",
    category: "Logical",
    description: "The code runs without crashing but produces incorrect results due to a flaw in the programmer's logic.",
    example: "def area(r):\n    return 2 * 3.14 * r  # Should be r squared!"
  },
  {
    id: "FE_004",
    title: "Type Error",
    category: "Data",
    description: "Attempting to perform an operation on a data type that doesn't support it, like adding a string to an integer.",
    example: "total = 5 + '10'  # TypeError"
  },
  {
    id: "FE_005",
    title: "Indentation Error",
    category: "Pythonic",
    description: "A Python-specific error where the whitespace at the beginning of a line doesn't follow expected nesting rules.",
    example: "def hello():\nprint('Wrong indent!')"
  },
  {
    id: "FE_006",
    title: "Name Error (Not Defined)",
    category: "Critical",
    description: "Occurs when attempting to use a variable or function name that has not been defined in the current scope.",
    example: "print(my_variable)  # NameError: name not defined"
  },
  {
    id: "FE_007",
    title: "Index Error",
    category: "Data",
    description: "Happens when trying to access an element at an index that is outside the bounds of a list or sequence.",
    example: "my_list = [1, 2]\nprint(my_list[5])  # IndexError"
  },
  {
    id: "FE_008",
    title: "Key Error",
    category: "Data",
    description: "Raised when a dictionary key is not found in the set of existing keys.",
    example: "user = {'id': 1}\nprint(user['name'])  # KeyError"
  },
  {
    id: "FE_009",
    title: "Attribute Error",
    category: "Logical",
    description: "Occurs when an invalid attribute reference or assignment is attempted on an object.",
    example: "num = 10\nnum.append(5)  # AttributeError: 'int' has no append"
  }
];
