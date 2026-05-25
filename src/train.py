print("MIT TASKLAR :)")

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
