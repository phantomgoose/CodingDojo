def insertion_sort(arr, start_idx=1):
    if len(arr) < 2:
        return arr

    current = arr[start_idx]

    if arr[start_idx - 1] > current:
        for i in range(start_idx, 0, -1):
            if arr[i - 1] < current:
                break
            arr[i], arr[i - 1] = arr[i - 1], arr[i]

    start_idx += 1
    if start_idx < len(arr):
        insertion_sort(arr, start_idx)
    return arr

test = [0,5,4,1,3,2,7,6,8,9,10,0]
print test
print insertion_sort(test)