# MIT TASK L
def reverse_sentence(sentence):
    return " ".join(word[::-1] for word in sentence.split(" "))


input_str = " Shu kunlarda ishim ko'p"
result = reverse_sentence(input_str)

print(result)
