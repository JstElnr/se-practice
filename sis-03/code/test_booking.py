import unittest
from booking import can_book

BASE = dict(now=540, blocked=False, existing=[(600, 660)])


def call(start, end, **overrides):
    args = dict(BASE)
    args.update(overrides)
    return can_book(start, end, args["now"], args["blocked"], args["existing"])


class BookingTests(unittest.TestCase):
    # ---- the six table cases (Part 3, step 1) ----
    def test_touching_end_is_allowed(self):
        result = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_partial_overlap_is_rejected(self):
        self.assertIs(call(630, 690), False)

    def test_blocked_room_is_rejected(self):
        # (660, 720) is otherwise valid, so only AC3 can reject it
        self.assertIs(call(660, 720, blocked=True), False)

    def test_exactly_two_hours_is_allowed(self):
        self.assertIs(call(720, 840), True)

    def test_over_two_hours_is_rejected(self):
        # 721..., 121 minutes, after the existing booking, so only AC2 rejects it
        self.assertIs(call(720, 841), False)

    def test_start_equal_to_now_is_rejected(self):
        # (540, 570) is short, free of overlap and unblocked; only start > now fails
        self.assertIs(call(540, 570), False)

    # ---- five further kinds (Part 3, step 2) ----
    def test_zero_length_is_rejected(self):
        # start == end violates start < end (AC1); nothing else is wrong
        self.assertIs(call(700, 700, existing=[]), False)

    def test_reversed_times_are_rejected(self):
        self.assertIs(call(760, 700, existing=[]), False)

    def test_start_before_day_is_rejected(self):
        # start below the start of the day; now=0 keeps `now` inside the contract
        self.assertIs(can_book(-10, 30, 0, False, []), False)

    def test_end_after_day_end_is_rejected(self):
        # duration is 60, so only end <= 1440 can reject it
        self.assertIs(can_book(1400, 1460, 540, False, []), False)

    def test_booking_ending_exactly_at_midnight_is_allowed(self):
        self.assertIs(can_book(1380, 1440, 540, False, []), True)

    def test_empty_existing_list_allows_valid_request(self):
        self.assertIs(call(700, 760, existing=[]), True)

    def test_several_existing_bookings_overlap_with_the_last_one(self):
        existing = [(600, 660), (700, 760), (800, 860)]
        self.assertIs(call(820, 850, existing=existing), False)

    def test_several_existing_bookings_gap_between_them_is_allowed(self):
        existing = [(600, 660), (700, 760), (800, 860)]
        self.assertIs(call(760, 800, existing=existing), True)

    def test_request_inside_existing_booking_is_rejected(self):
        self.assertIs(call(615, 645), False)

    def test_request_containing_existing_booking_is_rejected(self):
        self.assertIs(call(570, 690), False)

    def test_request_ending_exactly_at_existing_start_is_allowed(self):
        self.assertIs(call(540 + 1, 600), True)

    def test_input_list_is_left_unchanged(self):
        existing = [(600, 660), (700, 760)]
        snapshot = list(existing)
        can_book(660, 700, 540, False, existing)
        self.assertEqual(existing, snapshot)

    def test_input_list_is_left_unchanged_after_a_rejection(self):
        existing = [(600, 660)]
        snapshot = list(existing)
        can_book(630, 690, 540, False, existing)
        self.assertEqual(existing, snapshot)

    def test_result_is_a_real_boolean(self):
        self.assertIs(type(call(700, 760, existing=[])), bool)
        self.assertIs(type(call(630, 690)), bool)

    def test_unsorted_input_list_keeps_its_order_when_request_is_accepted(self):
        # a function that sorts `existing` in place would be noticed only with an unsorted list
        existing = [(800, 860), (600, 660), (700, 760)]
        snapshot = list(existing)
        result = can_book(900, 960, 540, False, existing)
        self.assertIs(result, True)
        self.assertEqual(existing, snapshot)

    def test_unsorted_input_list_keeps_its_order_when_request_is_rejected(self):
        existing = [(800, 860), (600, 660), (700, 760)]
        snapshot = list(existing)
        result = can_book(610, 650, 540, False, existing)
        self.assertIs(result, False)
        self.assertEqual(existing, snapshot)

    def test_every_rejection_returns_a_real_false(self):
        rejected = [
            can_book(700, 700, 540, False, []),          # AC1 order
            can_book(500, 560, 540, False, []),          # AC1 start not after now
            can_book(1400, 1460, 540, False, []),        # AC1 day end
            can_book(700, 830, 540, False, []),          # AC2 duration
            can_book(700, 760, 540, True, []),           # AC3 blocked
            can_book(630, 690, 540, False, [(600, 660)]),  # AC4 overlap
        ]
        for result in rejected:
            self.assertIs(result, False)


if __name__ == "__main__":
    unittest.main()
