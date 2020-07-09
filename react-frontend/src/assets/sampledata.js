const sampleData = [
    {
        "name": "init",
        "question": "Choose Case",
        "type": "radio",
        "options": {
            "A": "A",
            "B": "B",
            "C": "C"
        }
    },
    {
        "case": "A",
        "question": "Why did you choose A?",
        "type": "text"
    },
    {
        "case": "B",
        "question": "Why did you choose B?||Why not A or C?",
        "type": "text"
    },
    {
        "case": "C",
        "question": "Why did you choose C?",
        "type": "checkbox",
        "options": {
            "a": "cat",
            "b": "camel",
            "c": "cuckoo"
        }
    }
];

export default sampleData;