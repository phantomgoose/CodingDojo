def selection_sort(arr, start_idx=0):
    minimum = (arr[start_idx], start_idx)

    for i in range(start_idx, len(arr)):
        if arr[i] < minimum[0]:
            minimum = (arr[i], i)
    
    arr[start_idx], arr[minimum[1]] = arr[minimum[1]], arr[start_idx]
    start_idx += 1
    if start_idx < len(arr) - 1:
        selection_sort(arr, start_idx)
    return arr

test = [3,2,10,0,0,1,2,5,4,9]
print test
print selection_sort(test)