print("MIT TASKLAR :)")

print("MIT TASK S")


def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum


print(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))

print("MIT TASK R")


def calculate(expression: str) -> int | float:
    return eval(expression)


print(calculate("1 + 3"))
print(calculate("1 + 2"))

print("MIT TASK Q")


def has_property(obj: dict, prop: str) -> bool:
    return prop in obj


print(has_property({"name": "KYUNGSUNG UNIVERSITY"}, "name"))
print(has_property({"name": "KYUNGSUNG UNIVERSITY"}, "color"))

print("MIT TASK P")


def object_to_array(obj):

    return [[k, v] for k, v in obj.items()]


result = object_to_array({"dina": 21, "Aisha": 20})
print(result)


print("MIT TASK O")


def calculate_sum_of_numbers(elements):
    return sum(item for item in elements if isinstance(item, (int, float)) and not isinstance(item, bool))


result = calculate_sum_of_numbers([10, "10", "dina", True, 20])
print(result)


print("MIT TASK N")


def palindromCheck(text: str) -> bool:
    cleaned_text = text.lower()
    return cleaned_text == cleaned_text[::-1]


print(palindromCheck("dina"))
print(palindromCheck("mom"))


print("MIT TASK M")


def get_square_numbers(arr):
    return [{"number": x, "square": x ** 2} for x in arr]


print(get_square_numbers([1, 2, 3]))


print("MIT TASK L")


def reverse_sentence(sentence):
    return " ".join(word[::-1] for word in sentence.split(" "))


input_str = " Shu kunlarda ishim ko'p"
result = reverse_sentence(input_str)

print(result)
