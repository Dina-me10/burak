print("MIT TASKLAR :)")

print("MIT TASK Y")


def findIntersection(arr1, arr2):
    result = list(set(arr1) & set(arr2))
    return sorted(result)


print(findIntersection([1, 2, 3], [3, 2, 0]))

print("MIT TASK X")


def count_occurrences(obj, target):
    if not isinstance(obj, dict):
        return 0

    count = 0
    for key, value in obj.items():
        if key == target:
            count += 1
        count += count_occurrences(value, target)

    return count


chocolate_shop = {
    "chocolate": "Snickers",
    "gift_box": {
        "chocolate": "Mars",
        "small_bag": {
            "chocolate": "Bounty"
        }
    }
}

print(count_occurrences(chocolate_shop, "chocolate"))


print("MIT TASK W")


def chunkArray(arr, size):
    result = []
    for i in range(0, len(arr), size):
        result.append(arr[i:i + size])
    return result


chunk_Names = ["dina", "Mark", "angel", "alex", "anthony", "Kevin"]


print(chunkArray(chunk_Names, 2))
print(chunkArray(chunk_Names, 3))


print("MIT TASK V")


def countChars(text):
    result = {}
    for char in text:
        if char in result:
            result[char]
        else:
            result[char] = 1
    return result


print(countChars("HELLO DINA"))

print("MIT TASK T")


def mergeSortedArrays(arr1, arr2):
    return sorted(arr1 + arr2)


example1 = [10, 3, 2]
example2 = [9, 0]

result = mergeSortedArrays(example1, example2)
print(result)


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
