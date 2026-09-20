def analyze_marks(marks, pass_mark=50):
    # Validate pass_mark
    if isinstance(pass_mark, bool) or not isinstance(pass_mark, (int, float)):
        raise ValueError("pass_mark must be a number between 0 and 100")

    if not 0 <= pass_mark <= 100:
        raise ValueError("pass_mark must be between 0 and 100")

    # Validate marks
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("marks must be a non-empty list")

    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("all marks must be numeric")

        if not 0 <= mark <= 100:
            raise ValueError("all marks must be between 0 and 100")

    # Calculate statistics
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(mark >= pass_mark for mark in marks)
    pass_rate = round((passed / len(marks)) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }


# Tests

# 1. One mark
assert analyze_marks([75]) == {
    "average": 75.0,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0
}

# 2. Decimals
result = analyze_marks([50.5, 75.5, 80.0])
assert result["average"] == 68.66666666666667
assert result["highest"] == 80.0
assert result["lowest"] == 50.5
assert result["pass_rate"] == 100.0

# 3. Custom pass_mark
result = analyze_marks([40, 60, 80], pass_mark=70)
assert result == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 33.33
}

# 4. Empty list
try:
    analyze_marks([])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 5. Text value
try:
    analyze_marks([40, "60", 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 6. Mark below 0
try:
    analyze_marks([-1, 50, 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 7. Mark above 100
try:
    analyze_marks([50, 101, 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 8. Invalid pass_mark: text
try:
    analyze_marks([50, 60], pass_mark="50")
    assert False, "Expected ValueError"
except ValueError:
    pass

# 9. Invalid pass_mark: bool
try:
    analyze_marks([50, 60], pass_mark=True)
    assert False, "Expected ValueError"
except ValueError:
    pass

# 10. Invalid pass_mark: out of range
try:
    analyze_marks([50, 60], pass_mark=101)
    assert False, "Expected ValueError"
except ValueError:
    pass


# Example
print(analyze_marks([40, 60, 80], 50))
# {'average': 60.0, 'highest': 80, 'lowest': 40, 'pass_rate': 66.67}