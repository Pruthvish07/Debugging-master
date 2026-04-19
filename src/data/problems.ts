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

export const problemsPool: Problem[] = [
  // Beginner
  {
    id: 1,
    title: "Case Sensitivity",
    difficulty: "Beginner",
    language: "python",
    code: `var = 10\nprint(VAR)`,
    options: ["'10'", "'var'", "NameError", "SyntaxError"],
    correctOptionIndex: 2,
    explanation: "Python is case-sensitive; 'var' and 'VAR' are different names.",
    hint: "Check the casing of the variable names."
  },
  {
    id: 2,
    title: "Type Concatenation",
    difficulty: "Beginner",
    language: "python",
    code: `age = 25\nprint("I am " + age)`,
    options: ["'I am 25'", "TypeError", "ValueError", "SyntaxError"],
    correctOptionIndex: 1,
    explanation: "Python doesn't implicitly cast integers to strings for concatenation.",
    hint: "Think about whether you can add a string to an integer."
  },
  {
    id: 3,
    title: "List Boundaries",
    difficulty: "Beginner",
    language: "python",
    code: `colors = ['red', 'blue']\nprint(colors[2])`,
    options: ["'blue'", "None", "IndexError", "Index 2 is empty"],
    correctOptionIndex: 2,
    explanation: "A list of length 2 has indices 0 and 1. Index 2 is out of range.",
    hint: "Remember that Python indexing starts at 0."
  },
  {
    id: 4,
    title: "Boolean Logic",
    difficulty: "Beginner",
    language: "python",
    code: `print(True or False and False)`,
    options: ["True", "False", "None", "SyntaxError"],
    correctOptionIndex: 0,
    explanation: "'and' has higher precedence than 'or'. So it's True or (False and False) = True or False = True.",
    hint: "Which logical operator is evaluated first: 'and' or 'or'?"
  },
  {
    id: 5,
    title: "Division Type",
    difficulty: "Beginner",
    language: "python",
    code: `res = 10 / 2\nprint(type(res))`,
    options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'decimal'>"],
    correctOptionIndex: 1,
    explanation: "Standard division (/) in Python 3 always returns a float, even if the result is a whole number.",
    hint: "Does single forward-slash division return a whole number or a decimal result?"
  },
  {
    id: 6,
    title: "Slicing Basics",
    difficulty: "Beginner",
    language: "python",
    code: `s = "Python"\nprint(s[1:4])`,
    options: ["'Pyt'", "'yth'", "'ytho'", "'Pyth'"],
    correctOptionIndex: 1,
    explanation: "Slicing [start:end] includes the start index but excludes the end index. Index 1 is 'y', 2 is 't', 3 is 'h'.",
    hint: "Index 1 is the second letter. The end index is exclusive."
  },
  {
    id: 7,
    title: "Range Length",
    difficulty: "Beginner",
    language: "python",
    code: `nums = list(range(5))\nprint(len(nums))`,
    options: ["4", "5", "6", "0"],
    correctOptionIndex: 1,
    explanation: "range(5) generates numbers 0, 1, 2, 3, 4. Converting to a list creates a list of 5 elements.",
    hint: "Does range(5) include the number 5?"
  },
  {
    id: 8,
    title: "Indentation",
    difficulty: "Beginner",
    language: "python",
    code: `if True:\nprint("Yes")`,
    options: ["'Yes'", "None", "IndentationError", "SyntaxError"],
    correctOptionIndex: 2,
    explanation: "Python requires an indented block after an 'if' statement.",
    hint: "What character or spacing is missing after the colon?"
  },

  // Intermediate
  {
    id: 9,
    title: "Mutable Defaults",
    difficulty: "Intermediate",
    language: "python",
    code: `def add(n, l=[]):\n  l.append(n)\n  return l\n\nadd(1)\nprint(add(2))`,
    options: ["[2]", "[1, 2]", "[1]", "TypeError"],
    correctOptionIndex: 1,
    explanation: "Default arguments are evaluated once at function definition. The same list is reused across calls.",
    hint: "Is the default list created once or every time the function runs?"
  },
  {
    id: 10,
    title: "Dictionary Keys",
    difficulty: "Intermediate",
    language: "python",
    code: `d = {'a': 1}\nprint(d['b'])`,
    options: ["None", "0", "KeyError", "undefined"],
    correctOptionIndex: 2,
    explanation: "Accessing a non-existent key via bracket notation raises a KeyError.",
    hint: "What happens when a dictionary is asked for a key it doesn't have?"
  },
  {
    id: 11,
    title: "Identity vs Equality",
    difficulty: "Intermediate",
    language: "python",
    code: `p = [1]\nq = [1]\nprint(p is q)`,
    options: ["True", "False", "None", "Error"],
    correctOptionIndex: 1,
    explanation: "'is' checks for memory identity (reference). p and q are different list objects in memory.",
    hint: "Are these the same object in memory, or just two objects with the same value?"
  },
  {
    id: 12,
    title: "Unbound Local",
    difficulty: "Intermediate",
    language: "python",
    code: `x = 10\ndef fn():\n  x += 1\nfn()`,
    options: ["x becomes 11", "x stays 10", "UnboundLocalError", "GlobalError"],
    correctOptionIndex: 2,
    explanation: "Trying to modify a global variable inside a function without 'global' keyword implies it should be local, but it's referenced before assignment.",
    hint: "Does the function know that 'x' refers to the global variable?"
  },
  {
    id: 13,
    title: "Tuple Mod",
    difficulty: "Intermediate",
    language: "python",
    code: `t = (1, 2)\nt[0] = 0`,
    options: ["(0, 2)", "TypeError", "AttributeError", "(1, 2)"],
    correctOptionIndex: 1,
    explanation: "Tuples are immutable; you cannot change their elements after creation.",
    hint: "Are tuples mutable like lists?"
  },
  {
    id: 14,
    title: "List Comprehension Scope",
    difficulty: "Intermediate",
    language: "python",
    code: `y = 5\nres = [y for y in range(3)]\nprint(y)`,
    options: ["5", "2", "3", "None"],
    correctOptionIndex: 0,
    explanation: "In Python 3, list comprehensions have their own scope. The loop variable 'y' doesn't leak into the surrounding scope.",
    hint: "Does the variable 'y' inside the brackets overwrite the 'y' outside?"
  },
  {
    id: 15,
    title: "String Immutability",
    difficulty: "Intermediate",
    language: "python",
    code: `s = "hello"\ns[0] = "H"\nprint(s)`,
    options: ["'Hello'", "TypeError", "'hello'", "IndexError"],
    correctOptionIndex: 1,
    explanation: "Strings in Python are immutable. You cannot change individual characters in place.",
    hint: "Can you change a single character inside a string?"
  },
  {
    id: 16,
    title: "Logical and Priority",
    difficulty: "Intermediate",
    language: "python",
    code: `print([] or [0] or [1])`,
    options: ["[]", "[0]", "[1]", "True"],
    correctOptionIndex: 1,
    explanation: "The 'or' operator returns the first truthy value. [] is falsy, [0] is truthy because it's not empty.",
    hint: "Which of these lists is the first one that Python considers 'True'?"
  },

  // Expert
  {
    id: 17,
    title: "Late Binding Lambdas",
    difficulty: "Expert",
    language: "python",
    code: `funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])`,
    options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "[0, 0, 0]"],
    correctOptionIndex: 1,
    explanation: "Variables in closures are bound at execution time. 'i' is 2 for all lambdas when they are called.",
    hint: "When are the values of 'i' actually fetched: when the function is made, or when it's called?"
  },
  {
    id: 18,
    title: "Inheritance Attributes",
    difficulty: "Expert",
    language: "python",
    code: `class A: x = 1\nclass B(A): pass\nclass C(A): pass\nB.x = 2\nA.x = 3\nprint(C.x)`,
    options: ["1", "2", "3", "AttributeError"],
    correctOptionIndex: 2,
    explanation: "B.x shadowed the class attribute. C.x still references A.x, which was updated to 3.",
    hint: "If A changes, does it affect children who haven't defined their own version of that variable?"
  },
  {
    id: 19,
    title: "MRO (Method Resolution)",
    difficulty: "Expert",
    language: "python",
    code: `class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nprint(D.mro())`,
    options: ["D, B, C, A, object", "D, B, A, C, object", "D, C, B, A, object", "Error"],
    correctOptionIndex: 0,
    explanation: "Python uses C3 Linearization (MRO). D -> B -> C -> A -> object following the Diamond inheritance rule.",
    hint: "Think about the order of parents in class D(B, C)."
  },
  {
    id: 20,
    title: "Function Annotation",
    difficulty: "Expert",
    language: "python",
    code: `def calc(x: int) -> str:\n  return x * 2\nprint(calc(5))`,
    options: ["10", "'55'", "TypeError", "'10'"],
    correctOptionIndex: 0,
    explanation: "Type hints are for documentation and static analysis. Python runtime ignores them; 5 * 2 is simply 10.",
    hint: "Does Python actually enforce the 'int' or 'str' types at runtime during math?"
  }
];
