print("MIT TASKLAR :)")

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
