export interface Problem {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  code: string;
  language: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hint: string;
}

export const problems: Problem[] = [
  // 4 Beginner
  {
    id: 1,
    title: "Case Sensitivity",
    difficulty: "Beginner",
    language: "python",
    code: `var = 10\nprint(VAR)`,
    options: [
      "'10'",
      "'var'",
      "NameError",
      "SyntaxError"
    ],
    correctOptionIndex: 2,
    explanation: "In Python, variable names are fiercely case-sensitive. `VAR` is treated as completely distinct from `var` and raises a NameError since it is not defined.",
    hint: "Python is case-sensitive. Is `var` identical to `VAR` in memory?"
  },
  {
    id: 2,
    title: "Type Concatenation",
    difficulty: "Beginner",
    language: "python",
    code: `age = 25\nprint("I am " + age)`,
    options: [
      "'I am 25'",
      "TypeError",
      "ValueError",
      "SyntaxError"
    ],
    correctOptionIndex: 1,
    explanation: "Python strongly types its variables and does not implicitly cast an integer to a string during addition. You must explicitly cast it using `str(age)` or use f-strings to avoid a TypeError.",
    hint: "Can you directly add a string and an integer together in a strongly-typed language?"
  },
  {
    id: 3,
    title: "List Boundary Bounds",
    difficulty: "Beginner",
    language: "python",
    code: `colors = ['red', 'blue', 'green']\nprint(colors[3])`,
    options: [
      "'green'",
      "None",
      "IndexError",
      "SyntaxError"
    ],
    correctOptionIndex: 2,
    explanation: "The valid indices for a list of length 3 are 0, 1, and 2. Attempting to access an index outside of this range directly raises an IndexError (list index out of range).",
    hint: "Lists in Python are zero-indexed. How many elements exist, and what are their indices?"
  },
  {
    id: 4,
    title: "Block Definitions",
    difficulty: "Beginner",
    language: "python",
    code: `def say_hello():\nprint("Hello")`,
    options: [
      "'Hello'",
      "None",
      "IndentationError",
      "NameError"
    ],
    correctOptionIndex: 2,
    explanation: "Unlike languages that use curly braces, Python relies strictly on leading whitespace indentation to define scope. A lack of indent inside a function definition halts parsing and raises an IndentationError.",
    hint: "How does Python determine what code belongs inside a function?"
  },
  
  // 4 Intermediate
  {
    id: 5,
    title: "Missing Map Keys",
    difficulty: "Intermediate",
    language: "python",
    code: `data = {'x': 100}\nprint(data['y'])`,
    options: [
      "None",
      "undefined",
      "KeyError",
      "'y'"
    ],
    correctOptionIndex: 2,
    explanation: "Whenever you use direct bracket notation for non-existent keys, a rigid KeyError is thrown. To resolve this gracefully, use the `data.get('y')` method which returns None instead of raising an error.",
    hint: "What happens in bracket notation when you try entering a key that doesn't exist?"
  },
  {
    id: 6,
    title: "Mutable Defaults",
    difficulty: "Intermediate",
    language: "python",
    code: `def append_val(val, items=[]):\n  items.append(val)\n  return items\n\nprint(append_val(1))\nprint(append_val(2))`,
    options: [
      "[1] \\n [2]",
      "[1] \\n [1, 2]",
      "TypeError",
      "[1, 2] \\n [1, 2]"
    ],
    correctOptionIndex: 1,
    explanation: "A massive quirk! Default arguments are evaluated only ONCE when the function parses. The `items` list remains persistently bound across function executions unless explicitly re-supplied.",
    hint: "Default variables are evaluated one time at definition, not every time the function is called."
  },
  {
    id: 7,
    title: "Equality & Identity",
    difficulty: "Intermediate",
    language: "python",
    code: `a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)`,
    options: [
      "True \\n True",
      "True \\n False",
      "False \\n False",
      "False \\n True"
    ],
    correctOptionIndex: 1,
    explanation: "Elements identically match (making `==` evaluate boolean True), but since they were allocated independently into memory, they stand as distinct references evaluating memory identity (`is`) to False.",
    hint: "Consider what `==` evaluates versus what the `is` keyword checks for inside device memory."
  },
  {
    id: 8,
    title: "Local Unbound State",
    difficulty: "Intermediate",
    language: "python",
    code: `count = 0\ndef increment():\n  count += 1\n\nincrement()`,
    options: [
      "1",
      "0",
      "UnboundLocalError",
      "SyntaxError"
    ],
    correctOptionIndex: 2,
    explanation: "Because the function tries to modify `count` (assignment operator `+=`), Python statically tags parameter as a local function variable block. Accessing local `count` before assigning a pure local value triggers UnboundLocalError.",
    hint: "If you modify a variable inside a function without utilizing `global count`, what boundary does Python enforce?"
  },

  // 2 Expert
  {
    id: 9,
    title: "Closure Extrapolation",
    difficulty: "Expert",
    language: "python",
    code: `funcs = [lambda: i for i in range(3)]\nres = [f() for f in funcs]\nprint(res)`,
    options: [
      "[0, 1, 2]",
      "[2, 2, 2]",
      "[3, 3, 3]",
      "TypeError"
    ],
    correctOptionIndex: 1,
    explanation: "Python enforces 'late binding' variable closures. By the time that lambda list executes fully, `i` has completed progressing to the integer `2`. They fetch the variable's final location, leaving all lambdas returning 2.",
    hint: "Lambdas don't store values eagerly; they trace the physical variable location precisely at execution time."
  },
  {
    id: 10,
    title: "Class Attributes vs Instance",
    difficulty: "Expert",
    language: "python",
    code: `class Config:\n  tags = []\n\nc1 = Config()\nc2 = Config()\nc1.tags.append('prod')\nprint(c2.tags)`,
    options: [
      "[]",
      "['prod']",
      "AttributeError",
      "None"
    ],
    correctOptionIndex: 1,
    explanation: "Variables declared directly within a class schema are treated as shared Class components—accessible commonly across all spawn instances. Modifying `tags` impacts the root prototype, leaking states across sibling allocations.",
    hint: "Wait... is `tags` defined deep inside an instantiation (`__init__`) state or generically at the class baseline?"
  }
];
