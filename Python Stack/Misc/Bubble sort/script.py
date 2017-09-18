def bubble_sort(li, num_sorted=0):

    items_swapped = False

    if len(li) < 2:
        return li

    for i in range(len(li) - num_sorted - 1):
        if li[i] > li[i + 1]:
            li[i], li[i + 1] = li[i + 1], li[i]
            items_swapped = True
    num_sorted += 1
    if num_sorted < len(li) - 1 and items_swapped is True:
        bubble_sort(li, num_sorted)
    return li

test = [0,2,1,5,4,6,9,8,0]
print test
print bubble_sort(test)