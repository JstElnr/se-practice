students = {
    "Алиса": [85, 90, 78, 92],
    "Боб": [70, 75, 68, 80],
    "Чарли": [95, 88, 91, 97]
}

for name, marks in students.items():
    average = sum(marks) / len(marks)
    maximum = max(marks)
    minimum = min(marks)

    print(f"Студент: {name}")
    print(f"  Средний балл: {average:.2f}")
    print(f"  Максимальная оценка: {maximum}")
    print(f"  Минимальная оценка: {minimum}")
    print()