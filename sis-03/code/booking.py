def can_book(start, end, now, blocked, existing):
    """Return whether the booking request is allowed.

    Intervals include the start and exclude the end: [start, end).
    """
    # AC1: valid time range and start strictly after now
    if not (0 <= start < end <= 1440):
        return False
    if start <= now:
        return False

    # AC2: duration at most 120 minutes
    if end - start > 120:
        return False

    # AC3: room must not be blocked
    if blocked:
        return False

    # AC4: two intervals overlap only if each starts before the other ends.
    # The comparisons are strict (< and >), so touching endpoints are allowed.
    for existing_start, existing_end in existing:
        if start < existing_end and end > existing_start:
            return False

    # AC5: all conditions hold
    return True
