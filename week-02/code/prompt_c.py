def analyze_marks(marks, pass_mark=50):
    """
    Analyze a collection of student marks.

    Returns:
        dict with:
            average   - arithmetic mean of the marks
            highest   - highest mark
            lowest    - lowest mark
            pass_rate - percentage of marks >= pass_mark

    Raises:
        ValueError: if marks is empty, contains non-numeric values,
                    contains values outside 0..100, or pass_mark
                    is outside 0..100 / non-numeric.
    """

    # Validate pass_mark
    if isinstance(pass_mark, bool) or not isinstance(pass_mark, (int, float)):
        raise ValueError("pass_mark must be numeric")

    if not 0 <= pass_mark <= 100:
        raise ValueError("pass_mark must be between 0 and 100")

    # Convert to a list so we can validate and use it multiple times.
    marks = list(marks)

    # Empty list
    if not marks:
        raise ValueError("marks cannot be empty")

    # Validate every mark
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("all marks must be numeric")

        if not 0 <= mark <= 100:
            raise ValueError("marks must be between 0 and 100")

    # Calculate statistics
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(mark >= pass_mark for mark in marks)
    pass_rate = (passed / len(marks)) * 100

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": round(pass_rate, 2)
    }


# --------------------
# Tests
# --------------------

# 1. Normal example
result = analyze_marks([40, 60, 80], 50)
assert result == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 66.67
}

# 2. One mark
result = analyze_marks([75])
assert result == {
    "average": 75.0,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0
}

# 3. Decimal marks
result = analyze_marks([55.5, 70.25, 80.75])
assert result["average"] == 68.83333333333333
assert result["highest"] == 80.75
assert result["lowest"] == 55.5
assert result["pass_rate"] == 100.0

# 4. Custom pass_mark
result = analyze_marks([40, 60, 70, 90], pass_mark=70)
assert result == {
    "average": 65.0,
    "highest": 90,
    "lowest": 40,
    "pass_rate": 50.0
}

# 5. Empty list
try:
    analyze_marks([])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 6. Text value
try:
    analyze_marks([40, "60", 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 7. Mark below 0
try:
    analyze_marks([-1, 50, 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 8. Mark above 100
try:
    analyze_marks([50, 101, 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

print("All tests passed.")