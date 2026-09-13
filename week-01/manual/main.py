from pathlib import Path
import argparse

def parse_marks(raw_text):
    valid_marks = []
    pieces = raw_text.split(",")
    for piece in pieces:
        piece = piece.strip()

        try:
            num = int(piece)
        except ValueError:
            continue

        if 0 <= num <= 100:
            valid_marks.append(num)

    return valid_marks

def stats(valid_marks):
    if len(valid_marks) == 0:
        return None
    else:
        count = len(valid_marks)
        average = sum(valid_marks)/count
        highest = max(valid_marks)
        lowest = min(valid_marks)
        passed = [m for m in valid_marks if m >= 50]
        pass_rate = len(passed) / count * 100

    return {"count":count, "average":average, "highest": highest, "lowest":lowest, "pass_rate":pass_rate}


def result(stat):
    if stat is None:
        print(f"no valid marks found")
    else:
        print(f"Valid marks: {stat['count']}" )
        print(f"Average: {stat['average']:.2f}")
        print(f"Highest: {stat['highest']}")
        print(f"Lowest: {stat['lowest']}")
        print(f"Pass rate: {stat['pass_rate']}%")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    args = parser.parse_args()
    path = Path(args.path)
    text = path.read_text()

    marks = parse_marks(text)
    computed = stats(marks)
    result(computed)

if __name__ == "__main__":
    main()